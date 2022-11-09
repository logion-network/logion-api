"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8634],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var i=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=s(n),f=r,k=u["".concat(p,".").concat(f)]||u[f]||c[f]||a;return n?i.createElement(k,o(o({ref:t},d),{},{components:n})):i.createElement(k,o({ref:t},d))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6288:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var i=n(2685),r=(n(7378),n(5318));const a={},o=void 0,l={unversionedId:"api/interfaces/Client.CreateLocRequest",id:"api/interfaces/Client.CreateLocRequest",title:"Client.CreateLocRequest",description:"API / Modules / Client / CreateLocRequest",source:"@site/docs/api/interfaces/Client.CreateLocRequest.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.CreateLocRequest",permalink:"/logion-api/docs/api/interfaces/Client.CreateLocRequest",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.CreateLocRequest.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.ComponentFactory",permalink:"/logion-api/docs/api/interfaces/Client.ComponentFactory"},next:{title:"Client.CreateLocRequestParams",permalink:"/logion-api/docs/api/interfaces/Client.CreateLocRequestParams"}},p={},s=[{value:"Properties",id:"properties",level:2},{value:"company",id:"company",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"description",id:"description",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"draft",id:"draft",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"locType",id:"loctype",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"ownerAddress",id:"owneraddress",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"requesterAddress",id:"requesteraddress",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"userIdentity",id:"useridentity",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"userPostalAddress",id:"userpostaladdress",level:3},{value:"Defined in",id:"defined-in-7",level:4}],d={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / CreateLocRequest"),(0,r.kt)("h1",{id:"interface-createlocrequest"},"Interface: CreateLocRequest"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".CreateLocRequest"),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"company"},"company"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,r.kt)("strong",{parentName:"p"},"company"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L202"},"packages/client/src/LocClient.ts:202")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"description"},"description"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"description"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L198"},"packages/client/src/LocClient.ts:198")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"draft"},"draft"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"draft"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L203"},"packages/client/src/LocClient.ts:203")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"loctype"},"locType"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"locType"),": ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API#loctype"},(0,r.kt)("inlineCode",{parentName:"a"},"LocType"))),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L199"},"packages/client/src/LocClient.ts:199")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"owneraddress"},"ownerAddress"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"ownerAddress"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L196"},"packages/client/src/LocClient.ts:196")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"requesteraddress"},"requesterAddress"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("strong",{parentName:"p"},"requesterAddress"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L197"},"packages/client/src/LocClient.ts:197")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"useridentity"},"userIdentity"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,r.kt)("strong",{parentName:"p"},"userIdentity"),": ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.UserIdentity"},(0,r.kt)("inlineCode",{parentName:"a"},"UserIdentity"))),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L200"},"packages/client/src/LocClient.ts:200")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"userpostaladdress"},"userPostalAddress"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,r.kt)("strong",{parentName:"p"},"userPostalAddress"),": ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.PostalAddress"},(0,r.kt)("inlineCode",{parentName:"a"},"PostalAddress"))),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/4ebd4fd/packages/client/src/LocClient.ts#L201"},"packages/client/src/LocClient.ts:201")))}c.isMDXComponent=!0}}]);