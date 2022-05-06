import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import { SolitaireSpriteFrameCfg } from "../SolitaireSpriteFrameCfg";
import UIThemeMenuContent from "./UIThemeMenuContent";
import UIThemeMenuContentBoardsBackgroundColorItem, { UIThemeMenuContentBoardsBackgroundColorItemArgs } from "./UIThemeMenuContentBoardsBackgroundColorItem";
import UIThemeMenuContentBoardsPatternItem, { UIThemeMenuContentBoardsPatternItemArgs } from "./UIThemeMenuContentBoardsPatternItem";

const {ccclass, property} = cc._decorator;
export type UIThemeMenuContentBoardsArgs = {
    bgSkin: number,
    bgPatternSkin: number,
    OnSelectBG: (content: UIThemeMenuContentBoards, bgSkin: number)=>void,
    OnSelectBGPattern: (content: UIThemeMenuContentBoards, bgPatternSkin: number)=>void,
}
@ccclass
export default class UIThemeMenuContentBoards extends UIThemeMenuContent<UIThemeMenuContentBoardsArgs> {
    @property(cc.ScrollView) private bgSkinScrollView: cc.ScrollView = null    
    @property(cc.ScrollView) private bgPatternSkinScrollView: cc.ScrollView = null

    private m_bgSkinItemArray: UIThemeMenuContentBoardsBackgroundColorItem[] = []
    private m_bgPatternSkinItemArray: UIThemeMenuContentBoardsPatternItem[] = []

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIThemeMenuContentBoardsArgs): void {
        for(let bgSkin=0; bgSkin<SolitaireSpriteFrameCfg.bgSkinLength; ++bgSkin) {
            this.m_bgSkinItemArray.push(ii.UIMgr.ins.Create<UIThemeMenuContentBoardsBackgroundColorItem, UIThemeMenuContentBoardsBackgroundColorItemArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoardsBackgroundColorItem.key, {
                bgSkin: bgSkin,
                OnSelect: (bgSkin: number)=>this.args.OnSelectBG(this, bgSkin)
            }, this.bgSkinScrollView.content).CloseBy(this));
        }
        this.SelectBG(this.args.bgSkin);

        for(let bgPatternSkin=-1; bgPatternSkin<SolitaireSpriteFrameCfg.bgPatternSkinLength; ++bgPatternSkin) {
            this.m_bgPatternSkinItemArray.push(ii.UIMgr.ins.Create<UIThemeMenuContentBoardsPatternItem, UIThemeMenuContentBoardsPatternItemArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoardsPatternItem.key, {
                bgPatternSkin: bgPatternSkin,
                OnSelect: (bgPatternSkin: number)=>this.args.OnSelectBGPattern(this, bgPatternSkin)
            }, this.bgPatternSkinScrollView.content).CloseBy(this));
        }
        this.SelectBG(this.args.bgSkin);
        this.SelectBGPattern(this.args.bgPatternSkin);
    }

    SelectBG(bgSkin: number) {
        this.m_bgSkinItemArray.forEach(it => it.Select(bgSkin))
    }

    OnResetSkin(skin: SolitaireSkin) {
        this.SelectBG(skin.bgSkin);
        this.SelectBGPattern(skin.bgPatternSkin);
    }

    SelectBGPattern(bgPatternSkin: number) {
        this.m_bgPatternSkinItemArray.forEach(it => it.Select(bgPatternSkin))
    }
}
