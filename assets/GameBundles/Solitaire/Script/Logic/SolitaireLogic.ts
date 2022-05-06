import { SolitaireAutoPlayerDataCache } from "../DataCache/SolitaireAutoPlayerDataCache";
import { SolitaireDataCache } from "../DataCache/SolitaireDataCache";
import { SolitaireSkinDataCache } from "../DataCache/SolitaireSkinDataCache";
import { SolitaireJu } from "../Game/Model/SolitaireJu";
import { SolitaireCfg } from "../SolitaireCfg";

/**
 * 游戏逻辑控制器
 */
export abstract class SolitaireLogic extends ii.Logic {
    static get dataCache(): SolitaireDataCache { return this.GetDataCache(SolitaireCfg.SOLITAIRE_DATACACHE); }
    static get skin(): SolitaireSkinDataCache { return this.GetDataCache(SolitaireCfg.SOLITAIRE_SKIN_DATACACHE); }
    static get player(): SolitaireAutoPlayerDataCache { return this.GetDataCache(SolitaireCfg.SOLITAIRE_AUTOPLAYER_DATACACHE); }

    //#region //! 广告接口
    private static readonly WATCH_AD_REWARDED_COINS: number = 30;
    // 看广告底层接口；
    static WatchAD(msg: string, onRewarded: ii.VoidFunction) {
        if(!ii.App.ins.p.ad.IsRewardedVideoAvailable()) {
            ii.UIMgr.ins.ShowMsg("solitaire.ad_is_not_available");
            return;
        }
        ii.UIMgr.ins.OpenDialog2(msg, null, ()=>{
            ii.App.ins.p.ad.ShowRewardedVideo(()=>{
                onRewarded();
                ii.App.ins.p.user.SetGameCenterVal("WatchVideo", ii.App.ins.p.user.GetGameCenterVal("WatchVideo")+1);
            });
        });
    }

    //! 提示功能
    static UseHint(ju: SolitaireJu) {
        if(ju.HasOperationHint()){
            ju.isHintedBV.v = true;
            this.emitGlobal(SolitaireJu.event.EVENT_LEVEL_MODEL_USING_HINT)
        }else{
            ii.UIMgr.ins.ShowMsg("solitaire.no_hint");
        }
    }

    //! 帮助功能
    static UseAutoPlayer(ju: SolitaireJu) {
        if(ju.isHelpedBV.v) {
            ju.isPlayerOpenedBV.v = true
        }else{
            let __UseAutoPlayer = ()=>{
                --this.dataCache.helpBV.v;
                ju.OnUseHelp();
            }
            if(this.dataCache.helpBV.v > 0){
                __UseAutoPlayer()
            }else{
               // this.WatchAD(ii.LangUtil.Get("solitaire.watch_ad_to_reward_help"), ()=>{
                    ++this.dataCache.helpBV.v;
                    __UseAutoPlayer();
                //});
            }
        }
    }
    //! 胜利
    static HandleGameWin(ju: SolitaireJu, cb: ii.VoidFunction) {
        this.dataCache.HandleGameWin(ju);
        ii.Util.safeCall(cb);
    }
}
