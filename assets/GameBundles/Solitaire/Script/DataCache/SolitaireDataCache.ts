import { SolitaireJu } from "../Game/Model/SolitaireJu";
import { SnapData } from "../Game/SolitaireType";
import { EGameType } from "../SolitaireEnums";
import { SolitaireJsonCfg } from "../SolitaireJsonCfg";

export type MarkSeed = {
    t: EGameType,
    s: number,
    st: number
}

type ModeHistoryData = {
    easyLevelIndex: number, // Easy 模式下的关卡进度
    passCount: number, // 过关局数
    loseCount: number, // 失败次数
    gameTimeBest: number, // 游戏时长: 历史最短
    gameTimeAverage: number, // 游戏时长: 平均时长
    gameTimeTotal: number, // 游戏时长: 总时长
    moveStepBest: number,
    moveStepAverage: number,
    moveStepTotal: number,
    moveStepWorest: number,
    scoreBest: number,
    scoreAverage: number,
    scoreTotal: number
}

type DataCacheDataType = {
    coin: number,
    help: number,
    record: number, /** 可以免费记录的次数 */
    leftHand: boolean,
    cards3Mode: boolean,
    vegasMode: boolean,

    // statistic
    passCount: number, // 总通关次数
    loseCount: number, // 失败次数
    markSeeds: MarkSeed[][]
}

export abstract class SolitaireDataCacheUtil {
    static MODE_2_INDEX(vegas: boolean, card3: boolean): number { return (vegas ? 2 : 0) + (card3 ? 1 : 0); }
    static MODE_2_INDEX_BY_JU(ju: SolitaireJu): number { return this.MODE_2_INDEX(ju.isVegasMode, ju.isCard3Mode); }
}

export class SolitaireDataCache extends ii.LSDataCache<DataCacheDataType> {
    static readonly event = {
        SYNC_UICOIN: "dc.SOLITAIRE.COIN_CHANGED"
    }
    protected get LSKey(): string { return "ls_solitaire_v2"; }
    protected get DefaultLSData(): DataCacheDataType {
        return {
            coin: 100,
            help: 3,
            record: 3,
            leftHand: false,
            cards3Mode: false,
            vegasMode: false,
            passCount: 0,
            loseCount: 0,
            markSeeds: [ [
                {t: EGameType.EASY, s: 1987, st: 0}
            ],[
                {t: EGameType.EASY, s: 1987, st: 0}
            ],[
                {t: EGameType.EASY, s: 1987, st: 0}
            ],[
                {t: EGameType.EASY, s: 1987, st: 0}
            ] ]
        };
    }
    protected OnUnRegister() { }
    protected OnRegister() {
        this.coinBV = ii.NumberBV.Borrow(this.data.coin).ReturnBy(this).Bind(val=>{ this.data.coin = val; this.markDirty(1) }, false, this);
        this.helpBV = ii.NumberBV.Borrow(this.data.help).ReturnBy(this).Bind(val=>{ this.data.help = val; this.markDirty(1) }, false, this);
        this.recordBV = ii.NumberBV.Borrow(this.data.record).ReturnBy(this).Bind(val=>{ this.data.record = val; this.markDirty(1) }, false, this);
        this.leftHandBV = ii.BooleanBV.Borrow(this.data.leftHand).ReturnBy(this).Bind(val=>{ this.data.leftHand = val; this.markDirty(1) }, false, this);
        this.cards3ModeBV = ii.BooleanBV.Borrow(this.data.cards3Mode).ReturnBy(this).Bind(val=>{ this.data.cards3Mode = val; this.markDirty(1) }, false, this);
        this.vegasModeBV = ii.BooleanBV.Borrow(this.data.vegasMode).ReturnBy(this).Bind(val=>{ this.data.vegasMode = val; this.markDirty(1) }, false, this);
        // statistic
        this.passCountBV = ii.NumberBV.Borrow(this.data.passCount).ReturnBy(this).Bind(val=>{ this.data.passCount = val; this.markDirty(1) }, false, this);
        this.loseCountBV = ii.NumberBV.Borrow(this.data.loseCount).ReturnBy(this).Bind(val=>{ this.data.loseCount = val; this.markDirty(1) }, false, this);
        // mode history
        for(let i=0;i<2;++i) {
            for(let j=0;j<2;++j) {
                let key = this.__ModeHistoryLSKey(i===1,j===1);
                this.SetUserData(key, ii.ObjectBV.BorrowAsUserLS(key, this.defaultModeData, true).ReturnBy(this));
            }
        }
    }
    

    coinBV: ii.NumberBV = null;
    helpBV: ii.NumberBV = null;
    recordBV: ii.NumberBV = null;
    leftHandBV: ii.BooleanBV = null;
    cards3ModeBV: ii.BooleanBV = null;
    vegasModeBV: ii.BooleanBV = null;

