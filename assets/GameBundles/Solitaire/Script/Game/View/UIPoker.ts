import { SolitaireSkin } from "../../DataCache/SolitaireSkinDataCache";
import { ELocation, EPokerStatus } from "../../SolitaireEnums";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { TPokerBackSkin } from "../../SolitaireSpriteFrameCfg";
import Poker from "../Model/Poker";
import SolitaireGameDesktopUI from "./SolitaireGameDesktopUI";
import SolitairePokerDisplayUI, { SolitairePokerDisplayUIArgs } from "./SolitairePokerDisplayUI";

const {ccclass, property, requireComponent} = cc._decorator;
@ccclass
export default class UIPoker extends ii.UIComp<Poker>{
    static readonly DRAG_OFFSET_Y: number = 80;
    private m_Display: SolitairePokerDisplayUI = null;
    get backSkin(): TPokerBackSkin { return this.m_Display.backSkin; }
    get frontSkin(): number { return this.m_Display.frontSkin; }
    get faceSkin(): number { return this.m_Display.skin; }
    /*********************************************************************
     * LifeCycle
     *********************************************************************/
    get vm(): Poker { return this.args; }
    protected OnCreate(): void { }
    protected OnRelease(): void {
        this.UnbindTouch();
    }
    protected OnOpen(uiArgs: Poker): void {
        this.vm.view = this;
        this.m_Display = ii.UIMgr.ins.Create<SolitairePokerDisplayUI, SolitairePokerDisplayUIArgs>(SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
            point: this.vm.point,
            suit: this.vm.suit,
            backSkin: { kind: "classic",index:0 },
            frontSkin: 0,
            status: this.vm.status,
            faceSkin: 0
        }, this.node).CloseBy(this);
    }
    Init(faceSkin: number, backSkin: TPokerBackSkin, frontSkin: number): UIPoker { this.m_Display.Init(faceSkin, backSkin, frontSkin); return this; }
    setSkin(skin: SolitaireSkin) { this.m_Display.setSkin(skin); }
    setFaceSkin(faceSkin: number) { this.m_Display.setFaceSkin(faceSkin); }
    setFrontSkin(frontSkin: number) { this.m_Display.setFrontSkin(frontSkin); }
    setBackSkin(backSkin: TPokerBackSkin) { this.m_Display.setBackSkin(backSkin); }
    Refresh() {
        this.m_Display.Refresh(this.vm.status, this.vm.suit, this.vm.point);
    }
    
    /*********************************************************************
     * Public API
     *********************************************************************/
    isOpen(): boolean {
        return this.vm.status == EPokerStatus.OPEN
    }

    isPoint(point: number): boolean {
        return this.vm.point == point
    }

    //#region //! IDrag
    private _touchDelegate: SolitaireGameDesktopUI = null;
    private _bBindTouch: boolean = false;
    private _moveTargetPosition: cc.Vec2 = null;
    SetTouchDelegate(touchDelegate: SolitaireGameDesktopUI) {
        this._touchDelegate = touchDelegate;
        this.BindTouch();
    }
    private BindTouch() {
        if(!this._bBindTouch) {
            this._bBindTouch = true;
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
    }
    private UnbindTouch() {
        if(this._bBindTouch) {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
            this._bBindTouch = false;
        }
    }
    private onTouchStart (event: cc.Event.EventTouch): boolean { return this._touchDelegate.OnDragTouchStart(this, event); }
    private onTouchMove (event: cc.Event.EventTouch) { this._touchDelegate.OnDragTouchMove(this, event); }
    private onTouchEnd (event: cc.Event.EventTouch) { this._touchDelegate.OnDragTouchEnd(this, event); }
    DragStartTest(): boolean {
        if(this.isOpen()){
            // Open 区域，只允许最上方的牌被拖拽
            if((this.vm.location !== ELocation.OPEN) || (this.vm.isTop)) {
                return true
            }
        }
        return false
    }
    
    OnDragStart(event: cc.Event.EventTouch) {
        // 点击时触摸点的位置；
        let _dragStartPosition = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this._moveTargetPosition = cc.v2(_dragStartPosition.x, _dragStartPosition.y + UIPoker.DRAG_OFFSET_Y);
        this.StartScheduler("MOVE_TO_TARGET", this.__MoveToTarget.bind(this), 0);
    }

    OnDragMove(event: cc.Event.EventTouch) {
        let pos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this._moveTargetPosition = cc.v2(pos.x, pos.y+UIPoker.DRAG_OFFSET_Y);
        if(!this.HasScheduler("MOVE_TO_TARGET")) {
            this.setPositionWhenFollow(pos.x, pos.y);
        }
    }
    OnDragEnd() {
        this.StopScheduler("MOVE_TO_TARGET");
    }

    private __MoveToTarget(dt: number) {
        let dx = this._moveTargetPosition.x-this.node.x;
        let dy = this._moveTargetPosition.y-this.node.y;
        if(dx*dx + dy*dy < 10) {
            this.setPositionWhenFollow(this._moveTargetPosition.x, this._moveTargetPosition.y);
        }else{
            this.setPositionWhenFollow(this.node.x + 18*dx*dt, this.node.y + 18*dy*dt);
        }
    }

    private setPositionWhenFollow(x: number, y: number) {
        this.node.x = x
        this.node.y = y
        if(!this.vm.isTop) {
            // 其他牌跟随移动逻辑
            let pokerIndex = this.vm.indexInGroup
            let pokerLength = this.vm.group.pokers.length
            for(let abovePokerIndex= pokerIndex+1; abovePokerIndex < pokerLength; ++abovePokerIndex) {
                let abovePoker = this.vm.group.GetPoker(abovePokerIndex)
                let aboveNode = abovePoker.view.node
                aboveNode.x = x
                aboveNode.y = this.node.y-SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y*(abovePokerIndex-pokerIndex)
            }
        }
    }
    //#endregion
}
