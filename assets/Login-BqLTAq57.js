import{r as n,j as e}from"./@react-vendor-BjtCfNPP.js";import{u as b,a as h,b as j,c as S,T as c,B as d}from"./index-BkZbZx0c.js";import{S as k}from"./SubmitLoader-C2uTrNLv.js";import{p as v,d as w,e as T}from"./@network-vendor-CcVnuzvd.js";const y=async t=>v("/v2/users/login",t).then(a=>a.data),C=({onError:t,onSuccess:a})=>b({mutationFn:y,onError:s=>{t&&t(s)},onSuccess:s=>{a&&a(s)}});function L(){const t=h(),{onSocketConnect:a}=j(),{onToast:i}=S(),[s,x]=n.useState("test111"),[r,m]=n.useState("test111!"),[p,l]=n.useState(!1),{mutate:u}=C({onSuccess({tokens:o}){T(o),a(),l(!1),t("/",{replace:!0})},onError(o){l(!1),i(o.message,{delay:5e3})}}),f=n.useCallback(o=>{o.preventDefault(),l(!0),u({id:s,password:r})},[u,s,r]),g=n.useCallback(()=>{t("/register")},[t]);return n.useEffect(()=>{w()},[]),e.jsxs("div",{className:"flex h-full w-full items-start justify-center",children:[p&&e.jsx(k,{}),e.jsxs("form",{className:"flex w-full max-w-screen-md flex-col gap-5 px-5",onSubmit:f,children:[e.jsx("h1",{className:"mb-5 text-center font-jua text-28-R-36 spring:text-pink-950 winter:text-white md:mb-10 md:text-36-R-40 spring:dark:text-pink-50 winter:dark:text-blue-100",children:"작은 대화"}),e.jsx(c,{labelText:"Id",type:"text",value:s,onChange:x,placeholder:"아이디를 입력하세요."}),e.jsx(c,{labelText:"Password",type:"password",value:r,onChange:m,placeholder:"비밀번호를 입력하세요."}),e.jsxs("div",{className:"mt-4 flex flex-col gap-2",children:[e.jsx(d,{disabled:!s&&!r,size:"large",text:"로그인",type:"submit",variant:"contained"}),e.jsx(d,{size:"large",text:"회원가입",type:"button",variant:"outlined",onClick:g})]})]})]})}export{L as default};
