"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7351],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=s(n),m=i,g=c["".concat(p,".").concat(m)]||c[m]||k[m]||l;return n?a.createElement(g,r(r({ref:t},d),{},{components:n})):a.createElement(g,r({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var s=2;s<l;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2923:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>k,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var a=n(2685),i=(n(7378),n(5318));const l={},r=void 0,o={unversionedId:"api/classes/Client.LogionClient",id:"api/classes/Client.LogionClient",title:"Client.LogionClient",description:"API / Modules / Client / LogionClient",source:"@site/docs/api/classes/Client.LogionClient.md",sourceDirName:"api/classes",slug:"/api/classes/Client.LogionClient",permalink:"/logion-api/docs/api/classes/Client.LogionClient",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/classes/Client.LogionClient.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.LogionClassification",permalink:"/logion-api/docs/api/classes/Client.LogionClassification"},next:{title:"Client.MimeType",permalink:"/logion-api/docs/api/classes/Client.MimeType"}},p={},s=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Accessors",id:"accessors",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Accessors",id:"accessors-1",level:2},{value:"allLegalOfficers",id:"alllegalofficers",level:3},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"config",id:"config",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"currentAddress",id:"currentaddress",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"directoryClient",id:"directoryclient",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"legalOfficers",id:"legalofficers",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"nodeApi",id:"nodeapi",level:3},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"public",id:"public",level:3},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"tokens",id:"tokens",level:3},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"Methods",id:"methods-1",level:2},{value:"authenticate",id:"authenticate",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"balanceState",id:"balancestate",level:3},{value:"Returns",id:"returns-9",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"buildAxios",id:"buildaxios",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-10",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"disconnect",id:"disconnect",level:3},{value:"Returns",id:"returns-11",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"isLegalOfficer",id:"islegalofficer",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-12",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"isProtected",id:"isprotected",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-13",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"isRegisteredLegalOfficer",id:"isregisteredlegalofficer",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-14",level:4},{value:"Defined in",id:"defined-in-15",level:4},{value:"isTokenValid",id:"istokenvalid",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-15",level:4},{value:"Defined in",id:"defined-in-16",level:4},{value:"isValidAddress",id:"isvalidaddress",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-16",level:4},{value:"Defined in",id:"defined-in-17",level:4},{value:"locsState",id:"locsstate",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-17",level:4},{value:"Defined in",id:"defined-in-18",level:4},{value:"logout",id:"logout",level:3},{value:"Returns",id:"returns-18",level:4},{value:"Defined in",id:"defined-in-19",level:4},{value:"protectionState",id:"protectionstate",level:3},{value:"Returns",id:"returns-19",level:4},{value:"Defined in",id:"defined-in-20",level:4},{value:"refreshTokens",id:"refreshtokens",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-20",level:4},{value:"Defined in",id:"defined-in-21",level:4},{value:"useTokens",id:"usetokens",level:3},{value:"Parameters",id:"parameters-10",level:4},{value:"Returns",id:"returns-21",level:4},{value:"Defined in",id:"defined-in-22",level:4},{value:"withCurrentAddress",id:"withcurrentaddress",level:3},{value:"Parameters",id:"parameters-11",level:4},{value:"Returns",id:"returns-22",level:4},{value:"Defined in",id:"defined-in-23",level:4},{value:"create",id:"create",level:3},{value:"Parameters",id:"parameters-12",level:4},{value:"Returns",id:"returns-23",level:4},{value:"Defined in",id:"defined-in-24",level:4}],d={toc:s};function k(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / LogionClient"),(0,i.kt)("h1",{id:"class-logionclient"},"Class: LogionClient"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".LogionClient"),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"constructors"},"Constructors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#constructor"},"constructor"))),(0,i.kt)("h3",{id:"accessors"},"Accessors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#alllegalofficers"},"allLegalOfficers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#config"},"config")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#currentaddress"},"currentAddress")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#directoryclient"},"directoryClient")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#legalofficers"},"legalOfficers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#nodeapi"},"nodeApi")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#public"},"public")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#tokens"},"tokens"))),(0,i.kt)("h3",{id:"methods"},"Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#authenticate"},"authenticate")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#balancestate"},"balanceState")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#buildaxios"},"buildAxios")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#disconnect"},"disconnect")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#islegalofficer"},"isLegalOfficer")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#isprotected"},"isProtected")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#isregisteredlegalofficer"},"isRegisteredLegalOfficer")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#istokenvalid"},"isTokenValid")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#isvalidaddress"},"isValidAddress")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#locsstate"},"locsState")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#logout"},"logout")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#protectionstate"},"protectionState")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#refreshtokens"},"refreshTokens")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#usetokens"},"useTokens")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#withcurrentaddress"},"withCurrentAddress")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.LogionClient#create"},"create"))),(0,i.kt)("h2",{id:"constructors-1"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new LogionClient"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"sharedState"),")"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sharedState")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.SharedState"},(0,i.kt)("inlineCode",{parentName:"a"},"SharedState")))))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L47"},"packages/client/src/LogionClient.ts:47")),(0,i.kt)("h2",{id:"accessors-1"},"Accessors"),(0,i.kt)("h3",{id:"alllegalofficers"},"allLegalOfficers"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"allLegalOfficers"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L76"},"packages/client/src/LogionClient.ts:76")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"config"},"config"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"config"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LogionClientConfig"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClientConfig"))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LogionClientConfig"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClientConfig"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L56"},"packages/client/src/LogionClient.ts:56")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"currentaddress"},"currentAddress"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"currentAddress"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L60"},"packages/client/src/LogionClient.ts:60")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"directoryclient"},"directoryClient"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"directoryClient"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.DirectoryClient"},(0,i.kt)("inlineCode",{parentName:"a"},"DirectoryClient"))),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.DirectoryClient"},(0,i.kt)("inlineCode",{parentName:"a"},"DirectoryClient"))),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L68"},"packages/client/src/LogionClient.ts:68")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"legalofficers"},"legalOfficers"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"legalOfficers"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L72"},"packages/client/src/LogionClient.ts:72")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"nodeapi"},"nodeApi"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"nodeApi"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"ApiPromise")),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ApiPromise")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L80"},"packages/client/src/LogionClient.ts:80")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"public"},"public"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"public"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.PublicApi"},(0,i.kt)("inlineCode",{parentName:"a"},"PublicApi"))),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.PublicApi"},(0,i.kt)("inlineCode",{parentName:"a"},"PublicApi"))),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L252"},"packages/client/src/LogionClient.ts:252")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tokens"},"tokens"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"tokens"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.AccountTokens"},(0,i.kt)("inlineCode",{parentName:"a"},"AccountTokens"))),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.AccountTokens"},(0,i.kt)("inlineCode",{parentName:"a"},"AccountTokens"))),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L64"},"packages/client/src/LogionClient.ts:64")),(0,i.kt)("h2",{id:"methods-1"},"Methods"),(0,i.kt)("h3",{id:"authenticate"},"authenticate"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"authenticate"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"addresses"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"signer"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient")),">"),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"addresses")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"),"[]")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"signer")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.RawSigner"},(0,i.kt)("inlineCode",{parentName:"a"},"RawSigner")))))),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient")),">"),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L186"},"packages/client/src/LogionClient.ts:186")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"balancestate"},"balanceState"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"balanceState"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.BalanceState"},(0,i.kt)("inlineCode",{parentName:"a"},"BalanceState")),">"),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.BalanceState"},(0,i.kt)("inlineCode",{parentName:"a"},"BalanceState")),">"),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L223"},"packages/client/src/LogionClient.ts:223")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"buildaxios"},"buildAxios"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"buildAxios"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"legalOfficer"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"AxiosInstance")),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"legalOfficer")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")))))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"AxiosInstance")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L215"},"packages/client/src/LogionClient.ts:215")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"disconnect"},"disconnect"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"disconnect"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L257"},"packages/client/src/LogionClient.ts:257")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"islegalofficer"},"isLegalOfficer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isLegalOfficer"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"address"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"address")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L204"},"packages/client/src/LogionClient.ts:204")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isprotected"},"isProtected"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isProtected"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"address"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),">"),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"address")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"returns-13"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),">"),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L234"},"packages/client/src/LogionClient.ts:234")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isregisteredlegalofficer"},"isRegisteredLegalOfficer"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isRegisteredLegalOfficer"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"address"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),">"),(0,i.kt)("h4",{id:"parameters-5"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"address")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"returns-14"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"boolean"),">"),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L209"},"packages/client/src/LogionClient.ts:209")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"istokenvalid"},"isTokenValid"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isTokenValid"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"now"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"parameters-6"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"now")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DateTime"))))),(0,i.kt)("h4",{id:"returns-15"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L182"},"packages/client/src/LogionClient.ts:182")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isvalidaddress"},"isValidAddress"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"isValidAddress"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"address"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"parameters-7"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"address")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"returns-16"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L243"},"packages/client/src/LogionClient.ts:243")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"locsstate"},"locsState"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"locsState"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"params?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LocsState"},(0,i.kt)("inlineCode",{parentName:"a"},"LocsState")),">"),(0,i.kt)("h4",{id:"parameters-8"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"params?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.FetchAllLocsParams"},(0,i.kt)("inlineCode",{parentName:"a"},"FetchAllLocsParams")))))),(0,i.kt)("h4",{id:"returns-17"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LocsState"},(0,i.kt)("inlineCode",{parentName:"a"},"LocsState")),">"),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L247"},"packages/client/src/LogionClient.ts:247")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"logout"},"logout"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"logout"),"(): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient"))),(0,i.kt)("h4",{id:"returns-18"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient"))),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L146"},"packages/client/src/LogionClient.ts:146")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"protectionstate"},"protectionState"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"protectionState"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#protectionstate"},(0,i.kt)("inlineCode",{parentName:"a"},"ProtectionState")),">"),(0,i.kt)("h4",{id:"returns-19"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#protectionstate"},(0,i.kt)("inlineCode",{parentName:"a"},"ProtectionState")),">"),(0,i.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L168"},"packages/client/src/LogionClient.ts:168")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"refreshtokens"},"refreshTokens"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"refreshTokens"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"now"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"threshold?"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient")),">"),(0,i.kt)("h4",{id:"parameters-9"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"now")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DateTime"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"threshold?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"DurationLike"))))),(0,i.kt)("h4",{id:"returns-20"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient")),">"),(0,i.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L98"},"packages/client/src/LogionClient.ts:98")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"usetokens"},"useTokens"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"useTokens"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"tokens"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient"))),(0,i.kt)("h4",{id:"parameters-10"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"tokens")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.AccountTokens"},(0,i.kt)("inlineCode",{parentName:"a"},"AccountTokens")))))),(0,i.kt)("h4",{id:"returns-21"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient"))),(0,i.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L84"},"packages/client/src/LogionClient.ts:84")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"withcurrentaddress"},"withCurrentAddress"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"withCurrentAddress"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"currentAddress?"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient"))),(0,i.kt)("h4",{id:"parameters-11"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"currentAddress?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"returns-22"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient"))),(0,i.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L124"},"packages/client/src/LogionClient.ts:124")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"create"},"create"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("inlineCode",{parentName:"p"},"Static")," ",(0,i.kt)("strong",{parentName:"p"},"create"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"config"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient")),">"),(0,i.kt)("h4",{id:"parameters-12"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"config")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.LogionClientConfig"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClientConfig")))))),(0,i.kt)("h4",{id:"returns-23"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LogionClient"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClient")),">"),(0,i.kt)("h4",{id:"defined-in-24"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LogionClient.ts#L21"},"packages/client/src/LogionClient.ts:21")))}k.isMDXComponent=!0}}]);