    //#region //! 金币管理
    ChangeCoins(dCoins, onChange?: (dCoins: number)=>void) {
        this.coinBV.v += dCoins;
        if(onChange != null) {
            onChange(dCoins);
        }
        this.emitGlobal(SolitaireDataCache.event.SYNC_UICOIN, this.coinBV.v);

        if(dCoins > 0) {
            ii.App.ins.p.user.SetGameCenterVal("ScoreAsCoin", ii.App.ins.p.user.GetGameCenterVal("ScoreAsCoin")+1);
        }
    }
    //#endregion
    
    //#region //! 棋局快照
    private SnapDataKey(vegas: boolean, card3: boolean, difficulty: EGameType): string { return `ls_solitaire_snap_data_${vegas?1:0}_${card3?1:0}_${difficulty}`; }
    HasSnapData(vegas: boolean, card3: boolean, difficulty: EGameType): boolean { return ii.UserLSMgr.ins.hasKey(this.SnapDataKey(vegas, card3, difficulty)); }
    ReadSnapData(vegas: boolean, card3: boolean, difficulty: EGameType): SnapData { return ii.UserLSMgr.ins.getObjectWithDefault<SnapData>(this.SnapDataKey(vegas, card3, difficulty), null); }
    ClearSnapData(vegas: boolean, card3: boolean, difficulty: EGameType) { ii.UserLSMgr.ins.deleteKey(this.SnapDataKey(vegas, card3, difficulty)); }
    WriteSnapData(snapData: SnapData, difficulty: EGameType) { ii.UserLSMgr.ins.setObject(this.SnapDataKey(snapData.vegas, snapData.card3, difficulty), snapData, true); }    
    //#endregion

    //#region //! 本地关卡数据配置表
    LoadEasyLevel(isVegas: boolean, is3Card: boolean, cb: (isVegasMode: boolean, isCard3Mode: boolean, seed: number)=>void) {
        let jsonAsset: cc.JsonAsset = this.__GetLevelJsonAsset(isVegas, is3Card);
        let seeds: number[] = jsonAsset.json
        let index = this.GetModeHistory(isVegas, is3Card).v.easyLevelIndex % seeds.length
        let seed = seeds[index]
        cb(isVegas, is3Card, seed)
    }
    private __GetLevelJsonAsset(isVegas: boolean, is3Card: boolean): cc.JsonAsset { return ii.ResMgr.ins.GetRes(SolitaireJsonCfg.GetLevelJsonResKey(isVegas, is3Card)); }
    
    //#endregion

    //#region //! 历史数据
    private get defaultModeData(): ModeHistoryData { return {
        easyLevelIndex: 0, passCount: 0, loseCount: 0,
        gameTimeBest: 0, gameTimeAverage: 0, gameTimeTotal: 0,
        moveStepBest: 0, moveStepAverage: 0, moveStepTotal: 0, moveStepWorest: 0,
        scoreBest: 0, scoreAverage: 0, scoreTotal: 0,
    }}
    passCountBV: ii.NumberBV = null;
    loseCountBV: ii.NumberBV = null;
    // 跳过当前关卡（用户点击 SkipGame 的时候，会调用到此方法)
    private __ModeHistoryLSKey(vegas: boolean, card3: boolean): string { return `ls_mode_history_${vegas?1:0}_${card3?1:0}`; }
    GetModeHistory(vegas: boolean, card3: boolean): ii.BV<ModeHistoryData> { return this.GetUserData(this.__ModeHistoryLSKey(vegas, card3)); }
    SkipLevelIndex(vegas: boolean, card3: boolean, gameType: EGameType, isWin: boolean) {
        // 清除快照数据
        this.ClearSnapData(vegas, card3, gameType);
        // 这种情况算失败，记录失败的数据
        let modeHistoryBV = this.GetModeHistory(vegas, card3);
        let modeHistoryValue = modeHistoryBV.v;  
        if(isWin) {
            // 过关局数
            this.loseCountBV.v += 1;
            modeHistoryValue.loseCount += 1;
        }
        if(gameType === EGameType.EASY) {
            modeHistoryValue.easyLevelIndex += 1;
        }
        modeHistoryBV.v = modeHistoryValue;
    }
    ResetModeHistory(vegas: boolean, card3: boolean) { this.GetModeHistory( vegas, card3 ).v = this.defaultModeData; }
    //#endregion

