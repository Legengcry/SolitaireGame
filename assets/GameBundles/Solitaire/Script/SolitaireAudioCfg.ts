export class SolitaireAudioCfg {
    static readonly effect = {
        default: 'solitaire.effect.default',
        failed: 'solitaire.effect.failed',
        flip: 'solitaire.effect.flip',
        foundations0: 'solitaire.effect.foundations0',
        foundations1: 'solitaire.effect.foundations1',
        foundations2: 'solitaire.effect.foundations2',
        foundations3: 'solitaire.effect.foundations3',
        foundations4: 'solitaire.effect.foundations4',
        foundations5: 'solitaire.effect.foundations5',
        foundations6: 'solitaire.effect.foundations6',
        foundations7: 'solitaire.effect.foundations7',
        foundations8: 'solitaire.effect.foundations8',
        foundations9: 'solitaire.effect.foundations9',
        invalid: 'solitaire.effect.invalid', 
        move: 'solitaire.effect.move', 
        pop: 'solitaire.effect.pop',
        successful: 'solitaire.effect.successful',
        undo: 'solitaire.effect.undo',
        jump: 'solitaire.effect.jump',
        coin_drop: 'solitaire.effect.coin_drop'
    }
    
    static readonly music = {
        default: 'solitaire.music.default',
    }
    

    static Register(bundleName: string): void {
        console.info(`SolitaireAudioCfg::Register(${bundleName}) >> 注册 Audio 资源`)
        ii.registerResDict(this.effect, bundleName, ii.EResType.Audio);
        ii.registerResDict(this.music, bundleName, ii.EResType.Audio);
    }

    static GetFoundation(index: number): string { return this.effect[`foundations${index%10}`]; }
}
