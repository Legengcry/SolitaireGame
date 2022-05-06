
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/DataCache/SolitaireAutoPlayerDataCache.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxEYXRhQ2FjaGVcXFNvbGl0YWlyZUF1dG9QbGF5ZXJEYXRhQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BO0lBQWtELGdEQUFvRDtJQUF0RztRQUFBLHFFQTRDQztRQTdCRyxRQUFRO1FBQ1I7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWTtRQUNLLDBCQUFvQixHQUFXLElBQUksQ0FBQTtRQUMzQywwQkFBb0IsR0FBVyxJQUFJLENBQUE7UUFDNUMsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRXZCLGNBQVEsR0FBVyxDQUFDLENBQUM7O0lBYWxDLENBQUM7SUEzQ0csc0JBQWMsK0NBQUs7YUFBbkIsY0FBZ0MsT0FBTyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ25FLHNCQUFjLHVEQUFhO2FBQTNCO1lBQ0ksT0FBTztnQkFDSCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7UUFDTCxDQUFDOzs7T0FBQTtJQUNTLGlEQUFVLEdBQXBCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDOUUsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ1MsbURBQVksR0FBdEIsY0FBMkIsQ0FBQztJQWlCNUIsc0JBQUksMERBQWdCO2FBQXBCLGNBQWlDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBRXZHLDhDQUFPLEdBQVAsVUFBUSxFQUFlO1FBQ25CLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDO1lBQUUsT0FBTTtTQUFFO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QixFQUFFLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELGdEQUFTLEdBQVQsVUFBVSxFQUFlO1FBQ3JCLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDO1lBQUUsT0FBTTtTQUFFO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QixFQUFFLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELGlEQUFVLEdBQVYsY0FBd0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLGtCQUFrQjtJQUN4RixpREFBVSxHQUFWLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLGtCQUFrQjtJQUNoRixtQ0FBQztBQUFELENBNUNBLEFBNENDLENBNUNpRCxFQUFFLENBQUMsV0FBVyxHQTRDL0Q7QUE1Q1ksb0VBQTRCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vR2FtZS9Nb2RlbC9Tb2xpdGFpcmVKdVwiO1xuXG50eXBlIFNvbGl0YWlyZUF1dG9QbGF5ZXJEYXRhQ2FjaGVEYXRhVHlwZSA9IHtcbiAgICBhdXRvU3BlZWQ6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgU29saXRhaXJlQXV0b1BsYXllckRhdGFDYWNoZSBleHRlbmRzIGlpLkxTRGF0YUNhY2hlPFNvbGl0YWlyZUF1dG9QbGF5ZXJEYXRhQ2FjaGVEYXRhVHlwZT4ge1xuICAgIHByb3RlY3RlZCBnZXQgTFNLZXkoKTogc3RyaW5nIHsgcmV0dXJuIFwibHNfc29saXRhaXJlX2F1dG9wbGF5ZXJcIjsgfVxuICAgIHByb3RlY3RlZCBnZXQgRGVmYXVsdExTRGF0YSgpOiBTb2xpdGFpcmVBdXRvUGxheWVyRGF0YUNhY2hlRGF0YVR5cGUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXV0b1NwZWVkOiAxLFxuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBPblJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLmF1dG9TcGVlZEJWID0gaWkuTnVtYmVyQlYuQm9ycm93KHRoaXMuZGF0YS5hdXRvU3BlZWQpLlJldHVybkJ5KHRoaXMpLkJpbmQodmFsPT57XG4gICAgICAgICAgICB0aGlzLmRhdGEuYXV0b1NwZWVkID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5tYXJrRGlydHkoMSk7XG4gICAgICAgIH0sIGZhbHNlLCB0aGlzKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIE9uVW5SZWdpc3RlcigpIHsgfVxuXG4gICAgLy8hIOaSreaUvumAn+W6plxuICAgIC8qKlxuICAgICAqIOmAn+W6puWIhuS4uiA1IOaho+S9jSAwIDEgMiAzIDRcbiAgICAgKiDmraPluLjmmK8gMSDmoaNcbiAgICAgKiDmoaPkvY3lkozpgJ/luqbvvJpcbiAgICAgKiAw77yaMi4056eS5q+P5q2lXG4gICAgICogMe+8mjEuMuenkuavj+atpVxuICAgICAqIDLvvJowLjbnp5Lmr4/mraVcbiAgICAgKiAz77yaMC4z56eS5q+P5q2lXG4gICAgICogNO+8mjAuMTXnp5Lmr4/mraVcbiAgICAgKi9cbiAgICAvLyDoh6rliqjnjqnniYznmoTml7bpl7Tpl7TpmpRcbiAgICBwcml2YXRlIHJlYWRvbmx5IGtBdXRvUGxheU1pbkludGVydmFsOiBudW1iZXIgPSAwLjE1XG4gICAgcmVhZG9ubHkga0F1dG9Db2xsZWN0RHVyYXRpb246IG51bWJlciA9IDAuMTVcbiAgICBhdXRvU3BlZWRCVjogaWkuTnVtYmVyQlYgPSBudWxsO1xuICAgIGdldCBBdXRvUGxheUludGVydmFsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmtBdXRvUGxheU1pbkludGVydmFsKk1hdGgucG93KDIsICg0LXRoaXMuYXV0b1NwZWVkQlYudikpIH1cbiAgICByZWFkb25seSBNYXhTcGVlZDogbnVtYmVyID0gNDtcbiAgICBTcGVlZFVwKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICBpZih0aGlzLklzTWF4U3BlZWQoKSl7IHJldHVybiB9XG4gICAgICAgIHRoaXMuYXV0b1NwZWVkQlYudiArPSAxXG4gICAgICAgIGp1LkNoYW5nZUF1dG9QbGF5SW50ZXJ2YWwodGhpcy5BdXRvUGxheUludGVydmFsKTtcbiAgICB9XG4gICAgU3BlZWREb3duKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICBpZih0aGlzLklzTWluU3BlZWQoKSl7IHJldHVybiB9XG4gICAgICAgIHRoaXMuYXV0b1NwZWVkQlYudiAtPSAxXG4gICAgICAgIGp1LkNoYW5nZUF1dG9QbGF5SW50ZXJ2YWwodGhpcy5BdXRvUGxheUludGVydmFsKTtcbiAgICB9XG4gICAgSXNNYXhTcGVlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuYXV0b1NwZWVkQlYudiA+PSB0aGlzLk1heFNwZWVkOyB9IC8qKiDmmK/lkKbmmK/oh6rliqjnjqnniYzmnIDlpKfpgJ/luqYgKi9cbiAgICBJc01pblNwZWVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5hdXRvU3BlZWRCVi52IDw9IDA7IH0gLyoqIOaYr+WQpuaYr+iHquWKqOeOqeeJjOacgOS9jumAn+W6piAqL1xufVxuIl19