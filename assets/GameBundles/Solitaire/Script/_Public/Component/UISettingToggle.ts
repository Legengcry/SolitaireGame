const {ccclass, property} = cc._decorator;

@ccclass
export default class UISettingToggle extends cc.Component {
    @property(cc.Sprite) onSprite: cc.Sprite = null 
    @property(cc.Sprite) offSprite: cc.Sprite = null 
    @property(cc.Sprite) toggleSprite: cc.Sprite = null 

    private m_onToggleCallback: (isOn: boolean) => void = null 
    private m_isOn: boolean = false
    private m_IsBlockInput: boolean = false

    Init (isOn: boolean, onToggleCallback: (isOn: boolean) => void) {
        this.m_isOn = isOn
        this.m_onToggleCallback = onToggleCallback
        this.toggleSprite.node.position = this.getTogglePositionByStatus(!this.m_isOn)
        this.toggleAction(this.m_isOn)
    }
    private getTogglePositionByStatus(isOn: boolean) {
        return isOn ? cc.v3(20, this.toggleSprite.node.y, 0) : cc.v3(-24, this.toggleSprite.node.y, 0)
    }
    private toggleAction(isOn: boolean) {
        let togglePosition = this.getTogglePositionByStatus(isOn)
        cc.tween(this.toggleSprite.node)
            .to(0.2, { position: togglePosition })
            .start()
        
        this.__StopScheduler()

        let targetRange = isOn ? 1 : 0
        let sr = isOn ? 0 : 1
        let dr = (targetRange-sr)/(60*0.2)
        this.m_Scheduler = ()=> {
            this.onSprite.getComponent(cc.Sprite).fillRange = sr
            sr += dr
            if(sr > 1 || sr < 0) {
                this.__StopScheduler()
            }
        }
        this.schedule(this.m_Scheduler)
    }

    private m_Scheduler: Function = null 
    private __StopScheduler() {
        if(this.m_Scheduler){
            this.unschedule(this.m_Scheduler)
            this.m_Scheduler = null
        }
    }

    @ii.Util.block(0.2)
    private OnClick() {
        if(this.m_IsBlockInput) { return; }
        ii.AudioMgr.ins.PlayEffect();
        this.m_isOn = !this.m_isOn
        this.toggleAction(this.m_isOn)
        if(this.m_onToggleCallback) {
            this.m_onToggleCallback(this.m_isOn)
        }
    }

    SetBlockInput(block: boolean) {
        this.m_IsBlockInput = block;
    }

    SyncUI(isOn: boolean) {
        if(isOn == this.m_isOn) {
            return;
        }
        this.m_isOn = isOn
        this.toggleSprite.node.position = this.getTogglePositionByStatus(!this.m_isOn);
        this.toggleAction(isOn);
    }
}
