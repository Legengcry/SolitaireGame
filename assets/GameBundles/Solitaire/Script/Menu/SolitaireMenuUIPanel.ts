import { SolitaireGameUIPanelArgs } from "../Game/View/SolitaireGameUIPanel";
import { SolitaireLogic } from "../Logic/SolitaireLogic";
import { SolitaireAudioCfg } from "../SolitaireAudioCfg";
import { EGameType } from "../SolitaireEnums";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";

const {ccclass, property} = cc._decorator;

@ccclass("MenuResumeItem")
class MenuResumeItem {
    @property({type:cc.Enum(EGameType),visible:true}) private _difficulty: EGameType = EGameType.EASY;
    @property({type:cc.Node,visible:true}) private resumeNode: cc.Node = null; // 继续上次游戏的节点
    @property({type:cc.Label,visible:true}) private _scoreLabel: cc.Label = null; // 分数
    get ResumeNode(): cc.Node { return this.resumeNode; }
    get ScoreLabel(): cc.Label { return this._scoreLabel; }
    get Difficulty(): EGameType { return this._difficulty; }
}

@ccclass
export default class SolitaireMenuUIPanel extends ii.UIPanel {
    @property({type:cc.Node,visible:true}) private _playActionNode: cc.Node = null; // 右侧难度列表动作节点
    @property({type:cc.Node,visible:true}) private _toggleActionNode: cc.Node = null; // 左下角开关动作节点
    @property({type:MenuResumeItem,visible:true}) private _resumeNodeList: MenuResumeItem[] = [];

    protected OnCreate(): void {
        //! 1. 入场动画 >> 记录初始位置，方便做入场动作
        this.SetUserData("K_POS_PLAY", this._playActionNode.position);
        this.SetUserData("K_POS_TOGGLE", this._toggleActionNode.position);
    }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: any): void {
        this.SetIIClickHandler("OnPlayEasy", this.OnPlay.bind(this, EGameType.EASY), true)
        this.SetIIClickHandler("OnPlayHard", this.OnPlay.bind(this, EGameType.HARD), true)
        this.SetIIClickHandler("OnOptions", this.OnOptions.bind(this))

        //! 入场动画
        this.RunSwitchPlayUIAction(true, 0.4);
    }
    // 二级菜单切换动画
    private RunSwitchPlayUIAction(isEnter: boolean, duration: number, callback?: Function) {
        if (isEnter) {
            ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg.effect.move);
        }
        ii.UIUtil.moveAction(this._playActionNode, isEnter, this.GetUserData<cc.Vec3>("K_POS_PLAY"), duration);
        ii.UIUtil.moveAction(this._toggleActionNode, isEnter, this.GetUserData<cc.Vec3>("K_POS_TOGGLE"), duration, callback);
    }

    // 刷新上一次游戏类型标签
    private UpdateResumeStatus() {
        let vegasMode = SolitaireLogic.dataCache.vegasModeBV.v;
        let cards3Mode = SolitaireLogic.dataCache.cards3ModeBV.v;
        this._resumeNodeList.forEach(it=>{
            let hasSnapData: boolean = SolitaireLogic.dataCache.HasSnapData(vegasMode, cards3Mode, it.Difficulty);
            it.ResumeNode.active = hasSnapData;
            if(hasSnapData) {
                let snapData = SolitaireLogic.dataCache.ReadSnapData(vegasMode, cards3Mode, it.Difficulty)
                if(snapData != null){
                    it.ScoreLabel.string = `${snapData.score}`
                }
            }
        });
    }

    //#region //! 按钮相关事件
    private OnPlay(gameType: EGameType) {
        this.PreLoadSkinRes(()=>{
            ii.UIMgr.ins.Open<SolitaireGameUIPanelArgs>(SolitairePrefabCfg.pfb.panel.SolitaireGameUIPanel.key, {
                gameType: gameType,
                resume: false,
                vegas: SolitaireLogic.dataCache.vegasModeBV.v,
                card3: SolitaireLogic.dataCache.cards3ModeBV.v,
            }, ()=>this.Close())
        })
    }
    private OnOptions() {
        ii.UIMgr.ins.Open(SolitairePrefabCfg.pfb.panel.SolitaireOptionsUIPanel.key);
    }
    //#endregion

    // 预加载皮肤资源（可能因为选择皮肤，导致界面变化？）
    private PreLoadSkinRes(onCompleted: Function) {
        if(SolitaireLogic.skin.IsInitSkinChanged()) {
            this.LoadResList([
                ...SolitaireLogic.skin.GetPreloadResList()
            ], onCompleted)
        }else{
            onCompleted();
        }
    }
}
