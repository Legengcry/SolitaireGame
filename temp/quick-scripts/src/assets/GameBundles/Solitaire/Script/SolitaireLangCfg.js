"use strict";
cc._RF.push(module, '61135J55f9DVrhzL5EhQzCe', 'SolitaireLangCfg');
// GameBundles/Solitaire/Script/SolitaireLangCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireLangCfg = void 0;
var SolitaireLangCfg = /** @class */ (function () {
    function SolitaireLangCfg() {
    }
    SolitaireLangCfg.Register = function (bundleName) {
        console.info("SolitaireLangCfg::Register(" + bundleName + ") >> \u6CE8\u518C LangJson \u8D44\u6E90");
        ii.registerLangJsonCfg(this.lang, bundleName);
    };
    SolitaireLangCfg.lang = {
        SolitaireLang: "SolitaireLang"
    };
    return SolitaireLangCfg;
}());
exports.SolitaireLangCfg = SolitaireLangCfg;

cc._RF.pop();