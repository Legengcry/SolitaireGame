
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/UIGameWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxVSUdhbWVXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQTREO0FBQzVELDZEQUE0RDtBQUM1RCwrREFBOEQ7QUFFOUQsK0RBQTBEO0FBT3BELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDO0lBQXVDLDZCQUF5QjtJQUFoRTtRQUFBLHFFQTBEQztRQXpEbUQsZUFBUyxHQUFhLElBQUksQ0FBQTtRQUMxQixnQkFBVSxHQUFhLElBQUksQ0FBQTtRQUMzQixnQkFBVSxHQUFhLElBQUksQ0FBQTtRQUMzQixzQkFBZ0IsR0FBYSxJQUFJLENBQUE7UUFDakMsdUJBQWlCLEdBQWEsSUFBSSxDQUFBO1FBQ2xDLHVCQUFpQixHQUFhLElBQUksQ0FBQTtRQUNoQyxpQkFBVyxHQUFlLEVBQUUsQ0FBQzs7SUFtRG5GLENBQUM7SUFqRGEsNEJBQVEsR0FBbEIsY0FBNkIsQ0FBQztJQUNwQiw2QkFBUyxHQUFuQixjQUE4QixDQUFDO0lBQ3JCLDBCQUFNLEdBQWhCLFVBQWlCLE1BQXFCO1FBQXRDLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsS0FBSztRQUNMLElBQUksWUFBWSxHQUFHLCtCQUFjLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FB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QUN0RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQXhEdUM7UUFBdkMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2dEQUFtQztJQUNsQztRQUF2QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7aURBQW9DO0lBQ25DO1FBQXZDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztpREFBb0M7SUFDbkM7UUFBdkMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO3VEQUEwQztJQUN6QztRQUF2QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7d0RBQTJDO0lBQzFDO1FBQXZDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQzt3REFBMkM7SUFDeEM7UUFBekMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztrREFBc0M7SUFQOUQsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTBEN0I7SUFBRCxnQkFBQztDQTFERCxBQTBEQyxDQTFEc0MsRUFBRSxDQUFDLE9BQU8sR0EwRGhEO2tCQTFEb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbGl0YWlyZUxvZ2ljIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL1NvbGl0YWlyZUxvZ2ljXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVBdWRpb0NmZyB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVBdWRpb0NmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vTW9kZWwvU29saXRhaXJlSnVcIjtcbmltcG9ydCBTb2xpdGFpcmVHYW1lVUlQYW5lbCBmcm9tIFwiLi9Tb2xpdGFpcmVHYW1lVUlQYW5lbFwiO1xuXG5cbmV4cG9ydCB0eXBlIFVJR2FtZVdpbkFyZ3MgPSB7XG4gICAganU6IFNvbGl0YWlyZUp1LFxufVxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUdhbWVXaW4gZXh0ZW5kcyBpaS5VSVBhbmVsPFVJR2FtZVdpbkFyZ3M+IHtcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSB0aW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbCBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBzY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGwgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgbW92ZXNMYWJlbDogY2MuTGFiZWwgPSBudWxsIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCx2aXNpYmxlOnRydWV9KSBwcml2YXRlIHRpbWVIaXN0b3J5TGFiZWw6IGNjLkxhYmVsID0gbnVsbCBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBzY29yZUhpc3RvcnlMYWJlbDogY2MuTGFiZWwgPSBudWxsIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCx2aXNpYmxlOnRydWV9KSBwcml2YXRlIG1vdmVzSGlzdG9yeUxhYmVsOiBjYy5MYWJlbCA9IG51bGwgXG4gICAgQHByb3BlcnR5KHt0eXBlOltjYy5MYWJlbF0sdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfc2VlZExhYmVsczogY2MuTGFiZWxbXSA9IFtdO1xuXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBVSUdhbWVXaW5BcmdzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPblJlcGxheVwiLCB0aGlzLk9uUmVwbGF5LmJpbmQodGhpcyksIHRydWUpO1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25OZXh0R2FtZVwiLCB0aGlzLk9uTmV4dEdhbWUuYmluZCh0aGlzKSwgdHJ1ZSk7XG4gICAgICAgIC8vIOaVsOaNrlxuICAgICAgICBsZXQgaGlzdG9yeVZhbHVlID0gU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLkdldE1vZGVIaXN0b3J5KHRoaXMuYXJncy5qdS5pc1ZlZ2FzTW9kZSwgdGhpcy5hcmdzLmp1LmlzQ2FyZDNNb2RlKS52O1xuICAgICAgICBsZXQgZ2FtZVRpbWUgPSB0aGlzLmFyZ3MuanUuZ2FtZVRpbWU7XG4gICAgICAgIGxldCBzY29yZSA9IHRoaXMuYXJncy5qdS5zY29yZUJWLnY7XG4gICAgICAgIGxldCBtb3ZlU3RlcENvdW50ID0gdGhpcy5hcmdzLmp1Lm1vdmVTdGVwQ291bnRCVi52O1xuXG4gICAgICAgIC8vIOaVsOaNruaYvuekulxuICAgICAgICB0aGlzLnRpbWVMYWJlbC5zdHJpbmcgPSBpaS5kYXRlLkZvcm1hdChnYW1lVGltZSwgXCJtbTpzc1wiKTtcbiAgICAgICAgdGhpcy5zY29yZUxhYmVsLnN0cmluZyA9IGAke3Njb3JlfWA7XG4gICAgICAgIHRoaXMubW92ZXNMYWJlbC5zdHJpbmcgPSBgJHttb3ZlU3RlcENvdW50fWA7XG4gICAgICAgIHRoaXMudGltZUhpc3RvcnlMYWJlbC5zdHJpbmcgPSBpaS5kYXRlLkZvcm1hdChoaXN0b3J5VmFsdWUuZ2FtZVRpbWVCZXN0LCBcIm1tOnNzXCIpO1xuICAgICAgICB0aGlzLnNjb3JlSGlzdG9yeUxhYmVsLnN0cmluZyA9IGAke2hpc3RvcnlWYWx1ZS5zY29yZUJlc3R9YDtcbiAgICAgICAgdGhpcy5tb3Zlc0hpc3RvcnlMYWJlbC5zdHJpbmcgPSBgJHtoaXN0b3J5VmFsdWUubW92ZVN0ZXBCZXN0fWA7XG4gICAgICAgIHRoaXMuX3NlZWRMYWJlbHMuZm9yRWFjaChsYWJlbD0+bGFiZWwuc3RyaW5nID0gYCR7dGhpcy5hcmdzLmp1LlNlZWR9YCk7XG5cbiAgICAgICAgLy8g5pKt5pS+6IOc5Yip6Z+z5pWIXG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC5zdWNjZXNzZnVsKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuVHJ5VG9TaG93SW50ZXJzdGl0aWFsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBUcnlUb1Nob3dJbnRlcnN0aXRpYWwoKSB7XG4gICAgICAgIGlmKFNvbGl0YWlyZUxvZ2ljLmRhdGFDYWNoZS5wYXNzQ291bnRCVi52ID49IDMpe1xuICAgICAgICAgICAgaWYoaWkuQXBwLmlucy5wLmFkLklzSW50ZXJzdGl0aWFsQXZhaWxhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICBpaS5BcHAuaW5zLnAuYWQuU2hvd0ludGVyc3RpdGlhbFdpdGhCbG9ja2VyKG51bGwsIFNvbGl0YWlyZVByZWZhYkNmZy5wZmIucGFuZWwuTG9hZGluZ0FEVUlQYW5lbC5rZXksIDIpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWkuQXBwLmlucy5wLmFkLkxvYWRJbnRlcnN0aXRpYWwoKTtcbiAgICAgICAgICAgICAgICBpZihpaS5BcHAuaW5zLnAudXNlci5HZXRHYW1lQ2VudGVyVmFsKFwiR2FtZVRpbWVcIikgPiAxNiozNjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlpLkFwcC5pbnMucC51c2VyLkZpdmVTdGFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vISDngrnlh7vph43njqlcbiAgICBwcml2YXRlIE9uUmVwbGF5KCkge1xuICAgICAgICB0aGlzLmVtaXRHbG9iYWwoU29saXRhaXJlR2FtZVVJUGFuZWwuZXZlbnQuRVZFTlRfR0FNRVNDRU5FX1JFUExBWV9HQU1FKTtcbiAgICAgICAgdGhpcy5DbG9zZSgpO1xuICAgIH1cblxuICAgIC8vISDngrnlh7vkuIvkuIDlhbNcbiAgICBwcml2YXRlIE9uTmV4dEdhbWUoKSB7XG4gICAgICAgIHRoaXMuZW1pdEdsb2JhbChTb2xpdGFpcmVHYW1lVUlQYW5lbC5ldmVudC5FVkVOVF9HQU1FU0NFTkVfTkVYVF9HQU1FKTtcbiAgICAgICAgdGhpcy5DbG9zZSgpO1xuICAgIH1cbn1cbiJdfQ==