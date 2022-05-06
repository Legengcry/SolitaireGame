"use strict";
cc._RF.push(module, '42cb7Uh8+BJGryKJhs8QZDy', 'UISettingToggle');
// GameBundles/Solitaire/Script/_Public/Component/UISettingToggle.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UISettingToggle = /** @class */ (function (_super) {
    __extends(UISettingToggle, _super);
    function UISettingToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSprite = null;
        _this.offSprite = null;
        _this.toggleSprite = null;
        _this.m_onToggleCallback = null;
        _this.m_isOn = false;
        _this.m_IsBlockInput = false;
        _this.m_Scheduler = null;
        return _this;
    }
    UISettingToggle.prototype.Init = function (isOn, onToggleCallback) {
        this.m_isOn = isOn;
        this.m_onToggleCallback = onToggleCallback;
        this.toggleSprite.node.position = this.getTogglePositionByStatus(!this.m_isOn);
        this.toggleAction(this.m_isOn);
    };
    UISettingToggle.prototype.getTogglePositionByStatus = function (isOn) {
        return isOn ? cc.v3(20, this.toggleSprite.node.y, 0) : cc.v3(-24, this.toggleSprite.node.y, 0);
    };
    UISettingToggle.prototype.toggleAction = function (isOn) {
        var _this = this;
        var togglePosition = this.getTogglePositionByStatus(isOn);
        cc.tween(this.toggleSprite.node)
            .to(0.2, { position: togglePosition })
            .start();
        this.__StopScheduler();
        var targetRange = isOn ? 1 : 0;
        var sr = isOn ? 0 : 1;
        var dr = (targetRange - sr) / (60 * 0.2);
        this.m_Scheduler = function () {
            _this.onSprite.getComponent(cc.Sprite).fillRange = sr;
            sr += dr;
            if (sr > 1 || sr < 0) {
                _this.__StopScheduler();
            }
        };
        this.schedule(this.m_Scheduler);
    };
    UISettingToggle.prototype.__StopScheduler = function () {
        if (this.m_Scheduler) {
            this.unschedule(this.m_Scheduler);
            this.m_Scheduler = null;
        }
    };
    UISettingToggle.prototype.OnClick = function () {
        if (this.m_IsBlockInput) {
            return;
        }
        ii.AudioMgr.ins.PlayEffect();
        this.m_isOn = !this.m_isOn;
        this.toggleAction(this.m_isOn);
        if (this.m_onToggleCallback) {
            this.m_onToggleCallback(this.m_isOn);
        }
    };
    UISettingToggle.prototype.SetBlockInput = function (block) {
        this.m_IsBlockInput = block;
    };
    UISettingToggle.prototype.SyncUI = function (isOn) {
        if (isOn == this.m_isOn) {
            return;
        }
        this.m_isOn = isOn;
        this.toggleSprite.node.position = this.getTogglePositionByStatus(!this.m_isOn);
        this.toggleAction(isOn);
    };
    __decorate([
        property(cc.Sprite)
    ], UISettingToggle.prototype, "onSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], UISettingToggle.prototype, "offSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], UISettingToggle.prototype, "toggleSprite", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], UISettingToggle.prototype, "OnClick", null);
    UISettingToggle = __decorate([
        ccclass
    ], UISettingToggle);
    return UISettingToggle;
}(cc.Component));
exports.default = UISettingToggle;

cc._RF.pop();