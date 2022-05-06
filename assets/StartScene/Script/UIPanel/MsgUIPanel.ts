const { ccclass, property } = cc._decorator;

@ccclass
export class MsgUIPanel extends ii.BaseMsgUIPanel {
    @property({type: cc.Label, visible: true}) _msgLabel: cc.Label = null!;
    @property({type: cc.Node, visible: true}) _actionNode: cc.Node = null!;
    protected get ActionNode(): cc.Node { return this._actionNode; }
    protected get MsgLabel(): cc.Label { return this._msgLabel; }
}
