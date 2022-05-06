
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/UIPanel/DialogUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxVSVBhbmVsXFxEaWFsb2dVSVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtQyxpQ0FBZ0M7SUFBbkU7UUFBQSxxRUFtQ0M7UUFsQytCLGdCQUFVLEdBQWEsSUFBSyxDQUFDO1FBQzdCLGNBQVEsR0FBYSxJQUFLLENBQUM7UUFDdEIsZ0JBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBQzlCLGVBQVMsR0FBZSxFQUFFLENBQUM7O0lBK0IvRCxDQUFDO0lBN0JhLGdDQUFRLEdBQWxCLGNBQTZCLENBQUM7SUFDcEIsaUNBQVMsR0FBbkIsY0FBOEIsQ0FBQztJQUNyQiw4QkFBTSxHQUFoQixVQUFpQixNQUE0QjtRQUN6QyxLQUFLO1FBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxRCxLQUFLO1FBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0RCxLQUFLO1FBQ0wsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHVDQUFlLEdBQWYsVUFBZ0IsR0FBd0IsRUFBRSxRQUFhOztRQUNuRCxJQUFHLFFBQVEsSUFBSSxDQUFDLEVBQUU7WUFDZCxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ2xDO2FBQUssSUFBRyxRQUFRLElBQUksQ0FBQyxFQUFDO1lBQ25CLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDbEM7YUFBSTtZQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzdCLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDbEM7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQWpDMkI7UUFBM0IsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUMsQ0FBQztxREFBOEI7SUFDN0I7UUFBM0IsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUMsQ0FBQzttREFBNEI7SUFDdEI7UUFBaEMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7cURBQThCO0lBQzlCO1FBQS9CLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29EQUE0QjtJQUpsRCxhQUFhO1FBRHpCLE9BQU87T0FDSyxhQUFhLENBbUN6QjtJQUFELG9CQUFDO0NBbkNELEFBbUNDLENBbkNrQyxFQUFFLENBQUMsT0FBTyxHQW1DNUM7QUFuQ1ksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIERpYWxvZ1VJUGFuZWwgZXh0ZW5kcyBpaS5VSVBhbmVsPGlpLkRpYWxvZ1VJUGFuZWxBcmdzPiB7XG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5MYWJlbH0pIHRpdGxlTGFiZWw6IGNjLkxhYmVsID0gbnVsbCE7XG4gICAgQHByb3BlcnR5KHt0eXBlOiBjYy5MYWJlbH0pIG1zZ0xhYmVsOiBjYy5MYWJlbCA9IG51bGwhO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFtjYy5CdXR0b25dIH0pIGJ1dHRvbkxpc3Q6IGNjLkJ1dHRvbltdID0gW107XG4gICAgQHByb3BlcnR5KHsgdHlwZTogW2NjLkxhYmVsXSB9KSBsYWJlbExpc3Q6IGNjLkxhYmVsW10gPSBbXTtcblxuICAgIHByb3RlY3RlZCBPbkNyZWF0ZSgpOiB2b2lkIHsgfVxuICAgIHByb3RlY3RlZCBPblJlbGVhc2UoKTogdm9pZCB7IH1cbiAgICBwcm90ZWN0ZWQgT25PcGVuKHVpQXJnczogaWkuRGlhbG9nVUlQYW5lbEFyZ3MpOiB2b2lkIHtcbiAgICAgICAgLy8g5qCH6aKYXG4gICAgICAgIHRoaXMudGl0bGVMYWJlbC5zdHJpbmcgPSBpaS5MYW5nVXRpbC5HZXQodGhpcy5hcmdzLnRpdGxlKTtcblxuICAgICAgICAvLyDlhoXlrrlcbiAgICAgICAgdGhpcy5tc2dMYWJlbC5zdHJpbmcgPSBpaS5MYW5nVXRpbC5HZXQodGhpcy5hcmdzLm1zZyk7XG5cbiAgICAgICAgLy8g5oyJ6ZKuXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDM7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0W2ldLm5vZGUuYWN0aXZlID0gaSA8IHRoaXMuYXJncy5idG5Db3VudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhYmVsTGlzdFswXS5zdHJpbmcgPSBpaS5MYW5nVXRpbC5HZXQodGhpcy5hcmdzLmxhYmVsMCk7XG4gICAgICAgIHRoaXMubGFiZWxMaXN0WzFdLnN0cmluZyA9IGlpLkxhbmdVdGlsLkdldCh0aGlzLmFyZ3MubGFiZWwxKTtcbiAgICAgICAgdGhpcy5sYWJlbExpc3RbMl0uc3RyaW5nID0gaWkuTGFuZ1V0aWwuR2V0KHRoaXMuYXJncy5sYWJlbDIpO1xuICAgIH1cblxuICAgIE9uVUlCdXR0b25DbGljayhldnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGJ0bkluZGV4OiBhbnkpIHtcbiAgICAgICAgaWYoYnRuSW5kZXggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5hcmdzLmJ0bkZ1bmMwPy5jYWxsKG51bGwpO1xuICAgICAgICB9ZWxzZSBpZihidG5JbmRleCA9PSAxKXtcbiAgICAgICAgICAgIHRoaXMuYXJncy5idG5GdW5jMT8uY2FsbChudWxsKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChidG5JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5hcmdzLmJ0bkZ1bmMyPy5jYWxsKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcbiAgICB9XG59XG4iXX0=