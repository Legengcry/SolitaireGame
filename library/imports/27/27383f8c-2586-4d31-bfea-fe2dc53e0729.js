"use strict";
cc._RF.push(module, '27383+MJYZNMb/q/i3FPgcp', 'SolitaireThemesSelfSkinItemUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinItemUI.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesSelfSkinItemUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesSelfSkinItemUI, _super);
    function SolitaireThemesSelfSkinItemUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._content = null;
        _this._titleLabel = null;
        _this._toggle = null;
        _this.m_Effect = null;
        return _this;
    }
    SolitaireThemesSelfSkinItemUI.prototype.OnCreate = function () { };
    SolitaireThemesSelfSkinItemUI.prototype.OnRelease = function () { };
    SolitaireThemesSelfSkinItemUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnEdit", this.OnClickEdit.bind(this));
        this._titleLabel.string = "" + (this.args.index === 0 ? "Default Theme" : "Theme - " + this.args.index);
        this._toggle.Init(this.args.index === SolitaireLogic_1.SolitaireLogic.skin.skinIndexBV.v, function (isOn) {
            SolitaireLogic_1.SolitaireLogic.skin.SelectSkinIndex(_this.args.index);
        });
        this.BindBV(SolitaireLogic_1.SolitaireLogic.skin.skinIndexBV, function (skinIndex) {
            _this._toggle.SyncUI(_this.args.index === skinIndex);
            _this._toggle.SetBlockInput(_this.args.index === skinIndex);
        }, true);
        this.m_Effect = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectUI.key, {
            skin: this.args.skin
        }, this._content).CloseBy(this);
    };
    SolitaireThemesSelfSkinItemUI.prototype.OnClickEdit = function () {
        this.args.OnClickEdit(this.args.index);
    };
    SolitaireThemesSelfSkinItemUI.prototype.RefreshUI = function (skin) {
        this.args.skin = skin;
        this.m_Effect.SetSkin(skin);
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesSelfSkinItemUI.prototype, "_content", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireThemesSelfSkinItemUI.prototype, "_titleLabel", void 0);
    __decorate([
        property({ type: UISettingToggle_1.default, visible: true })
    ], SolitaireThemesSelfSkinItemUI.prototype, "_toggle", void 0);
    SolitaireThemesSelfSkinItemUI = __decorate([
        ccclass
    ], SolitaireThemesSelfSkinItemUI);
    return SolitaireThemesSelfSkinItemUI;
}(ii.UIComp));
exports.default = SolitaireThemesSelfSkinItemUI;

cc._RF.pop();