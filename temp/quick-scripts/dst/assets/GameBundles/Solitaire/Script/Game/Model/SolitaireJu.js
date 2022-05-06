
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/Model/SolitaireJu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxNb2RlbFxcU29saXRhaXJlSnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUEyQjtBQUMzQiwyQ0FBbUU7QUFDbkUsdURBQWdGO0FBQ2hGLHVEQUFxRDtBQUNyRCxrREFBOEs7QUFVOUs7SUFBaUMsK0JBQVM7SUFzRHRDLFlBQVk7SUFFWix5QkFBeUI7SUFDekIscUJBQVksUUFBbUIsRUFBRSxXQUFvQixFQUFFLFdBQW9CO1FBQTNFLFlBQ0ksaUJBQU8sU0FpQlY7UUF2RVEsMkJBQXFCLEdBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO1FBQ3hGLHNCQUFzQjtRQUNiLHNCQUFnQixHQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRy9ELHFCQUFxQjtRQUVyQix1QkFBdUI7UUFDZixrQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUU3QixrQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUU3QixjQUFRLEdBQVcsQ0FBQyxDQUFBO1FBQ3BCLGVBQVMsR0FBYywwQkFBUyxDQUFDLElBQUksQ0FBQztRQVE5QyxZQUFZO1FBRUssb0JBQWMsR0FBVyxHQUFHLENBQUEsQ0FBQyxtQkFBbUI7UUFDekQsY0FBUSxHQUFlLElBQUksQ0FBQTtRQUUzQixvQkFBYyxHQUFpQixFQUFFLENBQUE7UUFDakMsaUJBQVcsR0FBaUIsRUFBRSxDQUFBO1FBQzlCLHFCQUFlLEdBQWUsSUFBSSxDQUFBO1FBQ2xDLG9CQUFjLEdBQWUsSUFBSSxDQUFBO1FBTWpDLGFBQU8sR0FBWSxFQUFFLENBQUEsQ0FBQyxlQUFlO1FBa1M3QyxZQUFZO1FBRVosd0JBQXdCO1FBQ2hCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsb0JBQWMs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UUFDNUQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNsRSxLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNqRSxLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUM3RCxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQy9FLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzlELEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBRTlELEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxDQUFDO1FBQzlELEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixFQUFFLEVBQXZCLENBQXVCLEVBQUUsSUFBSSxFQUFFLEtBQUksQ0FBQyxDQUFDOztJQUNyRSxDQUFDO0lBcEVPLDJDQUFxQixHQUE3Qixj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QUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDakQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ1osT0FBTztZQUNILElBQUksTUFBQTtZQUNKLElBQUksTUFBQTtZQUNKLElBQUksTUFBQTtZQUNKLFlBQVksY0FBQTtTQUNmLENBQUE7SUFDTCxDQUFDO0lBR00sMkJBQWUsR0FBdEI7UUFDSSxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLDBCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0UsSUFBRyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBb0IsR0FBRyxDQUFDLElBQUksaUJBQVksR0FBRyxDQUFDLElBQUksaUJBQVksR0FBRyxDQUFDLFlBQWMsQ0FBQyxDQUFBO1NBQzlGO0lBQ0wsQ0FBQztJQXR1RWUsaUJBQUssR0FBRztRQUNwQiw0QkFBNEIsRUFBRSw4QkFBOEI7S0FDL0QsQ0FBQTtJQTh0RWMsbUJBQU8sR0FBRyxDQUFDLENBQUM7SUFRL0Isa0JBQUM7Q0F6dUVELEFBeXVFQyxDQXp1RWdDLEVBQUUsQ0FBQyxNQUFNLEdBeXVFekM7QUF6dUVZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2VyIGZyb20gXCIuL1Bva2VyXCJcbmltcG9ydCBQb2tlckdyb3VwLCB7IElQb2tlckdyb3VwRXZlbnRMaXN0ZW5lciB9IGZyb20gXCIuL1Bva2VyR3JvdXBcIlxuaW1wb3J0IHsgRUxvY2F0aW9uLCBFUG9rZXJTdGF0dXMsIEVHYW1lVHlwZSwgRVN1aXQgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlRW51bXNcIlxuaW1wb3J0IHsgU29saXRhaXJlRXZlbnQgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlRXZlbnRcIlxuaW1wb3J0IHsgQ21kLCBDbWRDaGFuZ2UsIENtZFN0YWNrLCBFQWN0aW9uVHlwZSwgRUNoYW5nZVR5cGUsIEVUT3BlcmF0aW9uSGludCwgRVRVbmRvQ21kLCBPcGVyYXRpb25IaW50LCBTbmFwQ21kLCBTbmFwRGF0YSwgU29saXRhaXJlRGF0YUJhdHRsZVJlc3VsdCB9IGZyb20gXCIuLi9Tb2xpdGFpcmVUeXBlXCJcbmltcG9ydCB7IFRTb2xpdGFpcmVUZXN0RGF0YSB9IGZyb20gXCIuL1NvbGl0YWlyZVRlc3REYXRhXCJcblxudHlwZSBBVVRPX1JVTl9DQUxMQkFDSyA9IChpc0ZpbmlzaGVkOiBib29sZWFuLCBzZWVkOiBudW1iZXIsIGdhbWVNb2RlbDogU29saXRhaXJlSnUpPT52b2lkXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNvbGl0YWlyZUp1RXZlbnRMaXN0ZW5lciB7XG4gICAgU29saXRhaXJlSnVFdmVudFRhcmdldDogYW55O1xuICAgIE9uU29saXRhaXJlRGVza3RvcEV2ZW50KGRlc2t0b3A6IFNvbGl0YWlyZUp1LCBldmVudFR5cDogU29saXRhaXJlRXZlbnQsIGRhdGE/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU29saXRhaXJlSnUgZXh0ZW5kcyBpaS5FbnRpdHkgaW1wbGVtZW50cyBJUG9rZXJHcm91cEV2ZW50TGlzdGVuZXJ7XG4gICAgc3RhdGljIHJlYWRvbmx5IGV2ZW50ID0ge1xuICAgICAgICBFVkVOVF9MRVZFTF9NT0RFTF9VU0lOR19ISU5UOiBcIkVWRU5UX0xFVkVMX01PREVMX1VTSU5HX0hJTlRcIlxuICAgIH1cbiAgICByZWFkb25seSBmbGlwQ2xvc2VDYXJkc0NvdW50QlY6IGlpLk51bWJlckJWID0gaWkuTnVtYmVyQlYuQm9ycm93KDApOyAvKiogQ2xvc2Ug5Yy65Z+f57+755qE5qyh5pWwICovXG4gICAgLy8jcmVnaW9uIC8vISDov57nu63mlLbniYzpn7PmlYjpgJLov5tcbiAgICByZWFkb25seSBmb3VuZGF0aW9uQ291bnRzOiBpaS5OdW1iZXJCViA9IGlpLk51bWJlckJWLkJvcnJvdygtMSlcbiAgICBwcml2YXRlIF9fQWRkRm91bmRhdGlvbnNDb3VudCgpIHsgdGhpcy5mb3VuZGF0aW9uQ291bnRzLnYgKz0gMSB9XG4gICAgcHJpdmF0ZSBfX1N0b3BGb3VuZGF0aW9uc0NvdW50KCkgeyB0aGlzLmZvdW5kYXRpb25Db3VudHMuU2V0VmFsdWVXaXRob3V0Tm90aWZpY2F0aW9uKC0xKTsgfVxuICAgIC8vI2VuZHJlZ2lvbiDov57nu63mlLbniYzpn7PmlYjpgJLov5tcblxuICAgIC8vI3JlZ2lvbiAvLyEg5Yib5bu65LiA5bGA5pe25omA6ZyA5pWw5o2uXG4gICAgcHJpdmF0ZSBfaXNDYXJkM01vZGU6IGJvb2xlYW4gPSBmYWxzZVxuICAgIGdldCBpc0NhcmQzTW9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzQ2FyZDNNb2RlIH1cbiAgICBwcml2YXRlIF9pc1ZlZ2FzTW9kZTogYm9vbGVhbiA9IGZhbHNlXG4gICAgZ2V0IGlzVmVnYXNNb2RlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNWZWdhc01vZGUgfVxuICAgIHByaXZhdGUgY2FyZE1vZGU6IG51bWJlciA9IDFcbiAgICBwcml2YXRlIF9nYW1lVHlwZTogRUdhbWVUeXBlID0gRUdhbWVUeXBlLkVBU1k7XG4gICAgZ2V0IGdhbWVUeXBlKCk6IEVHYW1lVHlwZSB7IHJldHVybiB0aGlzLl9nYW1lVHlwZTsgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIC8vISDlr7nlpJbkuovku7bnmoTnu5HlrprmnLrliLZcbiAgICBBZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBJU29saXRhaXJlSnVFdmVudExpc3RlbmVyKSB7IHRoaXMub24oXCJfX2dfU29saXRhaXJlSnVFdmVudFwiLCBsaXN0ZW5lci5PblNvbGl0YWlyZURlc2t0b3BFdmVudC5iaW5kKGxpc3RlbmVyLCB0aGlzKSwgbGlzdGVuZXIuU29saXRhaXJlSnVFdmVudFRhcmdldCk7IH1cbiAgICBSZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBJU29saXRhaXJlSnVFdmVudExpc3RlbmVyKSB7IHRoaXMudGFyZ2V0T2ZmKGxpc3RlbmVyLlNvbGl0YWlyZUp1RXZlbnRUYXJnZXQpOyB9XG4gICAgcHJpdmF0ZSBOb3RpZnlHYW1lRXZlbnQoZXZlbnRUeXA6IFNvbGl0YWlyZUV2ZW50LCBhcmcxPywgYXJnMj8sIGFyZzM/LCBhcmc0PykgeyB0aGlzLmVtaXQoXCJfX2dfU29saXRhaXJlSnVFdmVudFwiLCBldmVudFR5cCwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCk7IH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX0NPTlNUX1NIVUZGTEU6IG51bWJlciA9IDI1NiAvLyDmtJfniYzmrKHmlbAgMjU2IOasoe+8jOS4jeWFgeiuuOaUueWPmFxuICAgIHByaXZhdGUgbV9SYW5kZXI6IGlpLk1DR1JhbmQgPSBudWxsXG4gICAgZ2V0IFNlZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubV9SYW5kZXIuc2VlZCB9XG4gICAgcHJpdmF0ZSBfcmVjZWl2ZUdyb3VwczogUG9rZXJHcm91cFtdID0gW11cbiAgICBwcml2YXRlIF9wbGF5R3JvdXBzOiBQb2tlckdyb3VwW10gPSBbXVxuICAgIHByaXZhdGUgX2Nsb3NlQXJlYUdyb3VwOiBQb2tlckdyb3VwID0gbnVsbFxuICAgIHByaXZhdGUgX29wZW5BcmVhR3JvdXA6IFBva2VyR3JvdXAgPSBudWxsXG4gICAgZ2V0IENsb3NlQXJlYUdyb3VwKCk6IFBva2VyR3JvdXAgeyByZXR1cm4gdGhpcy5fY2xvc2VBcmVhR3JvdXA7IH1cbiAgICBnZXQgT3BlbkFyZWFHcm91cCgpOiBQb2tlckdyb3VwIHsgcmV0dXJuIHRoaXMuX29wZW5BcmVhR3JvdXA7IH1cbiAgICBnZXQgUGxheUdyb3VwcygpOiBQb2tlckdyb3VwW10geyByZXR1cm4gdGhpcy5fcGxheUdyb3VwczsgfVxuICAgIGdldCBSZWNlaXZlR3JvdXBzKCk6IFBva2VyR3JvdXBbXSB7IHJldHVybiB0aGlzLl9yZWNlaXZlR3JvdXBzOyB9XG5cbiAgICBwcml2YXRlIF9wb2tlcnM6IFBva2VyW10gPSBbXSAvKiDmiYDmnInmiZHlhYvnmoTljp/lp4vmlbDmja4gKi9cbiAgICBwcml2YXRlIGdldFBva2VyKHBvaW50OiBudW1iZXIsIHN1aXQ6IG51bWJlcikgeyByZXR1cm4gdGhpcy5fcG9rZXJzWyhwb2ludC0xKSo0ICsgc3VpdF0gfVxuICAgIFxuICAgIGdldFBsYXlHcm91cChwbGF5SW5kZXg6IG51bWJlcik6IFBva2VyR3JvdXAgeyByZXR1cm4gdGhpcy5fcGxheUdyb3Vwc1twbGF5SW5kZXhdIH1cbiAgICBnZXRSZWNlaXZlR3JvdXAocmVjZWl2ZUluZGV4OiBudW1iZXIpOiBQb2tlckdyb3VwIHsgcmV0dXJuIHRoaXMuX3JlY2VpdmVHcm91cHNbcmVjZWl2ZUluZGV4XSB9XG4gICAgZ2V0T3Blbkdyb3VwUG9rZXIoaW5kZXg6IG51bWJlcikgeyByZXR1cm4gdGhpcy5fb3BlbkFyZWFHcm91cC5HZXRQb2tlcihpbmRleCkgfVxuICAgIGdldENsb3NlR3JvdXBQb2tlcihpbmRleDogbnVtYmVyKSB7IHJldHVybiB0aGlzLl9jbG9zZUFyZWFHcm91cC5HZXRQb2tlcihpbmRleCkgfVxuXG4gICAgLy8jcmVnaW9uICAvLyEgSVBva2VyR3JvdXBFdmVudExpc3RlbmVyXG4gICAgT25Hcm91cFBva2VyU3RhdGVDaGFuZ2VkKHBva2VyOiBQb2tlciwgc3RhdHVzOiBFUG9rZXJTdGF0dXMpe1xuICAgICAgICB0aGlzLl9fcmVmcmVzaEFsbFBva2VyT3BlblN0YXR1cygpXG4gICAgICAgIGlmKHBva2VyLmxvY2F0aW9uID09PSBFTG9jYXRpb24uUExBWSAmJiBzdGF0dXMgPT09IEVQb2tlclN0YXR1cy5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19GTElQX1BPS0VSLCBwb2tlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiAvLyEgRW50aXR5IOeUn+WRveWRqOacn1xuICAgIGNvbnN0cnVjdG9yKGdhbWVUeXBlOiBFR2FtZVR5cGUsIGlzVmVnYXNNb2RlOiBib29sZWFuLCBpc0NhcmQzTW9kZTogYm9vbGVhbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9nYW1lVHlwZSA9IGdhbWVUeXBlO1xuICAgICAgICB0aGlzLl9pc0NhcmQzTW9kZSA9IGlzQ2FyZDNNb2RlXG4gICAgICAgIHRoaXMuX2lzVmVnYXNNb2RlID0gaXNWZWdhc01vZGVcbiAgICAgICAgdGhpcy5jYXJkTW9kZSA9IHRoaXMuX2lzQ2FyZDNNb2RlID8gMyA6IDFcbiAgICAgICAgdGhpcy5oYXNOZXh0QlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KHRydWUpLlJldHVybkJ5KHRoaXMpO1xuICAgICAgICB0aGlzLmlzSGludGVkQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc0hlbHBlZEJWID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJPcGVuZWRCViA9IGlpLkJvb2xlYW5CVi5Cb3Jyb3coZmFsc2UpLlJldHVybkJ5KHRoaXMpO1xuICAgICAgICB0aGlzLmlzQXV0b1BsYXlpbmdCViA9IGlpLkJvb2xlYW5CVi5Cb3Jyb3coZmFsc2UpLlJldHVybkJ5KHRoaXMpO1xuICAgICAgICB0aGlzLmhhc1VzZWRVbmRvID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuc2NvcmVCViA9IGlpLk51bWJlckJWLkJvcnJvdyh0aGlzLl9pc1ZlZ2FzTW9kZSA/IDAgOiAxMDAwKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc0NvbnRpbnVlQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc0dhbWVMb3NlQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcblxuICAgICAgICB0aGlzLmhhc05leHRCVi5CaW5kKHYgPT4gdGhpcy5fX1VwZGF0ZUdhbWVMb3NlKCksIHRydWUsIHRoaXMpO1xuICAgICAgICB0aGlzLmlzQ29udGludWVCVi5CaW5kKHYgPT4gdGhpcy5fX1VwZGF0ZUdhbWVMb3NlKCksIHRydWUsIHRoaXMpO1xuICAgIH1cblxuICAgIFJlc2V0KCkge1xuICAgICAgICB0aGlzLlNldFRpbWVyQWN0aXZlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fcGxheUdyb3Vwcy5mb3JFYWNoKGc9PmcudGFyZ2V0T2ZmKHRoaXMpKTtcbiAgICB9XG5cbiAgICBFbnRlcihzZWVkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNuYXBEYXRhOiBTbmFwRGF0YSA9IHtcbiAgICAgICAgICAgIHJlc3VtZTogZmFsc2UsXG4gICAgICAgICAgICB2ZWdhczogdGhpcy5faXNWZWdhc01vZGUsXG4gICAgICAgICAgICBjYXJkMzogdGhpcy5faXNDYXJkM01vZGUsXG4gICAgICAgICAgICBzZWVkOiBzZWVkLFxuICAgICAgICAgICAgdGljazogMCxcbiAgICAgICAgICAgIGhpbnRlZDogZmFsc2UsXG4gICAgICAgICAgICBoZWxwZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcGxheWVyOiBmYWxzZSxcbiAgICAgICAgICAgIHVuZG86IGZhbHNlLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuRW50ZXJXaXRoU25hcChzbmFwRGF0YSlcbiAgICB9XG5cbiAgICBFeGl0KCkge1xuICAgICAgICB0aGlzLlJldHVybigpO1xuICAgIH1cblxuICAgIEVudGVyV2l0aFRlc3REYXRhKHRlc3REYXRhOiBUU29saXRhaXJlVGVzdERhdGEpIHtcbiAgICAgICAgdGhpcy5tX1JhbmRlciA9IG5ldyBpaS5NQ0dSYW5kKDApXG4gICAgICAgIHRoaXMuc2NvcmVCVi5TZXRWYWx1ZVdpdGhvdXROb3RpZmljYXRpb24odGhpcy5faXNWZWdhc01vZGUgPyAwIDogMTAwMCk7XG4gICAgICAgIHRoaXMuaGFzTmV4dEJWLlNldFZhbHVlV2l0aG91dE5vdGlmaWNhdGlvbih0cnVlKTtcbiAgICAgICAgdGhpcy5yZXNldE1vdmVTdGVwQ291bnQoMCk7XG4gICAgICAgIHRoaXMuaXNIZWxwZWRCVi5TZXRWYWx1ZVdpdGhvdXROb3RpZmljYXRpb24odHJ1ZSk7XG4gICAgICAgIHRoaXMuaXNIaW50ZWRCVi5TZXRWYWx1ZVdpdGhvdXROb3RpZmljYXRpb24odHJ1ZSk7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJPcGVuZWRCVi52ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oYXNVc2VkVW5kby5TZXRWYWx1ZVdpdGhvdXROb3RpZmljYXRpb24oZmFsc2UpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fZ2FtZVRpbWUgPSAwO1xuICAgICAgICB0aGlzLlNldFRpbWVyQWN0aXZlKHRydWUpXG5cbiAgICAgICAgdGhpcy5fY2xvc2VBcmVhR3JvdXAgPSBuZXcgUG9rZXJHcm91cChFTG9jYXRpb24uQ0xPU0UpLlJldHVybkJ5PFBva2VyR3JvdXA+KHRoaXMpO1xuICAgICAgICB0aGlzLl9jbG9zZUFyZWFHcm91cC5BZGRFdmVudExpc3RlbmVyKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fb3BlbkFyZWFHcm91cCA9IG5ldyBQb2tlckdyb3VwKEVMb2NhdGlvbi5PUEVOKS5SZXR1cm5CeTxQb2tlckdyb3VwPih0aGlzKTtcbiAgICAgICAgdGhpcy5fb3BlbkFyZWFHcm91cC5BZGRFdmVudExpc3RlbmVyKHRoaXMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgcG9rZXJHcm91cCA9IG5ldyBQb2tlckdyb3VwKEVMb2NhdGlvbi5SRUNFSVZFKS5SZXR1cm5CeTxQb2tlckdyb3VwPih0aGlzKTtcbiAgICAgICAgICAgIHBva2VyR3JvdXAuaW5kZXggPSB0aGlzLl9yZWNlaXZlR3JvdXBzLmxlbmd0aFxuICAgICAgICAgICAgdGhpcy5fcmVjZWl2ZUdyb3Vwcy5wdXNoKHBva2VyR3JvdXApXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBwb2tlckdyb3VwID0gbmV3IFBva2VyR3JvdXAoRUxvY2F0aW9uLlBMQVkpLlJldHVybkJ5PFBva2VyR3JvdXA+KHRoaXMpO1xuICAgICAgICAgICAgcG9rZXJHcm91cC5pbmRleCA9IHRoaXMuX3BsYXlHcm91cHMubGVuZ3RoXG4gICAgICAgICAgICB0aGlzLl9wbGF5R3JvdXBzLnB1c2gocG9rZXJHcm91cClcbiAgICAgICAgICAgIHBva2VyR3JvdXAuQWRkRXZlbnRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8g54mM5bGA562W55WlXG4gICAgICAgIHRoaXMubV9zdHJhdGVneUZuID0gdGhpcy5fX0NyZWF0ZVN0cmF0ZWd5RnVuYygpXG5cbiAgICAgICAgLy8g5Yid5aeL5YyW5omR5YWL5pWw5o2uXG4gICAgICAgIHRlc3REYXRhLnJlY2VpdmVzLmZvckVhY2goKHJlY2VpdmUsIHJlY2VpdmVJbmRleCkgPT4ge1xuICAgICAgICAgICAgcmVjZWl2ZS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwb2tlciA9IG5ldyBQb2tlcihwWzFdLCBwWzBdLCBwWzJdKVxuICAgICAgICAgICAgICAgIHBva2VyLmluaXRMb2NhdGlvbiA9IEVMb2NhdGlvbi5SRUNFSVZFO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Bva2Vycy5wdXNoKHBva2VyKVxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2VpdmVHcm91cHNbcmVjZWl2ZUluZGV4XS5BZGRQb2tlcihwb2tlcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0ZXN0RGF0YS5wbGF5cy5mb3JFYWNoKChwbGF5LCBwbGF5SW5kZXgpID0+IHtcbiAgICAgICAgICAgIHBsYXkuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcG9rZXIgPSBuZXcgUG9rZXIocFsxXSwgcFswXSwgcFsyXSlcbiAgICAgICAgICAgICAgICBwb2tlci5pbml0TG9jYXRpb24gPSBFTG9jYXRpb24uUExBWTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2tlcnMucHVzaChwb2tlcilcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5R3JvdXBzW3BsYXlJbmRleF0uQWRkUG9rZXIocG9rZXIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgdGVzdERhdGEub3Blbi5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgbGV0IHBva2VyID0gbmV3IFBva2VyKHBbMV0sIHBbMF0sIHBbMl0pXG4gICAgICAgICAgICBwb2tlci5pbml0TG9jYXRpb24gPSBFTG9jYXRpb24uT1BFTjtcbiAgICAgICAgICAgIHRoaXMuX3Bva2Vycy5wdXNoKHBva2VyKVxuICAgICAgICAgICAgdGhpcy5fb3BlbkFyZWFHcm91cC5BZGRQb2tlcihwb2tlcik7XG4gICAgICAgIH0pO1xuICAgICAgICB0ZXN0RGF0YS5jbG9zZS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgbGV0IHBva2VyID0gbmV3IFBva2VyKHBbMV0sIHBbMF0sIHBbMl0pXG4gICAgICAgICAgICBwb2tlci5pbml0TG9jYXRpb24gPSBFTG9jYXRpb24uQ0xPU0U7XG4gICAgICAgICAgICB0aGlzLl9wb2tlcnMucHVzaChwb2tlcilcbiAgICAgICAgICAgIHRoaXMuX2Nsb3NlQXJlYUdyb3VwLkFkZFBva2VyKHBva2VyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g5rS+5Y+R5Yid5aeL5YyW54mM5bGA55qE5LqL5Lu2XG4gICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX0lOSVQsIHRoaXMuX3Bva2VycylcblxuICAgICAgICAvLyDpgJrnn6UgVUkg5bGCLOWPkeeUn+WPmOWMllxuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19QTEFZLCB0aGlzKVxuXG4gICAgICAgIC8vIOWQpuWImeWcqOi/memHjOaJjeW8gOWni+iuoumYhVxuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19VSV9TVUJTQ1JJQilcblxuICAgICAgICAvLyBVSSDliLfmlrDmiYDmnIkgUG9rZXIg5L2N572uXG4gICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX1JFRlJFU0hfUE9LRVJTLCB0aGlzLl9wb2tlcnMpXG5cbiAgICAgICAgLy8g5ri45oiP6IOc5Yip57uR5a6aXG4gICAgICAgIHRoaXMuQmluZEJWKHRoaXMuaXNHYW1lV2luQlYsIHdpbiA9PiB7XG4gICAgICAgICAgICBpZih3aW4pe1xuICAgICAgICAgICAgICAgIHRoaXMuUGF1c2VUaW1lcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpXG5cbiAgICAgICAgdGhpcy5CaW5kQlYodGhpcy5pc0dhbWVMb3NlQlYsIGxvc2UgPT4ge1xuICAgICAgICAgICAgaWYobG9zZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5QYXVzZVRpbWVyKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuUmVzdW1lVGltZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKVxuICAgIH1cblxuICAgIEVudGVyV2l0aFNuYXAoc25hcERhdGE6IFNuYXBEYXRhKSB7ICAgICAgICBcbiAgICAgICAgdGhpcy5tX1JhbmRlciA9IG5ldyBpaS5NQ0dSYW5kKHNuYXBEYXRhLnNlZWQpXG4gICAgICAgIGNvbnNvbGUubG9nKGBTZWVkOiAke3RoaXMubV9SYW5kZXIuc2VlZH0gVmVnYXM6ICR7dGhpcy5faXNWZWdhc01vZGV9IDNDYXJkczogJHt0aGlzLl9pc0NhcmQzTW9kZX1gKTtcbiAgICAgICAgdGhpcy5zY29yZUJWLlNldFZhbHVlV2l0aG91dE5vdGlmaWNhdGlvbih0aGlzLl9pc1ZlZ2FzTW9kZSA/IDAgOiAxMDAwKTtcbiAgICAgICAgdGhpcy5oYXNOZXh0QlYuU2V0VmFsdWVXaXRob3V0Tm90aWZpY2F0aW9uKHRydWUpO1xuICAgICAgICB0aGlzLnJlc2V0TW92ZVN0ZXBDb3VudCgwKTtcbiAgICAgICAgdGhpcy5pc0hlbHBlZEJWLlNldFZhbHVlV2l0aG91dE5vdGlmaWNhdGlvbihzbmFwRGF0YS5oZWxwZWQpO1xuICAgICAgICB0aGlzLmlzSGludGVkQlYuU2V0VmFsdWVXaXRob3V0Tm90aWZpY2F0aW9uKHNuYXBEYXRhLmhpbnRlZCk7XG4gICAgICAgIHRoaXMuaXNQbGF5ZXJPcGVuZWRCVi52ID0gc25hcERhdGEucGxheWVyO1xuICAgICAgICB0aGlzLmhhc1VzZWRVbmRvLlNldFZhbHVlV2l0aG91dE5vdGlmaWNhdGlvbihzbmFwRGF0YS51bmRvKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2dhbWVUaW1lID0gc25hcERhdGEudGljaztcbiAgICAgICAgdGhpcy5TZXRUaW1lckFjdGl2ZSh0cnVlKVxuXG4gICAgICAgIHRoaXMuX2Nsb3NlQXJlYUdyb3VwID0gbmV3IFBva2VyR3JvdXAoRUxvY2F0aW9uLkNMT1NFKS5SZXR1cm5CeTxQb2tlckdyb3VwPih0aGlzKTtcbiAgICAgICAgdGhpcy5fY2xvc2VBcmVhR3JvdXAuQWRkRXZlbnRMaXN0ZW5lcih0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX29wZW5BcmVhR3JvdXAgPSBuZXcgUG9rZXJHcm91cChFTG9jYXRpb24uT1BFTikuUmV0dXJuQnk8UG9rZXJHcm91cD4odGhpcyk7XG4gICAgICAgIHRoaXMuX29wZW5BcmVhR3JvdXAuQWRkRXZlbnRMaXN0ZW5lcih0aGlzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IHBva2VyR3JvdXAgPSBuZXcgUG9rZXJHcm91cChFTG9jYXRpb24uUkVDRUlWRSkuUmV0dXJuQnk8UG9rZXJHcm91cD4odGhpcyk7XG4gICAgICAgICAgICBwb2tlckdyb3VwLmluZGV4ID0gdGhpcy5fcmVjZWl2ZUdyb3Vwcy5sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuX3JlY2VpdmVHcm91cHMucHVzaChwb2tlckdyb3VwKVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgKytpKSB7XG4gICAgICAgICAgICBsZXQgcG9rZXJHcm91cCA9IG5ldyBQb2tlckdyb3VwKEVMb2NhdGlvbi5QTEFZKS5SZXR1cm5CeTxQb2tlckdyb3VwPih0aGlzKTtcbiAgICAgICAgICAgIHBva2VyR3JvdXAuaW5kZXggPSB0aGlzLl9wbGF5R3JvdXBzLmxlbmd0aFxuICAgICAgICAgICAgdGhpcy5fcGxheUdyb3Vwcy5wdXNoKHBva2VyR3JvdXApXG4gICAgICAgICAgICBwb2tlckdyb3VwLkFkZEV2ZW50TGlzdGVuZXIodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOeJjOWxgOetlueVpVxuICAgICAgICB0aGlzLm1fc3RyYXRlZ3lGbiA9IHRoaXMuX19DcmVhdGVTdHJhdGVneUZ1bmMoKVxuXG4gICAgICAgIC8vIOWIneWni+WMluaJkeWFi+aVsOaNrlxuICAgICAgICBmb3IgKGxldCBwb2ludCA9IDE7IHBvaW50IDw9IDEzOyArK3BvaW50KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBzdWl0ID0gMDsgc3VpdCA8IDQ7ICsrc3VpdCkge1xuICAgICAgICAgICAgICAgIGxldCBwb2tlciA9IG5ldyBQb2tlcihwb2ludCwgc3VpdCwgRVBva2VyU3RhdHVzLkNMT1NFKVxuICAgICAgICAgICAgICAgIHRoaXMuX3Bva2Vycy5wdXNoKHBva2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5rS+5Y+R5Yid5aeL5YyW54mM5bGA55qE5LqL5Lu2XG4gICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX0lOSVQsIHRoaXMuX3Bva2VycylcblxuICAgICAgICAvLyDlsIbniYzmlL7liLDkuoblj5HniYzljLpcbiAgICAgICAgZm9yKGxldCBpPSB0aGlzLl9wb2tlcnMubGVuZ3RoLTE7IGk+PTA7IC0taSl7XG4gICAgICAgICAgICB0aGlzLl9wb2tlcnNbaV0uaW5pdExvY2F0aW9uID0gRUxvY2F0aW9uLkNMT1NFXG4gICAgICAgICAgICB0aGlzLl9wb2tlcnNbaV0uaW5pdFN0YXR1cyA9IEVQb2tlclN0YXR1cy5DTE9TRVxuICAgICAgICAgICAgdGhpcy5fY2xvc2VBcmVhR3JvdXAuQWRkUG9rZXIodGhpcy5fcG9rZXJzW2ldKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5rSX54mMXG4gICAgICAgIHRoaXMuX19zaHVmZmxlUG9rZXJzKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2VycylcblxuICAgICAgICBpZighc25hcERhdGEucmVzdW1lKXtcbiAgICAgICAgICAgIC8vIOmdnuW4uOmHjeimge+8jOi/memHjOmAmuefpSBVSSDlj6/ku6XorqLpmIXmlbDmja7lupPkuovku7ZcbiAgICAgICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX1VJX1NVQlNDUklCLCB0aGlzKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g6YCa55+lIFVJIOWxgizlj5HnlJ/lj5jljJZcbiAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfUExBWSwgdGhpcylcbiAgICAgICAgLy8g5Y+R54mMXG4gICAgICAgIGxldCBwb2tlcnMgPSBbXVxuICAgICAgICBmb3IgKGxldCBjYXJkcyA9IDc7IGNhcmRzID49IDE7IC0tY2FyZHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHM7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBwbGF5SW5kZXggPSA3IC0gY2FyZHMgKyBpXG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwOiBQb2tlckdyb3VwID0gdGhpcy5fcGxheUdyb3Vwc1twbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy5fY2xvc2VBcmVhR3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgICAgICAgICBwb2tlci5pbml0TG9jYXRpb24gPSBFTG9jYXRpb24uUExBWVxuICAgICAgICAgICAgICAgIHBva2VyLnN0YXR1cyA9IGkgPT09IDAgPyBFUG9rZXJTdGF0dXMuT1BFTiA6IEVQb2tlclN0YXR1cy5DTE9TRVxuICAgICAgICAgICAgICAgIHBva2VyLmluaXRTdGF0dXMgPSBwb2tlci5zdGF0dXNcbiAgICAgICAgICAgICAgICBncm91cC5BZGRQb2tlcihwb2tlcilcbiAgICAgICAgICAgICAgICBwb2tlcnMucHVzaChwb2tlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighc25hcERhdGEucmVzdW1lKXtcbiAgICAgICAgICAgIC8vIOa0vuWPkemAmuefpVxuICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfU0VORF9QT0tFUlMsIHBva2VycylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNuYXBEYXRhLnJlc3VtZSkge1xuICAgICAgICAgICAgLy8g6YCa6L+H5pON5L2c5p2l5Yid5aeL5YyWXG4gICAgICAgICAgICB0aGlzLlJlZG9DbWRzKHNuYXBEYXRhLmNtZHMpXG5cbiAgICAgICAgICAgIC8vIOWQpuWImeWcqOi/memHjOaJjeW8gOWni+iuoumYhVxuICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfVUlfU1VCU0NSSUIpXG5cbiAgICAgICAgICAgIC8vIFVJIOWIt+aWsOaJgOaciSBQb2tlciDkvY3nva5cbiAgICAgICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX1JFRlJFU0hfUE9LRVJTLCB0aGlzLl9wb2tlcnMpXG4gICAgICAgIH1cblxuICAgICAgICAvLyDmuLjmiI/og5zliKnnu5HlrppcbiAgICAgICAgdGhpcy5CaW5kQlYodGhpcy5pc0dhbWVXaW5CViwgd2luID0+IHtcbiAgICAgICAgICAgIGlmKHdpbil7XG4gICAgICAgICAgICAgICAgdGhpcy5QYXVzZVRpbWVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSlcblxuICAgICAgICB0aGlzLkJpbmRCVih0aGlzLmlzR2FtZUxvc2VCViwgbG9zZSA9PiB7XG4gICAgICAgICAgICBpZihsb3NlKXtcbiAgICAgICAgICAgICAgICB0aGlzLlBhdXNlVGltZXIoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5SZXN1bWVUaW1lcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpXG4gICAgfVxuXG4gICAgU25hcCgpOiBTbmFwRGF0YSB7XG4gICAgICAgIGxldCBzbmFwRGF0YTogU25hcERhdGEgPSB7XG4gICAgICAgICAgICBnYW1lVHlwZTogdGhpcy5fZ2FtZVR5cGUsXG4gICAgICAgICAgICByZXN1bWU6IHRydWUsXG4gICAgICAgICAgICB2ZWdhczogdGhpcy5faXNWZWdhc01vZGUsXG4gICAgICAgICAgICBjYXJkMzogdGhpcy5faXNDYXJkM01vZGUsXG4gICAgICAgICAgICBzZWVkOiB0aGlzLlNlZWQsXG4gICAgICAgICAgICBjbWRzOiB0aGlzLlNuYXBVbmRvQ21kcygpLFxuICAgICAgICAgICAgdGljazogdGhpcy5fZ2FtZVRpbWUsXG4gICAgICAgICAgICBzY29yZTogdGhpcy5zY29yZUJWLnYsXG4gICAgICAgICAgICBoZWxwZWQ6IHRoaXMuaXNIZWxwZWRCVi52LFxuICAgICAgICAgICAgcGxheWVyOiB0aGlzLmlzUGxheWVyT3BlbmVkQlYudixcbiAgICAgICAgICAgIGhpbnRlZDogdGhpcy5pc0hpbnRlZEJWLnYsXG4gICAgICAgICAgICB1bmRvOiB0aGlzLmhhc1VzZWRVbmRvLnYsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNuYXBEYXRhXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgX19zaHVmZmxlUG9rZXJzKHBva2VyczogUG9rZXJbXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX0NPTlNUX1NIVUZGTEU7ICsraSkge1xuICAgICAgICAgICAgbGV0IHNJZHggPSB0aGlzLm1fUmFuZGVyLnJhbmdlKDAsIHBva2Vycy5sZW5ndGgtMSlcbiAgICAgICAgICAgIGxldCBlSWR4ID0gdGhpcy5tX1JhbmRlci5yYW5nZSgwLCBwb2tlcnMubGVuZ3RoLTEpXG4gICAgICAgICAgICBsZXQgdG1wVmFsID0gcG9rZXJzW3NJZHhdXG4gICAgICAgICAgICBwb2tlcnNbc0lkeF0gPSBwb2tlcnNbZUlkeF1cbiAgICAgICAgICAgIHBva2Vyc1tlSWR4XSA9IHRtcFZhbFxuICAgICAgICB9XG4gICAgfSBcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiAvLyEg5ri45oiP6K6h5pe2IFRpbWVyXG4gICAgcHJpdmF0ZSBfZ2FtZVRpbWU6IG51bWJlciA9IDA7XG4gICAgZ2V0IGdhbWVUaW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9nYW1lVGltZTsgfVxuICAgIHByaXZhdGUgX2lzVGltZXJBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pc1BhdXNlVGltZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIFNldFRpbWVyQWN0aXZlKGFjdGl2ZTogYm9vbGVhbikgeyB0aGlzLl9pc1RpbWVyQWN0aXZlID0gYWN0aXZlOyB9XG4gICAgcHJpdmF0ZSBQYXVzZVRpbWVyKCkgeyB0aGlzLl9pc1BhdXNlVGltZXIgPSB0cnVlOyB9XG4gICAgcHJpdmF0ZSBSZXN1bWVUaW1lcigpIHsgdGhpcy5faXNQYXVzZVRpbWVyID0gZmFsc2U7IH1cbiAgICBUaWNrKCkge1xuICAgICAgICBpZigoIXRoaXMuX2lzUGF1c2VUaW1lcikgJiYgdGhpcy5faXNUaW1lckFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2FtZVRpbWUgPSB0aGlzLl9nYW1lVGltZSsxO1xuICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfVElNRV9DSEFOR0VELCB0aGlzLl9nYW1lVGltZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uIOa4uOaIj+iuoeaXtiBUaW1lclxuXG4gICAgLy8jcmVnaW9uIC8vISDmuLjmiI/lpLHotKXnm7jlhbNcbiAgICAvKipcbiAgICAgKiDlpLHotKXnmoTmnaHku7bmmK/vvJrnlKjmiLfmnKrngrnlh7sgQ29udGludWXvvIzlubbkuJTmsqHmnInkuIvkuIDmraXlj6/otbBcbiAgICAgKi9cbiAgICBoYXNOZXh0QlY6IGlpLkJvb2xlYW5CViA9IG51bGw7IC8qKiDmsqHmnInkuIvkuIDmraXlj6/otbAgKi9cbiAgICBpc0NvbnRpbnVlQlY6IGlpLkJvb2xlYW5CViA9IG51bGw7IC8qKiDlpLHotKXpobXpnaLlvLnlh7rlkI7vvIzngrnlh7vkuobnu6fnu63mjInpkq4gKi9cbiAgICBpc0dhbWVMb3NlQlY6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgcHJpdmF0ZSBVcGRhdGVIYXNOZXh0U3RlcCgpIHsgdGhpcy5oYXNOZXh0QlYudiA9IHRoaXMuX19Eb05leHRTdGVwKHRydWUpIH0gLyoqIOi/memHjOa2ieWPiuWIsOe7k+eul++8jOS9jee9ruimgeaUvuWIsOacgOWQjiAqL1xuICAgIHByaXZhdGUgX19VcGRhdGVHYW1lTG9zZSgpIHtcbiAgICAgICAgbGV0IHByZSA9IHRoaXMuaXNHYW1lTG9zZUJWLnY7XG4gICAgICAgIHRoaXMuaXNHYW1lTG9zZUJWLnYgPSAoIXRoaXMuaXNHYW1lV2luQlYudikgJiYgKCF0aGlzLmlzQ29udGludWVCVi52KSAmJiAoIXRoaXMuaGFzTmV4dEJWLnYpO1xuICAgICAgICBsZXQgY3VyID0gdGhpcy5pc0dhbWVMb3NlQlYudjtcbiAgICAgICAgaWYoY3VyICYmIChjdXIgIT09IHByZSkpIHtcbiAgICAgICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX0xPU0UpO1xuICAgICAgICB9XG4gICAgfVxuICAgICAvLyNlbmRyZWdpb24g5ri45oiP5aSx6LSl55u45YWzXG5cbiAgICAgLy8jcmVnaW9uIC8vISDmuLjmiI/og5zliKlcbiAgICByZWFkb25seSBpc0dhbWVXaW5CVjogaWkuQm9vbGVhbkJWID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSlcbiAgICBwcml2YXRlIF9fQ2hlY2tHYW1lV2luKCkge1xuICAgICAgICBpZih0aGlzLmlzR2FtZVdpbkJWLnYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHJlY2VpdmVJbmRleCA9IDA7IHJlY2VpdmVJbmRleCA8IDQ7ICsrcmVjZWl2ZUluZGV4KSB7XG4gICAgICAgICAgICBsZXQgcnBnID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1tyZWNlaXZlSW5kZXhdXG4gICAgICAgICAgICBpZighKHJwZy50b3AgJiYgcnBnLnRvcC5wb2ludCA9PT0gMTMpKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzR2FtZVdpbkJWLnYgPSB0cnVlO1xuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19XSU4pO1xuICAgIH1cbiAgICAvLyNlbmRyZWdpb24g5ri45oiP6IOc5YipXG5cbiAgICAvLyNyZWdpb24gLy8hIOOAkOenu+WKqOatpeaVsOOAkSDjgJDnv7vniYzjgIHmlLbniYzorqHliIbjgJEg44CQ5pyA57uI5b6X5YiG44CRXG4gICAgLy8g44CQ56e75Yqo5q2l5pWw44CRXG4gICAgcmVhZG9ubHkgbW92ZVN0ZXBDb3VudEJWOiBpaS5OdW1iZXJCViA9IGlpLk51bWJlckJWLkJvcnJvdygwKVxuICAgIHByaXZhdGUgVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm1fSXNTdGVwT3BlcmF0aW9uSGludENhbGN1bGF0ZWQgPSBmYWxzZVxuICAgICAgICBpZighaWdub3JlU3RlcCl7XG4gICAgICAgICAgICArK3RoaXMubW92ZVN0ZXBDb3VudEJWLnY7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLS10aGlzLm1vdmVTdGVwQ291bnRCVi52O1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgcmVzZXRNb3ZlU3RlcENvdW50KGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tX0lzU3RlcE9wZXJhdGlvbkhpbnRDYWxjdWxhdGVkID0gZmFsc2VcbiAgICAgICAgdGhpcy5tb3ZlU3RlcENvdW50QlYudiA9IGNvdW50XG4gICAgICAgIHRoaXMuVXBkYXRlU2NvcmUoKVxuICAgIH1cblxuICAgIC8vIOOAkOe/u+eJjOOAgeaUtueJjOiuoeWIhuOAkVxuICAgIHByaXZhdGUgcG9rZXJSZWNlaXZlU2NvcmVCVjogaWkuTnVtYmVyQlYgPSBpaS5OdW1iZXJCVi5Cb3Jyb3coMClcbiAgICBwcml2YXRlIENoYW5nZVJlY2VpdmVTY29yZShjaGFuZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBva2VyUmVjZWl2ZVNjb3JlQlYudiArPSBjaGFuZ2VcbiAgICB9XG4gICAgcHJpdmF0ZSB2ZWdhc1JlY2VpdmVTY29yZUJWOiBpaS5OdW1iZXJCViA9IGlpLk51bWJlckJWLkJvcnJvdygwKVxuICAgIHByaXZhdGUgQ2hhbmdlVmVnYXNSZWNlaXZlU2NvcmUoY2hhbmdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy52ZWdhc1JlY2VpdmVTY29yZUJWLnYgKz0gY2hhbmdlXG4gICAgfVxuICAgIC8vIOOAkOacgOe7iOW+l+WIhuOAkVxuICAgIHNjb3JlQlY6IGlpLk51bWJlckJWID0gbnVsbDtcbiAgICBwcml2YXRlIFVwZGF0ZVNjb3JlKG5vdFVwZGF0ZVNjb3JlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYobm90VXBkYXRlU2NvcmUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuX2lzVmVnYXNNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVCVi52ID0gdGhpcy52ZWdhc1JlY2VpdmVTY29yZUJWLnZcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnNjb3JlQlYudiA9IHRoaXMucG9rZXJSZWNlaXZlU2NvcmVCVi52ICsgKDEwMDAgLSB0aGlzLm1vdmVTdGVwQ291bnRCVi52KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLyDmk43kvZzmj5DnpLrlip/og71cbiAgICAvLyDmj4/ov7DvvJrnjqnlrrbngrnlh7vjgJDmj5DnpLrjgJHvvIzojrflj5blpIfpgInnmoTmk43kvZzliJfooajvvIzmjInnhafnrZbnlaXpgInmi6nlhbbkuK3kuYvkuIDvvIzlubbmiafooYxcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vLyDlip/og73vvJrnlYzpnaLosIPnlKjmraTmjqXlj6NcbiAgICBwcml2YXRlIG1fT3BlcmF0aW9uSGludEluZGV4OiBudW1iZXIgPSAwXG4gICAgcHJpdmF0ZSBtX09wZXJhdGlvbkhpbnRMaXN0OiBPcGVyYXRpb25IaW50W10gPSBbXVxuICAgIHByaXZhdGUgbV9Jc1N0ZXBPcGVyYXRpb25IaW50Q2FsY3VsYXRlZCA9IGZhbHNlIC8qIOW9k+WJjeatpemqpOaYr+WQpumihOiuoeeul+WujOavle+8iOS4u+imgeeUqOS6juaPkOekuu+8iSAqL1xuICAgIHByaXZhdGUgX19VcGRhdGVPcGVyYXRpb25IaW50U3RhdHVzKCkge1xuICAgICAgICBpZighdGhpcy5tX0lzU3RlcE9wZXJhdGlvbkhpbnRDYWxjdWxhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLm1fT3BlcmF0aW9uSGludExpc3QgPSB0aGlzLl9fQ2FsY3VsYXRlT3BlcmF0aW9uSGludHMoKVxuICAgICAgICAgICAgdGhpcy5tX09wZXJhdGlvbkhpbnRJbmRleCA9IDBcbiAgICAgICAgICAgIHRoaXMubV9Jc1N0ZXBPcGVyYXRpb25IaW50Q2FsY3VsYXRlZCA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cbiAgICBIYXNPcGVyYXRpb25IaW50KCk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLl9fVXBkYXRlT3BlcmF0aW9uSGludFN0YXR1cygpXG4gICAgICAgIHJldHVybiB0aGlzLm1fT3BlcmF0aW9uSGludExpc3QubGVuZ3RoID4gMFxuICAgIH1cbiAgICBEb09wZXJhdGlvbkhpbnQoKTogT3BlcmF0aW9uSGludCB7XG4gICAgICAgIHRoaXMuX19VcGRhdGVPcGVyYXRpb25IaW50U3RhdHVzKClcbiAgICAgICAgY29uc29sZS5hc3NlcnQodGhpcy5IYXNPcGVyYXRpb25IaW50KCkpXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubV9PcGVyYXRpb25IaW50SW5kZXhcbiAgICAgICAgdGhpcy5tX09wZXJhdGlvbkhpbnRJbmRleCA9ICh0aGlzLm1fT3BlcmF0aW9uSGludEluZGV4KzEpJXRoaXMubV9PcGVyYXRpb25IaW50TGlzdC5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0aGlzLm1fT3BlcmF0aW9uSGludExpc3RbaW5kZXhdXG4gICAgfVxuICAgIC8vIOiuoeeul+W9k+WJjeWPr+aPkOekuueahOatpemqpOWIl+ihqFxuICAgIHByaXZhdGUgX19DYWxjdWxhdGVPcGVyYXRpb25IaW50cygpOiBPcGVyYXRpb25IaW50W10ge1xuICAgICAgICBsZXQgaGludHM6IE9wZXJhdGlvbkhpbnRbXSA9IFtdXG4gICAgICAgIC8vIFBMQVlfVE9fUExBWVxuICAgICAgICBmb3IobGV0IHRvUGxheUluZGV4PTA7IHRvUGxheUluZGV4IDw3OyArK3RvUGxheUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1BsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgICAgICBmb3IobGV0IGZyb21QbGF5SW5kZXg9MDsgZnJvbVBsYXlJbmRleCA8NzsgKytmcm9tUGxheUluZGV4KXtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF1cbiAgICAgICAgICAgICAgICBpZighZnJvbVBsYXlHcm91cC5Jc1Bva2Vyc0VtcHR5KCkgJiYgdG9QbGF5R3JvdXAuSXNDb25jYXRQb2tlcihmcm9tUGxheUdyb3VwLnJvb3RPcGVuUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgaGludHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFVE9wZXJhdGlvbkhpbnQuUExBWV9UT19QTEFZLFxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogZnJvbVBsYXlJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB0b1BsYXlJbmRleFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBQTEFZX1RPX1JFQ0VJVkVcbiAgICAgICAgZm9yKGxldCBmcm9tUGxheUluZGV4PTA7IGZyb21QbGF5SW5kZXggPDc7ICsrZnJvbVBsYXlJbmRleCl7XG4gICAgICAgICAgICBsZXQgZnJvbVBsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF1cbiAgICAgICAgICAgIGlmKCFmcm9tUGxheUdyb3VwLklzUG9rZXJzRW1wdHkoKSl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCB0b1JlY2VpdmVJbmRleD0wOyB0b1JlY2VpdmVJbmRleCA8NDsgKyt0b1JlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b1JlY2VpdmVHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGlmKHRvUmVjZWl2ZUdyb3VwLklzTmV4dFBva2VyKGZyb21QbGF5R3JvdXAudG9wKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFVE9wZXJhdGlvbkhpbnQuUExBWV9UT19SRUNFSVZFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IGZyb21QbGF5SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IHRvUmVjZWl2ZUluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjZWl2ZSDlj6/ku6XmjqXlj5cgUGxheSDku6XlkI7vvIwg5LiN55So5YaN6YGN5Y6G5YW25LuW55qEIFJlY2VpdmUg5Yy65Z+fXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPUEVOX1RPX1JFQ0VJVkVcbiAgICAgICAgaWYodGhpcy5fb3BlbkFyZWFHcm91cC50b3Ape1xuICAgICAgICAgICAgZm9yKGxldCB0b1JlY2VpdmVJbmRleD0wOyB0b1JlY2VpdmVJbmRleCA8NDsgKyt0b1JlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICAgICAgbGV0IHRvUmVjZWl2ZUdyb3VwID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1t0b1JlY2VpdmVJbmRleF1cbiAgICAgICAgICAgICAgICBpZih0b1JlY2VpdmVHcm91cC5Jc05leHRQb2tlcih0aGlzLl9vcGVuQXJlYUdyb3VwLnRvcCkpe1xuICAgICAgICAgICAgICAgICAgICBoaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEVUT3BlcmF0aW9uSGludC5PUEVOX1RPX1JFQ0VJVkUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogdG9SZWNlaXZlSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT1BFTl9UT19QTEFZXG4gICAgICAgIGlmKHRoaXMuX29wZW5BcmVhR3JvdXAudG9wKXtcbiAgICAgICAgICAgIGZvcihsZXQgdG9QbGF5SW5kZXg9MDsgdG9QbGF5SW5kZXggPDc7ICsrdG9QbGF5SW5kZXgpe1xuICAgICAgICAgICAgICAgIGxldCB0b1BsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgaWYodG9QbGF5R3JvdXAuSXNDb25jYXRQb2tlcih0aGlzLl9vcGVuQXJlYUdyb3VwLnRvcCkpe1xuICAgICAgICAgICAgICAgICAgICBoaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEVUT3BlcmF0aW9uSGludC5PUEVOX1RPX1BMQVksXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogdG9QbGF5SW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ0xPU0VfVE9fT1BFTlxuICAgICAgICBpZighdGhpcy5fY2xvc2VBcmVhR3JvdXAuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICBoaW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBFVE9wZXJhdGlvbkhpbnQuQ0xPU0VfVE9fT1BFTlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyBPUEVOX1RPX0NMT1NFXG4gICAgICAgIGlmKCghdGhpcy5fb3BlbkFyZWFHcm91cC5Jc1Bva2Vyc0VtcHR5KCkpICYmIHRoaXMuX2Nsb3NlQXJlYUdyb3VwLklzUG9rZXJzRW1wdHkoKSAmJiB0aGlzLklzQ2FuUmVmbGlwKCkpe1xuICAgICAgICAgICAgaGludHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogRVRPcGVyYXRpb25IaW50Lk9QRU5fVE9fQ0xPU0VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gUkVDRUlWRV9UT19QTEFZXG4gICAgICAgIGZvcihsZXQgdG9QbGF5SW5kZXg9MDsgdG9QbGF5SW5kZXggPDc7ICsrdG9QbGF5SW5kZXgpe1xuICAgICAgICAgICAgbGV0IHRvUGxheUdyb3VwID0gdGhpcy5fcGxheUdyb3Vwc1t0b1BsYXlJbmRleF1cbiAgICAgICAgICAgIGZvcihsZXQgZnJvbVJlY2VpdmVJbmRleD0wOyBmcm9tUmVjZWl2ZUluZGV4IDw0OyArK2Zyb21SZWNlaXZlSW5kZXgpe1xuICAgICAgICAgICAgICAgIGxldCBmcm9tUmVjZWl2ZUdyb3VwID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1tmcm9tUmVjZWl2ZUluZGV4XVxuICAgICAgICAgICAgICAgIGlmKCFmcm9tUmVjZWl2ZUdyb3VwLklzUG9rZXJzRW1wdHkoKSAmJiB0b1BsYXlHcm91cC5Jc0NvbmNhdFBva2VyKGZyb21SZWNlaXZlR3JvdXAudG9wKSl7XG4gICAgICAgICAgICAgICAgICAgIGhpbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRVRPcGVyYXRpb25IaW50LlJFQ0VJVkVfVE9fUExBWSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IGZyb21SZWNlaXZlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0bzogdG9QbGF5SW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaGludHNcbiAgICB9XG5cbiAgICBpc0hpbnRlZEJWOiBpaS5Cb29sZWFuQlYgPSBudWxsOyAvKiDmmK/lkKbmj5DnpLrov4fmrKHmlbAgKi9cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiBVc2VyIElucHV0IEV2ZW50IEhhbmRsZXJcbiAgICBPblBsYXlQb2tlckNsaWNrKHBva2VyOiBQb2tlcikge1xuICAgICAgICBjb25zb2xlLmFzc2VydChwb2tlci5zdGF0dXMgPT09IEVQb2tlclN0YXR1cy5PUEVOICYmIHBva2VyLmxvY2F0aW9uID09PSBFTG9jYXRpb24uUExBWSlcbiAgICAgICAgaWYgKHBva2VyLmlzVG9wKSB7XG4gICAgICAgICAgICAvLyAxLiDlsJ3or5XmlL7liLAgUmVjZWl2ZSDljLrln58s5b+F6aG75LuOIDAg5byA5aeL6YGN5Y6GXG4gICAgICAgICAgICBmb3IgKGxldCByZWNlaXZlSW5kZXggPSAwOyByZWNlaXZlSW5kZXggPCA0OyArK3JlY2VpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBycGc6IFBva2VyR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3JlY2VpdmVJbmRleF1cbiAgICAgICAgICAgICAgICBpZiAocnBnLklzTmV4dFBva2VyKHBva2VyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX01vdmVGcm9tUGxheVRvUmVjZWl2ZShwb2tlciwgcmVjZWl2ZUluZGV4KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIDIuIOWwneivleaUvuWIsCBQbGF5IOWMuuWfn+eahOWFtuS7lue7hFxuICAgICAgICAgICAgZm9yIChsZXQgcGxheUluZGV4ID0gMDsgcGxheUluZGV4IDwgNzsgKytwbGF5SW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wbGF5R3JvdXBzW3BsYXlJbmRleF0uSXNDb25jYXRQb2tlcihwb2tlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1BsYXkocG9rZXIsIHBsYXlJbmRleClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19DTElDS19QT0tFUl9OT19DSEFOR0UsIHBva2VyKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIOmdnumhtumDqOeJjCzkvYbmmK/nv7vlvIDnnYDnmoTniYws5Y+q5pyJIFBsYXkg5Yy65Z+f5Y+v5Lul5om/5o6lXG4gICAgICAgICAgICBmb3IgKGxldCBwbGF5SW5kZXggPSAwOyBwbGF5SW5kZXggPCA3OyArK3BsYXlJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBwZ3A6IFBva2VyR3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW3BsYXlJbmRleF1cbiAgICAgICAgICAgICAgICBpZihwZ3AuSXNDb25jYXRQb2tlcihwb2tlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1BsYXkocG9rZXIsIHBsYXlJbmRleClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19DTElDS19QT0tFUl9OT19DSEFOR0UsIHBva2VyKVxuICAgICAgICB9XG4gICAgfVxuICAgIE9uQ2xvc2VQb2tlckNsaWNrKHBva2VyOiBQb2tlcikge1xuICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbihwb2tlcilcbiAgICB9XG4gICAgT25SZWNlaXZlUG9rZXJDbGljayhwb2tlcjogUG9rZXIpIHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQocG9rZXIuZ3JvdXAudG9wID09PSBwb2tlcilcbiAgICAgICAgZm9yIChsZXQgcmVjZWl2ZUluZGV4ID0gMDsgcmVjZWl2ZUluZGV4IDwgNzsgKytyZWNlaXZlSW5kZXgpIHtcbiAgICAgICAgICAgIGxldCBwZ3A6IFBva2VyR3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW3JlY2VpdmVJbmRleF1cbiAgICAgICAgICAgIGlmKHBncC5Jc0NvbmNhdFBva2VyKHBva2VyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KHBva2VyLCByZWNlaXZlSW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfQ0xJQ0tfUE9LRVJfTk9fQ0hBTkdFLCBwb2tlcilcbiAgICB9XG4gICAgT25PcGVuUG9rZXJDbGljayhwb2tlcjogUG9rZXIpIHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQoKHBva2VyLmxvY2F0aW9uID09PSBFTG9jYXRpb24uT1BFTikgJiYgcG9rZXIuaXNUb3ApXG4gICAgICAgIC8vIOmAu+i+keaYr++8mlxuICAgICAgICAvLyAxLiDlpoLmnpzov5nlvKDniYws5Y+v5Lul5pS+5Yiw5pS254mM5Yy6LOmCo+S5iOWwseenu+WKqOWIsOaUtueJjOWMulxuICAgICAgICAvLyDor6Lpl67mlLbniYzljLrmmK/lkKblj6/ku6Xmib/mjqXmraTniYws5b+F6aG75LuOIDAg5byA5aeL6YGN5Y6GXG4gICAgICAgIGZvciAobGV0IHJlY2VpdmVJbmRleCA9IDA7IHJlY2VpdmVJbmRleCA8IDQ7ICsrcmVjZWl2ZUluZGV4KSB7XG4gICAgICAgICAgICBsZXQgcnBnOiBQb2tlckdyb3VwID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1tyZWNlaXZlSW5kZXhdXG4gICAgICAgICAgICBpZiAocnBnLklzTmV4dFBva2VyKHBva2VyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fTW92ZUZyb21PcGVuVG9SZWNlaXZlKHBva2VyLCByZWNlaXZlSW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiDlpoLmnpwgUGxheSDljLrln5/mnInlj6/ku6Xmib/mjqXmraTniYznmoTnu4Qs6YKj5LmI5bCGIHBva2VyIOenu+WKqOWIsOivpee7hFxuICAgICAgICBmb3IgKGxldCBwbGF5SW5kZXggPSAwOyBwbGF5SW5kZXggPCA3OyArK3BsYXlJbmRleCkge1xuICAgICAgICAgICAgbGV0IHBwZzogUG9rZXJHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbcGxheUluZGV4XVxuICAgICAgICAgICAgaWYgKHBwZy5Jc0NvbmNhdFBva2VyKHBva2VyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fTW92ZUZyb21PcGVuVG9QbGF5KHBva2VyLCBwbGF5SW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmtL7lj5Hngrnlh7vml6DmlYjnmoTmtojmga9cbiAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfQ0xJQ0tfUE9LRVJfTk9fQ0hBTkdFLCBwb2tlcilcbiAgICB9XG4gICAgT25DbGlja0Nsb3NlQm90dG9tKCkge1xuICAgICAgICBpZih0aGlzLklzQ2FuUmVmbGlwKCkpe1xuICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKVxuICAgICAgICB9XG4gICAgfVxuICAgIE9uRHJhZ1RvUmVjZWl2ZShwb2tlcjogUG9rZXIsIHJlY2VpdmVJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmKHBva2VyLmlzVG9wKXtcbiAgICAgICAgICAgIGxldCBycGc6IFBva2VyR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3JlY2VpdmVJbmRleF1cbiAgICAgICAgICAgIGlmIChycGcuSXNOZXh0UG9rZXIocG9rZXIpKSB7XG4gICAgICAgICAgICAgICAgLy8g5YGa6L+e5o6l55qE5pWw5o2u5pON5L2cXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudDogUG9rZXJHcm91cCA9IHBva2VyLmdyb3VwXG4gICAgICAgICAgICAgICAgaWYocG9rZXIubG9jYXRpb24gPT09IEVMb2NhdGlvbi5QTEFZKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1JlY2VpdmUocG9rZXIsIHJlY2VpdmVJbmRleCwgRUFjdGlvblR5cGUuRFJBRylcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihwb2tlci5sb2NhdGlvbiA9PT0gRUxvY2F0aW9uLk9QRU4pe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX01vdmVGcm9tT3BlblRvUmVjZWl2ZShwb2tlciwgcmVjZWl2ZUluZGV4LCBFQWN0aW9uVHlwZS5EUkFHKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX01vdmVGcm9tUmVjZWl2ZVRvUmVjZWl2ZShwb2tlciwgcmVjZWl2ZUluZGV4LCBFQWN0aW9uVHlwZS5EUkFHKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19EUkFHX1BPS0VSX05PX0NIQU5HRSwgcG9rZXIpXG4gICAgfVxuICAgIE9uRHJhZ1RvUGxheShwb2tlcjogUG9rZXIsIHBsYXlJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmKHBva2VyLmlzVG9wKXtcbiAgICAgICAgICAgIC8vIOenu+WKqOS4gOW8oOeJjFxuICAgICAgICAgICAgbGV0IHBsYXlHcm91cDogUG9rZXJHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbcGxheUluZGV4XVxuICAgICAgICAgICAgaWYocGxheUdyb3VwLklzQ29uY2F0UG9rZXIocG9rZXIpKXtcbiAgICAgICAgICAgICAgICBpZihwb2tlci5sb2NhdGlvbiA9PSBFTG9jYXRpb24uUExBWSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1BsYXkocG9rZXIsIHBsYXlJbmRleCwgRUFjdGlvblR5cGUuRFJBRylcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihwb2tlci5sb2NhdGlvbiA9PT0gRUxvY2F0aW9uLlJFQ0VJVkUpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KHBva2VyLCBwbGF5SW5kZXgsIEVBY3Rpb25UeXBlLkRSQUcpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1BsYXkocG9rZXIsIHBsYXlJbmRleCwgRUFjdGlvblR5cGUuRFJBRylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19EUkFHX1BPS0VSX05PX0NIQU5HRSwgcG9rZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8g56e75Yqo5LiA57uEXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChwb2tlci5sb2NhdGlvbiA9PSBFTG9jYXRpb24uUExBWSlcbiAgICAgICAgICAgIGxldCBwbGF5R3JvdXA6IFBva2VyR3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW3BsYXlJbmRleF1cbiAgICAgICAgICAgIGlmKHBsYXlHcm91cC5Jc0NvbmNhdFBva2VyKHBva2VyKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUGxheShwb2tlciwgcGxheUluZGV4LCBFQWN0aW9uVHlwZS5EUkFHKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUl9OT19DSEFOR0UsIHBva2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIElzQ2FuUmVmbGlwKCk6IGJvb2xlYW57XG4gICAgICAgIHJldHVybiB0aGlzLl9faXNDYW5SZWZsaXBCeUNvdW50KHRoaXMuZmxpcENsb3NlQ2FyZHNDb3VudEJWLnYpXG4gICAgfVxuICAgIHByaXZhdGUgX19pc0NhblJlZmxpcEJ5Q291bnQoX2ZsaXBDbG9zZUNhcmRzQ291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLl9pc1ZlZ2FzTW9kZSl7XG4gICAgICAgICAgICBpZih0aGlzLl9pc0NhcmQzTW9kZSl7XG4gICAgICAgICAgICAgICAgaWYoX2ZsaXBDbG9zZUNhcmRzQ291bnQgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiAvLyEgTW92ZSBBY3Rpb25zIOavj+S4gOS4qiBfX01vdmUg5pys6LSo5a+55bqU5LiA5Liq5pON5L2cXG4gICAgcHJpdmF0ZSBfX01vdmVGcm9tUGxheVRvUGxheShwb2tlcjogUG9rZXIsIHRvUGxheUluZGV4OiBudW1iZXIsIGFjdFR5cDogRUFjdGlvblR5cGUgPSBFQWN0aW9uVHlwZS5DTElDSywgaWdub3JlU3RlcDogYm9vbGVhbiA9IGZhbHNlLCBub3RVcGRhdGVTY29yZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBva2VyLmxvY2F0aW9uID09IEVMb2NhdGlvbi5QTEFZKVxuICAgICAgICBsZXQgZzogUG9rZXJHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgIGlmKHBva2VyLmlzVG9wKXtcbiAgICAgICAgICAgIGxldCBvcmlnaW5Hcm91cCA9IHBva2VyLmdyb3VwXG4gICAgICAgICAgICBsZXQgaXNGbGlwOiBib29sZWFuID0gb3JpZ2luR3JvdXAuSXNBdXRvRmxpcE9uUmVtb3ZlUG9rZXIocG9rZXIpXG4gICAgICAgICAgICBsZXQgZnJvbUluZGV4ID0gcG9rZXIuZ3JvdXBJbmRleFxuICAgICAgICAgICAgbGV0IHRvSW5kZXggPSB0b1BsYXlJbmRleFxuXG4gICAgICAgICAgICBwb2tlci5ncm91cC5SZW1vdmVUb3AoKVxuICAgICAgICAgICAgZy5BZGRQb2tlcihwb2tlcilcbiAgICAgICAgICAgIHRoaXMuX19TdG9wRm91bmRhdGlvbnNDb3VudCgpXG5cbiAgICAgICAgICAgIGlmKGFjdFR5cCAhPT0gRUFjdGlvblR5cGUuVU5ETyl7XG4gICAgICAgICAgICAgICAgLy8g6K6w5b2V5Y+Y5YyWXG4gICAgICAgICAgICAgICAgbGV0IGNtZCA9IHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5QTEFZX1RPX1BMQVkpLkFkZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cDogRUNoYW5nZVR5cGUuTU9WRSxcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIsXG4gICAgICAgICAgICAgICAgICAgIGZyb21JbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdG9JbmRleFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYoaXNGbGlwKXtcbiAgICAgICAgICAgICAgICAgICAgY21kLkFkZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEVDaGFuZ2VUeXBlLkZMSVAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2tlcjogb3JpZ2luR3JvdXAudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBFUG9rZXJTdGF0dXMuT1BFTlxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIOe/u+eJjOiuoeWIhlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydChvcmlnaW5Hcm91cC50b3AuaW5pdExvY2F0aW9uID09PSBFTG9jYXRpb24uUExBWSAmJiBvcmlnaW5Hcm91cC50b3AuaW5pdFN0YXR1cyA9PT0gRVBva2VyU3RhdHVzLkNMT1NFKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNoYW5nZVJlY2VpdmVTY29yZSg1KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5VcGRhdGVNb3ZlU3RlcChpZ25vcmVTdGVwKVxuICAgICAgICAgICAgdGhpcy5VcGRhdGVTY29yZShub3RVcGRhdGVTY29yZSlcblxuICAgICAgICAgICAgc3dpdGNoIChhY3RUeXApIHtcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLkNMSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZST01fUExBWV9UT19QTEFZLCBwb2tlcilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9uVHlwZS5EUkFHOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19EUkFHX1BPS0VSX0ZST01fUExBWV9UT19QTEFZLCBwb2tlcilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFQWN0aW9uVHlwZS5VTkRPOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZPUl9VTkRPX0ZST01fUExBWV9UT19QTEFZLCBwb2tlcilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IG9yaWdpbkdyb3VwOiBQb2tlckdyb3VwID0gcG9rZXIuZ3JvdXBcbiAgICAgICAgICAgIGxldCBpc0ZsaXA6IGJvb2xlYW4gPSBvcmlnaW5Hcm91cC5Jc0F1dG9GbGlwT25SZW1vdmVQb2tlcihwb2tlcilcbiAgICAgICAgICAgIGxldCBmcm9tSW5kZXggPSBwb2tlci5ncm91cEluZGV4XG4gICAgICAgICAgICBsZXQgdG9JbmRleCA9IHRvUGxheUluZGV4XG4gICAgICAgICAgICBsZXQgcG9rZXJzID0gW11cbiAgICAgICAgICAgIHdoaWxlKHRydWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gb3JpZ2luR3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgICAgICAgICBwb2tlcnMucHVzaCh0b3ApXG4gICAgICAgICAgICAgICAgaWYodG9wID09IHBva2VyKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IobGV0IHBva2VySW5kZXggPSBwb2tlcnMubGVuZ3RoLTE7IHBva2VySW5kZXggPj0wOyAtLXBva2VySW5kZXgpe1xuICAgICAgICAgICAgICAgIGxldCBwID0gcG9rZXJzW3Bva2VySW5kZXhdXG4gICAgICAgICAgICAgICAgZy5BZGRQb2tlcihwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX1N0b3BGb3VuZGF0aW9uc0NvdW50KClcblxuICAgICAgICAgICAgaWYoYWN0VHlwICE9PSBFQWN0aW9uVHlwZS5VTkRPKXtcbiAgICAgICAgICAgICAgICAvLyDorrDlvZXlj5jljJZcbiAgICAgICAgICAgICAgICBsZXQgY21kID0gdGhpcy5OZXdDbWQoRVRVbmRvQ21kLlBMQVlfVE9fUExBWSkuQWRkQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwOiBFQ2hhbmdlVHlwZS5NT1ZFLFxuICAgICAgICAgICAgICAgICAgICBwb2tlcixcbiAgICAgICAgICAgICAgICAgICAgZnJvbUluZGV4LFxuICAgICAgICAgICAgICAgICAgICB0b0luZGV4XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZihpc0ZsaXApe1xuICAgICAgICAgICAgICAgICAgICBjbWQuQWRkQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogRUNoYW5nZVR5cGUuRkxJUCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBva2VyOiBvcmlnaW5Hcm91cC50b3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEVQb2tlclN0YXR1cy5PUEVOXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgLy8g57+754mM6K6h5YiGXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KG9yaWdpbkdyb3VwLnRvcC5pbml0TG9jYXRpb24gPT09IEVMb2NhdGlvbi5QTEFZICYmIG9yaWdpbkdyb3VwLnRvcC5pbml0U3RhdHVzID09PSBFUG9rZXJTdGF0dXMuQ0xPU0UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlUmVjZWl2ZVNjb3JlKDUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZU1vdmVTdGVwKGlnbm9yZVN0ZXApXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKClcblxuICAgICAgICAgICAgc3dpdGNoIChhY3RUeXApIHtcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLkNMSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSU19GUk9NX1BMQVlfVE9fUExBWSwgcG9rZXJzKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLkRSQUc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX0RSQUdfUE9LRVJTX0ZST01fUExBWV9UT19QTEFZLCBwb2tlcnMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRUFjdGlvblR5cGUuVU5ETzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUlNfRk9SX1VORE9fRlJPTV9QTEFZX1RPX1BMQVksIHBva2VycylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlVwZGF0ZUhhc05leHRTdGVwKClcbiAgICB9XG4gICAgcHJpdmF0ZSBfX01vdmVGcm9tUGxheVRvUmVjZWl2ZShwb2tlcjogUG9rZXIsIHRvUmVjZWl2ZUluZGV4OiBudW1iZXIsIGFjdFR5cDogRUFjdGlvblR5cGUgPSBFQWN0aW9uVHlwZS5DTElDSywgaWdub3JlU3RlcDogYm9vbGVhbiA9IGZhbHNlLCBub3RVcGRhdGVTY29yZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBva2VyLmxvY2F0aW9uID09IEVMb2NhdGlvbi5QTEFZKVxuICAgICAgICBsZXQgb3JpZ2luR3JvdXA6IFBva2VyR3JvdXAgPSBwb2tlci5ncm91cFxuICAgICAgICBsZXQgZnJvbUluZGV4ID0gb3JpZ2luR3JvdXAuaW5kZXhcbiAgICAgICAgbGV0IGlzRmxpcDogYm9vbGVhbiA9IG9yaWdpbkdyb3VwLklzQXV0b0ZsaXBPblJlbW92ZVBva2VyKHBva2VyKVxuICAgICAgICBsZXQgZzogUG9rZXJHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdXG4gICAgICAgIC8vIOWBmui/nuaOpeeahOaVsOaNruaTjeS9nFxuICAgICAgICBsZXQgcCA9IHBva2VyLmdyb3VwLlJlbW92ZVRvcCgpXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHAgPT09IHBva2VyKVxuICAgICAgICBnLkFkZFBva2VyKHBva2VyKVxuICAgICAgICB0aGlzLl9fQWRkRm91bmRhdGlvbnNDb3VudCgpXG5cbiAgICAgICAgaWYoYWN0VHlwICE9PSBFQWN0aW9uVHlwZS5VTkRPKXtcbiAgICAgICAgICAgIC8vIOiusOW9leWPmOWMllxuICAgICAgICAgICAgbGV0IGNtZCA9IHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5QTEFZX1RPX1JFQ0VJVkUpLkFkZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgdHlwOiBFQ2hhbmdlVHlwZS5NT1ZFLFxuICAgICAgICAgICAgICAgIHBva2VyLFxuICAgICAgICAgICAgICAgIGZyb21JbmRleCxcbiAgICAgICAgICAgICAgICB0b0luZGV4OiB0b1JlY2VpdmVJbmRleFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmKGlzRmxpcCl7XG4gICAgICAgICAgICAgICAgY21kLkFkZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cDogRUNoYW5nZVR5cGUuRkxJUCxcbiAgICAgICAgICAgICAgICAgICAgcG9rZXI6IG9yaWdpbkdyb3VwLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBFUG9rZXJTdGF0dXMuT1BFTlxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAvLyDnv7vniYzorqHliIZcbiAgICAgICAgICAgICAgICBjb25zb2xlLmFzc2VydChvcmlnaW5Hcm91cC50b3AuaW5pdExvY2F0aW9uID09PSBFTG9jYXRpb24uUExBWSAmJiBvcmlnaW5Hcm91cC50b3AuaW5pdFN0YXR1cyA9PT0gRVBva2VyU3RhdHVzLkNMT1NFKVxuICAgICAgICAgICAgICAgIHRoaXMuQ2hhbmdlUmVjZWl2ZVNjb3JlKDUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmlLbniYzorqHliIZcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlUmVjZWl2ZVNjb3JlKChwb2tlci5pbml0TG9jYXRpb24gPT09IEVMb2NhdGlvbi5QTEFZICYmIHBva2VyLmluaXRTdGF0dXMgPT09IEVQb2tlclN0YXR1cy5PUEVOKSA/IDE1IDogMTApXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVZlZ2FzUmVjZWl2ZVNjb3JlKDUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlVwZGF0ZU1vdmVTdGVwKGlnbm9yZVN0ZXApXG4gICAgICAgIHRoaXMuVXBkYXRlU2NvcmUobm90VXBkYXRlU2NvcmUpXG5cbiAgICAgICAgc3dpdGNoIChhY3RUeXApIHtcbiAgICAgICAgICAgIGNhc2UgRUFjdGlvblR5cGUuQ0xJQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GUk9NX1BMQVlfVE9fUkVDRUlWRSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLkRSQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUl9GUk9NX1BMQVlfVE9fUkVDRUlWRSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLlVORE86XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GT1JfVU5ET19GUk9NX1BMQVlfVE9fUkVDRUlWRSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9fQ2hlY2tHYW1lV2luKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuVXBkYXRlSGFzTmV4dFN0ZXAoKVxuICAgIH1cbiAgICBwcml2YXRlIF9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KHBva2VyOiBQb2tlciwgdG9QbGF5SW5kZXg6IG51bWJlciwgYWN0VHlwOiBFQWN0aW9uVHlwZSA9IEVBY3Rpb25UeXBlLkNMSUNLLCBpZ25vcmVTdGVwOiBib29sZWFuID0gZmFsc2UsIG5vdFVwZGF0ZVNjb3JlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQocG9rZXIubG9jYXRpb24gPT0gRUxvY2F0aW9uLlJFQ0VJVkUpXG4gICAgICAgIGxldCBvcmlnaW5Hcm91cDogUG9rZXJHcm91cCA9IHBva2VyLmdyb3VwXG4gICAgICAgIGxldCBmcm9tSW5kZXggPSBvcmlnaW5Hcm91cC5pbmRleFxuICAgICAgICBsZXQgZzogUG9rZXJHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgIGxldCBwID0gcG9rZXIuZ3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgY29uc29sZS5hc3NlcnQocCA9PT0gcG9rZXIpXG4gICAgICAgIGcuQWRkUG9rZXIocG9rZXIpXG4gICAgICAgIHRoaXMuX19TdG9wRm91bmRhdGlvbnNDb3VudCgpXG5cbiAgICAgICAgaWYoYWN0VHlwICE9PSBFQWN0aW9uVHlwZS5VTkRPKXtcbiAgICAgICAgICAgIC8vIOiusOW9leWPmOWMllxuICAgICAgICAgICAgdGhpcy5OZXdDbWQoRVRVbmRvQ21kLlJFQ0VJVkVfVE9fUExBWSkuQWRkQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICB0eXA6IEVDaGFuZ2VUeXBlLk1PVkUsXG4gICAgICAgICAgICAgICAgcG9rZXIsXG4gICAgICAgICAgICAgICAgZnJvbUluZGV4LFxuICAgICAgICAgICAgICAgIHRvSW5kZXg6IHRvUGxheUluZGV4XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5pS254mM6K6h5YiGXG4gICAgICAgIHRoaXMuQ2hhbmdlUmVjZWl2ZVNjb3JlKChwb2tlci5pbml0TG9jYXRpb24gPT09IEVMb2NhdGlvbi5QTEFZICYmIHBva2VyLmluaXRTdGF0dXMgPT09IEVQb2tlclN0YXR1cy5PUEVOKSA/IC0xNSA6IC0xMClcbiAgICAgICAgdGhpcy5DaGFuZ2VWZWdhc1JlY2VpdmVTY29yZSgtNSlcblxuICAgICAgICB0aGlzLlVwZGF0ZU1vdmVTdGVwKGlnbm9yZVN0ZXApXG4gICAgICAgIHRoaXMuVXBkYXRlU2NvcmUobm90VXBkYXRlU2NvcmUpXG5cbiAgICAgICAgc3dpdGNoIChhY3RUeXApIHtcbiAgICAgICAgICAgIGNhc2UgRUFjdGlvblR5cGUuQ0xJQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GUk9NX1JFQ0VJVkVfVE9fUExBWSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLkRSQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUl9GUk9NX1JFQ0VJVkVfVE9fUExBWSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLlVORE86XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GT1JfVU5ET19GUk9NX1JFQ0VJVkVfVE9fUExBWSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlVwZGF0ZUhhc05leHRTdGVwKClcbiAgICB9XG4gICAgcHJpdmF0ZSBfX01vdmVGcm9tT3BlblRvUGxheShwb2tlcjogUG9rZXIsIHRvUGxheUluZGV4OiBudW1iZXIsIGFjdFR5cDogRUFjdGlvblR5cGUgPSBFQWN0aW9uVHlwZS5DTElDSywgaWdub3JlU3RlcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBva2VyLmxvY2F0aW9uID09IEVMb2NhdGlvbi5PUEVOICYmIChhY3RUeXAgIT09IEVBY3Rpb25UeXBlLlVORE8pKVxuICAgICAgICBsZXQgZzogUG9rZXJHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgIGxldCBwID0gcG9rZXIuZ3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgY29uc29sZS5hc3NlcnQocCA9PT0gcG9rZXIpXG4gICAgICAgIGcuQWRkUG9rZXIocG9rZXIpXG4gICAgICAgIHRoaXMuX19TdG9wRm91bmRhdGlvbnNDb3VudCgpXG5cbiAgICAgICAgLy8g6K6w5b2V5Y+Y5YyWXG4gICAgICAgIHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5PUEVOX1RPX1BMQVkpLkFkZENoYW5nZSh7XG4gICAgICAgICAgICB0eXA6IEVDaGFuZ2VUeXBlLk1PVkUsXG4gICAgICAgICAgICBwb2tlcixcbiAgICAgICAgICAgIHRvSW5kZXg6IHRvUGxheUluZGV4XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8g56e75Yqo6K6h5YiGXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBva2VyLmluaXRMb2NhdGlvbiA9PT0gRUxvY2F0aW9uLkNMT1NFKVxuICAgICAgICB0aGlzLkNoYW5nZVJlY2VpdmVTY29yZSg1KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5VcGRhdGVNb3ZlU3RlcChpZ25vcmVTdGVwKVxuICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKClcblxuICAgICAgICBzd2l0Y2ggKGFjdFR5cCkge1xuICAgICAgICAgICAgY2FzZSBFQWN0aW9uVHlwZS5DTElDSzpcbiAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZST01fT1BFTl9UT19QTEFZLCBwb2tlcilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRUFjdGlvblR5cGUuRFJBRzpcbiAgICAgICAgICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19EUkFHX1BPS0VSX0ZST01fT1BFTl9UT19QTEFZLCBwb2tlcilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRUFjdGlvblR5cGUuVU5ETzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfkuI3lj6/og73lh7rnjrAnKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5VcGRhdGVIYXNOZXh0U3RlcCgpXG4gICAgfVxuICAgIHByaXZhdGUgX19Nb3ZlRnJvbU9wZW5Ub1JlY2VpdmUocG9rZXI6IFBva2VyLCB0b1JlY2VpdmVJbmRleDogbnVtYmVyLCBhY3RUeXA6IEVBY3Rpb25UeXBlID0gRUFjdGlvblR5cGUuQ0xJQ0ssIGlnbm9yZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAvLyBjb25zb2xlLmFzc2VydChwb2tlci5sb2NhdGlvbiA9PSBFTG9jYXRpb24uT1BFTiAmJiAoYWN0VHlwICE9PSBFQWN0aW9uVHlwZS5VTkRPKSlcbiAgICAgICAgbGV0IGc6IFBva2VyR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3RvUmVjZWl2ZUluZGV4XVxuICAgICAgICBwb2tlci5ncm91cC5SZW1vdmVUb3AoKVxuICAgICAgICBnLkFkZFBva2VyKHBva2VyKVxuICAgICAgICB0aGlzLl9fQWRkRm91bmRhdGlvbnNDb3VudCgpXG5cbiAgICAgICAgLy8g6K6w5b2V5Y+Y5YyWXG4gICAgICAgIHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5PUEVOX1RPX1JFQ0VJVkUpLkFkZENoYW5nZSh7XG4gICAgICAgICAgICB0eXA6IEVDaGFuZ2VUeXBlLk1PVkUsXG4gICAgICAgICAgICBwb2tlcixcbiAgICAgICAgICAgIHRvSW5kZXg6IHRvUmVjZWl2ZUluZGV4XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8g56e75Yqo6K6h5YiGXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHBva2VyLmluaXRMb2NhdGlvbiA9PT0gRUxvY2F0aW9uLkNMT1NFKVxuICAgICAgICB0aGlzLkNoYW5nZVJlY2VpdmVTY29yZSgxNSlcbiAgICAgICAgdGhpcy5DaGFuZ2VWZWdhc1JlY2VpdmVTY29yZSg1KVxuXG4gICAgICAgIHRoaXMuVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcClcbiAgICAgICAgdGhpcy5VcGRhdGVTY29yZSgpXG5cbiAgICAgICAgc3dpdGNoIChhY3RUeXApIHtcbiAgICAgICAgICAgIGNhc2UgRUFjdGlvblR5cGUuQ0xJQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GUk9NX09QRU5fVE9fUkVDRUlWRSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLkRSQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUl9GUk9NX09QRU5fVE9fUkVDRUlWRSwgcG9rZXIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVBY3Rpb25UeXBlLlVORE86XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5LiN5Y+v6IO95Ye6546wJylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19DaGVja0dhbWVXaW4oKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5VcGRhdGVIYXNOZXh0U3RlcCgpXG4gICAgfVxuICAgIHByaXZhdGUgX19Nb3ZlRnJvbVJlY2VpdmVUb1JlY2VpdmUocG9rZXI6IFBva2VyLCB0b1JlY2VpdmVJbmRleDogbnVtYmVyLCBhY3RUeXA6IEVBY3Rpb25UeXBlID0gRUFjdGlvblR5cGUuQ0xJQ0ssIGlnbm9yZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZSwgbm90VXBkYXRlU2NvcmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgb3JpZ2luR3JvdXA6IFBva2VyR3JvdXAgPSBwb2tlci5ncm91cFxuICAgICAgICBsZXQgZnJvbUluZGV4ID0gb3JpZ2luR3JvdXAuaW5kZXhcbiAgICAgICAgbGV0IGc6IFBva2VyR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3RvUmVjZWl2ZUluZGV4XVxuICAgICAgICBvcmlnaW5Hcm91cC5SZW1vdmVUb3AoKVxuICAgICAgICBnLkFkZFBva2VyKHBva2VyKVxuXG4gICAgICAgIGlmKGFjdFR5cCAhPT0gRUFjdGlvblR5cGUuVU5ETyl7XG4gICAgICAgICAgICAvLyDorrDlvZXlj5jljJZcbiAgICAgICAgICAgIHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5SRUNFSVZFX1RPX1JFQ0VJVkUpLkFkZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgdHlwOiBFQ2hhbmdlVHlwZS5NT1ZFLFxuICAgICAgICAgICAgICAgIHBva2VyLFxuICAgICAgICAgICAgICAgIGZyb21JbmRleCxcbiAgICAgICAgICAgICAgICB0b0luZGV4OiB0b1JlY2VpdmVJbmRleFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcClcbiAgICAgICAgdGhpcy5VcGRhdGVTY29yZShub3RVcGRhdGVTY29yZSlcblxuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19EUkFHX1BPS0VSX0ZST01fUkVDRUlWRV9UT19SRUNFSVZFLCBwb2tlcilcblxuICAgICAgICB0aGlzLlVwZGF0ZUhhc05leHRTdGVwKClcbiAgICB9XG4gICAgcHJpdmF0ZSBfX01vdmVGcm9tQ2xvc2VUb09wZW4ocG9rZXI6IFBva2VyLCBpZ25vcmVTdGVwOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5hc3NlcnQoKHBva2VyLmxvY2F0aW9uID09PSBFTG9jYXRpb24uQ0xPU0UpICYmIHBva2VyLmlzVG9wKVxuICAgICAgICBpZih0aGlzLl9pc0NhcmQzTW9kZSl7XG4gICAgICAgICAgICAvLyAzIGNhcmRzXG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSBwb2tlci5ncm91cFxuICAgICAgICAgICAgbGV0IHBva2VycyA9IFtdXG4gICAgICAgICAgICBsZXQgY21kID0gdGhpcy5OZXdDbWQoRVRVbmRvQ21kLkNMT1NFU19UT19PUEVOKVxuICAgICAgICAgICAgd2hpbGUodHJ1ZSl7XG4gICAgICAgICAgICAgICAgcG9rZXJzLnB1c2goZ3JvdXAuUmVtb3ZlVG9wKCkpXG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlbkFyZWFHcm91cC5BZGRQb2tlcihwb2tlcnNbcG9rZXJzLmxlbmd0aC0xXSlcbiAgICAgICAgICAgICAgICBpZihwb2tlcnMubGVuZ3RoID09IDMgfHwgZ3JvdXAuSXNQb2tlcnNFbXB0eSgpKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbWQuQWRkQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICB0eXA6IEVDaGFuZ2VUeXBlLk1PVkUsXG4gICAgICAgICAgICAgICAgcG9rZXJzOiBwb2tlcnMsXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZU1vdmVTdGVwKGlnbm9yZVN0ZXApXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKClcblxuICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUlNfRlJPTV9DTE9TRV9UT19PUEVOLCBwb2tlcnMpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcG9rZXIuZ3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgICAgIHRoaXMuX29wZW5BcmVhR3JvdXAuQWRkUG9rZXIocG9rZXIpXG4gICAgXG4gICAgICAgICAgICAvLyDorrDlvZXlj5jljJZcbiAgICAgICAgICAgIHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5DTE9TRV9UT19PUEVOKS5BZGRDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cDogRUNoYW5nZVR5cGUuTU9WRSxcbiAgICAgICAgICAgICAgICBwb2tlcjogcG9rZXIsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZU1vdmVTdGVwKGlnbm9yZVN0ZXApXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKClcblxuICAgICAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GUk9NX0NMT1NFX1RPX09QRU4sIHBva2VyKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5VcGRhdGVIYXNOZXh0U3RlcCgpXG4gICAgfVxuICAgIHByaXZhdGUgX19Nb3ZlRnJvbU9wZW5Ub0Nsb3NlKGlnbm9yZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZighdGhpcy5fY2xvc2VBcmVhR3JvdXAuSXNQb2tlcnNFbXB0eSgpKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmxpcENsb3NlQ2FyZHNDb3VudEJWLnYgKz0gMVxuICAgICAgICBsZXQgaXNQb2tlck1vdmUgPSAhdGhpcy5fb3BlbkFyZWFHcm91cC5Jc1Bva2Vyc0VtcHR5KClcbiAgICAgICAgaWYoIWlzUG9rZXJNb3ZlKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBwb2tlcnMgPSBbXVxuICAgICAgICB3aGlsZSAoIXRoaXMuX29wZW5BcmVhR3JvdXAuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICBsZXQgcG9rZXIgPSB0aGlzLl9vcGVuQXJlYUdyb3VwLlJlbW92ZVRvcCgpXG4gICAgICAgICAgICB0aGlzLl9jbG9zZUFyZWFHcm91cC5BZGRQb2tlcihwb2tlcilcbiAgICAgICAgICAgIHBva2Vycy5wdXNoKHBva2VyKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g6K6w5b2V5Y+Y5YyWXG4gICAgICAgIHRoaXMuTmV3Q21kKEVUVW5kb0NtZC5PUEVOX1RPX0NMT1NFKS5BZGRDaGFuZ2Uoe1xuICAgICAgICAgICAgdHlwOiBFQ2hhbmdlVHlwZS5NT1ZFLFxuICAgICAgICAgICAgcG9rZXJzLFxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5VcGRhdGVNb3ZlU3RlcChpZ25vcmVTdGVwKVxuICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKClcblxuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX0FMTF9QT0tFUlNfRlJPTV9PUEVOX1RPX0NMT1NFLCBwb2tlcnMpXG5cbiAgICAgICAgdGhpcy5VcGRhdGVIYXNOZXh0U3RlcCgpXG4gICAgfVxuICAgIHByaXZhdGUgX19Nb3ZlRnJvbVBsYXlUb09wZW5Gb3JVbmRvKHBva2VyOiBQb2tlciwgaWdub3JlU3RlcDogYm9vbGVhbiA9IGZhbHNlLCBub3RVcGRhdGVTY29yZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUuYXNzZXJ0KHBva2VyLmxvY2F0aW9uID09IEVMb2NhdGlvbi5QTEFZKVxuICAgICAgICBwb2tlci5ncm91cC5SZW1vdmVUb3AoKVxuICAgICAgICB0aGlzLl9vcGVuQXJlYUdyb3VwLkFkZFBva2VyKHBva2VyKVxuXG4gICAgICAgIC8vIOenu+WKqOiuoeWIhlxuICAgICAgICBjb25zb2xlLmFzc2VydChwb2tlci5pbml0TG9jYXRpb24gPT09IEVMb2NhdGlvbi5DTE9TRSlcbiAgICAgICAgdGhpcy5DaGFuZ2VSZWNlaXZlU2NvcmUoLTUpXG5cbiAgICAgICAgdGhpcy5VcGRhdGVNb3ZlU3RlcChpZ25vcmVTdGVwKVxuICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKG5vdFVwZGF0ZVNjb3JlKVxuXG4gICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJfRk9SX1VORE9fRlJPTV9QTEFZX1RPX09QRU4sIHBva2VyKVxuXG4gICAgICAgIHRoaXMuVXBkYXRlSGFzTmV4dFN0ZXAoKVxuICAgIH1cbiAgICBwcml2YXRlIF9fTW92ZUZyb21SZWNlaXZlVG9PcGVuRm9yVW5kbyhwb2tlcjogUG9rZXIsIGlnbm9yZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZSwgbm90VXBkYXRlU2NvcmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAvLyBjb25zb2xlLmFzc2VydChwb2tlci5sb2NhdGlvbiA9PSBFTG9jYXRpb24uUkVDRUlWRSkgICAgICAgIFxuICAgICAgICBwb2tlci5ncm91cC5SZW1vdmVUb3AoKVxuICAgICAgICB0aGlzLl9vcGVuQXJlYUdyb3VwLkFkZFBva2VyKHBva2VyKVxuXG4gICAgICAgIC8vIOenu+WKqOiuoeWIhlxuICAgICAgICBjb25zb2xlLmFzc2VydChwb2tlci5pbml0TG9jYXRpb24gPT09IEVMb2NhdGlvbi5DTE9TRSlcbiAgICAgICAgdGhpcy5DaGFuZ2VSZWNlaXZlU2NvcmUoLTE1KVxuICAgICAgICB0aGlzLkNoYW5nZVZlZ2FzUmVjZWl2ZVNjb3JlKC01KVxuXG4gICAgICAgIHRoaXMuVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcClcbiAgICAgICAgdGhpcy5VcGRhdGVTY29yZShub3RVcGRhdGVTY29yZSlcblxuICAgICAgICB0aGlzLk5vdGlmeUdhbWVFdmVudChTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZPUl9VTkRPX0ZST01fUkVDRUlWRV9UT19PUEVOLCBwb2tlcilcblxuICAgICAgICB0aGlzLlVwZGF0ZUhhc05leHRTdGVwKClcbiAgICB9XG4gICAgLy8g5Y6f5pON5L2c77ya5LiA5pW05Y+g54mM56e75Yqo5YiwIENsb3NlIOWMuuWfn1xuICAgIHByaXZhdGUgX19Nb3ZlRnJvbUNsb3NlVG9PcGVuRm9yVW5kbyhwb2tlcnM6IFBva2VyW10sIGlnbm9yZVN0ZXA6IGJvb2xlYW4gPSBmYWxzZSwgbm90VXBkYXRlU2NvcmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgcHMgPSBbXVxuICAgICAgICBmb3IobGV0IGk9cG9rZXJzLmxlbmd0aC0xOyBpPj0wOyAtLWkpe1xuICAgICAgICAgICAgbGV0IHBva2VyID0gcG9rZXJzW2ldXG4gICAgICAgICAgICB0aGlzLl9jbG9zZUFyZWFHcm91cC5SZW1vdmVUb3AoKVxuICAgICAgICAgICAgdGhpcy5fb3BlbkFyZWFHcm91cC5BZGRQb2tlcihwb2tlcilcbiAgICAgICAgICAgIHBzLnB1c2gocG9rZXIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGlwQ2xvc2VDYXJkc0NvdW50QlYudiAtPSAxXG4gICAgICAgIHRoaXMuVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcClcbiAgICAgICAgdGhpcy5VcGRhdGVTY29yZShub3RVcGRhdGVTY29yZSlcbiAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9BTExfUE9LRVJTX0ZPUl9VTkRPX0ZST01fQ0xPU0VfVE9fT1BFTiwgcHMpXG4gICAgICAgIHRoaXMuVXBkYXRlSGFzTmV4dFN0ZXAoKVxuICAgIH1cbiAgICBwcml2YXRlIF9fTW92ZUZyb21PcGVuVG9DbG9zZUZvclVuZG8ocG9rZXI6IFBva2VyLCBpZ25vcmVTdGVwOiBib29sZWFuID0gZmFsc2UsIG5vdFVwZGF0ZVNjb3JlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5hc3NlcnQocG9rZXIubG9jYXRpb24gPT0gRUxvY2F0aW9uLk9QRU4pICAgICAgICBcbiAgICAgICAgcG9rZXIuZ3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgdGhpcy5fY2xvc2VBcmVhR3JvdXAuQWRkUG9rZXIocG9rZXIpXG4gICAgICAgIHRoaXMuVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcClcbiAgICAgICAgdGhpcy5VcGRhdGVTY29yZShub3RVcGRhdGVTY29yZSlcbiAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GT1JfVU5ET19GUk9NX09QRU5fVE9fQ0xPU0UsIHBva2VyKVxuICAgICAgICB0aGlzLlVwZGF0ZUhhc05leHRTdGVwKClcbiAgICB9XG4gICAgcHJpdmF0ZSBfX01vdmVQb2tlcnNGcm9tT3BlblRvQ2xvc2VGb3JVbmRvKHBva2VyczogUG9rZXJbXSwgaWdub3JlU3RlcDogYm9vbGVhbiA9IGZhbHNlLCBub3RVcGRhdGVTY29yZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IHBva2Vycy5sZW5ndGgtMTsgaT49MDsgLS1pKXtcbiAgICAgICAgICAgIGxldCBwb2tlciA9IHBva2Vyc1tpXVxuICAgICAgICAgICAgcG9rZXIuZ3JvdXAuUmVtb3ZlVG9wKClcbiAgICAgICAgICAgIHRoaXMuX2Nsb3NlQXJlYUdyb3VwLkFkZFBva2VyKHBva2VyKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuVXBkYXRlTW92ZVN0ZXAoaWdub3JlU3RlcClcbiAgICAgICAgdGhpcy5VcGRhdGVTY29yZShub3RVcGRhdGVTY29yZSlcbiAgICAgICAgdGhpcy5Ob3RpZnlHYW1lRXZlbnQoU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUlNfRk9SX1VORE9fRlJPTV9PUEVOX1RPX0NMT1NFLCBwb2tlcnMpXG4gICAgICAgIHRoaXMuVXBkYXRlSGFzTmV4dFN0ZXAoKVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgICAvLyNyZWdpb24gLy8hIOaSpOmUgOWKn+iDvVxuICAgIGhhc1VzZWRVbmRvOiBpaS5Cb29sZWFuQlYgPSBudWxsOyAvKiDmmK/lkKbkvb/nlKjov4cgVW5kbyDmk43kvZwgKi9cbiAgICByZWFkb25seSB1bmRvTGVuZ3RoQlY6IGlpLk51bWJlckJWID0gaWkuTnVtYmVyQlYuQm9ycm93KDApIC8qIOaYr+WQpuWPr+S7peaSpOmUgCAqL1xuICAgIHByaXZhdGUgdW5kb0NtZFN0YWNrOiBDbWRTdGFjayA9IG5ldyBDbWRTdGFjayh0aGlzLk9uVW5kb1N0YXR1c0NoYW5nZWQuYmluZCh0aGlzKSlcbiAgICBwcml2YXRlIE9uVW5kb1N0YXR1c0NoYW5nZWQobGVuZ3RoOiBudW1iZXIpeyB0aGlzLnVuZG9MZW5ndGhCVi52ID0gbGVuZ3RoOyB9XG4gICAgVW5kbyhpZ25vcmVTdGVwOiBib29sZWFuID0gZmFsc2Upe1xuICAgICAgICBpZih0aGlzLnVuZG9MZW5ndGhCVi52ID4gMCl7XG4gICAgICAgICAgICB0aGlzLmhhc1VzZWRVbmRvLnYgPSB0cnVlXG4gICAgICAgICAgICBsZXQgY21kID0gdGhpcy51bmRvQ21kU3RhY2sucG9wKClcbiAgICAgICAgICAgIGZvcihsZXQgaT1jbWQuY21kQ2hhbmdlcy5sZW5ndGgtMTsgaT49MDsgLS1pKXtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlID0gY21kLmNtZENoYW5nZXNbaV1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS50eXApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFQ2hhbmdlVHlwZS5GTElQOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5VbmRvRmxpcChjaGFuZ2UsIGkgPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRUNoYW5nZVR5cGUuTU9WRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVW5kb01vdmVDaGFuZ2VCeUNtZFR5cGUoY21kLmNtZFR5cGUsIGNoYW5nZSwgaWdub3JlU3RlcCwgaSA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWkuVUlNZ3IuaW5zLlNob3dNc2coXCJzb2xpdGFpcmUubm9fdW5kb19zdGVwXCIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgTmV3Q21kKGNtZFR5cGU6IEVUVW5kb0NtZCk6IENtZHtcbiAgICAgICAgbGV0IGNtZCA9IG5ldyBDbWQoY21kVHlwZSwgW10pXG4gICAgICAgIHRoaXMudW5kb0NtZFN0YWNrLnB1c2goY21kKVxuICAgICAgICByZXR1cm4gY21kXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBVbmRvRmxpcChjaGFuZ2U6IENtZENoYW5nZSwgbm90VXBkYXRlU2NvcmU6IGJvb2xlYW4pe1xuICAgICAgICBjaGFuZ2UucG9rZXIuc3RhdHVzID0gY2hhbmdlLnN0YXR1cyA9PT0gRVBva2VyU3RhdHVzLk9QRU4gPyBFUG9rZXJTdGF0dXMuQ0xPU0UgOiBFUG9rZXJTdGF0dXMuT1BFTlxuXG4gICAgICAgIC8vIOe/u+eJjOiuoeWIhlxuICAgICAgICBjb25zb2xlLmFzc2VydChjaGFuZ2UucG9rZXIuaW5pdExvY2F0aW9uID09PSBFTG9jYXRpb24uUExBWSAmJiBjaGFuZ2UucG9rZXIuaW5pdFN0YXR1cyA9PT0gRVBva2VyU3RhdHVzLkNMT1NFKVxuICAgICAgICB0aGlzLkNoYW5nZVJlY2VpdmVTY29yZSgtNSlcblxuICAgICAgICB0aGlzLlVwZGF0ZVNjb3JlKG5vdFVwZGF0ZVNjb3JlKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuTm90aWZ5R2FtZUV2ZW50KFNvbGl0YWlyZUV2ZW50LlNDX0ZMSVBfUE9LRVIsIGNoYW5nZS5wb2tlcilcbiAgICB9XG5cbiAgICBTbmFwVW5kb0NtZHMoKTogU25hcENtZFtdIHsgcmV0dXJuIHRoaXMudW5kb0NtZFN0YWNrLlNuYXAoKSB9XG4gICAgUmVkb0NtZHMoX2NtZHM6IFNuYXBDbWRbXSkge1xuICAgICAgICBsZXQgY21kcyA9IHRoaXMuQ29udmVydENtZHMoX2NtZHMpXG4gICAgICAgIGNtZHMuZm9yRWFjaChjbWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5SZXN1bWVDbWQoY21kLmNtZFR5cGUsIGNtZC5jbWRDaGFuZ2VzKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBwcml2YXRlIENvbnZlcnRDbWRzKGNtZHM6IFNuYXBDbWRbXSk6IENtZFtdIHtcbiAgICAgICAgcmV0dXJuIGNtZHMubWFwKGNtZD0+e1xuICAgICAgICAgICAgbGV0IGMgPSBuZXcgQ21kKGNtZC5jbWRUeXBlLCBbXSlcbiAgICAgICAgICAgIGNtZC5jbWRDaGFuZ2VzLmZvckVhY2goc25hcENoYW5nZSA9PiBjLkFkZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgdHlwOiBzbmFwQ2hhbmdlLnR5cCxcbiAgICAgICAgICAgICAgICBwb2tlcjogc25hcENoYW5nZS5wb2tlciA9PSBudWxsID8gbnVsbCA6IHRoaXMuZ2V0UG9rZXIoc25hcENoYW5nZS5wb2tlci5wb2ludCwgc25hcENoYW5nZS5wb2tlci5zdWl0KSxcbiAgICAgICAgICAgICAgICBwb2tlcnM6IHNuYXBDaGFuZ2UucG9rZXJzID09IG51bGwgPyBudWxsIDogc25hcENoYW5nZS5wb2tlcnMubWFwKHBva2VyID0+IHRoaXMuZ2V0UG9rZXIocG9rZXIucG9pbnQsIHBva2VyLnN1aXQpKSxcbiAgICAgICAgICAgICAgICBmcm9tSW5kZXg6IHNuYXBDaGFuZ2UuZnJvbUluZGV4LFxuICAgICAgICAgICAgICAgIHRvSW5kZXg6IHNuYXBDaGFuZ2UudG9JbmRleCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHNuYXBDaGFuZ2Uuc3RhdHVzXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIHJldHVybiBjXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8jcmVnaW9uIFVuZG8gUmVzdW1lXG4gICAgcHJpdmF0ZSBVbmRvTW92ZUNoYW5nZUJ5Q21kVHlwZShjbWRUeXBlOiBFVFVuZG9DbWQsIGNoYW5nZTogQ21kQ2hhbmdlLCBpZ25vcmVTdGVwOiBib29sZWFuLCBub3RVcGRhdGVTY29yZTogYm9vbGVhbil7XG4gICAgICAgIHN3aXRjaCAoY21kVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuUExBWV9UT19QTEFZOlxuICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1BsYXkoY2hhbmdlLnBva2VyLCBjaGFuZ2UuZnJvbUluZGV4LCBFQWN0aW9uVHlwZS5VTkRPLCBpZ25vcmVTdGVwLCBub3RVcGRhdGVTY29yZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVRVbmRvQ21kLlBMQVlfVE9fUkVDRUlWRTpcbiAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KGNoYW5nZS5wb2tlciwgY2hhbmdlLmZyb21JbmRleCwgRUFjdGlvblR5cGUuVU5ETywgaWdub3JlU3RlcCwgbm90VXBkYXRlU2NvcmUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUVW5kb0NtZC5SRUNFSVZFX1RPX1BMQVk6XG4gICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUmVjZWl2ZShjaGFuZ2UucG9rZXIsIGNoYW5nZS5mcm9tSW5kZXgsIEVBY3Rpb25UeXBlLlVORE8sIGlnbm9yZVN0ZXAsIG5vdFVwZGF0ZVNjb3JlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuUkVDRUlWRV9UT19SRUNFSVZFOlxuICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbVJlY2VpdmVUb1JlY2VpdmUoY2hhbmdlLnBva2VyLCBjaGFuZ2UuZnJvbUluZGV4LCBFQWN0aW9uVHlwZS5VTkRPLCBpZ25vcmVTdGVwLCBub3RVcGRhdGVTY29yZSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVRVbmRvQ21kLk9QRU5fVE9fUExBWTpcbiAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21QbGF5VG9PcGVuRm9yVW5kbyhjaGFuZ2UucG9rZXIsIGlnbm9yZVN0ZXAsIG5vdFVwZGF0ZVNjb3JlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuT1BFTl9UT19SRUNFSVZFOlxuICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbVJlY2VpdmVUb09wZW5Gb3JVbmRvKGNoYW5nZS5wb2tlciwgaWdub3JlU3RlcCwgbm90VXBkYXRlU2NvcmUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUVW5kb0NtZC5PUEVOX1RPX0NMT1NFOlxuICAgICAgICAgICAgICAgIC8vIOWOn+aTjeS9nO+8muS4gOaVtOWPoOeJjOenu+WKqOWIsCBDbG9zZSDljLrln59cbiAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3BlbkZvclVuZG8oY2hhbmdlLnBva2VycywgaWdub3JlU3RlcCwgbm90VXBkYXRlU2NvcmUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUVW5kb0NtZC5DTE9TRV9UT19PUEVOOlxuICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub0Nsb3NlRm9yVW5kbyhjaGFuZ2UucG9rZXIsIGlnbm9yZVN0ZXAsIG5vdFVwZGF0ZVNjb3JlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuQ0xPU0VTX1RPX09QRU46XG4gICAgICAgICAgICAgICAgdGhpcy5fX01vdmVQb2tlcnNGcm9tT3BlblRvQ2xvc2VGb3JVbmRvKGNoYW5nZS5wb2tlcnMsIGlnbm9yZVN0ZXAsIG5vdFVwZGF0ZVNjb3JlKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlc3VtZUNtZChjbWRUeXBlOiBFVFVuZG9DbWQsIGNoYW5nZXM6IENtZENoYW5nZVtdKSB7XG4gICAgICAgIHN3aXRjaCAoY21kVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuUExBWV9UT19QTEFZOlxuICAgICAgICAgICAgICAgIHRoaXMuX19SZXN1bWVPbmNlRm9yVHlwZU9mTW92ZShjaGFuZ2VzLCBjaGFuZ2UgPT4gdGhpcy5fX01vdmVGcm9tUGxheVRvUGxheShjaGFuZ2UucG9rZXIsIGNoYW5nZS50b0luZGV4KSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVRVbmRvQ21kLlBMQVlfVE9fUkVDRUlWRTpcbiAgICAgICAgICAgICAgICB0aGlzLl9fUmVzdW1lT25jZUZvclR5cGVPZk1vdmUoY2hhbmdlcywgY2hhbmdlID0+IHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1JlY2VpdmUoY2hhbmdlLnBva2VyLCBjaGFuZ2UudG9JbmRleCkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUVW5kb0NtZC5SRUNFSVZFX1RPX1BMQVk6XG4gICAgICAgICAgICAgICAgdGhpcy5fX1Jlc3VtZU9uY2VGb3JUeXBlT2ZNb3ZlKGNoYW5nZXMsIGNoYW5nZSA9PiB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KGNoYW5nZS5wb2tlciwgY2hhbmdlLnRvSW5kZXgpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuUkVDRUlWRV9UT19SRUNFSVZFOlxuICAgICAgICAgICAgICAgIHRoaXMuX19SZXN1bWVPbmNlRm9yVHlwZU9mTW92ZShjaGFuZ2VzLCBjaGFuZ2UgPT4gdGhpcy5fX01vdmVGcm9tUmVjZWl2ZVRvUmVjZWl2ZShjaGFuZ2UucG9rZXIsIGNoYW5nZS50b0luZGV4KSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVRVbmRvQ21kLk9QRU5fVE9fUExBWTpcbiAgICAgICAgICAgICAgICB0aGlzLl9fUmVzdW1lT25jZUZvclR5cGVPZk1vdmUoY2hhbmdlcywgY2hhbmdlID0+IHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1BsYXkoY2hhbmdlLnBva2VyLCBjaGFuZ2UudG9JbmRleCkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUVW5kb0NtZC5PUEVOX1RPX1JFQ0VJVkU6XG4gICAgICAgICAgICAgICAgdGhpcy5fX1Jlc3VtZU9uY2VGb3JUeXBlT2ZNb3ZlKGNoYW5nZXMsIGNoYW5nZSA9PiB0aGlzLl9fTW92ZUZyb21PcGVuVG9SZWNlaXZlKGNoYW5nZS5wb2tlciwgY2hhbmdlLnRvSW5kZXgpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuT1BFTl9UT19DTE9TRTpcbiAgICAgICAgICAgICAgICAvLyDljp/mk43kvZzvvJrkuIDmlbTlj6DniYznp7vliqjliLAgQ2xvc2Ug5Yy65Z+fXG4gICAgICAgICAgICAgICAgdGhpcy5fX1Jlc3VtZU9uY2VGb3JUeXBlT2ZNb3ZlKGNoYW5nZXMsIGNoYW5nZSA9PiB0aGlzLl9fTW92ZUZyb21PcGVuVG9DbG9zZSgpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVFVuZG9DbWQuQ0xPU0VfVE9fT1BFTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9fUmVzdW1lT25jZUZvclR5cGVPZk1vdmUoY2hhbmdlcywgY2hhbmdlID0+IHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKGNoYW5nZS5wb2tlcikpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUVW5kb0NtZC5DTE9TRVNfVE9fT1BFTjpcbiAgICAgICAgICAgICAgICB0aGlzLl9fUmVzdW1lT25jZUZvclR5cGVPZk1vdmUoY2hhbmdlcywgY2hhbmdlID0+IHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKGNoYW5nZS5wb2tlcnNbMF0pKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX19SZXN1bWVPbmNlRm9yVHlwZU9mTW92ZShjaGFuZ2VzOiBDbWRDaGFuZ2VbXSwgY2FsbGJhY2s6IChjaGFuZ2U6IENtZENoYW5nZSkgPT4gdm9pZCkge1xuICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4PGNoYW5nZXMubGVuZ3RoOyArK2luZGV4KXtcbiAgICAgICAgICAgIGxldCBjaGFuZ2UgPSBjaGFuZ2VzW2luZGV4XVxuICAgICAgICAgICAgaWYoY2hhbmdlLnR5cCA9PSBFQ2hhbmdlVHlwZS5NT1ZFKXtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjaGFuZ2UpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cbiAgICAvLyNlbmRyZWdpb24g5pKk6ZSA5Yqf6IO9XG5cbiAgICAvLyNyZWdpb24gLy8hIOiHquWKqOeOqeeJjFxuICAgIE9uVXNlSGVscCgpIHtcbiAgICAgICAgdGhpcy5pc0hlbHBlZEJWLnYgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGxheWVyT3BlbmVkQlYudiA9IHRydWU7XG4gICAgfVxuICAgIGlzSGVscGVkQlY6IGlpLkJvb2xlYW5CViA9IG51bGw7IC8qIOaYr+WQpua2iOiAl+i/h+asoeaVsCAqL1xuICAgIC8vIOaVsOaNruaImOaWl1xuICAgIHByaXZhdGUgQXV0b1NlcnZlclBsYXkoKTogYm9vbGVhbnsgcmV0dXJuIHRoaXMuQXV0b1NlcnZlclBsYXlTdGVwTmV4dCgpIH1cbiAgICBwcml2YXRlIEF1dG9TZXJ2ZXJQbGF5U3RlcE5leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMuaXNHYW1lV2luQlYudil7IHJldHVybiB0cnVlIH1cbiAgICAgICAgaWYodGhpcy5tX3N0cmF0ZWd5Rm4oZmFsc2UpKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkF1dG9TZXJ2ZXJQbGF5U3RlcE5leHQoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOaJgOacieaJkeWFi+eahOe/u+W8gOeKtuaAgVxuICAgIHJlYWRvbmx5IGlzQWxsUG9rZXJzT3BlbkJWOiBpaS5Cb29sZWFuQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKVxuICAgIHByaXZhdGUgX19yZWZyZXNoQWxsUG9rZXJPcGVuU3RhdHVzKCl7XG4gICAgICAgIHRoaXMuaXNBbGxQb2tlcnNPcGVuQlYudiA9IHRoaXMuX3Bva2Vycy5yZWR1Y2UoKGlzQWxsT3BlbiwgY3VyZW50UG9rZXIpID0+IGlzQWxsT3BlbiAmJiAoY3VyZW50UG9rZXIuc3RhdHVzID09PSBFUG9rZXJTdGF0dXMuT1BFTiksIHRydWUpXG4gICAgfVxuICAgIC8vIOiHquWKqOaUtueJjCBcbiAgICByZWFkb25seSBpc0F1dG9Db2xsZWN0aW5nQlY6IGlpLkJvb2xlYW5CViA9IGlpLkJvb2xlYW5CVi5Cb3Jyb3coZmFsc2UpXG4gICAgLy8g6Ieq5Yqo546p54mMXG4gICAgaXNQbGF5ZXJPcGVuZWRCVjogaWkuQm9vbGVhbkJWID0gbnVsbDsgLyog5piv5ZCm5omT5byA5LqG5pKt5pS+5ZmoICovXG4gICAgaXNBdXRvUGxheWluZ0JWOiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIHByaXZhdGUgbV9BdXRvUGxheWluZ0ludGVydmFsOiBudW1iZXIgPSBudWxsIC8qKiDoh6rliqjmkq3mlL7ml7bnmoTml7bpl7Tpl7TpmpQgKi9cbiAgICBDaGFuZ2VBdXRvUGxheUludGVydmFsKGR1cmF0aW9uOiBudW1iZXIpIHsgdGhpcy5tX0F1dG9QbGF5aW5nSW50ZXJ2YWwgPSBkdXJhdGlvbiB9IC8qKiDmm7TmlrDoh6rliqjmkq3mlL7nmoTml7bpl7Tpl7TpmpQgKi9cbiAgICBwcml2YXRlIG1fc3RyYXRlZ3lGbjogKG5vUGxheTogYm9vbGVhbik9PmJvb2xlYW4gPSBudWxsXG4gICAgcHJpdmF0ZSBBdXRvUGxheVN0ZXBOZXh0KGNhbGxiYWNrPzogQVVUT19SVU5fQ0FMTEJBQ0spIHtcbiAgICAgICAgaWYoISh0aGlzLmlzQXV0b1BsYXlpbmdCVi52IHx8IHRoaXMuaXNBdXRvQ29sbGVjdGluZ0JWLnYpKXsgcmV0dXJuIH1cbiAgICAgICAgaWYodGhpcy5pc0dhbWVXaW5CVi52KXtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRvUGxheWluZ0JWLnYgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5pc0F1dG9Db2xsZWN0aW5nQlYudiA9IGZhbHNlXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUsIHRoaXMuU2VlZCwgdGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubV9zdHJhdGVneUZuKGZhbHNlKSl7XG4gICAgICAgICAgICBpZih0aGlzLm1fQXV0b1BsYXlpbmdJbnRlcnZhbCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuQXV0b1BsYXlTdGVwTmV4dChjYWxsYmFjaylcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlpLkFwcC5pbnMuZGVsYXlDYWxsKHRoaXMubV9BdXRvUGxheWluZ0ludGVydmFsLCAoKT0+dGhpcy5BdXRvUGxheVN0ZXBOZXh0KGNhbGxiYWNrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5pc0F1dG9QbGF5aW5nQlYudiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmlzQXV0b0NvbGxlY3RpbmdCVi52ID0gZmFsc2VcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmFsc2UsIHRoaXMuU2VlZCwgdGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBBdXRvUGxheShpbnRlcnZhbDogbnVtYmVyLCBjYWxsYmFjaz86IEFVVE9fUlVOX0NBTExCQUNLKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KCghdGhpcy5pc0F1dG9QbGF5aW5nQlYudikgJiYgKCF0aGlzLmlzQXV0b0NvbGxlY3RpbmdCVi52KSlcbiAgICAgICAgdGhpcy5DaGFuZ2VBdXRvUGxheUludGVydmFsKGludGVydmFsKVxuICAgICAgICB0aGlzLmlzQXV0b1BsYXlpbmdCVi52ID0gdHJ1ZVxuICAgICAgICBpaS5BcHAuaW5zLmRlbGF5Q2FsbCh0aGlzLm1fQXV0b1BsYXlpbmdJbnRlcnZhbCwgKCk9PnRoaXMuQXV0b1BsYXlTdGVwTmV4dChjYWxsYmFjaykpO1xuICAgIH1cbiAgICBBdXRvQ29sbGVjdChpbnRlcnZhbDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuaXNBbGxQb2tlcnNPcGVuQlYudiAmJiAoIXRoaXMuaXNBdXRvUGxheWluZ0JWLnYpICYmICghdGhpcy5pc0F1dG9Db2xsZWN0aW5nQlYudikpXG4gICAgICAgIHRoaXMuQ2hhbmdlQXV0b1BsYXlJbnRlcnZhbChpbnRlcnZhbClcbiAgICAgICAgdGhpcy5pc0F1dG9Db2xsZWN0aW5nQlYudiA9IHRydWVcbiAgICAgICAgdGhpcy5BdXRvUGxheVN0ZXBOZXh0KClcbiAgICB9XG4gICAgU3RvcEF1dG9QbGF5KCkgeyB0aGlzLmlzQXV0b1BsYXlpbmdCVi52ID0gZmFsc2UgfVxuICAgIE5leHRTdGVwKCkgeyB0aGlzLl9fRG9OZXh0U3RlcChmYWxzZSkgfVxuICAgIHByaXZhdGUgX19Eb05leHRTdGVwKG5vUGxheTogYm9vbGVhbikge1xuICAgICAgICBpZighKHRoaXMuaXNHYW1lV2luQlYudikpe1xuICAgICAgICAgICAgaWYodGhpcy5tX3N0cmF0ZWd5Rm4peyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tX3N0cmF0ZWd5Rm4obm9QbGF5KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBcbiAgICAvLyNlbmRyZWdpb24g6Ieq5Yqo546p54mMXG5cbiAgICAvLyNyZWdpb24gLy8hIOiHquWKqOeOqeeJjOeahOetlueVpVxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiDjgJBDb21tb27jgJE6IOOAkFBsYXkg5Yy65Z+f55qE5YW25LuW54mM5Y+v5Lul56e75Yqo5YiwIHBsYXlQb2tlciwg5bm25a+86Ie057+754mM44CRXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgcHJpdmF0ZSBfX0NyZWF0ZVN0cmF0ZWd5RnVuYygpOiAobm9QbGF5OiBib29sZWFuKSA9PiBib29sZWFuIHtcbiAgICAgICAgaWYodGhpcy5faXNDYXJkM01vZGUpe1xuICAgICAgICAgICAgcmV0dXJuIChub1BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgXG4gICAgICAgICAgICAgICAgICAgIHx8dGhpcy5BdXRvUGxheUZsaXBPblBsYXlUb1JlY2VpdmUobm9QbGF5KSAvKuOAkFBsYXkg5YiwIFJlY2VpdmUsIOWvvOiHtOe/u+eJjOOAkSovIFxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uUGxheVRvUGxheShub1BsYXkpIC8qIOOAkFBsYXkg5YiwIFBsYXksIOWvvOiHtOe/u+eJjOOAkSAqL1xuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5Tm9GbGlwT3BlblRvUmVjZWl2ZShub1BsYXkpIC8qIE9wZW4g5YiwIFJlY2VpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uUGxheVRvUmVjZWl2ZVRvQ3JlYXRlRW1wdHlQbGF5R3JvdXAobm9QbGF5KSAvKuOAkFBsYXkg5YiwIFJlY2VpdmUsIOWvvOiHtOepuuWIl+OAkSovXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlGbGlwT25PcGVuVG9QbGF5KG5vUGxheSkgLyogT3BlbiDliLAgUGxheSwg5Ye6546wIOOAkENvbW1vbuOAkSAqL1xuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uUmVjZWl2ZVRvUGxheShub1BsYXkpIC8qIFJlY2VpdmUg5YiwIFBsYXksIOWHuueOsCDjgJBDb21tb27jgJEgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUZsaXBPbkNsb3NlVG9QbGF5KG5vUGxheSkgLyogQ2xvc2Ug5YiwIFBsYXksIOWHuueOsCDjgJBDb21tb27jgJEgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUZsaXBPblVuZGVyT3BlblRvUGxheShub1BsYXkpIC8qIFVuZGVyT3BlbiDliLAgUGxheSwg5Ye6546wIOOAkENvbW1vbuOAkSAqL1xuICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uUGxheVRvUGxheVRvQ3JlYXRlRW1wdHlQbGF5R3JvdXAobm9QbGF5KSAvKiDnp7vliqggUGxheSDliLDlj6bkuIDnu4TvvIzohb7lh7rkuIDliJfnqbrliJfvvIjliY3mj5DvvJrmsqHmnInnqbrliJfvvIkgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uUGxheVRvUmVjZWl2ZShub1BsYXkpIC8qIFBsYXkg5YiwIFJlY2VpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcENsb3NlVG9SZWNlaXZlKG5vUGxheSkgLyogQ2xvc2Ug5YiwIFJlY2VpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uT3BlblRvUGxheShub1BsYXkpIC8qIE9wZW4g5YiwIFBsYXkgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcFVuZGVyT3BlblRvUmVjZWl2ZShub1BsYXkpIC8qIFVuZGVyT3BlbiDliLAgUmVjZWl2ZSAqL1xuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5Tm9GbGlwT25DbG9zZVRvUGxheShub1BsYXkpIC8qIENsb3NlIOWIsCBQbGF5ICovXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlOb0ZsaXBPblVuZGVyT3BlblRvUGxheShub1BsYXkpIC8qIFVuZGVyT3BlbiDliLAgUGxheSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8qIOOAkENvbW1vbuOAkTog44CQUGxheSDljLrln5/nmoTlhbbku5bniYzlj6/ku6Xnp7vliqjliLDov5nnu4QsIOW5tuWvvOiHtOe/u+eJjOOAkSAqL1xuICAgICAgICAgICAgcmV0dXJuIChub1BsYXk6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgXG4gICAgICAgICAgICAgICAgICAgIC8vISDnm7TmjqXov5vlhaXmnIDkvbPnmoTmlLbniYznirbmgIFcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUJlc3RGaXRQbGF5VG9SZWNlaXZlKG5vUGxheSkgLy8hIDFcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUJlc3RGaXRPcGVuVG9SZWNlaXZlKG5vUGxheSkgLy8hIDJcbiAgICAgICAgICAgICAgICAgICAgLy8hIENsb3NlIOWMuuWfn+WIsOesrOS4gOW8oOeJjOe/u+WHuuadpe+8jOS8muWvvOiHtCAyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlCZXN0Rml0VG9wQ2xvc2VUb1JlY2VpdmUobm9QbGF5KSAvLyEgM1xuICAgICAgICAgICAgICAgICAgICAvLyEgQ2xvc2Ug5Yy65Z+f5peg54mM77yM6YeN5paw5Y+R54mM5ZCO55qE56ys5LiA5byg77yM5a+86Ie0IDJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUJlc3RGaXRCb3R0b21PcGVuVG9SZWNlaXZlKG5vUGxheSkgLy8hIDRcbiAgICAgICAgICAgICAgICAgICAgLy8hIOaUtuS4gOW8oOeJjOS4lOWvvOiHtOe/u+eJjFxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uUGxheVRvUmVjZWl2ZShub1BsYXkpIC8q44CQUGxheSDliLAgUmVjZWl2ZSwg5a+86Ie057+754mM44CRKi8gLy8hIDVcbiAgICAgICAgICAgICAgICAgICAgLy8hIOenu+WKqOS4gOW8oOeJjOS4lOWvvOiHtOe/u+eJjFxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uUGxheVRvUGxheShub1BsYXkpIC8qIOOAkFBsYXkg5YiwIFBsYXksIOWvvOiHtOe/u+eJjOOAkSAqLyAvLyEgNlxuICAgICAgICAgICAgICAgICAgICAvLyEgUGxheSDliLAgUmVjZWl2ZSwg5a+86Ie056m65YiXXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlOb0ZsaXBPblBsYXlUb1JlY2VpdmVUb0NyZWF0ZUVtcHR5UGxheUdyb3VwKG5vUGxheSlcbiAgICAgICAgICAgICAgICAgICAgLy8hIE9wZW4oMykgLT4gUGxheUEoNCkgLCBQbGF5QigyKSAtPiBQbGF5QSg0LDMpLCBQbGF5QiDnv7vniYxcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUZsaXBPbk9wZW5Ub1BsYXkobm9QbGF5KVxuICAgICAgICAgICAgICAgICAgICAvLyEgUmVjZWl2ZSgzKSAtPiBQbGF5QSg0KSAsIFBsYXlCKDIpIC0+IFBsYXlBKDQsMyksIFBsYXlCIOe/u+eJjFxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uUmVjZWl2ZVRvUGxheShub1BsYXkpXG4gICAgICAgICAgICAgICAgICAgIC8vISDnm7TmjqXmlLbniYzvvJogT3BlbiAtPiBSZWNlaXZlXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlOb0ZsaXBPcGVuVG9SZWNlaXZlKG5vUGxheSlcbiAgICAgICAgICAgICAgICAgICAgLy8hIOebtOaOpeaUtueJjO+8miBPcGVuIC0+IFBsYXlcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uT3BlblRvUGxheShub1BsYXkpXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlGbGlwT25DbG9zZVRvUGxheShub1BsYXkpIC8qIENsb3NlIOWIsCBQbGF5LCDlh7rnjrAg44CQQ29tbW9u44CRICovXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlGbGlwT25VbmRlck9wZW5Ub1BsYXkobm9QbGF5KSAvKiBVbmRlck9wZW4g5YiwIFBsYXksIOWHuueOsCDjgJBDb21tb27jgJEgKi9cbiAgICAgICAgICAgICAgICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlGbGlwT25PcGVuVG9QbGF5QnlUd29Qb2tlcnMobm9QbGF5KVxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uUmVjZWl2ZVRvUGxheUJ5VHdvUG9rZXJzKG5vUGxheSlcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheUZsaXBPbkNsb3NlVG9QbGF5QnlUd29Qb2tlcnMobm9QbGF5KVxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5RmxpcE9uVW5kZXJPcGVuVG9QbGF5QnlUd29Qb2tlcnMobm9QbGF5KVxuICAgICAgICAgICAgICAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uUGxheVRvUGxheVRvQ3JlYXRlRW1wdHlQbGF5R3JvdXAobm9QbGF5KSAvKiDnp7vliqggUGxheSDliLDlj6bkuIDnu4TvvIzohb7lh7rkuIDliJfnqbrliJfvvIjliY3mj5DvvJrmsqHmnInnqbrliJfvvIkgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcE9uUGxheVRvUmVjZWl2ZShub1BsYXkpIC8qIFBsYXkg5YiwIFJlY2VpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcENsb3NlVG9SZWNlaXZlKG5vUGxheSkgLyogQ2xvc2Ug5YiwIFJlY2VpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5BdXRvUGxheU5vRmxpcFVuZGVyT3BlblRvUmVjZWl2ZShub1BsYXkpIC8qIFVuZGVyT3BlbiDliLAgUmVjZWl2ZSAqL1xuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5Tm9GbGlwT25DbG9zZVRvUGxheShub1BsYXkpIC8qIENsb3NlIOWIsCBQbGF5ICovXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuQXV0b1BsYXlOb0ZsaXBPblVuZGVyT3BlblRvUGxheShub1BsYXkpIC8qIFVuZGVyT3BlbiDliLAgUGxheSAqL1xuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLkF1dG9QbGF5Tm9GbGlwT25QbGF5VG9QbGF5VG9NYWtlUmVjZWl2ZShub1BsYXkpLyoqIFBsYXlBKOe6ouW/gzks6buR5qGDOCkgLT4gUGxheUIo5pa55Z2XOSnvvIwgUGxheUEo57qi5b+DOSkgLT4gUmVjZWl2ZSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOeJjOS7jiBQbGF5IOWIsCBSZWNlaXZl77yM6L+Z5byg54mM5oGw5ben5ZKM5pS254mM5Yy655qE54mM55qE54K55pWw5beu6Led5LiN6LaF6L+HIDEg77yI5q+U5aaC5LiK6Z2iIOaYryAxLCAyLCAxLCAy77yM6YKj5LmIIDIg5pyA6YCC5ZCI5pS+5Yiw5LiK6Z2i5Y67KVxuICAgIHByaXZhdGUgQXV0b1BsYXlCZXN0Rml0UGxheVRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICAvLyAxIOmhtumDqOS4uuepuu+8jOaJviBBXG4gICAgICAgIGxldCBoYXNFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBsZXQgbWluUG9pbnQ6IG51bWJlciA9IDEzO1xuICAgICAgICBmb3IobGV0IHRvUmVjZWl2ZUluZGV4ID0gMDsgdG9SZWNlaXZlSW5kZXg8NDsgKyt0b1JlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICBsZXQgdG9SZWNlaXZlR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3RvUmVjZWl2ZUluZGV4XTtcbiAgICAgICAgICAgIGlmKHRvUmVjZWl2ZUdyb3VwLklzUG9rZXJzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIC8vIOaJviBBXG4gICAgICAgICAgICAgICAgaGFzRW1wdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZnJvbVBsYXlJbmRleCA9IDA7IGZyb21QbGF5SW5kZXg8NzsgKytmcm9tUGxheUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5R3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW2Zyb21QbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3BQb2tlciA9IGZyb21QbGF5R3JvdXAudG9wO1xuICAgICAgICAgICAgICAgICAgICBpZih0b3BQb2tlciAmJiB0b3BQb2tlci5wb2ludCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUmVjZWl2ZSh0b3BQb2tlciwgdG9SZWNlaXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gdG9SZWNlaXZlR3JvdXAudG9wO1xuICAgICAgICAgICAgICAgIGlmKHRvcC5wb2ludCA8IG1pblBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG1pblBvaW50ID0gdG9wLnBvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihoYXNFbXB0eSkge1xuICAgICAgICAgICAgLy8g5pyJ56m65L2N77yM5L2G5piv5om+5LiN5YiwIEFcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihtaW5Qb2ludCA9PT0gMTMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIOmhtumDqOS4jeS4uuepuu+8jOafpeaJvuacgOWwj+eahOS4gOW8oOeJjO+8jOaJvuavlOWug+WkpyAxIOeahOeJjOaYr+WQpuWcqCBQbGF5IOWMuuWfn1xuICAgICAgICBmb3IobGV0IHRvUmVjZWl2ZUluZGV4ID0gMDsgdG9SZWNlaXZlSW5kZXg8NDsgKyt0b1JlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICBsZXQgdG9SZWNlaXZlR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3RvUmVjZWl2ZUluZGV4XTtcbiAgICAgICAgICAgIGxldCB0b3AgPSB0b1JlY2VpdmVHcm91cC50b3A7XG4gICAgICAgICAgICBpZih0b3AucG9pbnQgPT0gbWluUG9pbnQpIHtcbiAgICAgICAgICAgICAgICAvLyDmn6Xmib7mr5TlroPlpKcgMSDngrnnmoTniYzmnInmsqHmnInlnKggUGxheSDljLrln59cbiAgICAgICAgICAgICAgICBmb3IobGV0IGZyb21QbGF5SW5kZXggPSAwOyBmcm9tUGxheUluZGV4PDc7ICsrZnJvbVBsYXlJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUdyb3VwID0gdGhpcy5fcGxheUdyb3Vwc1tmcm9tUGxheUluZGV4XVxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9wUG9rZXIgPSBmcm9tUGxheUdyb3VwLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgaWYodG9wUG9rZXIgJiYgdG9SZWNlaXZlR3JvdXAuSXNOZXh0UG9rZXIodG9wUG9rZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUmVjZWl2ZSh0b3BQb2tlciwgdG9SZWNlaXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIOeJjOS7jiBPcGVuIOWIsCBSZWNlaXZl77yM6L+Z5byg54mM5oGw5ben5ZKM5pS254mM5Yy655qE54mM55qE54K55pWw5beu6Led5LiN6LaF6L+HIDEg77yI5q+U5aaC5LiK6Z2iIOaYryAxLCAyLCAxLCAy77yM6YKj5LmIIDIg5pyA6YCC5ZCI5pS+5Yiw5LiK6Z2i5Y67KVxuICAgIHByaXZhdGUgQXV0b1BsYXlCZXN0Rml0T3BlblRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLl9vcGVuQXJlYUdyb3VwLklzUG9rZXJzRW1wdHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIDEg6aG26YOo5Li656m677yM5om+IEFcbiAgICAgICAgbGV0IGhhc0VtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCBtaW5Qb2ludDogbnVtYmVyID0gMTM7XG4gICAgICAgIGZvcihsZXQgdG9SZWNlaXZlSW5kZXggPSAwOyB0b1JlY2VpdmVJbmRleDw0OyArK3RvUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1JlY2VpdmVHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdO1xuICAgICAgICAgICAgaWYodG9SZWNlaXZlR3JvdXAuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgLy8g5om+IEFcbiAgICAgICAgICAgICAgICBoYXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHRvcFBva2VyID0gdGhpcy5fb3BlbkFyZWFHcm91cC50b3A7XG4gICAgICAgICAgICAgICAgaWYodG9wUG9rZXIgJiYgdG9wUG9rZXIucG9pbnQgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21PcGVuVG9SZWNlaXZlKHRvcFBva2VyLCB0b1JlY2VpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHRvcCA9IHRvUmVjZWl2ZUdyb3VwLnRvcDtcbiAgICAgICAgICAgICAgICBpZih0b3AucG9pbnQgPCBtaW5Qb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5Qb2ludCA9IHRvcC5wb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaGFzRW1wdHkpIHtcbiAgICAgICAgICAgIC8vIOacieepuuS9je+8jOS9huaYr+aJvuS4jeWIsCBBXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYobWluUG9pbnQgPT09IDEzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAyLiDpobbpg6jkuI3kuLrnqbrvvIzmn6Xmib7mnIDlsI/nmoTkuIDlvKDniYzvvIzmib7mr5TlroPlpKcgMSDnmoTniYzmmK/lkKblnKggUGxheSDljLrln59cbiAgICAgICAgZm9yKGxldCB0b1JlY2VpdmVJbmRleCA9IDA7IHRvUmVjZWl2ZUluZGV4PDQ7ICsrdG9SZWNlaXZlSW5kZXgpe1xuICAgICAgICAgICAgbGV0IHRvUmVjZWl2ZUdyb3VwID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1t0b1JlY2VpdmVJbmRleF07XG4gICAgICAgICAgICBsZXQgdG9wID0gdG9SZWNlaXZlR3JvdXAudG9wO1xuICAgICAgICAgICAgaWYodG9wLnBvaW50ID09IG1pblBvaW50KSB7XG4gICAgICAgICAgICAgICAgLy8g5p+l5om+5q+U5a6D5aSnIDEg54K555qE54mM5pyJ5rKh5pyJ5ZyoIFBsYXkg5Yy65Z+fXG4gICAgICAgICAgICAgICAgbGV0IHRvcFBva2VyID0gdGhpcy5fb3BlbkFyZWFHcm91cC50b3A7XG4gICAgICAgICAgICAgICAgaWYodG9wUG9rZXIgJiYgdG9SZWNlaXZlR3JvdXAuSXNOZXh0UG9rZXIodG9wUG9rZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1JlY2VpdmUodG9wUG9rZXIsIHRvUmVjZWl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHByaXZhdGUgQXV0b1BsYXlGbGlwT25QbGF5VG9SZWNlaXZlKG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGZvcihsZXQgdG9SZWNlaXZlSW5kZXggPSAwOyB0b1JlY2VpdmVJbmRleDw0OyArK3RvUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1JlY2VpdmVHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdXG4gICAgICAgICAgICBmb3IobGV0IGZyb21QbGF5SW5kZXggPSAwOyBmcm9tUGxheUluZGV4PDc7ICsrZnJvbVBsYXlJbmRleCl7XG4gICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5R3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW2Zyb21QbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgbGV0IHRvcE9wZW5Qb2tlciA9IGZyb21QbGF5R3JvdXAudG9wXG4gICAgICAgICAgICAgICAgaWYodG9wT3BlblBva2VyICYmIHRvUmVjZWl2ZUdyb3VwLklzTmV4dFBva2VyKHRvcE9wZW5Qb2tlcikgJiYgZnJvbVBsYXlHcm91cC5Jc0F1dG9GbGlwT25SZW1vdmVQb2tlcih0b3BPcGVuUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21QbGF5VG9SZWNlaXZlKHRvcE9wZW5Qb2tlciwgdG9SZWNlaXZlSW5kZXgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgQXV0b1BsYXlGbGlwT25QbGF5VG9QbGF5KG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGZvcihsZXQgdG9QbGF5SW5kZXggPSAwOyB0b1BsYXlJbmRleDw3OyArK3RvUGxheUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1BsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgICAgICBmb3IobGV0IGZyb21QbGF5SW5kZXggPSAwOyBmcm9tUGxheUluZGV4PDc7ICsrZnJvbVBsYXlJbmRleCl7XG4gICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5R3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW2Zyb21QbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgbGV0IHJvb3RPcGVuUG9rZXIgPSBmcm9tUGxheUdyb3VwLnJvb3RPcGVuUG9rZXJcbiAgICAgICAgICAgICAgICBpZihyb290T3BlblBva2VyICYmIHRvUGxheUdyb3VwLklzQ29uY2F0UG9rZXIocm9vdE9wZW5Qb2tlcikgJiYgZnJvbVBsYXlHcm91cC5Jc0F1dG9GbGlwT25SZW1vdmVQb2tlcihyb290T3BlblBva2VyKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUGxheShyb290T3BlblBva2VyLCB0b1BsYXlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5QmVzdEZpdFRvcENsb3NlVG9SZWNlaXZlKG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLklzUG9rZXJzRW1wdHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIDEg6aG26YOo5Li656m677yM5om+IEFcbiAgICAgICAgbGV0IGhhc0VtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCBtaW5Qb2ludDogbnVtYmVyID0gMTM7XG4gICAgICAgIGZvcihsZXQgdG9SZWNlaXZlSW5kZXggPSAwOyB0b1JlY2VpdmVJbmRleDw0OyArK3RvUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1JlY2VpdmVHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdO1xuICAgICAgICAgICAgaWYodG9SZWNlaXZlR3JvdXAuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgLy8g5om+IEFcbiAgICAgICAgICAgICAgICBoYXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHRvcFBva2VyID0gdGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wO1xuICAgICAgICAgICAgICAgIGlmKHRvcFBva2VyICYmIHRvcFBva2VyLnBvaW50ID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tQ2xvc2VUb09wZW4odG9wUG9rZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxldCB0b3AgPSB0b1JlY2VpdmVHcm91cC50b3A7XG4gICAgICAgICAgICAgICAgaWYodG9wLnBvaW50IDwgbWluUG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluUG9pbnQgPSB0b3AucG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGhhc0VtcHR5KSB7XG4gICAgICAgICAgICAvLyDmnInnqbrkvY3vvIzkvYbmmK/mib7kuI3liLAgQVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKG1pblBvaW50ID09PSAxMykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4g6aG26YOo5LiN5Li656m677yM5p+l5om+5pyA5bCP55qE5LiA5byg54mM77yM5om+5q+U5a6D5aSnIDEg55qE54mM5piv5ZCm5ZyoXG4gICAgICAgIGZvcihsZXQgdG9SZWNlaXZlSW5kZXggPSAwOyB0b1JlY2VpdmVJbmRleDw0OyArK3RvUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1JlY2VpdmVHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdO1xuICAgICAgICAgICAgbGV0IHRvcCA9IHRvUmVjZWl2ZUdyb3VwLnRvcDtcbiAgICAgICAgICAgIGlmKHRvcC5wb2ludCA9PSBtaW5Qb2ludCkge1xuICAgICAgICAgICAgICAgIC8vIOafpeaJvuavlOWug+WkpyAxIOeCueeahOeJjOacieayoeacieWcqCBQbGF5IOWMuuWfn1xuICAgICAgICAgICAgICAgIGxldCB0b3BPcGVuUG9rZXIgPSB0aGlzLl9jbG9zZUFyZWFHcm91cC50b3A7XG4gICAgICAgICAgICAgICAgaWYodG9wT3BlblBva2VyICYmIHRvUmVjZWl2ZUdyb3VwLklzTmV4dFBva2VyKHRvcE9wZW5Qb2tlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tQ2xvc2VUb09wZW4odG9wT3BlblBva2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHByaXZhdGUgQXV0b1BsYXlCZXN0Rml0Qm90dG9tT3BlblRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZighdGhpcy5Jc0NhblJlZmxpcCgpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLl9jbG9zZUFyZWFHcm91cC5Jc1Bva2Vyc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLl9vcGVuQXJlYUdyb3VwLklzUG9rZXJzRW1wdHkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIDEg6aG26YOo5Li656m677yM5om+IEFcbiAgICAgICAgbGV0IGhhc0VtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCBtaW5Qb2ludDogbnVtYmVyID0gMTM7XG4gICAgICAgIGZvcihsZXQgdG9SZWNlaXZlSW5kZXggPSAwOyB0b1JlY2VpdmVJbmRleDw0OyArK3RvUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgIGxldCB0b1JlY2VpdmVHcm91cCA9IHRoaXMuX3JlY2VpdmVHcm91cHNbdG9SZWNlaXZlSW5kZXhdO1xuICAgICAgICAgICAgaWYodG9SZWNlaXZlR3JvdXAuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgLy8g5om+IEFcbiAgICAgICAgICAgICAgICBoYXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbVBva2VyID0gdGhpcy5fb3BlbkFyZWFHcm91cC56ZXJvO1xuICAgICAgICAgICAgICAgIGlmKGJvdHRvbVBva2VyICYmIGJvdHRvbVBva2VyLnBvaW50ID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gdG9SZWNlaXZlR3JvdXAudG9wO1xuICAgICAgICAgICAgICAgIGlmKHRvcC5wb2ludCA8IG1pblBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG1pblBvaW50ID0gdG9wLnBvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihoYXNFbXB0eSkge1xuICAgICAgICAgICAgLy8g5pyJ56m65L2N77yM5L2G5piv5om+5LiN5YiwIEFcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihtaW5Qb2ludCA9PT0gMTMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIOmhtumDqOS4jeS4uuepuu+8jOafpeaJvuacgOWwj+eahOS4gOW8oOeJjO+8jOaJvuavlOWug+WkpyAxIOeahOeJjOaYr+WQpuWtmOWcqFxuICAgICAgICBmb3IobGV0IHRvUmVjZWl2ZUluZGV4ID0gMDsgdG9SZWNlaXZlSW5kZXg8NDsgKyt0b1JlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICBsZXQgdG9SZWNlaXZlR3JvdXAgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3RvUmVjZWl2ZUluZGV4XTtcbiAgICAgICAgICAgIGxldCB0b3AgPSB0b1JlY2VpdmVHcm91cC50b3A7XG4gICAgICAgICAgICBpZih0b3AucG9pbnQgPT0gbWluUG9pbnQpIHtcbiAgICAgICAgICAgICAgICAvLyDmn6Xmib7mr5TlroPlpKcgMSDngrnnmoTniYzmnInmsqHmnInlnKggUGxheSDljLrln59cbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tUG9rZXIgPSB0aGlzLl9vcGVuQXJlYUdyb3VwLnplcm87XG4gICAgICAgICAgICAgICAgaWYoYm90dG9tUG9rZXIgJiYgdG9SZWNlaXZlR3JvdXAuSXNOZXh0UG9rZXIoYm90dG9tUG9rZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub0Nsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5Tm9GbGlwT3BlblRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVjZWl2ZUluZGV4ID0gdGhpcy5fX3JlY2VpdmVJbmRleEZvclBva2VyKHRoaXMuX29wZW5BcmVhR3JvdXAudG9wKVxuICAgICAgICBpZihyZWNlaXZlSW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1JlY2VpdmUodGhpcy5fb3BlbkFyZWFHcm91cC50b3AsIHJlY2VpdmVJbmRleClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlIFxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5Tm9GbGlwT25PcGVuVG9QbGF5KG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB0b1BsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhGb3JQb2tlcih0aGlzLl9vcGVuQXJlYUdyb3VwLnRvcClcbiAgICAgICAgaWYodG9QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1BsYXkodGhpcy5fb3BlbkFyZWFHcm91cC50b3AsIHRvUGxheUluZGV4KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheU5vRmxpcE9uUGxheVRvUmVjZWl2ZVRvQ3JlYXRlRW1wdHlQbGF5R3JvdXAobm9QbGF5OiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICAgICAgZm9yKGxldCB0b1JlY2VpdmVJbmRleCA9IDA7IHRvUmVjZWl2ZUluZGV4PDQ7ICsrdG9SZWNlaXZlSW5kZXgpe1xuICAgICAgICAgICAgbGV0IHRvUmVjZWl2ZUdyb3VwID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1t0b1JlY2VpdmVJbmRleF1cbiAgICAgICAgICAgIGZvcihsZXQgZnJvbVBsYXlJbmRleCA9IDA7IGZyb21QbGF5SW5kZXg8NzsgKytmcm9tUGxheUluZGV4KXtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF1cbiAgICAgICAgICAgICAgICBsZXQgdG9wT3BlblBva2VyID0gZnJvbVBsYXlHcm91cC50b3BcbiAgICAgICAgICAgICAgICBpZih0b3BPcGVuUG9rZXIgJiYgdG9SZWNlaXZlR3JvdXAuSXNOZXh0UG9rZXIodG9wT3BlblBva2VyKSAmJiB0b3BPcGVuUG9rZXIgPT09IGZyb21QbGF5R3JvdXAuemVybyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUmVjZWl2ZSh0b3BPcGVuUG9rZXIsIHRvUmVjZWl2ZUluZGV4KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5RmxpcE9uT3BlblRvUGxheShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwVGhyb3VnaF9QbGF5X1Bva2VyX1BsYXkodGhpcy5fb3BlbkFyZWFHcm91cC50b3ApXG4gICAgICAgIGlmKHRvUGxheUluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21PcGVuVG9QbGF5KHRoaXMuX29wZW5BcmVhR3JvdXAudG9wLCB0b1BsYXlJbmRleClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgQXV0b1BsYXlGbGlwT25DbG9zZVRvUGxheShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IGluZGV4PXRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgtdGhpcy5jYXJkTW9kZTsgaW5kZXg+PTA7KXtcbiAgICAgICAgICAgIGxldCB0b1BsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhPZkZsaXBUaHJvdWdoX1BsYXlfUG9rZXJfUGxheSggdGhpcy5fY2xvc2VBcmVhR3JvdXAucG9rZXJzW2luZGV4XSApXG4gICAgICAgICAgICBpZih0b1BsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLl9pc0NhcmQzTW9kZSAmJiBpbmRleC10aGlzLmNhcmRNb2RlIDwgMCAgJiYgaW5kZXggPiAwKXtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGluZGV4PWluZGV4LXRoaXMuY2FyZE1vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheUZsaXBPblVuZGVyT3BlblRvUGxheShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZighdGhpcy5Jc0NhblJlZmxpcCgpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaW5kZXg9dGhpcy5jYXJkTW9kZS0xOyBpbmRleCA8IHRoaXMuX29wZW5BcmVhR3JvdXAucG9rZXJzLmxlbmd0aC0xOyBpbmRleCA9IGluZGV4ICsgdGhpcy5jYXJkTW9kZSl7XG4gICAgICAgICAgICBsZXQgZnJvbVBsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhPZkZsaXBUaHJvdWdoX1BsYXlfUG9rZXJfUGxheSggdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnNbaW5kZXhdIClcbiAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcClcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21PcGVuVG9DbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheUZsaXBPbk9wZW5Ub1BsYXlCeVR3b1Bva2Vycyhub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLl9pc0NhcmQzTW9kZSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgIGxldCBtb3ZlUG9rZXIgPSB0aGlzLl9vcGVuQXJlYUdyb3VwLnRvcFxuICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4Rm9yUG9rZXIobW92ZVBva2VyKVxuICAgICAgICBpZih0b1BsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgLy8gMS4gVW5kZXJPcGVuIOesrOS4gOW8oOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgIC8vIE9wZW5Qb2tlciAtPiBQbGF5IHwgVW5kZXJPcGVuUG9rZXIgLT4gT3BlblBva2VyIHwgUGxheSAtPiBVbmRlck9wZW5Qb2tlciB8IEZsaXBcbiAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUodGhpcy5fb3BlbkFyZWFHcm91cC51bmRlclRvcCkpe1xuICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcih0aGlzLl9vcGVuQXJlYUdyb3VwLnVuZGVyVG9wKVxuICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21PcGVuVG9QbGF5KG1vdmVQb2tlciwgdG9QbGF5SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAyLiByZWNlaXZlIOWMuuWfn+acieeJjOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgIC8vIE9wZW5Qb2tlciAtPiBQbGF5IHwgUmVjZWl2ZVBva2VyIC0+IE9wZW5Qb2tlciB8IFBsYXkgLT4gUmVjZWl2ZVBva2VyIHwgRmxpcFxuICAgICAgICAgICAgZm9yKGxldCBmcm9tUmVjZWl2ZUluZGV4ID0gMDsgZnJvbVJlY2VpdmVJbmRleDw0OyArK2Zyb21SZWNlaXZlSW5kZXgpe1xuICAgICAgICAgICAgICAgIGxldCBmcm9tUmVjZWl2ZVBva2VyID0gdGhpcy5fcmVjZWl2ZUdyb3Vwc1tmcm9tUmVjZWl2ZUluZGV4XS50b3BcbiAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKGZyb21SZWNlaXZlUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKGZyb21SZWNlaXZlUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1BsYXkobW92ZVBva2VyLCB0b1BsYXlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAzLiBDbG9zZSDlj6/ku6XkuIvmnaXvvIzpgKDmiJAg44CQQ29tbW9u44CRXG4gICAgICAgICAgICAvLyBPcGVuUG9rZXIgLT4gUGxheSB8IENsb3NlUG9rZXIgLT4gT3BlblBva2VyIHwgUGxheSAtPiBDbG9zZVBva2VyIHwgRmxpcFxuICAgICAgICAgICAgZm9yKGxldCBpbmRleD10aGlzLl9jbG9zZUFyZWFHcm91cC5wb2tlcnMubGVuZ3RoLTE7IGluZGV4Pj0wOyAtLWluZGV4KXtcbiAgICAgICAgICAgICAgICBsZXQgY2xvc2VQb2tlciA9IHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vyc1tpbmRleF1cbiAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKGNsb3NlUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKGNsb3NlUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbU9wZW5Ub1BsYXkobW92ZVBva2VyLCB0b1BsYXlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyA0LiBVbmRlck9wZW4g6Zmk6aG26YOo5LiA5byg5aSW77yM5Y+v5Lul5LiL5p2l77yM6YCg5oiQIOOAkENvbW1vbuOAkVxuICAgICAgICAgICAgLy8gT3BlblBva2VyIC0+IFBsYXkgfCBVbmRlck9wZW5Qb2tlciAtPiBPcGVuUG9rZXIgfCBQbGF5IC0+IFVuZGVyT3BlblBva2VyIHwgRmxpcFxuICAgICAgICAgICAgaWYodGhpcy5Jc0NhblJlZmxpcCgpKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGluZGV4PTA7IGluZGV4PHRoaXMuX29wZW5BcmVhR3JvdXAucG9rZXJzLmxlbmd0aC0yOyArK2luZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVuZGVyT3BlblBva2VyID0gdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUodW5kZXJPcGVuUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcih1bmRlck9wZW5Qb2tlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvUGxheShtb3ZlUG9rZXIsIHRvUGxheUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5RmxpcE9uUmVjZWl2ZVRvUGxheUJ5VHdvUG9rZXJzKG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMuX2lzQ2FyZDNNb2RlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgZm9yKGxldCByZWNlaXZlSW5kZXg9MDsgcmVjZWl2ZUluZGV4PDQ7ICsrcmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgIGxldCBtb3ZlUG9rZXIgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW3JlY2VpdmVJbmRleF0udG9wXG4gICAgICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4Rm9yUG9rZXIobW92ZVBva2VyKVxuICAgICAgICAgICAgaWYodG9QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAvLyAxLiBPcGVuIOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgICAgICAvLyBSZWNlaXZlUG9rZXIgLT4gUGxheSB8IE9wZW5Qb2tlciAtPiBSZWNlaXZlUG9rZXIgfCBQbGF5IC0+IE9wZW5Qb2tlciB8IEZsaXBcbiAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKHRoaXMuX29wZW5BcmVhR3JvdXAudG9wKSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcih0aGlzLl9vcGVuQXJlYUdyb3VwLnRvcClcbiAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUmVjZWl2ZVRvUGxheShtb3ZlUG9rZXIsIHRvUGxheUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAxLiByZWNlaXZlIOWMuuWfn+acieeJjOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgICAgICAvLyBSZWNlaXZlUG9rZXIgLT4gUGxheSB8IFJlY2VpdmVQb2tlckV4IC0+IFJlY2VpdmVQb2tlciB8IFBsYXkgLT4gUmVjZWl2ZVBva2VyRXggfCBGbGlwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBmcm9tUmVjZWl2ZUluZGV4ID0gMDsgZnJvbVJlY2VpdmVJbmRleDw0OyArK2Zyb21SZWNlaXZlSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVJlY2VpdmVQb2tlciA9IHRoaXMuX3JlY2VpdmVHcm91cHNbZnJvbVJlY2VpdmVJbmRleF0udG9wXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUoZnJvbVJlY2VpdmVQb2tlcikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKGZyb21SZWNlaXZlUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmcm9tUGxheUluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbVJlY2VpdmVUb1BsYXkobW92ZVBva2VyLCB0b1BsYXlJbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAzLiBDbG9zZSDlj6/ku6XkuIvmnaXvvIzpgKDmiJAg44CQQ29tbW9u44CRXG4gICAgICAgICAgICAgICAgLy8gUmVjZWl2ZVBva2VyIC0+IFBsYXkgfCBDbG9zZVBva2VyIC0+IFJlY2VpdmVQb2tlciB8IFBsYXkgLT4gQ2xvc2VQb2tlciB8IEZsaXBcbiAgICAgICAgICAgICAgICBmb3IobGV0IGluZGV4PXRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgtMTsgaW5kZXg+PTA7LS1pbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZVBva2VyID0gdGhpcy5fY2xvc2VBcmVhR3JvdXAucG9rZXJzW2luZGV4XVxuICAgICAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKGNsb3NlUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcihjbG9zZVBva2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KG1vdmVQb2tlciwgdG9QbGF5SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gNC4gVW5kZXJPcGVuIOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgICAgICAvLyBSZWNlaXZlUG9rZXIgLT4gUGxheSB8IFVuZGVyT3BlblBva2VyIC0+IFJlY2VpdmVQb2tlciB8IFBsYXkgLT4gVW5kZXJPcGVuUG9rZXIgfCBGbGlwXG4gICAgICAgICAgICAgICAgaWYodGhpcy5Jc0NhblJlZmxpcCgpKXtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpbmRleD0wOyBpbmRleDwgdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnMubGVuZ3RoLTE7ICsraW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVuZGVyT3BlblBva2VyID0gdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKHVuZGVyT3BlblBva2VyKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKHVuZGVyT3BlblBva2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KG1vdmVQb2tlciwgdG9QbGF5SW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgQXV0b1BsYXlGbGlwT25DbG9zZVRvUGxheUJ5VHdvUG9rZXJzKG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMuX2lzQ2FyZDNNb2RlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgZm9yKGxldCBjbG9zZVBva2VySW5kZXg9dGhpcy5fY2xvc2VBcmVhR3JvdXAucG9rZXJzLmxlbmd0aC0xOyBjbG9zZVBva2VySW5kZXg+PTA7LS1jbG9zZVBva2VySW5kZXgpe1xuICAgICAgICAgICAgbGV0IG1vdmVQb2tlciA9IHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vyc1tjbG9zZVBva2VySW5kZXhdXG4gICAgICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4Rm9yUG9rZXIobW92ZVBva2VyKVxuICAgICAgICAgICAgaWYodG9QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAvLyBOT1RFIOi/memHjOacieS4gOS4quWKqOaAgeWPmOWMlueahOWboOe0oO+8mkNsb3NlIOeahOeJjOi/h+adpeeahOaXtuWAme+8jCBPcGVuIOWwseWPmOaIkCBVbmRlck9wZW7vvIzlm6DmraTvvIzopoHms6jmhI/kvJjlhYjnuqdcbiAgICAgICAgICAgICAgICAvLyByZWNlaXZlIOWMuuWfn+acieeJjOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgICAgICAvLyBDbG9zZVBva2VyIC0+IFBsYXkgfCBSZWNlaXZlUG9rZXIgLT4gQ2xvc2VQb2tlciB8IFBsYXkgLT4gUmVjZWl2ZVBva2VyIHwgRmxpcFxuICAgICAgICAgICAgICAgIGZvcihsZXQgZnJvbVJlY2VpdmVJbmRleCA9IDA7IGZyb21SZWNlaXZlSW5kZXg8NDsgKytmcm9tUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21SZWNlaXZlUG9rZXIgPSB0aGlzLl9yZWNlaXZlR3JvdXBzW2Zyb21SZWNlaXZlSW5kZXhdLnRvcFxuICAgICAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKGZyb21SZWNlaXZlUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcihmcm9tUmVjZWl2ZVBva2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDbG9zZSDov5nlvKDniYzliY3pnaLnmoTpgqPlvKDniYwg5Y+v5Lul5LiL5p2l77yM6YCg5oiQIOOAkENvbW1vbuOAkVxuICAgICAgICAgICAgICAgIC8vIENsb3NlUG9rZXIgLT4gUGxheSB8IEJlZm9yZUNsb3NlUG9rZXIgLT4gQ2xvc2VQb2tlciB8IFBsYXkgLT4gQmVmb3JlQ2xvc2VQb2tlciB8IEZsaXBcbiAgICAgICAgICAgICAgICBsZXQgYmVmb3JlQ2xvc2VJbmRleCA9IGNsb3NlUG9rZXJJbmRleCsxXG4gICAgICAgICAgICAgICAgaWYoYmVmb3JlQ2xvc2VJbmRleCA8IHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VQb2tlciA9IHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vyc1tiZWZvcmVDbG9zZUluZGV4XVxuICAgICAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKGNsb3NlUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcihjbG9zZVBva2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDbG9zZSDov5nlvKDniYzlkI7pnaLnmoTniYwg5Y+v5Lul5LiL5p2l77yM6YCg5oiQIOOAkENvbW1vbuOAkVxuICAgICAgICAgICAgICAgIC8vIENsb3NlUG9rZXIgLT4gUGxheSB8IEFmdGVyQ2xvc2VQb2tlciAtPiBDbG9zZVBva2VyIHwgUGxheSAtPiBBZnRlckNsb3NlUG9rZXIgfCBGbGlwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbmRleD1jbG9zZVBva2VySW5kZXgtMTsgaW5kZXg+PTA7LS1pbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZVBva2VyID0gdGhpcy5fY2xvc2VBcmVhR3JvdXAucG9rZXJzW2luZGV4XVxuICAgICAgICAgICAgICAgICAgICBpZihtb3ZlUG9rZXIuSXNDb25jYXRhYmxlKGNsb3NlUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcihjbG9zZVBva2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVbmRlck9wZW4g5ZKMIE9wZW4g5Y+v5Lul5LiL5p2l77yM6YCg5oiQIOOAkENvbW1vbuOAkVxuICAgICAgICAgICAgICAgIC8vIENsb3NlUG9rZXIgLT4gUGxheSB8IFVuZGVyT3Blbk9yT3BlblBva2VyIC0+IENsb3NlUG9rZXIgfCBQbGF5IC0+IFVuZGVyT3Blbk9yT3BlblBva2VyIHwgRmxpcFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuSXNDYW5SZWZsaXAoKSl7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaW5kZXg9MDsgaW5kZXg8IHRoaXMuX29wZW5BcmVhR3JvdXAucG9rZXJzLmxlbmd0aDsgKytpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdW5kZXJPcGVuT3JPcGVuUG9rZXIgPSB0aGlzLl9vcGVuQXJlYUdyb3VwLnBva2Vyc1tpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUodW5kZXJPcGVuT3JPcGVuUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhPZkZsaXBPblBsYXlDb25jYXRlZEFmdGVyUG9rZXIodW5kZXJPcGVuT3JPcGVuUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBDbG9zZSDliY3pnaLnmoTniYzlj6/ku6XkuIvmnaXvvIzpgKDmiJAg44CQQ29tbW9u44CRXG4gICAgICAgICAgICAgICAgLy8gUmVjZWl2ZVBva2VyIC0+IFBsYXkgfCBDbG9zZVBva2VyIC0+IFJlY2VpdmVQb2tlciB8IFBsYXkgLT4gQ2xvc2VQb2tlciB8IEZsaXBcbiAgICAgICAgICAgICAgICBmb3IobGV0IGluZGV4PXRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgtMTsgaW5kZXg+Y2xvc2VQb2tlckluZGV4OyAtLWluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlUG9rZXIgPSB0aGlzLl9jbG9zZUFyZWFHcm91cC5wb2tlcnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUoY2xvc2VQb2tlcikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKGNsb3NlUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmcm9tUGxheUluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheUZsaXBPblVuZGVyT3BlblRvUGxheUJ5VHdvUG9rZXJzKG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMuX2lzQ2FyZDNNb2RlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgaWYoIXRoaXMuSXNDYW5SZWZsaXAoKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHVuZGVyT3BlblBva2VySW5kZXg9MDsgdW5kZXJPcGVuUG9rZXJJbmRleDwgdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnMubGVuZ3RoLTE7ICsrdW5kZXJPcGVuUG9rZXJJbmRleCl7XG4gICAgICAgICAgICBsZXQgbW92ZVBva2VyID0gdGhpcy5fY2xvc2VBcmVhR3JvdXAucG9rZXJzW3VuZGVyT3BlblBva2VySW5kZXhdXG4gICAgICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4Rm9yUG9rZXIobW92ZVBva2VyKVxuICAgICAgICAgICAgaWYodG9QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAvLyByZWNlaXZlIOWMuuWfn+acieeJjOWPr+S7peS4i+adpe+8jOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgICAgICAvLyBVbmRlck9wZW5Qb2tlciAtPiBQbGF5IHwgUmVjZWl2ZVBva2VyIC0+IFVuZGVyT3BlblBva2VyIHwgUGxheSAtPiBSZWNlaXZlUG9rZXIgfCBGbGlwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBmcm9tUmVjZWl2ZUluZGV4ID0gMDsgZnJvbVJlY2VpdmVJbmRleDw0OyArK2Zyb21SZWNlaXZlSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVJlY2VpdmVQb2tlciA9IHRoaXMuX3JlY2VpdmVHcm91cHNbZnJvbVJlY2VpdmVJbmRleF0udG9wXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUoZnJvbVJlY2VpdmVQb2tlcikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKGZyb21SZWNlaXZlUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmcm9tUGxheUluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW5kZXJPcGVuIOS4i+aWuemCo+W8oOeJjOS4i+adpSDpgKDmiJAg44CQQ29tbW9u44CRXG4gICAgICAgICAgICAgICAgbGV0IHVuZGVyVW5kZXJPcGVuSW5kZXggPSB1bmRlck9wZW5Qb2tlckluZGV4IC0gMVxuICAgICAgICAgICAgICAgIGlmKHVuZGVyVW5kZXJPcGVuSW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdW5kZXJVbmRlck9wZW5Qb2tlciA9IHRoaXMuX29wZW5BcmVhR3JvdXAucG9rZXJzW3VuZGVyVW5kZXJPcGVuSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUodW5kZXJVbmRlck9wZW5Qb2tlcikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwT25QbGF5Q29uY2F0ZWRBZnRlclBva2VyKHVuZGVyVW5kZXJPcGVuUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmcm9tUGxheUluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIW5vUGxheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW5kZXJPcGVuUG9rZXIg5LiK6Z2i55qE54mM5YWI5LiL5p2lIOmAoOaIkCDjgJBDb21tb27jgJFcbiAgICAgICAgICAgICAgICAvLyBVbmRlck9wZW5Qb2tlciAtPiBQbGF5IHwgVW5kZXJPcGVuT3JPcGVuUG9rZXIgLT4gVW5kZXJPcGVuUG9rZXIgfCBQbGF5IC0+IFVuZGVyT3Blbk9yT3BlblBva2VyIHwgRmxpcFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvcihsZXQgaW5kZXg9dW5kZXJPcGVuUG9rZXJJbmRleCsxOyBpbmRleDwgdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnMubGVuZ3RoOyArK2luZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVuZGVyT3Blbk9yT3BlblBva2VyID0gdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnNbaW5kZXhdXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUodW5kZXJPcGVuT3JPcGVuUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcm9tUGxheUluZGV4ID0gdGhpcy5fX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcih1bmRlck9wZW5Pck9wZW5Qb2tlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21PcGVuVG9DbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBDbG9zZSDkuIvmnaXvvIzpgKDmiJAg44CQQ29tbW9u44CRXG4gICAgICAgICAgICAgICAgLy8gVW5kZXJPcGVuUG9rZXIgLT4gUGxheSB8IENsb3NlUG9rZXIgLT4gVW5kZXJPcGVuUG9rZXIgfCBQbGF5IC0+IENsb3NlUG9rZXIgfCBGbGlwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbmRleD10aGlzLl9jbG9zZUFyZWFHcm91cC5wb2tlcnMubGVuZ3RoLTE7IGluZGV4Pj0wOy0taW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvc2VQb2tlciA9IHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vyc1tpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgaWYobW92ZVBva2VyLklzQ29uY2F0YWJsZShjbG9zZVBva2VyKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhPZkZsaXBPblBsYXlDb25jYXRlZEFmdGVyUG9rZXIoY2xvc2VQb2tlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbUNsb3NlVG9PcGVuKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21PcGVuVG9DbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBVbmRlck9wZW5Qb2tlciDkuIvpnaLnmoTniYzlhYjkuIvmnaUg6YCg5oiQIOOAkENvbW1vbuOAkVxuICAgICAgICAgICAgICAgIC8vIFVuZGVyT3BlblBva2VyIC0+IFBsYXkgfCBVbmRlclVuZGVyT3BlblBva2VyIC0+IFVuZGVyT3BlblBva2VyIHwgUGxheSAtPiBVbmRlclVuZGVyT3BlblBva2VyIHwgRmxpcFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX19pc0NhblJlZmxpcEJ5Q291bnQodGhpcy5mbGlwQ2xvc2VDYXJkc0NvdW50QlYudisxKSl7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaW5kZXg9MDsgaW5kZXg8IHVuZGVyT3BlblBva2VySW5kZXgtMTsgKytpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdW5kZXJPcGVuT3JPcGVuUG9rZXIgPSB0aGlzLl9vcGVuQXJlYUdyb3VwLnBva2Vyc1tpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vdmVQb2tlci5Jc0NvbmNhdGFibGUodW5kZXJPcGVuT3JPcGVuUG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhPZkZsaXBPblBsYXlDb25jYXRlZEFmdGVyUG9rZXIodW5kZXJPcGVuT3JPcGVuUG9rZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnJvbVBsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tQ2xvc2VUb09wZW4odGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5Tm9GbGlwT25QbGF5VG9QbGF5VG9DcmVhdGVFbXB0eVBsYXlHcm91cChub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICAvLyDnp7vliqggUGxheSDliLDlj6bkuIDnu4TvvIzohb7lh7rkuIDliJfnqbrliJfvvIjliY3mj5DvvJrmsqHmnInnqbrliJfvvIlcbiAgICAgICAgbGV0IGlzRnVsbDogYm9vbGVhbiA9IHRoaXMuX3BsYXlHcm91cHMucmVkdWNlKChpc0FsbEZ1bGwsIGdyb3VwKSA9PiBpc0FsbEZ1bGwgJiYgKCFncm91cC5Jc1Bva2Vyc0VtcHR5KCkpLCB0cnVlKVxuICAgICAgICBpZihpc0Z1bGwpe1xuICAgICAgICAgICAgZm9yKGxldCB0b1BsYXlJbmRleCA9IDA7IHRvUGxheUluZGV4PDc7ICsrdG9QbGF5SW5kZXgpe1xuICAgICAgICAgICAgICAgIGxldCB0b1BsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgZm9yKGxldCBmcm9tUGxheUluZGV4ID0gMDsgZnJvbVBsYXlJbmRleDw3OyArK2Zyb21QbGF5SW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvb3RPcGVuUG9rZXIgPSBmcm9tUGxheUdyb3VwLnJvb3RPcGVuUG9rZXJcbiAgICAgICAgICAgICAgICAgICAgaWYocm9vdE9wZW5Qb2tlciAmJiB0b1BsYXlHcm91cC5Jc0NvbmNhdFBva2VyKHJvb3RPcGVuUG9rZXIpICYmIChmcm9tUGxheUdyb3VwLnplcm8uc3RhdHVzID09PSBFUG9rZXJTdGF0dXMuT1BFTiAmJiBmcm9tUGxheUdyb3VwLnplcm8ucG9pbnQgIT09IDEzKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21QbGF5VG9QbGF5KHJvb3RPcGVuUG9rZXIsIHRvUGxheUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheUZsaXBPblJlY2VpdmVUb1BsYXkobm9QbGF5OiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICAgICAgZm9yKGxldCBmcm9tUmVjZWl2ZUluZGV4ID0gMDsgZnJvbVJlY2VpdmVJbmRleCA8IDQ7ICsrZnJvbVJlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4T2ZGbGlwVGhyb3VnaF9QbGF5X1Bva2VyX1BsYXkodGhpcy5fcmVjZWl2ZUdyb3Vwc1tmcm9tUmVjZWl2ZUluZGV4XS50b3ApXG4gICAgICAgICAgICBpZih0b1BsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21SZWNlaXZlVG9QbGF5KHRoaXMuX3JlY2VpdmVHcm91cHNbZnJvbVJlY2VpdmVJbmRleF0udG9wLCB0b1BsYXlJbmRleClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheU5vRmxpcE9uUGxheVRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IGZyb21QbGF5SW5kZXggPSAwOyBmcm9tUGxheUluZGV4PDc7ICsrZnJvbVBsYXlJbmRleCl7XG4gICAgICAgICAgICBsZXQgdG9SZWNlaXZlSW5kZXggPSB0aGlzLl9fcmVjZWl2ZUluZGV4Rm9yUG9rZXIodGhpcy5fcGxheUdyb3Vwc1tmcm9tUGxheUluZGV4XS50b3ApXG4gICAgICAgICAgICBpZih0b1JlY2VpdmVJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tUGxheVRvUmVjZWl2ZShmcm9tUGxheUdyb3VwLnRvcCwgdG9SZWNlaXZlSW5kZXgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHByaXZhdGUgQXV0b1BsYXlOb0ZsaXBDbG9zZVRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IGluZGV4PXRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgtdGhpcy5jYXJkTW9kZTsgaW5kZXg+PTA7KXtcbiAgICAgICAgICAgIGlmKHRoaXMuX19yZWNlaXZlSW5kZXhGb3JQb2tlcih0aGlzLl9jbG9zZUFyZWFHcm91cC5wb2tlcnNbaW5kZXhdKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLl9pc0NhcmQzTW9kZSAmJiBpbmRleC10aGlzLmNhcmRNb2RlIDwgMCAgJiYgaW5kZXggPiAwKXtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGluZGV4PWluZGV4LXRoaXMuY2FyZE1vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheU5vRmxpcFVuZGVyT3BlblRvUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLklzQ2FuUmVmbGlwKCkpe1xuICAgICAgICAgICAgZm9yKGxldCBpbmRleD10aGlzLmNhcmRNb2RlLTE7IGluZGV4IDwgdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnMubGVuZ3RoLTE7IGluZGV4ID0gaW5kZXggKyB0aGlzLmNhcmRNb2RlKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9fcmVjZWl2ZUluZGV4Rm9yUG9rZXIodGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnNbaW5kZXhdKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tQ2xvc2VUb09wZW4odGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5Tm9GbGlwT25DbG9zZVRvUGxheShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IGluZGV4PXRoaXMuX2Nsb3NlQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgtdGhpcy5jYXJkTW9kZTsgaW5kZXg+PTA7KXtcbiAgICAgICAgICAgIGxldCB0b1BsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhGb3JQb2tlciggdGhpcy5fY2xvc2VBcmVhR3JvdXAucG9rZXJzW2luZGV4XSApXG4gICAgICAgICAgICBpZih0b1BsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIGlmKCFub1BsYXkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fTW92ZUZyb21DbG9zZVRvT3Blbih0aGlzLl9jbG9zZUFyZWFHcm91cC50b3ApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLl9pc0NhcmQzTW9kZSAmJiBpbmRleC10aGlzLmNhcmRNb2RlIDwgMCAgJiYgaW5kZXggPiAwKXtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGluZGV4PWluZGV4LXRoaXMuY2FyZE1vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcHJpdmF0ZSBBdXRvUGxheU5vRmxpcE9uVW5kZXJPcGVuVG9QbGF5KG5vUGxheTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMuSXNDYW5SZWZsaXAoKSl7XG4gICAgICAgICAgICBmb3IobGV0IGluZGV4PXRoaXMuY2FyZE1vZGUtMTsgaW5kZXggPCB0aGlzLl9vcGVuQXJlYUdyb3VwLnBva2Vycy5sZW5ndGgtMTsgaW5kZXggPSBpbmRleCArIHRoaXMuY2FyZE1vZGUpe1xuICAgICAgICAgICAgICAgIGxldCB0b1BsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhGb3JQb2tlciggdGhpcy5fb3BlbkFyZWFHcm91cC5wb2tlcnNbaW5kZXhdIClcbiAgICAgICAgICAgICAgICBpZih0b1BsYXlJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBpZighbm9QbGF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nsb3NlQXJlYUdyb3VwLnRvcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tQ2xvc2VUb09wZW4odGhpcy5fY2xvc2VBcmVhR3JvdXAudG9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX01vdmVGcm9tT3BlblRvQ2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBwcml2YXRlIEF1dG9QbGF5Tm9GbGlwT25QbGF5VG9QbGF5VG9NYWtlUmVjZWl2ZShub1BsYXk6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IobGV0IHJlY2VpdmVJbmRleCA9IDA7IHJlY2VpdmVJbmRleDw0OyArK3JlY2VpdmVJbmRleCl7XG4gICAgICAgICAgICBsZXQgZyA9IHRoaXMuX3JlY2VpdmVHcm91cHNbcmVjZWl2ZUluZGV4XTtcbiAgICAgICAgICAgIGlmKCFnLklzUG9rZXJzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIGxldCByZWNlaXZlUG9rZXIgPSBnLnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSByZWNlaXZlUG9rZXIucG9pbnQrMTtcbiAgICAgICAgICAgICAgICBpZihwb2ludCA8PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAvLyDmn6Xmib7miZHlhYvniYznmoTkvY3nva5cbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBmcm9tUGxheUluZGV4ID0gMDsgZnJvbVBsYXlJbmRleDw3OyArK2Zyb21QbGF5SW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UG9rZXJJbmRleCA9IHBsYXlHcm91cC5HZXRQb2tlckluZGV4QnlTdWl0UG9pbnQocmVjZWl2ZVBva2VyLnN1aXQsIHBvaW50LCBFUG9rZXJTdGF0dXMuT1BFTik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXRQb2tlckluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFib3ZlUG9rZXIgPSBwbGF5R3JvdXAuR2V0UG9rZXIodGFyZ2V0UG9rZXJJbmRleCsxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9QbGF5SW5kZXggPSB0aGlzLl9fcGxheUluZGV4Rm9yUG9rZXIoYWJvdmVQb2tlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodG9QbGF5SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19Nb3ZlRnJvbVBsYXlUb1BsYXkoYWJvdmVQb2tlciwgdG9QbGF5SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiAvLyEg562W55Wl6YC76L6R55qE6L6F5Yqp5Ye95pWwXG4gICAgLy8g6I635Y+WIHRvUGxheUluZGV4IO+8jOWmguaenCAgcG9rZXIg5YiwIFBsYXksIOWHuueOsCDjgJBDb21tb27jgJFcbiAgICBwcml2YXRlIF9fcGxheUluZGV4T2ZGbGlwVGhyb3VnaF9QbGF5X1Bva2VyX1BsYXkocG9rZXI6IFBva2VyKTogbnVtYmVyIHtcbiAgICAgICAgaWYocG9rZXIpe1xuICAgICAgICAgICAgZm9yKGxldCB0b1BsYXlJbmRleCA9IDA7IHRvUGxheUluZGV4PDc7ICsrdG9QbGF5SW5kZXgpe1xuICAgICAgICAgICAgICAgIGxldCB0b1BsYXlHcm91cCA9IHRoaXMuX3BsYXlHcm91cHNbdG9QbGF5SW5kZXhdXG4gICAgICAgICAgICAgICAgaWYodG9QbGF5R3JvdXAuSXNDb25jYXRQb2tlcihwb2tlcikpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJvbVBsYXlJbmRleCA9IHRoaXMuX19wbGF5SW5kZXhPZkZsaXBPblBsYXlDb25jYXRlZEFmdGVyUG9rZXIocG9rZXIpXG4gICAgICAgICAgICAgICAgICAgIGlmKGZyb21QbGF5SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b1BsYXlJbmRleFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICAvLyAg6L+U5ZueIGZyb21QbGF5SW5kZXgg44CQQ29tbW9u44CRXG4gICAgcHJpdmF0ZSBfX3BsYXlJbmRleE9mRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcih0b1Bva2VyOiBQb2tlcik6IG51bWJlciB7XG4gICAgICAgIGZvcihsZXQgZnJvbVBsYXlJbmRleCA9IDA7IGZyb21QbGF5SW5kZXggPCA3OyArK2Zyb21QbGF5SW5kZXgpe1xuICAgICAgICAgICAgaWYodGhpcy5fX2lzRmxpcE9uUGxheUNvbmNhdGVkQWZ0ZXJQb2tlcihmcm9tUGxheUluZGV4LCB0b1Bva2VyKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb21QbGF5SW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgLy8gZnJvbVBsYXlJbmRleCBDb25jYXRlIOWIsOi/meW8oOeJjOS4iu+8jOS8mumAoOaIkOe/u+eJjFxuICAgIHByaXZhdGUgX19pc0ZsaXBPblBsYXlDb25jYXRlZEFmdGVyUG9rZXIoZnJvbVBsYXlJbmRleDogbnVtYmVyLCB0b1Bva2VyOiBQb2tlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZyA9IHRoaXMuX3BsYXlHcm91cHNbZnJvbVBsYXlJbmRleF1cbiAgICAgICAgaWYoZy5Jc1Bva2Vyc0VtcHR5KCkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvb3RPcGVuUG9rZXIgPSBnLnJvb3RPcGVuUG9rZXJcbiAgICAgICAgaWYocm9vdE9wZW5Qb2tlciA9PSBnLnRvcCAmJiB0b1Bva2VyLklzQ29uY2F0YWJsZShyb290T3BlblBva2VyKSl7XG4gICAgICAgICAgICByZXR1cm4gZy5Jc0F1dG9GbGlwT25SZW1vdmVQb2tlcihyb290T3BlblBva2VyKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOi/lOWbniB0b1JlY2VpdmVJbmRleCDvvIzlpoLmnpzov5nlvKDniYzlj6/ku6Xov57mjqXlnKjor6UgUmVjZWl2ZSDnu4RcbiAgICBwcml2YXRlIF9fcmVjZWl2ZUluZGV4Rm9yUG9rZXIocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIGlmKHBva2VyKXtcbiAgICAgICAgICAgIGZvcihsZXQgdG9SZWNlaXZlSW5kZXggPSAwOyB0b1JlY2VpdmVJbmRleDw0OyArK3RvUmVjZWl2ZUluZGV4KXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9yZWNlaXZlR3JvdXBzW3RvUmVjZWl2ZUluZGV4XS5Jc05leHRQb2tlcihwb2tlcikpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9SZWNlaXZlSW5kZXhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIC8vIOi/lOWbniB0b1BsYXlJbmRleCDvvIzlpoLmnpzov5nlvKDniYzlj6/ku6Xov57mjqXlnKjor6UgUGxheSDnu4RcbiAgICBwcml2YXRlIF9fcGxheUluZGV4Rm9yUG9rZXIocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIGlmKHBva2VyKXtcbiAgICAgICAgICAgIGZvcihsZXQgdG9QbGF5SW5kZXggPSAwOyB0b1BsYXlJbmRleDw3OyArK3RvUGxheUluZGV4KXtcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLl9wbGF5R3JvdXBzW3RvUGxheUluZGV4XVxuICAgICAgICAgICAgICAgIGlmKGdyb3VwLklzQ29uY2F0UG9rZXIocG9rZXIpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvUGxheUluZGV4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb24g562W55Wl6YC76L6R55qE6L6F5Yqp5Ye95pWwXG5cbiAgICAvLyNyZWdpb24gLy8hIOaVsOaNruaImOaWl1xuICAgIHN0YXRpYyBTZXJ2ZXJQbGF5KGdhbWVUeXBlOiBFR2FtZVR5cGUsIHNlZWQ6IG51bWJlciwgaXNWZWdhc01vZGU6IGJvb2xlYW4sIGlzQ2FyZDNNb2RlOiBib29sZWFuKTogU29saXRhaXJlRGF0YUJhdHRsZVJlc3VsdCB7XG4gICAgICAgIGxldCBtb2RlbCA9IG5ldyBTb2xpdGFpcmVKdShnYW1lVHlwZSwgaXNWZWdhc01vZGUsIGlzQ2FyZDNNb2RlKVxuICAgICAgICBtb2RlbC5FbnRlcihzZWVkKVxuICAgICAgICBsZXQgcGFzczogYm9vbGVhbiA9IG1vZGVsLkF1dG9TZXJ2ZXJQbGF5KClcbiAgICAgICAgbGV0IHN0ZXAgPSBtb2RlbC5tb3ZlU3RlcENvdW50QlYudjtcbiAgICAgICAgbGV0IGZsaXBDbG9zZUNudCA9IG1vZGVsLmZsaXBDbG9zZUNhcmRzQ291bnRCVi52O1xuICAgICAgICBtb2RlbC5FeGl0KClcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlZWQsXG4gICAgICAgICAgICBwYXNzLFxuICAgICAgICAgICAgc3RlcCxcbiAgICAgICAgICAgIGZsaXBDbG9zZUNudFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NfU2VlZCA9IDA7XG4gICAgc3RhdGljIFRlc3RfRGF0YUJhdHRsZSgpIHtcbiAgICAgICAgbGV0IHJldCA9IFNvbGl0YWlyZUp1LlNlcnZlclBsYXkoRUdhbWVUeXBlLkVBU1ksIHRoaXMuX3NfU2VlZCsrLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICBpZihyZXQucGFzcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCBwYXNzIDo6IHNlZWQgPj4gJHtyZXQuc2VlZH0gc3RlcCA+PiAke3JldC5zdGVwfSBmbGlwID4+ICR7cmV0LmZsaXBDbG9zZUNudH1gKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxufVxuIl19