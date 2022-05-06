"use strict";
cc._RF.push(module, '8f4c9GfcTtKSq4js7kXaocV', 'Poker');
// GameBundles/Solitaire/Script/Game/Model/Poker.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireEnums_1 = require("../../SolitaireEnums");
var Poker = /** @class */ (function () {
    function Poker(point, suit, status) {
        this.point = -1;
        this.suit = SolitaireEnums_1.ESuit.HEITAO;
        this.status = SolitaireEnums_1.EPokerStatus.CLOSE;
        this.view = null;
        this.group = null;
        this.initLocation = null;
        this.initStatus = SolitaireEnums_1.EPokerStatus.CLOSE;
        this.point = point;
        this.suit = suit;
        this.status = status;
        this.initStatus = status;
    }
    Object.defineProperty(Poker.prototype, "location", {
        get: function () { return this.group.location; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Poker.prototype, "groupIndex", {
        get: function () { return this.group.index; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Poker.prototype, "isTop", {
        get: function () { return this.group.top === this; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Poker.prototype, "indexInGroup", {
        get: function () { return this.group.indexOfPoker(this); },
        enumerable: false,
        configurable: true
    });
    // p 是否能够以红黑交替的方式连接在自己后面
    Poker.prototype.IsConcatable = function (p) {
        return p && (this.point === p.point + 1 && !this.isSimilarSuit(p.suit));
    };
    Poker.prototype.isSimilarSuit = function (suit) {
        return (suit + this.suit) % 2 == 0;
    };
    Poker.prototype.Snap = function () {
        var snapData = {
            point: this.point,
            suit: this.suit,
            status: this.status,
            initLocation: this.initLocation,
            initStatus: this.initStatus
        };
        return snapData;
    };
    return Poker;
}());
exports.default = Poker;

cc._RF.pop();