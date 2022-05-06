
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/Model/Poker.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxNb2RlbFxcUG9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0U7QUFJdEU7SUFZSSxlQUFZLEtBQWEsRUFBRSxJQUFXLEVBQUUsTUFBb0I7UUFYNUQsVUFBSyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25CLFNBQUksR0FBVSxzQkFBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixXQUFNLEdBQWlCLDZCQUFZLENBQUMsS0FBSyxDQUFDO1FBQzFDLFNBQUksR0FBWSxJQUFJLENBQUE7UUFDcEIsVUFBSyxHQUFlLElBQUksQ0FBQTtRQUt4QixpQkFBWSxHQUFjLElBQUksQ0FBQTtRQUM5QixlQUFVLEdBQWlCLDZCQUFZLENBQUMsS0FBSyxDQUFBO1FBRXpDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFBO0lBQzVCLENBQUM7SUFYRCxzQkFBSSwyQkFBUTthQUFaLGNBQTZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUN6RCxzQkFBSSw2QkFBVTthQUFkLGNBQTRCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUNyRCxzQkFBSSx3QkFBSzthQUFULGNBQXdCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFDeEQsc0JBQUksK0JBQVk7YUFBaEIsY0FBNkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBVW5FLHdCQUF3QjtJQUN4Qiw0QkFBWSxHQUFaLFVBQWEsQ0FBUTtRQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFTyw2QkFBYSxHQUFyQixVQUFzQixJQUFXO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELG9CQUFJLEdBQUo7UUFDSSxJQUFJLFFBQVEsR0FBYztZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDOUIsQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFBO0lBQ25CLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVTdWl0LCBFUG9rZXJTdGF0dXMsIEVMb2NhdGlvbiB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IFBva2VyR3JvdXAgZnJvbSBcIi4vUG9rZXJHcm91cFwiO1xuaW1wb3J0IFVJUG9rZXIgZnJvbSBcIi4uL1ZpZXcvVUlQb2tlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2tlciB7XG4gICAgcG9pbnQ6IG51bWJlciA9IC0xO1xuICAgIHN1aXQ6IEVTdWl0ID0gRVN1aXQuSEVJVEFPO1xuICAgIHN0YXR1czogRVBva2VyU3RhdHVzID0gRVBva2VyU3RhdHVzLkNMT1NFO1xuICAgIHZpZXc6IFVJUG9rZXIgPSBudWxsXG4gICAgZ3JvdXA6IFBva2VyR3JvdXAgPSBudWxsXG4gICAgZ2V0IGxvY2F0aW9uKCkgOiBFTG9jYXRpb24geyByZXR1cm4gdGhpcy5ncm91cC5sb2NhdGlvbiB9XG4gICAgZ2V0IGdyb3VwSW5kZXgoKSA6IG51bWJlciB7IHJldHVybiB0aGlzLmdyb3VwLmluZGV4IH1cbiAgICBnZXQgaXNUb3AoKSA6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5ncm91cC50b3AgPT09IHRoaXMgfVxuICAgIGdldCBpbmRleEluR3JvdXAoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZ3JvdXAuaW5kZXhPZlBva2VyKHRoaXMpIH1cbiAgICBpbml0TG9jYXRpb246IEVMb2NhdGlvbiA9IG51bGxcbiAgICBpbml0U3RhdHVzOiBFUG9rZXJTdGF0dXMgPSBFUG9rZXJTdGF0dXMuQ0xPU0VcbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogbnVtYmVyLCBzdWl0OiBFU3VpdCwgc3RhdHVzOiBFUG9rZXJTdGF0dXMpIHtcbiAgICAgICAgdGhpcy5wb2ludCA9IHBvaW50XG4gICAgICAgIHRoaXMuc3VpdCA9IHN1aXRcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXNcbiAgICAgICAgdGhpcy5pbml0U3RhdHVzID0gc3RhdHVzXG4gICAgfVxuXG4gICAgLy8gcCDmmK/lkKbog73lpJ/ku6XnuqLpu5HkuqTmm7/nmoTmlrnlvI/ov57mjqXlnKjoh6rlt7HlkI7pnaJcbiAgICBJc0NvbmNhdGFibGUocDogUG9rZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHAgJiYgKHRoaXMucG9pbnQgPT09IHAucG9pbnQgKyAxICYmICF0aGlzLmlzU2ltaWxhclN1aXQocC5zdWl0KSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU2ltaWxhclN1aXQoc3VpdDogRVN1aXQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChzdWl0ICsgdGhpcy5zdWl0KSAlIDIgPT0gMFxuICAgIH1cblxuICAgIFNuYXAoKTogU25hcFBva2Vye1xuICAgICAgICBsZXQgc25hcERhdGE6IFNuYXBQb2tlciA9IHtcbiAgICAgICAgICAgIHBvaW50OiB0aGlzLnBvaW50LFxuICAgICAgICAgICAgc3VpdDogdGhpcy5zdWl0LFxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgIGluaXRMb2NhdGlvbjogdGhpcy5pbml0TG9jYXRpb24sXG4gICAgICAgICAgICBpbml0U3RhdHVzOiB0aGlzLmluaXRTdGF0dXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc25hcERhdGFcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFNuYXBQb2tlciA9IHtcbiAgICBwb2ludDogbnVtYmVyXG4gICAgc3VpdDogRVN1aXRcbiAgICBzdGF0dXM6IEVQb2tlclN0YXR1c1xuICAgIGluaXRMb2NhdGlvbjogRUxvY2F0aW9uXG4gICAgaW5pdFN0YXR1czogRVBva2VyU3RhdHVzXG59XG4iXX0=