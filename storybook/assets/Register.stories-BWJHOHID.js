import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-BZISi7jw.js";import{L as v,T as o,B as d,s as C}from"./common-DWiq0xOQ.js";import"./_commonjsHelpers-CqkleIqs.js";const x=/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/,u=/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/,p=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;function j(){const[t,b]=r.useState(""),[n,w]=r.useState(""),[s,y]=r.useState(""),[l,S]=r.useState(""),[_,m]=r.useState(!1),N=async a=>{a.preventDefault(),m(!0),await C(1500),m(!1)},i=r.useMemo(()=>["test111","test222","test333"].includes(t),[t]),T=r.useMemo(()=>{let a=!0;return x.test(n)||(a=!1),(!u.test(t)||i)&&(a=!1),p.test(s)||(a=!1),s!==l&&(a=!1),a},[t,s,l,n,i]);return e.jsxs("div",{className:"mt-10 flex w-full items-start justify-center",children:[_&&e.jsx("div",{className:"fixed inset-0 z-1000 flex cursor-progress items-center justify-center bg-black/30",children:e.jsx(v,{})}),e.jsxs("form",{className:"flex w-full max-w-screen-md flex-col gap-5 px-5",onSubmit:N,children:[e.jsx("h1",{className:"mb-5 text-center font-jua text-36-R-40 text-white dark:text-primary-100",children:"회원가입"}),e.jsx(o,{labelText:"Nickname",maxLength:20,minLength:3,type:"text",value:n,onChange:w,placeholder:"닉네임을 입력하세요.",helperText:n.length<3?"최소 3자, 최대 20자까지 입력하세요.":x.test(n)?"":"영문과 숫자 조합으로 입력하세요."}),e.jsx(o,{labelText:"Id",maxLength:20,minLength:6,type:"text",value:t,onChange:b,placeholder:"아이디를 입력하세요.",helperText:i?"중복된 아이디입니다. 다른 아이디를 입력하세요.":t.length<6?"최소 6자, 최대 20자까지 입력할 수 있습니다.":u.test(t)?"":"영문과 숫자 조합으로 입력하세요."}),e.jsx(o,{labelText:"Password",maxLength:16,minLength:8,type:"password",value:s,onChange:y,placeholder:"비밀번호를 입력하세요.",helperText:s.length<8?"최소 8자, 최대 16자까지 입력할 수 있습니다.":p.test(s)?"":"영문, 숫자, 특수문자 조합으로 입력하세요."}),e.jsx(o,{labelText:"Password Check",maxLength:16,minLength:8,type:"password",value:l,onChange:S,placeholder:"비밀번호 확인을 입력하세요.",helperText:l?s!==l?"비밀번호와 일치하지 않습니다.":"":"비밀번호 확인을 입력하세요."}),e.jsxs("div",{className:"mt-4 flex flex-col gap-2",children:[e.jsx(d,{disabled:!T,size:"large",text:"회원가입",type:"submit",variant:"contained"}),e.jsx(d,{size:"large",text:"로그인",type:"button",variant:"outlined"})]})]})]})}j.__docgenInfo={description:"",methods:[],displayName:"Register"};const A={component:j,parameters:{layout:"fullscreen"},title:"Auth/Register"},c={args:{}};var h,f,g;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {}
}`,...(g=(f=c.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const P=["Default"];export{c as Default,P as __namedExportsOrder,A as default};
