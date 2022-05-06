export class SolitaireAutoAtlasCfg {
    static readonly FaceSkinCnt: number = 4;
    //! 所有的精灵配置
    private static _sp: ii.StringKeyDict<string> = null;
    static get sp(): ii.StringKeyDict<string> {
        if(this._sp === null) {
            this._sp = {}
            // p_face
            for(let faceSkin=0;faceSkin<this.FaceSkinCnt;++faceSkin) {
                for(let suit=0; suit<4;++suit) {
                    let key = this.getFaceSuitSpritFrameUrl(faceSkin,suit);
                    this._sp[key] = key;
                    // jqk
                    for(let point = 11; point<=13; ++point) {
                        let jqk = this.getJQKSpriteFrameUrl(faceSkin,suit,point);
                        this._sp[jqk] = jqk;
                    }
                }
            }

            // p_num
            for(let faceSkin=0;faceSkin<this.FaceSkinCnt;++faceSkin) {
                for(let point = 1; point<=13; ++point) {
                    let key_b = this.getBlackPointSpriteFrameUrl(faceSkin,point);
                    this._sp[key_b] = key_b;
                    let key_r = this.getRedPointSpriteFrameUrl(faceSkin,point);
                    this._sp[key_r] = key_r;
                }
            }
        }
        return this._sp;
    }

    static getFaceSuitSpritFrameUrl(faceSkin: number, suit: number) { return `p_face/p_face_${faceSkin}_${suit}` }
    static getJQKSpriteFrameUrl(faceSkin: number, suit: number, point: number): string { return `p_face_point/p_face_point_${faceSkin}_${suit}_${point}` }
    static getBlackPointSpriteFrameUrl(faceSkin: number, point: number): string { return `p_num/p_num_${faceSkin}_b_${point}` }
    static getRedPointSpriteFrameUrl(faceSkin: number, point: number): string { return `p_num/p_num_${faceSkin}_r_${point}` }

    static Register(bundleName: string): void {
        console.info(`SolitaireAutoAtlasCfg::Register(${bundleName}) >> 注册 AutoAtlas 资源`)
        ii.registerResDict(this.sp, bundleName, ii.EResType.AutoAtlas);
    }
}
