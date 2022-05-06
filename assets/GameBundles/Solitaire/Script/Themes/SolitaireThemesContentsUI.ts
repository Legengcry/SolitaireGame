import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitaireLogic } from "../Logic/SolitaireLogic";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import { TPokerBackSkin } from "../SolitaireSpriteFrameCfg";
import SolitaireThemesEffectUI, { SolitaireThemesEffectUIArgs } from "./SolitaireThemesEffectUI";
import UIThemeMenuContent from "./UIThemeMenuContent";
import UIThemeMenuContentBoards, { UIThemeMenuContentBoardsArgs } from "./UIThemeMenuContentBoards";
import UIThemeMenuContentPokerBack, { UIThemeMenuContentPokerBackArgs } from "./UIThemeMenuContentPokerBack";
import UIThemeMenuContentPokerFace, { UIThemeMenuContentPokerFaceArgs } from "./UIThemeMenuContentPokerFace";
import UIThemeMenuItem from "./UIThemeMenuItem";

const {ccclass, property} = cc._decorator;
export type SolitaireThemesContentsUIArgs = {
    index: number,
    skin: SolitaireSkin,
    OnBack: ()=>void,
    OnSave: (index: number, skin: SolitaireSkin)=>void
}
@ccclass
export default class SolitaireThemesContentsUI extends ii.UIComp<SolitaireThemesContentsUIArgs> {
    @property({type:cc.Node,visible:true}) private _resetRoot: cc.Node = null;
    @property({type:cc.Node,visible:true}) private _themeEffectRoot: cc.Node = null;
    @property({type:cc.Node,visible:true}) private menuContentRoot: cc.Node = null;
    @property({type:[UIThemeMenuItem],visible:true}) private menuItemList: UIThemeMenuItem[] = []

