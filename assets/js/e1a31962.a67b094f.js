"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3525],{5318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var i=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),f=s(n),k=a,u=f["".concat(p,".").concat(k)]||f[k]||d[k]||r;return n?i.createElement(u,l(l({ref:t},c),{},{components:n})):i.createElement(u,l({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=f;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var s=2;s<r;s++)l[s]=n[s];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2189:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var i=n(5773),a=(n(7378),n(5318));const r={},l=void 0,o={unversionedId:"api/interfaces/Client.Transaction",id:"api/interfaces/Client.Transaction",title:"Client.Transaction",description:"API / Modules / Client / Transaction",source:"@site/docs/api/interfaces/Client.Transaction.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.Transaction",permalink:"/logion-api/docs/api/interfaces/Client.Transaction",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.Transaction.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.TokenValidationResult",permalink:"/logion-api/docs/api/interfaces/Client.TokenValidationResult"},next:{title:"Client.TransactionError",permalink:"/logion-api/docs/api/interfaces/Client.TransactionError"}},p={},s=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"createdOn",id:"createdon",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"error",id:"error",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"fees",id:"fees",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"from",id:"from",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"id",id:"id",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"method",id:"method",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"pallet",id:"pallet",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"reserved",id:"reserved",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"successful",id:"successful",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"tip",id:"tip",level:3},{value:"Defined in",id:"defined-in-9",level:4},{value:"to",id:"to",level:3},{value:"Defined in",id:"defined-in-10",level:4},{value:"total",id:"total",level:3},{value:"Defined in",id:"defined-in-11",level:4},{value:"transferDirection",id:"transferdirection",level:3},{value:"Defined in",id:"defined-in-12",level:4},{value:"transferValue",id:"transfervalue",level:3},{value:"Defined in",id:"defined-in-13",level:4},{value:"type",id:"type",level:3},{value:"Defined in",id:"defined-in-14",level:4}],c={toc:s};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / Transaction"),(0,a.kt)("h1",{id:"interface-transaction"},"Interface: Transaction"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".Transaction"),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"properties"},"Properties"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#createdon"},"createdOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#error"},"error")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#fees"},"fees")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#from"},"from")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#id"},"id")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#method"},"method")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#pallet"},"pallet")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#reserved"},"reserved")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#successful"},"successful")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#tip"},"tip")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#to"},"to")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#total"},"total")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#transferdirection"},"transferDirection")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#transfervalue"},"transferValue")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.Transaction#type"},"type"))),(0,a.kt)("h2",{id:"properties-1"},"Properties"),(0,a.kt)("h3",{id:"createdon"},"createdOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"createdOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L28"},"packages/client/src/TransactionClient.ts:28")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"error"},"error"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"error"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.TransactionError"},(0,a.kt)("inlineCode",{parentName:"a"},"TransactionError"))),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L32"},"packages/client/src/TransactionClient.ts:32")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"fees"},"fees"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"fees"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.Fees"},(0,a.kt)("inlineCode",{parentName:"a"},"Fees"))),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L25"},"packages/client/src/TransactionClient.ts:25")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"from"},"from"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"from"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L19"},"packages/client/src/TransactionClient.ts:19")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"id"},"id"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"id"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L18"},"packages/client/src/TransactionClient.ts:18")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"method"},"method"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"method"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L22"},"packages/client/src/TransactionClient.ts:22")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"pallet"},"pallet"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"pallet"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L21"},"packages/client/src/TransactionClient.ts:21")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"reserved"},"reserved"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"reserved"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L26"},"packages/client/src/TransactionClient.ts:26")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"successful"},"successful"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"successful"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L31"},"packages/client/src/TransactionClient.ts:31")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"tip"},"tip"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"tip"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L24"},"packages/client/src/TransactionClient.ts:24")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"to"},"to"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"to"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L20"},"packages/client/src/TransactionClient.ts:20")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"total"},"total"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"total"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L27"},"packages/client/src/TransactionClient.ts:27")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"transferdirection"},"transferDirection"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"transferDirection"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#transferdirection"},(0,a.kt)("inlineCode",{parentName:"a"},"TransferDirection"))),(0,a.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L30"},"packages/client/src/TransactionClient.ts:30")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"transfervalue"},"transferValue"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"transferValue"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L23"},"packages/client/src/TransactionClient.ts:23")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"type"},"type"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"type"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#transactiontype"},(0,a.kt)("inlineCode",{parentName:"a"},"TransactionType"))),(0,a.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/TransactionClient.ts#L29"},"packages/client/src/TransactionClient.ts:29")))}d.isMDXComponent=!0}}]);