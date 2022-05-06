
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/GameApp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bcdc0MBQqxECa6PuoZduBFV', 'GameApp');
// StartScene/Script/GameApp.ts

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
var Cfg_1 = require("./Cfg");
var PrefabCfg_1 = require("./PrefabCfg");
var LoginUIPanel_1 = require("./UIPanel/LoginUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameApp = /** @class */ (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GameApp.prototype, "Version", {
        get: function () { return "1.0.0"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "sdkCfg", {
        get: function () { return Cfg_1.Cfg; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "StartBundlePrefabCfg", {
        get: function () { return PrefabCfg_1.PrefabCfg; },
        enumerable: false,
        configurable: true
    });
    GameApp.prototype.AdapterCanvas = function (canvas) { this.FitCanvasWithVisiableSize(640, 1024); };
    Object.defineProperty(GameApp.prototype, "FrameRate", {
        get: function () { return 60; },
        enumerable: false,
        configurable: true
    });
    GameApp.prototype.OnAppLoad = function () {
        console.info("---- GameApp::OnAppLoad ----");
        this.Login();
    };
    GameApp.prototype.Login = function () {
        var _this = this;
        // 显示登陆 UI
        ii.UIMgr.ins.Open(PrefabCfg_1.PrefabCfg.panel.LoginUIPanel.key, LoginUIPanel_1.LoginUIPanelArgs.Create(function () {
            _this.EnterFirstGame("Solitaire");
        }));
    };
    GameApp = __decorate([
        ccclass
    ], GameApp);
    return GameApp;
}(ii.App));
exports.default = GameApp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxHYW1lQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUE0QjtBQUM1Qix5Q0FBd0M7QUFDeEMsdURBQTBEO0FBRXBELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFNO0lBQTNDOztJQWtCQSxDQUFDO0lBakJHLHNCQUFJLDRCQUFPO2FBQVgsY0FBd0IsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN6QyxzQkFBSSwyQkFBTTthQUFWLGNBQTJCLE9BQU8sU0FBRyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDeEMsc0JBQWMseUNBQW9CO2FBQWxDLGNBQXNELE9BQU8scUJBQVMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQy9ELCtCQUFhLEdBQXZCLFVBQXdCLE1BQWlCLElBQUksSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsc0JBQWMsOEJBQVM7YUFBdkIsY0FBb0MsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUV0QywyQkFBUyxHQUFuQjtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtRQUM1QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFBQSxpQkFLQztRQUpHLFVBQVU7UUFDVixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQW1CLHFCQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsK0JBQWdCLENBQUMsTUFBTSxDQUFDO1lBQzFGLEtBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNQLENBQUM7SUFqQmdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FrQjNCO0lBQUQsY0FBQztDQWxCRCxBQWtCQyxDQWxCb0MsRUFBRSxDQUFDLEdBQUcsR0FrQjFDO2tCQWxCb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmZyB9IGZyb20gXCIuL0NmZ1wiO1xuaW1wb3J0IHsgUHJlZmFiQ2ZnIH0gZnJvbSBcIi4vUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgeyBMb2dpblVJUGFuZWxBcmdzIH0gZnJvbSBcIi4vVUlQYW5lbC9Mb2dpblVJUGFuZWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQXBwIGV4dGVuZHMgaWkuQXBwIHtcbiAgICBnZXQgVmVyc2lvbigpOiBzdHJpbmcgeyByZXR1cm4gXCIxLjAuMFwiOyB9XG4gICAgZ2V0IHNka0NmZygpOiBpaS5UU0RLQ2ZnIHsgcmV0dXJuIENmZzsgfVxuICAgIHByb3RlY3RlZCBnZXQgU3RhcnRCdW5kbGVQcmVmYWJDZmcoKTogaWkuVFByZWZhYkNmZyB7IHJldHVybiBQcmVmYWJDZmc7IH1cbiAgICBwcm90ZWN0ZWQgQWRhcHRlckNhbnZhcyhjYW52YXM6IGNjLkNhbnZhcykgeyB0aGlzLkZpdENhbnZhc1dpdGhWaXNpYWJsZVNpemUoNjQwLCAxMDI0KTsgfVxuICAgIHByb3RlY3RlZCBnZXQgRnJhbWVSYXRlKCk6IG51bWJlciB7IHJldHVybiA2MDsgfVxuXG4gICAgcHJvdGVjdGVkIE9uQXBwTG9hZCgpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiLS0tLSBHYW1lQXBwOjpPbkFwcExvYWQgLS0tLVwiKVxuICAgICAgICB0aGlzLkxvZ2luKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBMb2dpbigpOiB2b2lkIHtcbiAgICAgICAgLy8g5pi+56S655m76ZmGIFVJXG4gICAgICAgIGlpLlVJTWdyLmlucy5PcGVuPExvZ2luVUlQYW5lbEFyZ3M+KFByZWZhYkNmZy5wYW5lbC5Mb2dpblVJUGFuZWwua2V5LCBMb2dpblVJUGFuZWxBcmdzLkNyZWF0ZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5FbnRlckZpcnN0R2FtZShcIlNvbGl0YWlyZVwiKTtcbiAgICAgICAgfSkpXG4gICAgfVxufVxuIl19