import{R as m,t as x,r as k,a,j as l}from"./app-d2a3d537.js";import"./app-fb271a11.js";import{I as o}from"./InputLabel-3da68630.js";import{P as _}from"./PrimaryButton-c4bee480.js";import{T as n}from"./TextInput-21fcf679.js";import{p as F}from"./Person-886fc51c.js";import C from"./GenderInputList-7d2c966a.js";import{C as y}from"./Calendar-d1ebbba8.js";import{H as j}from"./Api-80eca046.js";import{p as S,a as d,b as T}from"./Request-a7bce2e9.js";import P from"./PatientInputSearch-b43a229e.js";import{p as I}from"./Registration-c85af660.js";import{T as L}from"./Toast-3fee0a06.js";import{F as R}from"./Form-5433bd3a.js";import{T as A}from"./TextArea-ea22aa05.js";import D from"./VillageListPopoverSearch-0cd516c5.js";import"./Gender-8c6cfe2c.js";import"./Patient-e8af8ff9.js";import"./Village-746193ad.js";import"./Clinic-f89fd43c.js";import"./TableDetail-31226791.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./NoData-9ab3477f.js";import"./PopoverInput-8f306410.js";import"./InputError-1d44d59a.js";import"./Doctor-8ebd7b82.js";import"./VisitType-0f2b0c06.js";function fe({title:u,onSubmit:c,className:f,...G}){const[e,r]=m(F),[h,p]=m(I),[E,v]=m(x),[g,i]=k.useState(!1),b=t=>{t.preventDefault(),e.id==0?S(j,d(),e).then(s=>{s.status==201&&(r(s.data.data._resources),p({...h,patient:s.data.data._resources.patient}),c()),i(!1)}).catch(s=>{v({color:L.danger,message:"Gagal menyimpan data: "+s.response.data.message}),i(!1)}):T(e+"/"+e.id,d(),e).then(s=>{s.status==200&&(setClinic(s.data.data._resources),c()),i(!1)}).catch(s=>{i(!1)})},N=t=>{r({...e,gender:t})},w=t=>{r({...e,village:t,current_village:t})};return a("div",{className:`w-full ${f}`,children:e?l(R,{className:"w-full justify-center ",children:[l("div",{className:"mb-5 text-2xl",children:[e.id!=0?"Edit":"Tambah"," ",u]}),l("div",{className:"flex items-center",children:[l("div",{className:"w-full mr-2",children:[a(o,{htmlFor:"name",value:"No rekam medik"}),a(P,{className:"h-8 focus:border-none"})]}),l("div",{className:"w-full",children:[a(o,{htmlFor:"name",value:"Nama"}),a(n,{id:"name",type:"text",name:"name",value:e.name,className:"mt-1 block w-full h-8 focus:border-none",isFocused:!0,onChange:t=>r({...e,name:t.target.value})})]})]}),l("div",{className:"flex items-center mt-4",children:[l("div",{className:"w-full mr-2",children:[a(o,{htmlFor:"nik",value:"NIK"}),a(n,{id:"nik",type:"text",name:"nik",value:e.nik,className:"mt-1 block w-full h-8 focus:border-none",onChange:t=>r({...e,nik:t.target.value})})]}),l("div",{className:"w-full",children:[a(o,{htmlFor:"date_of_birth",value:"Tanggal Lahir"}),a(y,{value:e.date_of_birth,className:"mt-1 block w-full h-8 focus:border-none",onSelectDate:t=>r({...e,date_of_birth:t.target.value})})]})]}),l("div",{className:"flex items-center mt-4",children:[l("div",{className:"w-full mr-2",children:[a(o,{htmlFor:"place_of_birth",value:"Tempat Lahir"}),a(n,{id:"place_of_birth",type:"text",name:"place_of_birth",value:e.place_of_birth,className:"mt-1 block w-full h-8 focus:border-none",onChange:t=>r({...e,place_of_birth:t.target.value})})]}),l("div",{className:"w-full",children:[a(o,{htmlFor:"phone",value:"Telepon"}),a(n,{id:"phone",type:"text",name:"phone",value:e.phone,className:"mt-1 block w-full h-8 focus:border-none",onChange:t=>r({...e,phone:t.target.value})})]})]}),l("div",{className:"flex items-center mt-4",children:[l("div",{className:"w-full mr-2",children:[a(o,{htmlFor:"job",value:"Pekerjaan"}),a(n,{id:"job",type:"text",name:"job",value:e.job,className:"mt-1 block w-full h-8 focus:border-none",onChange:t=>r({...e,job:t.target.value})})]}),l("div",{className:"w-full",children:[a(o,{htmlFor:"religion",value:"Agama"}),a(n,{id:"religion",type:"text",name:"religion",value:e.religion,className:"mt-1 block w-full h-8 focus:border-none",onChange:t=>r({...e,religion:t.target.value})})]})]}),l("div",{className:"flex items-center mt-4",children:[l("div",{className:"w-full mr-2",children:[a(o,{htmlFor:"degree",value:"Pendidikan"}),a(n,{id:"degree",type:"text",name:"degree",value:e.degree,className:"mt-1 block w-full h-8 focus:border-none",onChange:t=>r({...e,degree:t.target.value})})]}),l("div",{className:"w-full",children:[a(o,{htmlFor:"gender",value:"Jenis Kelamin"}),a(C,{className:"mt-1 block w-full h-8 focus:border-none",onSelect:N,item:e.gender})]})]}),a("div",{className:"flex items-center mt-4",children:l("div",{className:"w-full",children:[a(o,{htmlFor:"name",value:"Desa"}),a(D,{position:"top",className:"mt-1 block w-full h-8 focus:border-none",onSelect:w,posi:!0,item:e.village})]})}),a("div",{className:"flex items-center mt-4",children:l("div",{className:"w-full",children:[a(o,{htmlFor:"gender",value:"Alamat Lengkap"}),a(A,{id:"address",type:"text",name:"address",value:e.address,className:"mt-1 block w-full focus:border-none",onChange:t=>r({...e,address:t.target.value})})]})}),a("div",{className:"flex items-center justify-end mt-4",children:a(_,{className:"ml-4 bg-green-500 hover:bg-green-400",disabled:g,onClick:b,children:"Simpan"})})]}):null})}export{fe as default};
