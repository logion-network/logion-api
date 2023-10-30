"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[859],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>c});var a=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),h=p(n),c=i,m=h["".concat(s,".").concat(c)]||h[c]||k[c]||l;return n?a.createElement(m,r(r({ref:t},d),{},{components:n})):a.createElement(m,r({ref:t},d))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=h;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var p=2;p<l;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1415:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>k,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(5773),i=(n(7378),n(5318));const l={},r=void 0,o={unversionedId:"api/classes/Client.HashOrContent",id:"api/classes/Client.HashOrContent",title:"Client.HashOrContent",description:"API / Modules / Client / HashOrContent",source:"@site/docs/api/classes/Client.HashOrContent.md",sourceDirName:"api/classes",slug:"/api/classes/Client.HashOrContent",permalink:"/logion-api/docs/api/classes/Client.HashOrContent",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/classes/Client.HashOrContent.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.EditableRequest",permalink:"/logion-api/docs/api/classes/Client.EditableRequest"},next:{title:"Client.HashString",permalink:"/logion-api/docs/api/classes/Client.HashString"}},s={},p=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Properties",id:"properties",level:3},{value:"Accessors",id:"accessors",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties-1",level:2},{value:"_content",id:"_content",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"_hash",id:"_hash",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"_size",id:"_size",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"finalized",id:"finalized",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"Accessors",id:"accessors-1",level:2},{value:"content",id:"content",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"contentHash",id:"contenthash",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"hasContent",id:"hascontent",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"size",id:"size",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"Methods",id:"methods-1",level:2},{value:"data",id:"data",level:3},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"ensureFinalized",id:"ensurefinalized",level:3},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"finalize",id:"finalize",level:3},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"hashContent",id:"hashcontent",level:3},{value:"Returns",id:"returns-8",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"fromContent",id:"fromcontent",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-9",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"fromContentFinalized",id:"fromcontentfinalized",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-10",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"fromHash",id:"fromhash",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-11",level:4},{value:"Defined in",id:"defined-in-15",level:4},{value:"fromHashAndSize",id:"fromhashandsize",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-12",level:4},{value:"Defined in",id:"defined-in-16",level:4}],d={toc:p};function k(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / HashOrContent"),(0,i.kt)("h1",{id:"class-hashorcontent"},"Class: HashOrContent"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".HashOrContent"),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"constructors"},"Constructors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#constructor"},"constructor"))),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#_content"},"_","content")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#_hash"},"_","hash")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#_size"},"_","size")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#finalized"},"finalized"))),(0,i.kt)("h3",{id:"accessors"},"Accessors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#content"},"content")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#contenthash"},"contentHash")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#hascontent"},"hasContent")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#size"},"size"))),(0,i.kt)("h3",{id:"methods"},"Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#data"},"data")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#ensurefinalized"},"ensureFinalized")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#finalize"},"finalize")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#hashcontent"},"hashContent")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#fromcontent"},"fromContent")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#fromcontentfinalized"},"fromContentFinalized")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#fromhash"},"fromHash")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.HashOrContent#fromhashandsize"},"fromHashAndSize"))),(0,i.kt)("h2",{id:"constructors-1"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new HashOrContent"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"parameters"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"parameters")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Object"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"parameters.content?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/modules/Client#filelike"},(0,i.kt)("inlineCode",{parentName:"a"},"FileLike")))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"parameters.hash?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Hash"))))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L74"},"packages/client/src/Hash.ts:74")),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"_content"},"_","content"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"_","content"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#filelike"},(0,i.kt)("inlineCode",{parentName:"a"},"FileLike"))),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L85"},"packages/client/src/Hash.ts:85")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"_hash"},"_","hash"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"_","hash"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Hash")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L83"},"packages/client/src/Hash.ts:83")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"_size"},"_","size"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"_","size"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"bigint")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L89"},"packages/client/src/Hash.ts:89")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"finalized"},"finalized"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Private")," ",(0,i.kt)("strong",{parentName:"p"},"finalized"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L87"},"packages/client/src/Hash.ts:87")),(0,i.kt)("h2",{id:"accessors-1"},"Accessors"),(0,i.kt)("h3",{id:"content"},"content"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"content"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"File")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Blob")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Buffer")),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"File")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Blob")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"p"},"Buffer")),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L139"},"packages/client/src/Hash.ts:139")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"contenthash"},"contentHash"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"contentHash"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Hash")),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Hash")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L95"},"packages/client/src/Hash.ts:95")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"hascontent"},"hasContent"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"hasContent"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L91"},"packages/client/src/Hash.ts:91")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"size"},"size"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," ",(0,i.kt)("strong",{parentName:"p"},"size"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"bigint")),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"bigint")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L147"},"packages/client/src/Hash.ts:147")),(0,i.kt)("h2",{id:"methods-1"},"Methods"),(0,i.kt)("h3",{id:"data"},"data"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"data"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#uploadabledata"},(0,i.kt)("inlineCode",{parentName:"a"},"UploadableData")),">"),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#uploadabledata"},(0,i.kt)("inlineCode",{parentName:"a"},"UploadableData")),">"),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L151"},"packages/client/src/Hash.ts:151")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"ensurefinalized"},"ensureFinalized"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"ensureFinalized"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L100"},"packages/client/src/Hash.ts:100")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"finalize"},"finalize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"finalize"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"returns-7"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L106"},"packages/client/src/Hash.ts:106")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"hashcontent"},"hashContent"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"hashContent"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.HashAndSize"},(0,i.kt)("inlineCode",{parentName:"a"},"HashAndSize")),">"),(0,i.kt)("h4",{id:"returns-8"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.HashAndSize"},(0,i.kt)("inlineCode",{parentName:"a"},"HashAndSize")),">"),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L123"},"packages/client/src/Hash.ts:123")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromcontent"},"fromContent"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromContent"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"content"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"content")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/modules/Client#filelike"},(0,i.kt)("inlineCode",{parentName:"a"},"FileLike")))))),(0,i.kt)("h4",{id:"returns-9"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L64"},"packages/client/src/Hash.ts:64")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromcontentfinalized"},"fromContentFinalized"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromContentFinalized"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"fileContent"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent")),">"),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"fileContent")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/logion-api/docs/api/modules/Client#filelike"},(0,i.kt)("inlineCode",{parentName:"a"},"FileLike")))))),(0,i.kt)("h4",{id:"returns-10"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent")),">"),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L68"},"packages/client/src/Hash.ts:68")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromhash"},"fromHash"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromHash"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"hash"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"parameters-3"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"hash")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Hash"))))),(0,i.kt)("h4",{id:"returns-11"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L60"},"packages/client/src/Hash.ts:60")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"fromhashandsize"},"fromHashAndSize"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"fromHashAndSize"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"hash"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"size"),"): ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"parameters-4"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"hash")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Hash"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"size")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"bigint"))))),(0,i.kt)("h4",{id:"returns-12"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.HashOrContent"},(0,i.kt)("inlineCode",{parentName:"a"},"HashOrContent"))),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Hash.ts#L54"},"packages/client/src/Hash.ts:54")))}k.isMDXComponent=!0}}]);