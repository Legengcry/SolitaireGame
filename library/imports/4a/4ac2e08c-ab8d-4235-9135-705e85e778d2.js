"use strict";
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