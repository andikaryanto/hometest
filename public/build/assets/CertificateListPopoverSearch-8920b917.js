import{r as s,p as N,a as r,j}from"./app-d2a3d537.js";import{n as k}from"./Api-80eca046.js";import{g as B,a as R}from"./Request-a7bce2e9.js";import{u as y,a as O}from"./app-fb271a11.js";import{T as A,a as D,b as l,B as E}from"./TableDetail-31226791.js";import{P as z}from"./PopoverInput-8f306410.js";import{c as m}from"./Certificate-b20e9c29.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./TextInput-21fcf679.js";import"./PrimaryButton-c4bee480.js";import"./NoData-9ab3477f.js";function X({onSelect:p,item:a,clinic:I,...h}){const{theme:d}=y(),{borderTheme:f}=O(d),[t,u]=s.useState({_resources:[],_paging:{}}),[_,n]=s.useState({id:0,name:"",concat_name:""}),[w,c]=s.useState(!1),[i,S]=s.useState(N()),b=e=>{c(e)},g=(e={})=>{B(k,R(),e).then(o=>{o.status==200&&u(o.data.data)}).catch(o=>{})},v=e=>{S({...i,keyword:e.target.value}),g({...i,keyword:e.target.value})},P=e=>{p(e),n({...e,concat_name:e.id+"~"+e.name}),c(!1)},C=()=>{p(m),n({...m,concat_name:""}),c(!1)};s.useEffect(()=>{g(i),a&&Object.entries(a).length>0&&n({...a,concat_name:a.id>0?a.id+"~"+a.name:null})},[a]);const T=["No","Nama","Aksi"];return r(z,{...h,onClear:C,value:_.concat_name,placeholder:"Cari surat...",onChange:v,onPopoverState:b,isOpen:w,children:r(A,{text:"Surat",columns:T,className:`rounded-lg hadow-lg p-4 ${f} shadow`,showAddButton:!1,page:t._paging.page,size:t._paging.limit,totalData:t._paging.total_data,showRefresh:!1,showSearch:!1,showResultPage:!1,children:t._resources.map((e,o)=>{const x=(t._paging.page-1)*t._paging.limit+o+1;return j(D,{children:[r(l,{children:x}),r(l,{children:e.name}),r(l,{className:"items-center",children:r(E,{onClick:()=>P(e),className:"bg-green-500 text-white hover:bg-green-400 hover:text-gray-200",children:" Pilih"})})]},o)})})})}export{X as default};
