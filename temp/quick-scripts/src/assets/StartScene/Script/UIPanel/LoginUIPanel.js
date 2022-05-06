"use strict";
cc._RF.push(module, 'd1604sBoCVFiJPAvxKepU/C', 'LoginUIPanel');
// StartScene/Script/UIPanel/LoginUIPanel.ts

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
exports.LoginUIPanel = exports.LoginUIPanelArgs = void 0;
var LoginUIPanelArgs = /** @class */ (function () {
    function LoginUIPanelArgs() {
    }
    LoginUIPanelArgs.Create = function (onLoginSuccess) {
        var m = new LoginUIPanelArgs();
        m.onLoginSuccess = onLoginSuccess;
        return m;
    };
    return LoginUIPanelArgs;
}());
exports.LoginUIPanelArgs = LoginUIPanelArgs;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoginUIPanel = /** @class */ (function (_super) {
    __extends(LoginUIPanel, _super);
    function LoginUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._authUserInfoRoot = null;
        _this.buttonNode = null;
        _this.buttonLabel = null;
        return _this;
    }
    LoginUIPanel.prototype.OnCreate = function () { };
    LoginUIPanel.prototype.OnRelease = function () { };
    LoginUIPanel.prototype.OnOpen = function (uiArgs) {
        this.Login(true);
    };
    LoginUIPanel.prototype.UpdateUI_AuthedUserInfo = function (isAuthed) {
        this._authUserInfoRoot.active = !isAuthed;
    };
    LoginUIPanel.prototype.Login = function (isAuthedUserInfo) {
        var _this = this;
        this.UpdateUI_AuthedUserInfo(isAuthedUserInfo);
        // 平台登陆帮助类
        ii.App.ins.p.user.LoginPlatform(function (result) {
            ii.App.ins.p.user.LoginServer(result, function (loginArgs) {
                console.assert(loginArgs.success === true);
                ii.Util.safeCall(_this.args.onLoginSuccess);
                _this.Close();
            });
        }, isAuthedUserInfo);
    };
    __decorate([
        property({ type: cc.Node, visible: true, tooltip: "获取用户授权的根节点，微信平台将在这个节点上创建透明的按钮" })
    ], LoginUIPanel.prototype, "_authUserInfoRoot", void 0);
    __decorate([
        property({ type: cc.Node })
    ], LoginUIPanel.prototype, "buttonNode", void 0);
    __decorate([
        property({ type: cc.Label })
    ], LoginUIPanel.prototype, "buttonLabel", void 0);
    LoginUIPanel = __decorate([
        ccclass
    ], LoginUIPanel);
    return LoginUIPanel;
}(ii.UIPanel));
exports.LoginUIPanel = LoginUIPanel;

cc._RF.pop();