"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7219],{5318:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(7378);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),k=p(a),m=i,u=k["".concat(s,".").concat(m)]||k[m]||c[m]||r;return a?n.createElement(u,l(l({ref:t},d),{},{components:a})):n.createElement(u,l({ref:t},d))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=k;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},1489:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=a(5773),i=(a(7378),a(5318));const r={},l=void 0,o={unversionedId:"api/classes/Client.ActiveProtection",id:"api/classes/Client.ActiveProtection",title:"Client.ActiveProtection",description:"API / Modules / Client / ActiveProtection",source:"@site/docs/api/classes/Client.ActiveProtection.md",sourceDirName:"api/classes",slug:"/api/classes/Client.ActiveProtection",permalink:"/logion-api/docs/api/classes/Client.ActiveProtection",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/classes/Client.ActiveProtection.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.AccountTokens",permalink:"/logion-api/docs/api/classes/Client.AccountTokens"},next:{title:"Client.AnySourceHttpClient",permalink:"/logion-api/docs/api/classes/Client.AnySourceHttpClient"}},s={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Implements",id:"implements",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Properties",id:"properties",level:3},{value:"Accessors",id:"accessors",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties-1",level:2},{value:"sharedState",id:"sharedstate",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Accessors",id:"accessors-1",level:2},{value:"discarded",id:"discarded",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"protectionParameters",id:"protectionparameters",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"Methods",id:"methods-1",level:2},{value:"discard",id:"discard",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"discardOnSuccess",id:"discardonsuccess",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"ensureCurrent",id:"ensurecurrent",level:3},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"finalizeOnSuccess",id:"finalizeonsuccess",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"getCurrentState",id:"getcurrentstate",level:3},{value:"Returns",id:"returns-7",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"getCurrentStateOrThrow",id:"getcurrentstateorthrow",level:3},{value:"Returns",id:"returns-8",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"isFullyReady",id:"isfullyready",level:3},{value:"Returns",id:"returns-9",level:4},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"refresh",id:"refresh",level:3},{value:"Returns",id:"returns-10",level:4},{value:"Implementation of",id:"implementation-of-2",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"syncDiscardOnSuccess",id:"syncdiscardonsuccess",level:3},{value:"Type parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-11",level:4},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"vaultState",id:"vaultstate",level:3},{value:"Returns",id:"returns-12",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"waitForFullyReady",id:"waitforfullyready",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-13",level:4},{value:"Implementation of",id:"implementation-of-3",level:4},{value:"Defined in",id:"defined-in-14",level:4}],d={toc:p};function c(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / ActiveProtection"),(0,i.kt)("h1",{id:"class-activeprotection"},"Class: ActiveProtection"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".ActiveProtection"),(0,i.kt)("p",null,'A State instance is a state in the "state machine" sense. It comes\nwith some behavior and state transition methods. A state transition\nmethod returns an instance of the next state given the\nexecuted operation, which discards current object.'),(0,i.kt)("p",null,"This class should be extended by client class. It provides method\nenabling the client class to query if it was already discarded\nor not as well as methods actually discarding the state."),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"ActiveProtection"))))),(0,i.kt)("h2",{id:"implements"},"Implements"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.WithProtectionParameters"},(0,i.kt)("inlineCode",{parentName:"a"},"WithProtectionParameters"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.WithActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"WithActiveProtection")),"<",(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection")),">"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.WithRefresh"},(0,i.kt)("inlineCode",{parentName:"a"},"WithRefresh")),"<",(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection")),">")),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"constructors"},"Constructors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#constructor"},"constructor"))),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#sharedstate"},"sharedState"))),(0,i.kt)("h3",{id:"accessors"},"Accessors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#discarded"},"discarded")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#protectionparameters"},"protectionParameters"))),(0,i.kt)("h3",{id:"methods"},"Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#discard"},"discard")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#discardonsuccess"},"discardOnSuccess")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#ensurecurrent"},"ensureCurrent")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#finalizeonsuccess"},"finalizeOnSuccess")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#getcurrentstate"},"getCurrentState")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#getcurrentstateorthrow"},"getCurrentStateOrThrow")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#isfullyready"},"isFullyReady")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#refresh"},"refresh")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#syncdiscardonsuccess"},"syncDiscardOnSuccess")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#vaultstate"},"vaultState")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ActiveProtection#waitforfullyready"},"waitForFullyReady"))),(0,i.kt)("h2",{id:"constructors-1"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new ActiveProtection"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"sharedState"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sharedState")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.RecoverySharedState"},(0,i.kt)("inlineCode",{parentName:"a"},"RecoverySharedState")))))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection"))),(0,i.kt)("h4",{id:"overrides"},"Overrides"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#constructor"},"constructor")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L642"},"packages/client/src/Recovery.ts:642")),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"sharedstate"},"sharedState"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"sharedState"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.RecoverySharedState"},(0,i.kt)("inlineCode",{parentName:"a"},"RecoverySharedState"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L647"},"packages/client/src/Recovery.ts:647")),(0,i.kt)("h2",{id:"accessors-1"},"Accessors"),(0,i.kt)("h3",{id:"discarded"},"discarded"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"discarded"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,i.kt)("p",null,"True if this state was discarded"),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,"State.discarded"),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L24"},"packages/client/src/State.ts:24")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"protectionparameters"},"protectionParameters"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"protectionParameters"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.ProtectionParameters"},(0,i.kt)("inlineCode",{parentName:"a"},"ProtectionParameters"))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.ProtectionParameters"},(0,i.kt)("inlineCode",{parentName:"a"},"ProtectionParameters"))),(0,i.kt)("h4",{id:"implementation-of"},"Implementation of"),(0,i.kt)("p",null,"WithProtectionParameters.protectionParameters"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L649"},"packages/client/src/Recovery.ts:649")),(0,i.kt)("h2",{id:"methods-1"},"Methods"),(0,i.kt)("h3",{id:"discard"},"discard"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"discard"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"next"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"next")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"undefined")," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State")))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,i.kt)("p",null,"Discards current state. One must discard the state only\nif the state transition was successfully executed. It may be safer to\nuse ",(0,i.kt)("inlineCode",{parentName:"p"},"discardOnSuccess"),"."),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#discard"},"discard")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L43"},"packages/client/src/State.ts:43")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"discardonsuccess"},"discardOnSuccess"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"discardOnSuccess"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"U"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"action"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"U"),">"),(0,i.kt)("h4",{id:"type-parameters"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"U")),(0,i.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))," = ",(0,i.kt)("inlineCode",{parentName:"td"},"T"))))),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"action")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"current"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"T"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"U"),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The state transition logic producing next state")))),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"U"),">"),(0,i.kt)("p",null,"Next state if state transition logic execution did not throw"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Descripiton"))),(0,i.kt)("p",null,"Discards current state only if given state transition logic\nexecuted successfully (i.e. without throwing an error)."),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#discardonsuccess"},"discardOnSuccess")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L55"},"packages/client/src/State.ts:55")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"ensurecurrent"},"ensureCurrent"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"ensureCurrent"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,i.kt)("p",null,"Throws an error if this state was discarded.\nThis should be called by all public methods of client class."),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#ensurecurrent"},"ensureCurrent")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L32"},"packages/client/src/State.ts:32")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"finalizeonsuccess"},"finalizeOnSuccess"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"finalizeOnSuccess"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"action"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"type-parameters-1"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State")))))),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"action")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"current"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"T"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"td"},"void"),">"),(0,i.kt)("td",{parentName:"tr",align:"left"},"The state transition logic producing next state")))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("p",null,"Next state if state transition logic execution did not throw"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Descripiton"))),(0,i.kt)("p",null,"Finalizes (i.e. replaces with no new state) current state only if given state transition logic\nexecuted successfully (i.e. without throwing an error)."),(0,i.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#finalizeonsuccess"},"finalizeOnSuccess")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L117"},"packages/client/src/State.ts:117")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getcurrentstate"},"getCurrentState"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getCurrentState"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))),(0,i.kt)("p",null,"This state if not discareded or the current state or undefined when there is no current state."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Description"))),(0,i.kt)("p",null,"If the state has been discarded, provides the replacing current state if any."),(0,i.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#getcurrentstate"},"getCurrentState")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L90"},"packages/client/src/State.ts:90")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getcurrentstateorthrow"},"getCurrentStateOrThrow"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getCurrentStateOrThrow"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))),(0,i.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#getcurrentstateorthrow"},"getCurrentStateOrThrow")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L102"},"packages/client/src/State.ts:102")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isfullyready"},"isFullyReady"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isFullyReady"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"implementation-of-1"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.WithActiveProtection"},"WithActiveProtection"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.WithActiveProtection#isfullyready"},"isFullyReady")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L653"},"packages/client/src/Recovery.ts:653")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"refresh"},"refresh"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"refresh"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection")),">"),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection")),">"),(0,i.kt)("h4",{id:"implementation-of-2"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.WithRefresh"},"WithRefresh"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.WithRefresh#refresh"},"refresh")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L661"},"packages/client/src/Recovery.ts:661")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"syncdiscardonsuccess"},"syncDiscardOnSuccess"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"syncDiscardOnSuccess"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"T"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"U"),">","(",(0,i.kt)("inlineCode",{parentName:"p"},"action"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"U")),(0,i.kt)("h4",{id:"type-parameters-2"},"Type parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"T")),(0,i.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"U")),(0,i.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.State"},(0,i.kt)("inlineCode",{parentName:"a"},"State"))," = ",(0,i.kt)("inlineCode",{parentName:"td"},"T"))))),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"action")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"current"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"T"),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"U")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The state transition logic producing next state")))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"U")),(0,i.kt)("p",null,"Next state if state transition logic execution did not throw"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Descripiton"))),(0,i.kt)("p",null,"Same as ",(0,i.kt)("inlineCode",{parentName:"p"},"discardOnSuccess")," but with a synchronous action."),(0,i.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State"},"State"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.State#syncdiscardonsuccess"},"syncDiscardOnSuccess")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/State.ts#L73"},"packages/client/src/State.ts:73")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"vaultstate"},"vaultState"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"vaultState"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.VaultState"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultState")),">"),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.VaultState"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultState")),">"),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L657"},"packages/client/src/Recovery.ts:657")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"waitforfullyready"},"waitForFullyReady"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"waitForFullyReady"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"pollingParameters?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection")),">"),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"pollingParameters?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.PollingParameters"},(0,i.kt)("inlineCode",{parentName:"a"},"PollingParameters")))))),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ActiveProtection"},(0,i.kt)("inlineCode",{parentName:"a"},"ActiveProtection")),">"),(0,i.kt)("h4",{id:"implementation-of-3"},"Implementation of"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.WithActiveProtection"},"WithActiveProtection"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.WithActiveProtection#waitforfullyready"},"waitForFullyReady")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L665"},"packages/client/src/Recovery.ts:665")))}c.isMDXComponent=!0}}]);