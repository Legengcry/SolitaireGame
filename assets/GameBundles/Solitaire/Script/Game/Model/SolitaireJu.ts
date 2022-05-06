import Poker from "./Poker"
import PokerGroup, { IPokerGroupEventListener } from "./PokerGroup"
import { ELocation, EPokerStatus, EGameType, ESuit } from "../../SolitaireEnums"
import { SolitaireEvent } from "../../SolitaireEvent"
import { Cmd, CmdChange, CmdStack, EActionType, EChangeType, ETOperationHint, ETUndoCmd, OperationHint, SnapCmd, SnapData, SolitaireDataBattleResult } from "../SolitaireType"
import { TSolitaireTestData } from "./SolitaireTestData"

type AUTO_RUN_CALLBACK = (isFinished: boolean, seed: number, gameModel: SolitaireJu)=>void

export interface ISolitaireJuEventListener {
    SolitaireJuEventTarget: any;
    OnSolitaireDesktopEvent(desktop: SolitaireJu, eventTyp: SolitaireEvent, data?: any): void;
}

export class SolitaireJu extends ii.Entity implements IPokerGroupEventListener{
    static readonly event = {
        EVENT_LEVEL_MODEL_USING_HINT: "EVENT_LEVEL_MODEL_USING_HINT"
    }
    readonly flipCloseCardsCountBV: ii.NumberBV = ii.NumberBV.Borrow(0); /** Close 区域翻的次数 */
    //#region //! 连续收牌音效递进
    readonly foundationCounts: ii.NumberBV = ii.NumberBV.Borrow(-1)
    private __AddFoundationsCount() { this.foundationCounts.v += 1 }
    private __StopFoundationsCount() { this.foundationCounts.SetValueWithoutNotification(-1); }
    //#endregion 连续收牌音效递进

    //#region //! 创建一局时所需数据
    private _isCard3Mode: boolean = false
    get isCard3Mode(): boolean { return this._isCard3Mode }
    private _isVegasMode: boolean = false
    get isVegasMode(): boolean { return this._isVegasMode }
    private cardMode: number = 1
    private _gameType: EGameType = EGameType.EASY;
    get gameType(): EGameType { return this._gameType; }
    //#endregion

    //#region //! 对外事件的绑定机制
    AddEventListener(listener: ISolitaireJuEventListener) { this.on("__g_SolitaireJuEvent", listener.OnSolitaireDesktopEvent.bind(listener, this), listener.SolitaireJuEventTarget); }
    RemoveEventListener(listener: ISolitaireJuEventListener) { this.targetOff(listener.SolitaireJuEventTarget); }
    private NotifyGameEvent(eventTyp: SolitaireEvent, arg1?, arg2?, arg3?, arg4?) { this.emit("__g_SolitaireJuEvent", eventTyp, arg1, arg2, arg3, arg4); }
    //#endregion

    private readonly _CONST_SHUFFLE: number = 256 // 洗牌次数 256 次，不允许改变
    private m_Rander: ii.MCGRand = null
    get Seed(): number { return this.m_Rander.seed }
    private _receiveGroups: PokerGroup[] = []
    private _playGroups: PokerGroup[] = []
    private _closeAreaGroup: PokerGroup = null
    private _openAreaGroup: PokerGroup = null
    get CloseAreaGroup(): PokerGroup { return this._closeAreaGroup; }
    get OpenAreaGroup(): PokerGroup { return this._openAreaGroup; }
    get PlayGroups(): PokerGroup[] { return this._playGroups; }
    get ReceiveGroups(): PokerGroup[] { return this._receiveGroups; }

    private _pokers: Poker[] = [] /* 所有扑克的原始数据 */
    private getPoker(point: number, suit: number) { return this._pokers[(point-1)*4 + suit] }
    
    getPlayGroup(playIndex: number): PokerGroup { return this._playGroups[playIndex] }
    getReceiveGroup(receiveIndex: number): PokerGroup { return this._receiveGroups[receiveIndex] }
    getOpenGroupPoker(index: number) { return this._openAreaGroup.GetPoker(index) }
    getCloseGroupPoker(index: number) { return this._closeAreaGroup.GetPoker(index) }

    //#region  //! IPokerGroupEventListener
    OnGroupPokerStateChanged(poker: Poker, status: EPokerStatus){
        this.__refreshAllPokerOpenStatus()
        if(poker.location === ELocation.PLAY && status === EPokerStatus.OPEN) {
            this.NotifyGameEvent(SolitaireEvent.SC_FLIP_POKER, poker)
        }
    }
    //#endregion

    //#region //! Entity 生命周期
    constructor(gameType: EGameType, isVegasMode: boolean, isCard3Mode: boolean) {
        super();
        this._gameType = gameType;
        this._isCard3Mode = isCard3Mode
        this._isVegasMode = isVegasMode
        this.cardMode = this._isCard3Mode ? 3 : 1
        this.hasNextBV = ii.BooleanBV.Borrow(true).ReturnBy(this);
        this.isHintedBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isHelpedBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isPlayerOpenedBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isAutoPlayingBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.hasUsedUndo = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.scoreBV = ii.NumberBV.Borrow(this._isVegasMode ? 0 : 1000).ReturnBy(this);
        this.isContinueBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this.isGameLoseBV = ii.BooleanBV.Borrow(false).ReturnBy(this);

        this.hasNextBV.Bind(v => this.__UpdateGameLose(), true, this);
        this.isContinueBV.Bind(v => this.__UpdateGameLose(), true, this);
    }

    Reset() {
        this.SetTimerActive(false);
        this._playGroups.forEach(g=>g.targetOff(this));
    }

    Enter(seed: number) {
        let snapData: SnapData = {
            resume: false,
            vegas: this._isVegasMode,
            card3: this._isCard3Mode,
            seed: seed,
            tick: 0,
            hinted: false,
            helped: false,
            player: false,
            undo: false,
        }
        this.EnterWithSnap(snapData)
    }

    Exit() {
        this.Return();
    }

    EnterWithTestData(testData: TSolitaireTestData) {
        this.m_Rander = new ii.MCGRand(0)
        this.scoreBV.SetValueWithoutNotification(this._isVegasMode ? 0 : 1000);
        this.hasNextBV.SetValueWithoutNotification(true);
        this.resetMoveStepCount(0);
        this.isHelpedBV.SetValueWithoutNotification(true);
        this.isHintedBV.SetValueWithoutNotification(true);
        this.isPlayerOpenedBV.v = true;
        this.hasUsedUndo.SetValueWithoutNotification(false);
        
        this._gameTime = 0;
        this.SetTimerActive(true)

        this._closeAreaGroup = new PokerGroup(ELocation.CLOSE).ReturnBy<PokerGroup>(this);
        this._closeAreaGroup.AddEventListener(this);
        
        this._openAreaGroup = new PokerGroup(ELocation.OPEN).ReturnBy<PokerGroup>(this);
        this._openAreaGroup.AddEventListener(this);

        for (let i = 0; i < 4; ++i) {
            let pokerGroup = new PokerGroup(ELocation.RECEIVE).ReturnBy<PokerGroup>(this);
            pokerGroup.index = this._receiveGroups.length
            this._receiveGroups.push(pokerGroup)
        }
        for (let i = 0; i < 7; ++i) {
            let pokerGroup = new PokerGroup(ELocation.PLAY).ReturnBy<PokerGroup>(this);
            pokerGroup.index = this._playGroups.length
            this._playGroups.push(pokerGroup)
            pokerGroup.AddEventListener(this);
        }
        
        // 牌局策略
        this.m_strategyFn = this.__CreateStrategyFunc()

        // 初始化扑克数据
        testData.receives.forEach((receive, receiveIndex) => {
            receive.forEach(p => {
                let poker = new Poker(p[1], p[0], p[2])
                poker.initLocation = ELocation.RECEIVE;
                this._pokers.push(poker)
                this._receiveGroups[receiveIndex].AddPoker(poker)
            })
        });
        testData.plays.forEach((play, playIndex) => {
            play.forEach(p => {
                let poker = new Poker(p[1], p[0], p[2])
                poker.initLocation = ELocation.PLAY;
                this._pokers.push(poker)
                this._playGroups[playIndex].AddPoker(poker)
            })
        });
        testData.open.forEach(p => {
            let poker = new Poker(p[1], p[0], p[2])
            poker.initLocation = ELocation.OPEN;
            this._pokers.push(poker)
            this._openAreaGroup.AddPoker(poker);
        });
        testData.close.forEach(p => {
            let poker = new Poker(p[1], p[0], p[2])
            poker.initLocation = ELocation.CLOSE;
            this._pokers.push(poker)
            this._closeAreaGroup.AddPoker(poker);
        });

        // 派发初始化牌局的事件
        this.NotifyGameEvent(SolitaireEvent.SC_INIT, this._pokers)

        // 通知 UI 层,发生变化
        this.NotifyGameEvent(SolitaireEvent.SC_PLAY, this)

        // 否则在这里才开始订阅
        this.NotifyGameEvent(SolitaireEvent.SC_UI_SUBSCRIB)

        // UI 刷新所有 Poker 位置
        this.NotifyGameEvent(SolitaireEvent.SC_REFRESH_POKERS, this._pokers)

        // 游戏胜利绑定
        this.BindBV(this.isGameWinBV, win => {
            if(win){
                this.PauseTimer()
            }
        }, true)

        this.BindBV(this.isGameLoseBV, lose => {
            if(lose){
                this.PauseTimer()
            }else{
                this.ResumeTimer()
            }
        }, true)
    }

