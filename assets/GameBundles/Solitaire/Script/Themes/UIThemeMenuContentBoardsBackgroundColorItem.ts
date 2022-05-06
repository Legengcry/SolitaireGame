import { SolitaireSpriteFrameCfg } from "../SolitaireSpriteFrameCfg";

const {ccclass, property} = cc._decorator;

export type UIThemeMenuContentBoardsBackgroundColorItemArgs = {
    bgSkin: number,
    OnSelect: (bgSkin: number)=>void
}

@ccclass
export default class UIThemeMenuContentBoardsBackgroundColorItem extends ii.UIComp<UIThemeMenuContentBoardsBackgroundColorItemArgs> {
    @property(cc.Sprite) protected bgSprite: cc.Sprite = null
    @property(cc.Node) protected highLightNode: cc.Node = null
    
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIThemeMenuContentBoardsBackgroundColorItemArgs): void {
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        this.highLightNode.active = false;
        this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.bgSkinUrl(this.args.bgSkin), sp=>this.bgSprite.spriteFrame = this.SetAssetProperty("BG_SKIN", sp), false)
    }

    private OnItemClick() {
        this.args.OnSelect(this.args.bgSkin);
    }

    Select(bgSkin: number) {
        this.highLightNode.active = this.args.bgSkin == bgSkin;
    }
}
