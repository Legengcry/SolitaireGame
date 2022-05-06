
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoardsBackgroundColorItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '893caaEDJZM2qZxua4mfN3M', 'UIThemeMenuContentBoardsBackgroundColorItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoardsBackgroundColorItem.ts

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
var UIThemeMenuContentBoardsBackgroundColorItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentBoardsBackgroundColorItem, _super);
    function UIThemeMenuContentBoardsBackgroundColorItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.highLightNode = null;
        return _this;
    }
    UIThemeMenuContentBoardsBackgroundColorItem.prototype.OnCreate = function () { };
    UIThemeMenuContentBoardsBackgroundColorItem.prototype.OnRelease = function () { };
    UIThemeMenuContentBoardsBackgroundColorItem.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        this.highLightNode.active = false;
        this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinUrl(this.args.bgSkin), function (sp) { return _this.bgSprite.spriteFrame = _this.SetAssetProperty("BG_SKIN", sp); }, false);
    };
    UIThemeMenuContentBoardsBackgroundColorItem.prototype.OnItemClick = function () {
        this.args.OnSelect(this.args.bgSkin);
    };
    UIThemeMenuContentBoardsBackgroundColorItem.prototype.Select = function (bgSkin) {
        this.highLightNode.active = this.args.bgSkin == bgSkin;
    };
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuContentBoardsBackgroundColorItem.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentBoardsBackgroundColorItem.prototype, "highLightNode", void 0);
    UIThemeMenuContentBoardsBackgroundColorItem = __decorate([
        ccclass
    ], UIThemeMenuContentBoardsBackgroundColorItem);
    return UIThemeMenuContentBoardsBackgroundColorItem;
}(ii.UIComp));
exports.default = UIThemeMenuContentBoardsBackgroundColorItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudEJvYXJkc0JhY2tncm91bmRDb2xvckl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQXFFO0FBRS9ELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBUTFDO0lBQXlFLCtEQUEwRDtJQUFuSTtRQUFBLHFFQW1CQztRQWxCa0MsY0FBUSxHQUFjLElBQUksQ0FBQTtRQUM1QixtQkFBYSxHQUFZLElBQUksQ0FBQTs7SUFpQjlELENBQUM7SUFmYSw4REFBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLCtEQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsNERBQU0sR0FBaEIsVUFBaUIsTUFBdUQ7UUFBeEUsaUJBSUM7UUFIRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQWlCLGlEQUF1QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQUEsRUFBRSxJQUFFLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBaEUsQ0FBZ0UsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNsSyxDQUFDO0lBRU8saUVBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCw0REFBTSxHQUFOLFVBQU8sTUFBYztRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFDM0QsQ0FBQztJQWpCb0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUZBQXFDO0lBQ3RDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NGQUF3QztJQUZ6QywyQ0FBMkM7UUFEL0QsT0FBTztPQUNhLDJDQUEyQyxDQW1CL0Q7SUFBRCxrREFBQztDQW5CRCxBQW1CQyxDQW5Cd0UsRUFBRSxDQUFDLE1BQU0sR0FtQmpGO2tCQW5Cb0IsMkNBQTJDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCB0eXBlIFVJVGhlbWVNZW51Q29udGVudEJvYXJkc0JhY2tncm91bmRDb2xvckl0ZW1BcmdzID0ge1xuICAgIGJnU2tpbjogbnVtYmVyLFxuICAgIE9uU2VsZWN0OiAoYmdTa2luOiBudW1iZXIpPT52b2lkXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNCYWNrZ3JvdW5kQ29sb3JJdGVtIGV4dGVuZHMgaWkuVUlDb21wPFVJVGhlbWVNZW51Q29udGVudEJvYXJkc0JhY2tncm91bmRDb2xvckl0ZW1BcmdzPiB7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSkgcHJvdGVjdGVkIGJnU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByb3RlY3RlZCBoaWdoTGlnaHROb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIFxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQmFja2dyb3VuZENvbG9ySXRlbUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uQ2xpY2tcIiwgdGhpcy5Pbkl0ZW1DbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkxvYWRSZXM8Y2MuU3ByaXRlRnJhbWU+KFNvbGl0YWlyZVNwcml0ZUZyYW1lQ2ZnLmJnU2tpblVybCh0aGlzLmFyZ3MuYmdTa2luKSwgc3A9PnRoaXMuYmdTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNldEFzc2V0UHJvcGVydHkoXCJCR19TS0lOXCIsIHNwKSwgZmFsc2UpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPbkl0ZW1DbGljaygpIHtcbiAgICAgICAgdGhpcy5hcmdzLk9uU2VsZWN0KHRoaXMuYXJncy5iZ1NraW4pO1xuICAgIH1cblxuICAgIFNlbGVjdChiZ1NraW46IG51bWJlcikge1xuICAgICAgICB0aGlzLmhpZ2hMaWdodE5vZGUuYWN0aXZlID0gdGhpcy5hcmdzLmJnU2tpbiA9PSBiZ1NraW47XG4gICAgfVxufVxuIl19