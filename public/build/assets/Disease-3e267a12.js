import{R as N,r as u,a as t,j as l}from"./app-d2a3d537.js";import{p as x,a as m,b as y,d as F}from"./Request-a7bce2e9.js";import"./app-fb271a11.js";import{I as o}from"./InputLabel-3da68630.js";import{P as f}from"./PrimaryButton-c4bee480.js";import{T as n}from"./TextInput-21fcf679.js";import w from"./ClinicListSelectInput-e4f3cbe0.js";import{d as j,c as k}from"./Disease-af679f06.js";import{F as C}from"./Form-5433bd3a.js";import{g as d}from"./Api-80eca046.js";import"./TableDetail-31226791.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./NoData-9ab3477f.js";import"./PopoverInput-8f306410.js";import"./Clinic-f89fd43c.js";function M({title:h,onSubmit:c,..._}){const[e,s]=N(j),[p,i]=u.useState(!1),v=a=>{a.preventDefault(),i(!0),e.id==0?x(d,m(),e).then(r=>{r.status==201&&(s(r.data.data._resources),c()),i(!1)}).catch(r=>{i(!1)}):y(d+"/"+e.id,m(),e).then(r=>{r.status==200&&(s(r.data.data._resources),c()),i(!1)}).catch(r=>{i(!1)})},g=()=>{i(!1),F(d+"/"+e.id,m()).then(a=>{a.status==200&&(s(k),c()),i(!1)})},b=a=>{s({...e,clinic:a})};return u.useEffect(()=>{},[]),t("div",{className:"w-full ",children:e?l(C,{className:"w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center",children:[l("div",{className:"mb-5 text-2xl",children:[e.id>0?"Edit":"Tambah"," ",h]}),l("div",{children:[t(o,{htmlFor:"clinic",value:"Poli"}),t(w,{className:"h-8 w-96",onSelect:b,item:e.clinic})]}),l("div",{className:"mt-4",children:[t(o,{htmlFor:"code",value:"Kode"}),t(n,{id:"code",type:"text",name:"code",value:e.code,className:"mt-1 block w-full h-8",isFocused:!0,onChange:a=>s({...e,code:a.target.value})})]}),l("div",{className:"mt-4",children:[t(o,{htmlFor:"name",value:"Nama"}),t(n,{id:"name",type:"text",name:"name",value:e.name,className:"mt-1 block w-full h-8",isFocused:!0,onChange:a=>s({...e,name:a.target.value})})]}),l("div",{className:"mt-4",children:[t(o,{htmlFor:"description",value:"Keterangan"}),t(n,{id:"description",type:"text",name:"description",value:e.description,className:"mt-1 block w-full h-8",onChange:a=>s({...e,description:a.target.value})})]}),l("div",{className:"flex items-center justify-end mt-4",children:[t(f,{className:"ml-4 bg-green-500 hover:bg-green-400",disabled:p,onClick:v,children:"Simpan"}),t(f,{className:"ml-4 bg-red-500 hover:bg-red-400",disabled:p||e.id==null,onClick:g,children:"Hapus"})]})]}):null})}export{M as default};
