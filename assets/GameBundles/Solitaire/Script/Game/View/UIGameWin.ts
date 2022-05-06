import { SolitaireLogic } from "../../Logic/SolitaireLogic";
import { SolitaireAudioCfg } from "../../SolitaireAudioCfg";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { SolitaireJu } from "../Model/SolitaireJu";
import SolitaireGameUIPanel from "./SolitaireGameUIPanel";


export type UIGameWinArgs = {
    ju: SolitaireJu,
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIGameWin extends ii.UIPanel<UIGameWinArgs> {
    @property({type:cc.Label,visible:true}) private timeLabel: cc.Label = null 
    @property({type:cc.Label,visible:true}) private scoreLabel: cc.Label = null 
    @property({type:cc.Label,visible:true}) private movesLabel: cc.Label = null 
    @property({type:cc.Label,visible:true}) private timeHistoryLabel: cc.Label = null 
    @property({type:cc.Label,visible:true}) private scoreHistoryLabel: cc.Label = null 
    @property({type:cc.Label,visible:true}) private movesHistoryLabel: cc.Label = null 
    @property({type:[cc.Label],visible:true}) private _seedLabels: cc.Label[] = [];

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIGameWinArgs): void {
        this.SetIIClickHandler("OnReplay", this.OnReplay.bind(this), true);
        this.SetIIClickHandler("OnNextGame", this.OnNextGame.bind(this), true);
        // 数据
        let historyValue = SolitaireLogic.dataCache.GetModeHistory(this.args.ju.isVegasMode, this.args.ju.isCard3Mode).v;
        let gameTime = this.args.ju.gameTime;
        let score = this.args.ju.scoreBV.v;
        let moveStepCount = this.args.ju.moveStepCountBV.v;

        // 数据显示
        this.timeLabel.string = ii.date.Format(gameTime, "mm:ss");
        this.scoreLabel.string = `${score}`;
        this.movesLabel.string = `${moveStepCount}`;
        this.timeHistoryLabel.string = ii.date.Format(historyValue.gameTimeBest, "mm:ss");
        this.scoreHistoryLabel.string = `${historyValue.scoreBest}`;
        this.movesHistoryLabel.string = `${historyValue.moveStepBest}`;
        this._seedLabels.forEach(label=>label.string = `${this.args.ju.Seed}`);

        // 播放胜利音效
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.successful);
        
        this.TryToShowInterstitial();
    }

    private TryToShowInterstitial() {
        if(SolitaireLogic.dataCache.passCountBV.v >= 3){
            if(ii.App.ins.p.ad.IsInterstitialAvailable()) {
                ii.App.ins.p.ad.ShowInterstitialWithBlocker(null, SolitairePrefabCfg.pfb.panel.LoadingADUIPanel.key, 2);
            }else{
                ii.App.ins.p.ad.LoadInterstitial();
                if(ii.App.ins.p.user.GetGameCenterVal("GameTime") > 16*3600) {
                    ii.App.ins.p.user.FiveStar();
                }
            }
        }
    }
    //! 点击重玩
    private OnReplay() {
        this.emitGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_REPLAY_GAME);
        this.Close();
    }

    //! 点击下一关
    private OnNextGame() {
        this.emitGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_NEXT_GAME);
        this.Close();
    }
}
