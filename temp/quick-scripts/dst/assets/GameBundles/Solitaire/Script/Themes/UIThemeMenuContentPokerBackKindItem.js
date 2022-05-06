
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBackKindItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f85c41ogxRCMZhNDlTQqOLl', 'UIThemeMenuContentPokerBackKindItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBackKindItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentPokerBackKindItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerBackKindItem, _super);
    function UIThemeMenuContentPokerBackKindItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.layout = null;
        _this.m_itemArray = [];
        return _this;
    }
    UIThemeMenuContentPokerBackKindItem.prototype.OnCreate = function () { };
    UIThemeMenuContentPokerBackKindItem.prototype.OnRelease = function () { };
    UIThemeMenuContentPokerBackKindItem.prototype.OnOpen = function (uiArgs) {
        this.titleLabel.string = this.args.kind.kind;
        for (var index = 0; index < this.args.kind.count; ++index) {
            this.m_itemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBackKindSubItem.key, {
                backSkin: {
                    kind: this.args.kind.kind,
                    index: index,
                },
                onClick: this.args.onClick
            }, this.layout).CloseBy(this));
        }
    };
    UIThemeMenuContentPokerBackKindItem.prototype.Select = function (selectedSkin) {
        this.m_itemArray.forEach(function (it) { return it.Select(selectedSkin); });
    };
    __decorate([
        property(cc.Label)
    ], UIThemeMenuContentPokerBackKindItem.prototype, "titleLabel", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentPokerBackKindItem.prototype, "layout", void 0);
    UIThemeMenuContentPokerBackKindItem = __decorate([
        ccclass
    ], UIThemeMenuContentPokerBackKindItem);
    return UIThemeMenuContentPokerBackKindItem;
}(ii.UIComp));
exports.default = UIThemeMenuContentPokerBackKindItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUEyRDtBQUlyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUFpRSx1REFBa0Q7SUFBbkg7UUFBQSxxRUF5QkM7UUF4QitCLGdCQUFVLEdBQWEsSUFBSSxDQUFBO1FBQzVCLFlBQU0sR0FBWSxJQUFJLENBQUE7UUFFekMsaUJBQVcsR0FBNkMsRUFBRSxDQUFBOztJQXFCdEUsQ0FBQztJQW5CYSxzREFBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLHVEQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsb0RBQU0sR0FBaEIsVUFBaUIsTUFBK0M7UUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTdDLEtBQUksSUFBSSxLQUFLLEdBQUMsQ0FBQyxFQUFFLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFxRix1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLEdBQUcsRUFBRTtnQkFDbE0sUUFBUSxFQUFFO29CQUNOLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO29CQUN6QixLQUFLLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2FBQzdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELG9EQUFNLEdBQU4sVUFBTyxZQUE0QjtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBRSxPQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBdkJtQjtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyRUFBb0M7SUFDcEM7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dUVBQStCO0lBRmhDLG1DQUFtQztRQUR2RCxPQUFPO09BQ2EsbUNBQW1DLENBeUJ2RDtJQUFELDBDQUFDO0NBekJELEFBeUJDLENBekJnRSxFQUFFLENBQUMsTUFBTSxHQXlCekU7a0JBekJvQixtQ0FBbUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgeyBUUG9rZXJCYWNrU2tpbiwgVFBva2VyQmFja1NraW5LaW5kIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVNwcml0ZUZyYW1lQ2ZnXCI7XG5pbXBvcnQgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZFN1Ykl0ZW0sIHsgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZFN1Ykl0ZW1BcmdzIH0gZnJvbSBcIi4vVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZFN1Ykl0ZW1cIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCB0eXBlIFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRJdGVtQXJncyA9IHsga2luZDogVFBva2VyQmFja1NraW5LaW5kLCBvbkNsaWNrOiAoc2tpbjogVFBva2VyQmFja1NraW4sIGl0ZW06IFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRTdWJJdGVtKT0+dm9pZCB9XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW0gZXh0ZW5kcyBpaS5VSUNvbXA8VUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW1BcmdzPiB7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcml2YXRlIHRpdGxlTGFiZWw6IGNjLkxhYmVsID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHJpdmF0ZSBsYXlvdXQ6IGNjLk5vZGUgPSBudWxsIFxuXG4gICAgcHJpdmF0ZSBtX2l0ZW1BcnJheTogVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZFN1Ykl0ZW1bXSA9IFtdXG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRJdGVtQXJncyk6IHZvaWQgeyAgICAgICAgXG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLmFyZ3Mua2luZC5raW5kO1xuXG4gICAgICAgIGZvcihsZXQgaW5kZXg9MDsgaW5kZXg8dGhpcy5hcmdzLmtpbmQuY291bnQ7ICsraW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMubV9pdGVtQXJyYXkucHVzaChpaS5VSU1nci5pbnMuQ3JlYXRlPFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRTdWJJdGVtLCBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbUFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5VSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tLaW5kU3ViSXRlbS5rZXksIHtcbiAgICAgICAgICAgICAgICBiYWNrU2tpbjoge1xuICAgICAgICAgICAgICAgICAgICBraW5kOiB0aGlzLmFyZ3Mua2luZC5raW5kLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmFyZ3Mub25DbGlja1xuICAgICAgICAgICAgfSwgdGhpcy5sYXlvdXQpLkNsb3NlQnkodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgU2VsZWN0KHNlbGVjdGVkU2tpbjogVFBva2VyQmFja1NraW4pIHtcbiAgICAgICAgdGhpcy5tX2l0ZW1BcnJheS5mb3JFYWNoKGl0PT5pdC5TZWxlY3Qoc2VsZWN0ZWRTa2luKSk7XG4gICAgfVxufVxuIl19