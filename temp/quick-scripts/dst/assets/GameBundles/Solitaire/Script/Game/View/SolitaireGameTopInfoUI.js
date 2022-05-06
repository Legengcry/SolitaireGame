
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameTopInfoUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc8a8ATiJpD0ZLEh2SxN5xZ', 'SolitaireGameTopInfoUI');
// GameBundles/Solitaire/Script/Game/View/SolitaireGameTopInfoUI.ts

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
var SolitaireEvent_1 = require("../../SolitaireEvent");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireGameTopInfoUI = /** @class */ (function (_super) {
    __extends(SolitaireGameTopInfoUI, _super);
    function SolitaireGameTopInfoUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scoreLabel = null;
        _this._timeLabel = null;
        _this._moveStepLabel = null;
        _this._effectLabel = null;
        _this._visiableNode = null;
        _this._bHideMenuUIBV = null;
        _this._bAutoCollecting = false;
        _this._bAutoPlaying = false;
        return _this;
    }
    SolitaireGameTopInfoUI.prototype.UpdateStatus = function () { this._bHideMenuUIBV.v = this._bAutoCollecting || this._bAutoPlaying; };
    SolitaireGameTopInfoUI.prototype.OnCreate = function () {
        this._effectLabel.node.active = false;
    };
    SolitaireGameTopInfoUI.prototype.OnRelease = function () { };
    SolitaireGameTopInfoUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBack", this.args.OnBack);
        this.SetIIClickHandler("OnOptions", function () { return ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireOptionsUIPanel.key); });
        this._bHideMenuUIBV = ii.BooleanBV.Borrow(false).ReturnBy(this);
        this._bHideMenuUIBV.Bind(function (hide) { return _this._visiableNode.active = !hide; }, true, this);
    };
    Object.defineProperty(SolitaireGameTopInfoUI.prototype, "SolitaireJuEventTarget", {
        get: function () { return this.node; },
        enumerable: false,
        configurable: true
    });
    SolitaireGameTopInfoUI.prototype.OnSolitaireDesktopEvent = function (ju, eventTyp, data) {
        switch (eventTyp) {
            case SolitaireEvent_1.SolitaireEvent.SC_TIME_CHANGED:
                this.UpdateUITime(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB:
                this.SubScribModelEvents(ju);
                break;
        }
    };
    SolitaireGameTopInfoUI.prototype.UpdateUITime = function (tick) { this._timeLabel.string = ii.date.Format(tick, "mm:ss"); };
    SolitaireGameTopInfoUI.prototype.SubScribModelEvents = function (ju) {
        // 监听模型数据变化，更新当前页面所需的状态数据
        ju.scoreBV.Bind(this.OnScoreValueChanged.bind(this), false, this);
    };
    SolitaireGameTopInfoUI.prototype.OnScoreValueChanged = function (score, preScore) {
        var changed = score - preScore;
        this._effectLabel.string = "" + (changed > 0 ? "+" : "") + changed;
        this._effectLabel.node.active = true;
        cc.Tween.stopAllByTarget(this._effectLabel.node);
        this._effectLabel.node.position = cc.Vec3.ZERO;
        cc.tween(this._effectLabel.node)
            .by(1, { position: cc.v3(0, 30, 0) })
            .call(function (node) { return node.active = false; })
            .start();
    };
    SolitaireGameTopInfoUI.prototype.Enter = function (ju) {
        var _this = this;
        this._effectLabel.node.active = false;
        this.BindBV(ju.scoreBV, function (score) { return _this._scoreLabel.string = "" + score; }, true);
        this.BindBV(ju.isAutoPlayingBV, function (autoPlaying) {
            _this._bAutoPlaying = autoPlaying;
            _this.UpdateStatus();
        }, true);
        this.BindBV(ju.isAutoCollectingBV, function (autoCollecting) { _this._bAutoCollecting = autoCollecting; _this.UpdateStatus(); }, true);
        this.BindBV(ju.moveStepCountBV, function (step) { return _this._moveStepLabel.string = "" + step; }, true);
        ju.AddEventListener(this);
    };
    SolitaireGameTopInfoUI.prototype.Exit = function (ju) {
        ju.RemoveEventListener(this);
        this.UnbindAllBV();
    };
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_scoreLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_timeLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_moveStepLabel", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_effectLabel", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameTopInfoUI.prototype, "_visiableNode", void 0);
    SolitaireGameTopInfoUI = __decorate([
        ccclass
    ], SolitaireGameTopInfoUI);
    return SolitaireGameTopInfoUI;
}(ii.UIComp));
exports.default = SolitaireGameTopInfoUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxTb2xpdGFpcmVHYW1lVG9wSW5mb1VJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUN0RCwrREFBOEQ7QUFPeEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBb0QsMENBQXFDO0lBQXpGO1FBQUEscUVBa0VDO1FBakVtRCxpQkFBVyxHQUFhLElBQUksQ0FBQTtRQUM1QixnQkFBVSxHQUFhLElBQUksQ0FBQTtRQUMzQixvQkFBYyxHQUFhLElBQUksQ0FBQTtRQUMvQixrQkFBWSxHQUFhLElBQUksQ0FBQTtRQUM5QixtQkFBYSxHQUFZLElBQUksQ0FBQTtRQUVwRSxvQkFBYyxHQUFpQixJQUFJLENBQUM7UUFDcEMsc0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLG1CQUFhLEdBQVksS0FBSyxDQUFDOztJQXlEM0MsQ0FBQztJQXhEVyw2Q0FBWSxHQUFwQixjQUF5QixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFckYseUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3pDLENBQUM7SUFDUywwQ0FBUyxHQUFuQixjQUE4QixDQUFDO0lBQ3JCLHVDQUFNLEdBQWhCLFVBQWlCLE1BQWtDO1FBQW5ELGlCQU1DO1FBTEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsY0FBSSxPQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx1Q0FBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxFQUEzRSxDQUEyRSxDQUFDLENBQUM7UUFFckgsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUUsT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBakMsQ0FBaUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELHNCQUFJLDBEQUFzQjthQUExQixjQUFvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN2RCx3REFBdUIsR0FBdkIsVUFBd0IsRUFBZSxFQUFFLFFBQXdCLEVBQUUsSUFBVTtRQUN6RSxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssK0JBQWMsQ0FBQyxlQUFlO2dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNwRSxLQUFLLCtCQUFjLENBQUMsY0FBYztnQkFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtTQUMzRTtJQUNMLENBQUM7SUFFTyw2Q0FBWSxHQUFwQixVQUFxQixJQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUVyRixvREFBbUIsR0FBM0IsVUFBNEIsRUFBZTtRQUN2Qyx5QkFBeUI7UUFDekIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdEUsQ0FBQztJQUVPLG9EQUFtQixHQUEzQixVQUE0QixLQUFhLEVBQUUsUUFBZ0I7UUFDdkQsSUFBSSxPQUFPLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQTtRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFHLE9BQVMsQ0FBQTtRQUNoRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ3BDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQzlDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7YUFDM0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUNsQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBbkIsQ0FBbUIsQ0FBQzthQUNqQyxLQUFLLEVBQUUsQ0FBQTtJQUNoQixDQUFDO0lBRUQsc0NBQUssR0FBTCxVQUFNLEVBQWU7UUFBckIsaUJBU0M7UUFSRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUcsS0FBTyxFQUFwQyxDQUFvQyxFQUFHLElBQUksQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFBLFdBQVc7WUFDdkMsS0FBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7WUFBQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQSxjQUFjLElBQUksS0FBSSxDQUFDLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFHLElBQU0sRUFBdEMsQ0FBc0MsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNyRixFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHFDQUFJLEdBQUosVUFBSyxFQUFlO1FBQ2hCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQWhFdUM7UUFBdkMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDOytEQUFxQztJQUNwQztRQUF2QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7OERBQW9DO0lBQ25DO1FBQXZDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztrRUFBd0M7SUFDdkM7UUFBdkMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2dFQUFzQztJQUN0QztRQUF0QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7aUVBQXNDO0lBTDNELHNCQUFzQjtRQUQxQyxPQUFPO09BQ2Esc0JBQXNCLENBa0UxQztJQUFELDZCQUFDO0NBbEVELEFBa0VDLENBbEVtRCxFQUFFLENBQUMsTUFBTSxHQWtFNUQ7a0JBbEVvQixzQkFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVFdmVudCB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVFdmVudFwiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgSVNvbGl0YWlyZUp1RXZlbnRMaXN0ZW5lciwgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vTW9kZWwvU29saXRhaXJlSnVcIjtcblxuZXhwb3J0IHR5cGUgU29saXRhaXJlR2FtZVRvcEluZm9VSUFyZ3MgPSB7XG4gICAgT25CYWNrOiBGdW5jdGlvblxufVxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVHYW1lVG9wSW5mb1VJIGV4dGVuZHMgaWkuVUlDb21wPFNvbGl0YWlyZUdhbWVUb3BJbmZvVUlBcmdzPiBpbXBsZW1lbnRzIElTb2xpdGFpcmVKdUV2ZW50TGlzdGVuZXIge1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5MYWJlbCx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9zY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfdGltZUxhYmVsOiBjYy5MYWJlbCA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfbW92ZVN0ZXBMYWJlbDogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX2VmZmVjdExhYmVsOiBjYy5MYWJlbCA9IG51bGwgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfdmlzaWFibGVOb2RlOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgcHJpdmF0ZSBfYkhpZGVNZW51VUlCVjogaWkuQm9vbGVhbkJWID0gbnVsbDtcbiAgICBwcml2YXRlIF9iQXV0b0NvbGxlY3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9iQXV0b1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIFVwZGF0ZVN0YXR1cygpIHsgdGhpcy5fYkhpZGVNZW51VUlCVi52ID0gdGhpcy5fYkF1dG9Db2xsZWN0aW5nIHx8IHRoaXMuX2JBdXRvUGxheWluZzsgfVxuXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lZmZlY3RMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogU29saXRhaXJlR2FtZVRvcEluZm9VSUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uQmFja1wiLCB0aGlzLmFyZ3MuT25CYWNrKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uT3B0aW9uc1wiLCAoKT0+aWkuVUlNZ3IuaW5zLk9wZW4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5wYW5lbC5Tb2xpdGFpcmVPcHRpb25zVUlQYW5lbC5rZXkpKTtcblxuICAgICAgICB0aGlzLl9iSGlkZU1lbnVVSUJWID0gaWkuQm9vbGVhbkJWLkJvcnJvdyhmYWxzZSkuUmV0dXJuQnkodGhpcyk7XG4gICAgICAgIHRoaXMuX2JIaWRlTWVudVVJQlYuQmluZChoaWRlPT50aGlzLl92aXNpYWJsZU5vZGUuYWN0aXZlID0gIWhpZGUsIHRydWUsIHRoaXMpO1xuICAgIH1cblxuICAgIGdldCBTb2xpdGFpcmVKdUV2ZW50VGFyZ2V0KCk6IGFueSB7IHJldHVybiB0aGlzLm5vZGU7IH1cbiAgICBPblNvbGl0YWlyZURlc2t0b3BFdmVudChqdTogU29saXRhaXJlSnUsIGV2ZW50VHlwOiBTb2xpdGFpcmVFdmVudCwgZGF0YT86IGFueSk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50VHlwKSB7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX1RJTUVfQ0hBTkdFRDogdGhpcy5VcGRhdGVVSVRpbWUoZGF0YSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19VSV9TVUJTQ1JJQjogdGhpcy5TdWJTY3JpYk1vZGVsRXZlbnRzKGp1KTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIFVwZGF0ZVVJVGltZSh0aWNrOiBudW1iZXIpIHsgdGhpcy5fdGltZUxhYmVsLnN0cmluZyA9IGlpLmRhdGUuRm9ybWF0KHRpY2ssIFwibW06c3NcIikgfVxuXG4gICAgcHJpdmF0ZSBTdWJTY3JpYk1vZGVsRXZlbnRzKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICAvLyDnm5HlkKzmqKHlnovmlbDmja7lj5jljJbvvIzmm7TmlrDlvZPliY3pobXpnaLmiYDpnIDnmoTnirbmgIHmlbDmja5cbiAgICAgICAganUuc2NvcmVCVi5CaW5kKHRoaXMuT25TY29yZVZhbHVlQ2hhbmdlZC5iaW5kKHRoaXMpICwgZmFsc2UsIHRoaXMpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBPblNjb3JlVmFsdWVDaGFuZ2VkKHNjb3JlOiBudW1iZXIsIHByZVNjb3JlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNoYW5nZWQgPSBzY29yZSAtIHByZVNjb3JlXG4gICAgICAgIHRoaXMuX2VmZmVjdExhYmVsLnN0cmluZyA9IGAke2NoYW5nZWQgPiAwID8gXCIrXCIgOiBcIlwifSR7Y2hhbmdlZH1gXG4gICAgICAgIHRoaXMuX2VmZmVjdExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5fZWZmZWN0TGFiZWwubm9kZSlcbiAgICAgICAgdGhpcy5fZWZmZWN0TGFiZWwubm9kZS5wb3NpdGlvbiA9IGNjLlZlYzMuWkVST1xuICAgICAgICBjYy50d2Vlbih0aGlzLl9lZmZlY3RMYWJlbC5ub2RlKVxuICAgICAgICAgICAgLmJ5KDEsIHtwb3NpdGlvbjogY2MudjMoMCwgMzAsIDApfSlcbiAgICAgICAgICAgIC5jYWxsKG5vZGUgPT4gbm9kZS5hY3RpdmUgPSBmYWxzZSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfVxuXG4gICAgRW50ZXIoanU6IFNvbGl0YWlyZUp1KSB7XG4gICAgICAgIHRoaXMuX2VmZmVjdExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5CaW5kQlYoanUuc2NvcmVCViwgc2NvcmUgPT4gdGhpcy5fc2NvcmVMYWJlbC5zdHJpbmcgPSBgJHtzY29yZX1gICwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuQmluZEJWKGp1LmlzQXV0b1BsYXlpbmdCViwgYXV0b1BsYXlpbmc9PntcbiAgICAgICAgICAgIHRoaXMuX2JBdXRvUGxheWluZyA9IGF1dG9QbGF5aW5nOyB0aGlzLlVwZGF0ZVN0YXR1cygpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgdGhpcy5CaW5kQlYoanUuaXNBdXRvQ29sbGVjdGluZ0JWLCBhdXRvQ29sbGVjdGluZz0+eyB0aGlzLl9iQXV0b0NvbGxlY3RpbmcgPSBhdXRvQ29sbGVjdGluZzsgdGhpcy5VcGRhdGVTdGF0dXMoKTsgfSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuQmluZEJWKGp1Lm1vdmVTdGVwQ291bnRCViwgc3RlcCA9PiB0aGlzLl9tb3ZlU3RlcExhYmVsLnN0cmluZyA9IGAke3N0ZXB9YCwgdHJ1ZSlcbiAgICAgICAganUuQWRkRXZlbnRMaXN0ZW5lcih0aGlzKTtcbiAgICB9XG5cbiAgICBFeGl0KGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICBqdS5SZW1vdmVFdmVudExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLlVuYmluZEFsbEJWKCk7XG4gICAgfVxufVxuIl19