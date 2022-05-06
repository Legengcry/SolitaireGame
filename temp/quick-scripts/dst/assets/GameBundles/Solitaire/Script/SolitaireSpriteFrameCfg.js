
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitaireSpriteFrameCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtJQUFBO0lBeURBLENBQUM7SUF4REcsV0FBVztJQUNJLGdDQUFRLEdBQXZCLFVBQXdCLEdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFN0Qsc0JBQVcsNkJBQUU7YUFBYjtZQUFBLGlCQVdDO1lBVkcsSUFBRyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUE7Z0JBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7b0JBQzVCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQUU7Z0JBQ25GLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztnQkFDWCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUFFLENBQUMsUUFBUTtnQkFDM0YsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENB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QUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztRQUM1QixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztRQUMxQixFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztRQUM1QixFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztRQUN6QixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztLQUM5QixDQUFBO0lBSUQsVUFBVTtJQUNNLHdDQUFnQixHQUFXLENBQUMsQ0FBQztJQVFqRCw4QkFBQztDQXpERCxBQXlEQyxJQUFBO0FBekRZLDBEQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIFRQb2tlckJhY2tTa2luID0ge2tpbmQ6c3RyaW5nLCBpbmRleDogbnVtYmVyfVxuZXhwb3J0IHR5cGUgVFBva2VyQmFja1NraW5LaW5kID0geyBraW5kOiBzdHJpbmcsIGNvdW50OiBudW1iZXIgfVxuXG5leHBvcnQgY2xhc3MgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcge1xuICAgIC8vISDmiYDmnInnmoTnsr7ngbXphY3nva5cbiAgICBwcml2YXRlIHN0YXRpYyBfX0FkZEtleShrZXk6IHN0cmluZykgeyB0aGlzLl9zcFtrZXldID0ga2V5OyB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NwOiBpaS5TdHJpbmdLZXlEaWN0PHN0cmluZz4gPSBudWxsO1xuICAgIHN0YXRpYyBnZXQgc3AoKTogaWkuU3RyaW5nS2V5RGljdDxzdHJpbmc+IHtcbiAgICAgICAgaWYodGhpcy5fc3AgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NwID0ge31cbiAgICAgICAgICAgIHRoaXMucG9rZXJCYWNrS2luZENmZy5mb3JFYWNoKGl0PT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxpdC5jb3VudDsrK2kpIHsgdGhpcy5fX0FkZEtleSh0aGlzLl9fcG9rZXJCYWNrVXJsKGl0LmtpbmQsIGkpKTsgfVxuICAgICAgICAgICAgfSk7IC8vIGJhY2tcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5wb2tlckZyb250TGVuZ3RoOysraSkgeyB0aGlzLl9fQWRkS2V5KHRoaXMucG9rZXJGcm9udFVybChpKSk7IH0gLy8gZnJvbnRcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5iZ1NraW5MZW5ndGg7KytpKSB7IHRoaXMuX19BZGRLZXkodGhpcy5iZ1NraW5VcmwoaSkpOyB9IC8vIGJnXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuYmdQYXR0ZXJuU2tpbkxlbmd0aDsrK2kpIHsgdGhpcy5fX0FkZEtleSh0aGlzLmJnUGF0dGVyblNraW5VcmwoaSkpOyB0aGlzLl9fQWRkS2V5KHRoaXMuYmdQYXR0ZXJuUHJldmlld1NraW5VcmwoaSkpIH0gLy8gYmdQYXR0ZXJuIC8gYmdQYXR0ZXJuUHJldmlld1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zcDtcbiAgICB9XG5cbiAgICAvLyEg5rOo5YaM5o6l5Y+jXG4gICAgc3RhdGljIFJlZ2lzdGVyKGJ1bmRsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmluZm8oYFNvbGl0YWlyZVNwcml0ZUZyYW1lQ2ZnOjpSZWdpc3Rlcigke2J1bmRsZU5hbWV9KSA+PiDms6jlhowgU3ByaXRlRnJhbWUg6LWE5rqQYClcbiAgICAgICAgaWkucmVnaXN0ZXJSZXNEaWN0KHRoaXMuc3AsIGJ1bmRsZU5hbWUsIGlpLkVSZXNUeXBlLlNwcml0ZUZyYW1lKTtcbiAgICB9XG5cbiAgICAvLyEg5qGM6Z2i6IOM5pmvXG4gICAgc3RhdGljIHJlYWRvbmx5IGJnU2tpbkxlbmd0aDogbnVtYmVyID0gMjc7XG4gICAgc3RhdGljIGJnU2tpblVybChiZ1NraW46IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgc2tpbl9iZy9za2luX2JnXyR7YmdTa2lufWAgfVxuXG4gICAgLy8hIOahjOmdouiDjOaZr+iKsee6uVxuICAgIHN0YXRpYyByZWFkb25seSBiZ1BhdHRlcm5Ta2luTGVuZ3RoOiBudW1iZXIgPSAxNDtcbiAgICBzdGF0aWMgYmdQYXR0ZXJuU2tpblVybChiZ1BhdHRlcm5Ta2luOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gYHNraW5fYmdfcGF0dGVybi9za2luX2JnX3BhdHRlcm5fJHtiZ1BhdHRlcm5Ta2lufWAgfVxuICAgIHN0YXRpYyBiZ1BhdHRlcm5QcmV2aWV3U2tpblVybChiZ1BhdHRlcm5Ta2luOiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gYHNraW5fYmdfcGF0dGVybl9wcmV2aWV3L3NraW5fYmdfcGF0dGVybl9wcmV2aWV3XyR7YmdQYXR0ZXJuU2tpbn1gIH1cblxuICAgIC8vISDmiZHlhYvniYznmoTog4zpnaJcbiAgICBzdGF0aWMgcmVhZG9ubHkgcG9rZXJCYWNrS2luZENmZzogVFBva2VyQmFja1NraW5LaW5kW10gPSBbXG4gICAgICAgIHtraW5kOiBcImNsYXNzaWNcIiwgY291bnQ6IDEwfSxcbiAgICAgICAge2tpbmQ6IFwiYW5pbWFsc1wiLCBjb3VudDogMTB9LFxuICAgICAgICB7a2luZDogXCJhcnRpc3RpY1wiLCBjb3VudDogMTB9LFxuICAgICAgICB7a2luZDogXCJjaHJpc3RtYXNcIiwgY291bnQ6IDEwfSxcbiAgICAgICAge2tpbmQ6IFwiZm9vZFwiLCBjb3VudDogMTB9LFxuICAgICAgICB7a2luZDogXCJuYXR1cmFsXCIsIGNvdW50OiAxMH0sXG4gICAgICAgIHtraW5kOiBcIm5vdmVsXCIsIGNvdW50OiAxMH0sXG4gICAgICAgIHtraW5kOiBcInBhdHRlcm5cIiwgY291bnQ6IDEwfSxcbiAgICAgICAge2tpbmQ6IFwic25vd1wiLCBjb3VudDogMTB9LFxuICAgICAgICB7a2luZDogXCJzcG9ydHlcIiwgY291bnQ6IDEwfVxuICAgIF1cbiAgICBwcml2YXRlIHN0YXRpYyBfX3Bva2VyQmFja1VybChraW5kOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gYHBva2VyX2JnL3Bva2VyXyR7a2luZH1fJHtpbmRleH1gIH1cbiAgICBzdGF0aWMgcG9rZXJCYWNrVXJsKGJhY2tTa2luOiBUUG9rZXJCYWNrU2tpbik6IHN0cmluZyB7IHJldHVybiB0aGlzLl9fcG9rZXJCYWNrVXJsKGJhY2tTa2luLmtpbmQsIGJhY2tTa2luLmluZGV4KTsgfVxuXG4gICAgLy8hIOaJkeWFi+eJjOeahOato+mdolxuICAgIHN0YXRpYyByZWFkb25seSBwb2tlckZyb250TGVuZ3RoOiBudW1iZXIgPSAyO1xuICAgIHN0YXRpYyBwb2tlckZyb250VXJsKGZyb250U2tpbjogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGBwb2tlcl9mcm9udC9wb2tlcl9mcm9udF8ke2Zyb250U2tpbn1gIH1cblxuICAgIC8vISDmiZHlhYvniYznmoToirHoibLjgIHnuqLpu5HmlbDlrZfjgIFKUUtcbiAgICBzdGF0aWMgZ2V0RmFjZVN1aXRTcHJpdEZyYW1lVXJsKGZhY2VTa2luOiBudW1iZXIsIHN1aXQ6IG51bWJlcikgeyByZXR1cm4gYEF1dG9BdGxhcy9wX2ZhY2UvcF9mYWNlXyR7ZmFjZVNraW59XyR7c3VpdH1gIH1cbiAgICBzdGF0aWMgZ2V0SlFLU3ByaXRlRnJhbWVVcmwoZmFjZVNraW46IG51bWJlciwgc3VpdDogbnVtYmVyLCBwb2ludDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGBBdXRvQXRsYXMvcF9mYWNlX3BvaW50L3BfZmFjZV9wb2ludF8ke2ZhY2VTa2lufV8ke3N1aXR9XyR7cG9pbnR9YCB9XG4gICAgc3RhdGljIGdldEJsYWNrUG9pbnRTcHJpdGVGcmFtZVVybChmYWNlU2tpbjogbnVtYmVyLCBwb2ludDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGBBdXRvQXRsYXMvcF9udW0vcF9udW1fJHtmYWNlU2tpbn1fYl8ke3BvaW50fWAgfVxuICAgIHN0YXRpYyBnZXRSZWRQb2ludFNwcml0ZUZyYW1lVXJsKGZhY2VTa2luOiBudW1iZXIsIHBvaW50OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gYEF1dG9BdGxhcy9wX251bS9wX251bV8ke2ZhY2VTa2lufV9yXyR7cG9pbnR9YCB9XG59XG4iXX0=