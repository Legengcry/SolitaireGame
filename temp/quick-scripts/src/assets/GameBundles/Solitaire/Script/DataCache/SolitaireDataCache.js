"use strict";
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