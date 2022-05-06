"use strict";
cc._RF.push(module, '7024dOD9e9Ea5PHN3Ja9CBu', 'SolitaireConfigGenerator');
// GameBundles/Solitaire/Script/Game/Model/SolitaireConfigGenerator.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitaireJu_1 = require("./SolitaireJu");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireConfigGenerator = /** @class */ (function (_super) {
    __extends(SolitaireConfigGenerator, _super);
    function SolitaireConfigGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_ResultList = [];
        _this.m_Scheduler = null;
        _this.m_Seed = 0;
        _this.m_PreLength = 0;
        _this.m_GameType = SolitaireEnums_1.EGameType.EASY;
        _this.m_IsVegasMode = false;
        _this.m_IsCard3Mode = false;
        return _this;
    }
    SolitaireConfigGenerator.prototype.start = function () {
        this.Test_GenerateValidDungents(SolitaireEnums_1.EGameType.EASY, true, true);
    };
    SolitaireConfigGenerator.prototype.Test_GenerateValidDungents = function (gameType, isVegasMode, isCard3Mode) {
        this.m_GameType = gameType;
        this.m_IsVegasMode = isVegasMode;
        this.m_IsCard3Mode = isCard3Mode;
        this.m_ResultList = [];
        this.m_Seed = 1;
        this.m_PreLength = 0;
        this.m_JudgeFunc = this.GetDifficultFunc(gameType);
        this.StartScheduler();
    };
    SolitaireConfigGenerator.prototype.StartScheduler = function () {
        if (this.m_Scheduler === null) {
            this.m_Scheduler = this.Tick.bind(this);
            this.schedule(this.m_Scheduler, 0, cc.macro.REPEAT_FOREVER);
        }
    };
    SolitaireConfigGenerator.prototype.StopScheduler = function () {
        if (this.m_Scheduler !== null) {
            this.unschedule(this.m_Scheduler);
            this.m_Scheduler = null;
        }
    };
    SolitaireConfigGenerator.prototype.Tick = function () {
        while (true) {
            if (this.m_ResultList.length < 800) {
                var gameResult = SolitaireJu_1.SolitaireJu.ServerPlay(this.m_GameType, this.m_Seed, this.m_IsVegasMode, this.m_IsCard3Mode);
                ++this.m_Seed;
                if (gameResult.pass && this.m_JudgeFunc(gameResult)) {
                    this.m_ResultList.push(gameResult);
                    var lengthOfList = this.m_ResultList.length;
                    if (lengthOfList >= this.m_PreLength + 100) {
                        this.m_PreLength = lengthOfList;
                        console.log("[" + lengthOfList + "] is done");
                        return;
                    }
                }
            }
            else {
                this.StopScheduler();
                this.Save();
                return;
            }
        }
    };
    SolitaireConfigGenerator.prototype.Save = function () {
        var seeds = this.m_ResultList.sort(function (a, b) {
            if (a.flipCloseCnt === b.flipCloseCnt) {
                return a.step - b.step;
            }
            else {
                return a.flipCloseCnt - b.flipCloseCnt;
            }
        }).map(function (v) { return v.seed; });
        if (!(cc.sys.isNative && cc.sys.os === cc.sys.OS_OSX)) {
            console.info(JSON.stringify(seeds));
            return;
        }
        var generateConfigDir = jsb.fileUtils.getWritablePath() + "Auto/JSON/";
        if (!jsb.fileUtils.isDirectoryExist(generateConfigDir)) {
            jsb.fileUtils.createDirectory(generateConfigDir);
        }
        var jsonFileFullPath = generateConfigDir + "level_" + this.m_GameType + "_" + (this.m_IsVegasMode ? 1 : 0) + "_" + (this.m_IsCard3Mode ? 1 : 0) + ".json";
        jsb.fileUtils.writeStringToFile(JSON.stringify(seeds), jsonFileFullPath);
        console.info("done >> write to " + jsonFileFullPath);
    };
    SolitaireConfigGenerator.prototype.GetDifficultFunc = function (gameType) {
        switch (gameType) {
            case SolitaireEnums_1.EGameType.EASY: return this.IsDifficultEasy.bind(this);
            case SolitaireEnums_1.EGameType.HARD: return this.IsDifficultHard.bind(this);
            default: break;
        }
    };
    SolitaireConfigGenerator.prototype.IsDifficultEasy = function (gameResult) { return gameResult.flipCloseCnt <= 3; };
    SolitaireConfigGenerator.prototype.IsDifficultHard = function (gameResult) { return gameResult.flipCloseCnt > 3; };
    SolitaireConfigGenerator = __decorate([
        ccclass
    ], SolitaireConfigGenerator);
    return SolitaireConfigGenerator;
}(cc.Component));
exports.default = SolitaireConfigGenerator;

cc._RF.pop();