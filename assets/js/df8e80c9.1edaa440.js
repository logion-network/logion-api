"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1641],{5318:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=d(n),c=r,k=m["".concat(p,".").concat(c)]||m[c]||s[c]||i;return n?a.createElement(k,o(o({ref:t},u),{},{components:n})):a.createElement(k,o({ref:t},u))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var d=2;d<i;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8043:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var a=n(5773),r=(n(7378),n(5318));const i={},o=void 0,l={unversionedId:"api/modules/Node_API.Currency",id:"api/modules/Node_API.Currency",title:"Node_API.Currency",description:"API / Modules / Node API / Currency",source:"@site/docs/api/modules/Node_API.Currency.md",sourceDirName:"api/modules",slug:"/api/modules/Node_API.Currency",permalink:"/logion-api/docs/api/modules/Node_API.Currency",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/modules/Node_API.Currency.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Extension",permalink:"/logion-api/docs/api/modules/Extension"},next:{title:"Node_API.Numbers",permalink:"/logion-api/docs/api/modules/Node_API.Numbers"}},p={},d=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Variables",id:"variables",level:3},{value:"Functions",id:"functions",level:3},{value:"Variables",id:"variables-1",level:2},{value:"LGNT_SMALLEST_UNIT",id:"lgnt_smallest_unit",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"SYMBOL",id:"symbol",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Functions",id:"functions-1",level:2},{value:"nLgnt",id:"nlgnt",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"toCanonicalAmount",id:"tocanonicalamount",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"toPrefixedNumberAmount",id:"toprefixednumberamount",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-4",level:4}],u={toc:d};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API"},"Node API")," / Currency"),(0,r.kt)("h1",{id:"namespace-currency"},"Namespace: Currency"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API"},"Node API"),".Currency"),(0,r.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,r.kt)("h3",{id:"variables"},"Variables"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Currency#lgnt_smallest_unit"},"LGNT","_","SMALLEST","_","UNIT")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Currency#symbol"},"SYMBOL"))),(0,r.kt)("h3",{id:"functions"},"Functions"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Currency#nlgnt"},"nLgnt")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Currency#tocanonicalamount"},"toCanonicalAmount")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Currency#toprefixednumberamount"},"toPrefixedNumberAmount"))),(0,r.kt)("h2",{id:"variables-1"},"Variables"),(0,r.kt)("h3",{id:"lgnt_smallest_unit"},"LGNT","_","SMALLEST","_","UNIT"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"LGNT","_","SMALLEST","_","UNIT"),": ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,r.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))," = ",(0,r.kt)("inlineCode",{parentName:"p"},"Numbers.ATTO")),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Currency.ts#L3"},"packages/node-api/src/Currency.ts:3")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"symbol"},"SYMBOL"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"SYMBOL"),": ",(0,r.kt)("inlineCode",{parentName:"p"},'"LGNT"')),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Currency.ts#L4"},"packages/node-api/src/Currency.ts:4")),(0,r.kt)("h2",{id:"functions-1"},"Functions"),(0,r.kt)("h3",{id:"nlgnt"},"nLgnt"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"nLgnt"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"lgntAmount"),"): ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,r.kt)("inlineCode",{parentName:"a"},"PrefixedNumber"))),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"lgntAmount")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"bigint"))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,r.kt)("inlineCode",{parentName:"a"},"PrefixedNumber"))),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Currency.ts#L14"},"packages/node-api/src/Currency.ts:14")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"tocanonicalamount"},"toCanonicalAmount"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toCanonicalAmount"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"amount"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"bigint")),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"amount")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,r.kt)("inlineCode",{parentName:"a"},"PrefixedNumber")))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"bigint")),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Currency.ts#L6"},"packages/node-api/src/Currency.ts:6")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"toprefixednumberamount"},"toPrefixedNumberAmount"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"toPrefixedNumberAmount"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"canonicalAmount"),"): ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,r.kt)("inlineCode",{parentName:"a"},"PrefixedNumber"))),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"canonicalAmount")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"bigint"))))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,r.kt)("inlineCode",{parentName:"a"},"PrefixedNumber"))),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/Currency.ts#L10"},"packages/node-api/src/Currency.ts:10")))}s.isMDXComponent=!0}}]);