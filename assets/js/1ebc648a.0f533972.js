"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4868],{9288:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>c,metadata:()=>i,toc:()=>l});var t=a(1948),s=a(3460);const c={sidebar_position:3,description:"How to access to the balance and do transactions."},o="Balance and Transactions",i={id:"client/balance-transactions",title:"Balance and Transactions",description:"How to access to the balance and do transactions.",source:"@site/docs/client/balance-transactions.md",sourceDirName:"client",slug:"/client/balance-transactions",permalink:"/logion-api/docs/client/balance-transactions",draft:!1,unlisted:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/client/balance-transactions.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,description:"How to access to the balance and do transactions."},sidebar:"tutorialSidebar",previous:{title:"Authentication",permalink:"/logion-api/docs/client/authentication"},next:{title:"Legal Officer Case (LOC)",permalink:"/logion-api/docs/client/loc"}},r={},l=[{value:"State",id:"state",level:2},{value:"Balance",id:"balance",level:2},{value:"Transactions on the balance",id:"transactions-on-the-balance",level:2},{value:"Transfer",id:"transfer",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,s.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"balance-and-transactions",children:"Balance and Transactions"}),"\n",(0,t.jsx)(n.p,{children:"The Logion network relies on the LGNT token. This section is about accessing you LGNT balance and transactions.\nIt also shows how to transfer LGNTs."}),"\n",(0,t.jsx)(n.h2,{id:"state",children:"State"}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["An ",(0,t.jsx)(n.a,{href:"/logion-api/docs/client/authentication",children:"authenticated client"})," is necessary for all balance-related operations."]})}),"\n",(0,t.jsx)(n.p,{children:"The global state of the balances can be obtained (and later on, refreshed) with:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"const balanceState = await authenticatedClient.balanceState();\nconst refreshedState = await balanceState.refresh();\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"caution",children:(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"transfer"})," and ",(0,t.jsx)(n.code,{children:"refresh"})," do return a new state.\nAlways use the most recent state, and discard the former state.\nIn the example above, the var ",(0,t.jsx)(n.code,{children:"balanceState"})," must not be used any more as soon as ",(0,t.jsx)(n.code,{children:"refreshedState"})," is available."]})}),"\n",(0,t.jsx)(n.h2,{id:"balance",children:"Balance"}),"\n",(0,t.jsx)(n.p,{children:"You can get the current balance with:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const balance = balanceState.balances[0];\nconsole.log(\n    "Balance :%s",\n    `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`\n);\n'})}),"\n",(0,t.jsx)(n.h2,{id:"transactions-on-the-balance",children:"Transactions on the balance"}),"\n",(0,t.jsx)(n.p,{children:"You can get a list of transactions on the balance with:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const transactions = balanceState.transactions;\nconsole.log("First transaction destination: %s", transactions[0].destination)\n'})}),"\n",(0,t.jsx)(n.h2,{id:"transfer",children:"Transfer"}),"\n",(0,t.jsx)(n.p,{children:"You can transfer any amount (must be less than or equal to the balance, taking transaction fees into account)\nto another account:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'import { PrefixedNumber, KILO } from "@logion/node-api";\n\nbalanceState =  balanceState.transfer({\n    signer,\n    amount: new PrefixedNumber("2", KILO),\n    destination: ALICE.address\n});\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},3460:(e,n,a)=>{a.d(n,{I:()=>i,M:()=>o});var t=a(6952);const s={},c=t.createContext(s);function o(e){const n=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(c.Provider,{value:n},e.children)}}}]);