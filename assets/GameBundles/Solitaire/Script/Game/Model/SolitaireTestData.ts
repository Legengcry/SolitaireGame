import { EPokerStatus, ESuit } from "../../SolitaireEnums"


export type TSolitaireTestPoker = [ESuit, number, EPokerStatus];

export type TSolitaireTestData = {
    receives:[
        TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
    ]
    ,open: TSolitaireTestPoker[]
    ,close:TSolitaireTestPoker[]
    ,plays: [
        TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
        ,TSolitaireTestPoker[]
    ]
}

export const SolitaireTestData: {
    [key:string]: TSolitaireTestData
} = {
    data1: {
        receives:[
            []
            ,[]
            ,[]
            ,[]
        ]
        ,open:[
            
        ]
        ,close:[
    
        ]
        ,plays: [
            [ [ESuit.HEITAO,1,EPokerStatus.OPEN] ]
            ,[ [ESuit.FANGKUAI,1,EPokerStatus.CLOSE],[ESuit.FANGKUAI,2,EPokerStatus.CLOSE],[ESuit.FANGKUAI,3,EPokerStatus.CLOSE],[ESuit.FANGKUAI,4,EPokerStatus.CLOSE],[ESuit.FANGKUAI,5,EPokerStatus.CLOSE],[ESuit.FANGKUAI,6,EPokerStatus.CLOSE],[ESuit.FANGKUAI,6,EPokerStatus.CLOSE],[ESuit.FANGKUAI,8,EPokerStatus.CLOSE],[ESuit.FANGKUAI,9,EPokerStatus.CLOSE],[ESuit.FANGKUAI,10,EPokerStatus.CLOSE],[ESuit.FANGKUAI,11,EPokerStatus.CLOSE],[ESuit.FANGKUAI,12,EPokerStatus.CLOSE],[ESuit.FANGKUAI,13,EPokerStatus.OPEN] ]
            ,[ [ESuit.MEIHUA,1,EPokerStatus.CLOSE],[ESuit.MEIHUA,2,EPokerStatus.CLOSE],[ESuit.MEIHUA,3,EPokerStatus.CLOSE],[ESuit.MEIHUA,4,EPokerStatus.CLOSE],[ESuit.MEIHUA,5,EPokerStatus.CLOSE],[ESuit.MEIHUA,6,EPokerStatus.CLOSE],[ESuit.MEIHUA,6,EPokerStatus.CLOSE],[ESuit.MEIHUA,8,EPokerStatus.CLOSE],[ESuit.MEIHUA,9,EPokerStatus.CLOSE],[ESuit.MEIHUA,10,EPokerStatus.CLOSE],[ESuit.MEIHUA,11,EPokerStatus.CLOSE],[ESuit.MEIHUA,12,EPokerStatus.CLOSE],[ESuit.MEIHUA,13,EPokerStatus.OPEN] ]
            ,[ [ESuit.HONGXIN,1,EPokerStatus.CLOSE],[ESuit.HONGXIN,2,EPokerStatus.CLOSE],[ESuit.HONGXIN,3,EPokerStatus.CLOSE],[ESuit.HONGXIN,4,EPokerStatus.CLOSE],[ESuit.HONGXIN,5,EPokerStatus.CLOSE],[ESuit.HONGXIN,6,EPokerStatus.CLOSE],[ESuit.HONGXIN,6,EPokerStatus.CLOSE],[ESuit.HONGXIN,8,EPokerStatus.CLOSE],[ESuit.HONGXIN,9,EPokerStatus.CLOSE],[ESuit.HONGXIN,10,EPokerStatus.CLOSE],[ESuit.HONGXIN,11,EPokerStatus.CLOSE],[ESuit.HONGXIN,12,EPokerStatus.CLOSE],[ESuit.HONGXIN,13,EPokerStatus.OPEN] ]
            ,[ [ESuit.HEITAO,2,EPokerStatus.CLOSE],[ESuit.HEITAO,3,EPokerStatus.CLOSE],[ESuit.HEITAO,4,EPokerStatus.CLOSE],[ESuit.HEITAO,5,EPokerStatus.CLOSE],[ESuit.HEITAO,6,EPokerStatus.CLOSE],[ESuit.HEITAO,6,EPokerStatus.CLOSE],[ESuit.HEITAO,8,EPokerStatus.CLOSE],[ESuit.HEITAO,9,EPokerStatus.CLOSE],[ESuit.HEITAO,10,EPokerStatus.CLOSE],[ESuit.HEITAO,11,EPokerStatus.CLOSE],[ESuit.HEITAO,12,EPokerStatus.CLOSE],[ESuit.HEITAO,13,EPokerStatus.OPEN] ]
            ,[]
            ,[]
        ]
    }
}