    //#region //! 游戏胜利
    HandleGameWin(ju: SolitaireJu) {
        // 不同模式下的数据记录
        let modeHistory = this.GetModeHistory(ju.isVegasMode, ju.isCard3Mode);
        let modeHistoryValue = modeHistory.v;

        // 进度记录
        if(ju.gameType === EGameType.EASY){
            modeHistoryValue.easyLevelIndex = modeHistoryValue.easyLevelIndex+1
        }
        
        // 过关局数
        this.passCountBV.v += 1;
        modeHistoryValue.passCount += 1;

        //! GameCenter 数据
        ii.App.ins.p.user.SetGameCenterVal("GameWins", ii.App.ins.p.user.GetGameCenterVal("GameWins")+1);
        
        // 时间相关内容
        {
            let gameTime: number = ju.gameTime;
            modeHistoryValue.gameTimeTotal += gameTime
            if(gameTime < modeHistoryValue.gameTimeBest || modeHistoryValue.gameTimeBest == 0) {
                modeHistoryValue.gameTimeBest = gameTime
            }
            modeHistoryValue.gameTimeAverage = Math.ceil(modeHistoryValue.gameTimeTotal/modeHistoryValue.passCount)
        }

        // 移动步数相关内容
        {
            let moveStep: number = ju.moveStepCountBV.v;
            modeHistoryValue.moveStepTotal += moveStep
            if(moveStep < modeHistoryValue.moveStepBest || modeHistoryValue.moveStepBest == 0) {
                modeHistoryValue.moveStepBest = moveStep
            }
            if(moveStep > modeHistoryValue.moveStepWorest || modeHistoryValue.moveStepWorest == 0) {
                modeHistoryValue.moveStepWorest = moveStep
            }
            modeHistoryValue.moveStepAverage = Math.ceil(modeHistoryValue.moveStepTotal/modeHistoryValue.passCount)
        }

        // 分数
        {
            let score: number = ju.scoreBV.v;
            modeHistoryValue.scoreTotal += score
            if(score > modeHistoryValue.scoreBest) {
                modeHistoryValue.scoreBest = score
            }
            modeHistoryValue.scoreAverage = Math.ceil(modeHistoryValue.scoreAverage/modeHistoryValue.passCount)
        }
        ////////////////////////////////////////////////

        modeHistory.v = modeHistoryValue;

        // 清除 Resume 数据
        this.ClearSnapData(ju.isVegasMode, ju.isCard3Mode, ju.gameType)
    }
    //#endregion
    
    //#region //! 种子管理
    GetMarkSeedsList(vegas: boolean, card3: boolean): MarkSeed[] { return this.data.markSeeds[SolitaireDataCacheUtil.MODE_2_INDEX(vegas, card3)]; }
    GetMarkSeedsListByJu(ju: SolitaireJu): MarkSeed[] { return this.data.markSeeds[SolitaireDataCacheUtil.MODE_2_INDEX_BY_JU(ju)]; }
    private __SORT_FUNC = (a: MarkSeed, b: MarkSeed)=>{
        if(a.t === b.t) {
            return a.st-b.st;
        }else{
            return a.t - b.t;
        }
    }

    GetNextMarkSeed(vegas: boolean, card3: boolean, seed: number): number {
        let markSeeds = this.GetMarkSeedsList(vegas, card3);
        for(let i=markSeeds.length-1; i>=0; --i) {
            let levelData: MarkSeed = markSeeds[i];
            if(levelData.s === seed) {
                return markSeeds[(i+1)%markSeeds.length].s;
            }
        }
        console.error(`SEED 类型关卡 >> 找不到下一关`)
        return 1;
    }

    RecordSeed(ju: SolitaireJu, isWin: boolean) {
        let markSeeds = this.GetMarkSeedsListByJu(ju);
        // 过关种子
        let find = false;
        for(let i=markSeeds.length-1; i>=0; --i) {
            let levelData: MarkSeed = markSeeds[i];
            if(levelData.s === ju.Seed) {
                find = true;
                levelData.st = ju.moveStepCountBV.v;
                markSeeds.sort(this.__SORT_FUNC);
                this.markDirty(1);
            }
        }
        if( (!find) && (ju.gameType !== EGameType.SEED) ) {
            markSeeds.push({
                t: ju.gameType,
                s: ju.Seed,
                st: isWin ? ju.moveStepCountBV.v : 0
            });
            markSeeds.sort(this.__SORT_FUNC);
            this.markDirty(1);
        }
    }

    RemoveSeed(vegas: boolean, card3: boolean,markSeed: MarkSeed): boolean {
        let markSeeds = this.GetMarkSeedsList(vegas, card3);
        // 过关种子
        for(let i=markSeeds.length-1; i>=0; --i) {
            let levelData: MarkSeed = markSeeds[i];
            if(levelData.s === markSeed.s) {
                markSeeds.splice(i, 1);
                this.markDirty(1);
                return true;
            }
        }
        return false;
    }

    IsLevelRecorded(ju: SolitaireJu): boolean {
        let markSeeds = this.GetMarkSeedsListByJu(ju);
        let find = false;
        for(let i=markSeeds.length-1; i>=0; --i) {
            let pass = markSeeds[i]
            if(pass.s === ju.Seed) {
                find = true;
            }
        }
        return find;
    }

    IsCanRecordJuSeed(ju: SolitaireJu): boolean {
        return (ju.gameType !== EGameType.SEED) && (!this.IsLevelRecorded(ju)) 
    }
    //#endregion
}
