import{j as V}from"./jsx-runtime-D_zvdyIk.js";import{r as q}from"./index-BCtMShv3.js";import{j as L}from"./format-BIR5ht3F.js";const N=e=>{switch(e){case"contained":return"rounded-md winter:bg-blue-900 winter:text-blue-100 spring:bg-pink-900 spring:text-pink-50 hover:opacity-80 hover:spring:opacity-60 focus:opacity-80 spring:focus:opacity-60 disabled:pointer-events-none disabled:opacity-50";case"text":return"winter:text-white spring:text-pink-950 hover:opacity-80 focus:opacity-80 winter:dark:text-blue-100 spring:dark:text-pink-50";default:return"rounded-md border winter:border-blue-600 spring:border-pink-600 bg-white dark:bg-transparent winter:text-blue-600 spring:text-pink-600 hover:opacity-80 hover:spring:opacity-60 focus:opacity-80 spring:focus:opacity-60 winter:dark:border-blue-100 spring:dark:border-pink-100 winter:dark:text-blue-100 spring:dark:text-pink-50 disabled:pointer-events-none disabled:opacity-30"}},E=e=>{switch(e){case"large":return"h-12 text-16-B-24 sm:h-14 w-full sm:text-18-B-28";case"small":return"text-14-M-20 sm:text-16-M-24";default:return"h-11 w-full text-12-B-16 sm:text-14-B-20"}};function o({onClick:e,size:w,text:z,type:_="button",variant:C,...S}){const j=q.useCallback(i=>{i.currentTarget.blur(),e&&e(i)},[e]);return V.jsx("button",{...S,className:L(N(C),E(w)),type:_,onClick:j,children:z})}try{o.displayName="Button",o.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"enum",value:[{value:'"large"'},{value:'"medium"'},{value:'"small"'}]}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!0,type:{name:"enum",value:[{value:'"text"'},{value:'"contained"'},{value:'"outlined"'}]}},isFullWidth:{defaultValue:null,description:"",name:"isFullWidth",required:!1,type:{name:"boolean"}}}}}catch{}const P={component:o,parameters:{layout:"centered"},title:"Components/Button"},t={args:{size:"large",variant:"contained",text:"로그인"}},r={args:{size:"large",variant:"outlined",text:"회원가입"}},a={args:{size:"medium",variant:"contained",text:"생성하기"}},n={args:{size:"medium",variant:"contained",text:"참여하기"}},s={args:{size:"small",variant:"text",text:"로그아웃"}};var u,c,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    size: 'large',
    variant: 'contained',
    text: '로그인'
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,p,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: 'large',
    variant: 'outlined',
    text: '회원가입'
  }
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,x,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    variant: 'contained',
    text: '생성하기'
  }
}`,...(v=(x=a.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var b,f,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    variant: 'contained',
    text: '참여하기'
  }
}`,...(h=(f=n.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var y,B,k;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    size: 'small',
    variant: 'text',
    text: '로그아웃'
  }
}`,...(k=(B=s.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};const W=["LoginButton","RegisterButton","CreateChatButton","ParticipateChatButton","LogoutButton"];export{a as CreateChatButton,t as LoginButton,s as LogoutButton,n as ParticipateChatButton,r as RegisterButton,W as __namedExportsOrder,P as default};
