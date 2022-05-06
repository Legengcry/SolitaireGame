"use strict";
cc._RF.push(module, '16406xrmulH9ZJVyTHv4ySg', 'UIGameLose');
// GameBundles/Solitaire/Script/Game/View/UIGameLose.ts

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
var SolitaireGameUIPanel_1 = require("./SolitaireGameUIPanel");
var SolitaireAudioCfg_1 = require("../../SolitaireAudioCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGameLose = /** @class */ (function (_super) {
    __extends(UIGameLose, _super);
    function UIGameLose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreLabel = null;
        _this._seedLabels = [];
        return _this;
    }
    UIGameLose.prototype.OnCreate = function () { };
    UIGameLose.prototype.OnRelease = function () { };
    UIGameLose.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.failed);
        this.scoreLabel.string = "(\u5F97\u5206: " + this.args.ju.scoreBV.v + ")";
        this._seedLabels.forEach(function (label) { return label.string = "" + _this.args.ju.Seed; });
        this.SetIIClickHandler("OnSkipGame", function () {
            _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_SKIP_GAME);
            _this.Close();
        }, true);
        this.SetIIClickHandler("OnReplay", function () {
            _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_REPLAY_GAME);
            _this.Close();
        }, true);
        this.SetIIClickHandler("OnContinue", function () {
            _this.args.ju.isContinueBV.v = true;
            _this.Close();
        }, true);
    };
    __decorate([
        property(cc.Label)
    ], UIGameLose.prototype, "scoreLabel", void 0);
    __decorate([
        property({ type: [cc.Label], visible: true })
    ], UIGameLose.prototype, "_seedLabels", void 0);
    UIGameLose = __decorate([
        ccclass
    ], UIGameLose);
    return UIGameLose;
}(ii.UIPanel));
exports.default = UIGameLose;

cc._RF.pop();