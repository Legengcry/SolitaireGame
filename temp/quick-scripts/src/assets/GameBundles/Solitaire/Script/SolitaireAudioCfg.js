"use strict";
cc._RF.push(module, '571c0EvDEdNFb6Vv7Cqq7xW', 'SolitaireAudioCfg');
// GameBundles/Solitaire/Script/SolitaireAudioCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireAudioCfg = void 0;
var SolitaireAudioCfg = /** @class */ (function () {
    function SolitaireAudioCfg() {
    }
    SolitaireAudioCfg.Register = function (bundleName) {
        console.info("SolitaireAudioCfg::Register(" + bundleName + ") >> \u6CE8\u518C Audio \u8D44\u6E90");
        ii.registerResDict(this.effect, bundleName, ii.EResType.Audio);
        ii.registerResDict(this.music, bundleName, ii.EResType.Audio);
    };
    SolitaireAudioCfg.GetFoundation = function (index) { return this.effect["foundations" + index % 10]; };
    SolitaireAudioCfg.effect = {
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
    };
    SolitaireAudioCfg.music = {
        default: 'solitaire.music.default',
    };
    return SolitaireAudioCfg;
}());
exports.SolitaireAudioCfg = SolitaireAudioCfg;

cc._RF.pop();