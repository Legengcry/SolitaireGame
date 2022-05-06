"use strict";
cc._RF.push(module, '5dfbcV4bhNGLpJxnIF2s9AS', 'UIThemeMenuContentPokerBackKindSubItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBackKindSubItem.ts

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
var UIThemeMenuContentPokerBackKindSubItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerBackKindSubItem, _super);
    function UIThemeMenuContentPokerBackKindSubItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.highLightNode = null;
        _this.lockAvailableNode = null;
        _this.lockLockedNode = null;
        _this.mui_DotSprite = null;
        return _this;
    }
    UIThemeMenuContentPokerBackKindSubItem.prototype.OnCreate = function () { };
    UIThemeMenuContentPokerBackKindSubItem.prototype.OnRelease = function () { };
    UIThemeMenuContentPokerBackKindSubItem.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.lockAvailableNode.active = false;
        this.lockLockedNode.active = false;
        this.mui_DotSprite.node.active = false;
        this.highLightNode.active = false;
        this.SetIIClickHandler("OnClick", this.OnClick.bind(this));
        this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerBackUrl(this.args.backSkin), function (sp) { return _this.bgSprite.spriteFrame = _this.SetAssetProperty("BACK_SKIN", sp); }, false);
    };
    UIThemeMenuContentPokerBackKindSubItem.prototype.OnClick = function () {
        this.args.onClick(this.args.backSkin, this);
    };
    UIThemeMenuContentPokerBackKindSubItem.prototype.Select = function (selectedSkin) {
        this.highLightNode.active = this.args.backSkin.kind == selectedSkin.kind && this.args.backSkin.index == selectedSkin.index;
    };
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuContentPokerBackKindSubItem.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentPokerBackKindSubItem.prototype, "highLightNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentPokerBackKindSubItem.prototype, "lockAvailableNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentPokerBackKindSubItem.prototype, "lockLockedNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuContentPokerBackKindSubItem.prototype, "mui_DotSprite", void 0);
    __decorate([
        ii.Util.block(0.5)
    ], UIThemeMenuContentPokerBackKindSubItem.prototype, "OnClick", null);
    UIThemeMenuContentPokerBackKindSubItem = __decorate([
        ccclass
    ], UIThemeMenuContentPokerBackKindSubItem);
    return UIThemeMenuContentPokerBackKindSubItem;
}(ii.UIComp));
exports.default = UIThemeMenuContentPokerBackKindSubItem;

cc._RF.pop();