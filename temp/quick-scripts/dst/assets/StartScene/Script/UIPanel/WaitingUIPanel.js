
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/UIPanel/WaitingUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxVSVBhbmVsXFxXYWl0aW5nVUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ0YsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQXFCO0lBQWpFO1FBQUEscUVBR0M7UUFGcUQsaUJBQVcsR0FBWSxJQUFJLENBQUM7O0lBRWxGLENBQUM7SUFEYSx3Q0FBZSxHQUF6QixVQUEwQixNQUFlLElBQVUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUQ1QztRQUF6QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7dURBQXFDO0lBRDdELGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FHbEM7SUFBRCxxQkFBQztDQUhELEFBR0MsQ0FIMkMsRUFBRSxDQUFDLGtCQUFrQixHQUdoRTtrQkFIb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5Yqg6L296aG16Z2iVUlcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FpdGluZ1VJUGFuZWwgZXh0ZW5kcyBpaS5CYXNlV2FpdGluZ1VJUGFuZWwge1xuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuTm9kZSwgdmlzaWJsZTogdHJ1ZX0pIHByaXZhdGUgX2FjdGl2ZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByb3RlY3RlZCBPbkFjdGl2ZUNoYW5nZWQoYWN0aXZlOiBib29sZWFuKTogdm9pZCB7IHRoaXMuX2FjdGl2ZU5vZGUuYWN0aXZlID0gYWN0aXZlOyB9XG59XG4iXX0=