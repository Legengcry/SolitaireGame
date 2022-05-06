
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/Model/SolitaireConfigGenerator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxNb2RlbFxcU29saXRhaXJlQ29uZmlnR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFpRDtBQUVqRCw2Q0FBNEM7QUFFdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBc0QsNENBQVk7SUFBbEU7UUFBQSxxRUE0RkM7UUEzRlcsa0JBQVksR0FBZ0MsRUFBRSxDQUFBO1FBQzlDLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsZ0JBQVUsR0FBYywwQkFBUyxDQUFDLElBQUksQ0FBQztRQUN2QyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixtQkFBYSxHQUFZLEtBQUssQ0FBQzs7SUFvRjNDLENBQUM7SUFuRkcsd0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQywwQkFBMEIsQ0FBQywwQkFBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUdELDZEQUEwQixHQUExQixVQUEyQixRQUFtQixFQUFDLFdBQW9CLEVBQUUsV0FBb0I7UUFDckYsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcs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O0NBNUZELEFBNEZDLENBNUZxRCxFQUFFLENBQUMsU0FBUyxHQTRGakU7a0JBNUZvQix3QkFBd0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFR2FtZVR5cGUgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlRW51bXNcIjtcbmltcG9ydCB7IFNvbGl0YWlyZURhdGFCYXR0bGVSZXN1bHQgfSBmcm9tIFwiLi4vU29saXRhaXJlVHlwZVwiO1xuaW1wb3J0IHsgU29saXRhaXJlSnUgfSBmcm9tIFwiLi9Tb2xpdGFpcmVKdVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVDb25maWdHZW5lcmF0b3IgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHByaXZhdGUgbV9SZXN1bHRMaXN0OiBTb2xpdGFpcmVEYXRhQmF0dGxlUmVzdWx0W10gPSBbXVxuICAgIHByaXZhdGUgbV9TY2hlZHVsZXI6IEZ1bmN0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIG1fU2VlZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fUHJlTGVuZ3RoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbV9KdWRnZUZ1bmM6IChnYW1lUmVzdWx0OiBTb2xpdGFpcmVEYXRhQmF0dGxlUmVzdWx0KT0+Ym9vbGVhbjtcbiAgICBwcml2YXRlIG1fR2FtZVR5cGU6IEVHYW1lVHlwZSA9IEVHYW1lVHlwZS5FQVNZO1xuICAgIHByaXZhdGUgbV9Jc1ZlZ2FzTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbV9Jc0NhcmQzTW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLlRlc3RfR2VuZXJhdGVWYWxpZER1bmdlbnRzKEVHYW1lVHlwZS5FQVNZLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cblxuICAgIFRlc3RfR2VuZXJhdGVWYWxpZER1bmdlbnRzKGdhbWVUeXBlOiBFR2FtZVR5cGUsaXNWZWdhc01vZGU6IGJvb2xlYW4sIGlzQ2FyZDNNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubV9HYW1lVHlwZSA9IGdhbWVUeXBlO1xuICAgICAgICB0aGlzLm1fSXNWZWdhc01vZGUgPSBpc1ZlZ2FzTW9kZTtcbiAgICAgICAgdGhpcy5tX0lzQ2FyZDNNb2RlID0gaXNDYXJkM01vZGU7XG4gICAgICAgIHRoaXMubV9SZXN1bHRMaXN0ID0gW107XG4gICAgICAgIHRoaXMubV9TZWVkID0gMTtcbiAgICAgICAgdGhpcy5tX1ByZUxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubV9KdWRnZUZ1bmMgPSB0aGlzLkdldERpZmZpY3VsdEZ1bmMoZ2FtZVR5cGUpO1xuICAgICAgICB0aGlzLlN0YXJ0U2NoZWR1bGVyKCk7XG4gICAgfVxuXG4gICAgU3RhcnRTY2hlZHVsZXIoKSB7XG4gICAgICAgIGlmKHRoaXMubV9TY2hlZHVsZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubV9TY2hlZHVsZXIgPSB0aGlzLlRpY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5tX1NjaGVkdWxlciwgMCwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgU3RvcFNjaGVkdWxlcigpIHtcbiAgICAgICAgaWYodGhpcy5tX1NjaGVkdWxlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMubV9TY2hlZHVsZXIpO1xuICAgICAgICAgICAgdGhpcy5tX1NjaGVkdWxlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBUaWNrKCkge1xuICAgICAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgICAgICBpZih0aGlzLm1fUmVzdWx0TGlzdC5sZW5ndGggPCA4MDApIHtcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZVJlc3VsdDogU29saXRhaXJlRGF0YUJhdHRsZVJlc3VsdCA9IFNvbGl0YWlyZUp1LlNlcnZlclBsYXkodGhpcy5tX0dhbWVUeXBlLCB0aGlzLm1fU2VlZCwgdGhpcy5tX0lzVmVnYXNNb2RlLCB0aGlzLm1fSXNDYXJkM01vZGUpO1xuICAgICAgICAgICAgICAgICsrdGhpcy5tX1NlZWQ7XG4gICAgICAgICAgICAgICAgaWYoZ2FtZVJlc3VsdC5wYXNzICYmIHRoaXMubV9KdWRnZUZ1bmMoZ2FtZVJlc3VsdCkpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fUmVzdWx0TGlzdC5wdXNoKGdhbWVSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoT2ZMaXN0ID0gdGhpcy5tX1Jlc3VsdExpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZihsZW5ndGhPZkxpc3QgPj0gdGhpcy5tX1ByZUxlbmd0aCsxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9QcmVMZW5ndGggPSBsZW5ndGhPZkxpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgWyR7bGVuZ3RoT2ZMaXN0fV0gaXMgZG9uZWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wU2NoZWR1bGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5TYXZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgU2F2ZSgpIHtcbiAgICAgICAgbGV0IHNlZWRzID0gdGhpcy5tX1Jlc3VsdExpc3Quc29ydCgoYSwgYik9PntcbiAgICAgICAgICAgIGlmKGEuZmxpcENsb3NlQ250ID09PSBiLmZsaXBDbG9zZUNudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnN0ZXAtYi5zdGVwO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuZmxpcENsb3NlQ250LWIuZmxpcENsb3NlQ250O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5tYXAodj0+di5zZWVkKTtcblxuICAgICAgICBpZighKGNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT09IGNjLnN5cy5PU19PU1gpKXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhKU09OLnN0cmluZ2lmeShzZWVkcykpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVDb25maWdEaXIgPSBgJHtqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpfUF1dG8vSlNPTi9gXG4gICAgICAgIGlmKCFqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QoZ2VuZXJhdGVDb25maWdEaXIpKSB7XG4gICAgICAgICAgICBqc2IuZmlsZVV0aWxzLmNyZWF0ZURpcmVjdG9yeShnZW5lcmF0ZUNvbmZpZ0RpcilcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqc29uRmlsZUZ1bGxQYXRoID0gYCR7Z2VuZXJhdGVDb25maWdEaXJ9bGV2ZWxfJHt0aGlzLm1fR2FtZVR5cGV9XyR7dGhpcy5tX0lzVmVnYXNNb2RlID8gMSA6IDB9XyR7dGhpcy5tX0lzQ2FyZDNNb2RlID8gMSA6IDB9Lmpzb25gXG4gICAgICAgIGpzYi5maWxlVXRpbHMud3JpdGVTdHJpbmdUb0ZpbGUoSlNPTi5zdHJpbmdpZnkoc2VlZHMpLCBqc29uRmlsZUZ1bGxQYXRoKTtcbiAgICAgICAgY29uc29sZS5pbmZvKGBkb25lID4+IHdyaXRlIHRvICR7anNvbkZpbGVGdWxsUGF0aH1gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIEdldERpZmZpY3VsdEZ1bmMoZ2FtZVR5cGU6IEVHYW1lVHlwZSk6IChnYW1lVHlwZTogU29saXRhaXJlRGF0YUJhdHRsZVJlc3VsdCkgPT4gYm9vbGVhbiB7XG4gICAgICAgIHN3aXRjaCAoZ2FtZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRUdhbWVUeXBlLkVBU1k6IHJldHVybiB0aGlzLklzRGlmZmljdWx0RWFzeS5iaW5kKHRoaXMpOyAgICAgICAgXG4gICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5IQVJEOiByZXR1cm4gdGhpcy5Jc0RpZmZpY3VsdEhhcmQuYmluZCh0aGlzKTsgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBJc0RpZmZpY3VsdEVhc3koZ2FtZVJlc3VsdDogU29saXRhaXJlRGF0YUJhdHRsZVJlc3VsdCk6IGJvb2xlYW4geyByZXR1cm4gZ2FtZVJlc3VsdC5mbGlwQ2xvc2VDbnQgPD0gMzsgfVxuICAgIHByaXZhdGUgSXNEaWZmaWN1bHRIYXJkKGdhbWVSZXN1bHQ6IFNvbGl0YWlyZURhdGFCYXR0bGVSZXN1bHQpOiBib29sZWFuIHsgcmV0dXJuIGdhbWVSZXN1bHQuZmxpcENsb3NlQ250ID4gMzsgfVxufSJdfQ==