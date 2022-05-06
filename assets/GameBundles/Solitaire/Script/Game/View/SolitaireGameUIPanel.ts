import { MarkSeed } from "../../DataCache/SolitaireDataCache";
import { SolitaireLogic } from "../../Logic/SolitaireLogic";
import { EGameType } from "../../SolitaireEnums";
import { SolitairePrefabCfg } from "../../SolitairePrefabCfg";
import { SolitaireJu } from "../Model/SolitaireJu";
import { SolitaireTestData } from "../Model/SolitaireTestData";
import SolitaireGameDesktopUI from "./SolitaireGameDesktopUI";
import SolitaireGameTopInfoUI, { SolitaireGameTopInfoUIArgs } from "./SolitaireGameTopInfoUI";

export type SolitaireGameUIPanelArgs = {
    gameType: EGameType,
    resume: boolean,
    vegas: boolean,
    card3: boolean,
    markSeed?: MarkSeed
}

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireGameUIPanel extends ii.UIPanel<SolitaireGameUIPanelArgs> {
    static readonly event = {
        EVENT_GAMESCENE_REPLAY_GAME: 'EVT_SOLITAIRE_GAMEUI_REPLAY_GAME' // 重玩游戏（胜利页面）
        ,EVENT_GAMESCENE_SKIP_GAME: 'EVT_SOLITAIRE_GAMEUI_SKIP_GAME' // 跳过当前进度局
        ,EVENT_GAMESCENE_NEXT_GAME: 'EVT_SOLITAIRE_GAMEUI_NEXT_GAME' // 胜利页面，下一局
        ,EVENT_GAMESCENE_BACK: 'EVT_SOLITAIRE_GAMEUI_BACK'
        ,EVENT_GAMESCENE_SEED: 'EVENT_GAMESCENE_SEED' // 打开 Seed 界面
    }
    private m_IsTest: boolean = false;
    private m_DesktopUI: SolitaireGameDesktopUI = null;
    private m_TopInfoUI: SolitaireGameTopInfoUI = null;
    private m_Ju: SolitaireJu = null;

    protected OnCreate(): void {
        this.onGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_REPLAY_GAME, this.HandleReplayGame.bind(this))
        this.onGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_SKIP_GAME, this.HandleSkipGame.bind(this))
        this.onGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_NEXT_GAME, this.HandleNextGame.bind(this))
        this.onGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_BACK, this.OnBack.bind(this))
        this.onGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_SEED, this.HandleOpenSeedList.bind(this))
    }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: SolitaireGameUIPanelArgs): void {
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.m_DesktopUI = ii.UIMgr.ins.Create<SolitaireGameDesktopUI>(SolitairePrefabCfg.pfb.comp.SolitaireGameDesktopUI.key, null, this.node).CloseBy(this);
        this.m_TopInfoUI = ii.UIMgr.ins.Create<SolitaireGameTopInfoUI, SolitaireGameTopInfoUIArgs>(SolitairePrefabCfg.pfb.comp.SolitaireGameTopInfoUI.key, { OnBack: this.OnBack.bind(this) }, this.node).CloseBy(this);
        if(this.m_IsTest) {
            this.CreateGameWithTestData(this.args.vegas, this.args.card3, EGameType.EASY);
        }else{
            if(this.args.resume) {
                let snapData = SolitaireLogic.dataCache.ReadSnapData(this.args.vegas, this.args.card3, this.args.gameType);
                this.EnterGame(snapData.gameType, snapData.vegas, snapData.card3, ()=>this.m_Ju.EnterWithSnap(snapData));
            }else{
                switch (this.args.gameType) {
                    case EGameType.EASY: this.__CreateEasyGame(this.args.vegas, this.args.card3); break;
                    case EGameType.HARD:this.__CreateHardGame(this.args.vegas, this.args.card3); break;
                    case EGameType.SEED: this.__CreateSeedGame(this.args.vegas, this.args.card3, this.args.markSeed.s); break
                }
            }
        }
    }
    private __CreateEasyGame(vegas: boolean, card3: boolean) {
        SolitaireLogic.dataCache.LoadEasyLevel(vegas, card3, (isVegasMode: boolean, isCard3Mode: boolean, seed: number)=>{
            this.CreateGame(isVegasMode, isCard3Mode, EGameType.EASY, seed);
        });
    }
    private __CreateHardGame(vegas: boolean, card3: boolean) { this.CreateGame(vegas, card3, EGameType.HARD, new ii.MCGRand(ii.date.getMilliTimeStamp()).range(1, 10000)); }
    private __CreateSeedGame(vegas: boolean, card3: boolean, seed: number) { this.CreateGame(vegas, card3, EGameType.SEED, seed); }

    private CreateGameWithTestData(vegas: boolean, card3: boolean, gameType: EGameType) {
        this.EnterGame(gameType, vegas, card3, ()=>{
            this.m_Ju.EnterWithTestData(SolitaireTestData.data1);
        })
    }

    private CreateGame(isVegasMode: boolean, isCard3Mode: boolean, gameType: EGameType, seed: number) {
        this.EnterGame(gameType, isVegasMode, isCard3Mode, ()=>this.m_Ju.Enter(seed))
    }

    private EnterGame(gameType: EGameType, isVegasMode: boolean, isCard3Mode: boolean, modelEnterFunc: Function){
        ii.App.ins.p.ad.LoadInterstitialIfNotAvalable();
        this.ExitGame(()=>{
            this.m_Ju = new SolitaireJu(gameType, isVegasMode, isCard3Mode)
            this.m_DesktopUI.Enter(this.m_Ju)
            this.m_TopInfoUI.Enter(this.m_Ju)
            modelEnterFunc()
            this.StartScheduler("SOLITAIRE_GAME_TICK", ()=>this.m_Ju.Tick(), 1);
        })
    }

    private ExitGame(callback: Function) {
        if(this.m_Ju){
            this.StopScheduler("SOLITAIRE_GAME_TICK");
            this.m_TopInfoUI.Exit(this.m_Ju)
            this.m_DesktopUI.Exit(this.m_Ju)
            this.m_Ju.Exit()
            this.m_Ju = null
        }
        callback()
    }

    /*********************************************************************
     * Event Handlers
     *********************************************************************/
     private HandleReplayGame() {
        SolitaireLogic.dataCache.ClearSnapData(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType);
        this.CreateGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType, this.m_Ju.Seed)
    }
    private HandleSkipGame() {
        // 跳过当前局，算玩家输了这局
        SolitaireLogic.dataCache.SkipLevelIndex(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType, false);
        switch (this.m_Ju.gameType) {
            case EGameType.EASY: this.__CreateEasyGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode); break;
            case EGameType.HARD:this.__CreateHardGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode); break;
            case EGameType.SEED: {
                let seed = SolitaireLogic.dataCache.GetNextMarkSeed(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.Seed);
                this.__CreateSeedGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, seed);
            } break
        }
    }
    private HandleNextGame() {
        SolitaireLogic.dataCache.SkipLevelIndex(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.gameType, true);
        switch (this.m_Ju.gameType) {
            case EGameType.EASY: this.__CreateEasyGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode); break;
            case EGameType.HARD:this.__CreateHardGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode); break;
            case EGameType.SEED: {
                let seed = SolitaireLogic.dataCache.GetNextMarkSeed(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, this.m_Ju.Seed);
                this.__CreateSeedGame(this.m_Ju.isVegasMode, this.m_Ju.isCard3Mode, seed);
            } break
        }
    }
    private OnBack() {
        SolitaireLogic.dataCache.WriteSnapData(this.m_Ju.Snap(), this.m_Ju.gameType);
        this.LoadResList([
            SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key
        ], ()=>{
            this.ExitGame(()=>{
                ii.UIMgr.ins.Open(SolitairePrefabCfg.pfb.panel.SolitaireMenuUIPanel.key, null, ()=>this.Close())
            })
        })
    }
    private HandleOpenSeedList() {
        ii.UIMgr.ins.Open<SolitaireLevelListUIPanelArgs>(SolitairePrefabCfg.pfb.panel.SolitaireSeedListUIPanel.key, {
            vegas: this.m_Ju.isVegasMode,
            card3: this.m_Ju.isCard3Mode,
            OnSelect: (markSeed: MarkSeed, vegas: boolean, card3: boolean) => {
                this.__CreateSeedGame(vegas, card3, markSeed.s);
            }
        });
    }
}
