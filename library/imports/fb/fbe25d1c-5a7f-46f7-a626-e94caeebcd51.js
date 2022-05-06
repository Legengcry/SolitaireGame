"use strict";
cc._RF.push(module, 'fbe250cWn9G96Ym6Uyu681R', 'SolitaireThemesUIPanel');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesUIPanel.ts

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
var SolitaireThemesUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireThemesUIPanel, _super);
    function SolitaireThemesUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ctnSelfList = null;
        _this._ctnContents = null;
        _this.m_SelfSkinUI = null;
        _this.m_ContentsUI = null;
        return _this;
    }
    SolitaireThemesUIPanel.prototype.__CloseContentsUI = function () {
        if (this.m_ContentsUI !== null) {
            this.m_ContentsUI.Close();
            this.m_ContentsUI = null;
        }
    };
    SolitaireThemesUIPanel.prototype.OnCreate = function () { };
    SolitaireThemesUIPanel.prototype.OnRelease = function () {
        this.__CloseContentsUI();
    };
    SolitaireThemesUIPanel.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.m_SelfSkinUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesSelfSkinUI.key, {
            OnClickEdit: function (index) { return _this.OnClickEdit(index); },
        }, this._ctnSelfList).CloseBy(this);
    };
    SolitaireThemesUIPanel.prototype.OnBack = function () {
        this.Close();
    };
    SolitaireThemesUIPanel.prototype.OnClickEdit = function (index) {
        var _this = this;
        this.m_ContentsUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesContentsUI.key, {
            index: index,
            skin: SolitaireLogic_1.SolitaireLogic.skin.CloneSkin(SolitaireLogic_1.SolitaireLogic.skin.GetSkin(index)),
            OnSave: function (index, skin) { return _this.OnSave(index, skin); },
            OnBack: function () { return _this.OnContentBack(); }
        }, this._ctnContents);
    };
    SolitaireThemesUIPanel.prototype.OnSave = function (index, skin) {
        SolitaireLogic_1.SolitaireLogic.skin.SaveSkin(index, skin);
        this.m_SelfSkinUI.RefreshUI(index, skin);
    };
    // 从 ContentsUI 界面点击返回按钮
    SolitaireThemesUIPanel.prototype.OnContentBack = function () {
        this.__CloseContentsUI();
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesUIPanel.prototype, "_ctnSelfList", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesUIPanel.prototype, "_ctnContents", void 0);
    __decorate([
        ii.Util.block(1)
    ], SolitaireThemesUIPanel.prototype, "OnBack", null);
    SolitaireThemesUIPanel = __decorate([
        ccclass
    ], SolitaireThemesUIPanel);
    return SolitaireThemesUIPanel;
}(ii.UIPanel));
exports.default = SolitaireThemesUIPanel;

cc._RF.pop();