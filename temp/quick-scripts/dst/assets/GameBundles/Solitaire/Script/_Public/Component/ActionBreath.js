
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/_Public/Component/ActionBreath.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxfUHVibGljXFxDb21wb25lbnRcXEFjdGlvbkJyZWF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVHLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBMkJDO1FBMUJxQixnQkFBVSxHQUFXLEdBQUcsQ0FBQTtRQUN4QixnQkFBVSxHQUFXLEdBQUcsQ0FBQTtRQUN4QixpQkFBVyxHQUFZLEtBQUssQ0FBQTtRQUV0QyxpQkFBVyxHQUFXLEdBQUcsQ0FBQTtRQVF6QixpQkFBVyxHQUFZLEtBQUssQ0FBQTs7SUFjeEMsQ0FBQztJQXJCRyw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNsQyxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQ3pCO0lBQ0wsQ0FBQztJQUdELHNDQUFlLEdBQWY7UUFDSSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDakIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRTthQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxHQUFHLENBQUM7YUFDMUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQzthQUMzRixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFBO1FBQy9FLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNkLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDckIsS0FBSyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQXpCUztRQUFULFFBQVE7b0RBQWlDO0lBQ2hDO1FBQVQsUUFBUTtvREFBaUM7SUFDaEM7UUFBVCxRQUFRO3FEQUFxQztJQUg3QixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBMkJoQztJQUFELG1CQUFDO0NBM0JELEFBMkJDLENBM0J5QyxFQUFFLENBQUMsU0FBUyxHQTJCckQ7a0JBM0JvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDlkbzlkLjnu4Tku7bvvJrpmo/nnYDml7bpl7TnmoTmjqjnp7vvvIzmlL7lpKfnvKnlsI9cbiAqL1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbkJyZWF0aCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5IHByaXZhdGUgbV9NYXhTY2FsZTogbnVtYmVyID0gMS4yXG4gICAgQHByb3BlcnR5IHByaXZhdGUgbV9JbnRlcnZhbDogbnVtYmVyID0gMS44XG4gICAgQHByb3BlcnR5IHByaXZhdGUgUGxheU9uU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZVxuXG4gICAgcHJpdmF0ZSBtX0luaXRTY2FsZTogbnVtYmVyID0gMS4wXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubV9Jbml0U2NhbGUgPSB0aGlzLm5vZGUuc2NhbGVcbiAgICAgICAgaWYodGhpcy5QbGF5T25TdGFydCkge1xuICAgICAgICAgICAgdGhpcy5SdW5CcmVhdGhBY3Rpb24oKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtX0lzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlXG4gICAgUnVuQnJlYXRoQWN0aW9uKCkge1xuICAgICAgICBpZih0aGlzLm1fSXNSdW5uaW5nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fSXNSdW5uaW5nID0gdHJ1ZVxuICAgICAgICBsZXQgYWN0aW9uID0gY2MudHdlZW4oKVxuICAgICAgICAgICAgLmRlbGF5KHRoaXMubV9JbnRlcnZhbCowLjkpXG4gICAgICAgICAgICAudG8odGhpcy5tX0ludGVydmFsLCB7c2NhbGU6IHRoaXMubV9NYXhTY2FsZSp0aGlzLm1fSW5pdFNjYWxlfSwge2Vhc2luZzogY2MuZWFzaW5nLnNpbmVPdXR9KVxuICAgICAgICAgICAgLnRvKHRoaXMubV9JbnRlcnZhbCwge3NjYWxlOiB0aGlzLm1fSW5pdFNjYWxlfSwge2Vhc2luZzogY2MuZWFzaW5nLnNpbmVJbn0pXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGFjdGlvbilcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfVxufVxuIl19