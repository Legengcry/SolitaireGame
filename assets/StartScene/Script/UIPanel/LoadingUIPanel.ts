
const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingUIPanel extends ii.BaseLoadingUIPanel {
    @property({type: cc.Node, visible: true}) private _blockInputNode: cc.Node = null;
    @property({type: cc.Node, visible: true}) private _fadeNode: cc.Node = null;
    @property({type: cc.Sprite, tooltip: "进度圆圈"}) private m_LoadingProgressCircleSprite: cc.Sprite = null;
    @property({type: cc.Label, tooltip: "引用计数"}) private m_LoadingRefLabel: cc.Label = null;

    protected OnCreate(): void {
        super.OnCreate();
        this._fadeNode.active = false;
        this.m_LoadingProgressCircleSprite.fillRange = 0;
    }
    protected OnActiveChanged(active: boolean): void {
        this._blockInputNode.active = active;
        this._fadeNode.active = active;
        if(active) {
            this.m_LoadingProgressCircleSprite.fillRange = 0;
        }
    }
    protected OnLoading(finishCount: number, totalCount: number): void {
        let _percent = finishCount*100/totalCount;
        this.m_LoadingRefLabel.string = `${Math.ceil(_percent)}%`;
        this.m_LoadingProgressCircleSprite.fillRange = _percent*0.01;
    }
}
