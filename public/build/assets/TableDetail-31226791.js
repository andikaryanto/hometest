import{a as e,r as P,j as l}from"./app-d2a3d537.js";import{a as R,b as S,c as $,d as E,e as M}from"./index.esm-2b0f1775.js";import{B as H}from"./BorderedRoundedButton-600ca3a5.js";import{u as p,a as A}from"./app-fb271a11.js";import{T as B}from"./TextInput-21fcf679.js";import{B as w}from"./Button-6a81ea58.js";import{P as T}from"./PrimaryButton-c4bee480.js";import D from"./NoData-9ab3477f.js";const I=({children:n,className:t,...a})=>e(H,{...a,className:t+" h-8 items-center text-xs",children:n}),K=({page:n,size:t,totalData:a,onPageChanged:m,showResultPage:c,...h})=>{p();const[d,i]=P.useState("w-10"),[s,u]=P.useState({page:1,totalPage:1}),x=s.page==1,N=s.page==s.totalPage;a<t&&(t=a);const f=()=>Math.ceil(a/t),o=r=>{u({...s,page:r,totalPage:f()}),r.length<1&&i("w-10"),r.length==2&&i("w-12"),r.length==3&&i("w-14"),r.length==4&&i("w-16"),m(r)},v=()=>{o(s.page+1)},b=()=>{o(s.page-1)};return P.useEffect(()=>{u({page:n,size:t})},[n,t,a]),e("div",{className:"px-6 mt-4 flex items-center justify-between py-4",children:l("div",{className:"hidden sm:flex-1 sm:flex sm:items-center sm:justify-between",children:[c?e("div",{children:l("p",{className:"text-sm ",children:["Tampilkan ",e("span",{className:"font-medium",children:"1"})," s/d"," ",e("span",{className:"font-medium",children:t})," dari"," ",e("span",{className:"font-medium",children:a})," hasil"]})}):null,l("div",{className:"inline-flex items-center",children:[l("p",{className:"text-sm ",children:["Total Halaman: ",f()]}),l("div",{className:"inline-flex -space-x-px","aria-label":"Pagination",children:[e(w,{onClick:b,disabled:x,className:"ml-3 px-3 py-2 text-sm rounded-lg",children:e(R,{})}),e("div",{children:e(B,{value:s.page,className:`text-center h-8 ${d}`,onChange:r=>o(r.target.value)})}),e(w,{disabled:N,className:"ml-3 px-3 py-2 text-sm rounded-lg",onClick:v,children:e(S,{})})]})]})]})})},L=({children:n,...t})=>(p(),e("th",{className:"text-green-500 uppercase font-medium pl-8 py-[1px] text-left ",children:n})),W=({className:n,children:t,addSpace:a=!1,highLight:m=!1,...c})=>{const{theme:h}=p(),{hoverTheme:d,borderedBottomTheme:i}=A(h);let s="";return m&&(s=d),l("tr",{className:n+` cursor-pointer ${s} h-12`,...c,children:[t,a?e("div",{className:"h-20"}):null]})},Z=({text:n,columns:t=[],body:a,children:m,onSearch:c,page:h,size:d,totalData:i,onPageChanged:s,onFilterClick:u,onAddClick:x,showRefresh:N=!0,showSearch:f=!0,showFilterButton:o=!1,showAddButton:v=!0,className:b,showResultPage:r=!0,processing:y=!1,showPaging:C=!0,...q})=>{p();const j=t.map((g,F)=>e(L,{children:g},F)),k=g=>{g.key=="Enter"&&c(g)};return e("div",{className:"w-full rounded-lg",children:l("div",{className:`pt-4 rounded-lg ${b}`,children:[l("div",{className:"flex justify-between pb-4 px-6",children:[l("div",{className:"flex",children:[f?l("div",{children:["Cari : ",e(B,{className:"h-8 ml-3",onKeyDown:k})]}):null,o?l(I,{className:"bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center ml-4",onClick:u,children:[e("div",{className:"mr-2",children:"Filter"}),e($,{})]}):null]}),l("div",{className:"flex justify-between",children:[v?e("div",{className:"flex justify-end",children:l(T,{className:"h-8 mr-2 bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center",onClick:x,children:[e("div",{className:"mr-2",children:"Tambah"}),e(E,{})]})}):null,N?e("div",{className:"flex justify-end",children:l(T,{className:"h-8 mr-2 bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center",onClick:()=>onEdit({id:null,name:"",description:""}),children:[e("div",{className:"mr-2",children:"Refresh"}),e(M,{})]})}):null]})]}),l("table",{className:"min-w-full",children:[e("thead",{className:"h-12",children:e(W,{className:"",highLight:!1,children:j})}),i>0&&!y?e("tbody",{className:"h-14 mb-6",children:m}):null]}),y?e("div",{className:"flex justify-center text-center",children:"Sedang Memuat data... "}):null,i==0&&!y?e(D,{}):null,C?e(K,{page:h,size:d,totalData:i,onPageChanged:s,showResultPage:r}):null]})})},_=({children:n,className:t,position:a="left",...m})=>{let c="text-left";return a=="right"&&(c="text-right"),e("td",{className:`font-normal pl-8 ${c} ${t}`,children:n})};export{I as B,Z as T,W as a,_ as b};
