import{j as t,a as e,r as N,c as C,t as F,F as j}from"./app-230bb32c.js";import{u as S,a as $}from"./app-db60d94e.js";import{F as _,a as B,T as L}from"./Toast-203e162b.js";import{B as v,a as w,p as H,b as I}from"./Request-e7f6bbaa.js";import{T as y}from"./TextInput-d74dba03.js";import z from"./TableChooser-810e4890.js";import"./Table-d31decab.js";import E from"./CustomerRegister-581b6997.js";import P from"./CustomerLogin-f1a50e9a.js";import{t as A}from"./TableReservation-463d8a51.js";import{T as k}from"./Toast-3fee0a06.js";import"./Clinic-1b8e14ea.js";import"./InputLabel-a52f0bad.js";import"./User-da5e0783.js";import"./ClearButton-33594f12.js";const G="/build/assets/customerhome2-6f61a85f.jpg";function O({isOpen:m,onClose:r,children:p,position:l="right",isScrollabe:g=!1,title:i="",className:n,...d}){const{theme:a,toggleTheme:c}=S(),{layoutTheme:T,bgTheme:h,bigFontColorTheme:x,borderedBottomTheme:b}=$(a);let o="right-0",u=m?"translate-x-0":"translate-x-full";l==="left"&&(o="left-0",u=m?"translate-x-0":"-translate-x-full");let f="";return g&&(f="overflow-y-auto"),t("div",{children:[e("div",{className:`fixed inset-0 bg-black opacity-50 z-30 ${m?"block":"hidden"}`,onClick:r}),t("div",{className:`fixed inset-y-0 ${n} ${o} ${T} transform ${u} transition-transform ease-in-out duration-300 z-40 ${f}`,children:[t("div",{className:`flex justify-between mb-3 ${b} p-4`,children:[e("div",{className:`${x} text-2xl `,children:i}),e("div",{className:"flex",children:t(v,{onClick:r,className:`${h} p-2 rounded-md`,children:[" ",e(_,{})]})})]}),e("div",{className:"p-4",children:p})]})]})}function U({children:m}){let r="";S();const[p,l]=N.useState(!1),[g,i]=N.useState(!1),[n,d]=N.useState(1),[a,c]=C(A),[T,h]=C(F),x=s=>{c({...a,table:s})},b=()=>{i(!0),H(I,w(),a).then(s=>{s.status==201&&(c(s.data.data._resources),h({color:k.success,message:"Reservation saved"})),i(!1)}).catch(s=>{h({color:k.danger,message:"Reservation failed to Save"}),i(!1)})};let o=null;n==1?(r="Choose your table",o=e(z,{onTableChoosen:s=>x(s)})):n==2?(r="Register",o=e(E,{})):n==3&&(r="Login",o=e(P,{}));const u=()=>{d(1),l(!0)},f=()=>{d(2),l(!0)},R=()=>{d(3),l(!0)};return t("div",{className:"min-h-screen pt-6 bg-gray-100 p-20",style:{backgroundImage:`url(${G})`,backgroundSize:"cover"},children:[t("div",{className:"flex justify-between items-center text-white text-lg",children:[e("div",{className:"flex w-1/2 ",children:t("div",{className:"flex justify-between w-1/3",children:[e("div",{children:"Home"}),e("div",{children:"Places"}),e("div",{children:"Help"})]})}),e("div",{className:"flex justify-end w-1/2",children:t("div",{className:"flex",children:[t("div",{className:"flex items-center mr-4",children:[e(B,{className:"mr-3"}),e("div",{children:" Language"})]}),!w()&&t(j,{children:[e(v,{onClick:f,className:"text-white text-lg px-4 py-2 rounded-lg  mr-4 hover:text-black",children:"Sign Up"}),e(v,{onClick:R,className:"text-white text-lg px-4 py-2 rounded-lg bg-green-600  mr-4 hover:text-black",children:"Sign In"})]})]})})]}),t("div",{className:"text-right items-center text-white text-9xl my-10",style:{},children:[e("div",{children:"Enjoy"}),e("div",{children:"your favorite"}),e("div",{children:"food"})]}),t("div",{className:"bg-gray-200 h-18 rounded-2xl p-4 flex justify-between",children:[t("div",{className:"flex",children:[e(y,{type:"datetime-local",className:"w-64 mr-4",value:a.reserve_at,onChange:s=>c({...a,reserve_at:s.target.value})}),e(y,{type:"text",className:"w-64 mr-4",placeHolder:"Choose your table",value:"TABLE "+a.table.name,onFocus:u}),e(y,{type:"text",className:"w-64 mr-4",placeHolder:"Reserver Name",value:a.reserve_for,onChange:s=>c({...a,reserve_for:s.target.value})})]}),e(v,{disable:g,onClick:b,className:"text-white text-lg px-4 py-2 rounded-lg bg-green-600 hover:text-black",children:"Reserve"})]}),e(O,{className:"w-1/2",isOpen:p,onClose:()=>l(!1),position:"left",isScrollabe:!1,title:r,children:o}),e(L,{})]})}function re(){return e(U,{})}export{re as default};