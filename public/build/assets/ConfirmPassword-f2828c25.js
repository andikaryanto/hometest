import{W as d,r as p,j as a,a as s,b as l}from"./app-d2a3d537.js";import{G as c}from"./GuestLayout-b1580b13.js";import{I as u}from"./InputError-1d44d59a.js";import{I as f}from"./InputLabel-3da68630.js";import{P as w}from"./PrimaryButton-c4bee480.js";import{T as h}from"./TextInput-21fcf679.js";import"./app-fb271a11.js";import"./ApplicationLogo-7624da29.js";function C(){const{data:e,setData:t,post:o,processing:m,errors:i,reset:n}=d({password:""});return p.useEffect(()=>()=>{n("password")},[]),a(c,{children:[s(l,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),a("form",{onSubmit:r=>{r.preventDefault(),o(route("password.confirm"))},children:[a("div",{className:"mt-4",children:[s(f,{htmlFor:"password",value:"Password"}),s(h,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,onChange:r=>t("password",r.target.value)}),s(u,{message:i.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(w,{className:"ml-4",disabled:m,children:"Confirm"})})]})]})}export{C as default};
