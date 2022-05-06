
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fff88GUhhxMb5VvjzvISTlq', 'SolitaireThemesEffectUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectUI.ts

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
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesEffectUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesEffectUI, _super);
    function SolitaireThemesEffectUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.bgPatternSprite = null;
        _this.columnsRoot = null;
        _this._offsetRoot = null;
        _this.m_Columns = [];
        _this.ColumnCfg = [
            { receive: [], play: [
                    { suit: SolitaireEnums_1.ESuit.MEIHUA, point: 13, status: SolitaireEnums_1.EPokerStatus.OPEN }
                ] },
            { receive: [{ suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.OPEN }], play: [
                    { suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.CLOSE },
                    { suit: SolitaireEnums_1.ESuit.FANGKUAI, point: 12, status: SolitaireEnums_1.EPokerStatus.OPEN }
                ] },
            { receive: [{ suit: SolitaireEnums_1.ESuit.HONGXIN, point: 13, status: SolitaireEnums_1.EPokerStatus.OPEN }], play: [
                    { suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.CLOSE },
                    { suit: SolitaireEnums_1.ESuit.HONGXIN, point: 1, status: SolitaireEnums_1.EPokerStatus.CLOSE },
                    { suit: SolitaireEnums_1.ESuit.HEITAO, point: 11, status: SolitaireEnums_1.EPokerStatus.OPEN }
                ] }
        ];
        return _this;
    }
    SolitaireThemesEffectUI.prototype.OnCreate = function () { };
    SolitaireThemesEffectUI.prototype.OnRelease = function () { };
    SolitaireThemesEffectUI.prototype.OnOpen = function (uiArgs) {
        if (this.args.offset != null) {
            this._offsetRoot.position = cc.v3(this.args.offset.x, this.args.offset.y);
        }
        var COLUMN_CNT = this.ColumnCfg.length;
        for (var i = 0; i < COLUMN_CNT; ++i) {
            this.m_Columns.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireThemesEffectColumnUI.key, {
                x: (i - (COLUMN_CNT - 1) * 0.5) * 114,
                receive: this.ColumnCfg[i].receive,
                play: this.ColumnCfg[i].play,
            }, this.columnsRoot).CloseBy(this));
        }
        this.SetSkin(this.args.skin);
    };
    SolitaireThemesEffectUI.prototype.SetSkin = function (skin) {
        var _this = this;
        this.m_Columns.forEach(function (column) { return column.SetSkin(skin); });
        this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin), function (sp) {
            _this.bgSprite.spriteFrame = _this.SetAssetProperty("BG_SKIN", sp);
        }, false, this.UUID_GROUP_KEY("BG_SKIN"));
        this.bgPatternSprite.node.active = skin.bgPatternSkin !== -1;
        if (skin.bgPatternSkin >= 0) {
            this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinUrl(skin.bgPatternSkin), function (sp) { return _this.bgPatternSprite.spriteFrame = _this.SetAssetProperty("BG_PATTERN_SKIN", sp); }, false, this.UUID_GROUP_KEY("BG_PATTERN_SKIN"));
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SolitaireThemesEffectUI.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SolitaireThemesEffectUI.prototype, "bgPatternSprite", void 0);
    __decorate([
        property(cc.Node)
    ], SolitaireThemesEffectUI.prototype, "columnsRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireThemesEffectUI.prototype, "_offsetRoot", void 0);
    SolitaireThemesEffectUI = __decorate([
        ccclass
    ], SolitaireThemesEffectUI);
    return SolitaireThemesEffectUI;
}(ii.UIComp));
exports.default = SolitaireThemesEffectUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUF3RDtBQUN4RCw0REFBMkQ7QUFDM0Qsc0VBQXFFO0FBRy9ELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBUTFDO0lBQXFELDJDQUFzQztJQUEzRjtRQUFBLHFFQWtEQztRQWpEd0IsY0FBUSxHQUFjLElBQUksQ0FBQztRQUMzQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUM1QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUNMLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRXRFLGVBQVMsR0FBb0MsRUFBRSxDQUFDO1FBQ3ZDLGVBQVMsR0FBRztZQUN6QixFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFO29CQUNoQixFQUFDLElBQUksRUFBRSxzQkFBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSw2QkFBWSxDQUFDLElBQUksRUFBQztpQkFDN0QsRUFBQztZQUNGLEVBQUMsT0FBTyxFQUFFLENBQUUsRUFBQyxJQUFJLEVBQUUsc0JBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsNkJBQVksQ0FBQyxJQUFJLEVBQUMsQ0FBRSxFQUFFLElBQUksRUFBRTtvQkFDNUUsRUFBQyxJQUFJLEVBQUUsc0JBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsNkJBQVksQ0FBQyxLQUFLLEVBQUM7b0JBQzFELEVBQUMsSUFBSSxFQUFFLHNCQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFF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QUFLLENBQUMsQ0FBQyxDQUFBO1FBQzVELElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBaUIsaURBQXVCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQUEsRUFBRSxJQUFFLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUEvRSxDQUErRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtTQUNqTztJQUNMLENBQUM7SUFoRG9CO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZEQUE0QjtJQUMzQjtRQUFwQixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvRUFBbUM7SUFDcEM7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0VBQXFDO0lBQ2I7UUFBekMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDO2dFQUFxQztJQUo3RCx1QkFBdUI7UUFEM0MsT0FBTztPQUNhLHVCQUF1QixDQWtEM0M7SUFBRCw4QkFBQztDQWxERCxBQWtEQyxDQWxEb0QsRUFBRSxDQUFDLE1BQU0sR0FrRDdEO2tCQWxEb0IsdUJBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlU2tpbiB9IGZyb20gXCIuLi9EYXRhQ2FjaGUvU29saXRhaXJlU2tpbkRhdGFDYWNoZVwiO1xuaW1wb3J0IHsgRVBva2VyU3RhdHVzLCBFU3VpdCB9IGZyb20gXCIuLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcbmltcG9ydCBTb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSSwgeyBTb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSUFyZ3MgfSBmcm9tIFwiLi9Tb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IHR5cGUgU29saXRhaXJlVGhlbWVzRWZmZWN0VUlBcmdzID0ge1xuICAgIHNraW46IFNvbGl0YWlyZVNraW4sXG4gICAgb2Zmc2V0PzogY2MuVmVjMlxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saXRhaXJlVGhlbWVzRWZmZWN0VUkgZXh0ZW5kcyBpaS5VSUNvbXA8U29saXRhaXJlVGhlbWVzRWZmZWN0VUlBcmdzPiB7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSkgYmdTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSkgYmdQYXR0ZXJuU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSBwcml2YXRlIGNvbHVtbnNSb290OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLk5vZGUsIHZpc2libGU6IHRydWV9KSBwcml2YXRlIF9vZmZzZXRSb290OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBwcml2YXRlIG1fQ29sdW1uczogU29saXRhaXJlVGhlbWVzRWZmZWN0Q29sdW1uVUlbXSA9IFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgQ29sdW1uQ2ZnID0gW1xuICAgICAgICB7cmVjZWl2ZTogW10sIHBsYXk6IFtcbiAgICAgICAgICAgIHtzdWl0OiBFU3VpdC5NRUlIVUEsIHBvaW50OiAxMywgc3RhdHVzOiBFUG9rZXJTdGF0dXMuT1BFTn1cbiAgICAgICAgXX0sXG4gICAgICAgIHtyZWNlaXZlOiBbIHtzdWl0OiBFU3VpdC5IT05HWElOLCBwb2ludDogMSwgc3RhdHVzOiBFUG9rZXJTdGF0dXMuT1BFTn0gXSwgcGxheTogW1xuICAgICAgICAgICAge3N1aXQ6IEVTdWl0LkhPTkdYSU4sIHBvaW50OiAxLCBzdGF0dXM6IEVQb2tlclN0YXR1cy5DTE9TRX1cbiAgICAgICAgICAgICx7c3VpdDogRVN1aXQuRkFOR0tVQUksIHBvaW50OiAxMiwgc3RhdHVzOiBFUG9rZXJTdGF0dXMuT1BFTn1cbiAgICAgICAgXX0sXG4gICAgICAgIHtyZWNlaXZlOiBbIHtzdWl0OiBFU3VpdC5IT05HWElOLCBwb2ludDogMTMsIHN0YXR1czogRVBva2VyU3RhdHVzLk9QRU59IF0sIHBsYXk6IFtcbiAgICAgICAgICAgIHtzdWl0OiBFU3VpdC5IT05HWElOLCBwb2ludDogMSwgc3RhdHVzOiBFUG9rZXJTdGF0dXMuQ0xPU0V9XG4gICAgICAgICAgICAse3N1aXQ6IEVTdWl0LkhPTkdYSU4sIHBvaW50OiAxLCBzdGF0dXM6IEVQb2tlclN0YXR1cy5DTE9TRX1cbiAgICAgICAgICAgICx7c3VpdDogRVN1aXQuSEVJVEFPLCBwb2ludDogMTEsIHN0YXR1czogRVBva2VyU3RhdHVzLk9QRU59XG4gICAgICAgIF19XG4gICAgXVxuICAgIFxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogU29saXRhaXJlVGhlbWVzRWZmZWN0VUlBcmdzKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuYXJncy5vZmZzZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0Um9vdC5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuYXJncy5vZmZzZXQueCwgdGhpcy5hcmdzLm9mZnNldC55KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBDT0xVTU5fQ05UID0gdGhpcy5Db2x1bW5DZmcubGVuZ3RoO1xuICAgICAgICBmb3IobGV0IGk9MDtpPENPTFVNTl9DTlQ7KytpKSB7XG4gICAgICAgICAgICB0aGlzLm1fQ29sdW1ucy5wdXNoKGlpLlVJTWdyLmlucy5DcmVhdGU8U29saXRhaXJlVGhlbWVzRWZmZWN0Q29sdW1uVUksIFNvbGl0YWlyZVRoZW1lc0VmZmVjdENvbHVtblVJQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlNvbGl0YWlyZVRoZW1lc0VmZmVjdENvbHVtblVJLmtleSwge1xuICAgICAgICAgICAgICAgIHg6IChpLShDT0xVTU5fQ05ULTEpKjAuNSkqMTE0LFxuICAgICAgICAgICAgICAgIHJlY2VpdmU6IHRoaXMuQ29sdW1uQ2ZnW2ldLnJlY2VpdmUsXG4gICAgICAgICAgICAgICAgcGxheTogdGhpcy5Db2x1bW5DZmdbaV0ucGxheSxcbiAgICAgICAgICAgIH0sIHRoaXMuY29sdW1uc1Jvb3QpLkNsb3NlQnkodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5TZXRTa2luKHRoaXMuYXJncy5za2luKTtcbiAgICB9XG5cbiAgICBTZXRTa2luKHNraW46IFNvbGl0YWlyZVNraW4pIHtcbiAgICAgICAgdGhpcy5tX0NvbHVtbnMuZm9yRWFjaChjb2x1bW49PmNvbHVtbi5TZXRTa2luKHNraW4pKTtcbiAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5iZ1NraW5Vcmwoc2tpbi5iZ1NraW4pLCBzcD0+e1xuICAgICAgICAgICAgdGhpcy5iZ1Nwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU2V0QXNzZXRQcm9wZXJ0eShcIkJHX1NLSU5cIiwgc3ApO1xuICAgICAgICB9LCBmYWxzZSwgdGhpcy5VVUlEX0dST1VQX0tFWShcIkJHX1NLSU5cIikpXG4gICAgICAgIHRoaXMuYmdQYXR0ZXJuU3ByaXRlLm5vZGUuYWN0aXZlID0gc2tpbi5iZ1BhdHRlcm5Ta2luICE9PSAtMVxuICAgICAgICBpZihza2luLmJnUGF0dGVyblNraW4gPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5iZ1BhdHRlcm5Ta2luVXJsKHNraW4uYmdQYXR0ZXJuU2tpbiksIHNwPT50aGlzLmJnUGF0dGVyblNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU2V0QXNzZXRQcm9wZXJ0eShcIkJHX1BBVFRFUk5fU0tJTlwiLCBzcCksIGZhbHNlLCB0aGlzLlVVSURfR1JPVVBfS0VZKFwiQkdfUEFUVEVSTl9TS0lOXCIpKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19