
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameBottomMenuUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUE0RDtBQUM1RCx1REFBc0Q7QUFDdEQsK0RBQThEO0FBRTlELG1FQUE4RDtBQUt4RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUF1RCw2Q0FBd0M7SUFBL0Y7UUFBQSxxRUErT0M7UUE5T2tELHVCQUFpQixHQUFZLElBQUksQ0FBQTtRQUNqQyxxQkFBZSxHQUFZLElBQUksQ0FBQTtRQUMvQix3QkFBa0IsR0FBWSxJQUFJLENBQUE7UUFDakMsb0JBQWMsR0FBYSxJQUFJLENBQUE7UUFDaEMsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUN4QixvQkFBYyxHQUFhLElBQUksQ0FBQTtRQUNoQyxxQkFBZSxHQUFZLElBQUksQ0FBQSxDQUFDLGdCQUFnQjtRQUMvQyxvQkFBYyxHQUFhLElBQUksQ0FBQSxDQUFDLFdBQVc7UUFDNUMsc0JBQWdCLEdBQVksSUFBSSxDQUFBLENBQUMsWUFBWTtRQUM3QywwQkFBb0IsR0FBWSxJQUFJLENBQUE7UUFDcEMsMEJBQW9CLEdBQVksSUFBSSxDQUFBO1FBQ3BDLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFDeEIscUJBQWUsR0FBWSxJQUFJLENBQUE7UUFDL0Isb0JBQWMsR0FBWSxJQUFJLENBQUE7UUFDOUIsdUJBQWlCLEdBQVksSUFBSSxDQUFBO1FBQ2pDLHVCQUFpQixHQUFZLElBQUksQ0FBQTtRQUNqQyx5QkFBbUIsR0FBWSxJQUFJLENBQUE7UUFDbkMsMEJBQW9CLEdBQVksSUFBSSxDQUFBO1FBQ3BDLGlCQUFXLEdBQVksSUFBSSxDQUFBO1FBQzNCLG1CQUFhLEdBQVksSUFBSSxD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REMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2tFQUdsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzZEQUdsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzJEQUdsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzhEQUtsQjtJQUtEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzJEQUdsQjtJQUlEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2lFQUlsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2tFQUduQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO21FQUduQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dFQUdsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dFQUdsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2tFQUdsQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO29FQUdsQjtJQTdPZ0IseUJBQXlCO1FBRDdDLE9BQU87T0FDYSx5QkFBeUIsQ0ErTzdDO0lBQUQsZ0NBQUM7Q0EvT0QsQUErT0MsQ0EvT3NELEVBQUUsQ0FBQyxNQUFNLEdBK08vRDtrQkEvT29CLHlCQUF5QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbGl0YWlyZUxvZ2ljIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL1NvbGl0YWlyZUxvZ2ljXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVFdmVudCB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVFdmVudFwiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgSVNvbGl0YWlyZUp1RXZlbnRMaXN0ZW5lciwgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vTW9kZWwvU29saXRhaXJlSnVcIjtcbmltcG9ydCBTb2xpdGFpcmVHYW1lRGVza3RvcFVJIGZyb20gXCIuL1NvbGl0YWlyZUdhbWVEZXNrdG9wVUlcIjtcbmltcG9ydCB7IFVJTmV3R2FtZUFyZ3MgfSBmcm9tIFwiLi9VSU5ld0dhbWVcIjtcblxuZXhwb3J0IHR5cGUgU29saXRhaXJlR2FtZUJvdHRvbU1lbnVVSUFyZ3MgPSB7IH1cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saXRhaXJlR2FtZUJvdHRvbU1lbnVVSSBleHRlbmRzIGlpLlVJQ29tcDxTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJQXJncz4gaW1wbGVtZW50cyBJU29saXRhaXJlSnVFdmVudExpc3RlbmVyIHtcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIG11aV9UaGVtZXNEb3ROb2RlOiBjYy5Ob2RlID0gbnVsbCBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIG11aV9IaW50RG90Tm9kZTogY2MuTm9kZSA9IG51bGwgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBtdWlfTmV3R2FtZURvdE5vZGU6IGNjLk5vZGUgPSBudWxsIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCx2aXNpYmxlOnRydWV9KSBwcml2YXRlIGhpbnRDb3VudExhYmVsOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF91bmRvUm9vdDogY2MuTm9kZSA9IG51bGwgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgdW5kb0NvdW50TGFiZWw6IGNjLkxhYmVsID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgbXVpX0hlbHBEb3ROb2RlOiBjYy5Ob2RlID0gbnVsbCAvKiog5biu5Yqp5qyh5pWw57qi54K55qC56IqC54K5ICovXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgaGVscENvdW50TGFiZWw6IGNjLkxhYmVsID0gbnVsbCAvKiog5biu5Yqp5qyh5pWwICovXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBleHBhbmRBY3Rpb25Ob2RlOiBjYy5Ob2RlID0gbnVsbCAvLyDmlLbnvKnoj5zljZXlr7nlupTnmoToioLngrlcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF91bmRvTm9kZUZvckdhbWVUeXBlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX2hpbnROb2RlRm9yR2FtZVR5cGU6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSB1bmRvTm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIGF1dG9Db2xsZWN0Tm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIGF1dG9QbGF5ZXJSb290OiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgc3RhcnRBdXRvUGxheU5vZGU6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBwYXVzZUF1dG9QbGF5Tm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIHByZVN0ZXBBdXRvUGxheU5vZGU6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBuZXh0U3RlcEF1dG9QbGF5Tm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIG11aV9TcGVlZFVwOiBjYy5Ob2RlID0gbnVsbCBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIG11aV9TcGVlZERvd246IGNjLk5vZGUgPSBudWxsIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgYmxvY2tJbnB1dDogY2MuTm9kZSA9IG51bGwgLyoqIOmYu+atoueUqOaIt+i+k+WFpeeahOWxgiAqL1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgc3BlZWRQcm9ncmVzc1Jvb3Q6IGNjLk5vZGUgPSBudWxsIC8qKiDpgJ/luqbmnaHmoLnoioLngrkgKi9cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIHNwZWVkUHJvZ3Jlc3M6IGNjLk5vZGUgPSBudWxsIC8qKiDpgJ/luqbmnaEgKi9cbiAgIC8vIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgaGVscEFESWNvbk5vZGU6IGNjLk5vZGUgPSBudWxsIC8qKiDluK7liqnlub/lkYrmmL7npLogKi9cblxuICAgIHByaXZhdGUgbV9Jc0V4cGFuZGVkQlY6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgcHJpdmF0ZSBpc1Nob3dVSUF1dG9Db2xsZWN0OiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIHByaXZhdGUgaXNTaG93VUlVbmRvOiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIHByaXZhdGUgaXNTaG93VUlQbGF5ZXI6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgcHJpdmF0ZSBpc1Nob3dVSVBsYXllclN0YXJ0OiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIHByaXZhdGUgaXNTaG93VUlQbGF5ZXJQYXVzZTogaWkuQm9vbGVhbkJWID0gbnVsbDtcbiAgICBwcml2YXRlIGlzU2hvd1VJUGxheWVyUHJlU3RlcDogaWkuQm9vbGVhbkJWID0gbnVsbDtcbiAgICBwcml2YXRlIGlzU2hvd1VJUGxheWVyTmV4dFN0ZXA6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgcHJpdmF0ZSBpc1Nob3dVSUJsb2NrSW5wdXQ6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgcHJpdmF0ZSBpc1Nob3dVSUV4cGFuZDogaWkuQm9vbGVhbkJWID0gbnVsbDtcbiAgICBwcml2YXRlIGlzU2hvd1VJUGxheWVyU3BlZWRVcDogaWkuQm9vbGVhbkJWID0gbnVsbDtcbiAgICBwcml2YXRlIGlzU2hvd1VJUGxheWVyU3BlZWREb3duOiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIFxuICAgIC8vIOmcgOimgeagueaNriBnYW1lIOi/m+ihjOWQjOatpeeahOeKtuaAgVxuICAgIHByaXZhdGUgZ2V0IGlzQXV0b0NvbGxlY3RpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1fSnUuaXNBdXRvQ29sbGVjdGluZ0JWLnYgfVxuICAgIHByaXZhdGUgZ2V0IGlzQWxsUG9rZXJzT3BlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubV9KdS5pc0FsbFBva2Vyc09wZW5CVi52IH1cbiAgICBwcml2YXRlIGdldCBpc0F1dG9QbGF5aW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tX0p1LmlzQXV0b1BsYXlpbmdCVi52IH1cbiAgICBwcml2YXRlIGdldCBpc1BsYXllck9wZW5lZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubV9KdS5pc1BsYXllck9wZW5lZEJWLnYgfVxuICAgIHByaXZhdGUgZ2V0IGhhc1VuZG9DbWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1fSnUudW5kb0xlbmd0aEJWLnYgPiAwIH1cbiAgICBwcml2YXRlIGdldCBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tX0p1Lmhhc05leHRCVi52IH1cbiAgICBwcml2YXRlIGdldCBpc0dhbWVXaW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1fSnUuaXNHYW1lV2luQlYudiAgfVxuICAgIHByaXZhdGUgZ2V0IGlzR2FtZUxvc2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1fSnUuaXNHYW1lTG9zZUJWLnYgfVxuICAgIHByaXZhdGUgZ2V0IGlzVmVnYXNNb2RlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5tX0p1LmlzVmVnYXNNb2RlIH1cblxuICAgIHByaXZhdGUgbV9KdTogU29saXRhaXJlSnUgPSBudWxsO1xuICAgIHByaXZhdGUgVXBkYXRlU3RhdHVzKCkge1xuICAgICAgICB0aGlzLmlzU2hvd1VJQXV0b0NvbGxlY3QudiA9ICghdGhpcy5pc0F1dG9Db2xsZWN0aW5nKSAmJiAoIXRoaXMuaXNBdXRvUGxheWluZykgJiYgKCF0aGlzLmlzUGxheWVyT3BlbmVkKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmlzQWxsUG9rZXJzT3BlbiAmJiAoIXRoaXMuaXNHYW1lV2luKSAmJiAoIXRoaXMuaXNHYW1lTG9zZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoIXRoaXMuaXNWZWdhc01vZGUpXG4gICAgICAgIHRoaXMuaXNTaG93VUlVbmRvLnYgPSAoIXRoaXMuaXNBdXRvUGxheWluZykgJiYgKCF0aGlzLmlzQXV0b0NvbGxlY3RpbmcpICYmIHRoaXMuaGFzVW5kb0NtZCAmJiAoIXRoaXMuaXNHYW1lV2luKSAmJiAoIXRoaXMuaXNHYW1lTG9zZSlcbiAgICAgICAgdGhpcy5pc1Nob3dVSVBsYXllci52ID0gdGhpcy5pc1BsYXllck9wZW5lZCAmJiAoIXRoaXMuaXNBdXRvQ29sbGVjdGluZykgJiYgKCF0aGlzLmlzR2FtZVdpbikgJiYgKCF0aGlzLmlzR2FtZUxvc2UpXG4gICAgICAgIHRoaXMuaXNTaG93VUlQbGF5ZXJTdGFydC52ID0gIXRoaXMuaXNBdXRvUGxheWluZ1xuICAgICAgICB0aGlzLmlzU2hvd1VJUGxheWVyUGF1c2UudiA9IHRoaXMuaXNBdXRvUGxheWluZ1xuICAgICAgICB0aGlzLmlzU2hvd1VJUGxheWVyUHJlU3RlcC52ID0gdGhpcy5pc1BsYXllck9wZW5lZCAmJiAoIXRoaXMuaXNBdXRvUGxheWluZykgJiYgdGhpcy5oYXNVbmRvQ21kXG4gICAgICAgIHRoaXMuaXNTaG93VUlQbGF5ZXJOZXh0U3RlcC52ID0gdGhpcy5pc1BsYXllck9wZW5lZCAmJiAoIXRoaXMuaXNBdXRvUGxheWluZykgJiYgdGhpcy5oYXNOZXh0XG4gICAgICAgIHRoaXMuaXNTaG93VUlCbG9ja0lucHV0LnYgPSAodGhpcy5pc0F1dG9QbGF5aW5nIHx8IHRoaXMuaXNBdXRvQ29sbGVjdGluZykgJiYgKCF0aGlzLmlzR2FtZVdpbikgJiYgKCF0aGlzLmlzR2FtZUxvc2UpXG4gICAgICAgIHRoaXMuaXNTaG93VUlFeHBhbmQudiA9IHRoaXMubV9Jc0V4cGFuZGVkQlYudiAmJiAoIXRoaXMuaXNBdXRvQ29sbGVjdGluZylcbiAgICAgICAgdGhpcy5pc1Nob3dVSVBsYXllclNwZWVkVXAudiA9IHRoaXMuaXNBdXRvUGxheWluZyAmJiAhU29saXRhaXJlTG9naWMucGxheWVyLklzTWF4U3BlZWQoKVxuICAgICAgICB0aGlzLmlzU2hvd1VJUGxheWVyU3BlZWREb3duLnYgPSB0aGlzLmlzQXV0b1BsYXlpbmcgJiYgIVNvbGl0YWlyZUxvZ2ljLnBsYXllci5Jc01pblNwZWVkKClcbiAgICB9XG4gICAgcHJpdmF0ZSBSZWZyZXNoVUlfSGVscEFEKCkge1xuICAgICAgICAvL3RoaXMuaGVscEFESWNvbk5vZGUuYWN0aXZlID0gaWkuQXBwLmlucy5wLmFkLlJld2FyZGVkVmlkZW9CVi52ICYmICF0aGlzLm1fSnUuaXNIZWxwZWRCVi52ICYmIFNvbGl0YWlyZUxvZ2ljLmRhdGFDYWNoZS5oZWxwQlYudiA9PT0gMDtcbiAgICAgICAgdGhpcy5tdWlfSGVscERvdE5vZGUuYWN0aXZlID0gU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLmhlbHBCVi52ID4gMDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9Jc0V4cGFuZGVkQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc1Nob3dVSUF1dG9Db2xsZWN0ID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNTaG93VUlVbmRvID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNTaG93VUlQbGF5ZXIgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc1Nob3dVSVBsYXllclN0YXJ0ID0gaWkuQm9vbGVhbkJWLkJvcnJvdyh0cnVlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc1Nob3dVSVBsYXllclBhdXNlID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNTaG93VUlQbGF5ZXJQcmVTdGVwID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNTaG93VUlQbGF5ZXJOZXh0U3RlcCA9IGlpLkJvb2xlYW5CVi5Cb3Jyb3codHJ1ZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNTaG93VUlCbG9ja0lucHV0ID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuaXNTaG93VUlFeHBhbmQgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc1Nob3dVSVBsYXllclNwZWVkVXAgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgdGhpcy5pc1Nob3dVSVBsYXllclNwZWVkRG93biA9IGlpLkJvb2xlYW5CVi5Cb3Jyb3coZmFsc2UpLlJldHVybkJ5KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuU2V0VXNlckRhdGEoXCJLX0FVVE9fUExBWUVSX1BPU0lUSU9OXCIsIHRoaXMuYXV0b1BsYXllclJvb3QucG9zaXRpb24pO1xuICAgICAgICB0aGlzLlNldFVzZXJEYXRhKFwiS19FWFBBTkRfTk9ERV9QT1NJVElPTlwiLCB0aGlzLmV4cGFuZEFjdGlvbk5vZGUucG9zaXRpb24pO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25UaGVtZXNcIiwgdGhpcy5PblRoZW1lcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uSGludFwiLCB0aGlzLk9uSGludC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uTmV3R2FtZVwiLCB0aGlzLk9uTmV3R2FtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uVW5kb1wiLCB0aGlzLk9uVW5kby5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uSGVscFwiLCB0aGlzLk9uSGVscC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uSGVscENhbmNlbFwiLCB0aGlzLk9uSGVscENhbmNlbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uSGVscE5leHRTdGVwXCIsIHRoaXMuT25IZWxwTmV4dFN0ZXAuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkhlbHBQcmVTdGVwXCIsIHRoaXMuT25IZWxwUHJlU3RlcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uSGVscFN0YXJ0XCIsIHRoaXMuT25IZWxwU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkhlbHBQYXVzZVwiLCB0aGlzLk9uSGVscFBhdXNlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25IZWxwU3BlZWRVcFwiLCB0aGlzLk9uSGVscFNwZWVkVXAuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkhlbHBTcGVlZERvd25cIiwgdGhpcy5PbkhlbHBTcGVlZERvd24uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkF1dG9Db2xsZWN0XCIsIHRoaXMuT25BdXRvQ29sbGVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uRXhwYW5kXCIsIHRoaXMuT25FeHBhbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubXVpX0hpbnREb3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm11aV9UaGVtZXNEb3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm11aV9OZXdHYW1lRG90Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgRW50ZXIoanU6IFNvbGl0YWlyZUp1KSB7XG4gICAgICAgIHRoaXMubV9KdSA9IGp1O1xuICAgICAgICBqdS5BZGRFdmVudExpc3RlbmVyKHRoaXMpO1xuICAgIH1cbiAgICBFeGl0KGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICBqdS5SZW1vdmVFdmVudExpc3RlbmVyKHRoaXMpXG4gICAgICAgIHRoaXMuVW5iaW5kQWxsQlYoKTtcbiAgICB9XG4gICAgZ2V0IFNvbGl0YWlyZUp1RXZlbnRUYXJnZXQoKTogYW55IHsgcmV0dXJuIHRoaXMubm9kZTsgfVxuICAgIE9uU29saXRhaXJlRGVza3RvcEV2ZW50KGp1OiBTb2xpdGFpcmVKdSwgZXZlbnRUeXA6IFNvbGl0YWlyZUV2ZW50LCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRUeXApIHtcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfVUlfU1VCU0NSSUI6IHRoaXMuU3ViU2NyaWJNb2RlbEV2ZW50cyhqdSk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBTdWJTY3JpYk1vZGVsRXZlbnRzKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICB0aGlzLkJpbmRCVihpaS5BcHAuaW5zLnAuYWQuUmV3YXJkZWRWaWRlb0JWLCBpc1JlYWR5ID0+IHRoaXMuUmVmcmVzaFVJX0hlbHBBRCgpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuQmluZEJWKGp1LmlzSGVscGVkQlYsIGhlbHBlZCA9PiB0aGlzLlJlZnJlc2hVSV9IZWxwQUQoKSwgdHJ1ZSk7XG4gICAgICAgIC8vIOebkeWQrOaooeWei+aVsOaNruWPmOWMlu+8jOabtOaWsOW9k+WJjemhtemdouaJgOmcgOeahOeKtuaAgeaVsOaNrlxuICAgICAgICB0aGlzLkJpbmRCVihqdS5pc0F1dG9Db2xsZWN0aW5nQlYsIHYgPT4gdGhpcy5VcGRhdGVTdGF0dXMoKSwgZmFsc2UpXG4gICAgICAgIHRoaXMuQmluZEJWKGp1LmlzQWxsUG9rZXJzT3BlbkJWLCB2ID0+IHRoaXMuVXBkYXRlU3RhdHVzKCksIGZhbHNlKVxuICAgICAgICB0aGlzLkJpbmRCVihqdS5pc0F1dG9QbGF5aW5nQlYsIHYgPT4gdGhpcy5VcGRhdGVTdGF0dXMoKSwgZmFsc2UpXG4gICAgICAgIHRoaXMuQmluZEJWKGp1LmlzUGxheWVyT3BlbmVkQlYsIHYgPT4gdGhpcy5VcGRhdGVTdGF0dXMoKSwgZmFsc2UpXG4gICAgICAgIHRoaXMuQmluZEJWKGp1Lmhhc05leHRCViwgdiA9PiB0aGlzLlVwZGF0ZVN0YXR1cygpLCBmYWxzZSlcbiAgICAgICAgdGhpcy5CaW5kQlYoanUuaXNHYW1lV2luQlYsIHYgPT4gdGhpcy5VcGRhdGVTdGF0dXMoKSwgZmFsc2UpXG4gICAgICAgIHRoaXMuQmluZEJWKGp1LmlzR2FtZUxvc2VCViwgdiA9PiB0aGlzLlVwZGF0ZVN0YXR1cygpLCBmYWxzZSlcbiAgICAgICAgdGhpcy5CaW5kQlYodGhpcy5tX0lzRXhwYW5kZWRCViwgdiA9PiB0aGlzLlVwZGF0ZVN0YXR1cygpLCBmYWxzZSlcbiAgICAgICAgdGhpcy5CaW5kQlYoU29saXRhaXJlTG9naWMucGxheWVyLmF1dG9TcGVlZEJWLCB2ID0+IHtcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlU3RhdHVzKClcbiAgICAgICAgICAgIHRoaXMuc3BlZWRQcm9ncmVzcy53aWR0aCA9IHRoaXMuc3BlZWRQcm9ncmVzcy5wYXJlbnQud2lkdGggKiB2IC8gU29saXRhaXJlTG9naWMucGxheWVyLk1heFNwZWVkO1xuICAgICAgICB9LCB0cnVlKVxuICAgICAgICB0aGlzLkJpbmRCVihqdS51bmRvTGVuZ3RoQlYsIHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5VcGRhdGVTdGF0dXMoKTtcbiAgICAgICAgICAgIHRoaXMudW5kb0NvdW50TGFiZWwuc3RyaW5nID0gYCR7dn1gO1xuICAgICAgICAgICAgdGhpcy5fdW5kb1Jvb3QuYWN0aXZlID0gdiA+IDA7XG4gICAgICAgIH0sIHRydWUpXG4gICAgICAgIHRoaXMuQmluZEJWKFNvbGl0YWlyZUxvZ2ljLmRhdGFDYWNoZS5oZWxwQlYsIGhlbHBzID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGVscENvdW50TGFiZWwuc3RyaW5nID0gYCR7aGVscHN9YDtcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFVJX0hlbHBBRCgpO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICB0aGlzLkJpbmRCVih0aGlzLmlzU2hvd1VJQXV0b0NvbGxlY3QsIGlzU2hvdyA9PiB0aGlzLmF1dG9Db2xsZWN0Tm9kZS5hY3RpdmUgPSBpc1Nob3csIHRydWUpXG4gICAgICAgIHRoaXMuQmluZEJWKHRoaXMuaXNTaG93VUlQbGF5ZXIsIGlzU2hvdyA9PiBpaS5VSVV0aWwubW92ZUFjdGlvbih0aGlzLmF1dG9QbGF5ZXJSb290LCBpc1Nob3csIHRoaXMuR2V0VXNlckRhdGEoXCJLX0FVVE9fUExBWUVSX1BPU0lUSU9OXCIpLCAwLjMpLCB0cnVlKVxuICAgICAgICB0aGlzLkJpbmRCVih0aGlzLmlzU2hvd1VJVW5kbywgY2FuVW5kbyA9PiB0aGlzLnByZVN0ZXBBdXRvUGxheU5vZGUuYWN0aXZlID0gY2FuVW5kbywgdHJ1ZSlcbiAgICAgICAgdGhpcy5CaW5kQlYodGhpcy5pc1Nob3dVSVBsYXllclN0YXJ0LCBpc1Nob3cgPT4gdGhpcy5zdGFydEF1dG9QbGF5Tm9kZS5hY3RpdmUgPSBpc1Nob3csIHRydWUpXG4gICAgICAgIHRoaXMuQmluZEJWKHRoaXMuaXNTaG93VUlQbGF5ZXJQYXVzZSwgaXNTaG93ID0+IHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VBdXRvUGxheU5vZGUuYWN0aXZlID0gaXNTaG93O1xuICAgICAgICAgICAgdGhpcy5zcGVlZFByb2dyZXNzUm9vdC5hY3RpdmUgPSBpc1Nob3c7XG4gICAgICAgIH0sIHRydWUpXG4gICAgICAgIHRoaXMuQmluZEJWKHRoaXMuaXNTaG93VUlQbGF5ZXJQcmVTdGVwLCBpc1Nob3cgPT4gdGhpcy5wcmVTdGVwQXV0b1BsYXlOb2RlLmFjdGl2ZSA9IGlzU2hvdywgdHJ1ZSlcbiAgICAgICAgdGhpcy5CaW5kQlYodGhpcy5pc1Nob3dVSVBsYXllck5leHRTdGVwLCBpc1Nob3cgPT4gdGhpcy5uZXh0U3RlcEF1dG9QbGF5Tm9kZS5hY3RpdmUgPSBpc1Nob3csIHRydWUpXG4gICAgICAgIHRoaXMuQmluZEJWKHRoaXMuaXNTaG93VUlCbG9ja0lucHV0LCBpc1Nob3cgPT4gdGhpcy5ibG9ja0lucHV0LmFjdGl2ZSA9IGlzU2hvdywgdHJ1ZSlcbiAgICAgICAgdGhpcy5CaW5kQlYodGhpcy5pc1Nob3dVSUV4cGFuZCwgaXNTaG93ID0+IGlpLlVJVXRpbC5tb3ZlQWN0aW9uKHRoaXMuZXhwYW5kQWN0aW9uTm9kZSwgaXNTaG93LCB0aGlzLkdldFVzZXJEYXRhKFwiS19FWFBBTkRfTk9ERV9QT1NJVElPTlwiKSwwLjMpLCB0cnVlKVxuICAgICAgICB0aGlzLkJpbmRCVih0aGlzLmlzU2hvd1VJUGxheWVyU3BlZWRVcCwgaXNTaG93ID0+IHRoaXMubXVpX1NwZWVkVXAuYWN0aXZlID0gaXNTaG93LCB0cnVlKVxuICAgICAgICB0aGlzLkJpbmRCVih0aGlzLmlzU2hvd1VJUGxheWVyU3BlZWREb3duLCBpc1Nob3cgPT4gdGhpcy5tdWlfU3BlZWREb3duLmFjdGl2ZSA9IGlzU2hvdywgdHJ1ZSlcbiAgICAgICAgLy8g5pi+56S66I+c5Y2V5qCP55qE6YC76L6RXG4gICAgICAgIHRoaXMub25HbG9iYWwoU29saXRhaXJlR2FtZURlc2t0b3BVSS5FVkVOVF9HQU1FVklFV19QT0tFUlNfUkVBRFksICgpPT50aGlzLm1fSXNFeHBhbmRlZEJWLnYgPSB0cnVlKTtcbiAgICAgICAgdGhpcy5tX0lzRXhwYW5kZWRCVi52ID0gdHJ1ZVxuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuNilcbiAgICBwcml2YXRlIE9uRXhwYW5kKCkge1xuICAgICAgICB0aGlzLm1fSXNFeHBhbmRlZEJWLnYgPSB0cnVlO1xuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuMilcbiAgICBwcml2YXRlIE9uQXV0b0NvbGxlY3QoKSB7XG4gICAgICAgIHRoaXMubV9KdS5BdXRvQ29sbGVjdChTb2xpdGFpcmVMb2dpYy5wbGF5ZXIua0F1dG9Db2xsZWN0RHVyYXRpb24pXG4gICAgfVxuXG4gICAgQGlpLlV0aWwuYmxvY2soMC4yKVxuICAgIHByaXZhdGUgT25UaGVtZXMoKSB7XG4gICAgICAgIGlpLlVJTWdyLmlucy5PcGVuKFNvbGl0YWlyZVByZWZhYkNmZy5wZmIucGFuZWwuU29saXRhaXJlVGhlbWVzVUlQYW5lbC5rZXkpO1xuICAgIH1cbiAgICBcbiAgICBAaWkuVXRpbC5ibG9jaygwLjMpXG4gICAgcHJpdmF0ZSBPbkhpbnQoKSB7XG4gICAgICAgIFNvbGl0YWlyZUxvZ2ljLlVzZUhpbnQodGhpcy5tX0p1KTtcbiAgICB9XG4gICAgXG4gICAgQGlpLlV0aWwuYmxvY2soMC4yKVxuICAgIHByaXZhdGUgT25OZXdHYW1lKCkge1xuICAgICAgICBpaS5VSU1nci5pbnMuT3BlbjxVSU5ld0dhbWVBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLnBhbmVsLlVJTmV3R2FtZS5rZXksIHtcbiAgICAgICAgICAgIGp1OiB0aGlzLm1fSnVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPblVuZG8oKSB7IHRoaXMubV9KdS5VbmRvKCkgfVxuICAgIFxuICAgIEBpaS5VdGlsLmJsb2NrKDAuNSlcbiAgICBwcml2YXRlIE9uSGVscCgpIHtcbiAgICAgICAgU29saXRhaXJlTG9naWMuVXNlQXV0b1BsYXllcih0aGlzLm1fSnUpO1xuICAgIH0gICAgXG5cbiAgICAvLyNyZWdpb24g6Ieq5Yqo546p54mM5pKt5pS+5ZmoXG4gICAgQGlpLlV0aWwuYmxvY2soMC4yKVxuICAgIHByaXZhdGUgT25IZWxwQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLm1fSnUuU3RvcEF1dG9QbGF5KClcbiAgICAgICAgdGhpcy5tX0p1LmlzUGxheWVyT3BlbmVkQlYudiA9IGZhbHNlO1xuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuMDUpXG4gICAgcHJpdmF0ZSBPbkhlbHBQcmVTdGVwKCkge1xuICAgICAgICB0aGlzLm1fSnUuVW5kbyh0cnVlKVxuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuMDUpXG4gICAgcHJpdmF0ZSBPbkhlbHBOZXh0U3RlcCgpIHtcbiAgICAgICAgdGhpcy5tX0p1Lk5leHRTdGVwKClcbiAgICB9XG5cbiAgICBAaWkuVXRpbC5ibG9jaygwLjMpXG4gICAgcHJpdmF0ZSBPbkhlbHBTdGFydCgpIHtcbiAgICAgICAgdGhpcy5tX0p1LkF1dG9QbGF5KFNvbGl0YWlyZUxvZ2ljLnBsYXllci5BdXRvUGxheUludGVydmFsKVxuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuMilcbiAgICBwcml2YXRlIE9uSGVscFBhdXNlKCkge1xuICAgICAgICB0aGlzLm1fSnUuU3RvcEF1dG9QbGF5KClcbiAgICB9XG5cbiAgICBAaWkuVXRpbC5ibG9jaygwLjIpXG4gICAgcHJpdmF0ZSBPbkhlbHBTcGVlZFVwKCkge1xuICAgICAgICBTb2xpdGFpcmVMb2dpYy5wbGF5ZXIuU3BlZWRVcCh0aGlzLm1fSnUpO1xuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuMilcbiAgICBwcml2YXRlIE9uSGVscFNwZWVkRG93bigpIHtcbiAgICAgICAgU29saXRhaXJlTG9naWMucGxheWVyLlNwZWVkRG93bih0aGlzLm1fSnUpXG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvbiDoh6rliqjnjqnniYzmkq3mlL7lmahcbn0iXX0=