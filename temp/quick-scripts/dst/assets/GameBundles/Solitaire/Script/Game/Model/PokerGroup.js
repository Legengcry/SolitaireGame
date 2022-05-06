
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/Model/PokerGroup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40f1e6BtilHQa6BAU8UOSHf', 'PokerGroup');
// GameBundles/Solitaire/Script/Game/Model/PokerGroup.ts

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
var SolitaireEnums_1 = require("../../SolitaireEnums");
var PokerGroup = /** @class */ (function (_super) {
    __extends(PokerGroup, _super);
    function PokerGroup(location) {
        var _this = _super.call(this) || this;
        _this.index = null;
        _this.pokers = [];
        _this.location = null;
        _this.m_Listeners = [];
        _this.location = location;
        return _this;
    }
    Object.defineProperty(PokerGroup.prototype, "top", {
        get: function () { return this.IsPokersEmpty() ? null : this.pokers[this.pokers.length - 1]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PokerGroup.prototype, "underTop", {
        get: function () { return this.pokers.length < 2 ? null : this.pokers[this.pokers.length - 2]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PokerGroup.prototype, "zero", {
        get: function () { return this.IsPokersEmpty() ? null : this.pokers[0]; },
        enumerable: false,
        configurable: true
    });
    PokerGroup.prototype.IsPokersEmpty = function () { return this.pokers.length === 0; };
    PokerGroup.prototype.indexOfPoker = function (poker) { return this.pokers.indexOf(poker); };
    Object.defineProperty(PokerGroup.prototype, "rootOpenPoker", {
        get: function () {
            for (var i = 0; i < this.pokers.length; ++i) {
                if (this.pokers[i].status === SolitaireEnums_1.EPokerStatus.OPEN) {
                    return this.pokers[i];
                }
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    PokerGroup.prototype.Reset = function () {
        while (this.m_Listeners.length > 0) {
            this.RemoveEventListener(this.m_Listeners.pop());
        }
        this.pokers = [];
    };
    PokerGroup.prototype.AddEventListener = function (listener) { this.on(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, listener.OnGroupPokerStateChanged.bind(listener), listener); this.m_Listeners.push(listener); };
    PokerGroup.prototype.RemoveEventListener = function (listener) { this.targetOff(listener); };
    PokerGroup.prototype.AddPoker = function (poker) {
        this.pokers.push(poker);
        poker.group = this;
        switch (this.location) {
            case SolitaireEnums_1.ELocation.CLOSE:
                if (poker.status !== SolitaireEnums_1.EPokerStatus.CLOSE) {
                    poker.status = SolitaireEnums_1.EPokerStatus.CLOSE;
                    this.emit(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, poker, poker.status);
                }
                break;
            case SolitaireEnums_1.ELocation.OPEN:
                if (poker.status !== SolitaireEnums_1.EPokerStatus.OPEN) {
                    poker.status = SolitaireEnums_1.EPokerStatus.OPEN;
                    this.emit(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, poker, poker.status);
                }
                break;
        }
        return poker;
    };
    PokerGroup.prototype.IsAutoFlipOnRemovePoker = function (poker) {
        var pokerIndex = this.pokers.indexOf(poker);
        console.assert(pokerIndex >= 0);
        // 玩牌区移除牌时自动翻牌逻辑
        if ((this.location === SolitaireEnums_1.ELocation.PLAY)
            && this.rootOpenPoker === poker
            && (this.pokers[0].status !== SolitaireEnums_1.EPokerStatus.OPEN)) {
            return true;
        }
        return false;
    };
    PokerGroup.prototype.RemoveTop = function () {
        var poker = this.top;
        if (poker) {
            this.pokers.length = this.pokers.length - 1;
            poker.group = null;
            // 玩牌区移除牌时自动翻牌逻辑
            if ((this.location === SolitaireEnums_1.ELocation.PLAY)
                && (!this.IsPokersEmpty())
                && (this.top.status !== SolitaireEnums_1.EPokerStatus.OPEN)) {
                this.top.status = SolitaireEnums_1.EPokerStatus.OPEN;
                this.emit(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, this.top, poker.status);
            }
        }
        return poker;
    };
    PokerGroup.prototype.GetPoker = function (index) {
        if (!this.IsPokersEmpty()) {
            var i = index >= 0 ? index : (this.pokers.length + index);
            if (i < this.pokers.length && i >= 0) {
                return this.pokers[i];
            }
        }
        return null;
    };
    PokerGroup.prototype.IsConcatPoker = function (poker) {
        if (this.IsPokersEmpty()) {
            return poker.point == 13;
        }
        else {
            return this.top.IsConcatable(poker);
        }
    };
    PokerGroup.prototype.IsNextPoker = function (poker) {
        if (this.top) {
            if (this.top.suit === poker.suit) {
                return this.top.point + 1 === poker.point;
            }
            else {
                return false;
            }
        }
        else {
            return poker.point === 1;
        }
    };
    PokerGroup.prototype.GetOpenPokers = function () {
        var pokers = [];
        for (var i = 0; i < this.pokers.length; ++i) {
            if (this.pokers[i].status == SolitaireEnums_1.EPokerStatus.OPEN) {
                pokers.push(this.pokers[i]);
            }
        }
        return pokers;
    };
    PokerGroup.prototype.GetPokerIndexBySuitPoint = function (suit, point, status) {
        if (!this.IsPokersEmpty()) {
            for (var i = 0; i < this.pokers.length; ++i) {
                var poker = this.pokers[i];
                if (poker.status === status && poker.suit == suit && poker.point === point) {
                    return i;
                }
            }
        }
        return -1;
    };
    PokerGroup.EVENT_POKERGROUP_STATE_CHANGED = "EVENT_POKERGROUP_STATE_CHANGED";
    return PokerGroup;
}(ii.Entity));
exports.default = PokerGroup;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxNb2RlbFxcUG9rZXJHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBcUU7QUFPckU7SUFBd0MsOEJBQVM7SUFtQjdDLG9CQUFZLFFBQW1CO1FBQS9CLFlBQ0ksaUJBQU8sU0FFVjtRQWRNLFdBQUssR0FBVyxJQUFJLENBQUE7UUFDcEIsWUFBTSxHQUFZLEVBQUUsQ0FBQTtRQUNwQixjQUFRLEdBQWMsSUFBSSxDQUFBO1FBbUJ6QixpQkFBVyxHQUErQixFQUFFLENBQUE7UUFSaEQsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7O0lBQzVCLENBQUM7SUFuQkQsc0JBQVcsMkJBQUc7YUFBZCxjQUEwQixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFDcEcsc0JBQVcsZ0NBQVE7YUFBbkIsY0FBK0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFBLENBQUM7OztPQUFBO0lBQzFHLHNCQUFXLDRCQUFJO2FBQWYsY0FBMkIsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBQ3pFLGtDQUFhLEdBQXBCLGNBQWtDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUM1RCxpQ0FBWSxHQUFuQixVQUFvQixLQUFZLElBQVksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFJL0Usc0JBQVcscUNBQWE7YUFBeEI7WUFDSSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUM7Z0JBQ25DLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssNkJBQVksQ0FBQyxJQUFJLEVBQUM7b0JBQzNDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDeEI7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFBO1FBQ2YsQ0FBQzs7O09BQUE7SUFLRCwwQkFBSyxHQUFMO1FBQ0ksT0FBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFRCxxQ0FBZ0IsR0FBaEIsVUFBaUIsUUFBa0MsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pNLHdDQUFtQixHQUEzQixVQUE0QixRQUFrQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdGLDZCQUFRLEdBQVIsVUFBUyxLQUFZO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2xCLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQixLQUFLLDBCQUFTLENBQUMsS0FBSztnQkFDaEIsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLDZCQUFZLENBQUMsS0FBSyxFQUFDO29CQUNuQyxLQUFLLENBQUMsTUFBTSxHQUFHLDZCQUFZLENBQUMsS0FBSyxDQUFBO29CQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2lCQUM1RTtnQkFDRCxNQUFLO1lBQ1QsS0FBSywwQkFBUyxDQUFDLElBQUk7Z0JBQ2YsSUFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLDZCQUFZLENBQUMsSUFBSSxFQUFDO29CQUNsQyxLQUFLLENBQUMsTUFBTSxHQUFHLDZCQUFZLENBQUMsSUFBSSxDQUFBO29CQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2lCQUM1RTtnQkFDRCxNQUFLO1NBQ1o7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsNENBQXVCLEdBQXZCLFVBQXdCLEtBQUs7UUFDekIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDM0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDL0IsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLDBCQUFTLENBQUMsSUFBSSxDQUFDO2VBQy9CLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSztlQUM1QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLDZCQUFZLENBQUMsSUFBSSxDQUFDLEVBQ25EO1lBQ0csT0FBTyxJQUFJLENBQUE7U0FDZDtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCw4QkFBUyxHQUFUO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNwQixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUMzQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtZQUNsQixnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssMEJBQVMsQ0FBQyxJQUFJLENBQUM7bUJBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7bUJBQ3ZCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssNkJBQVksQ0FBQyxJQUFJLENBQUMsRUFDN0M7Z0JBQ0csSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsNkJBQVksQ0FBQyxJQUFJLENBQUE7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQy9FO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsNkJBQVEsR0FBUixVQUFTLEtBQWE7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUE7WUFDekQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFFLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3hCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFDRCxrQ0FBYSxHQUFiLFVBQWMsS0FBWTtRQUN0QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFBO1NBQzNCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3RDO0lBQ0wsQ0FBQztJQUNELGdDQUFXLEdBQVgsVUFBWSxLQUFZO1FBQ3BCLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUNSLElBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBQztnQkFDNUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQTthQUM1QztpQkFBSTtnQkFDRCxPQUFPLEtBQUssQ0FBQTthQUNmO1NBQ0o7YUFBSTtZQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUE7U0FDM0I7SUFDTCxDQUFDO0lBQ0Qsa0NBQWEsR0FBYjtRQUNJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBQztZQUNuQyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLDZCQUFZLENBQUMsSUFBSSxFQUFFO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUM5QjtTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQUVELDZDQUF3QixHQUF4QixVQUF5QixJQUFXLEVBQUUsS0FBYSxFQUFFLE1BQW9CO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDdkIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFDO2dCQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO29CQUN2RSxPQUFPLENBQUMsQ0FBQztpQkFDWjthQUNKO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ2IsQ0FBQztJQWpJTSx5Q0FBOEIsR0FBVyxnQ0FBZ0MsQ0FBQTtJQWtJcEYsaUJBQUM7Q0FuSUQsQUFtSUMsQ0FuSXVDLEVBQUUsQ0FBQyxNQUFNLEdBbUloRDtrQkFuSW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTG9jYXRpb24sIEVQb2tlclN0YXR1cywgRVN1aXQgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlRW51bXNcIlxuaW1wb3J0IFBva2VyIGZyb20gXCIuL1Bva2VyXCJcblxuZXhwb3J0IGludGVyZmFjZSBJUG9rZXJHcm91cEV2ZW50TGlzdGVuZXIge1xuICAgIE9uR3JvdXBQb2tlclN0YXRlQ2hhbmdlZChwb2tlcjogUG9rZXIsIHN0YXR1czogRVBva2VyU3RhdHVzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9rZXJHcm91cCBleHRlbmRzIGlpLkVudGl0eSB7XG4gICAgc3RhdGljIEVWRU5UX1BPS0VSR1JPVVBfU1RBVEVfQ0hBTkdFRDogc3RyaW5nID0gXCJFVkVOVF9QT0tFUkdST1VQX1NUQVRFX0NIQU5HRURcIlxuXG4gICAgcHVibGljIGdldCB0b3AoKTogUG9rZXIgeyByZXR1cm4gdGhpcy5Jc1Bva2Vyc0VtcHR5KCkgPyBudWxsIDogdGhpcy5wb2tlcnNbdGhpcy5wb2tlcnMubGVuZ3RoIC0gMV0gfVxuICAgIHB1YmxpYyBnZXQgdW5kZXJUb3AoKTogUG9rZXIgeyByZXR1cm4gdGhpcy5wb2tlcnMubGVuZ3RoIDwgMiA/IG51bGwgOiB0aGlzLnBva2Vyc1t0aGlzLnBva2Vycy5sZW5ndGggLSAyXX1cbiAgICBwdWJsaWMgZ2V0IHplcm8oKTogUG9rZXIgeyByZXR1cm4gdGhpcy5Jc1Bva2Vyc0VtcHR5KCkgPyBudWxsIDogdGhpcy5wb2tlcnNbMF0gfVxuICAgIHB1YmxpYyBJc1Bva2Vyc0VtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wb2tlcnMubGVuZ3RoID09PSAwIH1cbiAgICBwdWJsaWMgaW5kZXhPZlBva2VyKHBva2VyOiBQb2tlcik6IG51bWJlciB7IHJldHVybiB0aGlzLnBva2Vycy5pbmRleE9mKHBva2VyKSB9XG4gICAgcHVibGljIGluZGV4OiBudW1iZXIgPSBudWxsXG4gICAgcHVibGljIHBva2VyczogUG9rZXJbXSA9IFtdXG4gICAgcHVibGljIGxvY2F0aW9uOiBFTG9jYXRpb24gPSBudWxsXG4gICAgcHVibGljIGdldCByb290T3BlblBva2VyKCk6IFBva2VyIHtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5wb2tlcnMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgaWYodGhpcy5wb2tlcnNbaV0uc3RhdHVzID09PSBFUG9rZXJTdGF0dXMuT1BFTil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9rZXJzW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3RydWN0b3IobG9jYXRpb246IEVMb2NhdGlvbikge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxuICAgIH1cbiAgICBSZXNldCgpIHtcbiAgICAgICAgd2hpbGUodGhpcy5tX0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLlJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5tX0xpc3RlbmVycy5wb3AoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb2tlcnMgPSBbXVxuICAgIH1cbiAgICBwcml2YXRlIG1fTGlzdGVuZXJzOiBJUG9rZXJHcm91cEV2ZW50TGlzdGVuZXJbXSA9IFtdXG4gICAgQWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogSVBva2VyR3JvdXBFdmVudExpc3RlbmVyKSB7IHRoaXMub24oUG9rZXJHcm91cC5FVkVOVF9QT0tFUkdST1VQX1NUQVRFX0NIQU5HRUQsIGxpc3RlbmVyLk9uR3JvdXBQb2tlclN0YXRlQ2hhbmdlZC5iaW5kKGxpc3RlbmVyKSwgbGlzdGVuZXIpOyB0aGlzLm1fTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpOyB9XG4gICAgcHJpdmF0ZSBSZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBJUG9rZXJHcm91cEV2ZW50TGlzdGVuZXIpIHsgdGhpcy50YXJnZXRPZmYobGlzdGVuZXIpOyB9XG4gICAgXG4gICAgQWRkUG9rZXIocG9rZXI6IFBva2VyKTogUG9rZXIge1xuICAgICAgICB0aGlzLnBva2Vycy5wdXNoKHBva2VyKVxuICAgICAgICBwb2tlci5ncm91cCA9IHRoaXNcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEVMb2NhdGlvbi5DTE9TRTpcbiAgICAgICAgICAgICAgICBpZihwb2tlci5zdGF0dXMgIT09IEVQb2tlclN0YXR1cy5DTE9TRSl7XG4gICAgICAgICAgICAgICAgICAgIHBva2VyLnN0YXR1cyA9IEVQb2tlclN0YXR1cy5DTE9TRVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoUG9rZXJHcm91cC5FVkVOVF9QT0tFUkdST1VQX1NUQVRFX0NIQU5HRUQsIHBva2VyLCBwb2tlci5zdGF0dXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIEVMb2NhdGlvbi5PUEVOOlxuICAgICAgICAgICAgICAgIGlmKHBva2VyLnN0YXR1cyAhPT0gRVBva2VyU3RhdHVzLk9QRU4pe1xuICAgICAgICAgICAgICAgICAgICBwb2tlci5zdGF0dXMgPSBFUG9rZXJTdGF0dXMuT1BFTlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoUG9rZXJHcm91cC5FVkVOVF9QT0tFUkdST1VQX1NUQVRFX0NIQU5HRUQsIHBva2VyLCBwb2tlci5zdGF0dXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBva2VyXG4gICAgfVxuXG4gICAgSXNBdXRvRmxpcE9uUmVtb3ZlUG9rZXIocG9rZXIpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHBva2VySW5kZXggPSB0aGlzLnBva2Vycy5pbmRleE9mKHBva2VyKVxuICAgICAgICBjb25zb2xlLmFzc2VydChwb2tlckluZGV4ID49IDApXG4gICAgICAgIC8vIOeOqeeJjOWMuuenu+mZpOeJjOaXtuiHquWKqOe/u+eJjOmAu+i+kVxuICAgICAgICBpZiggKHRoaXMubG9jYXRpb24gPT09IEVMb2NhdGlvbi5QTEFZKVxuICAgICAgICAgICAgJiYgdGhpcy5yb290T3BlblBva2VyID09PSBwb2tlclxuICAgICAgICAgICAgJiYgKHRoaXMucG9rZXJzWzBdLnN0YXR1cyAhPT0gRVBva2VyU3RhdHVzLk9QRU4pXG4gICAgICAgICl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIFJlbW92ZVRvcCgpOiBQb2tlciB7XG4gICAgICAgIGxldCBwb2tlciA9IHRoaXMudG9wXG4gICAgICAgIGlmIChwb2tlcikge1xuICAgICAgICAgICAgdGhpcy5wb2tlcnMubGVuZ3RoID0gdGhpcy5wb2tlcnMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgcG9rZXIuZ3JvdXAgPSBudWxsXG4gICAgICAgICAgICAvLyDnjqnniYzljLrnp7vpmaTniYzml7boh6rliqjnv7vniYzpgLvovpFcbiAgICAgICAgICAgIGlmKCAodGhpcy5sb2NhdGlvbiA9PT0gRUxvY2F0aW9uLlBMQVkpXG4gICAgICAgICAgICAgICAgJiYgKCF0aGlzLklzUG9rZXJzRW1wdHkoKSlcbiAgICAgICAgICAgICAgICAmJiAodGhpcy50b3Auc3RhdHVzICE9PSBFUG9rZXJTdGF0dXMuT1BFTilcbiAgICAgICAgICAgICl7XG4gICAgICAgICAgICAgICAgdGhpcy50b3Auc3RhdHVzID0gRVBva2VyU3RhdHVzLk9QRU5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoUG9rZXJHcm91cC5FVkVOVF9QT0tFUkdST1VQX1NUQVRFX0NIQU5HRUQsIHRoaXMudG9wLCBwb2tlci5zdGF0dXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBva2VyXG4gICAgfVxuXG4gICAgR2V0UG9rZXIoaW5kZXg6IG51bWJlcik6IFBva2VyIHtcbiAgICAgICAgaWYgKCF0aGlzLklzUG9rZXJzRW1wdHkoKSkge1xuICAgICAgICAgICAgbGV0IGkgPSBpbmRleCA+PSAwID8gaW5kZXggOiAodGhpcy5wb2tlcnMubGVuZ3RoICsgaW5kZXgpXG4gICAgICAgICAgICBpZiAoaSA8IHRoaXMucG9rZXJzLmxlbmd0aCAmJiBpPj0wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9rZXJzW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgSXNDb25jYXRQb2tlcihwb2tlcjogUG9rZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9rZXIucG9pbnQgPT0gMTNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcC5Jc0NvbmNhdGFibGUocG9rZXIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgSXNOZXh0UG9rZXIocG9rZXI6IFBva2VyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMudG9wKXtcbiAgICAgICAgICAgIGlmKHRoaXMudG9wLnN1aXQgPT09IHBva2VyLnN1aXQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcC5wb2ludCArIDEgPT09IHBva2VyLnBvaW50XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gcG9rZXIucG9pbnQgPT09IDFcbiAgICAgICAgfVxuICAgIH1cbiAgICBHZXRPcGVuUG9rZXJzKCk6IFBva2VyW10ge1xuICAgICAgICBsZXQgcG9rZXJzID0gW11cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5wb2tlcnMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgaWYodGhpcy5wb2tlcnNbaV0uc3RhdHVzID09IEVQb2tlclN0YXR1cy5PUEVOKSB7XG4gICAgICAgICAgICAgICAgcG9rZXJzLnB1c2godGhpcy5wb2tlcnNbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBva2Vyc1xuICAgIH1cblxuICAgIEdldFBva2VySW5kZXhCeVN1aXRQb2ludChzdWl0OiBFU3VpdCwgcG9pbnQ6IG51bWJlciwgc3RhdHVzOiBFUG9rZXJTdGF0dXMpOiBudW1iZXIge1xuICAgICAgICBpZiAoIXRoaXMuSXNQb2tlcnNFbXB0eSgpKSB7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnBva2Vycy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy5wb2tlcnNbaV07XG4gICAgICAgICAgICAgICAgaWYocG9rZXIuc3RhdHVzID09PSBzdGF0dXMgJiYgcG9rZXIuc3VpdCA9PSBzdWl0ICYmIHBva2VyLnBvaW50ID09PSBwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xXG4gICAgfVxufVxuIl19