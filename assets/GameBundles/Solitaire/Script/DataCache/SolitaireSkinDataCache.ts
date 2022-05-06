import { SolitaireAutoAtlasCfg } from "../SolitaireAutoAtlasCfg";
import { SolitaireSpriteFrameCfg, TPokerBackSkin } from "../SolitaireSpriteFrameCfg";

export type SolitaireSkin = {
    faceSkin: number,
    bgSkin: number,
    bgPatternSkin: number,
    backSkin: TPokerBackSkin,
    frontSkin: number
}

type SkinDataCacheDataType = {
    skinIndex: number, // 当前皮肤的下标
    skinList: SolitaireSkin[],
    unlock: {
        start: number,
        end: number
    }
}

export class SolitaireSkinDataCache extends ii.LSDataCache<SkinDataCacheDataType> {
    protected get LSKey(): string { return "ls_solitaire_skin_v1" }
    protected get DefaultLSData(): SkinDataCacheDataType {
        return {
            skinIndex: 0,
            skinList: [
                {
                    faceSkin: 0,
                    bgSkin: 0,
                    bgPatternSkin: -1,
                    backSkin: { kind: "classic", index: 0 },
                    frontSkin: 0,
                },
                {
                    faceSkin: 1,
                    bgSkin: 1,
                    bgPatternSkin: 0,
                    backSkin: { kind: "classic", index: 1 },
                    frontSkin: 0,
                },
                {
                    faceSkin: 2,
                    bgSkin: 2,
                    bgPatternSkin: 1,
                    backSkin: { kind: "classic", index: 2 },
                    frontSkin: 0,
                },
                {
                    faceSkin: 3,
                    bgSkin: 3,
                    bgPatternSkin: 2,
                    backSkin: { kind: "classic", index: 3 },
                    frontSkin: 0,
                }
            ],
            unlock: {
                start: 0,
                end: 0
            }
        }
    }
    readonly MaxSkinLength: number = 4;
    get SkinList(): readonly SolitaireSkin[] { return this.data.skinList; }
    get IsMaxSkinLength(): boolean { return this.data.skinList.length >= this.MaxSkinLength; }
    GetSkin(index: number): SolitaireSkin { return this.data.skinList[index]; }

    initSkin: SolitaireSkin = null; // 进入游戏时的皮肤
    skinIndexBV: ii.NumberBV = null;
    skinBV: ii.BV<SolitaireSkin> = null;
    unlockBV: ii.BooleanBV = null;
    
    protected OnRegister() {
        this.skinIndexBV = ii.NumberBV.Borrow(this.data.skinIndex).ReturnBy(this).Bind(val=>{
            this.data.skinIndex = val;
            this.skinBV.v = this.data.skinList[val];
        }, false, this);
        // 皮肤的数据是内部修改的；
        this.skinBV = ii.ObjectBV.Borrow(this.data.skinList[this.data.skinIndex]).ReturnBy(this);
        this.unlockBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        //! 记录创建时的皮肤数据，方便 UI 加载
        this.initSkin = this.CloneSkin(this.skinBV.v);
    }
    protected OnUnRegister() { }

    GetPreloadResList(): string[] {
        let resList = [];
        let skin = this.skinBV.v;
        // 预加载的资源
        resList.push(SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin));
        resList.push(SolitaireSpriteFrameCfg.pokerBackUrl(skin.backSkin));
        resList.push(SolitaireSpriteFrameCfg.pokerFrontUrl(skin.frontSkin));
        
        let faceSkin = skin.faceSkin;
        for(let point = 1; point <=13; ++point) {
            resList.push(SolitaireAutoAtlasCfg.getBlackPointSpriteFrameUrl(faceSkin, point))
            resList.push(SolitaireAutoAtlasCfg.getRedPointSpriteFrameUrl(faceSkin, point))
        }
        for (let suit = 0; suit < 4; ++suit) {
            resList.push(SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl(faceSkin, suit))
        }
        for (let point = 11; point <= 13; ++point) {
            for (let suit = 0; suit < 4; ++suit) {
                resList.push(SolitaireAutoAtlasCfg.getJQKSpriteFrameUrl(faceSkin, suit, point))
            }
        }
        return resList;
    }

    ExtendSkinList(onCompleted: (skinIndex: number)=>void) {
        console.assert(!this.IsMaxSkinLength);
        this.data.skinList.push(this.Random({
            faceSkin: 0,
            bgSkin: 0,
            bgPatternSkin: -1,
            backSkin: { kind: "classic", index: 0 },
            frontSkin: 0,
        }));
        this.markDirty(0);
        onCompleted(this.SkinList.length-1);
    }

    SelectSkinIndex(skinIndex: number) {
        this.skinIndexBV.v = skinIndex;
        this.markDirty(1);
    }

    SaveSkin(index: number, skin: SolitaireSkin) {
        this.data.skinList[index] = this.CloneSkin(skin);
        if(this.skinIndexBV.v === index) {
            this.skinBV.v = this.data.skinList[index];
        }
        this.markDirty(1);
    }

    CloneSkin(skin: SolitaireSkin): SolitaireSkin {
        let _skin: SolitaireSkin = {
            faceSkin: skin.faceSkin,
            bgSkin: skin.bgSkin,
            bgPatternSkin: skin.bgPatternSkin,
            backSkin: {
                kind:skin.backSkin.kind,
                index: skin.backSkin.index
            },
            frontSkin: skin.frontSkin
        }
        return _skin;
    }
    IsInitSkinChanged(): boolean { return this.IsSkinChanged(this.initSkin, this.skinBV.v); }
    IsSkinChanged(preskin: SolitaireSkin, skin: SolitaireSkin): boolean { return !this.__IsSameSkin(preskin, skin); }
    private __IsSameSkin(preskin: SolitaireSkin, skin: SolitaireSkin): boolean {
        return preskin.faceSkin == skin.faceSkin
            && preskin.bgSkin == skin.bgSkin
            && preskin.bgPatternSkin == skin.bgPatternSkin
            && preskin.backSkin.kind == skin.backSkin.kind
            && preskin.backSkin.index == skin.backSkin.index
            && preskin.frontSkin == skin.frontSkin
    }


    //! 随机
    Random(skin: SolitaireSkin): SolitaireSkin {
        skin.bgSkin = this.getRandIndex(SolitaireSpriteFrameCfg.bgSkinLength, skin.bgSkin);
        skin.bgPatternSkin = this.getRandIndex(SolitaireSpriteFrameCfg.bgPatternSkinLength, skin.bgPatternSkin);
        skin.faceSkin = this.getRandIndex(SolitaireAutoAtlasCfg.FaceSkinCnt, skin.faceSkin);

        // back
        let backSkinKind = skin.backSkin.kind;
        let backSkinIndex = skin.backSkin.index;
        let kindList = SolitaireSpriteFrameCfg.pokerBackKindCfg;
        for(let ki=0; ki<kindList.length; ++ki) {
            if(kindList[ki].kind == backSkinKind){
                if(backSkinIndex < kindList[ki].count-1){
                    skin.backSkin.index += 1;
                    return skin;
                }else{
                    skin.backSkin.kind = kindList[(ki+1)%kindList.length].kind;
                    skin.backSkin.index = 0;
                    return skin;
                }
            }
        }
        return skin;
    }

    private getRandIndex(length: number, currentValue: number) {
        if(length <= 1){
            return currentValue
        }
        let val = ii.rand.IntBetween(0, length);
        return (val)%length
    }
}
