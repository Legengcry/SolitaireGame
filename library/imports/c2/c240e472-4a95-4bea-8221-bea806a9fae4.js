"use strict";
cc._RF.push(module, 'c240eRySpVL6oIhvqgGqfrk', 'SolitaireThemesEffectColumnUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectColumnUI.ts

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
var SolitaireGameDesktopUI_1 = require("../Game/View/SolitaireGameDesktopUI");
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesEffectColumnUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesEffectColumnUI, _super);
    function SolitaireThemesEffectColumnUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.receiveRoot = null;
        _this.playRoot = null;
        _this.m_DisplayPokerUI = [];
        return _this;
    }
    SolitaireThemesEffectColumnUI.prototype.OnCreate = function () { };
    SolitaireThemesEffectColumnUI.prototype.OnRelease = function () { };
    SolitaireThemesEffectColumnUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.node.x = this.args.x;
        this.args.receive.forEach(function (it, i) {
            _this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                point: it.point,
                suit: it.suit,
                backSkin: { kind: "classic", index: 0 },
                frontSkin: 0,
                status: it.status,
                faceSkin: 0
            }, _this.receiveRoot).CloseBy(_this));
        });
        this.args.play.forEach(function (it, i) {
            _this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                point: it.point,
                suit: it.suit,
                backSkin: { kind: "classic", index: 0 },
                frontSkin: 0,
                status: it.status,
                faceSkin: 0
            }, _this.playRoot).CloseBy(_this).PositionTo(0, _this.__GetPaddingYWith(_this.args.play, it, i)));
        });
    };
    SolitaireThemesEffectColumnUI.prototype.__GetPaddingYWith = function (play, it, index) {
        var dy = 0;
        for (var i = 0; i < index; ++i) {
            dy -= (play[i].status == SolitaireEnums_1.EPokerStatus.CLOSE ? SolitaireGameDesktopUI_1.default.PLAY_CLOSE_POKER_PADDING_Y : SolitaireGameDesktopUI_1.default.PLAY_OPEN_POKER_PADDING_Y);
        }
        return dy;
    };
    SolitaireThemesEffectColumnUI.prototype.SetSkin = function (skin) {
        this.m_DisplayPokerUI.forEach(function (ui) { return ui.setSkin(skin); });
    };
    __decorate([
        property(cc.Node)
    ], SolitaireThemesEffectColumnUI.prototype, "receiveRoot", void 0);
    __decorate([
        property(cc.Node)
    ], SolitaireThemesEffectColumnUI.prototype, "playRoot", void 0);
    SolitaireThemesEffectColumnUI = __decorate([
        ccclass
    ], SolitaireThemesEffectColumnUI);
    return SolitaireThemesEffectColumnUI;
}(ii.UIComp));
exports.default = SolitaireThemesEffectColumnUI;

cc._RF.pop();