import{a as e,j as m,F as p,r as c}from"./app-d2a3d537.js";import{p as u}from"./Request-a7bce2e9.js";import{B as h}from"./BorderedRoundedButton-600ca3a5.js";import"./app-fb271a11.js";import{B as f}from"./ButtonLink-7fefd0cd.js";import{A as x}from"./AdminLayout-90b2035a.js";import"./Button-6a81ea58.js";import"./ThemeButton-138f6990.js";import"./index.esm-2b0f1775.js";import"./Popover-43033a57.js";import"./ClearButton-f395bb26.js";import"./index.es-302dcb1a.js";import"./ApplicationLogo-7624da29.js";const g=({className:i,children:r,onSubmit:a,...l})=>e("form",{...l,onSubmit:a,className:i+" container bg-white rounded-t-xl shadow-shadow shadow-xl w-full p-4 flex",children:e("div",{children:r})}),s=({label:i,placeholder:r,type:a,name:l,onChange:n,...d})=>m(p,{children:[e("p",{className:"pl-1 pr-2 text-[14px] mb-2 ",children:i}),e("div",{className:"flex border-[1px] border-off-white flex-col h-full rounded-fulltext-navy-700 dark:text-white xl:w-6/12 mr-2 mb-6 rounded-lg",children:e("input",{...d,onChange:n,name:l,type:a,placeholder:r,className:"border-none focus:ring-0 rounded-lg outline-none w-full border-1 focus:outline-none text-[14px]"})})]});function j(){const[i,r]=c.useState(!1),[a,l]=c.useState({name:"",district_name:"",city_name:""}),n=(t,o)=>{l({...a,[t]:o})};return e(x,{textName:"Add Village",children:m(g,{onSubmit:t=>{t.preventDefault(),r(!0),u("/village",null,a).then(o=>{r(!1),o.status>=200&&alert("Data tersimpan")})},className:"flex flex-col",children:[e("div",{children:e(s,{label:"Name",placeholder:"Name",type:"text",name:"name",onChange:t=>n("name",t.target.value)})}),e("div",{children:e(s,{label:"District",placeholder:"District",type:"text",name:"district_name",onChange:t=>n("district_name",t.target.value)})}),e("div",{children:e(s,{label:"City",placeholder:"City",type:"text",name:"city_name",onChange:t=>n("city_name",t.target.value)})}),m("div",{children:[e(h,{disabled:i,className:"hover:bg-primary hover:text-white",children:"Save"}),e(f,{href:"/villages",className:"bg-primary text-white hover:bg-dark-primary",children:"Cancel"})]})]})})}export{j as default};
