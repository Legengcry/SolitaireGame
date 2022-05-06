
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/SolitaireType.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '98521Kozz1C9oy78uSDqq7H', 'SolitaireType');
// GameBundles/Solitaire/Script/Game/SolitaireType.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cmd = exports.CmdStack = exports.ETOperationHint = exports.EChangeType = exports.ETUndoCmd = exports.EActionType = void 0;
var EActionType;
(function (EActionType) {
    EActionType[EActionType["CLICK"] = 0] = "CLICK";
    EActionType[EActionType["DRAG"] = 1] = "DRAG";
    EActionType[EActionType["UNDO"] = 2] = "UNDO";
})(EActionType = exports.EActionType || (exports.EActionType = {}));
// Undo 描述的是发生的事件
var ETUndoCmd;
(function (ETUndoCmd) {
    ETUndoCmd[ETUndoCmd["PLAY_TO_PLAY"] = 0] = "PLAY_TO_PLAY";
    ETUndoCmd[ETUndoCmd["PLAY_TO_RECEIVE"] = 1] = "PLAY_TO_RECEIVE";
    ETUndoCmd[ETUndoCmd["OPEN_TO_RECEIVE"] = 2] = "OPEN_TO_RECEIVE";
    ETUndoCmd[ETUndoCmd["OPEN_TO_PLAY"] = 3] = "OPEN_TO_PLAY";
    ETUndoCmd[ETUndoCmd["CLOSE_TO_OPEN"] = 4] = "CLOSE_TO_OPEN";
    ETUndoCmd[ETUndoCmd["CLOSES_TO_OPEN"] = 5] = "CLOSES_TO_OPEN";
    ETUndoCmd[ETUndoCmd["OPEN_TO_CLOSE"] = 6] = "OPEN_TO_CLOSE";
    ETUndoCmd[ETUndoCmd["RECEIVE_TO_PLAY"] = 7] = "RECEIVE_TO_PLAY";
    ETUndoCmd[ETUndoCmd["RECEIVE_TO_RECEIVE"] = 8] = "RECEIVE_TO_RECEIVE";
})(ETUndoCmd = exports.ETUndoCmd || (exports.ETUndoCmd = {}));
var EChangeType;
(function (EChangeType) {
    EChangeType[EChangeType["MOVE"] = 0] = "MOVE";
    EChangeType[EChangeType["FLIP"] = 1] = "FLIP";
})(EChangeType = exports.EChangeType || (exports.EChangeType = {}));
// 操作提示
var ETOperationHint;
(function (ETOperationHint) {
    ETOperationHint[ETOperationHint["PLAY_TO_PLAY"] = 0] = "PLAY_TO_PLAY";
    ETOperationHint[ETOperationHint["PLAY_TO_RECEIVE"] = 1] = "PLAY_TO_RECEIVE";
    ETOperationHint[ETOperationHint["OPEN_TO_RECEIVE"] = 2] = "OPEN_TO_RECEIVE";
    ETOperationHint[ETOperationHint["OPEN_TO_PLAY"] = 3] = "OPEN_TO_PLAY";
    ETOperationHint[ETOperationHint["CLOSE_TO_OPEN"] = 4] = "CLOSE_TO_OPEN";
    ETOperationHint[ETOperationHint["OPEN_TO_CLOSE"] = 5] = "OPEN_TO_CLOSE";
    ETOperationHint[ETOperationHint["RECEIVE_TO_PLAY"] = 6] = "RECEIVE_TO_PLAY";
})(ETOperationHint = exports.ETOperationHint || (exports.ETOperationHint = {}));
var CmdStack = /** @class */ (function () {
    function CmdStack(onUndoStatusChanged) {
        this.undoCmdStack = [];
        this.m_OnUndoStatusChangedCallback = null;
        this.m_OnUndoStatusChangedCallback = onUndoStatusChanged;
    }
    Object.defineProperty(CmdStack.prototype, "Length", {
        get: function () { return this.undoCmdStack.length; },
        enumerable: false,
        configurable: true
    });
    CmdStack.prototype.pop = function () {
        var cmd = this.undoCmdStack.pop();
        this.onStatusChanged();
        return cmd;
    };
    CmdStack.prototype.push = function (cmd) {
        this.undoCmdStack.push(cmd);
        this.onStatusChanged();
    };
    CmdStack.prototype.onStatusChanged = function () {
        this.m_OnUndoStatusChangedCallback(this.undoCmdStack.length);
    };
    CmdStack.prototype.Snap = function () {
        return this.undoCmdStack.map(function (cmd) { return cmd.Snap(); });
    };
    return CmdStack;
}());
exports.CmdStack = CmdStack;
var Cmd = /** @class */ (function () {
    function Cmd(cmdType, cmdChanges) {
        this.cmdType = undefined;
        this.cmdChanges = undefined;
        this.cmdType = cmdType;
        this.cmdChanges = cmdChanges;
    }
    Cmd.prototype.AddChange = function (change) {
        this.cmdChanges.push(change);
        return this;
    };
    Cmd.prototype.Snap = function () {
        return {
            cmdType: this.cmdType,
            cmdChanges: this.cmdChanges.map(function (change) {
                return {
                    typ: change.typ,
                    poker: change.poker == null ? null : change.poker.Snap(),
                    pokers: change.pokers == null ? null : change.pokers.map(function (p) { return p.Snap(); }),
                    fromIndex: change.fromIndex,
                    toIndex: change.toIndex,
                    status: change.status
                };
            })
        };
    };
    return Cmd;
}());
exports.Cmd = Cmd;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxTb2xpdGFpcmVUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLElBQVksV0FJWDtBQUpELFdBQVksV0FBVztJQUNuQiwrQ0FBUyxDQUFBO0lBQ1QsNkNBQVEsQ0FBQTtJQUNSLDZDQUFRLENBQUE7QUFDWixDQUFDLEVBSlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFJdEI7QUFFRCxpQkFBaUI7QUFDakIsSUFBWSxTQVVYO0FBVkQsV0FBWSxTQUFTO0lBQ2pCLHlEQUFnQixDQUFBO0lBQ2hCLCtEQUFlLENBQUE7SUFDZiwrREFBZSxDQUFBO0lBQ2YseURBQVksQ0FBQTtJQUNaLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0lBQ2QsMkRBQWEsQ0FBQTtJQUNiLCtEQUFlLENBQUE7SUFDZixxRUFBa0IsQ0FBQTtBQUN0QixDQUFDLEVBVlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFVcEI7QUFFRCxJQUFZLFdBR1g7QUFIRCxXQUFZLFdBQVc7SUFDbkIsNkNBQVEsQ0FBQTtJQUNSLDZDQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUF3Q0QsT0FBTztBQUNQLElBQVksZUFRWDtBQVJELFdBQVksZUFBZTtJQUN2QixxRUFBZ0IsQ0FBQTtJQUNoQiwyRUFBZSxDQUFBO0lBQ2YsMkVBQWUsQ0FBQTtJQUNmLHFFQUFZLENBQUE7SUFDWix1RUFBYSxDQUFBO0lBQ2IsdUVBQWEsQ0FBQTtJQUNiLDJFQUFlLENBQUE7QUFDbkIsQ0FBQyxFQVJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBUTFCO0FBY0Q7SUFHSSxrQkFBWSxtQkFBNkM7UUFGakQsaUJBQVksR0FBVSxFQUFFLENBQUE7UUFDeEIsa0NBQTZCLEdBQTZCLElBQUksQ0FBQTtRQUVsRSxJQUFJLENBQUMsNkJBQTZCLEdBQUcsbUJBQW1CLENBQUE7SUFDNUQsQ0FBQztJQUNELHNCQUFJLDRCQUFNO2FBQVYsY0FBdUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3pELHNCQUFHLEdBQUg7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUN0QixPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFDRCx1QkFBSSxHQUFKLFVBQUssR0FBUTtRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRU8sa0NBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsdUJBQUksR0FBSjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBeEJZLDRCQUFRO0FBMEJyQjtJQUdJLGFBQVksT0FBa0IsRUFBRSxVQUF1QjtRQUZ2RCxZQUFPLEdBQWMsU0FBUyxDQUFBO1FBQzlCLGVBQVUsR0FBZ0IsU0FBUyxDQUFBO1FBRS9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO0lBQ2hDLENBQUM7SUFDRCx1QkFBUyxHQUFULFVBQVUsTUFBaUI7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUIsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBQ0Qsa0JBQUksR0FBSjtRQUNJLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTTtnQkFBTSxPQUFPO29CQUMvQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7b0JBQ2YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUN4RCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDO29CQUN2RSxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQzNCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztvQkFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2lCQUN4QixDQUFBO1lBQUEsQ0FBQyxDQUFDO1NBQ04sQ0FBQTtJQUNMLENBQUM7SUFDTCxVQUFDO0FBQUQsQ0F4QkEsQUF3QkMsSUFBQTtBQXhCWSxrQkFBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb2tlciwgeyBTbmFwUG9rZXIgfSBmcm9tIFwiLi9Nb2RlbC9Qb2tlclwiO1xuaW1wb3J0IHsgRVBva2VyU3RhdHVzLCBFR2FtZVR5cGUgfSBmcm9tIFwiLi4vU29saXRhaXJlRW51bXNcIjtcblxuZXhwb3J0IGVudW0gRUFjdGlvblR5cGUge1xuICAgIENMSUNLID0gMCxcbiAgICBEUkFHID0gMSxcbiAgICBVTkRPID0gMixcbn1cblxuLy8gVW5kbyDmj4/ov7DnmoTmmK/lj5HnlJ/nmoTkuovku7ZcbmV4cG9ydCBlbnVtIEVUVW5kb0NtZCB7XG4gICAgUExBWV9UT19QTEFZID0gMCxcbiAgICBQTEFZX1RPX1JFQ0VJVkUsXG4gICAgT1BFTl9UT19SRUNFSVZFLFxuICAgIE9QRU5fVE9fUExBWSxcbiAgICBDTE9TRV9UT19PUEVOLFxuICAgIENMT1NFU19UT19PUEVOLFxuICAgIE9QRU5fVE9fQ0xPU0UsXG4gICAgUkVDRUlWRV9UT19QTEFZLFxuICAgIFJFQ0VJVkVfVE9fUkVDRUlWRSxcbn1cblxuZXhwb3J0IGVudW0gRUNoYW5nZVR5cGUge1xuICAgIE1PVkUgPSAwLFxuICAgIEZMSVAgPSAxLFxufVxuXG5leHBvcnQgdHlwZSBDbWRDaGFuZ2UgPSB7XG4gICAgdHlwOiBFQ2hhbmdlVHlwZSxcbiAgICBwb2tlcj86IFBva2VyLFxuICAgIHBva2Vycz86IFBva2VyW10sXG4gICAgZnJvbUluZGV4PzogbnVtYmVyLFxuICAgIHRvSW5kZXg/OiBudW1iZXIsXG4gICAgc3RhdHVzPzogRVBva2VyU3RhdHVzXG59XG5cbmV4cG9ydCB0eXBlIFNuYXBDbWRDaGFuZ2UgPSB7XG4gICAgdHlwOiBFQ2hhbmdlVHlwZSxcbiAgICBwb2tlcj86IFNuYXBQb2tlcixcbiAgICBwb2tlcnM/OiBTbmFwUG9rZXJbXSxcbiAgICBmcm9tSW5kZXg/OiBudW1iZXIsXG4gICAgdG9JbmRleD86IG51bWJlcixcbiAgICBzdGF0dXM/OiBFUG9rZXJTdGF0dXNcbn1cblxuZXhwb3J0IHR5cGUgU25hcENtZCA9IHtcbiAgICBjbWRUeXBlOiBFVFVuZG9DbWRcbiAgICBjbWRDaGFuZ2VzOiBTbmFwQ21kQ2hhbmdlW11cbn1cblxuZXhwb3J0IHR5cGUgU25hcERhdGEgPSB7XG4gICAgZ2FtZVR5cGU/OiBFR2FtZVR5cGUsXG4gICAgcmVzdW1lOiBib29sZWFuLFxuICAgIHZlZ2FzOiBib29sZWFuLFxuICAgIGNhcmQzOiBib29sZWFuLFxuICAgIHNlZWQ6IG51bWJlcixcbiAgICBjbWRzPzogU25hcENtZFtdLFxuICAgIHRpY2s6IG51bWJlcixcbiAgICBzY29yZT86IG51bWJlcixcbiAgICBoaW50ZWQ6IGJvb2xlYW4sXG4gICAgaGVscGVkOiBib29sZWFuLFxuICAgIHBsYXllcjogYm9vbGVhbixcbiAgICB1bmRvOiBib29sZWFuLCAvKiog5piv5ZCm5L2/55So6L+HIHVuZG8gKi9cbn1cblxuLy8g5pON5L2c5o+Q56S6XG5leHBvcnQgZW51bSBFVE9wZXJhdGlvbkhpbnQge1xuICAgIFBMQVlfVE9fUExBWSA9IDAsXG4gICAgUExBWV9UT19SRUNFSVZFLFxuICAgIE9QRU5fVE9fUkVDRUlWRSxcbiAgICBPUEVOX1RPX1BMQVksXG4gICAgQ0xPU0VfVE9fT1BFTixcbiAgICBPUEVOX1RPX0NMT1NFLFxuICAgIFJFQ0VJVkVfVE9fUExBWSxcbn1cblxuZXhwb3J0IHR5cGUgT3BlcmF0aW9uSGludCA9IHtcbiAgICB0eXBlOiBFVE9wZXJhdGlvbkhpbnQsXG4gICAgZnJvbT86IG51bWJlcixcbiAgICB0bz86IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBHYW1lUmVzdWx0ID0ge1xuICAgIHNlZWQ6IG51bWJlcixcbiAgICBwYXNzOiBib29sZWFuLFxuICAgIHN0ZXA6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgQ21kU3RhY2sge1xuICAgIHByaXZhdGUgdW5kb0NtZFN0YWNrOiBDbWRbXSA9IFtdXG4gICAgcHJpdmF0ZSBtX09uVW5kb1N0YXR1c0NoYW5nZWRDYWxsYmFjazogKGxlbmd0aDogbnVtYmVyKSA9PiB2b2lkID0gbnVsbFxuICAgIGNvbnN0cnVjdG9yKG9uVW5kb1N0YXR1c0NoYW5nZWQ6IChsZW5ndGg6IG51bWJlcikgPT4gdm9pZCl7XG4gICAgICAgIHRoaXMubV9PblVuZG9TdGF0dXNDaGFuZ2VkQ2FsbGJhY2sgPSBvblVuZG9TdGF0dXNDaGFuZ2VkXG4gICAgfVxuICAgIGdldCBMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudW5kb0NtZFN0YWNrLmxlbmd0aDsgfVxuICAgIHBvcCgpOiBDbWQge1xuICAgICAgICBsZXQgY21kID0gdGhpcy51bmRvQ21kU3RhY2sucG9wKClcbiAgICAgICAgdGhpcy5vblN0YXR1c0NoYW5nZWQoKVxuICAgICAgICByZXR1cm4gY21kXG4gICAgfVxuICAgIHB1c2goY21kOiBDbWQpIHtcbiAgICAgICAgdGhpcy51bmRvQ21kU3RhY2sucHVzaChjbWQpXG4gICAgICAgIHRoaXMub25TdGF0dXNDaGFuZ2VkKClcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBvblN0YXR1c0NoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMubV9PblVuZG9TdGF0dXNDaGFuZ2VkQ2FsbGJhY2sodGhpcy51bmRvQ21kU3RhY2subGVuZ3RoKTtcbiAgICB9XG5cbiAgICBTbmFwKCk6IFNuYXBDbWRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVuZG9DbWRTdGFjay5tYXAoY21kID0+IGNtZC5TbmFwKCkpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ21kIHtcbiAgICBjbWRUeXBlOiBFVFVuZG9DbWQgPSB1bmRlZmluZWRcbiAgICBjbWRDaGFuZ2VzOiBDbWRDaGFuZ2VbXSA9IHVuZGVmaW5lZFxuICAgIGNvbnN0cnVjdG9yKGNtZFR5cGU6IEVUVW5kb0NtZCwgY21kQ2hhbmdlczogQ21kQ2hhbmdlW10pe1xuICAgICAgICB0aGlzLmNtZFR5cGUgPSBjbWRUeXBlXG4gICAgICAgIHRoaXMuY21kQ2hhbmdlcyA9IGNtZENoYW5nZXNcbiAgICB9XG4gICAgQWRkQ2hhbmdlKGNoYW5nZTogQ21kQ2hhbmdlKTogQ21kIHtcbiAgICAgICAgdGhpcy5jbWRDaGFuZ2VzLnB1c2goY2hhbmdlKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBTbmFwKCk6IFNuYXBDbWQge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY21kVHlwZTogdGhpcy5jbWRUeXBlLFxuICAgICAgICAgICAgY21kQ2hhbmdlczogdGhpcy5jbWRDaGFuZ2VzLm1hcChjaGFuZ2UgPT4geyByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cDogY2hhbmdlLnR5cCxcbiAgICAgICAgICAgICAgICBwb2tlcjogY2hhbmdlLnBva2VyID09IG51bGwgPyBudWxsIDogY2hhbmdlLnBva2VyLlNuYXAoKSxcbiAgICAgICAgICAgICAgICBwb2tlcnM6IGNoYW5nZS5wb2tlcnMgPT0gbnVsbCA/IG51bGwgOiBjaGFuZ2UucG9rZXJzLm1hcChwID0+IHAuU25hcCgpKSxcbiAgICAgICAgICAgICAgICBmcm9tSW5kZXg6IGNoYW5nZS5mcm9tSW5kZXgsXG4gICAgICAgICAgICAgICAgdG9JbmRleDogY2hhbmdlLnRvSW5kZXgsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBjaGFuZ2Uuc3RhdHVzXG4gICAgICAgICAgICB9fSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgU29saXRhaXJlRGF0YUJhdHRsZVJlc3VsdCA9IHtcbiAgICBzZWVkOiBudW1iZXIsXG4gICAgcGFzczogYm9vbGVhbixcbiAgICBzdGVwOiBudW1iZXIsXG4gICAgZmxpcENsb3NlQ250OiBudW1iZXJcbn0iXX0=