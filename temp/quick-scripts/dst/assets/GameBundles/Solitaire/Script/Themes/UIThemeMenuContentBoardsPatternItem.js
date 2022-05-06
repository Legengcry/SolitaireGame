
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoardsPatternItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUFxRTtBQUUvRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQVExQztJQUFpRSx1REFBa0Q7SUFBbkg7UUFBQSxxRUFzQkM7UUFyQmtDLGNBQVEsR0FBYyxJQUFJLENBQUE7UUFDNUIsbUJBQWEsR0FBWSxJQUFJLENBQUE7O0lBb0I5RCxDQUFDO0lBbEJhLHNEQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsdURBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQixvREFBTSxHQUFoQixVQUFpQixNQUErQztRQUFoRSxpQkFNQztRQUxHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBaUIsaURBQXVCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFBLEVBQUUsSUFBRSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBeEUsQ0FBd0UsRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUN2TDtJQUNMLENBQUM7SUFFTyx5REFBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELG9EQUFNLEdBQU4sVUFBTyxhQUFxQjtRQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLENBQUM7SUFDekUsQ0FBQztJQXBCb0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eUVBQXFDO0lBQ3RDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhFQUF3QztJQUZ6QyxtQ0FBbUM7UUFEdkQsT0FBTztPQUNhLG1DQUFtQyxDQXNCdkQ7SUFBRCwwQ0FBQztDQXRCRCxBQXNCQyxDQXRCZ0UsRUFBRSxDQUFDLE1BQU0sR0FzQnpFO2tCQXRCb0IsbUNBQW1DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCB0eXBlIFVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtQXJncyA9IHtcbiAgICBiZ1BhdHRlcm5Ta2luOiBudW1iZXIsXG4gICAgT25TZWxlY3Q6IChiZ1BhdHRlcm5Ta2luOiBudW1iZXIpPT52b2lkXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNQYXR0ZXJuSXRlbSBleHRlbmRzIGlpLlVJQ29tcDxVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNQYXR0ZXJuSXRlbUFyZ3M+IHtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKSBwcm90ZWN0ZWQgYmdTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHJvdGVjdGVkIGhpZ2hMaWdodE5vZGU6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IFVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25DbGlja1wiLCB0aGlzLk9uSXRlbUNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmhpZ2hMaWdodE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMuYXJncy5iZ1BhdHRlcm5Ta2luID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuTG9hZFJlczxjYy5TcHJpdGVGcmFtZT4oU29saXRhaXJlU3ByaXRlRnJhbWVDZmcuYmdQYXR0ZXJuU2tpblVybCh0aGlzLmFyZ3MuYmdQYXR0ZXJuU2tpbiksIHNwPT50aGlzLmJnU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TZXRBc3NldFByb3BlcnR5KFwiQkdfUEFUVEVSTl9TS0lOXCIsIHNwKSwgZmFsc2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIE9uSXRlbUNsaWNrKCkge1xuICAgICAgICB0aGlzLmFyZ3MuT25TZWxlY3QodGhpcy5hcmdzLmJnUGF0dGVyblNraW4pO1xuICAgIH1cblxuXG4gICAgU2VsZWN0KGJnUGF0dGVyblNraW46IG51bWJlcikge1xuICAgICAgICB0aGlzLmhpZ2hMaWdodE5vZGUuYWN0aXZlID0gdGhpcy5hcmdzLmJnUGF0dGVyblNraW4gPT0gYmdQYXR0ZXJuU2tpbjtcbiAgICB9XG59XG4iXX0=