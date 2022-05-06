"use strict";
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