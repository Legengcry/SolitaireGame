
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Statistics/UIStatisticsCircleProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ef35H0EBJBhqs+ULNYJPTq', 'UIStatisticsCircleProgress');
// GameBundles/Solitaire/Script/Statistics/UIStatisticsCircleProgress.ts

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
var UIStatisticsCircleProgress = /** @class */ (function (_super) {
    __extends(UIStatisticsCircleProgress, _super);
    function UIStatisticsCircleProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressLabel = null;
        _this.countLabel = null;
        _this.progressSprite = null;
        return _this;
    }
    UIStatisticsCircleProgress.prototype.Init = function (count, total) {
        var percent = total == 0 ? 0 : Math.floor(count * 100 / total);
        this.progressLabel.string = percent + "%";
        this.countLabel.string = "" + count;
        this.progressSprite.fillRange = percent / 100.0;
    };
    __decorate([
        property(cc.Label)
    ], UIStatisticsCircleProgress.prototype, "progressLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIStatisticsCircleProgress.prototype, "countLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIStatisticsCircleProgress.prototype, "progressSprite", void 0);
    UIStatisticsCircleProgress = __decorate([
        ccclass
    ], UIStatisticsCircleProgress);
    return UIStatisticsCircleProgress;
}(cc.Component));
exports.default = UIStatisticsCircleProgress;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTdGF0aXN0aWNzXFxVSVN0YXRpc3RpY3NDaXJjbGVQcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3RCw4Q0FBWTtJQUFwRTtRQUFBLHFFQVlDO1FBWHVCLG1CQUFhLEdBQWEsSUFBSSxDQUFBO1FBQzlCLGdCQUFVLEdBQWEsSUFBSSxDQUFBO1FBQzFCLG9CQUFjLEdBQWMsSUFBSSxDQUFBOztJQVN6RCxDQUFDO0lBUEcseUNBQUksR0FBSixVQUFLLEtBQWEsRUFBRSxLQUFhO1FBQzdCLElBQUksT0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLEtBQUssQ0FBQyxDQUFBO1FBRTFELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFNLE9BQU8sTUFBRyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUcsS0FBTyxDQUFBO1FBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBQyxLQUFLLENBQUE7SUFDakQsQ0FBQztJQVZtQjtRQUFuQixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxRUFBK0I7SUFDOUI7UUFBbkIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0VBQTRCO0lBQzFCO1FBQXBCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NFQUFpQztJQUhwQywwQkFBMEI7UUFEOUMsT0FBTztPQUNhLDBCQUEwQixDQVk5QztJQUFELGlDQUFDO0NBWkQsQUFZQyxDQVp1RCxFQUFFLENBQUMsU0FBUyxHQVluRTtrQkFab0IsMEJBQTBCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVN0YXRpc3RpY3NDaXJjbGVQcm9ncmVzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKSBwcm9ncmVzc0xhYmVsOiBjYy5MYWJlbCA9IG51bGwgXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKSBjb3VudExhYmVsOiBjYy5MYWJlbCA9IG51bGwgXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSkgcHJvZ3Jlc3NTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGwgXG5cbiAgICBJbml0KGNvdW50OiBudW1iZXIsIHRvdGFsOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBlcmNlbnQgPSB0b3RhbCA9PSAwID8gMCA6IE1hdGguZmxvb3IoY291bnQqMTAwL3RvdGFsKVxuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSBgJHtwZXJjZW50fSVgXG4gICAgICAgIHRoaXMuY291bnRMYWJlbC5zdHJpbmcgPSBgJHtjb3VudH1gXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NTcHJpdGUuZmlsbFJhbmdlID0gcGVyY2VudC8xMDAuMFxuICAgIH1cbn1cbiJdfQ==