"use strict";
cc._RF.push(module, 'c1927PiUGJMQ7yYqGw4p9vu', 'SolitaireEvent');
// GameBundles/Solitaire/Script/SolitaireEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireEvent = void 0;
var SolitaireEvent;
(function (SolitaireEvent) {
    SolitaireEvent[SolitaireEvent["SC_INIT"] = 0] = "SC_INIT";
    SolitaireEvent[SolitaireEvent["SC_UI_SUBSCRIB"] = 1] = "SC_UI_SUBSCRIB";
    SolitaireEvent[SolitaireEvent["SC_REFRESH_POKERS"] = 2] = "SC_REFRESH_POKERS";
    SolitaireEvent[SolitaireEvent["SC_PLAY"] = 3] = "SC_PLAY";
    SolitaireEvent[SolitaireEvent["SC_SEND_POKERS"] = 4] = "SC_SEND_POKERS";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE"] = 5] = "SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FROM_PLAY_TO_PLAY"] = 6] = "SC_MOVE_POKER_FROM_PLAY_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKERS_FROM_PLAY_TO_PLAY"] = 7] = "SC_MOVE_POKERS_FROM_PLAY_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE"] = 8] = "SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FROM_OPEN_TO_PLAY"] = 9] = "SC_MOVE_POKER_FROM_OPEN_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_FLIP_POKER"] = 10] = "SC_FLIP_POKER";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FROM_CLOSE_TO_OPEN"] = 11] = "SC_MOVE_POKER_FROM_CLOSE_TO_OPEN";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN"] = 12] = "SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN";
    SolitaireEvent[SolitaireEvent["SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE"] = 13] = "SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY"] = 14] = "SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE"] = 15] = "SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE"] = 16] = "SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE"] = 17] = "SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_FROM_PLAY_TO_PLAY"] = 18] = "SC_DRAG_POKER_FROM_PLAY_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY"] = 19] = "SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_FROM_OPEN_TO_PLAY"] = 20] = "SC_DRAG_POKER_FROM_OPEN_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKERS_FROM_PLAY_TO_PLAY"] = 21] = "SC_DRAG_POKERS_FROM_PLAY_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_DRAG_POKER_NO_CHANGE"] = 22] = "SC_DRAG_POKER_NO_CHANGE";
    SolitaireEvent[SolitaireEvent["SC_CLICK_POKER_NO_CHANGE"] = 23] = "SC_CLICK_POKER_NO_CHANGE";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY"] = 24] = "SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY"] = 25] = "SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN"] = 26] = "SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN"] = 27] = "SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE"] = 28] = "SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY"] = 29] = "SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY";
    SolitaireEvent[SolitaireEvent["SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN"] = 30] = "SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE"] = 31] = "SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE";
    SolitaireEvent[SolitaireEvent["SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE"] = 32] = "SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE";
    SolitaireEvent[SolitaireEvent["SC_TIME_CHANGED"] = 33] = "SC_TIME_CHANGED";
    SolitaireEvent[SolitaireEvent["SC_WIN"] = 34] = "SC_WIN";
    SolitaireEvent[SolitaireEvent["SC_LOSE"] = 35] = "SC_LOSE";
})(SolitaireEvent = exports.SolitaireEvent || (exports.SolitaireEvent = {}));

cc._RF.pop();