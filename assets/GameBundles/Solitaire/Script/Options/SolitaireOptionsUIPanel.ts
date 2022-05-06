import { SolitaireLogic } from "../Logic/SolitaireLogic";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import UISettingToggle from "../_Public/Component/UISettingToggle";
import SolitaireActionUIPanel from "../_Public/SolitaireActionUIPanel";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireOptionsUIPanel extends SolitaireActionUIPanel {
    @property(UISettingToggle) musicToggle: UISettingToggle = null
    @property(UISettingToggle) soundToggle: UISettingToggle = null
    @property(UISettingToggle) vibrateToggle: UISettingToggle = null;
    @property(UISettingToggle) leftHandToggle: UISettingToggle = null;
    @property({type:cc.Label,visible:true}) private _removeAdsHourLabel: cc.Label = null;
    @property({type:cc.Button,visible:true}) private _removeAdsButton: cc.Button = null;

    private readonly REMOVE_HOURS: number = 8;

    protected OnCreate() {
        super.OnCreate();
        this.musicToggle.Init(!ii.AudioMgr.ins.musicOffBV.v, isOn => ii.AudioMgr.ins.musicOffBV.v = !isOn);
        this.soundToggle.Init(!ii.AudioMgr.ins.effectOffBV.v, isOn => ii.AudioMgr.ins.effectOffBV.v = !isOn);
        this.vibrateToggle.Init(!ii.App.ins.p.vibrate.off.v, isOn => {
            ii.App.ins.p.vibrate.off.v = !isOn;
            if(isOn) {
                ii.App.ins.p.vibrate.Default();
            }
        });
        this.leftHandToggle.Init(SolitaireLogic.dataCache.leftHandBV.v, isOn => SolitaireLogic.dataCache.leftHandBV.v = isOn);
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnHowToPlay", this.OnHowToPlay.bind(this));
    }
    
    protected OnEnter(): void { }

    private OnBack() {
        this.ExitWithAction(this.Close.bind(this), false)
    }

    private OnHowToPlay() {
        ii.UIMgr.ins.Open(SolitairePrefabCfg.pfb.panel.SolitaireHowToPlayUIPanel.key);
        this.ExitWithAction(()=>{
        }, true);
    }

}
