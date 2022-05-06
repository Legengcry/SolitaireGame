"use strict";
cc._RF.push(module, 'e1393PxAttAnKaDOm6pjmCN', 'DialogUIPanel');
// StartScene/Script/UIPanel/DialogUIPanel.ts

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
exports.DialogUIPanel = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogUIPanel = /** @class */ (function (_super) {
    __extends(DialogUIPanel, _super);
    function DialogUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLabel = null;
        _this.msgLabel = null;
        _this.buttonList = [];
        _this.labelList = [];
        return _this;
    }
    DialogUIPanel.prototype.OnCreate = function () { };
    DialogUIPanel.prototype.OnRelease = function () { };
    DialogUIPanel.prototype.OnOpen = function (uiArgs) {
        // 标题
        this.titleLabel.string = ii.LangUtil.Get(this.args.title);
        // 内容
        this.msgLabel.string = ii.LangUtil.Get(this.args.msg);
        // 按钮
        for (var i = 0; i < 3; ++i) {
            this.buttonList[i].node.active = i < this.args.btnCount;
        }
        this.labelList[0].string = ii.LangUtil.Get(this.args.label0);
        this.labelList[1].string = ii.LangUtil.Get(this.args.label1);
        this.labelList[2].string = ii.LangUtil.Get(this.args.label2);
    };
    DialogUIPanel.prototype.OnUIButtonClick = function (evt, btnIndex) {
        var _a, _b, _c;
        if (btnIndex == 0) {
            (_a = this.args.btnFunc0) === null || _a === void 0 ? void 0 : _a.call(null);
        }
        else if (btnIndex == 1) {
            (_b = this.args.btnFunc1) === null || _b === void 0 ? void 0 : _b.call(null);
        }
        else {
            console.assert(btnIndex == 2);
            (_c = this.args.btnFunc2) === null || _c === void 0 ? void 0 : _c.call(null);
        }
        this.Close();
    };
    __decorate([
        property({ type: cc.Label })
    ], DialogUIPanel.prototype, "titleLabel", void 0);
    __decorate([
        property({ type: cc.Label })
    ], DialogUIPanel.prototype, "msgLabel", void 0);
    __decorate([
        property({ type: [cc.Button] })
    ], DialogUIPanel.prototype, "buttonList", void 0);
    __decorate([
        property({ type: [cc.Label] })
    ], DialogUIPanel.prototype, "labelList", void 0);
    DialogUIPanel = __decorate([
        ccclass
    ], DialogUIPanel);
    return DialogUIPanel;
}(ii.UIPanel));
exports.DialogUIPanel = DialogUIPanel;

cc._RF.pop();