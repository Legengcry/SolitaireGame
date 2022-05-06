export class SolitairePrefabCfg {
    //! solitaire
    static pfb = {
        panel: {
            LoadingADUIPanel: {key: "_p/LoadingADUIPanel", z: ii.UIZIndex.PopUp }
            ,SolitaireMenuUIPanel: {key: "Menu/SolitaireMenuUIPanel", z: ii.UIZIndex.Normal }
            
            ,SolitaireOptionsUIPanel: {key: "Options/SolitaireOptionsUIPanel", z: ii.UIZIndex.PopUp }

            ,SolitaireStatisticsUIPanel: {key: "Statistics/SolitaireStatisticsUIPanel", z: ii.UIZIndex.PopUp }

            ,SolitaireThemesUIPanel: {key: "Themes/SolitaireThemesUIPanel", z: ii.UIZIndex.PopUp }

            ,SolitaireHowToPlayUIPanel: {key: "HowToPlay/SolitaireHowToPlayUIPanel", z: ii.UIZIndex.PopUp }
            
            ,SolitaireGameUIPanel: {key: "Game/SolitaireGameUIPanel", z: ii.UIZIndex.Normal }
            ,UINewGame: {key: "Game/UINewGame", z: ii.UIZIndex.PopUp }
            ,UIGameWin: {key: "Game/UIGameWin", z: ii.UIZIndex.PopUp }
            ,UIGameLose: {key: "Game/UIGameLose", z: ii.UIZIndex.PopUp }

            ,SolitaireSeedListUIPanel: {key: "Seed/SolitaireSeedListUIPanel", z: ii.UIZIndex.PopUp }
        },
        comp: {
            //! Public
            SolitaireUICoin: {key: "_p/SolitaireUICoin" }
            ,SolitaireUICoinLabel: {key: "_p/SolitaireUICoinLabel" }

            //! Game
            ,SolitaireGameDesktopUI: {key: "Game/SolitaireGameDesktopUI" }
            ,SolitaireGameTopInfoUI: {key: "Game/SolitaireGameTopInfoUI" }
            ,SolitaireGameBottomMenuUI: {key: "Game/SolitaireGameBottomMenuUI" }
            ,SolitairePokerDisplayUI: {key: "Game/SolitairePokerDisplayUI" }
            ,UIPoker: {key: "Game/UIPoker" }
            ,UIHintMgr: {key: "Game/UIHintMgr" }
            ,UIHint: {key: "Game/UIHint" }

            //! Statistics
            ,UIStatisticsPage: {key: "Statistics/UIStatisticsPage" }
            
            //! Themes
            ,SolitaireThemesSelfSkinUI: {key: "Themes/SolitaireThemesSelfSkinUI"}
            ,SolitaireThemesSelfSkinItemUI: {key: "Themes/SolitaireThemesSelfSkinItemUI"}
            ,SolitaireThemesContentsUI: {key: "Themes/SolitaireThemesContentsUI"}
            ,SolitaireThemesEffectUI: {key: "Themes/SolitaireThemesEffectUI"}
            ,SolitaireThemesEffectColumnUI: {key: "Themes/SolitaireThemesEffectColumnUI"}
            ,UIThemeMenuContentPokerBack: {key: "Themes/UIThemeMenuContentPokerBack"}
            ,UIThemeMenuContentPokerBackKindItem: {key: "Themes/UIThemeMenuContentPokerBackKindItem"}
            ,UIThemeMenuContentPokerBackKindSubItem: {key: "Themes/UIThemeMenuContentPokerBackKindSubItem"}
            ,UIThemeMenuContentPokerFace: {key: "Themes/UIThemeMenuContentPokerFace"}
            ,UIThemeMenuContentPokerFaceItem: {key: "Themes/UIThemeMenuContentPokerFaceItem"}
            ,UIThemeMenuContentBoards: {key: "Themes/UIThemeMenuContentBoards"}
            ,UIThemeMenuContentBoardsBackgroundColorItem: {key: "Themes/UIThemeMenuContentBoardsBackgroundColorItem"}
            ,UIThemeMenuContentBoardsPatternItem: {key: "Themes/UIThemeMenuContentBoardsPatternItem"}

            //! Seed
            ,SolitaireSeedListItemUI: {key: "Seed/SolitaireSeedListItemUI" }
        }
    }

    static Register(bundleName: string): void {
        console.info(`SolitairePrefabCfg::Register(${bundleName}) >> 注册 Prefab 资源`)
        ii.registerPrefabCfg(this.pfb, bundleName);
    }
}
