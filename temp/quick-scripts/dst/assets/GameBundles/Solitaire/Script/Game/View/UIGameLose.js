
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/UIGameLose.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '16406xrmulH9ZJVyTHv4ySg', 'UIGameLose');
// GameBundles/Solitaire/Script/Game/View/UIGameLose.ts

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
var SolitaireGameUIPanel_1 = require("./SolitaireGameUIPanel");
var SolitaireAudioCfg_1 = require("../../SolitaireAudioCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGameLose = /** @class */ (function (_super) {
    __extends(UIGameLose, _super);
    function UIGameLose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scoreLabel = null;
        _this._seedLabels = [];
        return _this;
    }
    UIGameLose.prototype.OnCreate = function () { };
    UIGameLose.prototype.OnRelease = function () { };
    UIGameLose.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.failed);
        this.scoreLabel.string = "(\u5F97\u5206: " + this.args.ju.scoreBV.v + ")";
        this._seedLabels.forEach(function (label) { return label.string = "" + _this.args.ju.Seed; });
        this.SetIIClickHandler("OnSkipGame", function () {
            _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_SKIP_GAME);
            _this.Close();
        }, true);
        this.SetIIClickHandler("OnReplay", function () {
            _this.emitGlobal(SolitaireGameUIPanel_1.default.event.EVENT_GAMESCENE_REPLAY_GAME);
            _this.Close();
        }, true);
        this.SetIIClickHandler("OnContinue", function () {
            _this.args.ju.isContinueBV.v = true;
            _this.Close();
        }, true);
    };
    __decorate([
        property(cc.Label)
    ], UIGameLose.prototype, "scoreLabel", void 0);
    __decorate([
        property({ type: [cc.Label], visible: true })
    ], UIGameLose.prototype, "_seedLabels", void 0);
    UIGameLose = __decorate([
        ccclass
    ], UIGameLose);
    return UIGameLose;
}(ii.UIPanel));
exports.default = UIGameLose;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxVSUdhbWVMb3NlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtEQUEwRDtBQUMxRCw2REFBNEQ7QUFNdEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBd0MsOEJBQTBCO0lBQWxFO1FBQUEscUVBMEJDO1FBekIrQixnQkFBVSxHQUFhLElBQUksQ0FBQTtRQUNMLGlCQUFXLEdBQWUsRUFBRSxDQUFDOztJQXdCbkYsQ0FBQztJQXRCYSw2QkFBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLDhCQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsMkJBQU0sR0FBaEIsVUFBaUIsTUFBc0I7UUFBdkMsaUJBa0JDO1FBakJHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxxQ0FBaUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsb0JBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBRyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFFLE9BQUEsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQU0sRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBb0IsQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4RixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsOEJBQW9CLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDeEUsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNSLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDakMsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbkMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUVaLENBQUM7SUF2Qm1CO1FBQW5CLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUFvQztJQUNiO1FBQXpDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7bURBQXNDO0lBRjlELFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0EwQjlCO0lBQUQsaUJBQUM7Q0ExQkQsQUEwQkMsQ0ExQnVDLEVBQUUsQ0FBQyxPQUFPLEdBMEJqRDtrQkExQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVKdSB9IGZyb20gXCIuLi9Nb2RlbC9Tb2xpdGFpcmVKdVwiO1xuaW1wb3J0IFNvbGl0YWlyZUdhbWVVSVBhbmVsIGZyb20gXCIuL1NvbGl0YWlyZUdhbWVVSVBhbmVsXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVBdWRpb0NmZyB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVBdWRpb0NmZ1wiO1xuXG5leHBvcnQgdHlwZSBVSUdhbWVMb3NlQXJncyA9IHtcbiAgICBqdTogU29saXRhaXJlSnVcbn1cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlHYW1lTG9zZSBleHRlbmRzIGlpLlVJUGFuZWw8VUlHYW1lTG9zZUFyZ3M+IHtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpIHByaXZhdGUgc2NvcmVMYWJlbDogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOltjYy5MYWJlbF0sdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfc2VlZExhYmVsczogY2MuTGFiZWxbXSA9IFtdO1xuXG4gICAgcHJvdGVjdGVkIE9uQ3JlYXRlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPbk9wZW4odWlBcmdzOiBVSUdhbWVMb3NlQXJncyk6IHZvaWQge1xuICAgICAgICBpaS5BdWRpb01nci5pbnMuUGxheUVmZmVjdChTb2xpdGFpcmVBdWRpb0NmZy5lZmZlY3QuZmFpbGVkKTtcbiAgICAgICAgdGhpcy5zY29yZUxhYmVsLnN0cmluZyA9IGAo5b6X5YiGOiAke3RoaXMuYXJncy5qdS5zY29yZUJWLnZ9KWA7XG4gICAgICAgIHRoaXMuX3NlZWRMYWJlbHMuZm9yRWFjaChsYWJlbD0+bGFiZWwuc3RyaW5nID0gYCR7dGhpcy5hcmdzLmp1LlNlZWR9YCk7XG5cbiAgICAgICAgdGhpcy5TZXRJSUNsaWNrSGFuZGxlcihcIk9uU2tpcEdhbWVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdEdsb2JhbChTb2xpdGFpcmVHYW1lVUlQYW5lbC5ldmVudC5FVkVOVF9HQU1FU0NFTkVfU0tJUF9HQU1FKTsgdGhpcy5DbG9zZSgpO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25SZXBsYXlcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdEdsb2JhbChTb2xpdGFpcmVHYW1lVUlQYW5lbC5ldmVudC5FVkVOVF9HQU1FU0NFTkVfUkVQTEFZX0dBTUUpO1xuICAgICAgICAgICAgdGhpcy5DbG9zZSgpO1xuICAgICAgICB9LCB0cnVlKVxuICAgICAgICB0aGlzLlNldElJQ2xpY2tIYW5kbGVyKFwiT25Db250aW51ZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5hcmdzLmp1LmlzQ29udGludWVCVi52ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoKTtcbiAgICAgICAgfSwgdHJ1ZSlcblxuICAgIH1cblxufVxuIl19