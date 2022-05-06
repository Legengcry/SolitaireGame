"use strict";
cc._RF.push(module, '118ceuFAblOjpWbpbnasfgm', 'SolitaireHowToPlayUIPanel');
// GameBundles/Solitaire/Script/HowToPlay/SolitaireHowToPlayUIPanel.ts

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
var SolitaireActionUIPanel_1 = require("../_Public/SolitaireActionUIPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireHowToPlayUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireHowToPlayUIPanel, _super);
    function SolitaireHowToPlayUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_RichTexts = [];
        _this.s_Strings = [
            "<color=#000000>1、在本纸牌游戏中，目标是在四个结果牌堆中放置相同花色的a到k的卡牌。以a开头，以k结尾。</c>",
            "<color=#000000>2、中间牌堆中有七列，您可以在其中将一列移动到另一列。列中的卡片必须按降序排列，红色与黑色交替放置。例如，您可以将黑色 8 放在红色 7 上。</c>",
            "<color=#000000>3、您还可以在列之间按顺序堆叠卡片。只需点击堆栈中最深的卡片，然后将其全部拖动到另一列即可。</c>",
            "<color=#000000>4、如果您有一个空列，则可以放置一个 k 或任何带有 k 的顺序卡牌。</c>",
            "<color=#000000>5、您可以通过点击 <color=#7E4435>发牌区</c>,  如果 <color=#7E4435>发牌区</c> 为空, 点击它以使得 <color=#7E4435>弃牌堆</c>恢复</c>",
            "<color=#000000>6、初始得分1000分，每次移动-1分，每张牌价值总计15分。当一张卡从任意<color=#000000>一列</c>或是<color=#000000>弃牌堆</c>移到<color=#000000>中间牌堆</c>上时，你可以得到15分。每张从<color=#000000>弃牌堆</c>移到<color=#000000>中间牌堆</c>的卡片得5分。在中间牌堆中翻出的每张卡片都得5分。取消时将扣除奖励积分。</c>",
            "<color=#000000>7、制作成员：黄海，徐睿麟，叶志强，李洋，周睿，郑培杰，范浩鹏 \n指导教师：印莹</c>"
        ];
        return _this;
    }
    SolitaireHowToPlayUIPanel.prototype.OnCreate = function () {
        var _this = this;
        _super.prototype.OnCreate.call(this);
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.m_RichTexts.forEach(function (rich, index) { return rich.string = _this.s_Strings[index]; });
    };
    SolitaireHowToPlayUIPanel.prototype.OnBack = function () {
        this.ExitWithAction(this.Close.bind(this));
    };
    __decorate([
        property([cc.RichText])
    ], SolitaireHowToPlayUIPanel.prototype, "m_RichTexts", void 0);
    SolitaireHowToPlayUIPanel = __decorate([
        ccclass
    ], SolitaireHowToPlayUIPanel);
    return SolitaireHowToPlayUIPanel;
}(SolitaireActionUIPanel_1.default));
exports.default = SolitaireHowToPlayUIPanel;

cc._RF.pop();