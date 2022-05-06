import { ELocation, EPokerStatus, ESuit } from "../../SolitaireEnums"
import Poker from "./Poker"

export interface IPokerGroupEventListener {
    OnGroupPokerStateChanged(poker: Poker, status: EPokerStatus);
}

export default class PokerGroup extends ii.Entity {
    static EVENT_POKERGROUP_STATE_CHANGED: string = "EVENT_POKERGROUP_STATE_CHANGED"

    public get top(): Poker { return this.IsPokersEmpty() ? null : this.pokers[this.pokers.length - 1] }
    public get underTop(): Poker { return this.pokers.length < 2 ? null : this.pokers[this.pokers.length - 2]}
    public get zero(): Poker { return this.IsPokersEmpty() ? null : this.pokers[0] }
    public IsPokersEmpty(): boolean { return this.pokers.length === 0 }
    public indexOfPoker(poker: Poker): number { return this.pokers.indexOf(poker) }
    public index: number = null
    public pokers: Poker[] = []
    public location: ELocation = null
    public get rootOpenPoker(): Poker {
        for(let i=0; i<this.pokers.length; ++i){
            if(this.pokers[i].status === EPokerStatus.OPEN){
                return this.pokers[i]
            }
        }
        return null
    }
    constructor(location: ELocation) {
        super()
        this.location = location
    }
    Reset() {
        while(this.m_Listeners.length > 0) {
            this.RemoveEventListener(this.m_Listeners.pop());
        }
        this.pokers = []
    }
    private m_Listeners: IPokerGroupEventListener[] = []
    AddEventListener(listener: IPokerGroupEventListener) { this.on(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, listener.OnGroupPokerStateChanged.bind(listener), listener); this.m_Listeners.push(listener); }
    private RemoveEventListener(listener: IPokerGroupEventListener) { this.targetOff(listener); }
    
    AddPoker(poker: Poker): Poker {
        this.pokers.push(poker)
        poker.group = this
        switch (this.location) {
            case ELocation.CLOSE:
                if(poker.status !== EPokerStatus.CLOSE){
                    poker.status = EPokerStatus.CLOSE
                    this.emit(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, poker, poker.status)
                }
                break
            case ELocation.OPEN:
                if(poker.status !== EPokerStatus.OPEN){
                    poker.status = EPokerStatus.OPEN
                    this.emit(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, poker, poker.status)
                }
                break
        }
        return poker
    }

    IsAutoFlipOnRemovePoker(poker): boolean {
        let pokerIndex = this.pokers.indexOf(poker)
        console.assert(pokerIndex >= 0)
        // 玩牌区移除牌时自动翻牌逻辑
        if( (this.location === ELocation.PLAY)
            && this.rootOpenPoker === poker
            && (this.pokers[0].status !== EPokerStatus.OPEN)
        ){
            return true
        }
        return false
    }

    RemoveTop(): Poker {
        let poker = this.top
        if (poker) {
            this.pokers.length = this.pokers.length - 1
            poker.group = null
            // 玩牌区移除牌时自动翻牌逻辑
            if( (this.location === ELocation.PLAY)
                && (!this.IsPokersEmpty())
                && (this.top.status !== EPokerStatus.OPEN)
            ){
                this.top.status = EPokerStatus.OPEN
                this.emit(PokerGroup.EVENT_POKERGROUP_STATE_CHANGED, this.top, poker.status)
            }
        }
        return poker
    }

    GetPoker(index: number): Poker {
        if (!this.IsPokersEmpty()) {
            let i = index >= 0 ? index : (this.pokers.length + index)
            if (i < this.pokers.length && i>=0) {
                return this.pokers[i]
            }
        }
        return null
    }
    IsConcatPoker(poker: Poker): boolean {
        if (this.IsPokersEmpty()) {
            return poker.point == 13
        } else {
            return this.top.IsConcatable(poker)
        }
    }
    IsNextPoker(poker: Poker): boolean {
        if(this.top){
            if(this.top.suit === poker.suit){
                return this.top.point + 1 === poker.point
            }else{
                return false
            }
        }else{
            return poker.point === 1
        }
    }
    GetOpenPokers(): Poker[] {
        let pokers = []
        for(let i=0; i<this.pokers.length; ++i){
            if(this.pokers[i].status == EPokerStatus.OPEN) {
                pokers.push(this.pokers[i])
            }
        }
        return pokers
    }

    GetPokerIndexBySuitPoint(suit: ESuit, point: number, status: EPokerStatus): number {
        if (!this.IsPokersEmpty()) {
            for(let i=0; i<this.pokers.length; ++i){
                let poker = this.pokers[i];
                if(poker.status === status && poker.suit == suit && poker.point === point) {
                    return i;
                }
            }
        }
        return -1
    }
}
