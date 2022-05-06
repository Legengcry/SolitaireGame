
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fbe250cWn9G96Ym6Uyu681R', 'SolitaireThemesUIPanel');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesUIPanel.ts

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
var SolitaireThemesUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireThemesUIPanel, _super);
    function SolitaireThemesUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ctnSelfList = null;
        _this._ctnContents = null;
        _this.m_SelfSkinUI = null;
        _this.m_ContentsUI = null;
        return _this;
    }
    SolitaireThemesUIPanel.prototype.__CloseContentsUI = function () {
        if (this.m_ContentsUI !== null) {
            this.m_ContentsUI.Close();
            this.m_ContentsUI = null;
        }
    };
    SolitaireThemesUIPanel.prototype.OnCreate = function () { };
    SolitaireThemesUIPanel.prototype.OnRelease = function () {
        this.__CloseContentsUI();
    };
    SolitaireThemesUIPanel.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.m_SelfSkinUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesSelfSkinUI.key, {
            OnClickEdit: function (index) { return _this.OnClickEdit(index); },
        }, this._ctnSelfList).CloseBy(this);
    };
    SolitaireThemesUIPanel.prototype.OnBack = function () {
        this.Close();
    };
    SolitaireThemesUIPanel.prototype.OnClickEdit = function (index) {
        var _this = this;
        this.m_ContentsUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesContentsUI.key, {
            index: index,
            skin: SolitaireLogic_1.SolitaireLogic.skin.CloneSkin(SolitaireLogic_1.SolitaireLogic.skin.GetSkin(index)),
            OnSave: function (index, skin) { return _this.OnSave(index, skin); },
            OnBack: function () { return _this.OnContentBack(); }
        }, this._ctnContents);
    };
    SolitaireThemesUIPanel.prototype.OnSave = function (index, skin) {
        SolitaireLogic_1.SolitaireLogic.skin.SaveSkin(index, skin);
        this.m_SelfSkinUI.RefreshUI(index, skin);
    };
    // 从 ContentsUI 界面点击返回按钮
    SolitaireThemesUIPanel.prototype.OnContentBack = function () {
        this.__CloseContentsUI();
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesUIPanel.prototype, "_ctnSelfList", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesUIPanel.prototype, "_ctnContents", void 0);
    __decorate([
        ii.Util.block(1)
    ], SolitaireThemesUIPanel.prototype, "OnBack", null);
    SolitaireThemesUIPanel = __decorate([
        ccclass
    ], SolitaireThemesUIPanel);
    return SolitaireThemesUIPanel;
}(ii.UIPanel));
exports.default = SolitaireThemesUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFNvbGl0YWlyZVRoZW1lc1VJUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQXlEO0FBQ3pELDREQUEyRDtBQUlyRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvRCwwQ0FBZTtJQUFuRTtRQUFBLHFFQWdEQztRQS9Da0Qsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFcEUsa0JBQVksR0FBOEIsSUFBSSxDQUFDO1FBQy9DLGtCQUFZLEdBQThCLElBQUksQ0FBQzs7SUEyQzNELENBQUM7SUF6Q1csa0RBQWlCLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVTLHlDQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsMENBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ1MsdUNBQU0sR0FBaEIsVUFBaUIsTUFBVztRQUE1QixpQkFLQztRQUpHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBMkQsdUNBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLEVBQUU7WUFDekosV0FBVyxFQUFDLFVBQUMsS0FBYSxJQUFHLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUI7U0FDdkQsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFHTyx1Q0FBTSxHQUFkO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyw0Q0FBVyxHQUFuQixVQUFvQixLQUFhO1FBQWpDLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQTJELHVDQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxFQUFFO1lBQ3pKLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLCtCQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywrQkFBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkUsTUFBTSxFQUFDLFVBQUMsS0FBYSxFQUFFLElBQW1CLElBQUcsT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBeEIsQ0FBd0I7WUFDckUsTUFBTSxFQUFDLGNBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CO1NBQ2xDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTyx1Q0FBTSxHQUFkLFVBQWUsS0FBYSxFQUFFLElBQW1CO1FBQzdDLCtCQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCx3QkFBd0I7SUFDaEIsOENBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBOUNzQztRQUF0QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7Z0VBQXNDO0lBQ3JDO1FBQXRDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztnRUFBc0M7SUF3QjVFO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dEQUdoQjtJQTVCZ0Isc0JBQXNCO1FBRDFDLE9BQU87T0FDYSxzQkFBc0IsQ0FnRDFDO0lBQUQsNkJBQUM7Q0FoREQsQUFnREMsQ0FoRG1ELEVBQUUsQ0FBQyxPQUFPLEdBZ0Q3RDtrQkFoRG9CLHNCQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbGl0YWlyZVNraW4gfSBmcm9tIFwiLi4vRGF0YUNhY2hlL1NvbGl0YWlyZVNraW5EYXRhQ2FjaGVcIjtcbmltcG9ydCB7IFNvbGl0YWlyZUxvZ2ljIH0gZnJvbSBcIi4uL0xvZ2ljL1NvbGl0YWlyZUxvZ2ljXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgU29saXRhaXJlVGhlbWVzQ29udGVudHNVSSwgeyBTb2xpdGFpcmVUaGVtZXNDb250ZW50c1VJQXJncyB9IGZyb20gXCIuL1NvbGl0YWlyZVRoZW1lc0NvbnRlbnRzVUlcIjtcbmltcG9ydCBTb2xpdGFpcmVUaGVtZXNTZWxmU2tpblVJLCB7IFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luVUlBcmdzIH0gZnJvbSBcIi4vU29saXRhaXJlVGhlbWVzU2VsZlNraW5VSVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbGl0YWlyZVRoZW1lc1VJUGFuZWwgZXh0ZW5kcyBpaS5VSVBhbmVsPGFueT4ge1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX2N0blNlbGZMaXN0OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9jdG5Db250ZW50czogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1fU2VsZlNraW5VSTogU29saXRhaXJlVGhlbWVzU2VsZlNraW5VSSA9IG51bGw7XG4gICAgcHJpdmF0ZSBtX0NvbnRlbnRzVUk6IFNvbGl0YWlyZVRoZW1lc0NvbnRlbnRzVUkgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfX0Nsb3NlQ29udGVudHNVSSgpIHtcbiAgICAgICAgaWYodGhpcy5tX0NvbnRlbnRzVUkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubV9Db250ZW50c1VJLkNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm1fQ29udGVudHNVSSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9fQ2xvc2VDb250ZW50c1VJKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uQmFja1wiLCB0aGlzLk9uQmFjay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5tX1NlbGZTa2luVUkgPSBpaS5VSU1nci5pbnMuQ3JlYXRlPFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luVUksIFNvbGl0YWlyZVRoZW1lc1NlbGZTa2luVUlBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuU29saXRhaXJlVGhlbWVzU2VsZlNraW5VSS5rZXksIHtcbiAgICAgICAgICAgIE9uQ2xpY2tFZGl0OihpbmRleDogbnVtYmVyKT0+dGhpcy5PbkNsaWNrRWRpdChpbmRleCksXG4gICAgICAgIH0sIHRoaXMuX2N0blNlbGZMaXN0KS5DbG9zZUJ5KHRoaXMpO1xuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDEpXG4gICAgcHJpdmF0ZSBPbkJhY2soKSB7XG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uQ2xpY2tFZGl0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tX0NvbnRlbnRzVUkgPSBpaS5VSU1nci5pbnMuQ3JlYXRlPFNvbGl0YWlyZVRoZW1lc0NvbnRlbnRzVUksIFNvbGl0YWlyZVRoZW1lc0NvbnRlbnRzVUlBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuU29saXRhaXJlVGhlbWVzQ29udGVudHNVSS5rZXksIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHNraW46IFNvbGl0YWlyZUxvZ2ljLnNraW4uQ2xvbmVTa2luKFNvbGl0YWlyZUxvZ2ljLnNraW4uR2V0U2tpbihpbmRleCkpLFxuICAgICAgICAgICAgT25TYXZlOihpbmRleDogbnVtYmVyLCBza2luOiBTb2xpdGFpcmVTa2luKT0+dGhpcy5PblNhdmUoaW5kZXgsIHNraW4pLFxuICAgICAgICAgICAgT25CYWNrOigpPT50aGlzLk9uQ29udGVudEJhY2soKVxuICAgICAgICB9LCB0aGlzLl9jdG5Db250ZW50cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPblNhdmUoaW5kZXg6IG51bWJlciwgc2tpbjogU29saXRhaXJlU2tpbikge1xuICAgICAgICBTb2xpdGFpcmVMb2dpYy5za2luLlNhdmVTa2luKGluZGV4LCBza2luKTtcbiAgICAgICAgdGhpcy5tX1NlbGZTa2luVUkuUmVmcmVzaFVJKGluZGV4LCBza2luKTtcbiAgICB9XG5cbiAgICAvLyDku44gQ29udGVudHNVSSDnlYzpnaLngrnlh7vov5Tlm57mjInpkq5cbiAgICBwcml2YXRlIE9uQ29udGVudEJhY2soKSB7XG4gICAgICAgIHRoaXMuX19DbG9zZUNvbnRlbnRzVUkoKTtcbiAgICB9XG59XG4iXX0=