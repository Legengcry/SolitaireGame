"use strict";
cc._RF.push(module, '8b900dHdoZFrJZVKhkkhvCx', 'SolitaireThemesSelfSkinUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinUI.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesSelfSkinUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesSelfSkinUI, _super);
    function SolitaireThemesSelfSkinUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._Layout = null;
        _this._unlockRoot = null;
        _this._topBlocker = null;
        _this.m_ItemList = [];
        return _this;
    }
    SolitaireThemesSelfSkinUI.prototype.OnCreate = function () { };
    SolitaireThemesSelfSkinUI.prototype.OnRelease = function () { };
    SolitaireThemesSelfSkinUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnUnlock", this.OnUnlock.bind(this));
        SolitaireLogic_1.SolitaireLogic.skin.SkinList.forEach(function (skin, index) {
            _this.__CreateSkin(skin, index);
        });
        this._unlockRoot.active = !SolitaireLogic_1.SolitaireLogic.skin.IsMaxSkinLength;
        cc.tween(this._topBlocker)
            .delay(0.3)
            .to(0.3, { opacity: 0 })
            .set({ active: false, opacity: 255 })
            .start();
    };
    SolitaireThemesSelfSkinUI.prototype.__CreateSkin = function (skin, index) {
        this.m_ItemList.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesSelfSkinItemUI.key, {
            skin: skin,
            index: index,
            OnClickEdit: this.args.OnClickEdit
        }, this._Layout.node).CloseBy(this));
    };
    SolitaireThemesSelfSkinUI.prototype.OnUnlock = function () {
        var _this = this;
        // 点击增加一个自定义皮肤按钮
        SolitaireLogic_1.SolitaireLogic.WatchToExtendSkinList(function (index) {
            _this.__CreateSkin(SolitaireLogic_1.SolitaireLogic.skin.GetSkin(index), index);
            _this._unlockRoot.active = !SolitaireLogic_1.SolitaireLogic.skin.IsMaxSkinLength;
        });
    };
    SolitaireThemesSelfSkinUI.prototype.RefreshUI = function (index, skin) {
        this.m_ItemList[index].RefreshUI(skin);
    };
    __decorate([
        property({ type: cc.Layout, visible: true })
    ], SolitaireThemesSelfSkinUI.prototype, "_Layout", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesSelfSkinUI.prototype, "_unlockRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesSelfSkinUI.prototype, "_topBlocker", void 0);
    SolitaireThemesSelfSkinUI = __decorate([
        ccclass
    ], SolitaireThemesSelfSkinUI);
    return SolitaireThemesSelfSkinUI;
}(ii.UIComp));
exports.default = SolitaireThemesSelfSkinUI;

cc._RF.pop();