"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5950],{5318:(e,t,i)=>{i.d(t,{Zo:()=>c,kt:()=>u});var n=i(7378);function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function l(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){a(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function o(e,t){if(null==e)return{};var i,n,a=function(e,t){if(null==e)return{};var i,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(a[i]=e[i]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(a[i]=e[i])}return a}var p=n.createContext({}),d=function(e){var t=n.useContext(p),i=t;return e&&(i="function"==typeof e?e(t):l(l({},t),e)),i},c=function(e){var t=d(e.components);return n.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var i=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),f=d(i),u=a,k=f["".concat(p,".").concat(u)]||f[u]||s[u]||r;return i?n.createElement(k,l(l({ref:t},c),{},{components:i})):n.createElement(k,l({ref:t},c))}));function u(e,t){var i=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=i.length,l=new Array(r);l[0]=f;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var d=2;d<r;d++)l[d]=i[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,i)}f.displayName="MDXCreateElement"},1495:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var n=i(2685),a=(i(7378),i(5318));const r={},l=void 0,o={unversionedId:"api/interfaces/Client.LocFile",id:"api/interfaces/Client.LocFile",title:"Client.LocFile",description:"API / Modules / Client / LocFile",source:"@site/docs/api/interfaces/Client.LocFile.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.LocFile",permalink:"/logion-api/docs/api/interfaces/Client.LocFile",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.LocFile.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.LocData",permalink:"/logion-api/docs/api/interfaces/Client.LocData"},next:{title:"Client.LocLink",permalink:"/logion-api/docs/api/interfaces/Client.LocLink"}},p={},d=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"addedOn",id:"addedon",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"contentType",id:"contenttype",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"hash",id:"hash",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"nature",id:"nature",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"restrictedDelivery",id:"restricteddelivery",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"size",id:"size",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"submitter",id:"submitter",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-7",level:4}],c={toc:d};function s(e){let{components:t,...i}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / LocFile"),(0,a.kt)("h1",{id:"interface-locfile"},"Interface: LocFile"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".LocFile"),(0,a.kt)("p",null,"Blockchain File, extended with private attributes and timestamp."),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File"},(0,a.kt)("inlineCode",{parentName:"a"},"File")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Partial"),"<",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.AddedOn"},(0,a.kt)("inlineCode",{parentName:"a"},"AddedOn")),">"),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"LocFile"))),(0,a.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.MergedFile"},(0,a.kt)("inlineCode",{parentName:"a"},"MergedFile"))))),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"properties"},"Properties"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#addedon"},"addedOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#contenttype"},"contentType")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#hash"},"hash")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#name"},"name")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#nature"},"nature")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#restricteddelivery"},"restrictedDelivery")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#size"},"size")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocFile#submitter"},"submitter"))),(0,a.kt)("h2",{id:"properties-1"},"Properties"),(0,a.kt)("h3",{id:"addedon"},"addedOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"addedOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,"Partial.addedOn"),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L36"},"packages/client/src/LocClient.ts:36")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"contenttype"},"contentType"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"contentType"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L49"},"packages/client/src/LocClient.ts:49")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"hash"},"hash"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"hash"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File"},"File"),".",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File#hash"},"hash")),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,"packages/node-api/dist/types/Types.d.ts:8"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"name"},"name"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"name"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L47"},"packages/client/src/LocClient.ts:47")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"nature"},"nature"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"nature"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File"},"File"),".",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File#nature"},"nature")),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,"packages/node-api/dist/types/Types.d.ts:9"),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"restricteddelivery"},"restrictedDelivery"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"restrictedDelivery"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"boolean")),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L48"},"packages/client/src/LocClient.ts:48")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"size"},"size"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"size"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L50"},"packages/client/src/LocClient.ts:50")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"submitter"},"submitter"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"submitter"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File"},"File"),".",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.File#submitter"},"submitter")),(0,a.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,a.kt)("p",null,"packages/node-api/dist/types/Types.d.ts:10"))}s.isMDXComponent=!0}}]);