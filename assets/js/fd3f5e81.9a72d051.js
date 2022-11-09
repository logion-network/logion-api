"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6590],{5318:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(7378);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),f=s(a),u=i,k=f["".concat(p,".").concat(u)]||f[u]||c[u]||r;return a?n.createElement(k,l(l({ref:t},d),{},{components:a})):n.createElement(k,l({ref:t},d))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=f;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<r;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}f.displayName="MDXCreateElement"},5559:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var n=a(2685),i=(a(7378),a(5318));const r={},l=void 0,o={unversionedId:"api/interfaces/Client.VaultSharedState",id:"api/interfaces/Client.VaultSharedState",title:"Client.VaultSharedState",description:"API / Modules / Client / VaultSharedState",source:"@site/docs/api/interfaces/Client.VaultSharedState.md",sourceDirName:"api/interfaces",slug:"/api/interfaces/Client.VaultSharedState",permalink:"/logion-api/docs/api/interfaces/Client.VaultSharedState",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/api/interfaces/Client.VaultSharedState.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Client.UserIdentity",permalink:"/logion-api/docs/api/interfaces/Client.UserIdentity"},next:{title:"Client.VaultTransferRequest",permalink:"/logion-api/docs/api/interfaces/Client.VaultTransferRequest"}},p={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Properties",id:"properties",level:3},{value:"Properties",id:"properties-1",level:2},{value:"acceptedVaultTransferRequests",id:"acceptedvaulttransferrequests",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"allLegalOfficers",id:"alllegalofficers",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"axiosFactory",id:"axiosfactory",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"balances",id:"balances",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"cancelledVaultTransferRequests",id:"cancelledvaulttransferrequests",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"client",id:"client",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"componentFactory",id:"componentfactory",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"config",id:"config",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"currentAddress",id:"currentaddress",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"directoryClient",id:"directoryclient",level:3},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"isRecovery",id:"isrecovery",level:3},{value:"Defined in",id:"defined-in-10",level:4},{value:"legalOfficers",id:"legalofficers",level:3},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"networkState",id:"networkstate",level:3},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"nodeApi",id:"nodeapi",level:3},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"pendingVaultTransferRequests",id:"pendingvaulttransferrequests",level:3},{value:"Defined in",id:"defined-in-14",level:4},{value:"recoveredAddress",id:"recoveredaddress",level:3},{value:"Defined in",id:"defined-in-15",level:4},{value:"rejectedVaultTransferRequests",id:"rejectedvaulttransferrequests",level:3},{value:"Defined in",id:"defined-in-16",level:4},{value:"selectedLegalOfficers",id:"selectedlegalofficers",level:3},{value:"Defined in",id:"defined-in-17",level:4},{value:"tokens",id:"tokens",level:3},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-18",level:4},{value:"transactions",id:"transactions",level:3},{value:"Defined in",id:"defined-in-19",level:4}],d={toc:s};function c(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/"},"API")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules"},"Modules")," / ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client")," / VaultSharedState"),(0,i.kt)("h1",{id:"interface-vaultsharedstate"},"Interface: VaultSharedState"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/modules/Client"},"Client"),".VaultSharedState"),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},(0,i.kt)("inlineCode",{parentName:"a"},"SharedState"))),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"VaultSharedState"))))),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#acceptedvaulttransferrequests"},"acceptedVaultTransferRequests")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#alllegalofficers"},"allLegalOfficers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#axiosfactory"},"axiosFactory")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#balances"},"balances")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#cancelledvaulttransferrequests"},"cancelledVaultTransferRequests")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#client"},"client")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#componentfactory"},"componentFactory")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#config"},"config")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#currentaddress"},"currentAddress")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#directoryclient"},"directoryClient")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#isrecovery"},"isRecovery")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#legalofficers"},"legalOfficers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#networkstate"},"networkState")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#nodeapi"},"nodeApi")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#pendingvaulttransferrequests"},"pendingVaultTransferRequests")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#recoveredaddress"},"recoveredAddress")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#rejectedvaulttransferrequests"},"rejectedVaultTransferRequests")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#selectedlegalofficers"},"selectedLegalOfficers")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#tokens"},"tokens")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/logion-api/docs/api/interfaces/Client.VaultSharedState#transactions"},"transactions"))),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"acceptedvaulttransferrequests"},"acceptedVaultTransferRequests"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"acceptedVaultTransferRequests"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.VaultTransferRequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultTransferRequest")),"[]"),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L27"},"packages/client/src/Vault.ts:27")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"alllegalofficers"},"allLegalOfficers"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"allLegalOfficers"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#alllegalofficers"},"allLegalOfficers")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L30"},"packages/client/src/SharedClient.ts:30")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"axiosfactory"},"axiosFactory"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"axiosFactory"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.AxiosFactory"},(0,i.kt)("inlineCode",{parentName:"a"},"AxiosFactory"))),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#axiosfactory"},"axiosFactory")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L25"},"packages/client/src/SharedClient.ts:25")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"balances"},"balances"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"balances"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Node_API.CoinBalance"},(0,i.kt)("inlineCode",{parentName:"a"},"CoinBalance")),"[]"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L31"},"packages/client/src/Vault.ts:31")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"cancelledvaulttransferrequests"},"cancelledVaultTransferRequests"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"cancelledVaultTransferRequests"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.VaultTransferRequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultTransferRequest")),"[]"),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L25"},"packages/client/src/Vault.ts:25")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"client"},"client"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"client"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.VaultClient"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultClient"))),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L23"},"packages/client/src/Vault.ts:23")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"componentfactory"},"componentFactory"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"componentFactory"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.ComponentFactory"},(0,i.kt)("inlineCode",{parentName:"a"},"ComponentFactory"))),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#componentfactory"},"componentFactory")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L24"},"packages/client/src/SharedClient.ts:24")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"config"},"config"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"config"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LogionClientConfig"},(0,i.kt)("inlineCode",{parentName:"a"},"LogionClientConfig"))),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#config"},"config")),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L23"},"packages/client/src/SharedClient.ts:23")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"currentaddress"},"currentAddress"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"currentAddress"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#currentaddress"},"currentAddress")),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L32"},"packages/client/src/SharedClient.ts:32")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"directoryclient"},"directoryClient"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"directoryClient"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.DirectoryClient"},(0,i.kt)("inlineCode",{parentName:"a"},"DirectoryClient"))),(0,i.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#directoryclient"},"directoryClient")),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L26"},"packages/client/src/SharedClient.ts:26")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"isrecovery"},"isRecovery"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"isRecovery"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L29"},"packages/client/src/Vault.ts:29")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"legalofficers"},"legalOfficers"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"legalOfficers"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#legalofficers"},"legalOfficers")),(0,i.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L29"},"packages/client/src/SharedClient.ts:29")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"networkstate"},"networkState"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"networkState"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.NetworkState"},(0,i.kt)("inlineCode",{parentName:"a"},"NetworkState")),"<",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficerEndpoint"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficerEndpoint")),">"),(0,i.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#networkstate"},"networkState")),(0,i.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L27"},"packages/client/src/SharedClient.ts:27")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"nodeapi"},"nodeApi"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"nodeApi"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ApiPromise")),(0,i.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#nodeapi"},"nodeApi")),(0,i.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L28"},"packages/client/src/SharedClient.ts:28")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"pendingvaulttransferrequests"},"pendingVaultTransferRequests"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"pendingVaultTransferRequests"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.VaultTransferRequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultTransferRequest")),"[]"),(0,i.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L24"},"packages/client/src/Vault.ts:24")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"recoveredaddress"},"recoveredAddress"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"recoveredAddress"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L30"},"packages/client/src/Vault.ts:30")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"rejectedvaulttransferrequests"},"rejectedVaultTransferRequests"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"rejectedVaultTransferRequests"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.VaultTransferRequest"},(0,i.kt)("inlineCode",{parentName:"a"},"VaultTransferRequest")),"[]"),(0,i.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L26"},"packages/client/src/Vault.ts:26")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"selectedlegalofficers"},"selectedLegalOfficers"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"selectedLegalOfficers"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.LegalOfficer"},(0,i.kt)("inlineCode",{parentName:"a"},"LegalOfficer")),"[]"),(0,i.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L28"},"packages/client/src/Vault.ts:28")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"tokens"},"tokens"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"tokens"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/classes/Client.AccountTokens"},(0,i.kt)("inlineCode",{parentName:"a"},"AccountTokens"))),(0,i.kt)("h4",{id:"inherited-from-9"},"Inherited from"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState"},"SharedState"),".",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.SharedState#tokens"},"tokens")),(0,i.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/SharedClient.ts#L31"},"packages/client/src/SharedClient.ts:31")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"transactions"},"transactions"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"transactions"),": ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/api/interfaces/Client.Transaction"},(0,i.kt)("inlineCode",{parentName:"a"},"Transaction")),"[]"),(0,i.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/logion-network/logion-api/blob/main/packages/client/src/Vault.ts#L32"},"packages/client/src/Vault.ts:32")))}c.isMDXComponent=!0}}]);