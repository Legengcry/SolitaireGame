
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesContentsUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9ec68YEO/tAN7BJ10qZeYol', 'SolitaireThemesContentsUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesContentsUI.ts

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
var UIThemeMenuItem_1 = require("./UIThemeMenuItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesContentsUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesContentsUI, _super);
    function SolitaireThemesContentsUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._resetRoot = null;
        _this._themeEffectRoot = null;
        _this.menuContentRoot = null;
        _this.menuItemList = [];
        _this.m_EffectUI = null;
        _this.m_menu = new Map();
        _this.m_selected = -1;
        _this.m_PreSkin = null;
        _this.m_Skin = null;
        _this.m_IsSkinChangedBV = null;
        return _this;
    }
    SolitaireThemesContentsUI.prototype.OnCreate = function () { };
    SolitaireThemesContentsUI.prototype.OnRelease = function () {
        this.__ReleaseMenu();
        this.m_selected = -1;
    };
    SolitaireThemesContentsUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnReset", this.OnReset.bind(this));
        this.SetIIClickHandler("OnRand", this.OnRand.bind(this));
        this.m_PreSkin = this.args.skin;
        this.m_Skin = SolitaireLogic_1.SolitaireLogic.skin.CloneSkin(this.args.skin);
        this.m_IsSkinChangedBV = ii.BooleanBV.Borrow(false).Bind(function (changed) { return _this._resetRoot.active = changed; }, true, this).ReturnBy(this);
        this.m_EffectUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectUI.key, { skin: this.m_Skin }, this._themeEffectRoot).CloseBy(this);
        this.menuItemList.forEach(function (menu) { return menu.Init(_this.m_selected, _this.OnClickMenu.bind(_this)); });
        this.Select(0);
    };
    SolitaireThemesContentsUI.prototype.__ReleaseMenu = function () {
        this.m_menu.forEach(function (menu) { return menu.Close(); });
        this.m_menu.clear();
    };
    SolitaireThemesContentsUI.prototype.Select = function (selectIndex) {
        if (selectIndex >= 0 && this.m_selected != selectIndex) {
            this.m_selected = selectIndex;
            this.menuItemList.forEach(function (menu) { return menu.OnSelect(selectIndex); });
            this.m_menu.forEach(function (menu) { return menu.node.active = false; });
            if (this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).node.active = true;
            }
            else {
                var content = null;
                switch (selectIndex) {
                    case 0:
                        content = this.__SelectContentPokerBack();
                        break;
                    case 1:
                        content = this.__SelectContentPokerFace();
                        break;
                    case 2:
                        content = this.__SelectContentBoards();
                        break;
                    default: break;
                }
                this.m_menu.set(selectIndex, content);
            }
        }
    };
    SolitaireThemesContentsUI.prototype.__SelectContentPokerBack = function () {
        var _this = this;
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBack.key, {
            backSkin: this.m_Skin.backSkin,
            OnSelect: function (content, backSkin) { return _this.OnSelectBackSkin(content, backSkin); }
        }, this.menuContentRoot);
    };
    SolitaireThemesContentsUI.prototype.__SelectContentPokerFace = function () {
        var _this = this;
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerFace.key, {
            faceSkin: this.m_Skin.faceSkin,
            OnSelect: function (content, faceSkin) { return _this.OnSelectFaceSkin(content, faceSkin); }
        }, this.menuContentRoot);
    };
    SolitaireThemesContentsUI.prototype.__SelectContentBoards = function () {
        var _this = this;
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoards.key, {
            bgSkin: this.m_Skin.bgSkin,
            bgPatternSkin: this.m_Skin.bgPatternSkin,
            OnSelectBG: function (content, bgSkin) { return _this.OnSelectBGSkin(content, bgSkin); },
            OnSelectBGPattern: function (content, bgPatternSkin) { return _this.OnSelectBGPatternSkin(content, bgPatternSkin); },
        }, this.menuContentRoot);
    };
    SolitaireThemesContentsUI.prototype.OnClickMenu = function (selectIndex) {
        ii.AudioMgr.ins.PlayEffect();
        this.Select(selectIndex);
    };
    SolitaireThemesContentsUI.prototype.OnBack = function () {
        if (this.m_IsSkinChangedBV.v) {
            this.args.OnSave(this.args.index, this.m_Skin);
        }
        this.args.OnBack();
    };
    SolitaireThemesContentsUI.prototype.OnReset = function () {
        this.m_Skin = SolitaireLogic_1.SolitaireLogic.skin.CloneSkin(this.m_PreSkin);
        this.m_EffectUI.SetSkin(this.m_Skin);
        for (var selectIndex = 0; selectIndex < 4; ++selectIndex) {
            if (this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).OnResetSkin(this.m_Skin);
            }
        }
    };
    SolitaireThemesContentsUI.prototype.OnRand = function () {
        SolitaireLogic_1.SolitaireLogic.skin.Random(this.m_Skin);
        this.m_EffectUI.SetSkin(this.m_Skin);
        for (var selectIndex = 0; selectIndex < 4; ++selectIndex) {
            if (this.m_menu.has(selectIndex)) {
                this.m_menu.get(selectIndex).OnResetSkin(this.m_Skin);
            }
        }
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectBackSkin = function (content, backSkin) {
        this.m_Skin.backSkin.kind = backSkin.kind;
        this.m_Skin.backSkin.index = backSkin.index;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.Select(backSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectFaceSkin = function (content, faceSkin) {
        this.m_Skin.faceSkin = faceSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.Select(faceSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectBGSkin = function (content, bgSkin) {
        this.m_Skin.bgSkin = bgSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.SelectBG(bgSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.OnSelectBGPatternSkin = function (content, bgPatternSkin) {
        this.m_Skin.bgPatternSkin = bgPatternSkin;
        this.m_EffectUI.SetSkin(this.m_Skin);
        content.SelectBGPattern(bgPatternSkin);
        this.ReculculateIsChangedValue();
    };
    SolitaireThemesContentsUI.prototype.ReculculateIsChangedValue = function () { this.m_IsSkinChangedBV.v = SolitaireLogic_1.SolitaireLogic.skin.IsSkinChanged(this.m_PreSkin, this.m_Skin); };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesContentsUI.prototype, "_resetRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesContentsUI.prototype, "_themeEffectRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesContentsUI.prototype, "menuContentRoot", void 0);
    __decorate([
        property({ type: [UIThemeMenuItem_1.default], visible: true })
    ], SolitaireThemesContentsUI.prototype, "menuItemList", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireThemesContentsUI.prototype, "OnClickMenu", null);
    SolitaireThemesContentsUI = __decorate([
        ccclass
    ], SolitaireThemesContentsUI);
    return SolitaireThemesContentsUI;
}(ii.UIComp));
exports.default = SolitaireThemesContentsUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFNvbGl0YWlyZVRoZW1lc0NvbnRlbnRzVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQXlEO0FBQ3pELDREQUEyRDtBQU8zRCxxREFBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFRMUM7SUFBdUQsNkNBQXdDO0lBQS9GO1FBQUEscUVBdUlDO1FBdElrRCxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFDdEIsa0JBQVksR0FBc0IsRUFBRSxDQUFBO1FBRXJGLGdCQUFVLEdBQTRCLElBQUksQ0FBQztRQUMzQyxZQUFNLEdBQXlDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekQsZ0JBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUN4QixlQUFTLEdBQWtCLElBQUksQ0FBQztRQUNoQyxZQUFNLEdBQWtCLElBQUksQ0FBQztRQUM3Qix1QkFBaUIsR0FBaUIsSUFBSSxDQUFDOztJQTRIbkQsQ0FBQztJQTNIYSw0Q0FBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLDZDQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNTLDBDQUFNLEdBQWhCLFVBQWlCLE1BQXFDO1FBQXRELGlCQVdDO1FBVkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFT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Q0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztpRUFBb0M7SUFDbkM7UUFBdEMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO3VFQUEwQztJQUN6QztRQUF0QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7c0VBQXlDO0lBQzlCO1FBQWhELFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLHlCQUFlLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7bUVBQTZDO0lBa0U3RjtRQURDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnRUFJbEI7SUF6RWdCLHlCQUF5QjtRQUQ3QyxPQUFPO09BQ2EseUJBQXlCLENBdUk3QztJQUFELGdDQUFDO0NBdklELEFBdUlDLENBdklzRCxFQUFFLENBQUMsTUFBTSxHQXVJL0Q7a0JBdklvQix5QkFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVTa2luIH0gZnJvbSBcIi4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVMb2dpYyB9IGZyb20gXCIuLi9Mb2dpYy9Tb2xpdGFpcmVMb2dpY1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgVFBva2VyQmFja1NraW4gfSBmcm9tIFwiLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcbmltcG9ydCBTb2xpdGFpcmVUaGVtZXNFZmZlY3RVSSwgeyBTb2xpdGFpcmVUaGVtZXNFZmZlY3RVSUFyZ3MgfSBmcm9tIFwiLi9Tb2xpdGFpcmVUaGVtZXNFZmZlY3RVSVwiO1xuaW1wb3J0IFVJVGhlbWVNZW51Q29udGVudCBmcm9tIFwiLi9VSVRoZW1lTWVudUNvbnRlbnRcIjtcbmltcG9ydCBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHMsIHsgVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQXJncyB9IGZyb20gXCIuL1VJVGhlbWVNZW51Q29udGVudEJvYXJkc1wiO1xuaW1wb3J0IFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFjaywgeyBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2tBcmdzIH0gZnJvbSBcIi4vVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrXCI7XG5pbXBvcnQgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlLCB7IFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZUFyZ3MgfSBmcm9tIFwiLi9VSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VcIjtcbmltcG9ydCBVSVRoZW1lTWVudUl0ZW0gZnJvbSBcIi4vVUlUaGVtZU1lbnVJdGVtXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuZXhwb3J0IHR5cGUgU29saXRhaXJlVGhlbWVzQ29udGVudHNVSUFyZ3MgPSB7XG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBza2luOiBTb2xpdGFpcmVTa2luLFxuICAgIE9uQmFjazogKCk9PnZvaWQsXG4gICAgT25TYXZlOiAoaW5kZXg6IG51bWJlciwgc2tpbjogU29saXRhaXJlU2tpbik9PnZvaWRcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVUaGVtZXNDb250ZW50c1VJIGV4dGVuZHMgaWkuVUlDb21wPFNvbGl0YWlyZVRoZW1lc0NvbnRlbnRzVUlBcmdzPiB7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfcmVzZXRSb290OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF90aGVtZUVmZmVjdFJvb3Q6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgbWVudUNvbnRlbnRSb290OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6W1VJVGhlbWVNZW51SXRlbV0sdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBtZW51SXRlbUxpc3Q6IFVJVGhlbWVNZW51SXRlbVtdID0gW11cblxuICAgIHByaXZhdGUgbV9FZmZlY3RVSTogU29saXRhaXJlVGhlbWVzRWZmZWN0VUkgPSBudWxsO1xuICAgIHByaXZhdGUgbV9tZW51OiBNYXA8bnVtYmVyLCBVSVRoZW1lTWVudUNvbnRlbnQ8YW55Pj4gPSBuZXcgTWFwKCk7IFxuICAgIHByaXZhdGUgbV9zZWxlY3RlZDogbnVtYmVyID0gLTE7XG4gICAgcHJpdmF0ZSBtX1ByZVNraW46IFNvbGl0YWlyZVNraW4gPSBudWxsO1xuICAgIHByaXZhdGUgbV9Ta2luOiBTb2xpdGFpcmVTa2luID0gbnVsbDtcbiAgICBwcml2YXRlIG1fSXNTa2luQ2hhbmdlZEJWOiBpaS5Cb29sZWFuQlYgPSBudWxsO1xuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX19SZWxlYXNlTWVudSgpXG4gICAgICAgIHRoaXMubV9zZWxlY3RlZCA9IC0xXG4gICAgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBTb2xpdGFpcmVUaGVtZXNDb250ZW50c1VJQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25CYWNrXCIsIHRoaXMuT25CYWNrLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25SZXNldFwiLCB0aGlzLk9uUmVzZXQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPblJhbmRcIiwgdGhpcy5PblJhbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubV9QcmVTa2luID0gdGhpcy5hcmdzLnNraW47XG4gICAgICAgIHRoaXMubV9Ta2luID0gU29saXRhaXJlTG9naWMuc2tpbi5DbG9uZVNraW4odGhpcy5hcmdzLnNraW4pO1xuICAgICAgICB0aGlzLm1fSXNTa2luQ2hhbmdlZEJWID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuQmluZChjaGFuZ2VkPT50aGlzLl9yZXNldFJvb3QuYWN0aXZlPWNoYW5nZWQsIHRydWUsIHRoaXMpLlJldHVybkJ5KHRoaXMpO1xuXG4gICAgICAgIHRoaXMubV9FZmZlY3RVSSA9IGlpLlVJTWdyLmlucy5DcmVhdGU8U29saXRhaXJlVGhlbWVzRWZmZWN0VUksIFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJLmtleSwgeyBza2luOiB0aGlzLm1fU2tpbiB9LCB0aGlzLl90aGVtZUVmZmVjdFJvb3QpLkNsb3NlQnkodGhpcyk7XG4gICAgICAgIHRoaXMubWVudUl0ZW1MaXN0LmZvckVhY2gobWVudSA9PiBtZW51LkluaXQodGhpcy5tX3NlbGVjdGVkLCB0aGlzLk9uQ2xpY2tNZW51LmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5TZWxlY3QoMClcbiAgICB9XG5cbiAgICBwcml2YXRlIF9fUmVsZWFzZU1lbnUoKSB7XG4gICAgICAgIHRoaXMubV9tZW51LmZvckVhY2gobWVudT0+bWVudS5DbG9zZSgpKTtcbiAgICAgICAgdGhpcy5tX21lbnUuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIFNlbGVjdChzZWxlY3RJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmKHNlbGVjdEluZGV4ID49IDAgJiYgdGhpcy5tX3NlbGVjdGVkICE9IHNlbGVjdEluZGV4KXtcbiAgICAgICAgICAgIHRoaXMubV9zZWxlY3RlZCA9IHNlbGVjdEluZGV4O1xuICAgICAgICAgICAgdGhpcy5tZW51SXRlbUxpc3QuZm9yRWFjaChtZW51ID0+IG1lbnUuT25TZWxlY3Qoc2VsZWN0SW5kZXgpKTtcbiAgICAgICAgICAgIHRoaXMubV9tZW51LmZvckVhY2gobWVudT0+bWVudS5ub2RlLmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgICAgIGlmKHRoaXMubV9tZW51LmhhcyhzZWxlY3RJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWVudS5nZXQoc2VsZWN0SW5kZXgpLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50OiBVSVRoZW1lTWVudUNvbnRlbnQ8YW55PiA9IG51bGw7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzZWxlY3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IGNvbnRlbnQgPSB0aGlzLl9fU2VsZWN0Q29udGVudFBva2VyQmFjaygpOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiBjb250ZW50ID0gdGhpcy5fX1NlbGVjdENvbnRlbnRQb2tlckZhY2UoKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogY29udGVudCA9IHRoaXMuX19TZWxlY3RDb250ZW50Qm9hcmRzKCk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tX21lbnUuc2V0KHNlbGVjdEluZGV4LCBjb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9fU2VsZWN0Q29udGVudFBva2VyQmFjaygpOiBVSVRoZW1lTWVudUNvbnRlbnQ8YW55PiB7IHJldHVybiBpaS5VSU1nci5pbnMuQ3JlYXRlPFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFjaywgVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlVJVGhlbWVNZW51Q29udGVudFBva2VyQmFjay5rZXksIHtcbiAgICAgICAgYmFja1NraW46IHRoaXMubV9Ta2luLmJhY2tTa2luLFxuICAgICAgICBPblNlbGVjdDogKGNvbnRlbnQ6IFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFjaywgYmFja1NraW46IFRQb2tlckJhY2tTa2luKT0+dGhpcy5PblNlbGVjdEJhY2tTa2luKGNvbnRlbnQsIGJhY2tTa2luKVxuICAgIH0sIHRoaXMubWVudUNvbnRlbnRSb290KTsgfVxuICAgIHByaXZhdGUgX19TZWxlY3RDb250ZW50UG9rZXJGYWNlKCk6IFVJVGhlbWVNZW51Q29udGVudDxhbnk+IHsgcmV0dXJuIGlpLlVJTWdyLmlucy5DcmVhdGU8VUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlLCBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlLmtleSwge1xuICAgICAgICBmYWNlU2tpbjogdGhpcy5tX1NraW4uZmFjZVNraW4sXG4gICAgICAgIE9uU2VsZWN0OiAoY29udGVudDogVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlLCBmYWNlU2tpbjogbnVtYmVyKT0+dGhpcy5PblNlbGVjdEZhY2VTa2luKGNvbnRlbnQsIGZhY2VTa2luKVxuICAgIH0sIHRoaXMubWVudUNvbnRlbnRSb290KTsgfVxuICAgIHByaXZhdGUgX19TZWxlY3RDb250ZW50Qm9hcmRzKCk6IFVJVGhlbWVNZW51Q29udGVudDxhbnk+IHsgcmV0dXJuIGlpLlVJTWdyLmlucy5DcmVhdGU8VUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzLCBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzLmtleSwge1xuICAgICAgICBiZ1NraW46IHRoaXMubV9Ta2luLmJnU2tpbixcbiAgICAgICAgYmdQYXR0ZXJuU2tpbjogdGhpcy5tX1NraW4uYmdQYXR0ZXJuU2tpbixcbiAgICAgICAgT25TZWxlY3RCRzogKGNvbnRlbnQ6IFVJVGhlbWVNZW51Q29udGVudEJvYXJkcywgYmdTa2luOiBudW1iZXIpPT50aGlzLk9uU2VsZWN0QkdTa2luKGNvbnRlbnQsIGJnU2tpbiksXG4gICAgICAgIE9uU2VsZWN0QkdQYXR0ZXJuOiAoY29udGVudDogVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzLCBiZ1BhdHRlcm5Ta2luOiBudW1iZXIpPT50aGlzLk9uU2VsZWN0QkdQYXR0ZXJuU2tpbihjb250ZW50LCBiZ1BhdHRlcm5Ta2luKSxcbiAgICB9LCB0aGlzLm1lbnVDb250ZW50Um9vdCk7IH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDAuMilcbiAgICBwcml2YXRlIE9uQ2xpY2tNZW51KHNlbGVjdEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoKVxuICAgICAgICB0aGlzLlNlbGVjdChzZWxlY3RJbmRleClcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uQmFjaygpIHtcbiAgICAgICAgaWYodGhpcy5tX0lzU2tpbkNoYW5nZWRCVi52KSB7XG4gICAgICAgICAgICB0aGlzLmFyZ3MuT25TYXZlKHRoaXMuYXJncy5pbmRleCwgdGhpcy5tX1NraW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJncy5PbkJhY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uUmVzZXQoKSB7XG4gICAgICAgIHRoaXMubV9Ta2luID0gU29saXRhaXJlTG9naWMuc2tpbi5DbG9uZVNraW4odGhpcy5tX1ByZVNraW4pO1xuICAgICAgICB0aGlzLm1fRWZmZWN0VUkuU2V0U2tpbih0aGlzLm1fU2tpbik7XG4gICAgICAgIGZvcihsZXQgc2VsZWN0SW5kZXg9MDsgc2VsZWN0SW5kZXg8NDsgKytzZWxlY3RJbmRleCkge1xuICAgICAgICAgICAgaWYodGhpcy5tX21lbnUuaGFzKHNlbGVjdEluZGV4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMubV9tZW51LmdldChzZWxlY3RJbmRleCkuT25SZXNldFNraW4odGhpcy5tX1NraW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPblJhbmQoKSB7XG4gICAgICAgIFNvbGl0YWlyZUxvZ2ljLnNraW4uUmFuZG9tKHRoaXMubV9Ta2luKTtcbiAgICAgICAgdGhpcy5tX0VmZmVjdFVJLlNldFNraW4odGhpcy5tX1NraW4pO1xuICAgICAgICBmb3IobGV0IHNlbGVjdEluZGV4PTA7IHNlbGVjdEluZGV4PDQ7ICsrc2VsZWN0SW5kZXgpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubV9tZW51LmhhcyhzZWxlY3RJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWVudS5nZXQoc2VsZWN0SW5kZXgpLk9uUmVzZXRTa2luKHRoaXMubV9Ta2luKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuUmVjdWxjdWxhdGVJc0NoYW5nZWRWYWx1ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgT25TZWxlY3RCYWNrU2tpbihjb250ZW50OiBVSVRoZW1lTWVudUNvbnRlbnRQb2tlckJhY2ssIGJhY2tTa2luOiBUUG9rZXJCYWNrU2tpbikge1xuICAgICAgICB0aGlzLm1fU2tpbi5iYWNrU2tpbi5raW5kID0gYmFja1NraW4ua2luZDtcbiAgICAgICAgdGhpcy5tX1NraW4uYmFja1NraW4uaW5kZXggPSBiYWNrU2tpbi5pbmRleDtcbiAgICAgICAgdGhpcy5tX0VmZmVjdFVJLlNldFNraW4odGhpcy5tX1NraW4pO1xuICAgICAgICBjb250ZW50LlNlbGVjdChiYWNrU2tpbik7XG5cbiAgICAgICAgdGhpcy5SZWN1bGN1bGF0ZUlzQ2hhbmdlZFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPblNlbGVjdEZhY2VTa2luKGNvbnRlbnQ6IFVJVGhlbWVNZW51Q29udGVudFBva2VyRmFjZSwgZmFjZVNraW46IG51bWJlcikge1xuICAgICAgICB0aGlzLm1fU2tpbi5mYWNlU2tpbiA9IGZhY2VTa2luO1xuICAgICAgICB0aGlzLm1fRWZmZWN0VUkuU2V0U2tpbih0aGlzLm1fU2tpbik7XG4gICAgICAgIGNvbnRlbnQuU2VsZWN0KGZhY2VTa2luKTtcbiAgICAgICAgdGhpcy5SZWN1bGN1bGF0ZUlzQ2hhbmdlZFZhbHVlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPblNlbGVjdEJHU2tpbihjb250ZW50OiBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHMsIGJnU2tpbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubV9Ta2luLmJnU2tpbiA9IGJnU2tpbjtcbiAgICAgICAgdGhpcy5tX0VmZmVjdFVJLlNldFNraW4odGhpcy5tX1NraW4pO1xuICAgICAgICBjb250ZW50LlNlbGVjdEJHKGJnU2tpbik7XG4gICAgICAgIHRoaXMuUmVjdWxjdWxhdGVJc0NoYW5nZWRWYWx1ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgT25TZWxlY3RCR1BhdHRlcm5Ta2luKGNvbnRlbnQ6IFVJVGhlbWVNZW51Q29udGVudEJvYXJkcywgYmdQYXR0ZXJuU2tpbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubV9Ta2luLmJnUGF0dGVyblNraW4gPSBiZ1BhdHRlcm5Ta2luO1xuICAgICAgICB0aGlzLm1fRWZmZWN0VUkuU2V0U2tpbih0aGlzLm1fU2tpbik7XG4gICAgICAgIGNvbnRlbnQuU2VsZWN0QkdQYXR0ZXJuKGJnUGF0dGVyblNraW4pO1xuICAgICAgICB0aGlzLlJlY3VsY3VsYXRlSXNDaGFuZ2VkVmFsdWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIFJlY3VsY3VsYXRlSXNDaGFuZ2VkVmFsdWUoKSB7IHRoaXMubV9Jc1NraW5DaGFuZ2VkQlYudiA9IFNvbGl0YWlyZUxvZ2ljLnNraW4uSXNTa2luQ2hhbmdlZCh0aGlzLm1fUHJlU2tpbiwgdGhpcy5tX1NraW4pOyB9XG59XG4iXX0=