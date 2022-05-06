"use strict";
cc._RF.push(module, 'b61a41RyndMa7irtmjNPW9h', 'SolitaireJsonCfg');
// GameBundles/Solitaire/Script/SolitaireJsonCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireJsonCfg = void 0;
var SolitaireJsonCfg = /** @class */ (function () {
    function SolitaireJsonCfg() {
    }
    SolitaireJsonCfg.GetLevelJsonResKey = function (isVegas, is3Card) {
        return this.key["level_" + (isVegas ? 1 : 0) + "_" + (is3Card ? 1 : 0)];
    };
    SolitaireJsonCfg.Register = function (bundleName) {
        console.info("SolitairePrefabCfg::Register(" + bundleName + ") >> \u6CE8\u518C Prefab \u8D44\u6E90");
        ii.registerResDict(this.key, bundleName, ii.EResType.Json);
    };
    SolitaireJsonCfg.key = {
        level_0_0: 'level_0_0',
        level_1_0: 'level_1_0',
        level_0_1: 'level_0_1',
        level_1_1: 'level_1_1'
    };
    return SolitaireJsonCfg;
}());
exports.SolitaireJsonCfg = SolitaireJsonCfg;

cc._RF.pop();