"use strict";
cc._RF.push(module, '4ff92St4QdCZ5++3u9tocjD', 'UIThemeMenuContentPokerBack');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBack.ts

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
var SolitaireSpriteFrameCfg_1 = require("../SolitaireSpriteFrameCfg");
var UIThemeMenuContent_1 = require("./UIThemeMenuContent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentPokerBack = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerBack, _super);
    function UIThemeMenuContentPokerBack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.m_itemArray = [];
        return _this;
    }
    UIThemeMenuContentPokerBack.prototype.OnCreate = function () { };
    UIThemeMenuContentPokerBack.prototype.OnRelease = function () { };
    UIThemeMenuContentPokerBack.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        var onClick = this.OnItemClick.bind(this);
        SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerBackKindCfg.forEach(function (kind) {
            _this.m_itemArray.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIThemeMenuContentPokerBackKindItem.key, {
                kind: kind,
                onClick: onClick
            }, _this.scrollView.content).CloseBy(_this));
        });
        this.Select(this.args.backSkin);
    };
    UIThemeMenuContentPokerBack.prototype.OnItemClick = function (backSkin, item) {
        this.args.OnSelect(this, backSkin);
    };
    UIThemeMenuContentPokerBack.prototype.Select = function (backSkin) {
        ii.AudioMgr.ins.PlayEffect();
        this.m_itemArray.forEach(function (it) { return it.Select(backSkin); });
    };
    UIThemeMenuContentPokerBack.prototype.OnResetSkin = function (skin) { this.Select(skin.backSkin); };
    __decorate([
        property(cc.ScrollView)
    ], UIThemeMenuContentPokerBack.prototype, "scrollView", void 0);
    UIThemeMenuContentPokerBack = __decorate([
        ccclass
    ], UIThemeMenuContentPokerBack);
    return UIThemeMenuContentPokerBack;
}(UIThemeMenuContent_1.default));
exports.default = UIThemeMenuContentPokerBack;

cc._RF.pop();