
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameDesktopUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '748daeeel5MQJmDZI5HFYpJ', 'SolitaireGameDesktopUI');
// GameBundles/Solitaire/Script/Game/View/SolitaireGameDesktopUI.ts

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
var SolitaireLogic_1 = require("../../Logic/SolitaireLogic");
var SolitaireAudioCfg_1 = require("../../SolitaireAudioCfg");
var SolitaireCfg_1 = require("../../SolitaireCfg");
var SolitaireEnums_1 = require("../../SolitaireEnums");
var SolitaireEvent_1 = require("../../SolitaireEvent");
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var SolitaireSpriteFrameCfg_1 = require("../../SolitaireSpriteFrameCfg");
var ZIndex = {
    NORMAL: 0,
    TOP: 999,
};
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireGameDesktopUI = /** @class */ (function (_super) {
    __extends(SolitaireGameDesktopUI, _super);
    function SolitaireGameDesktopUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //#region //! UI
        _this.bgSprite = null;
        _this.bgPatternSprite = null;
        _this._bottomMenuContainer = null; /** 底部菜单栏容器节点 */
        _this.actionNode = null; // 辅助动画的节点，扑克的移动在此节点中进行
        _this.mui_Container_Hint = null; /** 提醒功能所在的节点 */
        _this.pokerRoot = null; // pokerRoot 节点在屏幕上方中点处 
        _this.closeAreaButton = null;
        _this.closeArea = null;
        _this.closeAreaBackground = null;
        _this.openArea = null;
        _this.rotateNode = null;
        _this.receiveAreaList = [];
        _this.playAreaList = [];
        _this.mui_closeAreaBottomSprite = null;
        _this.md_closeAreaSpriteFrameList = [];
        _this.POKER_WIDTH = 82;
        _this.POKER_HEIGHT = 126;
        _this.TIME_MOVE = 0.2;
        _this.TIME_FLIP_HALF = 0.2;
        _this.m_UIPokerList = [];
        _this.m_UIHintMgr = null;
        _this.OFFSET_TOP = 200; // 收牌区距离顶部的距离
        _this.PADDING_PLAY = 90;
        //#endregion
        _this.m_DataCache = null;
        _this.m_BottomMenuUI = null;
        _this.m_Ju = null;
        //#endregion
        //#region //! Event
        _this._bIsUISubscrib = false;
        //#endregion
        //#region //! IDragDelegate
        _this.m_isTouchStart = false;
        _this.m_isDragStart = false;
        _this.m_MoveCount = 0;
        _this.m_EventTouch = null;
        return _this;
        //#endregion
    }
    SolitaireGameDesktopUI_1 = SolitaireGameDesktopUI;
    Object.defineProperty(SolitaireGameDesktopUI.prototype, "CloseAreaBackground", {
        get: function () { return this.closeAreaBackground; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameDesktopUI.prototype, "ReceiveAreaList", {
        get: function () { return this.receiveAreaList; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameDesktopUI.prototype, "PlayAreaList", {
        get: function () { return this.playAreaList; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameDesktopUI.prototype, "OpenArea", {
        get: function () { return this.openArea; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolitaireGameDesktopUI.prototype, "CloseArea", {
        get: function () { return this.closeArea; },
        enumerable: false,
        configurable: true
    });
    SolitaireGameDesktopUI.prototype.__x = function (index) { return -270 + index * this.PADDING_PLAY; };
    SolitaireGameDesktopUI.prototype.__y = function (line, pokerIndex) {
        if (line === void 0) { line = 0; }
        if (pokerIndex === void 0) { pokerIndex = 0; }
        var y = -this.OFFSET_TOP - line * 140 - SolitaireGameDesktopUI_1.PLAY_CLOSE_POKER_PADDING_Y * pokerIndex;
        return y;
    };
    //#region //! 生命周期 UIComp
    SolitaireGameDesktopUI.prototype.OnCreate = function () {
        // 各个区域位置调整
        for (var i = 0; i < 7; ++i) {
            var node = this.playAreaList[i];
            node.active = true;
            node.position = cc.v3(this.__x(i), this.__y(1), 0);
        }
        this.closeAreaButton.zIndex = -1;
        this.actionNode.zIndex = ZIndex.TOP + 1;
        this.mui_Container_Hint.zIndex = ZIndex.TOP + 2;
        this.setPlaceHolderVisiable(false);
        this.m_DataCache = this.GetDataCache(SolitaireCfg_1.SolitaireCfg.SOLITAIRE_DATACACHE);
        this.m_BottomMenuUI = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.SolitaireGameBottomMenuUI.key, {}, this._bottomMenuContainer).CloseBy(this);
    };
    SolitaireGameDesktopUI.prototype.OnRelease = function () { };
    SolitaireGameDesktopUI.prototype.OnOpen = function (uiArgs) {
        var _this = this;
        this.SetIIClickHandler("OnCloseArea", function () { return _this.OnClickCloseBottom(); });
    };
    SolitaireGameDesktopUI.prototype.OnClickCloseBottom = function () {
        this.m_Ju.OnClickCloseBottom();
    };
    //#endregion
    SolitaireGameDesktopUI.prototype.Enter = function (ju) {
        var _this = this;
        this.m_Ju = ju;
        this.setPlaceHolderVisiable(true);
        this.BindBV(this.m_DataCache.leftHandBV, this.LayoutWithHand.bind(this), true);
        this.BindBV(SolitaireLogic_1.SolitaireLogic.skin.skinBV, function (skin) {
            _this.m_UIPokerList.forEach(function (uiPoker) { return uiPoker.setSkin(skin); });
            _this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgSkinUrl(skin.bgSkin), function (sp) { return _this.bgSprite.spriteFrame = _this.SetAssetProperty("BG_SKIN", sp); }, false, _this.UUID_GROUP_KEY("BG_SKIN"));
            _this.bgPatternSprite.node.active = skin.bgPatternSkin !== -1;
            if (skin.bgPatternSkin >= 0) {
                _this.LoadRes(SolitaireSpriteFrameCfg_1.SolitaireSpriteFrameCfg.bgPatternSkinUrl(skin.bgPatternSkin), function (sp) { return _this.bgPatternSprite.spriteFrame = _this.SetAssetProperty("BG_PATTERN_SKIN", sp); }, false, _this.UUID_GROUP_KEY("BG_PATTERN_SKIN"));
            }
        }, true);
        ju.AddEventListener(this);
        // 提示功能
        this.m_UIHintMgr = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIHintMgr.key, {
            ju: this.m_Ju,
            desktop: this
        }, this.mui_Container_Hint);
        this.m_BottomMenuUI.Enter(this.m_Ju);
    };
    SolitaireGameDesktopUI.prototype.Exit = function (ju) {
        this.m_BottomMenuUI.Exit(this.m_Ju);
        this.m_UIHintMgr.Close();
        for (var index = this.m_UIPokerList.length - 1; index >= 0; --index) {
            this.m_UIPokerList[index].Close();
            this.m_UIPokerList.length = this.m_UIPokerList.length - 1;
        }
        this.setPlaceHolderVisiable(false);
        this._bIsUISubscrib = false;
        ju.RemoveEventListener(this);
        this.UnbindAllBV();
    };
    //#region //! UI 的显示隐藏 左右手
    SolitaireGameDesktopUI.prototype.setPlaceHolderVisiable = function (visiable) {
        for (var i = 0; i < 7; ++i) {
            this.playAreaList[i].active = visiable;
        }
        for (var i = 0; i < 4; ++i) {
            this.receiveAreaList[i].active = visiable;
        }
        this.closeAreaButton.active = visiable;
    };
    SolitaireGameDesktopUI.prototype.LayoutWithHand = function (isLeftHand) {
        if (isLeftHand) {
            for (var i = 0; i < 4; ++i) {
                var node = this.receiveAreaList[i];
                node.position = cc.v3(this.__x(3 + i), this.__y(0), 0);
            }
            this.openArea.position = cc.v3(this.__x(1), this.__y(0), 0);
            this.closeArea.position = cc.v3(this.__x(0), this.__y(0), 0);
            this.closeAreaButton.position = cc.v3(this.__x(0), this.__y(), 0);
        }
        else {
            for (var i = 0; i < 4; ++i) {
                var node = this.receiveAreaList[i];
                node.position = cc.v3(this.__x(i), this.__y(0), 0);
            }
            this.openArea.position = cc.v3(this.__x(4), this.__y(0), 0);
            this.closeArea.position = cc.v3(this.__x(6), this.__y(0), 0);
            this.closeAreaButton.position = cc.v3(this.__x(6), this.__y(), 0);
        }
    };
    Object.defineProperty(SolitaireGameDesktopUI.prototype, "SolitaireJuEventTarget", {
        get: function () { return this.node; },
        enumerable: false,
        configurable: true
    });
    SolitaireGameDesktopUI.prototype.OnSolitaireDesktopEvent = function (ju, eventTyp, data) {
        var _this = this;
        switch (eventTyp) {
            case SolitaireEvent_1.SolitaireEvent.SC_INIT:
                this.HandleModelEventInit(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB:
                this._bIsUISubscrib = true;
                this.BindBV(ju.foundationCounts, function (count) { return count >= 0 && ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.GetFoundation(count)); }, false);
                this.BindBV(ju.flipCloseCardsCountBV, function () {
                    var spIndex = ju.IsCanReflip() ? 0 : 1;
                    _this.mui_closeAreaBottomSprite.spriteFrame = _this.md_closeAreaSpriteFrameList[spIndex];
                }, true);
                break;
        }
        if (!this._bIsUISubscrib) {
            return;
        }
        // 开启了 UI 订阅以后，才响应这些类型的处理
        switch (eventTyp) {
            case SolitaireEvent_1.SolitaireEvent.SC_INIT: break;
            case SolitaireEvent_1.SolitaireEvent.SC_UI_SUBSCRIB: break;
            case SolitaireEvent_1.SolitaireEvent.SC_TIME_CHANGED: break;
            case SolitaireEvent_1.SolitaireEvent.SC_PLAY:
                this.HandleModelEventPlay(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_SEND_POKERS:
                this.HandleModelEventSendPokers(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_FLIP_POKER:
                this.HandleFlipPoker(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_CLOSE_TO_OPEN:
                this.HandleMovePokerFromCloseToOpen(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FROM_CLOSE_TO_OPEN:
                this.HandleMovePokersFromCloseToOpen(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_RECEIVE:
                this.HandleMovePokerFormPlayToReceive(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_RECEIVE:
                this.HandleMoveFromOpenToReceive(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_RECEIVE:
                this.HandleMovePokerFormPlayToReceive(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_RECEIVE:
                this.HandleMoveFromOpenToReceive(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_RECEIVE:
                this.HandleMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_OPEN_TO_PLAY:
                this.HandleMovePokerFromOpenToPlay(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_PLAY_TO_PLAY:
                this.HandleMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FROM_RECEIVE_TO_PLAY:
                this.HandleMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_PLAY_TO_PLAY:
                this.HandleMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_RECEIVE_TO_PLAY:
                this.HandleMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_FROM_OPEN_TO_PLAY:
                this.HandleMovePokerFromOpenToPlay(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FROM_PLAY_TO_PLAY:
                this.HandleMovePokersToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKERS_FROM_PLAY_TO_PLAY:
                this.HandleMovePokersToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_ALL_POKERS_FROM_OPEN_TO_CLOSE:
                this.HandleMoveAllPokersFromOpenToClose(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_DRAG_POKER_NO_CHANGE:
                this.HandleMovePokerNoChange(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_CLICK_POKER_NO_CHANGE:
                this.HandleClickPokerNoChange(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_PLAY_TO_PLAY:
                this.HandleUndoMovePokersToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_PLAY:
                this.HandleUndoMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_OPEN:
                this.HandleUndoMovePokerToOpen(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_OPEN:
                this.HandleUndoMovePokerToOpen(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_PLAY_TO_RECEIVE:
                this.HandleUndoMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_RECEIVE_TO_PLAY:
                this.HandleUndoMovePokerToTarget(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_ALL_POKERS_FOR_UNDO_FROM_CLOSE_TO_OPEN:
                this.HandleMoveAllPokersForUndoFromCloseToOpen(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKER_FOR_UNDO_FROM_OPEN_TO_CLOSE:
                this.HandleMovePokerForUndoFromOpenToClose(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_MOVE_POKERS_FOR_UNDO_FROM_OPEN_TO_CLOSE:
                this.HandleMovePokersForUndoFromOpenToClose(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_REFRESH_POKERS:
                this.HandleRefreshPokers(data);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_WIN:
                this.HandleGameWin(ju);
                break;
            case SolitaireEvent_1.SolitaireEvent.SC_LOSE:
                this.HandleGameLose(ju);
                break;
            default: break;
        }
    };
    SolitaireGameDesktopUI.prototype.HandleModelEventInit = function (pokers) {
        var _this = this;
        // 创建所有扑克牌UI
        var skin = SolitaireLogic_1.SolitaireLogic.skin.skinBV.v;
        pokers.forEach(function (poker) {
            var uiPoker = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIPoker.key, poker).Init(skin.faceSkin, skin.backSkin, skin.frontSkin);
            uiPoker.node.position = cc.v3(0, 0, 0);
            _this.pokerRoot.addChild(uiPoker.node);
            _this.m_UIPokerList.push(uiPoker);
            uiPoker.SetTouchDelegate(_this);
        });
    };
    SolitaireGameDesktopUI.prototype.HandleModelEventPlay = function (ju) {
        {
            var pokers = ju.CloseAreaGroup.pokers;
            for (var i = pokers.length - 1; i >= 0; --i) {
                var poker = pokers[i];
                ii.UIUtil.transferTo(poker.view.node, this.closeArea);
                poker.view.node.zIndex = poker.indexInGroup;
                poker.view.node.position = this.positionInTarget(poker);
            }
        }
        {
            var pokers = ju.OpenAreaGroup.pokers;
            for (var i = pokers.length - 1; i >= 0; --i) {
                var poker = pokers[i];
                ii.UIUtil.transferTo(poker.view.node, this.openArea);
                poker.view.node.zIndex = poker.indexInGroup;
                poker.view.node.position = this.positionInTarget(poker);
            }
        }
        {
            for (var playIndex = 0; playIndex < 7; ++playIndex) {
                var group = ju.PlayGroups[playIndex];
                var pokers = group.pokers;
                for (var i = pokers.length - 1; i >= 0; --i) {
                    var poker = pokers[i];
                    ii.UIUtil.transferTo(poker.view.node, this.playAreaList[playIndex]);
                    poker.view.node.zIndex = poker.indexInGroup;
                    poker.view.node.position = this.positionInTarget(poker);
                }
            }
        }
        {
            for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
                var group = ju.ReceiveGroups[receiveIndex];
                var pokers = group.pokers;
                for (var i = pokers.length - 1; i >= 0; --i) {
                    var poker = pokers[i];
                    ii.UIUtil.transferTo(poker.view.node, this.receiveAreaList[receiveIndex]);
                    poker.view.node.zIndex = poker.indexInGroup;
                    poker.view.node.position = this.positionInTarget(poker);
                }
            }
        }
    };
    SolitaireGameDesktopUI.prototype.HandleModelEventSendPokers = function (pokers) {
        var _this = this;
        // 思路：先将计算出目标在当前节点中的位置，移动到该位置后，再改变父节点       
        pokers.forEach(function (poker, index) {
            var speedFactor = 20.0;
            var delay = index / speedFactor;
            var isLast = index === pokers.length - 1;
            // 发牌动画
            ii.UIUtil.transferTo(poker.view.node, _this.actionNode);
            var _a = _this.getTargetAndPositionInParent(poker), position = _a.position, target = _a.target;
            var total_time = _this.__timeOfDistance(poker.view.node.position, position);
            var lastCallback = function () {
                if (isLast) {
                    pokers.forEach(function (p) {
                        if (p.status == SolitaireEnums_1.EPokerStatus.OPEN) {
                            _this.FlipPoker(p);
                        }
                    });
                    _this.emitGlobal(SolitaireGameDesktopUI_1.EVENT_GAMEVIEW_POKERS_READY);
                }
            };
            cc.tween(poker.view.node)
                .delay(delay)
                .call(function () { return ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move); })
                .to(total_time, { position: position })
                .call(function () {
                ii.UIUtil.transferTo(poker.view.node, target);
                poker.view.node.zIndex = poker.indexInGroup;
                lastCallback();
            })
                .start();
        });
    };
    SolitaireGameDesktopUI.prototype.HandleFlipPoker = function (poker) {
        this.FlipPoker(poker);
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokerFromCloseToOpen = function (poker) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.flip);
        this.__FlipAndMoveToTarget(poker);
        // 如果 Open 区域 >= 4 张牌(已包含这张)，那么需要调整下方2张牌的位置
        if (poker.group.pokers.length >= 4) {
            for (var i = 0; i < 2; ++i) {
                this.__AdjustOpenPokerByIndex(-i - 2);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokersFromCloseToOpen = function (pokers) {
        var _this = this;
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.flip);
        pokers.forEach(function (poker) {
            _this.__FlipAndMoveToTarget(poker);
        });
        // 移动多张牌：pokers 下方的牌都移动到目标位置
        var g = this.m_Ju.OpenAreaGroup;
        var preCount = g.pokers.length - pokers.length;
        if (preCount > 3) {
            preCount = 3;
        }
        for (var i = 0; i < preCount; ++i) {
            this.__AdjustOpenPokerByIndex(-i - 1 - pokers.length);
        }
    };
    SolitaireGameDesktopUI.prototype.HandleMoveFromOpenToReceive = function (poker) {
        this.MovePokerToTarget(poker);
        // 还剩下 >=3 张牌的时候，需要调整位置
        var g = this.m_Ju.OpenAreaGroup;
        if (g.pokers.length >= 3) {
            // 顶部 2 张牌需要调整
            for (var i = 0; i < 2; ++i) {
                this.__AdjustOpenPokerByIndex(-1 - i);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokerFormPlayToReceive = function (poker) {
        this.MovePokerToTarget(poker);
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokerFromOpenToPlay = function (poker) {
        this.HandleMovePokerToTarget(poker);
        // 还剩下 >=3 张牌的时候，需要调整位置
        var g = this.m_Ju.OpenAreaGroup;
        if (g.pokers.length >= 3) {
            // 顶部 2 张牌需要调整
            for (var i = 0; i < 2; ++i) {
                this.__AdjustOpenPokerByIndex(-1 - i);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokerToTarget = function (poker) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
        this.MovePokerToTarget(poker);
    };
    SolitaireGameDesktopUI.prototype.HandleMoveAllPokersFromOpenToClose = function (pokers) {
        var _this = this;
        pokers.forEach(function (poker) {
            poker.view.node.stopAllActions();
            _this.__FlipAndMoveToTarget(poker);
        });
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokerNoChange = function (poker) {
        this.MovePokerBack(poker);
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokersToTarget = function (pokers) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
        this.MovePokersToTarget(pokers);
    };
    SolitaireGameDesktopUI.prototype.HandleClickPokerNoChange = function (poker) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.invalid);
        ii.App.ins.p.vibrate.Default();
        this.ShakePoker(poker);
    };
    SolitaireGameDesktopUI.prototype.HandleUndoMovePokersToTarget = function (pokers) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.undo);
        this.MovePokersToTarget(pokers);
    };
    SolitaireGameDesktopUI.prototype.HandleUndoMovePokerToOpen = function (poker) {
        this.HandleUndoMovePokerToTarget(poker);
        // 如果 Open 区域 >= 4 张牌(已包含这张)，那么需要调整下方2张牌的位置
        if (poker.group.pokers.length >= 4) {
            for (var i = 0; i < 2; ++i) {
                this.__AdjustOpenPokerByIndex(-i - 2);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.HandleUndoMovePokerToTarget = function (poker) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.undo);
        this.MovePokerToTarget(poker);
    };
    SolitaireGameDesktopUI.prototype.HandleMoveAllPokersForUndoFromCloseToOpen = function (pokers) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.undo);
        this.MoveAllPokersForUndoFromCloseToOpen(pokers);
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokerForUndoFromOpenToClose = function (poker) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.undo);
        this.__FlipAndMoveToTargetByActionNode(poker);
        // 还剩下 >=3 张牌的时候，需要调整位置
        var g = this.m_Ju.OpenAreaGroup;
        if (g.pokers.length >= 3) {
            // 顶部 2 张牌需要调整
            for (var i = 0; i < 2; ++i) {
                this.__AdjustOpenPokerByIndex(-1 - i);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.HandleMovePokersForUndoFromOpenToClose = function (pokers) {
        ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.undo);
        for (var i = pokers.length - 1; i >= 0; --i) {
            this.__FlipAndMoveToTargetByActionNode(pokers[i]);
        }
        // 需要调整顶部牌位置
        var g = this.m_Ju.OpenAreaGroup;
        var cnt = g.pokers.length;
        var moveCount = 0;
        if (cnt >= 3) {
            moveCount = 2;
        }
        else if (cnt == 2) {
            moveCount = 1;
        }
        // 顶部 2 张牌需要调整
        for (var i = 0; i < moveCount; ++i) {
            this.__AdjustOpenPokerByIndex(-1 - i);
        }
    };
    SolitaireGameDesktopUI.prototype.HandleRefreshPokers = function (pokers) {
        var _this = this;
        pokers.forEach(function (poker) {
            var target = _this.getTargetNode(poker);
            var position = _this.positionInTarget(poker);
            poker.view.node.parent = target;
            poker.view.node.position = position;
            poker.view.node.zIndex = poker.indexInGroup;
            poker.view.Refresh();
        });
        this.emitGlobal(SolitaireGameDesktopUI_1.EVENT_GAMEVIEW_POKERS_READY);
    };
    SolitaireGameDesktopUI.prototype.HandleGameWin = function (ju) {
        this.__RunWinAction(ju, function () {
            SolitaireLogic_1.SolitaireLogic.HandleGameWin(ju, function () {
                // 打开胜利页面
                ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.UIGameWin.key, {
                    ju: ju
                });
            });
        });
    };
    SolitaireGameDesktopUI.prototype.HandleGameLose = function (ju) {
        ii.UIMgr.ins.Open(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.panel.UIGameLose.key, { ju: ju });
    };
    SolitaireGameDesktopUI.prototype.__AdjustOpenPokerByIndex = function (index) {
        var p = this.m_Ju.OpenAreaGroup.GetPoker(index);
        if (p) {
            this.__MovePokerByTimeDirectly(p, this.TIME_MOVE);
        }
    };
    SolitaireGameDesktopUI.prototype.__RunWinAction = function (ju, cb) {
        var _this = this;
        var __cb = ii.Util.onceCall(function () {
            cb();
            ii.UIMgr.ins.DecBlockRef();
        }, 1);
        ii.UIMgr.ins.AddBlockRef();
        // 播放胜利特效后进行回调
        cc.Tween.stopAllByTarget(this.rotateNode);
        this.rotateNode.angle = 0;
        var timeOfOneCircle = 5.25 * 0.5;
        var POKER_VIRTUAL_CNT = 52.5;
        var timeOfPokerInterval = timeOfOneCircle / POKER_VIRTUAL_CNT;
        // 动画描述初步：每一张排移动到右上角后转1圈多后，从左上角切线飞到收牌区；
        // 第一张牌飞到圆周上（和x轴夹角 theta）时，开始转动，直到最后一张牌到圆周上时，棋盘刚好转了一周；此时再转（180 + theta) 角度后第一张牌飞出到目标位置，最后一张牌再转一周      
        var theta = 45;
        // 总共旋转的角度为
        var totalRotate = -(360 + (180 + 2 * theta) + 360);
        var totalRotateTime = -totalRotate * timeOfOneCircle / 360;
        var timePointOfPokerExit = (360 + (180 + 2 * theta)) * timeOfOneCircle / 360;
        var timeOfPokerEnter = 0.2;
        var R = 240;
        // 每一张牌，切入时初始旋转角度为
        var _enterAngle = theta - 90;
        // 计算每一张牌，需要移动到到位置的世界坐标
        var x0 = R * Math.cos(_enterAngle);
        var y0 = -R * Math.sin(_enterAngle);
        var wp = this.rotateNode.convertToWorldSpaceAR(cc.v2(x0, y0));
        var _twp = this.rotateNode.parent.convertToNodeSpaceAR(wp);
        var _twpV3 = cc.v3(_twp.x, _twp.y, 0);
        var _pokerCnt = 0;
        // this.rotateNode.parent
        for (var receiveGroupIndex = 0; receiveGroupIndex < 4; ++receiveGroupIndex) {
            var _receiveGroup = ju.getReceiveGroup(receiveGroupIndex);
            var _loop_1 = function (i) {
                var _poker = _receiveGroup.pokers[i];
                _poker.view.StopAllAction();
                ii.UIUtil.transferTo(_poker.view.node, this_1.rotateNode.parent);
                var _pCnt = _pokerCnt;
                cc.tween(_poker.view.node)
                    .delay(_pokerCnt * timeOfPokerInterval)
                    .call(function (_node) {
                    _node.zIndex = ZIndex.TOP + _pCnt;
                    ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
                })
                    .to(timeOfPokerEnter, { position: _twpV3, angle: _enterAngle })
                    .call(function (_node) {
                    // 移动到转盘
                    ii.UIUtil.transferTo(_node, _this.rotateNode);
                    // 调整旋转角度
                    _node.angle = _enterAngle + _pCnt * 360 / 51;
                    _node.zIndex = POKER_VIRTUAL_CNT - _pCnt;
                })
                    .start();
                if (_pokerCnt == 0) {
                    // 棋盘开始转动
                    cc.tween(this_1.rotateNode)
                        .delay(timeOfPokerEnter)
                        .to(totalRotateTime, { angle: totalRotate })
                        .start();
                    cc.tween(this_1.node)
                        .delay(timeOfPokerEnter + timePointOfPokerExit)
                        .call(function () {
                        _this.__RunWinExitAction(ju, __cb, timeOfPokerInterval, -_enterAngle);
                    })
                        .start();
                }
                ++_pokerCnt;
            };
            var this_1 = this;
            for (var i = _receiveGroup.pokers.length - 1; i >= 0; --i) {
                _loop_1(i);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.__RunWinExitAction = function (ju, cb, timeOfPokerInterval, angleOfExit) {
        var _this = this;
        var _pokerCnt = 0;
        var timeOfPokerExit = 0.2;
        var wp = this.rotateNode.parent.convertToNodeSpaceAR(this.closeArea.convertToWorldSpaceAR(cc.Vec3.ZERO));
        for (var receiveGroupIndex = 0; receiveGroupIndex < 4; ++receiveGroupIndex) {
            var _receiveGroup = ju.getReceiveGroup(receiveGroupIndex);
            var _loop_2 = function (i) {
                var _poker = _receiveGroup.pokers[i];
                var _pCnt = _pokerCnt;
                cc.tween(_poker.view.node)
                    .delay(_pCnt * timeOfPokerInterval)
                    .call(function (_node) {
                    ii.AudioMgr.ins.PlayEffect(SolitaireAudioCfg_1.SolitaireAudioCfg.effect.move);
                    ii.UIUtil.transferTo(_node, _this.rotateNode.parent);
                    _node.zIndex = 52 + _pCnt;
                    _node.angle = angleOfExit;
                })
                    .to(timeOfPokerExit, { position: wp, angle: 0 })
                    .call(function () {
                    if (_pCnt == 51) {
                        cb();
                    }
                })
                    .start();
                ++_pokerCnt;
            };
            for (var i = _receiveGroup.pokers.length - 1; i >= 0; --i) {
                _loop_2(i);
            }
        }
    };
    //#endregion     
    //#region //! Move Action 正真的移动操作部分（每一个 Event Handler 会调用一个 Move 类型的函数）
    SolitaireGameDesktopUI.prototype.MoveAllPokersForUndoFromCloseToOpen = function (pokers) {
        var _this = this;
        pokers.forEach(function (poker) {
            poker.view.StopAllAction();
            _this.__FlipAndMoveToTarget(poker);
        });
    };
    SolitaireGameDesktopUI.prototype.MovePokerBack = function (poker) {
        if (poker.isTop) {
            this.MovePokerToTarget(poker, false);
        }
        else {
            var pokerIndex = poker.indexInGroup;
            var pokerLength = poker.group.pokers.length;
            for (var abovePokerIndex = pokerIndex; abovePokerIndex < pokerLength; ++abovePokerIndex) {
                var abovePoker = poker.group.GetPoker(abovePokerIndex);
                this.MovePokerToTarget(abovePoker, false);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.ShakePoker = function (poker) {
        if (poker.isTop) {
            this.__ShakePoker(poker);
        }
        else {
            var pokerIndex = poker.indexInGroup;
            var pokerLength = poker.group.pokers.length;
            for (var abovePokerIndex = pokerIndex; abovePokerIndex < pokerLength; ++abovePokerIndex) {
                var abovePoker = poker.group.GetPoker(abovePokerIndex);
                this.__ShakePoker(abovePoker);
            }
        }
    };
    SolitaireGameDesktopUI.prototype.__ShakePoker = function (poker) {
        var _this = this;
        poker.view.StopAllAction();
        var SHAKE_DX = 4.0;
        var SHAKE_HALF_TIME = 0.05;
        var __StopCall = function (p) {
            cc.Tween.stopAllByTarget(p.node);
            var tpos = _this.positionInTarget(p.vm);
            p.node.position = tpos;
        };
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .by(SHAKE_HALF_TIME, { position: cc.v3(-SHAKE_DX, 0, 0) })
            .by(SHAKE_HALF_TIME * 2, { position: cc.v3(SHAKE_DX * 2, 0, 0) })
            .by(SHAKE_HALF_TIME, { position: cc.v3(-SHAKE_DX, 0, 0) })
            .call(function () {
            poker.view.RemoveStopCall(__StopCall);
            __StopCall(poker.view);
        })
            .start();
    };
    SolitaireGameDesktopUI.prototype.__FlipAndMoveToTarget = function (poker) {
        poker.view.Refresh();
        var target = this.getTargetNode(poker);
        ii.UIUtil.transferTo(poker.view.node, target);
        poker.view.node.zIndex = poker.indexInGroup;
        // 移动的时间应该是固定的，才会比较有层次感
        this.__MovePokerByTimeDirectly(poker, this.TIME_MOVE);
    };
    SolitaireGameDesktopUI.prototype.__FlipAndMoveToTargetByActionNode = function (poker) {
        poker.view.StopAllAction();
        poker.view.Refresh();
        ii.UIUtil.transferTo(poker.view.node, this.actionNode);
        var _a = this.getTargetAndPositionInParent(poker), position = _a.position, target = _a.target;
        var time = this.__timeOfDistance(position, poker.view.node.position);
        var __StopCall = function (p) {
            p.node.position = position;
            ii.UIUtil.transferTo(p.node, target);
            p.node.zIndex = p.vm.indexInGroup;
        };
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .to(time, { position: position })
            .call(function (node) {
            poker.view.RemoveStopCall(__StopCall);
            __StopCall(poker.view);
        })
            .start();
    };
    SolitaireGameDesktopUI.prototype.MovePokerToTarget = function (poker, resetZIndex) {
        if (resetZIndex === void 0) { resetZIndex = true; }
        poker.view.StopAllAction();
        ii.UIUtil.transferTo(poker.view.node, this.actionNode);
        var _a = this.getTargetAndPositionInParent(poker), position = _a.position, target = _a.target;
        var time = this.__timeOfDistance(position, poker.view.node.position);
        var __StopCall = function (p) {
            p.node.position = position;
            ii.UIUtil.transferTo(p.node, target);
            if (resetZIndex) {
                p.node.zIndex = poker.view.vm.indexInGroup;
            }
        };
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .to(time, { position: position })
            .call(function (node) {
            __StopCall(poker.view);
            poker.view.RemoveStopCall(__StopCall);
        })
            .start();
    };
    SolitaireGameDesktopUI.prototype.MovePokersToTarget = function (pokers) {
        for (var pokerIndex = pokers.length - 1; pokerIndex >= 0; --pokerIndex) {
            var poker = pokers[pokerIndex];
            this.MovePokerToTarget(poker);
        }
    };
    SolitaireGameDesktopUI.prototype.FlipPoker = function (poker) {
        poker.view.StopAllAction();
        var __StopCall = function (p) { p.Refresh(); p.node.scaleX = 1; };
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .to(this.TIME_FLIP_HALF, { scaleX: 0 })
            .call(function () { poker.view.Refresh(); })
            .to(this.TIME_FLIP_HALF, { scaleX: 1 })
            .call(function () {
            poker.view.RemoveStopCall(__StopCall);
        })
            .start();
    };
    SolitaireGameDesktopUI.prototype.__MovePokerByTimeDirectly = function (poker, time) {
        poker.view.StopAllAction();
        var targetPosition = this.positionInTarget(poker);
        var __StopCall = function (p) { p.node.position = targetPosition; };
        poker.view.AddStopActionCall(__StopCall);
        cc.tween(poker.view.node)
            .to(time, { position: targetPosition })
            .call(function () { return poker.view.RemoveStopCall(__StopCall); })
            .start();
    };
    //#endregion
    //#region //! 辅助函数
    SolitaireGameDesktopUI.prototype.topZIndexByPoker = function (poker) {
        return this.topZIndex(poker.location, poker.groupIndex);
    };
    SolitaireGameDesktopUI.prototype.topZIndex = function (location, index) {
        if (index === void 0) { index = 0; }
        this.__setZIndex(location, index, ZIndex.TOP);
    };
    SolitaireGameDesktopUI.prototype.__setZIndex = function (location, index, targetZIndex) {
        switch (location) {
            case SolitaireEnums_1.ELocation.PLAY:
                this.closeArea.zIndex = ZIndex.NORMAL;
                this.openArea.zIndex = ZIndex.NORMAL;
                this.playAreaList.forEach(function (node, i) { return node.zIndex = (i === index) ? targetZIndex : ZIndex.NORMAL; });
                this.receiveAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
                break;
            case SolitaireEnums_1.ELocation.OPEN:
                this.closeArea.zIndex = ZIndex.NORMAL;
                this.openArea.zIndex = targetZIndex;
                this.playAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
                this.receiveAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
                break;
            case SolitaireEnums_1.ELocation.CLOSE:
                this.closeArea.zIndex = targetZIndex;
                this.openArea.zIndex = ZIndex.NORMAL;
                this.playAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
                this.receiveAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
                break;
            default:
                console.assert(location == SolitaireEnums_1.ELocation.RECEIVE);
                this.closeArea.zIndex = ZIndex.NORMAL;
                this.openArea.zIndex = ZIndex.NORMAL;
                this.playAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
                this.receiveAreaList.forEach(function (node, i) { return node.zIndex = (i === index) ? targetZIndex : ZIndex.NORMAL; });
                break;
        }
    };
    SolitaireGameDesktopUI.prototype.resetZIndex = function () {
        this.closeArea.zIndex = ZIndex.NORMAL;
        this.openArea.zIndex = ZIndex.NORMAL;
        this.playAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
        this.receiveAreaList.forEach(function (node) { return node.zIndex = ZIndex.NORMAL; });
    };
    SolitaireGameDesktopUI.prototype.getReceiveIndexByUIPoker = function (uiPoker) {
        var wp = uiPoker.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        for (var receiveIndex = 0; receiveIndex < 4; ++receiveIndex) {
            var receiveNode = this.receiveAreaList[receiveIndex];
            var rwp = receiveNode.convertToWorldSpaceAR(cc.Vec3.ZERO);
            if (Math.abs(rwp.x - wp.x) < 60 && Math.abs(rwp.y - wp.y) < 100) {
                return receiveIndex;
            }
        }
        return -1;
    };
    // 提供给拖拽判定的 API
    SolitaireGameDesktopUI.prototype.getPlayIndexByPoker = function (poker) {
        var isPokerInPlay = poker.location == SolitaireEnums_1.ELocation.PLAY;
        var wp = poker.view.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        for (var groupIndex = 0; groupIndex < 7; ++groupIndex) {
            if (isPokerInPlay && poker.groupIndex === groupIndex) {
                continue;
            }
            var playGroup = this.m_Ju.getPlayGroup(groupIndex);
            var node = (playGroup.top === null) ? this.playAreaList[groupIndex] : playGroup.top.view.node;
            var wp0 = node.convertToWorldSpaceAR(cc.Vec3.ZERO);
            if (wp0.x - this.POKER_WIDTH < wp.x && wp.x < wp0.x + this.POKER_WIDTH
                && wp0.y - this.POKER_HEIGHT < wp.y && wp.y < wp0.y + this.POKER_HEIGHT) {
                return groupIndex;
            }
        }
        return -1;
    };
    SolitaireGameDesktopUI.prototype.getTargetNode = function (poker) {
        var location = poker.location;
        var groupIndex = poker.groupIndex;
        switch (location) {
            case SolitaireEnums_1.ELocation.PLAY:
                return this.playAreaList[groupIndex];
            case SolitaireEnums_1.ELocation.OPEN:
                return this.openArea;
            case SolitaireEnums_1.ELocation.CLOSE:
                return this.closeArea;
            default:
                console.assert(location == SolitaireEnums_1.ELocation.RECEIVE);
                return this.receiveAreaList[groupIndex];
        }
    };
    SolitaireGameDesktopUI.prototype.positionInTarget = function (poker) {
        var location = poker.location;
        switch (location) {
            case SolitaireEnums_1.ELocation.PLAY:
                var pokerIdx = poker.indexInGroup;
                var rootPokerIndex = poker.group.rootOpenPoker.indexInGroup;
                if (pokerIdx <= rootPokerIndex) {
                    return cc.v3(0, -SolitaireGameDesktopUI_1.PLAY_CLOSE_POKER_PADDING_Y * pokerIdx, 0);
                }
                else {
                    return cc.v3(0, -SolitaireGameDesktopUI_1.PLAY_CLOSE_POKER_PADDING_Y * rootPokerIndex - SolitaireGameDesktopUI_1.PLAY_OPEN_POKER_PADDING_Y * (pokerIdx - rootPokerIndex), 0);
                }
            case SolitaireEnums_1.ELocation.OPEN:
                var pokerIndex = poker.indexInGroup;
                var pokerLength = poker.group.pokers.length;
                if (pokerLength >= 3) {
                    if (pokerIndex == pokerLength - 1) {
                        return cc.v3(this.PADDING_PLAY, 0, 0);
                    }
                    else if (pokerIndex == pokerLength - 2) {
                        return cc.v3(this.PADDING_PLAY / 2, 0, 0);
                    }
                    else {
                        return cc.Vec3.ZERO;
                    }
                }
                else if (pokerLength == 2) {
                    if (pokerIndex == pokerLength - 1) {
                        return cc.v3(this.PADDING_PLAY / 2, 0, 0);
                    }
                    else {
                        return cc.Vec3.ZERO;
                    }
                }
                else {
                    return cc.Vec3.ZERO;
                }
            case SolitaireEnums_1.ELocation.CLOSE:
                return cc.Vec3.ZERO;
            default:
                console.assert(location == SolitaireEnums_1.ELocation.RECEIVE);
                return cc.Vec3.ZERO;
        }
    };
    // 获得扑克牌目标位置在当前父节点下的位置
    SolitaireGameDesktopUI.prototype.getTargetAndPositionInParent = function (poker) {
        var target = this.getTargetNode(poker);
        var tpos = this.positionInTarget(poker);
        var wtpos = target.convertToWorldSpaceAR(tpos);
        var position = poker.view.node.parent.convertToNodeSpaceAR(wtpos);
        return { target: target, position: position };
    };
    SolitaireGameDesktopUI.prototype.__timeOfDistance = function (from, to, speedFactor) {
        if (speedFactor === void 0) { speedFactor = 1; }
        var distance = cc.Vec3.distance(from, to);
        var speed = 1500 * speedFactor;
        var total_time = distance / speed;
        return total_time;
    };
    SolitaireGameDesktopUI.prototype.OnDragTouchStart = function (uiPoker, event) {
        var _this = this;
        if (this.m_isTouchStart) {
            return false;
        }
        if (!uiPoker.DragStartTest()) {
            this.ClickUIPoker(uiPoker);
            return;
        }
        this.m_isTouchStart = true;
        this.m_isDragStart = false;
        this.m_MoveCount = 0;
        this.m_EventTouch = event;
        this.StartScheduler("JU_TOUCH_TIME", function () {
            if (!_this.m_isDragStart) {
                _this.m_isDragStart = true;
                uiPoker.OnDragStart(_this.m_EventTouch);
            }
        }, 0.3, 1);
        return true;
    };
    SolitaireGameDesktopUI.prototype.OnDragTouchMove = function (uiPoker, event) {
        if (!this.m_isTouchStart) {
            return;
        }
        if (this.m_isDragStart) {
            uiPoker.OnDragMove(event);
        }
        else {
            ++this.m_MoveCount;
            if (this.m_MoveCount > 5) {
                this.StopScheduler("JU_TOUCH_TIME");
                this.m_isDragStart = true;
                this.topZIndexByPoker(uiPoker.vm);
                uiPoker.OnDragStart(event);
            }
            else {
                this.m_EventTouch = event;
            }
        }
    };
    SolitaireGameDesktopUI.prototype.OnDragTouchEnd = function (uiPoker, event) {
        if (!this.m_isTouchStart) {
            return;
        }
        this.m_isTouchStart = false;
        this.StopScheduler("JU_TOUCH_TIME");
        if (this.m_isDragStart) {
            this.m_isDragStart = false;
            this.m_MoveCount = 0;
            uiPoker.OnDragEnd();
            this.resetZIndex();
            // 拖拽到 Play 区
            var playIndex = this.getPlayIndexByPoker(uiPoker.vm);
            if (playIndex !== -1) {
                this.m_Ju.OnDragToPlay(uiPoker.vm, playIndex);
                return;
            }
            // 拖拽到 Receive 区 
            var receiveIndex = this.getReceiveIndexByUIPoker(uiPoker);
            if (receiveIndex !== -1) {
                this.m_Ju.OnDragToReceive(uiPoker.vm, receiveIndex);
                return;
            }
            // 无效的拖拽
            this.MovePokerBack(uiPoker.vm);
        }
        else {
            this.ClickUIPoker(uiPoker);
        }
    };
    SolitaireGameDesktopUI.prototype.ClickUIPoker = function (uiPoker) {
        // 点击事件
        var location = uiPoker.vm.location;
        switch (location) {
            case SolitaireEnums_1.ELocation.PLAY:
                if (uiPoker.isOpen()) {
                    this.m_Ju.OnPlayPokerClick(uiPoker.vm);
                }
                break;
            case SolitaireEnums_1.ELocation.CLOSE:
                if (uiPoker.vm.isTop) {
                    this.m_Ju.OnClosePokerClick(uiPoker.vm);
                }
                break;
            case SolitaireEnums_1.ELocation.OPEN:
                if (uiPoker.vm.isTop) {
                    this.m_Ju.OnOpenPokerClick(uiPoker.vm);
                }
                break;
            default:
                console.assert(location === SolitaireEnums_1.ELocation.RECEIVE);
                this.m_Ju.OnReceivePokerClick(uiPoker.vm);
                break;
        }
    };
    var SolitaireGameDesktopUI_1;
    //#endregion
    //#region //! Data
    SolitaireGameDesktopUI.EVENT_GAMEVIEW_POKERS_READY = 'EVENT_GAMEVIEW_POKERS_READY';
    //#endregion
    //#region //! 界面几个区域之间的布局
    SolitaireGameDesktopUI.PLAY_CLOSE_POKER_PADDING_Y = 20;
    SolitaireGameDesktopUI.PLAY_OPEN_POKER_PADDING_Y = 40;
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitaireGameDesktopUI.prototype, "bgSprite", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitaireGameDesktopUI.prototype, "bgPatternSprite", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "_bottomMenuContainer", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "actionNode", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "mui_Container_Hint", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "pokerRoot", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "closeAreaButton", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "closeArea", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "closeAreaBackground", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "openArea", void 0);
    __decorate([
        property({ type: cc.Node, visible: true })
    ], SolitaireGameDesktopUI.prototype, "rotateNode", void 0);
    __decorate([
        property({ type: [cc.Node], visible: true })
    ], SolitaireGameDesktopUI.prototype, "receiveAreaList", void 0);
    __decorate([
        property({ type: [cc.Node], visible: true })
    ], SolitaireGameDesktopUI.prototype, "playAreaList", void 0);
    __decorate([
        property({ type: cc.Sprite, visible: true })
    ], SolitaireGameDesktopUI.prototype, "mui_closeAreaBottomSprite", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true })
    ], SolitaireGameDesktopUI.prototype, "md_closeAreaSpriteFrameList", void 0);
    __decorate([
        ii.Util.block(0.5)
    ], SolitaireGameDesktopUI.prototype, "OnClickCloseBottom", null);
    SolitaireGameDesktopUI = SolitaireGameDesktopUI_1 = __decorate([
        ccclass
    ], SolitaireGameDesktopUI);
    return SolitaireGameDesktopUI;
}(ii.UIComp));
exports.default = SolitaireGameDesktopUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxTb2xpdGFpcmVHYW1lRGVza3RvcFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZEQUE0RDtBQUM1RCw2REFBNEQ7QUFDNUQsbURBQWtEO0FBQ2xELHVEQUErRDtBQUMvRCx1REFBc0Q7QUFDdEQsK0RBQThEO0FBQzlELHlFQUF3RTtBQVN4RSxJQUFNLE1BQU0sR0FBRztJQUNYLE1BQU0sRUFBRSxDQUFDO0lBQ1QsR0FBRyxFQUFFLEdBQUc7Q0FDWCxDQUFBO0FBRUssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBb0QsMENBQWM7SUFBbEU7UUFBQSxxRUFxNkJDO1FBcDZCRyxnQkFBZ0I7UUFDaUMsY0FBUSxHQUFjLElBQUksQ0FBQTtRQUMxQixxQkFBZSxHQUFjLElBQUksQ0FBQTtRQUNuQywwQkFBb0IsR0FBWSxJQUFJLENBQUEsQ0FBQyxnQkFBZ0I7UUFDckQsZ0JBQVUsR0FBWSxJQUFJLENBQUEsQ0FBQyx1QkFBdUI7UUFDbEQsd0JBQWtCLEdBQVksSUFBSSxDQUFBLENBQUMsZ0JBQWdCO1FBQ25ELGVBQVMsR0FBWSxJQUFJLENBQUEsQ0FBQyx3QkFBd0I7UUFDbEQscUJBQWUsR0FBWSxJQUFJLENBQUE7UUFDL0IsZUFBUyxHQUFZLElBQUksQ0FBQTtRQUN6Qix5QkFBbUIsR0FBWSxJQUFJLENBQUE7UUFDbkMsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUN4QixnQkFBVSxHQUFZLElBQUksQ0FBQTtRQUN4QixxQkFBZSxHQUFjLEVBQUUsQ0FBQTtRQUMvQixrQkFBWSxHQUFjLEVBQUUsQ0FBQTtRQUM1QiwrQkFBeUIsR0FBYyxJQUFJLENBQUE7UUFDcEMsaUNBQTJCLEdBQXFCLEVBQUUsQ0FBQTtR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QUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7OERBQW1DO0lBQ2hDO1FBQXhDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7bUVBQXdDO0lBQ3ZDO1FBQXhDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7Z0VBQXFDO0lBQ3BDO1FBQXhDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQzs2RUFBb0Q7SUFDNUM7UUFBL0MsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQzsrRUFBMkQ7SUFxRDFHO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO29FQUdsQjtJQXZFZ0Isc0JBQXNCO1FBRDFDLE9BQU87T0FDYSxzQkFBc0IsQ0FxNkIxQztJQUFELDZCQUFDO0NBcjZCRCxBQXE2QkMsQ0FyNkJtRCxFQUFFLENBQUMsTUFBTSxHQXE2QjVEO2tCQXI2Qm9CLHNCQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvbGl0YWlyZURhdGFDYWNoZSB9IGZyb20gXCIuLi8uLi9EYXRhQ2FjaGUvU29saXRhaXJlRGF0YUNhY2hlXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVMb2dpYyB9IGZyb20gXCIuLi8uLi9Mb2dpYy9Tb2xpdGFpcmVMb2dpY1wiO1xuaW1wb3J0IHsgU29saXRhaXJlQXVkaW9DZmcgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlQXVkaW9DZmdcIjtcbmltcG9ydCB7IFNvbGl0YWlyZUNmZyB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVDZmdcIjtcbmltcG9ydCB7IEVMb2NhdGlvbiwgRVBva2VyU3RhdHVzIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZUVudW1zXCI7XG5pbXBvcnQgeyBTb2xpdGFpcmVFdmVudCB9IGZyb20gXCIuLi8uLi9Tb2xpdGFpcmVFdmVudFwiO1xuaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlU3ByaXRlRnJhbWVDZmcgfSBmcm9tIFwiLi4vLi4vU29saXRhaXJlU3ByaXRlRnJhbWVDZmdcIjtcbmltcG9ydCBQb2tlciBmcm9tIFwiLi4vTW9kZWwvUG9rZXJcIjtcbmltcG9ydCB7IElTb2xpdGFpcmVKdUV2ZW50TGlzdGVuZXIsIFNvbGl0YWlyZUp1IH0gZnJvbSBcIi4uL01vZGVsL1NvbGl0YWlyZUp1XCI7XG5pbXBvcnQgU29saXRhaXJlR2FtZUJvdHRvbU1lbnVVSSwgeyBTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJQXJncyB9IGZyb20gXCIuL1NvbGl0YWlyZUdhbWVCb3R0b21NZW51VUlcIjtcbmltcG9ydCB7IFVJR2FtZUxvc2VBcmdzIH0gZnJvbSBcIi4vVUlHYW1lTG9zZVwiO1xuaW1wb3J0IHsgVUlHYW1lV2luQXJncyB9IGZyb20gXCIuL1VJR2FtZVdpblwiO1xuaW1wb3J0IFVJSGludE1nciwgeyBVSUhpbnRNZ3JBcmdzIH0gZnJvbSBcIi4vVUlIaW50TWdyXCI7XG5pbXBvcnQgVUlQb2tlciBmcm9tIFwiLi9VSVBva2VyXCI7XG5cbmNvbnN0IFpJbmRleCA9IHtcbiAgICBOT1JNQUw6IDAsXG4gICAgVE9QOiA5OTksXG59XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbGl0YWlyZUdhbWVEZXNrdG9wVUkgZXh0ZW5kcyBpaS5VSUNvbXA8YW55PiBpbXBsZW1lbnRzIElTb2xpdGFpcmVKdUV2ZW50TGlzdGVuZXJ7XG4gICAgLy8jcmVnaW9uIC8vISBVSVxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBiZ1Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBiZ1BhdHRlcm5TcHJpdGU6IGNjLlNwcml0ZSA9IG51bGwgXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBfYm90dG9tTWVudUNvbnRhaW5lcjogY2MuTm9kZSA9IG51bGwgLyoqIOW6lemDqOiPnOWNleagj+WuueWZqOiKgueCuSAqL1xuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgYWN0aW9uTm9kZTogY2MuTm9kZSA9IG51bGwgLy8g6L6F5Yqp5Yqo55S755qE6IqC54K577yM5omR5YWL55qE56e75Yqo5Zyo5q2k6IqC54K55Lit6L+b6KGMXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSBtdWlfQ29udGFpbmVyX0hpbnQ6IGNjLk5vZGUgPSBudWxsIC8qKiDmj5DphpLlip/og73miYDlnKjnmoToioLngrkgKi9cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIHBva2VyUm9vdDogY2MuTm9kZSA9IG51bGwgLy8gcG9rZXJSb290IOiKgueCueWcqOWxj+W5leS4iuaWueS4reeCueWkhCBcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIGNsb3NlQXJlYUJ1dHRvbjogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIGNsb3NlQXJlYTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIGNsb3NlQXJlYUJhY2tncm91bmQ6IGNjLk5vZGUgPSBudWxsIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgb3BlbkFyZWE6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSByb3RhdGVOb2RlOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuTm9kZV0sdmlzaWJsZTp0cnVlfSkgcHJpdmF0ZSByZWNlaXZlQXJlYUxpc3Q6IGNjLk5vZGVbXSA9IFtdXG4gICAgQHByb3BlcnR5KHt0eXBlOltjYy5Ob2RlXSx2aXNpYmxlOnRydWV9KSBwcml2YXRlIHBsYXlBcmVhTGlzdDogY2MuTm9kZVtdID0gW11cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU3ByaXRlLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgbXVpX2Nsb3NlQXJlYUJvdHRvbVNwcml0ZTogY2MuU3ByaXRlID0gbnVsbFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuU3ByaXRlRnJhbWVdLHZpc2libGU6dHJ1ZX0pIHByaXZhdGUgbWRfY2xvc2VBcmVhU3ByaXRlRnJhbWVMaXN0OiBjYy5TcHJpdGVGcmFtZVtdID0gW11cbiAgICBnZXQgQ2xvc2VBcmVhQmFja2dyb3VuZCgpOiBjYy5Ob2RlIHsgcmV0dXJuIHRoaXMuY2xvc2VBcmVhQmFja2dyb3VuZDsgfVxuICAgIGdldCBSZWNlaXZlQXJlYUxpc3QoKTogY2MuTm9kZVtdIHsgcmV0dXJuIHRoaXMucmVjZWl2ZUFyZWFMaXN0OyB9XG4gICAgZ2V0IFBsYXlBcmVhTGlzdCgpOiBjYy5Ob2RlW10geyByZXR1cm4gdGhpcy5wbGF5QXJlYUxpc3Q7IH1cbiAgICBnZXQgT3BlbkFyZWEoKTogY2MuTm9kZSB7IHJldHVybiB0aGlzLm9wZW5BcmVhOyB9XG4gICAgZ2V0IENsb3NlQXJlYSgpOiBjYy5Ob2RlIHsgcmV0dXJuIHRoaXMuY2xvc2VBcmVhOyB9XG4gICAgLy8jZW5kcmVnaW9uXG5cbiAgICAvLyNyZWdpb24gLy8hIERhdGFcbiAgICBzdGF0aWMgcmVhZG9ubHkgRVZFTlRfR0FNRVZJRVdfUE9LRVJTX1JFQURZOiBzdHJpbmcgPSAnRVZFTlRfR0FNRVZJRVdfUE9LRVJTX1JFQURZJ1xuICAgIHByaXZhdGUgcmVhZG9ubHkgUE9LRVJfV0lEVEg6IG51bWJlciA9IDgyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgUE9LRVJfSEVJR0hUOiBudW1iZXIgPSAxMjY7XG4gICAgcHJpdmF0ZSByZWFkb25seSBUSU1FX01PVkU6IG51bWJlciA9IDAuMjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IFRJTUVfRkxJUF9IQUxGOiBudW1iZXIgPSAwLjI7XG4gICAgcHJpdmF0ZSBtX1VJUG9rZXJMaXN0OiBVSVBva2VyW10gPSBbXVxuICAgIHByaXZhdGUgbV9VSUhpbnRNZ3I6IFVJSGludE1nciA9IG51bGxcbiAgICAvLyNlbmRyZWdpb25cbiAgICBcbiAgICAvLyNyZWdpb24gLy8hIOeVjOmdouWHoOS4quWMuuWfn+S5i+mXtOeahOW4g+WxgFxuICAgIHN0YXRpYyByZWFkb25seSBQTEFZX0NMT1NFX1BPS0VSX1BBRERJTkdfWTogbnVtYmVyID0gMjA7XG4gICAgc3RhdGljIHJlYWRvbmx5IFBMQVlfT1BFTl9QT0tFUl9QQURESU5HX1k6IG51bWJlciA9IDQwO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgT0ZGU0VUX1RPUDogbnVtYmVyID0gMjAwOyAvLyDmlLbniYzljLrot53nprvpobbpg6jnmoTot53nprtcbiAgICBwdWJsaWMgcmVhZG9ubHkgUEFERElOR19QTEFZOiBudW1iZXIgPSA5MDtcbiAgICBwcml2YXRlIF9feChpbmRleDogbnVtYmVyKTogbnVtYmVyeyByZXR1cm4gLTI3MCtpbmRleCp0aGlzLlBBRERJTkdfUExBWSB9XG4gICAgcHJpdmF0ZSBfX3kobGluZTogbnVtYmVyID0gMCwgcG9rZXJJbmRleDogbnVtYmVyID0gMCk6IG51bWJlciB7IGxldCB5ID0gLXRoaXMuT0ZGU0VUX1RPUC1saW5lKjE0MC1Tb2xpdGFpcmVHYW1lRGVza3RvcFVJLlBMQVlfQ0xPU0VfUE9LRVJfUEFERElOR19ZKnBva2VySW5kZXg7IHJldHVybiB5OyB9XG4gICAgLy8jZW5kcmVnaW9uXG4gICAgXG4gICAgcHJpdmF0ZSBtX0RhdGFDYWNoZTogU29saXRhaXJlRGF0YUNhY2hlID0gbnVsbDtcbiAgICBwcml2YXRlIG1fQm90dG9tTWVudVVJOiBTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJID0gbnVsbDtcbiAgICBwcml2YXRlIG1fSnU6IFNvbGl0YWlyZUp1ID0gbnVsbDtcbiAgICAvLyNyZWdpb24gLy8hIOeUn+WRveWRqOacnyBVSUNvbXBcbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIC8vIOWQhOS4quWMuuWfn+S9jee9ruiwg+aVtFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPDc7ICsraSl7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5wbGF5QXJlYUxpc3RbaV1cbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuX194KGkpLCB0aGlzLl9feSgxKSwgMClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2VBcmVhQnV0dG9uLnpJbmRleCA9IC0xXG4gICAgICAgIHRoaXMuYWN0aW9uTm9kZS56SW5kZXggPSBaSW5kZXguVE9QKzFcbiAgICAgICAgdGhpcy5tdWlfQ29udGFpbmVyX0hpbnQuekluZGV4ID0gWkluZGV4LlRPUCsyXG4gICAgICAgIHRoaXMuc2V0UGxhY2VIb2xkZXJWaXNpYWJsZShmYWxzZSlcblxuICAgICAgICB0aGlzLm1fRGF0YUNhY2hlID0gdGhpcy5HZXREYXRhQ2FjaGUoU29saXRhaXJlQ2ZnLlNPTElUQUlSRV9EQVRBQ0FDSEUpO1xuICAgICAgICB0aGlzLm1fQm90dG9tTWVudVVJID0gaWkuVUlNZ3IuaW5zLkNyZWF0ZTxTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJLCBTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5jb21wLlNvbGl0YWlyZUdhbWVCb3R0b21NZW51VUkua2V5LCB7IH0sIHRoaXMuX2JvdHRvbU1lbnVDb250YWluZXIpLkNsb3NlQnkodGhpcyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkNsb3NlQXJlYVwiLCAoKT0+dGhpcy5PbkNsaWNrQ2xvc2VCb3R0b20oKSk7XG4gICAgfVxuICAgIFxuICAgIEBpaS5VdGlsLmJsb2NrKDAuNSlcbiAgICBPbkNsaWNrQ2xvc2VCb3R0b20oKSB7XG4gICAgICAgIHRoaXMubV9KdS5PbkNsaWNrQ2xvc2VCb3R0b20oKVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIEVudGVyKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICB0aGlzLm1fSnUgPSBqdTtcbiAgICAgICAgdGhpcy5zZXRQbGFjZUhvbGRlclZpc2lhYmxlKHRydWUpO1xuICAgICAgICB0aGlzLkJpbmRCVih0aGlzLm1fRGF0YUNhY2hlLmxlZnRIYW5kQlYsIHRoaXMuTGF5b3V0V2l0aEhhbmQuYmluZCh0aGlzKSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuQmluZEJWKFNvbGl0YWlyZUxvZ2ljLnNraW4uc2tpbkJWLCBza2luID0+IHtcbiAgICAgICAgICAgIHRoaXMubV9VSVBva2VyTGlzdC5mb3JFYWNoKHVpUG9rZXIgPT4gdWlQb2tlci5zZXRTa2luKHNraW4pKTtcbiAgICAgICAgICAgIHRoaXMuTG9hZFJlczxjYy5TcHJpdGVGcmFtZT4oU29saXRhaXJlU3ByaXRlRnJhbWVDZmcuYmdTa2luVXJsKHNraW4uYmdTa2luKSwgc3A9PnRoaXMuYmdTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNldEFzc2V0UHJvcGVydHkoXCJCR19TS0lOXCIsIHNwKSwgZmFsc2UsIHRoaXMuVVVJRF9HUk9VUF9LRVkoXCJCR19TS0lOXCIpKVxuICAgICAgICAgICAgdGhpcy5iZ1BhdHRlcm5TcHJpdGUubm9kZS5hY3RpdmUgPSBza2luLmJnUGF0dGVyblNraW4gIT09IC0xXG4gICAgICAgICAgICBpZihza2luLmJnUGF0dGVyblNraW4gPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuTG9hZFJlczxjYy5TcHJpdGVGcmFtZT4oU29saXRhaXJlU3ByaXRlRnJhbWVDZmcuYmdQYXR0ZXJuU2tpblVybChza2luLmJnUGF0dGVyblNraW4pLCBzcD0+dGhpcy5iZ1BhdHRlcm5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLlNldEFzc2V0UHJvcGVydHkoXCJCR19QQVRURVJOX1NLSU5cIiwgc3ApLCBmYWxzZSwgdGhpcy5VVUlEX0dST1VQX0tFWShcIkJHX1BBVFRFUk5fU0tJTlwiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAganUuQWRkRXZlbnRMaXN0ZW5lcih0aGlzKTtcblxuICAgICAgICAvLyDmj5DnpLrlip/og71cbiAgICAgICAgdGhpcy5tX1VJSGludE1nciA9IGlpLlVJTWdyLmlucy5DcmVhdGU8VUlIaW50TWdyLCBVSUhpbnRNZ3JBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuVUlIaW50TWdyLmtleSwge1xuICAgICAgICAgICAganU6IHRoaXMubV9KdSxcbiAgICAgICAgICAgIGRlc2t0b3A6IHRoaXNcbiAgICAgICAgfSwgdGhpcy5tdWlfQ29udGFpbmVyX0hpbnQpO1xuXG4gICAgICAgIHRoaXMubV9Cb3R0b21NZW51VUkuRW50ZXIodGhpcy5tX0p1KVxuICAgIH1cblxuICAgIEV4aXQoanU6IFNvbGl0YWlyZUp1KSB7XG4gICAgICAgIHRoaXMubV9Cb3R0b21NZW51VUkuRXhpdCh0aGlzLm1fSnUpXG4gICAgICAgIHRoaXMubV9VSUhpbnRNZ3IuQ2xvc2UoKTtcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IHRoaXMubV9VSVBva2VyTGlzdC5sZW5ndGgtMTsgaW5kZXggPj0wOyAtLWluZGV4KXtcbiAgICAgICAgICAgIHRoaXMubV9VSVBva2VyTGlzdFtpbmRleF0uQ2xvc2UoKVxuICAgICAgICAgICAgdGhpcy5tX1VJUG9rZXJMaXN0Lmxlbmd0aCA9IHRoaXMubV9VSVBva2VyTGlzdC5sZW5ndGgtMVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGxhY2VIb2xkZXJWaXNpYWJsZShmYWxzZSlcblxuICAgICAgICB0aGlzLl9iSXNVSVN1YnNjcmliID0gZmFsc2U7XG4gICAgICAgIGp1LlJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcyk7XG4gICAgICAgIHRoaXMuVW5iaW5kQWxsQlYoKTtcbiAgICB9XG5cbiAgICAvLyNyZWdpb24gLy8hIFVJIOeahOaYvuekuumakOiXjyDlt6blj7PmiYtcbiAgICBwcml2YXRlIHNldFBsYWNlSG9sZGVyVmlzaWFibGUodmlzaWFibGU6IGJvb2xlYW4pIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTw3OyArK2kpe1xuICAgICAgICAgICAgdGhpcy5wbGF5QXJlYUxpc3RbaV0uYWN0aXZlID0gdmlzaWFibGVcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPDQ7ICsraSl7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVBcmVhTGlzdFtpXS5hY3RpdmUgPSB2aXNpYWJsZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VBcmVhQnV0dG9uLmFjdGl2ZSA9IHZpc2lhYmxlXG4gICAgfVxuICAgIHByaXZhdGUgTGF5b3V0V2l0aEhhbmQoaXNMZWZ0SGFuZDogYm9vbGVhbil7XG4gICAgICAgIGlmKGlzTGVmdEhhbmQpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTw0OyArK2kpe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnJlY2VpdmVBcmVhTGlzdFtpXVxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52Myh0aGlzLl9feCgzK2kpLCB0aGlzLl9feSgwKSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3BlbkFyZWEucG9zaXRpb24gPSBjYy52Myh0aGlzLl9feCgxKSwgdGhpcy5fX3koMCksIDApXG4gICAgICAgICAgICB0aGlzLmNsb3NlQXJlYS5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuX194KDApLCB0aGlzLl9feSgwKSwgMClcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBcmVhQnV0dG9uLnBvc2l0aW9uID0gY2MudjModGhpcy5fX3goMCksIHRoaXMuX195KCksIDApXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTw0OyArK2kpe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnJlY2VpdmVBcmVhTGlzdFtpXVxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52Myh0aGlzLl9feChpKSwgdGhpcy5fX3koMCksIDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9wZW5BcmVhLnBvc2l0aW9uID0gY2MudjModGhpcy5fX3goNCksIHRoaXMuX195KDApLCAwKVxuICAgICAgICAgICAgdGhpcy5jbG9zZUFyZWEucG9zaXRpb24gPSBjYy52Myh0aGlzLl9feCg2KSwgdGhpcy5fX3koMCksIDApXG4gICAgICAgICAgICB0aGlzLmNsb3NlQXJlYUJ1dHRvbi5wb3NpdGlvbiA9IGNjLnYzKHRoaXMuX194KDYpLCB0aGlzLl9feSgpLCAwKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIC8vISBFdmVudFxuICAgIHByaXZhdGUgX2JJc1VJU3Vic2NyaWI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBnZXQgU29saXRhaXJlSnVFdmVudFRhcmdldCgpOiBhbnkgeyByZXR1cm4gdGhpcy5ub2RlOyB9XG4gICAgT25Tb2xpdGFpcmVEZXNrdG9wRXZlbnQoanU6IFNvbGl0YWlyZUp1LCBldmVudFR5cDogU29saXRhaXJlRXZlbnQsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudFR5cCkge1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19JTklUOiB0aGlzLkhhbmRsZU1vZGVsRXZlbnRJbml0KGRhdGEpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfVUlfU1VCU0NSSUI6XG4gICAgICAgICAgICAgICAgdGhpcy5fYklzVUlTdWJzY3JpYiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5CaW5kQlYoanUuZm91bmRhdGlvbkNvdW50cywgY291bnQgPT4gY291bnQgPj0gMCAmJiBpaS5BdWRpb01nci5pbnMuUGxheUVmZmVjdChTb2xpdGFpcmVBdWRpb0NmZy5HZXRGb3VuZGF0aW9uKGNvdW50KSksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLkJpbmRCVihqdS5mbGlwQ2xvc2VDYXJkc0NvdW50QlYsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwSW5kZXg6IG51bWJlciA9IGp1LklzQ2FuUmVmbGlwKCkgPyAwIDogMVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm11aV9jbG9zZUFyZWFCb3R0b21TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLm1kX2Nsb3NlQXJlYVNwcml0ZUZyYW1lTGlzdFtzcEluZGV4XVxuICAgICAgICAgICAgICAgIH0sIHRydWUpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5fYklzVUlTdWJzY3JpYikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIOW8gOWQr+S6hiBVSSDorqLpmIXku6XlkI7vvIzmiY3lk43lupTov5nkupvnsbvlnovnmoTlpITnkIZcbiAgICAgICAgc3dpdGNoIChldmVudFR5cCkge1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19JTklUOiBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfVUlfU1VCU0NSSUI6IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19USU1FX0NIQU5HRUQ6IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19QTEFZOiB0aGlzLkhhbmRsZU1vZGVsRXZlbnRQbGF5KGRhdGEpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfU0VORF9QT0tFUlM6IHRoaXMuSGFuZGxlTW9kZWxFdmVudFNlbmRQb2tlcnMoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX0ZMSVBfUE9LRVI6IHRoaXMuSGFuZGxlRmxpcFBva2VyKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZST01fQ0xPU0VfVE9fT1BFTjogdGhpcy5IYW5kbGVNb3ZlUG9rZXJGcm9tQ2xvc2VUb09wZW4oZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJTX0ZST01fQ0xPU0VfVE9fT1BFTjogdGhpcy5IYW5kbGVNb3ZlUG9rZXJzRnJvbUNsb3NlVG9PcGVuKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZST01fUExBWV9UT19SRUNFSVZFOiB0aGlzLkhhbmRsZU1vdmVQb2tlckZvcm1QbGF5VG9SZWNlaXZlKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZST01fT1BFTl9UT19SRUNFSVZFOiB0aGlzLkhhbmRsZU1vdmVGcm9tT3BlblRvUmVjZWl2ZShkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUl9GUk9NX1BMQVlfVE9fUkVDRUlWRTogdGhpcy5IYW5kbGVNb3ZlUG9rZXJGb3JtUGxheVRvUmVjZWl2ZShkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUl9GUk9NX09QRU5fVE9fUkVDRUlWRTogdGhpcy5IYW5kbGVNb3ZlRnJvbU9wZW5Ub1JlY2VpdmUoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX0RSQUdfUE9LRVJfRlJPTV9SRUNFSVZFX1RPX1JFQ0VJVkU6IHRoaXMuSGFuZGxlTW92ZVBva2VyVG9UYXJnZXQoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJfRlJPTV9PUEVOX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2VyRnJvbU9wZW5Ub1BsYXkoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJfRlJPTV9QTEFZX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2VyVG9UYXJnZXQoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJfRlJPTV9SRUNFSVZFX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2VyVG9UYXJnZXQoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX0RSQUdfUE9LRVJfRlJPTV9QTEFZX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2VyVG9UYXJnZXQoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX0RSQUdfUE9LRVJfRlJPTV9SRUNFSVZFX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2VyVG9UYXJnZXQoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX0RSQUdfUE9LRVJfRlJPTV9PUEVOX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2VyRnJvbU9wZW5Ub1BsYXkoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJTX0ZST01fUExBWV9UT19QTEFZOiB0aGlzLkhhbmRsZU1vdmVQb2tlcnNUb1RhcmdldChkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfRFJBR19QT0tFUlNfRlJPTV9QTEFZX1RPX1BMQVk6IHRoaXMuSGFuZGxlTW92ZVBva2Vyc1RvVGFyZ2V0KGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX0FMTF9QT0tFUlNfRlJPTV9PUEVOX1RPX0NMT1NFOiB0aGlzLkhhbmRsZU1vdmVBbGxQb2tlcnNGcm9tT3BlblRvQ2xvc2UoZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX0RSQUdfUE9LRVJfTk9fQ0hBTkdFOiB0aGlzLkhhbmRsZU1vdmVQb2tlck5vQ2hhbmdlKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19DTElDS19QT0tFUl9OT19DSEFOR0U6IHRoaXMuSGFuZGxlQ2xpY2tQb2tlck5vQ2hhbmdlKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSU19GT1JfVU5ET19GUk9NX1BMQVlfVE9fUExBWTogdGhpcy5IYW5kbGVVbmRvTW92ZVBva2Vyc1RvVGFyZ2V0KGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZPUl9VTkRPX0ZST01fUExBWV9UT19QTEFZOiB0aGlzLkhhbmRsZVVuZG9Nb3ZlUG9rZXJUb1RhcmdldChkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GT1JfVU5ET19GUk9NX1BMQVlfVE9fT1BFTjogdGhpcy5IYW5kbGVVbmRvTW92ZVBva2VyVG9PcGVuKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZPUl9VTkRPX0ZST01fUkVDRUlWRV9UT19PUEVOOiB0aGlzLkhhbmRsZVVuZG9Nb3ZlUG9rZXJUb09wZW4oZGF0YSk7YnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvbGl0YWlyZUV2ZW50LlNDX01PVkVfUE9LRVJfRk9SX1VORE9fRlJPTV9QTEFZX1RPX1JFQ0VJVkU6IHRoaXMuSGFuZGxlVW5kb01vdmVQb2tlclRvVGFyZ2V0KGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19NT1ZFX1BPS0VSX0ZPUl9VTkRPX0ZST01fUkVDRUlWRV9UT19QTEFZOiB0aGlzLkhhbmRsZVVuZG9Nb3ZlUG9rZXJUb1RhcmdldChkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfTU9WRV9BTExfUE9LRVJTX0ZPUl9VTkRPX0ZST01fQ0xPU0VfVE9fT1BFTjogdGhpcy5IYW5kbGVNb3ZlQWxsUG9rZXJzRm9yVW5kb0Zyb21DbG9zZVRvT3BlbihkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUl9GT1JfVU5ET19GUk9NX09QRU5fVE9fQ0xPU0U6IHRoaXMuSGFuZGxlTW92ZVBva2VyRm9yVW5kb0Zyb21PcGVuVG9DbG9zZShkYXRhKTticmVhaztcbiAgICAgICAgICAgIGNhc2UgU29saXRhaXJlRXZlbnQuU0NfTU9WRV9QT0tFUlNfRk9SX1VORE9fRlJPTV9PUEVOX1RPX0NMT1NFOiB0aGlzLkhhbmRsZU1vdmVQb2tlcnNGb3JVbmRvRnJvbU9wZW5Ub0Nsb3NlKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19SRUZSRVNIX1BPS0VSUzogdGhpcy5IYW5kbGVSZWZyZXNoUG9rZXJzKGRhdGEpO2JyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19XSU46IHRoaXMuSGFuZGxlR2FtZVdpbihqdSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTb2xpdGFpcmVFdmVudC5TQ19MT1NFOiB0aGlzLkhhbmRsZUdhbWVMb3NlKGp1KTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBIYW5kbGVNb2RlbEV2ZW50SW5pdChwb2tlcnM6IFBva2VyW10pIHtcbiAgICAgICAgLy8g5Yib5bu65omA5pyJ5omR5YWL54mMVUlcbiAgICAgICAgbGV0IHNraW4gPSBTb2xpdGFpcmVMb2dpYy5za2luLnNraW5CVi52O1xuICAgICAgICBwb2tlcnMuZm9yRWFjaChwb2tlciA9PiB7XG4gICAgICAgICAgICBsZXQgdWlQb2tlciA9IGlpLlVJTWdyLmlucy5DcmVhdGU8VUlQb2tlciwgUG9rZXI+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIuY29tcC5VSVBva2VyLmtleSwgcG9rZXIpLkluaXQoc2tpbi5mYWNlU2tpbiwgc2tpbi5iYWNrU2tpbiwgc2tpbi5mcm9udFNraW4pO1xuICAgICAgICAgICAgdWlQb2tlci5ub2RlLnBvc2l0aW9uID0gY2MudjMoMCwgMCwgMClcbiAgICAgICAgICAgIHRoaXMucG9rZXJSb290LmFkZENoaWxkKHVpUG9rZXIubm9kZSlcbiAgICAgICAgICAgIHRoaXMubV9VSVBva2VyTGlzdC5wdXNoKHVpUG9rZXIpXG4gICAgICAgICAgICB1aVBva2VyLlNldFRvdWNoRGVsZWdhdGUodGhpcyk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlTW9kZWxFdmVudFBsYXkoanU6IFNvbGl0YWlyZUp1KSB7XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBwb2tlcnM6UG9rZXJbXSA9IGp1LkNsb3NlQXJlYUdyb3VwLnBva2VycztcbiAgICAgICAgICAgIGZvcihsZXQgaT1wb2tlcnMubGVuZ3RoLTE7IGk+PTA7IC0taSl7XG4gICAgICAgICAgICAgICAgbGV0IHBva2VyID0gcG9rZXJzW2ldXG4gICAgICAgICAgICAgICAgaWkuVUlVdGlsLnRyYW5zZmVyVG8ocG9rZXIudmlldy5ub2RlLCB0aGlzLmNsb3NlQXJlYSlcbiAgICAgICAgICAgICAgICBwb2tlci52aWV3Lm5vZGUuekluZGV4ID0gcG9rZXIuaW5kZXhJbkdyb3VwXG4gICAgICAgICAgICAgICAgcG9rZXIudmlldy5ub2RlLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbkluVGFyZ2V0KHBva2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHtcblxuICAgICAgICAgICAgbGV0IHBva2VyczogUG9rZXJbXSA9IGp1Lk9wZW5BcmVhR3JvdXAucG9rZXJzO1xuICAgICAgICAgICAgZm9yKGxldCBpPXBva2Vycy5sZW5ndGgtMTsgaT49MDsgLS1pKXtcbiAgICAgICAgICAgICAgICBsZXQgcG9rZXIgPSBwb2tlcnNbaV1cbiAgICAgICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwb2tlci52aWV3Lm5vZGUsIHRoaXMub3BlbkFyZWEpXG4gICAgICAgICAgICAgICAgcG9rZXIudmlldy5ub2RlLnpJbmRleCA9IHBva2VyLmluZGV4SW5Hcm91cFxuICAgICAgICAgICAgICAgIHBva2VyLnZpZXcubm9kZS5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb25JblRhcmdldChwb2tlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGxheUluZGV4PTA7IHBsYXlJbmRleDw3OyArK3BsYXlJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBncm91cCA9IGp1LlBsYXlHcm91cHNbcGxheUluZGV4XTtcbiAgICAgICAgICAgICAgICBsZXQgcG9rZXJzOiBQb2tlcltdID0gZ3JvdXAucG9rZXJzO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT1wb2tlcnMubGVuZ3RoLTE7IGk+PTA7IC0taSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2tlciA9IHBva2Vyc1tpXVxuICAgICAgICAgICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwb2tlci52aWV3Lm5vZGUsIHRoaXMucGxheUFyZWFMaXN0W3BsYXlJbmRleF0pXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLnZpZXcubm9kZS56SW5kZXggPSBwb2tlci5pbmRleEluR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIudmlldy5ub2RlLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbkluVGFyZ2V0KHBva2VyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgcmVjZWl2ZUluZGV4PTA7IHJlY2VpdmVJbmRleDw0OyArK3JlY2VpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBncm91cCA9IGp1LlJlY2VpdmVHcm91cHNbcmVjZWl2ZUluZGV4XTtcbiAgICAgICAgICAgICAgICBsZXQgcG9rZXJzOiBQb2tlcltdID0gZ3JvdXAucG9rZXJzO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaT1wb2tlcnMubGVuZ3RoLTE7IGk+PTA7IC0taSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2tlciA9IHBva2Vyc1tpXVxuICAgICAgICAgICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwb2tlci52aWV3Lm5vZGUsIHRoaXMucmVjZWl2ZUFyZWFMaXN0W3JlY2VpdmVJbmRleF0pXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLnZpZXcubm9kZS56SW5kZXggPSBwb2tlci5pbmRleEluR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIudmlldy5ub2RlLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbkluVGFyZ2V0KHBva2VyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIEhhbmRsZU1vZGVsRXZlbnRTZW5kUG9rZXJzKHBva2VyczogUG9rZXJbXSl7XG4gICAgICAgIC8vIOaAnei3r++8muWFiOWwhuiuoeeul+WHuuebruagh+WcqOW9k+WJjeiKgueCueS4reeahOS9jee9ru+8jOenu+WKqOWIsOivpeS9jee9ruWQju+8jOWGjeaUueWPmOeItuiKgueCuSAgICAgICBcbiAgICAgICAgcG9rZXJzLmZvckVhY2goKHBva2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3BlZWRGYWN0b3IgPSAyMC4wXG4gICAgICAgICAgICBjb25zdCBkZWxheTogbnVtYmVyID0gaW5kZXgvc3BlZWRGYWN0b3JcbiAgICAgICAgICAgIGNvbnN0IGlzTGFzdDogYm9vbGVhbiA9IGluZGV4ID09PSBwb2tlcnMubGVuZ3RoLTFcbiAgICAgICAgICAgIC8vIOWPkeeJjOWKqOeUu1xuICAgICAgICAgICAgaWkuVUlVdGlsLnRyYW5zZmVyVG8ocG9rZXIudmlldy5ub2RlLCB0aGlzLmFjdGlvbk5vZGUpXG4gICAgICAgICAgICBjb25zdCB7cG9zaXRpb24sIHRhcmdldH0gPSB0aGlzLmdldFRhcmdldEFuZFBvc2l0aW9uSW5QYXJlbnQocG9rZXIpXG5cbiAgICAgICAgICAgIGNvbnN0IHRvdGFsX3RpbWU6IG51bWJlciA9IHRoaXMuX190aW1lT2ZEaXN0YW5jZShwb2tlci52aWV3Lm5vZGUucG9zaXRpb24sIHBvc2l0aW9uKVxuICAgICAgICAgICAgbGV0IGxhc3RDYWxsYmFjayA9ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoaXNMYXN0KXtcbiAgICAgICAgICAgICAgICAgICAgcG9rZXJzLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwLnN0YXR1cyA9PSBFUG9rZXJTdGF0dXMuT1BFTil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5GbGlwUG9rZXIocClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0R2xvYmFsKFNvbGl0YWlyZUdhbWVEZXNrdG9wVUkuRVZFTlRfR0FNRVZJRVdfUE9LRVJTX1JFQURZKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLnR3ZWVuKHBva2VyLnZpZXcubm9kZSlcbiAgICAgICAgICAgICAgICAuZGVsYXkoZGVsYXkpXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4gaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0Lm1vdmUpKVxuICAgICAgICAgICAgICAgIC50byh0b3RhbF90aW1lLCB7cG9zaXRpb246IHBvc2l0aW9ufSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwb2tlci52aWV3Lm5vZGUsIHRhcmdldClcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIudmlldy5ub2RlLnpJbmRleCA9IHBva2VyLmluZGV4SW5Hcm91cFxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2FsbGJhY2soKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVGbGlwUG9rZXIocG9rZXIpe1xuICAgICAgICB0aGlzLkZsaXBQb2tlcihwb2tlcilcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVNb3ZlUG9rZXJGcm9tQ2xvc2VUb09wZW4ocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC5mbGlwKVxuICAgICAgICB0aGlzLl9fRmxpcEFuZE1vdmVUb1RhcmdldChwb2tlcilcbiAgICAgICAgLy8g5aaC5p6cIE9wZW4g5Yy65Z+fID49IDQg5byg54mMKOW3suWMheWQq+i/meW8oCnvvIzpgqPkuYjpnIDopoHosIPmlbTkuIvmlrky5byg54mM55qE5L2N572uXG4gICAgICAgIGlmKHBva2VyLmdyb3VwLnBva2Vycy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8MjsgKytpKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9fQWRqdXN0T3BlblBva2VyQnlJbmRleCgtaS0yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlTW92ZVBva2Vyc0Zyb21DbG9zZVRvT3Blbihwb2tlcnM6IFBva2VyW10pIHtcbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0LmZsaXApXG4gICAgICAgIHBva2Vycy5mb3JFYWNoKHBva2VyPT57XG4gICAgICAgICAgICB0aGlzLl9fRmxpcEFuZE1vdmVUb1RhcmdldChwb2tlcilcbiAgICAgICAgfSlcbiAgICAgICAgLy8g56e75Yqo5aSa5byg54mM77yacG9rZXJzIOS4i+aWueeahOeJjOmDveenu+WKqOWIsOebruagh+S9jee9rlxuICAgICAgICBsZXQgZyA9IHRoaXMubV9KdS5PcGVuQXJlYUdyb3VwO1xuICAgICAgICBsZXQgcHJlQ291bnQgPSBnLnBva2Vycy5sZW5ndGggLSBwb2tlcnMubGVuZ3RoXG4gICAgICAgIGlmKHByZUNvdW50ID4gMyl7XG4gICAgICAgICAgICBwcmVDb3VudCA9IDNcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJlQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5fX0FkanVzdE9wZW5Qb2tlckJ5SW5kZXgoLWktMS1wb2tlcnMubGVuZ3RoKVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlTW92ZUZyb21PcGVuVG9SZWNlaXZlKHBva2VyOiBQb2tlcikge1xuICAgICAgICB0aGlzLk1vdmVQb2tlclRvVGFyZ2V0KHBva2VyKVxuICAgICAgICAvLyDov5jliankuIsgPj0zIOW8oOeJjOeahOaXtuWAme+8jOmcgOimgeiwg+aVtOS9jee9rlxuICAgICAgICBsZXQgZyA9IHRoaXMubV9KdS5PcGVuQXJlYUdyb3VwO1xuICAgICAgICBpZihnLnBva2Vycy5sZW5ndGggPj0gMyl7XG4gICAgICAgICAgICAvLyDpobbpg6ggMiDlvKDniYzpnIDopoHosIPmlbRcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPDI7ICsraSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fX0FkanVzdE9wZW5Qb2tlckJ5SW5kZXgoLTEtaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIEhhbmRsZU1vdmVQb2tlckZvcm1QbGF5VG9SZWNlaXZlKHBva2VyOiBQb2tlcil7XG4gICAgICAgIHRoaXMuTW92ZVBva2VyVG9UYXJnZXQocG9rZXIpXG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlTW92ZVBva2VyRnJvbU9wZW5Ub1BsYXkocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIHRoaXMuSGFuZGxlTW92ZVBva2VyVG9UYXJnZXQocG9rZXIpXG4gICAgICAgIC8vIOi/mOWJqeS4iyA+PTMg5byg54mM55qE5pe25YCZ77yM6ZyA6KaB6LCD5pW05L2N572uXG4gICAgICAgIGxldCBnID0gdGhpcy5tX0p1Lk9wZW5BcmVhR3JvdXBcbiAgICAgICAgaWYoZy5wb2tlcnMubGVuZ3RoID49IDMpe1xuICAgICAgICAgICAgLy8g6aG26YOoIDIg5byg54mM6ZyA6KaB6LCD5pW0XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwyOyArK2kpe1xuICAgICAgICAgICAgICAgIHRoaXMuX19BZGp1c3RPcGVuUG9rZXJCeUluZGV4KC0xLWkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVNb3ZlUG9rZXJUb1RhcmdldChwb2tlcjogUG9rZXIpe1xuICAgICAgICBpaS5BdWRpb01nci5pbnMuUGxheUVmZmVjdChTb2xpdGFpcmVBdWRpb0NmZy5lZmZlY3QubW92ZSlcbiAgICAgICAgdGhpcy5Nb3ZlUG9rZXJUb1RhcmdldChwb2tlcilcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVNb3ZlQWxsUG9rZXJzRnJvbU9wZW5Ub0Nsb3NlKHBva2VyczogUG9rZXJbXSkge1xuICAgICAgICBwb2tlcnMuZm9yRWFjaChwb2tlciA9PiB7XG4gICAgICAgICAgICBwb2tlci52aWV3Lm5vZGUuc3RvcEFsbEFjdGlvbnMoKVxuICAgICAgICAgICAgdGhpcy5fX0ZsaXBBbmRNb3ZlVG9UYXJnZXQocG9rZXIpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlTW92ZVBva2VyTm9DaGFuZ2UocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIHRoaXMuTW92ZVBva2VyQmFjayhwb2tlcilcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVNb3ZlUG9rZXJzVG9UYXJnZXQocG9rZXJzOiBQb2tlcltdKXtcbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0Lm1vdmUpXG4gICAgICAgIHRoaXMuTW92ZVBva2Vyc1RvVGFyZ2V0KHBva2VycylcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVDbGlja1Bva2VyTm9DaGFuZ2UocG9rZXI6IFBva2VyKXtcbiAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0LmludmFsaWQpO1xuICAgICAgICBpaS5BcHAuaW5zLnAudmlicmF0ZS5EZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuU2hha2VQb2tlcihwb2tlcilcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVVbmRvTW92ZVBva2Vyc1RvVGFyZ2V0KHBva2VyczogUG9rZXJbXSl7XG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC51bmRvKVxuICAgICAgICB0aGlzLk1vdmVQb2tlcnNUb1RhcmdldChwb2tlcnMpXG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlVW5kb01vdmVQb2tlclRvT3Blbihwb2tlcjogUG9rZXIpe1xuICAgICAgICB0aGlzLkhhbmRsZVVuZG9Nb3ZlUG9rZXJUb1RhcmdldChwb2tlcilcbiAgICAgICAgLy8g5aaC5p6cIE9wZW4g5Yy65Z+fID49IDQg5byg54mMKOW3suWMheWQq+i/meW8oCnvvIzpgqPkuYjpnIDopoHosIPmlbTkuIvmlrky5byg54mM55qE5L2N572uXG4gICAgICAgIGlmKHBva2VyLmdyb3VwLnBva2Vycy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8MjsgKytpKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9fQWRqdXN0T3BlblBva2VyQnlJbmRleCgtaS0yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgSGFuZGxlVW5kb01vdmVQb2tlclRvVGFyZ2V0KHBva2VyOiBQb2tlcil7XG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC51bmRvKVxuICAgICAgICB0aGlzLk1vdmVQb2tlclRvVGFyZ2V0KHBva2VyKVxuICAgIH1cbiAgICBwcml2YXRlIEhhbmRsZU1vdmVBbGxQb2tlcnNGb3JVbmRvRnJvbUNsb3NlVG9PcGVuKHBva2VyczogUG9rZXJbXSl7XG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC51bmRvKVxuICAgICAgICB0aGlzLk1vdmVBbGxQb2tlcnNGb3JVbmRvRnJvbUNsb3NlVG9PcGVuKHBva2VycylcbiAgICB9XG4gICAgcHJpdmF0ZSBIYW5kbGVNb3ZlUG9rZXJGb3JVbmRvRnJvbU9wZW5Ub0Nsb3NlKHBva2VyOiBQb2tlcil7XG4gICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC51bmRvKVxuICAgICAgICB0aGlzLl9fRmxpcEFuZE1vdmVUb1RhcmdldEJ5QWN0aW9uTm9kZShwb2tlcilcbiAgICAgICAgLy8g6L+Y5Ymp5LiLID49MyDlvKDniYznmoTml7blgJnvvIzpnIDopoHosIPmlbTkvY3nva5cbiAgICAgICAgbGV0IGcgPSB0aGlzLm1fSnUuT3BlbkFyZWFHcm91cFxuICAgICAgICBpZihnLnBva2Vycy5sZW5ndGggPj0gMyl7XG4gICAgICAgICAgICAvLyDpobbpg6ggMiDlvKDniYzpnIDopoHosIPmlbRcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPDI7ICsraSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fX0FkanVzdE9wZW5Qb2tlckJ5SW5kZXgoLTEtaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIEhhbmRsZU1vdmVQb2tlcnNGb3JVbmRvRnJvbU9wZW5Ub0Nsb3NlKHBva2VyczogUG9rZXJbXSkge1xuICAgICAgICBpaS5BdWRpb01nci5pbnMuUGxheUVmZmVjdChTb2xpdGFpcmVBdWRpb0NmZy5lZmZlY3QudW5kbylcbiAgICAgICAgZm9yKGxldCBpPXBva2Vycy5sZW5ndGgtMTsgaT49MDsgLS1pKXtcbiAgICAgICAgICAgIHRoaXMuX19GbGlwQW5kTW92ZVRvVGFyZ2V0QnlBY3Rpb25Ob2RlKHBva2Vyc1tpXSlcbiAgICAgICAgfVxuICAgICAgICAvLyDpnIDopoHosIPmlbTpobbpg6jniYzkvY3nva5cbiAgICAgICAgbGV0IGcgPSB0aGlzLm1fSnUuT3BlbkFyZWFHcm91cFxuICAgICAgICBsZXQgY250ID0gZy5wb2tlcnMubGVuZ3RoXG4gICAgICAgIGxldCBtb3ZlQ291bnQgPSAwXG4gICAgICAgIGlmKGNudCA+PSAzKSB7XG4gICAgICAgICAgICBtb3ZlQ291bnQgPSAyXG4gICAgICAgIH1lbHNlIGlmKGNudCA9PSAyKXtcbiAgICAgICAgICAgIG1vdmVDb3VudCA9IDFcbiAgICAgICAgfVxuICAgICAgICAvLyDpobbpg6ggMiDlvKDniYzpnIDopoHosIPmlbRcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bW92ZUNvdW50OyArK2kpe1xuICAgICAgICAgICAgdGhpcy5fX0FkanVzdE9wZW5Qb2tlckJ5SW5kZXgoLTEtaSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIEhhbmRsZVJlZnJlc2hQb2tlcnMocG9rZXJzOiBQb2tlcltdKSB7XG4gICAgICAgIHBva2Vycy5mb3JFYWNoKHBva2VyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0VGFyZ2V0Tm9kZShwb2tlcilcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uPXRoaXMucG9zaXRpb25JblRhcmdldChwb2tlcilcbiAgICAgICAgICAgIHBva2VyLnZpZXcubm9kZS5wYXJlbnQgPSB0YXJnZXRcbiAgICAgICAgICAgIHBva2VyLnZpZXcubm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uXG4gICAgICAgICAgICBwb2tlci52aWV3Lm5vZGUuekluZGV4ID0gcG9rZXIuaW5kZXhJbkdyb3VwXG4gICAgICAgICAgICBwb2tlci52aWV3LlJlZnJlc2goKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZW1pdEdsb2JhbChTb2xpdGFpcmVHYW1lRGVza3RvcFVJLkVWRU5UX0dBTUVWSUVXX1BPS0VSU19SRUFEWSlcbiAgICB9XG5cbiAgICBwcml2YXRlIEhhbmRsZUdhbWVXaW4oanU6IFNvbGl0YWlyZUp1KSB7XG4gICAgICAgIHRoaXMuX19SdW5XaW5BY3Rpb24oanUsICgpPT57XG4gICAgICAgICAgICBTb2xpdGFpcmVMb2dpYy5IYW5kbGVHYW1lV2luKGp1LCAoKT0+e1xuICAgICAgICAgICAgICAgIC8vIOaJk+W8gOiDnOWIqemhtemdolxuICAgICAgICAgICAgICAgIGlpLlVJTWdyLmlucy5PcGVuPFVJR2FtZVdpbkFyZ3M+KFNvbGl0YWlyZVByZWZhYkNmZy5wZmIucGFuZWwuVUlHYW1lV2luLmtleSwge1xuICAgICAgICAgICAgICAgICAgICBqdToganVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIEhhbmRsZUdhbWVMb3NlKGp1OiBTb2xpdGFpcmVKdSkge1xuICAgICAgICBpaS5VSU1nci5pbnMuT3BlbjxVSUdhbWVMb3NlQXJncz4oU29saXRhaXJlUHJlZmFiQ2ZnLnBmYi5wYW5lbC5VSUdhbWVMb3NlLmtleSwgeyBqdSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9fQWRqdXN0T3BlblBva2VyQnlJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwOiBQb2tlciA9IHRoaXMubV9KdS5PcGVuQXJlYUdyb3VwLkdldFBva2VyKGluZGV4KVxuICAgICAgICBpZihwKXtcbiAgICAgICAgICAgIHRoaXMuX19Nb3ZlUG9rZXJCeVRpbWVEaXJlY3RseShwLCB0aGlzLlRJTUVfTU9WRSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX19SdW5XaW5BY3Rpb24oanU6IFNvbGl0YWlyZUp1LCBjYjogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IF9fY2IgPSBpaS5VdGlsLm9uY2VDYWxsKCgpPT57XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgaWkuVUlNZ3IuaW5zLkRlY0Jsb2NrUmVmKCk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgICBpaS5VSU1nci5pbnMuQWRkQmxvY2tSZWYoKTtcbiAgICAgICAgLy8g5pKt5pS+6IOc5Yip54m55pWI5ZCO6L+b6KGM5Zue6LCDXG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLnJvdGF0ZU5vZGUpO1xuICAgICAgICB0aGlzLnJvdGF0ZU5vZGUuYW5nbGUgPSAwO1xuICAgICAgICBsZXQgdGltZU9mT25lQ2lyY2xlID0gNS4yNSowLjU7XG4gICAgICAgIGxldCBQT0tFUl9WSVJUVUFMX0NOVCA9IDUyLjVcbiAgICAgICAgbGV0IHRpbWVPZlBva2VySW50ZXJ2YWwgPSB0aW1lT2ZPbmVDaXJjbGUvUE9LRVJfVklSVFVBTF9DTlQ7XG4gICAgICAgIC8vIOWKqOeUu+aPj+i/sOWIneatpe+8muavj+S4gOW8oOaOkuenu+WKqOWIsOWPs+S4iuinkuWQjui9rDHlnIjlpJrlkI7vvIzku47lt6bkuIrop5LliIfnur/po57liLDmlLbniYzljLrvvJtcbiAgICAgICAgLy8g56ys5LiA5byg54mM6aOe5Yiw5ZyG5ZGo5LiK77yI5ZKMeOi9tOWkueinkiB0aGV0Ye+8ieaXtu+8jOW8gOWni+i9rOWKqO+8jOebtOWIsOacgOWQjuS4gOW8oOeJjOWIsOWchuWRqOS4iuaXtu+8jOaji+ebmOWImuWlvei9rOS6huS4gOWRqO+8m+atpOaXtuWGjei9rO+8iDE4MCArIHRoZXRhKSDop5LluqblkI7nrKzkuIDlvKDniYzpo57lh7rliLDnm67moIfkvY3nva7vvIzmnIDlkI7kuIDlvKDniYzlho3ovazkuIDlkaggICAgICBcbiAgICAgICAgbGV0IHRoZXRhID0gNDU7XG4gICAgICAgIC8vIOaAu+WFseaXi+i9rOeahOinkuW6puS4ulxuICAgICAgICBsZXQgdG90YWxSb3RhdGUgPSAtKDM2MCArICgxODAgKyAyKnRoZXRhKSArIDM2MCk7XG4gICAgICAgIGxldCB0b3RhbFJvdGF0ZVRpbWUgPSAtdG90YWxSb3RhdGUqdGltZU9mT25lQ2lyY2xlLzM2MDtcbiAgICAgICAgbGV0IHRpbWVQb2ludE9mUG9rZXJFeGl0ID0gICgzNjAgKyAoMTgwICsgMip0aGV0YSkpKnRpbWVPZk9uZUNpcmNsZS8zNjBcbiAgICAgICAgbGV0IHRpbWVPZlBva2VyRW50ZXIgPSAwLjI7XG4gICAgICAgIGxldCBSID0gMjQwO1xuICAgICAgICAvLyDmr4/kuIDlvKDniYzvvIzliIflhaXml7bliJ3lp4vml4vovazop5LluqbkuLpcbiAgICAgICAgbGV0IF9lbnRlckFuZ2xlID0gdGhldGEtOTA7XG4gICAgICAgIC8vIOiuoeeul+avj+S4gOW8oOeJjO+8jOmcgOimgeenu+WKqOWIsOWIsOS9jee9rueahOS4lueVjOWdkOagh1xuICAgICAgICBsZXQgeDAgPSBSKk1hdGguY29zKF9lbnRlckFuZ2xlKTtcbiAgICAgICAgbGV0IHkwID0gLVIqTWF0aC5zaW4oX2VudGVyQW5nbGUpO1xuICAgICAgICBsZXQgd3AgPSB0aGlzLnJvdGF0ZU5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKHgwLCB5MCkpO1xuICAgICAgICBsZXQgX3R3cCA9IHRoaXMucm90YXRlTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod3ApO1xuICAgICAgICBsZXQgX3R3cFYzID0gY2MudjMoX3R3cC54LCBfdHdwLnksIDApO1xuICAgICAgICBsZXQgX3Bva2VyQ250ID0gMDtcbiAgICAgICAgLy8gdGhpcy5yb3RhdGVOb2RlLnBhcmVudFxuICAgICAgICBmb3IobGV0IHJlY2VpdmVHcm91cEluZGV4ID0gMDsgcmVjZWl2ZUdyb3VwSW5kZXggPCA0OyArK3JlY2VpdmVHcm91cEluZGV4KSB7XG4gICAgICAgICAgICBsZXQgX3JlY2VpdmVHcm91cCA9IGp1LmdldFJlY2VpdmVHcm91cChyZWNlaXZlR3JvdXBJbmRleCk7XG4gICAgICAgICAgICBmb3IobGV0IGk9X3JlY2VpdmVHcm91cC5wb2tlcnMubGVuZ3RoLTE7IGk+PTA7IC0taSl7XG4gICAgICAgICAgICAgICAgbGV0IF9wb2tlciA9IF9yZWNlaXZlR3JvdXAucG9rZXJzW2ldO1xuICAgICAgICAgICAgICAgIF9wb2tlci52aWV3LlN0b3BBbGxBY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhfcG9rZXIudmlldy5ub2RlLCB0aGlzLnJvdGF0ZU5vZGUucGFyZW50KVxuICAgICAgICAgICAgICAgIGxldCBfcENudCA9IF9wb2tlckNudDtcbiAgICAgICAgICAgICAgICBjYy50d2VlbihfcG9rZXIudmlldy5ub2RlKVxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkoX3Bva2VyQ250KnRpbWVPZlBva2VySW50ZXJ2YWwpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKF9ub2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9ub2RlLnpJbmRleCA9IFpJbmRleC5UT1AgKyBfcENudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlpLkF1ZGlvTWdyLmlucy5QbGF5RWZmZWN0KFNvbGl0YWlyZUF1ZGlvQ2ZnLmVmZmVjdC5tb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKHRpbWVPZlBva2VyRW50ZXIsIHtwb3NpdGlvbjogX3R3cFYzLCBhbmdsZTogX2VudGVyQW5nbGV9KVxuICAgICAgICAgICAgICAgICAgICAuY2FsbCgoX25vZGU6IGNjLk5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOenu+WKqOWIsOi9rOebmFxuICAgICAgICAgICAgICAgICAgICAgICAgaWkuVUlVdGlsLnRyYW5zZmVyVG8oX25vZGUsIHRoaXMucm90YXRlTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDosIPmlbTml4vovazop5LluqZcbiAgICAgICAgICAgICAgICAgICAgICAgIF9ub2RlLmFuZ2xlID0gX2VudGVyQW5nbGUgKyBfcENudCozNjAvNTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbm9kZS56SW5kZXggPSBQT0tFUl9WSVJUVUFMX0NOVC1fcENudFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICBpZihfcG9rZXJDbnQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDmo4vnm5jlvIDlp4vovazliqhcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5yb3RhdGVOb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRlbGF5KHRpbWVPZlBva2VyRW50ZXIpICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvKHRvdGFsUm90YXRlVGltZSwge2FuZ2xlOiB0b3RhbFJvdGF0ZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKVxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZGVsYXkodGltZU9mUG9rZXJFbnRlciArIHRpbWVQb2ludE9mUG9rZXJFeGl0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fUnVuV2luRXhpdEFjdGlvbihqdSwgX19jYiwgdGltZU9mUG9rZXJJbnRlcnZhbCwgLV9lbnRlckFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKytfcG9rZXJDbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9fUnVuV2luRXhpdEFjdGlvbihqdTogU29saXRhaXJlSnUsIGNiOiBGdW5jdGlvbiwgdGltZU9mUG9rZXJJbnRlcnZhbDogbnVtYmVyLCBhbmdsZU9mRXhpdDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBfcG9rZXJDbnQgPSAwO1xuICAgICAgICBsZXQgdGltZU9mUG9rZXJFeGl0ID0gMC4yO1xuICAgICAgICB2YXIgd3AgPSB0aGlzLnJvdGF0ZU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuY2xvc2VBcmVhLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcbiAgICAgICAgZm9yKGxldCByZWNlaXZlR3JvdXBJbmRleCA9IDA7IHJlY2VpdmVHcm91cEluZGV4IDwgNDsgKytyZWNlaXZlR3JvdXBJbmRleCkge1xuICAgICAgICAgICAgbGV0IF9yZWNlaXZlR3JvdXAgPSBqdS5nZXRSZWNlaXZlR3JvdXAocmVjZWl2ZUdyb3VwSW5kZXgpO1xuICAgICAgICAgICAgZm9yKGxldCBpPV9yZWNlaXZlR3JvdXAucG9rZXJzLmxlbmd0aC0xOyBpPj0wOyAtLWkpe1xuICAgICAgICAgICAgICAgIGxldCBfcG9rZXIgPSBfcmVjZWl2ZUdyb3VwLnBva2Vyc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgX3BDbnQgPSBfcG9rZXJDbnQ7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4oX3Bva2VyLnZpZXcubm9kZSlcbiAgICAgICAgICAgICAgICAgICAgLmRlbGF5KF9wQ250KnRpbWVPZlBva2VySW50ZXJ2YWwpXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKChfbm9kZTogY2MuTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWkuQXVkaW9NZ3IuaW5zLlBsYXlFZmZlY3QoU29saXRhaXJlQXVkaW9DZmcuZWZmZWN0Lm1vdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhfbm9kZSwgdGhpcy5yb3RhdGVOb2RlLnBhcmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIF9ub2RlLnpJbmRleCA9IDUyICsgX3BDbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBfbm9kZS5hbmdsZSA9IGFuZ2xlT2ZFeGl0O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudG8odGltZU9mUG9rZXJFeGl0LCB7cG9zaXRpb246IHdwLCBhbmdsZTogMH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfcENudCA9PSA1MSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgICAgICsrX3Bva2VyQ250O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvbiAgICAgXG5cbiAgICAvLyNyZWdpb24gLy8hIE1vdmUgQWN0aW9uIOato+ecn+eahOenu+WKqOaTjeS9nOmDqOWIhu+8iOavj+S4gOS4qiBFdmVudCBIYW5kbGVyIOS8muiwg+eUqOS4gOS4qiBNb3ZlIOexu+Wei+eahOWHveaVsO+8iVxuICAgIHByaXZhdGUgTW92ZUFsbFBva2Vyc0ZvclVuZG9Gcm9tQ2xvc2VUb09wZW4ocG9rZXJzOiBQb2tlcltdKSB7XG4gICAgICAgIHBva2Vycy5mb3JFYWNoKHBva2VyID0+IHtcbiAgICAgICAgICAgIHBva2VyLnZpZXcuU3RvcEFsbEFjdGlvbigpXG4gICAgICAgICAgICB0aGlzLl9fRmxpcEFuZE1vdmVUb1RhcmdldChwb2tlcilcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcHJpdmF0ZSBNb3ZlUG9rZXJCYWNrKHBva2VyOiBQb2tlcikge1xuICAgICAgICBpZihwb2tlci5pc1RvcCl7XG4gICAgICAgICAgICB0aGlzLk1vdmVQb2tlclRvVGFyZ2V0KHBva2VyLCBmYWxzZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgcG9rZXJJbmRleCA9IHBva2VyLmluZGV4SW5Hcm91cFxuICAgICAgICAgICAgbGV0IHBva2VyTGVuZ3RoID0gcG9rZXIuZ3JvdXAucG9rZXJzLmxlbmd0aFxuICAgICAgICAgICAgZm9yKGxldCBhYm92ZVBva2VySW5kZXg9IHBva2VySW5kZXg7IGFib3ZlUG9rZXJJbmRleCA8IHBva2VyTGVuZ3RoOyArK2Fib3ZlUG9rZXJJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBhYm92ZVBva2VyID0gcG9rZXIuZ3JvdXAuR2V0UG9rZXIoYWJvdmVQb2tlckluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMuTW92ZVBva2VyVG9UYXJnZXQoYWJvdmVQb2tlciwgZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBTaGFrZVBva2VyKHBva2VyOiBQb2tlcikge1xuICAgICAgICBpZihwb2tlci5pc1RvcCl7XG4gICAgICAgICAgICB0aGlzLl9fU2hha2VQb2tlcihwb2tlcilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgcG9rZXJJbmRleCA9IHBva2VyLmluZGV4SW5Hcm91cFxuICAgICAgICAgICAgbGV0IHBva2VyTGVuZ3RoID0gcG9rZXIuZ3JvdXAucG9rZXJzLmxlbmd0aFxuICAgICAgICAgICAgZm9yKGxldCBhYm92ZVBva2VySW5kZXg9IHBva2VySW5kZXg7IGFib3ZlUG9rZXJJbmRleCA8IHBva2VyTGVuZ3RoOyArK2Fib3ZlUG9rZXJJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBhYm92ZVBva2VyID0gcG9rZXIuZ3JvdXAuR2V0UG9rZXIoYWJvdmVQb2tlckluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMuX19TaGFrZVBva2VyKGFib3ZlUG9rZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfX1NoYWtlUG9rZXIocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIHBva2VyLnZpZXcuU3RvcEFsbEFjdGlvbigpO1xuICAgICAgICBjb25zdCBTSEFLRV9EWDogbnVtYmVyID0gNC4wXG4gICAgICAgIGNvbnN0IFNIQUtFX0hBTEZfVElNRTogbnVtYmVyID0gMC4wNVxuICAgICAgICBsZXQgX19TdG9wQ2FsbCA9IChwOiBVSVBva2VyKSA9PiB7XG4gICAgICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQocC5ub2RlKVxuICAgICAgICAgICAgbGV0IHRwb3MgPSB0aGlzLnBvc2l0aW9uSW5UYXJnZXQocC52bSlcbiAgICAgICAgICAgIHAubm9kZS5wb3NpdGlvbiA9IHRwb3NcbiAgICAgICAgfVxuICAgICAgICBwb2tlci52aWV3LkFkZFN0b3BBY3Rpb25DYWxsKF9fU3RvcENhbGwpXG4gICAgICAgIGNjLnR3ZWVuKHBva2VyLnZpZXcubm9kZSlcbiAgICAgICAgICAgIC5ieShTSEFLRV9IQUxGX1RJTUUsIHtwb3NpdGlvbjogY2MudjMoLVNIQUtFX0RYLCAwLCAwKX0pXG4gICAgICAgICAgICAuYnkoU0hBS0VfSEFMRl9USU1FKjIsIHtwb3NpdGlvbjogY2MudjMoU0hBS0VfRFgqMiwgMCwgMCl9KVxuICAgICAgICAgICAgLmJ5KFNIQUtFX0hBTEZfVElNRSwge3Bvc2l0aW9uOiBjYy52MygtU0hBS0VfRFgsIDAsIDApfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgcG9rZXIudmlldy5SZW1vdmVTdG9wQ2FsbChfX1N0b3BDYWxsKVxuICAgICAgICAgICAgICAgIF9fU3RvcENhbGwocG9rZXIudmlldylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgIH1cbiAgICBwcml2YXRlIF9fRmxpcEFuZE1vdmVUb1RhcmdldChwb2tlcjogUG9rZXIpIHtcbiAgICAgICAgcG9rZXIudmlldy5SZWZyZXNoKClcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBjYy5Ob2RlID0gdGhpcy5nZXRUYXJnZXROb2RlKHBva2VyKVxuICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwb2tlci52aWV3Lm5vZGUsIHRhcmdldClcbiAgICAgICAgcG9rZXIudmlldy5ub2RlLnpJbmRleCA9IHBva2VyLmluZGV4SW5Hcm91cFxuICAgICAgICAvLyDnp7vliqjnmoTml7bpl7TlupTor6XmmK/lm7rlrprnmoTvvIzmiY3kvJrmr5TovoPmnInlsYLmrKHmhJ9cbiAgICAgICAgdGhpcy5fX01vdmVQb2tlckJ5VGltZURpcmVjdGx5KHBva2VyLCB0aGlzLlRJTUVfTU9WRSlcbiAgICB9XG4gICAgcHJpdmF0ZSBfX0ZsaXBBbmRNb3ZlVG9UYXJnZXRCeUFjdGlvbk5vZGUocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIHBva2VyLnZpZXcuU3RvcEFsbEFjdGlvbigpXG4gICAgICAgIHBva2VyLnZpZXcuUmVmcmVzaCgpXG4gICAgICAgIGlpLlVJVXRpbC50cmFuc2ZlclRvKHBva2VyLnZpZXcubm9kZSwgdGhpcy5hY3Rpb25Ob2RlKVxuICAgICAgICBjb25zdCB7cG9zaXRpb24sIHRhcmdldH0gPSB0aGlzLmdldFRhcmdldEFuZFBvc2l0aW9uSW5QYXJlbnQocG9rZXIpXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLl9fdGltZU9mRGlzdGFuY2UocG9zaXRpb24sIHBva2VyLnZpZXcubm9kZS5wb3NpdGlvbilcbiAgICAgICAgbGV0IF9fU3RvcENhbGwgPSAocDogVUlQb2tlcikgPT4ge1xuICAgICAgICAgICAgcC5ub2RlLnBvc2l0aW9uID0gcG9zaXRpb25cbiAgICAgICAgICAgIGlpLlVJVXRpbC50cmFuc2ZlclRvKHAubm9kZSwgdGFyZ2V0KVxuICAgICAgICAgICAgcC5ub2RlLnpJbmRleCA9IHAudm0uaW5kZXhJbkdyb3VwXG4gICAgICAgIH1cbiAgICAgICAgcG9rZXIudmlldy5BZGRTdG9wQWN0aW9uQ2FsbChfX1N0b3BDYWxsKTtcbiAgICAgICAgY2MudHdlZW4ocG9rZXIudmlldy5ub2RlKVxuICAgICAgICAgICAgLnRvKHRpbWUsIHtwb3NpdGlvbjogcG9zaXRpb259KVxuICAgICAgICAgICAgLmNhbGwoKG5vZGU6IGNjLk5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBwb2tlci52aWV3LlJlbW92ZVN0b3BDYWxsKF9fU3RvcENhbGwpXG4gICAgICAgICAgICAgICAgX19TdG9wQ2FsbChwb2tlci52aWV3KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgTW92ZVBva2VyVG9UYXJnZXQocG9rZXI6IFBva2VyLCByZXNldFpJbmRleDogYm9vbGVhbiA9IHRydWUpe1xuICAgICAgICBwb2tlci52aWV3LlN0b3BBbGxBY3Rpb24oKVxuICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwb2tlci52aWV3Lm5vZGUsIHRoaXMuYWN0aW9uTm9kZSlcbiAgICAgICAgY29uc3Qge3Bvc2l0aW9uLCB0YXJnZXR9ID0gdGhpcy5nZXRUYXJnZXRBbmRQb3NpdGlvbkluUGFyZW50KHBva2VyKVxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5fX3RpbWVPZkRpc3RhbmNlKHBvc2l0aW9uLCBwb2tlci52aWV3Lm5vZGUucG9zaXRpb24pXG4gICAgICAgIGxldCBfX1N0b3BDYWxsID0gKHA6IFVJUG9rZXIpID0+IHtcbiAgICAgICAgICAgIHAubm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uXG4gICAgICAgICAgICBpaS5VSVV0aWwudHJhbnNmZXJUbyhwLm5vZGUsIHRhcmdldClcbiAgICAgICAgICAgIGlmKHJlc2V0WkluZGV4KSB7XG4gICAgICAgICAgICAgICAgcC5ub2RlLnpJbmRleCA9IHBva2VyLnZpZXcudm0uaW5kZXhJbkdyb3VwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcG9rZXIudmlldy5BZGRTdG9wQWN0aW9uQ2FsbChfX1N0b3BDYWxsKVxuICAgICAgICBjYy50d2Vlbihwb2tlci52aWV3Lm5vZGUpXG4gICAgICAgICAgICAudG8odGltZSwge3Bvc2l0aW9uOiBwb3NpdGlvbn0pXG4gICAgICAgICAgICAuY2FsbCgobm9kZSk9PntcbiAgICAgICAgICAgICAgICBfX1N0b3BDYWxsKHBva2VyLnZpZXcpXG4gICAgICAgICAgICAgICAgcG9rZXIudmlldy5SZW1vdmVTdG9wQ2FsbChfX1N0b3BDYWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfVxuICAgIHByaXZhdGUgTW92ZVBva2Vyc1RvVGFyZ2V0KHBva2VyczogUG9rZXJbXSkge1xuICAgICAgICBmb3IobGV0IHBva2VySW5kZXg9cG9rZXJzLmxlbmd0aC0xOyBwb2tlckluZGV4ID49MDsgLS1wb2tlckluZGV4KXtcbiAgICAgICAgICAgIGxldCBwb2tlciA9IHBva2Vyc1twb2tlckluZGV4XVxuICAgICAgICAgICAgdGhpcy5Nb3ZlUG9rZXJUb1RhcmdldChwb2tlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIEZsaXBQb2tlcihwb2tlcjogUG9rZXIpIHtcbiAgICAgICAgcG9rZXIudmlldy5TdG9wQWxsQWN0aW9uKCk7XG4gICAgICAgIGxldCBfX1N0b3BDYWxsID0gKHA6IFVJUG9rZXIpID0+IHsgcC5SZWZyZXNoKCk7IHAubm9kZS5zY2FsZVggPSAxOyB9XG4gICAgICAgIHBva2VyLnZpZXcuQWRkU3RvcEFjdGlvbkNhbGwoX19TdG9wQ2FsbClcbiAgICAgICAgY2MudHdlZW4ocG9rZXIudmlldy5ub2RlKVxuICAgICAgICAgICAgLnRvKHRoaXMuVElNRV9GTElQX0hBTEYsIHtzY2FsZVg6IDB9KVxuICAgICAgICAgICAgLmNhbGwoKCk9PnsgcG9rZXIudmlldy5SZWZyZXNoKCkgfSlcbiAgICAgICAgICAgIC50byh0aGlzLlRJTUVfRkxJUF9IQUxGLCB7c2NhbGVYOiAxfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgcG9rZXIudmlldy5SZW1vdmVTdG9wQ2FsbChfX1N0b3BDYWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgfVxuICAgIHByaXZhdGUgX19Nb3ZlUG9rZXJCeVRpbWVEaXJlY3RseShwb2tlcjogUG9rZXIsIHRpbWU6IG51bWJlcikge1xuICAgICAgICBwb2tlci52aWV3LlN0b3BBbGxBY3Rpb24oKVxuICAgICAgICBsZXQgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uSW5UYXJnZXQocG9rZXIpO1xuICAgICAgICBsZXQgX19TdG9wQ2FsbCA9IChwOiBVSVBva2VyKSA9PiB7IHAubm9kZS5wb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uIH1cbiAgICAgICAgcG9rZXIudmlldy5BZGRTdG9wQWN0aW9uQ2FsbChfX1N0b3BDYWxsKTtcbiAgICAgICAgY2MudHdlZW4ocG9rZXIudmlldy5ub2RlKVxuICAgICAgICAgICAgLnRvKHRpbWUsIHtwb3NpdGlvbjogdGFyZ2V0UG9zaXRpb259KVxuICAgICAgICAgICAgLmNhbGwoKCk9PnBva2VyLnZpZXcuUmVtb3ZlU3RvcENhbGwoX19TdG9wQ2FsbCkpXG4gICAgICAgICAgICAuc3RhcnQoKVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cblxuICAgIC8vI3JlZ2lvbiAvLyEg6L6F5Yqp5Ye95pWwXG4gICAgcHJpdmF0ZSB0b3BaSW5kZXhCeVBva2VyKHBva2VyOiBQb2tlcikge1xuICAgICAgICByZXR1cm4gdGhpcy50b3BaSW5kZXgocG9rZXIubG9jYXRpb24sIHBva2VyLmdyb3VwSW5kZXgpXG4gICAgfVxuICAgIHByaXZhdGUgdG9wWkluZGV4KGxvY2F0aW9uOiBFTG9jYXRpb24sIGluZGV4OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuX19zZXRaSW5kZXgobG9jYXRpb24sIGluZGV4LCBaSW5kZXguVE9QKVxuICAgIH1cbiAgICBwcml2YXRlIF9fc2V0WkluZGV4KGxvY2F0aW9uOiBFTG9jYXRpb24sIGluZGV4OiBudW1iZXIsIHRhcmdldFpJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgRUxvY2F0aW9uLlBMQVk6XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUFyZWEuekluZGV4ID0gWkluZGV4Lk5PUk1BTFxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFyZWEuekluZGV4ID0gWkluZGV4Lk5PUk1BTFxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFyZWFMaXN0LmZvckVhY2goKG5vZGUsIGkpID0+IG5vZGUuekluZGV4ID0gKGkgPT09IGluZGV4KSA/IHRhcmdldFpJbmRleCA6IFpJbmRleC5OT1JNQUwpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQXJlYUxpc3QuZm9yRWFjaChub2RlID0+IG5vZGUuekluZGV4ID0gWkluZGV4Lk5PUk1BTCkgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVMb2NhdGlvbi5PUEVOOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VBcmVhLnpJbmRleCA9IFpJbmRleC5OT1JNQUxcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5BcmVhLnpJbmRleCA9IHRhcmdldFpJbmRleFxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFyZWFMaXN0LmZvckVhY2gobm9kZSA9PiBub2RlLnpJbmRleCA9IFpJbmRleC5OT1JNQUwpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQXJlYUxpc3QuZm9yRWFjaChub2RlID0+IG5vZGUuekluZGV4ID0gWkluZGV4Lk5PUk1BTClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRUxvY2F0aW9uLkNMT1NFOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VBcmVhLnpJbmRleCA9IHRhcmdldFpJbmRleFxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFyZWEuekluZGV4ID0gWkluZGV4Lk5PUk1BTFxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFyZWFMaXN0LmZvckVhY2gobm9kZSA9PiBub2RlLnpJbmRleCA9IFpJbmRleC5OT1JNQUwpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQXJlYUxpc3QuZm9yRWFjaChub2RlID0+IG5vZGUuekluZGV4ID0gWkluZGV4Lk5PUk1BTClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQobG9jYXRpb24gPT0gRUxvY2F0aW9uLlJFQ0VJVkUpXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUFyZWEuekluZGV4ID0gWkluZGV4Lk5PUk1BTFxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFyZWEuekluZGV4ID0gWkluZGV4Lk5PUk1BTFxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFyZWFMaXN0LmZvckVhY2gobm9kZSA9PiBub2RlLnpJbmRleCA9IFpJbmRleC5OT1JNQUwpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQXJlYUxpc3QuZm9yRWFjaCgobm9kZSwgaSkgPT4gbm9kZS56SW5kZXggPSAoaSA9PT0gaW5kZXgpID8gdGFyZ2V0WkluZGV4IDogWkluZGV4Lk5PUk1BTClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHJlc2V0WkluZGV4KCl7XG4gICAgICAgIHRoaXMuY2xvc2VBcmVhLnpJbmRleCA9IFpJbmRleC5OT1JNQUxcbiAgICAgICAgdGhpcy5vcGVuQXJlYS56SW5kZXggPSBaSW5kZXguTk9STUFMXG4gICAgICAgIHRoaXMucGxheUFyZWFMaXN0LmZvckVhY2gobm9kZSA9PiBub2RlLnpJbmRleCA9IFpJbmRleC5OT1JNQUwpXG4gICAgICAgIHRoaXMucmVjZWl2ZUFyZWFMaXN0LmZvckVhY2gobm9kZSA9PiBub2RlLnpJbmRleCA9IFpJbmRleC5OT1JNQUwpIFxuICAgIH1cbiAgICBwcml2YXRlIGdldFJlY2VpdmVJbmRleEJ5VUlQb2tlcih1aVBva2VyOiBVSVBva2VyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHdwID0gdWlQb2tlci5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pXG4gICAgICAgIGZvcihsZXQgcmVjZWl2ZUluZGV4ID0gMDsgcmVjZWl2ZUluZGV4IDwgNDsgKytyZWNlaXZlSW5kZXgpIHtcbiAgICAgICAgICAgIGxldCByZWNlaXZlTm9kZSA9IHRoaXMucmVjZWl2ZUFyZWFMaXN0W3JlY2VpdmVJbmRleF1cbiAgICAgICAgICAgIGxldCByd3AgPSByZWNlaXZlTm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxuICAgICAgICAgICAgaWYoTWF0aC5hYnMocndwLnggLSB3cC54KSA8IDYwICYmIE1hdGguYWJzKHJ3cC55IC0gd3AueSkgPCAxMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZUluZGV4XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICAvLyDmj5Dkvpvnu5nmi5bmi73liKTlrprnmoQgQVBJXG4gICAgcHJpdmF0ZSBnZXRQbGF5SW5kZXhCeVBva2VyKHBva2VyOiBQb2tlcik6IG51bWJlciB7XG4gICAgICAgIGxldCBpc1Bva2VySW5QbGF5OiBib29sZWFuID0gcG9rZXIubG9jYXRpb24gPT0gRUxvY2F0aW9uLlBMQVlcbiAgICAgICAgbGV0IHdwID0gcG9rZXIudmlldy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pXG4gICAgICAgIGZvcihsZXQgZ3JvdXBJbmRleD0wOyBncm91cEluZGV4IDwgNzsgKytncm91cEluZGV4KSB7XG4gICAgICAgICAgICBpZihpc1Bva2VySW5QbGF5ICYmIHBva2VyLmdyb3VwSW5kZXggPT09IGdyb3VwSW5kZXgpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxheUdyb3VwID0gdGhpcy5tX0p1LmdldFBsYXlHcm91cChncm91cEluZGV4KVxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSAocGxheUdyb3VwLnRvcCA9PT0gbnVsbCkgPyB0aGlzLnBsYXlBcmVhTGlzdFtncm91cEluZGV4XSA6IHBsYXlHcm91cC50b3Audmlldy5ub2RlXG4gICAgICAgICAgICBsZXQgd3AwOiBjYy5WZWMzID0gbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKVxuICAgICAgICAgICAgaWYod3AwLngtdGhpcy5QT0tFUl9XSURUSCA8IHdwLnggJiYgd3AueCA8IHdwMC54K3RoaXMuUE9LRVJfV0lEVEggXG4gICAgICAgICAgICAgICAgJiYgd3AwLnktdGhpcy5QT0tFUl9IRUlHSFQgPCB3cC55ICYmIHdwLnkgPCB3cDAueSt0aGlzLlBPS0VSX0hFSUdIVCApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXBJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcHJpdmF0ZSBnZXRUYXJnZXROb2RlKHBva2VyOiBQb2tlcikge1xuICAgICAgICBsZXQgbG9jYXRpb246IG51bWJlciA9IHBva2VyLmxvY2F0aW9uXG4gICAgICAgIGxldCBncm91cEluZGV4OiBudW1iZXIgPSBwb2tlci5ncm91cEluZGV4XG4gICAgICAgIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgRUxvY2F0aW9uLlBMQVk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheUFyZWFMaXN0W2dyb3VwSW5kZXhdXG4gICAgICAgICAgICBjYXNlIEVMb2NhdGlvbi5PUEVOOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5BcmVhXG4gICAgICAgICAgICBjYXNlIEVMb2NhdGlvbi5DTE9TRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZUFyZWFcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQobG9jYXRpb24gPT0gRUxvY2F0aW9uLlJFQ0VJVkUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjZWl2ZUFyZWFMaXN0W2dyb3VwSW5kZXhdXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBwb3NpdGlvbkluVGFyZ2V0KHBva2VyOiBQb2tlcik6IGNjLlZlYzMge1xuICAgICAgICBsZXQgbG9jYXRpb246IG51bWJlciA9IHBva2VyLmxvY2F0aW9uXG4gICAgICAgIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgRUxvY2F0aW9uLlBMQVk6XG4gICAgICAgICAgICAgICAgbGV0IHBva2VySWR4ID0gcG9rZXIuaW5kZXhJbkdyb3VwXG4gICAgICAgICAgICAgICAgbGV0IHJvb3RQb2tlckluZGV4ID0gcG9rZXIuZ3JvdXAucm9vdE9wZW5Qb2tlci5pbmRleEluR3JvdXBcbiAgICAgICAgICAgICAgICBpZihwb2tlcklkeCA8PSByb290UG9rZXJJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYy52MygwLCAtU29saXRhaXJlR2FtZURlc2t0b3BVSS5QTEFZX0NMT1NFX1BPS0VSX1BBRERJTkdfWSpwb2tlcklkeCwgMCkgXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYy52MygwLCAtU29saXRhaXJlR2FtZURlc2t0b3BVSS5QTEFZX0NMT1NFX1BPS0VSX1BBRERJTkdfWSpyb290UG9rZXJJbmRleCAtIFNvbGl0YWlyZUdhbWVEZXNrdG9wVUkuUExBWV9PUEVOX1BPS0VSX1BBRERJTkdfWSoocG9rZXJJZHgtcm9vdFBva2VySW5kZXgpLCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRUxvY2F0aW9uLk9QRU46XG4gICAgICAgICAgICAgICAgbGV0IHBva2VySW5kZXg6IG51bWJlciA9IHBva2VyLmluZGV4SW5Hcm91cFxuICAgICAgICAgICAgICAgIGxldCBwb2tlckxlbmd0aCA9IHBva2VyLmdyb3VwLnBva2Vycy5sZW5ndGhcbiAgICAgICAgICAgICAgICBpZihwb2tlckxlbmd0aCA+PSAzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocG9rZXJJbmRleCA9PSBwb2tlckxlbmd0aCAtIDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLnYzKHRoaXMuUEFERElOR19QTEFZLCAwLCAwKVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihwb2tlckluZGV4ID09IHBva2VyTGVuZ3RoIC0gMil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MudjModGhpcy5QQURESU5HX1BMQVkvMiwgMCwgMClcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuVmVjMy5aRVJPXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihwb2tlckxlbmd0aCA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocG9rZXJJbmRleCA9PSBwb2tlckxlbmd0aCAtIDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLnYzKHRoaXMuUEFERElOR19QTEFZLzIsIDAsIDApXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLlZlYzMuWkVST1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYy5WZWMzLlpFUk9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEVMb2NhdGlvbi5DTE9TRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuVmVjMy5aRVJPXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuYXNzZXJ0KGxvY2F0aW9uID09IEVMb2NhdGlvbi5SRUNFSVZFKVxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5WZWMzLlpFUk9cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDojrflvpfmiZHlhYvniYznm67moIfkvY3nva7lnKjlvZPliY3niLboioLngrnkuIvnmoTkvY3nva5cbiAgICBwcml2YXRlIGdldFRhcmdldEFuZFBvc2l0aW9uSW5QYXJlbnQocG9rZXI6IFBva2VyKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldDogY2MuTm9kZSA9IHRoaXMuZ2V0VGFyZ2V0Tm9kZShwb2tlcilcbiAgICAgICAgbGV0IHRwb3MgPSB0aGlzLnBvc2l0aW9uSW5UYXJnZXQocG9rZXIpXG4gICAgICAgIGxldCB3dHBvcyA9IHRhcmdldC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodHBvcylcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gcG9rZXIudmlldy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3dHBvcylcbiAgICAgICAgcmV0dXJuIHt0YXJnZXQsIHBvc2l0aW9ufVxuICAgIH1cblxuICAgIHB1YmxpYyBfX3RpbWVPZkRpc3RhbmNlKGZyb206IGNjLlZlYzMsIHRvOiBjYy5WZWMzLCBzcGVlZEZhY3RvcjogbnVtYmVyID0gMSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlOiBudW1iZXIgPSBjYy5WZWMzLmRpc3RhbmNlKGZyb20sIHRvKVxuICAgICAgICBjb25zdCBzcGVlZDogbnVtYmVyID0gMTUwMCpzcGVlZEZhY3RvclxuICAgICAgICBjb25zdCB0b3RhbF90aW1lOiBudW1iZXIgPSBkaXN0YW5jZS9zcGVlZFxuICAgICAgICByZXR1cm4gdG90YWxfdGltZVxuICAgIH1cbiAgICAvLyNlbmRyZWdpb25cbiAgICBcbiAgICAvLyNyZWdpb24gLy8hIElEcmFnRGVsZWdhdGVcbiAgICBwcml2YXRlIG1faXNUb3VjaFN0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtX2lzRHJhZ1N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtX01vdmVDb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIG1fRXZlbnRUb3VjaDogY2MuRXZlbnQuRXZlbnRUb3VjaCA9IG51bGw7XG4gICAgT25EcmFnVG91Y2hTdGFydCh1aVBva2VyOiBVSVBva2VyLCBldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLm1faXNUb3VjaFN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiggIXVpUG9rZXIuRHJhZ1N0YXJ0VGVzdCgpICkge1xuICAgICAgICAgICAgdGhpcy5DbGlja1VJUG9rZXIodWlQb2tlcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX2lzVG91Y2hTdGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMubV9pc0RyYWdTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fTW92ZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5tX0V2ZW50VG91Y2ggPSBldmVudDtcbiAgICAgICAgdGhpcy5TdGFydFNjaGVkdWxlcihcIkpVX1RPVUNIX1RJTUVcIiwgKCk9PntcbiAgICAgICAgICAgIGlmKCF0aGlzLm1faXNEcmFnU3RhcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1faXNEcmFnU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVpUG9rZXIuT25EcmFnU3RhcnQodGhpcy5tX0V2ZW50VG91Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjMsIDEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgT25EcmFnVG91Y2hNb3ZlKHVpUG9rZXI6IFVJUG9rZXIsIGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKXtcbiAgICAgICAgaWYoIXRoaXMubV9pc1RvdWNoU3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1faXNEcmFnU3RhcnQpIHtcbiAgICAgICAgICAgIHVpUG9rZXIuT25EcmFnTW92ZShldmVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgKyt0aGlzLm1fTW92ZUNvdW50O1xuICAgICAgICAgICAgaWYodGhpcy5tX01vdmVDb3VudCA+IDUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLlN0b3BTY2hlZHVsZXIoXCJKVV9UT1VDSF9USU1FXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubV9pc0RyYWdTdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50b3BaSW5kZXhCeVBva2VyKHVpUG9rZXIudm0pO1xuICAgICAgICAgICAgICAgIHVpUG9rZXIuT25EcmFnU3RhcnQoZXZlbnQpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm1fRXZlbnRUb3VjaCA9IGV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIE9uRHJhZ1RvdWNoRW5kKHVpUG9rZXI6IFVJUG9rZXIsIGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKXtcbiAgICAgICAgaWYoIXRoaXMubV9pc1RvdWNoU3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1faXNUb3VjaFN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuU3RvcFNjaGVkdWxlcihcIkpVX1RPVUNIX1RJTUVcIik7XG4gICAgICAgIGlmKHRoaXMubV9pc0RyYWdTdGFydCkge1xuICAgICAgICAgICAgdGhpcy5tX2lzRHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1fTW92ZUNvdW50ID0gMDtcbiAgICAgICAgICAgIHVpUG9rZXIuT25EcmFnRW5kKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0WkluZGV4KCk7XG4gICAgICAgICAgICAvLyDmi5bmi73liLAgUGxheSDljLpcbiAgICAgICAgICAgIGxldCBwbGF5SW5kZXggPSB0aGlzLmdldFBsYXlJbmRleEJ5UG9rZXIodWlQb2tlci52bSlcbiAgICAgICAgICAgIGlmKCBwbGF5SW5kZXggIT09IC0xICl7XG4gICAgICAgICAgICAgICAgdGhpcy5tX0p1Lk9uRHJhZ1RvUGxheSh1aVBva2VyLnZtLCBwbGF5SW5kZXgpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAvLyDmi5bmi73liLAgUmVjZWl2ZSDljLogXG4gICAgICAgICAgICBsZXQgcmVjZWl2ZUluZGV4ID0gdGhpcy5nZXRSZWNlaXZlSW5kZXhCeVVJUG9rZXIodWlQb2tlcilcbiAgICAgICAgICAgIGlmKCByZWNlaXZlSW5kZXggIT09IC0xICl7XG4gICAgICAgICAgICAgICAgdGhpcy5tX0p1Lk9uRHJhZ1RvUmVjZWl2ZSh1aVBva2VyLnZtLCByZWNlaXZlSW5kZXgpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAvLyDml6DmlYjnmoTmi5bmi71cbiAgICAgICAgICAgIHRoaXMuTW92ZVBva2VyQmFjayh1aVBva2VyLnZtKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuQ2xpY2tVSVBva2VyKHVpUG9rZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDbGlja1VJUG9rZXIodWlQb2tlcjogVUlQb2tlcikge1xuICAgICAgICAvLyDngrnlh7vkuovku7ZcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSB1aVBva2VyLnZtLmxvY2F0aW9uXG4gICAgICAgIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgRUxvY2F0aW9uLlBMQVk6XG4gICAgICAgICAgICAgICAgaWYodWlQb2tlci5pc09wZW4oKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9KdS5PblBsYXlQb2tlckNsaWNrKHVpUG9rZXIudm0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFTG9jYXRpb24uQ0xPU0U6XG4gICAgICAgICAgICAgICAgaWYodWlQb2tlci52bS5pc1RvcCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9KdS5PbkNsb3NlUG9rZXJDbGljayh1aVBva2VyLnZtKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBFTG9jYXRpb24uT1BFTjpcbiAgICAgICAgICAgICAgICBpZih1aVBva2VyLnZtLmlzVG9wKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tX0p1Lk9uT3BlblBva2VyQ2xpY2sodWlQb2tlci52bSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQobG9jYXRpb24gPT09IEVMb2NhdGlvbi5SRUNFSVZFKVxuICAgICAgICAgICAgICAgIHRoaXMubV9KdS5PblJlY2VpdmVQb2tlckNsaWNrKHVpUG9rZXIudm0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8jZW5kcmVnaW9uXG59XG4iXX0=