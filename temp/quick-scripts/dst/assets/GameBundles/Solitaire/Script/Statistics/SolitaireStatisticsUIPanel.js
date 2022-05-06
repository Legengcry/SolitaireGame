
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/Statistics/SolitaireStatisticsUIPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c0d82i1dlDF4Seg17j9R/T', 'SolitaireStatisticsUIPanel');
// GameBundles/Solitaire/Script/Statistics/SolitaireStatisticsUIPanel.ts

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
var SolitairePrefabCfg_1 = require("../SolitairePrefabCfg");
var SolitaireActionUIPanel_1 = require("../_Public/SolitaireActionUIPanel");
var UIStatisticsPage_1 = require("./UIStatisticsPage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SolitaireStatisticsUIPanel = /** @class */ (function (_super) {
    __extends(SolitaireStatisticsUIPanel, _super);
    function SolitaireStatisticsUIPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageView = null;
        return _this;
    }
    SolitaireStatisticsUIPanel.prototype.OnCreate = function () {
        _super.prototype.OnCreate.call(this);
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnReset", this.OnReset.bind(this));
    };
    SolitaireStatisticsUIPanel.prototype.OnRelease = function () {
        var pages = this.pageView.getPages();
        this.pageView.removeAllPages();
        while (pages.length > 0) {
            pages.pop().getComponent(UIStatisticsPage_1.default).Close();
        }
        _super.prototype.OnRelease.call(this);
    };
    SolitaireStatisticsUIPanel.prototype.OnEnter = function () {
        var _this = this;
        this.scheduleOnce(function () {
            // 加载不同的页
            for (var card3 = 0; card3 < 2; ++card3) {
                for (var vegas = 0; vegas < 2; ++vegas) {
                    var page = ii.UIMgr.ins.Create(SolitairePrefabCfg_1.SolitairePrefabCfg.pfb.comp.UIStatisticsPage.key, {
                        vegas: vegas === 1,
                        card3: card3 === 1,
                        width: _this.pageView.node.width
                    });
                    _this.pageView.addPage(page.node);
                }
            }
        }, 0);
    };
    SolitaireStatisticsUIPanel.prototype.OnBack = function () {
        var _this = this;
        this.ExitWithAction(function () {
            _this.Close();
        }, false);
    };
    SolitaireStatisticsUIPanel.prototype.OnReset = function () {
        this.CurrentPage.Reset();
    };
    Object.defineProperty(SolitaireStatisticsUIPanel.prototype, "CurrentPage", {
        get: function () {
            var pageIndex = this.pageView.getCurrentPageIndex();
            var pages = this.pageView.getPages();
            return pages[pageIndex].getComponent(UIStatisticsPage_1.default);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property(cc.PageView)
    ], SolitaireStatisticsUIPanel.prototype, "pageView", void 0);
    __decorate([
        ii.Util.block(0.2)
    ], SolitaireStatisticsUIPanel.prototype, "OnReset", null);
    SolitaireStatisticsUIPanel = __decorate([
        ccclass
    ], SolitaireStatisticsUIPanel);
    return SolitaireStatisticsUIPanel;
}(SolitaireActionUIPanel_1.default));
exports.default = SolitaireStatisticsUIPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTdGF0aXN0aWNzXFxTb2xpdGFpcmVTdGF0aXN0aWNzVUlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBMkQ7QUFDM0QsNEVBQXVFO0FBQ3ZFLHVEQUE0RTtBQUV0RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUF3RCw4Q0FBc0I7SUFBOUU7UUFBQSxxRUFpREM7UUFoRDBCLGNBQVEsR0FBZ0IsSUFBSSxDQUFBOztJQWdEdkQsQ0FBQztJQTlDYSw2Q0FBUSxHQUFsQjtRQUNJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVTLDhDQUFTLEdBQW5CO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQzlCLE9BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7WUFDbkIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3REO1FBQ0QsaUJBQU0sU0FBUyxXQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNTLDRDQUFPLEdBQWpCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsU0FBUztZQUNULEtBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUU7Z0JBQ25DLEtBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUU7b0JBQ25DLElBQUksSUFBSSxHQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQXlDLHVDQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO3dCQUN2SSxLQUFLLEVBQUUsS0FBSyxLQUFLLENBQUM7d0JBQ2xCLEtBQUssRUFBRSxLQUFLLEtBQUssQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7cUJBQ2xDLENBQUMsQ0FBQztvQkFDSCxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ25DO2FBQ0o7UUFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRU8sMkNBQU0sR0FBZDtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNoQixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUdPLDRDQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFFRCxzQkFBWSxtREFBVzthQUF2QjtZQUNJLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtZQUNuRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ3BDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFBO1FBQzFELENBQUM7OztPQUFBO0lBL0NzQjtRQUF0QixRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnRUFBNkI7SUF1Q25EO1FBREMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzZEQUdsQjtJQTFDZ0IsMEJBQTBCO1FBRDlDLE9BQU87T0FDYSwwQkFBMEIsQ0FpRDlDO0lBQUQsaUNBQUM7Q0FqREQsQUFpREMsQ0FqRHVELGdDQUFzQixHQWlEN0U7a0JBakRvQiwwQkFBMEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb2xpdGFpcmVQcmVmYWJDZmcgfSBmcm9tIFwiLi4vU29saXRhaXJlUHJlZmFiQ2ZnXCI7XG5pbXBvcnQgU29saXRhaXJlQWN0aW9uVUlQYW5lbCBmcm9tIFwiLi4vX1B1YmxpYy9Tb2xpdGFpcmVBY3Rpb25VSVBhbmVsXCI7XG5pbXBvcnQgVUlTdGF0aXN0aWNzUGFnZSwgeyBVSVN0YXRpc3RpY3NQYWdlQXJncyB9IGZyb20gXCIuL1VJU3RhdGlzdGljc1BhZ2VcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29saXRhaXJlU3RhdGlzdGljc1VJUGFuZWwgZXh0ZW5kcyBTb2xpdGFpcmVBY3Rpb25VSVBhbmVsIHtcbiAgICBAcHJvcGVydHkoY2MuUGFnZVZpZXcpIHBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGwgXG5cbiAgICBwcm90ZWN0ZWQgT25DcmVhdGUoKSB7XG4gICAgICAgIHN1cGVyLk9uQ3JlYXRlKCk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPbkJhY2tcIiwgdGhpcy5PbkJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuU2V0SUlDbGlja0hhbmRsZXIoXCJPblJlc2V0XCIsIHRoaXMuT25SZXNldC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIE9uUmVsZWFzZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhZ2VzID0gdGhpcy5wYWdlVmlldy5nZXRQYWdlcygpXG4gICAgICAgIHRoaXMucGFnZVZpZXcucmVtb3ZlQWxsUGFnZXMoKVxuICAgICAgICB3aGlsZShwYWdlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHBhZ2VzLnBvcCgpLmdldENvbXBvbmVudChVSVN0YXRpc3RpY3NQYWdlKS5DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLk9uUmVsZWFzZSgpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgT25FbnRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIC8vIOWKoOi9veS4jeWQjOeahOmhtVxuICAgICAgICAgICAgZm9yKGxldCBjYXJkMyA9IDA7IGNhcmQzIDwgMjsgKytjYXJkMykge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgdmVnYXMgPSAwOyB2ZWdhcyA8IDI7ICsrdmVnYXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2U6IFVJU3RhdGlzdGljc1BhZ2UgPSBpaS5VSU1nci5pbnMuQ3JlYXRlPFVJU3RhdGlzdGljc1BhZ2UsIFVJU3RhdGlzdGljc1BhZ2VBcmdzPihTb2xpdGFpcmVQcmVmYWJDZmcucGZiLmNvbXAuVUlTdGF0aXN0aWNzUGFnZS5rZXksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlZ2FzOiB2ZWdhcyA9PT0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQzOiBjYXJkMyA9PT0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnBhZ2VWaWV3Lm5vZGUud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuYWRkUGFnZShwYWdlLm5vZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKVxuICAgIH1cblxuICAgIHByaXZhdGUgT25CYWNrKCkge1xuICAgICAgICB0aGlzLkV4aXRXaXRoQWN0aW9uKCgpPT57XG4gICAgICAgICAgICB0aGlzLkNsb3NlKCk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBAaWkuVXRpbC5ibG9jaygwLjIpXG4gICAgcHJpdmF0ZSBPblJlc2V0KCkge1xuICAgICAgICB0aGlzLkN1cnJlbnRQYWdlLlJlc2V0KClcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBDdXJyZW50UGFnZSgpOiBVSVN0YXRpc3RpY3NQYWdlIHtcbiAgICAgICAgbGV0IHBhZ2VJbmRleCA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpXG4gICAgICAgIGxldCBwYWdlcyA9IHRoaXMucGFnZVZpZXcuZ2V0UGFnZXMoKVxuICAgICAgICByZXR1cm4gcGFnZXNbcGFnZUluZGV4XS5nZXRDb21wb25lbnQoVUlTdGF0aXN0aWNzUGFnZSlcbiAgICB9XG59XG4iXX0=