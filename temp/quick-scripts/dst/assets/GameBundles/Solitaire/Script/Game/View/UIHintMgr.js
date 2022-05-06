
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Game/View/UIHintMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxHYW1lXFxWaWV3XFxVSUhpbnRNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQThEO0FBQzlELG9EQUFtRDtBQVM1QyxJQUFBLE9BQU8sR0FBSSxFQUFFLENBQUMsVUFBVSxRQUFqQixDQUFrQjtBQUVoQztJQUF1Qyw2QkFBd0I7SUFBL0Q7O0lBZ0JBLENBQUM7SUFmYSw0QkFBUSxHQUFsQixjQUE2QixDQUFDO0lBQ3BCLDZCQUFTLEdBQW5CLGNBQThCLENBQUM7SUFDckIsMEJBQU0sR0FBaEIsVUFBaUIsTUFBcUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDdEcsQ0FBQztJQUVPLHVDQUFtQixHQUEzQjtRQUNJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBcUIsdUNBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQzVFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUU7WUFDcEMsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQzFCLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7U0FDbkIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQWZnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBZ0I3QjtJQUFELGdCQUFDO0NBaEJELEFBZ0JDLENBaEJzQyxFQUFFLENBQUMsTUFBTSxHQWdCL0M7a0JBaEJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29saXRhaXJlUHJlZmFiQ2ZnIH0gZnJvbSBcIi4uLy4uL1NvbGl0YWlyZVByZWZhYkNmZ1wiO1xuaW1wb3J0IHsgU29saXRhaXJlSnUgfSBmcm9tIFwiLi4vTW9kZWwvU29saXRhaXJlSnVcIjtcbmltcG9ydCBTb2xpdGFpcmVHYW1lRGVza3RvcFVJIGZyb20gXCIuL1NvbGl0YWlyZUdhbWVEZXNrdG9wVUlcIjtcbmltcG9ydCBVSUhpbnQsIHsgVUlIaW50QXJncyB9IGZyb20gXCIuL1VJSGludFwiO1xuXG5leHBvcnQgdHlwZSBVSUhpbnRNZ3JBcmdzID0ge1xuICAgIGp1OiBTb2xpdGFpcmVKdSxcbiAgICBkZXNrdG9wOiBTb2xpdGFpcmVHYW1lRGVza3RvcFVJXG59XG5cbmNvbnN0IHtjY2NsYXNzfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlIaW50TWdyIGV4dGVuZHMgaWkuVUlDb21wPFVJSGludE1nckFyZ3M+IHtcbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25SZWxlYXNlKCk6IHZvaWQgeyB9XG4gICAgcHJvdGVjdGVkIE9uT3Blbih1aUFyZ3M6IFVJSGludE1nckFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkdsb2JhbChTb2xpdGFpcmVKdS5ldmVudC5FVkVOVF9MRVZFTF9NT0RFTF9VU0lOR19ISU5ULCB0aGlzLkhhbmRsZU9wZXJhdGlvbkhpbnQuYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIEhhbmRsZU9wZXJhdGlvbkhpbnQoKSB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMuYXJncy5qdS5IYXNPcGVyYXRpb25IaW50KCkpXG4gICAgICAgIGlpLlVJTWdyLmlucy5DcmVhdGU8VUlIaW50LCBVSUhpbnRBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuVUlIaW50LmtleSwge1xuICAgICAgICAgICAgaGludDogdGhpcy5hcmdzLmp1LkRvT3BlcmF0aW9uSGludCgpLFxuICAgICAgICAgICAgdWlNZ3I6IHRoaXMsXG4gICAgICAgICAgICBkZXNrdG9wOiB0aGlzLmFyZ3MuZGVza3RvcCxcbiAgICAgICAgICAgIGp1OiB0aGlzLmFyZ3MuanVcbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcbiAgICB9XG59XG4iXX0=