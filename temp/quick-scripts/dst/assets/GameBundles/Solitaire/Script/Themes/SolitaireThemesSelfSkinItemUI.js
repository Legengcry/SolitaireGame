
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinItemUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27383+MJYZNMb/q/i3FPgcp', 'SolitaireThemesSelfSkinItemUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinItemUI.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireLogic_1 = require("../Logic/SolitaireLogic");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var UISettingToggle_1 = require("../_Public/Component/UISettingToggle");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesSelfSkinItemUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesSelfSkinItemUI, _super);
    function SolitaireThemesSelfSkinItemUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._content = null;
        _this._titleLabel = null;
        _this._toggle = null;
        _this.m_Effect = null;
        return _this;
    }
    SolitaireThemesSelfSkinItemUI.prototype.OnCreate = function () { };
    SolitaireThemesSelfSkinItemUI.prototype.OnRelease = function () { };
    SolitaireThemesSelfSkinItemUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnEdit", this.OnClickEdit.bind(this));
        this._titleLabel.string = "" + (this.args.index === 0 ? "Default Theme" : "Theme - " + this.args.index);
        this._toggle.Init(this.args.index === SolitaireLogic_1.SolitaireLogic.skin.skinIndexBV.v, function (isOn) {
            SolitaireLogic_1.SolitaireLogic.skin.SelectSkinIndex(_this.args.index);
        });
        this.BindBV(SolitaireLogic_1.SolitaireLogic.skin.skinIndexBV, function (skinIndex) {
            _this._toggle.SyncUI(_this.args.index === skinIndex);
            _this._toggle.SetBlockInput(_this.args.index === skinIndex);
        }, true);
        this.m_Effect = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectUI.key, {
            skin: this.args.skin
        }, this._content).CloseBy(this);
    };
    SolitaireThemesSelfSkinItemUI.prototype.OnClickEdit = function () {
        this.args.OnClickEdit(this.args.index);
    };
    SolitaireThemesSelfSkinItemUI.prototype.RefreshUI = function (skin) {
        this.args.skin = skin;
        this.m_Effect.SetSkin(skin);
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesSelfSkinItemUI.prototype, "_content", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireThemesSelfSkinItemUI.prototype, "_titleLabel", void 0);
    __decorate([
        property({ type: UISettingToggle_1.default, visible: true })
    ], SolitaireThemesSelfSkinItemUI.prototype, "_toggle", void 0);
    SolitaireThemesSelfSkinItemUI = __decorate([
        ccclass
    ], SolitaireThemesSelfSkinItemUI);
    return SolitaireThemesSelfSkinItemUI;
}(ii.UIComp));
exports.default = SolitaireThemesSelfSkinItemUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luSXRlbVVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBEQUF5RDtBQUN6RCw0REFBMkQ7QUFDM0Qsd0VBQW1FO0FBRzdELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBTzFDO0lBQTJELGlEQUE0QztJQUF2RztRQUFBLHFFQWtDQztRQWpDa0QsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN4QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUN0QixhQUFPLEdBQW9CLElBQUksQ0FBQTtRQUU5RSxjQUFRLEdBQTRCLElBQUksQ0FBQzs7SUE2QnJELENBQUM7SUEzQmEsZ0RBQVEsR0FBbEIsY0FBNkIsQ0FBQztJQUNwQixpREFBUyxHQUFuQixjQUE4QixDQUFDO0lBQ3JCLDhDQUFNLEdBQWhCLFVBQWlCLE1BQXlDO1FBQTFELGlCQWVDO1FBZEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGFBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFPLENBQUUsQ0FBQztRQUN0RyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSywrQkFBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFVBQUEsSUFBSTtZQUN6RSwrQkFBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsK0JBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUEsU0FBUztZQUNsRCxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQTtRQUM3RCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBdUQsdUNBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0ksSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtTQUN2QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLG1EQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsaURBQVMsR0FBVCxVQUFVLElBQW1CO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBaENzQztRQUF0QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7bUVBQWtDO0lBQ2hDO1FBQXZDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztzRUFBc0M7SUFDOUI7UUFBOUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLHlCQUFlLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2tFQUF3QztJQUhyRSw2QkFBNkI7UUFEakQsT0FBTztPQUNhLDZCQUE2QixDQWtDakQ7SUFBRCxvQ0FBQztDQWxDRCxBQWtDQyxDQWxDMEQsRUFBRSxDQUFDLE1BQU0sR0FrQ25FO2tCQWxDb0IsNkJBQTZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlU2tpbiB9IGZyb20gXCIuLi9EYXRhQ2FjaGUvU29saXRhaXJlU2tpbkRhdGFDYWNoZVwiO1xuaW1wb3J0IHsgU29saXRhaXJlTG9naWMgfSBmcm9tIFwiLi4vTG9naWMvU29saXRhaXJlTG9naWNcIjtcbmltcG9ydCB7IFNvbGl0YWlyZVByZWZhYkNmZyB9IGZyb20gXCIuLi9Tb2xpdGFpcmVQcmVmYWJDZmdcIjtcbmltcG9ydCBVSVNldHRpbmdUb2dnbGUgZnJvbSBcIi4uL19QdWJsaWMvQ29tcG9uZW50L1VJU2V0dGluZ1RvZ2dsZVwiO1xuaW1wb3J0IFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJLCB7IFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJQXJncyB9IGZyb20gXCIuL1NvbGl0YWlyZVRoZW1lc0VmZmVjdFVJXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuZXhwb3J0IHR5cGUgU29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUlBcmdzID0ge1xuICAgIHNraW46IFNvbGl0YWlyZVNraW4sXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBPbkNsaWNrRWRpdDogKGluZGV4OiBudW1iZXIpPT52b2lkXG59XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUkgZXh0ZW5kcyBpaS5VSUNvbXA8U29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUlBcmdzPiB7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfY29udGVudDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX3RpdGxlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6VUlTZXR0aW5nVG9nZ2xlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX3RvZ2dsZTogVUlTZXR0aW5nVG9nZ2xlID0gbnVsbFxuICAgIFxuICAgIHByaXZhdGUgbV9FZmZlY3Q6IFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogU29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUlBcmdzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkVkaXRcIiwgdGhpcy5PbkNsaWNrRWRpdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fdGl0bGVMYWJlbC5zdHJpbmcgPSBgJHt0aGlzLmFyZ3MuaW5kZXggPT09IDAgPyBcIkRlZmF1bHQgVGhlbWVcIiA6IGBUaGVtZSAtICR7dGhpcy5hcmdzLmluZGV4fWB9YDtcbiAgICAgICAgdGhpcy5fdG9nZ2xlLkluaXQodGhpcy5hcmdzLmluZGV4ID09PSBTb2xpdGFpcmVMb2dpYy5za2luLnNraW5JbmRleEJWLnYsIGlzT24gPT4ge1xuICAgICAgICAgICAgU29saXRhaXJlTG9naWMuc2tpbi5TZWxlY3RTa2luSW5kZXgodGhpcy5hcmdzLmluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5CaW5kQlYoU29saXRhaXJlTG9naWMuc2tpbi5za2luSW5kZXhCViwgc2tpbkluZGV4ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RvZ2dsZS5TeW5jVUkodGhpcy5hcmdzLmluZGV4ID09PSBza2luSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlLlNldEJsb2NrSW5wdXQodGhpcy5hcmdzLmluZGV4ID09PSBza2luSW5kZXgpXG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHRoaXMubV9FZmZlY3QgPSBpaS5VSU1nci5pbnMuQ3JlYXRlPFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJLCBTb2xpdGFpcmVUaGVtZXNFZmZlY3RVSUFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5Tb2xpdGFpcmVUaGVtZXNFZmZlY3RVSS5rZXksIHtcbiAgICAgICAgICAgIHNraW46IHRoaXMuYXJncy5za2luXG4gICAgICAgIH0sIHRoaXMuX2NvbnRlbnQpLkNsb3NlQnkodGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPbkNsaWNrRWRpdCgpIHtcbiAgICAgICAgdGhpcy5hcmdzLk9uQ2xpY2tFZGl0KHRoaXMuYXJncy5pbmRleCk7XG4gICAgfVxuXG4gICAgUmVmcmVzaFVJKHNraW46IFNvbGl0YWlyZVNraW4pIHtcbiAgICAgICAgdGhpcy5hcmdzLnNraW4gPSBza2luO1xuICAgICAgICB0aGlzLm1fRWZmZWN0LlNldFNraW4oc2tpbik7XG4gICAgfVxufVxuIl19