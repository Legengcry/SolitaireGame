"use strict";
cc._RF.push(module, '5ab378/wUJAGaN0vEabYzKV', 'UIThemeMenuContentBoards');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoards.ts

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
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var UIThemeMenuContent_1 = require("./UIThemeMenuContent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentBoards = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentBoards, _super);
    function UIThemeMenuContentBoards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSkinScrollView = null;
        _this.bgPatternSkinScrollView = null;
        _this.m_bgSkinItemArray = [];
        _this.m_bgPatternSkinItemArray = [];
        return _this;
    }
    UIThemeMenuContentBoards.prototype.OnCreate = function () { };
    UIThemeMenuContentBoards.prototype.OnRelease = function () { };
    UIThemeMenuContentBoards.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        for (var bgSkin = 0; bgSkin < SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinLength; ++bgSkin) {
            this.m_bgSkinItemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoardsBackgroundColorItem.key, {
                bgSkin: bgSkin,
                OnSelect: function (bgSkin) { return _this.args.OnSelectBG(_this, bgSkin); }
            }, this.bgSkinScrollView.content).CloseBy(this));
        }
        this.SelectBG(this.args.bgSkin);
        for (var bgPatternSkin = -1; bgPatternSkin < SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinLength; ++bgPatternSkin) {
            this.m_bgPatternSkinItemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoardsPatternItem.key, {
                bgPatternSkin: bgPatternSkin,
                OnSelect: function (bgPatternSkin) { return _this.args.OnSelectBGPattern(_this, bgPatternSkin); }
            }, this.bgPatternSkinScrollView.content).CloseBy(this));
        }
        this.SelectBG(this.args.bgSkin);
        this.SelectBGPattern(this.args.bgPatternSkin);
    };
    UIThemeMenuContentBoards.prototype.SelectBG = function (bgSkin) {
        this.m_bgSkinItemArray.forEach(function (it) { return it.Select(bgSkin); });
    };
    UIThemeMenuContentBoards.prototype.OnResetSkin = function (skin) {
        this.SelectBG(skin.bgSkin);
        this.SelectBGPattern(skin.bgPatternSkin);
    };
    UIThemeMenuContentBoards.prototype.SelectBGPattern = function (bgPatternSkin) {
        this.m_bgPatternSkinItemArray.forEach(function (it) { return it.Select(bgPatternSkin); });
    };
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentBoards.prototype, "bgSkinScrollView", void 0);
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentBoards.prototype, "bgPatternSkinScrollView", void 0);
    UIThemeMenuContentBoards = __decorate([
        ccclass
    ], UIThemeMenuContentBoards);
    return UIThemeMenuContentBoards;
}(UIThemeMenuContent_1.default));
exports.default = UIThemeMenuContentBoards;

cc._RF.pop();