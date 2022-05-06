import { EGameType } from "../../SolitaireEnums";
import { SolitaireJu } from "../Model/SolitaireJu";
import SolitaireGameUIPanel from "./SolitaireGameUIPanel";

const {ccclass, property} = cc._decorator;

export type UINewGameArgs = {
    ju: SolitaireJu
}

@ccclass
export default class UINewGame extends ii.UIPanel<UINewGameArgs> {
    @property(cc.Node) private mui_ActionNode: cc.Node = null;
    @property({type:cc.Label,visible:true}) private _gameTypeLabel: cc.Label = null;
    @property({type:cc.Sprite,visible:true}) private _gameTypeSprite: cc.Sprite = null;
    @property({type:cc.Label,visible:true}) private _skipGameLabel: cc.Label = null;
    @property({type:[cc.Label],visible:true}) private _seedLabels: cc.Label[] = [];
    @property({type:[cc.SpriteFrame],visible:true}) private _spriteFrames: cc.SpriteFrame[] = [];

    protected OnCreate(): void {
        this.SetUserData("ACTION_POSITION", this.mui_ActionNode.position);
    }
    protected OnRelease(): void { }
    protected OnOpen(uiArgs: UINewGameArgs): void {
        this.SetIIClickHandler("OnBG", this.OnBG.bind(this));
        this.SetIIClickHandler("OnSkipGame", this.OnSkipGame.bind(this));
        this.SetIIClickHandler("OnReplayDeck", this.OnReplayDeck.bind(this));
        this.SetIIClickHandler("OnCancel", this.OnCancel.bind(this));
        ii.UIUtil.moveAction(this.mui_ActionNode, true, this.GetUserData("ACTION_POSITION"), 0.3);

        switch (this.args.ju.gameType) {
            case EGameType.EASY: {
                this._gameTypeLabel.string = `简单`;
                this._skipGameLabel.string = `跳过当前级别`;
            } break;
            case EGameType.HARD: {
                this._gameTypeLabel.string = `困难`;
                this._skipGameLabel.string = `跳过当前级别`;
            } break;
            case EGameType.SEED: {
                this._gameTypeLabel.string = `Seed`;
                this._skipGameLabel.string = `Play Next Seed`;
            } break;
        }
        this._gameTypeSprite.spriteFrame = this._spriteFrames[this.args.ju.gameType];
        
        this._seedLabels.forEach(label=>label.string = `${this.args.ju.Seed}`);
    }
    
    private ExitWithAction(callback?: Function) {
        ii.UIUtil.moveAction(this.mui_ActionNode, false, this.GetUserData("ACTION_POSITION"), 0.3, ()=>{
            if(callback){
                callback()
            }
            this.Close();
        })
    }

    @ii.Util.block(1)
    private OnBG() {
        this.ExitWithAction()
    }

    @ii.Util.block(1)
    private OnSkipGame(){
        this.ExitWithAction(()=>this.emitGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_SKIP_GAME))
    }

    @ii.Util.block(1)
    private OnReplayDeck() {
        this.ExitWithAction(()=>this.emitGlobal(SolitaireGameUIPanel.event.EVENT_GAMESCENE_REPLAY_GAME))
    }

    @ii.Util.block(1)
    private OnCancel() {
        this.ExitWithAction()
    }
}
