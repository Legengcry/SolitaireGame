
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ff92St4QdCZ5++3u9tocjD', 'UIThemeMenuContentPokerBack');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBack.ts

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
var UIThemeMenuContentPokerBack = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerBack, _super);
    function UIThemeMenuContentPokerBack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.m_itemArray = [];
        return _this;
    }
    UIThemeMenuContentPokerBack.prototype.OnCreate = function () { };
    UIThemeMenuContentPokerBack.prototype.OnRelease = function () { };
    UIThemeMenuContentPokerBack.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        var onClick = this.OnItemClick.bind(this);
        SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerBackKindCfg.forEach(function (kind) {
            _this.m_itemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBackKindItem.key, {
                kind: kind,
                onClick: onClick
            }, _this.scrollView.content).CloseBy(_this));
        });
        this.Select(this.args.backSkin);
    };
    UIThemeMenuContentPokerBack.prototype.OnItemClick = function (backSkin, item) {
        this.args.OnSelect(this, backSkin);
    };
    UIThemeMenuContentPokerBack.prototype.Select = function (backSkin) {
        ii.AudioMgr.ins.PlayEffect();
        this.m_itemArray.forEach(function (it) { return it.Select(backSkin); });
    };
    UIThemeMenuContentPokerBack.prototype.OnResetSkin = function (skin) { this.Select(skin.backSkin); };
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentPokerBack.prototype, "scrollView", void 0);
    UIThemeMenuContentPokerBack = __decorate([
        ccclass
    ], UIThemeMenuContentPokerBack);
    return UIThemeMenuContentPokerBack;
}(UIThemeMenuContent_1.default));
exports.default = UIThemeMenuContentPokerBack;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0REFBMkQ7QUFDM0Qsc0VBQXFGO0FBQ3JGLDJEQUFzRDtBQUloRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQVExQztJQUF5RCwrQ0FBbUQ7SUFBNUc7UUFBQSxxRUEyQkM7UUExQm9DLGdCQUFVLEdBQWtCLElBQUksQ0FBQTtRQUV6RCxpQkFBVyxHQUEwQyxFQUFFLENBQUE7O0lBd0JuRSxDQUFDO0lBdEJhLDhDQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsK0NBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQiw0Q0FBTSxHQUFoQixVQUFpQixNQUF1QztRQUF4RCxpQkFTQztRQVJHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLGlEQUF1QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBRSxVQUFBLElBQUk7WUFDbEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUErRSx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLEdBQUcsRUFBRTtnQkFDekwsSUFBSSxNQUFBO2dCQUNKLE9BQU8sU0FBQTthQUNWLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ08saURBQVcsR0FBbkIsVUFBb0IsUUFBd0IsRUFBRSxJQUE0QztRQUN0RixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDRDQUFNLEdBQU4sVUFBTyxRQUF3QjtRQUMzQixFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsaURBQVcsR0FBWCxVQUFZLElBQW1CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBekJ2QztRQUF4QixRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQzttRUFBeUM7SUFEaEQsMkJBQTJCO1FBRC9DLE9BQU87T0FDYSwyQkFBMkIsQ0EyQi9DO0lBQUQsa0NBQUM7Q0EzQkQsQUEyQkMsQ0EzQndELDRCQUFrQixHQTJCMUU7a0JBM0JvQiwyQkFBMkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVTa2luIH0gZnJvbSBcIi4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZywgVFBva2VyQmFja1NraW4gfSBmcm9tIFwiLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcbmltcG9ydCBVSVRoZW1lTWVudUNvbnRlbnQgZnJvbSBcIi4vVUlUaGVtZU1lbnVDb250ZW50XCI7XG5pbXBvcnQgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW0sIHsgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW1BcmdzIH0gZnJvbSBcIi4vVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW1cIjtcbmltcG9ydCBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbSBmcm9tIFwiLi9VSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IHR5cGUgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrQXJncyA9IHtcbiAgICBiYWNrU2tpbjogVFBva2VyQmFja1NraW4sXG4gICAgT25TZWxlY3QoY29udGVudDogVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrLCBiYWNrU2tpbjogVFBva2VyQmFja1NraW4pXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2sgZXh0ZW5kcyBVSVRoZW1lTWVudUNvbnRlbnQ8VUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrQXJncz4ge1xuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KSBwcml2YXRlIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsXG4gICAgXG4gICAgcHJpdmF0ZSBtX2l0ZW1BcnJheTogVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW1bXSA9IFtdXG4gICAgXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tBcmdzKTogdm9pZCB7XG4gICAgICAgIGxldCBvbkNsaWNrID0gdGhpcy5Pbkl0ZW1DbGljay5iaW5kKHRoaXMpO1xuICAgICAgICBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5wb2tlckJhY2tLaW5kQ2ZnLmZvckVhY2goIGtpbmQgPT4ge1xuICAgICAgICAgICAgdGhpcy5tX2l0ZW1BcnJheS5wdXNoKGlpLlVJTWdyLmlucy5DcmVhdGU8VUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW0sIFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRJdGVtQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRJdGVtLmtleSwge1xuICAgICAgICAgICAgICAgIGtpbmQsXG4gICAgICAgICAgICAgICAgb25DbGlja1xuICAgICAgICAgICAgfSwgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQpLkNsb3NlQnkodGhpcykpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLlNlbGVjdCh0aGlzLmFyZ3MuYmFja1NraW4pO1xuICAgIH1cbiAgICBwcml2YXRlIE9uSXRlbUNsaWNrKGJhY2tTa2luOiBUUG9rZXJCYWNrU2tpbiwgaXRlbTogVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZFN1Ykl0ZW0pIHtcbiAgICAgICAgdGhpcy5hcmdzLk9uU2VsZWN0KHRoaXMsIGJhY2tTa2luKTtcbiAgICB9XG5cbiAgICBTZWxlY3QoYmFja1NraW46IFRQb2tlckJhY2tTa2luKSB7XG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KCk7XG4gICAgICAgIHRoaXMubV9pdGVtQXJyYXkuZm9yRWFjaChpdCA9PiBpdC5TZWxlY3QoYmFja1NraW4pKVxuICAgIH1cblxuICAgIE9uUmVzZXRTa2luKHNraW46IFNvbGl0YWlyZVNraW4pIHsgdGhpcy5TZWxlY3Qoc2tpbi5iYWNrU2tpbik7IH1cbn1cbiJdfQ==