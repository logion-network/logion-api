"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4656],{2548:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var i=n(1948),o=n(3460);const a={sidebar_position:2,description:"How to authenticate a Polkadot account to logion network."},c="Authentication",r={id:"client/authentication",title:"Authentication",description:"How to authenticate a Polkadot account to logion network.",source:"@site/docs/client/authentication.md",sourceDirName:"client",slug:"/client/authentication",permalink:"/logion-api/docs/client/authentication",draft:!1,unlisted:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/client/authentication.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"How to authenticate a Polkadot account to logion network."},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/logion-api/docs/client/introduction"},next:{title:"Balance and Transactions",permalink:"/logion-api/docs/client/balance-transactions"}},s={},d=[];function l(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,o.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"authentication",children:"Authentication"}),"\n",(0,i.jsxs)(t.p,{children:["Below example shows how to use an embedded signer in order to authenticate ",(0,i.jsx)(t.code,{children:"client"}),". This approach is not recommended in production,\na ",(0,i.jsx)(t.a,{href:"/docs/category/extension",children:"browser extension"})," should be used instead."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-typescript",children:"import { Keyring } from '@polkadot/api';\n\nconst keyring = new Keyring();\nconst keypair = keyring.addFromUri(\"0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a\"); // Alice\nconst signer = new KeyringSigner(keyring);\n\n// Authenticate Alice\nlet authenticatedClient = await client.authenticate(\n    [ keypair.address ],\n    signer\n);\n\n// Later on, refresh the session (session's TTL is 1 hour)\nauthenticatedClient = await authenticatedClient.refreshTokens(DateTime.now());\n"})})]})}function u(e={}){const{wrapper:t}={...(0,o.M)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},3460:(e,t,n)=>{n.d(t,{I:()=>r,M:()=>c});var i=n(6952);const o={},a=i.createContext(o);function c(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);