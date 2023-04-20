"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6945],{5318:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>u});var i=r(7378);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,n=function(e,t){if(null==e)return{};var r,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=i.createContext({}),p=function(e){var t=i.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},l=function(e){var t=p(e.components);return i.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,d=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),f=p(r),u=n,m=f["".concat(d,".").concat(u)]||f[u]||c[u]||a;return r?i.createElement(m,o(o({ref:t},l),{},{components:r})):i.createElement(m,o({ref:t},l))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,o=new Array(a);o[0]=f;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var p=2;p<a;p++)o[p]=r[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}f.displayName="MDXCreateElement"},4354:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var i=r(5773),n=(r(7378),r(5318));const a={},o=void 0,s={unversionedId:"api/interfaces/Node_API.VerifiedIssuer",id:"api/interfaces/Node_API.VerifiedIssuer",title:"Node_API.VerifiedIssuer",description:"API / Modules / Node API / VerifiedIssuer",source:"@site/docs/api/interfaces/Node_API.VerifiedIssuer.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Node_API.VerifiedIssuer",permalink:"/logion-api/docs/api/interfaces/Node_API.VerifiedIssuer",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Node_API.VerifiedIssuer.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Node_API.VaultTransferApprovalParameters",permalink:"/logion-api/docs/api/interfaces/Node_API.VaultTransferApprovalParameters"},next:{title:"Node_API.VoidInfo",permalink:"/logion-api/docs/api/interfaces/Node_API.VoidInfo"}},d={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"address",id:"address",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"identityLocId",id:"identitylocid",level:3},{value:"Defined in",id:"defined-in-1",level:4}],l={toc:p};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,i.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API"},"Node API")," / VerifiedIssuer"),(0,n.kt)("h1",{id:"interface-verifiedissuer"},"Interface: VerifiedIssuer"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API"},"Node API"),".VerifiedIssuer"),(0,n.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Node_API.VerifiedIssuer#address"},"address")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Node_API.VerifiedIssuer#identitylocid"},"identityLocId"))),(0,n.kt)("h2",{id:"properties-1"},"Properties"),(0,n.kt)("h3",{id:"address"},"address"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"address"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/VerifiedIssuers.ts#L7"},"packages/node-api/src/VerifiedIssuers.ts:7")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"identitylocid"},"identityLocId"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"identityLocId"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.UUID"},(0,n.kt)("inlineCode",{parentName:"a"},"UUID"))),(0,n.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/VerifiedIssuers.ts#L8"},"packages/node-api/src/VerifiedIssuers.ts:8")))}c.isMDXComponent=!0}}]);