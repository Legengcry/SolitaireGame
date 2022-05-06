import { SolitaireJu } from "../Model/SolitaireJu";
import SolitaireGameUIPanel from "./SolitaireGameUIPanel";
import { SolitaireAudioCfg } from "../../SolitaireAudioCfg";

export type UIGameLoseArgs = {
    ju: SolitaireJu
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIGameLose extends ii.UIPanel<UIGameLoseArgs> {
    @property(cc.Label) private scoreLabel: cc.Label = null
    @property({type:[cc.Label],visible:true}) private _seedLabels: cc.Label[] = [];

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIGameLoseArgs): void {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.failed);
        this.scoreLabel.string = `(得分: ${this.args.ju.scoreBV.v})`;
        this._seedLabels.forEach(label=>label.string = `${this.args.ju.Seed}`);

        this.SetIIClickHandler("OnSkipGame", ()=>{
            this.emitGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_SKIP_GAME); this.Close();
        }, true);

        this.SetIIClickHandler("OnReplay", ()=>{
            this.emitGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_REPLAY_GAME);
            this.Close();
        }, true)
        this.SetIIClickHandler("OnContinue", ()=>{
            this.args.ju.isContinueBV.v = true;
            this.Close();
        }, true)

    }

}
