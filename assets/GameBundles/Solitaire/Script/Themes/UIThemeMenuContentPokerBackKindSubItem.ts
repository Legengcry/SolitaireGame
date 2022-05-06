import { SolitaireSpriteFrameCfg, TPokerBackSkin } from "../SolitaireSpriteFrameCfg";

const {ccclass, property} = cc._decorator;
export type UIThemeMenuContentPokerBackKindSubItemArgs = {
    backSkin: TPokerBackSkin
    onClick: (kind: TPokerBackSkin, item: UIThemeMenuContentPokerBackKindSubItem) => void
};
@ccclass
export default class UIThemeMenuContentPokerBackKindSubItem extends ii.UIComp<UIThemeMenuContentPokerBackKindSubItemArgs> {
    @property(cc.Sprite) protected bgSprite: cc.Sprite = null
    @property(cc.Node) protected highLightNode: cc.Node = null
    @property(cc.Node) protected lockAvailableNode: cc.Node = null
    @property(cc.Node) protected lockLockedNode: cc.Node = null
    @property(cc.Sprite) protected mui_DotSprite: cc.Sprite = null

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIThemeMenuContentPokerBackKindSubItemArgs): void {
        this.lockAvailableNode.active = false;
        this.lockLockedNode.active = false;
        this.mui_DotSprite.node.active = false;
        this.highLightNode.active = false;
        this.SetIIClickHandler("OnClick", this.OnClick.bind(this));
        this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.pokerBackUrl(this.args.backSkin), sp=>this.bgSprite.spriteFrame = this.SetAssetProperty("BACK_SKIN", sp), false);
    }

    @ii.Util.block(0.5)
    private OnClick() {
        this.args.onClick(this.args.backSkin, this);
    }

    Select(selectedSkin: TPokerBackSkin) {
        this.highLightNode.active = this.args.backSkin.kind == selectedSkin.kind && this.args.backSkin.index == selectedSkin.index;
    }
}