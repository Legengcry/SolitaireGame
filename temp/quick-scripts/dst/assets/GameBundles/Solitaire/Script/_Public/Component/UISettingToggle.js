
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/_Public/Component/UISettingToggle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '42cb7Uh8+BJGryKJhs8QZDy', 'UISettingToggle');
// GameBundles/Solitaire/Script/_Public/Component/UISettingToggle.ts

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
var UISettingToggle = /** @class */ (function (_super) {
    __extends(UISettingToggle, _super);
    function UISettingToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSprite = null;
        _this.offSprite = null;
        _this.toggleSprite = null;
        _this.m_onToggleCallback = null;
        _this.m_isOn = false;
        _this.m_IsBlockInput = false;
        _this.m_Scheduler = null;
        return _this;
    }
    UISettingToggle.prototype.Init = function (isOn, onToggleCallback) {
        this.m_isOn = isOn;
        this.m_onToggleCallback = onToggleCallback;
        this.toggleSprite.node.position = this.getTogglePositionByStatus(!this.m_isOn);
        this.toggleAction(this.m_isOn);
    };
    UISettingToggle.prototype.getTogglePositionByStatus = function (isOn) {
        return isOn ? cc.v3(20, this.toggleSprite.node.y, 0) : cc.v3(-24, this.toggleSprite.node.y, 0);
    };
    UISettingToggle.prototype.toggleAction = function (isOn) {
        var _this = this;
        var togglePosition = this.getTogglePositionByStatus(isOn);
        cc.tween(this.toggleSprite.node)
            .to(0.2, { position: togglePosition })
            .start();
        this.__StopScheduler();
        var targetRange = isOn ? 1 : 0;
        var sr = isOn ? 0 : 1;
        var dr = (targetRange - sr) / (60 * 0.2);
        this.m_Scheduler = function () {
            _this.onSprite.getComponent(cc.Sprite).fillRange = sr;
            sr += dr;
            if (sr > 1 || sr < 0) {
                _this.__StopScheduler();
            }
        };
        this.schedule(this.m_Scheduler);
    };
    UISettingToggle.prototype.__StopScheduler = function () {
        if (this.m_Scheduler) {
            this.unschedule(this.m_Scheduler);
            this.m_Scheduler = null;
        }
    };
    UISettingToggle.prototype.OnClick = function () {
        if (this.m_IsBlockInput) {
            return;
        }
        ii.AudioMgr.ins.PlayEffect();
        this.m_isOn = !this.m_isOn;
        this.toggleAction(this.m_isOn);
        if (this.m_onToggleCallback) {
            this.m_onToggleCallback(this.m_isOn);
        }
    };
    UISettingToggle.prototype.SetBlockInput = function (block) {
        this.m_IsBlockInput = block;
    };
    UISettingToggle.prototype.SyncUI = function (isOn) {
        if (isOn == this.m_isOn) {
            return;
        }
        this.m_isOn = isOn;
        this.toggleSprite.node.position = this.getTogglePositionByStatus(!this.m_isOn);
        this.toggleAction(isOn);
    };
    __decorate([
        property(cc.Sprite)
    ], UISettingToggle.prototype, "onSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], UISettingToggle.prototype, "offSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], UISettingToggle.prototype, "toggleSprite", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], UISettingToggle.prototype, "OnClick", null);
    UISettingToggle = __decorate([
        ccclass
    ], UISettingToggle);
    return UISettingToggle;
}(cc.Component));
exports.default = UISettingToggle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxfUHVibGljXFxDb21wb25lbnRcXFVJU2V0dGluZ1RvZ2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXNFQztRQXJFd0IsY0FBUSxHQUFjLElBQUksQ0FBQTtRQUMxQixlQUFTLEdBQWMsSUFBSSxDQUFBO1FBQzNCLGtCQUFZLEdBQWMsSUFBSSxDQUFBO1FBRTNDLHdCQUFrQixHQUE0QixJQUFJLENBQUE7UUFDbEQsWUFBTSxHQUFZLEtBQUssQ0FBQTtRQUN2QixvQkFBYyxHQUFZLEtBQUssQ0FBQTtRQWdDL0IsaUJBQVcsR0FBYSxJQUFJLENBQUE7O0lBK0J4QyxDQUFDO0lBN0RHLDhCQUFJLEdBQUosVUFBTSxJQUFhLEVBQUUsZ0JBQXlDO1FBQzFELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQTtRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFDTyxtREFBeUIsR0FBakMsVUFBa0MsSUFBYTtRQUMzQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFBK0I7SUE2Q25EO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2tEQVNsQjtJQXhEZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQXNFbkM7SUFBRCxzQkFBQztDQXRFRCxBQXNFQyxDQXRFNEMsRUFBRSxDQUFDLFNBQVMsR0FzRXhEO2tCQXRFb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlTZXR0aW5nVG9nZ2xlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKSBvblNwcml0ZTogY2MuU3ByaXRlID0gbnVsbCBcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKSBvZmZTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGwgXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSkgdG9nZ2xlU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsIFxuXG4gICAgcHJpdmF0ZSBtX29uVG9nZ2xlQ2FsbGJhY2s6IChpc09uOiBib29sZWFuKSA9PiB2b2lkID0gbnVsbCBcbiAgICBwcml2YXRlIG1faXNPbjogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHJpdmF0ZSBtX0lzQmxvY2tJbnB1dDogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICBJbml0IChpc09uOiBib29sZWFuLCBvblRvZ2dsZUNhbGxiYWNrOiAoaXNPbjogYm9vbGVhbikgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm1faXNPbiA9IGlzT25cbiAgICAgICAgdGhpcy5tX29uVG9nZ2xlQ2FsbGJhY2sgPSBvblRvZ2dsZUNhbGxiYWNrXG4gICAgICAgIHRoaXMudG9nZ2xlU3ByaXRlLm5vZGUucG9zaXRpb24gPSB0aGlzLmdldFRvZ2dsZVBvc2l0aW9uQnlTdGF0dXMoIXRoaXMubV9pc09uKVxuICAgICAgICB0aGlzLnRvZ2dsZUFjdGlvbih0aGlzLm1faXNPbilcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRUb2dnbGVQb3NpdGlvbkJ5U3RhdHVzKGlzT246IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIGlzT24gPyBjYy52MygyMCwgdGhpcy50b2dnbGVTcHJpdGUubm9kZS55LCAwKSA6IGNjLnYzKC0yNCwgdGhpcy50b2dnbGVTcHJpdGUubm9kZS55LCAwKVxuICAgIH1cbiAgICBwcml2YXRlIHRvZ2dsZUFjdGlvbihpc09uOiBib29sZWFuKSB7XG4gICAgICAgIGxldCB0b2dnbGVQb3NpdGlvbiA9IHRoaXMuZ2V0VG9nZ2xlUG9zaXRpb25CeVN0YXR1cyhpc09uKVxuICAgICAgICBjYy50d2Vlbih0aGlzLnRvZ2dsZVNwcml0ZS5ub2RlKVxuICAgICAgICAgICAgLnRvKDAuMiwgeyBwb3NpdGlvbjogdG9nZ2xlUG9zaXRpb24gfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLl9fU3RvcFNjaGVkdWxlcigpXG5cbiAgICAgICAgbGV0IHRhcmdldFJhbmdlID0gaXNPbiA/IDEgOiAwXG4gICAgICAgIGxldCBzciA9IGlzT24gPyAwIDogMVxuICAgICAgICBsZXQgZHIgPSAodGFyZ2V0UmFuZ2Utc3IpLyg2MCowLjIpXG4gICAgICAgIHRoaXMubV9TY2hlZHVsZXIgPSAoKT0+IHtcbiAgICAgICAgICAgIHRoaXMub25TcHJpdGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlID0gc3JcbiAgICAgICAgICAgIHNyICs9IGRyXG4gICAgICAgICAgICBpZihzciA+IDEgfHwgc3IgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX1N0b3BTY2hlZHVsZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5tX1NjaGVkdWxlcilcbiAgICB9XG5cbiAgICBwcml2YXRlIG1fU2NoZWR1bGVyOiBGdW5jdGlvbiA9IG51bGwgXG4gICAgcHJpdmF0ZSBfX1N0b3BTY2hlZHVsZXIoKSB7XG4gICAgICAgIGlmKHRoaXMubV9TY2hlZHVsZXIpe1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMubV9TY2hlZHVsZXIpXG4gICAgICAgICAgICB0aGlzLm1fU2NoZWR1bGVyID0gbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQGlpLlV0aWwuYmxvY2soMC4yKVxuICAgIHByaXZhdGUgT25DbGljaygpIHtcbiAgICAgICAgaWYodGhpcy5tX0lzQmxvY2tJbnB1dCkgeyByZXR1cm47IH1cbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoKTtcbiAgICAgICAgdGhpcy5tX2lzT24gPSAhdGhpcy5tX2lzT25cbiAgICAgICAgdGhpcy50b2dnbGVBY3Rpb24odGhpcy5tX2lzT24pXG4gICAgICAgIGlmKHRoaXMubV9vblRvZ2dsZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLm1fb25Ub2dnbGVDYWxsYmFjayh0aGlzLm1faXNPbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFNldEJsb2NrSW5wdXQoYmxvY2s6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5tX0lzQmxvY2tJbnB1dCA9IGJsb2NrO1xuICAgIH1cblxuICAgIFN5bmNVSShpc09uOiBib29sZWFuKSB7XG4gICAgICAgIGlmKGlzT24gPT0gdGhpcy5tX2lzT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1faXNPbiA9IGlzT25cbiAgICAgICAgdGhpcy50b2dnbGVTcHJpdGUubm9kZS5wb3NpdGlvbiA9IHRoaXMuZ2V0VG9nZ2xlUG9zaXRpb25CeVN0YXR1cyghdGhpcy5tX2lzT24pO1xuICAgICAgICB0aGlzLnRvZ2dsZUFjdGlvbihpc09uKTtcbiAgICB9XG59XG4iXX0=