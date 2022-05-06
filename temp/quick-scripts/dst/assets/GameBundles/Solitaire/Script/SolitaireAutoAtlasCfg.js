
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitaireAutoAtlasCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVBdXRvQXRsYXNDZmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQTBDQSxDQUFDO0lBdENHLHNCQUFXLDJCQUFFO2FBQWI7WUFDSSxJQUFHLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtnQkFDYixTQUFTO2dCQUNULEtBQUksSUFBSSxRQUFRLEdBQUMsQ0FBQyxFQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUUsUUFBUSxFQUFFO29CQUNyRCxLQUFJLElBQUksSUFBSSxHQUFDLENBQUMsRUFBRSxJQUFJLEdBQUMsQ0FBQyxFQUFDLEVBQUUsSUFBSSxFQUFFO3dCQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDcEIsTUFBTTt3QkFDTixLQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLElBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFOzRCQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQzs0QkFDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7eUJBQ3ZCO3FCQUNKO2lCQUNKO2dCQUVELFFBQVE7Z0JBQ1IsS0FBSSxJQUFJLFFBQVEsR0FBQyxDQUFDLEVBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBRSxRQUFRLEVBQUU7b0JBQ3JELEtBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUU7d0JBQ25DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxRQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDM0I7aUJBQ0o7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVNLDhDQUF3QixHQUEvQixVQUFnQyxRQUFnQixFQUFFLElBQVksSUFBSSxPQUFPLG1CQUFpQixRQUFRLFNBQUksSUFBTSxDQUFBLENBQUMsQ0FBQztJQUN2RywwQ0FBb0IsR0FBM0IsVUFBNEIsUUFBZ0IsRUFBRSxJQUFZLEVBQUUsS0FBYSxJQUFZLE9BQU8sK0JBQTZCLFFBQVEsU0FBSSxJQUFJLFNBQUksS0FBTyxDQUFBLENBQUMsQ0FBQztJQUMvSSxpREFBMkIsR0FBbEMsVUFBbUMsUUFBZ0IsRUFBRSxLQUFhLElBQVksT0FBTyxpQkFBZSxRQUFRLFdBQU0sS0FBTyxDQUFBLENBQUMsQ0FBQztJQUNwSCwrQ0FBeUIsR0FBaEMsVUFBaUMsUUFBZ0IsRUFBRSxLQUFhLElBQVksT0FBTyxpQkFBZSxRQUFRLFdBQU0sS0FBTyxDQUFBLENBQUMsQ0FBQztJQUVsSCw4QkFBUSxHQUFmLFVBQWdCLFVBQWtCO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMscUNBQW1DLFVBQVUsNkNBQXNCLENBQUMsQ0FBQTtRQUNqRixFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQXhDZSxpQ0FBVyxHQUFXLENBQUMsQ0FBQztJQUN4QyxXQUFXO0lBQ0kseUJBQUcsR0FBNkIsSUFBSSxDQUFDO0lBdUN4RCw0QkFBQztDQTFDRCxBQTBDQyxJQUFBO0FBMUNZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTb2xpdGFpcmVBdXRvQXRsYXNDZmcge1xuICAgIHN0YXRpYyByZWFkb25seSBGYWNlU2tpbkNudDogbnVtYmVyID0gNDtcbiAgICAvLyEg5omA5pyJ55qE57K+54G16YWN572uXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3NwOiBpaS5TdHJpbmdLZXlEaWN0PHN0cmluZz4gPSBudWxsO1xuICAgIHN0YXRpYyBnZXQgc3AoKTogaWkuU3RyaW5nS2V5RGljdDxzdHJpbmc+IHtcbiAgICAgICAgaWYodGhpcy5fc3AgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NwID0ge31cbiAgICAgICAgICAgIC8vIHBfZmFjZVxuICAgICAgICAgICAgZm9yKGxldCBmYWNlU2tpbj0wO2ZhY2VTa2luPHRoaXMuRmFjZVNraW5DbnQ7KytmYWNlU2tpbikge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgc3VpdD0wOyBzdWl0PDQ7KytzdWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLmdldEZhY2VTdWl0U3ByaXRGcmFtZVVybChmYWNlU2tpbixzdWl0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3Bba2V5XSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgLy8ganFrXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgcG9pbnQgPSAxMTsgcG9pbnQ8PTEzOyArK3BvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQganFrID0gdGhpcy5nZXRKUUtTcHJpdGVGcmFtZVVybChmYWNlU2tpbixzdWl0LHBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwW2pxa10gPSBqcWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHBfbnVtXG4gICAgICAgICAgICBmb3IobGV0IGZhY2VTa2luPTA7ZmFjZVNraW48dGhpcy5GYWNlU2tpbkNudDsrK2ZhY2VTa2luKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwb2ludCA9IDE7IHBvaW50PD0xMzsgKytwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5X2IgPSB0aGlzLmdldEJsYWNrUG9pbnRTcHJpdGVGcmFtZVVybChmYWNlU2tpbixwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwW2tleV9iXSA9IGtleV9iO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5X3IgPSB0aGlzLmdldFJlZFBvaW50U3ByaXRlRnJhbWVVcmwoZmFjZVNraW4scG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcFtrZXlfcl0gPSBrZXlfcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRGYWNlU3VpdFNwcml0RnJhbWVVcmwoZmFjZVNraW46IG51bWJlciwgc3VpdDogbnVtYmVyKSB7IHJldHVybiBgcF9mYWNlL3BfZmFjZV8ke2ZhY2VTa2lufV8ke3N1aXR9YCB9XG4gICAgc3RhdGljIGdldEpRS1Nwcml0ZUZyYW1lVXJsKGZhY2VTa2luOiBudW1iZXIsIHN1aXQ6IG51bWJlciwgcG9pbnQ6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgcF9mYWNlX3BvaW50L3BfZmFjZV9wb2ludF8ke2ZhY2VTa2lufV8ke3N1aXR9XyR7cG9pbnR9YCB9XG4gICAgc3RhdGljIGdldEJsYWNrUG9pbnRTcHJpdGVGcmFtZVVybChmYWNlU2tpbjogbnVtYmVyLCBwb2ludDogbnVtYmVyKTogc3RyaW5nIHsgcmV0dXJuIGBwX251bS9wX251bV8ke2ZhY2VTa2lufV9iXyR7cG9pbnR9YCB9XG4gICAgc3RhdGljIGdldFJlZFBvaW50U3ByaXRlRnJhbWVVcmwoZmFjZVNraW46IG51bWJlciwgcG9pbnQ6IG51bWJlcik6IHN0cmluZyB7IHJldHVybiBgcF9udW0vcF9udW1fJHtmYWNlU2tpbn1fcl8ke3BvaW50fWAgfVxuXG4gICAgc3RhdGljIFJlZ2lzdGVyKGJ1bmRsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmluZm8oYFNvbGl0YWlyZUF1dG9BdGxhc0NmZzo6UmVnaXN0ZXIoJHtidW5kbGVOYW1lfSkgPj4g5rOo5YaMIEF1dG9BdGxhcyDotYTmupBgKVxuICAgICAgICBpaS5yZWdpc3RlclJlc0RpY3QodGhpcy5zcCwgYnVuZGxlTmFtZSwgaWkuRVJlc1R5cGUuQXV0b0F0bGFzKTtcbiAgICB9XG59XG4iXX0=