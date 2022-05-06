const {ccclass, property} = cc._decorator;

@ccclass
export default class UIStatisticsCircleProgress extends cc.Component {
    @property(cc.Label) progressLabel: cc.Label = null 
    @property(cc.Label) countLabel: cc.Label = null 
    @property(cc.Sprite) progressSprite: cc.Sprite = null 

    Init(count: number, total: number) {
        let percent = total == 0 ? 0 : Math.floor(count*100/total)

        this.progressLabel.string = `${percent}%`
        this.countLabel.string = `${count}`
        this.progressSprite.fillRange = percent/100.0
    }
}
