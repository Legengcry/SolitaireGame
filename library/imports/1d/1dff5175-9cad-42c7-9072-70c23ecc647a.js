"use strict";
cc._RF.push(module, '1dff5F1nK1Cx5BycMI+zGR6', 'UIGameWin');
// GameBundles/Solitaire/Script/Game/View/UIGameWin.ts

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
var SolitaireLogic_1 = require("../../Logic/SolitaireLogic");
var SolitaireAudioCfg_1 = require("../../SolitaireAudioCfg");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var SolitaireGameUIPanel_1 = require("./SolitaireGameUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGameWin = /** @class */ (function (_super) {
    __extends(UIGameWin, _super);
    function UIGameWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLabel = null;
        _this.scoreLabel = null;
        _this.movesLabel = null;
        _this.timeHistoryLabel = null;
        _this.scoreHistoryLabel = null;
        _this.movesHistoryLabel = null;
        _this._seedLabels = [];
        return _this;
    }
    UIGameWin.prototype.OnCreate = function () { };
    UIGameWin.prototype.OnRelease = function () { };
    UIGameWin.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnReplay", this.OnReplay.bind(this), true);
        this.SetIIClickHandler("OnNextGame", this.OnNextGame.bind(this), true);
        // 数据
        var historyValue = SolitaireLogic_1.SolitaireLogic.dataCache.GetModeHistory(this.args.ju.isVegasMode, this.args.ju.isCard3Mode).v;
        var gameTime = this.args.ju.gameTime;
        var score = this.args.ju.scoreBV.v;
        var moveStepCount = this.args.ju.moveStepCountBV.v;
        // 数据显示
        this.timeLabel.string = ii.date.Format(gameTime, "mm:ss");
        this.scoreLabel.string = "" + score;
        this.movesLabel.string = "" + moveStepCount;
        this.timeHistoryLabel.string = ii.date.Format(historyValue.gameTimeBest, "mm:ss");
        this.scoreHistoryLabel.string = "" + historyValue.scoreBest;
        this.movesHistoryLabel.string = "" + historyValue.moveStepBest;
        this._seedLabels.forEach(function (label) { return label.string = "" + _this.args.ju.Seed; });
        // 播放胜利音效
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.successful);
        this.TryToShowInterstitial();
    };
    UIGameWin.prototype.TryToShowInterstitial = function () {
        if (SolitaireLogic_1.SolitaireLogic.dataCache.passCountBV.v >= 3) {
            if (ii.App.ins.p.ad.IsInterstitialAvailable()) {
                ii.App.ins.p.ad.ShowInterstitialWithBlocker(null, SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.LoadingADUIPanel.key, 2);
            }
            else {
                ii.App.ins.p.ad.LoadInterstitial();
                if (ii.App.ins.p.user.GetGameCenterVal("GameTime") > 16 * 3600) {
                    ii.App.ins.p.user.FiveStar();
                }
            }
        }
    };
    //! 点击重玩
    UIGameWin.prototype.OnReplay = function () {
        this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_REPLAY_GAME);
        this.Close();
    };
    //! 点击下一关
    UIGameWin.prototype.OnNextGame = function () {
        this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_NEXT_GAME);
        this.Close();
    };
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UIGameWin.prototype, "timeLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UIGameWin.prototype, "scoreLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UIGameWin.prototype, "movesLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UIGameWin.prototype, "timeHistoryLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UIGameWin.prototype, "scoreHistoryLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UIGameWin.prototype, "movesHistoryLabel", void 0);
    __decorate([
        property({ type: [cc.Label], visible: true })
    ], UIGameWin.prototype, "_seedLabels", void 0);
    UIGameWin = __decorate([
        ccclass
    ], UIGameWin);
    return UIGameWin;
}(ii.UIPanel));
exports.default = UIGameWin;

cc._RF.pop();