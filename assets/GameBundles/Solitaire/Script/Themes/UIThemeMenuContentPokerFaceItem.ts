import SolitairePokerDisplayUI, { SolitairePokerDisplayUIArgs } from "../Game/View/SolitairePokerDisplayUI";
import { EPokerStatus, ESuit } from "../SolitaireEnums";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";

const {ccclass, property} = cc._decorator;

export type UIThemeMenuContentPokerFaceItemArgs = {
    faceSkin: number,
    OnSelect: (faceSkin: number)=>void
}

@ccclass
export default class UIThemeMenuContentPokerFaceItem extends ii.UIComp<UIThemeMenuContentPokerFaceItemArgs> {
    static readonly POKER_POINTS = [ 1, 11, 12, 13 ]
    @property(cc.Sprite) protected bgSprite: cc.Sprite = null
    @property(cc.Node) protected highLightNode: cc.Node = null
    @property({type:cc.Layout,visible:true}) protected _layout: cc.Layout = null

    private m_DisplayPokerUI: SolitairePokerDisplayUI[] = []
    
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: any): void {
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        for(let suit=ESuit.HEITAO; suit<=ESuit.FANGKUAI; ++suit) {
            UIThemeMenuContentPokerFaceItem.POKER_POINTS.forEach(point => {
                this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create<SolitairePokerDisplayUI, SolitairePokerDisplayUIArgs>(SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                    point: point,
                    suit: suit,
                    backSkin: { kind: "classic",index:0 },
                    frontSkin: 0,
                    status: EPokerStatus.OPEN,
                    faceSkin: this.args.faceSkin
                }, this._layout.node).CloseBy(this));
            })
        }
        this.highLightNode.active = false;
    }

    private OnItemClick() {
        this.args.OnSelect(this.args.faceSkin);
    }

    Select(faceSkin: number) {
        this.highLightNode.active = this.args.faceSkin === faceSkin;
    }
}
