import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as c}from"./index-DR1jFbPG.js";import"./index-BK-7Syq1.js";import{M as d}from"./DocsRenderer-CFRXHY34-BP_BuA_K.js";import"./index-CFahbR6w.js";import"./preview-CNYF4uKb.js";import"./iframe-SdIk8FH4.js";import"./react-18-BzEIC2yi.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";const r=""+new URL("spring_theme-LecEPFx8.png",import.meta.url).href,h=""+new URL("spring_dark_theme-BDM1U4kM.png",import.meta.url).href,s=""+new URL("winter_theme-BGuC4qcp.png",import.meta.url).href,t=""+new URL("winter_dark_theme-O9afqeoS.png",import.meta.url).href,x=""+new URL("spring_flower_fall-DydjpNXT.gif",import.meta.url).href,j=""+new URL("winter_snowflake_fall-BCrtKW9Y.gif",import.meta.url).href;function l(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...c(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Introduction/3. 프로젝트 디자인"}),`
`,e.jsx(n.h1,{id:"작은-대화-프로젝트",children:"작은 대화 프로젝트"}),`
`,e.jsx(n.h2,{id:"프로젝트-디자인",children:"프로젝트 디자인"}),`
`,e.jsx(n.h3,{id:"-봄-테마-미리보기",children:"🌸 봄 테마 미리보기"}),`
`,e.jsxs("div",{className:"image-wrapper",children:[e.jsxs("figure",{children:[e.jsx("img",{src:r,alt:"spring theme"}),e.jsx("figcaption",{children:"라이트 모드"})]}),e.jsxs("figure",{children:[e.jsx("img",{src:h,alt:"spring dark theme"}),e.jsx("figcaption",{children:"다크 모드"})]}),e.jsxs("figure",{children:[e.jsx("img",{src:x,alt:"spring animation"}),e.jsx("figcaption",{children:"애니메이션"})]})]}),`
`,e.jsx(n.h3,{id:"️-겨울-테마-미리보기",children:"❄️ 겨울 테마 미리보기"}),`
`,e.jsxs("div",{className:"image-wrapper",children:[e.jsxs("figure",{children:[e.jsx("img",{src:s,alt:"winter theme"}),e.jsx("figcaption",{children:"라이트 모드"})]}),e.jsxs("figure",{children:[e.jsx("img",{src:t,alt:"winter dark theme"}),e.jsx("figcaption",{children:"다크 모드"})]}),e.jsxs("figure",{children:[e.jsx("img",{src:j,alt:"winter animation"}),e.jsx("figcaption",{children:"애니메이션"})]})]}),`
`,e.jsx(n.h3,{id:"ui-스타일링-가이드",children:"UI 스타일링 가이드"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hover / Active 효과"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"opacity"})," 조절로 부드러운 색상 전환 표현"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"다크/라이트 모드 배경 처리 방식"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["다크 모드에서는 ",e.jsx(n.code,{children:"background: transparent"}),"로 배경 그라디언트를 강조"]}),`
`,e.jsxs(n.li,{children:["라이트 모드에서는 ",e.jsx(n.code,{children:"background-color"}),"를 활용해 요소 간 구분 강조"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"텍스트 가독성"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["배경과 텍스트 컬러 간 대비가 부족할 경우를 대비해 ",e.jsx(n.code,{children:"text-shadow"})," 적용"]}),`
`,e.jsxs(n.li,{children:["예: ",e.jsx(n.code,{children:"text-white"}),"가 밝은 배경 위에 있을 경우 윤곽이 흐려지는 문제를 방지"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"️-테마별-컬러--스타일-명세",children:"🌸❄️ 테마별 컬러 & 스타일 명세"}),`
`,e.jsxs("div",{className:"image-wrapper",children:[e.jsx("img",{src:r,alt:"spring theme"}),e.jsxs("div",{children:[e.jsx("h4",{children:e.jsxs(n.p,{children:["🌸 ",e.jsx("strong",{children:"봄 테마(Spring)"})]})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"메인 컬러"}),e.jsx("br",{}),e.jsxs(n.p,{children:["벚꽃색 ",e.jsx(n.code,{children:"#ffb7c5"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"메인 텍스트 컬러"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["라이트 모드: ",e.jsx(n.code,{children:"#4d041d"})]}),e.jsxs("li",{children:["다크 모드: ",e.jsx(n.code,{children:"#fff1f3"})]})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"배경"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["라이트 모드: ",e.jsx(n.code,{children:"linear-gradient(#ffb7c5, #ffffff)"})]}),e.jsxs("li",{children:["다크 모드: ",e.jsx(n.code,{children:"linear-gradient(#000000 20%, #ffb7c5)"})]})]})]})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsxs("div",{className:"image-wrapper",children:[e.jsx("img",{src:s,alt:"winter theme"}),e.jsxs("div",{children:[e.jsx("h4",{children:e.jsxs(n.p,{children:["❄️ ",e.jsx("strong",{children:"겨울 테마(Winter)"})]})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"메인 컬러"}),e.jsx("br",{}),e.jsxs(n.p,{children:["차가운 겨울 블루 ",e.jsx(n.code,{children:"#0c436e"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"메인 텍스트 컬러"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["라이트 모드: ",e.jsx(n.code,{children:"#ffffff"})]}),e.jsxs("li",{children:["다크 모드: ",e.jsx(n.code,{children:"#e0f0fe"})]})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"배경"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["라이트 모드: ",e.jsx(n.code,{children:"linear-gradient(#0c436e, #e5e7eb)"})]}),e.jsxs("li",{children:["다크 모드: ",e.jsx(n.code,{children:"linear-gradient(#000000 20%, #0c436e)"})]})]})]})]})]})]})]})}function k(i={}){const{wrapper:n}={...c(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{k as default};
