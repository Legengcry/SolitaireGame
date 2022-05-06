"use strict";
cc._RF.push(module, '254cfI1scNDb5ilKh97OfZb', 'SolitaireSkinDataCache');
// GameBundles/Solitaire/Script/DataCache/SolitaireSkinDataCache.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireSkinDataCache = void 0;
var SolitaireAutoAtlasCfg_1 = require("../SolitaireAutoAtlasCfg");
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var SolitaireSkinDataCache = /** @class */ (function (_super) {
    __extends(SolitaireSkinDataCache, _super);
    function SolitaireSkinDataCache() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MaxSkinLength = 4;
        _this.initSkin = null; // 进入游戏时的皮肤
        _this.skinIndexBV = null;
        _this.skinBV = null;
        _this.unlockBV = null;
        return _this;
    }
    Object.defineProperty(SolitaireSkinDataCache.prototype, "LSKey", {
        get: function () { return "ls_solitaire_skin_v1"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireSkinDataCache.prototype, "DefaultLSData", {
        get: function () {
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
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireSkinDataCache.prototype, "SkinList", {
        get: function () { return this.data.skinList; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireSkinDataCache.prototype, "IsMaxSkinLength", {
        get: function () { return this.data.skinList.length >= this.MaxSkinLength; },
        enumerable: false,
        configurable: true
    });
    SolitaireSkinDataCache.prototype.GetSkin = function (index) { return this.data.skinList[index]; };
    SolitaireSkinDataCache.prototype.OnRegister = function () {
        var _this = this;
        this.skinIndexBV = ii.NumberBV.Borrow(this.data.skinIndex).ReturnBy(this).Bind(function (val) {
            _this.data.skinIndex = val;
            _this.skinBV.v = _this.data.skinList[val];
        }, false, this);
        // 皮肤的数据是内部修改的；
        this.skinBV = ii.ObjectBV.Borrow(this.data.skinList[this.data.skinIndex]).ReturnBy(this);
        this.unlockBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        //! 记录创建时的皮肤数据，方便 UI 加载
        this.initSkin = this.CloneSkin(this.skinBV.v);
    };
    SolitaireSkinDataCache.prototype.OnUnRegister = function () { };
    SolitaireSkinDataCache.prototype.GetPreloadResList = function () {
        var resList = [];
        var skin = this.skinBV.v;
        // 预加载的资源
        resList.push(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin));
        resList.push(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerBackUrl(skin.backSkin));
        resList.push(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerFrontUrl(skin.frontSkin));
        var faceSkin = skin.faceSkin;
        for (var point = 1; point <= 13; ++point) {
            resList.push(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getBlackPointSpriteFrameUrl(faceSkin, point));
            resList.push(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getRedPointSpriteFrameUrl(faceSkin, point));
        }
        for (var suit = 0; suit < 4; ++suit) {
            resList.push(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl(faceSkin, suit));
        }
        for (var point = 11; point <= 13; ++point) {
            for (var suit = 0; suit < 4; ++suit) {
                resList.push(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getJQKSpriteFrameUrl(faceSkin, suit, point));
            }
        }
        return resList;
    };
    SolitaireSkinDataCache.prototype.ExtendSkinList = function (onCompleted) {
        console.assert(!this.IsMaxSkinLength);
        this.data.skinList.push(this.Random({
            faceSkin: 0,
            bgSkin: 0,
            bgPatternSkin: -1,
            backSkin: { kind: "classic", index: 0 },
            frontSkin: 0,
        }));
        this.markDirty(0);
        onCompleted(this.SkinList.length - 1);
    };
    SolitaireSkinDataCache.prototype.SelectSkinIndex = function (skinIndex) {
        this.skinIndexBV.v = skinIndex;
        this.markDirty(1);
    };
    SolitaireSkinDataCache.prototype.SaveSkin = function (index, skin) {
        this.data.skinList[index] = this.CloneSkin(skin);
        if (this.skinIndexBV.v === index) {
            this.skinBV.v = this.data.skinList[index];
        }
        this.markDirty(1);
    };
    SolitaireSkinDataCache.prototype.CloneSkin = function (skin) {
        var _skin = {
            faceSkin: skin.faceSkin,
            bgSkin: skin.bgSkin,
            bgPatternSkin: skin.bgPatternSkin,
            backSkin: {
                kind: skin.backSkin.kind,
                index: skin.backSkin.index
            },
            frontSkin: skin.frontSkin
        };
        return _skin;
    };
    SolitaireSkinDataCache.prototype.IsInitSkinChanged = function () { return this.IsSkinChanged(this.initSkin, this.skinBV.v); };
    SolitaireSkinDataCache.prototype.IsSkinChanged = function (preskin, skin) { return !this.__IsSameSkin(preskin, skin); };
    SolitaireSkinDataCache.prototype.__IsSameSkin = function (preskin, skin) {
        return preskin.faceSkin == skin.faceSkin
            && preskin.bgSkin == skin.bgSkin
            && preskin.bgPatternSkin == skin.bgPatternSkin
            && preskin.backSkin.kind == skin.backSkin.kind
            && preskin.backSkin.index == skin.backSkin.index
            && preskin.frontSkin == skin.frontSkin;
    };
    //! 随机
    SolitaireSkinDataCache.prototype.Random = function (skin) {
        skin.bgSkin = this.getRandIndex(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinLength, skin.bgSkin);
        skin.bgPatternSkin = this.getRandIndex(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinLength, skin.bgPatternSkin);
        skin.faceSkin = this.getRandIndex(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.FaceSkinCnt, skin.faceSkin);
        // back
        var backSkinKind = skin.backSkin.kind;
        var backSkinIndex = skin.backSkin.index;
        var kindList = SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerBackKindCfg;
        for (var ki = 0; ki < kindList.length; ++ki) {
            if (kindList[ki].kind == backSkinKind) {
                if (backSkinIndex < kindList[ki].count - 1) {
                    skin.backSkin.index += 1;
                    return skin;
                }
                else {
                    skin.backSkin.kind = kindList[(ki + 1) % kindList.length].kind;
                    skin.backSkin.index = 0;
                    return skin;
                }
            }
        }
        return skin;
    };
    SolitaireSkinDataCache.prototype.getRandIndex = function (length, currentValue) {
        if (length <= 1) {
            return currentValue;
        }
        var val = ii.rand.IntBetween(0, length);
        return (val) % length;
    };
    return SolitaireSkinDataCache;
}(ii.LSDataCache));
exports.SolitaireSkinDataCache = SolitaireSkinDataCache;

cc._RF.pop();