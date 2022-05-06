import { SolitaireSkin } from "../DataCache/SolitaireSkinDataCache";
import { EPokerStatus, ESuit } from "../SolitaireEnums";
import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import { SolitaireSpriteFrameCfg } from "../SolitaireSpriteFrameCfg";
import SolitaireThemesEffectColumnUI, { SolitaireThemesEffectColumnUIArgs } from "./SolitaireThemesEffectColumnUI";

const {ccclass, property} = cc._decorator;

export type SolitaireThemesEffectUIArgs = {
    skin: SolitaireSkin,
    offset?: cc.Vec2
}

@ccclass
export default class SolitaireThemesEffectUI extends ii.UIComp<SolitaireThemesEffectUIArgs> {
    @property(cc.Sprite) bgSprite: cc.Sprite = null;
    @property(cc.Sprite) bgPatternSprite: cc.Sprite = null;
    @property(cc.Node) private columnsRoot: cc.Node = null;
    @property({type: cc.Node, visible: true}) private _offsetRoot: cc.Node = null;
    
    private m_Columns: SolitaireThemesEffectColumnUI[] = [];
    private readonly ColumnCfg = [
        {receive: [], play: [
            {suit: ESuit.MEIHUA, point: 13, status: EPokerStatus.OPEN}
        ]},
        {receive: [ {suit: ESuit.HONGXIN, point: 1, status: EPokerStatus.OPEN} ], play: [
            {suit: ESuit.HONGXIN, point: 1, status: EPokerStatus.CLOSE}
            ,{suit: ESuit.FANGKUAI, point: 12, status: EPokerStatus.OPEN}
        ]},
        {receive: [ {suit: ESuit.HONGXIN, point: 13, status: EPokerStatus.OPEN} ], play: [
            {suit: ESuit.HONGXIN, point: 1, status: EPokerStatus.CLOSE}
            ,{suit: ESuit.HONGXIN, point: 1, status: EPokerStatus.CLOSE}
            ,{suit: ESuit.HEITAO, point: 11, status: EPokerStatus.OPEN}
        ]}
    ]
    
    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: SolitaireThemesEffectUIArgs): void {
        if(this.args.offset != null) {
            this._offsetRoot.position = cc.v3(this.args.offset.x, this.args.offset.y);
        }
        const COLUMN_CNT = this.ColumnCfg.length;
        for(let i=0;i<COLUMN_CNT;++i) {
            this.m_Columns.push(ii.UIMgr.ins.Create<SolitaireThemesEffectColumnUI, SolitaireThemesEffectColumnUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectColumnUI.key, {
                x: (i-(COLUMN_CNT-1)*0.5)*114,
                receive: this.ColumnCfg[i].receive,
                play: this.ColumnCfg[i].play,
            }, this.columnsRoot).CloseBy(this));
        }

        this.SetSkin(this.args.skin);
    }

    SetSkin(skin: SolitaireSkin) {
        this.m_Columns.forEach(column=>column.SetSkin(skin));
        this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin), sp=>{
            this.bgSprite.spriteFrame = this.SetAssetProperty("BG_SKIN", sp);
        }, false, this.UUID_GROUP_KEY("BG_SKIN"))
        this.bgPatternSprite.node.active = skin.bgPatternSkin !== -1
        if(skin.bgPatternSkin >= 0) {
            this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.bgPatternSkinUrl(skin.bgPatternSkin), sp=>this.bgPatternSprite.spriteFrame = this.SetAssetProperty("BG_PATTERN_SKIN", sp), false, this.UUID_GROUP_KEY("BG_PATTERN_SKIN"))
        }
    }
}
