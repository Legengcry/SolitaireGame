/**
 * 呼吸组件：随着时间的推移，放大缩小
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActionBreath extends cc.Component {
    @property private m_MaxScale: number = 1.2
    @property private m_Interval: number = 1.8
    @property private PlayOnStart: boolean = false

    private m_InitScale: number = 1.0
    start() {
        this.m_InitScale = this.node.scale
        if(this.PlayOnStart) {
            this.RunBreathAction()
        }
    }

    private m_IsRunning: boolean = false
    RunBreathAction() {
        if(this.m_IsRunning) {
            return
        }
        this.m_IsRunning = true
        let action = cc.tween()
            .delay(this.m_Interval*0.9)
            .to(this.m_Interval, {scale: this.m_MaxScale*this.m_InitScale}, {easing: cc.easing.sineOut})
            .to(this.m_Interval, {scale: this.m_InitScale}, {easing: cc.easing.sineIn})
        cc.tween(this.node)
            .repeatForever(action)
            .start()
    }
}
