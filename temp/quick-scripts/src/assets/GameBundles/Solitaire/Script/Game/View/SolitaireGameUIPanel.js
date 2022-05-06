"use strict";
cc._RF.push(module, 'af16cHkE0NCm7/4KivSfdBL', 'SolitaireGameUIPanel');
// GameBundles/Solitaire/Script/Game/View/SolitaireGameUIPanel.ts

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
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var SolitaireJu_1 = require("../Model/SolitaireJu");
var SolitaireTestData_1 = require("../Model/SolitaireTestData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireGameUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireGameUIPanel, _super);
    function SolitaireGameUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_IsTest = false;
        _this.m_DesktopUI = null;
        _this.m_TopInfoUI = null;
        _this.m_Ju = null;
        return _this;
    }
    SolitaireGameUIPanel_1 = SolitaireGameUIPanel;
    SolitaireGameUIPanel.prototype.OnCreate = function () {
        this.onGlobal(SolitaireGameUIPanel_1.event.EVENT_GAMESCENE_REPLAY_GAME, this.HandleReplayGame.bind(this));
        this.onGlobal(SolitaireGameUIPanel_1.event.EVENT_GAMESCENE_SKIP_GAME, this.HandleSkipGame.bind(this));
        this.onGlobal(SolitaireGameUIPanel_1.event.EVENT_GAMESCENE_NEXT_GAME, this.HandleNextGame.bind(this));
        this.onGlobal(SolitaireGameUIPanel_1.event.EVENT_GAMESCENE_BACK, this.OnBack.bind(this));
        this.onGlobal(SolitaireGameUIPanel_1.event.EVENT_GAMESCENE_SEED, this.HandleOpenSeedList.bind(this));
    };
    SolitaireGameUIPanel.prototype.OnRelease = function () { };
    SolitaireGameUIPanel.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.m_DesktopUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireGameDesktopUI.key, null, this.node).CloseBy(this);
        this.m_TopInfoUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireGameTopInfoUI.key, { OnBack: this.OnBack.bind(this) }, this.node).CloseBy(this);
        if (this.m_IsTest) {
            this.CreateGameWithTestData(this.args.vegas, this.args.card3, SolitaireEnums_1.EGameType.EASY);
        }
        else {
            if (this.args.resume) {
                var snapData_1 = SolitaireLogic_1.SolitaireLogic.dataCache.ReadSnapData(this.args.vegas, this.args.card3, this.args.gameType);
                this.EnterGame(snapData_1.gameType, snapData_1.vegas, snapData_1.card3, function () { return _this.m_Ju.EnterWithSnap(snapData_1); });
            }
            else {
                switch (this.args.gameType) {
                    case SolitaireEnums_1.EGameType.EASY:
                        this.__CreateEasyGame(this.args.vegas, this.args.card3);
                        break;
                    case SolitaireEnums_1.EGameType.HARD:
                        this.__CreateHardGame(this.args.vegas, this.args.card3);
                        break;
                    case SolitaireEnums_1.EGameType.SEED:
                        this.__CreateSeedGame(this.args.vegas, this.args.card3, this.args.markSeed.s);
                        break;
                }
            }
        }
    };
    SolitaireGameUIPanel.prototype.__CreateEasyGame = function (vegas, card3) {
        var _this = this;
        SolitaireLogic_1.SolitaireLogic.dataCache.LoadEasyLevel(vegas, card3, function (isVegasMode, isCard3Mode, seed) {
            _this.CreateGame(isVegasMode, isCard3Mode, SolitaireEnums_1.EGameType.EASY, seed);
        });
    };
    SolitaireGameUIPanel.prototype.__CreateHardGame = function (vegas, card3) { this.CreateGame(vegas, card3, SolitaireEnums_1.EGameType.HARD, new ii.MCGRand(ii.date.getMilliTimeStamp()).range(1, 10000)); };
    SolitaireGameUIPanel.prototype.__CreateSeedGame = function (vegas, card3, seed) { this.CreateGame(vegas, card3, SolitaireEnums_1.EGameType.SEED, seed); };
    SolitaireGameUIPanel.prototype.CreateGameWithTestData = function (vegas, card3, gameType) {
        var _this = this;
        this.EnterGame(gameType, vegas, card3, function () {
            _this.m_Ju.EnterWithTestData(SolitaireTestData_1.SolitaireTestData.data1);
        });
    };
    SolitaireGameUIPanel.prototype.CreateGame = function (isVegasMode, isCard3Mode, gameType, seed) {
        var _this = this;
        this.EnterGame(gameType, isVegasMode, isCard3Mode, function () { return _this.m_Ju.Enter(seed); });
    };
    SolitaireGameUIPanel.prototype.EnterGame = function (gameType, isVegasMode, isCard3Mode, modelEnterFunc) {
        var _this = this;
        ii.App.ins.p.ad.LoadInterstitialIfNotAvalable();
        this.ExitGame(function () {
            _this.m_Ju = new SolitaireJu_1.SolitaireJu(gameType, isVegasMode, isCard3Mode);
            _this.m_DesktopUI.Enter(_this.m_Ju);
            _this.m_TopInfoUI.Enter(_this.m_Ju);
            modelEnterFunc();
            _this.StartScheduler("SOLITAIRE_GAME_TICK", function () { return _this.m_Ju.Tick(); }, 1);
        });
    };
    SolitaireGameUIPanel.prototype.ExitGame = function (callback) {
        if (this.m_Ju) {
            this.StopScheduler("SOLITAIRE_GAME_TICK");
            this.m_TopInfoUI.Exit(this.m_Ju);
            this.m_DesktopUI.Exit(this.m_Ju);
            this.m_Ju.Exit();
            this.m_Ju = null;
        }
        callback();
    };
    /*********************************************************************
     * Event Handlers
     *********************************************************************/
    SolitaireGameUIPanel.prototype.HandleReplayGame = function () {
        SolitaireLogic_1.SolitaireLogic.dataCache.ClearSnapData(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType);
        this.CreateGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType, this.m_Ju.Seed);
    };
    SolitaireGameUIPanel.prototype.HandleSkipGame = function () {
        // 跳过当前局，算玩家输了这局
        SolitaireLogic_1.SolitaireLogic.dataCache.SkipLevelIndex(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType, false);
        switch (this.m_Ju.gameType) {
            case SolitaireEnums_1.EGameType.EASY:
                this.__CreateEasyGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode);
                break;
            case SolitaireEnums_1.EGameType.HARD:
                this.__CreateHardGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode);
                break;
            case SolitaireEnums_1.EGameType.SEED:
                {
                    var seed = SolitaireLogic_1.SolitaireLogic.dataCache.GetNextMarkSeed(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.Seed);
                    this.__CreateSeedGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, seed);
                }
                break;
        }
    };
    SolitaireGameUIPanel.prototype.HandleNextGame = function () {
        SolitaireLogic_1.SolitaireLogic.dataCache.SkipLevelIndex(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType, true);
        switch (this.m_Ju.gameType) {
            case SolitaireEnums_1.EGameType.EASY:
                this.__CreateEasyGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode);
                break;
            case SolitaireEnums_1.EGameType.HARD:
                this.__CreateHardGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode);
                break;
            case SolitaireEnums_1.EGameType.SEED:
                {
                    var seed = SolitaireLogic_1.SolitaireLogic.dataCache.GetNextMarkSeed(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.Seed);
                    this.__CreateSeedGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, seed);
                }
                break;
        }
    };
    SolitaireGameUIPanel.prototype.OnBack = function () {
        var _this = this;
        SolitaireLogic_1.SolitaireLogic.dataCache.WriteSnapData(this.m_Ju.Snap(), this.m_Ju.gameType);
        this.LoadResList([
            SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key
        ], function () {
            _this.ExitGame(function () {
                ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key, null, function () { return _this.Close(); });
            });
        });
    };
    SolitaireGameUIPanel.prototype.HandleOpenSeedList = function () {
        var _this = this;
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireSeedListUIPanel.key, {
            vegas: this.m_Ju.isVegasMode,
            card3: this.m_Ju.isCard3Mode,
            OnSelect: function (markSeed, vegas, card3) {
                _this.__CreateSeedGame(vegas, card3, markSeed.s);
            }
        });
    };
    var SolitaireGameUIPanel_1;
    SolitaireGameUIPanel.event = {
        EVENT_GAMESCENE_REPLAY_GAME: 'EVT_SOLITAIRE_GAMEUI_REPLAY_GAME' // 重玩游戏（胜利页面）
        ,
        EVENT_GAMESCENE_SKIP_GAME: 'EVT_SOLITAIRE_GAMEUI_SKIP_GAME' // 跳过当前进度局
        ,
        EVENT_GAMESCENE_NEXT_GAME: 'EVT_SOLITAIRE_GAMEUI_NEXT_GAME' // 胜利页面，下一局
        ,
        EVENT_GAMESCENE_BACK: 'EVT_SOLITAIRE_GAMEUI_BACK',
        EVENT_GAMESCENE_SEED: 'EVENT_GAMESCENE_SEED' // 打开 Seed 界面
    };
    SolitaireGameUIPanel = SolitaireGameUIPanel_1 = __decorate([
        ccclass
    ], SolitaireGameUIPanel);
    return SolitaireGameUIPanel;
}(ii.UIPanel));
exports.default = SolitaireGameUIPanel;

cc._RF.pop();