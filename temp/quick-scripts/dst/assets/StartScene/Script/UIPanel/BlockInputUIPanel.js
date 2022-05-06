
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/UIPanel/BlockInputUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ea23qelk9AxrVMsdQdE+Hs', 'BlockInputUIPanel');
// StartScene/Script/UIPanel/BlockInputUIPanel.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BlockInputUIPanel = /** @class */ (function (_super) {
    __extends(BlockInputUIPanel, _super);
    function BlockInputUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._activeNode = null;
        return _this;
    }
    BlockInputUIPanel.prototype.OnActiveChanged = function (active) { this._activeNode.active = active; };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], BlockInputUIPanel.prototype, "_activeNode", void 0);
    BlockInputUIPanel = __decorate([
        ccclass
    ], BlockInputUIPanel);
    return BlockInputUIPanel;
}(ii.BaseBlockInputUIPanel));
exports.default = BlockInputUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxVSVBhbmVsXFxCbG9ja0lucHV0VUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQyxxQ0FBd0I7SUFBdkU7UUFBQSxxRUFHQztRQUZxRCxpQkFBVyxHQUFZLElBQUksQ0FBQzs7SUFFbEYsQ0FBQztJQURhLDJDQUFlLEdBQXpCLFVBQTBCLE1BQWUsSUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRDVDO1FBQXpDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQzswREFBcUM7SUFEN0QsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0FHckM7SUFBRCx3QkFBQztDQUhELEFBR0MsQ0FIOEMsRUFBRSxDQUFDLHFCQUFxQixHQUd0RTtrQkFIb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsb2NrSW5wdXRVSVBhbmVsIGV4dGVuZHMgaWkuQmFzZUJsb2NrSW5wdXRVSVBhbmVsIHtcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLk5vZGUsIHZpc2libGU6IHRydWV9KSBwcml2YXRlIF9hY3RpdmVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgT25BY3RpdmVDaGFuZ2VkKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQgeyB0aGlzLl9hY3RpdmVOb2RlLmFjdGl2ZSA9IGFjdGl2ZTsgfVxufVxuIl19