import { SolitaireLogic } from "../Logic/SolitaireLogic";
import UIStatisticsCircleProgress from "./UIStatisticsCircleProgress";

export type UIStatisticsPageArgs = {
    vegas: boolean,
    card3: boolean,
    width: number
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class UIStatisticsPage extends ii.UIComp<UIStatisticsPageArgs> {
    @property(cc.Label) private titleLabel: cc.Label = null;
    @property(cc.Label) private highScoreLabel: cc.Label = null 
    @property(cc.Label) private bestTimeLabel: cc.Label = null 
    @property(cc.Label) private averageGameTimeLabel: cc.Label = null 
    @property(cc.Label) private averageMovesLabel: cc.Label = null 
    @property(cc.Label) private lowestMovesLabel: cc.Label = null 
    @property(cc.Label) private highestMovesLabel: cc.Label = null 
    @property(UIStatisticsCircleProgress) private wonProgress: UIStatisticsCircleProgress = null 
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: any): void {
        this.node.width = this.args.width;
        this.Refresh()
    }
    private Refresh() {
        let history = this.modeHistory.v;
        // UI 刷新
        this.titleLabel.string = this.GetTitleString(this.args.vegas, this.args.card3);
        this.highScoreLabel.string = `${history.scoreBest}`
        this.wonProgress.Init(history.passCount, history.passCount + history.loseCount)
        this.bestTimeLabel.string = `${history.gameTimeBest}`
        this.averageGameTimeLabel.string = `${history.gameTimeAverage}`
        this.averageMovesLabel.string = `${history.moveStepAverage}`
        this.lowestMovesLabel.string = `${history.moveStepBest}`
        this.highestMovesLabel.string = `${history.moveStepWorest}`
    }

    private GetTitleString(vegas: boolean, card3: boolean): string {
        return `${vegas ? "Vegas" : "Normal"}-${card3 ? "3Cards" : "1Card"}`;
    }

    Reset() {
        ii.UIMgr.ins.OpenDialog2(`Reset ${this.args.vegas ? 'Vegas': 'Normal'}-${this.args.card3 ? 'Card3': 'Card1'} history ?`, null, ()=>this.resetHistory());
    }

    private get index(): number { return (this.args.vegas ? 1 : 0)*2 + (this.args.card3 ? 1 : 0); }
    private get modeHistory() { return SolitaireLogic.dataCache.GetModeHistory(this.args.vegas, this.args.card3); }
    private resetHistory() {
        SolitaireLogic.dataCache.ResetModeHistory(this.args.vegas, this.args.card3);
        this.Refresh()
    }
}