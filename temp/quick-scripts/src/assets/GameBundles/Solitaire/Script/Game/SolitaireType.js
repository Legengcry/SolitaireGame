"use strict";
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