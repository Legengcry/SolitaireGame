import { SolitaireDataCache } from "../../DataCache/SolitaireDataCache";
import { SolitaireLogic } from "../../Logic/SolitaireLogic";
import { SolitaireAudioCfg } from "../../SolitaireAudioCfg";
import { SolitaireCfg } from "../../SolitaireCfg";
import { ELocation, EPokerStatus } from "../../SolitaireEnums";
import { SolitaireEvent } from "../../SolitaireEvent";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { SolitaireSpriteFrameCfg } from "../../SolitaireSpriteFrameCfg";
import Poker from "../Model/Poker";
import { ISolitaireJuEventListener, SolitaireJu } from "../Model/SolitaireJu";
import SolitaireGameBottomMenuUI, { SolitaireGameBottomMenuUIArgs } from "./SolitaireGameBottomMenuUI";
import { UIGameLoseArgs } from "./UIGameLose";
import { UIGameWinArgs } from "./UIGameWin";
import UIHintMgr, { UIHintMgrArgs } from "./UIHintMgr";
import UIPoker from "./UIPoker";

const ZIndex = {
    NORMAL: 0,
    TOP: 999,
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireGameDesktopUI extends ii.UIComp<any> implements ISolitaireJuEventListener{
    //#region //! UI
    @property({type:cc.Sprite,visible:true}) private bgSprite: cc.Sprite = null
    @property({type:cc.Sprite,visible:true}) private bgPatternSprite: cc.Sprite = null 
    @property({type:cc.Node,visible:true}) private _bottomMenuContainer: cc.Node = null /** 底部菜单栏容器节点 */
    @property({type:cc.Node,visible:true}) private actionNode: cc.Node = null // 辅助动画的节点，扑克的移动在此节点中进行
    @property({type:cc.Node,visible:true}) private mui_Container_Hint: cc.Node = null /** 提醒功能所在的节点 */
    @property({type:cc.Node,visible:true}) private pokerRoot: cc.Node = null // pokerRoot 节点在屏幕上方中点处 
    @property({type:cc.Node,visible:true}) private closeAreaButton: cc.Node = null
    @property({type:cc.Node,visible:true}) private closeArea: cc.Node = null
    @property({type:cc.Node,visible:true}) private closeAreaBackground: cc.Node = null 
    @property({type:cc.Node,visible:true}) private openArea: cc.Node = null
    @property({type:cc.Node,visible:true}) private rotateNode: cc.Node = null
    @property({type:[cc.Node],visible:true}) private receiveAreaList: cc.Node[] = []
    @property({type:[cc.Node],visible:true}) private playAreaList: cc.Node[] = []
    @property({type:cc.Sprite,visible:true}) private mui_closeAreaBottomSprite: cc.Sprite = null
    @property({type:[cc.SpriteFrame],visible:true}) private md_closeAreaSpriteFrameList: cc.SpriteFrame[] = []
    get CloseAreaBackground(): cc.Node { return this.closeAreaBackground; }
    get ReceiveAreaList(): cc.Node[] { return this.receiveAreaList; }
    get PlayAreaList(): cc.Node[] { return this.playAreaList; }
    get OpenArea(): cc.Node { return this.openArea; }
    get CloseArea(): cc.Node { return this.closeArea; }
    //#endregion

    //#region //! Data
    static readonly EVENT_GAMEVIEW_POKERS_READY: string = 'EVENT_GAMEVIEW_POKERS_READY'
    private readonly POKER_WIDTH: number = 82;
    private readonly POKER_HEIGHT: number = 126;
    private readonly TIME_MOVE: number = 0.2;
    private readonly TIME_FLIP_HALF: number = 0.2;
    private m_UIPokerList: UIPoker[] = []
    private m_UIHintMgr: UIHintMgr = null
    //#endregion
    
    //#region //! 界面几个区域之间的布局
    static readonly PLAY_CLOSE_POKER_PADDING_Y: number = 20;
    static readonly PLAY_OPEN_POKER_PADDING_Y: number = 40;
    private readonly OFFSET_TOP: number = 200; // 收牌区距离顶部的距离
    public readonly PADDING_PLAY: number = 90;
    private __x(index: number): number{ return -270+index*this.PADDING_PLAY }
    private __y(line: number = 0, pokerIndex: number = 0): number { let y = -this.OFFSET_TOP-line*140-SolitaireGameDesktopUI.PLAY_CLOSE_POKER_PADDING_Y*pokerIndex; return y; }
    //#endregion
    
    private m_DataCache: SolitaireDataCache = null;
    private m_BottomMenuUI: SolitaireGameBottomMenuUI = null;
    private m_Ju: SolitaireJu = null;
    //#region //! 生命周期 UIComp
    protected OnCreate(): void {
        // 各个区域位置调整
        for(let i = 0; i<7; ++i){
            const node = this.playAreaList[i]
            node.active = true
            node.position = cc.v3(this.__x(i), this.__y(1), 0)
        }

        this.closeAreaButton.zIndex = -1
        this.actionNode.zIndex = ZIndex.TOP+1
        this.mui_Container_Hint.zIndex = ZIndex.TOP+2
        this.setPlaceHolderVisiable(false)

        this.m_DataCache = this.GetDataCache(SolitaireCfg.SOLITAIRE_DATACACHE);
        this.m_BottomMenuUI = ii.UIMgr.ins.Create<SolitaireGameBottomMenuUI, SolitaireGameBottomMenuUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireGameBottomMenuUI.key, { }, this._bottomMenuContainer).CloseBy(this);
    }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: any): void {
        this.SetIIClickHandler("OnCloseArea", ()=>this.OnClickCloseBottom());
    }
    
    @ii.Util.block(0.5)
    OnClickCloseBottom() {
        this.m_Ju.OnClickCloseBottom()
    }
    //#endregion

    Enter(ju: SolitaireJu) {
        this.m_Ju = ju;
        this.setPlaceHolderVisiable(true);
        this.BindBV(this.m_DataCache.leftHandBV, this.LayoutWithHand.bind(this), true);
        this.BindBV(SolitaireLogic.skin.skinBV, skin => {
            this.m_UIPokerList.forEach(uiPoker => uiPoker.setSkin(skin));
            this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin), sp=>this.bgSprite.spriteFrame = this.SetAssetProperty("BG_SKIN", sp), false, this.UUID_GROUP_KEY("BG_SKIN"))
            this.bgPatternSprite.node.active = skin.bgPatternSkin !== -1
            if(skin.bgPatternSkin >= 0) {
                this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.bgPatternSkinUrl(skin.bgPatternSkin), sp=>this.bgPatternSprite.spriteFrame = this.SetAssetProperty("BG_PATTERN_SKIN", sp), false, this.UUID_GROUP_KEY("BG_PATTERN_SKIN"))
            }
        }, true);

        ju.AddEventListener(this);

        // 提示功能
        this.m_UIHintMgr = ii.UIMgr.ins.Create<UIHintMgr, UIHintMgrArgs>(SolitairePrefabCfg.pfb.comp.UIHintMgr.key, {
            ju: this.m_Ju,
            desktop: this
        }, this.mui_Container_Hint);

        this.m_BottomMenuUI.Enter(this.m_Ju)
    }

    Exit(ju: SolitaireJu) {
        this.m_BottomMenuUI.Exit(this.m_Ju)
        this.m_UIHintMgr.Close();
        for(let index = this.m_UIPokerList.length-1; index >=0; --index){
            this.m_UIPokerList[index].Close()
            this.m_UIPokerList.length = this.m_UIPokerList.length-1
        }
        this.setPlaceHolderVisiable(false)

        this._bIsUISubscrib = false;
        ju.RemoveEventListener(this);
        this.UnbindAllBV();
    }

    //#region //! UI 的显示隐藏 左右手
    private setPlaceHolderVisiable(visiable: boolean) {
        for(let i = 0; i<7; ++i){
            this.playAreaList[i].active = visiable
        }
        for(let i = 0; i<4; ++i){
            this.receiveAreaList[i].active = visiable
        }
        this.closeAreaButton.active = visiable
    }
    private LayoutWithHand(isLeftHand: boolean){
        if(isLeftHand){
            for(let i = 0; i<4; ++i){
                const node = this.receiveAreaList[i]
                node.position = cc.v3(this.__x(3+i), this.__y(0), 0)
            }
            this.openArea.position = cc.v3(this.__x(1), this.__y(0), 0)
            this.closeArea.position = cc.v3(this.__x(0), this.__y(0), 0)
            this.closeAreaButton.position = cc.v3(this.__x(0), this.__y(), 0)
        }else{
            for(let i = 0; i<4; ++i){
                const node = this.receiveAreaList[i]
                node.position = cc.v3(this.__x(i), this.__y(0), 0)
            }
            this.openArea.position = cc.v3(this.__x(4), this.__y(0), 0)
            this.closeArea.position = cc.v3(this.__x(6), this.__y(0), 0)
            this.closeAreaButton.position = cc.v3(this.__x(6), this.__y(), 0)
        }
    }
    //#endregion

    //#region //! Event
    private _bIsUISubscrib: boolean = false;
    get SolitaireJuEventTarget(): any { return this.node; }
    OnSolitaireDesktopEvent(ju: SolitaireJu, eventTyp: SolitaireEvent, data?: any): void {
        switch (eventTyp) {
            case SolitaireEvent.SC_INIT: this.HandleModelEventInit(data); break;
            case SolitaireEvent.SC_UI_SUBSCRIB:
                this._bIsUISubscrib = true;
                this.BindBV(ju.foundationCounts, count => count >= 0 && ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.GetFoundation(count)), false);
                this.BindBV(ju.flipCloseCardsCountBV, () => {
                    let spIndex: number = ju.IsCanReflip() ? 0 : 1
                    this.mui_closeAreaBottomSprite.spriteFrame = this.md_closeAreaSpriteFrameList[spIndex]
                }, true)
                break;
        }

        if(!this._bIsUISubscrib) {
            return;
        }
        // 开启了 UI 订阅以后，才响应这些类型的处理
        switch (eventTyp) {
            case SolitaireEvent.SC_INIT: break;
            case SolitaireEvent.SC_UI_SUBSCRIB: break;
            case SolitaireEvent.SC_TIME_CHANGED: break;
            case SolitaireEvent.SC_PLAY: this.HandleModelEventPlay(data); break;
            case SolitaireEvent.SC_SEND_POKERS: this.HandleModelEventSendPokers(data);break;
            case SolitaireEvent.SC_FLIP_POKER: this.HandleFlipPoker(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FROM_CLOSE_TO_OPEN: this.HandleMovePokerFromCloseToOpen(data);break;
            case SolitaireEvent.SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN: this.HandleMovePokersFromCloseToOpen(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE: this.HandleMovePokerFormPlayToReceive(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE: this.HandleMoveFromOpenToReceive(data);break;
            case SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE: this.HandleMovePokerFormPlayToReceive(data);break;
            case SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE: this.HandleMoveFromOpenToReceive(data);break;
            case SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE: this.HandleMovePokerToTarget(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_PLAY: this.HandleMovePokerFromOpenToPlay(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_PLAY: this.HandleMovePokerToTarget(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY: this.HandleMovePokerToTarget(data);break;
            case SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_PLAY: this.HandleMovePokerToTarget(data);break;
            case SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY: this.HandleMovePokerToTarget(data);break;
            case SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_PLAY: this.HandleMovePokerFromOpenToPlay(data);break;
            case SolitaireEvent.SC_MOVE_POKERS_FROM_PLAY_TO_PLAY: this.HandleMovePokersToTarget(data);break;
            case SolitaireEvent.SC_DRAG_POKERS_FROM_PLAY_TO_PLAY: this.HandleMovePokersToTarget(data);break;
            case SolitaireEvent.SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE: this.HandleMoveAllPokersFromOpenToClose(data);break;
            case SolitaireEvent.SC_DRAG_POKER_NO_CHANGE: this.HandleMovePokerNoChange(data);break;
            case SolitaireEvent.SC_CLICK_POKER_NO_CHANGE: this.HandleClickPokerNoChange(data);break;
            case SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY: this.HandleUndoMovePokersToTarget(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY: this.HandleUndoMovePokerToTarget(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN: this.HandleUndoMovePokerToOpen(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN: this.HandleUndoMovePokerToOpen(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE: this.HandleUndoMovePokerToTarget(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY: this.HandleUndoMovePokerToTarget(data);break;
            case SolitaireEvent.SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN: this.HandleMoveAllPokersForUndoFromCloseToOpen(data);break;
            case SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE: this.HandleMovePokerForUndoFromOpenToClose(data);break;
            case SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE: this.HandleMovePokersForUndoFromOpenToClose(data);break;
            case SolitaireEvent.SC_REFRESH_POKERS: this.HandleRefreshPokers(data);break;
            case SolitaireEvent.SC_WIN: this.HandleGameWin(ju); break;
            case SolitaireEvent.SC_LOSE: this.HandleGameLose(ju); break;
            default: break;
        }        
    }

    private HandleModelEventInit(pokers: Poker[]) {
        // 创建所有扑克牌UI
        let skin = SolitaireLogic.skin.skinBV.v;
        pokers.forEach(poker => {
            let uiPoker = ii.UIMgr.ins.Create<UIPoker, Poker>(SolitairePrefabCfg.pfb.comp.UIPoker.key, poker).Init(skin.faceSkin, skin.backSkin, skin.frontSkin);
            uiPoker.node.position = cc.v3(0, 0, 0)
            this.pokerRoot.addChild(uiPoker.node)
            this.m_UIPokerList.push(uiPoker)
            uiPoker.SetTouchDelegate(this);
        })
    }
    private HandleModelEventPlay(ju: SolitaireJu) {
        {
            let pokers:Poker[] = ju.CloseAreaGroup.pokers;
            for(let i=pokers.length-1; i>=0; --i){
                let poker = pokers[i]
                ii.UIUtil.transferTo(poker.view.node, this.closeArea)
                poker.view.node.zIndex = poker.indexInGroup
                poker.view.node.position = this.positionInTarget(poker)
            }
        }
        {

            let pokers: Poker[] = ju.OpenAreaGroup.pokers;
            for(let i=pokers.length-1; i>=0; --i){
                let poker = pokers[i]
                ii.UIUtil.transferTo(poker.view.node, this.openArea)
                poker.view.node.zIndex = poker.indexInGroup
                poker.view.node.position = this.positionInTarget(poker)
            }
        }

        {
            for(let playIndex=0; playIndex<7; ++playIndex) {
                let group = ju.PlayGroups[playIndex];
                let pokers: Poker[] = group.pokers;
                for(let i=pokers.length-1; i>=0; --i){
                    let poker = pokers[i]
                    ii.UIUtil.transferTo(poker.view.node, this.playAreaList[playIndex])
                    poker.view.node.zIndex = poker.indexInGroup
                    poker.view.node.position = this.positionInTarget(poker)
                }
            }
        }

        {
            for(let receiveIndex=0; receiveIndex<4; ++receiveIndex) {
                let group = ju.ReceiveGroups[receiveIndex];
                let pokers: Poker[] = group.pokers;
                for(let i=pokers.length-1; i>=0; --i){
                    let poker = pokers[i]
                    ii.UIUtil.transferTo(poker.view.node, this.receiveAreaList[receiveIndex])
                    poker.view.node.zIndex = poker.indexInGroup
                    poker.view.node.position = this.positionInTarget(poker)
                }
            }
        }
    }
    private HandleModelEventSendPokers(pokers: Poker[]){
        // 思路：先将计算出目标在当前节点中的位置，移动到该位置后，再改变父节点       
        pokers.forEach((poker, index) => {
            const speedFactor = 20.0
            const delay: number = index/speedFactor
            const isLast: boolean = index === pokers.length-1
            // 发牌动画
            ii.UIUtil.transferTo(poker.view.node, this.actionNode)
            const {position, target} = this.getTargetAndPositionInParent(poker)

            const total_time: number = this.__timeOfDistance(poker.view.node.position, position)
            let lastCallback = ()=>{
                if(isLast){
                    pokers.forEach(p => {
                        if(p.status == EPokerStatus.OPEN){
                            this.FlipPoker(p)
                        }
                    })
                    this.emitGlobal(SolitaireGameDesktopUI.EVENT_GAMEVIEW_POKERS_READY)
                }
            }
            cc.tween(poker.view.node)
                .delay(delay)
                .call(() => ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move))
                .to(total_time, {position: position})
                .call(()=>{
                    ii.UIUtil.transferTo(poker.view.node, target)
                    poker.view.node.zIndex = poker.indexInGroup
                    lastCallback()
                })
                .start()
        })
    }
    private HandleFlipPoker(poker){
        this.FlipPoker(poker)
    }
    private HandleMovePokerFromCloseToOpen(poker: Poker) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.flip)
        this.__FlipAndMoveToTarget(poker)
        // 如果 Open 区域 >= 4 张牌(已包含这张)，那么需要调整下方2张牌的位置
        if(poker.group.pokers.length >= 4) {
            for(let i=0; i<2; ++i){
                this.__AdjustOpenPokerByIndex(-i-2)
            }
        }
    }
    private HandleMovePokersFromCloseToOpen(pokers: Poker[]) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.flip)
        pokers.forEach(poker=>{
            this.__FlipAndMoveToTarget(poker)
        })
        // 移动多张牌：pokers 下方的牌都移动到目标位置
        let g = this.m_Ju.OpenAreaGroup;
        let preCount = g.pokers.length - pokers.length
        if(preCount > 3){
            preCount = 3
        }
        for(let i = 0; i < preCount; ++i) {
            this.__AdjustOpenPokerByIndex(-i-1-pokers.length)
        }
    }
    private HandleMoveFromOpenToReceive(poker: Poker) {
        this.MovePokerToTarget(poker)
        // 还剩下 >=3 张牌的时候，需要调整位置
        let g = this.m_Ju.OpenAreaGroup;
        if(g.pokers.length >= 3){
            // 顶部 2 张牌需要调整
            for(let i=0; i<2; ++i){
                this.__AdjustOpenPokerByIndex(-1-i)
            }
        }
    }
    private HandleMovePokerFormPlayToReceive(poker: Poker){
        this.MovePokerToTarget(poker)
    }
    private HandleMovePokerFromOpenToPlay(poker: Poker) {
        this.HandleMovePokerToTarget(poker)
        // 还剩下 >=3 张牌的时候，需要调整位置
        let g = this.m_Ju.OpenAreaGroup
        if(g.pokers.length >= 3){
            // 顶部 2 张牌需要调整
            for(let i=0; i<2; ++i){
                this.__AdjustOpenPokerByIndex(-1-i)
            }
        }
    }
    private HandleMovePokerToTarget(poker: Poker){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move)
        this.MovePokerToTarget(poker)
    }
    private HandleMoveAllPokersFromOpenToClose(pokers: Poker[]) {
        pokers.forEach(poker => {
            poker.view.node.stopAllActions()
            this.__FlipAndMoveToTarget(poker)
        })
    }
    private HandleMovePokerNoChange(poker: Poker) {
        this.MovePokerBack(poker)
    }
    private HandleMovePokersToTarget(pokers: Poker[]){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move)
        this.MovePokersToTarget(pokers)
    }
    private HandleClickPokerNoChange(poker: Poker){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.invalid);
        ii.App.ins.p.vibrate.Default();
        this.ShakePoker(poker)
    }
    private HandleUndoMovePokersToTarget(pokers: Poker[]){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.undo)
        this.MovePokersToTarget(pokers)
    }
    private HandleUndoMovePokerToOpen(poker: Poker){
        this.HandleUndoMovePokerToTarget(poker)
        // 如果 Open 区域 >= 4 张牌(已包含这张)，那么需要调整下方2张牌的位置
        if(poker.group.pokers.length >= 4) {
            for(let i=0; i<2; ++i){
                this.__AdjustOpenPokerByIndex(-i-2)
            }
        }
    }
    private HandleUndoMovePokerToTarget(poker: Poker){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.undo)
        this.MovePokerToTarget(poker)
    }
    private HandleMoveAllPokersForUndoFromCloseToOpen(pokers: Poker[]){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.undo)
        this.MoveAllPokersForUndoFromCloseToOpen(pokers)
    }
    private HandleMovePokerForUndoFromOpenToClose(poker: Poker){
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.undo)
        this.__FlipAndMoveToTargetByActionNode(poker)
        // 还剩下 >=3 张牌的时候，需要调整位置
        let g = this.m_Ju.OpenAreaGroup
        if(g.pokers.length >= 3){
            // 顶部 2 张牌需要调整
            for(let i=0; i<2; ++i){
                this.__AdjustOpenPokerByIndex(-1-i)
            }
        }
    }
    private HandleMovePokersForUndoFromOpenToClose(pokers: Poker[]) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.undo)
        for(let i=pokers.length-1; i>=0; --i){
            this.__FlipAndMoveToTargetByActionNode(pokers[i])
        }
        // 需要调整顶部牌位置
        let g = this.m_Ju.OpenAreaGroup
        let cnt = g.pokers.length
        let moveCount = 0
        if(cnt >= 3) {
            moveCount = 2
        }else if(cnt == 2){
            moveCount = 1
        }
        // 顶部 2 张牌需要调整
        for(let i=0; i<moveCount; ++i){
            this.__AdjustOpenPokerByIndex(-1-i)
        }
    }
    private HandleRefreshPokers(pokers: Poker[]) {
        pokers.forEach(poker => {
            const target = this.getTargetNode(poker)
            const position=this.positionInTarget(poker)
            poker.view.node.parent = target
            poker.view.node.position = position
            poker.view.node.zIndex = poker.indexInGroup
            poker.view.Refresh()
        })

        this.emitGlobal(SolitaireGameDesktopUI.EVENT_GAMEVIEW_POKERS_READY)
    }

    private HandleGameWin(ju: SolitaireJu) {
        this.__RunWinAction(ju, ()=>{
            SolitaireLogic.HandleGameWin(ju, ()=>{
                // 打开胜利页面
                ii.UIMgr.ins.Open<UIGameWinArgs>(SolitairePrefabCfg.pfb.panel.UIGameWin.key, {
                    ju: ju
                });
            });
        });
    }

    private HandleGameLose(ju: SolitaireJu) {
        ii.UIMgr.ins.Open<UIGameLoseArgs>(SolitairePrefabCfg.pfb.panel.UIGameLose.key, { ju });
    }

    private __AdjustOpenPokerByIndex(index: number) {
        let p: Poker = this.m_Ju.OpenAreaGroup.GetPoker(index)
        if(p){
            this.__MovePokerByTimeDirectly(p, this.TIME_MOVE)
        }
    }

    private __RunWinAction(ju: SolitaireJu, cb: Function) {
        let __cb = ii.Util.onceCall(()=>{
            cb();
            ii.UIMgr.ins.DecBlockRef();
        }, 1);
        ii.UIMgr.ins.AddBlockRef();
        // 播放胜利特效后进行回调
        cc.Tween.stopAllByTarget(this.rotateNode);
        this.rotateNode.angle = 0;
        let timeOfOneCircle = 5.25*0.5;
        let POKER_VIRTUAL_CNT = 52.5
        let timeOfPokerInterval = timeOfOneCircle/POKER_VIRTUAL_CNT;
        // 动画描述初步：每一张排移动到右上角后转1圈多后，从左上角切线飞到收牌区；
        // 第一张牌飞到圆周上（和x轴夹角 theta）时，开始转动，直到最后一张牌到圆周上时，棋盘刚好转了一周；此时再转（180 + theta) 角度后第一张牌飞出到目标位置，最后一张牌再转一周      
        let theta = 45;
        // 总共旋转的角度为
        let totalRotate = -(360 + (180 + 2*theta) + 360);
        let totalRotateTime = -totalRotate*timeOfOneCircle/360;
        let timePointOfPokerExit =  (360 + (180 + 2*theta))*timeOfOneCircle/360
        let timeOfPokerEnter = 0.2;
        let R = 240;
        // 每一张牌，切入时初始旋转角度为
        let _enterAngle = theta-90;
        // 计算每一张牌，需要移动到到位置的世界坐标
        let x0 = R*Math.cos(_enterAngle);
        let y0 = -R*Math.sin(_enterAngle);
        let wp = this.rotateNode.convertToWorldSpaceAR(cc.v2(x0, y0));
        let _twp = this.rotateNode.parent.convertToNodeSpaceAR(wp);
        let _twpV3 = cc.v3(_twp.x, _twp.y, 0);
        let _pokerCnt = 0;
        // this.rotateNode.parent
        for(let receiveGroupIndex = 0; receiveGroupIndex < 4; ++receiveGroupIndex) {
            let _receiveGroup = ju.getReceiveGroup(receiveGroupIndex);
            for(let i=_receiveGroup.pokers.length-1; i>=0; --i){
                let _poker = _receiveGroup.pokers[i];
                _poker.view.StopAllAction();
                ii.UIUtil.transferTo(_poker.view.node, this.rotateNode.parent)
                let _pCnt = _pokerCnt;
                cc.tween(_poker.view.node)
                    .delay(_pokerCnt*timeOfPokerInterval)
                    .call(_node => {
                        _node.zIndex = ZIndex.TOP + _pCnt;
                        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move);
                    })
                    .to(timeOfPokerEnter, {position: _twpV3, angle: _enterAngle})
                    .call((_node: cc.Node) => {
                        // 移动到转盘
                        ii.UIUtil.transferTo(_node, this.rotateNode);
                        // 调整旋转角度
                        _node.angle = _enterAngle + _pCnt*360/51;
                        _node.zIndex = POKER_VIRTUAL_CNT-_pCnt
                    })
                    .start();
                if(_pokerCnt == 0) {
                    // 棋盘开始转动
                    cc.tween(this.rotateNode)
                        .delay(timeOfPokerEnter)    
                        .to(totalRotateTime, {angle: totalRotate})
                        .start()
                    cc.tween(this.node)
                        .delay(timeOfPokerEnter + timePointOfPokerExit)
                        .call(()=>{
                            this.__RunWinExitAction(ju, __cb, timeOfPokerInterval, -_enterAngle);
                        })
                        .start();
                }
                ++_pokerCnt;
            }
        }
    }

    private __RunWinExitAction(ju: SolitaireJu, cb: Function, timeOfPokerInterval: number, angleOfExit: number) {
        let _pokerCnt = 0;
        let timeOfPokerExit = 0.2;
        var wp = this.rotateNode.parent.convertToNodeSpaceAR(this.closeArea.convertToWorldSpaceAR(cc.Vec3.ZERO));
        for(let receiveGroupIndex = 0; receiveGroupIndex < 4; ++receiveGroupIndex) {
            let _receiveGroup = ju.getReceiveGroup(receiveGroupIndex);
            for(let i=_receiveGroup.pokers.length-1; i>=0; --i){
                let _poker = _receiveGroup.pokers[i];
                let _pCnt = _pokerCnt;
                cc.tween(_poker.view.node)
                    .delay(_pCnt*timeOfPokerInterval)
                    .call((_node: cc.Node) => {
                        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move)
                        ii.UIUtil.transferTo(_node, this.rotateNode.parent)
                        _node.zIndex = 52 + _pCnt;
                        _node.angle = angleOfExit;
                    })
                    .to(timeOfPokerExit, {position: wp, angle: 0})
                    .call(()=>{
                        if(_pCnt == 51) {
                            cb();
                        }
                    })
                    .start();
                ++_pokerCnt;
            }
        }
    }
    //#endregion     

    //#region //! Move Action 正真的移动操作部分（每一个 Event Handler 会调用一个 Move 类型的函数）
    private MoveAllPokersForUndoFromCloseToOpen(pokers: Poker[]) {
        pokers.forEach(poker => {
            poker.view.StopAllAction()
            this.__FlipAndMoveToTarget(poker)
        })
    }
    private MovePokerBack(poker: Poker) {
        if(poker.isTop){
            this.MovePokerToTarget(poker, false)
        }else{
            let pokerIndex = poker.indexInGroup
            let pokerLength = poker.group.pokers.length
            for(let abovePokerIndex= pokerIndex; abovePokerIndex < pokerLength; ++abovePokerIndex) {
                let abovePoker = poker.group.GetPoker(abovePokerIndex)
                this.MovePokerToTarget(abovePoker, false)
            }
        }
    }
    private ShakePoker(poker: Poker) {
        if(poker.isTop){
            this.__ShakePoker(poker)
        }else{
            let pokerIndex = poker.indexInGroup
            let pokerLength = poker.group.pokers.length
            for(let abovePokerIndex= pokerIndex; abovePokerIndex < pokerLength; ++abovePokerIndex) {
                let abovePoker = poker.group.GetPoker(abovePokerIndex)
                this.__ShakePoker(abovePoker)
            }
        }
    }
    private __ShakePoker(poker: Poker) {
        poker.view.StopAllAction();
        const SHAKE_DX: number = 4.0
        const SHAKE_HALF_TIME: number = 0.05
        let __StopCall = (p: UIPoker) => {
            cc.Tween.stopAllByTarget(p.node)
            let tpos = this.positionInTarget(p.vm)
            p.node.position = tpos
        }
        poker.view.AddStopActionCall(__StopCall)
        cc.tween(poker.view.node)
            .by(SHAKE_HALF_TIME, {position: cc.v3(-SHAKE_DX, 0, 0)})
            .by(SHAKE_HALF_TIME*2, {position: cc.v3(SHAKE_DX*2, 0, 0)})
            .by(SHAKE_HALF_TIME, {position: cc.v3(-SHAKE_DX, 0, 0)})
            .call(()=>{
                poker.view.RemoveStopCall(__StopCall)
                __StopCall(poker.view)
            })
            .start()
    }
    private __FlipAndMoveToTarget(poker: Poker) {
        poker.view.Refresh()
        const target: cc.Node = this.getTargetNode(poker)
        ii.UIUtil.transferTo(poker.view.node, target)
        poker.view.node.zIndex = poker.indexInGroup
        // 移动的时间应该是固定的，才会比较有层次感
        this.__MovePokerByTimeDirectly(poker, this.TIME_MOVE)
    }
    private __FlipAndMoveToTargetByActionNode(poker: Poker) {
        poker.view.StopAllAction()
        poker.view.Refresh()
        ii.UIUtil.transferTo(poker.view.node, this.actionNode)
        const {position, target} = this.getTargetAndPositionInParent(poker)
        const time = this.__timeOfDistance(position, poker.view.node.position)
        let __StopCall = (p: UIPoker) => {
            p.node.position = position
            ii.UIUtil.transferTo(p.node, target)
            p.node.zIndex = p.vm.indexInGroup
        }
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .to(time, {position: position})
            .call((node: cc.Node) => {
                poker.view.RemoveStopCall(__StopCall)
                __StopCall(poker.view)
            })
            .start()
    }
    
    private MovePokerToTarget(poker: Poker, resetZIndex: boolean = true){
        poker.view.StopAllAction()
        ii.UIUtil.transferTo(poker.view.node, this.actionNode)
        const {position, target} = this.getTargetAndPositionInParent(poker)
        const time = this.__timeOfDistance(position, poker.view.node.position)
        let __StopCall = (p: UIPoker) => {
            p.node.position = position
            ii.UIUtil.transferTo(p.node, target)
            if(resetZIndex) {
                p.node.zIndex = poker.view.vm.indexInGroup
            }
        }
        poker.view.AddStopActionCall(__StopCall)
        cc.tween(poker.view.node)
            .to(time, {position: position})
            .call((node)=>{
                __StopCall(poker.view)
                poker.view.RemoveStopCall(__StopCall)
            })
            .start()
    }
    private MovePokersToTarget(pokers: Poker[]) {
        for(let pokerIndex=pokers.length-1; pokerIndex >=0; --pokerIndex){
            let poker = pokers[pokerIndex]
            this.MovePokerToTarget(poker)
        }
    }
    private FlipPoker(poker: Poker) {
        poker.view.StopAllAction();
        let __StopCall = (p: UIPoker) => { p.Refresh(); p.node.scaleX = 1; }
        poker.view.AddStopActionCall(__StopCall)
        cc.tween(poker.view.node)
            .to(this.TIME_FLIP_HALF, {scaleX: 0})
            .call(()=>{ poker.view.Refresh() })
            .to(this.TIME_FLIP_HALF, {scaleX: 1})
            .call(()=>{
                poker.view.RemoveStopCall(__StopCall)
            })
            .start()
    }
    private __MovePokerByTimeDirectly(poker: Poker, time: number) {
        poker.view.StopAllAction()
        let targetPosition = this.positionInTarget(poker);
        let __StopCall = (p: UIPoker) => { p.node.position = targetPosition }
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .to(time, {position: targetPosition})
            .call(()=>poker.view.RemoveStopCall(__StopCall))
            .start()
    }
    //#endregion

    //#region //! 辅助函数
    private topZIndexByPoker(poker: Poker) {
        return this.topZIndex(poker.location, poker.groupIndex)
    }
    private topZIndex(location: ELocation, index: number = 0) {
        this.__setZIndex(location, index, ZIndex.TOP)
    }
    private __setZIndex(location: ELocation, index: number, targetZIndex: number) {
        switch (location) {
            case ELocation.PLAY:
                this.closeArea.zIndex = ZIndex.NORMAL
                this.openArea.zIndex = ZIndex.NORMAL
                this.playAreaList.forEach((node, i) => node.zIndex = (i === index) ? targetZIndex : ZIndex.NORMAL)
                this.receiveAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)       
                break;
            case ELocation.OPEN:
                this.closeArea.zIndex = ZIndex.NORMAL
                this.openArea.zIndex = targetZIndex
                this.playAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)
                this.receiveAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)
                break;
            case ELocation.CLOSE:
                this.closeArea.zIndex = targetZIndex
                this.openArea.zIndex = ZIndex.NORMAL
                this.playAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)
                this.receiveAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)
                break;
            default:
                console.assert(location == ELocation.RECEIVE)
                this.closeArea.zIndex = ZIndex.NORMAL
                this.openArea.zIndex = ZIndex.NORMAL
                this.playAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)
                this.receiveAreaList.forEach((node, i) => node.zIndex = (i === index) ? targetZIndex : ZIndex.NORMAL)
                break;
        }
    }
    private resetZIndex(){
        this.closeArea.zIndex = ZIndex.NORMAL
        this.openArea.zIndex = ZIndex.NORMAL
        this.playAreaList.forEach(node => node.zIndex = ZIndex.NORMAL)
        this.receiveAreaList.forEach(node => node.zIndex = ZIndex.NORMAL) 
    }
    private getReceiveIndexByUIPoker(uiPoker: UIPoker): number {
        let wp = uiPoker.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
        for(let receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            let receiveNode = this.receiveAreaList[receiveIndex]
            let rwp = receiveNode.convertToWorldSpaceAR(cc.Vec3.ZERO)
            if(Math.abs(rwp.x - wp.x) < 60 && Math.abs(rwp.y - wp.y) < 100) {
                return receiveIndex
            }
        }
        
        return -1
    }
    // 提供给拖拽判定的 API
    private getPlayIndexByPoker(poker: Poker): number {
        let isPokerInPlay: boolean = poker.location == ELocation.PLAY
        let wp = poker.view.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
        for(let groupIndex=0; groupIndex < 7; ++groupIndex) {
            if(isPokerInPlay && poker.groupIndex === groupIndex){
                continue
            }
            let playGroup = this.m_Ju.getPlayGroup(groupIndex)
            let node: cc.Node = (playGroup.top === null) ? this.playAreaList[groupIndex] : playGroup.top.view.node
            let wp0: cc.Vec3 = node.convertToWorldSpaceAR(cc.Vec3.ZERO)
            if(wp0.x-this.POKER_WIDTH < wp.x && wp.x < wp0.x+this.POKER_WIDTH 
                && wp0.y-this.POKER_HEIGHT < wp.y && wp.y < wp0.y+this.POKER_HEIGHT ) {
                return groupIndex;
            }
        }
        return -1
    }
    private getTargetNode(poker: Poker) {
        let location: number = poker.location
        let groupIndex: number = poker.groupIndex
        switch (location) {
            case ELocation.PLAY:
                return this.playAreaList[groupIndex]
            case ELocation.OPEN:
                return this.openArea
            case ELocation.CLOSE:
                return this.closeArea
            default:
                console.assert(location == ELocation.RECEIVE)
                return this.receiveAreaList[groupIndex]
        }
    }
    private positionInTarget(poker: Poker): cc.Vec3 {
        let location: number = poker.location
        switch (location) {
            case ELocation.PLAY:
                let pokerIdx = poker.indexInGroup
                let rootPokerIndex = poker.group.rootOpenPoker.indexInGroup
                if(pokerIdx <= rootPokerIndex){
                    return cc.v3(0, -SolitaireGameDesktopUI.PLAY_CLOSE_POKER_PADDING_Y*pokerIdx, 0) 
                }else{
                    return cc.v3(0, -SolitaireGameDesktopUI.PLAY_CLOSE_POKER_PADDING_Y*rootPokerIndex - SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y*(pokerIdx-rootPokerIndex), 0)
                }
            case ELocation.OPEN:
                let pokerIndex: number = poker.indexInGroup
                let pokerLength = poker.group.pokers.length
                if(pokerLength >= 3){
                    if(pokerIndex == pokerLength - 1){
                        return cc.v3(this.PADDING_PLAY, 0, 0)
                    }else if(pokerIndex == pokerLength - 2){
                        return cc.v3(this.PADDING_PLAY/2, 0, 0)
                    }else{
                        return cc.Vec3.ZERO
                    }
                }else if(pokerLength == 2){
                    if(pokerIndex == pokerLength - 1){
                        return cc.v3(this.PADDING_PLAY/2, 0, 0)
                    }else{
                        return cc.Vec3.ZERO
                    }
                }else{
                    return cc.Vec3.ZERO
                }
            case ELocation.CLOSE:
                return cc.Vec3.ZERO
            default:
                console.assert(location == ELocation.RECEIVE)
                return cc.Vec3.ZERO
        }
    }
    // 获得扑克牌目标位置在当前父节点下的位置
    private getTargetAndPositionInParent(poker: Poker) {
        const target: cc.Node = this.getTargetNode(poker)
        let tpos = this.positionInTarget(poker)
        let wtpos = target.convertToWorldSpaceAR(tpos)
        let position = poker.view.node.parent.convertToNodeSpaceAR(wtpos)
        return {target, position}
    }

    public __timeOfDistance(from: cc.Vec3, to: cc.Vec3, speedFactor: number = 1): number {
        const distance: number = cc.Vec3.distance(from, to)
        const speed: number = 1500*speedFactor
        const total_time: number = distance/speed
        return total_time
    }
    //#endregion
    
    //#region //! IDragDelegate
    private m_isTouchStart: boolean = false;
    private m_isDragStart: boolean = false;
    private m_MoveCount: number = 0;
    private m_EventTouch: cc.Event.EventTouch = null;
    OnDragTouchStart(uiPoker: UIPoker, event: cc.Event.EventTouch): boolean {
        if(this.m_isTouchStart) {
            return false
        }
        if( !uiPoker.DragStartTest() ) {
            this.ClickUIPoker(uiPoker);
            return;
        }
        this.m_isTouchStart = true;
        this.m_isDragStart = false;
        this.m_MoveCount = 0;
        this.m_EventTouch = event;
        this.StartScheduler("JU_TOUCH_TIME", ()=>{
            if(!this.m_isDragStart) {
                this.m_isDragStart = true;
                uiPoker.OnDragStart(this.m_EventTouch);
            }
        }, 0.3, 1);
        return true;
    }
    OnDragTouchMove(uiPoker: UIPoker, event: cc.Event.EventTouch){
        if(!this.m_isTouchStart) {
            return;
        }
        if(this.m_isDragStart) {
            uiPoker.OnDragMove(event);
        }else{
            ++this.m_MoveCount;
            if(this.m_MoveCount > 5) {
                this.StopScheduler("JU_TOUCH_TIME");
                this.m_isDragStart = true;
                this.topZIndexByPoker(uiPoker.vm);
                uiPoker.OnDragStart(event)
            }else{
                this.m_EventTouch = event;
            }
        }
    }
    OnDragTouchEnd(uiPoker: UIPoker, event: cc.Event.EventTouch){
        if(!this.m_isTouchStart) {
            return;
        }
        this.m_isTouchStart = false;
        this.StopScheduler("JU_TOUCH_TIME");
        if(this.m_isDragStart) {
            this.m_isDragStart = false;
            this.m_MoveCount = 0;
            uiPoker.OnDragEnd();
            this.resetZIndex();
            // 拖拽到 Play 区
            let playIndex = this.getPlayIndexByPoker(uiPoker.vm)
            if( playIndex !== -1 ){
                this.m_Ju.OnDragToPlay(uiPoker.vm, playIndex)
                return
            }
    
            // 拖拽到 Receive 区 
            let receiveIndex = this.getReceiveIndexByUIPoker(uiPoker)
            if( receiveIndex !== -1 ){
                this.m_Ju.OnDragToReceive(uiPoker.vm, receiveIndex)
                return
            }
    
            // 无效的拖拽
            this.MovePokerBack(uiPoker.vm)
        }else{
            this.ClickUIPoker(uiPoker);
        }
    }

    private ClickUIPoker(uiPoker: UIPoker) {
        // 点击事件
        const location = uiPoker.vm.location
        switch (location) {
            case ELocation.PLAY:
                if(uiPoker.isOpen()){
                    this.m_Ju.OnPlayPokerClick(uiPoker.vm)
                }
                break;
            case ELocation.CLOSE:
                if(uiPoker.vm.isTop){
                    this.m_Ju.OnClosePokerClick(uiPoker.vm)
                }
                break
            case ELocation.OPEN:
                if(uiPoker.vm.isTop){
                    this.m_Ju.OnOpenPokerClick(uiPoker.vm)
                }
                break
            default:
                console.assert(location === ELocation.RECEIVE)
                this.m_Ju.OnReceivePokerClick(uiPoker.vm)
                break;
        }
    }
    //#endregion
}
