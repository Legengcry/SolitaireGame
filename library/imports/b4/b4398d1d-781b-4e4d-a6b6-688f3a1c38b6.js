"use strict";
cc._RF.push(module, 'b43980deBtOTaa2aI86HDi2', 'UIThemeMenuContentPokerFace');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFace.ts

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
var SolitaireAutoAtlasCfg_1 = require("../SolitaireAutoAtlasCfg");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var UIThemeMenuContent_1 = require("./UIThemeMenuContent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentPokerFace = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerFace, _super);
    function UIThemeMenuContentPokerFace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.m_itemArray = [];
        return _this;
    }
    UIThemeMenuContentPokerFace.prototype.OnCreate = function () {
    };
    UIThemeMenuContentPokerFace.prototype.OnRelease = function () {
        // this.ReleaseContent()
    };
    UIThemeMenuContentPokerFace.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        for (var i = 0; i < SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.FaceSkinCnt; ++i) {
            this.m_itemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerFaceItem.key, {
                faceSkin: i,
                OnSelect: function (faceSkin) { _this.args.OnSelect(_this, faceSkin); }
            }, this.scrollView.content).CloseBy(this));
        }
        this.Select(this.args.faceSkin);
    };
    UIThemeMenuContentPokerFace.prototype.Select = function (faceSkin) {
        ii.AudioMgr.ins.PlayEffect();
        this.m_itemArray.forEach(function (it) { return it.Select(faceSkin); });
    };
    UIThemeMenuContentPokerFace.prototype.OnResetSkin = function (skin) {
        this.Select(skin.faceSkin);
    };
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentPokerFace.prototype, "scrollView", void 0);
    UIThemeMenuContentPokerFace = __decorate([
        ccclass
    ], UIThemeMenuContentPokerFace);
    return UIThemeMenuContentPokerFace;
}(UIThemeMenuContent_1.default));
exports.default = UIThemeMenuContentPokerFace;

cc._RF.pop();