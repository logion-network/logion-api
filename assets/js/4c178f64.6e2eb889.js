"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[178],{5318:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>u});var n=a(7378);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var c=n.createContext({}),p=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,l=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),k=p(a),u=i,m=k["".concat(c,".").concat(u)]||k[u]||d[u]||l;return a?n.createElement(m,r(r({ref:t},s),{},{components:a})):n.createElement(m,r({ref:t},s))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=a.length,r=new Array(l);r[0]=k;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var p=2;p<l;p++)r[p]=a[p];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},7704:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=a(5773),i=(a(7378),a(5318));const l={},r=void 0,o={unversionedId:"api/classes/Client.PublicLoc",id:"api/classes/Client.PublicLoc",title:"Client.PublicLoc",description:"API / Modules / Client / PublicLoc",source:"@site/docs/api/classes/Client.PublicLoc.md",sourceDirName:"api/classes",slug:"/api/classes/Client.PublicLoc",permalink:"/logion-api/docs/api/classes/Client.PublicLoc",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/classes/Client.PublicLoc.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.PublicApi",permalink:"/logion-api/docs/api/classes/Client.PublicApi"},next:{title:"Client.PublicLocClient",permalink:"/logion-api/docs/api/classes/Client.PublicLocClient"}},c={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Properties",id:"properties",level:3},{value:"Accessors",id:"accessors",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties-1",level:2},{value:"_data",id:"_data",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"client",id:"client",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"Accessors",id:"accessors-1",level:2},{value:"data",id:"data",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"Methods",id:"methods-1",level:2},{value:"checkCertifiedCopy",id:"checkcertifiedcopy",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"checkHash",id:"checkhash",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"isLogionDataLoc",id:"islogiondataloc",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"isLogionIdentityLoc",id:"islogionidentityloc",level:3},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-7",level:4}],s={toc:p};function d(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / PublicLoc"),(0,i.kt)("h1",{id:"class-publicloc"},"Class: PublicLoc"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".PublicLoc"),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"constructors"},"Constructors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#constructor"},"constructor"))),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#_data"},"_","data")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#client"},"client"))),(0,i.kt)("h3",{id:"accessors"},"Accessors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#data"},"data"))),(0,i.kt)("h3",{id:"methods"},"Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#checkcertifiedcopy"},"checkCertifiedCopy")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#checkhash"},"checkHash")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#islogiondataloc"},"isLogionDataLoc")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.PublicLoc#islogionidentityloc"},"isLogionIdentityLoc"))),(0,i.kt)("h2",{id:"constructors-1"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new PublicLoc"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"args"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.PublicLoc"},(0,i.kt)("inlineCode",{parentName:"a"},"PublicLoc"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"args")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Object"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"args.client")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.PublicLocClient"},(0,i.kt)("inlineCode",{parentName:"a"},"PublicLocClient")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"args.data")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.LocData"},(0,i.kt)("inlineCode",{parentName:"a"},"LocData")))))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.PublicLoc"},(0,i.kt)("inlineCode",{parentName:"a"},"PublicLoc"))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L97"},"packages/client/src/Public.ts:97")),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"_data"},"_","data"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"_","data"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocData"},(0,i.kt)("inlineCode",{parentName:"a"},"LocData"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L105"},"packages/client/src/Public.ts:105")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"client"},"client"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"client"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.PublicLocClient"},(0,i.kt)("inlineCode",{parentName:"a"},"PublicLocClient"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L107"},"packages/client/src/Public.ts:107")),(0,i.kt)("h2",{id:"accessors-1"},"Accessors"),(0,i.kt)("h3",{id:"data"},"data"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"data"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocData"},(0,i.kt)("inlineCode",{parentName:"a"},"LocData"))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocData"},(0,i.kt)("inlineCode",{parentName:"a"},"LocData"))),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L109"},"packages/client/src/Public.ts:109")),(0,i.kt)("h2",{id:"methods-1"},"Methods"),(0,i.kt)("h3",{id:"checkcertifiedcopy"},"checkCertifiedCopy"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"checkCertifiedCopy"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"hash"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.CheckCertifiedCopyResult"},(0,i.kt)("inlineCode",{parentName:"a"},"CheckCertifiedCopyResult")),">"),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"hash")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Hash"))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.CheckCertifiedCopyResult"},(0,i.kt)("inlineCode",{parentName:"a"},"CheckCertifiedCopyResult")),">"),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L147"},"packages/client/src/Public.ts:147")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"checkhash"},"checkHash"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"checkHash"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"hash"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"itemId?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.CheckHashResult"},(0,i.kt)("inlineCode",{parentName:"a"},"CheckHashResult")),">"),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"hash")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Hash"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"itemId?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Hash"))))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.CheckHashResult"},(0,i.kt)("inlineCode",{parentName:"a"},"CheckHashResult")),">"),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L113"},"packages/client/src/Public.ts:113")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"islogiondataloc"},"isLogionDataLoc"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isLogionDataLoc"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L143"},"packages/client/src/Public.ts:143")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"islogionidentityloc"},"isLogionIdentityLoc"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isLogionIdentityLoc"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Public.ts#L139"},"packages/client/src/Public.ts:139")))}d.isMDXComponent=!0}}]);