
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Menu/SolitaireMenuUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46d16KkemFN3r880bPDgQpP', 'SolitaireMenuUIPanel');
// GameBundles/Solitaire/Script/Menu/SolitaireMenuUIPanel.ts

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
var SolitaireLogic_1 = require("../Logic/SolitaireLogic");
var SolitaireAudioCfg_1 = require("../SolitaireAudioCfg");
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MenuResumeItem = /** @class */ (function () {
    function MenuResumeItem() {
        this._difficulty = SolitaireEnums_1.EGameType.EASY;
        this.resumeNode = null; // 继续上次游戏的节点
        this._scoreLabel = null; // 分数
    }
    Object.defineProperty(MenuResumeItem.prototype, "ResumeNode", {
        get: function () { return this.resumeNode; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuResumeItem.prototype, "ScoreLabel", {
        get: function () { return this._scoreLabel; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuResumeItem.prototype, "Difficulty", {
        get: function () { return this._difficulty; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property({ type: cc.Enum(SolitaireEnums_1.EGameType), visible: true })
    ], MenuResumeItem.prototype, "_difficulty", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], MenuResumeItem.prototype, "resumeNode", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], MenuResumeItem.prototype, "_scoreLabel", void 0);
    MenuResumeItem = __decorate([
        ccclass("MenuResumeItem")
    ], MenuResumeItem);
    return MenuResumeItem;
}());
var SolitaireMenuUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireMenuUIPanel, _super);
    function SolitaireMenuUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._playActionNode = null; // 右侧难度列表动作节点
        _this._toggleActionNode = null; // 左下角开关动作节点
        _this._resumeNodeList = [];
        return _this;
    }
    SolitaireMenuUIPanel.prototype.OnCreate = function () {
        //! 1. 入场动画 >> 记录初始位置，方便做入场动作
        this.SetUserData("K_POS_PLAY", this._playActionNode.position);
        this.SetUserData("K_POS_TOGGLE", this._toggleActionNode.position);
    };
    SolitaireMenuUIPanel.prototype.OnRelease = function () { };
    SolitaireMenuUIPanel.prototype.OnOpen = function (uiArgs) {
        this.SetIIClickHandler("OnPlayEasy", this.OnPlay.bind(this, SolitaireEnums_1.EGameType.EASY), true);
        this.SetIIClickHandler("OnPlayHard", this.OnPlay.bind(this, SolitaireEnums_1.EGameType.HARD), true);
        this.SetIIClickHandler("OnOptions", this.OnOptions.bind(this));
        //! 入场动画
        this.RunSwitchPlayUIAction(true, 0.4);
    };
    // 二级菜单切换动画
    SolitaireMenuUIPanel.prototype.RunSwitchPlayUIAction = function (isEnter, duration, callback) {
        if (isEnter) {
            ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
        }
        ii.UIUtil.moveAction(this._playActionNode, isEnter, this.GetUserData("K_POS_PLAY"), duration);
        ii.UIUtil.moveAction(this._toggleActionNode, isEnter, this.GetUserData("K_POS_TOGGLE"), duration, callback);
    };
    // 刷新上一次游戏类型标签
    SolitaireMenuUIPanel.prototype.UpdateResumeStatus = function () {
        var vegasMode = SolitaireLogic_1.SolitaireLogic.dataCache.vegasModeBV.v;
        var cards3Mode = SolitaireLogic_1.SolitaireLogic.dataCache.cards3ModeBV.v;
        this._resumeNodeList.forEach(function (it) {
            var hasSnapData = SolitaireLogic_1.SolitaireLogic.dataCache.HasSnapData(vegasMode, cards3Mode, it.Difficulty);
            it.ResumeNode.active = hasSnapData;
            if (hasSnapData) {
                var snapData = SolitaireLogic_1.SolitaireLogic.dataCache.ReadSnapData(vegasMode, cards3Mode, it.Difficulty);
                if (snapData != null) {
                    it.ScoreLabel.string = "" + snapData.score;
                }
            }
        });
    };
    //#region //! 按钮相关事件
    SolitaireMenuUIPanel.prototype.OnPlay = function (gameType) {
        var _this = this;
        this.PreLoadSkinRes(function () {
            ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireGameUIPanel.key, {
                gameType: gameType,
                resume: false,
                vegas: SolitaireLogic_1.SolitaireLogic.dataCache.vegasModeBV.v,
                card3: SolitaireLogic_1.SolitaireLogic.dataCache.cards3ModeBV.v,
            }, function () { return _this.Close(); });
        });
    };
    SolitaireMenuUIPanel.prototype.OnOptions = function () {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireOptionsUIPanel.key);
    };
    //#endregion
    // 预加载皮肤资源（可能因为选择皮肤，导致界面变化？）
    SolitaireMenuUIPanel.prototype.PreLoadSkinRes = function (onCompleted) {
        if (SolitaireLogic_1.SolitaireLogic.skin.IsInitSkinChanged()) {
            this.LoadResList(__spreadArrays(SolitaireLogic_1.SolitaireLogic.skin.GetPreloadResList()), onCompleted);
        }
        else {
            onCompleted();
        }
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireMenuUIPanel.prototype, "_playActionNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireMenuUIPanel.prototype, "_toggleActionNode", void 0);
    __decorate([
        property({ type: MenuResumeItem, visible: true })
    ], SolitaireMenuUIPanel.prototype, "_resumeNodeList", void 0);
    SolitaireMenuUIPanel = __decorate([
        ccclass
    ], SolitaireMenuUIPanel);
    return SolitaireMenuUIPanel;
}(ii.UIPanel));
exports.default = SolitaireMenuUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxNZW51XFxTb2xpdGFpcmVNZW51VUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQXlEO0FBQ3pELDBEQUF5RDtBQUN6RCxvREFBOEM7QUFDOUMsNERBQTJEO0FBRXJELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQUE7UUFDOEQsZ0JBQVcsR0FBYywwQkFBUyxDQUFDLElBQUksQ0FBQztRQUNuRCxlQUFVLEdBQVksSUFBSSxDQUFDLENBQUMsWUFBWTtRQUN2QyxnQkFBVyxHQUFhLElBQUksQ0FBQyxDQUFDLEtBQUs7SUFJdkYsQ0FBQztJQUhHLHNCQUFJLHNDQUFVO2FBQWQsY0FBNEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckQsc0JBQUksc0NBQVU7YUFBZCxjQUE2QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN2RCxzQkFBSSxzQ0FBVTthQUFkLGNBQThCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTE47UUFBakQsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQVMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQzt1REFBaUQ7SUFDM0Q7UUFBdEMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO3NEQUFvQztJQUNsQztRQUF2QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENB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USxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2lFQUF5QztJQUN4QztRQUF0QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7bUVBQTJDO0lBQ25DO1FBQTdDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxjQUFjLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2lFQUFnRDtJQUg1RSxvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQXNFeEM7SUFBRCwyQkFBQztDQXRFRCxBQXNFQyxDQXRFaUQsRUFBRSxDQUFDLE9BQU8sR0FzRTNEO2tCQXRFb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlR2FtZVVJUGFuZWxBcmdzIH0gZnJvbSBcIi4uL0dhbWUvVmlldy9Tb2xpdGFpcmVHYW1lVUlQYW5lbFwiO1xuaW1wb3J0IHsgU29saXRhaXJlTG9naWMgfSBmcm9tIFwiLi4vTG9naWMvU29saXRhaXJlTG9naWNcIjtcbmltcG9ydCB7IFNvbGl0YWlyZUF1ZGlvQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZUF1ZGlvQ2ZnXCI7XG5pbXBvcnQgeyBFR2FtZVR5cGUgfSBmcm9tIFwiLi4vU29saXRhaXJlRW51bXNcIjtcbmltcG9ydCB7IFNvbGl0YWlyZVByZWZhYkNmZyB9IGZyb20gXCIuLi9Tb2xpdGFpcmVQcmVmYWJDZmdcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiTWVudVJlc3VtZUl0ZW1cIilcbmNsYXNzIE1lbnVSZXN1bWVJdGVtIHtcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShFR2FtZVR5cGUpLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX2RpZmZpY3VsdHk6IEVHYW1lVHlwZSA9IEVHYW1lVHlwZS5FQVNZO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgcmVzdW1lTm9kZTogY2MuTm9kZSA9IG51bGw7IC8vIOe7p+e7reS4iuasoea4uOaIj+eahOiKgueCuVxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9zY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7IC8vIOWIhuaVsFxuICAgIGdldCBSZXN1bWVOb2RlKCk6IGNjLk5vZGUgeyByZXR1cm4gdGhpcy5yZXN1bWVOb2RlOyB9XG4gICAgZ2V0IFNjb3JlTGFiZWwoKTogY2MuTGFiZWwgeyByZXR1cm4gdGhpcy5fc2NvcmVMYWJlbDsgfVxuICAgIGdldCBEaWZmaWN1bHR5KCk6IEVHYW1lVHlwZSB7IHJldHVybiB0aGlzLl9kaWZmaWN1bHR5OyB9XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVNZW51VUlQYW5lbCBleHRlbmRzIGlpLlVJUGFuZWwge1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX3BsYXlBY3Rpb25Ob2RlOiBjYy5Ob2RlID0gbnVsbDsgLy8g5Y+z5L6n6Zq+5bqm5YiX6KGo5Yqo5L2c6IqC54K5XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfdG9nZ2xlQWN0aW9uTm9kZTogY2MuTm9kZSA9IG51bGw7IC8vIOW3puS4i+inkuW8gOWFs+WKqOS9nOiKgueCuVxuICAgIEBwcm9wZXJ0eSh7dHlwZTpNZW51UmVzdW1lSXRlbSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9yZXN1bWVOb2RlTGlzdDogTWVudVJlc3VtZUl0ZW1bXSA9IFtdO1xuXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQge1xuICAgICAgICAvLyEgMS4g5YWl5Zy65Yqo55S7ID4+IOiusOW9leWIneWni+S9jee9ru+8jOaWueS+v+WBmuWFpeWcuuWKqOS9nFxuICAgICAgICB0aGlzLlNldFVzZXJEYXRhKFwiS19QT1NfUExBWVwiLCB0aGlzLl9wbGF5QWN0aW9uTm9kZS5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuU2V0VXNlckRhdGEoXCJLX1BPU19UT0dHTEVcIiwgdGhpcy5fdG9nZ2xlQWN0aW9uTm9kZS5wb3NpdGlvbik7XG4gICAgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPblBsYXlFYXN5XCIsIHRoaXMuT25QbGF5LmJpbmQodGhpcywgRUdhbWVUeXBlLkVBU1kpLCB0cnVlKVxuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25QbGF5SGFyZFwiLCB0aGlzLk9uUGxheS5iaW5kKHRoaXMsIEVHYW1lVHlwZS5IQVJEKSwgdHJ1ZSlcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uT3B0aW9uc1wiLCB0aGlzLk9uT3B0aW9ucy5iaW5kKHRoaXMpKVxuXG4gICAgICAgIC8vISDlhaXlnLrliqjnlLtcbiAgICAgICAgdGhpcy5SdW5Td2l0Y2hQbGF5VUlBY3Rpb24odHJ1ZSwgMC40KTtcbiAgICB9XG4gICAgLy8g5LqM57qn6I+c5Y2V5YiH5o2i5Yqo55S7XG4gICAgcHJpdmF0ZSBSdW5Td2l0Y2hQbGF5VUlBY3Rpb24oaXNFbnRlcjogYm9vbGVhbiwgZHVyYXRpb246IG51bWJlciwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoaXNFbnRlcikge1xuICAgICAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0Lm1vdmUpO1xuICAgICAgICB9XG4gICAgICAgIGlpLlVJVXRpbC5tb3ZlQWN0aW9uKHRoaXMuX3BsYXlBY3Rpb25Ob2RlLCBpc0VudGVyLCB0aGlzLkdldFVzZXJEYXRhPGNjLlZlYzM+KFwiS19QT1NfUExBWVwiKSwgZHVyYXRpb24pO1xuICAgICAgICBpaS5VSVV0aWwubW92ZUFjdGlvbih0aGlzLl90b2dnbGVBY3Rpb25Ob2RlLCBpc0VudGVyLCB0aGlzLkdldFVzZXJEYXRhPGNjLlZlYzM+KFwiS19QT1NfVE9HR0xFXCIpLCBkdXJhdGlvbiwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vIOWIt+aWsOS4iuS4gOasoea4uOaIj+exu+Wei+agh+etvlxuICAgIHByaXZhdGUgVXBkYXRlUmVzdW1lU3RhdHVzKCkge1xuICAgICAgICBsZXQgdmVnYXNNb2RlID0gU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLnZlZ2FzTW9kZUJWLnY7XG4gICAgICAgIGxldCBjYXJkczNNb2RlID0gU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLmNhcmRzM01vZGVCVi52O1xuICAgICAgICB0aGlzLl9yZXN1bWVOb2RlTGlzdC5mb3JFYWNoKGl0PT57XG4gICAgICAgICAgICBsZXQgaGFzU25hcERhdGE6IGJvb2xlYW4gPSBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuSGFzU25hcERhdGEodmVnYXNNb2RlLCBjYXJkczNNb2RlLCBpdC5EaWZmaWN1bHR5KTtcbiAgICAgICAgICAgIGl0LlJlc3VtZU5vZGUuYWN0aXZlID0gaGFzU25hcERhdGE7XG4gICAgICAgICAgICBpZihoYXNTbmFwRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBzbmFwRGF0YSA9IFNvbGl0YWlyZUxvZ2ljLmRhdGFDYWNoZS5SZWFkU25hcERhdGEodmVnYXNNb2RlLCBjYXJkczNNb2RlLCBpdC5EaWZmaWN1bHR5KVxuICAgICAgICAgICAgICAgIGlmKHNuYXBEYXRhICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBpdC5TY29yZUxhYmVsLnN0cmluZyA9IGAke3NuYXBEYXRhLnNjb3JlfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vI3JlZ2lvbiAvLyEg5oyJ6ZKu55u45YWz5LqL5Lu2XG4gICAgcHJpdmF0ZSBPblBsYXkoZ2FtZVR5cGU6IEVHYW1lVHlwZSkge1xuICAgICAgICB0aGlzLlByZUxvYWRTa2luUmVzKCgpPT57XG4gICAgICAgICAgICBpaS5VSU1nci5pbnMuT3BlbjxTb2xpdGFpcmVHYW1lVUlQYW5lbEFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIucGFuZWwuU29saXRhaXJlR2FtZVVJUGFuZWwua2V5LCB7XG4gICAgICAgICAgICAgICAgZ2FtZVR5cGU6IGdhbWVUeXBlLFxuICAgICAgICAgICAgICAgIHJlc3VtZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVnYXM6IFNvbGl0YWlyZUxvZ2ljLmRhdGFDYWNoZS52ZWdhc01vZGVCVi52LFxuICAgICAgICAgICAgICAgIGNhcmQzOiBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUuY2FyZHMzTW9kZUJWLnYsXG4gICAgICAgICAgICB9LCAoKT0+dGhpcy5DbG9zZSgpKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBwcml2YXRlIE9uT3B0aW9ucygpIHtcbiAgICAgICAgaWkuVUlNZ3IuaW5zLk9wZW4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5wYW5lbC5Tb2xpdGFpcmVPcHRpb25zVUlQYW5lbC5rZXkpO1xuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vIOmihOWKoOi9veearuiCpOi1hOa6kO+8iOWPr+iDveWboOS4uumAieaLqeearuiCpO+8jOWvvOiHtOeVjOmdouWPmOWMlu+8n++8iVxuICAgIHByaXZhdGUgUHJlTG9hZFNraW5SZXMob25Db21wbGV0ZWQ6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKFNvbGl0YWlyZUxvZ2ljLnNraW4uSXNJbml0U2tpbkNoYW5nZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5Mb2FkUmVzTGlzdChbXG4gICAgICAgICAgICAgICAgLi4uU29saXRhaXJlTG9naWMuc2tpbi5HZXRQcmVsb2FkUmVzTGlzdCgpXG4gICAgICAgICAgICBdLCBvbkNvbXBsZXRlZClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBvbkNvbXBsZXRlZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19