
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/UIHint.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d8039lTFVC74RAua10wlmH', 'UIHint');
// GameBundles/Solitaire/Script/Game/View/UIHint.ts

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
var Poker_1 = require("../Model/Poker");
var SolitaireType_1 = require("../SolitaireType");
var SolitaireGameDesktopUI_1 = require("./SolitaireGameDesktopUI");
var SolitaireAudioCfg_1 = require("../../SolitaireAudioCfg");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIHint = /** @class */ (function (_super) {
    __extends(UIHint, _super);
    function UIHint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mui_PokerRoot = null;
        _this.mui_HighLight = null;
        return _this;
    }
    Object.defineProperty(UIHint.prototype, "vm", {
        get: function () { return this.args; },
        enumerable: false,
        configurable: true
    });
    UIHint.prototype.OnCreate = function () { };
    UIHint.prototype.OnRelease = function () { };
    UIHint.prototype.OnOpen = function (uiArgs) {
        var hint = this.vm.hint;
        switch (hint.type) {
            case SolitaireType_1.ETOperationHint.PLAY_TO_PLAY:
                this.HintPlayToPlay(hint);
                break;
            case SolitaireType_1.ETOperationHint.PLAY_TO_RECEIVE:
                this.HintPlayToReceive(hint);
                break;
            case SolitaireType_1.ETOperationHint.OPEN_TO_RECEIVE:
                this.HintOpenToReceive(hint);
                break;
            case SolitaireType_1.ETOperationHint.OPEN_TO_PLAY:
                this.HintOpenToPlay(hint);
                break;
            case SolitaireType_1.ETOperationHint.CLOSE_TO_OPEN:
                this.HintCloseToOpen(hint);
                break;
            case SolitaireType_1.ETOperationHint.OPEN_TO_CLOSE:
                this.HintOpenToClose(hint);
                break;
            case SolitaireType_1.ETOperationHint.RECEIVE_TO_PLAY:
                this.HintReceiveToPlay(hint);
                break;
            default:
                break;
        }
    };
    UIHint.prototype.__HintCreateUIPoker = function (p) {
        // 从对象池创建扑克牌 UI，并添加到 moveNode 中
        var poker = new Poker_1.default(p.point, p.suit, p.status);
        return ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIPoker.key, poker).Init(p.view.faceSkin, p.view.backSkin, p.view.frontSkin);
    };
    UIHint.prototype.__HintFreeUIPoker = function (uiPokerList) {
        // 对象池回收扑克牌
        for (var i = uiPokerList.length - 1; i >= 0; --i) {
            uiPokerList[i].Close();
        }
    };
    UIHint.prototype.__HintPrepareFromPlay = function (fromPlayIndex) {
        var _this = this;
        var _fromPlayGroup = this.vm.ju.getPlayGroup(fromPlayIndex);
        var _fromPlayGroupRootOpenPoker = _fromPlayGroup.rootOpenPoker;
        var startPositionInWorld = _fromPlayGroupRootOpenPoker.view.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        this.setWorldPosition(startPositionInWorld);
        var uiPokerList = [];
        // 添加纸牌到 moveNode 下
        var _openPokers = _fromPlayGroup.GetOpenPokers();
        _openPokers.forEach(function (p, index) {
            // 从对象池创建扑克牌 UI，并添加到 moveNode 中
            var uiPoker = _this.__HintCreateUIPoker(p);
            var y = -index * SolitaireGameDesktopUI_1.default.PLAY_OPEN_POKER_PADDING_Y;
            uiPoker.node.position = cc.v3(0, y, 0);
            _this.AddUIPoker(uiPoker);
            uiPokerList.push(uiPoker);
        });
        this.setHighLightHeightEx(SolitaireGameDesktopUI_1.default.PLAY_OPEN_POKER_PADDING_Y * (_openPokers.length - 1));
        return uiPokerList;
    };
    UIHint.prototype.__HintPrepareFromReceive = function (fromReceiveIndex) {
        var startPositionInWorld = this.vm.desktop.ReceiveAreaList[fromReceiveIndex].convertToWorldSpaceAR(cc.Vec3.ZERO);
        this.setWorldPosition(startPositionInWorld);
        var _fromReceiveGroup = this.vm.ju.getReceiveGroup(fromReceiveIndex);
        var uiPokerList = [];
        var uiPoker = this.__HintCreateUIPoker(_fromReceiveGroup.top);
        uiPoker.node.position = cc.Vec3.ZERO;
        this.node.addChild(uiPoker.node);
        uiPokerList.push(uiPoker);
        this.setHighLightHeightEx(0);
        return uiPokerList;
    };
    UIHint.prototype.__HintPrepareFromOpen = function () {
        var startPositionInWorld = this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.Vec3.ZERO);
        this.setWorldPosition(startPositionInWorld);
        var uiPoker = this.__HintCreateUIPoker(this.vm.ju.getOpenGroupPoker(-1));
        uiPoker.node.position = cc.v3(0, 0, 0);
        this.AddUIPoker(uiPoker);
        var uiPokerList = [];
        uiPokerList.push(uiPoker);
        this.setHighLightHeightEx(0);
        return uiPokerList;
    };
    UIHint.prototype.__HintPrepareFromClose = function () {
        var startPositionInWorld = this.vm.desktop.CloseArea.convertToWorldSpaceAR(cc.Vec3.ZERO);
        this.setWorldPosition(startPositionInWorld);
        var uiPoker = this.__HintCreateUIPoker(this.vm.ju.getCloseGroupPoker(-1));
        uiPoker.node.position = cc.v3(0, 0, 0);
        this.AddUIPoker(uiPoker);
        var uiPokerList = [];
        uiPokerList.push(uiPoker);
        this.setHighLightHeightEx(0);
        return uiPokerList;
    };
    UIHint.prototype.__HintCalculateTargetPositionInWorldSpaceAROfToPlay = function (toPlayIndex) {
        var targetPositionInWorld = null;
        var _toPlayGroup = this.vm.ju.getPlayGroup(toPlayIndex);
        if (_toPlayGroup.IsPokersEmpty()) {
            targetPositionInWorld = this.vm.desktop.PlayAreaList[toPlayIndex].convertToWorldSpaceAR(cc.Vec3.ZERO);
        }
        else {
            var _toPlayGroupTopPoker = _toPlayGroup.top;
            targetPositionInWorld = _toPlayGroupTopPoker.view.node.convertToWorldSpaceAR(cc.v3(0, -SolitaireGameDesktopUI_1.default.PLAY_OPEN_POKER_PADDING_Y, 0));
        }
        return targetPositionInWorld;
    };
    UIHint.prototype.__HintCalculateTargetPositionInWorldSpaceAROfToReceive = function (toReceiveIndex) {
        return this.vm.desktop.ReceiveAreaList[toReceiveIndex].convertToWorldSpaceAR(cc.Vec3.ZERO);
    };
    UIHint.prototype.__HintCalculateTargetPositionInWorldSpaceAROfToOpen = function () {
        var openGroup = this.vm.ju.OpenAreaGroup;
        if (openGroup.pokers.length > 1) {
            return this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.v3(this.vm.desktop.PADDING_PLAY, 0, 0));
        }
        else if (openGroup.pokers.length == 1) {
            return this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.v3(this.vm.desktop.PADDING_PLAY / 2.0, 0, 0));
        }
        else {
            return this.vm.desktop.OpenArea.convertToWorldSpaceAR(cc.Vec3.ZERO);
        }
    };
    UIHint.prototype.__HintActioin = function (targetPosInWorldSpace, uiPokerList) {
        var _this = this;
        var targetPos = this.node.parent.convertToNodeSpaceAR(targetPosInWorldSpace);
        var duration = this.vm.desktop.__timeOfDistance(this.node.position, targetPos);
        this.RunHintAction(duration, targetPos, function () {
            _this.__HintFreeUIPoker(uiPokerList);
            _this.Close();
        });
    };
    UIHint.prototype.HintPlayToPlay = function (hint) {
        var uiPokerList = this.__HintPrepareFromPlay(hint.from);
        var targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToPlay(hint.to);
        this.__HintActioin(targetPosInWorldSpace, uiPokerList);
    };
    UIHint.prototype.HintPlayToReceive = function (hint) {
        var uiPokerList = this.__HintPrepareFromPlay(hint.from);
        var targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToReceive(hint.to);
        this.__HintActioin(targetPosInWorldSpace, uiPokerList);
    };
    UIHint.prototype.HintOpenToReceive = function (hint) {
        var uiPokerList = this.__HintPrepareFromOpen();
        var targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToReceive(hint.to);
        this.__HintActioin(targetPosInWorldSpace, uiPokerList);
    };
    UIHint.prototype.HintOpenToPlay = function (hint) {
        var uiPokerList = this.__HintPrepareFromOpen();
        var targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToPlay(hint.to);
        this.__HintActioin(targetPosInWorldSpace, uiPokerList);
    };
    UIHint.prototype.HintCloseToOpen = function (hint) {
        var uiPokerList = this.__HintPrepareFromClose();
        var targetPosInWorldSpace = this.__HintCalculateTargetPositionInWorldSpaceAROfToOpen();
        this.__HintActioin(targetPosInWorldSpace, uiPokerList);
    };
    UIHint.prototype.HintOpenToClose = function (hint) {
        var TIME = 0.2;
        cc.tween(this.vm.desktop.CloseAreaBackground)
            .to(TIME, { scale: 1.2 })
            .to(TIME * 2, { scale: 0.9 })
            .to(TIME * 2, { scale: 1.2 })
            .to(TIME, { scale: 1 })
            .start();
    };
    UIHint.prototype.HintReceiveToPlay = function (hint) {
        var uiPokerList = this.__HintPrepareFromReceive(hint.from);
        var targetPos = this.__HintCalculateTargetPositionInWorldSpaceAROfToPlay(hint.to);
        this.__HintActioin(targetPos, uiPokerList);
    };
    UIHint.prototype.setWorldPosition = function (wp) {
        this.node.setPosition(this.node.parent.convertToNodeSpaceAR(wp));
    };
    UIHint.prototype.AddUIPoker = function (uiPoker) {
        this.mui_PokerRoot.addChild(uiPoker.node);
    };
    UIHint.prototype.setHighLightHeightEx = function (height) {
        this.mui_HighLight.height = 128 + height;
    };
    UIHint.prototype.RunHintAction = function (duration, targetPos, RecycleCallback) {
        var _this = this;
        this.mui_HighLight.opacity = 0;
        var fadeInDuratioin = 0.4;
        var fadeOutDuratioin = 0.8;
        cc.tween(this.mui_HighLight)
            .to(fadeInDuratioin, { opacity: 255 })
            .start();
        cc.tween(this.node)
            .delay(fadeInDuratioin)
            .to(duration, { position: targetPos })
            .call(function () {
            ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
            cc.tween(_this.mui_HighLight)
                .to(fadeOutDuratioin, { opacity: 0 })
                .start();
        })
            .delay(fadeOutDuratioin)
            .call(function () {
            RecycleCallback();
        })
            .start();
    };
    __decorate([
        property(cc.Node)
    ], UIHint.prototype, "mui_PokerRoot", void 0);
    __decorate([
        property(cc.Node)
    ], UIHint.prototype, "mui_HighLight", void 0);
    UIHint = __decorate([
        ccclass
    ], UIHint);
    return UIHint;
}(ii.UIComp));
exports.default = UIHint;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxVSUhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQW1DO0FBRW5DLGtEQUFrRTtBQUVsRSxtRUFBOEQ7QUFFOUQsNkRBQTREO0FBQzVELCtEQUE4RDtBQVV4RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBcUI7SUFBekQ7UUFBQSxxRUFvTkM7UUFuTjhCLG1CQUFhLEdBQVksSUFBSSxDQUFBO1FBQzdCLG1CQUFhLEdBQVksSUFBSSxDQUFBOztJQWtONUQsQ0FBQztJQWpORyxzQkFBSSxzQkFBRTthQUFOLGNBQXVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2hDLHlCQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsMEJBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQix1QkFBTSxHQUFoQixVQUFpQixNQUFrQjtRQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQTtRQUN2QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLCtCQUFlLENBQUMsWUFBWTtnQkFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDekIsTUFBTTtZQUNWLEtBQUssK0JBQWUsQ0FBQyxlQUFlO2dCQUNoQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzVCLE1BQU07WUFDVixLQUFLLCtCQUFlLENBQUMsZUFBZTtnQkFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUM1QixNQUFNO1lBQ1YsS0FBSywrQkFBZSxDQUFDLFlBQVk7Z0JB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QUFzQztJQUNyQztRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFBc0M7SUFGdkMsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQW9OMUI7SUFBRCxhQUFDO0NBcE5ELEFBb05DLENBcE5tQyxFQUFFLENBQUMsTUFBTSxHQW9ONUM7a0JBcE5vQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBva2VyIGZyb20gXCIuLi9Nb2RlbC9Qb2tlclwiO1xuaW1wb3J0IFVJUG9rZXIgZnJvbSBcIi4vVUlQb2tlclwiO1xuaW1wb3J0IHsgRVRPcGVyYXRpb25IaW50LCBPcGVyYXRpb25IaW50IH0gZnJvbSBcIi4uL1NvbGl0YWlyZVR5cGVcIjtcbmltcG9ydCBVSUhpbnRNZ3IgZnJvbSBcIi4vVUlIaW50TWdyXCI7XG5pbXBvcnQgU29saXRhaXJlR2FtZURlc2t0b3BVSSBmcm9tIFwiLi9Tb2xpdGFpcmVHYW1lRGVza3RvcFVJXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVKdSB9IGZyb20gXCIuLi9Nb2RlbC9Tb2xpdGFpcmVKdVwiO1xuaW1wb3J0IHsgU29saXRhaXJlQXVkaW9DZmcgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlQXVkaW9DZmdcIjtcbmltcG9ydCB7IFNvbGl0YWlyZVByZWZhYkNmZyB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVQcmVmYWJDZmdcIjtcblxuXG5leHBvcnQgdHlwZSBVSUhpbnRBcmdzID0ge1xuICAgIGhpbnQ6IE9wZXJhdGlvbkhpbnQsXG4gICAgdWlNZ3I6IFVJSGludE1ncixcbiAgICBkZXNrdG9wOiBTb2xpdGFpcmVHYW1lRGVza3RvcFVJLFxuICAgIGp1OiBTb2xpdGFpcmVKdVxufVxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJSGludCBleHRlbmRzIGlpLlVJQ29tcDxVSUhpbnRBcmdzPiB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByaXZhdGUgbXVpX1Bva2VyUm9vdDogY2MuTm9kZSA9IG51bGwgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIHByaXZhdGUgbXVpX0hpZ2hMaWdodDogY2MuTm9kZSA9IG51bGwgXG4gICAgZ2V0IHZtKCk6IFVJSGludEFyZ3MgeyByZXR1cm4gdGhpcy5hcmdzOyB9XG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBVSUhpbnRBcmdzKTogdm9pZCB7XG4gICAgICAgIGxldCBoaW50ID0gdGhpcy52bS5oaW50XG4gICAgICAgIHN3aXRjaCAoaGludC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVUT3BlcmF0aW9uSGludC5QTEFZX1RPX1BMQVk6XG4gICAgICAgICAgICAgICAgdGhpcy5IaW50UGxheVRvUGxheShoaW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVE9wZXJhdGlvbkhpbnQuUExBWV9UT19SRUNFSVZFOlxuICAgICAgICAgICAgICAgIHRoaXMuSGludFBsYXlUb1JlY2VpdmUoaGludClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRVRPcGVyYXRpb25IaW50Lk9QRU5fVE9fUkVDRUlWRTpcbiAgICAgICAgICAgICAgICB0aGlzLkhpbnRPcGVuVG9SZWNlaXZlKGhpbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVUT3BlcmF0aW9uSGludC5PUEVOX1RPX1BMQVk6XG4gICAgICAgICAgICAgICAgdGhpcy5IaW50T3BlblRvUGxheShoaW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVE9wZXJhdGlvbkhpbnQuQ0xPU0VfVE9fT1BFTjpcbiAgICAgICAgICAgICAgICB0aGlzLkhpbnRDbG9zZVRvT3BlbihoaW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVE9wZXJhdGlvbkhpbnQuT1BFTl9UT19DTE9TRTpcbiAgICAgICAgICAgICAgICB0aGlzLkhpbnRPcGVuVG9DbG9zZShoaW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFVE9wZXJhdGlvbkhpbnQuUkVDRUlWRV9UT19QTEFZOlxuICAgICAgICAgICAgICAgIHRoaXMuSGludFJlY2VpdmVUb1BsYXkoaGludClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfX0hpbnRDcmVhdGVVSVBva2VyKHA6IFBva2VyKTogVUlQb2tlciB7XG4gICAgICAgIC8vIOS7juWvueixoeaxoOWIm+W7uuaJkeWFi+eJjCBVSe+8jOW5tua3u+WKoOWIsCBtb3ZlTm9kZSDkuK1cbiAgICAgICAgbGV0IHBva2VyOiBQb2tlciA9IG5ldyBQb2tlcihwLnBvaW50LCBwLnN1aXQsIHAuc3RhdHVzKVxuICAgICAgICByZXR1cm4gaWkuVUlNZ3IuaW5zLkNyZWF0ZTxVSVBva2VyLCBQb2tlcj4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlVJUG9rZXIua2V5LCBwb2tlcikuSW5pdChwLnZpZXcuZmFjZVNraW4sIHAudmlldy5iYWNrU2tpbiwgcC52aWV3LmZyb250U2tpbik7XG4gICAgfVxuICAgIHByaXZhdGUgX19IaW50RnJlZVVJUG9rZXIodWlQb2tlckxpc3Q6IFVJUG9rZXJbXSl7XG4gICAgICAgIC8vIOWvueixoeaxoOWbnuaUtuaJkeWFi+eJjFxuICAgICAgICBmb3IobGV0IGk9dWlQb2tlckxpc3QubGVuZ3RoLTE7IGk+PTA7IC0taSl7XG4gICAgICAgICAgICB1aVBva2VyTGlzdFtpXS5DbG9zZSgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfX0hpbnRQcmVwYXJlRnJvbVBsYXkoZnJvbVBsYXlJbmRleDogbnVtYmVyKTogVUlQb2tlcltdIHtcbiAgICAgICAgbGV0IF9mcm9tUGxheUdyb3VwID0gdGhpcy52bS5qdS5nZXRQbGF5R3JvdXAoZnJvbVBsYXlJbmRleClcbiAgICAgICAgbGV0IF9mcm9tUGxheUdyb3VwUm9vdE9wZW5Qb2tlciA9IF9mcm9tUGxheUdyb3VwLnJvb3RPcGVuUG9rZXJcbiAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb25JbldvcmxkOiBjYy5WZWMzID0gX2Zyb21QbGF5R3JvdXBSb290T3BlblBva2VyLnZpZXcubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxuICAgICAgICB0aGlzLnNldFdvcmxkUG9zaXRpb24oc3RhcnRQb3NpdGlvbkluV29ybGQpXG4gICAgICAgIGxldCB1aVBva2VyTGlzdCA9IFtdXG4gICAgICAgIC8vIOa3u+WKoOe6uOeJjOWIsCBtb3ZlTm9kZSDkuItcbiAgICAgICAgbGV0IF9vcGVuUG9rZXJzID0gX2Zyb21QbGF5R3JvdXAuR2V0T3BlblBva2VycygpXG4gICAgICAgIF9vcGVuUG9rZXJzLmZvckVhY2goKHAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyDku47lr7nosaHmsaDliJvlu7rmiZHlhYvniYwgVUnvvIzlubbmt7vliqDliLAgbW92ZU5vZGUg5LitXG4gICAgICAgICAgICBsZXQgdWlQb2tlciA9IHRoaXMuX19IaW50Q3JlYXRlVUlQb2tlcihwKVxuICAgICAgICAgICAgbGV0IHkgPSAtaW5kZXggKiBTb2xpdGFpcmVHYW1lRGVza3RvcFVJLlBMQVlfT1BFTl9QT0tFUl9QQURESU5HX1lcbiAgICAgICAgICAgIHVpUG9rZXIubm9kZS5wb3NpdGlvbiA9IGNjLnYzKDAsIHksIDApXG4gICAgICAgICAgICB0aGlzLkFkZFVJUG9rZXIodWlQb2tlcilcbiAgICAgICAgICAgIHVpUG9rZXJMaXN0LnB1c2godWlQb2tlcilcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZXRIaWdoTGlnaHRIZWlnaHRFeChTb2xpdGFpcmVHYW1lRGVza3RvcFVJLlBMQVlfT1BFTl9QT0tFUl9QQURESU5HX1kqKF9vcGVuUG9rZXJzLmxlbmd0aC0xKSlcblxuICAgICAgICByZXR1cm4gdWlQb2tlckxpc3RcbiAgICB9XG4gICAgcHJpdmF0ZSBfX0hpbnRQcmVwYXJlRnJvbVJlY2VpdmUoZnJvbVJlY2VpdmVJbmRleDogbnVtYmVyKTogVUlQb2tlcltdIHtcbiAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb25JbldvcmxkOiBjYy5WZWMzID0gdGhpcy52bS5kZXNrdG9wLlJlY2VpdmVBcmVhTGlzdFtmcm9tUmVjZWl2ZUluZGV4XS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxuICAgICAgICB0aGlzLnNldFdvcmxkUG9zaXRpb24oc3RhcnRQb3NpdGlvbkluV29ybGQpXG5cbiAgICAgICAgbGV0IF9mcm9tUmVjZWl2ZUdyb3VwID0gdGhpcy52bS5qdS5nZXRSZWNlaXZlR3JvdXAoZnJvbVJlY2VpdmVJbmRleClcbiAgICAgICAgbGV0IHVpUG9rZXJMaXN0ID0gW11cbiAgICAgICAgbGV0IHVpUG9rZXIgPSB0aGlzLl9fSGludENyZWF0ZVVJUG9rZXIoX2Zyb21SZWNlaXZlR3JvdXAudG9wKVxuICAgICAgICB1aVBva2VyLm5vZGUucG9zaXRpb24gPSBjYy5WZWMzLlpFUk9cbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHVpUG9rZXIubm9kZSlcbiAgICAgICAgdWlQb2tlckxpc3QucHVzaCh1aVBva2VyKVxuICAgICAgICB0aGlzLnNldEhpZ2hMaWdodEhlaWdodEV4KDApXG4gICAgICAgIHJldHVybiB1aVBva2VyTGlzdFxuICAgIH1cbiAgICBwcml2YXRlIF9fSGludFByZXBhcmVGcm9tT3BlbigpOiBVSVBva2VyW10ge1xuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbkluV29ybGQ6IGNjLlZlYzMgPSB0aGlzLnZtLmRlc2t0b3AuT3BlbkFyZWEuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTylcbiAgICAgICAgdGhpcy5zZXRXb3JsZFBvc2l0aW9uKHN0YXJ0UG9zaXRpb25JbldvcmxkKVxuXG4gICAgICAgIGxldCB1aVBva2VyID0gdGhpcy5fX0hpbnRDcmVhdGVVSVBva2VyKHRoaXMudm0uanUuZ2V0T3Blbkdyb3VwUG9rZXIoLTEpKVxuICAgICAgICB1aVBva2VyLm5vZGUucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKVxuICAgICAgICB0aGlzLkFkZFVJUG9rZXIodWlQb2tlcilcblxuICAgICAgICBsZXQgdWlQb2tlckxpc3QgPSBbXVxuICAgICAgICB1aVBva2VyTGlzdC5wdXNoKHVpUG9rZXIpXG5cbiAgICAgICAgdGhpcy5zZXRIaWdoTGlnaHRIZWlnaHRFeCgwKVxuXG4gICAgICAgIHJldHVybiB1aVBva2VyTGlzdFxuICAgIH1cbiAgICBwcml2YXRlIF9fSGludFByZXBhcmVGcm9tQ2xvc2UoKTogVUlQb2tlcltdIHtcbiAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb25JbldvcmxkOiBjYy5WZWMzID0gdGhpcy52bS5kZXNrdG9wLkNsb3NlQXJlYS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxuICAgICAgICB0aGlzLnNldFdvcmxkUG9zaXRpb24oc3RhcnRQb3NpdGlvbkluV29ybGQpXG5cbiAgICAgICAgbGV0IHVpUG9rZXIgPSB0aGlzLl9fSGludENyZWF0ZVVJUG9rZXIodGhpcy52bS5qdS5nZXRDbG9zZUdyb3VwUG9rZXIoLTEpKVxuICAgICAgICB1aVBva2VyLm5vZGUucG9zaXRpb24gPSBjYy52MygwLCAwLCAwKVxuICAgICAgICB0aGlzLkFkZFVJUG9rZXIodWlQb2tlcilcblxuICAgICAgICBsZXQgdWlQb2tlckxpc3QgPSBbXVxuICAgICAgICB1aVBva2VyTGlzdC5wdXNoKHVpUG9rZXIpXG4gICAgICAgIHRoaXMuc2V0SGlnaExpZ2h0SGVpZ2h0RXgoMClcbiAgICAgICAgcmV0dXJuIHVpUG9rZXJMaXN0XG4gICAgfVxuICAgIHByaXZhdGUgX19IaW50Q2FsY3VsYXRlVGFyZ2V0UG9zaXRpb25JbldvcmxkU3BhY2VBUk9mVG9QbGF5KHRvUGxheUluZGV4OiBudW1iZXIpOiBjYy5WZWMzIHtcbiAgICAgICAgbGV0IHRhcmdldFBvc2l0aW9uSW5Xb3JsZDogY2MuVmVjMyA9IG51bGxcbiAgICAgICAgbGV0IF90b1BsYXlHcm91cCA9IHRoaXMudm0uanUuZ2V0UGxheUdyb3VwKHRvUGxheUluZGV4KVxuICAgICAgICBpZihfdG9QbGF5R3JvdXAuSXNQb2tlcnNFbXB0eSgpKXtcbiAgICAgICAgICAgIHRhcmdldFBvc2l0aW9uSW5Xb3JsZCA9IHRoaXMudm0uZGVza3RvcC5QbGF5QXJlYUxpc3RbdG9QbGF5SW5kZXhdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IF90b1BsYXlHcm91cFRvcFBva2VyID0gX3RvUGxheUdyb3VwLnRvcFxuICAgICAgICAgICAgdGFyZ2V0UG9zaXRpb25JbldvcmxkID0gX3RvUGxheUdyb3VwVG9wUG9rZXIudmlldy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MygwLCAtU29saXRhaXJlR2FtZURlc2t0b3BVSS5QTEFZX09QRU5fUE9LRVJfUEFERElOR19ZLCAwKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0UG9zaXRpb25JbldvcmxkXG4gICAgfVxuICAgIHByaXZhdGUgX19IaW50Q2FsY3VsYXRlVGFyZ2V0UG9zaXRpb25JbldvcmxkU3BhY2VBUk9mVG9SZWNlaXZlKHRvUmVjZWl2ZUluZGV4OiBudW1iZXIpOiBjYy5WZWMzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudm0uZGVza3RvcC5SZWNlaXZlQXJlYUxpc3RbdG9SZWNlaXZlSW5kZXhdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pXG4gICAgfVxuICAgIHByaXZhdGUgX19IaW50Q2FsY3VsYXRlVGFyZ2V0UG9zaXRpb25JbldvcmxkU3BhY2VBUk9mVG9PcGVuKCk6IGNjLlZlYzMge1xuICAgICAgICBsZXQgb3Blbkdyb3VwID0gdGhpcy52bS5qdS5PcGVuQXJlYUdyb3VwO1xuICAgICAgICBpZihvcGVuR3JvdXAucG9rZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZtLmRlc2t0b3AuT3BlbkFyZWEuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYzKHRoaXMudm0uZGVza3RvcC5QQURESU5HX1BMQVksIDAsIDApKVxuICAgICAgICB9ZWxzZSBpZihvcGVuR3JvdXAucG9rZXJzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52bS5kZXNrdG9wLk9wZW5BcmVhLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52Myh0aGlzLnZtLmRlc2t0b3AuUEFERElOR19QTEFZLzIuMCwgMCwgMCkpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudm0uZGVza3RvcC5PcGVuQXJlYS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX19IaW50QWN0aW9pbih0YXJnZXRQb3NJbldvcmxkU3BhY2U6IGNjLlZlYzMsIHVpUG9rZXJMaXN0OiBVSVBva2VyW10pe1xuICAgICAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3NJbldvcmxkU3BhY2UpXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IHRoaXMudm0uZGVza3RvcC5fX3RpbWVPZkRpc3RhbmNlKHRoaXMubm9kZS5wb3NpdGlvbiwgdGFyZ2V0UG9zKVxuICAgICAgICB0aGlzLlJ1bkhpbnRBY3Rpb24oZHVyYXRpb24sIHRhcmdldFBvcywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fX0hpbnRGcmVlVUlQb2tlcih1aVBva2VyTGlzdClcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBwcml2YXRlIEhpbnRQbGF5VG9QbGF5KGhpbnQ6IE9wZXJhdGlvbkhpbnQpIHtcbiAgICAgICAgbGV0IHVpUG9rZXJMaXN0ID0gdGhpcy5fX0hpbnRQcmVwYXJlRnJvbVBsYXkoaGludC5mcm9tKVxuICAgICAgICBsZXQgdGFyZ2V0UG9zSW5Xb3JsZFNwYWNlID0gdGhpcy5fX0hpbnRDYWxjdWxhdGVUYXJnZXRQb3NpdGlvbkluV29ybGRTcGFjZUFST2ZUb1BsYXkoaGludC50bylcbiAgICAgICAgdGhpcy5fX0hpbnRBY3Rpb2luKHRhcmdldFBvc0luV29ybGRTcGFjZSwgdWlQb2tlckxpc3QpXG4gICAgfVxuICAgIHByaXZhdGUgSGludFBsYXlUb1JlY2VpdmUoaGludDogT3BlcmF0aW9uSGludCkge1xuICAgICAgICBsZXQgdWlQb2tlckxpc3QgPSB0aGlzLl9fSGludFByZXBhcmVGcm9tUGxheShoaW50LmZyb20pXG4gICAgICAgIGxldCB0YXJnZXRQb3NJbldvcmxkU3BhY2UgPSB0aGlzLl9fSGludENhbGN1bGF0ZVRhcmdldFBvc2l0aW9uSW5Xb3JsZFNwYWNlQVJPZlRvUmVjZWl2ZShoaW50LnRvKVxuICAgICAgICB0aGlzLl9fSGludEFjdGlvaW4odGFyZ2V0UG9zSW5Xb3JsZFNwYWNlLCB1aVBva2VyTGlzdClcbiAgICB9XG4gICAgcHJpdmF0ZSBIaW50T3BlblRvUmVjZWl2ZShoaW50OiBPcGVyYXRpb25IaW50KSB7XG4gICAgICAgIGxldCB1aVBva2VyTGlzdCA9IHRoaXMuX19IaW50UHJlcGFyZUZyb21PcGVuKClcbiAgICAgICAgbGV0IHRhcmdldFBvc0luV29ybGRTcGFjZSA9IHRoaXMuX19IaW50Q2FsY3VsYXRlVGFyZ2V0UG9zaXRpb25JbldvcmxkU3BhY2VBUk9mVG9SZWNlaXZlKGhpbnQudG8pXG4gICAgICAgIHRoaXMuX19IaW50QWN0aW9pbih0YXJnZXRQb3NJbldvcmxkU3BhY2UsIHVpUG9rZXJMaXN0KVxuICAgIH1cbiAgICBwcml2YXRlIEhpbnRPcGVuVG9QbGF5KGhpbnQ6IE9wZXJhdGlvbkhpbnQpIHtcbiAgICAgICAgbGV0IHVpUG9rZXJMaXN0ID0gdGhpcy5fX0hpbnRQcmVwYXJlRnJvbU9wZW4oKVxuICAgICAgICBsZXQgdGFyZ2V0UG9zSW5Xb3JsZFNwYWNlID0gdGhpcy5fX0hpbnRDYWxjdWxhdGVUYXJnZXRQb3NpdGlvbkluV29ybGRTcGFjZUFST2ZUb1BsYXkoaGludC50bylcbiAgICAgICAgdGhpcy5fX0hpbnRBY3Rpb2luKHRhcmdldFBvc0luV29ybGRTcGFjZSwgdWlQb2tlckxpc3QpXG4gICAgfVxuICAgIHByaXZhdGUgSGludENsb3NlVG9PcGVuKGhpbnQ6IE9wZXJhdGlvbkhpbnQpIHtcbiAgICAgICAgbGV0IHVpUG9rZXJMaXN0ID0gdGhpcy5fX0hpbnRQcmVwYXJlRnJvbUNsb3NlKClcbiAgICAgICAgbGV0IHRhcmdldFBvc0luV29ybGRTcGFjZSA9IHRoaXMuX19IaW50Q2FsY3VsYXRlVGFyZ2V0UG9zaXRpb25JbldvcmxkU3BhY2VBUk9mVG9PcGVuKClcbiAgICAgICAgdGhpcy5fX0hpbnRBY3Rpb2luKHRhcmdldFBvc0luV29ybGRTcGFjZSwgdWlQb2tlckxpc3QpXG4gICAgfVxuICAgIHByaXZhdGUgSGludE9wZW5Ub0Nsb3NlKGhpbnQ6IE9wZXJhdGlvbkhpbnQpIHtcbiAgICAgICAgbGV0IFRJTUUgPSAwLjJcbiAgICAgICAgY2MudHdlZW4odGhpcy52bS5kZXNrdG9wLkNsb3NlQXJlYUJhY2tncm91bmQpXG4gICAgICAgICAgICAudG8oVElNRSwge3NjYWxlOiAxLjJ9KVxuICAgICAgICAgICAgLnRvKFRJTUUqMiwge3NjYWxlOiAwLjl9KVxuICAgICAgICAgICAgLnRvKFRJTUUqMiwge3NjYWxlOiAxLjJ9KVxuICAgICAgICAgICAgLnRvKFRJTUUsIHtzY2FsZTogMX0pXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgIH1cbiAgICBwcml2YXRlIEhpbnRSZWNlaXZlVG9QbGF5KGhpbnQ6IE9wZXJhdGlvbkhpbnQpIHtcbiAgICAgICAgbGV0IHVpUG9rZXJMaXN0ID0gdGhpcy5fX0hpbnRQcmVwYXJlRnJvbVJlY2VpdmUoaGludC5mcm9tKVxuICAgICAgICBsZXQgdGFyZ2V0UG9zID0gdGhpcy5fX0hpbnRDYWxjdWxhdGVUYXJnZXRQb3NpdGlvbkluV29ybGRTcGFjZUFST2ZUb1BsYXkoaGludC50bylcbiAgICAgICAgdGhpcy5fX0hpbnRBY3Rpb2luKHRhcmdldFBvcywgdWlQb2tlckxpc3QpXG4gICAgfVxuXG4gICAgc2V0V29ybGRQb3NpdGlvbih3cDogY2MuVmVjMykge1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod3ApIClcbiAgICB9XG4gICAgcHJpdmF0ZSBBZGRVSVBva2VyKHVpUG9rZXI6IFVJUG9rZXIpIHtcbiAgICAgICAgdGhpcy5tdWlfUG9rZXJSb290LmFkZENoaWxkKHVpUG9rZXIubm9kZSlcbiAgICB9XG4gICAgc2V0SGlnaExpZ2h0SGVpZ2h0RXgoaGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tdWlfSGlnaExpZ2h0LmhlaWdodCA9IDEyOCArIGhlaWdodFxuICAgIH1cblxuICAgIFJ1bkhpbnRBY3Rpb24oZHVyYXRpb246IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMzLCBSZWN5Y2xlQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubXVpX0hpZ2hMaWdodC5vcGFjaXR5ID0gMCBcbiAgICAgICAgbGV0IGZhZGVJbkR1cmF0aW9pbiA9IDAuNFxuICAgICAgICBsZXQgZmFkZU91dER1cmF0aW9pbiA9IDAuOFxuICAgICAgICBjYy50d2Vlbih0aGlzLm11aV9IaWdoTGlnaHQpXG4gICAgICAgICAgICAudG8oZmFkZUluRHVyYXRpb2luLCB7b3BhY2l0eTogMjU1fSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC5kZWxheShmYWRlSW5EdXJhdGlvaW4pXG4gICAgICAgICAgICAudG8oZHVyYXRpb24sIHtwb3NpdGlvbjogdGFyZ2V0UG9zfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0Lm1vdmUpO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubXVpX0hpZ2hMaWdodClcbiAgICAgICAgICAgICAgICAgICAgLnRvKGZhZGVPdXREdXJhdGlvaW4sIHtvcGFjaXR5OiAwfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZGVsYXkoZmFkZU91dER1cmF0aW9pbilcbiAgICAgICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgUmVjeWNsZUNhbGxiYWNrKClcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfVxufVxuIl19