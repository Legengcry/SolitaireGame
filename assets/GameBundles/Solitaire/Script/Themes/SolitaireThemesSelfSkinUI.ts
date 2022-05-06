import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { SolitaireLogic } from "../Logic/SolitaireLogic";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import SolitaireThemesSelfSkinItemUI, { SolitaireThemesSelfSkinItemUIArgs } from "./SolitaireThemesSelfSkinItemUI";

const {ccclass, property} = cc._decorator;
export type SolitaireThemesSelfSkinUIArgs = {
    OnClickEdit(index: number)
}
@ccclass
export default class SolitaireThemesSelfSkinUI extends ii.UIComp<SolitaireThemesSelfSkinUIArgs> {
    @property({type:cc.Layout,visible:true}) private _Layout: cc.Layout = null;
    @property({type:cc.Node,visible:true}) private _unlockRoot: cc.Node = null;
    @property({type:cc.Node,visible:true}) private _topBlocker: cc.Node = null;

    private m_ItemList: SolitaireThemesSelfSkinItemUI[] = [];

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: SolitaireThemesSelfSkinUIArgs): void {
        this.SetIIClickHandler("OnUnlock", this.OnUnlock.bind(this));
        SolitaireLogic.skin.SkinList.forEach((skin, index) => {
            this.__CreateSkin(skin, index);
        })
        this._unlockRoot.active = !SolitaireLogic.skin.IsMaxSkinLength;
        cc.tween(this._topBlocker)
            .delay(0.3)
            .to(0.3, {opacity: 0})
            .set({active: false, opacity: 255})
            .start();
    }

    private __CreateSkin(skin: SolitaireSkin, index: number) {
        this.m_ItemList.push(ii.UIMgr.ins.Create<SolitaireThemesSelfSkinItemUI, SolitaireThemesSelfSkinItemUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireThemesSelfSkinItemUI.key, {
            skin,
            index,
            OnClickEdit: this.args.OnClickEdit
        }, this._Layout.node).CloseBy(this));
    }

    private OnUnlock() {
        // 点击增加一个自定义皮肤按钮
        SolitaireLogic.WatchToExtendSkinList((index: number)=>{
            this.__CreateSkin(SolitaireLogic.skin.GetSkin(index), index);
            this._unlockRoot.active = !SolitaireLogic.skin.IsMaxSkinLength;
        });
    }

    RefreshUI(index: number, skin: SolitaireSkin) {
        this.m_ItemList[index].RefreshUI(skin)
    }
}
