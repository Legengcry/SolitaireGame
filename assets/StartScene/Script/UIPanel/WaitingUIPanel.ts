//加载页面UI
const {ccclass, property} = cc._decorator;

@ccclass
export default class WaitingUIPanel extends ii.BaseWaitingUIPanel {
    @property({type: cc.Node, visible: true}) private _activeNode: cc.Node = null;
    protected OnActiveChanged(active: boolean): void { this._activeNode.active = active; }
}
