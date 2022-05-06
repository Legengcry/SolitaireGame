"use strict";
cc._RF.push(module, '8b016iqsxpGb7VjRG1XFA45', 'UIHintMgr');
// GameBundles/Solitaire/Script/Game/View/UIHintMgr.ts

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
var SolitairePrefabCfg_1 = require("../../SolitairePrefabCfg");
var SolitaireJu_1 = require("../Model/SolitaireJu");
var ccclass = cc._decorator.ccclass;
var UIHintMgr = /** @class */ (function (_super) {
    __extends(UIHintMgr, _super);
    function UIHintMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIHintMgr.prototype.OnCreate = function () { };
    UIHintMgr.prototype.OnRelease = function () { };
    UIHintMgr.prototype.OnOpen = function (uiArgs) {
        this.onGlobal(SolitaireJu_1.SolitaireJu.event.EVENT_LEVEL_MODEL_USING_HINT, this.HandleOperationHint.bind(this));
    };
    UIHintMgr.prototype.HandleOperationHint = function () {
        console.assert(this.args.ju.HasOperationHint());
        ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIHint.key, {
            hint: this.args.ju.DoOperationHint(),
            uiMgr: this,
            desktop: this.args.desktop,
            ju: this.args.ju
        }, this.node);
    };
    UIHintMgr = __decorate([
        ccclass
    ], UIHintMgr);
    return UIHintMgr;
}(ii.UIComp));
exports.default = UIHintMgr;

cc._RF.pop();