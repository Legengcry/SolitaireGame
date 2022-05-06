import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import SolitaireGameDesktopUI from "../Game/View/SolitaireGameDesktopUI";
import SolitairePokerDisplayUI, { SolitairePokerDisplayUIArgs } from "../Game/View/SolitairePokerDisplayUI";
import { EPokerStatus, ESuit } from "../SolitaireEnums";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";

const {ccclass, property} = cc._decorator;

type PokerUICfg = {suit: ESuit, point: number, status: EPokerStatus}

export type SolitaireThemesEffectColumnUIArgs = {
    x: number,
    receive: PokerUICfg[],
    play: PokerUICfg[]
}

@ccclass
export default class SolitaireThemesEffectColumnUI extends ii.UIComp<SolitaireThemesEffectColumnUIArgs> {
    @property(cc.Node) public receiveRoot: cc.Node = null 
    @property(cc.Node) public playRoot: cc.Node = null 

    private m_DisplayPokerUI: SolitairePokerDisplayUI[] = []
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: SolitaireThemesEffectColumnUIArgs): void {
        this.node.x = this.args.x;
        this.args.receive.forEach((it, i)=>{
            this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create<SolitairePokerDisplayUI, SolitairePokerDisplayUIArgs>(SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                point: it.point,
                suit: it.suit,
                backSkin: { kind: "classic",index:0 },
                frontSkin: 0,
                status: it.status,
                faceSkin: 0
            }, this.receiveRoot).CloseBy(this));
        });

        this.args.play.forEach((it, i)=>{
            this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create<SolitairePokerDisplayUI, SolitairePokerDisplayUIArgs>(SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                point: it.point,
                suit: it.suit,
                backSkin: { kind: "classic",index:0 },
                frontSkin: 0,
                status: it.status,
                faceSkin: 0
            }, this.playRoot).CloseBy(this).PositionTo(0, this.__GetPaddingYWith(this.args.play, it, i)));
        });
    }

    private __GetPaddingYWith(play: PokerUICfg[], it: PokerUICfg, index: number): number {
        let dy = 0;
        for(let i=0; i<index; ++i) {
            dy -= (play[i].status == EPokerStatus.CLOSE ? SolitaireGameDesktopUI.PLAY_CLOSE_POKER_PADDING_Y : SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y)
        }
        return dy;
    }

    SetSkin(skin: SolitaireSkin) {
        this.m_DisplayPokerUI.forEach(ui=>ui.setSkin(skin));
    }
}