import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import { SolitaireSpriteFrameCfg, TPokerBackSkin } from "../SolitaireSpriteFrameCfg";
import UIThemeMenuContent from "./UIThemeMenuContent";
import UIThemeMenuContentPokerBackKindItem, { UIThemeMenuContentPokerBackKindItemArgs } from "./UIThemeMenuContentPokerBackKindItem";
import UIThemeMenuContentPokerBackKindSubItem from "./UIThemeMenuContentPokerBackKindSubItem";

const {ccclass, property} = cc._decorator;

export type UIThemeMenuContentPokerBackArgs = {
    backSkin: TPokerBackSkin,
    OnSelect(content: UIThemeMenuContentPokerBack, backSkin: TPokerBackSkin)
}

@ccclass
export default class UIThemeMenuContentPokerBack extends UIThemeMenuContent<UIThemeMenuContentPokerBackArgs> {
    @property(cc.ScrollView) private scrollView: cc.ScrollView = null
    
    private m_itemArray: UIThemeMenuContentPokerBackKindItem[] = []
    
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIThemeMenuContentPokerBackArgs): void {
        let onClick = this.OnItemClick.bind(this);
        SolitaireSpriteFrameCfg.pokerBackKindCfg.forEach( kind => {
            this.m_itemArray.push(ii.UIMgr.ins.Create<UIThemeMenuContentPokerBackKindItem, UIThemeMenuContentPokerBackKindItemArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBackKindItem.key, {
                kind,
                onClick
            }, this.scrollView.content).CloseBy(this));
        })
        this.Select(this.args.backSkin);
    }
    private OnItemClick(backSkin: TPokerBackSkin, item: UIThemeMenuContentPokerBackKindSubItem) {
        this.args.OnSelect(this, backSkin);
    }

    Select(backSkin: TPokerBackSkin) {
        ii.AudioMgr.ins.PlayEffect();
        this.m_itemArray.forEach(it => it.Select(backSkin))
    }

    OnResetSkin(skin: SolitaireSkin) { this.Select(skin.backSkin); }
}
