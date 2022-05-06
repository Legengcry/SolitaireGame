"use strict";
cc._RF.push(module, '9e806/sBOZMioewTGzvLdvm', 'SolitaireGameBottomMenuUI');
// GameBundles/Solitaire/Script/Game/View/SolitaireGameBottomMenuUI.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireLogic_1 = require("../../Logic/SolitaireLogic");
var SolitaireEvent_1 = require("../../SolitaireEvent");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var SolitaireGameDesktopUI_1 = require("./SolitaireGameDesktopUI");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireGameBottomMenuUI = /** @class */ (function (_super) {
    __extends(SolitaireGameBottomMenuUI, _super);
    function SolitaireGameBottomMenuUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mui_ThemesDotNode = null;
        _this.mui_HintDotNode = null;
        _this.mui_NewGameDotNode = null;
        _this.hintCountLabel = null;
        _this._undoRoot = null;
        _this.undoCountLabel = null;
        _this.mui_HelpDotNode = null; /** 帮助次数红点根节点 */
        _this.helpCountLabel = null; /** 帮助次数 */
        _this.expandActionNode = null; // 收缩菜单对应的节点
        _this._undoNodeForGameType = null;
        _this._hintNodeForGameType = null;
        _this.undoNode = null;
        _this.autoCollectNode = null;
        _this.autoPlayerRoot = null;
        _this.startAutoPlayNode = null;
        _this.pauseAutoPlayNode = null;
        _this.preStepAutoPlayNode = null;
        _this.nextStepAutoPlayNode = null;
        _this.mui_SpeedUp = null;
        _this.mui_SpeedDown = null;
        _this.blockInput = null; /** 阻止用户输入的层 */
        _this.speedProgressRoot = null; /** 速度条根节点 */
        _this.speedProgress = null; /** 速度条 */
        // @property({type:cc.Node,visible:true}) private helpADIconNode: cc.Node = null /** 帮助广告显示 */
        _this.m_IsExpandedBV = null;
        _this.isShowUIAutoCollect = null;
        _this.isShowUIUndo = null;
        _this.isShowUIPlayer = null;
        _this.isShowUIPlayerStart = null;
        _this.isShowUIPlayerPause = null;
        _this.isShowUIPlayerPreStep = null;
        _this.isShowUIPlayerNextStep = null;
        _this.isShowUIBlockInput = null;
        _this.isShowUIExpand = null;
        _this.isShowUIPlayerSpeedUp = null;
        _this.isShowUIPlayerSpeedDown = null;
        _this.m_Ju = null;
        return _this;
        //#endregion 自动玩牌播放器
    }
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isAutoCollecting", {
        // 需要根据 game 进行同步的状态
        get: function () { return this.m_Ju.isAutoCollectingBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isAllPokersOpen", {
        get: function () { return this.m_Ju.isAllPokersOpenBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isAutoPlaying", {
        get: function () { return this.m_Ju.isAutoPlayingBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isPlayerOpened", {
        get: function () { return this.m_Ju.isPlayerOpenedBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "hasUndoCmd", {
        get: function () { return this.m_Ju.undoLengthBV.v > 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "hasNext", {
        get: function () { return this.m_Ju.hasNextBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isGameWin", {
        get: function () { return this.m_Ju.isGameWinBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isGameLose", {
        get: function () { return this.m_Ju.isGameLoseBV.v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "isVegasMode", {
        get: function () { return this.m_Ju.isVegasMode; },
        enumerable: false,
        configurable: true
    });
    SolitaireGameBottomMenuUI.prototype.UpdateStatus = function () {
        this.isShowUIAutoCollect.v = (!this.isAutoCollecting) && (!this.isAutoPlaying) && (!this.isPlayerOpened)
            && this.isAllPokersOpen && (!this.isGameWin) && (!this.isGameLose)
            && (!this.isVegasMode);
        this.isShowUIUndo.v = (!this.isAutoPlaying) && (!this.isAutoCollecting) && this.hasUndoCmd && (!this.isGameWin) && (!this.isGameLose);
        this.isShowUIPlayer.v = this.isPlayerOpened && (!this.isAutoCollecting) && (!this.isGameWin) && (!this.isGameLose);
        this.isShowUIPlayerStart.v = !this.isAutoPlaying;
        this.isShowUIPlayerPause.v = this.isAutoPlaying;
        this.isShowUIPlayerPreStep.v = this.isPlayerOpened && (!this.isAutoPlaying) && this.hasUndoCmd;
        this.isShowUIPlayerNextStep.v = this.isPlayerOpened && (!this.isAutoPlaying) && this.hasNext;
        this.isShowUIBlockInput.v = (this.isAutoPlaying || this.isAutoCollecting) && (!this.isGameWin) && (!this.isGameLose);
        this.isShowUIExpand.v = this.m_IsExpandedBV.v && (!this.isAutoCollecting);
        this.isShowUIPlayerSpeedUp.v = this.isAutoPlaying && !SolitaireLogic_1.SolitaireLogic.player.IsMaxSpeed();
        this.isShowUIPlayerSpeedDown.v = this.isAutoPlaying && !SolitaireLogic_1.SolitaireLogic.player.IsMinSpeed();
    };
    SolitaireGameBottomMenuUI.prototype.RefreshUI_HelpAD = function () {
        //this.helpADIconNode.active = ii.App.ins.p.ad.RewardedVideoBV.v && !this.m_Ju.isHelpedBV.v && SolitaireLogic.dataCache.helpBV.v === 0;
        this.mui_HelpDotNode.active = SolitaireLogic_1.SolitaireLogic.dataCache.helpBV.v > 0;
    };
    SolitaireGameBottomMenuUI.prototype.OnCreate = function () {
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
    };
    SolitaireGameBottomMenuUI.prototype.OnRelease = function () { };
    SolitaireGameBottomMenuUI.prototype.OnOpen = function (uiArgs) {
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
    };
    SolitaireGameBottomMenuUI.prototype.Enter = function (ju) {
        this.m_Ju = ju;
        ju.AddEventListener(this);
    };
    SolitaireGameBottomMenuUI.prototype.Exit = function (ju) {
        ju.RemoveEventListener(this);
        this.UnbindAllBV();
    };
    Object.defineProperty(SolitaireGameBottomMenuUI.prototype, "SolitaireJuEventTarget", {
        get: function () { return this.node; },
        enumerable: false,
        configurable: true
    });
    SolitaireGameBottomMenuUI.prototype.OnSolitaireDesktopEvent = function (ju, eventTyp, data) {
        switch (eventTyp) {
            case SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB:
                this.SubScribModelEvents(ju);
                break;
            default: break;
        }
    };
    SolitaireGameBottomMenuUI.prototype.SubScribModelEvents = function (ju) {
        var _this = this;
        this.BindBV(ii.App.ins.p.ad.RewardedVideoBV, function (isReady) { return _this.RefreshUI_HelpAD(); }, false);
        this.BindBV(ju.isHelpedBV, function (helped) { return _this.RefreshUI_HelpAD(); }, true);
        // 监听模型数据变化，更新当前页面所需的状态数据
        this.BindBV(ju.isAutoCollectingBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(ju.isAllPokersOpenBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(ju.isAutoPlayingBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(ju.isPlayerOpenedBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(ju.hasNextBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(ju.isGameWinBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(ju.isGameLoseBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(this.m_IsExpandedBV, function (v) { return _this.UpdateStatus(); }, false);
        this.BindBV(SolitaireLogic_1.SolitaireLogic.player.autoSpeedBV, function (v) {
            _this.UpdateStatus();
            _this.speedProgress.width = _this.speedProgress.parent.width * v / SolitaireLogic_1.SolitaireLogic.player.MaxSpeed;
        }, true);
        this.BindBV(ju.undoLengthBV, function (v) {
            _this.UpdateStatus();
            _this.undoCountLabel.string = "" + v;
            _this._undoRoot.active = v > 0;
        }, true);
        this.BindBV(SolitaireLogic_1.SolitaireLogic.dataCache.helpBV, function (helps) {
            _this.helpCountLabel.string = "" + helps;
            _this.RefreshUI_HelpAD();
        }, true);
        this.BindBV(this.isShowUIAutoCollect, function (isShow) { return _this.autoCollectNode.active = isShow; }, true);
        this.BindBV(this.isShowUIPlayer, function (isShow) { return ii.UIUtil.moveAction(_this.autoPlayerRoot, isShow, _this.GetUserData("K_AUTO_PLAYER_POSITION"), 0.3); }, true);
        this.BindBV(this.isShowUIUndo, function (canUndo) { return _this.preStepAutoPlayNode.active = canUndo; }, true);
        this.BindBV(this.isShowUIPlayerStart, function (isShow) { return _this.startAutoPlayNode.active = isShow; }, true);
        this.BindBV(this.isShowUIPlayerPause, function (isShow) {
            _this.pauseAutoPlayNode.active = isShow;
            _this.speedProgressRoot.active = isShow;
        }, true);
        this.BindBV(this.isShowUIPlayerPreStep, function (isShow) { return _this.preStepAutoPlayNode.active = isShow; }, true);
        this.BindBV(this.isShowUIPlayerNextStep, function (isShow) { return _this.nextStepAutoPlayNode.active = isShow; }, true);
        this.BindBV(this.isShowUIBlockInput, function (isShow) { return _this.blockInput.active = isShow; }, true);
        this.BindBV(this.isShowUIExpand, function (isShow) { return ii.UIUtil.moveAction(_this.expandActionNode, isShow, _this.GetUserData("K_EXPAND_NODE_POSITION"), 0.3); }, true);
        this.BindBV(this.isShowUIPlayerSpeedUp, function (isShow) { return _this.mui_SpeedUp.active = isShow; }, true);
        this.BindBV(this.isShowUIPlayerSpeedDown, function (isShow) { return _this.mui_SpeedDown.active = isShow; }, true);
        // 显示菜单栏的逻辑
        this.onGlobal(SolitaireGameDesktopUI_1.default.EVENT_GAMEVIEW_POKERS_READY, function () { return _this.m_IsExpandedBV.v = true; });
        this.m_IsExpandedBV.v = true;
    };
    SolitaireGameBottomMenuUI.prototype.OnExpand = function () {
        this.m_IsExpandedBV.v = true;
    };
    SolitaireGameBottomMenuUI.prototype.OnAutoCollect = function () {
        this.m_Ju.AutoCollect(SolitaireLogic_1.SolitaireLogic.player.kAutoCollectDuration);
    };
    SolitaireGameBottomMenuUI.prototype.OnThemes = function () {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireThemesUIPanel.key);
    };
    SolitaireGameBottomMenuUI.prototype.OnHint = function () {
        SolitaireLogic_1.SolitaireLogic.UseHint(this.m_Ju);
    };
    SolitaireGameBottomMenuUI.prototype.OnNewGame = function () {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.UINewGame.key, {
            ju: this.m_Ju
        });
    };
    SolitaireGameBottomMenuUI.prototype.OnUndo = function () { this.m_Ju.Undo(); };
    SolitaireGameBottomMenuUI.prototype.OnHelp = function () {
        SolitaireLogic_1.SolitaireLogic.UseAutoPlayer(this.m_Ju);
    };
    //#region 自动玩牌播放器
    SolitaireGameBottomMenuUI.prototype.OnHelpCancel = function () {
        this.m_Ju.StopAutoPlay();
        this.m_Ju.isPlayerOpenedBV.v = false;
    };
    SolitaireGameBottomMenuUI.prototype.OnHelpPreStep = function () {
        this.m_Ju.Undo(true);
    };
    SolitaireGameBottomMenuUI.prototype.OnHelpNextStep = function () {
        this.m_Ju.NextStep();
    };
    SolitaireGameBottomMenuUI.prototype.OnHelpStart = function () {
        this.m_Ju.AutoPlay(SolitaireLogic_1.SolitaireLogic.player.AutoPlayInterval);
    };
    SolitaireGameBottomMenuUI.prototype.OnHelpPause = function () {
        this.m_Ju.StopAutoPlay();
    };
    SolitaireGameBottomMenuUI.prototype.OnHelpSpeedUp = function () {
        SolitaireLogic_1.SolitaireLogic.player.SpeedUp(this.m_Ju);
    };
    SolitaireGameBottomMenuUI.prototype.OnHelpSpeedDown = function () {
        SolitaireLogic_1.SolitaireLogic.player.SpeedDown(this.m_Ju);
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "mui_ThemesDotNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "mui_HintDotNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "mui_NewGameDotNode", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "hintCountLabel", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "_undoRoot", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "undoCountLabel", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "mui_HelpDotNode", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "helpCountLabel", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "expandActionNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "_undoNodeForGameType", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "_hintNodeForGameType", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "undoNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "autoCollectNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "autoPlayerRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "startAutoPlayNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "pauseAutoPlayNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "preStepAutoPlayNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "nextStepAutoPlayNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "mui_SpeedUp", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "mui_SpeedDown", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "blockInput", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "speedProgressRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameBottomMenuUI.prototype, "speedProgress", void 0);
    __decorate([
        ii.Util.block(0.6)
    ], SolitaireGameBottomMenuUI.prototype, "OnExpand", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnAutoCollect", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnThemes", null);
    __decorate([
        ii.Util.block(0.3)
    ], SolitaireGameBottomMenuUI.prototype, "OnHint", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnNewGame", null);
    __decorate([
        ii.Util.block(0.5)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelp", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpCancel", null);
    __decorate([
        ii.Util.block(0.05)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpPreStep", null);
    __decorate([
        ii.Util.block(0.05)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpNextStep", null);
    __decorate([
        ii.Util.block(0.3)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpStart", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpPause", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpSpeedUp", null);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireGameBottomMenuUI.prototype, "OnHelpSpeedDown", null);
    SolitaireGameBottomMenuUI = __decorate([
        ccclass
    ], SolitaireGameBottomMenuUI);
    return SolitaireGameBottomMenuUI;
}(ii.UIComp));
exports.default = SolitaireGameBottomMenuUI;

cc._RF.pop();