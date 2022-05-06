export type TPokerBackSkin = {kind:string, index: number}
export type TPokerBackSkinKind = { kind: string, count: number }

export class SolitaireSpriteFrameCfg {
    //! 所有的精灵配置
    private static __AddKey(key: string) { this._sp[key] = key; }
    private static _sp: ii.StringKeyDict<string> = null;
    static get sp(): ii.StringKeyDict<string> {
        if(this._sp === null) {
            this._sp = {}
            this.pokerBackKindCfg.forEach(it=>{
                for(let i=0;i<it.count;++i) { this.__AddKey(this.__pokerBackUrl(it.kind, i)); }
            }); // back
            for(let i=0;i<this.pokerFrontLength;++i) { this.__AddKey(this.pokerFrontUrl(i)); } // front
            for(let i=0;i<this.bgSkinLength;++i) { this.__AddKey(this.bgSkinUrl(i)); } // bg
            for(let i=0;i<this.bgPatternSkinLength;++i) { this.__AddKey(this.bgPatternSkinUrl(i)); this.__AddKey(this.bgPatternPreviewSkinUrl(i)) } // bgPattern / bgPatternPreview
        }
        return this._sp;
    }

    //! 注册接口
    static Register(bundleName: string): void {
        console.info(`SolitaireSpriteFrameCfg::Register(${bundleName}) >> 注册 SpriteFrame 资源`)
        ii.registerResDict(this.sp, bundleName, ii.EResType.SpriteFrame);
    }

    //! 桌面背景
    static readonly bgSkinLength: number = 27;
    static bgSkinUrl(bgSkin: number): string { return `skin_bg/skin_bg_${bgSkin}` }

    //! 桌面背景花纹
    static readonly bgPatternSkinLength: number = 14;
    static bgPatternSkinUrl(bgPatternSkin: number): string { return `skin_bg_pattern/skin_bg_pattern_${bgPatternSkin}` }
    static bgPatternPreviewSkinUrl(bgPatternSkin: number): string { return `skin_bg_pattern_preview/skin_bg_pattern_preview_${bgPatternSkin}` }

    //! 扑克牌的背面
    static readonly pokerBackKindCfg: TPokerBackSkinKind[] = [
        {kind: "classic", count: 10},
        {kind: "animals", count: 10},
        {kind: "artistic", count: 10},
        {kind: "christmas", count: 10},
        {kind: "food", count: 10},
        {kind: "natural", count: 10},
        {kind: "novel", count: 10},
        {kind: "pattern", count: 10},
        {kind: "snow", count: 10},
        {kind: "sporty", count: 10}
    ]
    private static __pokerBackUrl(kind: string, index: number): string { return `poker_bg/poker_${kind}_${index}` }
    static pokerBackUrl(backSkin: TPokerBackSkin): string { return this.__pokerBackUrl(backSkin.kind, backSkin.index); }

    //! 扑克牌的正面
    static readonly pokerFrontLength: number = 2;
    static pokerFrontUrl(frontSkin: number): string { return `poker_front/poker_front_${frontSkin}` }

    //! 扑克牌的花色、红黑数字、JQK
    static getFaceSuitSpritFrameUrl(faceSkin: number, suit: number) { return `AutoAtlas/p_face/p_face_${faceSkin}_${suit}` }
    static getJQKSpriteFrameUrl(faceSkin: number, suit: number, point: number): string { return `AutoAtlas/p_face_point/p_face_point_${faceSkin}_${suit}_${point}` }
    static getBlackPointSpriteFrameUrl(faceSkin: number, point: number): string { return `AutoAtlas/p_num/p_num_${faceSkin}_b_${point}` }
    static getRedPointSpriteFrameUrl(faceSkin: number, point: number): string { return `AutoAtlas/p_num/p_num_${faceSkin}_r_${point}` }
}
