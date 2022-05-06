import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";

const {ccclass} = cc._decorator;

@ccclass
export default abstract class UIThemeMenuContent<T> extends ii.UIComp<T> {
    abstract OnResetSkin(skin: SolitaireSkin)
}
