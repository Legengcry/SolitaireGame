"use strict";
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