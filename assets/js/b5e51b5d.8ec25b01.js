"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[514],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var i=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=i.createContext({}),s=function(e){var t=i.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=s(e.components);return i.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},k=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),k=s(n),u=a,f=k["".concat(p,".").concat(u)]||k[u]||c[u]||l;return n?i.createElement(f,o(o({ref:t},d),{},{components:n})):i.createElement(f,o({ref:t},d))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=k;var r={};for(var p in t)hasOwnProperty.call(t,p)&&(r[p]=t[p]);r.originalType=e,r.mdxType="string"==typeof e?e:a,o[1]=r;for(var s=2;s<l;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}k.displayName="MDXCreateElement"},9273:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>r,toc:()=>s});var i=n(5773),a=(n(7378),n(5318));const l={},o=void 0,r={unversionedId:"api/interfaces/Client.LocRequest",id:"api/interfaces/Client.LocRequest",title:"Client.LocRequest",description:"API / Modules / Client / LocRequest",source:"@site/docs/api/interfaces/Client.LocRequest.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.LocRequest",permalink:"/logion-api/docs/api/interfaces/Client.LocRequest",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.LocRequest.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.LocMetadataItem",permalink:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},next:{title:"Client.LocRequestVoidInfo",permalink:"/logion-api/docs/api/interfaces/Client.LocRequestVoidInfo"}},p={},s=[{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"closedOn",id:"closedon",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"company",id:"company",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"createdOn",id:"createdon",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"decisionOn",id:"decisionon",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"description",id:"description",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"files",id:"files",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"iDenfy",id:"idenfy",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"id",id:"id",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"identityLoc",id:"identityloc",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"legalFee",id:"legalfee",level:3},{value:"Defined in",id:"defined-in-9",level:4},{value:"links",id:"links",level:3},{value:"Defined in",id:"defined-in-10",level:4},{value:"locType",id:"loctype",level:3},{value:"Defined in",id:"defined-in-11",level:4},{value:"metadata",id:"metadata",level:3},{value:"Defined in",id:"defined-in-12",level:4},{value:"ownerAddress",id:"owneraddress",level:3},{value:"Defined in",id:"defined-in-13",level:4},{value:"rejectReason",id:"rejectreason",level:3},{value:"Defined in",id:"defined-in-14",level:4},{value:"requesterAddress",id:"requesteraddress",level:3},{value:"Defined in",id:"defined-in-15",level:4},{value:"requesterIdentityLoc",id:"requesteridentityloc",level:3},{value:"Defined in",id:"defined-in-16",level:4},{value:"seal",id:"seal",level:3},{value:"Defined in",id:"defined-in-17",level:4},{value:"selectedIssuers",id:"selectedissuers",level:3},{value:"Defined in",id:"defined-in-18",level:4},{value:"sponsorshipId",id:"sponsorshipid",level:3},{value:"Defined in",id:"defined-in-19",level:4},{value:"status",id:"status",level:3},{value:"Defined in",id:"defined-in-20",level:4},{value:"template",id:"template",level:3},{value:"Defined in",id:"defined-in-21",level:4},{value:"userIdentity",id:"useridentity",level:3},{value:"Defined in",id:"defined-in-22",level:4},{value:"userPostalAddress",id:"userpostaladdress",level:3},{value:"Defined in",id:"defined-in-23",level:4},{value:"valueFee",id:"valuefee",level:3},{value:"Defined in",id:"defined-in-24",level:4},{value:"voidInfo",id:"voidinfo",level:3},{value:"Defined in",id:"defined-in-25",level:4},{value:"voteId",id:"voteid",level:3},{value:"Defined in",id:"defined-in-26",level:4}],d={toc:s};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / LocRequest"),(0,a.kt)("h1",{id:"interface-locrequest"},"Interface: LocRequest"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".LocRequest"),(0,a.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,a.kt)("h3",{id:"properties"},"Properties"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#closedon"},"closedOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#company"},"company")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#createdon"},"createdOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#decisionon"},"decisionOn")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#description"},"description")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#files"},"files")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#idenfy"},"iDenfy")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#id"},"id")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#identityloc"},"identityLoc")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#legalfee"},"legalFee")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#links"},"links")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#loctype"},"locType")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#metadata"},"metadata")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#owneraddress"},"ownerAddress")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#rejectreason"},"rejectReason")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#requesteraddress"},"requesterAddress")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#requesteridentityloc"},"requesterIdentityLoc")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#seal"},"seal")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#selectedissuers"},"selectedIssuers")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#sponsorshipid"},"sponsorshipId")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#status"},"status")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#template"},"template")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#useridentity"},"userIdentity")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#userpostaladdress"},"userPostalAddress")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#valuefee"},"valueFee")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#voidinfo"},"voidInfo")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.LocRequest#voteid"},"voteId"))),(0,a.kt)("h2",{id:"properties-1"},"Properties"),(0,a.kt)("h3",{id:"closedon"},"closedOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"closedOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L140"},"packages/client/src/LocClient.ts:140")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"company"},"company"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"company"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L146"},"packages/client/src/LocClient.ts:146")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"createdon"},"createdOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"createdOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L132"},"packages/client/src/LocClient.ts:132")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"decisionon"},"decisionOn"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"decisionOn"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L133"},"packages/client/src/LocClient.ts:133")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"description"},"description"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"description"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L130"},"packages/client/src/LocClient.ts:130")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"files"},"files"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"files"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocFile"},(0,a.kt)("inlineCode",{parentName:"a"},"LocFile")),"[]"),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L141"},"packages/client/src/LocClient.ts:141")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"idenfy"},"iDenfy"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"iDenfy"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.IdenfyVerificationSession"},(0,a.kt)("inlineCode",{parentName:"a"},"IdenfyVerificationSession"))),(0,a.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L147"},"packages/client/src/LocClient.ts:147")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"id"},"id"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"id"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L134"},"packages/client/src/LocClient.ts:134")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"identityloc"},"identityLoc"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"identityLoc"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L137"},"packages/client/src/LocClient.ts:137")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"legalfee"},"legalFee"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"legalFee"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L153"},"packages/client/src/LocClient.ts:153")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"links"},"links"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"links"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocLink"},(0,a.kt)("inlineCode",{parentName:"a"},"LocLink")),"[]"),(0,a.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L143"},"packages/client/src/LocClient.ts:143")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"loctype"},"locType"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"locType"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"LocType")),(0,a.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L131"},"packages/client/src/LocClient.ts:131")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"metadata"},"metadata"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"metadata"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocMetadataItem"},(0,a.kt)("inlineCode",{parentName:"a"},"LocMetadataItem")),"[]"),(0,a.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L142"},"packages/client/src/LocClient.ts:142")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"owneraddress"},"ownerAddress"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"ownerAddress"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L127"},"packages/client/src/LocClient.ts:127")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"rejectreason"},"rejectReason"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"rejectReason"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L136"},"packages/client/src/LocClient.ts:136")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"requesteraddress"},"requesterAddress"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"requesterAddress"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SupportedAccountId"},(0,a.kt)("inlineCode",{parentName:"a"},"SupportedAccountId"))),(0,a.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L128"},"packages/client/src/LocClient.ts:128")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"requesteridentityloc"},"requesterIdentityLoc"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"requesterIdentityLoc"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L129"},"packages/client/src/LocClient.ts:129")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"seal"},"seal"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"seal"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L145"},"packages/client/src/LocClient.ts:145")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"selectedissuers"},"selectedIssuers"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"selectedIssuers"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.VerifiedIssuerIdentity"},(0,a.kt)("inlineCode",{parentName:"a"},"VerifiedIssuerIdentity")),"[]"),(0,a.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L149"},"packages/client/src/LocClient.ts:149")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"sponsorshipid"},"sponsorshipId"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"sponsorshipId"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L151"},"packages/client/src/LocClient.ts:151")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"status"},"status"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("strong",{parentName:"p"},"status"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client#locrequeststatus"},(0,a.kt)("inlineCode",{parentName:"a"},"LocRequestStatus"))),(0,a.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L135"},"packages/client/src/LocClient.ts:135")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"template"},"template"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"template"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L150"},"packages/client/src/LocClient.ts:150")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"useridentity"},"userIdentity"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"userIdentity"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.UserIdentity"},(0,a.kt)("inlineCode",{parentName:"a"},"UserIdentity"))),(0,a.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L138"},"packages/client/src/LocClient.ts:138")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"userpostaladdress"},"userPostalAddress"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"userPostalAddress"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.PostalAddress"},(0,a.kt)("inlineCode",{parentName:"a"},"PostalAddress"))),(0,a.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L139"},"packages/client/src/LocClient.ts:139")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"valuefee"},"valueFee"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"valueFee"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-24"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L152"},"packages/client/src/LocClient.ts:152")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"voidinfo"},"voidInfo"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"voidInfo"),": ",(0,a.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LocRequestVoidInfo"},(0,a.kt)("inlineCode",{parentName:"a"},"LocRequestVoidInfo"))),(0,a.kt)("h4",{id:"defined-in-25"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L144"},"packages/client/src/LocClient.ts:144")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"voteid"},"voteId"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("strong",{parentName:"p"},"voteId"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("h4",{id:"defined-in-26"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/119532f/packages/client/src/LocClient.ts#L148"},"packages/client/src/LocClient.ts:148")))}c.isMDXComponent=!0}}]);