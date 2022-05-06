
const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockInputUIPanel extends ii.BaseBlockInputUIPanel {
    @property({type: cc.Node, visible: true}) private _activeNode: cc.Node = null;
    protected OnActiveChanged(active: boolean): void { this._activeNode.active = active; }
}
