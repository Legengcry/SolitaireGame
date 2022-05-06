"use strict";
cc._RF.push(module, '9a548vlMWdMK6N371fcjjRt', 'SolitaireStage');
// GameBundles/Solitaire/Script/SolitaireStage.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireAutoPlayerDataCache_1 = require("./DataCache/SolitaireAutoPlayerDataCache");
var SolitaireDataCache_1 = require("./DataCache/SolitaireDataCache");
var SolitaireSkinDataCache_1 = require("./DataCache/SolitaireSkinDataCache");
var SolitaireLogic_1 = require("./Logic/SolitaireLogic");
var SolitaireAudioCfg_1 = require("./SolitaireAudioCfg");
var SolitaireAutoAtlasCfg_1 = require("./SolitaireAutoAtlasCfg");
var SolitaireCfg_1 = require("./SolitaireCfg");
var SolitaireJsonCfg_1 = require("./SolitaireJsonCfg");
var SolitaireLangCfg_1 = require("./SolitaireLangCfg");
var SolitairePrefabCfg_1 = require("./SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("./SolitaireSpriteFrameCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireStage = /** @class */ (function (_super) {
    __extends(SolitaireStage, _super);
    function SolitaireStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SolitaireStage.prototype.GetDefaultEffectAudioKey = function () { return SolitaireAudioCfg_1.SolitaireAudioCfg.effect.default; };
    SolitaireStage.prototype.OnInit = function (onUICompleted, args) {
        console.info("Solitaire::OnInit");
        SolitaireAudioCfg_1.SolitaireAudioCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireLangCfg_1.SolitaireLangCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireJsonCfg_1.SolitaireJsonCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitairePrefabCfg_1.SolitairePrefabCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        // 数据准备
        this.AddAutoReleaseDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_DATACACHE, SolitaireDataCache_1.SolitaireDataCache);
        this.AddAutoReleaseDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_SKIN_DATACACHE, SolitaireSkinDataCache_1.SolitaireSkinDataCache);
        this.AddAutoReleaseDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_AUTOPLAYER_DATACACHE, SolitaireAutoPlayerDataCache_1.SolitaireAutoPlayerDataCache);
        this.LoadResList(__spreadArrays(ii.resDict2ResKeyList(SolitaireJsonCfg_1.SolitaireJsonCfg.key), ii.resDict2ResKeyList(SolitaireLangCfg_1.SolitaireLangCfg.lang), ii.prefabCfg2ResKeyList(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp), ii.resDict2ResKeyList(SolitaireAudioCfg_1.SolitaireAudioCfg.effect), SolitaireLogic_1.SolitaireLogic.skin.GetPreloadResList()), function () {
            // 背景音乐
            ii.AudioMgr.ins.playMusic(SolitaireAudioCfg_1.SolitaireAudioCfg.music.default);
            ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key, null, onUICompleted);
        });
    };
    SolitaireStage = __decorate([
        ccclass
    ], SolitaireStage);
    return SolitaireStage;
}(ii.UIStage));
exports.default = SolitaireStage;

cc._RF.pop();