
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Logic/SolitaireLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxMb2dpY1xcU29saXRhaXJlTG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHlEQUF3RDtBQUN4RCxnREFBK0M7QUFFL0M7O0dBRUc7QUFDSDtJQUE2QyxrQ0FBUTtJQUFyRDs7SUF1REEsQ0FBQztJQXRERyxzQkFBVywyQkFBUzthQUFwQixjQUE2QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDMUcsc0JBQVcsc0JBQUk7YUFBZixjQUE0QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDOUcsc0JBQVcsd0JBQU07YUFBakIsY0FBb0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUFZLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBSTVILFdBQVc7SUFDSixzQkFBTyxHQUFkLFVBQWUsR0FBVyxFQUFFLFVBQTJCO1FBQ25ELElBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLEVBQUU7WUFDNUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDdEQsT0FBTztTQUNWO1FBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7WUFDaEMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDOUIsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVE7SUFDRCxzQkFBTyxHQUFkLFVBQWUsRUFBZTtRQUMxQixJQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDO1lBQ3JCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7U0FDbEU7YUFBSTtZQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDRCw0QkFBYSxHQUFwQixVQUFxQixFQUFlO1FBQXBDLGlCQWlCQztRQWhCRyxJQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO1NBQy9CO2FBQUk7WUFDRCxJQUFJLGVBQWUsR0FBRztnQkFDbEIsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUE7WUFDRCxJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQzNCLGVBQWUsRUFBRSxDQUFBO2FBQ3BCO2lCQUFJO2dCQUNGLDJFQUEyRTtnQkFDdEUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLGVBQWUsRUFBRSxDQUFDO2dCQUN0QixLQUFLO2FBQ1I7U0FDSjtJQUNMLENBQUM7SUFDRCxNQUFNO0lBQ0MsNEJBQWEsR0FBcEIsVUFBcUIsRUFBZSxFQUFFLEVBQW1CO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFqREQsa0JBQWtCO0lBQ00sc0NBQXVCLEdBQVcsRUFBRSxDQUFDO0lBaURqRSxxQkFBQztDQXZERCxBQXVEQyxDQXZENEMsRUFBRSxDQUFDLEtBQUssR0F1RHBEO0FBdkRxQix3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbGl0YWlyZUF1dG9QbGF5ZXJEYXRhQ2FjaGUgfSBmcm9tIFwiLi4vRGF0YUNhY2hlL1NvbGl0YWlyZUF1dG9QbGF5ZXJEYXRhQ2FjaGVcIjtcbmltcG9ydCB7IFNvbGl0YWlyZURhdGFDYWNoZSB9IGZyb20gXCIuLi9EYXRhQ2FjaGUvU29saXRhaXJlRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVTa2luRGF0YUNhY2hlIH0gZnJvbSBcIi4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVKdSB9IGZyb20gXCIuLi9HYW1lL01vZGVsL1NvbGl0YWlyZUp1XCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlQ2ZnXCI7XG5cbi8qKlxuICog5ri45oiP6YC76L6R5o6n5Yi25ZmoXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTb2xpdGFpcmVMb2dpYyBleHRlbmRzIGlpLkxvZ2ljIHtcbiAgICBzdGF0aWMgZ2V0IGRhdGFDYWNoZSgpOiBTb2xpdGFpcmVEYXRhQ2FjaGUgeyByZXR1cm4gdGhpcy5HZXREYXRhQ2FjaGUoU29saXRhaXJlQ2ZnLlNPTElUQUlSRV9EQVRBQ0FDSEUpOyB9XG4gICAgc3RhdGljIGdldCBza2luKCk6IFNvbGl0YWlyZVNraW5EYXRhQ2FjaGUgeyByZXR1cm4gdGhpcy5HZXREYXRhQ2FjaGUoU29saXRhaXJlQ2ZnLlNPTElUQUlSRV9TS0lOX0RBVEFDQUNIRSk7IH1cbiAgICBzdGF0aWMgZ2V0IHBsYXllcigpOiBTb2xpdGFpcmVBdXRvUGxheWVyRGF0YUNhY2hlIHsgcmV0dXJuIHRoaXMuR2V0RGF0YUNhY2hlKFNvbGl0YWlyZUNmZy5TT0xJVEFJUkVfQVVUT1BMQVlFUl9EQVRBQ0FDSEUpOyB9XG5cbiAgICAvLyNyZWdpb24gLy8hIOW5v+WRiuaOpeWPo1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFdBVENIX0FEX1JFV0FSREVEX0NPSU5TOiBudW1iZXIgPSAzMDtcbiAgICAvLyDnnIvlub/lkYrlupXlsYLmjqXlj6PvvJtcbiAgICBzdGF0aWMgV2F0Y2hBRChtc2c6IHN0cmluZywgb25SZXdhcmRlZDogaWkuVm9pZEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKCFpaS5BcHAuaW5zLnAuYWQuSXNSZXdhcmRlZFZpZGVvQXZhaWxhYmxlKCkpIHtcbiAgICAgICAgICAgIGlpLlVJTWdyLmlucy5TaG93TXNnKFwic29saXRhaXJlLmFkX2lzX25vdF9hdmFpbGFibGVcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWkuVUlNZ3IuaW5zLk9wZW5EaWFsb2cyKG1zZywgbnVsbCwgKCk9PntcbiAgICAgICAgICAgIGlpLkFwcC5pbnMucC5hZC5TaG93UmV3YXJkZWRWaWRlbygoKT0+e1xuICAgICAgICAgICAgICAgIG9uUmV3YXJkZWQoKTtcbiAgICAgICAgICAgICAgICBpaS5BcHAuaW5zLnAudXNlci5TZXRHYW1lQ2VudGVyVmFsKFwiV2F0Y2hWaWRlb1wiLCBpaS5BcHAuaW5zLnAudXNlci5HZXRHYW1lQ2VudGVyVmFsKFwiV2F0Y2hWaWRlb1wiKSsxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyEg5o+Q56S65Yqf6IO9XG4gICAgc3RhdGljIFVzZUhpbnQoanU6IFNvbGl0YWlyZUp1KSB7XG4gICAgICAgIGlmKGp1Lkhhc09wZXJhdGlvbkhpbnQoKSl7XG4gICAgICAgICAgICBqdS5pc0hpbnRlZEJWLnYgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbWl0R2xvYmFsKFNvbGl0YWlyZUp1LmV2ZW50LkVWRU5UX0xFVkVMX01PREVMX1VTSU5HX0hJTlQpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWkuVUlNZ3IuaW5zLlNob3dNc2coXCJzb2xpdGFpcmUubm9faGludFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vISDluK7liqnlip/og71cbiAgICBzdGF0aWMgVXNlQXV0b1BsYXllcihqdTogU29saXRhaXJlSnUpIHtcbiAgICAgICAgaWYoanUuaXNIZWxwZWRCVi52KSB7XG4gICAgICAgICAgICBqdS5pc1BsYXllck9wZW5lZEJWLnYgPSB0cnVlXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IF9fVXNlQXV0b1BsYXllciA9ICgpPT57XG4gICAgICAgICAgICAgICAgLS10aGlzLmRhdGFDYWNoZS5oZWxwQlYudjtcbiAgICAgICAgICAgICAgICBqdS5PblVzZUhlbHAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YUNhY2hlLmhlbHBCVi52ID4gMCl7XG4gICAgICAgICAgICAgICAgX19Vc2VBdXRvUGxheWVyKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgLy8gdGhpcy5XYXRjaEFEKGlpLkxhbmdVdGlsLkdldChcInNvbGl0YWlyZS53YXRjaF9hZF90b19yZXdhcmRfaGVscFwiKSwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgKyt0aGlzLmRhdGFDYWNoZS5oZWxwQlYudjtcbiAgICAgICAgICAgICAgICAgICAgX19Vc2VBdXRvUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyEg6IOc5YipXG4gICAgc3RhdGljIEhhbmRsZUdhbWVXaW4oanU6IFNvbGl0YWlyZUp1LCBjYjogaWkuVm9pZEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuZGF0YUNhY2hlLkhhbmRsZUdhbWVXaW4oanUpO1xuICAgICAgICBpaS5VdGlsLnNhZmVDYWxsKGNiKTtcbiAgICB9XG59XG4iXX0=