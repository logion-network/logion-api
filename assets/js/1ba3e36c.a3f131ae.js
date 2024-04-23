"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8808],{7560:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>a,frontMatter:()=>c,metadata:()=>l,toc:()=>o});var r=s(1948),i=s(3460);const c={},t="Class: PendingProtection",l={id:"reference/classes/client.PendingProtection",title:"client.PendingProtection",description:"Reference / Modules / client / PendingProtection",source:"@site/docs/reference/classes/client.PendingProtection.md",sourceDirName:"reference/classes",slug:"/reference/classes/client.PendingProtection",permalink:"/logion-api/docs/reference/classes/client.PendingProtection",draft:!1,unlisted:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/reference/classes/client.PendingProtection.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"client.OpenLoc",permalink:"/logion-api/docs/reference/classes/client.OpenLoc"},next:{title:"client.PendingRecovery",permalink:"/logion-api/docs/reference/classes/client.PendingRecovery"}},d={},o=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Implements",id:"implements",level:2},{value:"Table of contents",id:"table-of-contents",level:2},{value:"Constructors",id:"constructors",level:3},{value:"Properties",id:"properties",level:3},{value:"Accessors",id:"accessors",level:3},{value:"Methods",id:"methods",level:3},{value:"Constructors",id:"constructors-1",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties-1",level:2},{value:"sharedState",id:"sharedstate",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"Accessors",id:"accessors-1",level:2},{value:"discarded",id:"discarded",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"protectionParameters",id:"protectionparameters",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"Methods",id:"methods-1",level:2},{value:"_refresh",id:"_refresh",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"discard",id:"discard",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"discardOnSuccess",id:"discardonsuccess",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"ensureCurrent",id:"ensurecurrent",level:3},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"finalizeOnSuccess",id:"finalizeonsuccess",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"getCurrentState",id:"getcurrentstate",level:3},{value:"Returns",id:"returns-8",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"getCurrentStateOrThrow",id:"getcurrentstateorthrow",level:3},{value:"Returns",id:"returns-9",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"refresh",id:"refresh",level:3},{value:"Returns",id:"returns-10",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"syncDiscardOnSuccess",id:"syncdiscardonsuccess",level:3},{value:"Type parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-11",level:4},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-12",level:4}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/modules",children:"Reference"})," / ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/modules",children:"Modules"})," / ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/modules/client",children:"client"})," / PendingProtection"]}),"\n",(0,r.jsx)(n.h1,{id:"class-pendingprotection",children:"Class: PendingProtection"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/modules/client",children:"client"}),".PendingProtection"]}),"\n",(0,r.jsx)(n.p,{children:'A State instance is a state in the "state machine" sense. It comes\nwith some behavior and state transition methods. A state transition\nmethod returns an instance of the next state given the\nexecuted operation, which discards current object.'}),"\n",(0,r.jsx)(n.p,{children:"This class should be extended by client class. It provides method\nenabling the client class to query if it was already discarded\nor not as well as methods actually discarding the state."}),"\n",(0,r.jsx)(n.h2,{id:"hierarchy",children:"Hierarchy"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})}),"\n",(0,r.jsxs)(n.p,{children:["\u21b3 ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"PendingProtection"})})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"implements",children:"Implements"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/interfaces/client.WithProtectionParameters",children:(0,r.jsx)(n.code,{children:"WithProtectionParameters"})})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"table-of-contents",children:"Table of contents"}),"\n",(0,r.jsx)(n.h3,{id:"constructors",children:"Constructors"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#constructor",children:"constructor"})}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"properties",children:"Properties"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#sharedstate",children:"sharedState"})}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"accessors",children:"Accessors"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#discarded",children:"discarded"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#protectionparameters",children:"protectionParameters"})}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"methods",children:"Methods"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#_refresh",children:"_refresh"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#discard",children:"discard"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#discardonsuccess",children:"discardOnSuccess"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#ensurecurrent",children:"ensureCurrent"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#finalizeonsuccess",children:"finalizeOnSuccess"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#getcurrentstate",children:"getCurrentState"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#getcurrentstateorthrow",children:"getCurrentStateOrThrow"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#refresh",children:"refresh"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection#syncdiscardonsuccess",children:"syncDiscardOnSuccess"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"constructors-1",children:"Constructors"}),"\n",(0,r.jsx)(n.h3,{id:"constructor",children:"constructor"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.strong,{children:"new PendingProtection"}),"(",(0,r.jsx)(n.code,{children:"sharedState"}),"): ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection",children:(0,r.jsx)(n.code,{children:"PendingProtection"})})]}),"\n",(0,r.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"sharedState"})}),(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/interfaces/client.RecoverySharedState",children:(0,r.jsx)(n.code,{children:"RecoverySharedState"})})})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection",children:(0,r.jsx)(n.code,{children:"PendingProtection"})})}),"\n",(0,r.jsx)(n.h4,{id:"overrides",children:"Overrides"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#constructor",children:"constructor"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/Recovery.ts#L409",children:"packages/client/src/Recovery.ts:409"})}),"\n",(0,r.jsx)(n.h2,{id:"properties-1",children:"Properties"}),"\n",(0,r.jsx)(n.h3,{id:"sharedstate",children:"sharedState"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.code,{children:"Private"})," ",(0,r.jsx)(n.code,{children:"Readonly"})," ",(0,r.jsx)(n.strong,{children:"sharedState"}),": ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/interfaces/client.RecoverySharedState",children:(0,r.jsx)(n.code,{children:"RecoverySharedState"})})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/Recovery.ts#L414",children:"packages/client/src/Recovery.ts:414"})}),"\n",(0,r.jsx)(n.h2,{id:"accessors-1",children:"Accessors"}),"\n",(0,r.jsx)(n.h3,{id:"discarded",children:"discarded"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.code,{children:"get"})," ",(0,r.jsx)(n.strong,{children:"discarded"}),"(): ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"boolean"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Description"})})}),"\n",(0,r.jsx)(n.p,{children:"True if this state was discarded"}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,r.jsx)(n.p,{children:"State.discarded"}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L24",children:"packages/client/src/State.ts:24"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"protectionparameters",children:"protectionParameters"}),"\n",(0,r.jsxs)(n.p,{children:["\u2022 ",(0,r.jsx)(n.code,{children:"get"})," ",(0,r.jsx)(n.strong,{children:"protectionParameters"}),"(): ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/interfaces/client.ProtectionParameters",children:(0,r.jsx)(n.code,{children:"ProtectionParameters"})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/interfaces/client.ProtectionParameters",children:(0,r.jsx)(n.code,{children:"ProtectionParameters"})})}),"\n",(0,r.jsx)(n.h4,{id:"implementation-of",children:"Implementation of"}),"\n",(0,r.jsx)(n.p,{children:"WithProtectionParameters.protectionParameters"}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/Recovery.ts#L434",children:"packages/client/src/Recovery.ts:434"})}),"\n",(0,r.jsx)(n.h2,{id:"methods-1",children:"Methods"}),"\n",(0,r.jsx)(n.h3,{id:"_refresh",children:"_refresh"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"_refresh"}),"(): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection",children:(0,r.jsx)(n.code,{children:"PendingProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.AcceptedProtection",children:(0,r.jsx)(n.code,{children:"AcceptedProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.RejectedRecovery",children:(0,r.jsx)(n.code,{children:"RejectedRecovery"})}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection",children:(0,r.jsx)(n.code,{children:"PendingProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.AcceptedProtection",children:(0,r.jsx)(n.code,{children:"AcceptedProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.RejectedRecovery",children:(0,r.jsx)(n.code,{children:"RejectedRecovery"})}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/Recovery.ts#L420",children:"packages/client/src/Recovery.ts:420"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"discard",children:"discard"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"discard"}),"(",(0,r.jsx)(n.code,{children:"next"}),"): ",(0,r.jsx)(n.code,{children:"void"})]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"next"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,r.jsx)(n.code,{children:"undefined"})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"void"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Description"})})}),"\n",(0,r.jsxs)(n.p,{children:["Discards current state. One must discard the state only\nif the state transition was successfully executed. It may be safer to\nuse ",(0,r.jsx)(n.code,{children:"discardOnSuccess"}),"."]}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#discard",children:"discard"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L43",children:"packages/client/src/State.ts:43"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"discardonsuccess",children:"discardOnSuccess"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"discardOnSuccess"}),"<",(0,r.jsx)(n.code,{children:"T"}),", ",(0,r.jsx)(n.code,{children:"U"}),">(",(0,r.jsx)(n.code,{children:"action"}),"): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"U"}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"T"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"U"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})," = ",(0,r.jsx)(n.code,{children:"T"})]})]})]})]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"action"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,r.jsx)(n.code,{children:"current"}),": ",(0,r.jsx)(n.code,{children:"T"}),") => ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"U"}),">"]}),(0,r.jsx)(n.td,{style:{textAlign:"left"},children:"The state transition logic producing next state"})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"U"}),">"]}),"\n",(0,r.jsx)(n.p,{children:"Next state if state transition logic execution did not throw"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Descripiton"})})}),"\n",(0,r.jsx)(n.p,{children:"Discards current state only if given state transition logic\nexecuted successfully (i.e. without throwing an error)."}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#discardonsuccess",children:"discardOnSuccess"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L55",children:"packages/client/src/State.ts:55"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"ensurecurrent",children:"ensureCurrent"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"ensureCurrent"}),"(): ",(0,r.jsx)(n.code,{children:"void"})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"void"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Description"})})}),"\n",(0,r.jsx)(n.p,{children:"Throws an error if this state was discarded.\nThis should be called by all public methods of client class."}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#ensurecurrent",children:"ensureCurrent"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L32",children:"packages/client/src/State.ts:32"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"finalizeonsuccess",children:"finalizeOnSuccess"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"finalizeOnSuccess"}),"<",(0,r.jsx)(n.code,{children:"T"}),">(",(0,r.jsx)(n.code,{children:"action"}),"): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"T"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"action"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,r.jsx)(n.code,{children:"current"}),": ",(0,r.jsx)(n.code,{children:"T"}),") => ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),(0,r.jsx)(n.td,{style:{textAlign:"left"},children:"The state transition logic producing next state"})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.code,{children:"void"}),">"]}),"\n",(0,r.jsx)(n.p,{children:"Next state if state transition logic execution did not throw"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Descripiton"})})}),"\n",(0,r.jsx)(n.p,{children:"Finalizes (i.e. replaces with no new state) current state only if given state transition logic\nexecuted successfully (i.e. without throwing an error)."}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#finalizeonsuccess",children:"finalizeOnSuccess"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L117",children:"packages/client/src/State.ts:117"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"getcurrentstate",children:"getCurrentState"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"getCurrentState"}),"(): ",(0,r.jsx)(n.code,{children:"undefined"})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-8",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"undefined"})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]}),"\n",(0,r.jsx)(n.p,{children:"This state if not discareded or the current state or undefined when there is no current state."}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Description"})})}),"\n",(0,r.jsx)(n.p,{children:"If the state has been discarded, provides the replacing current state if any."}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#getcurrentstate",children:"getCurrentState"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L90",children:"packages/client/src/State.ts:90"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"getcurrentstateorthrow",children:"getCurrentStateOrThrow"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"getCurrentStateOrThrow"}),"(): ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-9",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#getcurrentstateorthrow",children:"getCurrentStateOrThrow"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L102",children:"packages/client/src/State.ts:102"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"refresh",children:"refresh"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"refresh"}),"(): ",(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection",children:(0,r.jsx)(n.code,{children:"PendingProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.AcceptedProtection",children:(0,r.jsx)(n.code,{children:"AcceptedProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.RejectedRecovery",children:(0,r.jsx)(n.code,{children:"RejectedRecovery"})}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"returns-10",children:"Returns"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Promise"}),"<",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.PendingProtection",children:(0,r.jsx)(n.code,{children:"PendingProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.AcceptedProtection",children:(0,r.jsx)(n.code,{children:"AcceptedProtection"})})," | ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.RejectedRecovery",children:(0,r.jsx)(n.code,{children:"RejectedRecovery"})}),">"]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/Recovery.ts#L416",children:"packages/client/src/Recovery.ts:416"})}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h3,{id:"syncdiscardonsuccess",children:"syncDiscardOnSuccess"}),"\n",(0,r.jsxs)(n.p,{children:["\u25b8 ",(0,r.jsx)(n.strong,{children:"syncDiscardOnSuccess"}),"<",(0,r.jsx)(n.code,{children:"T"}),", ",(0,r.jsx)(n.code,{children:"U"}),">(",(0,r.jsx)(n.code,{children:"action"}),"): ",(0,r.jsx)(n.code,{children:"U"})]}),"\n",(0,r.jsx)(n.h4,{id:"type-parameters-2",children:"Type parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"T"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"U"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:(0,r.jsx)(n.code,{children:"State"})})," = ",(0,r.jsx)(n.code,{children:"T"})]})]})]})]}),"\n",(0,r.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Type"}),(0,r.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"left"},children:(0,r.jsx)(n.code,{children:"action"})}),(0,r.jsxs)(n.td,{style:{textAlign:"left"},children:["(",(0,r.jsx)(n.code,{children:"current"}),": ",(0,r.jsx)(n.code,{children:"T"}),") => ",(0,r.jsx)(n.code,{children:"U"})]}),(0,r.jsx)(n.td,{style:{textAlign:"left"},children:"The state transition logic producing next state"})]})})]}),"\n",(0,r.jsx)(n.h4,{id:"returns-11",children:"Returns"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"U"})}),"\n",(0,r.jsx)(n.p,{children:"Next state if state transition logic execution did not throw"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Descripiton"})})}),"\n",(0,r.jsxs)(n.p,{children:["Same as ",(0,r.jsx)(n.code,{children:"discardOnSuccess"})," but with a synchronous action."]}),"\n",(0,r.jsx)(n.h4,{id:"inherited-from-7",children:"Inherited from"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State",children:"State"}),".",(0,r.jsx)(n.a,{href:"/logion-api/docs/reference/classes/client.State#syncdiscardonsuccess",children:"syncDiscardOnSuccess"})]}),"\n",(0,r.jsx)(n.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://github.com/logion-network/logion-api/blob/562c387/packages/client/src/State.ts#L73",children:"packages/client/src/State.ts:73"})})]})}function a(e={}){const{wrapper:n}={...(0,i.M)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},3460:(e,n,s)=>{s.d(n,{I:()=>l,M:()=>t});var r=s(6952);const i={},c=r.createContext(i);function t(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(c.Provider,{value:n},e.children)}}}]);