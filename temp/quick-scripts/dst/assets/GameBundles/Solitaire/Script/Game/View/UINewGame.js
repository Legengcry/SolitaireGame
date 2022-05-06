
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/UINewGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5da80ae2XVE/4xn405OatYX', 'UINewGame');
// GameBundles/Solitaire/Script/Game/View/UINewGame.ts

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
var SolitaireGameUIPanel_1 = require("./SolitaireGameUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UINewGame = /** @class */ (function (_super) {
    __extends(UINewGame, _super);
    function UINewGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mui_ActionNode = null;
        _this._gameTypeLabel = null;
        _this._gameTypeSprite = null;
        _this._skipGameLabel = null;
        _this._seedLabels = [];
        _this._spriteFrames = [];
        return _this;
    }
    UINewGame.prototype.OnCreate = function () {
        this.SetUserData("ACTION_POSITION", this.mui_ActionNode.position);
    };
    UINewGame.prototype.OnRelease = function () { };
    UINewGame.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnBG", this.OnBG.bind(this));
        this.SetIIClickHandler("OnSkipGame", this.OnSkipGame.bind(this));
        this.SetIIClickHandler("OnReplayDeck", this.OnReplayDeck.bind(this));
        this.SetIIClickHandler("OnCancel", this.OnCancel.bind(this));
        ii.UIUtil.moveAction(this.mui_ActionNode, true, this.GetUserData("ACTION_POSITION"), 0.3);
        switch (this.args.ju.gameType) {
            case SolitaireEnums_1.EGameType.EASY:
                {
                    this._gameTypeLabel.string = "\u7B80\u5355";
                    this._skipGameLabel.string = "\u8DF3\u8FC7\u5F53\u524D\u7EA7\u522B";
                }
                break;
            case SolitaireEnums_1.EGameType.HARD:
                {
                    this._gameTypeLabel.string = "\u56F0\u96BE";
                    this._skipGameLabel.string = "\u8DF3\u8FC7\u5F53\u524D\u7EA7\u522B";
                }
                break;
            case SolitaireEnums_1.EGameType.SEED:
                {
                    this._gameTypeLabel.string = "Seed";
                    this._skipGameLabel.string = "Play Next Seed";
                }
                break;
        }
        this._gameTypeSprite.spriteFrame = this._spriteFrames[this.args.ju.gameType];
        this._seedLabels.forEach(function (label) { return label.string = "" + _this.args.ju.Seed; });
    };
    UINewGame.prototype.ExitWithAction = function (callback) {
        var _this = this;
        ii.UIUtil.moveAction(this.mui_ActionNode, false, this.GetUserData("ACTION_POSITION"), 0.3, function () {
            if (callback) {
                callback();
            }
            _this.Close();
        });
    };
    UINewGame.prototype.OnBG = function () {
        this.ExitWithAction();
    };
    UINewGame.prototype.OnSkipGame = function () {
        var _this = this;
        this.ExitWithAction(function () { return _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_SKIP_GAME); });
    };
    UINewGame.prototype.OnReplayDeck = function () {
        var _this = this;
        this.ExitWithAction(function () { return _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_REPLAY_GAME); });
    };
    UINewGame.prototype.OnCancel = function () {
        this.ExitWithAction();
    };
    __decorate([
        property(cc.Node)
    ], UINewGame.prototype, "mui_ActionNode", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UINewGame.prototype, "_gameTypeLabel", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], UINewGame.prototype, "_gameTypeSprite", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], UINewGame.prototype, "_skipGameLabel", void 0);
    __decorate([
        property({ type: [cc.Label], visible: true })
    ], UINewGame.prototype, "_seedLabels", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true })
    ], UINewGame.prototype, "_spriteFrames", void 0);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnBG", null);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnSkipGame", null);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnReplayDeck", null);
    __decorate([
        ii.Util.block(1)
    ], UINewGame.prototype, "OnCancel", null);
    UINewGame = __decorate([
        ccclass
    ], UINewGame);
    return UINewGame;
}(ii.UIPanel));
exports.default = UINewGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxVSU5ld0dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQWlEO0FBRWpELCtEQUEwRDtBQUVwRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQU8xQztJQUF1Qyw2QkFBeUI7SUFBaEU7UUFBQSxxRUFrRUM7UUFqRThCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBQ1Ysb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDL0IscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFDbkMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBZSxFQUFFLENBQUM7UUFDdkIsbUJBQWEsR0FBcUIsRUFBRSxDQUFDOztJQTREakcsQ0FBQztJQTFEYSw0QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ1MsNkJBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQiwwQkFBTSxHQUFoQixVQUFpQixNQUFxQjtRQUF0QyxpQkF3QkM7UUF2QkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckUs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QUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7c0RBQTJDO0lBQzNDO1FBQXZDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztxREFBeUM7SUFDdEM7UUFBekMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztrREFBc0M7SUFDL0I7UUFBL0MsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztvREFBOEM7SUEwQzdGO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3lDQUdoQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOytDQUdoQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lEQUdoQjtJQUdEO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzZDQUdoQjtJQWpFZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWtFN0I7SUFBRCxnQkFBQztDQWxFRCxBQWtFQyxDQWxFc0MsRUFBRSxDQUFDLE9BQU8sR0FrRWhEO2tCQWxFb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVHYW1lVHlwZSB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVFbnVtc1wiO1xuaW1wb3J0IHsgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vTW9kZWwvU29saXRhaXJlSnVcIjtcbmltcG9ydCBTb2xpdGFpcmVHYW1lVUlQYW5lbCBmcm9tIFwiLi9Tb2xpdGFpcmVHYW1lVUlQYW5lbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IHR5cGUgVUlOZXdHYW1lQXJncyA9IHtcbiAgICBqdTogU29saXRhaXJlSnVcbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTmV3R2FtZSBleHRlbmRzIGlpLlVJUGFuZWw8VUlOZXdHYW1lQXJncz4ge1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSBwcml2YXRlIG11aV9BY3Rpb25Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTGFiZWwsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfZ2FtZVR5cGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfZ2FtZVR5cGVTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX3NraXBHYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe3R5cGU6W2NjLkxhYmVsXSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9zZWVkTGFiZWxzOiBjYy5MYWJlbFtdID0gW107XG4gICAgQHByb3BlcnR5KHt0eXBlOltjYy5TcHJpdGVGcmFtZV0sdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfc3ByaXRlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuU2V0VXNlckRhdGEoXCJBQ1RJT05fUE9TSVRJT05cIiwgdGhpcy5tdWlfQWN0aW9uTm9kZS5wb3NpdGlvbik7XG4gICAgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogVUlOZXdHYW1lQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25CR1wiLCB0aGlzLk9uQkcuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPblNraXBHYW1lXCIsIHRoaXMuT25Ta2lwR2FtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uUmVwbGF5RGVja1wiLCB0aGlzLk9uUmVwbGF5RGVjay5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uQ2FuY2VsXCIsIHRoaXMuT25DYW5jZWwuYmluZCh0aGlzKSk7XG4gICAgICAgIGlpLlVJVXRpbC5tb3ZlQWN0aW9uKHRoaXMubXVpX0FjdGlvbk5vZGUsIHRydWUsIHRoaXMuR2V0VXNlckRhdGEoXCJBQ1RJT05fUE9TSVRJT05cIiksIDAuMyk7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmFyZ3MuanUuZ2FtZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRUdhbWVUeXBlLkVBU1k6IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nYW1lVHlwZUxhYmVsLnN0cmluZyA9IGDnroDljZVgO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NraXBHYW1lTGFiZWwuc3RyaW5nID0gYOi3s+i/h+W9k+WJjee6p+WIq2A7XG4gICAgICAgICAgICB9IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFR2FtZVR5cGUuSEFSRDoge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dhbWVUeXBlTGFiZWwuc3RyaW5nID0gYOWbsOmavmA7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpcEdhbWVMYWJlbC5zdHJpbmcgPSBg6Lez6L+H5b2T5YmN57qn5YirYDtcbiAgICAgICAgICAgIH0gYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVHYW1lVHlwZS5TRUVEOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2FtZVR5cGVMYWJlbC5zdHJpbmcgPSBgU2VlZGA7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpcEdhbWVMYWJlbC5zdHJpbmcgPSBgUGxheSBOZXh0IFNlZWRgO1xuICAgICAgICAgICAgfSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9nYW1lVHlwZVNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuX3Nwcml0ZUZyYW1lc1t0aGlzLmFyZ3MuanUuZ2FtZVR5cGVdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fc2VlZExhYmVscy5mb3JFYWNoKGxhYmVsPT5sYWJlbC5zdHJpbmcgPSBgJHt0aGlzLmFyZ3MuanUuU2VlZH1gKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBFeGl0V2l0aEFjdGlvbihjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlpLlVJVXRpbC5tb3ZlQWN0aW9uKHRoaXMubXVpX0FjdGlvbk5vZGUsIGZhbHNlLCB0aGlzLkdldFVzZXJEYXRhKFwiQUNUSU9OX1BPU0lUSU9OXCIpLCAwLjMsICgpPT57XG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5DbG9zZSgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIEBpaS5VdGlsLmJsb2NrKDEpXG4gICAgcHJpdmF0ZSBPbkJHKCkge1xuICAgICAgICB0aGlzLkV4aXRXaXRoQWN0aW9uKClcbiAgICB9XG5cbiAgICBAaWkuVXRpbC5ibG9jaygxKVxuICAgIHByaXZhdGUgT25Ta2lwR2FtZSgpe1xuICAgICAgICB0aGlzLkV4aXRXaXRoQWN0aW9uKCgpPT50aGlzLmVtaXRHbG9iYWwoU29saXRhaXJlR2FtZVVJUGFuZWwuZXZlbnQuRVZFTlRfR0FNRVNDRU5FX1NLSVBfR0FNRSkpXG4gICAgfVxuXG4gICAgQGlpLlV0aWwuYmxvY2soMSlcbiAgICBwcml2YXRlIE9uUmVwbGF5RGVjaygpIHtcbiAgICAgICAgdGhpcy5FeGl0V2l0aEFjdGlvbigoKT0+dGhpcy5lbWl0R2xvYmFsKFNvbGl0YWlyZUdhbWVVSVBhbmVsLmV2ZW50LkVWRU5UX0dBTUVTQ0VORV9SRVBMQVlfR0FNRSkpXG4gICAgfVxuXG4gICAgQGlpLlV0aWwuYmxvY2soMSlcbiAgICBwcml2YXRlIE9uQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLkV4aXRXaXRoQWN0aW9uKClcbiAgICB9XG59XG4iXX0=