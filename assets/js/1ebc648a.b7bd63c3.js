"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9706],{5318:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>b});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(n),b=r,f=u["".concat(s,".").concat(b)]||u[b]||d[b]||o;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},324:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var a=n(2685),r=(n(7378),n(5318));const o={sidebar_position:2,description:"How to access to the balance and do transactions."},i="Balance and Transactions",c={unversionedId:"client/balance-transactions",id:"client/balance-transactions",title:"Balance and Transactions",description:"How to access to the balance and do transactions.",source:"@site/docs/client/balance-transactions.md",sourceDirName:"client",slug:"/client/balance-transactions",permalink:"/logion-api/docs/client/balance-transactions",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/client/balance-transactions.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"How to access to the balance and do transactions."},sidebar:"tutorialSidebar",previous:{title:"Authentication",permalink:"/logion-api/docs/client/authentication"},next:{title:"Protection and Recovery",permalink:"/logion-api/docs/client/protection"}},s={},l=[{value:"State",id:"state",level:2},{value:"Balance",id:"balance",level:2},{value:"Transactions on the balance",id:"transactions-on-the-balance",level:2},{value:"Transfer",id:"transfer",level:2}],p={toc:l};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"balance-and-transactions"},"Balance and Transactions"),(0,r.kt)("h2",{id:"state"},"State"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"An ",(0,r.kt)("a",{parentName:"p",href:"/logion-api/docs/client/authentication"},"authenticated client")," is necessary for all balance-related operations.")),(0,r.kt)("p",null,"The global state of the balances can be obtained (and later on, refreshed) with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"const balanceState = await authenticatedClient.balanceState();\nconst refreshedState = await balanceState.refresh();\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"transfer")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"refresh")," do return a new state.\nAlways use the most recent state, and discard the former state.\nIn the example above, the var ",(0,r.kt)("inlineCode",{parentName:"p"},"balanceState")," must not be used any more as soon as ",(0,r.kt)("inlineCode",{parentName:"p"},"refreshedState")," is available.")),(0,r.kt)("h2",{id:"balance"},"Balance"),(0,r.kt)("p",null,"You can get the current balance with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'const balance = balanceState.balances[0];\nconsole.log(\n    "Balance :%s",\n    `${balance.balance.coefficient.toInteger()}.${balance.balance.coefficient.toFixedPrecisionDecimals(2)}${balance.balance.prefix.symbol}`\n);\n')),(0,r.kt)("h2",{id:"transactions-on-the-balance"},"Transactions on the balance"),(0,r.kt)("p",null,"You can get a list of transactions on the balance with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'const transactions = balanceState.transactions;\nconsole.log("First transaction destination: %s", transactions[0].destination)\n')),(0,r.kt)("h2",{id:"transfer"},"Transfer"),(0,r.kt)("p",null,"You can transfer any amount (must be less than or equal to the balance, taking transaction fees into account)\nto another account:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { PrefixedNumber, KILO } from "@logion/node-api";\n\nbalanceState =  balanceState.transfer({\n    signer,\n    amount: new PrefixedNumber("2", KILO),\n    destination: ALICE.address\n});\n')))}d.isMDXComponent=!0}}]);