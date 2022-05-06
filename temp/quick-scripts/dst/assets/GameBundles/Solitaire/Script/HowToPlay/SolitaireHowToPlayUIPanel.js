
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/HowToPlay/SolitaireHowToPlayUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxIb3dUb1BsYXlcXFNvbGl0YWlyZUhvd1RvUGxheVVJUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXVFO0FBRWpFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDO0lBQXVELDZDQUFzQjtJQUE3RTtRQUFBLHFFQXFCQztRQXBCNEIsaUJBQVcsR0FBa0IsRUFBRSxDQUFBO1FBRWhELGVBQVMsR0FBYTtZQUMxQixrRUFBa0U7WUFDakUsNEZBQTRGO1lBQzVGLG1FQUFtRTtZQUNuRSx3REFBd0Q7WUFDeEQscUhBQXFIO1lBQ3JILG1PQUFtTztZQUNuTyw4REFBOEQ7U0FDbEUsQ0FBQTs7SUFVTCxDQUFDO0lBVGEsNENBQVEsR0FBbEI7UUFBQSxpQkFJQztRQUhHLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLLElBQUssT0FBQSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU8sMENBQU0sR0FBZDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBbkJ3QjtRQUF4QixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7a0VBQWdDO0lBRHZDLHlCQUF5QjtRQUQ3QyxPQUFPO09BQ2EseUJBQXlCLENBcUI3QztJQUFELGdDQUFDO0NBckJELEFBcUJDLENBckJzRCxnQ0FBc0IsR0FxQjVFO2tCQXJCb0IseUJBQXlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNvbGl0YWlyZUFjdGlvblVJUGFuZWwgZnJvbSBcIi4uL19QdWJsaWMvU29saXRhaXJlQWN0aW9uVUlQYW5lbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2xpdGFpcmVIb3dUb1BsYXlVSVBhbmVsIGV4dGVuZHMgU29saXRhaXJlQWN0aW9uVUlQYW5lbCB7XG4gICAgQHByb3BlcnR5KFtjYy5SaWNoVGV4dF0pIG1fUmljaFRleHRzOiBjYy5SaWNoVGV4dFtdID0gW11cblxuICAgIHByaXZhdGUgc19TdHJpbmdzOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgXCI8Y29sb3I9IzAwMDAwMD4x44CB5Zyo5pys57q454mM5ri45oiP5Lit77yM55uu5qCH5piv5Zyo5Zub5Liq57uT5p6c54mM5aCG5Lit5pS+572u55u45ZCM6Iqx6Imy55qEYeWIsGvnmoTljaHniYzjgILku6Vh5byA5aS077yM5Lula+e7k+WwvuOAgjwvYz5cIlxuICAgICAgICAsXCI8Y29sb3I9IzAwMDAwMD4y44CB5Lit6Ze054mM5aCG5Lit5pyJ5LiD5YiX77yM5oKo5Y+v5Lul5Zyo5YW25Lit5bCG5LiA5YiX56e75Yqo5Yiw5Y+m5LiA5YiX44CC5YiX5Lit55qE5Y2h54mH5b+F6aG75oyJ6ZmN5bqP5o6S5YiX77yM57qi6Imy5LiO6buR6Imy5Lqk5pu/5pS+572u44CC5L6L5aaC77yM5oKo5Y+v5Lul5bCG6buR6ImyIDgg5pS+5Zyo57qi6ImyIDcg5LiK44CCPC9jPlwiXG4gICAgICAgICxcIjxjb2xvcj0jMDAwMDAwPjPjgIHmgqjov5jlj6/ku6XlnKjliJfkuYvpl7TmjInpobrluo/loIblj6DljaHniYfjgILlj6rpnIDngrnlh7vloIbmoIjkuK3mnIDmt7HnmoTljaHniYfvvIznhLblkI7lsIblhbblhajpg6jmi5bliqjliLDlj6bkuIDliJfljbPlj6/jgII8L2M+XCJcbiAgICAgICAgLFwiPGNvbG9yPSMwMDAwMDA+NOOAgeWmguaenOaCqOacieS4gOS4quepuuWIl++8jOWImeWPr+S7peaUvue9ruS4gOS4qiBrIOaIluS7u+S9leW4puaciSBrIOeahOmhuuW6j+WNoeeJjOOAgjwvYz5cIlxuICAgICAgICAsXCI8Y29sb3I9IzAwMDAwMD4144CB5oKo5Y+v5Lul6YCa6L+H54K55Ye7IDxjb2xvcj0jN0U0NDM1PuWPkeeJjOWMujwvYz4sICDlpoLmnpwgPGNvbG9yPSM3RTQ0MzU+5Y+R54mM5Yy6PC9jPiDkuLrnqbosIOeCueWHu+Wug+S7peS9v+W+lyA8Y29sb3I9IzdFNDQzNT7lvIPniYzloIY8L2M+5oGi5aSNPC9jPlwiXG4gICAgICAgICxcIjxjb2xvcj0jMDAwMDAwPjbjgIHliJ3lp4vlvpfliIYxMDAw5YiG77yM5q+P5qyh56e75YqoLTHliIbvvIzmr4/lvKDniYzku7flgLzmgLvorqExNeWIhuOAguW9k+S4gOW8oOWNoeS7juS7u+aEjzxjb2xvcj0jMDAwMDAwPuS4gOWIlzwvYz7miJbmmK88Y29sb3I9IzAwMDAwMD7lvIPniYzloIY8L2M+56e75YiwPGNvbG9yPSMwMDAwMDA+5Lit6Ze054mM5aCGPC9jPuS4iuaXtu+8jOS9oOWPr+S7peW+l+WIsDE15YiG44CC5q+P5byg5LuOPGNvbG9yPSMwMDAwMDA+5byD54mM5aCGPC9jPuenu+WIsDxjb2xvcj0jMDAwMDAwPuS4remXtOeJjOWghjwvYz7nmoTljaHniYflvpc15YiG44CC5Zyo5Lit6Ze054mM5aCG5Lit57+75Ye655qE5q+P5byg5Y2h54mH6YO95b6XNeWIhuOAguWPlua2iOaXtuWwhuaJo+mZpOWlluWKseenr+WIhuOAgjwvYz5cIlxuICAgICAgICAsXCI8Y29sb3I9IzAwMDAwMD4344CB5Yi25L2c5oiQ5ZGY77ya6buE5rW377yM5b6Q552/6bqf77yM5Y+25b+X5by677yM5p2O5rSL77yM5ZGo552/77yM6YOR5Z+55p2w77yM6IyD5rWp6bmPIFxcbuaMh+WvvOaVmeW4iO+8muWNsOiOuTwvYz5cIlxuICAgIF1cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLk9uQ3JlYXRlKCk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkJhY2tcIiwgdGhpcy5PbkJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubV9SaWNoVGV4dHMuZm9yRWFjaCgocmljaCwgaW5kZXgpID0+IHJpY2guc3RyaW5nID0gdGhpcy5zX1N0cmluZ3NbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIE9uQmFjaygpIHtcbiAgICAgICAgdGhpcy5FeGl0V2l0aEFjdGlvbih0aGlzLkNsb3NlLmJpbmQodGhpcykpO1xuICAgIH1cbn1cbiJdfQ==