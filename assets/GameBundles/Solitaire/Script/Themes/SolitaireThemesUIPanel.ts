import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitaireLogic } from "../Logic/SolitaireLogic";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import SolitaireThemesContentsUI, { SolitaireThemesContentsUIArgs } from "./SolitaireThemesContentsUI";
import SolitaireThemesSelfSkinUI, { SolitaireThemesSelfSkinUIArgs } from "./SolitaireThemesSelfSkinUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SolitaireThemesUIPanel extends ii.UIPanel<any> {
    @property({type:cc.Node,visible:true}) private _ctnSelfList: cc.Node = null;
    @property({type:cc.Node,visible:true}) private _ctnContents: cc.Node = null;

    private m_SelfSkinUI: SolitaireThemesSelfSkinUI = null;
    private m_ContentsUI: SolitaireThemesContentsUI = null;

    private __CloseContentsUI() {
        if(this.m_ContentsUI !== null) {
            this.m_ContentsUI.Close();
            this.m_ContentsUI = null;
        }
    }

    protected OnCreate(): void { }
    protected OnRelease(): void {
        this.__CloseContentsUI();
    }
    protected OnOpen(uiArgs: any): void {
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.m_SelfSkinUI = ii.UIMgr.ins.Create<SolitaireThemesSelfSkinUI, SolitaireThemesSelfSkinUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireThemesSelfSkinUI.key, {
            OnClickEdit:(index: number)=>this.OnClickEdit(index),
        }, this._ctnSelfList).CloseBy(this);
    }

    @ii.Util.block(1)
    private OnBack() {
        this.Close();
    }

    private OnClickEdit(index: number) {
        this.m_ContentsUI = ii.UIMgr.ins.Create<SolitaireThemesContentsUI, SolitaireThemesContentsUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireThemesContentsUI.key, {
            index: index,
            skin: SolitaireLogic.skin.CloneSkin(SolitaireLogic.skin.GetSkin(index)),
            OnSave:(index: number, skin: SolitaireSkin)=>this.OnSave(index, skin),
            OnBack:()=>this.OnContentBack()
        }, this._ctnContents);
    }

    private OnSave(index: number, skin: SolitaireSkin) {
        SolitaireLogic.skin.SaveSkin(index, skin);
        this.m_SelfSkinUI.RefreshUI(index, skin);
    }

    // 从 ContentsUI 界面点击返回按钮
    private OnContentBack() {
        this.__CloseContentsUI();
    }
}
