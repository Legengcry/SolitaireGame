
export const Cfg : ii.TSDKCfg = {
    iOS: {
        AppId: "neu_ios"
        , GameCenter: {
            Ranks: [
                { "k": "GameTime", "v": "GameTime", "d": "游戏时长" }
                ,{ "k": "ScoreAsCoin", "v": "Score", "d": "分数榜显示的是获得的金币总数" }
                ,{ "k": "GameWins", "v": "GameWins", "d": "胜利次数" }
            ]
        }
        , kvs: [
            { "k": "IronSourceAppKey", "v": "c1e149c5", "d": "聚合广告 IronSource 关键字" }
            ,{ "k": "BundleId", "v": "ltd.numas.solitaireconnect", "d": "套装 ID" }
        ]
    }
    ,wx: {
        AppId: "neu_wx"
        , GameCenter: {
            Ranks: [
                { "k": "GameTime", "v": "BP_GameTime", "d": "游戏时长" }
                ,{ "k": "GameScore", "v": "BP_GameScore", "d": "分数榜显示的是获得的金币总数" }
                ,{ "k": "GameWins", "v": "GameWins", "d": "胜利次数" }
            ]
        }
        , kvs: [
            { "k": "GameTime", "v": "BP_GameTime", "d": "游戏时长" }
        ]
    }
    // , Android: {
    //     IronSourceAppKey: "e6a2ae71"
    // }
}
