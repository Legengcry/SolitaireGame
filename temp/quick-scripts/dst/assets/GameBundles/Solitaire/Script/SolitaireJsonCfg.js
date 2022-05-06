
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitaireJsonCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b61a41RyndMa7irtmjNPW9h', 'SolitaireJsonCfg');
// GameBundles/Solitaire/Script/SolitaireJsonCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireJsonCfg = void 0;
var SolitaireJsonCfg = /** @class */ (function () {
    function SolitaireJsonCfg() {
    }
    SolitaireJsonCfg.GetLevelJsonResKey = function (isVegas, is3Card) {
        return this.key["level_" + (isVegas ? 1 : 0) + "_" + (is3Card ? 1 : 0)];
    };
    SolitaireJsonCfg.Register = function (bundleName) {
        console.info("SolitairePrefabCfg::Register(" + bundleName + ") >> \u6CE8\u518C Prefab \u8D44\u6E90");
        ii.registerResDict(this.key, bundleName, ii.EResType.Json);
    };
    SolitaireJsonCfg.key = {
        level_0_0: 'level_0_0',
        level_1_0: 'level_1_0',
        level_0_1: 'level_0_1',
        level_1_1: 'level_1_1'
    };
    return SolitaireJsonCfg;
}());
exports.SolitaireJsonCfg = SolitaireJsonCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVKc29uQ2ZnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFnQkEsQ0FBQztJQVJVLG1DQUFrQixHQUF6QixVQUEwQixPQUFnQixFQUFFLE9BQWdCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFTLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUE7SUFDbEUsQ0FBQztJQUVNLHlCQUFRLEdBQWYsVUFBZ0IsVUFBa0I7UUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBZ0MsVUFBVSwwQ0FBbUIsQ0FBQyxDQUFBO1FBQzNFLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBZGUsb0JBQUcsR0FBRztRQUNsQixTQUFTLEVBQUUsV0FBVztRQUN0QixTQUFTLEVBQUUsV0FBVztRQUN0QixTQUFTLEVBQUUsV0FBVztRQUN0QixTQUFTLEVBQUUsV0FBVztLQUN6QixDQUFBO0lBVUwsdUJBQUM7Q0FoQkQsQUFnQkMsSUFBQTtBQWhCWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU29saXRhaXJlSnNvbkNmZyB7XG4gICAgc3RhdGljIHJlYWRvbmx5IGtleSA9IHtcbiAgICAgICAgbGV2ZWxfMF8wOiAnbGV2ZWxfMF8wJyxcbiAgICAgICAgbGV2ZWxfMV8wOiAnbGV2ZWxfMV8wJyxcbiAgICAgICAgbGV2ZWxfMF8xOiAnbGV2ZWxfMF8xJyxcbiAgICAgICAgbGV2ZWxfMV8xOiAnbGV2ZWxfMV8xJ1xuICAgIH1cblxuICAgIHN0YXRpYyBHZXRMZXZlbEpzb25SZXNLZXkoaXNWZWdhczogYm9vbGVhbiwgaXMzQ2FyZDogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlbYGxldmVsXyR7aXNWZWdhcyA/IDEgOiAwfV8ke2lzM0NhcmQgPyAxIDogMH1gXVxuICAgIH1cblxuICAgIHN0YXRpYyBSZWdpc3RlcihidW5kbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGBTb2xpdGFpcmVQcmVmYWJDZmc6OlJlZ2lzdGVyKCR7YnVuZGxlTmFtZX0pID4+IOazqOWGjCBQcmVmYWIg6LWE5rqQYClcbiAgICAgICAgaWkucmVnaXN0ZXJSZXNEaWN0KHRoaXMua2V5LCBidW5kbGVOYW1lLCBpaS5FUmVzVHlwZS5Kc29uKTtcbiAgICB9XG59XG4iXX0=