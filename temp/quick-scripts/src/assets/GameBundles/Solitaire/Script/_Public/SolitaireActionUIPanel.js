"use strict";
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