import { SolitaireAutoPlayerDataCache } from "./DataCache/SolitaireAutoPlayerDataCache";
import { SolitaireDataCache } from "./DataCache/SolitaireDataCache";
import { SolitaireSkinDataCache } from "./DataCache/SolitaireSkinDataCache";
import { SolitaireLogic } from "./Logic/SolitaireLogic";
import { SolitaireAudioCfg } from "./SolitaireAudioCfg";
import { SolitaireAutoAtlasCfg } from "./SolitaireAutoAtlasCfg";
import { SolitaireCfg } from "./SolitaireCfg";
import { SolitaireJsonCfg } from "./SolitaireJsonCfg";
import { SolitaireLangCfg } from "./SolitaireLangCfg";
import { SolitairePrefabCfg } from "./SolitairePrefabCfg";
import { SolitaireSpriteFrameCfg } from "./SolitaireSpriteFrameCfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SolitaireStage extends ii.UIStage {
    protected GetDefaultEffectAudioKey(): string { return SolitaireAudioCfg.effect.default; }

    protected OnInit(onUICompleted: Function, args?: any): void {
        console.info("Solitaire::OnInit")
        SolitaireAudioCfg.Register(SolitaireCfg.BUNDLE_NAME);
        SolitaireLangCfg.Register(SolitaireCfg.BUNDLE_NAME);
        SolitaireJsonCfg.Register(SolitaireCfg.BUNDLE_NAME);
        SolitairePrefabCfg.Register(SolitaireCfg.BUNDLE_NAME);
        SolitaireSpriteFrameCfg.Register(SolitaireCfg.BUNDLE_NAME);
        SolitaireAutoAtlasCfg.Register(SolitaireCfg.BUNDLE_NAME);
        
        // 数据准备
        this.AddAutoReleaseDataCache(SolitaireCfg.SOLITAIRE_DATACACHE, SolitaireDataCache);
        this.AddAutoReleaseDataCache(SolitaireCfg.SOLITAIRE_SKIN_DATACACHE, SolitaireSkinDataCache);
        this.AddAutoReleaseDataCache(SolitaireCfg.SOLITAIRE_AUTOPLAYER_DATACACHE, SolitaireAutoPlayerDataCache);

        this.LoadResList([
            ...ii.resDict2ResKeyList(SolitaireJsonCfg.key)
            , ...ii.resDict2ResKeyList(SolitaireLangCfg.lang)
            , ...ii.prefabCfg2ResKeyList(SolitairePrefabCfg.pfb.comp)
            , ...ii.resDict2ResKeyList(SolitaireAudioCfg.effect)
            , ...SolitaireLogic.skin.GetPreloadResList()
        ], ()=>{
            // 背景音乐
            ii.AudioMgr.ins.playMusic(SolitaireAudioCfg.music.default);
            ii.UIMgr.ins.Open(SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key, null, onUICompleted);
        })
    }
}
