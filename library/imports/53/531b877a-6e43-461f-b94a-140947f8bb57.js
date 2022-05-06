"use strict";
cc._RF.push(module, '531b8d6bkNGH7lKFAlH+LtX', 'SolitaireAutoAtlasCfg');
// GameBundles/Solitaire/Script/SolitaireAutoAtlasCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireAutoAtlasCfg = void 0;
var SolitaireAutoAtlasCfg = /** @class */ (function () {
    function SolitaireAutoAtlasCfg() {
    }
    Object.defineProperty(SolitaireAutoAtlasCfg, "sp", {
        get: function () {
            if (this._sp === null) {
                this._sp = {};
                // p_face
                for (var faceSkin = 0; faceSkin < this.FaceSkinCnt; ++faceSkin) {
                    for (var suit = 0; suit < 4; ++suit) {
                        var key = this.getFaceSuitSpritFrameUrl(faceSkin, suit);
                        this._sp[key] = key;
                        // jqk
                        for (var point = 11; point <= 13; ++point) {
                            var jqk = this.getJQKSpriteFrameUrl(faceSkin, suit, point);
                            this._sp[jqk] = jqk;
                        }
                    }
                }
                // p_num
                for (var faceSkin = 0; faceSkin < this.FaceSkinCnt; ++faceSkin) {
                    for (var point = 1; point <= 13; ++point) {
                        var key_b = this.getBlackPointSpriteFrameUrl(faceSkin, point);
                        this._sp[key_b] = key_b;
                        var key_r = this.getRedPointSpriteFrameUrl(faceSkin, point);
                        this._sp[key_r] = key_r;
                    }
                }
            }
            return this._sp;
        },
        enumerable: false,
        configurable: true
    });
    SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl = function (faceSkin, suit) { return "p_face/p_face_" + faceSkin + "_" + suit; };
    SolitaireAutoAtlasCfg.getJQKSpriteFrameUrl = function (faceSkin, suit, point) { return "p_face_point/p_face_point_" + faceSkin + "_" + suit + "_" + point; };
    SolitaireAutoAtlasCfg.getBlackPointSpriteFrameUrl = function (faceSkin, point) { return "p_num/p_num_" + faceSkin + "_b_" + point; };
    SolitaireAutoAtlasCfg.getRedPointSpriteFrameUrl = function (faceSkin, point) { return "p_num/p_num_" + faceSkin + "_r_" + point; };
    SolitaireAutoAtlasCfg.Register = function (bundleName) {
        console.info("SolitaireAutoAtlasCfg::Register(" + bundleName + ") >> \u6CE8\u518C AutoAtlas \u8D44\u6E90");
        ii.registerResDict(this.sp, bundleName, ii.EResType.AutoAtlas);
    };
    SolitaireAutoAtlasCfg.FaceSkinCnt = 4;
    //! 所有的精灵配置
    SolitaireAutoAtlasCfg._sp = null;
    return SolitaireAutoAtlasCfg;
}());
exports.SolitaireAutoAtlasCfg = SolitaireAutoAtlasCfg;

cc._RF.pop();