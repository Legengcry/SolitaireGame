import { SolitaireEvent } from "../../SolitaireEvent";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { ISolitaireJuEventListener, SolitaireJu } from "../Model/SolitaireJu";

export type SolitaireGameTopInfoUIArgs = {
    OnBack: Function
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireGameTopInfoUI extends ii.UIComp<SolitaireGameTopInfoUIArgs> implements ISolitaireJuEventListener {
    @property({type:cc.Label,visible:true}) private _scoreLabel: cc.Label = null
    @property({type:cc.Label,visible:true}) private _timeLabel: cc.Label = null
    @property({type:cc.Label,visible:true}) private _moveStepLabel: cc.Label = null
    @property({type:cc.Label,visible:true}) private _effectLabel: cc.Label = null 
    @property({type:cc.Node,visible:true}) private _visiableNode: cc.Node = null

    private _bHideMenuUIBV: ii.BooleanBV = null;
    private _bAutoCollecting: boolean = false;
    private _bAutoPlaying: boolean = false;
    private UpdateStatus() { this._bHideMenuUIBV.v = this._bAutoCollecting || this._bAutoPlaying; }

    protected OnCreate(): void {
        this._effectLabel.node.active = false
    }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: SolitaireGameTopInfoUIArgs): void {
        this.SetIIClickHandler("OnBack", this.args.OnBack);
        this.SetIIClickHandler("OnOptions", ()=>ii.UIMgr.ins.Open(SolitairePrefabCfg.pfb.panel.SolitaireOptionsUIPanel.key));

        this._bHideMenuUIBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this._bHideMenuUIBV.Bind(hide=>this._visiableNode.active = !hide, true, this);
    }

    get SolitaireJuEventTarget(): any { return this.node; }
    OnSolitaireDesktopEvent(ju: SolitaireJu, eventTyp: SolitaireEvent, data?: any): void {
        switch (eventTyp) {
            case SolitaireEvent.SC_TIME_CHANGED: this.UpdateUITime(data); break;
            case SolitaireEvent.SC_UI_SUBSCRIB: this.SubScribModelEvents(ju); break;
        }
    }

    private UpdateUITime(tick: number) { this._timeLabel.string = ii.date.Format(tick, "mm:ss") }

    private SubScribModelEvents(ju: SolitaireJu) {
        // 监听模型数据变化，更新当前页面所需的状态数据
        ju.scoreBV.Bind(this.OnScoreValueChanged.bind(this) , false, this)
    }

    private OnScoreValueChanged(score: number, preScore: number) {
        let changed = score - preScore
        this._effectLabel.string = `${changed > 0 ? "+" : ""}${changed}`
        this._effectLabel.node.active = true
        cc.Tween.stopAllByTarget(this._effectLabel.node)
        this._effectLabel.node.position = cc.Vec3.ZERO
        cc.tween(this._effectLabel.node)
            .by(1, {position: cc.v3(0, 30, 0)})
            .call(node => node.active = false)
            .start()
    }

    Enter(ju: SolitaireJu) {
        this._effectLabel.node.active = false
        this.BindBV(ju.scoreBV, score => this._scoreLabel.string = `${score}` , true);
        this.BindBV(ju.isAutoPlayingBV, autoPlaying=>{
            this._bAutoPlaying = autoPlaying; this.UpdateStatus();
        }, true);
        this.BindBV(ju.isAutoCollectingBV, autoCollecting=>{ this._bAutoCollecting = autoCollecting; this.UpdateStatus(); }, true);
        this.BindBV(ju.moveStepCountBV, step => this._moveStepLabel.string = `${step}`, true)
        ju.AddEventListener(this);
    }

    Exit(ju: SolitaireJu) {
        ju.RemoveEventListener(this);
        this.UnbindAllBV();
    }
}
