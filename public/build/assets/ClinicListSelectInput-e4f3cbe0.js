import{r,a as o,j}from"./app-d2a3d537.js";import{c as y}from"./Api-80eca046.js";import{a as N,g as B}from"./Request-a7bce2e9.js";import{u as D,a as R}from"./app-fb271a11.js";import{T as E,a as O,b as i,B as z}from"./TableDetail-31226791.js";import{P as A}from"./PopoverInput-8f306410.js";import{b as m}from"./Clinic-f89fd43c.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./TextInput-21fcf679.js";import"./PrimaryButton-c4bee480.js";import"./NoData-9ab3477f.js";function W({onSelect:g,item:a,...u}){const{theme:f}=D(),{borderTheme:_}=R(f),[t,w]=r.useState({_resources:[],_paging:{}}),[b,l]=r.useState({id:0,name:"",concat_name:""}),P=e=>{p(e)},[S,p]=r.useState(!1),[n,h]=r.useState({page:1,size:5,keyword:"",order_by:"id",order_direction:"DESC"}),d=(e={})=>{const c=N();B(y,c,e).then(s=>{s.status==200&&w(s.data.data)}).catch(s=>{})},C=e=>{h({...n,keyword:e.target.value}),d({...n,keyword:e.target.value})},v=e=>{g(e),l({...e,concat_name:e.id>0?e.id+"~"+e.name:null}),p(!1)},T=()=>{g(m),l({...m,concat_name:""}),p(!1)},k=e=>{h({...n,page:e}),d({...n,page:e})};r.useEffect(()=>{d(n),a&&Object.entries(a).length>0&&l({...a,concat_name:a.id>0?a.id+"~"+a.name:null})},[a]);const x=["No","Poli","Keterangan","Aksi"];return o(A,{...u,onClear:T,value:b.concat_name,placeholder:"Cari poli...",onChange:C,onPopoverState:P,isOpen:S,children:o(E,{text:"Daftar Poli",columns:x,className:`rounded-lg hadow-lg p-4 ${_} shadow`,onPageChanged:k,showAddButton:!1,page:t._paging.page,size:t._paging.limit,totalData:t._paging.total_data,showRefresh:!1,showSearch:!1,showResultPage:!1,children:t._resources.map((e,c)=>{const s=(t._paging.page-1)*t._paging.limit+c+1;return j(O,{children:[o(i,{children:s}),o(i,{children:e.name}),o(i,{children:e.description}),o(i,{className:"items-center",children:o(z,{onClick:()=>v(e),className:"bg-green-500 text-white hover:bg-green-400 hover:text-gray-200",children:" Pilih"})})]},c)})})})}export{W as default};
