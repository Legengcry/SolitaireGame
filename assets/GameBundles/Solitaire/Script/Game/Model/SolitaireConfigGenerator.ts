import { EGameType } from "../../SolitaireEnums";
import { SolitaireDataBattleResult } from "../SolitaireType";
import { SolitaireJu } from "./SolitaireJu";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireConfigGenerator extends cc.Component {
    private m_ResultList: SolitaireDataBattleResult[] = []
    private m_Scheduler: Function = null;
    private m_Seed: number = 0;
    private m_PreLength: number = 0;
    private m_JudgeFunc: (gameResult: SolitaireDataBattleResult)=>boolean;
    private m_GameType: EGameType = EGameType.EASY;
    private m_IsVegasMode: boolean = false;
    private m_IsCard3Mode: boolean = false;
    start() {
        this.Test_GenerateValidDungents(EGameType.EASY, true, true);
    }


    Test_GenerateValidDungents(gameType: EGameType,isVegasMode: boolean, isCard3Mode: boolean) {
        this.m_GameType = gameType;
        this.m_IsVegasMode = isVegasMode;
        this.m_IsCard3Mode = isCard3Mode;
        this.m_ResultList = [];
        this.m_Seed = 1;
        this.m_PreLength = 0;
        this.m_JudgeFunc = this.GetDifficultFunc(gameType);
        this.StartScheduler();
    }

    StartScheduler() {
        if(this.m_Scheduler === null) {
            this.m_Scheduler = this.Tick.bind(this);
            this.schedule(this.m_Scheduler, 0, cc.macro.REPEAT_FOREVER);
        }
    }

    StopScheduler() {
        if(this.m_Scheduler !== null) {
            this.unschedule(this.m_Scheduler);
            this.m_Scheduler = null;
        }
    }

    Tick() {
        while(true) {
            if(this.m_ResultList.length < 800) {
                let gameResult: SolitaireDataBattleResult = SolitaireJu.ServerPlay(this.m_GameType, this.m_Seed, this.m_IsVegasMode, this.m_IsCard3Mode);
                ++this.m_Seed;
                if(gameResult.pass && this.m_JudgeFunc(gameResult)){
                    this.m_ResultList.push(gameResult);
                    let lengthOfList = this.m_ResultList.length;
                    if(lengthOfList >= this.m_PreLength+100) {
                        this.m_PreLength = lengthOfList;
                        console.log(`[${lengthOfList}] is done`);
                        return;
                    }
                }
            }else{
                this.StopScheduler();
                this.Save();
                return;
            }
        }
    }

    Save() {
        let seeds = this.m_ResultList.sort((a, b)=>{
            if(a.flipCloseCnt === b.flipCloseCnt) {
                return a.step-b.step;
            }else{
                return a.flipCloseCnt-b.flipCloseCnt;
            }
        }).map(v=>v.seed);

        if(!(cc.sys.isNative && cc.sys.os === cc.sys.OS_OSX)){
            console.info(JSON.stringify(seeds));
            return
        }
        const generateConfigDir = `${jsb.fileUtils.getWritablePath()}Auto/JSON/`
        if(!jsb.fileUtils.isDirectoryExist(generateConfigDir)) {
            jsb.fileUtils.createDirectory(generateConfigDir)
        }
        const jsonFileFullPath = `${generateConfigDir}level_${this.m_GameType}_${this.m_IsVegasMode ? 1 : 0}_${this.m_IsCard3Mode ? 1 : 0}.json`
        jsb.fileUtils.writeStringToFile(JSON.stringify(seeds), jsonFileFullPath);
        console.info(`done >> write to ${jsonFileFullPath}`);
    }

    private GetDifficultFunc(gameType: EGameType): (gameType: SolitaireDataBattleResult) => boolean {
        switch (gameType) {
            case EGameType.EASY: return this.IsDifficultEasy.bind(this);        
            case EGameType.HARD: return this.IsDifficultHard.bind(this);        
            default: break;
        }
    }
    private IsDifficultEasy(gameResult: SolitaireDataBattleResult): boolean { return gameResult.flipCloseCnt <= 3; }
    private IsDifficultHard(gameResult: SolitaireDataBattleResult): boolean { return gameResult.flipCloseCnt > 3; }
}