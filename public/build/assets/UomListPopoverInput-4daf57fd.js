import{r,a as o,j as N}from"./app-d2a3d537.js";import{v as j}from"./Api-80eca046.js";import{a as y,g as C}from"./Request-a7bce2e9.js";import{u as U,a as B}from"./app-fb271a11.js";import{T as D,a as R,b as c,B as E}from"./TableDetail-31226791.js";import{P as I}from"./PopoverInput-8f306410.js";import{u as g}from"./Uom-6085d693.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./TextInput-21fcf679.js";import"./PrimaryButton-c4bee480.js";import"./NoData-9ab3477f.js";function V({onSelect:p,item:a,...u}){const{theme:h}=U(),{borderTheme:f}=B(h),[t,_]=r.useState({_resources:[],_paging:{}}),[w,i]=r.useState({id:0,name:"",concat_name:""}),b=e=>{l(e)},[v,l]=r.useState(!1),[m,S]=r.useState({page:1,size:5,keyword:"",order_by:"id",order_direction:"DESC"}),d=(e={})=>{const n=y();C(j,n,e).then(s=>{s.status==200&&_(s.data.data)}).catch(s=>{})},P=e=>{S({...m,keyword:e.target.value}),d({...m,keyword:e.target.value})},T=e=>{p(e),i({...e,concat_name:e.id>0?e.id+"~"+e.name:null}),l(!1)},k=()=>{p(g),i({...g,concat_name:""}),l(!1)};r.useEffect(()=>{a&&Object.entries(a).length>0&&i({...a,concat_name:a.id>0?a.id+"~"+a.name:null}),d(m)},[a]);const x=["No","Nama","Keterangan","Aksi"];return o(I,{...u,onClear:k,value:w.concat_name,placeholder:"Cari ukuran...",onChange:P,onPopoverState:b,isOpen:v,children:o(D,{text:"Daftar Item",columns:x,className:`rounded-lg hadow-lg p-4 ${f} shadow`,showAddButton:!1,page:t._paging.page,size:t._paging.limit,totalData:t._paging.total_data,showRefresh:!1,showSearch:!1,showResultPage:!1,children:t._resources.map((e,n)=>{const s=(t._paging.page-1)*t._paging.limit+n+1;return N(R,{children:[o(c,{children:s}),o(c,{children:e.name}),o(c,{children:e.description}),o(c,{className:"items-center",children:o(E,{onClick:()=>T(e),className:"bg-green-500 text-white hover:bg-green-400 hover:text-gray-200",children:" Pilih"})})]},n)})})})}export{V as default};
