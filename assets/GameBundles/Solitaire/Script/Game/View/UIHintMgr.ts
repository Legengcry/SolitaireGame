import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { SolitaireJu } from "../Model/SolitaireJu";
import SolitaireGameDesktopUI from "./SolitaireGameDesktopUI";
import UIHint, { UIHintArgs } from "./UIHint";

export type UIHintMgrArgs = {
    ju: SolitaireJu,
    desktop: SolitaireGameDesktopUI
}

const {ccclass} = cc._decorator;
@ccclass
export default class UIHintMgr extends ii.UIComp<UIHintMgrArgs> {
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UIHintMgrArgs): void {
        this.onGlobal(SolitaireJu.event.EVENT_LEVEL_MODEL_USING_HINT, this.HandleOperationHint.bind(this))
    }

    private HandleOperationHint() {
        console.assert(this.args.ju.HasOperationHint())
        ii.UIMgr.ins.Create<UIHint, UIHintArgs>(SolitairePrefabCfg.pfb.comp.UIHint.key, {
            hint: this.args.ju.DoOperationHint(),
            uiMgr: this,
            desktop: this.args.desktop,
            ju: this.args.ju
        }, this.node);
    }
}
