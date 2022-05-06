"use strict";
cc._RF.push(module, '0d732d9cqlPW6jHTUj14/kg', 'SolitaireOptionsUIPanel');
// GameBundles/Solitaire/Script/Options/SolitaireOptionsUIPanel.ts

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
var SolitaireLogic_1 = require("../Logic/SolitaireLogic");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var UISettingToggle_1 = require("../_Public/Component/UISettingToggle");
var SolitaireActionUIPanel_1 = require("../_Public/SolitaireActionUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireOptionsUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireOptionsUIPanel, _super);
    function SolitaireOptionsUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.musicToggle = null;
        _this.soundToggle = null;
        _this.vibrateToggle = null;
        _this.leftHandToggle = null;
        _this._removeAdsHourLabel = null;
        _this._removeAdsButton = null;
        _this.REMOVE_HOURS = 8;
        return _this;
    }
    SolitaireOptionsUIPanel.prototype.OnCreate = function () {
        _super.prototype.OnCreate.call(this);
        this.musicToggle.Init(!ii.AudioMgr.ins.musicOffBV.v, function (isOn) { return ii.AudioMgr.ins.musicOffBV.v = !isOn; });
        this.soundToggle.Init(!ii.AudioMgr.ins.effectOffBV.v, function (isOn) { return ii.AudioMgr.ins.effectOffBV.v = !isOn; });
        this.vibrateToggle.Init(!ii.App.ins.p.vibrate.off.v, function (isOn) {
            ii.App.ins.p.vibrate.off.v = !isOn;
            if (isOn) {
                ii.App.ins.p.vibrate.Default();
            }
        });
        this.leftHandToggle.Init(SolitaireLogic_1.SolitaireLogic.dataCache.leftHandBV.v, function (isOn) { return SolitaireLogic_1.SolitaireLogic.dataCache.leftHandBV.v = isOn; });
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnHowToPlay", this.OnHowToPlay.bind(this));
    };
    SolitaireOptionsUIPanel.prototype.OnEnter = function () { };
    SolitaireOptionsUIPanel.prototype.OnBack = function () {
        this.ExitWithAction(this.Close.bind(this), false);
    };
    SolitaireOptionsUIPanel.prototype.OnHowToPlay = function () {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireHowToPlayUIPanel.key);
        this.ExitWithAction(function () {
        }, true);
    };
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "musicToggle", void 0);
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "soundToggle", void 0);
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "vibrateToggle", void 0);
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "leftHandToggle", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireOptionsUIPanel.prototype, "_removeAdsHourLabel", void 0);
    __decorate([
        property({ type: cc.Button, visible: true })
    ], SolitaireOptionsUIPanel.prototype, "_removeAdsButton", void 0);
    SolitaireOptionsUIPanel = __decorate([
        ccclass
    ], SolitaireOptionsUIPanel);
    return SolitaireOptionsUIPanel;
}(SolitaireActionUIPanel_1.default));
exports.default = SolitaireOptionsUIPanel;

cc._RF.pop();