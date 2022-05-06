/**
 * 扑克牌的显示节点
 */

import { SolitaireSkin } from "../../DataCache/SolitaireSkinDataCache";
import { SolitaireAutoAtlasCfg } from "../../SolitaireAutoAtlasCfg";
import { EPokerStatus, ESuit } from "../../SolitaireEnums";
import { SolitaireSpriteFrameCfg, TPokerBackSkin } from "../../SolitaireSpriteFrameCfg";

export type SolitairePokerDisplayUIArgs = {
    point: number,
    suit: ESuit,
    backSkin: TPokerBackSkin,
    frontSkin: number,
    status: EPokerStatus,
    faceSkin: number
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitairePokerDisplayUI extends ii.UIComp<SolitairePokerDisplayUIArgs> {
    @property({type:cc.Sprite,visible:true}) private _skinSprite: cc.Sprite = null
    @property({type:cc.Sprite,visible:true}) private _pointSprite: cc.Sprite = null
    @property({type:cc.Sprite,visible:true}) private _suitSprite: cc.Sprite = null
    @property({type:cc.Sprite,visible:true}) private _smallSuitSprite: cc.Sprite = null

    private m_Status: EPokerStatus = EPokerStatus.CLOSE;
    private m_Point: number = 0;
    private m_Suit: ESuit = ESuit.HEITAO;
    private m_backSkin: TPokerBackSkin = {
        kind: "classic",
        index: 0
    };
    private m_frontSkin: number = 0;
    private m_FaceSkin: number = 0
    get backSkin(): TPokerBackSkin { return this.m_backSkin }
    get frontSkin(): number { return this.m_frontSkin }
    get skin(): number { return this.m_FaceSkin }

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: any): void {
        this.m_Point = this.args.point;
        this.m_Suit = this.args.suit;
        this.m_backSkin.kind = this.args.backSkin.kind;
        this.m_backSkin.index = this.args.backSkin.index;
        this.m_frontSkin = this.args.frontSkin;
        this.m_FaceSkin = this.args.faceSkin;
        this.m_Status = this.args.status;

        this.setStatus(this.m_Status);
        // 花色、点数
        this.__RefreshPointTexture();
        this.__RefreshSuitSkinTexture();
    }
    private __RefreshPointTexture() {
        if(this.m_Suit === ESuit.HEITAO || this.m_Suit === ESuit.MEIHUA) {
            this.LoadRes<cc.SpriteFrame>(SolitaireAutoAtlasCfg.getBlackPointSpriteFrameUrl(this.m_FaceSkin, this.m_Point), sp=>this._pointSprite.spriteFrame = this.SetAssetProperty("FACE_SKIN", sp), false, this.UUID_GROUP_KEY("FACE_SKIN"));
        }else{
            this.LoadRes<cc.SpriteFrame>(SolitaireAutoAtlasCfg.getRedPointSpriteFrameUrl(this.m_FaceSkin, this.m_Point), sp=>this._pointSprite.spriteFrame = this.SetAssetProperty("FACE_SKIN", sp), false, this.UUID_GROUP_KEY("FACE_SKIN"));
        }
    }
    private __RefreshSuitSkinTexture() {
        this.LoadRes<cc.SpriteFrame>(SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl(this.m_FaceSkin, this.m_Suit), sp=>this._smallSuitSprite.spriteFrame = this.SetAssetProperty("SMALL_SUIT_SKIN", sp), false, this.UUID_GROUP_KEY("SMALL_SUIT_SKIN"));
        if(this.m_Point >= 11){
            this.LoadRes<cc.SpriteFrame>(SolitaireAutoAtlasCfg.getJQKSpriteFrameUrl(this.m_FaceSkin, this.m_Suit, this.m_Point), sp=>this._suitSprite.spriteFrame = this.SetAssetProperty("SUIT_SKIN", sp), false, this.UUID_GROUP_KEY("SUIT_SKIN"));
        }else{
            this.LoadRes<cc.SpriteFrame>(SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl(this.m_FaceSkin, this.m_Suit), sp=>this._suitSprite.spriteFrame = this.SetAssetProperty("SUIT_SKIN", sp), false, this.UUID_GROUP_KEY("SUIT_SKIN"));
        }
    }
    private setStatus(status: EPokerStatus) {
        // 由于 UI 需要进行表现，因此 model 和 UI 会出现不一致
        this.m_Status = status
        if(status == EPokerStatus.CLOSE){
            this._pointSprite.node.active = false
            this._suitSprite.node.active = false
            this._smallSuitSprite.node.active = false
            this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.pokerBackUrl(this.m_backSkin), sp=>this._skinSprite.spriteFrame = this.SetAssetProperty("SKIN", sp), false, this.UUID_GROUP_KEY("SKIN"));
        }else{
            this._pointSprite.node.active = true
            this._suitSprite.node.active = true
            this._smallSuitSprite.node.active = true
            this.LoadRes<cc.SpriteFrame>(SolitaireSpriteFrameCfg.pokerFrontUrl(this.m_frontSkin), sp=>this._skinSprite.spriteFrame = this.SetAssetProperty("SKIN", sp), false, this.UUID_GROUP_KEY("SKIN"));
        }
    }

    Init(faceSkin: number, backSkin: TPokerBackSkin, frontSkin: number): SolitairePokerDisplayUI {
        this.m_backSkin = backSkin
        this.m_frontSkin = frontSkin
        this.m_FaceSkin = faceSkin
        this.__RefreshPointTexture()
        this.__RefreshSuitSkinTexture()
        this.setStatus(this.m_Status)
        return this
    }

    setSkin(skin: SolitaireSkin) {
        this.setFaceSkin(skin.faceSkin);
        this.setFrontSkin(skin.frontSkin);
        this.setBackSkin(skin.backSkin);
        this.__RefreshPointTexture()
        this.__RefreshSuitSkinTexture()
        this.setStatus(this.m_Status)
    }

    setFaceSkin(faceSkin: number) {
        if(this.m_FaceSkin !== faceSkin) {
            this.m_FaceSkin = faceSkin
            this.__RefreshPointTexture()
            this.__RefreshSuitSkinTexture()
            if(this.m_Status !== null){
                this.setStatus(this.m_Status)
            }
        }
    }
    setFrontSkin(frontSkin: number) {
        this.m_frontSkin = frontSkin
        if(this.m_Status !== null){
            this.setStatus(this.m_Status)
        }
    }
    setBackSkin(backSkin: TPokerBackSkin) {
        this.m_backSkin = backSkin
        if(this.m_Status !== null){
            this.setStatus(this.m_Status)
        }
    }

    Refresh(status: EPokerStatus, suit: ESuit, point: number) {
        this.m_Status = status;
        this.m_Point = point;
        this.m_Suit = suit;
        this.__RefreshPointTexture();
        this.__RefreshSuitSkinTexture();
        this.setStatus(this.m_Status)
    }
}
