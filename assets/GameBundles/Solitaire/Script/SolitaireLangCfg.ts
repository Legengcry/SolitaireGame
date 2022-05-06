export class SolitaireLangCfg {
    
    static readonly lang = {
        SolitaireLang: "SolitaireLang"
    }

    static Register(bundleName: string) {
        console.info(`SolitaireLangCfg::Register(${bundleName}) >> 注册 LangJson 资源`)
        ii.registerLangJsonCfg(this.lang, bundleName);
    }
}