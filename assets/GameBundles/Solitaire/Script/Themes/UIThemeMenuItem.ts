const {ccclass, property} = cc._decorator;

@ccclass
export default class UIThemeMenuItem extends cc.Component {
    @property(cc.Sprite) private sprite: cc.Sprite = null 
    @property(cc.Sprite) private dotSprite: cc.Sprite = null 
    @property(cc.SpriteFrame) private normalSpriteFrame: cc.SpriteFrame = null 
    @property(cc.SpriteFrame) private selectedSpriteFrame: cc.SpriteFrame = null 
    @property private index: number = 0 

    private _selected: boolean = false
    private _onClickCallback: (index: number)=>void

    Init(selectedIndex: number, onClickCallback: (index: number)=>void) {
        this.OnSelect(selectedIndex)
        this._onClickCallback = onClickCallback
    }

    @ii.Util.block(0.2)
    private OnClick(sender) {
        if(this._selected){
            return
        }
        
        ii.AudioMgr.ins.PlayEffect()
        if(this._onClickCallback){
            this._onClickCallback(this.index)
        }
    }

    OnSelect(selectedIndex: number) {
        let selected = this.index == selectedIndex
        if(this._selected == selected){
            return
        }
        this._selected = selected
        this.sprite.spriteFrame = this._selected ? this.selectedSpriteFrame : this.normalSpriteFrame
    }

    ShowDot(isShow: boolean) { this.dotSprite.node.active = isShow }
}
