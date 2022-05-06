"use strict";
cc._RF.push(module, '9ec68YEO/tAN7BJ10qZeYol', 'SolitaireThemesContentsUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesContentsUI.ts

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
var UIThemeMenuItem_1 = require("./UIThemeMenuItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesContentsUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesContentsUI, _super);
    function SolitaireThemesContentsUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._resetRoot = null;
        _this._themeEffectRoot = null;
        _this.menuContentRoot = null;
        _this.menuItemList = [];
        _this.m_EffectUI = null;
        _this.m_menu = new Map();
        _this.m_selected = -1;
        _this.m_PreSkin = null;
        _this.m_Skin = null;
        _this.m_IsSkinChangedBV = null;
        return _this;
    }
    SolitaireThemesContentsUI.prototype.OnCreate = function () { };
    SolitaireThemesContentsUI.prototype.OnRelease = function () {
        this.__ReleaseMenu();
        this.m_selected = -1;
    };
    SolitaireThemesContentsUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnReset", this.OnReset.bind(this));
        this.SetIIClickHandler("OnRand", this.OnRand.bind(this));
        this.m_PreSkin = this.args.skin;
        this.m_Skin = SolitaireLogic_1.SolitaireLogic.skin.CloneSkin(this.args.skin);
        this.m_IsSkinChangedBV = ii.BooleanBV.Borrow(false).Bind(function (changed) { return _this._resetRoot.active = changed; }, true, this).ReturnBy(this);
        this.m_EffectUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectUI.key, { skin: this.m_Skin }, this._themeEffectRoot).CloseBy(this);
        this.menuItemList.forEach(function (menu) { return menu.Init(_this.m_selected, _this.OnClickMenu.bind(_this)); });
        this.Select(0);
    };
    SolitaireThemesContentsUI.prototype.__ReleaseMenu = function () {
        this.m_menu.forEach(function (menu) { return menu.Close(); });
        this.m_menu.clear();
    };
    SolitaireThemesContentsUI.prototype.Select = function (selectIndex) {
        if (selectIndex >= 0 && this.m_selected != selectIndex) {
            this.m_selected = selectIndex;
            this.menuItemList.forEach(function (menu) { return menu.OnSelect(selectIndex); });
            this.m_menu.forEach(function (menu) { return menu.node.active = false; });
            if (this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).node.active = true;
            }
            else {
                var content = null;
                switch (selectIndex) {
                    case 0:
                        content = this.__SelectContentPokerBack();
                        break;
                    case 1:
                        content = this.__SelectContentPokerFace();
                        break;
                    case 2:
                        content = this.__SelectContentBoards();
                        break;
                    default: break;
                }
                this.m_menu.set(selectIndex, content);
            }
        }
    };
    SolitaireThemesContentsUI.prototype.__SelectContentPokerBack = function () {
        var _this = this;
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBack.key, {
            backSkin: this.m_Skin.backSkin,
            OnSelect: function (content, backSkin) { return _this.OnSelectBackSkin(content, backSkin); }
        }, this.menuContentRoot);
    };
    SolitaireThemesContentsUI.prototype.__SelectContentPokerFace = function () {
        var _this = this;
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerFace.key, {
            faceSkin: this.m_Skin.faceSkin,
            OnSelect: function (content, faceSkin) { return _this.OnSelectFaceSkin(content, faceSkin); }
        }, this.menuContentRoot);
    };
    SolitaireThemesContentsUI.prototype.__SelectContentBoards = function () {
        var _this = this;
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoards.key, {
            bgSkin: this.m_Skin.bgSkin,
            bgPatternSkin: this.m_Skin.bgPatternSkin,
            OnSelectBG: function (content, bgSkin) { return _this.OnSelectBGSkin(content, bgSkin); },
            OnSelectBGPattern: function (content, bgPatternSkin) { return _this.OnSelectBGPatternSkin(content, bgPatternSkin); },
        }, this.menuContentRoot);
    };
    SolitaireThemesContentsUI.prototype.OnClickMenu = function (selectIndex) {
        ii.AudioMgr.ins.PlayEffect();
        this.Select(selectIndex);
    };
    SolitaireThemesContentsUI.prototype.OnBack = function () {
        if (this.m_IsSkinChangedBV.v) {
            this.args.OnSave(this.args.index, this.m_Skin);
        }
        this.args.OnBack();
    };
    SolitaireThemesContentsUI.prototype.OnReset = function () {
        this.m_Skin = SolitaireLogic_1.SolitaireLogic.skin.CloneSkin(this.m_PreSkin);
        this.m_EffectUI.SetSkin(this.m_Skin);
        for (var selectIndex = 0; selectIndex < 4; ++selectIndex) {
            if (this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).OnResetSkin(this.m_Skin);
            }
        }
    };
    SolitaireThemesContentsUI.prototype.OnRand = function () {
        SolitaireLogic_1.SolitaireLogic.skin.Random(this.m_Skin);
        this.m_EffectUI.SetSkin(this.m_Skin);
        for (var selectIndex = 0; selectIndex < 4; ++selectIndex) {
            if (this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).OnResetSkin(this.m_Skin);
            }
        }
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectBackSkin = function (content, backSkin) {
        this.m_Skin.backSkin.kind = backSkin.kind;
        this.m_Skin.backSkin.index = backSkin.index;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.Select(backSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectFaceSkin = function (content, faceSkin) {
        this.m_Skin.faceSkin = faceSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.Select(faceSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectBGSkin = function (content, bgSkin) {
        this.m_Skin.bgSkin = bgSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.SelectBG(bgSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectBGPatternSkin = function (content, bgPatternSkin) {
        this.m_Skin.bgPatternSkin = bgPatternSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.SelectBGPattern(bgPatternSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.ReculculateIsChangedValue = function () { this.m_IsSkinChangedBV.v = SolitaireLogic_1.SolitaireLogic.skin.IsSkinChanged(this.m_PreSkin, this.m_Skin); };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesContentsUI.prototype, "_resetRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesContentsUI.prototype, "_themeEffectRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesContentsUI.prototype, "menuContentRoot", void 0);
    __decorate([
        property({ type: [UIThemeMenuItem_1.default], visible: true })
    ], SolitaireThemesContentsUI.prototype, "menuItemList", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireThemesContentsUI.prototype, "OnClickMenu", null);
    SolitaireThemesContentsUI = __decorate([
        ccclass
    ], SolitaireThemesContentsUI);
    return SolitaireThemesContentsUI;
}(ii.UIComp));
exports.default = SolitaireThemesContentsUI;

cc._RF.pop();