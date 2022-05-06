const { ccclass, property } = cc._decorator;

@ccclass
export class DialogUIPanel extends ii.UIPanel<ii.DialogUIPanelArgs> {
    @property({type: cc.Label}) titleLabel: cc.Label = null!;
    @property({type: cc.Label}) msgLabel: cc.Label = null!;
    @property({ type: [cc.Button] }) buttonList: cc.Button[] = [];
    @property({ type: [cc.Label] }) labelList: cc.Label[] = [];

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: ii.DialogUIPanelArgs): void {
        // 标题
        this.titleLabel.string = ii.LangUtil.Get(this.args.title);

        // 内容
        this.msgLabel.string = ii.LangUtil.Get(this.args.msg);

        // 按钮
        for(let i=0; i<3; ++i) {
            this.buttonList[i].node.active = i < this.args.btnCount;
        }
        this.labelList[0].string = ii.LangUtil.Get(this.args.label0);
        this.labelList[1].string = ii.LangUtil.Get(this.args.label1);
        this.labelList[2].string = ii.LangUtil.Get(this.args.label2);
    }

    OnUIButtonClick(evt: cc.Event.EventTouch, btnIndex: any) {
        if(btnIndex == 0) {
            this.args.btnFunc0?.call(null);
        }else if(btnIndex == 1){
            this.args.btnFunc1?.call(null);
        }else{
            console.assert(btnIndex == 2)
            this.args.btnFunc2?.call(null);
        }
        this.Close();
    }
}
