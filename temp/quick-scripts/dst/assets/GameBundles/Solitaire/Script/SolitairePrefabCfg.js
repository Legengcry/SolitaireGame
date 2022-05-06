
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitairePrefabCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90cdbMcEpNOq6fKMGEwFqvT', 'SolitairePrefabCfg');
// GameBundles/Solitaire/Script/SolitairePrefabCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitairePrefabCfg = void 0;
var SolitairePrefabCfg = /** @class */ (function () {
    function SolitairePrefabCfg() {
    }
    SolitairePrefabCfg.Register = function (bundleName) {
        console.info("SolitairePrefabCfg::Register(" + bundleName + ") >> \u6CE8\u518C Prefab \u8D44\u6E90");
        ii.registerPrefabCfg(this.pfb, bundleName);
    };
    //! solitaire
    SolitairePrefabCfg.pfb = {
        panel: {
            LoadingADUIPanel: { key: "_p/LoadingADUIPanel", z: ii.UIZIndex.PopUp },
            SolitaireMenuUIPanel: { key: "Menu/SolitaireMenuUIPanel", z: ii.UIZIndex.Normal },
            SolitaireOptionsUIPanel: { key: "Options/SolitaireOptionsUIPanel", z: ii.UIZIndex.PopUp },
            SolitaireStatisticsUIPanel: { key: "Statistics/SolitaireStatisticsUIPanel", z: ii.UIZIndex.PopUp },
            SolitaireThemesUIPanel: { key: "Themes/SolitaireThemesUIPanel", z: ii.UIZIndex.PopUp },
            SolitaireHowToPlayUIPanel: { key: "HowToPlay/SolitaireHowToPlayUIPanel", z: ii.UIZIndex.PopUp },
            SolitaireGameUIPanel: { key: "Game/SolitaireGameUIPanel", z: ii.UIZIndex.Normal },
            UINewGame: { key: "Game/UINewGame", z: ii.UIZIndex.PopUp },
            UIGameWin: { key: "Game/UIGameWin", z: ii.UIZIndex.PopUp },
            UIGameLose: { key: "Game/UIGameLose", z: ii.UIZIndex.PopUp },
            SolitaireSeedListUIPanel: { key: "Seed/SolitaireSeedListUIPanel", z: ii.UIZIndex.PopUp }
        },
        comp: {
            //! Public
            SolitaireUICoin: { key: "_p/SolitaireUICoin" },
            SolitaireUICoinLabel: { key: "_p/SolitaireUICoinLabel" }
            //! Game
            ,
            SolitaireGameDesktopUI: { key: "Game/SolitaireGameDesktopUI" },
            SolitaireGameTopInfoUI: { key: "Game/SolitaireGameTopInfoUI" },
            SolitaireGameBottomMenuUI: { key: "Game/SolitaireGameBottomMenuUI" },
            SolitairePokerDisplayUI: { key: "Game/SolitairePokerDisplayUI" },
            UIPoker: { key: "Game/UIPoker" },
            UIHintMgr: { key: "Game/UIHintMgr" },
            UIHint: { key: "Game/UIHint" }
            //! Statistics
            ,
            UIStatisticsPage: { key: "Statistics/UIStatisticsPage" }
            //! Themes
            ,
            SolitaireThemesSelfSkinUI: { key: "Themes/SolitaireThemesSelfSkinUI" },
            SolitaireThemesSelfSkinItemUI: { key: "Themes/SolitaireThemesSelfSkinItemUI" },
            SolitaireThemesContentsUI: { key: "Themes/SolitaireThemesContentsUI" },
            SolitaireThemesEffectUI: { key: "Themes/SolitaireThemesEffectUI" },
            SolitaireThemesEffectColumnUI: { key: "Themes/SolitaireThemesEffectColumnUI" },
            UIThemeMenuContentPokerBack: { key: "Themes/UIThemeMenuContentPokerBack" },
            UIThemeMenuContentPokerBackKindItem: { key: "Themes/UIThemeMenuContentPokerBackKindItem" },
            UIThemeMenuContentPokerBackKindSubItem: { key: "Themes/UIThemeMenuContentPokerBackKindSubItem" },
            UIThemeMenuContentPokerFace: { key: "Themes/UIThemeMenuContentPokerFace" },
            UIThemeMenuContentPokerFaceItem: { key: "Themes/UIThemeMenuContentPokerFaceItem" },
            UIThemeMenuContentBoards: { key: "Themes/UIThemeMenuContentBoards" },
            UIThemeMenuContentBoardsBackgroundColorItem: { key: "Themes/UIThemeMenuContentBoardsBackgroundColorItem" },
            UIThemeMenuContentBoardsPatternItem: { key: "Themes/UIThemeMenuContentBoardsPatternItem" }
            //! Seed
            ,
            SolitaireSeedListItemUI: { key: "Seed/SolitaireSeedListItemUI" }
        }
    };
    return SolitairePrefabCfg;
}());
exports.SolitairePrefabCfg = SolitairePrefabCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVQcmVmYWJDZmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQStEQSxDQUFDO0lBSlUsMkJBQVEsR0FBZixVQUFnQixVQUFrQjtRQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFnQyxVQUFVLDBDQUFtQixDQUFDLENBQUE7UUFDM0UsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQTdERCxhQUFhO0lBQ04sc0JBQUcsR0FBRztRQUNULEtBQUssRUFBRTtZQUNILGdCQUFnQixFQUFFLEVBQUMsR0FBRyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNwRSxvQkFBb0IsRUFBRSxFQUFDLEdBQUcsRUFBRSwyQkFBMkIsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFFaEYsdUJBQXVCLEVBQUUsRUFBQyxHQUFHLEVBQUUsaUNBQWlDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBRXhGLDBCQUEwQixFQUFFLEVBQUMsR0FBRyxFQUFFLHVDQUF1QyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUVqRyxzQkFBc0IsRUFBRSxFQUFDLEdBQUcsRUFBRSwrQkFBK0IsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFFckYseUJBQXlCLEVBQUUsRUFBQyxHQUFHLEVBQUUscUNBQXFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBRTlGLG9CQUFvQixFQUFFLEVBQUMsR0FBRyxFQUFFLDJCQUEyQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNoRixTQUFTLEVBQUUsRUFBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3pELFNBQVMsRUFBRSxFQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDekQsVUFBVSxFQUFFLEVBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUUzRCx3QkFBd0IsRUFBRSxFQUFDLEdBQUcsRUFBRSwrQkFBK0IsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7U0FDM0Y7UUFDRCxJQUFJLEVBQUU7WUFDRixVQUFVO1lBQ1YsZUFBZSxFQUFFLEVBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFO1lBQzVDLG9CQUFvQixFQUFFLEVBQUMsR0FBRyxFQUFFLHlCQUF5QixFQUFFO1lBRXhELFFBQVE7O1lBQ1Asc0JBQXNCLEVBQUUsRUFBQyxHQUFHLEVBQUUsNkJBQTZCLEVBQUU7WUFDN0Qsc0JBQXNCLEVBQUUsRUFBQyxHQUFHLEVBQUUsNkJBQTZCLEVBQUU7WUFDN0QseUJBQXlCLEVBQUUsRUFBQyxHQUFHLEVBQUUsZ0NBQWdDLEVBQUU7WUFDbkUsdUJBQXVCLEVBQUUsRUFBQyxHQUFHLEVBQUUsOEJBQThCLEVBQUU7WUFDL0QsT0FBTyxFQUFFLEVBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRTtZQUMvQixTQUFTLEVBQUUsRUFBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7WUFDbkMsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFFLGFBQWEsRUFBRTtZQUU5QixjQUFjOztZQUNiLGdCQUFnQixFQUFFLEVBQUMsR0FBRyxFQUFFLDZCQUE2QixFQUFFO1lBRXhELFVBQVU7O1lBQ1QseUJBQXlCLEVBQUUsRUFBQyxHQUFHLEVBQUUsa0NBQWtDLEVBQUM7WUFDcEUsNkJBQTZCLEVBQUUsRUFBQyxHQUFHLEVBQUUsc0NBQXNDLEVBQUM7WUFDNUUseUJBQXlCLEVBQUUsRUFBQyxHQUFHLEVBQUUsa0NBQWtDLEVBQUM7WUFDcEUsdUJBQXVCLEVBQUUsRUFBQyxHQUFHLEVBQUUsZ0NBQWdDLEVBQUM7WUFDaEUsNkJBQTZCLEVBQUUsRUFBQyxHQUFHLEVBQUUsc0NBQXNDLEVBQUM7WUFDNUUsMkJBQTJCLEVBQUUsRUFBQyxHQUFHLEVBQUUsb0NBQW9DLEVBQUM7WUFDeEUsbUNBQW1DLEVBQUUsRUFBQyxHQUFHLEVBQUUsNENBQTRDLEVBQUM7WUFDeEYsc0NBQXNDLEVBQUUsRUFBQyxHQUFHLEVBQUUsK0NBQStDLEVBQUM7WUFDOUYsMkJBQTJCLEVBQUUsRUFBQyxHQUFHLEVBQUUsb0NBQW9DLEVBQUM7WUFDeEUsK0JBQStCLEVBQUUsRUFBQyxHQUFHLEVBQUUsd0NBQXdDLEVBQUM7WUFDaEYsd0JBQXdCLEVBQUUsRUFBQyxHQUFHLEVBQUUsaUNBQWlDLEVBQUM7WUFDbEUsMkNBQTJDLEVBQUUsRUFBQyxHQUFHLEVBQUUsb0RBQW9ELEVBQUM7WUFDeEcsbUNBQW1DLEVBQUUsRUFBQyxHQUFHLEVBQUUsNENBQTRDLEVBQUM7WUFFekYsUUFBUTs7WUFDUCx1QkFBdUIsRUFBRSxFQUFDLEdBQUcsRUFBRSw4QkFBOEIsRUFBRTtTQUNuRTtLQUNKLENBQUE7SUFNTCx5QkFBQztDQS9ERCxBQStEQyxJQUFBO0FBL0RZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTb2xpdGFpcmVQcmVmYWJDZmcge1xuICAgIC8vISBzb2xpdGFpcmVcbiAgICBzdGF0aWMgcGZiID0ge1xuICAgICAgICBwYW5lbDoge1xuICAgICAgICAgICAgTG9hZGluZ0FEVUlQYW5lbDoge2tleTogXCJfcC9Mb2FkaW5nQURVSVBhbmVsXCIsIHo6IGlpLlVJWkluZGV4LlBvcFVwIH1cbiAgICAgICAgICAgICxTb2xpdGFpcmVNZW51VUlQYW5lbDoge2tleTogXCJNZW51L1NvbGl0YWlyZU1lbnVVSVBhbmVsXCIsIHo6IGlpLlVJWkluZGV4Lk5vcm1hbCB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICxTb2xpdGFpcmVPcHRpb25zVUlQYW5lbDoge2tleTogXCJPcHRpb25zL1NvbGl0YWlyZU9wdGlvbnNVSVBhbmVsXCIsIHo6IGlpLlVJWkluZGV4LlBvcFVwIH1cblxuICAgICAgICAgICAgLFNvbGl0YWlyZVN0YXRpc3RpY3NVSVBhbmVsOiB7a2V5OiBcIlN0YXRpc3RpY3MvU29saXRhaXJlU3RhdGlzdGljc1VJUGFuZWxcIiwgejogaWkuVUlaSW5kZXguUG9wVXAgfVxuXG4gICAgICAgICAgICAsU29saXRhaXJlVGhlbWVzVUlQYW5lbDoge2tleTogXCJUaGVtZXMvU29saXRhaXJlVGhlbWVzVUlQYW5lbFwiLCB6OiBpaS5VSVpJbmRleC5Qb3BVcCB9XG5cbiAgICAgICAgICAgICxTb2xpdGFpcmVIb3dUb1BsYXlVSVBhbmVsOiB7a2V5OiBcIkhvd1RvUGxheS9Tb2xpdGFpcmVIb3dUb1BsYXlVSVBhbmVsXCIsIHo6IGlpLlVJWkluZGV4LlBvcFVwIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLFNvbGl0YWlyZUdhbWVVSVBhbmVsOiB7a2V5OiBcIkdhbWUvU29saXRhaXJlR2FtZVVJUGFuZWxcIiwgejogaWkuVUlaSW5kZXguTm9ybWFsIH1cbiAgICAgICAgICAgICxVSU5ld0dhbWU6IHtrZXk6IFwiR2FtZS9VSU5ld0dhbWVcIiwgejogaWkuVUlaSW5kZXguUG9wVXAgfVxuICAgICAgICAgICAgLFVJR2FtZVdpbjoge2tleTogXCJHYW1lL1VJR2FtZVdpblwiLCB6OiBpaS5VSVpJbmRleC5Qb3BVcCB9XG4gICAgICAgICAgICAsVUlHYW1lTG9zZToge2tleTogXCJHYW1lL1VJR2FtZUxvc2VcIiwgejogaWkuVUlaSW5kZXguUG9wVXAgfVxuXG4gICAgICAgICAgICAsU29saXRhaXJlU2VlZExpc3RVSVBhbmVsOiB7a2V5OiBcIlNlZWQvU29saXRhaXJlU2VlZExpc3RVSVBhbmVsXCIsIHo6IGlpLlVJWkluZGV4LlBvcFVwIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcDoge1xuICAgICAgICAgICAgLy8hIFB1YmxpY1xuICAgICAgICAgICAgU29saXRhaXJlVUlDb2luOiB7a2V5OiBcIl9wL1NvbGl0YWlyZVVJQ29pblwiIH1cbiAgICAgICAgICAgICxTb2xpdGFpcmVVSUNvaW5MYWJlbDoge2tleTogXCJfcC9Tb2xpdGFpcmVVSUNvaW5MYWJlbFwiIH1cblxuICAgICAgICAgICAgLy8hIEdhbWVcbiAgICAgICAgICAgICxTb2xpdGFpcmVHYW1lRGVza3RvcFVJOiB7a2V5OiBcIkdhbWUvU29saXRhaXJlR2FtZURlc2t0b3BVSVwiIH1cbiAgICAgICAgICAgICxTb2xpdGFpcmVHYW1lVG9wSW5mb1VJOiB7a2V5OiBcIkdhbWUvU29saXRhaXJlR2FtZVRvcEluZm9VSVwiIH1cbiAgICAgICAgICAgICxTb2xpdGFpcmVHYW1lQm90dG9tTWVudVVJOiB7a2V5OiBcIkdhbWUvU29saXRhaXJlR2FtZUJvdHRvbU1lbnVVSVwiIH1cbiAgICAgICAgICAgICxTb2xpdGFpcmVQb2tlckRpc3BsYXlVSToge2tleTogXCJHYW1lL1NvbGl0YWlyZVBva2VyRGlzcGxheVVJXCIgfVxuICAgICAgICAgICAgLFVJUG9rZXI6IHtrZXk6IFwiR2FtZS9VSVBva2VyXCIgfVxuICAgICAgICAgICAgLFVJSGludE1ncjoge2tleTogXCJHYW1lL1VJSGludE1nclwiIH1cbiAgICAgICAgICAgICxVSUhpbnQ6IHtrZXk6IFwiR2FtZS9VSUhpbnRcIiB9XG5cbiAgICAgICAgICAgIC8vISBTdGF0aXN0aWNzXG4gICAgICAgICAgICAsVUlTdGF0aXN0aWNzUGFnZToge2tleTogXCJTdGF0aXN0aWNzL1VJU3RhdGlzdGljc1BhZ2VcIiB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vISBUaGVtZXNcbiAgICAgICAgICAgICxTb2xpdGFpcmVUaGVtZXNTZWxmU2tpblVJOiB7a2V5OiBcIlRoZW1lcy9Tb2xpdGFpcmVUaGVtZXNTZWxmU2tpblVJXCJ9XG4gICAgICAgICAgICAsU29saXRhaXJlVGhlbWVzU2VsZlNraW5JdGVtVUk6IHtrZXk6IFwiVGhlbWVzL1NvbGl0YWlyZVRoZW1lc1NlbGZTa2luSXRlbVVJXCJ9XG4gICAgICAgICAgICAsU29saXRhaXJlVGhlbWVzQ29udGVudHNVSToge2tleTogXCJUaGVtZXMvU29saXRhaXJlVGhlbWVzQ29udGVudHNVSVwifVxuICAgICAgICAgICAgLFNvbGl0YWlyZVRoZW1lc0VmZmVjdFVJOiB7a2V5OiBcIlRoZW1lcy9Tb2xpdGFpcmVUaGVtZXNFZmZlY3RVSVwifVxuICAgICAgICAgICAgLFNvbGl0YWlyZVRoZW1lc0VmZmVjdENvbHVtblVJOiB7a2V5OiBcIlRoZW1lcy9Tb2xpdGFpcmVUaGVtZXNFZmZlY3RDb2x1bW5VSVwifVxuICAgICAgICAgICAgLFVJVGhlbWVNZW51Q29udGVudFBva2VyQmFjazoge2tleTogXCJUaGVtZXMvVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrXCJ9XG4gICAgICAgICAgICAsVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZEl0ZW06IHtrZXk6IFwiVGhlbWVzL1VJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRJdGVtXCJ9XG4gICAgICAgICAgICAsVUlUaGVtZU1lbnVDb250ZW50UG9rZXJCYWNrS2luZFN1Ykl0ZW06IHtrZXk6IFwiVGhlbWVzL1VJVGhlbWVNZW51Q29udGVudFBva2VyQmFja0tpbmRTdWJJdGVtXCJ9XG4gICAgICAgICAgICAsVUlUaGVtZU1lbnVDb250ZW50UG9rZXJGYWNlOiB7a2V5OiBcIlRoZW1lcy9VSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VcIn1cbiAgICAgICAgICAgICxVSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VJdGVtOiB7a2V5OiBcIlRoZW1lcy9VSVRoZW1lTWVudUNvbnRlbnRQb2tlckZhY2VJdGVtXCJ9XG4gICAgICAgICAgICAsVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzOiB7a2V5OiBcIlRoZW1lcy9VSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNcIn1cbiAgICAgICAgICAgICxVSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNCYWNrZ3JvdW5kQ29sb3JJdGVtOiB7a2V5OiBcIlRoZW1lcy9VSVRoZW1lTWVudUNvbnRlbnRCb2FyZHNCYWNrZ3JvdW5kQ29sb3JJdGVtXCJ9XG4gICAgICAgICAgICAsVUlUaGVtZU1lbnVDb250ZW50Qm9hcmRzUGF0dGVybkl0ZW06IHtrZXk6IFwiVGhlbWVzL1VJVGhlbWVNZW51Q29udGVudEJvYXJkc1BhdHRlcm5JdGVtXCJ9XG5cbiAgICAgICAgICAgIC8vISBTZWVkXG4gICAgICAgICAgICAsU29saXRhaXJlU2VlZExpc3RJdGVtVUk6IHtrZXk6IFwiU2VlZC9Tb2xpdGFpcmVTZWVkTGlzdEl0ZW1VSVwiIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBSZWdpc3RlcihidW5kbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGBTb2xpdGFpcmVQcmVmYWJDZmc6OlJlZ2lzdGVyKCR7YnVuZGxlTmFtZX0pID4+IOazqOWGjCBQcmVmYWIg6LWE5rqQYClcbiAgICAgICAgaWkucmVnaXN0ZXJQcmVmYWJDZmcodGhpcy5wZmIsIGJ1bmRsZU5hbWUpO1xuICAgIH1cbn1cbiJdfQ==