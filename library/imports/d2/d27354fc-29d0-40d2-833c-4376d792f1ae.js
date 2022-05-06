"use strict";
cc._RF.push(module, 'd2735T8KdBA0oM8Q3bXkvGu', 'SolitaireSpriteFrameCfg');
// GameBundles/Solitaire/Script/SolitaireSpriteFrameCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireSpriteFrameCfg = void 0;
var SolitaireSpriteFrameCfg = /** @class */ (function () {
    function SolitaireSpriteFrameCfg() {
    }
    //! 所有的精灵配置
    SolitaireSpriteFrameCfg.__AddKey = function (key) { this._sp[key] = key; };
    Object.defineProperty(SolitaireSpriteFrameCfg, "sp", {
        get: function () {
            var _this = this;
            if (this._sp === null) {
                this._sp = {};
                this.pokerBackKindCfg.forEach(function (it) {
                    for (var i = 0; i < it.count; ++i) {
                        _this.__AddKey(_this.__pokerBackUrl(it.kind, i));
                    }
                }); // back
                for (var i = 0; i < this.pokerFrontLength; ++i) {
                    this.__AddKey(this.pokerFrontUrl(i));
                } // front
                for (var i = 0; i < this.bgSkinLength; ++i) {
                    this.__AddKey(this.bgSkinUrl(i));
                } // bg
                for (var i = 0; i < this.bgPatternSkinLength; ++i) {
                    this.__AddKey(this.bgPatternSkinUrl(i));
                    this.__AddKey(this.bgPatternPreviewSkinUrl(i));
                } // bgPattern / bgPatternPreview
            }
            return this._sp;
        },
        enumerable: false,
        configurable: true
    });
    //! 注册接口
    SolitaireSpriteFrameCfg.Register = function (bundleName) {
        console.info("SolitaireSpriteFrameCfg::Register(" + bundleName + ") >> \u6CE8\u518C SpriteFrame \u8D44\u6E90");
        ii.registerResDict(this.sp, bundleName, ii.EResType.SpriteFrame);
    };
    SolitaireSpriteFrameCfg.bgSkinUrl = function (bgSkin) { return "skin_bg/skin_bg_" + bgSkin; };
    SolitaireSpriteFrameCfg.bgPatternSkinUrl = function (bgPatternSkin) { return "skin_bg_pattern/skin_bg_pattern_" + bgPatternSkin; };
    SolitaireSpriteFrameCfg.bgPatternPreviewSkinUrl = function (bgPatternSkin) { return "skin_bg_pattern_preview/skin_bg_pattern_preview_" + bgPatternSkin; };
    SolitaireSpriteFrameCfg.__pokerBackUrl = function (kind, index) { return "poker_bg/poker_" + kind + "_" + index; };
    SolitaireSpriteFrameCfg.pokerBackUrl = function (backSkin) { return this.__pokerBackUrl(backSkin.kind, backSkin.index); };
    SolitaireSpriteFrameCfg.pokerFrontUrl = function (frontSkin) { return "poker_front/poker_front_" + frontSkin; };
    //! 扑克牌的花色、红黑数字、JQK
    SolitaireSpriteFrameCfg.getFaceSuitSpritFrameUrl = function (faceSkin, suit) { return "AutoAtlas/p_face/p_face_" + faceSkin + "_" + suit; };
    SolitaireSpriteFrameCfg.getJQKSpriteFrameUrl = function (faceSkin, suit, point) { return "AutoAtlas/p_face_point/p_face_point_" + faceSkin + "_" + suit + "_" + point; };
    SolitaireSpriteFrameCfg.getBlackPointSpriteFrameUrl = function (faceSkin, point) { return "AutoAtlas/p_num/p_num_" + faceSkin + "_b_" + point; };
    SolitaireSpriteFrameCfg.getRedPointSpriteFrameUrl = function (faceSkin, point) { return "AutoAtlas/p_num/p_num_" + faceSkin + "_r_" + point; };
    SolitaireSpriteFrameCfg._sp = null;
    //! 桌面背景
    SolitaireSpriteFrameCfg.bgSkinLength = 27;
    //! 桌面背景花纹
    SolitaireSpriteFrameCfg.bgPatternSkinLength = 14;
    //! 扑克牌的背面
    SolitaireSpriteFrameCfg.pokerBackKindCfg = [
        { kind: "classic", count: 10 },
        { kind: "animals", count: 10 },
        { kind: "artistic", count: 10 },
        { kind: "christmas", count: 10 },
        { kind: "food", count: 10 },
        { kind: "natural", count: 10 },
        { kind: "novel", count: 10 },
        { kind: "pattern", count: 10 },
        { kind: "snow", count: 10 },
        { kind: "sporty", count: 10 }
    ];
    //! 扑克牌的正面
    SolitaireSpriteFrameCfg.pokerFrontLength = 2;
    return SolitaireSpriteFrameCfg;
}());
exports.SolitaireSpriteFrameCfg = SolitaireSpriteFrameCfg;

cc._RF.pop();