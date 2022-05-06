import { ESuit, EPokerStatus, ELocation } from "../../SolitaireEnums";
import PokerGroup from "./PokerGroup";
import UIPoker from "../View/UIPoker";

export default class Poker {
    point: number = -1;
    suit: ESuit = ESuit.HEITAO;
    status: EPokerStatus = EPokerStatus.CLOSE;
    view: UIPoker = null
    group: PokerGroup = null
    get location() : ELocation { return this.group.location }
    get groupIndex() : number { return this.group.index }
    get isTop() : boolean { return this.group.top === this }
    get indexInGroup(): number { return this.group.indexOfPoker(this) }
    initLocation: ELocation = null
    initStatus: EPokerStatus = EPokerStatus.CLOSE
    constructor(point: number, suit: ESuit, status: EPokerStatus) {
        this.point = point
        this.suit = suit
        this.status = status
        this.initStatus = status
    }

    // p 是否能够以红黑交替的方式连接在自己后面
    IsConcatable(p: Poker): boolean {
        return p && (this.point === p.point + 1 && !this.isSimilarSuit(p.suit))
    }

    private isSimilarSuit(suit: ESuit): boolean {
        return (suit + this.suit) % 2 == 0
    }

    Snap(): SnapPoker{
        let snapData: SnapPoker = {
            point: this.point,
            suit: this.suit,
            status: this.status,
            initLocation: this.initLocation,
            initStatus: this.initStatus
        }
        return snapData
    }
}

export type SnapPoker = {
    point: number
    suit: ESuit
    status: EPokerStatus
    initLocation: ELocation
    initStatus: EPokerStatus
}
