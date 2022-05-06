
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Options/SolitaireOptionsUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d732d9cqlPW6jHTUj14/kg', 'SolitaireOptionsUIPanel');
// GameBundles/Solitaire/Script/Options/SolitaireOptionsUIPanel.ts

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
var SolitaireLogic_1 = require("../Logic/SolitaireLogic");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var UISettingToggle_1 = require("../_Public/Component/UISettingToggle");
var SolitaireActionUIPanel_1 = require("../_Public/SolitaireActionUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireOptionsUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireOptionsUIPanel, _super);
    function SolitaireOptionsUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.musicToggle = null;
        _this.soundToggle = null;
        _this.vibrateToggle = null;
        _this.leftHandToggle = null;
        _this._removeAdsHourLabel = null;
        _this._removeAdsButton = null;
        _this.REMOVE_HOURS = 8;
        return _this;
    }
    SolitaireOptionsUIPanel.prototype.OnCreate = function () {
        _super.prototype.OnCreate.call(this);
        this.musicToggle.Init(!ii.AudioMgr.ins.musicOffBV.v, function (isOn) { return ii.AudioMgr.ins.musicOffBV.v = !isOn; });
        this.soundToggle.Init(!ii.AudioMgr.ins.effectOffBV.v, function (isOn) { return ii.AudioMgr.ins.effectOffBV.v = !isOn; });
        this.vibrateToggle.Init(!ii.App.ins.p.vibrate.off.v, function (isOn) {
            ii.App.ins.p.vibrate.off.v = !isOn;
            if (isOn) {
                ii.App.ins.p.vibrate.Default();
            }
        });
        this.leftHandToggle.Init(SolitaireLogic_1.SolitaireLogic.dataCache.leftHandBV.v, function (isOn) { return SolitaireLogic_1.SolitaireLogic.dataCache.leftHandBV.v = isOn; });
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnHowToPlay", this.OnHowToPlay.bind(this));
    };
    SolitaireOptionsUIPanel.prototype.OnEnter = function () { };
    SolitaireOptionsUIPanel.prototype.OnBack = function () {
        this.ExitWithAction(this.Close.bind(this), false);
    };
    SolitaireOptionsUIPanel.prototype.OnHowToPlay = function () {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.SolitaireHowToPlayUIPanel.key);
        this.ExitWithAction(function () {
        }, true);
    };
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "musicToggle", void 0);
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "soundToggle", void 0);
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "vibrateToggle", void 0);
    __decorate([
        property(UISettingToggle_1.default)
    ], SolitaireOptionsUIPanel.prototype, "leftHandToggle", void 0);
    __decorate([
        property({ type: cc.Label, visible: true })
    ], SolitaireOptionsUIPanel.prototype, "_removeAdsHourLabel", void 0);
    __decorate([
        property({ type: cc.Button, visible: true })
    ], SolitaireOptionsUIPanel.prototype, "_removeAdsButton", void 0);
    SolitaireOptionsUIPanel = __decorate([
        ccclass
    ], SolitaireOptionsUIPanel);
    return SolitaireOptionsUIPanel;
}(SolitaireActionUIPanel_1.default));
exports.default = SolitaireOptionsUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxPcHRpb25zXFxTb2xpdGFpcmVPcHRpb25zVUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBeUQ7QUFDekQsNERBQTJEO0FBQzNELHdFQUFtRTtBQUNuRSw0RUFBdUU7QUFFakUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBcUQsMkNBQXNCO0lBQTNFO1FBQUEscUVBcUNDO1FBcEM4QixpQkFBVyxHQUFvQixJQUFJLENBQUE7UUFDbkMsaUJBQVcsR0FBb0IsSUFBSSxDQUFBO1FBQ25DLG1CQUFhLEdBQW9CLElBQUksQ0FBQztRQUN0QyxvQkFBYyxHQUFvQixJQUFJLENBQUM7UUFDbEIseUJBQW1CLEdBQWEsSUFBSSxDQUFDO1FBQ3BDLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUVuRSxrQkFBWSxHQUFXLENBQUMsQ0FBQzs7SUE2QjlDLENBQUM7SUEzQmEsMENBQVEsR0FBbEI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFwQyxDQUFvQyxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFVBQUEsSUFBSSxJQUFJLE9BQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQUEsSUFBSTtZQUNyRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBRyxJQUFJLEVBQUU7Z0JBQ0wsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsK0JBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFBLElBQUksSUFBSSxPQUFBLCtCQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUE1QyxDQUE0QyxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRVMseUNBQU8sR0FBakIsY0FBNEIsQ0FBQztJQUVyQix3Q0FBTSxHQUFkO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRU8sNkNBQVcsR0FBbkI7UUFDSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUNBQWtCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3BCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFsQzBCO1FBQTFCLFFBQVEsQ0FBQyx5QkFBZSxDQUFDO2dFQUFvQztJQUNuQztRQUExQixRQUFRLENBQUMseUJBQWUsQ0FBQztnRUFBb0M7SUFDbkM7UUFBMUIsUUFBUSxDQUFDLHlCQUFlLENBQUM7a0VBQXVDO0lBQ3RDO1FBQTFCLFFBQVEsQ0FBQyx5QkFBZSxDQUFDO21FQUF3QztJQUMxQjtRQUF2QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7d0VBQThDO0lBQzVDO1FBQXhDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztxRUFBNEM7SUFObkUsdUJBQXVCO1FBRDNDLE9BQU87T0FDYSx1QkFBdUIsQ0FxQzNDO0lBQUQsOEJBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ29ELGdDQUFzQixHQXFDMUU7a0JBckNvQix1QkFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVMb2dpYyB9IGZyb20gXCIuLi9Mb2dpYy9Tb2xpdGFpcmVMb2dpY1wiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IFVJU2V0dGluZ1RvZ2dsZSBmcm9tIFwiLi4vX1B1YmxpYy9Db21wb25lbnQvVUlTZXR0aW5nVG9nZ2xlXCI7XG5pbXBvcnQgU29saXRhaXJlQWN0aW9uVUlQYW5lbCBmcm9tIFwiLi4vX1B1YmxpYy9Tb2xpdGFpcmVBY3Rpb25VSVBhbmVsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbGl0YWlyZU9wdGlvbnNVSVBhbmVsIGV4dGVuZHMgU29saXRhaXJlQWN0aW9uVUlQYW5lbCB7XG4gICAgQHByb3BlcnR5KFVJU2V0dGluZ1RvZ2dsZSkgbXVzaWNUb2dnbGU6IFVJU2V0dGluZ1RvZ2dsZSA9IG51bGxcbiAgICBAcHJvcGVydHkoVUlTZXR0aW5nVG9nZ2xlKSBzb3VuZFRvZ2dsZTogVUlTZXR0aW5nVG9nZ2xlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShVSVNldHRpbmdUb2dnbGUpIHZpYnJhdGVUb2dnbGU6IFVJU2V0dGluZ1RvZ2dsZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KFVJU2V0dGluZ1RvZ2dsZSkgbGVmdEhhbmRUb2dnbGU6IFVJU2V0dGluZ1RvZ2dsZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkxhYmVsLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgX3JlbW92ZUFkc0hvdXJMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5CdXR0b24sdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfcmVtb3ZlQWRzQnV0dG9uOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBSRU1PVkVfSE9VUlM6IG51bWJlciA9IDg7XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKSB7XG4gICAgICAgIHN1cGVyLk9uQ3JlYXRlKCk7XG4gICAgICAgIHRoaXMubXVzaWNUb2dnbGUuSW5pdCghaWkuQXVkaW9NZ3IuaW5zLm11c2ljT2ZmQlYudiwgaXNPbiA9PiBpaS5BdWRpb01nci5pbnMubXVzaWNPZmZCVi52ID0gIWlzT24pO1xuICAgICAgICB0aGlzLnNvdW5kVG9nZ2xlLkluaXQoIWlpLkF1ZGlvTWdyLmlucy5lZmZlY3RPZmZCVi52LCBpc09uID0+IGlpLkF1ZGlvTWdyLmlucy5lZmZlY3RPZmZCVi52ID0gIWlzT24pO1xuICAgICAgICB0aGlzLnZpYnJhdGVUb2dnbGUuSW5pdCghaWkuQXBwLmlucy5wLnZpYnJhdGUub2ZmLnYsIGlzT24gPT4ge1xuICAgICAgICAgICAgaWkuQXBwLmlucy5wLnZpYnJhdGUub2ZmLnYgPSAhaXNPbjtcbiAgICAgICAgICAgIGlmKGlzT24pIHtcbiAgICAgICAgICAgICAgICBpaS5BcHAuaW5zLnAudmlicmF0ZS5EZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxlZnRIYW5kVG9nZ2xlLkluaXQoU29saXRhaXJlTG9naWMuZGF0YUNhY2hlLmxlZnRIYW5kQlYudiwgaXNPbiA9PiBTb2xpdGFpcmVMb2dpYy5kYXRhQ2FjaGUubGVmdEhhbmRCVi52ID0gaXNPbik7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkJhY2tcIiwgdGhpcy5PbkJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkhvd1RvUGxheVwiLCB0aGlzLk9uSG93VG9QbGF5LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBwcm90ZWN0ZWQgT25FbnRlcigpOiB2b2lkIHsgfVxuXG4gICAgcHJpdmF0ZSBPbkJhY2soKSB7XG4gICAgICAgIHRoaXMuRXhpdFdpdGhBY3Rpb24odGhpcy5DbG9zZS5iaW5kKHRoaXMpLCBmYWxzZSlcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uSG93VG9QbGF5KCkge1xuICAgICAgICBpaS5VSU1nci5pbnMuT3BlbihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLnBhbmVsLlNvbGl0YWlyZUhvd1RvUGxheVVJUGFuZWwua2V5KTtcbiAgICAgICAgdGhpcy5FeGl0V2l0aEFjdGlvbigoKT0+e1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbn1cbiJdfQ==