    EnterWithSnap(snapData: SnapData) {        
        this.m_Rander = new ii.MCGRand(snapData.seed)
        console.log(`Seed: ${this.m_Rander.seed} Vegas: ${this._isVegasMode} 3Cards: ${this._isCard3Mode}`);
        this.scoreBV.SetValueWithoutNotification(this._isVegasMode ? 0 : 1000);
        this.hasNextBV.SetValueWithoutNotification(true);
        this.resetMoveStepCount(0);
        this.isHelpedBV.SetValueWithoutNotification(snapData.helped);
        this.isHintedBV.SetValueWithoutNotification(snapData.hinted);
        this.isPlayerOpenedBV.v = snapData.player;
        this.hasUsedUndo.SetValueWithoutNotification(snapData.undo);
        
        this._gameTime = snapData.tick;
        this.SetTimerActive(true)

        this._closeAreaGroup = new PokerGroup(ELocation.CLOSE).ReturnBy<PokerGroup>(this);
        this._closeAreaGroup.AddEventListener(this);
        
        this._openAreaGroup = new PokerGroup(ELocation.OPEN).ReturnBy<PokerGroup>(this);
        this._openAreaGroup.AddEventListener(this);

        for (let i = 0; i < 4; ++i) {
            let pokerGroup = new PokerGroup(ELocation.RECEIVE).ReturnBy<PokerGroup>(this);
            pokerGroup.index = this._receiveGroups.length
            this._receiveGroups.push(pokerGroup)
        }
        for (let i = 0; i < 7; ++i) {
            let pokerGroup = new PokerGroup(ELocation.PLAY).ReturnBy<PokerGroup>(this);
            pokerGroup.index = this._playGroups.length
            this._playGroups.push(pokerGroup)
            pokerGroup.AddEventListener(this);
        }
        
        // 牌局策略
        this.m_strategyFn = this.__CreateStrategyFunc()

        // 初始化扑克数据
        for (let point = 1; point <= 13; ++point) {
            for (let suit = 0; suit < 4; ++suit) {
                let poker = new Poker(point, suit, EPokerStatus.CLOSE)
                this._pokers.push(poker)
            }
        }

        // 派发初始化牌局的事件
        this.NotifyGameEvent(SolitaireEvent.SC_INIT, this._pokers)

        // 将牌放到了发牌区
        for(let i= this._pokers.length-1; i>=0; --i){
            this._pokers[i].initLocation = ELocation.CLOSE
            this._pokers[i].initStatus = EPokerStatus.CLOSE
            this._closeAreaGroup.AddPoker(this._pokers[i])
        }

        // 洗牌
        this.__shufflePokers(this._closeAreaGroup.pokers)

        if(!snapData.resume){
            // 非常重要，这里通知 UI 可以订阅数据库事件
            this.NotifyGameEvent(SolitaireEvent.SC_UI_SUBSCRIB, this)
        }

        // 通知 UI 层,发生变化
        this.NotifyGameEvent(SolitaireEvent.SC_PLAY, this)
        // 发牌
        let pokers = []
        for (let cards = 7; cards >= 1; --cards) {
            for (let i = 0; i < cards; ++i) {
                let playIndex = 7 - cards + i
                let group: PokerGroup = this._playGroups[playIndex]
                let poker = this._closeAreaGroup.RemoveTop()
                poker.initLocation = ELocation.PLAY
                poker.status = i === 0 ? EPokerStatus.OPEN : EPokerStatus.CLOSE
                poker.initStatus = poker.status
                group.AddPoker(poker)
                pokers.push(poker)
            }
        }
        if(!snapData.resume){
            // 派发通知
            this.NotifyGameEvent(SolitaireEvent.SC_SEND_POKERS, pokers)
        }

        if(snapData.resume) {
            // 通过操作来初始化
            this.RedoCmds(snapData.cmds)

            // 否则在这里才开始订阅
            this.NotifyGameEvent(SolitaireEvent.SC_UI_SUBSCRIB)

            // UI 刷新所有 Poker 位置
            this.NotifyGameEvent(SolitaireEvent.SC_REFRESH_POKERS, this._pokers)
        }

        // 游戏胜利绑定
        this.BindBV(this.isGameWinBV, win => {
            if(win){
                this.PauseTimer()
            }
        }, true)

        this.BindBV(this.isGameLoseBV, lose => {
            if(lose){
                this.PauseTimer()
            }else{
                this.ResumeTimer()
            }
        }, true)
    }

    Snap(): SnapData {
        let snapData: SnapData = {
            gameType: this._gameType,
            resume: true,
            vegas: this._isVegasMode,
            card3: this._isCard3Mode,
            seed: this.Seed,
            cmds: this.SnapUndoCmds(),
            tick: this._gameTime,
            score: this.scoreBV.v,
            helped: this.isHelpedBV.v,
            player: this.isPlayerOpenedBV.v,
            hinted: this.isHintedBV.v,
            undo: this.hasUsedUndo.v,
        }
        return snapData
    }
    
    private __shufflePokers(pokers: Poker[]) {
        for (let i = 0; i < this._CONST_SHUFFLE; ++i) {
            let sIdx = this.m_Rander.range(0, pokers.length-1)
            let eIdx = this.m_Rander.range(0, pokers.length-1)
            let tmpVal = pokers[sIdx]
            pokers[sIdx] = pokers[eIdx]
            pokers[eIdx] = tmpVal
        }
    } 
    //#endregion

    //#region //! 游戏计时 Timer
    private _gameTime: number = 0;
    get gameTime(): number { return this._gameTime; }
    private _isTimerActive: boolean = false;
    private _isPauseTimer: boolean = false;
    private SetTimerActive(active: boolean) { this._isTimerActive = active; }
    private PauseTimer() { this._isPauseTimer = true; }
    private ResumeTimer() { this._isPauseTimer = false; }
    Tick() {
        if((!this._isPauseTimer) && this._isTimerActive) {
            this._gameTime = this._gameTime+1;
            this.NotifyGameEvent(SolitaireEvent.SC_TIME_CHANGED, this._gameTime);
        }
    }
    //#endregion 游戏计时 Timer

    //#region //! 游戏失败相关
    /**
     * 失败的条件是：用户未点击 Continue，并且没有下一步可走
     */
    hasNextBV: ii.BooleanBV = null; /** 没有下一步可走 */
    isContinueBV: ii.BooleanBV = null; /** 失败页面弹出后，点击了继续按钮 */
    isGameLoseBV: ii.BooleanBV = null;
    private UpdateHasNextStep() { this.hasNextBV.v = this.__DoNextStep(true) } /** 这里涉及到结算，位置要放到最后 */
    private __UpdateGameLose() {
        let pre = this.isGameLoseBV.v;
        this.isGameLoseBV.v = (!this.isGameWinBV.v) && (!this.isContinueBV.v) && (!this.hasNextBV.v);
        let cur = this.isGameLoseBV.v;
        if(cur && (cur !== pre)) {
            this.NotifyGameEvent(SolitaireEvent.SC_LOSE);
        }
    }
     //#endregion 游戏失败相关

     //#region //! 游戏胜利
    readonly isGameWinBV: ii.BooleanBV = ii.BooleanBV.Borrow(false)
    private __CheckGameWin() {
        if(this.isGameWinBV.v) {
            return;
        }
        for(let receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            let rpg = this._receiveGroups[receiveIndex]
            if(!(rpg.top && rpg.top.point === 13)){
                return
            }
        }
        this.isGameWinBV.v = true;
        this.NotifyGameEvent(SolitaireEvent.SC_WIN);
    }
    //#endregion 游戏胜利

    //#region //! 【移动步数】 【翻牌、收牌计分】 【最终得分】
    // 【移动步数】
    readonly moveStepCountBV: ii.NumberBV = ii.NumberBV.Borrow(0)
    private UpdateMoveStep(ignoreStep: boolean) {
        this.m_IsStepOperationHintCalculated = false
        if(!ignoreStep){
            ++this.moveStepCountBV.v;
        }else{
            --this.moveStepCountBV.v;
        }
    }
    private resetMoveStepCount(count: number) {
        this.m_IsStepOperationHintCalculated = false
        this.moveStepCountBV.v = count
        this.UpdateScore()
    }

    // 【翻牌、收牌计分】
    private pokerReceiveScoreBV: ii.NumberBV = ii.NumberBV.Borrow(0)
    private ChangeReceiveScore(change: number) {
        this.pokerReceiveScoreBV.v += change
    }
    private vegasReceiveScoreBV: ii.NumberBV = ii.NumberBV.Borrow(0)
    private ChangeVegasReceiveScore(change: number) {
        this.vegasReceiveScoreBV.v += change
    }
    // 【最终得分】
    scoreBV: ii.NumberBV = null;
    private UpdateScore(notUpdateScore: boolean = false) {
        if(notUpdateScore) {
            return
        }
        if(this._isVegasMode){
            this.scoreBV.v = this.vegasReceiveScoreBV.v
        }else{
            this.scoreBV.v = this.pokerReceiveScoreBV.v + (1000 - this.moveStepCountBV.v)
        }
    }
    //#endregion

    //#region
    /*********************************************************************/
    // 操作提示功能
    // 描述：玩家点击【提示】，获取备选的操作列表，按照策略选择其中之一，并执行
    /*********************************************************************/
    /// 功能：界面调用此接口
    private m_OperationHintIndex: number = 0
    private m_OperationHintList: OperationHint[] = []
    private m_IsStepOperationHintCalculated = false /* 当前步骤是否预计算完毕（主要用于提示） */
    private __UpdateOperationHintStatus() {
        if(!this.m_IsStepOperationHintCalculated) {
            this.m_OperationHintList = this.__CalculateOperationHints()
            this.m_OperationHintIndex = 0
            this.m_IsStepOperationHintCalculated = true
        }
    }
    HasOperationHint(): boolean {
        this.__UpdateOperationHintStatus()
        return this.m_OperationHintList.length > 0
    }
    DoOperationHint(): OperationHint {
        this.__UpdateOperationHintStatus()
        console.assert(this.HasOperationHint())
        let index = this.m_OperationHintIndex
        this.m_OperationHintIndex = (this.m_OperationHintIndex+1)%this.m_OperationHintList.length;
        return this.m_OperationHintList[index]
    }
    // 计算当前可提示的步骤列表
    private __CalculateOperationHints(): OperationHint[] {
        let hints: OperationHint[] = []
        // PLAY_TO_PLAY
        for(let toPlayIndex=0; toPlayIndex <7; ++toPlayIndex){
            let toPlayGroup = this._playGroups[toPlayIndex]
            for(let fromPlayIndex=0; fromPlayIndex <7; ++fromPlayIndex){
                let fromPlayGroup = this._playGroups[fromPlayIndex]
                if(!fromPlayGroup.IsPokersEmpty() && toPlayGroup.IsConcatPoker(fromPlayGroup.rootOpenPoker)){
                    hints.push({
                        type: ETOperationHint.PLAY_TO_PLAY,
                        from: fromPlayIndex,
                        to: toPlayIndex
                    })
                }
            }
        }
        // PLAY_TO_RECEIVE
        for(let fromPlayIndex=0; fromPlayIndex <7; ++fromPlayIndex){
            let fromPlayGroup = this._playGroups[fromPlayIndex]
            if(!fromPlayGroup.IsPokersEmpty()){
                for(let toReceiveIndex=0; toReceiveIndex <4; ++toReceiveIndex){
                    let toReceiveGroup = this._receiveGroups[toReceiveIndex]
                    if(toReceiveGroup.IsNextPoker(fromPlayGroup.top)){
                        hints.push({
                            type: ETOperationHint.PLAY_TO_RECEIVE,
                            from: fromPlayIndex,
                            to: toReceiveIndex
                        })
                        // Receive 可以接受 Play 以后， 不用再遍历其他的 Receive 区域
                        break;
                    }
                }
            }
        }
        // OPEN_TO_RECEIVE
        if(this._openAreaGroup.top){
            for(let toReceiveIndex=0; toReceiveIndex <4; ++toReceiveIndex){
                let toReceiveGroup = this._receiveGroups[toReceiveIndex]
                if(toReceiveGroup.IsNextPoker(this._openAreaGroup.top)){
                    hints.push({
                        type: ETOperationHint.OPEN_TO_RECEIVE,
                        to: toReceiveIndex
                    })
                }
            }
        }
        // OPEN_TO_PLAY
        if(this._openAreaGroup.top){
            for(let toPlayIndex=0; toPlayIndex <7; ++toPlayIndex){
                let toPlayGroup = this._playGroups[toPlayIndex]
                if(toPlayGroup.IsConcatPoker(this._openAreaGroup.top)){
                    hints.push({
                        type: ETOperationHint.OPEN_TO_PLAY,
                        to: toPlayIndex
                    })
                }
            }
        }
        // CLOSE_TO_OPEN
        if(!this._closeAreaGroup.IsPokersEmpty()) {
            hints.push({
                type: ETOperationHint.CLOSE_TO_OPEN
            })
        }
        // OPEN_TO_CLOSE
        if((!this._openAreaGroup.IsPokersEmpty()) && this._closeAreaGroup.IsPokersEmpty() && this.IsCanReflip()){
            hints.push({
                type: ETOperationHint.OPEN_TO_CLOSE
            })
        }
        // RECEIVE_TO_PLAY
        for(let toPlayIndex=0; toPlayIndex <7; ++toPlayIndex){
            let toPlayGroup = this._playGroups[toPlayIndex]
            for(let fromReceiveIndex=0; fromReceiveIndex <4; ++fromReceiveIndex){
                let fromReceiveGroup = this._receiveGroups[fromReceiveIndex]
                if(!fromReceiveGroup.IsPokersEmpty() && toPlayGroup.IsConcatPoker(fromReceiveGroup.top)){
                    hints.push({
                        type: ETOperationHint.RECEIVE_TO_PLAY,
                        from: fromReceiveIndex,
                        to: toPlayIndex
                    })
                }
            }
        }

        return hints
    }

