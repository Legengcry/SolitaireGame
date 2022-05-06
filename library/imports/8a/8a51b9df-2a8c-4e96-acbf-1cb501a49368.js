"use strict";
cc._RF.push(module, '8a51bnfKoxOlqy/HLUBpJNo', 'UIPoker');
// GameBundles/Solitaire/Script/Game/View/UIPoker.ts

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
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var SolitaireGameDesktopUI_1 = require("./SolitaireGameDesktopUI");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent;
var UIPoker = /** @class */ (function (_super) {
    __extends(UIPoker, _super);
    function UIPoker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_Display = null;
        //#region //! IDrag
        _this._touchDelegate = null;
        _this._bBindTouch = false;
        _this._moveTargetPosition = null;
        return _this;
        //#endregion
    }
    UIPoker_1 = UIPoker;
    Object.defineProperty(UIPoker.prototype, "backSkin", {
        get: function () { return this.m_Display.backSkin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIPoker.prototype, "frontSkin", {
        get: function () { return this.m_Display.frontSkin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIPoker.prototype, "faceSkin", {
        get: function () { return this.m_Display.skin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIPoker.prototype, "vm", {
        /*********************************************************************
         * LifeCycle
         *********************************************************************/
        get: function () { return this.args; },
        enumerable: false,
        configurable: true
    });
    UIPoker.prototype.OnCreate = function () { };
    UIPoker.prototype.OnRelease = function () {
        this.UnbindTouch();
    };
    UIPoker.prototype.OnOpen = function (uiArgs) {
        this.vm.view = this;
        this.m_Display = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
            point: this.vm.point,
            suit: this.vm.suit,
            backSkin: { kind: "classic", index: 0 },
            frontSkin: 0,
            status: this.vm.status,
            faceSkin: 0
        }, this.node).CloseBy(this);
    };
    UIPoker.prototype.Init = function (faceSkin, backSkin, frontSkin) { this.m_Display.Init(faceSkin, backSkin, frontSkin); return this; };
    UIPoker.prototype.setSkin = function (skin) { this.m_Display.setSkin(skin); };
    UIPoker.prototype.setFaceSkin = function (faceSkin) { this.m_Display.setFaceSkin(faceSkin); };
    UIPoker.prototype.setFrontSkin = function (frontSkin) { this.m_Display.setFrontSkin(frontSkin); };
    UIPoker.prototype.setBackSkin = function (backSkin) { this.m_Display.setBackSkin(backSkin); };
    UIPoker.prototype.Refresh = function () {
        this.m_Display.Refresh(this.vm.status, this.vm.suit, this.vm.point);
    };
    /*********************************************************************
     * Public API
     *********************************************************************/
    UIPoker.prototype.isOpen = function () {
        return this.vm.status == SolitaireEnums_1.EPokerStatus.OPEN;
    };
    UIPoker.prototype.isPoint = function (point) {
        return this.vm.point == point;
    };
    UIPoker.prototype.SetTouchDelegate = function (touchDelegate) {
        this._touchDelegate = touchDelegate;
        this.BindTouch();
    };
    UIPoker.prototype.BindTouch = function () {
        if (!this._bBindTouch) {
            this._bBindTouch = true;
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
    };
    UIPoker.prototype.UnbindTouch = function () {
        if (this._bBindTouch) {
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
            this._bBindTouch = false;
        }
    };
    UIPoker.prototype.onTouchStart = function (event) { return this._touchDelegate.OnDragTouchStart(this, event); };
    UIPoker.prototype.onTouchMove = function (event) { this._touchDelegate.OnDragTouchMove(this, event); };
    UIPoker.prototype.onTouchEnd = function (event) { this._touchDelegate.OnDragTouchEnd(this, event); };
    UIPoker.prototype.DragStartTest = function () {
        if (this.isOpen()) {
            // Open 区域，只允许最上方的牌被拖拽
            if ((this.vm.location !== SolitaireEnums_1.ELocation.OPEN) || (this.vm.isTop)) {
                return true;
            }
        }
        return false;
    };
    UIPoker.prototype.OnDragStart = function (event) {
        // 点击时触摸点的位置；
        var _dragStartPosition = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this._moveTargetPosition = cc.v2(_dragStartPosition.x, _dragStartPosition.y + UIPoker_1.DRAG_OFFSET_Y);
        this.StartScheduler("MOVE_TO_TARGET", this.__MoveToTarget.bind(this), 0);
    };
    UIPoker.prototype.OnDragMove = function (event) {
        var pos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this._moveTargetPosition = cc.v2(pos.x, pos.y + UIPoker_1.DRAG_OFFSET_Y);
        if (!this.HasScheduler("MOVE_TO_TARGET")) {
            this.setPositionWhenFollow(pos.x, pos.y);
        }
    };
    UIPoker.prototype.OnDragEnd = function () {
        this.StopScheduler("MOVE_TO_TARGET");
    };
    UIPoker.prototype.__MoveToTarget = function (dt) {
        var dx = this._moveTargetPosition.x - this.node.x;
        var dy = this._moveTargetPosition.y - this.node.y;
        if (dx * dx + dy * dy < 10) {
            this.setPositionWhenFollow(this._moveTargetPosition.x, this._moveTargetPosition.y);
        }
        else {
            this.setPositionWhenFollow(this.node.x + 18 * dx * dt, this.node.y + 18 * dy * dt);
        }
    };
    UIPoker.prototype.setPositionWhenFollow = function (x, y) {
        this.node.x = x;
        this.node.y = y;
        if (!this.vm.isTop) {
            // 其他牌跟随移动逻辑
            var pokerIndex = this.vm.indexInGroup;
            var pokerLength = this.vm.group.pokers.length;
            for (var abovePokerIndex = pokerIndex + 1; abovePokerIndex < pokerLength; ++abovePokerIndex) {
                var abovePoker = this.vm.group.GetPoker(abovePokerIndex);
                var aboveNode = abovePoker.view.node;
                aboveNode.x = x;
                aboveNode.y = this.node.y - SolitaireGameDesktopUI_1.default.PLAY_OPEN_POKER_PADDING_Y * (abovePokerIndex - pokerIndex);
            }
        }
    };
    var UIPoker_1;
    UIPoker.DRAG_OFFSET_Y = 80;
    UIPoker = UIPoker_1 = __decorate([
        ccclass
    ], UIPoker);
    return UIPoker;
}(ii.UIComp));
exports.default = UIPoker;

cc._RF.pop();