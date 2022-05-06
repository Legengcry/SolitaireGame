
export enum UIActionType {
    POSITION = 0,
    SCALE_OUT
}

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class SolitaireActionUIPanel<ARGS=any> extends ii.UIPanel<ARGS> {
    @property(cc.Node) private m_Background: cc.Node = null;
    @property(cc.Node) private m_ActionNode: cc.Node = null;

    protected GetBackground(): cc.Node { return this.m_Background; }
    protected GetActionNode(): cc.Node { return this.m_ActionNode; }

    protected EnterActionType(): UIActionType { return UIActionType.POSITION; }
    protected EnterActionEasingType(): (t: number) => number { return cc.easing.backOut }
    protected EnterSpeedFactor(): number { return 1; }
    protected EnterBackgroundSeconds(): number { return 0.6 * this.EnterSpeedFactor(); }
    protected EnterSeconds(): number { return 0.4 * this.EnterSpeedFactor(); }
    protected EnterDelaySeconds(): number { return 0.3 * this.EnterSpeedFactor(); }
    protected get EnterActionSeconds(): number { return this.EnterSeconds() + this.EnterDelaySeconds(); }

    private m_OriginActionNodePosition: cc.Vec3 = null;
    private m_OriginActionNodeOpacity: number = 0;
    private m_OriginActionNodeScale: number = 1;
    private m_OriginBackgroundOpacity: number = null;

    protected OnCreate(): void {
        switch (this.EnterActionType()) {
            case UIActionType.SCALE_OUT:
                this.m_OriginActionNodeScale = this.GetActionNode().scale;
                this.m_OriginActionNodeOpacity = this.GetActionNode().opacity;
                break;
            default:
                this.m_OriginActionNodePosition = this.GetActionNode().position;
                break;
        }
        this.m_OriginBackgroundOpacity = this.GetBackground().opacity;
        this.GetBackground().opacity = 0;
    }
    protected OnOpen(userData: any): void {
        ii.UIUtil.showAction(this.GetBackground(), this.EnterBackgroundSeconds(), { opacity: this.m_OriginBackgroundOpacity })
        switch (this.EnterActionType()) {
            case UIActionType.SCALE_OUT:
                this.GetActionNode().active = true;
                this.GetActionNode().scale = 1;
                this.GetActionNode().opacity = 0;
                cc.tween(this.GetActionNode()).delay(this.EnterDelaySeconds()).set({opacity: this.m_OriginActionNodeOpacity}).to(this.EnterSeconds(), {opacity: 255}).start()
                break;
            default:
                this.GetActionNode().position = this.m_OriginActionNodePosition;
                ii.UIUtil.moveAction(this.GetActionNode(), true, this.m_OriginActionNodePosition, this.EnterSeconds(), ()=>this.OnEnter(), this.EnterDelaySeconds(), this.EnterActionEasingType())
                break;
        }
    }
    protected OnRelease(): void { }
    protected ExitWithAction(cb: Function, isOpposite: boolean = false) {
        const C_OUT_ACTION_TIME: number = 0.3;
        const C_ACTION_TIME_DELAY_FADEOUT = 0.4;
        switch (this.EnterActionType()) {
            case UIActionType.SCALE_OUT:
                cc.tween(this.GetActionNode())
                    .to(C_OUT_ACTION_TIME, {scale: this.m_OriginActionNodeScale, opacity: this.m_OriginActionNodeOpacity}, {easing: cc.easing.backIn})
                    .set({active: false})
                    .start()
                break;
            default:
                let targetPosition = isOpposite ? cc.v3(-this.m_OriginActionNodePosition.x, -this.m_OriginActionNodePosition.y, 0) : this.m_OriginActionNodePosition;
                ii.UIUtil.moveAction(this.GetActionNode(), false, targetPosition, C_OUT_ACTION_TIME)
                break;
        }
        ii.UIUtil.hideAction(this.GetBackground(), C_OUT_ACTION_TIME, { opacity: 0 }, ()=>{
            this.Close()
            if(cb) { cb() }
        }, C_ACTION_TIME_DELAY_FADEOUT)
    }
    protected OnEnter() { }
}
