
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/UIPoker.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxVSVBva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUErRDtBQUMvRCwrREFBOEQ7QUFHOUQsbUVBQThEO0FBR3hELElBQUEsS0FBd0MsRUFBRSxDQUFDLFVBQVUsRUFBcEQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFpQixDQUFDO0FBRTVEO0lBQXFDLDJCQUFnQjtJQUFyRDtRQUFBLHFFQWdJQztRQTlIVyxlQUFTLEdBQTRCLElBQUksQ0FBQztRQTJDbEQsbUJBQW1CO1FBQ1gsb0JBQWMsR0FBMkIsSUFBSSxDQUFDO1FBQzlDLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLHlCQUFtQixHQUFZLElBQUksQ0FBQzs7UUErRTVDLFlBQVk7SUFDaEIsQ0FBQztnQkFoSW9CLE9BQU87SUFHeEIsc0JBQUksNkJBQVE7YUFBWixjQUFpQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDbEUsc0JBQUksOEJBQVM7YUFBYixjQUEwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDNUQsc0JBQUksNkJBQVE7YUFBWixjQUF5QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFJdEQsc0JBQUksdUJBQUU7UUFITjs7K0VBRXVFO2FBQ3ZFLGNBQWtCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzNCLDBCQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsMkJBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNTLHdCQUFNLEdB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QUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsSUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ2YsWUFBWTtZQUNaLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFBO1lBQ3JDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFDN0MsS0FBSSxJQUFJLGVBQWUsR0FBRSxVQUFVLEdBQUMsQ0FBQyxFQUFFLGVBQWUsR0FBRyxXQUFXLEVBQUUsRUFBRSxlQUFlLEVBQUU7Z0JBQ3JGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFDeEQsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7Z0JBQ3BDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNmLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsZ0NBQXNCLENBQUMseUJBQXlCLEdBQUMsQ0FBQyxlQUFlLEdBQUMsVUFBVSxDQUFDLENBQUE7YUFDMUc7U0FDSjtJQUNMLENBQUM7O0lBN0hlLHFCQUFhLEdBQVcsRUFBRSxDQUFDO0lBRDFCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FnSTNCO0lBQUQsY0FBQztDQWhJRCxBQWdJQyxDQWhJb0MsRUFBRSxDQUFDLE1BQU0sR0FnSTdDO2tCQWhJb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbGl0YWlyZVNraW4gfSBmcm9tIFwiLi4vLi4vRGF0YUNhY2hlL1NvbGl0YWlyZVNraW5EYXRhQ2FjaGVcIjtcbmltcG9ydCB7IEVMb2NhdGlvbiwgRVBva2VyU3RhdHVzIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZUVudW1zXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgeyBUUG9rZXJCYWNrU2tpbiB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVTcHJpdGVGcmFtZUNmZ1wiO1xuaW1wb3J0IFBva2VyIGZyb20gXCIuLi9Nb2RlbC9Qb2tlclwiO1xuaW1wb3J0IFNvbGl0YWlyZUdhbWVEZXNrdG9wVUkgZnJvbSBcIi4vU29saXRhaXJlR2FtZURlc2t0b3BVSVwiO1xuaW1wb3J0IFNvbGl0YWlyZVBva2VyRGlzcGxheVVJLCB7IFNvbGl0YWlyZVBva2VyRGlzcGxheVVJQXJncyB9IGZyb20gXCIuL1NvbGl0YWlyZVBva2VyRGlzcGxheVVJXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eSwgcmVxdWlyZUNvbXBvbmVudH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJUG9rZXIgZXh0ZW5kcyBpaS5VSUNvbXA8UG9rZXI+e1xuICAgIHN0YXRpYyByZWFkb25seSBEUkFHX09GRlNFVF9ZOiBudW1iZXIgPSA4MDtcbiAgICBwcml2YXRlIG1fRGlzcGxheTogU29saXRhaXJlUG9rZXJEaXNwbGF5VUkgPSBudWxsO1xuICAgIGdldCBiYWNrU2tpbigpOiBUUG9rZXJCYWNrU2tpbiB7IHJldHVybiB0aGlzLm1fRGlzcGxheS5iYWNrU2tpbjsgfVxuICAgIGdldCBmcm9udFNraW4oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubV9EaXNwbGF5LmZyb250U2tpbjsgfVxuICAgIGdldCBmYWNlU2tpbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tX0Rpc3BsYXkuc2tpbjsgfVxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBMaWZlQ3ljbGVcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGdldCB2bSgpOiBQb2tlciB7IHJldHVybiB0aGlzLmFyZ3M7IH1cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLlVuYmluZFRvdWNoKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBQb2tlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnZtLnZpZXcgPSB0aGlzO1xuICAgICAgICB0aGlzLm1fRGlzcGxheSA9IGlpLlVJTWdyLmlucy5DcmVhdGU8U29saXRhaXJlUG9rZXJEaXNwbGF5VUksIFNvbGl0YWlyZVBva2VyRGlzcGxheVVJQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlNvbGl0YWlyZVBva2VyRGlzcGxheVVJLmtleSwge1xuICAgICAgICAgICAgcG9pbnQ6IHRoaXMudm0ucG9pbnQsXG4gICAgICAgICAgICBzdWl0OiB0aGlzLnZtLnN1aXQsXG4gICAgICAgICAgICBiYWNrU2tpbjogeyBraW5kOiBcImNsYXNzaWNcIixpbmRleDowIH0sXG4gICAgICAgICAgICBmcm9udFNraW46IDAsXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMudm0uc3RhdHVzLFxuICAgICAgICAgICAgZmFjZVNraW46IDBcbiAgICAgICAgfSwgdGhpcy5ub2RlKS5DbG9zZUJ5KHRoaXMpO1xuICAgIH1cbiAgICBJbml0KGZhY2VTa2luOiBudW1iZXIsIGJhY2tTa2luOiBUUG9rZXJCYWNrU2tpbiwgZnJvbnRTa2luOiBudW1iZXIpOiBVSVBva2VyIHsgdGhpcy5tX0Rpc3BsYXkuSW5pdChmYWNlU2tpbiwgYmFja1NraW4sIGZyb250U2tpbik7IHJldHVybiB0aGlzOyB9XG4gICAgc2V0U2tpbihza2luOiBTb2xpdGFpcmVTa2luKSB7IHRoaXMubV9EaXNwbGF5LnNldFNraW4oc2tpbik7IH1cbiAgICBzZXRGYWNlU2tpbihmYWNlU2tpbjogbnVtYmVyKSB7IHRoaXMubV9EaXNwbGF5LnNldEZhY2VTa2luKGZhY2VTa2luKTsgfVxuICAgIHNldEZyb250U2tpbihmcm9udFNraW46IG51bWJlcikgeyB0aGlzLm1fRGlzcGxheS5zZXRGcm9udFNraW4oZnJvbnRTa2luKTsgfVxuICAgIHNldEJhY2tTa2luKGJhY2tTa2luOiBUUG9rZXJCYWNrU2tpbikgeyB0aGlzLm1fRGlzcGxheS5zZXRCYWNrU2tpbihiYWNrU2tpbik7IH1cbiAgICBSZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1fRGlzcGxheS5SZWZyZXNoKHRoaXMudm0uc3RhdHVzLCB0aGlzLnZtLnN1aXQsIHRoaXMudm0ucG9pbnQpO1xuICAgIH1cbiAgICBcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogUHVibGljIEFQSVxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52bS5zdGF0dXMgPT0gRVBva2VyU3RhdHVzLk9QRU5cbiAgICB9XG5cbiAgICBpc1BvaW50KHBvaW50OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudm0ucG9pbnQgPT0gcG9pbnRcbiAgICB9XG5cbiAgICAvLyNyZWdpb24gLy8hIElEcmFnXG4gICAgcHJpdmF0ZSBfdG91Y2hEZWxlZ2F0ZTogU29saXRhaXJlR2FtZURlc2t0b3BVSSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYkJpbmRUb3VjaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX21vdmVUYXJnZXRQb3NpdGlvbjogY2MuVmVjMiA9IG51bGw7XG4gICAgU2V0VG91Y2hEZWxlZ2F0ZSh0b3VjaERlbGVnYXRlOiBTb2xpdGFpcmVHYW1lRGVza3RvcFVJKSB7XG4gICAgICAgIHRoaXMuX3RvdWNoRGVsZWdhdGUgPSB0b3VjaERlbGVnYXRlO1xuICAgICAgICB0aGlzLkJpbmRUb3VjaCgpO1xuICAgIH1cbiAgICBwcml2YXRlIEJpbmRUb3VjaCgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2JCaW5kVG91Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuX2JCaW5kVG91Y2ggPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIFVuYmluZFRvdWNoKCkge1xuICAgICAgICBpZih0aGlzLl9iQmluZFRvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2JCaW5kVG91Y2ggPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydCAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3RvdWNoRGVsZWdhdGUuT25EcmFnVG91Y2hTdGFydCh0aGlzLCBldmVudCk7IH1cbiAgICBwcml2YXRlIG9uVG91Y2hNb3ZlIChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkgeyB0aGlzLl90b3VjaERlbGVnYXRlLk9uRHJhZ1RvdWNoTW92ZSh0aGlzLCBldmVudCk7IH1cbiAgICBwcml2YXRlIG9uVG91Y2hFbmQgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7IHRoaXMuX3RvdWNoRGVsZWdhdGUuT25EcmFnVG91Y2hFbmQodGhpcywgZXZlbnQpOyB9XG4gICAgRHJhZ1N0YXJ0VGVzdCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYodGhpcy5pc09wZW4oKSl7XG4gICAgICAgICAgICAvLyBPcGVuIOWMuuWfn++8jOWPquWFgeiuuOacgOS4iuaWueeahOeJjOiiq+aLluaLvVxuICAgICAgICAgICAgaWYoKHRoaXMudm0ubG9jYXRpb24gIT09IEVMb2NhdGlvbi5PUEVOKSB8fCAodGhpcy52bS5pc1RvcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBcbiAgICBPbkRyYWdTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xuICAgICAgICAvLyDngrnlh7vml7bop6bmkbjngrnnmoTkvY3nva7vvJtcbiAgICAgICAgbGV0IF9kcmFnU3RhcnRQb3NpdGlvbiA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIHRoaXMuX21vdmVUYXJnZXRQb3NpdGlvbiA9IGNjLnYyKF9kcmFnU3RhcnRQb3NpdGlvbi54LCBfZHJhZ1N0YXJ0UG9zaXRpb24ueSArIFVJUG9rZXIuRFJBR19PRkZTRVRfWSk7XG4gICAgICAgIHRoaXMuU3RhcnRTY2hlZHVsZXIoXCJNT1ZFX1RPX1RBUkdFVFwiLCB0aGlzLl9fTW92ZVRvVGFyZ2V0LmJpbmQodGhpcyksIDApO1xuICAgIH1cblxuICAgIE9uRHJhZ01vdmUoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgIHRoaXMuX21vdmVUYXJnZXRQb3NpdGlvbiA9IGNjLnYyKHBvcy54LCBwb3MueStVSVBva2VyLkRSQUdfT0ZGU0VUX1kpO1xuICAgICAgICBpZighdGhpcy5IYXNTY2hlZHVsZXIoXCJNT1ZFX1RPX1RBUkdFVFwiKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbldoZW5Gb2xsb3cocG9zLngsIHBvcy55KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPbkRyYWdFbmQoKSB7XG4gICAgICAgIHRoaXMuU3RvcFNjaGVkdWxlcihcIk1PVkVfVE9fVEFSR0VUXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX19Nb3ZlVG9UYXJnZXQoZHQ6IG51bWJlcikge1xuICAgICAgICBsZXQgZHggPSB0aGlzLl9tb3ZlVGFyZ2V0UG9zaXRpb24ueC10aGlzLm5vZGUueDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fbW92ZVRhcmdldFBvc2l0aW9uLnktdGhpcy5ub2RlLnk7XG4gICAgICAgIGlmKGR4KmR4ICsgZHkqZHkgPCAxMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbldoZW5Gb2xsb3codGhpcy5fbW92ZVRhcmdldFBvc2l0aW9uLngsIHRoaXMuX21vdmVUYXJnZXRQb3NpdGlvbi55KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uV2hlbkZvbGxvdyh0aGlzLm5vZGUueCArIDE4KmR4KmR0LCB0aGlzLm5vZGUueSArIDE4KmR5KmR0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0UG9zaXRpb25XaGVuRm9sbG93KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubm9kZS54ID0geFxuICAgICAgICB0aGlzLm5vZGUueSA9IHlcbiAgICAgICAgaWYoIXRoaXMudm0uaXNUb3ApIHtcbiAgICAgICAgICAgIC8vIOWFtuS7lueJjOi3n+maj+enu+WKqOmAu+i+kVxuICAgICAgICAgICAgbGV0IHBva2VySW5kZXggPSB0aGlzLnZtLmluZGV4SW5Hcm91cFxuICAgICAgICAgICAgbGV0IHBva2VyTGVuZ3RoID0gdGhpcy52bS5ncm91cC5wb2tlcnMubGVuZ3RoXG4gICAgICAgICAgICBmb3IobGV0IGFib3ZlUG9rZXJJbmRleD0gcG9rZXJJbmRleCsxOyBhYm92ZVBva2VySW5kZXggPCBwb2tlckxlbmd0aDsgKythYm92ZVBva2VySW5kZXgpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWJvdmVQb2tlciA9IHRoaXMudm0uZ3JvdXAuR2V0UG9rZXIoYWJvdmVQb2tlckluZGV4KVxuICAgICAgICAgICAgICAgIGxldCBhYm92ZU5vZGUgPSBhYm92ZVBva2VyLnZpZXcubm9kZVxuICAgICAgICAgICAgICAgIGFib3ZlTm9kZS54ID0geFxuICAgICAgICAgICAgICAgIGFib3ZlTm9kZS55ID0gdGhpcy5ub2RlLnktU29saXRhaXJlR2FtZURlc2t0b3BVSS5QTEFZX09QRU5fUE9LRVJfUEFERElOR19ZKihhYm92ZVBva2VySW5kZXgtcG9rZXJJbmRleClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cbn1cbiJdfQ==