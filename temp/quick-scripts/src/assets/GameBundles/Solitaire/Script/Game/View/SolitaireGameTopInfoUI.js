"use strict";
cc._RF.push(module, 'fc8a8ATiJpD0ZLEh2SxN5xZ', 'SolitaireGameTopInfoUI');
// GameBundles/Solitaire/Script/Game/View/SolitaireGameTopInfoUI.ts

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
var SolitaireEvent_1 = require("../../SolitaireEvent");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireGameTopInfoUI = /** @class */ (function (_super) {
    __extends(SolitaireGameTopInfoUI, _super);
    function SolitaireGameTopInfoUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scoreLabel = null;
        _this._timeLabel = null;
        _this._moveStepLabel = null;
        _this._effectLabel = null;
        _this._visiableNode = null;
        _this._bHideMenuUIBV = null;
        _this._bAutoCollecting = false;
        _this._bAutoPlaying = false;
        return _this;
    }
    SolitaireGameTopInfoUI.prototype.UpdateStatus = function () { this._bHideMenuUIBV.v = this._bAutoCollecting || this._bAutoPlaying; };
    SolitaireGameTopInfoUI.prototype.OnCreate = function () {
        this._effectLabel.node.active = false;
    };
    SolitaireGameTopInfoUI.prototype.OnRelease = function () { };
    SolitaireGameTopInfoUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.args.OnBack);
        this.SetIIClickHandler("OnOptions", function () { return ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireOptionsUIPanel.key); });
        this._bHideMenuUIBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this._bHideMenuUIBV.Bind(function (hide) { return _this._visiableNode.active = !hide; }, true, this);
    };
    Object.defineProperty(SolitaireGameTopInfoUI.prototype, "SolitaireJuEventTarget", {
        get: function () { return this.node; },
        enumerable: false,
        configurable: true
    });
    SolitaireGameTopInfoUI.prototype.OnSolitaireDesktopEvent = function (ju, eventTyp, data) {
        switch (eventTyp) {
            case SolitaireEvent_1.SolitaireEvent.SC_TIME_CHANGED:
                this.UpdateUITime(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB:
                this.SubScribModelEvents(ju);
                break;
        }
    };
    SolitaireGameTopInfoUI.prototype.UpdateUITime = function (tick) { this._timeLabel.string = ii.date.Format(tick, "mm:ss"); };
    SolitaireGameTopInfoUI.prototype.SubScribModelEvents = function (ju) {
        // 监听模型数据变化，更新当前页面所需的状态数据
        ju.scoreBV.Bind(this.OnScoreValueChanged.bind(this), false, this);
    };
    SolitaireGameTopInfoUI.prototype.OnScoreValueChanged = function (score, preScore) {
        var changed = score - preScore;
        this._effectLabel.string = "" + (changed > 0 ? "+" : "") + changed;
        this._effectLabel.node.active = true;
        cc.Tween.stopAllByTarget(this._effectLabel.node);
        this._effectLabel.node.position = cc.Vec3.ZERO;
        cc.tween(this._effectLabel.node)
            .by(1, { position: cc.v3(0, 30, 0) })
            .call(function (node) { return node.active = false; })
            .start();
    };
    SolitaireGameTopInfoUI.prototype.Enter = function (ju) {
        var _this = this;
        this._effectLabel.node.active = false;
        this.BindBV(ju.scoreBV, function (score) { return _this._scoreLabel.string = "" + score; }, true);
        this.BindBV(ju.isAutoPlayingBV, function (autoPlaying) {
            _this._bAutoPlaying = autoPlaying;
            _this.UpdateStatus();
        }, true);
        this.BindBV(ju.isAutoCollectingBV, function (autoCollecting) { _this._bAutoCollecting = autoCollecting; _this.UpdateStatus(); }, true);
        this.BindBV(ju.moveStepCountBV, function (step) { return _this._moveStepLabel.string = "" + step; }, true);
        ju.AddEventListener(this);
    };
    SolitaireGameTopInfoUI.prototype.Exit = function (ju) {
        ju.RemoveEventListener(this);
        this.UnbindAllBV();
    };
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_scoreLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_timeLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_moveStepLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_effectLabel", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_visiableNode", void 0);
    SolitaireGameTopInfoUI = __decorate([
        ccclass
    ], SolitaireGameTopInfoUI);
    return SolitaireGameTopInfoUI;
}(ii.UIComp));
exports.default = SolitaireGameTopInfoUI;

cc._RF.pop();