
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectColumnUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c240eRySpVL6oIhvqgGqfrk', 'SolitaireThemesEffectColumnUI');
// GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectColumnUI.ts

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
var SolitaireGameDesktopUI_1 = require("../Game/View/SolitaireGameDesktopUI");
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireThemesEffectColumnUI = /** @class */ (function (_super) {
    __extends(SolitaireThemesEffectColumnUI, _super);
    function SolitaireThemesEffectColumnUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.receiveRoot = null;
        _this.playRoot = null;
        _this.m_DisplayPokerUI = [];
        return _this;
    }
    SolitaireThemesEffectColumnUI.prototype.OnCreate = function () { };
    SolitaireThemesEffectColumnUI.prototype.OnRelease = function () { };
    SolitaireThemesEffectColumnUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.node.x = this.args.x;
        this.args.receive.forEach(function (it, i) {
            _this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                point: it.point,
                suit: it.suit,
                backSkin: { kind: "classic", index: 0 },
                frontSkin: 0,
                status: it.status,
                faceSkin: 0
            }, _this.receiveRoot).CloseBy(_this));
        });
        this.args.play.forEach(function (it, i) {
            _this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                point: it.point,
                suit: it.suit,
                backSkin: { kind: "classic", index: 0 },
                frontSkin: 0,
                status: it.status,
                faceSkin: 0
            }, _this.playRoot).CloseBy(_this).PositionTo(0, _this.__GetPaddingYWith(_this.args.play, it, i)));
        });
    };
    SolitaireThemesEffectColumnUI.prototype.__GetPaddingYWith = function (play, it, index) {
        var dy = 0;
        for (var i = 0; i < index; ++i) {
            dy -= (play[i].status == SolitaireEnums_1.EPokerStatus.CLOSE ? SolitaireGameDesktopUI_1.default.PLAY_CLOSE_POKER_PADDING_Y : SolitaireGameDesktopUI_1.default.PLAY_OPEN_POKER_PADDING_Y);
        }
        return dy;
    };
    SolitaireThemesEffectColumnUI.prototype.SetSkin = function (skin) {
        this.m_DisplayPokerUI.forEach(function (ui) { return ui.setSkin(skin); });
    };
    __decorate([
        property(cc.Node)
    ], SolitaireThemesEffectColumnUI.prototype, "receiveRoot", void 0);
    __decorate([
        property(cc.Node)
    ], SolitaireThemesEffectColumnUI.prototype, "playRoot", void 0);
    SolitaireThemesEffectColumnUI = __decorate([
        ccclass
    ], SolitaireThemesEffectColumnUI);
    return SolitaireThemesEffectColumnUI;
}(ii.UIComp));
exports.default = SolitaireThemesEffectColumnUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxUaGVtZXNcXFNvbGl0YWlyZVRoZW1lc0VmZmVjdENvbHVtblVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUF5RTtBQUV6RSxvREFBd0Q7QUFDeEQsNERBQTJEO0FBRXJELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBVzFDO0lBQTJELGlEQUE0QztJQUF2RztRQUFBLHFFQTJDQztRQTFDNkIsaUJBQVcsR0FBWSxJQUFJLENBQUE7UUFDM0IsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUUxQyxzQkFBZ0IsR0FBOEIsRUFBRSxDQUFBOztJQXVDNUQsQ0FBQztJQXRDYSxnREFBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLGlEQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsOENBQU0sR0FBaEIsVUFBaUIsTUFBeUM7UUFBMUQsaUJBdUJDO1FBdEJHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzVCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUF1RCx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRTtnQkFDMUosS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLO2dCQUNmLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtnQkFDYixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUU7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTtnQkFDakIsUUFBUSxFQUFFLENBQUM7YUFDZCxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUF1RCx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRTtnQkFDMUosS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLO2dCQUNmLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtnQkFDYixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUU7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTTtnQkFDakIsUUFBUSxFQUFFLENBQUM7YUFDZCxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx5REFBaUIsR0FBekIsVUFBMEIsSUFBa0IsRUFBRSxFQUFjLEVBQUUsS0FBYTtRQUN2RSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksNkJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdDQUFzQixDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxnQ0FBc0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1NBQ3RKO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsK0NBQU8sR0FBUCxVQUFRLElBQW1CO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUUsT0FBQSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQXpDa0I7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0VBQW1DO0lBQ2xDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21FQUFnQztJQUZqQyw2QkFBNkI7UUFEakQsT0FBTztPQUNhLDZCQUE2QixDQTJDakQ7SUFBRCxvQ0FBQztDQTNDRCxBQTJDQyxDQTNDMEQsRUFBRSxDQUFDLE1BQU0sR0EyQ25FO2tCQTNDb0IsNkJBQTZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlU2tpbiB9IGZyb20gXCIuLi9EYXRhQ2FjaGUvU29saXRhaXJlU2tpbkRhdGFDYWNoZVwiO1xuaW1wb3J0IFNvbGl0YWlyZUdhbWVEZXNrdG9wVUkgZnJvbSBcIi4uL0dhbWUvVmlldy9Tb2xpdGFpcmVHYW1lRGVza3RvcFVJXCI7XG5pbXBvcnQgU29saXRhaXJlUG9rZXJEaXNwbGF5VUksIHsgU29saXRhaXJlUG9rZXJEaXNwbGF5VUlBcmdzIH0gZnJvbSBcIi4uL0dhbWUvVmlldy9Tb2xpdGFpcmVQb2tlckRpc3BsYXlVSVwiO1xuaW1wb3J0IHsgRVBva2VyU3RhdHVzLCBFU3VpdCB9IGZyb20gXCIuLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxudHlwZSBQb2tlclVJQ2ZnID0ge3N1aXQ6IEVTdWl0LCBwb2ludDogbnVtYmVyLCBzdGF0dXM6IEVQb2tlclN0YXR1c31cblxuZXhwb3J0IHR5cGUgU29saXRhaXJlVGhlbWVzRWZmZWN0Q29sdW1uVUlBcmdzID0ge1xuICAgIHg6IG51bWJlcixcbiAgICByZWNlaXZlOiBQb2tlclVJQ2ZnW10sXG4gICAgcGxheTogUG9rZXJVSUNmZ1tdXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSSBleHRlbmRzIGlpLlVJQ29tcDxTb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSUFyZ3M+IHtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHVibGljIHJlY2VpdmVSb290OiBjYy5Ob2RlID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHVibGljIHBsYXlSb290OiBjYy5Ob2RlID0gbnVsbCBcblxuICAgIHByaXZhdGUgbV9EaXNwbGF5UG9rZXJVSTogU29saXRhaXJlUG9rZXJEaXNwbGF5VUlbXSA9IFtdXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBTb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLmFyZ3MueDtcbiAgICAgICAgdGhpcy5hcmdzLnJlY2VpdmUuZm9yRWFjaCgoaXQsIGkpPT57XG4gICAgICAgICAgICB0aGlzLm1fRGlzcGxheVBva2VyVUkucHVzaChpaS5VSU1nci5pbnMuQ3JlYXRlPFNvbGl0YWlyZVBva2VyRGlzcGxheVVJLCBTb2xpdGFpcmVQb2tlckRpc3BsYXlVSUFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5Tb2xpdGFpcmVQb2tlckRpc3BsYXlVSS5rZXksIHtcbiAgICAgICAgICAgICAgICBwb2ludDogaXQucG9pbnQsXG4gICAgICAgICAgICAgICAgc3VpdDogaXQuc3VpdCxcbiAgICAgICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIixpbmRleDowIH0sXG4gICAgICAgICAgICAgICAgZnJvbnRTa2luOiAwLFxuICAgICAgICAgICAgICAgIHN0YXR1czogaXQuc3RhdHVzLFxuICAgICAgICAgICAgICAgIGZhY2VTa2luOiAwXG4gICAgICAgICAgICB9LCB0aGlzLnJlY2VpdmVSb290KS5DbG9zZUJ5KHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcmdzLnBsYXkuZm9yRWFjaCgoaXQsIGkpPT57XG4gICAgICAgICAgICB0aGlzLm1fRGlzcGxheVBva2VyVUkucHVzaChpaS5VSU1nci5pbnMuQ3JlYXRlPFNvbGl0YWlyZVBva2VyRGlzcGxheVVJLCBTb2xpdGFpcmVQb2tlckRpc3BsYXlVSUFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5Tb2xpdGFpcmVQb2tlckRpc3BsYXlVSS5rZXksIHtcbiAgICAgICAgICAgICAgICBwb2ludDogaXQucG9pbnQsXG4gICAgICAgICAgICAgICAgc3VpdDogaXQuc3VpdCxcbiAgICAgICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIixpbmRleDowIH0sXG4gICAgICAgICAgICAgICAgZnJvbnRTa2luOiAwLFxuICAgICAgICAgICAgICAgIHN0YXR1czogaXQuc3RhdHVzLFxuICAgICAgICAgICAgICAgIGZhY2VTa2luOiAwXG4gICAgICAgICAgICB9LCB0aGlzLnBsYXlSb290KS5DbG9zZUJ5KHRoaXMpLlBvc2l0aW9uVG8oMCwgdGhpcy5fX0dldFBhZGRpbmdZV2l0aCh0aGlzLmFyZ3MucGxheSwgaXQsIGkpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX19HZXRQYWRkaW5nWVdpdGgocGxheTogUG9rZXJVSUNmZ1tdLCBpdDogUG9rZXJVSUNmZywgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBkeSA9IDA7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGluZGV4OyArK2kpIHtcbiAgICAgICAgICAgIGR5IC09IChwbGF5W2ldLnN0YXR1cyA9PSBFUG9rZXJTdGF0dXMuQ0xPU0UgPyBTb2xpdGFpcmVHYW1lRGVza3RvcFVJLlBMQVlfQ0xPU0VfUE9LRVJfUEFERElOR19ZIDogU29saXRhaXJlR2FtZURlc2t0b3BVSS5QTEFZX09QRU5fUE9LRVJfUEFERElOR19ZKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkeTtcbiAgICB9XG5cbiAgICBTZXRTa2luKHNraW46IFNvbGl0YWlyZVNraW4pIHtcbiAgICAgICAgdGhpcy5tX0Rpc3BsYXlQb2tlclVJLmZvckVhY2godWk9PnVpLnNldFNraW4oc2tpbikpO1xuICAgIH1cbn0iXX0=