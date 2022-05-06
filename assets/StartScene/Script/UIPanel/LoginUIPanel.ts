export class LoginUIPanelArgs {
    onLoginSuccess: Function;

    static Create(onLoginSuccess: Function): LoginUIPanelArgs {
        let m = new LoginUIPanelArgs();
        m.onLoginSuccess = onLoginSuccess;
        return m;
    }
}

const { ccclass, property } = cc._decorator;
@ccclass
export class LoginUIPanel extends ii.UIPanel {
    @property({ type: cc.Node, visible: true, tooltip: "获取用户授权的根节点，微信平台将在这个节点上创建透明的按钮" }) _authUserInfoRoot: cc.Node = null;
    @property({ type: cc.Node }) buttonNode: cc.Node = null;
    @property({ type: cc.Label }) buttonLabel: cc.Label = null;

    protected OnCreate(): void { }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: LoginUIPanelArgs): void {
        this.Login(true);
    }

    private UpdateUI_AuthedUserInfo(isAuthed: boolean): void {
        this._authUserInfoRoot.active = !isAuthed;
    }


    private Login(isAuthedUserInfo: boolean): void {
        this.UpdateUI_AuthedUserInfo(isAuthedUserInfo);
        // 平台登陆帮助类
        ii.App.ins.p.user.LoginPlatform((result: ii.PlatformLoginResult)=>{
            ii.App.ins.p.user.LoginServer(result, (loginArgs: ii.ServerLoginResult)=>{//默认账号密码都能对上，直接登录成功
                console.assert(loginArgs.success === true);
                ii.Util.safeCall(this.args.onLoginSuccess);
                this.Close();
            });
        }, isAuthedUserInfo)
    }
}
