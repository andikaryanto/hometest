import{c as m,r as c,t as d,j as r,a as e}from"./app-230bb32c.js";import"./app-db60d94e.js";import{I as o}from"./InputLabel-a52f0bad.js";import{T as l}from"./TextInput-d74dba03.js";import{u as p}from"./User-da5e0783.js";import{C as g}from"./ClearButton-33594f12.js";import{p as f,d as h}from"./Request-e7f6bbaa.js";import{T as v}from"./Toast-3fee0a06.js";function F(){const[s,t]=m(p),[u,w]=c.useState(!1),[C,i]=m(d),n=()=>{f(h,null,{...s,scopes:[{id:2}]}).then(a=>{i({message:"Succedfully registered",color:v.success})})};return r("div",{children:[r("div",{children:[e(o,{htmlFor:"username",value:"Username"}),e(l,{id:"username",name:"username",value:s.username,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:a=>t({...s,username:a.target.value}),required:!0})]}),r("div",{className:"mt-4",children:[e(o,{htmlFor:"email",value:"Email"}),e(l,{id:"email",type:"email",name:"email",value:s.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>t({...s,email:a.target.value}),required:!0})]}),r("div",{className:"mt-4",children:[e(o,{htmlFor:"password",value:"Password"}),e(l,{id:"password",type:"password",name:"password",value:s.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>t({...s,password:a.target.value}),required:!0})]}),e("div",{className:"flex items-center justify-end mt-4",children:e(g,{onClick:n,className:"ml-4 bg-green-600 text-white hover:bg-green-500",disabled:u,children:"Sign Up"})})]})}export{F as default};