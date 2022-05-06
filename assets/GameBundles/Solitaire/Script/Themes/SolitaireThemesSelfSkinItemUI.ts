import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitaireLogic } from "../Logic/SolitaireLogic";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import UISettingToggle from "../_Public/Component/UISettingToggle";
import SolitaireThemesEffectUI, { SolitaireThemesEffectUIArgs } from "./SolitaireThemesEffectUI";

const {ccclass, property} = cc._decorator;
export type SolitaireThemesSelfSkinItemUIArgs = {
    skin: SolitaireSkin,
    index: number,
    OnClickEdit: (index: number)=>void
}
@ccclass
export default class SolitaireThemesSelfSkinItemUI extends ii.UIComp<SolitaireThemesSelfSkinItemUIArgs> {
    @property({type:cc.Node,visible:true}) private _content: cc.Node = null;
    @property({type:cc.Label,visible:true}) private _titleLabel: cc.Label = null;
    @property({type:UISettingToggle,visible:true}) private _toggle: UISettingToggle = null
    
    private m_Effect: SolitaireThemesEffectUI = null;

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: SolitaireThemesSelfSkinItemUIArgs): void {
        this.SetIIClickHandler("OnEdit", this.OnClickEdit.bind(this));
        this._titleLabel.string = `${this.args.index === 0 ? "Default Theme" : `Theme - ${this.args.index}`}`;
        this._toggle.Init(this.args.index === SolitaireLogic.skin.skinIndexBV.v, isOn => {
            SolitaireLogic.skin.SelectSkinIndex(this.args.index);
        });

        this.BindBV(SolitaireLogic.skin.skinIndexBV, skinIndex => {
            this._toggle.SyncUI(this.args.index === skinIndex);
            this._toggle.SetBlockInput(this.args.index === skinIndex)
        }, true);

        this.m_Effect = ii.UIMgr.ins.Create<SolitaireThemesEffectUI, SolitaireThemesEffectUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectUI.key, {
            skin: this.args.skin
        }, this._content).CloseBy(this);
    }

    private OnClickEdit() {
        this.args.OnClickEdit(this.args.index);
    }

    RefreshUI(skin: SolitaireSkin) {
        this.args.skin = skin;
        this.m_Effect.SetSkin(skin);
    }
}
