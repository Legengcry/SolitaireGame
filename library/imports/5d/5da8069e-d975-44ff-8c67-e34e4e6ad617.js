"use strict";
cc._RF.push(module, '5da80ae2XVE/4xn405OatYX', 'UINewGame');
// GameBundles/Solitaire/Script/Game/View/UINewGame.ts

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
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitaireGameUIPanel_1 = require("./SolitaireGameUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UINewGame = /** @class */ (function (_super) {
    __extends(UINewGame, _super);
    function UINewGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mui_ActionNode = null;
        _this._gameTypeLabel = null;
        _this._gameTypeSprite = null;
        _this._skipGameLabel = null;
        _this._seedLabels = [];
        _this._spriteFrames = [];
        return _this;
    }
    UINewGame.prototype.OnCreate = function () {
        this.SetUserData("ACTION_POSITION", this.mui_ActionNode.position);
    };
    UINewGame.prototype.OnRelease = function () { };
    UINewGame.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBG", this.OnBG.bind(this));
        this.SetIIClickHandler("OnSkipGame", this.OnSkipGame.bind(this));
        this.SetIIClickHandler("OnReplayDeck", this.OnReplayDeck.bind(this));
        this.SetIIClickHandler("OnCancel", this.OnCancel.bind(this));
        ii.UIUtil.moveAction(this.mui_ActionNode, true, this.GetUserData("ACTION_POSITION"), 0.3);
        switch (this.args.ju.gameType) {
            case SolitaireEnums_1.EGameType.EASY:
                {
                    this._gameTypeLabel.string = "\u7B80\u5355";
                    this._skipGameLabel.string = "\u8DF3\u8FC7\u5F53\u524D\u7EA7\u522B";
                }
                break;
            case SolitaireEnums_1.EGameType.HARD:
                {
                    this._gameTypeLabel.string = "\u56F0\u96BE";
                    this._skipGameLabel.string = "\u8DF3\u8FC7\u5F53\u524D\u7EA7\u522B";
                }
                break;
            case SolitaireEnums_1.EGameType.SEED:
                {
                    this._gameTypeLabel.string = "Seed";
                    this._skipGameLabel.string = "Play Next Seed";
                }
                break;
        }
        this._gameTypeSprite.spriteFrame = this._spriteFrames[this.args.ju.gameType];
        this._seedLabels.forEach(function (label) { return label.string = "" + _this.args.ju.Seed; });
    };
    UINewGame.prototype.ExitWithAction = function (callback) {
        var _this = this;
        ii.UIUtil.moveAction(this.mui_ActionNode, false, this.GetUserData("ACTION_POSITION"), 0.3, function () {
            if (callback) {
                callback();
            }
            _this.Close();
        });
    };
    UINewGame.prototype.OnBG = function () {
        this.ExitWithAction();
    };
    UINewGame.prototype.OnSkipGame = function () {
        var _this = this;
        this.ExitWithAction(function () { return _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_SKIP_GAME); });
    };
    UINewGame.prototype.OnReplayDeck = function () {
        var _this = this;
        this.ExitWithAction(function () { return _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_REPLAY_GAME); });
    };
    UINewGame.prototype.OnCancel = function () {
        this.ExitWithAction();
    };
    __decorate([
        property(cc.Node)
    ], UINewGame.prototype, "mui_ActionNode", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UINewGame.prototype, "_gameTypeLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], UINewGame.prototype, "_gameTypeSprite", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UINewGame.prototype, "_skipGameLabel", void 0);
    __decorate([
        property({ type: [cc.Label], visible: true })
    ], UINewGame.prototype, "_seedLabels", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true })
    ], UINewGame.prototype, "_spriteFrames", void 0);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnBG", null);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnSkipGame", null);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnReplayDeck", null);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnCancel", null);
    UINewGame = __decorate([
        ccclass
    ], UINewGame);
    return UINewGame;
}(ii.UIPanel));
exports.default = UINewGame;

cc._RF.pop();