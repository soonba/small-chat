import{f,A as g,n as h,e as j,k as v,r as l,C as y,l as e,T as i,B as c,D as T}from"./index-UtIHuBoY.js";const b=async t=>g("/v2/users/login",t).then(a=>a.data),k=({onError:t,onSuccess:a})=>f({mutationFn:b,onError:s=>{t&&t(s)},onSuccess:s=>{a&&a(s)}});function S(){const t=h(),{onSocketConnect:a}=j(),{onToast:r}=v(),[s,u]=l.useState("test111"),[o,x]=l.useState("test111!"),d=k({onError(n){r(n.message,{delay:5e3})},onSuccess({tokens:n}){T(n),a(),t("/",{replace:!0})}}),m=n=>{n.preventDefault(),d.mutate({id:s,password:o})},p=()=>{t("/register")};return l.useEffect(()=>{y()},[]),e.jsx("div",{className:"mt-10 flex w-full items-start justify-center",children:e.jsxs("form",{className:"flex w-full max-w-screen-md flex-col gap-5 px-5",onSubmit:m,children:[e.jsx("h1",{className:"mb-10 text-center font-jua text-36-R-40 text-primary-900 dark:text-primary-100",children:"작은 대화"}),e.jsx(i,{labelText:"Id",placeholder:"아이디를 입력해 주세요.",type:"text",value:s,onChange:u}),e.jsx(i,{labelText:"Password",placeholder:"비밀번호를 입력해 주세요.",type:"password",value:o,onChange:x}),e.jsxs("div",{className:"mt-4 flex flex-col gap-2",children:[e.jsx(c,{disabled:!s&&!o,size:"large",text:"로그인",type:"submit",variant:"contained"}),e.jsx(c,{size:"large",text:"회원가입",type:"button",variant:"outlined",onClick:p})]})]})})}export{S as default};
