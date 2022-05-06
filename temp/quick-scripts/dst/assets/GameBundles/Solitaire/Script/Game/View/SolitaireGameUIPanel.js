
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxTb2xpdGFpcmVHYW1lVUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2REFBNEQ7QUFDNUQsdURBQWlEO0FBQ2pELCtEQUE4RDtBQUM5RCxvREFBbUQ7QUFDbkQsZ0VBQStEO0FBWXpELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDO0lBQWtELHdDQUFvQztJQUF0RjtRQUFBLHFFQWlJQztRQXpIVyxjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFXLEdBQTJCLElBQUksQ0FBQztRQUMzQyxpQkFBVyxHQUEyQixJQUFJLENBQUM7UUFDM0MsVUFBSSxHQUFnQixJQUFJLENBQUM7O0lBc0hyQyxDQUFDOzZCQWpJb0Isb0JBQW9CO0lBYTNCLHVDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBb0IsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ3ZHLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQW9CLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDbkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBb0IsQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNuRyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFvQixDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElB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SyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7O0lBL0hlLDBCQUFLLEdBQUc7UUFDcEIsMkJBQTJCLEVBQUUsa0NBQWtDLENBQUMsYUFBYTs7UUFDNUUseUJBQXlCLEVBQUUsZ0NBQWdDLENBQUMsVUFBVTs7UUFDdEUseUJBQXlCLEVBQUUsZ0NBQWdDLENBQUMsV0FBVzs7UUFDdkUsb0JBQW9CLEVBQUUsMkJBQTJCO1FBQ2pELG9CQUFvQixFQUFFLHNCQUFzQixDQUFDLGFBQWE7S0FDOUQsQ0FBQTtJQVBnQixvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQWlJeEM7SUFBRCwyQkFBQztDQWpJRCxBQWlJQyxDQWpJaUQsRUFBRSxDQUFDLE9BQU8sR0FpSTNEO2tCQWpJb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFya1NlZWQgfSBmcm9tIFwiLi4vLi4vRGF0YUNhY2hlL1NvbGl0YWlyZURhdGFDYWNoZVwiO1xuaW1wb3J0IHsgU29saXRhaXJlTG9naWMgfSBmcm9tIFwiLi4vLi4vTG9naWMvU29saXRhaXJlTG9naWNcIjtcbmltcG9ydCB7IEVHYW1lVHlwZSB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vTW9kZWwvU29saXRhaXJlSnVcIjtcbmltcG9ydCB7IFNvbGl0YWlyZVRlc3REYXRhIH0gZnJvbSBcIi4uL01vZGVsL1NvbGl0YWlyZVRlc3REYXRhXCI7XG5pbXBvcnQgU29saXRhaXJlR2FtZURlc2t0b3BVSSBmcm9tIFwiLi9Tb2xpdGFpcmVHYW1lRGVza3RvcFVJXCI7XG5pbXBvcnQgU29saXRhaXJlR2FtZVRvcEluZm9VSSwgeyBTb2xpdGFpcmVHYW1lVG9wSW5mb1VJQXJncyB9IGZyb20gXCIuL1NvbGl0YWlyZUdhbWVUb3BJbmZvVUlcIjtcblxuZXhwb3J0IHR5cGUgU29saXRhaXJlR2FtZVVJUGFuZWxBcmdzID0ge1xuICAgIGdhbWVUeXBlOiBFR2FtZVR5cGUsXG4gICAgcmVzdW1lOiBib29sZWFuLFxuICAgIHZlZ2FzOiBib29sZWFuLFxuICAgIGNhcmQzOiBib29sZWFuLFxuICAgIG1hcmtTZWVkPzogTWFya1NlZWRcbn1cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saXRhaXJlR2FtZVVJUGFuZWwgZXh0ZW5kcyBpaS5VSVBhbmVsPFNvbGl0YWlyZUdhbWVVSVBhbmVsQXJncz4ge1xuICAgIHN0YXRpYyByZWFkb25seSBldmVudCA9IHtcbiAgICAgICAgRVZFTlRfR0FNRVNDRU5FX1JFUExBWV9HQU1FOiAnRVZUX1NPTElUQUlSRV9HQU1FVUlfUkVQTEFZX0dBTUUnIC8vIOmHjeeOqea4uOaIj++8iOiDnOWIqemhtemdou+8iVxuICAgICAgICAsRVZFTlRfR0FNRVNDRU5FX1NLSVBfR0FNRTogJ0VWVF9TT0xJVEFJUkVfR0FNRVVJX1NLSVBfR0FNRScgLy8g6Lez6L+H5b2T5YmN6L+b5bqm5bGAXG4gICAgICAgICxFVkVOVF9HQU1FU0NFTkVfTkVYVF9HQU1FOiAnRVZUX1NPTElUQUlSRV9HQU1FVUlfTkVYVF9HQU1FJyAvLyDog5zliKnpobXpnaLvvIzkuIvkuIDlsYBcbiAgICAgICAgLEVWRU5UX0dBTUVTQ0VORV9CQUNLOiAnRVZUX1NPTElUQUlSRV9HQU1FVUlfQkFDSydcbiAgICAgICAgLEVWRU5UX0dBTUVTQ0VORV9TRUVEOiAnRVZFTlRfR0FNRVNDRU5FX1NFRUQnIC8vIOaJk+W8gCBTZWVkIOeVjOmdolxuICAgIH1cbiAgICBwcml2YXRlIG1fSXNUZXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtX0Rlc2t0b3BVSTogU29saXRhaXJlR2FtZURlc2t0b3BVSSA9IG51bGw7XG4gICAgcHJpdmF0ZSBtX1RvcEluZm9VSTogU29saXRhaXJlR2FtZVRvcEluZm9VSSA9IG51bGw7XG4gICAgcHJpdmF0ZSBtX0p1OiBTb2xpdGFpcmVKdSA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25HbG9iYWwoU29saXRhaXJlR2FtZVVJUGFuZWwuZXZlbnQuRVZFTlRfR0FNRVNDRU5FX1JFUExBWV9HQU1FLCB0aGlzLkhhbmRsZVJlcGxheUdhbWUuYmluZCh0aGlzKSlcbiAgICAgICAgdGhpcy5vbkdsb2JhbChTb2xpdGFpcmVHYW1lVUlQYW5lbC5ldmVudC5FVkVOVF9HQU1FU0NFTkVfU0tJUF9HQU1FLCB0aGlzLkhhbmRsZVNraXBHYW1lLmJpbmQodGhpcykpXG4gICAgICAgIHRoaXMub25HbG9iYWwoU29saXRhaXJlR2FtZVVJUGFuZWwuZXZlbnQuRVZFTlRfR0FNRVNDRU5FX05FWFRfR0FNRSwgdGhpcy5IYW5kbGVOZXh0R2FtZS5iaW5kKHRoaXMpKVxuICAgICAgICB0aGlzLm9uR2xvYmFsKFNvbGl0YWlyZUdhbWVVSVBhbmVsLmV2ZW50LkVWRU5UX0dBTUVTQ0VORV9CQUNLLCB0aGlzLk9uQmFjay5iaW5kKHRoaXMpKVxuICAgICAgICB0aGlzLm9uR2xvYmFsKFNvbGl0YWlyZUdhbWVVSVBhbmVsLmV2ZW50LkVWRU5UX0dBTUVTQ0VORV9TRUVELCB0aGlzLkhhbmRsZU9wZW5TZWVkTGlzdC5iaW5kKHRoaXMpKVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IFNvbGl0YWlyZUdhbWVVSVBhbmVsQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25CYWNrXCIsIHRoaXMuT25CYWNrLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm1fRGVza3RvcFVJID0gaWkuVUlNZ3IuaW5zLkNyZWF0ZTxTb2xpdGFpcmVHYW1lRGVza3RvcFVJPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuU29saXRhaXJlR2FtZURlc2t0b3BVSS5rZXksIG51bGwsIHRoaXMubm9kZSkuQ2xvc2VCeSh0aGlzKTtcbiAgICAgICAgdGhpcy5tX1RvcEluZm9VSSA9IGlpLlVJTWdyLmlucy5DcmVhdGU8U29saXRhaXJlR2FtZVRvcEluZm9VSSwgU29saXRhaXJlR2FtZVRvcEluZm9VSUFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5Tb2xpdGFpcmVHYW1lVG9wSW5mb1VJLmtleSwgeyBPbkJhY2s6IHRoaXMuT25CYWNrLmJpbmQodGhpcykgfSwgdGhpcy5ub2RlKS5DbG9zZUJ5KHRoaXMpO1xuICAgICAgICBpZih0aGlzLm1fSXNUZXN0KSB7XG4gICAgICAgICAgICB0aGlzLkNyZWF0ZUdhbWVXaXRoVGVzdERhdGEodGhpcy5hcmdzLnZlZ2FzLCB0aGlzLmFyZ3MuY2FyZDMsIEVHYW1lVHlwZS5FQVNZKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih0aGlzLmFyZ3MucmVzdW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNuYXBEYXRhID0gU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLlJlYWRTbmFwRGF0YSh0aGlzLmFyZ3MudmVnYXMsIHRoaXMuYXJncy5jYXJkMywgdGhpcy5hcmdzLmdhbWVUeXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLkVudGVyR2FtZShzbmFwRGF0YS5nYW1lVHlwZSwgc25hcERhdGEudmVnYXMsIHNuYXBEYXRhLmNhcmQzLCAoKT0+dGhpcy5tX0p1LkVudGVyV2l0aFNuYXAoc25hcERhdGEpKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5hcmdzLmdhbWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRUdhbWVUeXBlLkVBU1k6IHRoaXMuX19DcmVhdGVFYXN5R2FtZSh0aGlzLmFyZ3MudmVnYXMsIHRoaXMuYXJncy5jYXJkMyk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5IQVJEOnRoaXMuX19DcmVhdGVIYXJkR2FtZSh0aGlzLmFyZ3MudmVnYXMsIHRoaXMuYXJncy5jYXJkMyk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5TRUVEOiB0aGlzLl9fQ3JlYXRlU2VlZEdhbWUodGhpcy5hcmdzLnZlZ2FzLCB0aGlzLmFyZ3MuY2FyZDMsIHRoaXMuYXJncy5tYXJrU2VlZC5zKTsgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfX0NyZWF0ZUVhc3lHYW1lKHZlZ2FzOiBib29sZWFuLCBjYXJkMzogYm9vbGVhbikge1xuICAgICAgICBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuTG9hZEVhc3lMZXZlbCh2ZWdhcywgY2FyZDMsIChpc1ZlZ2FzTW9kZTogYm9vbGVhbiwgaXNDYXJkM01vZGU6IGJvb2xlYW4sIHNlZWQ6IG51bWJlcik9PntcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlR2FtZShpc1ZlZ2FzTW9kZSwgaXNDYXJkM01vZGUsIEVHYW1lVHlwZS5FQVNZLCBzZWVkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgX19DcmVhdGVIYXJkR2FtZSh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4pIHsgdGhpcy5DcmVhdGVHYW1lKHZlZ2FzLCBjYXJkMywgRUdhbWVUeXBlLkhBUkQsIG5ldyBpaS5NQ0dSYW5kKGlpLmRhdGUuZ2V0TWlsbGlUaW1lU3RhbXAoKSkucmFuZ2UoMSwgMTAwMDApKTsgfVxuICAgIHByaXZhdGUgX19DcmVhdGVTZWVkR2FtZSh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4sIHNlZWQ6IG51bWJlcikgeyB0aGlzLkNyZWF0ZUdhbWUodmVnYXMsIGNhcmQzLCBFR2FtZVR5cGUuU0VFRCwgc2VlZCk7IH1cblxuICAgIHByaXZhdGUgQ3JlYXRlR2FtZVdpdGhUZXN0RGF0YSh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4sIGdhbWVUeXBlOiBFR2FtZVR5cGUpIHtcbiAgICAgICAgdGhpcy5FbnRlckdhbWUoZ2FtZVR5cGUsIHZlZ2FzLCBjYXJkMywgKCk9PntcbiAgICAgICAgICAgIHRoaXMubV9KdS5FbnRlcldpdGhUZXN0RGF0YShTb2xpdGFpcmVUZXN0RGF0YS5kYXRhMSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDcmVhdGVHYW1lKGlzVmVnYXNNb2RlOiBib29sZWFuLCBpc0NhcmQzTW9kZTogYm9vbGVhbiwgZ2FtZVR5cGU6IEVHYW1lVHlwZSwgc2VlZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuRW50ZXJHYW1lKGdhbWVUeXBlLCBpc1ZlZ2FzTW9kZSwgaXNDYXJkM01vZGUsICgpPT50aGlzLm1fSnUuRW50ZXIoc2VlZCkpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBFbnRlckdhbWUoZ2FtZVR5cGU6IEVHYW1lVHlwZSwgaXNWZWdhc01vZGU6IGJvb2xlYW4sIGlzQ2FyZDNNb2RlOiBib29sZWFuLCBtb2RlbEVudGVyRnVuYzogRnVuY3Rpb24pe1xuICAgICAgICBpaS5BcHAuaW5zLnAuYWQuTG9hZEludGVyc3RpdGlhbElmTm90QXZhbGFibGUoKTtcbiAgICAgICAgdGhpcy5FeGl0R2FtZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5tX0p1ID0gbmV3IFNvbGl0YWlyZUp1KGdhbWVUeXBlLCBpc1ZlZ2FzTW9kZSwgaXNDYXJkM01vZGUpXG4gICAgICAgICAgICB0aGlzLm1fRGVza3RvcFVJLkVudGVyKHRoaXMubV9KdSlcbiAgICAgICAgICAgIHRoaXMubV9Ub3BJbmZvVUkuRW50ZXIodGhpcy5tX0p1KVxuICAgICAgICAgICAgbW9kZWxFbnRlckZ1bmMoKVxuICAgICAgICAgICAgdGhpcy5TdGFydFNjaGVkdWxlcihcIlNPTElUQUlSRV9HQU1FX1RJQ0tcIiwgKCk9PnRoaXMubV9KdS5UaWNrKCksIDEpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgRXhpdEdhbWUoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKHRoaXMubV9KdSl7XG4gICAgICAgICAgICB0aGlzLlN0b3BTY2hlZHVsZXIoXCJTT0xJVEFJUkVfR0FNRV9USUNLXCIpO1xuICAgICAgICAgICAgdGhpcy5tX1RvcEluZm9VSS5FeGl0KHRoaXMubV9KdSlcbiAgICAgICAgICAgIHRoaXMubV9EZXNrdG9wVUkuRXhpdCh0aGlzLm1fSnUpXG4gICAgICAgICAgICB0aGlzLm1fSnUuRXhpdCgpXG4gICAgICAgICAgICB0aGlzLm1fSnUgPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBFdmVudCBIYW5kbGVyc1xuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgIHByaXZhdGUgSGFuZGxlUmVwbGF5R2FtZSgpIHtcbiAgICAgICAgU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLkNsZWFyU25hcERhdGEodGhpcy5tX0p1LmlzVmVnYXNNb2RlLCB0aGlzLm1fSnUuaXNDYXJkM01vZGUsIHRoaXMubV9KdS5nYW1lVHlwZSk7XG4gICAgICAgIHRoaXMuQ3JlYXRlR2FtZSh0aGlzLm1fSnUuaXNWZWdhc01vZGUsIHRoaXMubV9KdS5pc0NhcmQzTW9kZSwgdGhpcy5tX0p1LmdhbWVUeXBlLCB0aGlzLm1fSnUuU2VlZClcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVTa2lwR2FtZSgpIHtcbiAgICAgICAgLy8g6Lez6L+H5b2T5YmN5bGA77yM566X546p5a626L6T5LqG6L+Z5bGAXG4gICAgICAgIFNvbGl0YWlyZUxvZ2ljLmRhdGFDYWNoZS5Ta2lwTGV2ZWxJbmRleCh0aGlzLm1fSnUuaXNWZWdhc01vZGUsIHRoaXMubV9KdS5pc0NhcmQzTW9kZSwgdGhpcy5tX0p1LmdhbWVUeXBlLCBmYWxzZSk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tX0p1LmdhbWVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5FQVNZOiB0aGlzLl9fQ3JlYXRlRWFzeUdhbWUodGhpcy5tX0p1LmlzVmVnYXNNb2RlLCB0aGlzLm1fSnUuaXNDYXJkM01vZGUpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRUdhbWVUeXBlLkhBUkQ6dGhpcy5fX0NyZWF0ZUhhcmRHYW1lKHRoaXMubV9KdS5pc1ZlZ2FzTW9kZSwgdGhpcy5tX0p1LmlzQ2FyZDNNb2RlKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5TRUVEOiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlZWQgPSBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuR2V0TmV4dE1hcmtTZWVkKHRoaXMubV9KdS5pc1ZlZ2FzTW9kZSwgdGhpcy5tX0p1LmlzQ2FyZDNNb2RlLCB0aGlzLm1fSnUuU2VlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX0NyZWF0ZVNlZWRHYW1lKHRoaXMubV9KdS5pc1ZlZ2FzTW9kZSwgdGhpcy5tX0p1LmlzQ2FyZDNNb2RlLCBzZWVkKTtcbiAgICAgICAgICAgIH0gYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIEhhbmRsZU5leHRHYW1lKCkge1xuICAgICAgICBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuU2tpcExldmVsSW5kZXgodGhpcy5tX0p1LmlzVmVnYXNNb2RlLCB0aGlzLm1fSnUuaXNDYXJkM01vZGUsIHRoaXMubV9KdS5nYW1lVHlwZSwgdHJ1ZSk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tX0p1LmdhbWVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5FQVNZOiB0aGlzLl9fQ3JlYXRlRWFzeUdhbWUodGhpcy5tX0p1LmlzVmVnYXNNb2RlLCB0aGlzLm1fSnUuaXNDYXJkM01vZGUpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRUdhbWVUeXBlLkhBUkQ6dGhpcy5fX0NyZWF0ZUhhcmRHYW1lKHRoaXMubV9KdS5pc1ZlZ2FzTW9kZSwgdGhpcy5tX0p1LmlzQ2FyZDNNb2RlKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5TRUVEOiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlZWQgPSBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuR2V0TmV4dE1hcmtTZWVkKHRoaXMubV9KdS5pc1ZlZ2FzTW9kZSwgdGhpcy5tX0p1LmlzQ2FyZDNNb2RlLCB0aGlzLm1fSnUuU2VlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX0NyZWF0ZVNlZWRHYW1lKHRoaXMubV9KdS5pc1ZlZ2FzTW9kZSwgdGhpcy5tX0p1LmlzQ2FyZDNNb2RlLCBzZWVkKTtcbiAgICAgICAgICAgIH0gYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIE9uQmFjaygpIHtcbiAgICAgICAgU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLldyaXRlU25hcERhdGEodGhpcy5tX0p1LlNuYXAoKSwgdGhpcy5tX0p1LmdhbWVUeXBlKTtcbiAgICAgICAgdGhpcy5Mb2FkUmVzTGlzdChbXG4gICAgICAgICAgICBTb2xpdGFpcmVQcmVmYWJDZmcucGZiLnBhbmVsLlNvbGl0YWlyZU1lbnVVSVBhbmVsLmtleVxuICAgICAgICBdLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5FeGl0R2FtZSgoKT0+e1xuICAgICAgICAgICAgICAgIGlpLlVJTWdyLmlucy5PcGVuKFNvbGl0YWlyZVByZWZhYkNmZy5wZmIucGFuZWwuU29saXRhaXJlTWVudVVJUGFuZWwua2V5LCBudWxsLCAoKT0+dGhpcy5DbG9zZSgpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVPcGVuU2VlZExpc3QoKSB7XG4gICAgICAgIGlpLlVJTWdyLmlucy5PcGVuPFNvbGl0YWlyZUxldmVsTGlzdFVJUGFuZWxBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLnBhbmVsLlNvbGl0YWlyZVNlZWRMaXN0VUlQYW5lbC5rZXksIHtcbiAgICAgICAgICAgIHZlZ2FzOiB0aGlzLm1fSnUuaXNWZWdhc01vZGUsXG4gICAgICAgICAgICBjYXJkMzogdGhpcy5tX0p1LmlzQ2FyZDNNb2RlLFxuICAgICAgICAgICAgT25TZWxlY3Q6IChtYXJrU2VlZDogTWFya1NlZWQsIHZlZ2FzOiBib29sZWFuLCBjYXJkMzogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX19DcmVhdGVTZWVkR2FtZSh2ZWdhcywgY2FyZDMsIG1hcmtTZWVkLnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=