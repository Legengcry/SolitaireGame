"use strict";
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