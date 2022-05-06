"use strict";
cc._RF.push(module, '4b47bkrPVNCV5BOeDAA3DIi', 'SolitaireLogic');
// GameBundles/Solitaire/Script/Logic/SolitaireLogic.ts

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
exports.SolitaireLogic = void 0;
var SolitaireJu_1 = require("../Game/Model/SolitaireJu");
var SolitaireCfg_1 = require("../SolitaireCfg");
/**
 * 游戏逻辑控制器
 */
var SolitaireLogic = /** @class */ (function (_super) {
    __extends(SolitaireLogic, _super);
    function SolitaireLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SolitaireLogic, "dataCache", {
        get: function () { return this.GetDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_DATACACHE); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireLogic, "skin", {
        get: function () { return this.GetDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_SKIN_DATACACHE); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireLogic, "player", {
        get: function () { return this.GetDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_AUTOPLAYER_DATACACHE); },
        enumerable: false,
        configurable: true
    });
    // 看广告底层接口；
    SolitaireLogic.WatchAD = function (msg, onRewarded) {
        if (!ii.App.ins.p.ad.IsRewardedVideoAvailable()) {
            ii.UIMgr.ins.ShowMsg("solitaire.ad_is_not_available");
            return;
        }
        ii.UIMgr.ins.OpenDialog2(msg, null, function () {
            ii.App.ins.p.ad.ShowRewardedVideo(function () {
                onRewarded();
                ii.App.ins.p.user.SetGameCenterVal("WatchVideo", ii.App.ins.p.user.GetGameCenterVal("WatchVideo") + 1);
            });
        });
    };
    //! 提示功能
    SolitaireLogic.UseHint = function (ju) {
        if (ju.HasOperationHint()) {
            ju.isHintedBV.v = true;
            this.emitGlobal(SolitaireJu_1.SolitaireJu.event.EVENT_LEVEL_MODEL_USING_HINT);
        }
        else {
            ii.UIMgr.ins.ShowMsg("solitaire.no_hint");
        }
    };
    //! 帮助功能
    SolitaireLogic.UseAutoPlayer = function (ju) {
        var _this = this;
        if (ju.isHelpedBV.v) {
            ju.isPlayerOpenedBV.v = true;
        }
        else {
            var __UseAutoPlayer = function () {
                --_this.dataCache.helpBV.v;
                ju.OnUseHelp();
            };
            if (this.dataCache.helpBV.v > 0) {
                __UseAutoPlayer();
            }
            else {
                // this.WatchAD(ii.LangUtil.Get("solitaire.watch_ad_to_reward_help"), ()=>{
                ++this.dataCache.helpBV.v;
                __UseAutoPlayer();
                //});
            }
        }
    };
    //! 胜利
    SolitaireLogic.HandleGameWin = function (ju, cb) {
        this.dataCache.HandleGameWin(ju);
        ii.Util.safeCall(cb);
    };
    //#region //! 广告接口
    SolitaireLogic.WATCH_AD_REWARDED_COINS = 30;
    return SolitaireLogic;
}(ii.Logic));
exports.SolitaireLogic = SolitaireLogic;

cc._RF.pop();