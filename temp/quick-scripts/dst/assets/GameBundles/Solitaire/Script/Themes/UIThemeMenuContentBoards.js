
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoards.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ab378/wUJAGaN0vEabYzKV', 'UIThemeMenuContentBoards');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoards.ts

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
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var UIThemeMenuContent_1 = require("./UIThemeMenuContent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentBoards = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentBoards, _super);
    function UIThemeMenuContentBoards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSkinScrollView = null;
        _this.bgPatternSkinScrollView = null;
        _this.m_bgSkinItemArray = [];
        _this.m_bgPatternSkinItemArray = [];
        return _this;
    }
    UIThemeMenuContentBoards.prototype.OnCreate = function () { };
    UIThemeMenuContentBoards.prototype.OnRelease = function () { };
    UIThemeMenuContentBoards.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        for (var bgSkin = 0; bgSkin < SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinLength; ++bgSkin) {
            this.m_bgSkinItemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoardsBackgroundColorItem.key, {
                bgSkin: bgSkin,
                OnSelect: function (bgSkin) { return _this.args.OnSelectBG(_this, bgSkin); }
            }, this.bgSkinScrollView.content).CloseBy(this));
        }
        this.SelectBG(this.args.bgSkin);
        for (var bgPatternSkin = -1; bgPatternSkin < SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinLength; ++bgPatternSkin) {
            this.m_bgPatternSkinItemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentBoardsPatternItem.key, {
                bgPatternSkin: bgPatternSkin,
                OnSelect: function (bgPatternSkin) { return _this.args.OnSelectBGPattern(_this, bgPatternSkin); }
            }, this.bgPatternSkinScrollView.content).CloseBy(this));
        }
        this.SelectBG(this.args.bgSkin);
        this.SelectBGPattern(this.args.bgPatternSkin);
    };
    UIThemeMenuContentBoards.prototype.SelectBG = function (bgSkin) {
        this.m_bgSkinItemArray.forEach(function (it) { return it.Select(bgSkin); });
    };
    UIThemeMenuContentBoards.prototype.OnResetSkin = function (skin) {
        this.SelectBG(skin.bgSkin);
        this.SelectBGPattern(skin.bgPatternSkin);
    };
    UIThemeMenuContentBoards.prototype.SelectBGPattern = function (bgPatternSkin) {
        this.m_bgPatternSkinItemArray.forEach(function (it) { return it.Select(bgPatternSkin); });
    };
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentBoards.prototype, "bgSkinScrollView", void 0);
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentBoards.prototype, "bgPatternSkinScrollView", void 0);
    UIThemeMenuContentBoards = __decorate([
        ccclass
    ], UIThemeMenuContentBoards);
    return UIThemeMenuContentBoards;
}(UIThemeMenuContent_1.default));
exports.default = UIThemeMenuContentBoards;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFVJVGhlbWVNZW51Q29udGVudEJvYXJkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0REFBMkQ7QUFDM0Qsc0VBQXFFO0FBQ3JFLDJEQUFzRDtBQUloRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQVExQztJQUFzRCw0Q0FBZ0Q7SUFBdEc7UUFBQSxxRUF3Q0M7UUF2Q29DLHNCQUFnQixHQUFrQixJQUFJLENBQUE7UUFDdEMsNkJBQXVCLEdBQWtCLElBQUksQ0FBQTtRQUV0RSx1QkFBaUIsR0FBa0QsRUFBRSxDQUFBO1FBQ3JFLDhCQUF3QixHQUEwQyxFQUFFLENBQUE7O0lBbUNoRixDQUFDO0lBakNhLDJDQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsNENBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQix5Q0FBTSxHQUFoQixVQUFpQixNQUFvQztRQUFyRCxpQkFpQkM7UUFoQkcsS0FBSSxJQUFJLE1BQU0sR0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFDLGlEQUF1QixDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRTtZQUNyRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBK0YsdUNBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZOLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRSxVQUFDLE1BQWMsSUFBRyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksRUFBRSxNQUFNLENBQUMsRUFBbEMsQ0FBa0M7YUFDakUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEMsS0FBSSxJQUFJLGFBQWEsR0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLEdBQUMsaURBQXVCLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxhQUFhLEVBQUU7WUFDbEcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQStFLHVDQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsR0FBRyxFQUFFO2dCQUN0TSxhQUFhLEVBQUUsYUFBYTtnQkFDNUIsUUFBUSxFQUFFLFVBQUMsYUFBcUIsSUFBRyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxFQUFFLGFBQWEsQ0FBQyxFQUFoRCxDQUFnRDthQUN0RixFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDJDQUFRLEdBQVIsVUFBUyxNQUFjO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUVELDhDQUFXLEdBQVgsVUFBWSxJQUFtQjtRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsa0RBQWUsR0FBZixVQUFnQixhQUFxQjtRQUNqQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUF0Q3dCO1FBQXhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3NFQUErQztJQUM5QztRQUF4QixRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQzs2RUFBc0Q7SUFGN0Qsd0JBQXdCO1FBRDVDLE9BQU87T0FDYSx3QkFBd0IsQ0F3QzVDO0lBQUQsK0JBQUM7Q0F4Q0QsQUF3Q0MsQ0F4Q3FELDRCQUFrQixHQXdDdkU7a0JBeENvQix3QkFBd0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVTa2luIH0gZnJvbSBcIi4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZyB9IGZyb20gXCIuLi9Tb2xpdGFpcmVTcHJpdGVGcmFtZUNmZ1wiO1xuaW1wb3J0IFVJVGhlbWVNZW51Q29udGVudCBmcm9tIFwiLi9VSVRoZW1lTWVudUNvbnRlbnRcIjtcbmltcG9ydCBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNCYWNrZ3JvdW5kQ29sb3JJdGVtLCB7IFVJVGhlbWVNZW51Q29udGVudEJvYXJkc0JhY2tncm91bmRDb2xvckl0ZW1BcmdzIH0gZnJvbSBcIi4vVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQmFja2dyb3VuZENvbG9ySXRlbVwiO1xuaW1wb3J0IFVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtLCB7IFVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtQXJncyB9IGZyb20gXCIuL1VJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuZXhwb3J0IHR5cGUgVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQXJncyA9IHtcbiAgICBiZ1NraW46IG51bWJlcixcbiAgICBiZ1BhdHRlcm5Ta2luOiBudW1iZXIsXG4gICAgT25TZWxlY3RCRzogKGNvbnRlbnQ6IFVJVGhlbWVNZW51Q29udGVudEJvYXJkcywgYmdTa2luOiBudW1iZXIpPT52b2lkLFxuICAgIE9uU2VsZWN0QkdQYXR0ZXJuOiAoY29udGVudDogVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzLCBiZ1BhdHRlcm5Ta2luOiBudW1iZXIpPT52b2lkLFxufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJVGhlbWVNZW51Q29udGVudEJvYXJkcyBleHRlbmRzIFVJVGhlbWVNZW51Q29udGVudDxVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNBcmdzPiB7XG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpIHByaXZhdGUgYmdTa2luU2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGwgICAgXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpIHByaXZhdGUgYmdQYXR0ZXJuU2tpblNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsXG5cbiAgICBwcml2YXRlIG1fYmdTa2luSXRlbUFycmF5OiBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNCYWNrZ3JvdW5kQ29sb3JJdGVtW10gPSBbXVxuICAgIHByaXZhdGUgbV9iZ1BhdHRlcm5Ta2luSXRlbUFycmF5OiBVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNQYXR0ZXJuSXRlbVtdID0gW11cblxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQXJncyk6IHZvaWQge1xuICAgICAgICBmb3IobGV0IGJnU2tpbj0wOyBiZ1NraW48U29saXRhaXJlU3ByaXRlRnJhbWVDZmcuYmdTa2luTGVuZ3RoOyArK2JnU2tpbikge1xuICAgICAgICAgICAgdGhpcy5tX2JnU2tpbkl0ZW1BcnJheS5wdXNoKGlpLlVJTWdyLmlucy5DcmVhdGU8VUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQmFja2dyb3VuZENvbG9ySXRlbSwgVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzQmFja2dyb3VuZENvbG9ySXRlbUFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5VSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNCYWNrZ3JvdW5kQ29sb3JJdGVtLmtleSwge1xuICAgICAgICAgICAgICAgIGJnU2tpbjogYmdTa2luLFxuICAgICAgICAgICAgICAgIE9uU2VsZWN0OiAoYmdTa2luOiBudW1iZXIpPT50aGlzLmFyZ3MuT25TZWxlY3RCRyh0aGlzLCBiZ1NraW4pXG4gICAgICAgICAgICB9LCB0aGlzLmJnU2tpblNjcm9sbFZpZXcuY29udGVudCkuQ2xvc2VCeSh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5TZWxlY3RCRyh0aGlzLmFyZ3MuYmdTa2luKTtcblxuICAgICAgICBmb3IobGV0IGJnUGF0dGVyblNraW49LTE7IGJnUGF0dGVyblNraW48U29saXRhaXJlU3ByaXRlRnJhbWVDZmcuYmdQYXR0ZXJuU2tpbkxlbmd0aDsgKytiZ1BhdHRlcm5Ta2luKSB7XG4gICAgICAgICAgICB0aGlzLm1fYmdQYXR0ZXJuU2tpbkl0ZW1BcnJheS5wdXNoKGlpLlVJTWdyLmlucy5DcmVhdGU8VUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzUGF0dGVybkl0ZW0sIFVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlVJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtLmtleSwge1xuICAgICAgICAgICAgICAgIGJnUGF0dGVyblNraW46IGJnUGF0dGVyblNraW4sXG4gICAgICAgICAgICAgICAgT25TZWxlY3Q6IChiZ1BhdHRlcm5Ta2luOiBudW1iZXIpPT50aGlzLmFyZ3MuT25TZWxlY3RCR1BhdHRlcm4odGhpcywgYmdQYXR0ZXJuU2tpbilcbiAgICAgICAgICAgIH0sIHRoaXMuYmdQYXR0ZXJuU2tpblNjcm9sbFZpZXcuY29udGVudCkuQ2xvc2VCeSh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5TZWxlY3RCRyh0aGlzLmFyZ3MuYmdTa2luKTtcbiAgICAgICAgdGhpcy5TZWxlY3RCR1BhdHRlcm4odGhpcy5hcmdzLmJnUGF0dGVyblNraW4pO1xuICAgIH1cblxuICAgIFNlbGVjdEJHKGJnU2tpbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubV9iZ1NraW5JdGVtQXJyYXkuZm9yRWFjaChpdCA9PiBpdC5TZWxlY3QoYmdTa2luKSlcbiAgICB9XG5cbiAgICBPblJlc2V0U2tpbihza2luOiBTb2xpdGFpcmVTa2luKSB7XG4gICAgICAgIHRoaXMuU2VsZWN0Qkcoc2tpbi5iZ1NraW4pO1xuICAgICAgICB0aGlzLlNlbGVjdEJHUGF0dGVybihza2luLmJnUGF0dGVyblNraW4pO1xuICAgIH1cblxuICAgIFNlbGVjdEJHUGF0dGVybihiZ1BhdHRlcm5Ta2luOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tX2JnUGF0dGVyblNraW5JdGVtQXJyYXkuZm9yRWFjaChpdCA9PiBpdC5TZWxlY3QoYmdQYXR0ZXJuU2tpbikpXG4gICAgfVxufVxuIl19