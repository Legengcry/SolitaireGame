import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import { TPokerBackSkin, TPokerBackSkinKind } from "../SolitaireSpriteFrameCfg";
import UIThemeMenuContentPokerBackKindSubItem, { UIThemeMenuContentPokerBackKindSubItemArgs } from "./UIThemeMenuContentPokerBackKindSubItem";

const {ccclass, property} = cc._decorator;

export type UIThemeMenuContentPokerBackKindItemArgs = { kind: TPokerBackSkinKind, onClick: (skin: TPokerBackSkin, item: UIThemeMenuContentPokerBackKindSubItem)=>void }
@ccclass
export default class UIThemeMenuContentPokerBackKindItem extends ii.UIComp<UIThemeMenuContentPokerBackKindItemArgs> {
    @property(cc.Label) private titleLabel: cc.Label = null 
    @property(cc.Node) private layout: cc.Node = null 

    private m_itemArray: UIThemeMenuContentPokerBackKindSubItem[] = []

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIThemeMenuContentPokerBackKindItemArgs): void {        
        this.titleLabel.string = this.args.kind.kind;

        for(let index=0; index<this.args.kind.count; ++index) {
            this.m_itemArray.push(ii.UIMgr.ins.Create<UIThemeMenuContentPokerBackKindSubItem, UIThemeMenuContentPokerBackKindSubItemArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBackKindSubItem.key, {
                backSkin: {
                    kind: this.args.kind.kind,
                    index: index,
                },
                onClick: this.args.onClick
            }, this.layout).CloseBy(this));
        }
    }

    Select(selectedSkin: TPokerBackSkin) {
        this.m_itemArray.forEach(it=>it.Select(selectedSkin));
    }
}
