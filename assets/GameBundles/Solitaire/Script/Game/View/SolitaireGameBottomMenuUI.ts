import { SolitaireLogic } from "../../Logic/SolitaireLogic";
import { SolitaireEvent } from "../../SolitaireEvent";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { ISolitaireJuEventListener, SolitaireJu } from "../Model/SolitaireJu";
import SolitaireGameDesktopUI from "./SolitaireGameDesktopUI";
import { UINewGameArgs } from "./UINewGame";

export type SolitaireGameBottomMenuUIArgs = { }

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireGameBottomMenuUI extends ii.UIComp<SolitaireGameBottomMenuUIArgs> implements ISolitaireJuEventListener {
    @property({type:cc.Node,visible:true}) private mui_ThemesDotNode: cc.Node = null 
    @property({type:cc.Node,visible:true}) private mui_HintDotNode: cc.Node = null 
    @property({type:cc.Node,visible:true}) private mui_NewGameDotNode: cc.Node = null 
    @property({type:cc.Label,visible:true}) private hintCountLabel: cc.Label = null
    @property({type:cc.Node,visible:true}) private _undoRoot: cc.Node = null 
    @property({type:cc.Label,visible:true}) private undoCountLabel: cc.Label = null
    @property({type:cc.Node,visible:true}) private mui_HelpDotNode: cc.Node = null /** 帮助次数红点根节点 */
    @property({type:cc.Label,visible:true}) private helpCountLabel: cc.Label = null /** 帮助次数 */
    @property({type:cc.Node,visible:true}) private expandActionNode: cc.Node = null // 收缩菜单对应的节点
    @property({type:cc.Node,visible:true}) private _undoNodeForGameType: cc.Node = null
    @property({type:cc.Node,visible:true}) private _hintNodeForGameType: cc.Node = null
    @property({type:cc.Node,visible:true}) private undoNode: cc.Node = null
    @property({type:cc.Node,visible:true}) private autoCollectNode: cc.Node = null
    @property({type:cc.Node,visible:true}) private autoPlayerRoot: cc.Node = null
    @property({type:cc.Node,visible:true}) private startAutoPlayNode: cc.Node = null
    @property({type:cc.Node,visible:true}) private pauseAutoPlayNode: cc.Node = null
    @property({type:cc.Node,visible:true}) private preStepAutoPlayNode: cc.Node = null
    @property({type:cc.Node,visible:true}) private nextStepAutoPlayNode: cc.Node = null
    @property({type:cc.Node,visible:true}) private mui_SpeedUp: cc.Node = null 
    @property({type:cc.Node,visible:true}) private mui_SpeedDown: cc.Node = null 
    @property({type:cc.Node,visible:true}) private blockInput: cc.Node = null /** 阻止用户输入的层 */
    @property({type:cc.Node,visible:true}) private speedProgressRoot: cc.Node = null /** 速度条根节点 */
    @property({type:cc.Node,visible:true}) private speedProgress: cc.Node = null /** 速度条 */
   // @property({type:cc.Node,visible:true}) private helpADIconNode: cc.Node = null /** 帮助广告显示 */

    private m_IsExpandedBV: ii.BooleanBV = null;
    private isShowUIAutoCollect: ii.BooleanBV = null;
    private isShowUIUndo: ii.BooleanBV = null;
    private isShowUIPlayer: ii.BooleanBV = null;
    private isShowUIPlayerStart: ii.BooleanBV = null;
    private isShowUIPlayerPause: ii.BooleanBV = null;
    private isShowUIPlayerPreStep: ii.BooleanBV = null;
    private isShowUIPlayerNextStep: ii.BooleanBV = null;
    private isShowUIBlockInput: ii.BooleanBV = null;
    private isShowUIExpand: ii.BooleanBV = null;
    private isShowUIPlayerSpeedUp: ii.BooleanBV = null;
    private isShowUIPlayerSpeedDown: ii.BooleanBV = null;
    
    // 需要根据 game 进行同步的状态
    private get isAutoCollecting(): boolean { return this.m_Ju.isAutoCollectingBV.v }
    private get isAllPokersOpen(): boolean { return this.m_Ju.isAllPokersOpenBV.v }
    private get isAutoPlaying(): boolean { return this.m_Ju.isAutoPlayingBV.v }
    private get isPlayerOpened(): boolean { return this.m_Ju.isPlayerOpenedBV.v }
    private get hasUndoCmd(): boolean { return this.m_Ju.undoLengthBV.v > 0 }
    private get hasNext(): boolean { return this.m_Ju.hasNextBV.v }
    private get isGameWin(): boolean { return this.m_Ju.isGameWinBV.v  }
    private get isGameLose(): boolean { return this.m_Ju.isGameLoseBV.v }
    private get isVegasMode(): boolean { return this.m_Ju.isVegasMode }

    private m_Ju: SolitaireJu = null;
    private UpdateStatus() {
        this.isShowUIAutoCollect.v = (!this.isAutoCollecting) && (!this.isAutoPlaying) && (!this.isPlayerOpened) 
                                        && this.isAllPokersOpen && (!this.isGameWin) && (!this.isGameLose)
                                        && (!this.isVegasMode)
        this.isShowUIUndo.v = (!this.isAutoPlaying) && (!this.isAutoCollecting) && this.hasUndoCmd && (!this.isGameWin) && (!this.isGameLose)
        this.isShowUIPlayer.v = this.isPlayerOpened && (!this.isAutoCollecting) && (!this.isGameWin) && (!this.isGameLose)
        this.isShowUIPlayerStart.v = !this.isAutoPlaying
        this.isShowUIPlayerPause.v = this.isAutoPlaying
        this.isShowUIPlayerPreStep.v = this.isPlayerOpened && (!this.isAutoPlaying) && this.hasUndoCmd
        this.isShowUIPlayerNextStep.v = this.isPlayerOpened && (!this.isAutoPlaying) && this.hasNext
        this.isShowUIBlockInput.v = (this.isAutoPlaying || this.isAutoCollecting) && (!this.isGameWin) && (!this.isGameLose)
        this.isShowUIExpand.v = this.m_IsExpandedBV.v && (!this.isAutoCollecting)
        this.isShowUIPlayerSpeedUp.v = this.isAutoPlaying && !SolitaireLogic.player.IsMaxSpeed()
        this.isShowUIPlayerSpeedDown.v = this.isAutoPlaying && !SolitaireLogic.player.IsMinSpeed()
    }
    private RefreshUI_HelpAD() {
        //this.helpADIconNode.active = ii.App.ins.p.ad.RewardedVideoBV.v && !this.m_Ju.isHelpedBV.v && SolitaireLogic.dataCache.helpBV.v === 0;
        this.mui_HelpDotNode.active = SolitaireLogic.dataCache.helpBV.v > 0;
    }

    protected OnCreate(): void {
        this.m_IsExpandedBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIAutoCollect = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIUndo = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIPlayer = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIPlayerStart = ii.BooleanBV.Borrow(true).ReturnBy(this);
        this.isShowUIPlayerPause = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIPlayerPreStep = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIPlayerNextStep = ii.BooleanBV.Borrow(true).ReturnBy(this);
        this.isShowUIBlockInput = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIExpand = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIPlayerSpeedUp = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isShowUIPlayerSpeedDown = ii.BooleanBV.Borrow(false).ReturnBy(this);

        this.SetUserData("K_AUTO_PLAYER_POSITION", this.autoPlayerRoot.position);
        this.SetUserData("K_EXPAND_NODE_POSITION", this.expandActionNode.position);
    }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: any): void {
        this.SetIIClickHandler("OnThemes", this.OnThemes.bind(this));
        this.SetIIClickHandler("OnHint", this.OnHint.bind(this));
        this.SetIIClickHandler("OnNewGame", this.OnNewGame.bind(this));
        this.SetIIClickHandler("OnUndo", this.OnUndo.bind(this));
        this.SetIIClickHandler("OnHelp", this.OnHelp.bind(this));
        this.SetIIClickHandler("OnHelpCancel", this.OnHelpCancel.bind(this));
        this.SetIIClickHandler("OnHelpNextStep", this.OnHelpNextStep.bind(this));
        this.SetIIClickHandler("OnHelpPreStep", this.OnHelpPreStep.bind(this));
        this.SetIIClickHandler("OnHelpStart", this.OnHelpStart.bind(this));
        this.SetIIClickHandler("OnHelpPause", this.OnHelpPause.bind(this));
        this.SetIIClickHandler("OnHelpSpeedUp", this.OnHelpSpeedUp.bind(this));
        this.SetIIClickHandler("OnHelpSpeedDown", this.OnHelpSpeedDown.bind(this));
        this.SetIIClickHandler("OnAutoCollect", this.OnAutoCollect.bind(this));
        this.SetIIClickHandler("OnExpand", this.OnExpand.bind(this));
        this.mui_HintDotNode.active = false;
        this.mui_ThemesDotNode.active = false;
        this.mui_NewGameDotNode.active = false;
    }
    Enter(ju: SolitaireJu) {
        this.m_Ju = ju;
        ju.AddEventListener(this);
    }
    Exit(ju: SolitaireJu) {
        ju.RemoveEventListener(this)
        this.UnbindAllBV();
    }
    get SolitaireJuEventTarget(): any { return this.node; }
    OnSolitaireDesktopEvent(ju: SolitaireJu, eventTyp: SolitaireEvent, data?: any): void {
        switch (eventTyp) {
            case SolitaireEvent.SC_UI_SUBSCRIB: this.SubScribModelEvents(ju); break;
            default: break;
        }
    }
    private SubScribModelEvents(ju: SolitaireJu) {
        this.BindBV(ii.App.ins.p.ad.RewardedVideoBV, isReady => this.RefreshUI_HelpAD(), false);
        this.BindBV(ju.isHelpedBV, helped => this.RefreshUI_HelpAD(), true);
        // 监听模型数据变化，更新当前页面所需的状态数据
        this.BindBV(ju.isAutoCollectingBV, v => this.UpdateStatus(), false)
        this.BindBV(ju.isAllPokersOpenBV, v => this.UpdateStatus(), false)
        this.BindBV(ju.isAutoPlayingBV, v => this.UpdateStatus(), false)
        this.BindBV(ju.isPlayerOpenedBV, v => this.UpdateStatus(), false)
        this.BindBV(ju.hasNextBV, v => this.UpdateStatus(), false)
        this.BindBV(ju.isGameWinBV, v => this.UpdateStatus(), false)
        this.BindBV(ju.isGameLoseBV, v => this.UpdateStatus(), false)
        this.BindBV(this.m_IsExpandedBV, v => this.UpdateStatus(), false)
        this.BindBV(SolitaireLogic.player.autoSpeedBV, v => {
            this.UpdateStatus()
            this.speedProgress.width = this.speedProgress.parent.width * v / SolitaireLogic.player.MaxSpeed;
        }, true)
        this.BindBV(ju.undoLengthBV, v => {
            this.UpdateStatus();
            this.undoCountLabel.string = `${v}`;
            this._undoRoot.active = v > 0;
        }, true)
        this.BindBV(SolitaireLogic.dataCache.helpBV, helps => {
            this.helpCountLabel.string = `${helps}`;
            this.RefreshUI_HelpAD();
        }, true);

        this.BindBV(this.isShowUIAutoCollect, isShow => this.autoCollectNode.active = isShow, true)
        this.BindBV(this.isShowUIPlayer, isShow => ii.UIUtil.moveAction(this.autoPlayerRoot, isShow, this.GetUserData("K_AUTO_PLAYER_POSITION"), 0.3), true)
        this.BindBV(this.isShowUIUndo, canUndo => this.preStepAutoPlayNode.active = canUndo, true)
        this.BindBV(this.isShowUIPlayerStart, isShow => this.startAutoPlayNode.active = isShow, true)
        this.BindBV(this.isShowUIPlayerPause, isShow => {
            this.pauseAutoPlayNode.active = isShow;
            this.speedProgressRoot.active = isShow;
        }, true)
        this.BindBV(this.isShowUIPlayerPreStep, isShow => this.preStepAutoPlayNode.active = isShow, true)
        this.BindBV(this.isShowUIPlayerNextStep, isShow => this.nextStepAutoPlayNode.active = isShow, true)
        this.BindBV(this.isShowUIBlockInput, isShow => this.blockInput.active = isShow, true)
        this.BindBV(this.isShowUIExpand, isShow => ii.UIUtil.moveAction(this.expandActionNode, isShow, this.GetUserData("K_EXPAND_NODE_POSITION"),0.3), true)
        this.BindBV(this.isShowUIPlayerSpeedUp, isShow => this.mui_SpeedUp.active = isShow, true)
        this.BindBV(this.isShowUIPlayerSpeedDown, isShow => this.mui_SpeedDown.active = isShow, true)
        // 显示菜单栏的逻辑
        this.onGlobal(SolitaireGameDesktopUI.EVENT_GAMEVIEW_POKERS_READY, ()=>this.m_IsExpandedBV.v = true);
        this.m_IsExpandedBV.v = true
    }

    @ii.Util.block(0.6)
    private OnExpand() {
        this.m_IsExpandedBV.v = true;
    }

    @ii.Util.block(0.2)
    private OnAutoCollect() {
        this.m_Ju.AutoCollect(SolitaireLogic.player.kAutoCollectDuration)
    }

    @ii.Util.block(0.2)
    private OnThemes() {
        ii.UIMgr.ins.Open(SolitairePrefabCfg.pfb.panel.SolitaireThemesUIPanel.key);
    }
    
    @ii.Util.block(0.3)
    private OnHint() {
        SolitaireLogic.UseHint(this.m_Ju);
    }
    
    @ii.Util.block(0.2)
    private OnNewGame() {
        ii.UIMgr.ins.Open<UINewGameArgs>(SolitairePrefabCfg.pfb.panel.UINewGame.key, {
            ju: this.m_Ju
        });
    }

    private OnUndo() { this.m_Ju.Undo() }
    
    @ii.Util.block(0.5)
    private OnHelp() {
        SolitaireLogic.UseAutoPlayer(this.m_Ju);
    }    

    //#region 自动玩牌播放器
    @ii.Util.block(0.2)
    private OnHelpCancel() {
        this.m_Ju.StopAutoPlay()
        this.m_Ju.isPlayerOpenedBV.v = false;
    }

    @ii.Util.block(0.05)
    private OnHelpPreStep() {
        this.m_Ju.Undo(true)
    }

    @ii.Util.block(0.05)
    private OnHelpNextStep() {
        this.m_Ju.NextStep()
    }

    @ii.Util.block(0.3)
    private OnHelpStart() {
        this.m_Ju.AutoPlay(SolitaireLogic.player.AutoPlayInterval)
    }

    @ii.Util.block(0.2)
    private OnHelpPause() {
        this.m_Ju.StopAutoPlay()
    }

    @ii.Util.block(0.2)
    private OnHelpSpeedUp() {
        SolitaireLogic.player.SpeedUp(this.m_Ju);
    }

    @ii.Util.block(0.2)
    private OnHelpSpeedDown() {
        SolitaireLogic.player.SpeedDown(this.m_Ju)
    }
    //#endregion 自动玩牌播放器
}