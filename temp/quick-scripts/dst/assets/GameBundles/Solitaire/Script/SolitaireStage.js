
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitaireStage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a548vlMWdMK6N371fcjjRt', 'SolitaireStage');
// GameBundles/Solitaire/Script/SolitaireStage.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireAutoPlayerDataCache_1 = require("./DataCache/SolitaireAutoPlayerDataCache");
var SolitaireDataCache_1 = require("./DataCache/SolitaireDataCache");
var SolitaireSkinDataCache_1 = require("./DataCache/SolitaireSkinDataCache");
var SolitaireLogic_1 = require("./Logic/SolitaireLogic");
var SolitaireAudioCfg_1 = require("./SolitaireAudioCfg");
var SolitaireAutoAtlasCfg_1 = require("./SolitaireAutoAtlasCfg");
var SolitaireCfg_1 = require("./SolitaireCfg");
var SolitaireJsonCfg_1 = require("./SolitaireJsonCfg");
var SolitaireLangCfg_1 = require("./SolitaireLangCfg");
var SolitairePrefabCfg_1 = require("./SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("./SolitaireSpriteFrameCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireStage = /** @class */ (function (_super) {
    __extends(SolitaireStage, _super);
    function SolitaireStage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SolitaireStage.prototype.GetDefaultEffectAudioKey = function () { return SolitaireAudioCfg_1.SolitaireAudioCfg.effect.default; };
    SolitaireStage.prototype.OnInit = function (onUICompleted, args) {
        console.info("Solitaire::OnInit");
        SolitaireAudioCfg_1.SolitaireAudioCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireLangCfg_1.SolitaireLangCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireJsonCfg_1.SolitaireJsonCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitairePrefabCfg_1.SolitairePrefabCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.Register(SolitaireCfg_1.SolitaireCfg.BUNDLE_NAME);
        // 数据准备
        this.AddAutoReleaseDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_DATACACHE, SolitaireDataCache_1.SolitaireDataCache);
        this.AddAutoReleaseDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_SKIN_DATACACHE, SolitaireSkinDataCache_1.SolitaireSkinDataCache);
        this.AddAutoReleaseDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_AUTOPLAYER_DATACACHE, SolitaireAutoPlayerDataCache_1.SolitaireAutoPlayerDataCache);
        this.LoadResList(__spreadArrays(ii.resDict2ResKeyList(SolitaireJsonCfg_1.SolitaireJsonCfg.key), ii.resDict2ResKeyList(SolitaireLangCfg_1.SolitaireLangCfg.lang), ii.prefabCfg2ResKeyList(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp), ii.resDict2ResKeyList(SolitaireAudioCfg_1.SolitaireAudioCfg.effect), SolitaireLogic_1.SolitaireLogic.skin.GetPreloadResList()), function () {
            // 背景音乐
            ii.AudioMgr.ins.playMusic(SolitaireAudioCfg_1.SolitaireAudioCfg.music.default);
            ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key, null, onUICompleted);
        });
    };
    SolitaireStage = __decorate([
        ccclass
    ], SolitaireStage);
    return SolitaireStage;
}(ii.UIStage));
exports.default = SolitaireStage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVTdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUZBQXdGO0FBQ3hGLHFFQUFvRTtBQUNwRSw2RUFBNEU7QUFDNUUseURBQXdEO0FBQ3hELHlEQUF3RDtBQUN4RCxpRUFBZ0U7QUFDaEUsK0NBQThDO0FBQzlDLHVEQUFzRDtBQUN0RCx1REFBc0Q7QUFDdEQsMkRBQTBEO0FBQzFELHFFQUFvRTtBQUU5RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBVTtJQUF0RDs7SUE2QkEsQ0FBQztJQTVCYSxpREFBd0IsR0FBbEMsY0FBK0MsT0FBTyxxQ0FBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUUvRSwrQkFBTSxHQUFoQixVQUFpQixhQUF1QixFQUFFLElBQVU7UUFDaEQsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ2pDLHFDQUFpQixDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELG1DQUFnQixDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELG1DQUFnQixDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELHVDQUFrQixDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELGlEQUF1QixDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELDZDQUFxQixDQUFDLFFBQVEsQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpELE9BQU87UUFDUCxJQUFJLENBQUMsdUJBQXVCLENBQUMsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSx1Q0FBa0IsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyx1QkFBdUIsQ0FBQywyQkFBWSxDQUFDLHdCQUF3QixFQUFFLCtDQUFzQixDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLDJCQUFZLENBQUMsOEJBQThCLEVBQUUsMkRBQTRCLENBQUMsQ0FBQztRQUV4RyxJQUFJLENBQUMsV0FBVyxnQkFDVCxFQUFFLENBQUMsa0JBQWtCLENBQUMsbUNBQWdCLENBQUMsR0FBRyxDQUFDLEVBQ3pDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxtQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsRUFDNUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLHVDQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDcEQsRUFBRSxDQUFDLGtCQUFrQixDQUFDLHFDQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUMvQywrQkFBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUM3QztZQUNDLE9BQU87WUFDUCxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMscUNBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbEcsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBNUJnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBNkJsQztJQUFELHFCQUFDO0NBN0JELEFBNkJDLENBN0IyQyxFQUFFLENBQUMsT0FBTyxHQTZCckQ7a0JBN0JvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlQXV0b1BsYXllckRhdGFDYWNoZSB9IGZyb20gXCIuL0RhdGFDYWNoZS9Tb2xpdGFpcmVBdXRvUGxheWVyRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVEYXRhQ2FjaGUgfSBmcm9tIFwiLi9EYXRhQ2FjaGUvU29saXRhaXJlRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVTa2luRGF0YUNhY2hlIH0gZnJvbSBcIi4vRGF0YUNhY2hlL1NvbGl0YWlyZVNraW5EYXRhQ2FjaGVcIjtcbmltcG9ydCB7IFNvbGl0YWlyZUxvZ2ljIH0gZnJvbSBcIi4vTG9naWMvU29saXRhaXJlTG9naWNcIjtcbmltcG9ydCB7IFNvbGl0YWlyZUF1ZGlvQ2ZnIH0gZnJvbSBcIi4vU29saXRhaXJlQXVkaW9DZmdcIjtcbmltcG9ydCB7IFNvbGl0YWlyZUF1dG9BdGxhc0NmZyB9IGZyb20gXCIuL1NvbGl0YWlyZUF1dG9BdGxhc0NmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlQ2ZnIH0gZnJvbSBcIi4vU29saXRhaXJlQ2ZnXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVKc29uQ2ZnIH0gZnJvbSBcIi4vU29saXRhaXJlSnNvbkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlTGFuZ0NmZyB9IGZyb20gXCIuL1NvbGl0YWlyZUxhbmdDZmdcIjtcbmltcG9ydCB7IFNvbGl0YWlyZVByZWZhYkNmZyB9IGZyb20gXCIuL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcgfSBmcm9tIFwiLi9Tb2xpdGFpcmVTcHJpdGVGcmFtZUNmZ1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbGl0YWlyZVN0YWdlIGV4dGVuZHMgaWkuVUlTdGFnZSB7XG4gICAgcHJvdGVjdGVkIEdldERlZmF1bHRFZmZlY3RBdWRpb0tleSgpOiBzdHJpbmcgeyByZXR1cm4gU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0LmRlZmF1bHQ7IH1cblxuICAgIHByb3RlY3RlZCBPbkluaXQob25VSUNvbXBsZXRlZDogRnVuY3Rpb24sIGFyZ3M/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiU29saXRhaXJlOjpPbkluaXRcIilcbiAgICAgICAgU29saXRhaXJlQXVkaW9DZmcuUmVnaXN0ZXIoU29saXRhaXJlQ2ZnLkJVTkRMRV9OQU1FKTtcbiAgICAgICAgU29saXRhaXJlTGFuZ0NmZy5SZWdpc3RlcihTb2xpdGFpcmVDZmcuQlVORExFX05BTUUpO1xuICAgICAgICBTb2xpdGFpcmVKc29uQ2ZnLlJlZ2lzdGVyKFNvbGl0YWlyZUNmZy5CVU5ETEVfTkFNRSk7XG4gICAgICAgIFNvbGl0YWlyZVByZWZhYkNmZy5SZWdpc3RlcihTb2xpdGFpcmVDZmcuQlVORExFX05BTUUpO1xuICAgICAgICBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5SZWdpc3RlcihTb2xpdGFpcmVDZmcuQlVORExFX05BTUUpO1xuICAgICAgICBTb2xpdGFpcmVBdXRvQXRsYXNDZmcuUmVnaXN0ZXIoU29saXRhaXJlQ2ZnLkJVTkRMRV9OQU1FKTtcbiAgICAgICAgXG4gICAgICAgIC8vIOaVsOaNruWHhuWkh1xuICAgICAgICB0aGlzLkFkZEF1dG9SZWxlYXNlRGF0YUNhY2hlKFNvbGl0YWlyZUNmZy5TT0xJVEFJUkVfREFUQUNBQ0hFLCBTb2xpdGFpcmVEYXRhQ2FjaGUpO1xuICAgICAgICB0aGlzLkFkZEF1dG9SZWxlYXNlRGF0YUNhY2hlKFNvbGl0YWlyZUNmZy5TT0xJVEFJUkVfU0tJTl9EQVRBQ0FDSEUsIFNvbGl0YWlyZVNraW5EYXRhQ2FjaGUpO1xuICAgICAgICB0aGlzLkFkZEF1dG9SZWxlYXNlRGF0YUNhY2hlKFNvbGl0YWlyZUNmZy5TT0xJVEFJUkVfQVVUT1BMQVlFUl9EQVRBQ0FDSEUsIFNvbGl0YWlyZUF1dG9QbGF5ZXJEYXRhQ2FjaGUpO1xuXG4gICAgICAgIHRoaXMuTG9hZFJlc0xpc3QoW1xuICAgICAgICAgICAgLi4uaWkucmVzRGljdDJSZXNLZXlMaXN0KFNvbGl0YWlyZUpzb25DZmcua2V5KVxuICAgICAgICAgICAgLCAuLi5paS5yZXNEaWN0MlJlc0tleUxpc3QoU29saXRhaXJlTGFuZ0NmZy5sYW5nKVxuICAgICAgICAgICAgLCAuLi5paS5wcmVmYWJDZmcyUmVzS2V5TGlzdChTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXApXG4gICAgICAgICAgICAsIC4uLmlpLnJlc0RpY3QyUmVzS2V5TGlzdChTb2xpdGFpcmVBdWRpb0NmZy5lZmZlY3QpXG4gICAgICAgICAgICAsIC4uLlNvbGl0YWlyZUxvZ2ljLnNraW4uR2V0UHJlbG9hZFJlc0xpc3QoKVxuICAgICAgICBdLCAoKT0+e1xuICAgICAgICAgICAgLy8g6IOM5pmv6Z+z5LmQXG4gICAgICAgICAgICBpaS5BdWRpb01nci5pbnMucGxheU11c2ljKFNvbGl0YWlyZUF1ZGlvQ2ZnLm11c2ljLmRlZmF1bHQpO1xuICAgICAgICAgICAgaWkuVUlNZ3IuaW5zLk9wZW4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5wYW5lbC5Tb2xpdGFpcmVNZW51VUlQYW5lbC5rZXksIG51bGwsIG9uVUlDb21wbGV0ZWQpO1xuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==