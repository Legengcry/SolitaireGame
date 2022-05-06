
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFace.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b43980deBtOTaa2aI86HDi2', 'UIThemeMenuContentPokerFace');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFace.ts

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
var SolitaireAutoAtlasCfg_1 = require("../SolitaireAutoAtlasCfg");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var UIThemeMenuContent_1 = require("./UIThemeMenuContent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentPokerFace = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerFace, _super);
    function UIThemeMenuContentPokerFace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.m_itemArray = [];
        return _this;
    }
    UIThemeMenuContentPokerFace.prototype.OnCreate = function () {
    };
    UIThemeMenuContentPokerFace.prototype.OnRelease = function () {
        // this.ReleaseContent()
    };
    UIThemeMenuContentPokerFace.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        for (var i = 0; i < SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.FaceSkinCnt; ++i) {
            this.m_itemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerFaceItem.key, {
                faceSkin: i,
                OnSelect: function (faceSkin) { _this.args.OnSelect(_this, faceSkin); }
            }, this.scrollView.content).CloseBy(this));
        }
        this.Select(this.args.faceSkin);
    };
    UIThemeMenuContentPokerFace.prototype.Select = function (faceSkin) {
        ii.AudioMgr.ins.PlayEffect();
        this.m_itemArray.forEach(function (it) { return it.Select(faceSkin); });
    };
    UIThemeMenuContentPokerFace.prototype.OnResetSkin = function (skin) {
        this.Select(skin.faceSkin);
    };
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentPokerFace.prototype, "scrollView", void 0);
    UIThemeMenuContentPokerFace = __decorate([
        ccclass
    ], UIThemeMenuContentPokerFace);
    return UIThemeMenuContentPokerFace;
}(UIThemeMenuContent_1.default));
exports.default = UIThemeMenuContentPokerFace;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxrRUFBaUU7QUFDakUsNERBQTJEO0FBQzNELDJEQUFzRDtBQUVoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQVExQztJQUF5RCwrQ0FBbUQ7SUFBNUc7UUFBQSxxRUE2QkM7UUE1Qm9DLGdCQUFVLEdBQWtCLElBQUksQ0FBQTtRQUV6RCxpQkFBVyxHQUFzQyxFQUFFLENBQUE7O0lBMEIvRCxDQUFDO0lBeEJhLDhDQUFRLEdBQWxCO0lBQ0EsQ0FBQztJQUNTLCtDQUFTLEdBQW5CO1FBQ0ksd0JBQXdCO0lBQzVCLENBQUM7SUFDUyw0Q0FBTSxHQUFoQixVQUFpQixNQUF1QztRQUF4RCxpQkFTQztRQVJHLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyw2Q0FBcUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUF1RSx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLEdBQUcsRUFBRTtnQkFDN0ssUUFBUSxFQUFFLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLFVBQUMsUUFBZ0IsSUFBTSxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsNENBQU0sR0FBTixVQUFPLFFBQWdCO1FBQ25CLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFRCxpREFBVyxHQUFYLFVBQVksSUFBbUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQTNCd0I7UUFBeEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7bUVBQXlDO0lBRGhELDJCQUEyQjtRQUQvQyxPQUFPO09BQ2EsMkJBQTJCLENBNkIvQztJQUFELGtDQUFDO0NBN0JELEFBNkJDLENBN0J3RCw0QkFBa0IsR0E2QjFFO2tCQTdCb0IsMkJBQTJCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUl0ZW0sIHsgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlSXRlbUFyZ3MgfSBmcm9tIFwiLi9VSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VJdGVtXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVTa2luIH0gZnJvbSBcIi4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVBdXRvQXRsYXNDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlQXV0b0F0bGFzQ2ZnXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgVUlUaGVtZU1lbnVDb250ZW50IGZyb20gXCIuL1VJVGhlbWVNZW51Q29udGVudFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IHR5cGUgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlQXJncyA9IHtcbiAgICBmYWNlU2tpbjogbnVtYmVyLFxuICAgIE9uU2VsZWN0OiAoY29udGVudDogVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlLCBmYWNlU2tpbjogbnVtYmVyKT0+dm9pZFxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlIGV4dGVuZHMgVUlUaGVtZU1lbnVDb250ZW50PFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUFyZ3M+IHtcbiAgICBAcHJvcGVydHkoY2MuU2Nyb2xsVmlldykgcHJpdmF0ZSBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbFxuICAgIFxuICAgIHByaXZhdGUgbV9pdGVtQXJyYXk6IFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUl0ZW1bXSA9IFtdXG4gICAgXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQge1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQge1xuICAgICAgICAvLyB0aGlzLlJlbGVhc2VDb250ZW50KClcbiAgICB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8U29saXRhaXJlQXV0b0F0bGFzQ2ZnLkZhY2VTa2luQ250OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMubV9pdGVtQXJyYXkucHVzaChpaS5VSU1nci5pbnMuQ3JlYXRlPFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUl0ZW0sIFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUl0ZW1BcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlSXRlbS5rZXksIHtcbiAgICAgICAgICAgICAgICBmYWNlU2tpbjogaSxcbiAgICAgICAgICAgICAgICBPblNlbGVjdDogKGZhY2VTa2luOiBudW1iZXIpPT4geyB0aGlzLmFyZ3MuT25TZWxlY3QodGhpcywgZmFjZVNraW4pOyB9XG4gICAgICAgICAgICB9LCB0aGlzLnNjcm9sbFZpZXcuY29udGVudCkuQ2xvc2VCeSh0aGlzKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLlNlbGVjdCh0aGlzLmFyZ3MuZmFjZVNraW4pXG4gICAgfVxuXG4gICAgU2VsZWN0KGZhY2VTa2luOiBudW1iZXIpIHtcbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoKTtcbiAgICAgICAgdGhpcy5tX2l0ZW1BcnJheS5mb3JFYWNoKGl0ID0+IGl0LlNlbGVjdChmYWNlU2tpbikpXG4gICAgfVxuXG4gICAgT25SZXNldFNraW4oc2tpbjogU29saXRhaXJlU2tpbikge1xuICAgICAgICB0aGlzLlNlbGVjdChza2luLmZhY2VTa2luKTtcbiAgICB9XG59XG4iXX0=