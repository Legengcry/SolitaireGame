"use strict";
cc._RF.push(module, '8385cIfhA1O4pSwQ+ezNkc5', 'UIThemeMenuContentBoardsPatternItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoardsPatternItem.ts

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
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentBoardsPatternItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentBoardsPatternItem, _super);
    function UIThemeMenuContentBoardsPatternItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.highLightNode = null;
        return _this;
    }
    UIThemeMenuContentBoardsPatternItem.prototype.OnCreate = function () { };
    UIThemeMenuContentBoardsPatternItem.prototype.OnRelease = function () { };
    UIThemeMenuContentBoardsPatternItem.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        this.highLightNode.active = false;
        if (this.args.bgPatternSkin >= 0) {
            this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinUrl(this.args.bgPatternSkin), function (sp) { return _this.bgSprite.spriteFrame = _this.SetAssetProperty("BG_PATTERN_SKIN", sp); }, false);
        }
    };
    UIThemeMenuContentBoardsPatternItem.prototype.OnItemClick = function () {
        this.args.OnSelect(this.args.bgPatternSkin);
    };
    UIThemeMenuContentBoardsPatternItem.prototype.Select = function (bgPatternSkin) {
        this.highLightNode.active = this.args.bgPatternSkin == bgPatternSkin;
    };
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuContentBoardsPatternItem.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentBoardsPatternItem.prototype, "highLightNode", void 0);
    UIThemeMenuContentBoardsPatternItem = __decorate([
        ccclass
    ], UIThemeMenuContentBoardsPatternItem);
    return UIThemeMenuContentBoardsPatternItem;
}(ii.UIComp));
exports.default = UIThemeMenuContentBoardsPatternItem;

cc._RF.pop();