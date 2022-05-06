import { SolitaireJu } from "../Game/Model/SolitaireJu";

type SolitaireAutoPlayerDataCacheDataType = {
    autoSpeed: number
}

export class SolitaireAutoPlayerDataCache extends ii.LSDataCache<SolitaireAutoPlayerDataCacheDataType> {
    protected get LSKey(): string { return "ls_solitaire_autoplayer"; }
    protected get DefaultLSData(): SolitaireAutoPlayerDataCacheDataType {
        return {
            autoSpeed: 1,
        }
    }
    protected OnRegister() {
        this.autoSpeedBV = ii.NumberBV.Borrow(this.data.autoSpeed).ReturnBy(this).Bind(val=>{
            this.data.autoSpeed = val;
            this.markDirty(1);
        }, false, this);
    }
    protected OnUnRegister() { }

    //! 播放速度
    /**
     * 速度分为 5 档位 0 1 2 3 4
     * 正常是 1 档
     * 档位和速度：
     * 0：2.4秒每步
     * 1：1.2秒每步
     * 2：0.6秒每步
     * 3：0.3秒每步
     * 4：0.15秒每步
     */
    // 自动玩牌的时间间隔
    private readonly kAutoPlayMinInterval: number = 0.15
    readonly kAutoCollectDuration: number = 0.15
    autoSpeedBV: ii.NumberBV = null;
    get AutoPlayInterval(): number { return this.kAutoPlayMinInterval*Math.pow(2, (4-this.autoSpeedBV.v)) }
    readonly MaxSpeed: number = 4;
    SpeedUp(ju: SolitaireJu) {
        if(this.IsMaxSpeed()){ return }
        this.autoSpeedBV.v += 1
        ju.ChangeAutoPlayInterval(this.AutoPlayInterval);
    }
    SpeedDown(ju: SolitaireJu) {
        if(this.IsMinSpeed()){ return }
        this.autoSpeedBV.v -= 1
        ju.ChangeAutoPlayInterval(this.AutoPlayInterval);
    }
    IsMaxSpeed(): boolean { return this.autoSpeedBV.v >= this.MaxSpeed; } /** 是否是自动玩牌最大速度 */
    IsMinSpeed(): boolean { return this.autoSpeedBV.v <= 0; } /** 是否是自动玩牌最低速度 */
}
