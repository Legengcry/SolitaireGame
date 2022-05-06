import { SolitaireSpriteFrameCfg } from "../SolitaireSpriteFrameCfg";

const {ccclass, property} = cc._decorator;

export type UIThemeMenuContentBoardsPatternItemArgs = {
    bgPatternSkin: number,
    OnSelect: (bgPatternSkin: number)=>void
}

@ccclass
export default class UIThemeMenuContentBoardsPatternItem extends ii.UIComp<UIThemeMenuContentBoardsPatternItemArgs> {
    @property(cc.Sprite) protected bgSprite: cc.Sprite = null
    @property(cc.Node) protected highLightNode: cc.Node = null

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIThemeMenuContentBoardsPatternItemArgs): void {
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        this.highLightNode.active = false;
        if(this.args.bgPatternSkin >= 0) {
            this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.bgPatternSkinUrl(this.args.bgPatternSkin), sp=>this.bgSprite.spriteFrame = this.SetAssetProperty("BG_PATTERN_SKIN", sp), false)
        }
    }

    private OnItemClick() {
        this.args.OnSelect(this.args.bgPatternSkin);
    }


    Select(bgPatternSkin: number) {
        this.highLightNode.active = this.args.bgPatternSkin == bgPatternSkin;
    }
}
