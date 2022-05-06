
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/SolitairePokerDisplayUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxTb2xpdGFpcmVQb2tlckRpc3BsYXlVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILHFFQUFvRTtBQUNwRSx1REFBMkQ7QUFDM0QseUVBQXdGO0FBV2xGLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDO0lBQXFELDJDQUFzQztJQUEzRjtRQUFBLHFFQW9IQztRQW5Ib0QsaUJBQVcsR0FBYyxJQUFJLENBQUE7UUFDN0Isa0JBQVksR0FBYyxJQUFJLENBQUE7UUFDOUIsaUJBQVcsR0FBYyxJQUFJLENBQUE7UUFDN0Isc0JBQWdCLEdBQWMsSUFBSSxDQUFBO1FBRTNFLGNBQVEsR0FBaUIsNkJBQVksQ0FBQyxLQUFLLENBQUM7UUFDNUMsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixZQUFNLEdBQVUsc0JBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsZ0JBQVUsR0FBbUI7WUFDakMsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDTSxpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixnQkFBVSxHQUFXLENBQUMsQ0FBQTs7SUFzR2xDLENBQUM7SUFyR0csc0JBQUksNkNBQVE7YUFBWixjQUFpQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUN6RCxzQkFBSSw4Q0FBUzthQUFiLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBQ25ELHNCQUFJLHlDQUFJO2FBQVIsY0FBcUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFFbkMsMENBQVEsR0FBbEIsY0FB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UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQWxId0M7UUFBeEMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO2dFQUFzQztJQUNyQztRQUF4QyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7aUVBQXVDO0lBQ3RDO1FBQXhDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQztnRUFBc0M7SUFDckM7UUFBeEMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDO3FFQUEyQztJQUpsRSx1QkFBdUI7UUFEM0MsT0FBTztPQUNhLHVCQUF1QixDQW9IM0M7SUFBRCw4QkFBQztDQXBIRCxBQW9IQyxDQXBIb0QsRUFBRSxDQUFDLE1BQU0sR0FvSDdEO2tCQXBIb0IsdUJBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiDmiZHlhYvniYznmoTmmL7npLroioLngrlcbiAqL1xuXG5pbXBvcnQgeyBTb2xpdGFpcmVTa2luIH0gZnJvbSBcIi4uLy4uL0RhdGFDYWNoZS9Tb2xpdGFpcmVTa2luRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVBdXRvQXRsYXNDZmcgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlQXV0b0F0bGFzQ2ZnXCI7XG5pbXBvcnQgeyBFUG9rZXJTdGF0dXMsIEVTdWl0IH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZUVudW1zXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZywgVFBva2VyQmFja1NraW4gfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcblxuZXhwb3J0IHR5cGUgU29saXRhaXJlUG9rZXJEaXNwbGF5VUlBcmdzID0ge1xuICAgIHBvaW50OiBudW1iZXIsXG4gICAgc3VpdDogRVN1aXQsXG4gICAgYmFja1NraW46IFRQb2tlckJhY2tTa2luLFxuICAgIGZyb250U2tpbjogbnVtYmVyLFxuICAgIHN0YXR1czogRVBva2VyU3RhdHVzLFxuICAgIGZhY2VTa2luOiBudW1iZXJcbn1cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saXRhaXJlUG9rZXJEaXNwbGF5VUkgZXh0ZW5kcyBpaS5VSUNvbXA8U29saXRhaXJlUG9rZXJEaXNwbGF5VUlBcmdzPiB7XG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9za2luU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlNwcml0ZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIF9wb2ludFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfc3VpdFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfc21hbGxTdWl0U3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG5cbiAgICBwcml2YXRlIG1fU3RhdHVzOiBFUG9rZXJTdGF0dXMgPSBFUG9rZXJTdGF0dXMuQ0xPU0U7XG4gICAgcHJpdmF0ZSBtX1BvaW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbV9TdWl0OiBFU3VpdCA9IEVTdWl0LkhFSVRBTztcbiAgICBwcml2YXRlIG1fYmFja1NraW46IFRQb2tlckJhY2tTa2luID0ge1xuICAgICAgICBraW5kOiBcImNsYXNzaWNcIixcbiAgICAgICAgaW5kZXg6IDBcbiAgICB9O1xuICAgIHByaXZhdGUgbV9mcm9udFNraW46IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBtX0ZhY2VTa2luOiBudW1iZXIgPSAwXG4gICAgZ2V0IGJhY2tTa2luKCk6IFRQb2tlckJhY2tTa2luIHsgcmV0dXJuIHRoaXMubV9iYWNrU2tpbiB9XG4gICAgZ2V0IGZyb250U2tpbigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tX2Zyb250U2tpbiB9XG4gICAgZ2V0IHNraW4oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubV9GYWNlU2tpbiB9XG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fUG9pbnQgPSB0aGlzLmFyZ3MucG9pbnQ7XG4gICAgICAgIHRoaXMubV9TdWl0ID0gdGhpcy5hcmdzLnN1aXQ7XG4gICAgICAgIHRoaXMubV9iYWNrU2tpbi5raW5kID0gdGhpcy5hcmdzLmJhY2tTa2luLmtpbmQ7XG4gICAgICAgIHRoaXMubV9iYWNrU2tpbi5pbmRleCA9IHRoaXMuYXJncy5iYWNrU2tpbi5pbmRleDtcbiAgICAgICAgdGhpcy5tX2Zyb250U2tpbiA9IHRoaXMuYXJncy5mcm9udFNraW47XG4gICAgICAgIHRoaXMubV9GYWNlU2tpbiA9IHRoaXMuYXJncy5mYWNlU2tpbjtcbiAgICAgICAgdGhpcy5tX1N0YXR1cyA9IHRoaXMuYXJncy5zdGF0dXM7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0dXModGhpcy5tX1N0YXR1cyk7XG4gICAgICAgIC8vIOiKseiJsuOAgeeCueaVsFxuICAgICAgICB0aGlzLl9fUmVmcmVzaFBvaW50VGV4dHVyZSgpO1xuICAgICAgICB0aGlzLl9fUmVmcmVzaFN1aXRTa2luVGV4dHVyZSgpO1xuICAgIH1cbiAgICBwcml2YXRlIF9fUmVmcmVzaFBvaW50VGV4dHVyZSgpIHtcbiAgICAgICAgaWYodGhpcy5tX1N1aXQgPT09IEVTdWl0LkhFSVRBTyB8fCB0aGlzLm1fU3VpdCA9PT0gRVN1aXQuTUVJSFVBKSB7XG4gICAgICAgICAgICB0aGlzLkxvYWRSZXM8Y2MuU3ByaXRlRnJhbWU+KFNvbGl0YWlyZUF1dG9BdGxhc0NmZy5nZXRCbGFja1BvaW50U3ByaXRlRnJhbWVVcmwodGhpcy5tX0ZhY2VTa2luLCB0aGlzLm1fUG9pbnQpLCBzcD0+dGhpcy5fcG9pbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNldEFzc2V0UHJvcGVydHkoXCJGQUNFX1NLSU5cIiwgc3ApLCBmYWxzZSwgdGhpcy5VVUlEX0dST1VQX0tFWShcIkZBQ0VfU0tJTlwiKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVBdXRvQXRsYXNDZmcuZ2V0UmVkUG9pbnRTcHJpdGVGcmFtZVVybCh0aGlzLm1fRmFjZVNraW4sIHRoaXMubV9Qb2ludCksIHNwPT50aGlzLl9wb2ludFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU2V0QXNzZXRQcm9wZXJ0eShcIkZBQ0VfU0tJTlwiLCBzcCksIGZhbHNlLCB0aGlzLlVVSURfR1JPVVBfS0VZKFwiRkFDRV9TS0lOXCIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9fUmVmcmVzaFN1aXRTa2luVGV4dHVyZSgpIHtcbiAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVBdXRvQXRsYXNDZmcuZ2V0RmFjZVN1aXRTcHJpdEZyYW1lVXJsKHRoaXMubV9GYWNlU2tpbiwgdGhpcy5tX1N1aXQpLCBzcD0+dGhpcy5fc21hbGxTdWl0U3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TZXRBc3NldFByb3BlcnR5KFwiU01BTExfU1VJVF9TS0lOXCIsIHNwKSwgZmFsc2UsIHRoaXMuVVVJRF9HUk9VUF9LRVkoXCJTTUFMTF9TVUlUX1NLSU5cIikpO1xuICAgICAgICBpZih0aGlzLm1fUG9pbnQgPj0gMTEpe1xuICAgICAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVBdXRvQXRsYXNDZmcuZ2V0SlFLU3ByaXRlRnJhbWVVcmwodGhpcy5tX0ZhY2VTa2luLCB0aGlzLm1fU3VpdCwgdGhpcy5tX1BvaW50KSwgc3A9PnRoaXMuX3N1aXRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNldEFzc2V0UHJvcGVydHkoXCJTVUlUX1NLSU5cIiwgc3ApLCBmYWxzZSwgdGhpcy5VVUlEX0dST1VQX0tFWShcIlNVSVRfU0tJTlwiKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVBdXRvQXRsYXNDZmcuZ2V0RmFjZVN1aXRTcHJpdEZyYW1lVXJsKHRoaXMubV9GYWNlU2tpbiwgdGhpcy5tX1N1aXQpLCBzcD0+dGhpcy5fc3VpdFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU2V0QXNzZXRQcm9wZXJ0eShcIlNVSVRfU0tJTlwiLCBzcCksIGZhbHNlLCB0aGlzLlVVSURfR1JPVVBfS0VZKFwiU1VJVF9TS0lOXCIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHNldFN0YXR1cyhzdGF0dXM6IEVQb2tlclN0YXR1cykge1xuICAgICAgICAvLyDnlLHkuo4gVUkg6ZyA6KaB6L+b6KGM6KGo546w77yM5Zug5q2kIG1vZGVsIOWSjCBVSSDkvJrlh7rnjrDkuI3kuIDoh7RcbiAgICAgICAgdGhpcy5tX1N0YXR1cyA9IHN0YXR1c1xuICAgICAgICBpZihzdGF0dXMgPT0gRVBva2VyU3RhdHVzLkNMT1NFKXtcbiAgICAgICAgICAgIHRoaXMuX3BvaW50U3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuX3N1aXRTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5fc21hbGxTdWl0U3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuTG9hZFJlczxjYy5TcHJpdGVGcmFtZT4oU29saXRhaXJlU3ByaXRlRnJhbWVDZmcucG9rZXJCYWNrVXJsKHRoaXMubV9iYWNrU2tpbiksIHNwPT50aGlzLl9za2luU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5TZXRBc3NldFByb3BlcnR5KFwiU0tJTlwiLCBzcCksIGZhbHNlLCB0aGlzLlVVSURfR1JPVVBfS0VZKFwiU0tJTlwiKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5fcG9pbnRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICB0aGlzLl9zdWl0U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5fc21hbGxTdWl0U3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5Mb2FkUmVzPGNjLlNwcml0ZUZyYW1lPihTb2xpdGFpcmVTcHJpdGVGcmFtZUNmZy5wb2tlckZyb250VXJsKHRoaXMubV9mcm9udFNraW4pLCBzcD0+dGhpcy5fc2tpblNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuU2V0QXNzZXRQcm9wZXJ0eShcIlNLSU5cIiwgc3ApLCBmYWxzZSwgdGhpcy5VVUlEX0dST1VQX0tFWShcIlNLSU5cIikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgSW5pdChmYWNlU2tpbjogbnVtYmVyLCBiYWNrU2tpbjogVFBva2VyQmFja1NraW4sIGZyb250U2tpbjogbnVtYmVyKTogU29saXRhaXJlUG9rZXJEaXNwbGF5VUkge1xuICAgICAgICB0aGlzLm1fYmFja1NraW4gPSBiYWNrU2tpblxuICAgICAgICB0aGlzLm1fZnJvbnRTa2luID0gZnJvbnRTa2luXG4gICAgICAgIHRoaXMubV9GYWNlU2tpbiA9IGZhY2VTa2luXG4gICAgICAgIHRoaXMuX19SZWZyZXNoUG9pbnRUZXh0dXJlKClcbiAgICAgICAgdGhpcy5fX1JlZnJlc2hTdWl0U2tpblRleHR1cmUoKVxuICAgICAgICB0aGlzLnNldFN0YXR1cyh0aGlzLm1fU3RhdHVzKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHNldFNraW4oc2tpbjogU29saXRhaXJlU2tpbikge1xuICAgICAgICB0aGlzLnNldEZhY2VTa2luKHNraW4uZmFjZVNraW4pO1xuICAgICAgICB0aGlzLnNldEZyb250U2tpbihza2luLmZyb250U2tpbik7XG4gICAgICAgIHRoaXMuc2V0QmFja1NraW4oc2tpbi5iYWNrU2tpbik7XG4gICAgICAgIHRoaXMuX19SZWZyZXNoUG9pbnRUZXh0dXJlKClcbiAgICAgICAgdGhpcy5fX1JlZnJlc2hTdWl0U2tpblRleHR1cmUoKVxuICAgICAgICB0aGlzLnNldFN0YXR1cyh0aGlzLm1fU3RhdHVzKVxuICAgIH1cblxuICAgIHNldEZhY2VTa2luKGZhY2VTa2luOiBudW1iZXIpIHtcbiAgICAgICAgaWYodGhpcy5tX0ZhY2VTa2luICE9PSBmYWNlU2tpbikge1xuICAgICAgICAgICAgdGhpcy5tX0ZhY2VTa2luID0gZmFjZVNraW5cbiAgICAgICAgICAgIHRoaXMuX19SZWZyZXNoUG9pbnRUZXh0dXJlKClcbiAgICAgICAgICAgIHRoaXMuX19SZWZyZXNoU3VpdFNraW5UZXh0dXJlKClcbiAgICAgICAgICAgIGlmKHRoaXMubV9TdGF0dXMgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHRoaXMubV9TdGF0dXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0RnJvbnRTa2luKGZyb250U2tpbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubV9mcm9udFNraW4gPSBmcm9udFNraW5cbiAgICAgICAgaWYodGhpcy5tX1N0YXR1cyAhPT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXR1cyh0aGlzLm1fU3RhdHVzKVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldEJhY2tTa2luKGJhY2tTa2luOiBUUG9rZXJCYWNrU2tpbikge1xuICAgICAgICB0aGlzLm1fYmFja1NraW4gPSBiYWNrU2tpblxuICAgICAgICBpZih0aGlzLm1fU3RhdHVzICE9PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHRoaXMubV9TdGF0dXMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBSZWZyZXNoKHN0YXR1czogRVBva2VyU3RhdHVzLCBzdWl0OiBFU3VpdCwgcG9pbnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1fU3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLm1fUG9pbnQgPSBwb2ludDtcbiAgICAgICAgdGhpcy5tX1N1aXQgPSBzdWl0O1xuICAgICAgICB0aGlzLl9fUmVmcmVzaFBvaW50VGV4dHVyZSgpO1xuICAgICAgICB0aGlzLl9fUmVmcmVzaFN1aXRTa2luVGV4dHVyZSgpO1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh0aGlzLm1fU3RhdHVzKVxuICAgIH1cbn1cbiJdfQ==