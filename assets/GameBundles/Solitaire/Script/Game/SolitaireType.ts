import Poker, { SnapPoker } from "./Model/Poker";
import { EPokerStatus, EGameType } from "../SolitaireEnums";

export enum EActionType {
    CLICK = 0,
    DRAG = 1,
    UNDO = 2,
}

// Undo 描述的是发生的事件
export enum ETUndoCmd {
    PLAY_TO_PLAY = 0,
    PLAY_TO_RECEIVE,
    OPEN_TO_RECEIVE,
    OPEN_TO_PLAY,
    CLOSE_TO_OPEN,
    CLOSES_TO_OPEN,
    OPEN_TO_CLOSE,
    RECEIVE_TO_PLAY,
    RECEIVE_TO_RECEIVE,
}

export enum EChangeType {
    MOVE = 0,
    FLIP = 1,
}

export type CmdChange = {
    typ: EChangeType,
    poker?: Poker,
    pokers?: Poker[],
    fromIndex?: number,
    toIndex?: number,
    status?: EPokerStatus
}

export type SnapCmdChange = {
    typ: EChangeType,
    poker?: SnapPoker,
    pokers?: SnapPoker[],
    fromIndex?: number,
    toIndex?: number,
    status?: EPokerStatus
}

export type SnapCmd = {
    cmdType: ETUndoCmd
    cmdChanges: SnapCmdChange[]
}

export type SnapData = {
    gameType?: EGameType,
    resume: boolean,
    vegas: boolean,
    card3: boolean,
    seed: number,
    cmds?: SnapCmd[],
    tick: number,
    score?: number,
    hinted: boolean,
    helped: boolean,
    player: boolean,
    undo: boolean, /** 是否使用过 undo */
}

// 操作提示
export enum ETOperationHint {
    PLAY_TO_PLAY = 0,
    PLAY_TO_RECEIVE,
    OPEN_TO_RECEIVE,
    OPEN_TO_PLAY,
    CLOSE_TO_OPEN,
    OPEN_TO_CLOSE,
    RECEIVE_TO_PLAY,
}

export type OperationHint = {
    type: ETOperationHint,
    from?: number,
    to?: number
}

export type GameResult = {
    seed: number,
    pass: boolean,
    step: number
}

export class CmdStack {
    private undoCmdStack: Cmd[] = []
    private m_OnUndoStatusChangedCallback: (length: number) => void = null
    constructor(onUndoStatusChanged: (length: number) => void){
        this.m_OnUndoStatusChangedCallback = onUndoStatusChanged
    }
    get Length(): number { return this.undoCmdStack.length; }
    pop(): Cmd {
        let cmd = this.undoCmdStack.pop()
        this.onStatusChanged()
        return cmd
    }
    push(cmd: Cmd) {
        this.undoCmdStack.push(cmd)
        this.onStatusChanged()
    }
    
    private onStatusChanged() {
        this.m_OnUndoStatusChangedCallback(this.undoCmdStack.length);
    }

    Snap(): SnapCmd[] {
        return this.undoCmdStack.map(cmd => cmd.Snap())
    }
}

export class Cmd {
    cmdType: ETUndoCmd = undefined
    cmdChanges: CmdChange[] = undefined
    constructor(cmdType: ETUndoCmd, cmdChanges: CmdChange[]){
        this.cmdType = cmdType
        this.cmdChanges = cmdChanges
    }
    AddChange(change: CmdChange): Cmd {
        this.cmdChanges.push(change)
        return this
    }
    Snap(): SnapCmd {
        return {
            cmdType: this.cmdType,
            cmdChanges: this.cmdChanges.map(change => { return {
                typ: change.typ,
                poker: change.poker == null ? null : change.poker.Snap(),
                pokers: change.pokers == null ? null : change.pokers.map(p => p.Snap()),
                fromIndex: change.fromIndex,
                toIndex: change.toIndex,
                status: change.status
            }})
        }
    }
}

export type SolitaireDataBattleResult = {
    seed: number,
    pass: boolean,
    step: number,
    flipCloseCnt: number
}