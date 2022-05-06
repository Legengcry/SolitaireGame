import Poker from "../Model/Poker";
import UIPoker from "./UIPoker";
import { ETOperationHint, OperationHint } from "../SolitaireType";
import UIHintMgr from "./UIHintMgr";
import SolitaireGameDesktopUI from "./SolitaireGameDesktopUI";
import { SolitaireJu } from "../Model/SolitaireJu";
import { SolitaireAudioCfg } from "../../SolitaireAudioCfg";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";


export type UIHintArgs = {
    hint: OperationHint,
    uiMgr: UIHintMgr,
    desktop: SolitaireGameDesktopUI,
    ju: SolitaireJu
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIHint extends ii.UIComp<UIHintArgs> {
    @property(cc.Node) private mui_PokerRoot: cc.Node = null 
    @property(cc.Node) private mui_HighLight: cc.Node = null 
    get vm(): UIHintArgs { return this.args; }
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIHintArgs): void {
        let hint = this.vm.hint
        switch (hint.type) {
            case ETOperationHint.PLAY_TO_PLAY:
                this.HintPlayToPlay(hint)
                break;
            case ETOperationHint.PLAY_TO_RECEIVE:
                this.HintPlayToReceive(hint)
                break;
            case ETOperationHint.OPEN_TO_RECEIVE:
                this.HintOpenToReceive(hint)
                break;
            case ETOperationHint.OPEN_TO_PLAY:
                this.HintOpenToPlay(hint)
                break;
            case ETOperationHint.CLOSE_TO_OPEN:
                this.HintCloseToOpen(hint)
                break;
            case ETOperationHint.OPEN_TO_CLOSE:
                this.HintOpenToClose(hint)
                break;
            case ETOperationHint.RECEIVE_TO_PLAY:
                this.HintReceiveToPlay(hint)
                break;
            default:
                break;
        }
    }
    
    private __HintCreateUIPoker(p: Poker): UIPoker {
        // 从对象池创建扑克牌 UI，并添加到 moveNode 中
        let poker: Poker = new Poker(p.point, p.suit, p.status)
        return ii.UIMgr.ins.Create<UIPoker, Poker>(SolitairePrefabCfg.pfb.comp.UIPoker.key, poker).Init(p.view.faceSkin, p.view.backSkin, p.view.frontSkin);
    }
    private __HintFreeUIPoker(uiPokerList: UIPoker[]){
        // 对象池回收扑克牌
        for(let i=uiPokerList.length-1; i>=0; --i){
            uiPokerList[i].Close()
        }
    }
    private __HintPrepareFromPlay(fromPlayIndex: number): UIPoker[] {
        let _fromPlayGroup = this.vm.ju.getPlayGroup(fromPlayIndex)
        let _fromPlayGroupRootOpenPoker = _fromPlayGroup.rootOpenPoker
        let startPositionInWorld: cc.Vec3 = _fromPlayGroupRootOpenPoker.view.node.convertToWorldSpaceAR(cc.Vec3.ZERO)
        this.setWorldPosition(startPositionInWorld)
        let uiPokerList = []
        // 添加纸牌到 moveNode 下
        let _openPokers = _fromPlayGroup.GetOpenPokers()
        _openPokers.forEach((p, index) => {
            // 从对象池创建扑克牌 UI，并添加到 moveNode 中
            let uiPoker = this.__HintCreateUIPoker(p)
            let y = -index * SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y
            uiPoker.node.position = cc.v3(0, y, 0)
            this.AddUIPoker(uiPoker)
            uiPokerList.push(uiPoker)
        })
        this.setHighLightHeightEx(SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y*(_openPokers.length-1))

        return uiPokerList
    }
    private __HintPrepareFromReceive(fromReceiveIndex: number): UIPoker[] {
        let startPositionInWorld: cc.Vec3 = this.vm.desktop.ReceiveAreaList[fromReceiveIndex].convertToWorldSpaceAR(cc.Vec3.ZERO)
        this.setWorldPosition(startPositionInWorld)

        let _fromReceiveGroup = this.vm.ju.getReceiveGroup(fromReceiveIndex)
        let uiPokerList = []
        let uiPoker = this.__HintCreateUIPoker(_fromReceiveGroup.top)
        uiPoker.node.position = cc.Vec3.ZERO
        this.node.addChild(uiPoker.node)
        uiPokerList.push(uiPoker)
        this.setHighLightHeightEx(0)
        return uiPokerList
    }
    private __HintPrepareFromOpen(): UIPoker[] {
        let startPositionInWorld: cc.Vec3 = this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.Vec3.ZERO)
        this.setWorldPosition(startPositionInWorld)

        let uiPoker = this.__HintCreateUIPoker(this.vm.ju.getOpenGroupPoker(-1))
        uiPoker.node.position = cc.v3(0, 0, 0)
        this.AddUIPoker(uiPoker)

        let uiPokerList = []
        uiPokerList.push(uiPoker)

        this.setHighLightHeightEx(0)

        return uiPokerList
    }
    private __HintPrepareFromClose(): UIPoker[] {
        let startPositionInWorld: cc.Vec3 = this.vm.desktop.CloseArea.convertToWorldSpaceAR(cc.Vec3.ZERO)
        this.setWorldPosition(startPositionInWorld)

        let uiPoker = this.__HintCreateUIPoker(this.vm.ju.getCloseGroupPoker(-1))
        uiPoker.node.position = cc.v3(0, 0, 0)
        this.AddUIPoker(uiPoker)

        let uiPokerList = []
        uiPokerList.push(uiPoker)
        this.setHighLightHeightEx(0)
        return uiPokerList
    }
    private __HintCalculateTargetPositionInWorldSpaceAROfToPlay(toPlayIndex: number): cc.Vec3 {
        let targetPositionInWorld: cc.Vec3 = null
        let _toPlayGroup = this.vm.ju.getPlayGroup(toPlayIndex)
        if(_toPlayGroup.IsPokersEmpty()){
            targetPositionInWorld = this.vm.desktop.PlayAreaList[toPlayIndex].convertToWorldSpaceAR(cc.Vec3.ZERO)
        }else{
            let _toPlayGroupTopPoker = _toPlayGroup.top
            targetPositionInWorld = _toPlayGroupTopPoker.view.node.convertToWorldSpaceAR(cc.v3(0, -SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y, 0))
        }
        return targetPositionInWorld
    }
    private __HintCalculateTargetPositionInWorldSpaceAROfToReceive(toReceiveIndex: number): cc.Vec3 {
        return this.vm.desktop.ReceiveAreaList[toReceiveIndex].convertToWorldSpaceAR(cc.Vec3.ZERO)
    }
    private __HintCalculateTargetPositionInWorldSpaceAROfToOpen(): cc.Vec3 {
        let openGroup = this.vm.ju.OpenAreaGroup;
        if(openGroup.pokers.length > 1) {
            return this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.v3(this.vm.desktop.PADDING_PLAY, 0, 0))
        }else if(openGroup.pokers.length == 1) {
            return this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.v3(this.vm.desktop.PADDING_PLAY/2.0, 0, 0))
        }else{
            return this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.Vec3.ZERO)
        }
    }
    private __HintActioin(targetPosInWorldSpace: cc.Vec3, uiPokerList: UIPoker[]){
        let targetPos = this.node.parent.convertToNodeSpaceAR(targetPosInWorldSpace)
        let duration = this.vm.desktop.__timeOfDistance(this.node.position, targetPos)
        this.RunHintAction(duration, targetPos, () => {
            this.__HintFreeUIPoker(uiPokerList)
            this.Close()
        })
    }
    private HintPlayToPlay(hint: OperationHint) {
        let uiPokerList = this.__HintPrepareFromPlay(hint.from)
        let targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToPlay(hint.to)
        this.__HintActioin(targetPosInWorldSpace, uiPokerList)
    }
    private HintPlayToReceive(hint: OperationHint) {
        let uiPokerList = this.__HintPrepareFromPlay(hint.from)
        let targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToReceive(hint.to)
        this.__HintActioin(targetPosInWorldSpace, uiPokerList)
    }
    private HintOpenToReceive(hint: OperationHint) {
        let uiPokerList = this.__HintPrepareFromOpen()
        let targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToReceive(hint.to)
        this.__HintActioin(targetPosInWorldSpace, uiPokerList)
    }
    private HintOpenToPlay(hint: OperationHint) {
        let uiPokerList = this.__HintPrepareFromOpen()
        let targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToPlay(hint.to)
        this.__HintActioin(targetPosInWorldSpace, uiPokerList)
    }
    private HintCloseToOpen(hint: OperationHint) {
        let uiPokerList = this.__HintPrepareFromClose()
        let targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToOpen()
        this.__HintActioin(targetPosInWorldSpace, uiPokerList)
    }
    private HintOpenToClose(hint: OperationHint) {
        let TIME = 0.2
        cc.tween(this.vm.desktop.CloseAreaBackground)
            .to(TIME, {scale: 1.2})
            .to(TIME*2, {scale: 0.9})
            .to(TIME*2, {scale: 1.2})
            .to(TIME, {scale: 1})
            .start()
    }
    private HintReceiveToPlay(hint: OperationHint) {
        let uiPokerList = this.__HintPrepareFromReceive(hint.from)
        let targetPos = this.__HintCalculateTargetPositionInWorldSpaceAROfToPlay(hint.to)
        this.__HintActioin(targetPos, uiPokerList)
    }

    setWorldPosition(wp: cc.Vec3) {
        this.node.setPosition( this.node.parent.convertToNodeSpaceAR(wp) )
    }
    private AddUIPoker(uiPoker: UIPoker) {
        this.mui_PokerRoot.addChild(uiPoker.node)
    }
    setHighLightHeightEx(height: number) {
        this.mui_HighLight.height = 128 + height
    }

    RunHintAction(duration: number, targetPos: cc.Vec3, RecycleCallback: Function) {
        this.mui_HighLight.opacity = 0 
        let fadeInDuratioin = 0.4
        let fadeOutDuratioin = 0.8
        cc.tween(this.mui_HighLight)
            .to(fadeInDuratioin, {opacity: 255})
            .start()
        cc.tween(this.node)
            .delay(fadeInDuratioin)
            .to(duration, {position: targetPos})
            .call(()=>{
                ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move);
                cc.tween(this.mui_HighLight)
                    .to(fadeOutDuratioin, {opacity: 0})
                    .start()
            })
            .delay(fadeOutDuratioin)
            .call(()=>{
                RecycleCallback()

            })
            .start()
    }
}
