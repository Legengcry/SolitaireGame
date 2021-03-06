export enum SolitaireEvent {
    SC_INIT,
    SC_UI_SUBSCRIB,
    SC_REFRESH_POKERS,
    SC_PLAY,
    SC_SEND_POKERS,
    SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE,
    SC_MOVE_POKER_FROM_PLAY_TO_PLAY,
    SC_MOVE_POKERS_FROM_PLAY_TO_PLAY,
    SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE,
    SC_MOVE_POKER_FROM_OPEN_TO_PLAY,
    SC_FLIP_POKER,
    SC_MOVE_POKER_FROM_CLOSE_TO_OPEN,
    SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN,
    SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE,
    SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY,
    SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE,
    SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE,
    SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE,
    SC_DRAG_POKER_FROM_PLAY_TO_PLAY,
    SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY,
    SC_DRAG_POKER_FROM_OPEN_TO_PLAY,
    SC_DRAG_POKERS_FROM_PLAY_TO_PLAY,
    SC_DRAG_POKER_NO_CHANGE,
    SC_CLICK_POKER_NO_CHANGE,
    SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY,
    SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY,
    SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN,
    SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN,
    SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE,
    SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY,
    SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN,
    SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE,
    SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE,
    SC_TIME_CHANGED,

    SC_WIN,
    SC_LOSE,
}
