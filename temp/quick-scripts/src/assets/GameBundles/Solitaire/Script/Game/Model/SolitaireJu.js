"use strict";
cc._RF.push(module, '21c54AYILpPzrrUrojPb1qG', 'SolitaireJu');
// GameBundles/Solitaire/Script/Game/Model/SolitaireJu.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireJu = void 0;
var Poker_1 = require("./Poker");
var PokerGroup_1 = require("./PokerGroup");
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitaireEvent_1 = require("../../SolitaireEvent");
var SolitaireType_1 = require("../SolitaireType");
var SolitaireJu = /** @class */ (function (_super) {
    __extends(SolitaireJu, _super);
    //#endregion
    //#region //! Entity 生命周期
    function SolitaireJu(gameType, isVegasMode, isCard3Mode) {
        var _this = _super.call(this) || this;
        _this.flipCloseCardsCountBV = ii.NumberBV.Borrow(0); /** Close 区域翻的次数 */
        //#region //! 连续收牌音效递进
        _this.foundationCounts = ii.NumberBV.Borrow(-1);
        //#endregion 连续收牌音效递进
        //#region //! 创建一局时所需数据
        _this._isCard3Mode = false;
        _this._isVegasMode = false;
        _this.cardMode = 1;
        _this._gameType = SolitaireEnums_1.EGameType.EASY;
        //#endregion
        _this._CONST_SHUFFLE = 256; // 洗牌次数 256 次，不允许改变
        _this.m_Rander = null;
        _this._receiveGroups = [];
        _this._playGroups = [];
        _this._closeAreaGroup = null;
        _this._openAreaGroup = null;
        _this._pokers = []; /* 所有扑克的原始数据 */
        //#endregion
        //#region //! 游戏计时 Timer
        _this._gameTime = 0;
        _this._isTimerActive = false;
        _this._isPauseTimer = false;
        //#endregion 游戏计时 Timer
        //#region //! 游戏失败相关
        /**
         * 失败的条件是：用户未点击 Continue，并且没有下一步可走
         */
        _this.hasNextBV = null; /** 没有下一步可走 */
        _this.isContinueBV = null; /** 失败页面弹出后，点击了继续按钮 */
        _this.isGameLoseBV = null;
        //#endregion 游戏失败相关
        //#region //! 游戏胜利
        _this.isGameWinBV = ii.BooleanBV.Borrow(false);
        //#endregion 游戏胜利
        //#region //! 【移动步数】 【翻牌、收牌计分】 【最终得分】
        // 【移动步数】
        _this.moveStepCountBV = ii.NumberBV.Borrow(0);
        // 【翻牌、收牌计分】
        _this.pokerReceiveScoreBV = ii.NumberBV.Borrow(0);
        _this.vegasReceiveScoreBV = ii.NumberBV.Borrow(0);
        // 【最终得分】
        _this.scoreBV = null;
        //#endregion
        //#region
        /*********************************************************************/
        // 操作提示功能
        // 描述：玩家点击【提示】，获取备选的操作列表，按照策略选择其中之一，并执行
        /*********************************************************************/
        /// 功能：界面调用此接口
        _this.m_OperationHintIndex = 0;
        _this.m_OperationHintList = [];
        _this.m_IsStepOperationHintCalculated = false; /* 当前步骤是否预计算完毕（主要用于提示） */
        _this.isHintedBV = null; /* 是否提示过次数 */
        //#endregion
        //#region //! 撤销功能
        _this.hasUsedUndo = null; /* 是否使用过 Undo 操作 */
        _this.undoLengthBV = ii.NumberBV.Borrow(0); /* 是否可以撤销 */
        _this.undoCmdStack = new SolitaireType_1.CmdStack(_this.OnUndoStatusChanged.bind(_this));
        _this.isHelpedBV = null; /* 是否消耗过次数 */
        // 所有扑克的翻开状态
        _this.isAllPokersOpenBV = ii.BooleanBV.Borrow(false);
        // 自动收牌 
        _this.isAutoCollectingBV = ii.BooleanBV.Borrow(false);
        // 自动玩牌
        _this.isPlayerOpenedBV = null; /* 是否打开了播放器 */
        _this.isAutoPlayingBV = null;
        _this.m_AutoPlayingInterval = null; /** 自动播放时的时间间隔 */
        _this.m_strategyFn = null;
        _this._gameType = gameType;
        _this._isCard3Mode = isCard3Mode;
        _this._isVegasMode = isVegasMode;
        _this.cardMode = _this._isCard3Mode ? 3 : 1;
        _this.hasNextBV = ii.BooleanBV.Borrow(true).ReturnBy(_this);
        _this.isHintedBV = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.isHelpedBV = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.isPlayerOpenedBV = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.isAutoPlayingBV = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.hasUsedUndo = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.scoreBV = ii.NumberBV.Borrow(_this._isVegasMode ? 0 : 1000).ReturnBy(_this);
        _this.isContinueBV = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.isGameLoseBV = ii.BooleanBV.Borrow(false).ReturnBy(_this);
        _this.hasNextBV.Bind(function (v) { return _this.__UpdateGameLose(); }, true, _this);
        _this.isContinueBV.Bind(function (v) { return _this.__UpdateGameLose(); }, true, _this);
        return _this;
    }
    SolitaireJu.prototype.__AddFoundationsCount = function () { this.foundationCounts.v += 1; };
    SolitaireJu.prototype.__StopFoundationsCount = function () { this.foundationCounts.SetValueWithoutNotification(-1); };
    Object.defineProperty(SolitaireJu.prototype, "isCard3Mode", {
        get: function () { return this._isCard3Mode; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireJu.prototype, "isVegasMode", {
        get: function () { return this._isVegasMode; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireJu.prototype, "gameType", {
        get: function () { return this._gameType; },
        enumerable: false,
        configurable: true
    });
    //#endregion
    //#region //! 对外事件的绑定机制
    SolitaireJu.prototype.AddEventListener = function (listener) { this.on("__g_SolitaireJuEvent", listener.OnSolitaireDesktopEvent.bind(listener, this), listener.SolitaireJuEventTarget); };
    SolitaireJu.prototype.RemoveEventListener = function (listener) { this.targetOff(listener.SolitaireJuEventTarget); };
    SolitaireJu.prototype.NotifyGameEvent = function (eventTyp, arg1, arg2, arg3, arg4) { this.emit("__g_SolitaireJuEvent", eventTyp, arg1, arg2, arg3, arg4); };
    Object.defineProperty(SolitaireJu.prototype, "Seed", {
        get: function () { return this.m_Rander.seed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireJu.prototype, "CloseAreaGroup", {
        get: function () { return this._closeAreaGroup; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireJu.prototype, "OpenAreaGroup", {
        get: function () { return this._openAreaGroup; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireJu.prototype, "PlayGroups", {
        get: function () { return this._playGroups; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireJu.prototype, "ReceiveGroups", {
        get: function () { return this._receiveGroups; },
        enumerable: false,
        configurable: true
    });
    SolitaireJu.prototype.getPoker = function (point, suit) { return this._pokers[(point - 1) * 4 + suit]; };
    SolitaireJu.prototype.getPlayGroup = function (playIndex) { return this._playGroups[playIndex]; };
    SolitaireJu.prototype.getReceiveGroup = function (receiveIndex) { return this._receiveGroups[receiveIndex]; };
    SolitaireJu.prototype.getOpenGroupPoker = function (index) { return this._openAreaGroup.GetPoker(index); };
    SolitaireJu.prototype.getCloseGroupPoker = function (index) { return this._closeAreaGroup.GetPoker(index); };
    //#region  //! IPokerGroupEventListener
    SolitaireJu.prototype.OnGroupPokerStateChanged = function (poker, status) {
        this.__refreshAllPokerOpenStatus();
        if (poker.location === SolitaireEnums_1.ELocation.PLAY && status === SolitaireEnums_1.EPokerStatus.OPEN) {
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_FLIP_POKER, poker);
        }
    };
    SolitaireJu.prototype.Reset = function () {
        var _this = this;
        this.SetTimerActive(false);
        this._playGroups.forEach(function (g) { return g.targetOff(_this); });
    };
    SolitaireJu.prototype.Enter = function (seed) {
        var snapData = {
            resume: false,
            vegas: this._isVegasMode,
            card3: this._isCard3Mode,
            seed: seed,
            tick: 0,
            hinted: false,
            helped: false,
            player: false,
            undo: false,
        };
        this.EnterWithSnap(snapData);
    };
    SolitaireJu.prototype.Exit = function () {
        this.Return();
    };
    SolitaireJu.prototype.EnterWithTestData = function (testData) {
        var _this = this;
        this.m_Rander = new ii.MCGRand(0);
        this.scoreBV.SetValueWithoutNotification(this._isVegasMode ? 0 : 1000);
        this.hasNextBV.SetValueWithoutNotification(true);
        this.resetMoveStepCount(0);
        this.isHelpedBV.SetValueWithoutNotification(true);
        this.isHintedBV.SetValueWithoutNotification(true);
        this.isPlayerOpenedBV.v = true;
        this.hasUsedUndo.SetValueWithoutNotification(false);
        this._gameTime = 0;
        this.SetTimerActive(true);
        this._closeAreaGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.CLOSE).ReturnBy(this);
        this._closeAreaGroup.AddEventListener(this);
        this._openAreaGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.OPEN).ReturnBy(this);
        this._openAreaGroup.AddEventListener(this);
        for (var i = 0; i < 4; ++i) {
            var pokerGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.RECEIVE).ReturnBy(this);
            pokerGroup.index = this._receiveGroups.length;
            this._receiveGroups.push(pokerGroup);
        }
        for (var i = 0; i < 7; ++i) {
            var pokerGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.PLAY).ReturnBy(this);
            pokerGroup.index = this._playGroups.length;
            this._playGroups.push(pokerGroup);
            pokerGroup.AddEventListener(this);
        }
        // 牌局策略
        this.m_strategyFn = this.__CreateStrategyFunc();
        // 初始化扑克数据
        testData.receives.forEach(function (receive, receiveIndex) {
            receive.forEach(function (p) {
                var poker = new Poker_1.default(p[1], p[0], p[2]);
                poker.initLocation = SolitaireEnums_1.ELocation.RECEIVE;
                _this._pokers.push(poker);
                _this._receiveGroups[receiveIndex].AddPoker(poker);
            });
        });
        testData.plays.forEach(function (play, playIndex) {
            play.forEach(function (p) {
                var poker = new Poker_1.default(p[1], p[0], p[2]);
                poker.initLocation = SolitaireEnums_1.ELocation.PLAY;
                _this._pokers.push(poker);
                _this._playGroups[playIndex].AddPoker(poker);
            });
        });
        testData.open.forEach(function (p) {
            var poker = new Poker_1.default(p[1], p[0], p[2]);
            poker.initLocation = SolitaireEnums_1.ELocation.OPEN;
            _this._pokers.push(poker);
            _this._openAreaGroup.AddPoker(poker);
        });
        testData.close.forEach(function (p) {
            var poker = new Poker_1.default(p[1], p[0], p[2]);
            poker.initLocation = SolitaireEnums_1.ELocation.CLOSE;
            _this._pokers.push(poker);
            _this._closeAreaGroup.AddPoker(poker);
        });
        // 派发初始化牌局的事件
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_INIT, this._pokers);
        // 通知 UI 层,发生变化
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_PLAY, this);
        // 否则在这里才开始订阅
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB);
        // UI 刷新所有 Poker 位置
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_REFRESH_POKERS, this._pokers);
        // 游戏胜利绑定
        this.BindBV(this.isGameWinBV, function (win) {
            if (win) {
                _this.PauseTimer();
            }
        }, true);
        this.BindBV(this.isGameLoseBV, function (lose) {
            if (lose) {
                _this.PauseTimer();
            }
            else {
                _this.ResumeTimer();
            }
        }, true);
    };
    SolitaireJu.prototype.EnterWithSnap = function (snapData) {
        var _this = this;
        this.m_Rander = new ii.MCGRand(snapData.seed);
        console.log("Seed: " + this.m_Rander.seed + " Vegas: " + this._isVegasMode + " 3Cards: " + this._isCard3Mode);
        this.scoreBV.SetValueWithoutNotification(this._isVegasMode ? 0 : 1000);
        this.hasNextBV.SetValueWithoutNotification(true);
        this.resetMoveStepCount(0);
        this.isHelpedBV.SetValueWithoutNotification(snapData.helped);
        this.isHintedBV.SetValueWithoutNotification(snapData.hinted);
        this.isPlayerOpenedBV.v = snapData.player;
        this.hasUsedUndo.SetValueWithoutNotification(snapData.undo);
        this._gameTime = snapData.tick;
        this.SetTimerActive(true);
        this._closeAreaGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.CLOSE).ReturnBy(this);
        this._closeAreaGroup.AddEventListener(this);
        this._openAreaGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.OPEN).ReturnBy(this);
        this._openAreaGroup.AddEventListener(this);
        for (var i = 0; i < 4; ++i) {
            var pokerGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.RECEIVE).ReturnBy(this);
            pokerGroup.index = this._receiveGroups.length;
            this._receiveGroups.push(pokerGroup);
        }
        for (var i = 0; i < 7; ++i) {
            var pokerGroup = new PokerGroup_1.default(SolitaireEnums_1.ELocation.PLAY).ReturnBy(this);
            pokerGroup.index = this._playGroups.length;
            this._playGroups.push(pokerGroup);
            pokerGroup.AddEventListener(this);
        }
        // 牌局策略
        this.m_strategyFn = this.__CreateStrategyFunc();
        // 初始化扑克数据
        for (var point = 1; point <= 13; ++point) {
            for (var suit = 0; suit < 4; ++suit) {
                var poker = new Poker_1.default(point, suit, SolitaireEnums_1.EPokerStatus.CLOSE);
                this._pokers.push(poker);
            }
        }
        // 派发初始化牌局的事件
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_INIT, this._pokers);
        // 将牌放到了发牌区
        for (var i = this._pokers.length - 1; i >= 0; --i) {
            this._pokers[i].initLocation = SolitaireEnums_1.ELocation.CLOSE;
            this._pokers[i].initStatus = SolitaireEnums_1.EPokerStatus.CLOSE;
            this._closeAreaGroup.AddPoker(this._pokers[i]);
        }
        // 洗牌
        this.__shufflePokers(this._closeAreaGroup.pokers);
        if (!snapData.resume) {
            // 非常重要，这里通知 UI 可以订阅数据库事件
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB, this);
        }
        // 通知 UI 层,发生变化
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_PLAY, this);
        // 发牌
        var pokers = [];
        for (var cards = 7; cards >= 1; --cards) {
            for (var i = 0; i < cards; ++i) {
                var playIndex = 7 - cards + i;
                var group = this._playGroups[playIndex];
                var poker = this._closeAreaGroup.RemoveTop();
                poker.initLocation = SolitaireEnums_1.ELocation.PLAY;
                poker.status = i === 0 ? SolitaireEnums_1.EPokerStatus.OPEN : SolitaireEnums_1.EPokerStatus.CLOSE;
                poker.initStatus = poker.status;
                group.AddPoker(poker);
                pokers.push(poker);
            }
        }
        if (!snapData.resume) {
            // 派发通知
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_SEND_POKERS, pokers);
        }
        if (snapData.resume) {
            // 通过操作来初始化
            this.RedoCmds(snapData.cmds);
            // 否则在这里才开始订阅
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB);
            // UI 刷新所有 Poker 位置
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_REFRESH_POKERS, this._pokers);
        }
        // 游戏胜利绑定
        this.BindBV(this.isGameWinBV, function (win) {
            if (win) {
                _this.PauseTimer();
            }
        }, true);
        this.BindBV(this.isGameLoseBV, function (lose) {
            if (lose) {
                _this.PauseTimer();
            }
            else {
                _this.ResumeTimer();
            }
        }, true);
    };
    SolitaireJu.prototype.Snap = function () {
        var snapData = {
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
        };
        return snapData;
    };
    SolitaireJu.prototype.__shufflePokers = function (pokers) {
        for (var i = 0; i < this._CONST_SHUFFLE; ++i) {
            var sIdx = this.m_Rander.range(0, pokers.length - 1);
            var eIdx = this.m_Rander.range(0, pokers.length - 1);
            var tmpVal = pokers[sIdx];
            pokers[sIdx] = pokers[eIdx];
            pokers[eIdx] = tmpVal;
        }
    };
    Object.defineProperty(SolitaireJu.prototype, "gameTime", {
        get: function () { return this._gameTime; },
        enumerable: false,
        configurable: true
    });
    SolitaireJu.prototype.SetTimerActive = function (active) { this._isTimerActive = active; };
    SolitaireJu.prototype.PauseTimer = function () { this._isPauseTimer = true; };
    SolitaireJu.prototype.ResumeTimer = function () { this._isPauseTimer = false; };
    SolitaireJu.prototype.Tick = function () {
        if ((!this._isPauseTimer) && this._isTimerActive) {
            this._gameTime = this._gameTime + 1;
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_TIME_CHANGED, this._gameTime);
        }
    };
    SolitaireJu.prototype.UpdateHasNextStep = function () { this.hasNextBV.v = this.__DoNextStep(true); }; /** 这里涉及到结算，位置要放到最后 */
    SolitaireJu.prototype.__UpdateGameLose = function () {
        var pre = this.isGameLoseBV.v;
        this.isGameLoseBV.v = (!this.isGameWinBV.v) && (!this.isContinueBV.v) && (!this.hasNextBV.v);
        var cur = this.isGameLoseBV.v;
        if (cur && (cur !== pre)) {
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_LOSE);
        }
    };
    SolitaireJu.prototype.__CheckGameWin = function () {
        if (this.isGameWinBV.v) {
            return;
        }
        for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            var rpg = this._receiveGroups[receiveIndex];
            if (!(rpg.top && rpg.top.point === 13)) {
                return;
            }
        }
        this.isGameWinBV.v = true;
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_WIN);
    };
    SolitaireJu.prototype.UpdateMoveStep = function (ignoreStep) {
        this.m_IsStepOperationHintCalculated = false;
        if (!ignoreStep) {
            ++this.moveStepCountBV.v;
        }
        else {
            --this.moveStepCountBV.v;
        }
    };
    SolitaireJu.prototype.resetMoveStepCount = function (count) {
        this.m_IsStepOperationHintCalculated = false;
        this.moveStepCountBV.v = count;
        this.UpdateScore();
    };
    SolitaireJu.prototype.ChangeReceiveScore = function (change) {
        this.pokerReceiveScoreBV.v += change;
    };
    SolitaireJu.prototype.ChangeVegasReceiveScore = function (change) {
        this.vegasReceiveScoreBV.v += change;
    };
    SolitaireJu.prototype.UpdateScore = function (notUpdateScore) {
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        if (notUpdateScore) {
            return;
        }
        if (this._isVegasMode) {
            this.scoreBV.v = this.vegasReceiveScoreBV.v;
        }
        else {
            this.scoreBV.v = this.pokerReceiveScoreBV.v + (1000 - this.moveStepCountBV.v);
        }
    };
    SolitaireJu.prototype.__UpdateOperationHintStatus = function () {
        if (!this.m_IsStepOperationHintCalculated) {
            this.m_OperationHintList = this.__CalculateOperationHints();
            this.m_OperationHintIndex = 0;
            this.m_IsStepOperationHintCalculated = true;
        }
    };
    SolitaireJu.prototype.HasOperationHint = function () {
        this.__UpdateOperationHintStatus();
        return this.m_OperationHintList.length > 0;
    };
    SolitaireJu.prototype.DoOperationHint = function () {
        this.__UpdateOperationHintStatus();
        console.assert(this.HasOperationHint());
        var index = this.m_OperationHintIndex;
        this.m_OperationHintIndex = (this.m_OperationHintIndex + 1) % this.m_OperationHintList.length;
        return this.m_OperationHintList[index];
    };
    // 计算当前可提示的步骤列表
    SolitaireJu.prototype.__CalculateOperationHints = function () {
        var hints = [];
        // PLAY_TO_PLAY
        for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
            var toPlayGroup = this._playGroups[toPlayIndex];
            for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                var fromPlayGroup = this._playGroups[fromPlayIndex];
                if (!fromPlayGroup.IsPokersEmpty() && toPlayGroup.IsConcatPoker(fromPlayGroup.rootOpenPoker)) {
                    hints.push({
                        type: SolitaireType_1.ETOperationHint.PLAY_TO_PLAY,
                        from: fromPlayIndex,
                        to: toPlayIndex
                    });
                }
            }
        }
        // PLAY_TO_RECEIVE
        for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
            var fromPlayGroup = this._playGroups[fromPlayIndex];
            if (!fromPlayGroup.IsPokersEmpty()) {
                for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
                    var toReceiveGroup = this._receiveGroups[toReceiveIndex];
                    if (toReceiveGroup.IsNextPoker(fromPlayGroup.top)) {
                        hints.push({
                            type: SolitaireType_1.ETOperationHint.PLAY_TO_RECEIVE,
                            from: fromPlayIndex,
                            to: toReceiveIndex
                        });
                        // Receive 可以接受 Play 以后， 不用再遍历其他的 Receive 区域
                        break;
                    }
                }
            }
        }
        // OPEN_TO_RECEIVE
        if (this._openAreaGroup.top) {
            for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
                var toReceiveGroup = this._receiveGroups[toReceiveIndex];
                if (toReceiveGroup.IsNextPoker(this._openAreaGroup.top)) {
                    hints.push({
                        type: SolitaireType_1.ETOperationHint.OPEN_TO_RECEIVE,
                        to: toReceiveIndex
                    });
                }
            }
        }
        // OPEN_TO_PLAY
        if (this._openAreaGroup.top) {
            for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
                var toPlayGroup = this._playGroups[toPlayIndex];
                if (toPlayGroup.IsConcatPoker(this._openAreaGroup.top)) {
                    hints.push({
                        type: SolitaireType_1.ETOperationHint.OPEN_TO_PLAY,
                        to: toPlayIndex
                    });
                }
            }
        }
        // CLOSE_TO_OPEN
        if (!this._closeAreaGroup.IsPokersEmpty()) {
            hints.push({
                type: SolitaireType_1.ETOperationHint.CLOSE_TO_OPEN
            });
        }
        // OPEN_TO_CLOSE
        if ((!this._openAreaGroup.IsPokersEmpty()) && this._closeAreaGroup.IsPokersEmpty() && this.IsCanReflip()) {
            hints.push({
                type: SolitaireType_1.ETOperationHint.OPEN_TO_CLOSE
            });
        }
        // RECEIVE_TO_PLAY
        for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
            var toPlayGroup = this._playGroups[toPlayIndex];
            for (var fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex) {
                var fromReceiveGroup = this._receiveGroups[fromReceiveIndex];
                if (!fromReceiveGroup.IsPokersEmpty() && toPlayGroup.IsConcatPoker(fromReceiveGroup.top)) {
                    hints.push({
                        type: SolitaireType_1.ETOperationHint.RECEIVE_TO_PLAY,
                        from: fromReceiveIndex,
                        to: toPlayIndex
                    });
                }
            }
        }
        return hints;
    };
    //#endregion
    //#region User Input Event Handler
    SolitaireJu.prototype.OnPlayPokerClick = function (poker) {
        console.assert(poker.status === SolitaireEnums_1.EPokerStatus.OPEN && poker.location === SolitaireEnums_1.ELocation.PLAY);
        if (poker.isTop) {
            // 1. 尝试放到 Receive 区域,必须从 0 开始遍历
            for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
                var rpg = this._receiveGroups[receiveIndex];
                if (rpg.IsNextPoker(poker)) {
                    return this.__MoveFromPlayToReceive(poker, receiveIndex);
                }
            }
            // 2. 尝试放到 Play 区域的其他组
            for (var playIndex = 0; playIndex < 7; ++playIndex) {
                if (this._playGroups[playIndex].IsConcatPoker(poker)) {
                    return this.__MoveFromPlayToPlay(poker, playIndex);
                }
            }
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker);
        }
        else {
            // 非顶部牌,但是翻开着的牌,只有 Play 区域可以承接
            for (var playIndex = 0; playIndex < 7; ++playIndex) {
                var pgp = this._playGroups[playIndex];
                if (pgp.IsConcatPoker(poker)) {
                    return this.__MoveFromPlayToPlay(poker, playIndex);
                }
            }
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker);
        }
    };
    SolitaireJu.prototype.OnClosePokerClick = function (poker) {
        this.__MoveFromCloseToOpen(poker);
    };
    SolitaireJu.prototype.OnReceivePokerClick = function (poker) {
        console.assert(poker.group.top === poker);
        for (var receiveIndex = 0; receiveIndex < 7; ++receiveIndex) {
            var pgp = this._playGroups[receiveIndex];
            if (pgp.IsConcatPoker(poker)) {
                return this.__MoveFromReceiveToPlay(poker, receiveIndex);
            }
        }
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker);
    };
    SolitaireJu.prototype.OnOpenPokerClick = function (poker) {
        console.assert((poker.location === SolitaireEnums_1.ELocation.OPEN) && poker.isTop);
        // 逻辑是：
        // 1. 如果这张牌,可以放到收牌区,那么就移动到收牌区
        // 询问收牌区是否可以承接此牌,必须从 0 开始遍历
        for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            var rpg = this._receiveGroups[receiveIndex];
            if (rpg.IsNextPoker(poker)) {
                return this.__MoveFromOpenToReceive(poker, receiveIndex);
            }
        }
        // 2. 如果 Play 区域有可以承接此牌的组,那么将 poker 移动到该组
        for (var playIndex = 0; playIndex < 7; ++playIndex) {
            var ppg = this._playGroups[playIndex];
            if (ppg.IsConcatPoker(poker)) {
                return this.__MoveFromOpenToPlay(poker, playIndex);
            }
        }
        // 派发点击无效的消息
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_CLICK_POKER_NO_CHANGE, poker);
    };
    SolitaireJu.prototype.OnClickCloseBottom = function () {
        if (this.IsCanReflip()) {
            this.__MoveFromOpenToClose();
        }
    };
    SolitaireJu.prototype.OnDragToReceive = function (poker, receiveIndex) {
        if (poker.isTop) {
            var rpg = this._receiveGroups[receiveIndex];
            if (rpg.IsNextPoker(poker)) {
                // 做连接的数据操作
                var parent = poker.group;
                if (poker.location === SolitaireEnums_1.ELocation.PLAY) {
                    return this.__MoveFromPlayToReceive(poker, receiveIndex, SolitaireType_1.EActionType.DRAG);
                }
                else if (poker.location === SolitaireEnums_1.ELocation.OPEN) {
                    return this.__MoveFromOpenToReceive(poker, receiveIndex, SolitaireType_1.EActionType.DRAG);
                }
                else {
                    return this.__MoveFromReceiveToReceive(poker, receiveIndex, SolitaireType_1.EActionType.DRAG);
                }
            }
        }
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_NO_CHANGE, poker);
    };
    SolitaireJu.prototype.OnDragToPlay = function (poker, playIndex) {
        if (poker.isTop) {
            // 移动一张牌
            var playGroup = this._playGroups[playIndex];
            if (playGroup.IsConcatPoker(poker)) {
                if (poker.location == SolitaireEnums_1.ELocation.PLAY) {
                    this.__MoveFromPlayToPlay(poker, playIndex, SolitaireType_1.EActionType.DRAG);
                }
                else if (poker.location === SolitaireEnums_1.ELocation.RECEIVE) {
                    this.__MoveFromReceiveToPlay(poker, playIndex, SolitaireType_1.EActionType.DRAG);
                }
                else {
                    this.__MoveFromOpenToPlay(poker, playIndex, SolitaireType_1.EActionType.DRAG);
                }
            }
            else {
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_NO_CHANGE, poker);
            }
        }
        else {
            // 移动一组
            console.assert(poker.location == SolitaireEnums_1.ELocation.PLAY);
            var playGroup = this._playGroups[playIndex];
            if (playGroup.IsConcatPoker(poker)) {
                this.__MoveFromPlayToPlay(poker, playIndex, SolitaireType_1.EActionType.DRAG);
            }
            else {
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_NO_CHANGE, poker);
            }
        }
    };
    SolitaireJu.prototype.IsCanReflip = function () {
        return this.__isCanReflipByCount(this.flipCloseCardsCountBV.v);
    };
    SolitaireJu.prototype.__isCanReflipByCount = function (_flipCloseCardsCount) {
        if (this._isVegasMode) {
            if (this._isCard3Mode) {
                if (_flipCloseCardsCount >= 2) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        return true;
    };
    //#endregion
    //#region //! Move Actions 每一个 __Move 本质对应一个操作
    SolitaireJu.prototype.__MoveFromPlayToPlay = function (poker, toPlayIndex, actTyp, ignoreStep, notUpdateScore) {
        if (actTyp === void 0) { actTyp = SolitaireType_1.EActionType.CLICK; }
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        console.assert(poker.location == SolitaireEnums_1.ELocation.PLAY);
        var g = this._playGroups[toPlayIndex];
        if (poker.isTop) {
            var originGroup = poker.group;
            var isFlip = originGroup.IsAutoFlipOnRemovePoker(poker);
            var fromIndex = poker.groupIndex;
            var toIndex = toPlayIndex;
            poker.group.RemoveTop();
            g.AddPoker(poker);
            this.__StopFoundationsCount();
            if (actTyp !== SolitaireType_1.EActionType.UNDO) {
                // 记录变化
                var cmd = this.NewCmd(SolitaireType_1.ETUndoCmd.PLAY_TO_PLAY).AddChange({
                    typ: SolitaireType_1.EChangeType.MOVE,
                    poker: poker,
                    fromIndex: fromIndex,
                    toIndex: toIndex
                });
                if (isFlip) {
                    cmd.AddChange({
                        typ: SolitaireType_1.EChangeType.FLIP,
                        poker: originGroup.top,
                        status: SolitaireEnums_1.EPokerStatus.OPEN
                    });
                    // 翻牌计分
                    console.assert(originGroup.top.initLocation === SolitaireEnums_1.ELocation.PLAY && originGroup.top.initStatus === SolitaireEnums_1.EPokerStatus.CLOSE);
                    this.ChangeReceiveScore(5);
                }
            }
            this.UpdateMoveStep(ignoreStep);
            this.UpdateScore(notUpdateScore);
            switch (actTyp) {
                case SolitaireType_1.EActionType.CLICK:
                    this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_PLAY, poker);
                    break;
                case SolitaireType_1.EActionType.DRAG:
                    this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_PLAY, poker);
                    break;
                case SolitaireType_1.EActionType.UNDO:
                    this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY, poker);
                    break;
            }
        }
        else {
            var originGroup = poker.group;
            var isFlip = originGroup.IsAutoFlipOnRemovePoker(poker);
            var fromIndex = poker.groupIndex;
            var toIndex = toPlayIndex;
            var pokers = [];
            while (true) {
                var top = originGroup.RemoveTop();
                pokers.push(top);
                if (top == poker) {
                    break;
                }
            }
            for (var pokerIndex = pokers.length - 1; pokerIndex >= 0; --pokerIndex) {
                var p = pokers[pokerIndex];
                g.AddPoker(p);
            }
            this.__StopFoundationsCount();
            if (actTyp !== SolitaireType_1.EActionType.UNDO) {
                // 记录变化
                var cmd = this.NewCmd(SolitaireType_1.ETUndoCmd.PLAY_TO_PLAY).AddChange({
                    typ: SolitaireType_1.EChangeType.MOVE,
                    poker: poker,
                    fromIndex: fromIndex,
                    toIndex: toIndex
                });
                if (isFlip) {
                    cmd.AddChange({
                        typ: SolitaireType_1.EChangeType.FLIP,
                        poker: originGroup.top,
                        status: SolitaireEnums_1.EPokerStatus.OPEN
                    });
                    // 翻牌计分
                    console.assert(originGroup.top.initLocation === SolitaireEnums_1.ELocation.PLAY && originGroup.top.initStatus === SolitaireEnums_1.EPokerStatus.CLOSE);
                    this.ChangeReceiveScore(5);
                }
            }
            this.UpdateMoveStep(ignoreStep);
            this.UpdateScore();
            switch (actTyp) {
                case SolitaireType_1.EActionType.CLICK:
                    this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FROM_PLAY_TO_PLAY, pokers);
                    break;
                case SolitaireType_1.EActionType.DRAG:
                    this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKERS_FROM_PLAY_TO_PLAY, pokers);
                    break;
                case SolitaireType_1.EActionType.UNDO:
                    this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY, pokers);
                    break;
            }
        }
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromPlayToReceive = function (poker, toReceiveIndex, actTyp, ignoreStep, notUpdateScore) {
        if (actTyp === void 0) { actTyp = SolitaireType_1.EActionType.CLICK; }
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        console.assert(poker.location == SolitaireEnums_1.ELocation.PLAY);
        var originGroup = poker.group;
        var fromIndex = originGroup.index;
        var isFlip = originGroup.IsAutoFlipOnRemovePoker(poker);
        var g = this._receiveGroups[toReceiveIndex];
        // 做连接的数据操作
        var p = poker.group.RemoveTop();
        console.assert(p === poker);
        g.AddPoker(poker);
        this.__AddFoundationsCount();
        if (actTyp !== SolitaireType_1.EActionType.UNDO) {
            // 记录变化
            var cmd = this.NewCmd(SolitaireType_1.ETUndoCmd.PLAY_TO_RECEIVE).AddChange({
                typ: SolitaireType_1.EChangeType.MOVE,
                poker: poker,
                fromIndex: fromIndex,
                toIndex: toReceiveIndex
            });
            if (isFlip) {
                cmd.AddChange({
                    typ: SolitaireType_1.EChangeType.FLIP,
                    poker: originGroup.top,
                    status: SolitaireEnums_1.EPokerStatus.OPEN
                });
                // 翻牌计分
                console.assert(originGroup.top.initLocation === SolitaireEnums_1.ELocation.PLAY && originGroup.top.initStatus === SolitaireEnums_1.EPokerStatus.CLOSE);
                this.ChangeReceiveScore(5);
            }
            // 收牌计分
            this.ChangeReceiveScore((poker.initLocation === SolitaireEnums_1.ELocation.PLAY && poker.initStatus === SolitaireEnums_1.EPokerStatus.OPEN) ? 15 : 10);
            this.ChangeVegasReceiveScore(5);
        }
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        switch (actTyp) {
            case SolitaireType_1.EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE, poker);
                break;
            case SolitaireType_1.EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE, poker);
                break;
            case SolitaireType_1.EActionType.UNDO:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE, poker);
                break;
        }
        this.__CheckGameWin();
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromReceiveToPlay = function (poker, toPlayIndex, actTyp, ignoreStep, notUpdateScore) {
        if (actTyp === void 0) { actTyp = SolitaireType_1.EActionType.CLICK; }
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        console.assert(poker.location == SolitaireEnums_1.ELocation.RECEIVE);
        var originGroup = poker.group;
        var fromIndex = originGroup.index;
        var g = this._playGroups[toPlayIndex];
        var p = poker.group.RemoveTop();
        console.assert(p === poker);
        g.AddPoker(poker);
        this.__StopFoundationsCount();
        if (actTyp !== SolitaireType_1.EActionType.UNDO) {
            // 记录变化
            this.NewCmd(SolitaireType_1.ETUndoCmd.RECEIVE_TO_PLAY).AddChange({
                typ: SolitaireType_1.EChangeType.MOVE,
                poker: poker,
                fromIndex: fromIndex,
                toIndex: toPlayIndex
            });
        }
        // 收牌计分
        this.ChangeReceiveScore((poker.initLocation === SolitaireEnums_1.ELocation.PLAY && poker.initStatus === SolitaireEnums_1.EPokerStatus.OPEN) ? -15 : -10);
        this.ChangeVegasReceiveScore(-5);
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        switch (actTyp) {
            case SolitaireType_1.EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY, poker);
                break;
            case SolitaireType_1.EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY, poker);
                break;
            case SolitaireType_1.EActionType.UNDO:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY, poker);
                break;
        }
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromOpenToPlay = function (poker, toPlayIndex, actTyp, ignoreStep) {
        if (actTyp === void 0) { actTyp = SolitaireType_1.EActionType.CLICK; }
        if (ignoreStep === void 0) { ignoreStep = false; }
        console.assert(poker.location == SolitaireEnums_1.ELocation.OPEN && (actTyp !== SolitaireType_1.EActionType.UNDO));
        var g = this._playGroups[toPlayIndex];
        var p = poker.group.RemoveTop();
        console.assert(p === poker);
        g.AddPoker(poker);
        this.__StopFoundationsCount();
        // 记录变化
        this.NewCmd(SolitaireType_1.ETUndoCmd.OPEN_TO_PLAY).AddChange({
            typ: SolitaireType_1.EChangeType.MOVE,
            poker: poker,
            toIndex: toPlayIndex
        });
        // 移动计分
        console.assert(poker.initLocation === SolitaireEnums_1.ELocation.CLOSE);
        this.ChangeReceiveScore(5);
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore();
        switch (actTyp) {
            case SolitaireType_1.EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_PLAY, poker);
                break;
            case SolitaireType_1.EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_PLAY, poker);
                break;
            case SolitaireType_1.EActionType.UNDO:
                console.error('不可能出现');
                break;
        }
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromOpenToReceive = function (poker, toReceiveIndex, actTyp, ignoreStep) {
        if (actTyp === void 0) { actTyp = SolitaireType_1.EActionType.CLICK; }
        if (ignoreStep === void 0) { ignoreStep = false; }
        // console.assert(poker.location == ELocation.OPEN && (actTyp !== EActionType.UNDO))
        var g = this._receiveGroups[toReceiveIndex];
        poker.group.RemoveTop();
        g.AddPoker(poker);
        this.__AddFoundationsCount();
        // 记录变化
        this.NewCmd(SolitaireType_1.ETUndoCmd.OPEN_TO_RECEIVE).AddChange({
            typ: SolitaireType_1.EChangeType.MOVE,
            poker: poker,
            toIndex: toReceiveIndex
        });
        // 移动计分
        console.assert(poker.initLocation === SolitaireEnums_1.ELocation.CLOSE);
        this.ChangeReceiveScore(15);
        this.ChangeVegasReceiveScore(5);
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore();
        switch (actTyp) {
            case SolitaireType_1.EActionType.CLICK:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE, poker);
                break;
            case SolitaireType_1.EActionType.DRAG:
                this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE, poker);
                break;
            case SolitaireType_1.EActionType.UNDO:
                console.error('不可能出现');
                break;
        }
        this.__CheckGameWin();
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromReceiveToReceive = function (poker, toReceiveIndex, actTyp, ignoreStep, notUpdateScore) {
        if (actTyp === void 0) { actTyp = SolitaireType_1.EActionType.CLICK; }
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        var originGroup = poker.group;
        var fromIndex = originGroup.index;
        var g = this._receiveGroups[toReceiveIndex];
        originGroup.RemoveTop();
        g.AddPoker(poker);
        if (actTyp !== SolitaireType_1.EActionType.UNDO) {
            // 记录变化
            this.NewCmd(SolitaireType_1.ETUndoCmd.RECEIVE_TO_RECEIVE).AddChange({
                typ: SolitaireType_1.EChangeType.MOVE,
                poker: poker,
                fromIndex: fromIndex,
                toIndex: toReceiveIndex
            });
        }
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE, poker);
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromCloseToOpen = function (poker, ignoreStep) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        // console.assert((poker.location === ELocation.CLOSE) && poker.isTop)
        if (this._isCard3Mode) {
            // 3 cards
            var group = poker.group;
            var pokers = [];
            var cmd = this.NewCmd(SolitaireType_1.ETUndoCmd.CLOSES_TO_OPEN);
            while (true) {
                pokers.push(group.RemoveTop());
                this._openAreaGroup.AddPoker(pokers[pokers.length - 1]);
                if (pokers.length == 3 || group.IsPokersEmpty()) {
                    break;
                }
            }
            cmd.AddChange({
                typ: SolitaireType_1.EChangeType.MOVE,
                pokers: pokers,
            });
            this.UpdateMoveStep(ignoreStep);
            this.UpdateScore();
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN, pokers);
        }
        else {
            poker.group.RemoveTop();
            this._openAreaGroup.AddPoker(poker);
            // 记录变化
            this.NewCmd(SolitaireType_1.ETUndoCmd.CLOSE_TO_OPEN).AddChange({
                typ: SolitaireType_1.EChangeType.MOVE,
                poker: poker,
            });
            this.UpdateMoveStep(ignoreStep);
            this.UpdateScore();
            this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_CLOSE_TO_OPEN, poker);
        }
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromOpenToClose = function (ignoreStep) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (!this._closeAreaGroup.IsPokersEmpty()) {
            return;
        }
        this.flipCloseCardsCountBV.v += 1;
        var isPokerMove = !this._openAreaGroup.IsPokersEmpty();
        if (!isPokerMove) {
            return;
        }
        var pokers = [];
        while (!this._openAreaGroup.IsPokersEmpty()) {
            var poker = this._openAreaGroup.RemoveTop();
            this._closeAreaGroup.AddPoker(poker);
            pokers.push(poker);
        }
        // 记录变化
        this.NewCmd(SolitaireType_1.ETUndoCmd.OPEN_TO_CLOSE).AddChange({
            typ: SolitaireType_1.EChangeType.MOVE,
            pokers: pokers,
        });
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore();
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE, pokers);
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromPlayToOpenForUndo = function (poker, ignoreStep, notUpdateScore) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        // console.assert(poker.location == ELocation.PLAY)
        poker.group.RemoveTop();
        this._openAreaGroup.AddPoker(poker);
        // 移动计分
        console.assert(poker.initLocation === SolitaireEnums_1.ELocation.CLOSE);
        this.ChangeReceiveScore(-5);
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN, poker);
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromReceiveToOpenForUndo = function (poker, ignoreStep, notUpdateScore) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        // console.assert(poker.location == ELocation.RECEIVE)        
        poker.group.RemoveTop();
        this._openAreaGroup.AddPoker(poker);
        // 移动计分
        console.assert(poker.initLocation === SolitaireEnums_1.ELocation.CLOSE);
        this.ChangeReceiveScore(-15);
        this.ChangeVegasReceiveScore(-5);
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN, poker);
        this.UpdateHasNextStep();
    };
    // 原操作：一整叠牌移动到 Close 区域
    SolitaireJu.prototype.__MoveFromCloseToOpenForUndo = function (pokers, ignoreStep, notUpdateScore) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        var ps = [];
        for (var i = pokers.length - 1; i >= 0; --i) {
            var poker = pokers[i];
            this._closeAreaGroup.RemoveTop();
            this._openAreaGroup.AddPoker(poker);
            ps.push(poker);
        }
        this.flipCloseCardsCountBV.v -= 1;
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN, ps);
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MoveFromOpenToCloseForUndo = function (poker, ignoreStep, notUpdateScore) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        // console.assert(poker.location == ELocation.OPEN)        
        poker.group.RemoveTop();
        this._closeAreaGroup.AddPoker(poker);
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE, poker);
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.__MovePokersFromOpenToCloseForUndo = function (pokers, ignoreStep, notUpdateScore) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (notUpdateScore === void 0) { notUpdateScore = false; }
        for (var i = pokers.length - 1; i >= 0; --i) {
            var poker = pokers[i];
            poker.group.RemoveTop();
            this._closeAreaGroup.AddPoker(poker);
        }
        this.UpdateMoveStep(ignoreStep);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE, pokers);
        this.UpdateHasNextStep();
    };
    SolitaireJu.prototype.OnUndoStatusChanged = function (length) { this.undoLengthBV.v = length; };
    SolitaireJu.prototype.Undo = function (ignoreStep) {
        if (ignoreStep === void 0) { ignoreStep = false; }
        if (this.undoLengthBV.v > 0) {
            this.hasUsedUndo.v = true;
            var cmd = this.undoCmdStack.pop();
            for (var i = cmd.cmdChanges.length - 1; i >= 0; --i) {
                var change = cmd.cmdChanges[i];
                switch (change.typ) {
                    case SolitaireType_1.EChangeType.FLIP:
                        this.UndoFlip(change, i > 0);
                        break;
                    case SolitaireType_1.EChangeType.MOVE:
                        this.UndoMoveChangeByCmdType(cmd.cmdType, change, ignoreStep, i > 0);
                        break;
                }
            }
        }
        else {
            ii.UIMgr.ins.ShowMsg("solitaire.no_undo_step");
        }
    };
    SolitaireJu.prototype.NewCmd = function (cmdType) {
        var cmd = new SolitaireType_1.Cmd(cmdType, []);
        this.undoCmdStack.push(cmd);
        return cmd;
    };
    SolitaireJu.prototype.UndoFlip = function (change, notUpdateScore) {
        change.poker.status = change.status === SolitaireEnums_1.EPokerStatus.OPEN ? SolitaireEnums_1.EPokerStatus.CLOSE : SolitaireEnums_1.EPokerStatus.OPEN;
        // 翻牌计分
        console.assert(change.poker.initLocation === SolitaireEnums_1.ELocation.PLAY && change.poker.initStatus === SolitaireEnums_1.EPokerStatus.CLOSE);
        this.ChangeReceiveScore(-5);
        this.UpdateScore(notUpdateScore);
        this.NotifyGameEvent(SolitaireEvent_1.SolitaireEvent.SC_FLIP_POKER, change.poker);
    };
    SolitaireJu.prototype.SnapUndoCmds = function () { return this.undoCmdStack.Snap(); };
    SolitaireJu.prototype.RedoCmds = function (_cmds) {
        var _this = this;
        var cmds = this.ConvertCmds(_cmds);
        cmds.forEach(function (cmd) {
            _this.ResumeCmd(cmd.cmdType, cmd.cmdChanges);
        });
    };
    SolitaireJu.prototype.ConvertCmds = function (cmds) {
        var _this = this;
        return cmds.map(function (cmd) {
            var c = new SolitaireType_1.Cmd(cmd.cmdType, []);
            cmd.cmdChanges.forEach(function (snapChange) { return c.AddChange({
                typ: snapChange.typ,
                poker: snapChange.poker == null ? null : _this.getPoker(snapChange.poker.point, snapChange.poker.suit),
                pokers: snapChange.pokers == null ? null : snapChange.pokers.map(function (poker) { return _this.getPoker(poker.point, poker.suit); }),
                fromIndex: snapChange.fromIndex,
                toIndex: snapChange.toIndex,
                status: snapChange.status
            }); });
            return c;
        });
    };
    //#region Undo Resume
    SolitaireJu.prototype.UndoMoveChangeByCmdType = function (cmdType, change, ignoreStep, notUpdateScore) {
        switch (cmdType) {
            case SolitaireType_1.ETUndoCmd.PLAY_TO_PLAY:
                this.__MoveFromPlayToPlay(change.poker, change.fromIndex, SolitaireType_1.EActionType.UNDO, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.PLAY_TO_RECEIVE:
                this.__MoveFromReceiveToPlay(change.poker, change.fromIndex, SolitaireType_1.EActionType.UNDO, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.RECEIVE_TO_PLAY:
                this.__MoveFromPlayToReceive(change.poker, change.fromIndex, SolitaireType_1.EActionType.UNDO, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.RECEIVE_TO_RECEIVE:
                this.__MoveFromReceiveToReceive(change.poker, change.fromIndex, SolitaireType_1.EActionType.UNDO, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.OPEN_TO_PLAY:
                this.__MoveFromPlayToOpenForUndo(change.poker, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.OPEN_TO_RECEIVE:
                this.__MoveFromReceiveToOpenForUndo(change.poker, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.OPEN_TO_CLOSE:
                // 原操作：一整叠牌移动到 Close 区域
                this.__MoveFromCloseToOpenForUndo(change.pokers, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.CLOSE_TO_OPEN:
                this.__MoveFromOpenToCloseForUndo(change.poker, ignoreStep, notUpdateScore);
                break;
            case SolitaireType_1.ETUndoCmd.CLOSES_TO_OPEN:
                this.__MovePokersFromOpenToCloseForUndo(change.pokers, ignoreStep, notUpdateScore);
                break;
        }
    };
    SolitaireJu.prototype.ResumeCmd = function (cmdType, changes) {
        var _this = this;
        switch (cmdType) {
            case SolitaireType_1.ETUndoCmd.PLAY_TO_PLAY:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromPlayToPlay(change.poker, change.toIndex); });
                break;
            case SolitaireType_1.ETUndoCmd.PLAY_TO_RECEIVE:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromPlayToReceive(change.poker, change.toIndex); });
                break;
            case SolitaireType_1.ETUndoCmd.RECEIVE_TO_PLAY:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromReceiveToPlay(change.poker, change.toIndex); });
                break;
            case SolitaireType_1.ETUndoCmd.RECEIVE_TO_RECEIVE:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromReceiveToReceive(change.poker, change.toIndex); });
                break;
            case SolitaireType_1.ETUndoCmd.OPEN_TO_PLAY:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromOpenToPlay(change.poker, change.toIndex); });
                break;
            case SolitaireType_1.ETUndoCmd.OPEN_TO_RECEIVE:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromOpenToReceive(change.poker, change.toIndex); });
                break;
            case SolitaireType_1.ETUndoCmd.OPEN_TO_CLOSE:
                // 原操作：一整叠牌移动到 Close 区域
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromOpenToClose(); });
                break;
            case SolitaireType_1.ETUndoCmd.CLOSE_TO_OPEN:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromCloseToOpen(change.poker); });
                break;
            case SolitaireType_1.ETUndoCmd.CLOSES_TO_OPEN:
                this.__ResumeOnceForTypeOfMove(changes, function (change) { return _this.__MoveFromCloseToOpen(change.pokers[0]); });
                break;
        }
    };
    SolitaireJu.prototype.__ResumeOnceForTypeOfMove = function (changes, callback) {
        for (var index = 0; index < changes.length; ++index) {
            var change = changes[index];
            if (change.typ == SolitaireType_1.EChangeType.MOVE) {
                callback(change);
                break;
            }
        }
    };
    //#endregion
    //#endregion 撤销功能
    //#region //! 自动玩牌
    SolitaireJu.prototype.OnUseHelp = function () {
        this.isHelpedBV.v = true;
        this.isPlayerOpenedBV.v = true;
    };
    // 数据战斗
    SolitaireJu.prototype.AutoServerPlay = function () { return this.AutoServerPlayStepNext(); };
    SolitaireJu.prototype.AutoServerPlayStepNext = function () {
        if (this.isGameWinBV.v) {
            return true;
        }
        if (this.m_strategyFn(false)) {
            return this.AutoServerPlayStepNext();
        }
        else {
            return false;
        }
    };
    SolitaireJu.prototype.__refreshAllPokerOpenStatus = function () {
        this.isAllPokersOpenBV.v = this._pokers.reduce(function (isAllOpen, curentPoker) { return isAllOpen && (curentPoker.status === SolitaireEnums_1.EPokerStatus.OPEN); }, true);
    };
    SolitaireJu.prototype.ChangeAutoPlayInterval = function (duration) { this.m_AutoPlayingInterval = duration; }; /** 更新自动播放的时间间隔 */
    SolitaireJu.prototype.AutoPlayStepNext = function (callback) {
        var _this = this;
        if (!(this.isAutoPlayingBV.v || this.isAutoCollectingBV.v)) {
            return;
        }
        if (this.isGameWinBV.v) {
            this.isAutoPlayingBV.v = false;
            this.isAutoCollectingBV.v = false;
            if (callback) {
                return callback(true, this.Seed, this);
            }
            return;
        }
        if (this.m_strategyFn(false)) {
            if (this.m_AutoPlayingInterval === 0) {
                return this.AutoPlayStepNext(callback);
            }
            else {
                ii.App.ins.delayCall(this.m_AutoPlayingInterval, function () { return _this.AutoPlayStepNext(callback); });
            }
        }
        else {
            this.isAutoPlayingBV.v = false;
            this.isAutoCollectingBV.v = false;
            if (callback) {
                return callback(false, this.Seed, this);
            }
        }
    };
    SolitaireJu.prototype.AutoPlay = function (interval, callback) {
        var _this = this;
        console.assert((!this.isAutoPlayingBV.v) && (!this.isAutoCollectingBV.v));
        this.ChangeAutoPlayInterval(interval);
        this.isAutoPlayingBV.v = true;
        ii.App.ins.delayCall(this.m_AutoPlayingInterval, function () { return _this.AutoPlayStepNext(callback); });
    };
    SolitaireJu.prototype.AutoCollect = function (interval) {
        console.assert(this.isAllPokersOpenBV.v && (!this.isAutoPlayingBV.v) && (!this.isAutoCollectingBV.v));
        this.ChangeAutoPlayInterval(interval);
        this.isAutoCollectingBV.v = true;
        this.AutoPlayStepNext();
    };
    SolitaireJu.prototype.StopAutoPlay = function () { this.isAutoPlayingBV.v = false; };
    SolitaireJu.prototype.NextStep = function () { this.__DoNextStep(false); };
    SolitaireJu.prototype.__DoNextStep = function (noPlay) {
        if (!(this.isGameWinBV.v)) {
            if (this.m_strategyFn) {
                return this.m_strategyFn(noPlay);
            }
        }
        return false;
    };
    //#endregion 自动玩牌
    //#region //! 自动玩牌的策略
    /*********************************************************************
     * 【Common】: 【Play 区域的其他牌可以移动到 playPoker, 并导致翻牌】
     *********************************************************************/
    SolitaireJu.prototype.__CreateStrategyFunc = function () {
        var _this = this;
        if (this._isCard3Mode) {
            return function (noPlay) {
                return false
                    || _this.AutoPlayFlipOnPlayToReceive(noPlay) /*【Play 到 Receive, 导致翻牌】*/
                    || _this.AutoPlayFlipOnPlayToPlay(noPlay) /* 【Play 到 Play, 导致翻牌】 */
                    || _this.AutoPlayNoFlipOpenToReceive(noPlay) /* Open 到 Receive */
                    || _this.AutoPlayNoFlipOnPlayToReceiveToCreateEmptyPlayGroup(noPlay) /*【Play 到 Receive, 导致空列】*/
                    || _this.AutoPlayFlipOnOpenToPlay(noPlay) /* Open 到 Play, 出现 【Common】 */
                    || _this.AutoPlayFlipOnReceiveToPlay(noPlay) /* Receive 到 Play, 出现 【Common】 */
                    || _this.AutoPlayFlipOnCloseToPlay(noPlay) /* Close 到 Play, 出现 【Common】 */
                    || _this.AutoPlayFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play, 出现 【Common】 */
                    /**********************************************************************************************************/
                    || _this.AutoPlayNoFlipOnPlayToPlayToCreateEmptyPlayGroup(noPlay) /* 移动 Play 到另一组，腾出一列空列（前提：没有空列） */
                    || _this.AutoPlayNoFlipOnPlayToReceive(noPlay) /* Play 到 Receive */
                    || _this.AutoPlayNoFlipCloseToReceive(noPlay) /* Close 到 Receive */
                    || _this.AutoPlayNoFlipOnOpenToPlay(noPlay) /* Open 到 Play */
                    || _this.AutoPlayNoFlipUnderOpenToReceive(noPlay) /* UnderOpen 到 Receive */
                    || _this.AutoPlayNoFlipOnCloseToPlay(noPlay) /* Close 到 Play */
                    || _this.AutoPlayNoFlipOnUnderOpenToPlay(noPlay); /* UnderOpen 到 Play */
            };
        }
        else {
            /* 【Common】: 【Play 区域的其他牌可以移动到这组, 并导致翻牌】 */
            return function (noPlay) {
                return false
                    //! 直接进入最佳的收牌状态
                    || _this.AutoPlayBestFitPlayToReceive(noPlay) //! 1
                    || _this.AutoPlayBestFitOpenToReceive(noPlay) //! 2
                    //! Close 区域到第一张牌翻出来，会导致 2
                    || _this.AutoPlayBestFitTopCloseToReceive(noPlay) //! 3
                    //! Close 区域无牌，重新发牌后的第一张，导致 2
                    || _this.AutoPlayBestFitBottomOpenToReceive(noPlay) //! 4
                    //! 收一张牌且导致翻牌
                    || _this.AutoPlayFlipOnPlayToReceive(noPlay) /*【Play 到 Receive, 导致翻牌】*/ //! 5
                    //! 移动一张牌且导致翻牌
                    || _this.AutoPlayFlipOnPlayToPlay(noPlay) /* 【Play 到 Play, 导致翻牌】 */ //! 6
                    //! Play 到 Receive, 导致空列
                    || _this.AutoPlayNoFlipOnPlayToReceiveToCreateEmptyPlayGroup(noPlay)
                    //! Open(3) -> PlayA(4) , PlayB(2) -> PlayA(4,3), PlayB 翻牌
                    || _this.AutoPlayFlipOnOpenToPlay(noPlay)
                    //! Receive(3) -> PlayA(4) , PlayB(2) -> PlayA(4,3), PlayB 翻牌
                    || _this.AutoPlayFlipOnReceiveToPlay(noPlay)
                    //! 直接收牌： Open -> Receive
                    || _this.AutoPlayNoFlipOpenToReceive(noPlay)
                    //! 直接收牌： Open -> Play
                    || _this.AutoPlayNoFlipOnOpenToPlay(noPlay)
                    || _this.AutoPlayFlipOnCloseToPlay(noPlay) /* Close 到 Play, 出现 【Common】 */
                    || _this.AutoPlayFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play, 出现 【Common】 */
                    /**********************************************************************************************************/
                    || _this.AutoPlayFlipOnOpenToPlayByTwoPokers(noPlay)
                    || _this.AutoPlayFlipOnReceiveToPlayByTwoPokers(noPlay)
                    || _this.AutoPlayFlipOnCloseToPlayByTwoPokers(noPlay)
                    || _this.AutoPlayFlipOnUnderOpenToPlayByTwoPokers(noPlay)
                    /**********************************************************************************************************/
                    || _this.AutoPlayNoFlipOnPlayToPlayToCreateEmptyPlayGroup(noPlay) /* 移动 Play 到另一组，腾出一列空列（前提：没有空列） */
                    || _this.AutoPlayNoFlipOnPlayToReceive(noPlay) /* Play 到 Receive */
                    || _this.AutoPlayNoFlipCloseToReceive(noPlay) /* Close 到 Receive */
                    || _this.AutoPlayNoFlipUnderOpenToReceive(noPlay) /* UnderOpen 到 Receive */
                    || _this.AutoPlayNoFlipOnCloseToPlay(noPlay) /* Close 到 Play */
                    || _this.AutoPlayNoFlipOnUnderOpenToPlay(noPlay) /* UnderOpen 到 Play */
                    || _this.AutoPlayNoFlipOnPlayToPlayToMakeReceive(noPlay); /** PlayA(红心9,黑桃8) -> PlayB(方块9)， PlayA(红心9) -> Receive */
            };
        }
    };
    // 牌从 Play 到 Receive，这张牌恰巧和收牌区的牌的点数差距不超过 1 （比如上面 是 1, 2, 1, 2，那么 2 最适合放到上面去)
    SolitaireJu.prototype.AutoPlayBestFitPlayToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        // 1 顶部为空，找 A
        var hasEmpty = false;
        var minPoint = 13;
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if (toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                    var fromPlayGroup = this._playGroups[fromPlayIndex];
                    var topPoker = fromPlayGroup.top;
                    if (topPoker && topPoker.point == 1) {
                        if (!noPlay) {
                            this.__MoveFromPlayToReceive(topPoker, toReceiveIndex);
                        }
                        return true;
                    }
                }
            }
            else {
                var top = toReceiveGroup.top;
                if (top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if (hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if (minPoint === 13) {
            return false;
        }
        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否在 Play 区域
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            var top = toReceiveGroup.top;
            if (top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                    var fromPlayGroup = this._playGroups[fromPlayIndex];
                    var topPoker = fromPlayGroup.top;
                    if (topPoker && toReceiveGroup.IsNextPoker(topPoker)) {
                        if (!noPlay) {
                            this.__MoveFromPlayToReceive(topPoker, toReceiveIndex);
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    };
    // 牌从 Open 到 Receive，这张牌恰巧和收牌区的牌的点数差距不超过 1 （比如上面 是 1, 2, 1, 2，那么 2 最适合放到上面去)
    SolitaireJu.prototype.AutoPlayBestFitOpenToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this._openAreaGroup.IsPokersEmpty()) {
            return false;
        }
        // 1 顶部为空，找 A
        var hasEmpty = false;
        var minPoint = 13;
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if (toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                var topPoker = this._openAreaGroup.top;
                if (topPoker && topPoker.point == 1) {
                    if (!noPlay) {
                        this.__MoveFromOpenToReceive(topPoker, toReceiveIndex);
                    }
                    return true;
                }
            }
            else {
                var top = toReceiveGroup.top;
                if (top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if (hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if (minPoint === 13) {
            return false;
        }
        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否在 Play 区域
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            var top = toReceiveGroup.top;
            if (top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                var topPoker = this._openAreaGroup.top;
                if (topPoker && toReceiveGroup.IsNextPoker(topPoker)) {
                    if (!noPlay) {
                        this.__MoveFromOpenToReceive(topPoker, toReceiveIndex);
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnPlayToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                var fromPlayGroup = this._playGroups[fromPlayIndex];
                var topOpenPoker = fromPlayGroup.top;
                if (topOpenPoker && toReceiveGroup.IsNextPoker(topOpenPoker) && fromPlayGroup.IsAutoFlipOnRemovePoker(topOpenPoker)) {
                    if (!noPlay) {
                        this.__MoveFromPlayToReceive(topOpenPoker, toReceiveIndex);
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnPlayToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
            var toPlayGroup = this._playGroups[toPlayIndex];
            for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                var fromPlayGroup = this._playGroups[fromPlayIndex];
                var rootOpenPoker = fromPlayGroup.rootOpenPoker;
                if (rootOpenPoker && toPlayGroup.IsConcatPoker(rootOpenPoker) && fromPlayGroup.IsAutoFlipOnRemovePoker(rootOpenPoker)) {
                    if (!noPlay) {
                        this.__MoveFromPlayToPlay(rootOpenPoker, toPlayIndex);
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayBestFitTopCloseToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this._closeAreaGroup.IsPokersEmpty()) {
            return false;
        }
        // 1 顶部为空，找 A
        var hasEmpty = false;
        var minPoint = 13;
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if (toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                var topPoker = this._closeAreaGroup.top;
                if (topPoker && topPoker.point == 1) {
                    if (!noPlay) {
                        this.__MoveFromCloseToOpen(topPoker);
                    }
                    return true;
                }
            }
            else {
                var top = toReceiveGroup.top;
                if (top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if (hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if (minPoint === 13) {
            return false;
        }
        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否在
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            var top = toReceiveGroup.top;
            if (top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                var topOpenPoker = this._closeAreaGroup.top;
                if (topOpenPoker && toReceiveGroup.IsNextPoker(topOpenPoker)) {
                    if (!noPlay) {
                        this.__MoveFromCloseToOpen(topOpenPoker);
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayBestFitBottomOpenToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (!this.IsCanReflip()) {
            return false;
        }
        if (!this._closeAreaGroup.IsPokersEmpty()) {
            return false;
        }
        if (this._openAreaGroup.IsPokersEmpty()) {
            return false;
        }
        // 1 顶部为空，找 A
        var hasEmpty = false;
        var minPoint = 13;
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            if (toReceiveGroup.IsPokersEmpty()) {
                // 找 A
                hasEmpty = true;
                var bottomPoker = this._openAreaGroup.zero;
                if (bottomPoker && bottomPoker.point == 1) {
                    if (!noPlay) {
                        this.__MoveFromOpenToClose();
                    }
                    return true;
                }
            }
            else {
                var top = toReceiveGroup.top;
                if (top.point < minPoint) {
                    minPoint = top.point;
                }
            }
        }
        if (hasEmpty) {
            // 有空位，但是找不到 A
            return false;
        }
        if (minPoint === 13) {
            return false;
        }
        // 2. 顶部不为空，查找最小的一张牌，找比它大 1 的牌是否存在
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            var top = toReceiveGroup.top;
            if (top.point == minPoint) {
                // 查找比它大 1 点的牌有没有在 Play 区域
                var bottomPoker = this._openAreaGroup.zero;
                if (bottomPoker && toReceiveGroup.IsNextPoker(bottomPoker)) {
                    if (!noPlay) {
                        this.__MoveFromOpenToClose();
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOpenToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        var receiveIndex = this.__receiveIndexForPoker(this._openAreaGroup.top);
        if (receiveIndex !== -1) {
            if (!noPlay) {
                this.__MoveFromOpenToReceive(this._openAreaGroup.top, receiveIndex);
            }
            return true;
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnOpenToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        var toPlayIndex = this.__playIndexForPoker(this._openAreaGroup.top);
        if (toPlayIndex !== -1) {
            if (!noPlay) {
                this.__MoveFromOpenToPlay(this._openAreaGroup.top, toPlayIndex);
            }
            return true;
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnPlayToReceiveToCreateEmptyPlayGroup = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
            var toReceiveGroup = this._receiveGroups[toReceiveIndex];
            for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                var fromPlayGroup = this._playGroups[fromPlayIndex];
                var topOpenPoker = fromPlayGroup.top;
                if (topOpenPoker && toReceiveGroup.IsNextPoker(topOpenPoker) && topOpenPoker === fromPlayGroup.zero) {
                    if (!noPlay) {
                        this.__MoveFromPlayToReceive(topOpenPoker, toReceiveIndex);
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnOpenToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        var toPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play(this._openAreaGroup.top);
        if (toPlayIndex !== -1) {
            if (!noPlay) {
                this.__MoveFromOpenToPlay(this._openAreaGroup.top, toPlayIndex);
            }
            return true;
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnCloseToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var index = this._closeAreaGroup.pokers.length - this.cardMode; index >= 0;) {
            var toPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play(this._closeAreaGroup.pokers[index]);
            if (toPlayIndex !== -1) {
                if (!noPlay) {
                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                }
                return true;
            }
            if (this._isCard3Mode && index - this.cardMode < 0 && index > 0) {
                index = 0;
            }
            else {
                index = index - this.cardMode;
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnUnderOpenToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (!this.IsCanReflip()) {
            return false;
        }
        for (var index = this.cardMode - 1; index < this._openAreaGroup.pokers.length - 1; index = index + this.cardMode) {
            var fromPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play(this._openAreaGroup.pokers[index]);
            if (fromPlayIndex !== -1) {
                if (!noPlay) {
                    if (this._closeAreaGroup.top) {
                        this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                    }
                    else {
                        this.__MoveFromOpenToClose();
                    }
                }
                return true;
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnOpenToPlayByTwoPokers = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this._isCard3Mode) {
            return false;
        }
        var movePoker = this._openAreaGroup.top;
        var toPlayIndex = this.__playIndexForPoker(movePoker);
        if (toPlayIndex !== -1) {
            // 1. UnderOpen 第一张可以下来，造成 【Common】
            // OpenPoker -> Play | UnderOpenPoker -> OpenPoker | Play -> UnderOpenPoker | Flip
            if (movePoker.IsConcatable(this._openAreaGroup.underTop)) {
                var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(this._openAreaGroup.underTop);
                if (fromPlayIndex !== -1) {
                    if (!noPlay) {
                        this.__MoveFromOpenToPlay(movePoker, toPlayIndex);
                    }
                    return true;
                }
            }
            // 2. receive 区域有牌可以下来，造成 【Common】
            // OpenPoker -> Play | ReceivePoker -> OpenPoker | Play -> ReceivePoker | Flip
            for (var fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex) {
                var fromReceivePoker = this._receiveGroups[fromReceiveIndex].top;
                if (movePoker.IsConcatable(fromReceivePoker)) {
                    var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker);
                    if (fromPlayIndex !== -1) {
                        if (!noPlay) {
                            this.__MoveFromOpenToPlay(movePoker, toPlayIndex);
                        }
                        return true;
                    }
                }
            }
            // 3. Close 可以下来，造成 【Common】
            // OpenPoker -> Play | ClosePoker -> OpenPoker | Play -> ClosePoker | Flip
            for (var index = this._closeAreaGroup.pokers.length - 1; index >= 0; --index) {
                var closePoker = this._closeAreaGroup.pokers[index];
                if (movePoker.IsConcatable(closePoker)) {
                    var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker);
                    if (fromPlayIndex !== -1) {
                        if (!noPlay) {
                            this.__MoveFromOpenToPlay(movePoker, toPlayIndex);
                        }
                        return true;
                    }
                }
            }
            // 4. UnderOpen 除顶部一张外，可以下来，造成 【Common】
            // OpenPoker -> Play | UnderOpenPoker -> OpenPoker | Play -> UnderOpenPoker | Flip
            if (this.IsCanReflip()) {
                for (var index = 0; index < this._openAreaGroup.pokers.length - 2; ++index) {
                    var underOpenPoker = this._openAreaGroup.pokers[index];
                    if (movePoker.IsConcatable(underOpenPoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenPoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromOpenToPlay(movePoker, toPlayIndex);
                            }
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnReceiveToPlayByTwoPokers = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this._isCard3Mode) {
            return false;
        }
        for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            var movePoker = this._receiveGroups[receiveIndex].top;
            var toPlayIndex = this.__playIndexForPoker(movePoker);
            if (toPlayIndex !== -1) {
                // 1. Open 可以下来，造成 【Common】
                // ReceivePoker -> Play | OpenPoker -> ReceivePoker | Play -> OpenPoker | Flip
                if (movePoker.IsConcatable(this._openAreaGroup.top)) {
                    var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(this._openAreaGroup.top);
                    if (fromPlayIndex !== -1) {
                        if (!noPlay) {
                            this.__MoveFromReceiveToPlay(movePoker, toPlayIndex);
                        }
                        return true;
                    }
                }
                // 1. receive 区域有牌可以下来，造成 【Common】
                // ReceivePoker -> Play | ReceivePokerEx -> ReceivePoker | Play -> ReceivePokerEx | Flip
                for (var fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex) {
                    var fromReceivePoker = this._receiveGroups[fromReceiveIndex].top;
                    if (movePoker.IsConcatable(fromReceivePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromReceiveToPlay(movePoker, toPlayIndex);
                            }
                            return true;
                        }
                    }
                }
                // 3. Close 可以下来，造成 【Common】
                // ReceivePoker -> Play | ClosePoker -> ReceivePoker | Play -> ClosePoker | Flip
                for (var index = this._closeAreaGroup.pokers.length - 1; index >= 0; --index) {
                    var closePoker = this._closeAreaGroup.pokers[index];
                    if (movePoker.IsConcatable(closePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromReceiveToPlay(movePoker, toPlayIndex);
                            }
                            return true;
                        }
                    }
                }
                // 4. UnderOpen 可以下来，造成 【Common】
                // ReceivePoker -> Play | UnderOpenPoker -> ReceivePoker | Play -> UnderOpenPoker | Flip
                if (this.IsCanReflip()) {
                    for (var index = 0; index < this._openAreaGroup.pokers.length - 1; ++index) {
                        var underOpenPoker = this._openAreaGroup.pokers[index];
                        if (movePoker.IsConcatable(underOpenPoker)) {
                            var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenPoker);
                            if (fromPlayIndex !== -1) {
                                if (!noPlay) {
                                    this.__MoveFromReceiveToPlay(movePoker, toPlayIndex);
                                }
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnCloseToPlayByTwoPokers = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this._isCard3Mode) {
            return false;
        }
        for (var closePokerIndex = this._closeAreaGroup.pokers.length - 1; closePokerIndex >= 0; --closePokerIndex) {
            var movePoker = this._closeAreaGroup.pokers[closePokerIndex];
            var toPlayIndex = this.__playIndexForPoker(movePoker);
            if (toPlayIndex !== -1) {
                // NOTE 这里有一个动态变化的因素：Close 的牌过来的时候， Open 就变成 UnderOpen，因此，要注意优先级
                // receive 区域有牌可以下来，造成 【Common】
                // ClosePoker -> Play | ReceivePoker -> ClosePoker | Play -> ReceivePoker | Flip
                for (var fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex) {
                    var fromReceivePoker = this._receiveGroups[fromReceiveIndex].top;
                    if (movePoker.IsConcatable(fromReceivePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                            }
                            return true;
                        }
                    }
                }
                // Close 这张牌前面的那张牌 可以下来，造成 【Common】
                // ClosePoker -> Play | BeforeClosePoker -> ClosePoker | Play -> BeforeClosePoker | Flip
                var beforeCloseIndex = closePokerIndex + 1;
                if (beforeCloseIndex < this._closeAreaGroup.pokers.length) {
                    var closePoker = this._closeAreaGroup.pokers[beforeCloseIndex];
                    if (movePoker.IsConcatable(closePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                            }
                            return true;
                        }
                    }
                }
                // Close 这张牌后面的牌 可以下来，造成 【Common】
                // ClosePoker -> Play | AfterClosePoker -> ClosePoker | Play -> AfterClosePoker | Flip
                for (var index = closePokerIndex - 1; index >= 0; --index) {
                    var closePoker = this._closeAreaGroup.pokers[index];
                    if (movePoker.IsConcatable(closePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                            }
                            return true;
                        }
                    }
                }
                // UnderOpen 和 Open 可以下来，造成 【Common】
                // ClosePoker -> Play | UnderOpenOrOpenPoker -> ClosePoker | Play -> UnderOpenOrOpenPoker | Flip
                if (this.IsCanReflip()) {
                    for (var index = 0; index < this._openAreaGroup.pokers.length; ++index) {
                        var underOpenOrOpenPoker = this._openAreaGroup.pokers[index];
                        if (movePoker.IsConcatable(underOpenOrOpenPoker)) {
                            var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenOrOpenPoker);
                            if (fromPlayIndex !== -1) {
                                if (!noPlay) {
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                                }
                                return true;
                            }
                        }
                    }
                }
                // Close 前面的牌可以下来，造成 【Common】
                // ReceivePoker -> Play | ClosePoker -> ReceivePoker | Play -> ClosePoker | Flip
                for (var index = this._closeAreaGroup.pokers.length - 1; index > closePokerIndex; --index) {
                    var closePoker = this._closeAreaGroup.pokers[index];
                    if (movePoker.IsConcatable(closePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                            }
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnUnderOpenToPlayByTwoPokers = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this._isCard3Mode) {
            return false;
        }
        if (!this.IsCanReflip()) {
            return false;
        }
        for (var underOpenPokerIndex = 0; underOpenPokerIndex < this._openAreaGroup.pokers.length - 1; ++underOpenPokerIndex) {
            var movePoker = this._closeAreaGroup.pokers[underOpenPokerIndex];
            var toPlayIndex = this.__playIndexForPoker(movePoker);
            if (toPlayIndex !== -1) {
                // receive 区域有牌可以下来，造成 【Common】
                // UnderOpenPoker -> Play | ReceivePoker -> UnderOpenPoker | Play -> ReceivePoker | Flip
                for (var fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex) {
                    var fromReceivePoker = this._receiveGroups[fromReceiveIndex].top;
                    if (movePoker.IsConcatable(fromReceivePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(fromReceivePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                if (this._closeAreaGroup.top) {
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                                }
                                else {
                                    this.__MoveFromOpenToClose();
                                }
                            }
                            return true;
                        }
                    }
                }
                // UnderOpen 下方那张牌下来 造成 【Common】
                var underUnderOpenIndex = underOpenPokerIndex - 1;
                if (underUnderOpenIndex >= 0) {
                    var underUnderOpenPoker = this._openAreaGroup.pokers[underUnderOpenIndex];
                    if (movePoker.IsConcatable(underUnderOpenPoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underUnderOpenPoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                if (this._closeAreaGroup.top) {
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                                }
                                else {
                                    this.__MoveFromOpenToClose();
                                }
                            }
                            return true;
                        }
                    }
                }
                // UnderOpenPoker 上面的牌先下来 造成 【Common】
                // UnderOpenPoker -> Play | UnderOpenOrOpenPoker -> UnderOpenPoker | Play -> UnderOpenOrOpenPoker | Flip
                for (var index = underOpenPokerIndex + 1; index < this._openAreaGroup.pokers.length; ++index) {
                    var underOpenOrOpenPoker = this._openAreaGroup.pokers[index];
                    if (movePoker.IsConcatable(underOpenOrOpenPoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenOrOpenPoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                if (this._closeAreaGroup.top) {
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                                }
                                else {
                                    this.__MoveFromOpenToClose();
                                }
                            }
                            return true;
                        }
                    }
                }
                // Close 下来，造成 【Common】
                // UnderOpenPoker -> Play | ClosePoker -> UnderOpenPoker | Play -> ClosePoker | Flip
                for (var index = this._closeAreaGroup.pokers.length - 1; index >= 0; --index) {
                    var closePoker = this._closeAreaGroup.pokers[index];
                    if (movePoker.IsConcatable(closePoker)) {
                        var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(closePoker);
                        if (fromPlayIndex !== -1) {
                            if (!noPlay) {
                                if (this._closeAreaGroup.top) {
                                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                                }
                                else {
                                    this.__MoveFromOpenToClose();
                                }
                            }
                            return true;
                        }
                    }
                }
                // UnderOpenPoker 下面的牌先下来 造成 【Common】
                // UnderOpenPoker -> Play | UnderUnderOpenPoker -> UnderOpenPoker | Play -> UnderUnderOpenPoker | Flip
                if (this.__isCanReflipByCount(this.flipCloseCardsCountBV.v + 1)) {
                    for (var index = 0; index < underOpenPokerIndex - 1; ++index) {
                        var underOpenOrOpenPoker = this._openAreaGroup.pokers[index];
                        if (movePoker.IsConcatable(underOpenOrOpenPoker)) {
                            var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(underOpenOrOpenPoker);
                            if (fromPlayIndex !== -1) {
                                if (!noPlay) {
                                    if (this._closeAreaGroup.top) {
                                        this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                                    }
                                    else {
                                        this.__MoveFromOpenToClose();
                                    }
                                }
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnPlayToPlayToCreateEmptyPlayGroup = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        // 移动 Play 到另一组，腾出一列空列（前提：没有空列）
        var isFull = this._playGroups.reduce(function (isAllFull, group) { return isAllFull && (!group.IsPokersEmpty()); }, true);
        if (isFull) {
            for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
                var toPlayGroup = this._playGroups[toPlayIndex];
                for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                    var fromPlayGroup = this._playGroups[fromPlayIndex];
                    var rootOpenPoker = fromPlayGroup.rootOpenPoker;
                    if (rootOpenPoker && toPlayGroup.IsConcatPoker(rootOpenPoker) && (fromPlayGroup.zero.status === SolitaireEnums_1.EPokerStatus.OPEN && fromPlayGroup.zero.point !== 13)) {
                        if (!noPlay) {
                            this.__MoveFromPlayToPlay(rootOpenPoker, toPlayIndex);
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayFlipOnReceiveToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var fromReceiveIndex = 0; fromReceiveIndex < 4; ++fromReceiveIndex) {
            var toPlayIndex = this.__playIndexOfFlipThrough_Play_Poker_Play(this._receiveGroups[fromReceiveIndex].top);
            if (toPlayIndex !== -1) {
                if (!noPlay) {
                    this.__MoveFromReceiveToPlay(this._receiveGroups[fromReceiveIndex].top, toPlayIndex);
                }
                return true;
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnPlayToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
            var toReceiveIndex = this.__receiveIndexForPoker(this._playGroups[fromPlayIndex].top);
            if (toReceiveIndex !== -1) {
                if (!noPlay) {
                    var fromPlayGroup = this._playGroups[fromPlayIndex];
                    this.__MoveFromPlayToReceive(fromPlayGroup.top, toReceiveIndex);
                }
                return true;
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipCloseToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var index = this._closeAreaGroup.pokers.length - this.cardMode; index >= 0;) {
            if (this.__receiveIndexForPoker(this._closeAreaGroup.pokers[index]) !== -1) {
                if (!noPlay) {
                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                }
                return true;
            }
            if (this._isCard3Mode && index - this.cardMode < 0 && index > 0) {
                index = 0;
            }
            else {
                index = index - this.cardMode;
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipUnderOpenToReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this.IsCanReflip()) {
            for (var index = this.cardMode - 1; index < this._openAreaGroup.pokers.length - 1; index = index + this.cardMode) {
                if (this.__receiveIndexForPoker(this._openAreaGroup.pokers[index]) !== -1) {
                    if (!noPlay) {
                        if (this._closeAreaGroup.top) {
                            this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                        }
                        else {
                            this.__MoveFromOpenToClose();
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnCloseToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var index = this._closeAreaGroup.pokers.length - this.cardMode; index >= 0;) {
            var toPlayIndex = this.__playIndexForPoker(this._closeAreaGroup.pokers[index]);
            if (toPlayIndex !== -1) {
                if (!noPlay) {
                    this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                }
                return true;
            }
            if (this._isCard3Mode && index - this.cardMode < 0 && index > 0) {
                index = 0;
            }
            else {
                index = index - this.cardMode;
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnUnderOpenToPlay = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        if (this.IsCanReflip()) {
            for (var index = this.cardMode - 1; index < this._openAreaGroup.pokers.length - 1; index = index + this.cardMode) {
                var toPlayIndex = this.__playIndexForPoker(this._openAreaGroup.pokers[index]);
                if (toPlayIndex !== -1) {
                    if (!noPlay) {
                        if (this._closeAreaGroup.top) {
                            this.__MoveFromCloseToOpen(this._closeAreaGroup.top);
                        }
                        else {
                            this.__MoveFromOpenToClose();
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    };
    SolitaireJu.prototype.AutoPlayNoFlipOnPlayToPlayToMakeReceive = function (noPlay) {
        if (noPlay === void 0) { noPlay = false; }
        for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            var g = this._receiveGroups[receiveIndex];
            if (!g.IsPokersEmpty()) {
                var receivePoker = g.top;
                var point = receivePoker.point + 1;
                if (point <= 13) {
                    // 查找扑克牌的位置
                    for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
                        var playGroup = this._playGroups[fromPlayIndex];
                        var targetPokerIndex = playGroup.GetPokerIndexBySuitPoint(receivePoker.suit, point, SolitaireEnums_1.EPokerStatus.OPEN);
                        if (targetPokerIndex != -1) {
                            var abovePoker = playGroup.GetPoker(targetPokerIndex + 1);
                            var toPlayIndex = this.__playIndexForPoker(abovePoker);
                            if (toPlayIndex !== -1) {
                                this.__MoveFromPlayToPlay(abovePoker, toPlayIndex);
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    //#endregion
    //#region //! 策略逻辑的辅助函数
    // 获取 toPlayIndex ，如果  poker 到 Play, 出现 【Common】
    SolitaireJu.prototype.__playIndexOfFlipThrough_Play_Poker_Play = function (poker) {
        if (poker) {
            for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
                var toPlayGroup = this._playGroups[toPlayIndex];
                if (toPlayGroup.IsConcatPoker(poker)) {
                    var fromPlayIndex = this.__playIndexOfFlipOnPlayConcatedAfterPoker(poker);
                    if (fromPlayIndex !== -1) {
                        return toPlayIndex;
                    }
                }
            }
        }
        return -1;
    };
    //  返回 fromPlayIndex 【Common】
    SolitaireJu.prototype.__playIndexOfFlipOnPlayConcatedAfterPoker = function (toPoker) {
        for (var fromPlayIndex = 0; fromPlayIndex < 7; ++fromPlayIndex) {
            if (this.__isFlipOnPlayConcatedAfterPoker(fromPlayIndex, toPoker)) {
                return fromPlayIndex;
            }
        }
        return -1;
    };
    // fromPlayIndex Concate 到这张牌上，会造成翻牌
    SolitaireJu.prototype.__isFlipOnPlayConcatedAfterPoker = function (fromPlayIndex, toPoker) {
        var g = this._playGroups[fromPlayIndex];
        if (g.IsPokersEmpty()) {
            return false;
        }
        var rootOpenPoker = g.rootOpenPoker;
        if (rootOpenPoker == g.top && toPoker.IsConcatable(rootOpenPoker)) {
            return g.IsAutoFlipOnRemovePoker(rootOpenPoker);
        }
        else {
            return false;
        }
    };
    // 返回 toReceiveIndex ，如果这张牌可以连接在该 Receive 组
    SolitaireJu.prototype.__receiveIndexForPoker = function (poker) {
        if (poker) {
            for (var toReceiveIndex = 0; toReceiveIndex < 4; ++toReceiveIndex) {
                if (this._receiveGroups[toReceiveIndex].IsNextPoker(poker)) {
                    return toReceiveIndex;
                }
            }
        }
        return -1;
    };
    // 返回 toPlayIndex ，如果这张牌可以连接在该 Play 组
    SolitaireJu.prototype.__playIndexForPoker = function (poker) {
        if (poker) {
            for (var toPlayIndex = 0; toPlayIndex < 7; ++toPlayIndex) {
                var group = this._playGroups[toPlayIndex];
                if (group.IsConcatPoker(poker)) {
                    return toPlayIndex;
                }
            }
        }
        return -1;
    };
    //#endregion 策略逻辑的辅助函数
    //#region //! 数据战斗
    SolitaireJu.ServerPlay = function (gameType, seed, isVegasMode, isCard3Mode) {
        var model = new SolitaireJu(gameType, isVegasMode, isCard3Mode);
        model.Enter(seed);
        var pass = model.AutoServerPlay();
        var step = model.moveStepCountBV.v;
        var flipCloseCnt = model.flipCloseCardsCountBV.v;
        model.Exit();
        return {
            seed: seed,
            pass: pass,
            step: step,
            flipCloseCnt: flipCloseCnt
        };
    };
    SolitaireJu.Test_DataBattle = function () {
        var ret = SolitaireJu.ServerPlay(SolitaireEnums_1.EGameType.EASY, this._s_Seed++, false, false);
        if (ret.pass) {
            console.log(" pass :: seed >> " + ret.seed + " step >> " + ret.step + " flip >> " + ret.flipCloseCnt);
        }
    };
    SolitaireJu.event = {
        EVENT_LEVEL_MODEL_USING_HINT: "EVENT_LEVEL_MODEL_USING_HINT"
    };
    SolitaireJu._s_Seed = 0;
    return SolitaireJu;
}(ii.Entity));
exports.SolitaireJu = SolitaireJu;

cc._RF.pop();