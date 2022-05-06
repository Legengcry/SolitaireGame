"use strict";
cc._RF.push(module, 'c4f07+VE9xNk4lu6JzuRDeM', 'SolitaireEnums');
// GameBundles/Solitaire/Script/SolitaireEnums.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EGameType = exports.EScoreType = exports.ELocation = exports.EPokerStatus = exports.ESuit = void 0;
var ESuit;
(function (ESuit) {
    ESuit[ESuit["HEITAO"] = 0] = "HEITAO";
    ESuit[ESuit["HONGXIN"] = 1] = "HONGXIN";
    ESuit[ESuit["MEIHUA"] = 2] = "MEIHUA";
    ESuit[ESuit["FANGKUAI"] = 3] = "FANGKUAI";
})(ESuit = exports.ESuit || (exports.ESuit = {}));
var EPokerStatus;
(function (EPokerStatus) {
    EPokerStatus[EPokerStatus["CLOSE"] = 0] = "CLOSE";
    EPokerStatus[EPokerStatus["OPEN"] = 1] = "OPEN";
})(EPokerStatus = exports.EPokerStatus || (exports.EPokerStatus = {}));
var ELocation;
(function (ELocation) {
    ELocation[ELocation["CLOSE"] = 0] = "CLOSE";
    ELocation[ELocation["OPEN"] = 1] = "OPEN";
    ELocation[ELocation["RECEIVE"] = 2] = "RECEIVE";
    ELocation[ELocation["PLAY"] = 3] = "PLAY";
})(ELocation = exports.ELocation || (exports.ELocation = {}));
var EScoreType;
(function (EScoreType) {
    EScoreType[EScoreType["ONCE"] = 0] = "ONCE";
    EScoreType[EScoreType["TWICE"] = 1] = "TWICE";
})(EScoreType = exports.EScoreType || (exports.EScoreType = {}));
var EGameType;
(function (EGameType) {
    EGameType[EGameType["EASY"] = 0] = "EASY";
    EGameType[EGameType["HARD"] = 1] = "HARD";
    EGameType[EGameType["SEED"] = 2] = "SEED";
})(EGameType = exports.EGameType || (exports.EGameType = {}));

cc._RF.pop();