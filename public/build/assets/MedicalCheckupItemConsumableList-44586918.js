import{R as g,r as n,p as N,j as o,a as t}from"./app-d2a3d537.js";import{u as v}from"./app-fb271a11.js";import{a as w,g as P}from"./Request-a7bce2e9.js";import"./index.es-302dcb1a.js";import{T as S,a as T,b as m}from"./TableDetail-31226791.js";import{b as y,a as M,m as j}from"./MedicalCheckupItem-38b98507.js";import{A as D}from"./Api-80eca046.js";import A from"./MedicalCheckupItemConsumable-336dd93c.js";import{P as B}from"./Pill-07fbc269.js";import{f}from"./Helper-e1a63998.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./TextInput-21fcf679.js";import"./PrimaryButton-c4bee480.js";import"./NoData-9ab3477f.js";import"./Item-5a97d1bd.js";import"./Uom-6085d693.js";import"./ItemMargin-b56d4323.js";import"./Form-5433bd3a.js";import"./InputLabel-3da68630.js";import"./Toast-3fee0a06.js";import"./ResponseMessages-5367e22c.js";import"./ItemListPopoverSearch-f8cb5ac6.js";import"./PopoverInput-8f306410.js";import"./MedicalCheckup-84b76896.js";import"./CheckupRecord-2fa0f175.js";import"./Registration-c85af660.js";import"./Doctor-8ebd7b82.js";import"./Clinic-f89fd43c.js";import"./VisitType-0f2b0c06.js";import"./Patient-e8af8ff9.js";import"./HealthWorker-225f8e62.js";import"./Certificate-b20e9c29.js";import"./MedicalCheckupFormGigi-385eedbe.js";import"./MedicalCheckupFormUmum-76e447aa.js";import"./MedicalCheckupFormMata-51d7ac05.js";function Ie({medicalCheckup:l,...E}){v();const[a,k]=g(y),[O,d]=g(M),[R,u]=n.useState(!1),[i,h]=n.useState(N()),r=(e={})=>{e={...e,item_type_id:2};const s=w();let c=D.replace("{medicalCheckup}",l.id);P(c,s,e).then(p=>{p.status==200&&k(p.data.data)}).catch(p=>{})},C=e=>{h({...i,keyword:e.target.value}),r({...i,keyword:e.target.value})},b=e=>{d(e),u(!0)},_=e=>{h({...i,page:e}),r({...i,page:e})},x=()=>{d(j),u(!0)},I=()=>{r(i)};return n.useEffect(()=>{r(i)},[l]),o("div",{className:"flex",children:[t("div",{className:"w-1/3 mr-4",children:t("div",{className:"w-full pb-4",children:t(A,{title:"Bahan Habis Pakai",onSubmit:I})})}),t(S,{text:"Daftar Bahan Habis Pakai",columns:["No","Barang","Jumlah","Aksi"],onSearch:C,onPageChanged:_,onAddClick:x,page:a._paging.page,size:a._paging.limit,totalData:a._paging.total_data,children:a._resources&&a._resources.map((e,s)=>{const c=(a._paging.page-1)*a._paging.limit+s+1;return o(T,{addSpace:!0,onDoubleClick:()=>b(e),children:[t(m,{children:c}),t(m,{children:t("div",{children:e.item.name})}),o(m,{position:"left",children:[o("div",{className:"text-xs pr-2",children:[e.quantity," x ",f(e.price_per_unit)]}),t("div",{className:"flex justify-end",children:t(B,{className:"bg-green-600 text-white h-6",children:f(e.amount)})})]}),t(m,{className:"items-center"})]})})})]})}export{Ie as default};
