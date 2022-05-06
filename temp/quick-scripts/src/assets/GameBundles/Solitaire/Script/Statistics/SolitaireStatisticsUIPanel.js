"use strict";
cc._RF.push(module, '4c0d82i1dlDF4Seg17j9R/T', 'SolitaireStatisticsUIPanel');
// GameBundles/Solitaire/Script/Statistics/SolitaireStatisticsUIPanel.ts

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
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var SolitaireActionUIPanel_1 = require("../_Public/SolitaireActionUIPanel");
var UIStatisticsPage_1 = require("./UIStatisticsPage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireStatisticsUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireStatisticsUIPanel, _super);
    function SolitaireStatisticsUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageView = null;
        return _this;
    }
    SolitaireStatisticsUIPanel.prototype.OnCreate = function () {
        _super.prototype.OnCreate.call(this);
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnReset", this.OnReset.bind(this));
    };
    SolitaireStatisticsUIPanel.prototype.OnRelease = function () {
        var pages = this.pageView.getPages();
        this.pageView.removeAllPages();
        while (pages.length > 0) {
            pages.pop().getComponent(UIStatisticsPage_1.default).Close();
        }
        _super.prototype.OnRelease.call(this);
    };
    SolitaireStatisticsUIPanel.prototype.OnEnter = function () {
        var _this = this;
        this.scheduleOnce(function () {
            // 加载不同的页
            for (var card3 = 0; card3 < 2; ++card3) {
                for (var vegas = 0; vegas < 2; ++vegas) {
                    var page = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIStatisticsPage.key, {
                        vegas: vegas === 1,
                        card3: card3 === 1,
                        width: _this.pageView.node.width
                    });
                    _this.pageView.addPage(page.node);
                }
            }
        }, 0);
    };
    SolitaireStatisticsUIPanel.prototype.OnBack = function () {
        var _this = this;
        this.ExitWithAction(function () {
            _this.Close();
        }, false);
    };
    SolitaireStatisticsUIPanel.prototype.OnReset = function () {
        this.CurrentPage.Reset();
    };
    Object.defineProperty(SolitaireStatisticsUIPanel.prototype, "CurrentPage", {
        get: function () {
            var pageIndex = this.pageView.getCurrentPageIndex();
            var pages = this.pageView.getPages();
            return pages[pageIndex].getComponent(UIStatisticsPage_1.default);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property(cc.PageView)
    ], SolitaireStatisticsUIPanel.prototype, "pageView", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireStatisticsUIPanel.prototype, "OnReset", null);
    SolitaireStatisticsUIPanel = __decorate([
        ccclass
    ], SolitaireStatisticsUIPanel);
    return SolitaireStatisticsUIPanel;
}(SolitaireActionUIPanel_1.default));
exports.default = SolitaireStatisticsUIPanel;

cc._RF.pop();