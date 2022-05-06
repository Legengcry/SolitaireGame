"use strict";
cc._RF.push(module, '8b4f94cbHFHmos3caJZTr81', 'SolitairePokerDisplayUI');
// GameBundles/Solitaire/Script/Game/View/SolitairePokerDisplayUI.ts

"use strict";
/**
 * 扑克牌的显示节点
 */
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
var SolitaireAutoAtlasCfg_1 = require("../../SolitaireAutoAtlasCfg");
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitaireSpriteFrameCfg_1 = require("../../SolitaireSpriteFrameCfg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitairePokerDisplayUI = /** @class */ (function (_super) {
    __extends(SolitairePokerDisplayUI, _super);
    function SolitairePokerDisplayUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skinSprite = null;
        _this._pointSprite = null;
        _this._suitSprite = null;
        _this._smallSuitSprite = null;
        _this.m_Status = SolitaireEnums_1.EPokerStatus.CLOSE;
        _this.m_Point = 0;
        _this.m_Suit = SolitaireEnums_1.ESuit.HEITAO;
        _this.m_backSkin = {
            kind: "classic",
            index: 0
        };
        _this.m_frontSkin = 0;
        _this.m_FaceSkin = 0;
        return _this;
    }
    Object.defineProperty(SolitairePokerDisplayUI.prototype, "backSkin", {
        get: function () { return this.m_backSkin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitairePokerDisplayUI.prototype, "frontSkin", {
        get: function () { return this.m_frontSkin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitairePokerDisplayUI.prototype, "skin", {
        get: function () { return this.m_FaceSkin; },
        enumerable: false,
        configurable: true
    });
    SolitairePokerDisplayUI.prototype.OnCreate = function () { };
    SolitairePokerDisplayUI.prototype.OnRelease = function () { };
    SolitairePokerDisplayUI.prototype.OnOpen = function (uiArgs) {
        this.m_Point = this.args.point;
        this.m_Suit = this.args.suit;
        this.m_backSkin.kind = this.args.backSkin.kind;
        this.m_backSkin.index = this.args.backSkin.index;
        this.m_frontSkin = this.args.frontSkin;
        this.m_FaceSkin = this.args.faceSkin;
        this.m_Status = this.args.status;
        this.setStatus(this.m_Status);
        // 花色、点数
        this.__RefreshPointTexture();
        this.__RefreshSuitSkinTexture();
    };
    SolitairePokerDisplayUI.prototype.__RefreshPointTexture = function () {
        var _this = this;
        if (this.m_Suit === SolitaireEnums_1.ESuit.HEITAO || this.m_Suit === SolitaireEnums_1.ESuit.MEIHUA) {
            this.LoadRes(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getBlackPointSpriteFrameUrl(this.m_FaceSkin, this.m_Point), function (sp) { return _this._pointSprite.spriteFrame = _this.SetAssetProperty("FACE_SKIN", sp); }, false, this.UUID_GROUP_KEY("FACE_SKIN"));
        }
        else {
            this.LoadRes(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getRedPointSpriteFrameUrl(this.m_FaceSkin, this.m_Point), function (sp) { return _this._pointSprite.spriteFrame = _this.SetAssetProperty("FACE_SKIN", sp); }, false, this.UUID_GROUP_KEY("FACE_SKIN"));
        }
    };
    SolitairePokerDisplayUI.prototype.__RefreshSuitSkinTexture = function () {
        var _this = this;
        this.LoadRes(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl(this.m_FaceSkin, this.m_Suit), function (sp) { return _this._smallSuitSprite.spriteFrame = _this.SetAssetProperty("SMALL_SUIT_SKIN", sp); }, false, this.UUID_GROUP_KEY("SMALL_SUIT_SKIN"));
        if (this.m_Point >= 11) {
            this.LoadRes(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getJQKSpriteFrameUrl(this.m_FaceSkin, this.m_Suit, this.m_Point), function (sp) { return _this._suitSprite.spriteFrame = _this.SetAssetProperty("SUIT_SKIN", sp); }, false, this.UUID_GROUP_KEY("SUIT_SKIN"));
        }
        else {
            this.LoadRes(SolitaireAutoAtlasCfg_1.SolitaireAutoAtlasCfg.getFaceSuitSpritFrameUrl(this.m_FaceSkin, this.m_Suit), function (sp) { return _this._suitSprite.spriteFrame = _this.SetAssetProperty("SUIT_SKIN", sp); }, false, this.UUID_GROUP_KEY("SUIT_SKIN"));
        }
    };
    SolitairePokerDisplayUI.prototype.setStatus = function (status) {
        var _this = this;
        // 由于 UI 需要进行表现，因此 model 和 UI 会出现不一致
        this.m_Status = status;
        if (status == SolitaireEnums_1.EPokerStatus.CLOSE) {
            this._pointSprite.node.active = false;
            this._suitSprite.node.active = false;
            this._smallSuitSprite.node.active = false;
            this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerBackUrl(this.m_backSkin), function (sp) { return _this._skinSprite.spriteFrame = _this.SetAssetProperty("SKIN", sp); }, false, this.UUID_GROUP_KEY("SKIN"));
        }
        else {
            this._pointSprite.node.active = true;
            this._suitSprite.node.active = true;
            this._smallSuitSprite.node.active = true;
            this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.pokerFrontUrl(this.m_frontSkin), function (sp) { return _this._skinSprite.spriteFrame = _this.SetAssetProperty("SKIN", sp); }, false, this.UUID_GROUP_KEY("SKIN"));
        }
    };
    SolitairePokerDisplayUI.prototype.Init = function (faceSkin, backSkin, frontSkin) {
        this.m_backSkin = backSkin;
        this.m_frontSkin = frontSkin;
        this.m_FaceSkin = faceSkin;
        this.__RefreshPointTexture();
        this.__RefreshSuitSkinTexture();
        this.setStatus(this.m_Status);
        return this;
    };
    SolitairePokerDisplayUI.prototype.setSkin = function (skin) {
        this.setFaceSkin(skin.faceSkin);
        this.setFrontSkin(skin.frontSkin);
        this.setBackSkin(skin.backSkin);
        this.__RefreshPointTexture();
        this.__RefreshSuitSkinTexture();
        this.setStatus(this.m_Status);
    };
    SolitairePokerDisplayUI.prototype.setFaceSkin = function (faceSkin) {
        if (this.m_FaceSkin !== faceSkin) {
            this.m_FaceSkin = faceSkin;
            this.__RefreshPointTexture();
            this.__RefreshSuitSkinTexture();
            if (this.m_Status !== null) {
                this.setStatus(this.m_Status);
            }
        }
    };
    SolitairePokerDisplayUI.prototype.setFrontSkin = function (frontSkin) {
        this.m_frontSkin = frontSkin;
        if (this.m_Status !== null) {
            this.setStatus(this.m_Status);
        }
    };
    SolitairePokerDisplayUI.prototype.setBackSkin = function (backSkin) {
        this.m_backSkin = backSkin;
        if (this.m_Status !== null) {
            this.setStatus(this.m_Status);
        }
    };
    SolitairePokerDisplayUI.prototype.Refresh = function (status, suit, point) {
        this.m_Status = status;
        this.m_Point = point;
        this.m_Suit = suit;
        this.__RefreshPointTexture();
        this.__RefreshSuitSkinTexture();
        this.setStatus(this.m_Status);
    };
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitairePokerDisplayUI.prototype, "_skinSprite", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitairePokerDisplayUI.prototype, "_pointSprite", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitairePokerDisplayUI.prototype, "_suitSprite", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitairePokerDisplayUI.prototype, "_smallSuitSprite", void 0);
    SolitairePokerDisplayUI = __decorate([
        ccclass
    ], SolitairePokerDisplayUI);
    return SolitairePokerDisplayUI;
}(ii.UIComp));
exports.default = SolitairePokerDisplayUI;

cc._RF.pop();