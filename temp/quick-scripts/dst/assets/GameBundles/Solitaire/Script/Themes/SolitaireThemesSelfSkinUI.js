
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b900dHdoZFrJZVKhkkhvCx', 'SolitaireThemesSelfSkinUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinUI.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesSelfSkinUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesSelfSkinUI, _super);
    function SolitaireThemesSelfSkinUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._Layout = null;
        _this._unlockRoot = null;
        _this._topBlocker = null;
        _this.m_ItemList = [];
        return _this;
    }
    SolitaireThemesSelfSkinUI.prototype.OnCreate = function () { };
    SolitaireThemesSelfSkinUI.prototype.OnRelease = function () { };
    SolitaireThemesSelfSkinUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnUnlock", this.OnUnlock.bind(this));
        SolitaireLogic_1.SolitaireLogic.skin.SkinList.forEach(function (skin, index) {
            _this.__CreateSkin(skin, index);
        });
        this._unlockRoot.active = !SolitaireLogic_1.SolitaireLogic.skin.IsMaxSkinLength;
        cc.tween(this._topBlocker)
            .delay(0.3)
            .to(0.3, { opacity: 0 })
            .set({ active: false, opacity: 255 })
            .start();
    };
    SolitaireThemesSelfSkinUI.prototype.__CreateSkin = function (skin, index) {
        this.m_ItemList.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesSelfSkinItemUI.key, {
            skin: skin,
            index: index,
            OnClickEdit: this.args.OnClickEdit
        }, this._Layout.node).CloseBy(this));
    };
    SolitaireThemesSelfSkinUI.prototype.OnUnlock = function () {
        var _this = this;
        // 点击增加一个自定义皮肤按钮
        SolitaireLogic_1.SolitaireLogic.WatchToExtendSkinList(function (index) {
            _this.__CreateSkin(SolitaireLogic_1.SolitaireLogic.skin.GetSkin(index), index);
            _this._unlockRoot.active = !SolitaireLogic_1.SolitaireLogic.skin.IsMaxSkinLength;
        });
    };
    SolitaireThemesSelfSkinUI.prototype.RefreshUI = function (index, skin) {
        this.m_ItemList[index].RefreshUI(skin);
    };
    __decorate([
        property({ type: cc.Layout, visible: true })
    ], SolitaireThemesSelfSkinUI.prototype, "_Layout", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesSelfSkinUI.prototype, "_unlockRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesSelfSkinUI.prototype, "_topBlocker", void 0);
    SolitaireThemesSelfSkinUI = __decorate([
        ccclass
    ], SolitaireThemesSelfSkinUI);
    return SolitaireThemesSelfSkinUI;
}(ii.UIComp));
exports.default = SolitaireThemesSelfSkinUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQXlEO0FBQ3pELDREQUEyRDtBQUdyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUsxQztJQUF1RCw2Q0FBd0M7SUFBL0Y7UUFBQSxxRUF5Q0M7UUF4Q29ELGFBQU8sR0FBYyxJQUFJLENBQUM7UUFDNUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFbkUsZ0JBQVUsR0FBb0MsRUFBRSxDQUFDOztJQW9DN0QsQ0FBQztJQWxDYSw0Q0FBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLDZDQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsMENBQU0sR0FBaEIsVUFBaUIsTUFBcUM7UUFBdEQsaUJBV0M7UUFWRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0QsK0JBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQzdDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQywrQkFBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDL0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO2FBQ3JCLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBQyxDQUFDO2FBQ2xDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyxnREFBWSxHQUFwQixVQUFxQixJQUFtQixFQUFFLEtBQWE7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFtRSx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEdBQUcsRUFBRTtZQUN0SyxJQUFJLE1BQUE7WUFDSixLQUFLLE9BQUE7WUFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1NBQ3JDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8sNENBQVEsR0FBaEI7UUFBQSxpQkFNQztRQUxHLGdCQUFnQjtRQUNoQiwrQkFBYyxDQUFDLHFCQUFxQixDQUFDLFVBQUMsS0FBYTtZQUMvQyxLQUFJLENBQUMsWUFBWSxDQUFDLCtCQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RCxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLCtCQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw2Q0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLElBQW1CO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUF2Q3dDO1FBQXhDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQzs4REFBbUM7SUFDcEM7UUFBdEMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2tFQUFxQztJQUNwQztRQUF0QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7a0VBQXFDO0lBSDFELHlCQUF5QjtRQUQ3QyxPQUFPO09BQ2EseUJBQXlCLENBeUM3QztJQUFELGdDQUFDO0NBekNELEFBeUNDLENBekNzRCxFQUFFLENBQUMsTUFBTSxHQXlDL0Q7a0JBekNvQix5QkFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVTa2luIH0gZnJvbSBcIi4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVMb2dpYyB9IGZyb20gXCIuLi9Mb2dpYy9Tb2xpdGFpcmVMb2dpY1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luSXRlbVVJLCB7IFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luSXRlbVVJQXJncyB9IGZyb20gXCIuL1NvbGl0YWlyZVRoZW1lc1NlbGZTa2luSXRlbVVJXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuZXhwb3J0IHR5cGUgU29saXRhaXJlVGhlbWVzU2VsZlNraW5VSUFyZ3MgPSB7XG4gICAgT25DbGlja0VkaXQoaW5kZXg6IG51bWJlcilcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVUaGVtZXNTZWxmU2tpblVJIGV4dGVuZHMgaWkuVUlDb21wPFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luVUlBcmdzPiB7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxheW91dCx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9MYXlvdXQ6IGNjLkxheW91dCA9IG51bGw7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfdW5sb2NrUm9vdDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfdG9wQmxvY2tlcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6IFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luSXRlbVVJW10gPSBbXTtcblxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogU29saXRhaXJlVGhlbWVzU2VsZlNraW5VSUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uVW5sb2NrXCIsIHRoaXMuT25VbmxvY2suYmluZCh0aGlzKSk7XG4gICAgICAgIFNvbGl0YWlyZUxvZ2ljLnNraW4uU2tpbkxpc3QuZm9yRWFjaCgoc2tpbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX19DcmVhdGVTa2luKHNraW4sIGluZGV4KTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5fdW5sb2NrUm9vdC5hY3RpdmUgPSAhU29saXRhaXJlTG9naWMuc2tpbi5Jc01heFNraW5MZW5ndGg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuX3RvcEJsb2NrZXIpXG4gICAgICAgICAgICAuZGVsYXkoMC4zKVxuICAgICAgICAgICAgLnRvKDAuMywge29wYWNpdHk6IDB9KVxuICAgICAgICAgICAgLnNldCh7YWN0aXZlOiBmYWxzZSwgb3BhY2l0eTogMjU1fSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX19DcmVhdGVTa2luKHNraW46IFNvbGl0YWlyZVNraW4sIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0LnB1c2goaWkuVUlNZ3IuaW5zLkNyZWF0ZTxTb2xpdGFpcmVUaGVtZXNTZWxmU2tpbkl0ZW1VSSwgU29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUlBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuU29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUkua2V5LCB7XG4gICAgICAgICAgICBza2luLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBPbkNsaWNrRWRpdDogdGhpcy5hcmdzLk9uQ2xpY2tFZGl0XG4gICAgICAgIH0sIHRoaXMuX0xheW91dC5ub2RlKS5DbG9zZUJ5KHRoaXMpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uVW5sb2NrKCkge1xuICAgICAgICAvLyDngrnlh7vlop7liqDkuIDkuKroh6rlrprkuYnnmq7ogqTmjInpkq5cbiAgICAgICAgU29saXRhaXJlTG9naWMuV2F0Y2hUb0V4dGVuZFNraW5MaXN0KChpbmRleDogbnVtYmVyKT0+e1xuICAgICAgICAgICAgdGhpcy5fX0NyZWF0ZVNraW4oU29saXRhaXJlTG9naWMuc2tpbi5HZXRTa2luKGluZGV4KSwgaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fdW5sb2NrUm9vdC5hY3RpdmUgPSAhU29saXRhaXJlTG9naWMuc2tpbi5Jc01heFNraW5MZW5ndGg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIFJlZnJlc2hVSShpbmRleDogbnVtYmVyLCBza2luOiBTb2xpdGFpcmVTa2luKSB7XG4gICAgICAgIHRoaXMubV9JdGVtTGlzdFtpbmRleF0uUmVmcmVzaFVJKHNraW4pXG4gICAgfVxufVxuIl19