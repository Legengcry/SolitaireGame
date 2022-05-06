"use strict";
cc._RF.push(module, '46d16KkemFN3r880bPDgQpP', 'SolitaireMenuUIPanel');
// GameBundles/Solitaire/Script/Menu/SolitaireMenuUIPanel.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireLogic_1 = require("../Logic/SolitaireLogic");
var SolitaireAudioCfg_1 = require("../SolitaireAudioCfg");
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MenuResumeItem = /** @class */ (function () {
    function MenuResumeItem() {
        this._difficulty = SolitaireEnums_1.EGameType.EASY;
        this.resumeNode = null; // 继续上次游戏的节点
        this._scoreLabel = null; // 分数
    }
    Object.defineProperty(MenuResumeItem.prototype, "ResumeNode", {
        get: function () { return this.resumeNode; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuResumeItem.prototype, "ScoreLabel", {
        get: function () { return this._scoreLabel; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuResumeItem.prototype, "Difficulty", {
        get: function () { return this._difficulty; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property({ type: cc.Enum(SolitaireEnums_1.EGameType), visible: true })
    ], MenuResumeItem.prototype, "_difficulty", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], MenuResumeItem.prototype, "resumeNode", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], MenuResumeItem.prototype, "_scoreLabel", void 0);
    MenuResumeItem = __decorate([
        ccclass("MenuResumeItem")
    ], MenuResumeItem);
    return MenuResumeItem;
}());
var SolitaireMenuUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireMenuUIPanel, _super);
    function SolitaireMenuUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._playActionNode = null; // 右侧难度列表动作节点
        _this._toggleActionNode = null; // 左下角开关动作节点
        _this._resumeNodeList = [];
        return _this;
    }
    SolitaireMenuUIPanel.prototype.OnCreate = function () {
        //! 1. 入场动画 >> 记录初始位置，方便做入场动作
        this.SetUserData("K_POS_PLAY", this._playActionNode.position);
        this.SetUserData("K_POS_TOGGLE", this._toggleActionNode.position);
    };
    SolitaireMenuUIPanel.prototype.OnRelease = function () { };
    SolitaireMenuUIPanel.prototype.OnOpen = function (uiArgs) {
        this.SetIIClickHandler("OnPlayEasy", this.OnPlay.bind(this, SolitaireEnums_1.EGameType.EASY), true);
        this.SetIIClickHandler("OnPlayHard", this.OnPlay.bind(this, SolitaireEnums_1.EGameType.HARD), true);
        this.SetIIClickHandler("OnOptions", this.OnOptions.bind(this));
        //! 入场动画
        this.RunSwitchPlayUIAction(true, 0.4);
    };
    // 二级菜单切换动画
    SolitaireMenuUIPanel.prototype.RunSwitchPlayUIAction = function (isEnter, duration, callback) {
        if (isEnter) {
            ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
        }
        ii.UIUtil.moveAction(this._playActionNode, isEnter, this.GetUserData("K_POS_PLAY"), duration);
        ii.UIUtil.moveAction(this._toggleActionNode, isEnter, this.GetUserData("K_POS_TOGGLE"), duration, callback);
    };
    // 刷新上一次游戏类型标签
    SolitaireMenuUIPanel.prototype.UpdateResumeStatus = function () {
        var vegasMode = SolitaireLogic_1.SolitaireLogic.dataCache.vegasModeBV.v;
        var cards3Mode = SolitaireLogic_1.SolitaireLogic.dataCache.cards3ModeBV.v;
        this._resumeNodeList.forEach(function (it) {
            var hasSnapData = SolitaireLogic_1.SolitaireLogic.dataCache.HasSnapData(vegasMode, cards3Mode, it.Difficulty);
            it.ResumeNode.active = hasSnapData;
            if (hasSnapData) {
                var snapData = SolitaireLogic_1.SolitaireLogic.dataCache.ReadSnapData(vegasMode, cards3Mode, it.Difficulty);
                if (snapData != null) {
                    it.ScoreLabel.string = "" + snapData.score;
                }
            }
        });
    };
    //#region //! 按钮相关事件
    SolitaireMenuUIPanel.prototype.OnPlay = function (gameType) {
        var _this = this;
        this.PreLoadSkinRes(function () {
            ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireGameUIPanel.key, {
                gameType: gameType,
                resume: false,
                vegas: SolitaireLogic_1.SolitaireLogic.dataCache.vegasModeBV.v,
                card3: SolitaireLogic_1.SolitaireLogic.dataCache.cards3ModeBV.v,
            }, function () { return _this.Close(); });
        });
    };
    SolitaireMenuUIPanel.prototype.OnOptions = function () {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireOptionsUIPanel.key);
    };
    //#endregion
    // 预加载皮肤资源（可能因为选择皮肤，导致界面变化？）
    SolitaireMenuUIPanel.prototype.PreLoadSkinRes = function (onCompleted) {
        if (SolitaireLogic_1.SolitaireLogic.skin.IsInitSkinChanged()) {
            this.LoadResList(__spreadArrays(SolitaireLogic_1.SolitaireLogic.skin.GetPreloadResList()), onCompleted);
        }
        else {
            onCompleted();
        }
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireMenuUIPanel.prototype, "_playActionNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireMenuUIPanel.prototype, "_toggleActionNode", void 0);
    __decorate([
        property({ type: MenuResumeItem, visible: true })
    ], SolitaireMenuUIPanel.prototype, "_resumeNodeList", void 0);
    SolitaireMenuUIPanel = __decorate([
        ccclass
    ], SolitaireMenuUIPanel);
    return SolitaireMenuUIPanel;
}(ii.UIPanel));
exports.default = SolitaireMenuUIPanel;

cc._RF.pop();