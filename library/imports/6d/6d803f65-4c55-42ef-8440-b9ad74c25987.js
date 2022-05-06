"use strict";
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