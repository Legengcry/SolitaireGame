"use strict";
cc._RF.push(module, '10393NCVe5IGIYmmSrR9x85', 'UIThemeMenuItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuItem.ts

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
var UIThemeMenuItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuItem, _super);
    function UIThemeMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this.dotSprite = null;
        _this.normalSpriteFrame = null;
        _this.selectedSpriteFrame = null;
        _this.index = 0;
        _this._selected = false;
        return _this;
    }
    UIThemeMenuItem.prototype.Init = function (selectedIndex, onClickCallback) {
        this.OnSelect(selectedIndex);
        this._onClickCallback = onClickCallback;
    };
    UIThemeMenuItem.prototype.OnClick = function (sender) {
        if (this._selected) {
            return;
        }
        ii.AudioMgr.ins.PlayEffect();
        if (this._onClickCallback) {
            this._onClickCallback(this.index);
        }
    };
    UIThemeMenuItem.prototype.OnSelect = function (selectedIndex) {
        var selected = this.index == selectedIndex;
        if (this._selected == selected) {
            return;
        }
        this._selected = selected;
        this.sprite.spriteFrame = this._selected ? this.selectedSpriteFrame : this.normalSpriteFrame;
    };
    UIThemeMenuItem.prototype.ShowDot = function (isShow) { this.dotSprite.node.active = isShow; };
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuItem.prototype, "sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuItem.prototype, "dotSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIThemeMenuItem.prototype, "normalSpriteFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIThemeMenuItem.prototype, "selectedSpriteFrame", void 0);
    __decorate([
        property
    ], UIThemeMenuItem.prototype, "index", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], UIThemeMenuItem.prototype, "OnClick", null);
    UIThemeMenuItem = __decorate([
        ccclass
    ], UIThemeMenuItem);
    return UIThemeMenuItem;
}(cc.Component));
exports.default = UIThemeMenuItem;

cc._RF.pop();