import UIThemeMenuContentPokerFaceItem, { UIThemeMenuContentPokerFaceItemArgs } from "./UIThemeMenuContentPokerFaceItem";
import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitaireAutoAtlasCfg } from "../SolitaireAutoAtlasCfg";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import UIThemeMenuContent from "./UIThemeMenuContent";

const {ccclass, property} = cc._decorator;

export type UIThemeMenuContentPokerFaceArgs = {
    faceSkin: number,
    OnSelect: (content: UIThemeMenuContentPokerFace, faceSkin: number)=>void
}

@ccclass
export default class UIThemeMenuContentPokerFace extends UIThemeMenuContent<UIThemeMenuContentPokerFaceArgs> {
    @property(cc.ScrollView) private scrollView: cc.ScrollView = null
    
    private m_itemArray: UIThemeMenuContentPokerFaceItem[] = []
    
    protected OnCreate(): void {
    }
    protected OnRelease(): void {
        // this.ReleaseContent()
    }
    protected OnOpen(uiArgs: UIThemeMenuContentPokerFaceArgs): void {
        for(let i=0; i<SolitaireAutoAtlasCfg.FaceSkinCnt; ++i) {
            this.m_itemArray.push(ii.UIMgr.ins.Create<UIThemeMenuContentPokerFaceItem, UIThemeMenuContentPokerFaceItemArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerFaceItem.key, {
                faceSkin: i,
                OnSelect: (faceSkin: number)=> { this.args.OnSelect(this, faceSkin); }
            }, this.scrollView.content).CloseBy(this));
        }

        this.Select(this.args.faceSkin)
    }

    Select(faceSkin: number) {
        ii.AudioMgr.ins.PlayEffect();
        this.m_itemArray.forEach(it => it.Select(faceSkin))
    }

    OnResetSkin(skin: SolitaireSkin) {
        this.Select(skin.faceSkin);
    }
}