    isHintedBV: ii.BooleanBV = null; /* 是否提示过次数 */
    //#endregion

    //#region User Input Event Handler
    OnPlayPokerClick(poker: Poker) {
        console.assert(poker.status === EPokerStatus.OPEN && poker.location === ELocation.PLAY)
        if (poker.isTop) {
            // 1. 尝试放到 Receive 区域,必须从 0 开始遍历
            for (let receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
                let rpg: PokerGroup = this._receiveGroups[receiveIndex]
                if (rpg.IsNextPoker(poker)) {
                    return this.__MoveFromPlayToReceive(poker, receiveIndex)
                }
            }
            // 2. 尝试放到 Play 区域的其他组
            for (let playIndex = 0; playIndex < 7; ++playIndex) {
                if(this._playGroups[playIndex].IsConcatPoker(poker)) {
                    return this.__MoveFromPlayToPlay(poker, playIndex)
                }
            }
            this.NotifyGameEvent(SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker)
        }else{
            // 非顶部牌,但是翻开着的牌,只有 Play 区域可以承接
            for (let playIndex = 0; playIndex < 7; ++playIndex) {
                let pgp: PokerGroup = this._playGroups[playIndex]
                if(pgp.IsConcatPoker(poker)) {
                    return this.__MoveFromPlayToPlay(poker, playIndex)
                }
            }
            this.NotifyGameEvent(SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker)
        }
    }
    OnClosePokerClick(poker: Poker) {
        this.__MoveFromCloseToOpen(poker)
    }
    OnReceivePokerClick(poker: Poker) {
        console.assert(poker.group.top === poker)
        for (let receiveIndex = 0; receiveIndex < 7; ++receiveIndex) {
            let pgp: PokerGroup = this._playGroups[receiveIndex]
            if(pgp.IsConcatPoker(poker)) {
                return this.__MoveFromReceiveToPlay(poker, receiveIndex)
            }
        }
        this.NotifyGameEvent(SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker)
    }
    OnOpenPokerClick(poker: Poker) {
        console.assert((poker.location === ELocation.OPEN) && poker.isTop)
        // 逻辑是：
        // 1. 如果这张牌,可以放到收牌区,那么就移动到收牌区
        // 询问收牌区是否可以承接此牌,必须从 0 开始遍历
        for (let receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            let rpg: PokerGroup = this._receiveGroups[receiveIndex]
            if (rpg.IsNextPoker(poker)) {
                return this.__MoveFromOpenToReceive(poker, receiveIndex)
            }
        }

        // 2. 如果 Play 区域有可以承接此牌的组,那么将 poker 移动到该组
        for (let playIndex = 0; playIndex < 7; ++playIndex) {
            let ppg: PokerGroup = this._playGroups[playIndex]
            if (ppg.IsConcatPoker(poker)) {
                return this.__MoveFromOpenToPlay(poker, playIndex)
            }
        }

        // 派发点击无效的消息
        this.NotifyGameEvent(SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker)
    }
    OnClickCloseBottom() {
        if(this.IsCanReflip()){
            this.__MoveFromOpenToClose()
        }
    }
    OnDragToReceive(poker: Poker, receiveIndex: number) {
        if(poker.isTop){
            let rpg: PokerGroup = this._receiveGroups[receiveIndex]
            if (rpg.IsNextPoker(poker)) {
                // 做连接的数据操作
                let parent: PokerGroup = poker.group
                if(poker.location === ELocation.PLAY){
                    return this.__MoveFromPlayToReceive(poker, receiveIndex, EActionType.DRAG)
                }else if(poker.location === ELocation.OPEN){
                    return this.__MoveFromOpenToReceive(poker, receiveIndex, EActionType.DRAG)
                }else{
                    return this.__MoveFromReceiveToReceive(poker, receiveIndex, EActionType.DRAG)
                }
            }
        }
        this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_NO_CHANGE, poker)
    }
    OnDragToPlay(poker: Poker, playIndex: number) {
        if(poker.isTop){
            // 移动一张牌
            let playGroup: PokerGroup = this._playGroups[playIndex]
            if(playGroup.IsConcatPoker(poker)){
                if(poker.location == ELocation.PLAY){
                    this.__MoveFromPlayToPlay(poker, playIndex, EActionType.DRAG)
                }else if(poker.location === ELocation.RECEIVE){
                    this.__MoveFromReceiveToPlay(poker, playIndex, EActionType.DRAG)
                }else{
                    this.__MoveFromOpenToPlay(poker, playIndex, EActionType.DRAG)
                }
            }else{
                this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_NO_CHANGE, poker)
            }
        }else{
            // 移动一组
            console.assert(poker.location == ELocation.PLAY)
            let playGroup: PokerGroup = this._playGroups[playIndex]
            if(playGroup.IsConcatPoker(poker)){
                this.__MoveFromPlayToPlay(poker, playIndex, EActionType.DRAG)
            }else{
                this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_NO_CHANGE, poker)
            }
        }
    }
    IsCanReflip(): boolean{
        return this.__isCanReflipByCount(this.flipCloseCardsCountBV.v)
    }
    private __isCanReflipByCount(_flipCloseCardsCount: number): boolean {
        if(this._isVegasMode){
            if(this._isCard3Mode){
                if(_flipCloseCardsCount >= 2) {
                    return false
                }
            }else{
                return false
            }
        }
        return true
    }
    //#endregion

    //#region //! Move Actions 每一个 __Move 本质对应一个操作
    private __MoveFromPlayToPlay(poker: Poker, toPlayIndex: number, actTyp: EActionType = EActionType.CLICK, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        console.assert(poker.location == ELocation.PLAY)
        let g: PokerGroup = this._playGroups[toPlayIndex]
        if(poker.isTop){
            let originGroup = poker.group
            let isFlip: boolean = originGroup.IsAutoFlipOnRemovePoker(poker)
            let fromIndex = poker.groupIndex
            let toIndex = toPlayIndex

            poker.group.RemoveTop()
            g.AddPoker(poker)
            this.__StopFoundationsCount()

            if(actTyp !== EActionType.UNDO){
                // 记录变化
                let cmd = this.NewCmd(ETUndoCmd.PLAY_TO_PLAY).AddChange({
                    typ: EChangeType.MOVE,
                    poker,
                    fromIndex,
                    toIndex
                })
                if(isFlip){
                    cmd.AddChange({
                        typ: EChangeType.FLIP,
                        poker: originGroup.top,
                        status: EPokerStatus.OPEN
                    })

                    // 翻牌计分
                    console.assert(originGroup.top.initLocation === ELocation.PLAY && originGroup.top.initStatus === EPokerStatus.CLOSE)
                    this.ChangeReceiveScore(5)
                }
            }

            this.UpdateMoveStep(ignoreStep)
            this.UpdateScore(notUpdateScore)

            switch (actTyp) {
                case EActionType.CLICK:
                    this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_PLAY, poker)
                    break;
                case EActionType.DRAG:
                    this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_PLAY, poker)
                    break;
                case EActionType.UNDO:
                    this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY, poker)
                    break;
            }
        }else{
            let originGroup: PokerGroup = poker.group
            let isFlip: boolean = originGroup.IsAutoFlipOnRemovePoker(poker)
            let fromIndex = poker.groupIndex
            let toIndex = toPlayIndex
            let pokers = []
            while(true) {
                let top = originGroup.RemoveTop()
                pokers.push(top)
                if(top == poker){
                    break
                }
            }
            for(let pokerIndex = pokers.length-1; pokerIndex >=0; --pokerIndex){
                let p = pokers[pokerIndex]
                g.AddPoker(p)
            }
            this.__StopFoundationsCount()

            if(actTyp !== EActionType.UNDO){
                // 记录变化
                let cmd = this.NewCmd(ETUndoCmd.PLAY_TO_PLAY).AddChange({
                    typ: EChangeType.MOVE,
                    poker,
                    fromIndex,
                    toIndex
                })
                if(isFlip){
                    cmd.AddChange({
                        typ: EChangeType.FLIP,
                        poker: originGroup.top,
                        status: EPokerStatus.OPEN
                    })

                    // 翻牌计分
                    console.assert(originGroup.top.initLocation === ELocation.PLAY && originGroup.top.initStatus === EPokerStatus.CLOSE)
                    this.ChangeReceiveScore(5)
                }
            }

            this.UpdateMoveStep(ignoreStep)
            this.UpdateScore()

            switch (actTyp) {
                case EActionType.CLICK:
                    this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKERS_FROM_PLAY_TO_PLAY, pokers)
                    break;
                case EActionType.DRAG:
                    this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKERS_FROM_PLAY_TO_PLAY, pokers)
                    break;
                case EActionType.UNDO:
                    this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY, pokers)
                    break;
            }
        }

        this.UpdateHasNextStep()
    }
    private __MoveFromPlayToReceive(poker: Poker, toReceiveIndex: number, actTyp: EActionType = EActionType.CLICK, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        console.assert(poker.location == ELocation.PLAY)
        let originGroup: PokerGroup = poker.group
        let fromIndex = originGroup.index
        let isFlip: boolean = originGroup.IsAutoFlipOnRemovePoker(poker)
        let g: PokerGroup = this._receiveGroups[toReceiveIndex]
        // 做连接的数据操作
        let p = poker.group.RemoveTop()
        console.assert(p === poker)
        g.AddPoker(poker)
        this.__AddFoundationsCount()

        if(actTyp !== EActionType.UNDO){
            // 记录变化
            let cmd = this.NewCmd(ETUndoCmd.PLAY_TO_RECEIVE).AddChange({
                typ: EChangeType.MOVE,
                poker,
                fromIndex,
                toIndex: toReceiveIndex
            })
            if(isFlip){
                cmd.AddChange({
                    typ: EChangeType.FLIP,
                    poker: originGroup.top,
                    status: EPokerStatus.OPEN
                })

                // 翻牌计分
                console.assert(originGroup.top.initLocation === ELocation.PLAY && originGroup.top.initStatus === EPokerStatus.CLOSE)
                this.ChangeReceiveScore(5)
            }
            // 收牌计分
            this.ChangeReceiveScore((poker.initLocation === ELocation.PLAY && poker.initStatus === EPokerStatus.OPEN) ? 15 : 10)
            this.ChangeVegasReceiveScore(5)
        }

        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)

        switch (actTyp) {
            case EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE, poker)
                break;
            case EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE, poker)
                break;
            case EActionType.UNDO:
                this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE, poker)
                break;
        }

        this.__CheckGameWin()
        
        this.UpdateHasNextStep()
    }
    private __MoveFromReceiveToPlay(poker: Poker, toPlayIndex: number, actTyp: EActionType = EActionType.CLICK, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        console.assert(poker.location == ELocation.RECEIVE)
        let originGroup: PokerGroup = poker.group
        let fromIndex = originGroup.index
        let g: PokerGroup = this._playGroups[toPlayIndex]
        let p = poker.group.RemoveTop()
        console.assert(p === poker)
        g.AddPoker(poker)
        this.__StopFoundationsCount()

        if(actTyp !== EActionType.UNDO){
            // 记录变化
            this.NewCmd(ETUndoCmd.RECEIVE_TO_PLAY).AddChange({
                typ: EChangeType.MOVE,
                poker,
                fromIndex,
                toIndex: toPlayIndex
            })
        }

        // 收牌计分
        this.ChangeReceiveScore((poker.initLocation === ELocation.PLAY && poker.initStatus === EPokerStatus.OPEN) ? -15 : -10)
        this.ChangeVegasReceiveScore(-5)

        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)

        switch (actTyp) {
            case EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY, poker)
                break;
            case EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY, poker)
                break;
            case EActionType.UNDO:
                this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY, poker)
                break;
        }

        this.UpdateHasNextStep()
    }
    private __MoveFromOpenToPlay(poker: Poker, toPlayIndex: number, actTyp: EActionType = EActionType.CLICK, ignoreStep: boolean = false) {
        console.assert(poker.location == ELocation.OPEN && (actTyp !== EActionType.UNDO))
        let g: PokerGroup = this._playGroups[toPlayIndex]
        let p = poker.group.RemoveTop()
        console.assert(p === poker)
        g.AddPoker(poker)
        this.__StopFoundationsCount()

        // 记录变化
        this.NewCmd(ETUndoCmd.OPEN_TO_PLAY).AddChange({
            typ: EChangeType.MOVE,
            poker,
            toIndex: toPlayIndex
        })

        // 移动计分
        console.assert(poker.initLocation === ELocation.CLOSE)
        this.ChangeReceiveScore(5)
        
        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore()

        switch (actTyp) {
            case EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_PLAY, poker)
                break;
            case EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_PLAY, poker)
                break;
            case EActionType.UNDO:
                console.error('不可能出现')
                break;
        }

        this.UpdateHasNextStep()
    }
    private __MoveFromOpenToReceive(poker: Poker, toReceiveIndex: number, actTyp: EActionType = EActionType.CLICK, ignoreStep: boolean = false) {
        // console.assert(poker.location == ELocation.OPEN && (actTyp !== EActionType.UNDO))
        let g: PokerGroup = this._receiveGroups[toReceiveIndex]
        poker.group.RemoveTop()
        g.AddPoker(poker)
        this.__AddFoundationsCount()

        // 记录变化
        this.NewCmd(ETUndoCmd.OPEN_TO_RECEIVE).AddChange({
            typ: EChangeType.MOVE,
            poker,
            toIndex: toReceiveIndex
        })

        // 移动计分
        console.assert(poker.initLocation === ELocation.CLOSE)
        this.ChangeReceiveScore(15)
        this.ChangeVegasReceiveScore(5)

        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore()

        switch (actTyp) {
            case EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE, poker)
                break;
            case EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE, poker)
                break;
            case EActionType.UNDO:
                console.error('不可能出现')
                break;
        }

        this.__CheckGameWin()
        
        this.UpdateHasNextStep()
    }
    private __MoveFromReceiveToReceive(poker: Poker, toReceiveIndex: number, actTyp: EActionType = EActionType.CLICK, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        let originGroup: PokerGroup = poker.group
        let fromIndex = originGroup.index
        let g: PokerGroup = this._receiveGroups[toReceiveIndex]
        originGroup.RemoveTop()
        g.AddPoker(poker)

        if(actTyp !== EActionType.UNDO){
            // 记录变化
            this.NewCmd(ETUndoCmd.RECEIVE_TO_RECEIVE).AddChange({
                typ: EChangeType.MOVE,
                poker,
                fromIndex,
                toIndex: toReceiveIndex
            })
        }

        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)

        this.NotifyGameEvent(SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE, poker)

        this.UpdateHasNextStep()
    }
    private __MoveFromCloseToOpen(poker: Poker, ignoreStep: boolean = false) {
        // console.assert((poker.location === ELocation.CLOSE) && poker.isTop)
        if(this._isCard3Mode){
            // 3 cards
            let group = poker.group
            let pokers = []
            let cmd = this.NewCmd(ETUndoCmd.CLOSES_TO_OPEN)
            while(true){
                pokers.push(group.RemoveTop())
                this._openAreaGroup.AddPoker(pokers[pokers.length-1])
                if(pokers.length == 3 || group.IsPokersEmpty()){
                    break
                }
            }
            cmd.AddChange({
                typ: EChangeType.MOVE,
                pokers: pokers,
            })

            this.UpdateMoveStep(ignoreStep)
            this.UpdateScore()

            this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN, pokers)
        }else{
            poker.group.RemoveTop()
            this._openAreaGroup.AddPoker(poker)
    
            // 记录变化
            this.NewCmd(ETUndoCmd.CLOSE_TO_OPEN).AddChange({
                typ: EChangeType.MOVE,
                poker: poker,
            })
            
            this.UpdateMoveStep(ignoreStep)
            this.UpdateScore()

            this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FROM_CLOSE_TO_OPEN, poker)
        }

        this.UpdateHasNextStep()
    }
    private __MoveFromOpenToClose(ignoreStep: boolean = false) {
        if(!this._closeAreaGroup.IsPokersEmpty()){
            return
        }
        this.flipCloseCardsCountBV.v += 1
        let isPokerMove = !this._openAreaGroup.IsPokersEmpty()
        if(!isPokerMove){
            return
        }
        let pokers = []
        while (!this._openAreaGroup.IsPokersEmpty()) {
            let poker = this._openAreaGroup.RemoveTop()
            this._closeAreaGroup.AddPoker(poker)
            pokers.push(poker)
        }

        // 记录变化
        this.NewCmd(ETUndoCmd.OPEN_TO_CLOSE).AddChange({
            typ: EChangeType.MOVE,
            pokers,
        })
        
        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore()

        this.NotifyGameEvent(SolitaireEvent.SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE, pokers)

        this.UpdateHasNextStep()
    }
    private __MoveFromPlayToOpenForUndo(poker: Poker, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        // console.assert(poker.location == ELocation.PLAY)
        poker.group.RemoveTop()
        this._openAreaGroup.AddPoker(poker)

        // 移动计分
        console.assert(poker.initLocation === ELocation.CLOSE)
        this.ChangeReceiveScore(-5)

        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)

        this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN, poker)

        this.UpdateHasNextStep()
    }
    private __MoveFromReceiveToOpenForUndo(poker: Poker, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        // console.assert(poker.location == ELocation.RECEIVE)        
        poker.group.RemoveTop()
        this._openAreaGroup.AddPoker(poker)

        // 移动计分
        console.assert(poker.initLocation === ELocation.CLOSE)
        this.ChangeReceiveScore(-15)
        this.ChangeVegasReceiveScore(-5)

        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)

        this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN, poker)

        this.UpdateHasNextStep()
    }
    // 原操作：一整叠牌移动到 Close 区域
    private __MoveFromCloseToOpenForUndo(pokers: Poker[], ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        let ps = []
        for(let i=pokers.length-1; i>=0; --i){
            let poker = pokers[i]
            this._closeAreaGroup.RemoveTop()
            this._openAreaGroup.AddPoker(poker)
            ps.push(poker)
        }
        this.flipCloseCardsCountBV.v -= 1
        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)
        this.NotifyGameEvent(SolitaireEvent.SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN, ps)
        this.UpdateHasNextStep()
    }
    private __MoveFromOpenToCloseForUndo(poker: Poker, ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        // console.assert(poker.location == ELocation.OPEN)        
        poker.group.RemoveTop()
        this._closeAreaGroup.AddPoker(poker)
        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)
        this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE, poker)
        this.UpdateHasNextStep()
    }
    private __MovePokersFromOpenToCloseForUndo(pokers: Poker[], ignoreStep: boolean = false, notUpdateScore: boolean = false) {
        for(let i = pokers.length-1; i>=0; --i){
            let poker = pokers[i]
            poker.group.RemoveTop()
            this._closeAreaGroup.AddPoker(poker)
        }
        this.UpdateMoveStep(ignoreStep)
        this.UpdateScore(notUpdateScore)
        this.NotifyGameEvent(SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE, pokers)
        this.UpdateHasNextStep()
    }
    //#endregion

     //#region //! 撤销功能
    hasUsedUndo: ii.BooleanBV = null; /* 是否使用过 Undo 操作 */
    readonly undoLengthBV: ii.NumberBV = ii.NumberBV.Borrow(0) /* 是否可以撤销 */
    private undoCmdStack: CmdStack = new CmdStack(this.OnUndoStatusChanged.bind(this))
    private OnUndoStatusChanged(length: number){ this.undoLengthBV.v = length; }
    Undo(ignoreStep: boolean = false){
        if(this.undoLengthBV.v > 0){
            this.hasUsedUndo.v = true
            let cmd = this.undoCmdStack.pop()
            for(let i=cmd.cmdChanges.length-1; i>=0; --i){
                let change = cmd.cmdChanges[i]
                switch (change.typ) {
                    case EChangeType.FLIP:
                        this.UndoFlip(change, i > 0)
                        break;
                    case EChangeType.MOVE:
                        this.UndoMoveChangeByCmdType(cmd.cmdType, change, ignoreStep, i > 0)
                        break;
                }
            }
        }else{
            ii.UIMgr.ins.ShowMsg("solitaire.no_undo_step")
        }
    }
    NewCmd(cmdType: ETUndoCmd): Cmd{
        let cmd = new Cmd(cmdType, [])
        this.undoCmdStack.push(cmd)
        return cmd
    }

    private UndoFlip(change: CmdChange, notUpdateScore: boolean){
        change.poker.status = change.status === EPokerStatus.OPEN ? EPokerStatus.CLOSE : EPokerStatus.OPEN

        // 翻牌计分
        console.assert(change.poker.initLocation === ELocation.PLAY && change.poker.initStatus === EPokerStatus.CLOSE)
        this.ChangeReceiveScore(-5)

        this.UpdateScore(notUpdateScore)
        
        
        this.NotifyGameEvent(SolitaireEvent.SC_FLIP_POKER, change.poker)
    }

    SnapUndoCmds(): SnapCmd[] { return this.undoCmdStack.Snap() }
    RedoCmds(_cmds: SnapCmd[]) {
        let cmds = this.ConvertCmds(_cmds)
        cmds.forEach(cmd => {
            this.ResumeCmd(cmd.cmdType, cmd.cmdChanges)
        })
    }
    private ConvertCmds(cmds: SnapCmd[]): Cmd[] {
        return cmds.map(cmd=>{
            let c = new Cmd(cmd.cmdType, [])
            cmd.cmdChanges.forEach(snapChange => c.AddChange({
                typ: snapChange.typ,
                poker: snapChange.poker == null ? null : this.getPoker(snapChange.poker.point, snapChange.poker.suit),
                pokers: snapChange.pokers == null ? null : snapChange.pokers.map(poker => this.getPoker(poker.point, poker.suit)),
                fromIndex: snapChange.fromIndex,
                toIndex: snapChange.toIndex,
                status: snapChange.status
            }))
            return c
        })
    }

    //#region Undo Resume
    private UndoMoveChangeByCmdType(cmdType: ETUndoCmd, change: CmdChange, ignoreStep: boolean, notUpdateScore: boolean){
        switch (cmdType) {
            case ETUndoCmd.PLAY_TO_PLAY:
                this.__MoveFromPlayToPlay(change.poker, change.fromIndex, EActionType.UNDO, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.PLAY_TO_RECEIVE:
                this.__MoveFromReceiveToPlay(change.poker, change.fromIndex, EActionType.UNDO, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.RECEIVE_TO_PLAY:
                this.__MoveFromPlayToReceive(change.poker, change.fromIndex, EActionType.UNDO, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.RECEIVE_TO_RECEIVE:
                this.__MoveFromReceiveToReceive(change.poker, change.fromIndex, EActionType.UNDO, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.OPEN_TO_PLAY:
                this.__MoveFromPlayToOpenForUndo(change.poker, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.OPEN_TO_RECEIVE:
                this.__MoveFromReceiveToOpenForUndo(change.poker, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.OPEN_TO_CLOSE:
                // 原操作：一整叠牌移动到 Close 区域
                this.__MoveFromCloseToOpenForUndo(change.pokers, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.CLOSE_TO_OPEN:
                this.__MoveFromOpenToCloseForUndo(change.poker, ignoreStep, notUpdateScore)
                break;
            case ETUndoCmd.CLOSES_TO_OPEN:
                this.__MovePokersFromOpenToCloseForUndo(change.pokers, ignoreStep, notUpdateScore)
                break;
        }
    }
    ResumeCmd(cmdType: ETUndoCmd, changes: CmdChange[]) {
        switch (cmdType) {
            case ETUndoCmd.PLAY_TO_PLAY:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromPlayToPlay(change.poker, change.toIndex))
                break;
            case ETUndoCmd.PLAY_TO_RECEIVE:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromPlayToReceive(change.poker, change.toIndex))
                break;
            case ETUndoCmd.RECEIVE_TO_PLAY:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromReceiveToPlay(change.poker, change.toIndex))
                break;
            case ETUndoCmd.RECEIVE_TO_RECEIVE:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromReceiveToReceive(change.poker, change.toIndex))
                break;
            case ETUndoCmd.OPEN_TO_PLAY:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromOpenToPlay(change.poker, change.toIndex))
                break;
            case ETUndoCmd.OPEN_TO_RECEIVE:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromOpenToReceive(change.poker, change.toIndex))
                break;
            case ETUndoCmd.OPEN_TO_CLOSE:
                // 原操作：一整叠牌移动到 Close 区域
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromOpenToClose())
                break;
            case ETUndoCmd.CLOSE_TO_OPEN:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromCloseToOpen(change.poker))
                break;
            case ETUndoCmd.CLOSES_TO_OPEN:
                this.__ResumeOnceForTypeOfMove(changes, change => this.__MoveFromCloseToOpen(change.pokers[0]))
                break;
        }
    }
    private __ResumeOnceForTypeOfMove(changes: CmdChange[], callback: (change: CmdChange) => void) {
        for(let index=0; index<changes.length; ++index){
            let change = changes[index]
            if(change.typ == EChangeType.MOVE){
                callback(change)
                break
            }
        }
    }
    //#endregion
    //#endregion 撤销功能

    //#region //! 自动玩牌
    OnUseHelp() {
        this.isHelpedBV.v = true;
        this.isPlayerOpenedBV.v = true;
    }
    isHelpedBV: ii.BooleanBV = null; /* 是否消耗过次数 */
    // 数据战斗
    private AutoServerPlay(): boolean{ return this.AutoServerPlayStepNext() }
    private AutoServerPlayStepNext(): boolean {
        if(this.isGameWinBV.v){ return true }
        if(this.m_strategyFn(false)){
            return this.AutoServerPlayStepNext()
        }else{
            return false
        }
    }
    // 所有扑克的翻开状态
    readonly isAllPokersOpenBV: ii.BooleanBV = ii.BooleanBV.Borrow(false)
    private __refreshAllPokerOpenStatus(){
        this.isAllPokersOpenBV.v = this._pokers.reduce((isAllOpen, curentPoker) => isAllOpen && (curentPoker.status === EPokerStatus.OPEN), true)
    }
    // 自动收牌 
    readonly isAutoCollectingBV: ii.BooleanBV = ii.BooleanBV.Borrow(false)
    // 自动玩牌
    isPlayerOpenedBV: ii.BooleanBV = null; /* 是否打开了播放器 */
    isAutoPlayingBV: ii.BooleanBV = null;
    private m_AutoPlayingInterval: number = null /** 自动播放时的时间间隔 */
    ChangeAutoPlayInterval(duration: number) { this.m_AutoPlayingInterval = duration } /** 更新自动播放的时间间隔 */
    private m_strategyFn: (noPlay: boolean)=>boolean = null
    private AutoPlayStepNext(callback?: AUTO_RUN_CALLBACK) {
        if(!(this.isAutoPlayingBV.v || this.isAutoCollectingBV.v)){ return }
        if(this.isGameWinBV.v){
            this.isAutoPlayingBV.v = false
            this.isAutoCollectingBV.v = false
            if(callback){
                return callback(true, this.Seed, this)
            }
            return
        }
        if(this.m_strategyFn(false)){
            if(this.m_AutoPlayingInterval === 0){
                return this.AutoPlayStepNext(callback)
            }else{
                ii.App.ins.delayCall(this.m_AutoPlayingInterval, ()=>this.AutoPlayStepNext(callback));
            }
        }else{
            this.isAutoPlayingBV.v = false
            this.isAutoCollectingBV.v = false
            if(callback){
                return callback(false, this.Seed, this)
            }
        }
    }
    AutoPlay(interval: number, callback?: AUTO_RUN_CALLBACK) {
        console.assert((!this.isAutoPlayingBV.v) && (!this.isAutoCollectingBV.v))
        this.ChangeAutoPlayInterval(interval)
        this.isAutoPlayingBV.v = true
        ii.App.ins.delayCall(this.m_AutoPlayingInterval, ()=>this.AutoPlayStepNext(callback));
    }
    AutoCollect(interval: number) {
        console.assert(this.isAllPokersOpenBV.v && (!this.isAutoPlayingBV.v) && (!this.isAutoCollectingBV.v))
        this.ChangeAutoPlayInterval(interval)
        this.isAutoCollectingBV.v = true
        this.AutoPlayStepNext()
    }
    StopAutoPlay() { this.isAutoPlayingBV.v = false }
    NextStep() { this.__DoNextStep(false) }
    private __DoNextStep(noPlay: boolean) {
        if(!(this.isGameWinBV.v)){
            if(this.m_strategyFn){                
                return this.m_strategyFn(noPlay)
            }
        }
        return false
    }
    
    //#endregion 自动玩牌

    //#region //! 自动玩牌的策略
    /*********************************************************************
     * 【Common】: 【Play 区域的其他牌可以移动到 playPoker, 并导致翻牌】
     *********************************************************************/
     private __CreateStrategyFunc(): (noPlay: boolean) => boolean {
        if(this._isCard3Mode){
            return (noPlay: boolean) => {
                return false 
                    ||this.AutoPlayFlipOnPlayToReceive(noPlay) /*【Play 到 Receive, 导致翻牌】*/ 
                    || this.AutoPlayFlipOnPlayToPlay(noPlay) /* 【Play 到 Play, 导致翻牌】 */
                    || this.AutoPlayNoFlipOpenToReceive(noPlay) /* Open 到 Receive */
                    || this.AutoPlayNoFlipOnPlayToReceiveToCreateEmptyPlayGroup(noPlay) /*【Play 到 Receive, 导致空列】*/
                    || this.AutoPlayFlipOnOpenToPlay(noPlay) /* Open 到 Play, 出现 【Common】 */
                    || this.AutoPlayFlipOnReceiveToPlay(noPlay) /* Receive 到 Play, 出现 【Common】 */
                    || this.AutoPlayFlipOnCloseToPlay(noPlay) /* Close 到 Play, 出现 【Common】 */
                    || this.AutoPlayFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play, 出现 【Common】 */
                    /**********************************************************************************************************/
                    || this.AutoPlayNoFlipOnPlayToPlayToCreateEmptyPlayGroup(noPlay) /* 移动 Play 到另一组，腾出一列空列（前提：没有空列） */
                    || this.AutoPlayNoFlipOnPlayToReceive(noPlay) /* Play 到 Receive */
                    || this.AutoPlayNoFlipCloseToReceive(noPlay) /* Close 到 Receive */
                    || this.AutoPlayNoFlipOnOpenToPlay(noPlay) /* Open 到 Play */
                    || this.AutoPlayNoFlipUnderOpenToReceive(noPlay) /* UnderOpen 到 Receive */
                    || this.AutoPlayNoFlipOnCloseToPlay(noPlay) /* Close 到 Play */
                    || this.AutoPlayNoFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play */
            }
        }else{
            /* 【Common】: 【Play 区域的其他牌可以移动到这组, 并导致翻牌】 */
            return (noPlay: boolean) => {
                return false 
                    //! 直接进入最佳的收牌状态
                    || this.AutoPlayBestFitPlayToReceive(noPlay) //! 1
                    || this.AutoPlayBestFitOpenToReceive(noPlay) //! 2
                    //! Close 区域到第一张牌翻出来，会导致 2
                    || this.AutoPlayBestFitTopCloseToReceive(noPlay) //! 3
                    //! Close 区域无牌，重新发牌后的第一张，导致 2
                    || this.AutoPlayBestFitBottomOpenToReceive(noPlay) //! 4
                    //! 收一张牌且导致翻牌
                    || this.AutoPlayFlipOnPlayToReceive(noPlay) /*【Play 到 Receive, 导致翻牌】*/ //! 5
                    //! 移动一张牌且导致翻牌
                    || this.AutoPlayFlipOnPlayToPlay(noPlay) /* 【Play 到 Play, 导致翻牌】 */ //! 6
                    //! Play 到 Receive, 导致空列
                    || this.AutoPlayNoFlipOnPlayToReceiveToCreateEmptyPlayGroup(noPlay)
                    //! Open(3) -> PlayA(4) , PlayB(2) -> PlayA(4,3), PlayB 翻牌
                    || this.AutoPlayFlipOnOpenToPlay(noPlay)
                    //! Receive(3) -> PlayA(4) , PlayB(2) -> PlayA(4,3), PlayB 翻牌
                    || this.AutoPlayFlipOnReceiveToPlay(noPlay)
                    //! 直接收牌： Open -> Receive
                    || this.AutoPlayNoFlipOpenToReceive(noPlay)
                    //! 直接收牌： Open -> Play
                    || this.AutoPlayNoFlipOnOpenToPlay(noPlay)
                    || this.AutoPlayFlipOnCloseToPlay(noPlay) /* Close 到 Play, 出现 【Common】 */
                    || this.AutoPlayFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play, 出现 【Common】 */
                    /**********************************************************************************************************/
                    || this.AutoPlayFlipOnOpenToPlayByTwoPokers(noPlay)
                    || this.AutoPlayFlipOnReceiveToPlayByTwoPokers(noPlay)
                    || this.AutoPlayFlipOnCloseToPlayByTwoPokers(noPlay)
                    || this.AutoPlayFlipOnUnderOpenToPlayByTwoPokers(noPlay)
                    /**********************************************************************************************************/
                    || this.AutoPlayNoFlipOnPlayToPlayToCreateEmptyPlayGroup(noPlay) /* 移动 Play 到另一组，腾出一列空列（前提：没有空列） */
                    || this.AutoPlayNoFlipOnPlayToReceive(noPlay) /* Play 到 Receive */
                    || this.AutoPlayNoFlipCloseToReceive(noPlay) /* Close 到 Receive */
                    || this.AutoPlayNoFlipUnderOpenToReceive(noPlay) /* UnderOpen 到 Receive */
                    || this.AutoPlayNoFlipOnCloseToPlay(noPlay) /* Close 到 Play */
                    || this.AutoPlayNoFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play */
                    || this.AutoPlayNoFlipOnPlayToPlayToMakeReceive(noPlay)/** PlayA(红心9,黑桃8) -> PlayB(方块9)， PlayA(红心9) -> Receive */
            }
        }
    }
    // 牌从 Play 到 Receive，这张牌恰巧和收牌区的牌的点数差距不超过 1 （比如上面 是 1, 2, 1, 2，那么 2 最适合放到上面去)
    private AutoPlayBestFitPlayToReceive(noPlay: boolean = false): boolean {
        // 1 顶部为空，找 A
        let hasEmpty: boolean = false;
        let minPoint: number = 13;
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if(toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                    let fromPlayGroup = this._playGroups[fromPlayIndex]
                    let topPoker = fromPlayGroup.top;
                    if(topPoker && topPoker.point == 1) {
                        if(!noPlay) {
                            this.__MoveFromPlayToReceive(topPoker, toReceiveIndex);
                        }
                        return true;
                    }
                }
            }else{
                let top = toReceiveGroup.top;
                if(top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if(hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if(minPoint === 13) {
            return false;
        }

        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否在 Play 区域
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            let top = toReceiveGroup.top;
            if(top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                    let fromPlayGroup = this._playGroups[fromPlayIndex]
                    let topPoker = fromPlayGroup.top;
                    if(topPoker && toReceiveGroup.IsNextPoker(topPoker)) {
                        if(!noPlay) {
                            this.__MoveFromPlayToReceive(topPoker, toReceiveIndex);
                        }
                        return true;
                    }
                }
            }
        }

        return false;
    }
    // 牌从 Open 到 Receive，这张牌恰巧和收牌区的牌的点数差距不超过 1 （比如上面 是 1, 2, 1, 2，那么 2 最适合放到上面去)
    private AutoPlayBestFitOpenToReceive(noPlay: boolean = false): boolean {
        if(this._openAreaGroup.IsPokersEmpty()) {
            return false;
        }
        // 1 顶部为空，找 A
        let hasEmpty: boolean = false;
        let minPoint: number = 13;
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if(toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                let topPoker = this._openAreaGroup.top;
                if(topPoker && topPoker.point == 1) {
                    if(!noPlay) {
                        this.__MoveFromOpenToReceive(topPoker, toReceiveIndex);
                    }
                    return true;
                }
            }else{
                let top = toReceiveGroup.top;
                if(top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if(hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if(minPoint === 13) {
            return false;
        }

        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否在 Play 区域
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            let top = toReceiveGroup.top;
            if(top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                let topPoker = this._openAreaGroup.top;
                if(topPoker && toReceiveGroup.IsNextPoker(topPoker)) {
                    if(!noPlay) {
                        this.__MoveFromOpenToReceive(topPoker, toReceiveIndex);
                    }
                    return true;
                }
            }
        }

        return false;
    }
    private AutoPlayFlipOnPlayToReceive(noPlay: boolean = false): boolean {
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex]
            for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                let fromPlayGroup = this._playGroups[fromPlayIndex]
                let topOpenPoker = fromPlayGroup.top
                if(topOpenPoker && toReceiveGroup.IsNextPoker(topOpenPoker) && fromPlayGroup.IsAutoFlipOnRemovePoker(topOpenPoker)){
                    if(!noPlay){
                        this.__MoveFromPlayToReceive(topOpenPoker, toReceiveIndex)
                    }
                    return true
                }
            }
        }
        return false
    }
    private AutoPlayFlipOnPlayToPlay(noPlay: boolean = false): boolean {
        for(let toPlayIndex = 0; toPlayIndex<7; ++toPlayIndex){
            let toPlayGroup = this._playGroups[toPlayIndex]
            for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                let fromPlayGroup = this._playGroups[fromPlayIndex]
                let rootOpenPoker = fromPlayGroup.rootOpenPoker
                if(rootOpenPoker && toPlayGroup.IsConcatPoker(rootOpenPoker) && fromPlayGroup.IsAutoFlipOnRemovePoker(rootOpenPoker)){
                    if(!noPlay){
                        this.__MoveFromPlayToPlay(rootOpenPoker, toPlayIndex)
                    }
                    return true                    
                }
            }
        }
        return false
    }
    private AutoPlayBestFitTopCloseToReceive(noPlay: boolean = false): boolean {
        if(this._closeAreaGroup.IsPokersEmpty()) {
            return false;
        }
        // 1 顶部为空，找 A
        let hasEmpty: boolean = false;
        let minPoint: number = 13;
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if(toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                let topPoker = this._closeAreaGroup.top;
                if(topPoker && topPoker.point == 1) {
                    if(!noPlay) {
                        this.__MoveFromCloseToOpen(topPoker);
                    }
                    return true;
                }
            }else{
                let top = toReceiveGroup.top;
                if(top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if(hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if(minPoint === 13) {
            return false;
        }

        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否在
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            let top = toReceiveGroup.top;
            if(top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                let topOpenPoker = this._closeAreaGroup.top;
                if(topOpenPoker && toReceiveGroup.IsNextPoker(topOpenPoker)) {
                    if(!noPlay) {
                        this.__MoveFromCloseToOpen(topOpenPoker);
                    }
                    return true;
                }
            }
        }

        return false;
    }
    private AutoPlayBestFitBottomOpenToReceive(noPlay: boolean = false): boolean {
        if(!this.IsCanReflip()){
            return false
        }
        if(!this._closeAreaGroup.IsPokersEmpty()) {
            return false;
        }
        if(this._openAreaGroup.IsPokersEmpty()) {
            return false;
        }
        // 1 顶部为空，找 A
        let hasEmpty: boolean = false;
        let minPoint: number = 13;
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if(toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                let bottomPoker = this._openAreaGroup.zero;
                if(bottomPoker && bottomPoker.point == 1) {
                    if(!noPlay) {
                        this.__MoveFromOpenToClose();
                    }
                    return true;
                }
            }else{
                let top = toReceiveGroup.top;
                if(top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if(hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if(minPoint === 13) {
            return false;
        }

        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否存在
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex];
            let top = toReceiveGroup.top;
            if(top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                let bottomPoker = this._openAreaGroup.zero;
                if(bottomPoker && toReceiveGroup.IsNextPoker(bottomPoker)) {
                    if(!noPlay) {
                        this.__MoveFromOpenToClose();
                    }
                    return true;
                }
            }
        }

        return false;
    }
    private AutoPlayNoFlipOpenToReceive(noPlay: boolean = false): boolean {
        let receiveIndex = this.__receiveIndexForPoker(this._openAreaGroup.top)
        if(receiveIndex !== -1){
            if(!noPlay){
                this.__MoveFromOpenToReceive(this._openAreaGroup.top, receiveIndex)
            }
            return true
        }
        return false 
    }
    private AutoPlayNoFlipOnOpenToPlay(noPlay: boolean = false): boolean {
        let toPlayIndex = this.__playIndexForPoker(this._openAreaGroup.top)
        if(toPlayIndex !== -1){
            if(!noPlay){
                this.__MoveFromOpenToPlay(this._openAreaGroup.top, toPlayIndex)
            }
            return true
        }
        return false
    }
    private AutoPlayNoFlipOnPlayToReceiveToCreateEmptyPlayGroup(noPlay: boolean = false): boolean {
        for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
            let toReceiveGroup = this._receiveGroups[toReceiveIndex]
            for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                let fromPlayGroup = this._playGroups[fromPlayIndex]
                let topOpenPoker = fromPlayGroup.top
                if(topOpenPoker && toReceiveGroup.IsNextPoker(topOpenPoker) && topOpenPoker === fromPlayGroup.zero){
                    if(!noPlay){
                        this.__MoveFromPlayToReceive(topOpenPoker, toReceiveIndex)
                    }
                    return true
                }
            }
        }
        return false
    }
    private AutoPlayFlipOnOpenToPlay(noPlay: boolean = false): boolean {
        let toPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play(this._openAreaGroup.top)
        if(toPlayIndex !== -1){
            if(!noPlay){
                this.__MoveFromOpenToPlay(this._openAreaGroup.top, toPlayIndex)
            }
            return true
        }
        return false
    }
    private AutoPlayFlipOnCloseToPlay(noPlay: boolean = false): boolean {
        for(let index=this._closeAreaGroup.pokers.length-this.cardMode; index>=0;){
            let toPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play( this._closeAreaGroup.pokers[index] )
            if(toPlayIndex !== -1){
                if(!noPlay){
                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                }
                return true
            }
            if(this._isCard3Mode && index-this.cardMode < 0  && index > 0){
                index = 0
            }else{
                index=index-this.cardMode
            }
        }
        return false
    }
    private AutoPlayFlipOnUnderOpenToPlay(noPlay: boolean = false): boolean {
        if(!this.IsCanReflip()){
            return false
        }
        for(let index=this.cardMode-1; index < this._openAreaGroup.pokers.length-1; index = index + this.cardMode){
            let fromPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play( this._openAreaGroup.pokers[index] )
            if(fromPlayIndex !== -1){
                if(!noPlay){
                    if(this._closeAreaGroup.top){
                        this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                    }else{
                        this.__MoveFromOpenToClose()
                    }
                }
                return true
            }
        }
        return false
    }
    private AutoPlayFlipOnOpenToPlayByTwoPokers(noPlay: boolean = false): boolean {
        if(this._isCard3Mode){ return false }
        let movePoker = this._openAreaGroup.top
        let toPlayIndex = this.__playIndexForPoker(movePoker)
        if(toPlayIndex !== -1){
            // 1. UnderOpen 第一张可以下来，造成 【Common】
            // OpenPoker -> Play | UnderOpenPoker -> OpenPoker | Play -> UnderOpenPoker | Flip
            if(movePoker.IsConcatable(this._openAreaGroup.underTop)){
                let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(this._openAreaGroup.underTop)
                if(fromPlayIndex !== -1){
                    if(!noPlay){
                        this.__MoveFromOpenToPlay(movePoker, toPlayIndex)
                    }
                    return true
                }
            }
            // 2. receive 区域有牌可以下来，造成 【Common】
            // OpenPoker -> Play | ReceivePoker -> OpenPoker | Play -> ReceivePoker | Flip
            for(let fromReceiveIndex = 0; fromReceiveIndex<4; ++fromReceiveIndex){
                let fromReceivePoker = this._receiveGroups[fromReceiveIndex].top
                if(movePoker.IsConcatable(fromReceivePoker)){
                    let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker)
                    if(fromPlayIndex !== -1){
                        if(!noPlay){
                            this.__MoveFromOpenToPlay(movePoker, toPlayIndex)
                        }
                        return true
                    }
                }
            }
            // 3. Close 可以下来，造成 【Common】
            // OpenPoker -> Play | ClosePoker -> OpenPoker | Play -> ClosePoker | Flip
            for(let index=this._closeAreaGroup.pokers.length-1; index>=0; --index){
                let closePoker = this._closeAreaGroup.pokers[index]
                if(movePoker.IsConcatable(closePoker)){
                    let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker)
                    if(fromPlayIndex !== -1){
                        if(!noPlay){
                            this.__MoveFromOpenToPlay(movePoker, toPlayIndex)
                        }
                        return true
                    }
                }
            }
            // 4. UnderOpen 除顶部一张外，可以下来，造成 【Common】
            // OpenPoker -> Play | UnderOpenPoker -> OpenPoker | Play -> UnderOpenPoker | Flip
            if(this.IsCanReflip()){
                for(let index=0; index<this._openAreaGroup.pokers.length-2; ++index){
                    let underOpenPoker = this._openAreaGroup.pokers[index]
                    if(movePoker.IsConcatable(underOpenPoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenPoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromOpenToPlay(movePoker, toPlayIndex)
                            }
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
    private AutoPlayFlipOnReceiveToPlayByTwoPokers(noPlay: boolean = false): boolean {
        if(this._isCard3Mode){ return false }
        for(let receiveIndex=0; receiveIndex<4; ++receiveIndex){
            let movePoker = this._receiveGroups[receiveIndex].top
            let toPlayIndex = this.__playIndexForPoker(movePoker)
            if(toPlayIndex !== -1){
                // 1. Open 可以下来，造成 【Common】
                // ReceivePoker -> Play | OpenPoker -> ReceivePoker | Play -> OpenPoker | Flip
                if(movePoker.IsConcatable(this._openAreaGroup.top)){
                    let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(this._openAreaGroup.top)
                    if(fromPlayIndex !== -1){
                        if(!noPlay){
                            this.__MoveFromReceiveToPlay(movePoker, toPlayIndex)
                        }
                        return true
                    }
                }
                // 1. receive 区域有牌可以下来，造成 【Common】
                // ReceivePoker -> Play | ReceivePokerEx -> ReceivePoker | Play -> ReceivePokerEx | Flip
                for(let fromReceiveIndex = 0; fromReceiveIndex<4; ++fromReceiveIndex){
                    let fromReceivePoker = this._receiveGroups[fromReceiveIndex].top
                    if(movePoker.IsConcatable(fromReceivePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromReceiveToPlay(movePoker, toPlayIndex)
                            }
                            return true
                        }
                    }
                }
                // 3. Close 可以下来，造成 【Common】
                // ReceivePoker -> Play | ClosePoker -> ReceivePoker | Play -> ClosePoker | Flip
                for(let index=this._closeAreaGroup.pokers.length-1; index>=0;--index){
                    let closePoker = this._closeAreaGroup.pokers[index]
                    if(movePoker.IsConcatable(closePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromReceiveToPlay(movePoker, toPlayIndex)
                            }
                            return true
                        }
                    }
                }
                // 4. UnderOpen 可以下来，造成 【Common】
                // ReceivePoker -> Play | UnderOpenPoker -> ReceivePoker | Play -> UnderOpenPoker | Flip
                if(this.IsCanReflip()){
                    for(let index=0; index< this._openAreaGroup.pokers.length-1; ++index){
                        let underOpenPoker = this._openAreaGroup.pokers[index]
                        if(movePoker.IsConcatable(underOpenPoker)){
                            let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenPoker)
                            if(fromPlayIndex !== -1){
                                if(!noPlay){
                                    this.__MoveFromReceiveToPlay(movePoker, toPlayIndex)
                                }
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }
    private AutoPlayFlipOnCloseToPlayByTwoPokers(noPlay: boolean = false): boolean {
        if(this._isCard3Mode){ return false }
        for(let closePokerIndex=this._closeAreaGroup.pokers.length-1; closePokerIndex>=0;--closePokerIndex){
            let movePoker = this._closeAreaGroup.pokers[closePokerIndex]
            let toPlayIndex = this.__playIndexForPoker(movePoker)
            if(toPlayIndex !== -1){
                // NOTE 这里有一个动态变化的因素：Close 的牌过来的时候， Open 就变成 UnderOpen，因此，要注意优先级
                // receive 区域有牌可以下来，造成 【Common】
                // ClosePoker -> Play | ReceivePoker -> ClosePoker | Play -> ReceivePoker | Flip
                for(let fromReceiveIndex = 0; fromReceiveIndex<4; ++fromReceiveIndex){
                    let fromReceivePoker = this._receiveGroups[fromReceiveIndex].top
                    if(movePoker.IsConcatable(fromReceivePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                            }
                            return true
                        }
                    }
                }

                // Close 这张牌前面的那张牌 可以下来，造成 【Common】
                // ClosePoker -> Play | BeforeClosePoker -> ClosePoker | Play -> BeforeClosePoker | Flip
                let beforeCloseIndex = closePokerIndex+1
                if(beforeCloseIndex < this._closeAreaGroup.pokers.length){
                    let closePoker = this._closeAreaGroup.pokers[beforeCloseIndex]
                    if(movePoker.IsConcatable(closePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                            }
                            return true
                        }
                    }
                }

                // Close 这张牌后面的牌 可以下来，造成 【Common】
                // ClosePoker -> Play | AfterClosePoker -> ClosePoker | Play -> AfterClosePoker | Flip
                for(let index=closePokerIndex-1; index>=0;--index){
                    let closePoker = this._closeAreaGroup.pokers[index]
                    if(movePoker.IsConcatable(closePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                            }
                            return true
                        }
                    }
                }

                // UnderOpen 和 Open 可以下来，造成 【Common】
                // ClosePoker -> Play | UnderOpenOrOpenPoker -> ClosePoker | Play -> UnderOpenOrOpenPoker | Flip
                if(this.IsCanReflip()){
                    for(let index=0; index< this._openAreaGroup.pokers.length; ++index){
                        let underOpenOrOpenPoker = this._openAreaGroup.pokers[index]
                        if(movePoker.IsConcatable(underOpenOrOpenPoker)){
                            let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenOrOpenPoker)
                            if(fromPlayIndex !== -1){
                                if(!noPlay){
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                                }
                                return true
                            }
                        }
                    }
                }
                // Close 前面的牌可以下来，造成 【Common】
                // ReceivePoker -> Play | ClosePoker -> ReceivePoker | Play -> ClosePoker | Flip
                for(let index=this._closeAreaGroup.pokers.length-1; index>closePokerIndex; --index){
                    let closePoker = this._closeAreaGroup.pokers[index]
                    if(movePoker.IsConcatable(closePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                            }
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
    private AutoPlayFlipOnUnderOpenToPlayByTwoPokers(noPlay: boolean = false): boolean {
        if(this._isCard3Mode){ return false }
        if(!this.IsCanReflip()){
            return false
        }
        for(let underOpenPokerIndex=0; underOpenPokerIndex< this._openAreaGroup.pokers.length-1; ++underOpenPokerIndex){
            let movePoker = this._closeAreaGroup.pokers[underOpenPokerIndex]
            let toPlayIndex = this.__playIndexForPoker(movePoker)
            if(toPlayIndex !== -1){
                // receive 区域有牌可以下来，造成 【Common】
                // UnderOpenPoker -> Play | ReceivePoker -> UnderOpenPoker | Play -> ReceivePoker | Flip
                for(let fromReceiveIndex = 0; fromReceiveIndex<4; ++fromReceiveIndex){
                    let fromReceivePoker = this._receiveGroups[fromReceiveIndex].top
                    if(movePoker.IsConcatable(fromReceivePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                if(this._closeAreaGroup.top){
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                                }else{
                                    this.__MoveFromOpenToClose()
                                }
                            }
                            return true
                        }
                    }
                }
                // UnderOpen 下方那张牌下来 造成 【Common】
                let underUnderOpenIndex = underOpenPokerIndex - 1
                if(underUnderOpenIndex >= 0) {
                    let underUnderOpenPoker = this._openAreaGroup.pokers[underUnderOpenIndex]
                    if(movePoker.IsConcatable(underUnderOpenPoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underUnderOpenPoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                if(this._closeAreaGroup.top){
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                                }else{
                                    this.__MoveFromOpenToClose()
                                }
                            }
                            return true
                        }
                    }
                }
                // UnderOpenPoker 上面的牌先下来 造成 【Common】
                // UnderOpenPoker -> Play | UnderOpenOrOpenPoker -> UnderOpenPoker | Play -> UnderOpenOrOpenPoker | Flip
                
                for(let index=underOpenPokerIndex+1; index< this._openAreaGroup.pokers.length; ++index){
                    let underOpenOrOpenPoker = this._openAreaGroup.pokers[index]
                    if(movePoker.IsConcatable(underOpenOrOpenPoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenOrOpenPoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                if(this._closeAreaGroup.top){
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                                }else{
                                    this.__MoveFromOpenToClose()
                                }
                            }
                            return true
                        }
                    }
                }
                // Close 下来，造成 【Common】
                // UnderOpenPoker -> Play | ClosePoker -> UnderOpenPoker | Play -> ClosePoker | Flip
                for(let index=this._closeAreaGroup.pokers.length-1; index>=0;--index){
                    let closePoker = this._closeAreaGroup.pokers[index]
                    if(movePoker.IsConcatable(closePoker)){
                        let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker)
                        if(fromPlayIndex !== -1){
                            if(!noPlay){
                                if(this._closeAreaGroup.top){
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                                }else{
                                    this.__MoveFromOpenToClose()
                                }
                            }
                            return true
                        }
                    }
                }
                // UnderOpenPoker 下面的牌先下来 造成 【Common】
                // UnderOpenPoker -> Play | UnderUnderOpenPoker -> UnderOpenPoker | Play -> UnderUnderOpenPoker | Flip
                if(this.__isCanReflipByCount(this.flipCloseCardsCountBV.v+1)){
                    for(let index=0; index< underOpenPokerIndex-1; ++index){
                        let underOpenOrOpenPoker = this._openAreaGroup.pokers[index]
                        if(movePoker.IsConcatable(underOpenOrOpenPoker)){
                            let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenOrOpenPoker)
                            if(fromPlayIndex !== -1){
                                if(!noPlay){
                                    if(this._closeAreaGroup.top){
                                        this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                                    }else{
                                        this.__MoveFromOpenToClose()
                                    }
                                }
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }
    private AutoPlayNoFlipOnPlayToPlayToCreateEmptyPlayGroup(noPlay: boolean = false): boolean {
        // 移动 Play 到另一组，腾出一列空列（前提：没有空列）
        let isFull: boolean = this._playGroups.reduce((isAllFull, group) => isAllFull && (!group.IsPokersEmpty()), true)
        if(isFull){
            for(let toPlayIndex = 0; toPlayIndex<7; ++toPlayIndex){
                let toPlayGroup = this._playGroups[toPlayIndex]
                for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                    let fromPlayGroup = this._playGroups[fromPlayIndex]
                    let rootOpenPoker = fromPlayGroup.rootOpenPoker
                    if(rootOpenPoker && toPlayGroup.IsConcatPoker(rootOpenPoker) && (fromPlayGroup.zero.status === EPokerStatus.OPEN && fromPlayGroup.zero.point !== 13)){
                        if(!noPlay){
                            this.__MoveFromPlayToPlay(rootOpenPoker, toPlayIndex)
                        }
                        return true                        
                    }
                }
            }
        }
        return false
    }
    private AutoPlayFlipOnReceiveToPlay(noPlay: boolean = false): boolean {
        for(let fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex){
            let toPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play(this._receiveGroups[fromReceiveIndex].top)
            if(toPlayIndex !== -1){
                if(!noPlay){
                    this.__MoveFromReceiveToPlay(this._receiveGroups[fromReceiveIndex].top, toPlayIndex)
                }
                return true
            }
        }
        return false
    }
    private AutoPlayNoFlipOnPlayToReceive(noPlay: boolean = false): boolean {
        for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
            let toReceiveIndex = this.__receiveIndexForPoker(this._playGroups[fromPlayIndex].top)
            if(toReceiveIndex !== -1){
                if(!noPlay){
                    let fromPlayGroup = this._playGroups[fromPlayIndex]
                    this.__MoveFromPlayToReceive(fromPlayGroup.top, toReceiveIndex)
                }
                return true
            }
        }
        return false
    }
    private AutoPlayNoFlipCloseToReceive(noPlay: boolean = false): boolean {
        for(let index=this._closeAreaGroup.pokers.length-this.cardMode; index>=0;){
            if(this.__receiveIndexForPoker(this._closeAreaGroup.pokers[index]) !== -1){
                if(!noPlay){
                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                }
                return true
            }
            if(this._isCard3Mode && index-this.cardMode < 0  && index > 0){
                index = 0
            }else{
                index=index-this.cardMode
            }
        }
        return false
    }
    private AutoPlayNoFlipUnderOpenToReceive(noPlay: boolean = false): boolean {
        if(this.IsCanReflip()){
            for(let index=this.cardMode-1; index < this._openAreaGroup.pokers.length-1; index = index + this.cardMode){
                if(this.__receiveIndexForPoker(this._openAreaGroup.pokers[index]) !== -1){
                    if(!noPlay){
                        if(this._closeAreaGroup.top){
                            this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                        }else{
                            this.__MoveFromOpenToClose()
                        }
                    }
                    return true
                }
            }
        }
        return false
    }
    private AutoPlayNoFlipOnCloseToPlay(noPlay: boolean = false): boolean {
        for(let index=this._closeAreaGroup.pokers.length-this.cardMode; index>=0;){
            let toPlayIndex = this.__playIndexForPoker( this._closeAreaGroup.pokers[index] )
            if(toPlayIndex !== -1){
                if(!noPlay){
                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                }
                return true
            }
            if(this._isCard3Mode && index-this.cardMode < 0  && index > 0){
                index = 0
            }else{
                index=index-this.cardMode
            }
        }
        return false
    }
    private AutoPlayNoFlipOnUnderOpenToPlay(noPlay: boolean = false): boolean {
        if(this.IsCanReflip()){
            for(let index=this.cardMode-1; index < this._openAreaGroup.pokers.length-1; index = index + this.cardMode){
                let toPlayIndex = this.__playIndexForPoker( this._openAreaGroup.pokers[index] )
                if(toPlayIndex !== -1){
                    if(!noPlay){
                        if(this._closeAreaGroup.top){
                            this.__MoveFromCloseToOpen(this._closeAreaGroup.top)
                        }else{
                            this.__MoveFromOpenToClose()
                        }
                    }
                    return true
                }
            }
        }
        return false
    }
    private AutoPlayNoFlipOnPlayToPlayToMakeReceive(noPlay: boolean = false): boolean {
        for(let receiveIndex = 0; receiveIndex<4; ++receiveIndex){
            let g = this._receiveGroups[receiveIndex];
            if(!g.IsPokersEmpty()) {
                let receivePoker = g.top;
                let point = receivePoker.point+1;
                if(point <= 13) {
                    // 查找扑克牌的位置
                    for(let fromPlayIndex = 0; fromPlayIndex<7; ++fromPlayIndex){
                        let playGroup = this._playGroups[fromPlayIndex];
                        let targetPokerIndex = playGroup.GetPokerIndexBySuitPoint(receivePoker.suit, point, EPokerStatus.OPEN);
                        if(targetPokerIndex != -1) {
                            let abovePoker = playGroup.GetPoker(targetPokerIndex+1);
                            let toPlayIndex = this.__playIndexForPoker(abovePoker);
                            if(toPlayIndex !== -1) {
                                this.__MoveFromPlayToPlay(abovePoker, toPlayIndex);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    //#endregion

    //#region //! 策略逻辑的辅助函数
    // 获取 toPlayIndex ，如果  poker 到 Play, 出现 【Common】
    private __playIndexOfFlipThrough_Play_Poker_Play(poker: Poker): number {
        if(poker){
            for(let toPlayIndex = 0; toPlayIndex<7; ++toPlayIndex){
                let toPlayGroup = this._playGroups[toPlayIndex]
                if(toPlayGroup.IsConcatPoker(poker)){
                    let fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(poker)
                    if(fromPlayIndex !== -1){
                        return toPlayIndex
                    }
                }
            }
        }
        return -1
    }
    //  返回 fromPlayIndex 【Common】
    private __playIndexOfFlipOnPlayConcatedAfterPoker(toPoker: Poker): number {
        for(let fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex){
            if(this.__isFlipOnPlayConcatedAfterPoker(fromPlayIndex, toPoker)){
                return fromPlayIndex
            }
        }
        return -1
    }
    // fromPlayIndex Concate 到这张牌上，会造成翻牌
    private __isFlipOnPlayConcatedAfterPoker(fromPlayIndex: number, toPoker: Poker): boolean {
        let g = this._playGroups[fromPlayIndex]
        if(g.IsPokersEmpty()){
            return false
        }
        let rootOpenPoker = g.rootOpenPoker
        if(rootOpenPoker == g.top && toPoker.IsConcatable(rootOpenPoker)){
            return g.IsAutoFlipOnRemovePoker(rootOpenPoker)
        }else{
            return false
        }
    }
    // 返回 toReceiveIndex ，如果这张牌可以连接在该 Receive 组
    private __receiveIndexForPoker(poker: Poker) {
        if(poker){
            for(let toReceiveIndex = 0; toReceiveIndex<4; ++toReceiveIndex){
                if(this._receiveGroups[toReceiveIndex].IsNextPoker(poker)){
                    return toReceiveIndex
                }
            }
        }
        return -1
    }
    // 返回 toPlayIndex ，如果这张牌可以连接在该 Play 组
    private __playIndexForPoker(poker: Poker) {
        if(poker){
            for(let toPlayIndex = 0; toPlayIndex<7; ++toPlayIndex){
                let group = this._playGroups[toPlayIndex]
                if(group.IsConcatPoker(poker)){
                    return toPlayIndex
                }
            }
        }
        return -1
    }
    //#endregion 策略逻辑的辅助函数

    //#region //! 数据战斗
    static ServerPlay(gameType: EGameType, seed: number, isVegasMode: boolean, isCard3Mode: boolean): SolitaireDataBattleResult {
        let model = new SolitaireJu(gameType, isVegasMode, isCard3Mode)
        model.Enter(seed)
        let pass: boolean = model.AutoServerPlay()
        let step = model.moveStepCountBV.v;
        let flipCloseCnt = model.flipCloseCardsCountBV.v;
        model.Exit()
        return {
            seed,
            pass,
            step,
            flipCloseCnt
        }
    }

    private static _s_Seed = 0;
    static Test_DataBattle() {
        let ret = SolitaireJu.ServerPlay(EGameType.EASY, this._s_Seed++, false, false);
        if(ret.pass) {
            console.log(` pass :: seed >> ${ret.seed} step >> ${ret.step} flip >> ${ret.flipCloseCnt}`)
        }
    }
    //#endregion
}
