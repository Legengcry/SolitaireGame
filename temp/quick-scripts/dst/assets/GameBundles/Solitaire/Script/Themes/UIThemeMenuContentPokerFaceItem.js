
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFaceItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58660xU9b9PYrfSN1bdScvR', 'UIThemeMenuContentPokerFaceItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFaceItem.ts

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
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentPokerFaceItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerFaceItem, _super);
    function UIThemeMenuContentPokerFaceItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.highLightNode = null;
        _this._layout = null;
        _this.m_DisplayPokerUI = [];
        return _this;
    }
    UIThemeMenuContentPokerFaceItem_1 = UIThemeMenuContentPokerFaceItem;
    UIThemeMenuContentPokerFaceItem.prototype.OnCreate = function () { };
    UIThemeMenuContentPokerFaceItem.prototype.OnRelease = function () { };
    UIThemeMenuContentPokerFaceItem.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        var _loop_1 = function (suit) {
            UIThemeMenuContentPokerFaceItem_1.POKER_POINTS.forEach(function (point) {
                _this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                    point: point,
                    suit: suit,
                    backSkin: { kind: "classic", index: 0 },
                    frontSkin: 0,
                    status: SolitaireEnums_1.EPokerStatus.OPEN,
                    faceSkin: _this.args.faceSkin
                }, _this._layout.node).CloseBy(_this));
            });
        };
        for (var suit = SolitaireEnums_1.ESuit.HEITAO; suit <= SolitaireEnums_1.ESuit.FANGKUAI; ++suit) {
            _loop_1(suit);
        }
        this.highLightNode.active = false;
    };
    UIThemeMenuContentPokerFaceItem.prototype.OnItemClick = function () {
        this.args.OnSelect(this.args.faceSkin);
    };
    UIThemeMenuContentPokerFaceItem.prototype.Select = function (faceSkin) {
        this.highLightNode.active = this.args.faceSkin === faceSkin;
    };
    var UIThemeMenuContentPokerFaceItem_1;
    UIThemeMenuContentPokerFaceItem.POKER_POINTS = [1, 11, 12, 13];
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuContentPokerFaceItem.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentPokerFaceItem.prototype, "highLightNode", void 0);
    __decorate([
        property({ type: cc.Layout, visible: true })
    ], UIThemeMenuContentPokerFaceItem.prototype, "_layout", void 0);
    UIThemeMenuContentPokerFaceItem = UIThemeMenuContentPokerFaceItem_1 = __decorate([
        ccclass
    ], UIThemeMenuContentPokerFaceItem);
    return UIThemeMenuContentPokerFaceItem;
}(ii.UIComp));
exports.default = UIThemeMenuContentPokerFaceItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQXdEO0FBQ3hELDREQUEyRDtBQUVyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQVExQztJQUE2RCxtREFBOEM7SUFBM0c7UUFBQSxxRUFrQ0M7UUFoQ2tDLGNBQVEsR0FBYyxJQUFJLENBQUE7UUFDNUIsbUJBQWEsR0FBWSxJQUFJLENBQUE7UUFDUCxhQUFPLEdBQWMsSUFBSSxDQUFBO1FBRXBFLHNCQUFnQixHQUE4QixFQUFFLENBQUE7O0lBNEI1RCxDQUFDO3dDQWxDb0IsK0JBQStCO0lBUXRDLGtEQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsbURBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQixnREFBTSxHQUFoQixVQUFpQixNQUFXO1FBQTVCLGlCQWVDO1FBZEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUN2RCxJQUFJO1lBQ1IsaUNBQStCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7Z0JBQ3RELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUF1RCx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRTtvQkFDMUosS0FBSyxFQUFFLEtBQUs7b0JBQ1osSUFBSSxFQUFFLElBQUk7b0JBQ1YsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFO29CQUNyQyxTQUFTLEVBQUUsQ0FBQztvQkFDWixNQUFNLEVBQUUsNkJBQVksQ0FBQyxJQUFJO29CQUN6QixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2lCQUMvQixFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUE7O1FBVk4sS0FBSSxJQUFJLElBQUksR0FBQyxzQkFBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUUsc0JBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJO29CQUEvQyxJQUFJO1NBV1g7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEMsQ0FBQztJQUVPLHFEQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0RBQU0sR0FBTixVQUFPLFFBQWdCO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztJQUNoRSxDQUFDOztJQWhDZSw0Q0FBWSxHQUFHLENBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUE7SUFDM0I7UUFBcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cUVBQXFDO0lBQ3RDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBFQUF3QztJQUNqQjtRQUF4QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7b0VBQW9DO0lBSjNELCtCQUErQjtRQURuRCxPQUFPO09BQ2EsK0JBQStCLENBa0NuRDtJQUFELHNDQUFDO0NBbENELEFBa0NDLENBbEM0RCxFQUFFLENBQUMsTUFBTSxHQWtDckU7a0JBbENvQiwrQkFBK0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU29saXRhaXJlUG9rZXJEaXNwbGF5VUksIHsgU29saXRhaXJlUG9rZXJEaXNwbGF5VUlBcmdzIH0gZnJvbSBcIi4uL0dhbWUvVmlldy9Tb2xpdGFpcmVQb2tlckRpc3BsYXlVSVwiO1xuaW1wb3J0IHsgRVBva2VyU3RhdHVzLCBFU3VpdCB9IGZyb20gXCIuLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IHR5cGUgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlSXRlbUFyZ3MgPSB7XG4gICAgZmFjZVNraW46IG51bWJlcixcbiAgICBPblNlbGVjdDogKGZhY2VTa2luOiBudW1iZXIpPT52b2lkXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VJdGVtIGV4dGVuZHMgaWkuVUlDb21wPFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUl0ZW1BcmdzPiB7XG4gICAgc3RhdGljIHJlYWRvbmx5IFBPS0VSX1BPSU5UUyA9IFsgMSwgMTEsIDEyLCAxMyBdXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSkgcHJvdGVjdGVkIGJnU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByb3RlY3RlZCBoaWdoTGlnaHROb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYXlvdXQsdmlzaWJsZTp0cnVlfSkgcHJvdGVjdGVkIF9sYXlvdXQ6IGNjLkxheW91dCA9IG51bGxcblxuICAgIHByaXZhdGUgbV9EaXNwbGF5UG9rZXJVSTogU29saXRhaXJlUG9rZXJEaXNwbGF5VUlbXSA9IFtdXG4gICAgXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uQ2xpY2tcIiwgdGhpcy5Pbkl0ZW1DbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgZm9yKGxldCBzdWl0PUVTdWl0LkhFSVRBTzsgc3VpdDw9RVN1aXQuRkFOR0tVQUk7ICsrc3VpdCkge1xuICAgICAgICAgICAgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlSXRlbS5QT0tFUl9QT0lOVFMuZm9yRWFjaChwb2ludCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX0Rpc3BsYXlQb2tlclVJLnB1c2goaWkuVUlNZ3IuaW5zLkNyZWF0ZTxTb2xpdGFpcmVQb2tlckRpc3BsYXlVSSwgU29saXRhaXJlUG9rZXJEaXNwbGF5VUlBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuU29saXRhaXJlUG9rZXJEaXNwbGF5VUkua2V5LCB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50OiBwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgc3VpdDogc3VpdCxcbiAgICAgICAgICAgICAgICAgICAgYmFja1NraW46IHsga2luZDogXCJjbGFzc2ljXCIsaW5kZXg6MCB9LFxuICAgICAgICAgICAgICAgICAgICBmcm9udFNraW46IDAsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogRVBva2VyU3RhdHVzLk9QRU4sXG4gICAgICAgICAgICAgICAgICAgIGZhY2VTa2luOiB0aGlzLmFyZ3MuZmFjZVNraW5cbiAgICAgICAgICAgICAgICB9LCB0aGlzLl9sYXlvdXQubm9kZSkuQ2xvc2VCeSh0aGlzKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uSXRlbUNsaWNrKCkge1xuICAgICAgICB0aGlzLmFyZ3MuT25TZWxlY3QodGhpcy5hcmdzLmZhY2VTa2luKTtcbiAgICB9XG5cbiAgICBTZWxlY3QoZmFjZVNraW46IG51bWJlcikge1xuICAgICAgICB0aGlzLmhpZ2hMaWdodE5vZGUuYWN0aXZlID0gdGhpcy5hcmdzLmZhY2VTa2luID09PSBmYWNlU2tpbjtcbiAgICB9XG59XG4iXX0=