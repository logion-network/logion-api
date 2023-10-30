"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9767],{5318:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>k});var i=a(7378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},l=Object.keys(e);for(i=0;i<l.length;i++)a=l[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)a=l[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var o=i.createContext({}),p=function(e){var t=i.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},d=function(e){var t=p(e.components);return i.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(a),k=n,m=u["".concat(o,".").concat(k)]||u[k]||c[k]||l;return a?i.createElement(m,r(r({ref:t},d),{},{components:a})):i.createElement(m,r({ref:t},d))}));function k(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,r=new Array(l);r[0]=u;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:n,r[1]=s;for(var p=2;p<l;p++)r[p]=a[p];return i.createElement.apply(null,r)}return i.createElement.apply(null,a)}u.displayName="MDXCreateElement"},4721:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>c,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var i=a(5773),n=(a(7378),a(5318));const l={},r=void 0,s={unversionedId:"api/classes/Client.ReSubmittableRequest",id:"api/classes/Client.ReSubmittableRequest",title:"Client.ReSubmittableRequest",description:"API / Modules / Client / ReSubmittableRequest",source:"@site/docs/api/classes/Client.ReSubmittableRequest.md",sourceDirName:"api/classes",slug:"/api/classes/Client.ReSubmittableRequest",permalink:"/logion-api/docs/api/classes/Client.ReSubmittableRequest",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/classes/Client.ReSubmittableRequest.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.PublicLocClient",permalink:"/logion-api/docs/api/classes/Client.PublicLocClient"},next:{title:"Client.ReadOnlyLocState",permalink:"/logion-api/docs/api/classes/Client.ReadOnlyLocState"}},o={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Properties",id:"properties",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties-1",level:2},{value:"addressToRecover",id:"addresstorecover",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"createdOn",id:"createdon",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"decision",id:"decision",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"id",id:"id",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"isRecovery",id:"isrecovery",level:3},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"legalOfficerAddress",id:"legalofficeraddress",level:3},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"loRecoveryClient",id:"lorecoveryclient",level:3},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"otherLegalOfficerAddress",id:"otherlegalofficeraddress",level:3},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"requesterAddress",id:"requesteraddress",level:3},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"status",id:"status",level:3},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"userIdentity",id:"useridentity",level:3},{value:"Inherited from",id:"inherited-from-11",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"userPostalAddress",id:"userpostaladdress",level:3},{value:"Inherited from",id:"inherited-from-12",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"Methods",id:"methods-1",level:2},{value:"cancel",id:"cancel",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-13",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"resubmit",id:"resubmit",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-14",level:4}],d={toc:p};function c(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,i.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / ReSubmittableRequest"),(0,n.kt)("h1",{id:"class-resubmittablerequest"},"Class: ReSubmittableRequest"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".ReSubmittableRequest"),(0,n.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},(0,n.kt)("inlineCode",{parentName:"a"},"CancellableRequest"))),(0,n.kt)("p",{parentName:"li"},"\u21b3 ",(0,n.kt)("strong",{parentName:"p"},(0,n.kt)("inlineCode",{parentName:"strong"},"ReSubmittableRequest"))))),(0,n.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,n.kt)("h3",{id:"constructors"},"Constructors"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#constructor"},"constructor"))),(0,n.kt)("h3",{id:"properties"},"Properties"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#addresstorecover"},"addressToRecover")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#createdon"},"createdOn")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#decision"},"decision")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#id"},"id")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#isrecovery"},"isRecovery")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#legalofficeraddress"},"legalOfficerAddress")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#lorecoveryclient"},"loRecoveryClient")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#otherlegalofficeraddress"},"otherLegalOfficerAddress")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#requesteraddress"},"requesterAddress")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#status"},"status")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#useridentity"},"userIdentity")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#userpostaladdress"},"userPostalAddress"))),(0,n.kt)("h3",{id:"methods"},"Methods"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#cancel"},"cancel")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest#resubmit"},"resubmit"))),(0,n.kt)("h2",{id:"constructors-1"},"Constructors"),(0,n.kt)("h3",{id:"constructor"},"constructor"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("strong",{parentName:"p"},"new ReSubmittableRequest"),"(",(0,n.kt)("inlineCode",{parentName:"p"},"protectionRequest"),", ",(0,n.kt)("inlineCode",{parentName:"p"},"loRecoveryClient"),"): ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest"},(0,n.kt)("inlineCode",{parentName:"a"},"ReSubmittableRequest"))),(0,n.kt)("h4",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,n.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"protectionRequest")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/logion-api/docs/api/interfaces/Client.ProtectionRequest"},(0,n.kt)("inlineCode",{parentName:"a"},"ProtectionRequest")))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("inlineCode",{parentName:"td"},"loRecoveryClient")),(0,n.kt)("td",{parentName:"tr",align:"left"},(0,n.kt)("a",{parentName:"td",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient"},(0,n.kt)("inlineCode",{parentName:"a"},"LoRecoveryClient")))))),(0,n.kt)("h4",{id:"returns"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.ReSubmittableRequest"},(0,n.kt)("inlineCode",{parentName:"a"},"ReSubmittableRequest"))),(0,n.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#constructor"},"constructor")),(0,n.kt)("h4",{id:"defined-in"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L420"},"packages/client/src/Recovery.ts:420")),(0,n.kt)("h2",{id:"properties-1"},"Properties"),(0,n.kt)("h3",{id:"addresstorecover"},"addressToRecover"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"addressToRecover"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#addresstorecover"},"addressToRecover")),(0,n.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L442"},"packages/client/src/Recovery.ts:442")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"createdon"},"createdOn"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"createdOn"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#createdon"},"createdOn")),(0,n.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L440"},"packages/client/src/Recovery.ts:440")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"decision"},"decision"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"decision"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficerDecision"},(0,n.kt)("inlineCode",{parentName:"a"},"LegalOfficerDecision"))),(0,n.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#decision"},"decision")),(0,n.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L437"},"packages/client/src/Recovery.ts:437")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"id"},"id"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"id"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#id"},"id")),(0,n.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L435"},"packages/client/src/Recovery.ts:435")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"isrecovery"},"isRecovery"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"isRecovery"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"boolean")),(0,n.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#isrecovery"},"isRecovery")),(0,n.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L441"},"packages/client/src/Recovery.ts:441")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"legalofficeraddress"},"legalOfficerAddress"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"legalOfficerAddress"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#legalofficeraddress"},"legalOfficerAddress")),(0,n.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L444"},"packages/client/src/Recovery.ts:444")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"lorecoveryclient"},"loRecoveryClient"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"loRecoveryClient"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.LoRecoveryClient"},(0,n.kt)("inlineCode",{parentName:"a"},"LoRecoveryClient"))),(0,n.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#lorecoveryclient"},"loRecoveryClient")),(0,n.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L447"},"packages/client/src/Recovery.ts:447")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"otherlegalofficeraddress"},"otherLegalOfficerAddress"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"otherLegalOfficerAddress"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#otherlegalofficeraddress"},"otherLegalOfficerAddress")),(0,n.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L445"},"packages/client/src/Recovery.ts:445")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"requesteraddress"},"requesterAddress"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"requesterAddress"),": ",(0,n.kt)("inlineCode",{parentName:"p"},"string")),(0,n.kt)("h4",{id:"inherited-from-9"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#requesteraddress"},"requesterAddress")),(0,n.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L436"},"packages/client/src/Recovery.ts:436")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"status"},"status"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"status"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#protectionrequeststatus"},(0,n.kt)("inlineCode",{parentName:"a"},"ProtectionRequestStatus"))),(0,n.kt)("h4",{id:"inherited-from-10"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#status"},"status")),(0,n.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L443"},"packages/client/src/Recovery.ts:443")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"useridentity"},"userIdentity"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"userIdentity"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.UserIdentity"},(0,n.kt)("inlineCode",{parentName:"a"},"UserIdentity"))),(0,n.kt)("h4",{id:"inherited-from-11"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#useridentity"},"userIdentity")),(0,n.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L438"},"packages/client/src/Recovery.ts:438")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"userpostaladdress"},"userPostalAddress"),(0,n.kt)("p",null,"\u2022 ",(0,n.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,n.kt)("strong",{parentName:"p"},"userPostalAddress"),": ",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.PostalAddress"},(0,n.kt)("inlineCode",{parentName:"a"},"PostalAddress"))),(0,n.kt)("h4",{id:"inherited-from-12"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#userpostaladdress"},"userPostalAddress")),(0,n.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L439"},"packages/client/src/Recovery.ts:439")),(0,n.kt)("h2",{id:"methods-1"},"Methods"),(0,n.kt)("h3",{id:"cancel"},"cancel"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"cancel"),"(): ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,n.kt)("h4",{id:"returns-1"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,n.kt)("h4",{id:"inherited-from-13"},"Inherited from"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest"},"CancellableRequest"),".",(0,n.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.CancellableRequest#cancel"},"cancel")),(0,n.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L452"},"packages/client/src/Recovery.ts:452")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"resubmit"},"resubmit"),(0,n.kt)("p",null,"\u25b8 ",(0,n.kt)("strong",{parentName:"p"},"resubmit"),"(): ",(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,n.kt)("h4",{id:"returns-2"},"Returns"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,n.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,n.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/Recovery.ts#L471"},"packages/client/src/Recovery.ts:471")))}c.isMDXComponent=!0}}]);