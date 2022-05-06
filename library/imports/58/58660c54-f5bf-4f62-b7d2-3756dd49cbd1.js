"use strict";
cc._RF.push(module, '58660xU9b9PYrfSN1bdScvR', 'UIThemeMenuContentPokerFaceItem');
// GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFaceItem.ts

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
var SolitaireEnums_1 = require("../SolitaireEnums");
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIThemeMenuContentPokerFaceItem = /** @class */ (function (_super) {
    __extends(UIThemeMenuContentPokerFaceItem, _super);
    function UIThemeMenuContentPokerFaceItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = null;
        _this.highLightNode = null;
        _this._layout = null;
        _this.m_DisplayPokerUI = [];
        return _this;
    }
    UIThemeMenuContentPokerFaceItem_1 = UIThemeMenuContentPokerFaceItem;
    UIThemeMenuContentPokerFaceItem.prototype.OnCreate = function () { };
    UIThemeMenuContentPokerFaceItem.prototype.OnRelease = function () { };
    UIThemeMenuContentPokerFaceItem.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnClick", this.OnItemClick.bind(this));
        var _loop_1 = function (suit) {
            UIThemeMenuContentPokerFaceItem_1.POKER_POINTS.forEach(function (point) {
                _this.m_DisplayPokerUI.push(ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitairePokerDisplayUI.key, {
                    point: point,
                    suit: suit,
                    backSkin: { kind: "classic", index: 0 },
                    frontSkin: 0,
                    status: SolitaireEnums_1.EPokerStatus.OPEN,
                    faceSkin: _this.args.faceSkin
                }, _this._layout.node).CloseBy(_this));
            });
        };
        for (var suit = SolitaireEnums_1.ESuit.HEITAO; suit <= SolitaireEnums_1.ESuit.FANGKUAI; ++suit) {
            _loop_1(suit);
        }
        this.highLightNode.active = false;
    };
    UIThemeMenuContentPokerFaceItem.prototype.OnItemClick = function () {
        this.args.OnSelect(this.args.faceSkin);
    };
    UIThemeMenuContentPokerFaceItem.prototype.Select = function (faceSkin) {
        this.highLightNode.active = this.args.faceSkin === faceSkin;
    };
    var UIThemeMenuContentPokerFaceItem_1;
    UIThemeMenuContentPokerFaceItem.POKER_POINTS = [1, 11, 12, 13];
    __decorate([
        property(cc.Sprite)
    ], UIThemeMenuContentPokerFaceItem.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIThemeMenuContentPokerFaceItem.prototype, "highLightNode", void 0);
    __decorate([
        property({ type: cc.Layout, visible: true })
    ], UIThemeMenuContentPokerFaceItem.prototype, "_layout", void 0);
    UIThemeMenuContentPokerFaceItem = UIThemeMenuContentPokerFaceItem_1 = __decorate([
        ccclass
    ], UIThemeMenuContentPokerFaceItem);
    return UIThemeMenuContentPokerFaceItem;
}(ii.UIComp));
exports.default = UIThemeMenuContentPokerFaceItem;

cc._RF.pop();