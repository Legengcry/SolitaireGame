
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/GameBundles/Solitaire/Script/DataCache/SolitaireAutoPlayerDataCache');
require('./assets/GameBundles/Solitaire/Script/DataCache/SolitaireDataCache');
require('./assets/GameBundles/Solitaire/Script/DataCache/SolitaireSkinDataCache');
require('./assets/GameBundles/Solitaire/Script/Game/Model/Poker');
require('./assets/GameBundles/Solitaire/Script/Game/Model/PokerGroup');
require('./assets/GameBundles/Solitaire/Script/Game/Model/SolitaireConfigGenerator');
require('./assets/GameBundles/Solitaire/Script/Game/Model/SolitaireJu');
require('./assets/GameBundles/Solitaire/Script/Game/Model/SolitaireTestData');
require('./assets/GameBundles/Solitaire/Script/Game/SolitaireType');
require('./assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameBottomMenuUI');
require('./assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameDesktopUI');
require('./assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameTopInfoUI');
require('./assets/GameBundles/Solitaire/Script/Game/View/SolitaireGameUIPanel');
require('./assets/GameBundles/Solitaire/Script/Game/View/SolitairePokerDisplayUI');
require('./assets/GameBundles/Solitaire/Script/Game/View/UIGameLose');
require('./assets/GameBundles/Solitaire/Script/Game/View/UIGameWin');
require('./assets/GameBundles/Solitaire/Script/Game/View/UIHint');
require('./assets/GameBundles/Solitaire/Script/Game/View/UIHintMgr');
require('./assets/GameBundles/Solitaire/Script/Game/View/UINewGame');
require('./assets/GameBundles/Solitaire/Script/Game/View/UIPoker');
require('./assets/GameBundles/Solitaire/Script/HowToPlay/SolitaireHowToPlayUIPanel');
require('./assets/GameBundles/Solitaire/Script/Logic/SolitaireLogic');
require('./assets/GameBundles/Solitaire/Script/Menu/SolitaireMenuUIPanel');
require('./assets/GameBundles/Solitaire/Script/Options/SolitaireOptionsUIPanel');
require('./assets/GameBundles/Solitaire/Script/SolitaireAudioCfg');
require('./assets/GameBundles/Solitaire/Script/SolitaireAutoAtlasCfg');
require('./assets/GameBundles/Solitaire/Script/SolitaireCfg');
require('./assets/GameBundles/Solitaire/Script/SolitaireEnums');
require('./assets/GameBundles/Solitaire/Script/SolitaireEvent');
require('./assets/GameBundles/Solitaire/Script/SolitaireJsonCfg');
require('./assets/GameBundles/Solitaire/Script/SolitaireLangCfg');
require('./assets/GameBundles/Solitaire/Script/SolitairePrefabCfg');
require('./assets/GameBundles/Solitaire/Script/SolitaireSpriteFrameCfg');
require('./assets/GameBundles/Solitaire/Script/SolitaireStage');
require('./assets/GameBundles/Solitaire/Script/Statistics/SolitaireStatisticsUIPanel');
require('./assets/GameBundles/Solitaire/Script/Statistics/UIStatisticsCircleProgress');
require('./assets/GameBundles/Solitaire/Script/Statistics/UIStatisticsPage');
require('./assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesContentsUI');
require('./assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectColumnUI');
require('./assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesEffectUI');
require('./assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinItemUI');
require('./assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesSelfSkinUI');
require('./assets/GameBundles/Solitaire/Script/Themes/SolitaireThemesUIPanel');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContent');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoards');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoardsBackgroundColorItem');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentBoardsPatternItem');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBack');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBackKindItem');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerBackKindSubItem');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFace');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuContentPokerFaceItem');
require('./assets/GameBundles/Solitaire/Script/Themes/UIThemeMenuItem');
require('./assets/GameBundles/Solitaire/Script/_Public/Component/ActionBreath');
require('./assets/GameBundles/Solitaire/Script/_Public/Component/UISettingToggle');
require('./assets/GameBundles/Solitaire/Script/_Public/SolitaireActionUIPanel');
require('./assets/StartScene/Script/Cfg');
require('./assets/StartScene/Script/GameApp');
require('./assets/StartScene/Script/PrefabCfg');
require('./assets/StartScene/Script/UIPanel/BlockInputUIPanel');
require('./assets/StartScene/Script/UIPanel/DialogUIPanel');
require('./assets/StartScene/Script/UIPanel/LoadingUIPanel');
require('./assets/StartScene/Script/UIPanel/LoginUIPanel');
require('./assets/StartScene/Script/UIPanel/MsgUIPanel');
require('./assets/StartScene/Script/UIPanel/WaitingUIPanel');

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