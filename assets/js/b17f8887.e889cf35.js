"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3972],{5318:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>h});var o=n(7378);function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e){if(null==t)return{};var n,o,i=function(t,e){if(null==t)return{};var n,o,i={},r=Object.keys(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||(i[n]=t[n]);return i}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(o=0;o<r.length;o++)n=r[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}var l=o.createContext({}),p=function(t){var e=o.useContext(l),n=e;return t&&(n="function"==typeof t?t(e):a(a({},e),t)),n},s=function(t){var e=p(t.components);return o.createElement(l.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},d=o.forwardRef((function(t,e){var n=t.components,i=t.mdxType,r=t.originalType,l=t.parentName,s=c(t,["components","mdxType","originalType","parentName"]),d=p(n),h=i,g=d["".concat(l,".").concat(h)]||d[h]||u[h]||r;return n?o.createElement(g,a(a({ref:e},s),{},{components:n})):o.createElement(g,a({ref:e},s))}));function h(t,e){var n=arguments,i=e&&e.mdxType;if("string"==typeof t||i){var r=n.length,a=new Array(r);a[0]=d;var c={};for(var l in e)hasOwnProperty.call(e,l)&&(c[l]=e[l]);c.originalType=t,c.mdxType="string"==typeof t?t:i,a[1]=c;for(var p=2;p<r;p++)a[p]=n[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5653:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>c,toc:()=>p});var o=n(2685),i=(n(7378),n(5318));const r={sidebar_position:1,description:"How to authenticate a Polkadot account to logion network."},a="Authentication",c={unversionedId:"client/authentication",id:"client/authentication",title:"Authentication",description:"How to authenticate a Polkadot account to logion network.",source:"@site/docs/client/authentication.md",sourceDirName:"client",slug:"/client/authentication",permalink:"/logion-api/docs/client/authentication",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/client/authentication.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"How to authenticate a Polkadot account to logion network."},sidebar:"tutorialSidebar",previous:{title:"Client",permalink:"/logion-api/docs/category/client"},next:{title:"Balance and Transactions",permalink:"/logion-api/docs/client/balance-transactions"}},l={},p=[{value:"Authenticate with ad-hoc keyring",id:"authenticate-with-ad-hoc-keyring",level:2},{value:"Authenticate with Polkadot{.js}",id:"authenticate-with-polkadotjs",level:2}],s={toc:p};function u(t){let{components:e,...n}=t;return(0,i.kt)("wrapper",(0,o.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"authentication"},"Authentication"),(0,i.kt)("h2",{id:"authenticate-with-ad-hoc-keyring"},"Authenticate with ad-hoc keyring"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"import { LogionClient, KeyringSigner } from '@logion/client';\nimport { Keyring } from '@polkadot/api';\n\nconst keyring = new Keyring();\nkeyring.addFromUri(\"0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a\"); // Alice\nconst signer = new KeyringSigner(keyring);\n\nconst client = await LogionClient.create({\n    rpcEndpoints: [ 'wss://rpc01.logion.network' ], // A list of websocket endpoints\n    directoryEndpoint: 'https://directory.logion.network' // A logion directory\n});\n\n// Authenticate Alice\nconst authenticatedClient = await client.authenticate([\n    \"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY\" ],\n    signer\n);\n")),(0,i.kt)("p",null,"Now you can use authenticatedClient to interact with the network."),(0,i.kt)("h2",{id:"authenticate-with-polkadotjs"},"Authenticate with Polkadot{.js}"),(0,i.kt)("p",null,"In order to connect a webapp to logion-network, it is recommended to use ",(0,i.kt)("a",{parentName:"p",href:"/logion-api/docs/extension/polkadot-js"},"polkadot{.js} app")," extension."))}u.isMDXComponent=!0}}]);