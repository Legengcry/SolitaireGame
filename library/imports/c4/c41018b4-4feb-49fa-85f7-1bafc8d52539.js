"use strict";
cc._RF.push(module, 'c4101i0T+tJ+oX3G6/I1SU5', 'WaitingUIPanel');
// StartScene/Script/UIPanel/WaitingUIPanel.ts

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
//加载页面UI
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WaitingUIPanel = /** @class */ (function (_super) {
    __extends(WaitingUIPanel, _super);
    function WaitingUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._activeNode = null;
        return _this;
    }
    WaitingUIPanel.prototype.OnActiveChanged = function (active) { this._activeNode.active = active; };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], WaitingUIPanel.prototype, "_activeNode", void 0);
    WaitingUIPanel = __decorate([
        ccclass
    ], WaitingUIPanel);
    return WaitingUIPanel;
}(ii.BaseWaitingUIPanel));
exports.default = WaitingUIPanel;

cc._RF.pop();