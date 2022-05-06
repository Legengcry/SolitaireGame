
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GameBundles/Solitaire/Script/SolitaireAudioCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '571c0EvDEdNFb6Vv7Cqq7xW', 'SolitaireAudioCfg');
// GameBundles/Solitaire/Script/SolitaireAudioCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolitaireAudioCfg = void 0;
var SolitaireAudioCfg = /** @class */ (function () {
    function SolitaireAudioCfg() {
    }
    SolitaireAudioCfg.Register = function (bundleName) {
        console.info("SolitaireAudioCfg::Register(" + bundleName + ") >> \u6CE8\u518C Audio \u8D44\u6E90");
        ii.registerResDict(this.effect, bundleName, ii.EResType.Audio);
        ii.registerResDict(this.music, bundleName, ii.EResType.Audio);
    };
    SolitaireAudioCfg.GetFoundation = function (index) { return this.effect["foundations" + index % 10]; };
    SolitaireAudioCfg.effect = {
        default: 'solitaire.effect.default',
        failed: 'solitaire.effect.failed',
        flip: 'solitaire.effect.flip',
        foundations0: 'solitaire.effect.foundations0',
        foundations1: 'solitaire.effect.foundations1',
        foundations2: 'solitaire.effect.foundations2',
        foundations3: 'solitaire.effect.foundations3',
        foundations4: 'solitaire.effect.foundations4',
        foundations5: 'solitaire.effect.foundations5',
        foundations6: 'solitaire.effect.foundations6',
        foundations7: 'solitaire.effect.foundations7',
        foundations8: 'solitaire.effect.foundations8',
        foundations9: 'solitaire.effect.foundations9',
        invalid: 'solitaire.effect.invalid',
        move: 'solitaire.effect.move',
        pop: 'solitaire.effect.pop',
        successful: 'solitaire.effect.successful',
        undo: 'solitaire.effect.undo',
        jump: 'solitaire.effect.jump',
        coin_drop: 'solitaire.effect.coin_drop'
    };
    SolitaireAudioCfg.music = {
        default: 'solitaire.music.default',
    };
    return SolitaireAudioCfg;
}());
exports.SolitaireAudioCfg = SolitaireAudioCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR2FtZUJ1bmRsZXNcXFNvbGl0YWlyZVxcU2NyaXB0XFxTb2xpdGFpcmVBdWRpb0NmZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBb0NBLENBQUM7SUFQVSwwQkFBUSxHQUFmLFVBQWdCLFVBQWtCO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUNBQStCLFVBQVUseUNBQWtCLENBQUMsQ0FBQTtRQUN6RSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSwrQkFBYSxHQUFwQixVQUFxQixLQUFhLElBQVksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFjLEtBQUssR0FBQyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFsQzdFLHdCQUFNLEdBQUc7UUFDckIsT0FBTyxFQUFFLDBCQUEwQjtRQUNuQyxNQUFNLEVBQUUseUJBQXlCO1FBQ2pDLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsWUFBWSxFQUFFLCtCQUErQjtRQUM3QyxZQUFZLEVBQUUsK0JBQStCO1FBQzdDLFlBQVksRUFBRSwrQkFBK0I7UUFDN0MsWUFBWSxFQUFFLCtCQUErQjtRQUM3QyxZQUFZLEVBQUUsK0JBQStCO1FBQzdDLFlBQVksRUFBRSwrQkFBK0I7UUFDN0MsWUFBWSxFQUFFLCtCQUErQjtRQUM3QyxZQUFZLEVBQUUsK0JBQStCO1FBQzdDLFlBQVksRUFBRSwrQkFBK0I7UUFDN0MsWUFBWSxFQUFFLCtCQUErQjtRQUM3QyxPQUFPLEVBQUUsMEJBQTBCO1FBQ25DLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsR0FBRyxFQUFFLHNCQUFzQjtRQUMzQixVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLElBQUksRUFBRSx1QkFBdUI7UUFDN0IsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixTQUFTLEVBQUUsNEJBQTRCO0tBQzFDLENBQUE7SUFFZSx1QkFBSyxHQUFHO1FBQ3BCLE9BQU8sRUFBRSx5QkFBeUI7S0FDckMsQ0FBQTtJQVVMLHdCQUFDO0NBcENELEFBb0NDLElBQUE7QUFwQ1ksOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNvbGl0YWlyZUF1ZGlvQ2ZnIHtcbiAgICBzdGF0aWMgcmVhZG9ubHkgZWZmZWN0ID0ge1xuICAgICAgICBkZWZhdWx0OiAnc29saXRhaXJlLmVmZmVjdC5kZWZhdWx0JyxcbiAgICAgICAgZmFpbGVkOiAnc29saXRhaXJlLmVmZmVjdC5mYWlsZWQnLFxuICAgICAgICBmbGlwOiAnc29saXRhaXJlLmVmZmVjdC5mbGlwJyxcbiAgICAgICAgZm91bmRhdGlvbnMwOiAnc29saXRhaXJlLmVmZmVjdC5mb3VuZGF0aW9uczAnLFxuICAgICAgICBmb3VuZGF0aW9uczE6ICdzb2xpdGFpcmUuZWZmZWN0LmZvdW5kYXRpb25zMScsXG4gICAgICAgIGZvdW5kYXRpb25zMjogJ3NvbGl0YWlyZS5lZmZlY3QuZm91bmRhdGlvbnMyJyxcbiAgICAgICAgZm91bmRhdGlvbnMzOiAnc29saXRhaXJlLmVmZmVjdC5mb3VuZGF0aW9uczMnLFxuICAgICAgICBmb3VuZGF0aW9uczQ6ICdzb2xpdGFpcmUuZWZmZWN0LmZvdW5kYXRpb25zNCcsXG4gICAgICAgIGZvdW5kYXRpb25zNTogJ3NvbGl0YWlyZS5lZmZlY3QuZm91bmRhdGlvbnM1JyxcbiAgICAgICAgZm91bmRhdGlvbnM2OiAnc29saXRhaXJlLmVmZmVjdC5mb3VuZGF0aW9uczYnLFxuICAgICAgICBmb3VuZGF0aW9uczc6ICdzb2xpdGFpcmUuZWZmZWN0LmZvdW5kYXRpb25zNycsXG4gICAgICAgIGZvdW5kYXRpb25zODogJ3NvbGl0YWlyZS5lZmZlY3QuZm91bmRhdGlvbnM4JyxcbiAgICAgICAgZm91bmRhdGlvbnM5OiAnc29saXRhaXJlLmVmZmVjdC5mb3VuZGF0aW9uczknLFxuICAgICAgICBpbnZhbGlkOiAnc29saXRhaXJlLmVmZmVjdC5pbnZhbGlkJywgXG4gICAgICAgIG1vdmU6ICdzb2xpdGFpcmUuZWZmZWN0Lm1vdmUnLCBcbiAgICAgICAgcG9wOiAnc29saXRhaXJlLmVmZmVjdC5wb3AnLFxuICAgICAgICBzdWNjZXNzZnVsOiAnc29saXRhaXJlLmVmZmVjdC5zdWNjZXNzZnVsJyxcbiAgICAgICAgdW5kbzogJ3NvbGl0YWlyZS5lZmZlY3QudW5kbycsXG4gICAgICAgIGp1bXA6ICdzb2xpdGFpcmUuZWZmZWN0Lmp1bXAnLFxuICAgICAgICBjb2luX2Ryb3A6ICdzb2xpdGFpcmUuZWZmZWN0LmNvaW5fZHJvcCdcbiAgICB9XG4gICAgXG4gICAgc3RhdGljIHJlYWRvbmx5IG11c2ljID0ge1xuICAgICAgICBkZWZhdWx0OiAnc29saXRhaXJlLm11c2ljLmRlZmF1bHQnLFxuICAgIH1cbiAgICBcblxuICAgIHN0YXRpYyBSZWdpc3RlcihidW5kbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5pbmZvKGBTb2xpdGFpcmVBdWRpb0NmZzo6UmVnaXN0ZXIoJHtidW5kbGVOYW1lfSkgPj4g5rOo5YaMIEF1ZGlvIOi1hOa6kGApXG4gICAgICAgIGlpLnJlZ2lzdGVyUmVzRGljdCh0aGlzLmVmZmVjdCwgYnVuZGxlTmFtZSwgaWkuRVJlc1R5cGUuQXVkaW8pO1xuICAgICAgICBpaS5yZWdpc3RlclJlc0RpY3QodGhpcy5tdXNpYywgYnVuZGxlTmFtZSwgaWkuRVJlc1R5cGUuQXVkaW8pO1xuICAgIH1cblxuICAgIHN0YXRpYyBHZXRGb3VuZGF0aW9uKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5lZmZlY3RbYGZvdW5kYXRpb25zJHtpbmRleCUxMH1gXTsgfVxufVxuIl19