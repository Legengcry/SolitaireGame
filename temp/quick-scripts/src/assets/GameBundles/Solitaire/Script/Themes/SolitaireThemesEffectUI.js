"use strict";
cc._RF.push(module, 'fff88GUhhxMb5VvjzvISTlq', 'SolitaireThemesEffectUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectUI.ts

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
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesEffectUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesEffectUI, _super);
    function SolitaireThemesEffectUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.bgPatternSprite = null;
        _this.columnsRoot = null;
        _this._offsetRoot = null;
        _this.m_Columns = [];
        _this.ColumnCfg = [
            { receive: [], play: [
                    { suit: SolitaireEnums_1.ESuit.MEIHUA, point: 13, status: SolitaireEnums_1.EPokerStatus.OPEN }
                ] },
            { receive: [{ suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.OPEN }], play: [
                    { suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.CLOSE },
                    { suit: SolitaireEnums_1.ESuit.FANGKUAI, point: 12, status: SolitaireEnums_1.EPokerStatus.OPEN }
                ] },
            { receive: [{ suit: SolitaireEnums_1.ESuit.HONGXIN, point: 13, status: SolitaireEnums_1.EPokerStatus.OPEN }], play: [
                    { suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.CLOSE },
                    { suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.CLOSE },
                    { suit: SolitaireEnums_1.ESuit.HEITAO, point: 11, status: SolitaireEnums_1.EPokerStatus.OPEN }
                ] }
        ];
        return _this;
    }
    SolitaireThemesEffectUI.prototype.OnCreate = function () { };
    SolitaireThemesEffectUI.prototype.OnRelease = function () { };
    SolitaireThemesEffectUI.prototype.OnOpen = function (uiArgs) {
        if (this.args.offset != null) {
            this._offsetRoot.position = cc.v3(this.args.offset.x, this.args.offset.y);
        }
        var COLUMN_CNT = this.ColumnCfg.length;
        for (var i = 0; i < COLUMN_CNT; ++i) {
            this.m_Columns.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectColumnUI.key, {
                x: (i - (COLUMN_CNT - 1) * 0.5) * 114,
                receive: this.ColumnCfg[i].receive,
                play: this.ColumnCfg[i].play,
            }, this.columnsRoot).CloseBy(this));
        }
        this.SetSkin(this.args.skin);
    };
    SolitaireThemesEffectUI.prototype.SetSkin = function (skin) {
        var _this = this;
        this.m_Columns.forEach(function (column) { return column.SetSkin(skin); });
        this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin), function (sp) {
            _this.bgSprite.spriteFrame = _this.SetAssetProperty("BG_SKIN", sp);
        }, false, this.UUID_GROUP_KEY("BG_SKIN"));
        this.bgPatternSprite.node.active = skin.bgPatternSkin !== -1;
        if (skin.bgPatternSkin >= 0) {
            this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinUrl(skin.bgPatternSkin), function (sp) { return _this.bgPatternSprite.spriteFrame = _this.SetAssetProperty("BG_PATTERN_SKIN", sp); }, false, this.UUID_GROUP_KEY("BG_PATTERN_SKIN"));
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SolitaireThemesEffectUI.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SolitaireThemesEffectUI.prototype, "bgPatternSprite", void 0);
    __decorate([
        property(cc.Node)
    ], SolitaireThemesEffectUI.prototype, "columnsRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesEffectUI.prototype, "_offsetRoot", void 0);
    SolitaireThemesEffectUI = __decorate([
        ccclass
    ], SolitaireThemesEffectUI);
    return SolitaireThemesEffectUI;
}(ii.UIComp));
exports.default = SolitaireThemesEffectUI;

cc._RF.pop();