"use strict";
cc._RF.push(module, '08c00aVcEtKwpnotQAQcUBq', 'LoadingUIPanel');
// StartScene/Script/UIPanel/LoadingUIPanel.ts

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
var LoadingUIPanel = /** @class */ (function (_super) {
    __extends(LoadingUIPanel, _super);
    function LoadingUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._blockInputNode = null;
        _this._fadeNode = null;
        _this.m_LoadingProgressCircleSprite = null;
        _this.m_LoadingRefLabel = null;
        return _this;
    }
    LoadingUIPanel.prototype.OnCreate = function () {
        _super.prototype.OnCreate.call(this);
        this._fadeNode.active = false;
        this.m_LoadingProgressCircleSprite.fillRange = 0;
    };
    LoadingUIPanel.prototype.OnActiveChanged = function (active) {
        this._blockInputNode.active = active;
        this._fadeNode.active = active;
        if (active) {
            this.m_LoadingProgressCircleSprite.fillRange = 0;
        }
    };
    LoadingUIPanel.prototype.OnLoading = function (finishCount, totalCount) {
        var _percent = finishCount * 100 / totalCount;
        this.m_LoadingRefLabel.string = Math.ceil(_percent) + "%";
        this.m_LoadingProgressCircleSprite.fillRange = _percent * 0.01;
    };
    __decorate([
        property({ type: cc.Node, visible: true })
    ], LoadingUIPanel.prototype, "_blockInputNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], LoadingUIPanel.prototype, "_fadeNode", void 0);
    __decorate([
        property({ type: cc.Sprite, tooltip: "进度圆圈" })
    ], LoadingUIPanel.prototype, "m_LoadingProgressCircleSprite", void 0);
    __decorate([
        property({ type: cc.Label, tooltip: "引用计数" })
    ], LoadingUIPanel.prototype, "m_LoadingRefLabel", void 0);
    LoadingUIPanel = __decorate([
        ccclass
    ], LoadingUIPanel);
    return LoadingUIPanel;
}(ii.BaseLoadingUIPanel));
exports.default = LoadingUIPanel;

cc._RF.pop();