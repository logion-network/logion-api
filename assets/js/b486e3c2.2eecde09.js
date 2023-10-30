"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6125],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var i=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),c=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return i.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),f=c(n),k=a,m=f["".concat(p,".").concat(k)]||f[k]||s[k]||r;return n?i.createElement(m,l(l({ref:t},d),{},{components:n})):i.createElement(m,l({ref:t},d))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=f;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<r;c++)l[c]=n[c];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4474:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=n(5773),a=(n(7378),n(5318));const r={},l=void 0,o={unversionedId:"api/interfaces/Client.ItemLifecycle",id:"api/interfaces/Client.ItemLifecycle",title:"Client.ItemLifecycle",description:"API / Modules / Client / ItemLifecycle",source:"@site/docs/api/interfaces/Client.ItemLifecycle.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.ItemLifecycle",permalink:"/logion-api/docs/api/interfaces/Client.ItemLifecycle",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.ItemLifecycle.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.ItemDeliveryMatch",permalink:"/logion-api/docs/api/interfaces/Client.ItemDeliveryMatch"},next:{title:"Client.ItemTokenWithRestrictedType",permalink:"/logion-api/docs/api/interfaces/Client.ItemTokenWithRestrictedType"}},p={},c=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"acknowledgedByOwnerOn",id:"acknowledgedbyowneron",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"acknowledgedByVerifiedIssuerOn",id:"acknowledgedbyverifiedissueron",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"addedOn",id:"addedon",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"rejectReason",id:"rejectreason",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"reviewedOn",id:"reviewedon",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"status",id:"status",level:3},{value:"Defined in",id:"defined-in-5",level:4}],d={toc:c};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / ItemLifecycle"),(0,a.kt)("h1",{id:"interface-itemlifecycle"},"Interface: ItemLifecycle"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".ItemLifecycle"),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"p"},"Partial"),"<",(0,a.kt)("inlineCode",{parentName:"p"},"AddedOn"),">"),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"ItemLifecycle"))),(0,a.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocFile"},(0,a.kt)("inlineCode",{parentName:"a"},"LocFile"))),(0,a.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},(0,a.kt)("inlineCode",{parentName:"a"},"LocMetadataItem"))),(0,a.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocLink"},(0,a.kt)("inlineCode",{parentName:"a"},"LocLink"))))),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"properties"},"Properties"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.ItemLifecycle#acknowledgedbyowneron"},"acknowledgedByOwnerOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.ItemLifecycle#acknowledgedbyverifiedissueron"},"acknowledgedByVerifiedIssuerOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.ItemLifecycle#addedon"},"addedOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.ItemLifecycle#rejectreason"},"rejectReason")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.ItemLifecycle#reviewedon"},"reviewedOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.ItemLifecycle#status"},"status"))),(0,a.kt)("h2",{id:"properties-1"},"Properties"),(0,a.kt)("h3",{id:"acknowledgedbyowneron"},"acknowledgedByOwnerOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"acknowledgedByOwnerOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L62"},"packages/client/src/LocClient.ts:62")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"acknowledgedbyverifiedissueron"},"acknowledgedByVerifiedIssuerOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"acknowledgedByVerifiedIssuerOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L63"},"packages/client/src/LocClient.ts:63")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"addedon"},"addedOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"addedOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,"Partial.addedOn"),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L50"},"packages/client/src/LocClient.ts:50")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"rejectreason"},"rejectReason"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"rejectReason"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L65"},"packages/client/src/LocClient.ts:65")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"reviewedon"},"reviewedOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"reviewedOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L61"},"packages/client/src/LocClient.ts:61")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"status"},"status"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"status"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#itemstatus"},(0,a.kt)("inlineCode",{parentName:"a"},"ItemStatus"))),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L64"},"packages/client/src/LocClient.ts:64")))}s.isMDXComponent=!0}}]);