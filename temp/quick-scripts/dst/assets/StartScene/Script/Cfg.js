
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/StartScene/Script/Cfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc360h9mHlECIn7XMKN2gmQ', 'Cfg');
// StartScene/Script/Cfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cfg = void 0;
exports.Cfg = {
    iOS: {
        AppId: "neu_ios",
        GameCenter: {
            Ranks: [
                { "k": "GameTime", "v": "GameTime", "d": "游戏时长" },
                { "k": "ScoreAsCoin", "v": "Score", "d": "分数榜显示的是获得的金币总数" },
                { "k": "GameWins", "v": "GameWins", "d": "胜利次数" }
            ]
        },
        kvs: [
            { "k": "IronSourceAppKey", "v": "c1e149c5", "d": "聚合广告 IronSource 关键字" },
            { "k": "BundleId", "v": "ltd.numas.solitaireconnect", "d": "套装 ID" }
        ]
    },
    wx: {
        AppId: "neu_wx",
        GameCenter: {
            Ranks: [
                { "k": "GameTime", "v": "BP_GameTime", "d": "游戏时长" },
                { "k": "GameScore", "v": "BP_GameScore", "d": "分数榜显示的是获得的金币总数" },
                { "k": "GameWins", "v": "GameWins", "d": "胜利次数" }
            ]
        },
        kvs: [
            { "k": "GameTime", "v": "BP_GameTime", "d": "游戏时长" }
        ]
    }
    // , Android: {
    //     IronSourceAppKey: "e6a2ae71"
    // }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU3RhcnRTY2VuZVxcU2NyaXB0XFxDZmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ2EsUUFBQSxHQUFHLEdBQWdCO0lBQzVCLEdBQUcsRUFBRTtRQUNELEtBQUssRUFBRSxTQUFTO1FBQ2QsVUFBVSxFQUFFO1lBQ1YsS0FBSyxFQUFFO2dCQUNILEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Z0JBQ2hELEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTtnQkFDM0QsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTthQUNyRDtTQUNKO1FBQ0MsR0FBRyxFQUFFO1lBQ0gsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUscUJBQXFCLEVBQUU7WUFDdkUsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSw0QkFBNEIsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO1NBQ3hFO0tBQ0o7SUFDQSxFQUFFLEVBQUU7UUFDRCxLQUFLLEVBQUUsUUFBUTtRQUNiLFVBQVUsRUFBRTtZQUNWLEtBQUssRUFBRTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO2dCQUNuRCxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ2hFLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7YUFDckQ7U0FDSjtRQUNDLEdBQUcsRUFBRTtZQUNILEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7U0FDdkQ7S0FDSjtJQUNELGVBQWU7SUFDZixtQ0FBbUM7SUFDbkMsSUFBSTtDQUNQLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjb25zdCBDZmcgOiBpaS5UU0RLQ2ZnID0ge1xuICAgIGlPUzoge1xuICAgICAgICBBcHBJZDogXCJuZXVfaW9zXCJcbiAgICAgICAgLCBHYW1lQ2VudGVyOiB7XG4gICAgICAgICAgICBSYW5rczogW1xuICAgICAgICAgICAgICAgIHsgXCJrXCI6IFwiR2FtZVRpbWVcIiwgXCJ2XCI6IFwiR2FtZVRpbWVcIiwgXCJkXCI6IFwi5ri45oiP5pe26ZW/XCIgfVxuICAgICAgICAgICAgICAgICx7IFwia1wiOiBcIlNjb3JlQXNDb2luXCIsIFwidlwiOiBcIlNjb3JlXCIsIFwiZFwiOiBcIuWIhuaVsOamnOaYvuekuueahOaYr+iOt+W+l+eahOmHkeW4geaAu+aVsFwiIH1cbiAgICAgICAgICAgICAgICAseyBcImtcIjogXCJHYW1lV2luc1wiLCBcInZcIjogXCJHYW1lV2luc1wiLCBcImRcIjogXCLog5zliKnmrKHmlbBcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgLCBrdnM6IFtcbiAgICAgICAgICAgIHsgXCJrXCI6IFwiSXJvblNvdXJjZUFwcEtleVwiLCBcInZcIjogXCJjMWUxNDljNVwiLCBcImRcIjogXCLogZrlkIjlub/lkYogSXJvblNvdXJjZSDlhbPplK7lrZdcIiB9XG4gICAgICAgICAgICAseyBcImtcIjogXCJCdW5kbGVJZFwiLCBcInZcIjogXCJsdGQubnVtYXMuc29saXRhaXJlY29ubmVjdFwiLCBcImRcIjogXCLlpZfoo4UgSURcIiB9XG4gICAgICAgIF1cbiAgICB9XG4gICAgLHd4OiB7XG4gICAgICAgIEFwcElkOiBcIm5ldV93eFwiXG4gICAgICAgICwgR2FtZUNlbnRlcjoge1xuICAgICAgICAgICAgUmFua3M6IFtcbiAgICAgICAgICAgICAgICB7IFwia1wiOiBcIkdhbWVUaW1lXCIsIFwidlwiOiBcIkJQX0dhbWVUaW1lXCIsIFwiZFwiOiBcIua4uOaIj+aXtumVv1wiIH1cbiAgICAgICAgICAgICAgICAseyBcImtcIjogXCJHYW1lU2NvcmVcIiwgXCJ2XCI6IFwiQlBfR2FtZVNjb3JlXCIsIFwiZFwiOiBcIuWIhuaVsOamnOaYvuekuueahOaYr+iOt+W+l+eahOmHkeW4geaAu+aVsFwiIH1cbiAgICAgICAgICAgICAgICAseyBcImtcIjogXCJHYW1lV2luc1wiLCBcInZcIjogXCJHYW1lV2luc1wiLCBcImRcIjogXCLog5zliKnmrKHmlbBcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgLCBrdnM6IFtcbiAgICAgICAgICAgIHsgXCJrXCI6IFwiR2FtZVRpbWVcIiwgXCJ2XCI6IFwiQlBfR2FtZVRpbWVcIiwgXCJkXCI6IFwi5ri45oiP5pe26ZW/XCIgfVxuICAgICAgICBdXG4gICAgfVxuICAgIC8vICwgQW5kcm9pZDoge1xuICAgIC8vICAgICBJcm9uU291cmNlQXBwS2V5OiBcImU2YTJhZTcxXCJcbiAgICAvLyB9XG59XG4iXX0=