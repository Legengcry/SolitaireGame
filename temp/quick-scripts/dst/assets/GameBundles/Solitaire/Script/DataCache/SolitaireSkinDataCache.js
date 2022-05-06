
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/DataCache/SolitaireSkinDataCache.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxEYXRhQ2FjaGVcXFNvbGl0YWlyZVNraW5EYXRhQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUFpRTtBQUNqRSxzRUFBcUY7QUFtQnJGO0lBQTRDLDBDQUFxQztJQUFqRjtRQUFBLHFFQTJLQztRQWxJWSxtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUtuQyxjQUFRLEdBQWtCLElBQUksQ0FBQyxDQUFDLFdBQVc7UUFDM0MsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLFlBQU0sR0FBeUIsSUFBSSxDQUFDO1FBQ3BDLGNBQVEsR0FBaUIsSUFBSSxDQUFDOztJQTBIbEMsQ0FBQztJQTFLRyxzQkFBYyx5Q0FBSzthQUFuQixjQUFnQyxPQUFPLHNCQUFzQixDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFDL0Qsc0JBQWMsaURBQWE7YUFBM0I7WUFDSSxPQUFPO2dCQUNILFNBQVMsRUFBRSxDQUFDO2dCQUNaLFFBQVEsRUFBRTtvQkFDTjt3QkFDSSxRQUFRLEVBQUUsQ0FBQzt3QkFDWCxNQUFNLEVBQUUsQ0FBQzt3QkFDVCxhQUFhLEVBQUUsQ0FBQyxDQUFDO3dCQUNqQixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7d0JBQ3ZDLFNBQVMsRUFBRSxDQUFDO3FCQUNmO29CQUNEO3dCQUNJLFFBQVEsRUFBRSxDQUFDO3dCQUNYLE1BQU0sRUFBRSxDQUFDO3dCQUNULGFBQWEsRUFBRSxDQUFDO3dCQUNoQixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7d0JBQ3ZDLFNBQVMsRUFBRSxDQUFDO3FCQUNmO29CQUNEO3dCQUNJLFFBQVEsRUFBRSxDQUFDO3dCQUNYLE1BQU0sRUFBRSxDQUFDO3dCQUNULGFBQWEsRUFB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LEFBMktDLENBM0syQyxFQUFFLENBQUMsV0FBVyxHQTJLekQ7QUEzS1ksd0RBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlQXV0b0F0bGFzQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZUF1dG9BdGxhc0NmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcsIFRQb2tlckJhY2tTa2luIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVNwcml0ZUZyYW1lQ2ZnXCI7XG5cbmV4cG9ydCB0eXBlIFNvbGl0YWlyZVNraW4gPSB7XG4gICAgZmFjZVNraW46IG51bWJlcixcbiAgICBiZ1NraW46IG51bWJlcixcbiAgICBiZ1BhdHRlcm5Ta2luOiBudW1iZXIsXG4gICAgYmFja1NraW46IFRQb2tlckJhY2tTa2luLFxuICAgIGZyb250U2tpbjogbnVtYmVyXG59XG5cbnR5cGUgU2tpbkRhdGFDYWNoZURhdGFUeXBlID0ge1xuICAgIHNraW5JbmRleDogbnVtYmVyLCAvLyDlvZPliY3nmq7ogqTnmoTkuIvmoIdcbiAgICBza2luTGlzdDogU29saXRhaXJlU2tpbltdLFxuICAgIHVubG9jazoge1xuICAgICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgICBlbmQ6IG51bWJlclxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNvbGl0YWlyZVNraW5EYXRhQ2FjaGUgZXh0ZW5kcyBpaS5MU0RhdGFDYWNoZTxTa2luRGF0YUNhY2hlRGF0YVR5cGU+IHtcbiAgICBwcm90ZWN0ZWQgZ2V0IExTS2V5KCk6IHN0cmluZyB7IHJldHVybiBcImxzX3NvbGl0YWlyZV9za2luX3YxXCIgfVxuICAgIHByb3RlY3RlZCBnZXQgRGVmYXVsdExTRGF0YSgpOiBTa2luRGF0YUNhY2hlRGF0YVR5cGUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2tpbkluZGV4OiAwLFxuICAgICAgICAgICAgc2tpbkxpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZhY2VTa2luOiAwLFxuICAgICAgICAgICAgICAgICAgICBiZ1NraW46IDAsXG4gICAgICAgICAgICAgICAgICAgIGJnUGF0dGVyblNraW46IC0xLFxuICAgICAgICAgICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIiwgaW5kZXg6IDAgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRTa2luOiAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmYWNlU2tpbjogMSxcbiAgICAgICAgICAgICAgICAgICAgYmdTa2luOiAxLFxuICAgICAgICAgICAgICAgICAgICBiZ1BhdHRlcm5Ta2luOiAwLFxuICAgICAgICAgICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIiwgaW5kZXg6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRTa2luOiAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmYWNlU2tpbjogMixcbiAgICAgICAgICAgICAgICAgICAgYmdTa2luOiAyLFxuICAgICAgICAgICAgICAgICAgICBiZ1BhdHRlcm5Ta2luOiAxLFxuICAgICAgICAgICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIiwgaW5kZXg6IDIgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRTa2luOiAwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmYWNlU2tpbjogMyxcbiAgICAgICAgICAgICAgICAgICAgYmdTa2luOiAzLFxuICAgICAgICAgICAgICAgICAgICBiZ1BhdHRlcm5Ta2luOiAyLFxuICAgICAgICAgICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIiwgaW5kZXg6IDMgfSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRTa2luOiAwLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB1bmxvY2s6IHtcbiAgICAgICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgICAgICBlbmQ6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZWFkb25seSBNYXhTa2luTGVuZ3RoOiBudW1iZXIgPSA0O1xuICAgIGdldCBTa2luTGlzdCgpOiByZWFkb25seSBTb2xpdGFpcmVTa2luW10geyByZXR1cm4gdGhpcy5kYXRhLnNraW5MaXN0OyB9XG4gICAgZ2V0IElzTWF4U2tpbkxlbmd0aCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZGF0YS5za2luTGlzdC5sZW5ndGggPj0gdGhpcy5NYXhTa2luTGVuZ3RoOyB9XG4gICAgR2V0U2tpbihpbmRleDogbnVtYmVyKTogU29saXRhaXJlU2tpbiB7IHJldHVybiB0aGlzLmRhdGEuc2tpbkxpc3RbaW5kZXhdOyB9XG5cbiAgICBpbml0U2tpbjogU29saXRhaXJlU2tpbiA9IG51bGw7IC8vIOi/m+WFpea4uOaIj+aXtueahOearuiCpFxuICAgIHNraW5JbmRleEJWOiBpaS5OdW1iZXJCViA9IG51bGw7XG4gICAgc2tpbkJWOiBpaS5CVjxTb2xpdGFpcmVTa2luPiA9IG51bGw7XG4gICAgdW5sb2NrQlY6IGlpLkJvb2xlYW5CViA9IG51bGw7XG4gICAgXG4gICAgcHJvdGVjdGVkIE9uUmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuc2tpbkluZGV4QlYgPSBpaS5OdW1iZXJCVi5Cb3Jyb3codGhpcy5kYXRhLnNraW5JbmRleCkuUmV0dXJuQnkodGhpcykuQmluZCh2YWw9PntcbiAgICAgICAgICAgIHRoaXMuZGF0YS5za2luSW5kZXggPSB2YWw7XG4gICAgICAgICAgICB0aGlzLnNraW5CVi52ID0gdGhpcy5kYXRhLnNraW5MaXN0W3ZhbF07XG4gICAgICAgIH0sIGZhbHNlLCB0aGlzKTtcbiAgICAgICAgLy8g55qu6IKk55qE5pWw5o2u5piv5YaF6YOo5L+u5pS555qE77ybXG4gICAgICAgIHRoaXMuc2tpbkJWID0gaWkuT2JqZWN0QlYuQm9ycm93KHRoaXMuZGF0YS5za2luTGlzdFt0aGlzLmRhdGEuc2tpbkluZGV4XSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMudW5sb2NrQlYgPSBpaS5Cb29sZWFuQlYuQm9ycm93KGZhbHNlKS5SZXR1cm5CeSh0aGlzKTtcbiAgICAgICAgLy8hIOiusOW9leWIm+W7uuaXtueahOearuiCpOaVsOaNru+8jOaWueS+vyBVSSDliqDovb1cbiAgICAgICAgdGhpcy5pbml0U2tpbiA9IHRoaXMuQ2xvbmVTa2luKHRoaXMuc2tpbkJWLnYpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25VblJlZ2lzdGVyKCkgeyB9XG5cbiAgICBHZXRQcmVsb2FkUmVzTGlzdCgpOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCByZXNMaXN0ID0gW107XG4gICAgICAgIGxldCBza2luID0gdGhpcy5za2luQlYudjtcbiAgICAgICAgLy8g6aKE5Yqg6L2955qE6LWE5rqQXG4gICAgICAgIHJlc0xpc3QucHVzaChTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5iZ1NraW5Vcmwoc2tpbi5iZ1NraW4pKTtcbiAgICAgICAgcmVzTGlzdC5wdXNoKFNvbGl0YWlyZVNwcml0ZUZyYW1lQ2ZnLnBva2VyQmFja1VybChza2luLmJhY2tTa2luKSk7XG4gICAgICAgIHJlc0xpc3QucHVzaChTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5wb2tlckZyb250VXJsKHNraW4uZnJvbnRTa2luKSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmFjZVNraW4gPSBza2luLmZhY2VTa2luO1xuICAgICAgICBmb3IobGV0IHBvaW50ID0gMTsgcG9pbnQgPD0xMzsgKytwb2ludCkge1xuICAgICAgICAgICAgcmVzTGlzdC5wdXNoKFNvbGl0YWlyZUF1dG9BdGxhc0NmZy5nZXRCbGFja1BvaW50U3ByaXRlRnJhbWVVcmwoZmFjZVNraW4sIHBvaW50KSlcbiAgICAgICAgICAgIHJlc0xpc3QucHVzaChTb2xpdGFpcmVBdXRvQXRsYXNDZmcuZ2V0UmVkUG9pbnRTcHJpdGVGcmFtZVVybChmYWNlU2tpbiwgcG9pbnQpKVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHN1aXQgPSAwOyBzdWl0IDwgNDsgKytzdWl0KSB7XG4gICAgICAgICAgICByZXNMaXN0LnB1c2goU29saXRhaXJlQXV0b0F0bGFzQ2ZnLmdldEZhY2VTdWl0U3ByaXRGcmFtZVVybChmYWNlU2tpbiwgc3VpdCkpXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgcG9pbnQgPSAxMTsgcG9pbnQgPD0gMTM7ICsrcG9pbnQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHN1aXQgPSAwOyBzdWl0IDwgNDsgKytzdWl0KSB7XG4gICAgICAgICAgICAgICAgcmVzTGlzdC5wdXNoKFNvbGl0YWlyZUF1dG9BdGxhc0NmZy5nZXRKUUtTcHJpdGVGcmFtZVVybChmYWNlU2tpbiwgc3VpdCwgcG9pbnQpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNMaXN0O1xuICAgIH1cblxuICAgIEV4dGVuZFNraW5MaXN0KG9uQ29tcGxldGVkOiAoc2tpbkluZGV4OiBudW1iZXIpPT52b2lkKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KCF0aGlzLklzTWF4U2tpbkxlbmd0aCk7XG4gICAgICAgIHRoaXMuZGF0YS5za2luTGlzdC5wdXNoKHRoaXMuUmFuZG9tKHtcbiAgICAgICAgICAgIGZhY2VTa2luOiAwLFxuICAgICAgICAgICAgYmdTa2luOiAwLFxuICAgICAgICAgICAgYmdQYXR0ZXJuU2tpbjogLTEsXG4gICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIiwgaW5kZXg6IDAgfSxcbiAgICAgICAgICAgIGZyb250U2tpbjogMCxcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLm1hcmtEaXJ0eSgwKTtcbiAgICAgICAgb25Db21wbGV0ZWQodGhpcy5Ta2luTGlzdC5sZW5ndGgtMSk7XG4gICAgfVxuXG4gICAgU2VsZWN0U2tpbkluZGV4KHNraW5JbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2tpbkluZGV4QlYudiA9IHNraW5JbmRleDtcbiAgICAgICAgdGhpcy5tYXJrRGlydHkoMSk7XG4gICAgfVxuXG4gICAgU2F2ZVNraW4oaW5kZXg6IG51bWJlciwgc2tpbjogU29saXRhaXJlU2tpbikge1xuICAgICAgICB0aGlzLmRhdGEuc2tpbkxpc3RbaW5kZXhdID0gdGhpcy5DbG9uZVNraW4oc2tpbik7XG4gICAgICAgIGlmKHRoaXMuc2tpbkluZGV4QlYudiA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2tpbkJWLnYgPSB0aGlzLmRhdGEuc2tpbkxpc3RbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFya0RpcnR5KDEpO1xuICAgIH1cblxuICAgIENsb25lU2tpbihza2luOiBTb2xpdGFpcmVTa2luKTogU29saXRhaXJlU2tpbiB7XG4gICAgICAgIGxldCBfc2tpbjogU29saXRhaXJlU2tpbiA9IHtcbiAgICAgICAgICAgIGZhY2VTa2luOiBza2luLmZhY2VTa2luLFxuICAgICAgICAgICAgYmdTa2luOiBza2luLmJnU2tpbixcbiAgICAgICAgICAgIGJnUGF0dGVyblNraW46IHNraW4uYmdQYXR0ZXJuU2tpbixcbiAgICAgICAgICAgIGJhY2tTa2luOiB7XG4gICAgICAgICAgICAgICAga2luZDpza2luLmJhY2tTa2luLmtpbmQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHNraW4uYmFja1NraW4uaW5kZXhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9udFNraW46IHNraW4uZnJvbnRTa2luXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9za2luO1xuICAgIH1cbiAgICBJc0luaXRTa2luQ2hhbmdlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuSXNTa2luQ2hhbmdlZCh0aGlzLmluaXRTa2luLCB0aGlzLnNraW5CVi52KTsgfVxuICAgIElzU2tpbkNoYW5nZWQocHJlc2tpbjogU29saXRhaXJlU2tpbiwgc2tpbjogU29saXRhaXJlU2tpbik6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuX19Jc1NhbWVTa2luKHByZXNraW4sIHNraW4pOyB9XG4gICAgcHJpdmF0ZSBfX0lzU2FtZVNraW4ocHJlc2tpbjogU29saXRhaXJlU2tpbiwgc2tpbjogU29saXRhaXJlU2tpbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcHJlc2tpbi5mYWNlU2tpbiA9PSBza2luLmZhY2VTa2luXG4gICAgICAgICAgICAmJiBwcmVza2luLmJnU2tpbiA9PSBza2luLmJnU2tpblxuICAgICAgICAgICAgJiYgcHJlc2tpbi5iZ1BhdHRlcm5Ta2luID09IHNraW4uYmdQYXR0ZXJuU2tpblxuICAgICAgICAgICAgJiYgcHJlc2tpbi5iYWNrU2tpbi5raW5kID09IHNraW4uYmFja1NraW4ua2luZFxuICAgICAgICAgICAgJiYgcHJlc2tpbi5iYWNrU2tpbi5pbmRleCA9PSBza2luLmJhY2tTa2luLmluZGV4XG4gICAgICAgICAgICAmJiBwcmVza2luLmZyb250U2tpbiA9PSBza2luLmZyb250U2tpblxuICAgIH1cblxuXG4gICAgLy8hIOmaj+aculxuICAgIFJhbmRvbShza2luOiBTb2xpdGFpcmVTa2luKTogU29saXRhaXJlU2tpbiB7XG4gICAgICAgIHNraW4uYmdTa2luID0gdGhpcy5nZXRSYW5kSW5kZXgoU29saXRhaXJlU3ByaXRlRnJhbWVDZmcuYmdTa2luTGVuZ3RoLCBza2luLmJnU2tpbik7XG4gICAgICAgIHNraW4uYmdQYXR0ZXJuU2tpbiA9IHRoaXMuZ2V0UmFuZEluZGV4KFNvbGl0YWlyZVNwcml0ZUZyYW1lQ2ZnLmJnUGF0dGVyblNraW5MZW5ndGgsIHNraW4uYmdQYXR0ZXJuU2tpbik7XG4gICAgICAgIHNraW4uZmFjZVNraW4gPSB0aGlzLmdldFJhbmRJbmRleChTb2xpdGFpcmVBdXRvQXRsYXNDZmcuRmFjZVNraW5DbnQsIHNraW4uZmFjZVNraW4pO1xuXG4gICAgICAgIC8vIGJhY2tcbiAgICAgICAgbGV0IGJhY2tTa2luS2luZCA9IHNraW4uYmFja1NraW4ua2luZDtcbiAgICAgICAgbGV0IGJhY2tTa2luSW5kZXggPSBza2luLmJhY2tTa2luLmluZGV4O1xuICAgICAgICBsZXQga2luZExpc3QgPSBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5wb2tlckJhY2tLaW5kQ2ZnO1xuICAgICAgICBmb3IobGV0IGtpPTA7IGtpPGtpbmRMaXN0Lmxlbmd0aDsgKytraSkge1xuICAgICAgICAgICAgaWYoa2luZExpc3Rba2ldLmtpbmQgPT0gYmFja1NraW5LaW5kKXtcbiAgICAgICAgICAgICAgICBpZihiYWNrU2tpbkluZGV4IDwga2luZExpc3Rba2ldLmNvdW50LTEpe1xuICAgICAgICAgICAgICAgICAgICBza2luLmJhY2tTa2luLmluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBza2luO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBza2luLmJhY2tTa2luLmtpbmQgPSBraW5kTGlzdFsoa2krMSkla2luZExpc3QubGVuZ3RoXS5raW5kO1xuICAgICAgICAgICAgICAgICAgICBza2luLmJhY2tTa2luLmluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNraW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBza2luO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmFuZEluZGV4KGxlbmd0aDogbnVtYmVyLCBjdXJyZW50VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZihsZW5ndGggPD0gMSl7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbCA9IGlpLnJhbmQuSW50QmV0d2VlbigwLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gKHZhbCklbGVuZ3RoXG4gICAgfVxufVxuIl19