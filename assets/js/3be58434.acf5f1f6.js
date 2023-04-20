"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9188],{5318:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>f});var i=a(7378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=i.createContext({}),d=function(e){var t=i.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},c=function(e){var t=d(e.components);return i.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=d(a),f=n,u=m["".concat(p,".").concat(f)]||m[f]||s[f]||r;return a?i.createElement(u,l(l({ref:t},c),{},{components:a})):i.createElement(u,l({ref:t},c))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,l=new Array(r);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,l[1]=o;for(var d=2;d<r;d++)l[d]=a[d];return i.createElement.apply(null,l)}return i.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9912:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var i=a(5773),n=(a(7378),a(5318));const r={},l=void 0,o={unversionedId:"api/interfaces/Client.MergedMetadataItem",id:"api/interfaces/Client.MergedMetadataItem",title:"Client.MergedMetadataItem",description:"API / Modules / Client / MergedMetadataItem",source:"@site/docs/api/interfaces/Client.MergedMetadataItem.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.MergedMetadataItem",permalink:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.MergedMetadataItem.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.MergedLink",permalink:"/logion-api/docs/api/interfaces/Client.MergedLink"},next:{title:"Client.MultiSourceHttpClientState",permalink:"/logion-api/docs/api/interfaces/Client.MultiSourceHttpClientState"}},p={},d=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"addedOn",id:"addedon",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"fees",id:"fees",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"published",id:"published",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"submitter",id:"submitter",level:3},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"value",id:"value",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-5",level:4}],c={toc:d};function s(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,i.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / MergedMetadataItem"),(0,n.kt)("h1",{id:"interface-mergedmetadataitem"},"Interface: MergedMetadataItem"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".MergedMetadataItem"),(0,n.kt)("p",null,"Blockchain MetadataItem, extended with timestamp."),(0,n.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},(0,n.kt)("inlineCode",{parentName:"a"},"LocMetadataItem")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.Published"},(0,n.kt)("inlineCode",{parentName:"a"},"Published"))),(0,n.kt)("p",{parentName:"li"},"\u21b3 ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"MergedMetadataItem"))))),(0,n.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem#addedon"},"addedOn")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem#fees"},"fees")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem#name"},"name")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem#published"},"published")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem#submitter"},"submitter")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.MergedMetadataItem#value"},"value"))),(0,n.kt)("h2",{id:"properties-1"},"Properties"),(0,n.kt)("h3",{id:"addedon"},"addedOn"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"addedOn"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},"LocMetadataItem"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem#addedon"},"addedOn")),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L49"},"packages/client/src/LocClient.ts:49")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"fees"},"fees"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,n.kt)("strong",{parentName:"p"},"fees"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.Fees"},(0,n.kt)("inlineCode",{parentName:"a"},"Fees"))),(0,n.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},"LocMetadataItem"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem#fees"},"fees")),(0,n.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L86"},"packages/client/src/LocClient.ts:86")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"name"},"name"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"name"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},"LocMetadataItem"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem#name"},"name")),(0,n.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L83"},"packages/client/src/LocClient.ts:83")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"published"},"published"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"published"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"boolean")),(0,n.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.Published"},"Published"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.Published#published"},"published")),(0,n.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L53"},"packages/client/src/LocClient.ts:53")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"submitter"},"submitter"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"submitter"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.ValidAccountId"},(0,n.kt)("inlineCode",{parentName:"a"},"ValidAccountId"))),(0,n.kt)("h4",{id:"overrides"},"Overrides"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},"LocMetadataItem"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem#submitter"},"submitter")),(0,n.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Loc.ts#L76"},"packages/client/src/Loc.ts:76")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"value"},"value"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"value"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},"LocMetadataItem"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem#value"},"value")),(0,n.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/LocClient.ts#L84"},"packages/client/src/LocClient.ts:84")))}s.isMDXComponent=!0}}]);