    private m_EffectUI: SolitaireThemesEffectUI = null;
    private m_menu: Map<number, UIThemeMenuContent<any>> = new Map(); 
    private m_selected: number = -1;
    private m_PreSkin: SolitaireSkin = null;
    private m_Skin: SolitaireSkin = null;
    private m_IsSkinChangedBV: ii.BooleanBV = null;
    protected OnCreate(): void { }
    protected OnRelease(): void {
        this.__ReleaseMenu()
        this.m_selected = -1
    }
    protected OnOpen(uiArgs: SolitaireThemesContentsUIArgs): void {
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnReset", this.OnReset.bind(this));
        this.SetIIClickHandler("OnRand", this.OnRand.bind(this));
        this.m_PreSkin = this.args.skin;
        this.m_Skin = SolitaireLogic.skin.CloneSkin(this.args.skin);
        this.m_IsSkinChangedBV = ii.BooleanBV.Borrow(false).Bind(changed=>this._resetRoot.active=changed, true, this).ReturnBy(this);

        this.m_EffectUI = ii.UIMgr.ins.Create<SolitaireThemesEffectUI, SolitaireThemesEffectUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectUI.key, { skin: this.m_Skin }, this._themeEffectRoot).CloseBy(this);
        this.menuItemList.forEach(menu => menu.Init(this.m_selected, this.OnClickMenu.bind(this)));
        this.Select(0)
    }

    private __ReleaseMenu() {
        this.m_menu.forEach(menu=>menu.Close());
        this.m_menu.clear();
    }

    private Select(selectIndex: number) {
        if(selectIndex >= 0 && this.m_selected != selectIndex){
            this.m_selected = selectIndex;
            this.menuItemList.forEach(menu => menu.OnSelect(selectIndex));
            this.m_menu.forEach(menu=>menu.node.active = false);
            if(this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).node.active = true;
            }else{
                let content: UIThemeMenuContent<any> = null;
                switch (selectIndex) {
                    case 0: content = this.__SelectContentPokerBack(); break;
                    case 1: content = this.__SelectContentPokerFace(); break;
                    case 2: content = this.__SelectContentBoards(); break;
                    default: break;
                }
                this.m_menu.set(selectIndex, content);
            }
        }
    }
    private __SelectContentPokerBack(): UIThemeMenuContent<any> { return ii.UIMgr.ins.Create<UIThemeMenuContentPokerBack, UIThemeMenuContentPokerBackArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBack.key, {
        backSkin: this.m_Skin.backSkin,
        OnSelect: (content: UIThemeMenuContentPokerBack, backSkin: TPokerBackSkin)=>this.OnSelectBackSkin(content, backSkin)
    }, this.menuContentRoot); }
    private __SelectContentPokerFace(): UIThemeMenuContent<any> { return ii.UIMgr.ins.Create<UIThemeMenuContentPokerFace, UIThemeMenuContentPokerFaceArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerFace.key, {
        faceSkin: this.m_Skin.faceSkin,
        OnSelect: (content: UIThemeMenuContentPokerFace, faceSkin: number)=>this.OnSelectFaceSkin(content, faceSkin)
    }, this.menuContentRoot); }
    private __SelectContentBoards(): UIThemeMenuContent<any> { return ii.UIMgr.ins.Create<UIThemeMenuContentBoards, UIThemeMenuContentBoardsArgs>(SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoards.key, {
        bgSkin: this.m_Skin.bgSkin,
        bgPatternSkin: this.m_Skin.bgPatternSkin,
        OnSelectBG: (content: UIThemeMenuContentBoards, bgSkin: number)=>this.OnSelectBGSkin(content, bgSkin),
        OnSelectBGPattern: (content: UIThemeMenuContentBoards, bgPatternSkin: number)=>this.OnSelectBGPatternSkin(content, bgPatternSkin),
    }, this.menuContentRoot); }

    @ii.Util.block(0.2)
    private OnClickMenu(selectIndex: number) {
        ii.AudioMgr.ins.PlayEffect()
        this.Select(selectIndex)
    }

    private OnBack() {
        if(this.m_IsSkinChangedBV.v) {
            this.args.OnSave(this.args.index, this.m_Skin);
        }
        this.args.OnBack();
    }

    private OnReset() {
        this.m_Skin = SolitaireLogic.skin.CloneSkin(this.m_PreSkin);
        this.m_EffectUI.SetSkin(this.m_Skin);
        for(let selectIndex=0; selectIndex<4; ++selectIndex) {
            if(this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).OnResetSkin(this.m_Skin);
            }
        }
    }

    private OnRand() {
        SolitaireLogic.skin.Random(this.m_Skin);
        this.m_EffectUI.SetSkin(this.m_Skin);
        for(let selectIndex=0; selectIndex<4; ++selectIndex) {
            if(this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).OnResetSkin(this.m_Skin);
            }
        }

        this.ReculculateIsChangedValue();
    }

    private OnSelectBackSkin(content: UIThemeMenuContentPokerBack, backSkin: TPokerBackSkin) {
        this.m_Skin.backSkin.kind = backSkin.kind;
        this.m_Skin.backSkin.index = backSkin.index;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.Select(backSkin);

        this.ReculculateIsChangedValue();
    }

    private OnSelectFaceSkin(content: UIThemeMenuContentPokerFace, faceSkin: number) {
        this.m_Skin.faceSkin = faceSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.Select(faceSkin);
        this.ReculculateIsChangedValue();
    }

    private OnSelectBGSkin(content: UIThemeMenuContentBoards, bgSkin: number) {
        this.m_Skin.bgSkin = bgSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.SelectBG(bgSkin);
        this.ReculculateIsChangedValue();
    }

    private OnSelectBGPatternSkin(content: UIThemeMenuContentBoards, bgPatternSkin: number) {
        this.m_Skin.bgPatternSkin = bgPatternSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.SelectBGPattern(bgPatternSkin);
        this.ReculculateIsChangedValue();
    }

    private ReculculateIsChangedValue() { this.m_IsSkinChangedBV.v = SolitaireLogic.skin.IsSkinChanged(this.m_PreSkin, this.m_Skin); }
}
