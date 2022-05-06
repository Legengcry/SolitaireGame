
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXFDQztRQXBDZ0MsWUFBTSxHQUFjLElBQUksQ0FBQTtRQUN4QixlQUFTLEdBQWMsSUFBSSxDQUFBO1FBQ3RCLHVCQUFpQixHQUFtQixJQUFJLENBQUE7UUFDeEMseUJBQW1CLEdBQW1CLElBQUksQ0FBQTtRQUMxRCxXQUFLLEdBQVcsQ0FBQyxDQUFBO1FBRTNCLGVBQVMsR0FBWSxLQUFLLENBQUE7O0lBOEJ0QyxDQUFDO0lBM0JHLDhCQUFJLEdBQUosVUFBSyxhQUFxQixFQUFFLGVBQXNDO1FBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtJQUMzQyxDQUFDO0lBR08saUNBQU8sR0FBZixVQUFnQixNQUFNO1FBQ2xCLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUNkLE9BQU07U0FDVDtRQUVELEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQzVCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDcEM7SUFDTCxDQUFDO0lBRUQsa0NBQVEsR0FBUixVQUFTLGFBQXFCO1FBQzFCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFBO1FBQzFDLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxRQUFRLEVBQUM7WUFDMUIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUE7SUFDaEcsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxNQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQSxDQUFDLENBQUM7SUFuQzNDO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUFpQztJQUNoQztRQUFwQixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFBb0M7SUFDOUI7UUFBekIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7OERBQWlEO0lBQ2hEO1FBQXpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dFQUFtRDtJQUNsRTtRQUFULFFBQVE7a0RBQTBCO0lBV25DO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2tEQVVsQjtJQXpCZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQXFDbkM7SUFBRCxzQkFBQztDQXJDRCxBQXFDQyxDQXJDNEMsRUFBRSxDQUFDLFNBQVMsR0FxQ3hEO2tCQXJDb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUaGVtZU1lbnVJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKSBwcml2YXRlIHNwcml0ZTogY2MuU3ByaXRlID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKSBwcml2YXRlIGRvdFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpIHByaXZhdGUgbm9ybWFsU3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpIHByaXZhdGUgc2VsZWN0ZWRTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsIFxuICAgIEBwcm9wZXJ0eSBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwIFxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgX29uQ2xpY2tDYWxsYmFjazogKGluZGV4OiBudW1iZXIpPT52b2lkXG5cbiAgICBJbml0KHNlbGVjdGVkSW5kZXg6IG51bWJlciwgb25DbGlja0NhbGxiYWNrOiAoaW5kZXg6IG51bWJlcik9PnZvaWQpIHtcbiAgICAgICAgdGhpcy5PblNlbGVjdChzZWxlY3RlZEluZGV4KVxuICAgICAgICB0aGlzLl9vbkNsaWNrQ2FsbGJhY2sgPSBvbkNsaWNrQ2FsbGJhY2tcbiAgICB9XG5cbiAgICBAaWkuVXRpbC5ibG9jaygwLjIpXG4gICAgcHJpdmF0ZSBPbkNsaWNrKHNlbmRlcikge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZCl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoKVxuICAgICAgICBpZih0aGlzLl9vbkNsaWNrQ2FsbGJhY2spe1xuICAgICAgICAgICAgdGhpcy5fb25DbGlja0NhbGxiYWNrKHRoaXMuaW5kZXgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBPblNlbGVjdChzZWxlY3RlZEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pbmRleCA9PSBzZWxlY3RlZEluZGV4XG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkID09IHNlbGVjdGVkKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLl9zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWRTcHJpdGVGcmFtZSA6IHRoaXMubm9ybWFsU3ByaXRlRnJhbWVcbiAgICB9XG5cbiAgICBTaG93RG90KGlzU2hvdzogYm9vbGVhbikgeyB0aGlzLmRvdFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGlzU2hvdyB9XG59XG4iXX0=