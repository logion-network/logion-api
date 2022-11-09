"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6449],{5318:(e,t,n)=>{n.d(t,{Zo:()=>A,kt:()=>d});var a=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),l=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},A=function(e){var t=l(e.components);return a.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,A=s(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,p=m["".concat(i,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(p,c(c({ref:t},A),{},{components:n})):a.createElement(p,c({ref:t},A))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,c=new Array(r);c[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,c[1]=s;for(var l=2;l<r;l++)c[l]=n[l];return a.createElement.apply(null,c)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9305:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var a=n(2685),o=(n(7378),n(5318));const r={sidebar_position:2},c="metamask",s={unversionedId:"extension/metamask",id:"extension/metamask",title:"metamask",description:"metamask",source:"@site/docs/extension/metamask.md",sourceDirName:"extension",slug:"/extension/metamask",permalink:"/logion-api/docs/extension/metamask",draft:!1,editUrl:"https://github.com/logion-network/logion-api/tree/main/website/docs/extension/metamask.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"polkadot{.js}",permalink:"/logion-api/docs/extension/polkadot-js"},next:{title:"Client",permalink:"/logion-api/docs/category/client"}},i={},l=[{value:"List all available accounts",id:"list-all-available-accounts",level:2},{value:"Authenticate the selected account",id:"authenticate-the-selected-account",level:2},{value:"Use JWT token",id:"use-jwt-token",level:2}],A={toc:l};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},A,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"metamask"},"metamask"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"metamask",src:n(1165).Z,width:"64",height:"64"})),(0,o.kt)("p",null,"Allows to sign a message with an ethereum account using ",(0,o.kt)("a",{parentName:"p",href:"https://metamask.io/"},"MetaMask")," browser extension (for ",(0,o.kt)("a",{parentName:"p",href:"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"},"chrome")," or ",(0,o.kt)("a",{parentName:"p",href:"https://addons.mozilla.org/firefox/addon/ether-metamask/"},"firefox"),"))."),(0,o.kt)("h2",{id:"list-all-available-accounts"},"List all available accounts"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import { enableMetaMask, allMetamaskAccounts } from "@logion/extension";\n\nconst enabled = await enableMetaMask("MyLogionWebApp")\n\nconst accounts = await allMetamaskAccounts();\naccounts.forEach(account => console.log("Detected MetaMask accounts: %s", account.address));\n')),(0,o.kt)("h2",{id:"authenticate-the-selected-account"},"Authenticate the selected account"),(0,o.kt)("p",null,"The selected account can be ",(0,o.kt)("a",{parentName:"p",href:"/logion-api/docs/client/authentication"},"authenticated"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const authenticatedClient = await client.authenticate([ accounts[0].address ], signer);\n")),(0,o.kt)("h2",{id:"use-jwt-token"},"Use JWT token"),(0,o.kt)("p",null,"Once authenticated, the returned JWT token can be used (for instance to claim an asset linked to your ethereum account):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const jwtToken = authenticatedClient.tokens.get(address);\n")))}u.isMDXComponent=!0},1165:(e,t,n)=>{n.d(t,{Z:()=>a});const a="data:image/png;base64,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"}}]);