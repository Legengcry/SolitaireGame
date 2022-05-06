
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Statistics/UIStatisticsPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ac2eCMq41CNZE1cF6F53jS', 'UIStatisticsPage');
// GameBundles/Solitaire/Script/Statistics/UIStatisticsPage.ts

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
var SolitaireLogic_1 = require("../Logic/SolitaireLogic");
var UIStatisticsCircleProgress_1 = require("./UIStatisticsCircleProgress");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIStatisticsPage = /** @class */ (function (_super) {
    __extends(UIStatisticsPage, _super);
    function UIStatisticsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.highScoreLabel = null;
        _this.bestTimeLabel = null;
        _this.averageGameTimeLabel = null;
        _this.averageMovesLabel = null;
        _this.lowestMovesLabel = null;
        _this.highestMovesLabel = null;
        _this.wonProgress = null;
        return _this;
    }
    UIStatisticsPage.prototype.OnCreate = function () { };
    UIStatisticsPage.prototype.OnRelease = function () { };
    UIStatisticsPage.prototype.OnOpen = function (uiArgs) {
        this.node.width = this.args.width;
        this.Refresh();
    };
    UIStatisticsPage.prototype.Refresh = function () {
        var history = this.modeHistory.v;
        // UI 刷新
        this.titleLabel.string = this.GetTitleString(this.args.vegas, this.args.card3);
        this.highScoreLabel.string = "" + history.scoreBest;
        this.wonProgress.Init(history.passCount, history.passCount + history.loseCount);
        this.bestTimeLabel.string = "" + history.gameTimeBest;
        this.averageGameTimeLabel.string = "" + history.gameTimeAverage;
        this.averageMovesLabel.string = "" + history.moveStepAverage;
        this.lowestMovesLabel.string = "" + history.moveStepBest;
        this.highestMovesLabel.string = "" + history.moveStepWorest;
    };
    UIStatisticsPage.prototype.GetTitleString = function (vegas, card3) {
        return (vegas ? "Vegas" : "Normal") + "-" + (card3 ? "3Cards" : "1Card");
    };
    UIStatisticsPage.prototype.Reset = function () {
        var _this = this;
        ii.UIMgr.ins.OpenDialog2("Reset " + (this.args.vegas ? 'Vegas' : 'Normal') + "-" + (this.args.card3 ? 'Card3' : 'Card1') + " history ?", null, function () { return _this.resetHistory(); });
    };
    Object.defineProperty(UIStatisticsPage.prototype, "index", {
        get: function () { return (this.args.vegas ? 1 : 0) * 2 + (this.args.card3 ? 1 : 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIStatisticsPage.prototype, "modeHistory", {
        get: function () { return SolitaireLogic_1.SolitaireLogic.dataCache.GetModeHistory(this.args.vegas, this.args.card3); },
        enumerable: false,
        configurable: true
    });
    UIStatisticsPage.prototype.resetHistory = function () {
        SolitaireLogic_1.SolitaireLogic.dataCache.ResetModeHistory(this.args.vegas, this.args.card3);
        this.Refresh();
    };
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "titleLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "highScoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "bestTimeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "averageGameTimeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "averageMovesLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "lowestMovesLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsPage.prototype, "highestMovesLabel", void 0);
    __decorate([
        property(UIStatisticsCircleProgress_1.default)
    ], UIStatisticsPage.prototype, "wonProgress", void 0);
    UIStatisticsPage = __decorate([
        ccclass
    ], UIStatisticsPage);
    return UIStatisticsPage;
}(ii.UIComp));
exports.default = UIStatisticsPage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTdGF0aXN0aWNzXFxVSVN0YXRpc3RpY3NQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUF5RDtBQUN6RCwyRUFBc0U7QUFRaEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBOEMsb0NBQStCO0lBQTdFO1FBQUEscUVBMENDO1FBekMrQixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixvQkFBYyxHQUFhLElBQUksQ0FBQTtRQUMvQixtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUM5QiwwQkFBb0IsR0FBYSxJQUFJLENBQUE7UUFDckMsdUJBQWlCLEdBQWEsSUFBSSxDQUFBO1FBQ2xDLHNCQUFnQixHQUFhLElBQUksQ0FBQTtRQUNqQyx1QkFBaUIsR0FBYSxJQUFJLENBQUE7UUFDaEIsaUJBQVcsR0FBK0IsSUFBSSxDQUFBOztJQWtDaEcsQ0FBQztJQWpDYSxtQ0FBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLG9DQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsaUNBQU0sR0FBaEIsVUFBaUIsTUFBVztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUNPLGtDQUFPLEdBQWY7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQyxRQUFRO1FBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFD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Q3pDO1FBQW5CLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytEQUEyQztJQUN4QjtRQUFyQyxRQUFRLENBQUMsb0NBQTBCLENBQUM7eURBQXVEO0lBUjNFLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBMENwQztJQUFELHVCQUFDO0NBMUNELEFBMENDLENBMUM2QyxFQUFFLENBQUMsTUFBTSxHQTBDdEQ7a0JBMUNvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVMb2dpYyB9IGZyb20gXCIuLi9Mb2dpYy9Tb2xpdGFpcmVMb2dpY1wiO1xuaW1wb3J0IFVJU3RhdGlzdGljc0NpcmNsZVByb2dyZXNzIGZyb20gXCIuL1VJU3RhdGlzdGljc0NpcmNsZVByb2dyZXNzXCI7XG5cbmV4cG9ydCB0eXBlIFVJU3RhdGlzdGljc1BhZ2VBcmdzID0ge1xuICAgIHZlZ2FzOiBib29sZWFuLFxuICAgIGNhcmQzOiBib29sZWFuLFxuICAgIHdpZHRoOiBudW1iZXJcbn1cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTdGF0aXN0aWNzUGFnZSBleHRlbmRzIGlpLlVJQ29tcDxVSVN0YXRpc3RpY3NQYWdlQXJncz4ge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbCkgcHJpdmF0ZSB0aXRsZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcml2YXRlIGhpZ2hTY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGwgXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcml2YXRlIGJlc3RUaW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpIHByaXZhdGUgYXZlcmFnZUdhbWVUaW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpIHByaXZhdGUgYXZlcmFnZU1vdmVzTGFiZWw6IGNjLkxhYmVsID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpIHByaXZhdGUgbG93ZXN0TW92ZXNMYWJlbDogY2MuTGFiZWwgPSBudWxsIFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbCkgcHJpdmF0ZSBoaWdoZXN0TW92ZXNMYWJlbDogY2MuTGFiZWwgPSBudWxsIFxuICAgIEBwcm9wZXJ0eShVSVN0YXRpc3RpY3NDaXJjbGVQcm9ncmVzcykgcHJpdmF0ZSB3b25Qcm9ncmVzczogVUlTdGF0aXN0aWNzQ2lyY2xlUHJvZ3Jlc3MgPSBudWxsIFxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMuYXJncy53aWR0aDtcbiAgICAgICAgdGhpcy5SZWZyZXNoKClcbiAgICB9XG4gICAgcHJpdmF0ZSBSZWZyZXNoKCkge1xuICAgICAgICBsZXQgaGlzdG9yeSA9IHRoaXMubW9kZUhpc3RvcnkudjtcbiAgICAgICAgLy8gVUkg5Yi35pawXG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSB0aGlzLkdldFRpdGxlU3RyaW5nKHRoaXMuYXJncy52ZWdhcywgdGhpcy5hcmdzLmNhcmQzKTtcbiAgICAgICAgdGhpcy5oaWdoU2NvcmVMYWJlbC5zdHJpbmcgPSBgJHtoaXN0b3J5LnNjb3JlQmVzdH1gXG4gICAgICAgIHRoaXMud29uUHJvZ3Jlc3MuSW5pdChoaXN0b3J5LnBhc3NDb3VudCwgaGlzdG9yeS5wYXNzQ291bnQgKyBoaXN0b3J5Lmxvc2VDb3VudClcbiAgICAgICAgdGhpcy5iZXN0VGltZUxhYmVsLnN0cmluZyA9IGAke2hpc3RvcnkuZ2FtZVRpbWVCZXN0fWBcbiAgICAgICAgdGhpcy5hdmVyYWdlR2FtZVRpbWVMYWJlbC5zdHJpbmcgPSBgJHtoaXN0b3J5LmdhbWVUaW1lQXZlcmFnZX1gXG4gICAgICAgIHRoaXMuYXZlcmFnZU1vdmVzTGFiZWwuc3RyaW5nID0gYCR7aGlzdG9yeS5tb3ZlU3RlcEF2ZXJhZ2V9YFxuICAgICAgICB0aGlzLmxvd2VzdE1vdmVzTGFiZWwuc3RyaW5nID0gYCR7aGlzdG9yeS5tb3ZlU3RlcEJlc3R9YFxuICAgICAgICB0aGlzLmhpZ2hlc3RNb3Zlc0xhYmVsLnN0cmluZyA9IGAke2hpc3RvcnkubW92ZVN0ZXBXb3Jlc3R9YFxuICAgIH1cblxuICAgIHByaXZhdGUgR2V0VGl0bGVTdHJpbmcodmVnYXM6IGJvb2xlYW4sIGNhcmQzOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3ZlZ2FzID8gXCJWZWdhc1wiIDogXCJOb3JtYWxcIn0tJHtjYXJkMyA/IFwiM0NhcmRzXCIgOiBcIjFDYXJkXCJ9YDtcbiAgICB9XG5cbiAgICBSZXNldCgpIHtcbiAgICAgICAgaWkuVUlNZ3IuaW5zLk9wZW5EaWFsb2cyKGBSZXNldCAke3RoaXMuYXJncy52ZWdhcyA/ICdWZWdhcyc6ICdOb3JtYWwnfS0ke3RoaXMuYXJncy5jYXJkMyA/ICdDYXJkMyc6ICdDYXJkMSd9IGhpc3RvcnkgP2AsIG51bGwsICgpPT50aGlzLnJlc2V0SGlzdG9yeSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBpbmRleCgpOiBudW1iZXIgeyByZXR1cm4gKHRoaXMuYXJncy52ZWdhcyA/IDEgOiAwKSoyICsgKHRoaXMuYXJncy5jYXJkMyA/IDEgOiAwKTsgfVxuICAgIHByaXZhdGUgZ2V0IG1vZGVIaXN0b3J5KCkgeyByZXR1cm4gU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLkdldE1vZGVIaXN0b3J5KHRoaXMuYXJncy52ZWdhcywgdGhpcy5hcmdzLmNhcmQzKTsgfVxuICAgIHByaXZhdGUgcmVzZXRIaXN0b3J5KCkge1xuICAgICAgICBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuUmVzZXRNb2RlSGlzdG9yeSh0aGlzLmFyZ3MudmVnYXMsIHRoaXMuYXJncy5jYXJkMyk7XG4gICAgICAgIHRoaXMuUmVmcmVzaCgpXG4gICAgfVxufSJdfQ==