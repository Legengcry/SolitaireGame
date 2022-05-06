
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/UIPanel/LoginUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxVSVBhbmVsXFxMb2dpblVJUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFRQSxDQUFDO0lBTFUsdUJBQU0sR0FBYixVQUFjLGNBQXdCO1FBQ2xDLElBQUksQ0FBQyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNsQyxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDTCx1QkFBQztBQUFELENBUkEsQUFRQyxJQUFBO0FBUlksNENBQWdCO0FBVXZCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQWtDLGdDQUFVO0lBQTVDO1FBQUEscUVBMkJDO1FBMUJ5Rix1QkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDM0YsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDMUIsaUJBQVcsR0FBYSxJQUFJLENBQUM7O0lBd0IvRCxDQUFDO0lBdEJhLCtCQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsZ0NBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQiw2QkFBTSxHQUFoQixVQUFpQixNQUF3QjtRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTyw4Q0FBdUIsR0FBL0IsVUFBZ0MsUUFBaUI7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUM5QyxDQUFDO0lBR08sNEJBQUssR0FBYixVQUFjLGdCQUF5QjtRQUF2QyxpQkFVQztRQVRHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9DLFVBQVU7UUFDVixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFDLE1BQThCO1lBQzNELEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxVQUFDLFNBQStCO2dCQUNsRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUF6QnFGO1FBQXJGLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLCtCQUErQixFQUFFLENBQUM7MkRBQW1DO0lBQzNGO1FBQTVCLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7b0RBQTRCO0lBQzFCO1FBQTdCLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7cURBQThCO0lBSGxELFlBQVk7UUFEeEIsT0FBTztPQUNLLFlBQVksQ0EyQnhCO0lBQUQsbUJBQUM7Q0EzQkQsQUEyQkMsQ0EzQmlDLEVBQUUsQ0FBQyxPQUFPLEdBMkIzQztBQTNCWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMb2dpblVJUGFuZWxBcmdzIHtcbiAgICBvbkxvZ2luU3VjY2VzczogRnVuY3Rpb247XG5cbiAgICBzdGF0aWMgQ3JlYXRlKG9uTG9naW5TdWNjZXNzOiBGdW5jdGlvbik6IExvZ2luVUlQYW5lbEFyZ3Mge1xuICAgICAgICBsZXQgbSA9IG5ldyBMb2dpblVJUGFuZWxBcmdzKCk7XG4gICAgICAgIG0ub25Mb2dpblN1Y2Nlc3MgPSBvbkxvZ2luU3VjY2VzcztcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxufVxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBjbGFzcyBMb2dpblVJUGFuZWwgZXh0ZW5kcyBpaS5VSVBhbmVsIHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB2aXNpYmxlOiB0cnVlLCB0b29sdGlwOiBcIuiOt+WPlueUqOaIt+aOiOadg+eahOagueiKgueCue+8jOW+ruS/oeW5s+WPsOWwhuWcqOi/meS4quiKgueCueS4iuWIm+W7uumAj+aYjueahOaMiemSrlwiIH0pIF9hdXRoVXNlckluZm9Sb290OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlIH0pIGJ1dHRvbk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkxhYmVsIH0pIGJ1dHRvbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IExvZ2luVUlQYW5lbEFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5Mb2dpbih0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIFVwZGF0ZVVJX0F1dGhlZFVzZXJJbmZvKGlzQXV0aGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2F1dGhVc2VySW5mb1Jvb3QuYWN0aXZlID0gIWlzQXV0aGVkO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBMb2dpbihpc0F1dGhlZFVzZXJJbmZvOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuVXBkYXRlVUlfQXV0aGVkVXNlckluZm8oaXNBdXRoZWRVc2VySW5mbyk7XG4gICAgICAgIC8vIOW5s+WPsOeZu+mZhuW4ruWKqeexu1xuICAgICAgICBpaS5BcHAuaW5zLnAudXNlci5Mb2dpblBsYXRmb3JtKChyZXN1bHQ6IGlpLlBsYXRmb3JtTG9naW5SZXN1bHQpPT57XG4gICAgICAgICAgICBpaS5BcHAuaW5zLnAudXNlci5Mb2dpblNlcnZlcihyZXN1bHQsIChsb2dpbkFyZ3M6IGlpLlNlcnZlckxvZ2luUmVzdWx0KT0+ey8v6buY6K6k6LSm5Y+35a+G56CB6YO96IO95a+55LiK77yM55u05o6l55m75b2V5oiQ5YqfXG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQobG9naW5BcmdzLnN1Y2Nlc3MgPT09IHRydWUpO1xuICAgICAgICAgICAgICAgIGlpLlV0aWwuc2FmZUNhbGwodGhpcy5hcmdzLm9uTG9naW5TdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB0aGlzLkNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgaXNBdXRoZWRVc2VySW5mbylcbiAgICB9XG59XG4iXX0=