window.__require=function e(t,o,n){function r(c,a){if(!o[c]){if(!t[c]){var p=c.split("/");if(p=p[p.length-1],!t[p]){var l="function"==typeof __require&&__require;if(!a&&l)return l(p,!0);if(i)return i(p,!0);throw new Error("Cannot find module '"+c+"'")}c=p}var s=o[c]={exports:{}};t[c][0].call(s.exports,function(e){return r(t[c][1][e]||e)},s,s.exports,e,t,o,n)}return o[c].exports}for(var i="function"==typeof __require&&__require,c=0;c<n.length;c++)r(n[c]);return r}({BlockInputUIPanel:[function(e,t,o){"use strict";cc._RF.push(t,"8ea23qelk9AxrVMsdQdE+Hs","BlockInputUIPanel");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,a=c.ccclass,p=c.property,l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._activeNode=null,t}return r(t,e),t.prototype.OnActiveChanged=function(e){this._activeNode.active=e},i([p({type:cc.Node,visible:!0})],t.prototype,"_activeNode",void 0),i([a],t)}(ii.BaseBlockInputUIPanel);o.default=l,cc._RF.pop()},{}],Cfg:[function(e,t,o){"use strict";cc._RF.push(t,"cc360h9mHlECIn7XMKN2gmQ","Cfg"),Object.defineProperty(o,"__esModule",{value:!0}),o.Cfg=void 0,o.Cfg={iOS:{AppId:"neu_ios",GameCenter:{Ranks:[{k:"GameTime",v:"GameTime",d:"\u6e38\u620f\u65f6\u957f"},{k:"ScoreAsCoin",v:"Score",d:"\u5206\u6570\u699c\u663e\u793a\u7684\u662f\u83b7\u5f97\u7684\u91d1\u5e01\u603b\u6570"},{k:"GameWins",v:"GameWins",d:"\u80dc\u5229\u6b21\u6570"}]},kvs:[{k:"IronSourceAppKey",v:"c1e149c5",d:"\u805a\u5408\u5e7f\u544a IronSource \u5173\u952e\u5b57"},{k:"BundleId",v:"ltd.numas.solitaireconnect",d:"\u5957\u88c5 ID"}]},wx:{AppId:"neu_wx",GameCenter:{Ranks:[{k:"GameTime",v:"BP_GameTime",d:"\u6e38\u620f\u65f6\u957f"},{k:"GameScore",v:"BP_GameScore",d:"\u5206\u6570\u699c\u663e\u793a\u7684\u662f\u83b7\u5f97\u7684\u91d1\u5e01\u603b\u6570"},{k:"GameWins",v:"GameWins",d:"\u80dc\u5229\u6b21\u6570"}]},kvs:[{k:"GameTime",v:"BP_GameTime",d:"\u6e38\u620f\u65f6\u957f"}]}},cc._RF.pop()},{}],DialogUIPanel:[function(e,t,o){"use strict";cc._RF.push(t,"e1393PxAttAnKaDOm6pjmCN","DialogUIPanel");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0}),o.DialogUIPanel=void 0;var c=cc._decorator,a=c.ccclass,p=c.property,l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.titleLabel=null,t.msgLabel=null,t.buttonList=[],t.labelList=[],t}return r(t,e),t.prototype.OnCreate=function(){},t.prototype.OnRelease=function(){},t.prototype.OnOpen=function(){this.titleLabel.string=ii.LangUtil.Get(this.args.title),this.msgLabel.string=ii.LangUtil.Get(this.args.msg);for(var e=0;e<3;++e)this.buttonList[e].node.active=e<this.args.btnCount;this.labelList[0].string=ii.LangUtil.Get(this.args.label0),this.labelList[1].string=ii.LangUtil.Get(this.args.label1),this.labelList[2].string=ii.LangUtil.Get(this.args.label2)},t.prototype.OnUIButtonClick=function(e,t){var o,n,r;0==t?null===(o=this.args.btnFunc0)||void 0===o||o.call(null):1==t?null===(n=this.args.btnFunc1)||void 0===n||n.call(null):(console.assert(2==t),null===(r=this.args.btnFunc2)||void 0===r||r.call(null)),this.Close()},i([p({type:cc.Label})],t.prototype,"titleLabel",void 0),i([p({type:cc.Label})],t.prototype,"msgLabel",void 0),i([p({type:[cc.Button]})],t.prototype,"buttonList",void 0),i([p({type:[cc.Label]})],t.prototype,"labelList",void 0),i([a],t)}(ii.UIPanel);o.DialogUIPanel=l,cc._RF.pop()},{}],GameApp:[function(e,t,o){"use strict";cc._RF.push(t,"bcdc0MBQqxECa6PuoZduBFV","GameApp");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=e("./Cfg"),a=e("./PrefabCfg"),p=e("./UIPanel/LoginUIPanel"),l=cc._decorator,s=l.ccclass,u=(l.property,function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),Object.defineProperty(t.prototype,"Version",{get:function(){return"1.0.0"},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"sdkCfg",{get:function(){return c.Cfg},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"StartBundlePrefabCfg",{get:function(){return a.PrefabCfg},enumerable:!1,configurable:!0}),t.prototype.AdapterCanvas=function(){this.FitCanvasWithVisiableSize(640,1024)},Object.defineProperty(t.prototype,"FrameRate",{get:function(){return 60},enumerable:!1,configurable:!0}),t.prototype.OnAppLoad=function(){console.info("---- GameApp::OnAppLoad ----"),this.Login()},t.prototype.Login=function(){var e=this;ii.UIMgr.ins.Open(a.PrefabCfg.panel.LoginUIPanel.key,p.LoginUIPanelArgs.Create(function(){e.EnterFirstGame("Solitaire")}))},i([s],t)}(ii.App));o.default=u,cc._RF.pop()},{"./Cfg":"Cfg","./PrefabCfg":"PrefabCfg","./UIPanel/LoginUIPanel":"LoginUIPanel"}],LoadingUIPanel:[function(e,t,o){"use strict";cc._RF.push(t,"08c00aVcEtKwpnotQAQcUBq","LoadingUIPanel");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,a=c.ccclass,p=c.property,l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._blockInputNode=null,t._fadeNode=null,t.m_LoadingProgressCircleSprite=null,t.m_LoadingRefLabel=null,t}return r(t,e),t.prototype.OnCreate=function(){e.prototype.OnCreate.call(this),this._fadeNode.active=!1,this.m_LoadingProgressCircleSprite.fillRange=0},t.prototype.OnActiveChanged=function(e){this._blockInputNode.active=e,this._fadeNode.active=e,e&&(this.m_LoadingProgressCircleSprite.fillRange=0)},t.prototype.OnLoading=function(e,t){var o=100*e/t;this.m_LoadingRefLabel.string=Math.ceil(o)+"%",this.m_LoadingProgressCircleSprite.fillRange=.01*o},i([p({type:cc.Node,visible:!0})],t.prototype,"_blockInputNode",void 0),i([p({type:cc.Node,visible:!0})],t.prototype,"_fadeNode",void 0),i([p({type:cc.Sprite,tooltip:"\u8fdb\u5ea6\u5706\u5708"})],t.prototype,"m_LoadingProgressCircleSprite",void 0),i([p({type:cc.Label,tooltip:"\u5f15\u7528\u8ba1\u6570"})],t.prototype,"m_LoadingRefLabel",void 0),i([a],t)}(ii.BaseLoadingUIPanel);o.default=l,cc._RF.pop()},{}],LoginUIPanel:[function(e,t,o){"use strict";cc._RF.push(t,"d1604sBoCVFiJPAvxKepU/C","LoginUIPanel");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0}),o.LoginUIPanel=o.LoginUIPanelArgs=void 0;var c=function(){function e(){}return e.Create=function(t){var o=new e;return o.onLoginSuccess=t,o},e}();o.LoginUIPanelArgs=c;var a=cc._decorator,p=a.ccclass,l=a.property,s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._authUserInfoRoot=null,t.buttonNode=null,t.buttonLabel=null,t}return r(t,e),t.prototype.OnCreate=function(){},t.prototype.OnRelease=function(){},t.prototype.OnOpen=function(){this.Login(!0)},t.prototype.UpdateUI_AuthedUserInfo=function(e){this._authUserInfoRoot.active=!e},t.prototype.Login=function(e){var t=this;this.UpdateUI_AuthedUserInfo(e),ii.App.ins.p.user.LoginPlatform(function(e){ii.App.ins.p.user.LoginServer(e,function(e){console.assert(!0===e.success),ii.Util.safeCall(t.args.onLoginSuccess),t.Close()})},e)},i([l({type:cc.Node,visible:!0,tooltip:"\u83b7\u53d6\u7528\u6237\u6388\u6743\u7684\u6839\u8282\u70b9\uff0c\u5fae\u4fe1\u5e73\u53f0\u5c06\u5728\u8fd9\u4e2a\u8282\u70b9\u4e0a\u521b\u5efa\u900f\u660e\u7684\u6309\u94ae"})],t.prototype,"_authUserInfoRoot",void 0),i([l({type:cc.Node})],t.prototype,"buttonNode",void 0),i([l({type:cc.Label})],t.prototype,"buttonLabel",void 0),i([p],t)}(ii.UIPanel);o.LoginUIPanel=s,cc._RF.pop()},{}],MsgUIPanel:[function(e,t,o){"use strict";cc._RF.push(t,"208e50cmixGwqTjMIyRv2RB","MsgUIPanel");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0}),o.MsgUIPanel=void 0;var c=cc._decorator,a=c.ccclass,p=c.property,l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._msgLabel=null,t._actionNode=null,t}return r(t,e),Object.defineProperty(t.prototype,"ActionNode",{get:function(){return this._actionNode},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"MsgLabel",{get:function(){return this._msgLabel},enumerable:!1,configurable:!0}),i([p({type:cc.Label,visible:!0})],t.prototype,"_msgLabel",void 0),i([p({type:cc.Node,visible:!0})],t.prototype,"_actionNode",void 0),i([a],t)}(ii.BaseMsgUIPanel);o.MsgUIPanel=l,cc._RF.pop()},{}],PrefabCfg:[function(e,t,o){"use strict";cc._RF.push(t,"e4a7eWiIORLEKfQIphHGBvd","PrefabCfg"),Object.defineProperty(o,"__esModule",{value:!0}),o.PrefabCfg=void 0,o.PrefabCfg={panel:{LoginUIPanel:{key:"LoginUIPanel",z:ii.UIZIndex.PopUp}},comp:{}},cc._RF.pop()},{}],WaitingUIPanel:[function(e,t,o){"use strict";cc._RF.push(t,"c4101i0T+tJ+oX3G6/I1SU5","WaitingUIPanel");var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,a=c.ccclass,p=c.property,l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._activeNode=null,t}return r(t,e),t.prototype.OnActiveChanged=function(e){this._activeNode.active=e},i([p({type:cc.Node,visible:!0})],t.prototype,"_activeNode",void 0),i([a],t)}(ii.BaseWaitingUIPanel);o.default=l,cc._RF.pop()},{}]},{},["Cfg","GameApp","PrefabCfg","BlockInputUIPanel","DialogUIPanel","LoadingUIPanel","LoginUIPanel","MsgUIPanel","WaitingUIPanel"]);