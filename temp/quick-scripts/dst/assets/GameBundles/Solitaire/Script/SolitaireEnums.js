
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitaireEnums.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVFbnVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFZLEtBS1g7QUFMRCxXQUFZLEtBQUs7SUFDYixxQ0FBVSxDQUFBO0lBQ1YsdUNBQVcsQ0FBQTtJQUNYLHFDQUFVLENBQUE7SUFDVix5Q0FBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFLaEI7QUFDRCxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsaURBQVMsQ0FBQTtJQUNULCtDQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFRCxJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDakIsMkNBQVMsQ0FBQTtJQUNULHlDQUFJLENBQUE7SUFDSiwrQ0FBTyxDQUFBO0lBQ1AseUNBQUksQ0FBQTtBQUNSLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVELElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNsQiwyQ0FBUSxDQUFBO0lBQ1IsNkNBQVMsQ0FBQTtBQUNiLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUVELElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNqQix5Q0FBUSxDQUFBO0lBQ1IseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7QUFDUixDQUFDLEVBSlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFJcEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBlbnVtIEVTdWl0IHtcbiAgICBIRUlUQU8gPSAwLFxuICAgIEhPTkdYSU4gPSAxLFxuICAgIE1FSUhVQSA9IDIsXG4gICAgRkFOR0tVQUkgPSAzXG59XG5leHBvcnQgZW51bSBFUG9rZXJTdGF0dXMge1xuICAgIENMT1NFID0gMCxcbiAgICBPUEVOID0gMVxufVxuXG5leHBvcnQgZW51bSBFTG9jYXRpb24ge1xuICAgIENMT1NFID0gMCxcbiAgICBPUEVOLFxuICAgIFJFQ0VJVkUsXG4gICAgUExBWVxufVxuXG5leHBvcnQgZW51bSBFU2NvcmVUeXBlIHtcbiAgICBPTkNFID0gMCxcbiAgICBUV0lDRSA9IDFcbn1cblxuZXhwb3J0IGVudW0gRUdhbWVUeXBlIHtcbiAgICBFQVNZID0gMCxcbiAgICBIQVJELFxuICAgIFNFRURcbn1cbiJdfQ==