
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/DataCache/SolitaireDataCache.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01fc3SXq7hIfo2frEoAmFYl', 'SolitaireDataCache');
// GameBundles/Solitaire/Script/DataCache/SolitaireDataCache.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireDataCache = exports.SolitaireDataCacheUtil = void 0;
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitaireJsonCfg_1 = require("../SolitaireJsonCfg");
var SolitaireDataCacheUtil = /** @class */ (function () {
    function SolitaireDataCacheUtil() {
    }
    SolitaireDataCacheUtil.MODE_2_INDEX = function (vegas, card3) { return (vegas ? 2 : 0) + (card3 ? 1 : 0); };
    SolitaireDataCacheUtil.MODE_2_INDEX_BY_JU = function (ju) { return this.MODE_2_INDEX(ju.isVegasMode, ju.isCard3Mode); };
    return SolitaireDataCacheUtil;
}());
exports.SolitaireDataCacheUtil = SolitaireDataCacheUtil;
var SolitaireDataCache = /** @class */ (function (_super) {
    __extends(SolitaireDataCache, _super);
    function SolitaireDataCache() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinBV = null;
        _this.helpBV = null;
        _this.recordBV = null;
        _this.leftHandBV = null;
        _this.cards3ModeBV = null;
        _this.vegasModeBV = null;
        _this.passCountBV = null;
        _this.loseCountBV = null;
        _this.__SORT_FUNC = function (a, b) {
            if (a.t === b.t) {
                return a.st - b.st;
            }
            else {
                return a.t - b.t;
            }
        };
        return _this;
        //#endregion
    }
    Object.defineProperty(SolitaireDataCache.prototype, "LSKey", {
        get: function () { return "ls_solitaire_v2"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireDataCache.prototype, "DefaultLSData", {
        get: function () {
            return {
                coin: 100,
                help: 3,
                record: 3,
                leftHand: false,
                cards3Mode: false,
                vegasMode: false,
                passCount: 0,
                loseCount: 0,
                markSeeds: [[
                        { t: SolitaireEnums_1.EGameType.EASY, s: 1987, st: 0 }
                    ], [
                        { t: SolitaireEnums_1.EGameType.EASY, s: 1987, st: 0 }
                    ], [
                        { t: SolitaireEnums_1.EGameType.EASY, s: 1987, st: 0 }
                    ], [
                        { t: SolitaireEnums_1.EGameType.EASY, s: 1987, st: 0 }
                    ]]
            };
        },
        enumerable: false,
        configurable: true
    });
    SolitaireDataCache.prototype.OnUnRegister = function () { };
    SolitaireDataCache.prototype.OnRegister = function () {
        var _this = this;
        this.coinBV = ii.NumberBV.Borrow(this.data.coin).ReturnBy(this).Bind(function (val) { _this.data.coin = val; _this.markDirty(1); }, false, this);
        this.helpBV = ii.NumberBV.Borrow(this.data.help).ReturnBy(this).Bind(function (val) { _this.data.help = val; _this.markDirty(1); }, false, this);
        this.recordBV = ii.NumberBV.Borrow(this.data.record).ReturnBy(this).Bind(function (val) { _this.data.record = val; _this.markDirty(1); }, false, this);
        this.leftHandBV = ii.BooleanBV.Borrow(this.data.leftHand).ReturnBy(this).Bind(function (val) { _this.data.leftHand = val; _this.markDirty(1); }, false, this);
        this.cards3ModeBV = ii.BooleanBV.Borrow(this.data.cards3Mode).ReturnBy(this).Bind(function (val) { _this.data.cards3Mode = val; _this.markDirty(1); }, false, this);
        this.vegasModeBV = ii.BooleanBV.Borrow(this.data.vegasMode).ReturnBy(this).Bind(function (val) { _this.data.vegasMode = val; _this.markDirty(1); }, false, this);
        // statistic
        this.passCountBV = ii.NumberBV.Borrow(this.data.passCount).ReturnBy(this).Bind(function (val) { _this.data.passCount = val; _this.markDirty(1); }, false, this);
        this.loseCountBV = ii.NumberBV.Borrow(this.data.loseCount).ReturnBy(this).Bind(function (val) { _this.data.loseCount = val; _this.markDirty(1); }, false, this);
        // mode history
        for (var i = 0; i < 2; ++i) {
            for (var j = 0; j < 2; ++j) {
                var key = this.__ModeHistoryLSKey(i === 1, j === 1);
                this.SetUserData(key, ii.ObjectBV.BorrowAsUserLS(key, this.defaultModeData, true).ReturnBy(this));
            }
        }
    };
    //#region //! 金币管理
    SolitaireDataCache.prototype.ChangeCoins = function (dCoins, onChange) {
        this.coinBV.v += dCoins;
        if (onChange != null) {
            onChange(dCoins);
        }
        this.emitGlobal(SolitaireDataCache.event.SYNC_UICOIN, this.coinBV.v);
        if (dCoins > 0) {
            ii.App.ins.p.user.SetGameCenterVal("ScoreAsCoin", ii.App.ins.p.user.GetGameCenterVal("ScoreAsCoin") + 1);
        }
    };
    //#endregion
    //#region //! 棋局快照
    SolitaireDataCache.prototype.SnapDataKey = function (vegas, card3, difficulty) { return "ls_solitaire_snap_data_" + (vegas ? 1 : 0) + "_" + (card3 ? 1 : 0) + "_" + difficulty; };
    SolitaireDataCache.prototype.HasSnapData = function (vegas, card3, difficulty) { return ii.UserLSMgr.ins.hasKey(this.SnapDataKey(vegas, card3, difficulty)); };
    SolitaireDataCache.prototype.ReadSnapData = function (vegas, card3, difficulty) { return ii.UserLSMgr.ins.getObjectWithDefault(this.SnapDataKey(vegas, card3, difficulty), null); };
    SolitaireDataCache.prototype.ClearSnapData = function (vegas, card3, difficulty) { ii.UserLSMgr.ins.deleteKey(this.SnapDataKey(vegas, card3, difficulty)); };
    SolitaireDataCache.prototype.WriteSnapData = function (snapData, difficulty) { ii.UserLSMgr.ins.setObject(this.SnapDataKey(snapData.vegas, snapData.card3, difficulty), snapData, true); };
    //#endregion
    //#region //! 本地关卡数据配置表
    SolitaireDataCache.prototype.LoadEasyLevel = function (isVegas, is3Card, cb) {
        var jsonAsset = this.__GetLevelJsonAsset(isVegas, is3Card);
        var seeds = jsonAsset.json;
        var index = this.GetModeHistory(isVegas, is3Card).v.easyLevelIndex % seeds.length;
        var seed = seeds[index];
        cb(isVegas, is3Card, seed);
    };
    SolitaireDataCache.prototype.__GetLevelJsonAsset = function (isVegas, is3Card) { return ii.ResMgr.ins.GetRes(SolitaireJsonCfg_1.SolitaireJsonCfg.GetLevelJsonResKey(isVegas, is3Card)); };
    Object.defineProperty(SolitaireDataCache.prototype, "defaultModeData", {
        //#endregion
        //#region //! 历史数据
        get: function () {
            return {
                easyLevelIndex: 0, passCount: 0, loseCount: 0,
                gameTimeBest: 0, gameTimeAverage: 0, gameTimeTotal: 0,
                moveStepBest: 0, moveStepAverage: 0, moveStepTotal: 0, moveStepWorest: 0,
                scoreBest: 0, scoreAverage: 0, scoreTotal: 0,
            };
        },
        enumerable: false,
        configurable: true
    });
    // 跳过当前关卡（用户点击 SkipGame 的时候，会调用到此方法)
    SolitaireDataCache.prototype.__ModeHistoryLSKey = function (vegas, card3) { return "ls_mode_history_" + (vegas ? 1 : 0) + "_" + (card3 ? 1 : 0); };
    SolitaireDataCache.prototype.GetModeHistory = function (vegas, card3) { return this.GetUserData(this.__ModeHistoryLSKey(vegas, card3)); };
    SolitaireDataCache.prototype.SkipLevelIndex = function (vegas, card3, gameType, isWin) {
        // 清除快照数据
        this.ClearSnapData(vegas, card3, gameType);
        // 这种情况算失败，记录失败的数据
        var modeHistoryBV = this.GetModeHistory(vegas, card3);
        var modeHistoryValue = modeHistoryBV.v;
        if (isWin) {
            // 过关局数
            this.loseCountBV.v += 1;
            modeHistoryValue.loseCount += 1;
        }
        if (gameType === SolitaireEnums_1.EGameType.EASY) {
            modeHistoryValue.easyLevelIndex += 1;
        }
        modeHistoryBV.v = modeHistoryValue;
    };
    SolitaireDataCache.prototype.ResetModeHistory = function (vegas, card3) { this.GetModeHistory(vegas, card3).v = this.defaultModeData; };
    //#endregion
    //#region //! 游戏胜利
    SolitaireDataCache.prototype.HandleGameWin = function (ju) {
        // 不同模式下的数据记录
        var modeHistory = this.GetModeHistory(ju.isVegasMode, ju.isCard3Mode);
        var modeHistoryValue = modeHistory.v;
        // 进度记录
        if (ju.gameType === SolitaireEnums_1.EGameType.EASY) {
            modeHistoryValue.easyLevelIndex = modeHistoryValue.easyLevelIndex + 1;
        }
        // 过关局数
        this.passCountBV.v += 1;
        modeHistoryValue.passCount += 1;
        //! GameCenter 数据
        ii.App.ins.p.user.SetGameCenterVal("GameWins", ii.App.ins.p.user.GetGameCenterVal("GameWins") + 1);
        // 时间相关内容
        {
            var gameTime = ju.gameTime;
            modeHistoryValue.gameTimeTotal += gameTime;
            if (gameTime < modeHistoryValue.gameTimeBest || modeHistoryValue.gameTimeBest == 0) {
                modeHistoryValue.gameTimeBest = gameTime;
            }
            modeHistoryValue.gameTimeAverage = Math.ceil(modeHistoryValue.gameTimeTotal / modeHistoryValue.passCount);
        }
        // 移动步数相关内容
        {
            var moveStep = ju.moveStepCountBV.v;
            modeHistoryValue.moveStepTotal += moveStep;
            if (moveStep < modeHistoryValue.moveStepBest || modeHistoryValue.moveStepBest == 0) {
                modeHistoryValue.moveStepBest = moveStep;
            }
            if (moveStep > modeHistoryValue.moveStepWorest || modeHistoryValue.moveStepWorest == 0) {
                modeHistoryValue.moveStepWorest = moveStep;
            }
            modeHistoryValue.moveStepAverage = Math.ceil(modeHistoryValue.moveStepTotal / modeHistoryValue.passCount);
        }
        // 分数
        {
            var score = ju.scoreBV.v;
            modeHistoryValue.scoreTotal += score;
            if (score > modeHistoryValue.scoreBest) {
                modeHistoryValue.scoreBest = score;
            }
            modeHistoryValue.scoreAverage = Math.ceil(modeHistoryValue.scoreAverage / modeHistoryValue.passCount);
        }
        ////////////////////////////////////////////////
        modeHistory.v = modeHistoryValue;
        // 清除 Resume 数据
        this.ClearSnapData(ju.isVegasMode, ju.isCard3Mode, ju.gameType);
    };
    //#endregion
    //#region //! 种子管理
    SolitaireDataCache.prototype.GetMarkSeedsList = function (vegas, card3) { return this.data.markSeeds[SolitaireDataCacheUtil.MODE_2_INDEX(vegas, card3)]; };
    SolitaireDataCache.prototype.GetMarkSeedsListByJu = function (ju) { return this.data.markSeeds[SolitaireDataCacheUtil.MODE_2_INDEX_BY_JU(ju)]; };
    SolitaireDataCache.prototype.GetNextMarkSeed = function (vegas, card3, seed) {
        var markSeeds = this.GetMarkSeedsList(vegas, card3);
        for (var i = markSeeds.length - 1; i >= 0; --i) {
            var levelData = markSeeds[i];
            if (levelData.s === seed) {
                return markSeeds[(i + 1) % markSeeds.length].s;
            }
        }
        console.error("SEED \u7C7B\u578B\u5173\u5361 >> \u627E\u4E0D\u5230\u4E0B\u4E00\u5173");
        return 1;
    };
    SolitaireDataCache.prototype.RecordSeed = function (ju, isWin) {
        var markSeeds = this.GetMarkSeedsListByJu(ju);
        // 过关种子
        var find = false;
        for (var i = markSeeds.length - 1; i >= 0; --i) {
            var levelData = markSeeds[i];
            if (levelData.s === ju.Seed) {
                find = true;
                levelData.st = ju.moveStepCountBV.v;
                markSeeds.sort(this.__SORT_FUNC);
                this.markDirty(1);
            }
        }
        if ((!find) && (ju.gameType !== SolitaireEnums_1.EGameType.SEED)) {
            markSeeds.push({
                t: ju.gameType,
                s: ju.Seed,
                st: isWin ? ju.moveStepCountBV.v : 0
            });
            markSeeds.sort(this.__SORT_FUNC);
            this.markDirty(1);
        }
    };
    SolitaireDataCache.prototype.RemoveSeed = function (vegas, card3, markSeed) {
        var markSeeds = this.GetMarkSeedsList(vegas, card3);
        // 过关种子
        for (var i = markSeeds.length - 1; i >= 0; --i) {
            var levelData = markSeeds[i];
            if (levelData.s === markSeed.s) {
                markSeeds.splice(i, 1);
                this.markDirty(1);
                return true;
            }
        }
        return false;
    };
    SolitaireDataCache.prototype.IsLevelRecorded = function (ju) {
        var markSeeds = this.GetMarkSeedsListByJu(ju);
        var find = false;
        for (var i = markSeeds.length - 1; i >= 0; --i) {
            var pass = markSeeds[i];
            if (pass.s === ju.Seed) {
                find = true;
            }
        }
        return find;
    };
    SolitaireDataCache.prototype.IsCanRecordJuSeed = function (ju) {
        return (ju.gameType !== SolitaireEnums_1.EGameType.SEED) && (!this.IsLevelRecorded(ju));
    };
    SolitaireDataCache.event = {
        SYNC_UICOIN: "dc.SOLITAIRE.COIN_CHANGED"
    };
    return SolitaireDataCache;
}(ii.LSDataCache));
exports.SolitaireDataCache = SolitaireDataCache;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxEYXRhQ2FjaGVcXFNvbGl0YWlyZURhdGFDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0RBQThDO0FBQzlDLHdEQUF1RDtBQXNDdkQ7SUFBQTtJQUdBLENBQUM7SUFGVSxtQ0FBWSxHQUFuQixVQUFvQixLQUFjLEVBQUUsS0FBYyxJQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLHlDQUFrQixHQUF6QixVQUEwQixFQUFlLElBQVksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwSCw2QkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSHFCLHdEQUFzQjtBQUs1QztJQUF3QyxzQ0FBaUM7SUFBekU7UUFBQSxxRUErUEM7UUFoTkcsWUFBTSxHQUFnQixJQUFJLENBQUM7UUFDM0IsWUFBTSxHQUFnQixJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUFnQixJQUFJLENBQUM7UUFDN0IsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQWlCLElBQUksQ0FBQztRQUNsQyxpQkFBVyxHQUFpQixJQUFJLENBQUM7UUEyQ2pDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFxRnhCLGlCQUFXLEdBQUcsVUFBQyxDQUFXLEVBQUUsQ0FBVztZQUMzQyxJQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDWixPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUNwQjtpQkFBSTtnQkFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQTs7UUFtRUQsWUFBWTtJQUNoQixDQUFDO0lBM1BHLHNCQUFjLHFDQUFLO2FBQW5CLGNBQWdDLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMzRCxzQkFBYyw2Q0FBYTthQUEzQjtZQUNJLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixTQUFTLEVBQUUsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBRTt3QkFDVCxFQUFDLENBQUMsRUFBRSwwQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7cUJBQ3RDLEVBQUM7d0JBQ0UsRUFBQyxDQUFDLEVBQUUsMEJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDO3FCQUN0QyxFQUFDO3dCQUNFLEVBQUMsQ0FBQyxFQUFFLDBCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQztxQkFDdEMsRUFBQzt3QkFDRSxFQUFDLENBQUMsRUFBRSwwQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7cUJBQ3RDLENBQUU7YUFDTixDQUFDO1FBQ04sQ0FBQzs7O09BQUE7SUFDUyx5Q0FBWSxHQUF0QixjQUEyQixDQUFDO0lBQ2xCLHVDQUFVLEdBQXBCO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pKLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZKLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BKLFlBQVk7UUFDWixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuSixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuSixlQUFlO1FBQ2YsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBRTtZQUNqQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFHLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3JHO1NBQ0o7SUFDTCxDQUFDO0lBVUQsa0JBQWtCO0lBQ2xCLHdDQUFXLEdBQVgsVUFBWSxNQUFNLEVBQUUsUUFBaUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDO1FBQ3hCLElBQUcsUUFBUSxJQUFJLElBQUksRUFBRTtZQUNqQixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRSxJQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDWCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFHO0lBQ0wsQ0FBQztJQUNELFlBQVk7SUFFWixrQkFBa0I7SUFDVix3Q0FBVyxHQUFuQixVQUFvQixLQUFjLEVBQUUsS0FBYyxFQUFFLFVBQXFCLElBQVksT0FBTyw2QkFBMEIsS0FBSyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsV0FBSSxLQUFLLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxVQUFJLFVBQVksQ0FBQyxDQUFDLENBQUM7SUFDL0osd0NBQVcsR0FBWCxVQUFZLEtBQWMsRUFBRSxLQUFjLEVBQUUsVUFBcUIsSUFBYSxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0oseUNBQVksR0FBWixVQUFhLEtBQWMsRUFBRSxLQUFjLEVBQUUsVUFBcUIsSUFBYyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0wsMENBQWEsR0FBYixVQUFjLEtBQWMsRUFBRSxLQUFjLEVBQUUsVUFBcUIsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hKLDBDQUFhLEdBQWIsVUFBYyxRQUFrQixFQUFFLFVBQXFCLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEssWUFBWTtJQUVaLHVCQUF1QjtJQUN2QiwwQ0FBYSxHQUFiLFVBQWMsT0FBZ0IsRUFBRSxPQUFnQixFQUFFLEVBQW9FO1FBQ2xILElBQUksU0FBUyxHQUFpQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pFLElBQUksS0FBSyxHQUFhLFNBQVMsQ0FBQyxJQUFJLENBQUE7UUFDcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFBO1FBQ2pGLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2QixFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBQ08sZ0RBQW1CLEdBQTNCLFVBQTRCLE9BQWdCLEVBQUUsT0FBZ0IsSUFBa0IsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUNBQWdCLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBS3JLLHNCQUFZLCtDQUFlO1FBSDNCLFlBQVk7UUFFWixrQkFBa0I7YUFDbEI7WUFBaUQsT0FBTztnQkFDcEQsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUM3QyxZQUFZLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUM7Z0JBQ3JELFlBQVksRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxDQUFDO2dCQUN4RSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUM7YUFDL0MsQ0FBQTtRQUFBLENBQUM7OztPQUFBO0lBR0Ysb0NBQW9DO0lBQzVCLCtDQUFrQixHQUExQixVQUEyQixLQUFjLEVBQUUsS0FBYyxJQUFZLE9BQU8sc0JBQW1CLEtBQUssQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLFdBQUksS0FBSyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQztJQUMxSCwyQ0FBYyxHQUFkLFVBQWUsS0FBYyxFQUFFLEtBQWMsSUFBNEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUksMkNBQWMsR0FBZCxVQUFlLEtBQWMsRUFBRSxLQUFjLEVBQUUsUUFBbUIsRUFBRSxLQUFjO1FBQzlFLFNBQVM7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0Msa0JBQWtCO1FBQ2xCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFHLEtBQUssRUFBRTtZQUNOLE9BQU87WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsZ0JBQWdCLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUcsUUFBUSxLQUFLLDBCQUFTLENBQUMsSUFBSSxFQUFFO1lBQzVCLGdCQUFnQixDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxhQUFhLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO0lBQ3ZDLENBQUM7SUFDRCw2Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBYyxFQUFFLEtBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDbEgsWUFBWTtJQUVaLGtCQUFrQjtJQUNsQiwwQ0FBYSxHQUFiLFVBQWMsRUFBZTtRQUN6QixhQUFhO1FBQ2IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RSxJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFckMsT0FBTztRQUNQLElBQUcsRUFBRSxDQUFDLFFBQVEsS0FBSywwQkFBUyxDQUFDLElBQUksRUFBQztZQUM5QixnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQTtTQUN0RTtRQUVELE9BQU87UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsZ0JBQWdCLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUVoQyxpQkFBaUI7UUFDakIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRyxTQUFTO1FBQ1Q7WUFDSSxJQUFJLFFBQVEsR0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25DLGdCQUFnQixDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUE7WUFDMUMsSUFBRyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxJQUFJLGdCQUFnQixDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7Z0JBQy9FLGdCQUFnQixDQUFDLFlBQVksR0FBRyxRQUFRLENBQUE7YUFDM0M7WUFDRCxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEdBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDMUc7UUFFRCxXQUFXO1FBQ1g7WUFDSSxJQUFJLFFBQVEsR0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUM1QyxnQkFBZ0IsQ0FBQyxhQUFhLElBQUksUUFBUSxDQUFBO1lBQzFDLElBQUcsUUFBUSxHQUFHLGdCQUFnQixDQUFDLFlBQVksSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO2dCQUMvRSxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFBO2FBQzNDO1lBQ0QsSUFBRyxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25GLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7YUFDN0M7WUFDRCxnQkFBZ0IsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEdBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDMUc7UUFFRCxLQUFLO1FBQ0w7WUFDSSxJQUFJLEtBQUssR0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxnQkFBZ0IsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFBO1lBQ3BDLElBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtnQkFDbkMsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTthQUNyQztZQUNELGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUN0RztRQUNELGdEQUFnRDtRQUVoRCxXQUFXLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1FBRWpDLGVBQWU7UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQUNELFlBQVk7SUFFWixrQkFBa0I7SUFDbEIsNkNBQWdCLEdBQWhCLFVBQWlCLEtBQWMsRUFBRSxLQUFjLElBQWdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvSSxpREFBb0IsR0FBcEIsVUFBcUIsRUFBZSxJQUFnQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBU2hJLDRDQUFlLEdBQWYsVUFBZ0IsS0FBYyxFQUFFLEtBQWMsRUFBRSxJQUFZO1FBQ3hELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsS0FBSSxJQUFJLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3JDLElBQUksU0FBUyxHQUFhLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNyQixPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLHVFQUFxQixDQUFDLENBQUE7UUFDcEMsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsdUNBQVUsR0FBVixVQUFXLEVBQWUsRUFBRSxLQUFjO1FBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxPQUFPO1FBQ1AsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEtBQUksSUFBSSxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNyQyxJQUFJLFNBQVMsR0FBYSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBRyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ1osU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDSjtRQUNELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSywwQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQzlDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRO2dCQUNkLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSTtnQkFDVixFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QyxDQUFDLENBQUM7WUFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBVyxLQUFjLEVBQUUsS0FBYyxFQUFDLFFBQWtCO1FBQ3hELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsT0FBTztRQUNQLEtBQUksSUFBSSxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNyQyxJQUFJLFNBQVMsR0FBYSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBRyxTQUFTLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsNENBQWUsR0FBZixVQUFnQixFQUFlO1FBQzNCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsS0FBSSxJQUFJLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3JDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN2QixJQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRTtnQkFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsOENBQWlCLEdBQWpCLFVBQWtCLEVBQWU7UUFDN0IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssMEJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzFFLENBQUM7SUE1UGUsd0JBQUssR0FBRztRQUNwQixXQUFXLEVBQUUsMkJBQTJCO0tBQzNDLENBQUE7SUE0UEwseUJBQUM7Q0EvUEQsQUErUEMsQ0EvUHVDLEVBQUUsQ0FBQyxXQUFXLEdBK1ByRDtBQS9QWSxnREFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVKdSB9IGZyb20gXCIuLi9HYW1lL01vZGVsL1NvbGl0YWlyZUp1XCI7XG5pbXBvcnQgeyBTbmFwRGF0YSB9IGZyb20gXCIuLi9HYW1lL1NvbGl0YWlyZVR5cGVcIjtcbmltcG9ydCB7IEVHYW1lVHlwZSB9IGZyb20gXCIuLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IHsgU29saXRhaXJlSnNvbkNmZyB9IGZyb20gXCIuLi9Tb2xpdGFpcmVKc29uQ2ZnXCI7XG5cbmV4cG9ydCB0eXBlIE1hcmtTZWVkID0ge1xuICAgIHQ6IEVHYW1lVHlwZSxcbiAgICBzOiBudW1iZXIsXG4gICAgc3Q6IG51bWJlclxufVxuXG50eXBlIE1vZGVIaXN0b3J5RGF0YSA9IHtcbiAgICBlYXN5TGV2ZWxJbmRleDogbnVtYmVyLCAvLyBFYXN5IOaooeW8j+S4i+eahOWFs+WNoei/m+W6plxuICAgIHBhc3NDb3VudDogbnVtYmVyLCAvLyDov4flhbPlsYDmlbBcbiAgICBsb3NlQ291bnQ6IG51bWJlciwgLy8g5aSx6LSl5qyh5pWwXG4gICAgZ2FtZVRpbWVCZXN0OiBudW1iZXIsIC8vIOa4uOaIj+aXtumVvzog5Y6G5Y+y5pyA55+tXG4gICAgZ2FtZVRpbWVBdmVyYWdlOiBudW1iZXIsIC8vIOa4uOaIj+aXtumVvzog5bmz5Z2H5pe26ZW/XG4gICAgZ2FtZVRpbWVUb3RhbDogbnVtYmVyLCAvLyDmuLjmiI/ml7bplb86IOaAu+aXtumVv1xuICAgIG1vdmVTdGVwQmVzdDogbnVtYmVyLFxuICAgIG1vdmVTdGVwQXZlcmFnZTogbnVtYmVyLFxuICAgIG1vdmVTdGVwVG90YWw6IG51bWJlcixcbiAgICBtb3ZlU3RlcFdvcmVzdDogbnVtYmVyLFxuICAgIHNjb3JlQmVzdDogbnVtYmVyLFxuICAgIHNjb3JlQXZlcmFnZTogbnVtYmVyLFxuICAgIHNjb3JlVG90YWw6IG51bWJlclxufVxuXG50eXBlIERhdGFDYWNoZURhdGFUeXBlID0ge1xuICAgIGNvaW46IG51bWJlcixcbiAgICBoZWxwOiBudW1iZXIsXG4gICAgcmVjb3JkOiBudW1iZXIsIC8qKiDlj6/ku6XlhY3otLnorrDlvZXnmoTmrKHmlbAgKi9cbiAgICBsZWZ0SGFuZDogYm9vbGVhbixcbiAgICBjYXJkczNNb2RlOiBib29sZWFuLFxuICAgIHZlZ2FzTW9kZTogYm9vbGVhbixcblxuICAgIC8vIHN0YXRpc3RpY1xuICAgIHBhc3NDb3VudDogbnVtYmVyLCAvLyDmgLvpgJrlhbPmrKHmlbBcbiAgICBsb3NlQ291bnQ6IG51bWJlciwgLy8g5aSx6LSl5qyh5pWwXG4gICAgbWFya1NlZWRzOiBNYXJrU2VlZFtdW11cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNvbGl0YWlyZURhdGFDYWNoZVV0aWwge1xuICAgIHN0YXRpYyBNT0RFXzJfSU5ERVgodmVnYXM6IGJvb2xlYW4sIGNhcmQzOiBib29sZWFuKTogbnVtYmVyIHsgcmV0dXJuICh2ZWdhcyA/IDIgOiAwKSArIChjYXJkMyA/IDEgOiAwKTsgfVxuICAgIHN0YXRpYyBNT0RFXzJfSU5ERVhfQllfSlUoanU6IFNvbGl0YWlyZUp1KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuTU9ERV8yX0lOREVYKGp1LmlzVmVnYXNNb2RlLCBqdS5pc0NhcmQzTW9kZSk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNvbGl0YWlyZURhdGFDYWNoZSBleHRlbmRzIGlpLkxTRGF0YUNhY2hlPERhdGFDYWNoZURhdGFUeXBlPiB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGV2ZW50ID0ge1xuICAgICAgICBTWU5DX1VJQ09JTjogXCJkYy5TT0xJVEFJUkUuQ09JTl9DSEFOR0VEXCJcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCBMU0tleSgpOiBzdHJpbmcgeyByZXR1cm4gXCJsc19zb2xpdGFpcmVfdjJcIjsgfVxuICAgIHByb3RlY3RlZCBnZXQgRGVmYXVsdExTRGF0YSgpOiBEYXRhQ2FjaGVEYXRhVHlwZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2luOiAxMDAsXG4gICAgICAgICAgICBoZWxwOiAzLFxuICAgICAgICAgICAgcmVjb3JkOiAzLFxuICAgICAgICAgICAgbGVmdEhhbmQ6IGZhbHNlLFxuICAgICAgICAgICAgY2FyZHMzTW9kZTogZmFsc2UsXG4gICAgICAgICAgICB2ZWdhc01vZGU6IGZhbHNlLFxuICAgICAgICAgICAgcGFzc0NvdW50OiAwLFxuICAgICAgICAgICAgbG9zZUNvdW50OiAwLFxuICAgICAgICAgICAgbWFya1NlZWRzOiBbIFtcbiAgICAgICAgICAgICAgICB7dDogRUdhbWVUeXBlLkVBU1ksIHM6IDE5ODcsIHN0OiAwfVxuICAgICAgICAgICAgXSxbXG4gICAgICAgICAgICAgICAge3Q6IEVHYW1lVHlwZS5FQVNZLCBzOiAxOTg3LCBzdDogMH1cbiAgICAgICAgICAgIF0sW1xuICAgICAgICAgICAgICAgIHt0OiBFR2FtZVR5cGUuRUFTWSwgczogMTk4Nywgc3Q6IDB9XG4gICAgICAgICAgICBdLFtcbiAgICAgICAgICAgICAgICB7dDogRUdhbWVUeXBlLkVBU1ksIHM6IDE5ODcsIHN0OiAwfVxuICAgICAgICAgICAgXSBdXG4gICAgICAgIH07XG4gICAgfVxuICAgIHByb3RlY3RlZCBPblVuUmVnaXN0ZXIoKSB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWdpc3RlcigpIHtcbiAgICAgICAgdGhpcy5jb2luQlYgPSBpaS5OdW1iZXJCVi5Cb3Jyb3codGhpcy5kYXRhLmNvaW4pLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57IHRoaXMuZGF0YS5jb2luID0gdmFsOyB0aGlzLm1hcmtEaXJ0eSgxKSB9LCBmYWxzZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuaGVscEJWID0gaWkuTnVtYmVyQlYuQm9ycm93KHRoaXMuZGF0YS5oZWxwKS5SZXR1cm5CeSh0aGlzKS5CaW5kKHZhbD0+eyB0aGlzLmRhdGEuaGVscCA9IHZhbDsgdGhpcy5tYXJrRGlydHkoMSkgfSwgZmFsc2UsIHRoaXMpO1xuICAgICAgICB0aGlzLnJlY29yZEJWID0gaWkuTnVtYmVyQlYuQm9ycm93KHRoaXMuZGF0YS5yZWNvcmQpLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57IHRoaXMuZGF0YS5yZWNvcmQgPSB2YWw7IHRoaXMubWFya0RpcnR5KDEpIH0sIGZhbHNlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5sZWZ0SGFuZEJWID0gaWkuQm9vbGVhbkJWLkJvcnJvdyh0aGlzLmRhdGEubGVmdEhhbmQpLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57IHRoaXMuZGF0YS5sZWZ0SGFuZCA9IHZhbDsgdGhpcy5tYXJrRGlydHkoMSkgfSwgZmFsc2UsIHRoaXMpO1xuICAgICAgICB0aGlzLmNhcmRzM01vZGVCViA9IGlpLkJvb2xlYW5CVi5Cb3Jyb3codGhpcy5kYXRhLmNhcmRzM01vZGUpLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57IHRoaXMuZGF0YS5jYXJkczNNb2RlID0gdmFsOyB0aGlzLm1hcmtEaXJ0eSgxKSB9LCBmYWxzZSwgdGhpcyk7XG4gICAgICAgIHRoaXMudmVnYXNNb2RlQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KHRoaXMuZGF0YS52ZWdhc01vZGUpLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57IHRoaXMuZGF0YS52ZWdhc01vZGUgPSB2YWw7IHRoaXMubWFya0RpcnR5KDEpIH0sIGZhbHNlLCB0aGlzKTtcbiAgICAgICAgLy8gc3RhdGlzdGljXG4gICAgICAgIHRoaXMucGFzc0NvdW50QlYgPSBpaS5OdW1iZXJCVi5Cb3Jyb3codGhpcy5kYXRhLnBhc3NDb3VudCkuUmV0dXJuQnkodGhpcykuQmluZCh2YWw9PnsgdGhpcy5kYXRhLnBhc3NDb3VudCA9IHZhbDsgdGhpcy5tYXJrRGlydHkoMSkgfSwgZmFsc2UsIHRoaXMpO1xuICAgICAgICB0aGlzLmxvc2VDb3VudEJWID0gaWkuTnVtYmVyQlYuQm9ycm93KHRoaXMuZGF0YS5sb3NlQ291bnQpLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57IHRoaXMuZGF0YS5sb3NlQ291bnQgPSB2YWw7IHRoaXMubWFya0RpcnR5KDEpIH0sIGZhbHNlLCB0aGlzKTtcbiAgICAgICAgLy8gbW9kZSBoaXN0b3J5XG4gICAgICAgIGZvcihsZXQgaT0wO2k8MjsrK2kpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8MjsrK2opIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5fX01vZGVIaXN0b3J5TFNLZXkoaT09PTEsaj09PTEpO1xuICAgICAgICAgICAgICAgIHRoaXMuU2V0VXNlckRhdGEoa2V5LCBpaS5PYmplY3RCVi5Cb3Jyb3dBc1VzZXJMUyhrZXksIHRoaXMuZGVmYXVsdE1vZGVEYXRhLCB0cnVlKS5SZXR1cm5CeSh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICBjb2luQlY6IGlpLk51bWJlckJWID0gbnVsbDtcbiAgICBoZWxwQlY6IGlpLk51bWJlckJWID0gbnVsbDtcbiAgICByZWNvcmRCVjogaWkuTnVtYmVyQlYgPSBudWxsO1xuICAgIGxlZnRIYW5kQlY6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgY2FyZHMzTW9kZUJWOiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIHZlZ2FzTW9kZUJWOiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuXG4gICAgLy8jcmVnaW9uIC8vISDph5HluIHnrqHnkIZcbiAgICBDaGFuZ2VDb2lucyhkQ29pbnMsIG9uQ2hhbmdlPzogKGRDb2luczogbnVtYmVyKT0+dm9pZCkge1xuICAgICAgICB0aGlzLmNvaW5CVi52ICs9IGRDb2lucztcbiAgICAgICAgaWYob25DaGFuZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgb25DaGFuZ2UoZENvaW5zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXRHbG9iYWwoU29saXRhaXJlRGF0YUNhY2hlLmV2ZW50LlNZTkNfVUlDT0lOLCB0aGlzLmNvaW5CVi52KTtcblxuICAgICAgICBpZihkQ29pbnMgPiAwKSB7XG4gICAgICAgICAgICBpaS5BcHAuaW5zLnAudXNlci5TZXRHYW1lQ2VudGVyVmFsKFwiU2NvcmVBc0NvaW5cIiwgaWkuQXBwLmlucy5wLnVzZXIuR2V0R2FtZUNlbnRlclZhbChcIlNjb3JlQXNDb2luXCIpKzEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuICAgIFxuICAgIC8vI3JlZ2lvbiAvLyEg5qOL5bGA5b+r54WnXG4gICAgcHJpdmF0ZSBTbmFwRGF0YUtleSh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4sIGRpZmZpY3VsdHk6IEVHYW1lVHlwZSk6IHN0cmluZyB7IHJldHVybiBgbHNfc29saXRhaXJlX3NuYXBfZGF0YV8ke3ZlZ2FzPzE6MH1fJHtjYXJkMz8xOjB9XyR7ZGlmZmljdWx0eX1gOyB9XG4gICAgSGFzU25hcERhdGEodmVnYXM6IGJvb2xlYW4sIGNhcmQzOiBib29sZWFuLCBkaWZmaWN1bHR5OiBFR2FtZVR5cGUpOiBib29sZWFuIHsgcmV0dXJuIGlpLlVzZXJMU01nci5pbnMuaGFzS2V5KHRoaXMuU25hcERhdGFLZXkodmVnYXMsIGNhcmQzLCBkaWZmaWN1bHR5KSk7IH1cbiAgICBSZWFkU25hcERhdGEodmVnYXM6IGJvb2xlYW4sIGNhcmQzOiBib29sZWFuLCBkaWZmaWN1bHR5OiBFR2FtZVR5cGUpOiBTbmFwRGF0YSB7IHJldHVybiBpaS5Vc2VyTFNNZ3IuaW5zLmdldE9iamVjdFdpdGhEZWZhdWx0PFNuYXBEYXRhPih0aGlzLlNuYXBEYXRhS2V5KHZlZ2FzLCBjYXJkMywgZGlmZmljdWx0eSksIG51bGwpOyB9XG4gICAgQ2xlYXJTbmFwRGF0YSh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4sIGRpZmZpY3VsdHk6IEVHYW1lVHlwZSkgeyBpaS5Vc2VyTFNNZ3IuaW5zLmRlbGV0ZUtleSh0aGlzLlNuYXBEYXRhS2V5KHZlZ2FzLCBjYXJkMywgZGlmZmljdWx0eSkpOyB9XG4gICAgV3JpdGVTbmFwRGF0YShzbmFwRGF0YTogU25hcERhdGEsIGRpZmZpY3VsdHk6IEVHYW1lVHlwZSkgeyBpaS5Vc2VyTFNNZ3IuaW5zLnNldE9iamVjdCh0aGlzLlNuYXBEYXRhS2V5KHNuYXBEYXRhLnZlZ2FzLCBzbmFwRGF0YS5jYXJkMywgZGlmZmljdWx0eSksIHNuYXBEYXRhLCB0cnVlKTsgfSAgICBcbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiAvLyEg5pys5Zyw5YWz5Y2h5pWw5o2u6YWN572u6KGoXG4gICAgTG9hZEVhc3lMZXZlbChpc1ZlZ2FzOiBib29sZWFuLCBpczNDYXJkOiBib29sZWFuLCBjYjogKGlzVmVnYXNNb2RlOiBib29sZWFuLCBpc0NhcmQzTW9kZTogYm9vbGVhbiwgc2VlZDogbnVtYmVyKT0+dm9pZCkge1xuICAgICAgICBsZXQganNvbkFzc2V0OiBjYy5Kc29uQXNzZXQgPSB0aGlzLl9fR2V0TGV2ZWxKc29uQXNzZXQoaXNWZWdhcywgaXMzQ2FyZCk7XG4gICAgICAgIGxldCBzZWVkczogbnVtYmVyW10gPSBqc29uQXNzZXQuanNvblxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLkdldE1vZGVIaXN0b3J5KGlzVmVnYXMsIGlzM0NhcmQpLnYuZWFzeUxldmVsSW5kZXggJSBzZWVkcy5sZW5ndGhcbiAgICAgICAgbGV0IHNlZWQgPSBzZWVkc1tpbmRleF1cbiAgICAgICAgY2IoaXNWZWdhcywgaXMzQ2FyZCwgc2VlZClcbiAgICB9XG4gICAgcHJpdmF0ZSBfX0dldExldmVsSnNvbkFzc2V0KGlzVmVnYXM6IGJvb2xlYW4sIGlzM0NhcmQ6IGJvb2xlYW4pOiBjYy5Kc29uQXNzZXQgeyByZXR1cm4gaWkuUmVzTWdyLmlucy5HZXRSZXMoU29saXRhaXJlSnNvbkNmZy5HZXRMZXZlbEpzb25SZXNLZXkoaXNWZWdhcywgaXMzQ2FyZCkpOyB9XG4gICAgXG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gLy8hIOWOhuWPsuaVsOaNrlxuICAgIHByaXZhdGUgZ2V0IGRlZmF1bHRNb2RlRGF0YSgpOiBNb2RlSGlzdG9yeURhdGEgeyByZXR1cm4ge1xuICAgICAgICBlYXN5TGV2ZWxJbmRleDogMCwgcGFzc0NvdW50OiAwLCBsb3NlQ291bnQ6IDAsXG4gICAgICAgIGdhbWVUaW1lQmVzdDogMCwgZ2FtZVRpbWVBdmVyYWdlOiAwLCBnYW1lVGltZVRvdGFsOiAwLFxuICAgICAgICBtb3ZlU3RlcEJlc3Q6IDAsIG1vdmVTdGVwQXZlcmFnZTogMCwgbW92ZVN0ZXBUb3RhbDogMCwgbW92ZVN0ZXBXb3Jlc3Q6IDAsXG4gICAgICAgIHNjb3JlQmVzdDogMCwgc2NvcmVBdmVyYWdlOiAwLCBzY29yZVRvdGFsOiAwLFxuICAgIH19XG4gICAgcGFzc0NvdW50QlY6IGlpLk51bWJlckJWID0gbnVsbDtcbiAgICBsb3NlQ291bnRCVjogaWkuTnVtYmVyQlYgPSBudWxsO1xuICAgIC8vIOi3s+i/h+W9k+WJjeWFs+WNoe+8iOeUqOaIt+eCueWHuyBTa2lwR2FtZSDnmoTml7blgJnvvIzkvJrosIPnlKjliLDmraTmlrnms5UpXG4gICAgcHJpdmF0ZSBfX01vZGVIaXN0b3J5TFNLZXkodmVnYXM6IGJvb2xlYW4sIGNhcmQzOiBib29sZWFuKTogc3RyaW5nIHsgcmV0dXJuIGBsc19tb2RlX2hpc3RvcnlfJHt2ZWdhcz8xOjB9XyR7Y2FyZDM/MTowfWA7IH1cbiAgICBHZXRNb2RlSGlzdG9yeSh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4pOiBpaS5CVjxNb2RlSGlzdG9yeURhdGE+IHsgcmV0dXJuIHRoaXMuR2V0VXNlckRhdGEodGhpcy5fX01vZGVIaXN0b3J5TFNLZXkodmVnYXMsIGNhcmQzKSk7IH1cbiAgICBTa2lwTGV2ZWxJbmRleCh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4sIGdhbWVUeXBlOiBFR2FtZVR5cGUsIGlzV2luOiBib29sZWFuKSB7XG4gICAgICAgIC8vIOa4hemZpOW/q+eFp+aVsOaNrlxuICAgICAgICB0aGlzLkNsZWFyU25hcERhdGEodmVnYXMsIGNhcmQzLCBnYW1lVHlwZSk7XG4gICAgICAgIC8vIOi/meenjeaDheWGteeul+Wksei0pe+8jOiusOW9leWksei0peeahOaVsOaNrlxuICAgICAgICBsZXQgbW9kZUhpc3RvcnlCViA9IHRoaXMuR2V0TW9kZUhpc3RvcnkodmVnYXMsIGNhcmQzKTtcbiAgICAgICAgbGV0IG1vZGVIaXN0b3J5VmFsdWUgPSBtb2RlSGlzdG9yeUJWLnY7ICBcbiAgICAgICAgaWYoaXNXaW4pIHtcbiAgICAgICAgICAgIC8vIOi/h+WFs+WxgOaVsFxuICAgICAgICAgICAgdGhpcy5sb3NlQ291bnRCVi52ICs9IDE7XG4gICAgICAgICAgICBtb2RlSGlzdG9yeVZhbHVlLmxvc2VDb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKGdhbWVUeXBlID09PSBFR2FtZVR5cGUuRUFTWSkge1xuICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5lYXN5TGV2ZWxJbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIG1vZGVIaXN0b3J5QlYudiA9IG1vZGVIaXN0b3J5VmFsdWU7XG4gICAgfVxuICAgIFJlc2V0TW9kZUhpc3RvcnkodmVnYXM6IGJvb2xlYW4sIGNhcmQzOiBib29sZWFuKSB7IHRoaXMuR2V0TW9kZUhpc3RvcnkoIHZlZ2FzLCBjYXJkMyApLnYgPSB0aGlzLmRlZmF1bHRNb2RlRGF0YTsgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIC8vISDmuLjmiI/og5zliKlcbiAgICBIYW5kbGVHYW1lV2luKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICAvLyDkuI3lkIzmqKHlvI/kuIvnmoTmlbDmja7orrDlvZVcbiAgICAgICAgbGV0IG1vZGVIaXN0b3J5ID0gdGhpcy5HZXRNb2RlSGlzdG9yeShqdS5pc1ZlZ2FzTW9kZSwganUuaXNDYXJkM01vZGUpO1xuICAgICAgICBsZXQgbW9kZUhpc3RvcnlWYWx1ZSA9IG1vZGVIaXN0b3J5LnY7XG5cbiAgICAgICAgLy8g6L+b5bqm6K6w5b2VXG4gICAgICAgIGlmKGp1LmdhbWVUeXBlID09PSBFR2FtZVR5cGUuRUFTWSl7XG4gICAgICAgICAgICBtb2RlSGlzdG9yeVZhbHVlLmVhc3lMZXZlbEluZGV4ID0gbW9kZUhpc3RvcnlWYWx1ZS5lYXN5TGV2ZWxJbmRleCsxXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIOi/h+WFs+WxgOaVsFxuICAgICAgICB0aGlzLnBhc3NDb3VudEJWLnYgKz0gMTtcbiAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5wYXNzQ291bnQgKz0gMTtcblxuICAgICAgICAvLyEgR2FtZUNlbnRlciDmlbDmja5cbiAgICAgICAgaWkuQXBwLmlucy5wLnVzZXIuU2V0R2FtZUNlbnRlclZhbChcIkdhbWVXaW5zXCIsIGlpLkFwcC5pbnMucC51c2VyLkdldEdhbWVDZW50ZXJWYWwoXCJHYW1lV2luc1wiKSsxKTtcbiAgICAgICAgXG4gICAgICAgIC8vIOaXtumXtOebuOWFs+WGheWuuVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgZ2FtZVRpbWU6IG51bWJlciA9IGp1LmdhbWVUaW1lO1xuICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5nYW1lVGltZVRvdGFsICs9IGdhbWVUaW1lXG4gICAgICAgICAgICBpZihnYW1lVGltZSA8IG1vZGVIaXN0b3J5VmFsdWUuZ2FtZVRpbWVCZXN0IHx8IG1vZGVIaXN0b3J5VmFsdWUuZ2FtZVRpbWVCZXN0ID09IDApIHtcbiAgICAgICAgICAgICAgICBtb2RlSGlzdG9yeVZhbHVlLmdhbWVUaW1lQmVzdCA9IGdhbWVUaW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RlSGlzdG9yeVZhbHVlLmdhbWVUaW1lQXZlcmFnZSA9IE1hdGguY2VpbChtb2RlSGlzdG9yeVZhbHVlLmdhbWVUaW1lVG90YWwvbW9kZUhpc3RvcnlWYWx1ZS5wYXNzQ291bnQpXG4gICAgICAgIH1cblxuICAgICAgICAvLyDnp7vliqjmraXmlbDnm7jlhbPlhoXlrrlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IG1vdmVTdGVwOiBudW1iZXIgPSBqdS5tb3ZlU3RlcENvdW50QlYudjtcbiAgICAgICAgICAgIG1vZGVIaXN0b3J5VmFsdWUubW92ZVN0ZXBUb3RhbCArPSBtb3ZlU3RlcFxuICAgICAgICAgICAgaWYobW92ZVN0ZXAgPCBtb2RlSGlzdG9yeVZhbHVlLm1vdmVTdGVwQmVzdCB8fCBtb2RlSGlzdG9yeVZhbHVlLm1vdmVTdGVwQmVzdCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5tb3ZlU3RlcEJlc3QgPSBtb3ZlU3RlcFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobW92ZVN0ZXAgPiBtb2RlSGlzdG9yeVZhbHVlLm1vdmVTdGVwV29yZXN0IHx8IG1vZGVIaXN0b3J5VmFsdWUubW92ZVN0ZXBXb3Jlc3QgPT0gMCkge1xuICAgICAgICAgICAgICAgIG1vZGVIaXN0b3J5VmFsdWUubW92ZVN0ZXBXb3Jlc3QgPSBtb3ZlU3RlcFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5tb3ZlU3RlcEF2ZXJhZ2UgPSBNYXRoLmNlaWwobW9kZUhpc3RvcnlWYWx1ZS5tb3ZlU3RlcFRvdGFsL21vZGVIaXN0b3J5VmFsdWUucGFzc0NvdW50KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5YiG5pWwXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBzY29yZTogbnVtYmVyID0ganUuc2NvcmVCVi52O1xuICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5zY29yZVRvdGFsICs9IHNjb3JlXG4gICAgICAgICAgICBpZihzY29yZSA+IG1vZGVIaXN0b3J5VmFsdWUuc2NvcmVCZXN0KSB7XG4gICAgICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5zY29yZUJlc3QgPSBzY29yZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kZUhpc3RvcnlWYWx1ZS5zY29yZUF2ZXJhZ2UgPSBNYXRoLmNlaWwobW9kZUhpc3RvcnlWYWx1ZS5zY29yZUF2ZXJhZ2UvbW9kZUhpc3RvcnlWYWx1ZS5wYXNzQ291bnQpXG4gICAgICAgIH1cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgbW9kZUhpc3RvcnkudiA9IG1vZGVIaXN0b3J5VmFsdWU7XG5cbiAgICAgICAgLy8g5riF6ZmkIFJlc3VtZSDmlbDmja5cbiAgICAgICAgdGhpcy5DbGVhclNuYXBEYXRhKGp1LmlzVmVnYXNNb2RlLCBqdS5pc0NhcmQzTW9kZSwganUuZ2FtZVR5cGUpXG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuICAgIFxuICAgIC8vI3JlZ2lvbiAvLyEg56eN5a2Q566h55CGXG4gICAgR2V0TWFya1NlZWRzTGlzdCh2ZWdhczogYm9vbGVhbiwgY2FyZDM6IGJvb2xlYW4pOiBNYXJrU2VlZFtdIHsgcmV0dXJuIHRoaXMuZGF0YS5tYXJrU2VlZHNbU29saXRhaXJlRGF0YUNhY2hlVXRpbC5NT0RFXzJfSU5ERVgodmVnYXMsIGNhcmQzKV07IH1cbiAgICBHZXRNYXJrU2VlZHNMaXN0QnlKdShqdTogU29saXRhaXJlSnUpOiBNYXJrU2VlZFtdIHsgcmV0dXJuIHRoaXMuZGF0YS5tYXJrU2VlZHNbU29saXRhaXJlRGF0YUNhY2hlVXRpbC5NT0RFXzJfSU5ERVhfQllfSlUoanUpXTsgfVxuICAgIHByaXZhdGUgX19TT1JUX0ZVTkMgPSAoYTogTWFya1NlZWQsIGI6IE1hcmtTZWVkKT0+e1xuICAgICAgICBpZihhLnQgPT09IGIudCkge1xuICAgICAgICAgICAgcmV0dXJuIGEuc3QtYi5zdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gYS50IC0gYi50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgR2V0TmV4dE1hcmtTZWVkKHZlZ2FzOiBib29sZWFuLCBjYXJkMzogYm9vbGVhbiwgc2VlZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG1hcmtTZWVkcyA9IHRoaXMuR2V0TWFya1NlZWRzTGlzdCh2ZWdhcywgY2FyZDMpO1xuICAgICAgICBmb3IobGV0IGk9bWFya1NlZWRzLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCBsZXZlbERhdGE6IE1hcmtTZWVkID0gbWFya1NlZWRzW2ldO1xuICAgICAgICAgICAgaWYobGV2ZWxEYXRhLnMgPT09IHNlZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFya1NlZWRzWyhpKzEpJW1hcmtTZWVkcy5sZW5ndGhdLnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcihgU0VFRCDnsbvlnovlhbPljaEgPj4g5om+5LiN5Yiw5LiL5LiA5YWzYClcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgUmVjb3JkU2VlZChqdTogU29saXRhaXJlSnUsIGlzV2luOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBtYXJrU2VlZHMgPSB0aGlzLkdldE1hcmtTZWVkc0xpc3RCeUp1KGp1KTtcbiAgICAgICAgLy8g6L+H5YWz56eN5a2QXG4gICAgICAgIGxldCBmaW5kID0gZmFsc2U7XG4gICAgICAgIGZvcihsZXQgaT1tYXJrU2VlZHMubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgICAgICAgbGV0IGxldmVsRGF0YTogTWFya1NlZWQgPSBtYXJrU2VlZHNbaV07XG4gICAgICAgICAgICBpZihsZXZlbERhdGEucyA9PT0ganUuU2VlZCkge1xuICAgICAgICAgICAgICAgIGZpbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldmVsRGF0YS5zdCA9IGp1Lm1vdmVTdGVwQ291bnRCVi52O1xuICAgICAgICAgICAgICAgIG1hcmtTZWVkcy5zb3J0KHRoaXMuX19TT1JUX0ZVTkMpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFya0RpcnR5KDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCAoIWZpbmQpICYmIChqdS5nYW1lVHlwZSAhPT0gRUdhbWVUeXBlLlNFRUQpICkge1xuICAgICAgICAgICAgbWFya1NlZWRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHQ6IGp1LmdhbWVUeXBlLFxuICAgICAgICAgICAgICAgIHM6IGp1LlNlZWQsXG4gICAgICAgICAgICAgICAgc3Q6IGlzV2luID8ganUubW92ZVN0ZXBDb3VudEJWLnYgOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1hcmtTZWVkcy5zb3J0KHRoaXMuX19TT1JUX0ZVTkMpO1xuICAgICAgICAgICAgdGhpcy5tYXJrRGlydHkoMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBSZW1vdmVTZWVkKHZlZ2FzOiBib29sZWFuLCBjYXJkMzogYm9vbGVhbixtYXJrU2VlZDogTWFya1NlZWQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG1hcmtTZWVkcyA9IHRoaXMuR2V0TWFya1NlZWRzTGlzdCh2ZWdhcywgY2FyZDMpO1xuICAgICAgICAvLyDov4flhbPnp43lrZBcbiAgICAgICAgZm9yKGxldCBpPW1hcmtTZWVkcy5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgICAgICAgICBsZXQgbGV2ZWxEYXRhOiBNYXJrU2VlZCA9IG1hcmtTZWVkc1tpXTtcbiAgICAgICAgICAgIGlmKGxldmVsRGF0YS5zID09PSBtYXJrU2VlZC5zKSB7XG4gICAgICAgICAgICAgICAgbWFya1NlZWRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtEaXJ0eSgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgSXNMZXZlbFJlY29yZGVkKGp1OiBTb2xpdGFpcmVKdSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgbWFya1NlZWRzID0gdGhpcy5HZXRNYXJrU2VlZHNMaXN0QnlKdShqdSk7XG4gICAgICAgIGxldCBmaW5kID0gZmFsc2U7XG4gICAgICAgIGZvcihsZXQgaT1tYXJrU2VlZHMubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgICAgICAgbGV0IHBhc3MgPSBtYXJrU2VlZHNbaV1cbiAgICAgICAgICAgIGlmKHBhc3MucyA9PT0ganUuU2VlZCkge1xuICAgICAgICAgICAgICAgIGZpbmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5kO1xuICAgIH1cblxuICAgIElzQ2FuUmVjb3JkSnVTZWVkKGp1OiBTb2xpdGFpcmVKdSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKGp1LmdhbWVUeXBlICE9PSBFR2FtZVR5cGUuU0VFRCkgJiYgKCF0aGlzLklzTGV2ZWxSZWNvcmRlZChqdSkpIFxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cbn1cbiJdfQ==