
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/_Public/SolitaireActionUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ffa9iYjoFI2p35IOburuwI', 'SolitaireActionUIPanel');
// GameBundles/Solitaire/Script/_Public/SolitaireActionUIPanel.ts

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
exports.UIActionType = void 0;
var UIActionType;
(function (UIActionType) {
    UIActionType[UIActionType["POSITION"] = 0] = "POSITION";
    UIActionType[UIActionType["SCALE_OUT"] = 1] = "SCALE_OUT";
})(UIActionType = exports.UIActionType || (exports.UIActionType = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireActionUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireActionUIPanel, _super);
    function SolitaireActionUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_Background = null;
        _this.m_ActionNode = null;
        _this.m_OriginActionNodePosition = null;
        _this.m_OriginActionNodeOpacity = 0;
        _this.m_OriginActionNodeScale = 1;
        _this.m_OriginBackgroundOpacity = null;
        return _this;
    }
    SolitaireActionUIPanel.prototype.GetBackground = function () { return this.m_Background; };
    SolitaireActionUIPanel.prototype.GetActionNode = function () { return this.m_ActionNode; };
    SolitaireActionUIPanel.prototype.EnterActionType = function () { return UIActionType.POSITION; };
    SolitaireActionUIPanel.prototype.EnterActionEasingType = function () { return cc.easing.backOut; };
    SolitaireActionUIPanel.prototype.EnterSpeedFactor = function () { return 1; };
    SolitaireActionUIPanel.prototype.EnterBackgroundSeconds = function () { return 0.6 * this.EnterSpeedFactor(); };
    SolitaireActionUIPanel.prototype.EnterSeconds = function () { return 0.4 * this.EnterSpeedFactor(); };
    SolitaireActionUIPanel.prototype.EnterDelaySeconds = function () { return 0.3 * this.EnterSpeedFactor(); };
    Object.defineProperty(SolitaireActionUIPanel.prototype, "EnterActionSeconds", {
        get: function () { return this.EnterSeconds() + this.EnterDelaySeconds(); },
        enumerable: false,
        configurable: true
    });
    SolitaireActionUIPanel.prototype.OnCreate = function () {
        switch (this.EnterActionType()) {
            case UIActionType.SCALE_OUT:
                this.m_OriginActionNodeScale = this.GetActionNode().scale;
                this.m_OriginActionNodeOpacity = this.GetActionNode().opacity;
                break;
            default:
                this.m_OriginActionNodePosition = this.GetActionNode().position;
                break;
        }
        this.m_OriginBackgroundOpacity = this.GetBackground().opacity;
        this.GetBackground().opacity = 0;
    };
    SolitaireActionUIPanel.prototype.OnOpen = function (userData) {
        var _this = this;
        ii.UIUtil.showAction(this.GetBackground(), this.EnterBackgroundSeconds(), { opacity: this.m_OriginBackgroundOpacity });
        switch (this.EnterActionType()) {
            case UIActionType.SCALE_OUT:
                this.GetActionNode().active = true;
                this.GetActionNode().scale = 1;
                this.GetActionNode().opacity = 0;
                cc.tween(this.GetActionNode()).delay(this.EnterDelaySeconds()).set({ opacity: this.m_OriginActionNodeOpacity }).to(this.EnterSeconds(), { opacity: 255 }).start();
                break;
            default:
                this.GetActionNode().position = this.m_OriginActionNodePosition;
                ii.UIUtil.moveAction(this.GetActionNode(), true, this.m_OriginActionNodePosition, this.EnterSeconds(), function () { return _this.OnEnter(); }, this.EnterDelaySeconds(), this.EnterActionEasingType());
                break;
        }
    };
    SolitaireActionUIPanel.prototype.OnRelease = function () { };
    SolitaireActionUIPanel.prototype.ExitWithAction = function (cb, isOpposite) {
        var _this = this;
        if (isOpposite === void 0) { isOpposite = false; }
        var C_OUT_ACTION_TIME = 0.3;
        var C_ACTION_TIME_DELAY_FADEOUT = 0.4;
        switch (this.EnterActionType()) {
            case UIActionType.SCALE_OUT:
                cc.tween(this.GetActionNode())
                    .to(C_OUT_ACTION_TIME, { scale: this.m_OriginActionNodeScale, opacity: this.m_OriginActionNodeOpacity }, { easing: cc.easing.backIn })
                    .set({ active: false })
                    .start();
                break;
            default:
                var targetPosition = isOpposite ? cc.v3(-this.m_OriginActionNodePosition.x, -this.m_OriginActionNodePosition.y, 0) : this.m_OriginActionNodePosition;
                ii.UIUtil.moveAction(this.GetActionNode(), false, targetPosition, C_OUT_ACTION_TIME);
                break;
        }
        ii.UIUtil.hideAction(this.GetBackground(), C_OUT_ACTION_TIME, { opacity: 0 }, function () {
            _this.Close();
            if (cb) {
                cb();
            }
        }, C_ACTION_TIME_DELAY_FADEOUT);
    };
    SolitaireActionUIPanel.prototype.OnEnter = function () { };
    __decorate([
        property(cc.Node)
    ], SolitaireActionUIPanel.prototype, "m_Background", void 0);
    __decorate([
        property(cc.Node)
    ], SolitaireActionUIPanel.prototype, "m_ActionNode", void 0);
    SolitaireActionUIPanel = __decorate([
        ccclass
    ], SolitaireActionUIPanel);
    return SolitaireActionUIPanel;
}(ii.UIPanel));
exports.default = SolitaireActionUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxfUHVibGljXFxTb2xpdGFpcmVBY3Rpb25VSVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsdURBQVksQ0FBQTtJQUNaLHlEQUFTLENBQUE7QUFDYixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1RSwwQ0FBZ0I7SUFBdkY7UUFBQSxxRUFzRUM7UUFyRThCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBYWhELGdDQUEwQixHQUFZLElBQUksQ0FBQztRQUMzQywrQkFBeUIsR0FBVyxDQUFDLENBQUM7UUFDdEMsNkJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLCtCQUF5QixHQUFXLElBQUksQ0FBQzs7SUFvRHJELENBQUM7SUFsRWEsOENBQWEsR0FBdkIsY0FBcUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN0RCw4Q0FBYSxHQUF2QixjQUFxQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBRXRELGdEQUFlLEdBQXpCLGNBQTRDLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDakUsc0RBQXFCLEdBQS9CLGNBQTJELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDO0lBQzNFLGlEQUFnQixHQUExQixjQUF1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsdURBQXNCLEdBQWhDLGNBQTZDLE9BQU8sR0FBRyxHQUFHLElBQUks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QUEyQixDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUNTLHdDQUFPLEdBQWpCLGNBQXNCLENBQUM7SUFwRUo7UUFBbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0VBQXNDO0lBQ3JDO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dFQUFzQztJQUY5QixzQkFBc0I7UUFEbkQsT0FBTztPQUNzQixzQkFBc0IsQ0FzRW5EO0lBQUQsNkJBQUM7Q0F0RUQsQUFzRUMsQ0F0RXNFLEVBQUUsQ0FBQyxPQUFPLEdBc0VoRjtrQkF0RTZCLHNCQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGVudW0gVUlBY3Rpb25UeXBlIHtcbiAgICBQT1NJVElPTiA9IDAsXG4gICAgU0NBTEVfT1VUXG59XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU29saXRhaXJlQWN0aW9uVUlQYW5lbDxBUkdTPWFueT4gZXh0ZW5kcyBpaS5VSVBhbmVsPEFSR1M+IHtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgcHJpdmF0ZSBtX0JhY2tncm91bmQ6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSBwcml2YXRlIG1fQWN0aW9uTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgR2V0QmFja2dyb3VuZCgpOiBjYy5Ob2RlIHsgcmV0dXJuIHRoaXMubV9CYWNrZ3JvdW5kOyB9XG4gICAgcHJvdGVjdGVkIEdldEFjdGlvbk5vZGUoKTogY2MuTm9kZSB7IHJldHVybiB0aGlzLm1fQWN0aW9uTm9kZTsgfVxuXG4gICAgcHJvdGVjdGVkIEVudGVyQWN0aW9uVHlwZSgpOiBVSUFjdGlvblR5cGUgeyByZXR1cm4gVUlBY3Rpb25UeXBlLlBPU0lUSU9OOyB9XG4gICAgcHJvdGVjdGVkIEVudGVyQWN0aW9uRWFzaW5nVHlwZSgpOiAodDogbnVtYmVyKSA9PiBudW1iZXIgeyByZXR1cm4gY2MuZWFzaW5nLmJhY2tPdXQgfVxuICAgIHByb3RlY3RlZCBFbnRlclNwZWVkRmFjdG9yKCk6IG51bWJlciB7IHJldHVybiAxOyB9XG4gICAgcHJvdGVjdGVkIEVudGVyQmFja2dyb3VuZFNlY29uZHMoKTogbnVtYmVyIHsgcmV0dXJuIDAuNiAqIHRoaXMuRW50ZXJTcGVlZEZhY3RvcigpOyB9XG4gICAgcHJvdGVjdGVkIEVudGVyU2Vjb25kcygpOiBudW1iZXIgeyByZXR1cm4gMC40ICogdGhpcy5FbnRlclNwZWVkRmFjdG9yKCk7IH1cbiAgICBwcm90ZWN0ZWQgRW50ZXJEZWxheVNlY29uZHMoKTogbnVtYmVyIHsgcmV0dXJuIDAuMyAqIHRoaXMuRW50ZXJTcGVlZEZhY3RvcigpOyB9XG4gICAgcHJvdGVjdGVkIGdldCBFbnRlckFjdGlvblNlY29uZHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuRW50ZXJTZWNvbmRzKCkgKyB0aGlzLkVudGVyRGVsYXlTZWNvbmRzKCk7IH1cblxuICAgIHByaXZhdGUgbV9PcmlnaW5BY3Rpb25Ob2RlUG9zaXRpb246IGNjLlZlYzMgPSBudWxsO1xuICAgIHByaXZhdGUgbV9PcmlnaW5BY3Rpb25Ob2RlT3BhY2l0eTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fT3JpZ2luQWN0aW9uTm9kZVNjYWxlOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgbV9PcmlnaW5CYWNrZ3JvdW5kT3BhY2l0eTogbnVtYmVyID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLkVudGVyQWN0aW9uVHlwZSgpKSB7XG4gICAgICAgICAgICBjYXNlIFVJQWN0aW9uVHlwZS5TQ0FMRV9PVVQ6XG4gICAgICAgICAgICAgICAgdGhpcy5tX09yaWdpbkFjdGlvbk5vZGVTY2FsZSA9IHRoaXMuR2V0QWN0aW9uTm9kZSgpLnNjYWxlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9PcmlnaW5BY3Rpb25Ob2RlT3BhY2l0eSA9IHRoaXMuR2V0QWN0aW9uTm9kZSgpLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMubV9PcmlnaW5BY3Rpb25Ob2RlUG9zaXRpb24gPSB0aGlzLkdldEFjdGlvbk5vZGUoKS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fT3JpZ2luQmFja2dyb3VuZE9wYWNpdHkgPSB0aGlzLkdldEJhY2tncm91bmQoKS5vcGFjaXR5O1xuICAgICAgICB0aGlzLkdldEJhY2tncm91bmQoKS5vcGFjaXR5ID0gMDtcbiAgICB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1c2VyRGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIGlpLlVJVXRpbC5zaG93QWN0aW9uKHRoaXMuR2V0QmFja2dyb3VuZCgpLCB0aGlzLkVudGVyQmFja2dyb3VuZFNlY29uZHMoKSwgeyBvcGFjaXR5OiB0aGlzLm1fT3JpZ2luQmFja2dyb3VuZE9wYWNpdHkgfSlcbiAgICAgICAgc3dpdGNoICh0aGlzLkVudGVyQWN0aW9uVHlwZSgpKSB7XG4gICAgICAgICAgICBjYXNlIFVJQWN0aW9uVHlwZS5TQ0FMRV9PVVQ6XG4gICAgICAgICAgICAgICAgdGhpcy5HZXRBY3Rpb25Ob2RlKCkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLkdldEFjdGlvbk5vZGUoKS5zY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5HZXRBY3Rpb25Ob2RlKCkub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5HZXRBY3Rpb25Ob2RlKCkpLmRlbGF5KHRoaXMuRW50ZXJEZWxheVNlY29uZHMoKSkuc2V0KHtvcGFjaXR5OiB0aGlzLm1fT3JpZ2luQWN0aW9uTm9kZU9wYWNpdHl9KS50byh0aGlzLkVudGVyU2Vjb25kcygpLCB7b3BhY2l0eTogMjU1fSkuc3RhcnQoKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLkdldEFjdGlvbk5vZGUoKS5wb3NpdGlvbiA9IHRoaXMubV9PcmlnaW5BY3Rpb25Ob2RlUG9zaXRpb247XG4gICAgICAgICAgICAgICAgaWkuVUlVdGlsLm1vdmVBY3Rpb24odGhpcy5HZXRBY3Rpb25Ob2RlKCksIHRydWUsIHRoaXMubV9PcmlnaW5BY3Rpb25Ob2RlUG9zaXRpb24sIHRoaXMuRW50ZXJTZWNvbmRzKCksICgpPT50aGlzLk9uRW50ZXIoKSwgdGhpcy5FbnRlckRlbGF5U2Vjb25kcygpLCB0aGlzLkVudGVyQWN0aW9uRWFzaW5nVHlwZSgpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgRXhpdFdpdGhBY3Rpb24oY2I6IEZ1bmN0aW9uLCBpc09wcG9zaXRlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgQ19PVVRfQUNUSU9OX1RJTUU6IG51bWJlciA9IDAuMztcbiAgICAgICAgY29uc3QgQ19BQ1RJT05fVElNRV9ERUxBWV9GQURFT1VUID0gMC40O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuRW50ZXJBY3Rpb25UeXBlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgVUlBY3Rpb25UeXBlLlNDQUxFX09VVDpcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLkdldEFjdGlvbk5vZGUoKSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKENfT1VUX0FDVElPTl9USU1FLCB7c2NhbGU6IHRoaXMubV9PcmlnaW5BY3Rpb25Ob2RlU2NhbGUsIG9wYWNpdHk6IHRoaXMubV9PcmlnaW5BY3Rpb25Ob2RlT3BhY2l0eX0sIHtlYXNpbmc6IGNjLmVhc2luZy5iYWNrSW59KVxuICAgICAgICAgICAgICAgICAgICAuc2V0KHthY3RpdmU6IGZhbHNlfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFBvc2l0aW9uID0gaXNPcHBvc2l0ZSA/IGNjLnYzKC10aGlzLm1fT3JpZ2luQWN0aW9uTm9kZVBvc2l0aW9uLngsIC10aGlzLm1fT3JpZ2luQWN0aW9uTm9kZVBvc2l0aW9uLnksIDApIDogdGhpcy5tX09yaWdpbkFjdGlvbk5vZGVQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBpaS5VSVV0aWwubW92ZUFjdGlvbih0aGlzLkdldEFjdGlvbk5vZGUoKSwgZmFsc2UsIHRhcmdldFBvc2l0aW9uLCBDX09VVF9BQ1RJT05fVElNRSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpaS5VSVV0aWwuaGlkZUFjdGlvbih0aGlzLkdldEJhY2tncm91bmQoKSwgQ19PVVRfQUNUSU9OX1RJTUUsIHsgb3BhY2l0eTogMCB9LCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5DbG9zZSgpXG4gICAgICAgICAgICBpZihjYikgeyBjYigpIH1cbiAgICAgICAgfSwgQ19BQ1RJT05fVElNRV9ERUxBWV9GQURFT1VUKVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25FbnRlcigpIHsgfVxufVxuIl19