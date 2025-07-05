import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-DR1jFbPG.js";import"./index-ZalF5s7x.js";import{M as l}from"./DocsRenderer-CFRXHY34-dGm49Cz_.js";import"./index-CFahbR6w.js";import"./preview-KKKsGV6p.js";import"./iframe-B7Gqjjyo.js";import"./react-18-BzEIC2yi.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function i(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{title:"Introduction/1. 프로젝트 개요"}),`
`,n.jsx(s.h1,{id:"작은-대화-프로젝트",children:"작은 대화 프로젝트"}),`
`,n.jsx(s.h2,{id:"프로젝트-개요",children:"프로젝트 개요"}),`
`,n.jsx(s.h3,{id:"프로젝트-소개",children:"프로젝트 소개"}),`
`,n.jsxs(s.p,{children:[n.jsx(s.strong,{children:"작은 대화"})," 는 웹소켓 기반의 N:N 채팅 서비스입니다."]}),`
`,n.jsx(s.p,{children:"사용자가 채팅방을 생성하고 초대 코드를 통해 다른 유저를 초대할 수 있으며, 초대된 유저는 해당 채팅방에서 실시간으로 메시지를 주고받을 수 있습니다."}),`
`,n.jsx(s.p,{children:"각 채팅방은 개별적으로 입장 및 퇴장이 가능하며, 편리하고 감성적인 소통 환경을 제공합니다."}),`
`,n.jsx(s.h3,{id:"주요-기능",children:"주요 기능"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"로그인 및 회원가입"}),`
`,n.jsx(s.li,{children:"채팅방 리스트 조회"}),`
`,n.jsx(s.li,{children:"채팅방 생성 및 초대 코드 발급"}),`
`,n.jsx(s.li,{children:"초대 코드 입력을 통한 채팅방 입장"}),`
`,n.jsx(s.li,{children:"실시간 메시지 송수신 (WebSocket)"}),`
`,n.jsx(s.li,{children:"채팅방 퇴장"}),`
`]}),`
`,n.jsx(s.h3,{id:"프론트엔드-기술-스택",children:"프론트엔드 기술 스택"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Frontend"}),": React, Vite, Tailwind CSS"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Data Fetching"}),": TanStack Query (React Query)"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"State Management"})," : Zustand"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Realtime"}),": WebSocket"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Documentation"}),": Storybook"]}),`
`]}),`
`,n.jsx(s.h3,{id:"프론트엔드-폴더-구조",children:"프론트엔드 폴더 구조"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-bash",children:`├── app         # 라우팅 및 페이지 진입점 관리
├── components  # 재사용 가능한 UI 컴포넌트
├── config      # 환경설정 및 전역 설정 파일
├── hooks       # 커스텀 React Hooks
├── layouts     # 페이지 레이아웃 컴포넌트
├── libs        # 외부 라이브러리 설정
├── pages       # 화면
├── services    # API 통신 및 외부 서비스 로직
├── slices      # 전역 상태 관리
├── stories     # Storybook
├── styles      # 전역 스타일 및 테마 관련 설정
├── utils       # 범용 유틸리티 함수
`})}),`
`,n.jsx(s.h3,{id:"프로젝트-현황",children:"프로젝트 현황"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"v1.0"})," 2024.03"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"v2.0"})," 2024.04"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"v3.0"})," 2024.08"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"유지보수 및 개선"})," (진행중)"]}),`
`]})]})}function u(e={}){const{wrapper:s}={...r(),...e.components};return s?n.jsx(s,{...e,children:n.jsx(i,{...e})}):i(e)}export{u as default};
