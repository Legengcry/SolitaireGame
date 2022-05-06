import { SolitairePrefabCfg } from "../SolitairePrefabCfg";
import SolitaireActionUIPanel from "../_Public/SolitaireActionUIPanel";
import UIStatisticsPage, { UIStatisticsPageArgs } from "./UIStatisticsPage";

const {ccclass, property} = cc._decorator;
@ccclass
export default class SolitaireStatisticsUIPanel extends SolitaireActionUIPanel {
    @property(cc.PageView) pageView: cc.PageView = null 

    protected OnCreate() {
        super.OnCreate();
        this.SetIIClickHandler("OnBack", this.OnBack.bind(this));
        this.SetIIClickHandler("OnReset", this.OnReset.bind(this));
    }
    
    protected OnRelease(): void {
        let pages = this.pageView.getPages()
        this.pageView.removeAllPages()
        while(pages.length > 0){
            pages.pop().getComponent(UIStatisticsPage).Close();
        }
        super.OnRelease();
    }
    protected OnEnter(): void {
        this.scheduleOnce(()=>{
            // 加载不同的页
            for(let card3 = 0; card3 < 2; ++card3) {
                for(let vegas = 0; vegas < 2; ++vegas) {
                    let page: UIStatisticsPage = ii.UIMgr.ins.Create<UIStatisticsPage, UIStatisticsPageArgs>(SolitairePrefabCfg.pfb.comp.UIStatisticsPage.key, {
                        vegas: vegas === 1,
                        card3: card3 === 1,
                        width: this.pageView.node.width
                    });
                    this.pageView.addPage(page.node)
                }
            }
        }, 0)
    }

    private OnBack() {
        this.ExitWithAction(()=>{
            this.Close();
        }, false);
    }

    @ii.Util.block(0.2)
    private OnReset() {
        this.CurrentPage.Reset()
    }

    private get CurrentPage(): UIStatisticsPage {
        let pageIndex = this.pageView.getCurrentPageIndex()
        let pages = this.pageView.getPages()
        return pages[pageIndex].getComponent(UIStatisticsPage)
    }
}
