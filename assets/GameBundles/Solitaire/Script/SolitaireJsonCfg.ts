export class SolitaireJsonCfg {
    static readonly key = {
        level_0_0: 'level_0_0',
        level_1_0: 'level_1_0',
        level_0_1: 'level_0_1',
        level_1_1: 'level_1_1'
    }

    static GetLevelJsonResKey(isVegas: boolean, is3Card: boolean) {
        return this.key[`level_${isVegas ? 1 : 0}_${is3Card ? 1 : 0}`]
    }

    static Register(bundleName: string): void {
        console.info(`SolitairePrefabCfg::Register(${bundleName}) >> 注册 Prefab 资源`)
        ii.registerResDict(this.key, bundleName, ii.EResType.Json);
    }
}
