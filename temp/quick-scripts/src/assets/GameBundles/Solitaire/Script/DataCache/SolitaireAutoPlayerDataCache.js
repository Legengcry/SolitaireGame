"use strict";
cc._RF.push(module, '0d4d480XNRJqZ+VJXhDuTeN', 'SolitaireAutoPlayerDataCache');
// GameBundles/Solitaire/Script/DataCache/SolitaireAutoPlayerDataCache.ts

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
exports.SolitaireAutoPlayerDataCache = void 0;
var SolitaireAutoPlayerDataCache = /** @class */ (function (_super) {
    __extends(SolitaireAutoPlayerDataCache, _super);
    function SolitaireAutoPlayerDataCache() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //! 播放速度
        /**
         * 速度分为 5 档位 0 1 2 3 4
         * 正常是 1 档
         * 档位和速度：
         * 0：2.4秒每步
         * 1：1.2秒每步
         * 2：0.6秒每步
         * 3：0.3秒每步
         * 4：0.15秒每步
         */
        // 自动玩牌的时间间隔
        _this.kAutoPlayMinInterval = 0.15;
        _this.kAutoCollectDuration = 0.15;
        _this.autoSpeedBV = null;
        _this.MaxSpeed = 4;
        return _this;
    }
    Object.defineProperty(SolitaireAutoPlayerDataCache.prototype, "LSKey", {
        get: function () { return "ls_solitaire_autoplayer"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireAutoPlayerDataCache.prototype, "DefaultLSData", {
        get: function () {
            return {
                autoSpeed: 1,
            };
        },
        enumerable: false,
        configurable: true
    });
    SolitaireAutoPlayerDataCache.prototype.OnRegister = function () {
        var _this = this;
        this.autoSpeedBV = ii.NumberBV.Borrow(this.data.autoSpeed).ReturnBy(this).Bind(function (val) {
            _this.data.autoSpeed = val;
            _this.markDirty(1);
        }, false, this);
    };
    SolitaireAutoPlayerDataCache.prototype.OnUnRegister = function () { };
    Object.defineProperty(SolitaireAutoPlayerDataCache.prototype, "AutoPlayInterval", {
        get: function () { return this.kAutoPlayMinInterval * Math.pow(2, (4 - this.autoSpeedBV.v)); },
        enumerable: false,
        configurable: true
    });
    SolitaireAutoPlayerDataCache.prototype.SpeedUp = function (ju) {
        if (this.IsMaxSpeed()) {
            return;
        }
        this.autoSpeedBV.v += 1;
        ju.ChangeAutoPlayInterval(this.AutoPlayInterval);
    };
    SolitaireAutoPlayerDataCache.prototype.SpeedDown = function (ju) {
        if (this.IsMinSpeed()) {
            return;
        }
        this.autoSpeedBV.v -= 1;
        ju.ChangeAutoPlayInterval(this.AutoPlayInterval);
    };
    SolitaireAutoPlayerDataCache.prototype.IsMaxSpeed = function () { return this.autoSpeedBV.v >= this.MaxSpeed; }; /** 是否是自动玩牌最大速度 */
    SolitaireAutoPlayerDataCache.prototype.IsMinSpeed = function () { return this.autoSpeedBV.v <= 0; }; /** 是否是自动玩牌最低速度 */
    return SolitaireAutoPlayerDataCache;
}(ii.LSDataCache));
exports.SolitaireAutoPlayerDataCache = SolitaireAutoPlayerDataCache;

cc._RF.pop();