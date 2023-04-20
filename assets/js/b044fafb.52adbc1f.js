"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[541],{5318:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var a=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=d(n),k=i,N=u["".concat(p,".").concat(k)]||u[k]||m[k]||r;return n?a.createElement(N,l(l({ref:t},s),{},{components:n})):a.createElement(N,l({ref:t},s))}));function k(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var d=2;d<r;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4844:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var a=n(5773),i=(n(7378),n(5318));const r={},l=void 0,o={unversionedId:"api/modules/Node_API.Numbers",id:"api/modules/Node_API.Numbers",title:"Node_API.Numbers",description:"API / Modules / Node API / Numbers",source:"@site/docs/api/modules/Node_API.Numbers.md",sourceDirName:"api/modules",slug:"/api/modules/Node_API.Numbers",permalink:"/logion-api/docs/api/modules/Node_API.Numbers",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/modules/Node_API.Numbers.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Node_API.Currency",permalink:"/logion-api/docs/api/modules/Node_API.Currency"},next:{title:"Node_API",permalink:"/logion-api/docs/api/modules/Node_API"}},p={},d=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Classes",id:"classes",level:3},{value:"Interfaces",id:"interfaces",level:3},{value:"Variables",id:"variables",level:3},{value:"Functions",id:"functions",level:3},{value:"Variables",id:"variables-1",level:2},{value:"ATTO",id:"atto",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"EXA",id:"exa",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"FEMTO",id:"femto",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"GIGA",id:"giga",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"KILO",id:"kilo",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"MEGA",id:"mega",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"MICRO",id:"micro",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"MILLI",id:"milli",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"NANO",id:"nano",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"NONE",id:"none",level:3},{value:"Defined in",id:"defined-in-9",level:4},{value:"PETA",id:"peta",level:3},{value:"Defined in",id:"defined-in-10",level:4},{value:"PICO",id:"pico",level:3},{value:"Defined in",id:"defined-in-11",level:4},{value:"TERA",id:"tera",level:3},{value:"Defined in",id:"defined-in-12",level:4},{value:"Functions",id:"functions-1",level:2},{value:"amount",id:"amount",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"balance",id:"balance",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"convertToPrefixed",id:"converttoprefixed",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-15",level:4}],s={toc:d};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API"},"Node API")," / Numbers"),(0,i.kt)("h1",{id:"namespace-numbers"},"Namespace: Numbers"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Node_API"},"Node API"),".Numbers"),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"classes"},"Classes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Node_API.Numbers.NormalizedNumber"},"NormalizedNumber")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},"PrefixedNumber")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Node_API.Numbers.ScientificNumber"},"ScientificNumber"))),(0,i.kt)("h3",{id:"interfaces"},"Interfaces"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},"UnitPrefix"))),(0,i.kt)("h3",{id:"variables"},"Variables"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#atto"},"ATTO")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#exa"},"EXA")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#femto"},"FEMTO")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#giga"},"GIGA")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#kilo"},"KILO")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#mega"},"MEGA")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#micro"},"MICRO")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#milli"},"MILLI")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#nano"},"NANO")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#none"},"NONE")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#peta"},"PETA")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#pico"},"PICO")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#tera"},"TERA"))),(0,i.kt)("h3",{id:"functions"},"Functions"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#amount"},"amount")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#balance"},"balance")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/modules/Node_API.Numbers#converttoprefixed"},"convertToPrefixed"))),(0,i.kt)("h2",{id:"variables-1"},"Variables"),(0,i.kt)("h3",{id:"atto"},"ATTO"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"ATTO"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L387"},"packages/node-api/src/numbers.ts:387")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"exa"},"EXA"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"EXA"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L332"},"packages/node-api/src/numbers.ts:332")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"femto"},"FEMTO"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"FEMTO"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L382"},"packages/node-api/src/numbers.ts:382")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"giga"},"GIGA"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"GIGA"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L347"},"packages/node-api/src/numbers.ts:347")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"kilo"},"KILO"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"KILO"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L357"},"packages/node-api/src/numbers.ts:357")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"mega"},"MEGA"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"MEGA"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L352"},"packages/node-api/src/numbers.ts:352")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"micro"},"MICRO"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"MICRO"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L367"},"packages/node-api/src/numbers.ts:367")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"milli"},"MILLI"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"MILLI"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L362"},"packages/node-api/src/numbers.ts:362")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"nano"},"NANO"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"NANO"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L372"},"packages/node-api/src/numbers.ts:372")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"none"},"NONE"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"NONE"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L269"},"packages/node-api/src/numbers.ts:269")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"peta"},"PETA"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"PETA"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L337"},"packages/node-api/src/numbers.ts:337")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"pico"},"PICO"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"PICO"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L377"},"packages/node-api/src/numbers.ts:377")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tera"},"TERA"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,i.kt)("strong",{parentName:"p"},"TERA"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.Numbers.UnitPrefix"},(0,i.kt)("inlineCode",{parentName:"a"},"UnitPrefix"))),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L342"},"packages/node-api/src/numbers.ts:342")),(0,i.kt)("h2",{id:"functions-1"},"Functions"),(0,i.kt)("h3",{id:"amount"},"amount"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"amount"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"balance"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"decimals"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Deprecated"))),(0,i.kt)("p",null,"Consider using optimizeScale or convertTo in Numbers.ScientificNumber or Numbers.PrefixedNumber.\nSee also toCanonicalAmount and toPrefixedNumber in Currency namespace."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"balance")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"decimals")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L7"},"packages/node-api/src/numbers.ts:7")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"balance"},"balance"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"balance"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"amount"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"decimals"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Deprecated"))),(0,i.kt)("p",null,"Consider using optimizeScale or convertTo in Numbers.ScientificNumber or Numbers.PrefixedNumber.\nSee also toCanonicalAmount and toPrefixedNumber in Currency namespace."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"amount")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"decimals")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L17"},"packages/node-api/src/numbers.ts:17")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"converttoprefixed"},"convertToPrefixed"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"convertToPrefixed"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"num"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,i.kt)("inlineCode",{parentName:"a"},"PrefixedNumber"))),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"num")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Node_API.Numbers.ScientificNumber"},(0,i.kt)("inlineCode",{parentName:"a"},"ScientificNumber")))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Node_API.Numbers.PrefixedNumber"},(0,i.kt)("inlineCode",{parentName:"a"},"PrefixedNumber"))),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/node-api/src/numbers.ts#L440"},"packages/node-api/src/numbers.ts:440")))}m.isMDXComponent=!0}}]);