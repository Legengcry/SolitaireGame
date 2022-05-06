
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/UIPanel/LoadingUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxVSVBhbmVsXFxMb2FkaW5nVUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBcUI7SUFBakU7UUFBQSxxRUF1QkM7UUF0QnFELHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDdEIsbUNBQTZCLEdBQWMsSUFBSSxDQUFDO1FBQ2pELHVCQUFpQixHQUFhLElBQUksQ0FBQzs7SUFtQjVGLENBQUM7SUFqQmEsaUNBQVEsR0FBbEI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNTLHdDQUFlLEdBQXpCLFVBQTBCLE1BQWU7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMvQixJQUFHLE1BQU0sRUFBRTtZQUNQLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUNTLGtDQUFTLEdBQW5CLFVBQW9CLFdBQW1CLEVBQUUsVUFBa0I7UUFDdkQsSUFBSSxRQUFRLEdBQUcsV0FBVyxHQUFDLEdBQUcsR0FBQyxVQUFVLENBQUM7UUFDMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFHLENBQUM7UUFDMUQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUMsSUFBSSxDQUFDO0lBQ2pFLENBQUM7SUFyQnlDO1FBQXpDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQzsyREFBeUM7SUFDeEM7UUFBekMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDO3FEQUFtQztJQUM5QjtRQUE3QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUM7eUVBQXlEO0lBQ3pEO1FBQTVDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQzs2REFBNEM7SUFKdkUsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVCbEM7SUFBRCxxQkFBQztDQXZCRCxBQXVCQyxDQXZCMkMsRUFBRSxDQUFDLGtCQUFrQixHQXVCaEU7a0JBdkJvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdVSVBhbmVsIGV4dGVuZHMgaWkuQmFzZUxvYWRpbmdVSVBhbmVsIHtcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLk5vZGUsIHZpc2libGU6IHRydWV9KSBwcml2YXRlIF9ibG9ja0lucHV0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5Ob2RlLCB2aXNpYmxlOiB0cnVlfSkgcHJpdmF0ZSBfZmFkZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTogY2MuU3ByaXRlLCB0b29sdGlwOiBcIui/m+W6puWchuWciFwifSkgcHJpdmF0ZSBtX0xvYWRpbmdQcm9ncmVzc0NpcmNsZVNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6IGNjLkxhYmVsLCB0b29sdGlwOiBcIuW8leeUqOiuoeaVsFwifSkgcHJpdmF0ZSBtX0xvYWRpbmdSZWZMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5PbkNyZWF0ZSgpO1xuICAgICAgICB0aGlzLl9mYWRlTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdQcm9ncmVzc0NpcmNsZVNwcml0ZS5maWxsUmFuZ2UgPSAwO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25BY3RpdmVDaGFuZ2VkKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ibG9ja0lucHV0Tm9kZS5hY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIHRoaXMuX2ZhZGVOb2RlLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgaWYoYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1Byb2dyZXNzQ2lyY2xlU3ByaXRlLmZpbGxSYW5nZSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJvdGVjdGVkIE9uTG9hZGluZyhmaW5pc2hDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IF9wZXJjZW50ID0gZmluaXNoQ291bnQqMTAwL3RvdGFsQ291bnQ7XG4gICAgICAgIHRoaXMubV9Mb2FkaW5nUmVmTGFiZWwuc3RyaW5nID0gYCR7TWF0aC5jZWlsKF9wZXJjZW50KX0lYDtcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdQcm9ncmVzc0NpcmNsZVNwcml0ZS5maWxsUmFuZ2UgPSBfcGVyY2VudCowLjAxO1xuICAgIH1cbn1cbiJdfQ==