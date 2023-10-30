"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2205],{5318:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(7378);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),k=s(a),m=r,u=k["".concat(p,".").concat(m)]||k[m]||d[m]||i;return a?n.createElement(u,l(l({ref:t},c),{},{components:a})):n.createElement(u,l({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=k;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},3883:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var n=a(5773),r=(a(7378),a(5318));const i={},l=void 0,o={unversionedId:"api/classes/Client.LoRecoveryClient",id:"api/classes/Client.LoRecoveryClient",title:"Client.LoRecoveryClient",description:"API / Modules / Client / LoRecoveryClient",source:"@site/docs/api/classes/Client.LoRecoveryClient.md",sourceDirName:"api/classes",slug:"/api/classes/Client.LoRecoveryClient",permalink:"/logion-api/docs/api/classes/Client.LoRecoveryClient",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/classes/Client.LoRecoveryClient.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.LegalOfficerRestrictedDeliveryCommandsImpl",permalink:"/logion-api/docs/api/classes/Client.LegalOfficerRestrictedDeliveryCommandsImpl"},next:{title:"Client.LocClient",permalink:"/logion-api/docs/api/classes/Client.LocClient"}},p={},s=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties-1",level:2},{value:"axiosFactory",id:"axiosfactory",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"legalOfficer",id:"legalofficer",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"token",id:"token",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"Methods",id:"methods-1",level:2},{value:"backend",id:"backend",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"cancel",id:"cancel",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"createProtectionRequest",id:"createprotectionrequest",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"resubmit",id:"resubmit",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"update",id:"update",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-8",level:4}],c={toc:s};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / LoRecoveryClient"),(0,r.kt)("h1",{id:"class-lorecoveryclient"},"Class: LoRecoveryClient"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".LoRecoveryClient"),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"constructors"},"Constructors"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#constructor"},"constructor"))),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#axiosfactory"},"axiosFactory")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#legalofficer"},"legalOfficer")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#token"},"token"))),(0,r.kt)("h3",{id:"methods"},"Methods"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#backend"},"backend")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#cancel"},"cancel")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#createprotectionrequest"},"createProtectionRequest")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#resubmit"},"resubmit")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient#update"},"update"))),(0,r.kt)("h2",{id:"constructors-1"},"Constructors"),(0,r.kt)("h3",{id:"constructor"},"constructor"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"new LoRecoveryClient"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient"},(0,r.kt)("inlineCode",{parentName:"a"},"LoRecoveryClient"))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Object"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params.axiosFactory")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.AxiosFactory"},(0,r.kt)("inlineCode",{parentName:"a"},"AxiosFactory")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params.legalOfficer")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,r.kt)("inlineCode",{parentName:"a"},"LegalOfficer")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params.token")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient"},(0,r.kt)("inlineCode",{parentName:"a"},"LoRecoveryClient"))),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L176"},"packages/client/src/RecoveryClient.ts:176")),(0,r.kt)("h2",{id:"properties-1"},"Properties"),(0,r.kt)("h3",{id:"axiosfactory"},"axiosFactory"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"axiosFactory"),": ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.AxiosFactory"},(0,r.kt)("inlineCode",{parentName:"a"},"AxiosFactory"))),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L186"},"packages/client/src/RecoveryClient.ts:186")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"legalofficer"},"legalOfficer"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"legalOfficer"),": ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,r.kt)("inlineCode",{parentName:"a"},"LegalOfficer"))),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L188"},"packages/client/src/RecoveryClient.ts:188")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"token"},"token"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,r.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,r.kt)("strong",{parentName:"p"},"token"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L187"},"packages/client/src/RecoveryClient.ts:187")),(0,r.kt)("h2",{id:"methods-1"},"Methods"),(0,r.kt)("h3",{id:"backend"},"backend"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"backend"),"(): ",(0,r.kt)("inlineCode",{parentName:"p"},"AxiosInstance")),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"AxiosInstance")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L212"},"packages/client/src/RecoveryClient.ts:212")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"cancel"},"cancel"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"cancel"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.UserActionParameters"},(0,r.kt)("inlineCode",{parentName:"a"},"UserActionParameters")))))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L200"},"packages/client/src/RecoveryClient.ts:200")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"createprotectionrequest"},"createProtectionRequest"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"createProtectionRequest"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"request"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.ProtectionRequest"},(0,r.kt)("inlineCode",{parentName:"a"},"ProtectionRequest")),">"),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"request")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.CreateProtectionRequest"},(0,r.kt)("inlineCode",{parentName:"a"},"CreateProtectionRequest")))))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.ProtectionRequest"},(0,r.kt)("inlineCode",{parentName:"a"},"ProtectionRequest")),">"),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L190"},"packages/client/src/RecoveryClient.ts:190")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"resubmit"},"resubmit"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"resubmit"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.UserActionParameters"},(0,r.kt)("inlineCode",{parentName:"a"},"UserActionParameters")))))),(0,r.kt)("h4",{id:"returns-4"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L195"},"packages/client/src/RecoveryClient.ts:195")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"update"},"update"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"update"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"params"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,r.kt)("h4",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"params")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.UserActionParameters"},(0,r.kt)("inlineCode",{parentName:"a"},"UserActionParameters"))," & ",(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.UpdateParameters"},(0,r.kt)("inlineCode",{parentName:"a"},"UpdateParameters")))))),(0,r.kt)("h4",{id:"returns-5"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,r.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/RecoveryClient.ts#L205"},"packages/client/src/RecoveryClient.ts:205")))}d.isMDXComponent=!0}}]);