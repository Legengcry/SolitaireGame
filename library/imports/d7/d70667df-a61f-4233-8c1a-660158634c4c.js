"use strict";
cc._RF.push(module, 'd7066ffph9CM4waZgFYY0xM', 'ActionBreath');
// GameBundles/Solitaire/Script/_Public/Component/ActionBreath.ts

"use strict";
/**
 * 呼吸组件：随着时间的推移，放大缩小
 */
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ActionBreath = /** @class */ (function (_super) {
    __extends(ActionBreath, _super);
    function ActionBreath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_MaxScale = 1.2;
        _this.m_Interval = 1.8;
        _this.PlayOnStart = false;
        _this.m_InitScale = 1.0;
        _this.m_IsRunning = false;
        return _this;
    }
    ActionBreath.prototype.start = function () {
        this.m_InitScale = this.node.scale;
        if (this.PlayOnStart) {
            this.RunBreathAction();
        }
    };
    ActionBreath.prototype.RunBreathAction = function () {
        if (this.m_IsRunning) {
            return;
        }
        this.m_IsRunning = true;
        var action = cc.tween()
            .delay(this.m_Interval * 0.9)
            .to(this.m_Interval, { scale: this.m_MaxScale * this.m_InitScale }, { easing: cc.easing.sineOut })
            .to(this.m_Interval, { scale: this.m_InitScale }, { easing: cc.easing.sineIn });
        cc.tween(this.node)
            .repeatForever(action)
            .start();
    };
    __decorate([
        property
    ], ActionBreath.prototype, "m_MaxScale", void 0);
    __decorate([
        property
    ], ActionBreath.prototype, "m_Interval", void 0);
    __decorate([
        property
    ], ActionBreath.prototype, "PlayOnStart", void 0);
    ActionBreath = __decorate([
        ccclass
    ], ActionBreath);
    return ActionBreath;
}(cc.Component));
exports.default = ActionBreath;

cc._RF.pop();