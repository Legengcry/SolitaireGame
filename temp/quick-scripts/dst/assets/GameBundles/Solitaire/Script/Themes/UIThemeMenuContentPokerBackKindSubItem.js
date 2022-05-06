
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBackKindSubItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRTdWJJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUFxRjtBQUUvRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQU0xQztJQUFvRSwwREFBcUQ7SUFBekg7UUFBQSxxRUEwQkM7UUF6QmtDLGNBQVEsR0FBYyxJQUFJLENBQUE7UUFDNUIsbUJBQWEsR0FBWSxJQUFJLENBQUE7UUFDN0IsdUJBQWlCLEdBQVksSUFBSSxDQUFBO1FBQ2pDLG9CQUFjLEdBQVksSUFBSSxDQUFBO1FBQzVCLG1CQUFhLEdBQWMsSUFBSSxDQUFBOztJQXFCbEUsQ0FBQztJQW5CYSx5REFBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLDBEQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsdURBQU0sR0FBaEIsVUFBaUIsTUFBa0Q7UUFBbkUsaUJBT0M7UUFORyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQWlCLGlEQUF1QixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQUEsRUFBRSxJQUFFLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBbEUsQ0FBa0UsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxSyxDQUFDO0lBR08sd0RBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx1REFBTSxHQUFOLFVBQU8sWUFBNEI7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDL0gsQ0FBQztJQXhCb0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NEVBQXFDO0lBQ3RDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lGQUF3QztJQUN2QztRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxRkFBNEM7SUFDM0M7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0ZBQXlDO0lBQ3RDO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lGQUEwQztJQWM5RDtRQURDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzt5RUFHbEI7SUFyQmdCLHNDQUFzQztRQUQxRCxPQUFPO09BQ2Esc0NBQXNDLENBMEIxRDtJQUFELDZDQUFDO0NBMUJELEFBMEJDLENBMUJtRSxFQUFFLENBQUMsTUFBTSxHQTBCNUU7a0JBMUJvQixzQ0FBc0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZywgVFBva2VyQmFja1NraW4gfSBmcm9tIFwiLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5leHBvcnQgdHlwZSBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbUFyZ3MgPSB7XG4gICAgYmFja1NraW46IFRQb2tlckJhY2tTa2luXG4gICAgb25DbGljazogKGtpbmQ6IFRQb2tlckJhY2tTa2luLCBpdGVtOiBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbSkgPT4gdm9pZFxufTtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbSBleHRlbmRzIGlpLlVJQ29tcDxVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbUFyZ3M+IHtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKSBwcm90ZWN0ZWQgYmdTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHJvdGVjdGVkIGhpZ2hMaWdodE5vZGU6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByb3RlY3RlZCBsb2NrQXZhaWxhYmxlTm9kZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHJvdGVjdGVkIGxvY2tMb2NrZWROb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpIHByb3RlY3RlZCBtdWlfRG90U3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRTdWJJdGVtQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2tBdmFpbGFibGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2tMb2NrZWROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm11aV9Eb3RTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25DbGlja1wiLCB0aGlzLk9uQ2xpY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuTG9hZFJlczxjYy5TcHJpdGVGcmFtZT4oU29saXRhaXJlU3ByaXRlRnJhbWVDZmcucG9rZXJCYWNrVXJsKHRoaXMuYXJncy5iYWNrU2tpbiksIHNwPT50aGlzLmJnU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TZXRBc3NldFByb3BlcnR5KFwiQkFDS19TS0lOXCIsIHNwKSwgZmFsc2UpO1xuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuNSlcbiAgICBwcml2YXRlIE9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuYXJncy5vbkNsaWNrKHRoaXMuYXJncy5iYWNrU2tpbiwgdGhpcyk7XG4gICAgfVxuXG4gICAgU2VsZWN0KHNlbGVjdGVkU2tpbjogVFBva2VyQmFja1NraW4pIHtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHROb2RlLmFjdGl2ZSA9IHRoaXMuYXJncy5iYWNrU2tpbi5raW5kID09IHNlbGVjdGVkU2tpbi5raW5kICYmIHRoaXMuYXJncy5iYWNrU2tpbi5pbmRleCA9PSBzZWxlY3RlZFNraW4uaW5kZXg7XG4gICAgfVxufSJdfQ==