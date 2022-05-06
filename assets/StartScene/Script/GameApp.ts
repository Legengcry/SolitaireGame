import { Cfg } from "./Cfg";
import { PrefabCfg } from "./PrefabCfg";
import { LoginUIPanelArgs } from "./UIPanel/LoginUIPanel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameApp extends ii.App {
    get Version(): string { return "1.0.0"; }
    get sdkCfg(): ii.TSDKCfg { return Cfg; }
    protected get StartBundlePrefabCfg(): ii.TPrefabCfg { return PrefabCfg; }
    protected AdapterCanvas(canvas: cc.Canvas) { this.FitCanvasWithVisiableSize(640, 1024); }
    protected get FrameRate(): number { return 60; }

    protected OnAppLoad() {
        console.info("---- GameApp::OnAppLoad ----")
        this.Login();
    }

    private Login(): void {
        // 显示登陆 UI
        ii.UIMgr.ins.Open<LoginUIPanelArgs>(PrefabCfg.panel.LoginUIPanel.key, LoginUIPanelArgs.Create(()=>{
            this.EnterFirstGame("Solitaire");
        }))
    }
}
