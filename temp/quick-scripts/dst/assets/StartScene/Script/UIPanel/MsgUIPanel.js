
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/UIPanel/MsgUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '208e50cmixGwqTjMIyRv2RB', 'MsgUIPanel');
// StartScene/Script/UIPanel/MsgUIPanel.ts

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
exports.MsgUIPanel = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MsgUIPanel = /** @class */ (function (_super) {
    __extends(MsgUIPanel, _super);
    function MsgUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._msgLabel = null;
        _this._actionNode = null;
        return _this;
    }
    Object.defineProperty(MsgUIPanel.prototype, "ActionNode", {
        get: function () { return this._actionNode; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MsgUIPanel.prototype, "MsgLabel", {
        get: function () { return this._msgLabel; },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property({ type: cc.Label, visible: true })
    ], MsgUIPanel.prototype, "_msgLabel", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], MsgUIPanel.prototype, "_actionNode", void 0);
    MsgUIPanel = __decorate([
        ccclass
    ], MsgUIPanel);
    return MsgUIPanel;
}(ii.BaseMsgUIPanel));
exports.MsgUIPanel = MsgUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxVSVBhbmVsXFxNc2dVSVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnQyw4QkFBaUI7SUFBakQ7UUFBQSxxRUFLQztRQUo4QyxlQUFTLEdBQWEsSUFBSyxDQUFDO1FBQzdCLGlCQUFXLEdBQVksSUFBSyxDQUFDOztJQUczRSxDQUFDO0lBRkcsc0JBQWMsa0NBQVU7YUFBeEIsY0FBc0MsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDaEUsc0JBQWMsZ0NBQVE7YUFBdEIsY0FBcUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFIbEI7UUFBMUMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDO2lEQUE2QjtJQUM3QjtRQUF6QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7bURBQThCO0lBRjlELFVBQVU7UUFEdEIsT0FBTztPQUNLLFVBQVUsQ0FLdEI7SUFBRCxpQkFBQztDQUxELEFBS0MsQ0FMK0IsRUFBRSxDQUFDLGNBQWMsR0FLaEQ7QUFMWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgY2xhc3MgTXNnVUlQYW5lbCBleHRlbmRzIGlpLkJhc2VNc2dVSVBhbmVsIHtcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkxhYmVsLCB2aXNpYmxlOiB0cnVlfSkgX21zZ0xhYmVsOiBjYy5MYWJlbCA9IG51bGwhO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuTm9kZSwgdmlzaWJsZTogdHJ1ZX0pIF9hY3Rpb25Ob2RlOiBjYy5Ob2RlID0gbnVsbCE7XG4gICAgcHJvdGVjdGVkIGdldCBBY3Rpb25Ob2RlKCk6IGNjLk5vZGUgeyByZXR1cm4gdGhpcy5fYWN0aW9uTm9kZTsgfVxuICAgIHByb3RlY3RlZCBnZXQgTXNnTGFiZWwoKTogY2MuTGFiZWwgeyByZXR1cm4gdGhpcy5fbXNnTGFiZWw7IH1cbn1cbiJdfQ==