import{a as l,f as a}from"./app-230bb32c.js";import{u as i,a as p}from"./app-db60d94e.js";const u={api_url:"http://hometest.test/api",web_url:"http://hometest.test"},k=({children:s,className:n,...o})=>{const{theme:e}=i(),{hoverTheme:t,bigFontColorTheme:r}=p(e);return l("button",{...o,className:`${t} ${n} ${r}`,children:s})},g="/medical-checkups",h="/app-user",b="/tables",f="/table-reservation",T="/table-reservations",v="/app-user/login",c=s=>{const o=document.cookie.split("; ");for(let e=0;e<o.length;e++){const t=o[e].split("=");if(t[0]===s)return t[1]}return null},B=()=>c("access_token"),S=()=>c("user_scopes").split(","),C=()=>c("user_name"),N=(s,n=null,o={},e={})=>{const t=c("access_token");return n!=null&&(e={...e,Authorization:"Bearer "+t}),a.get(u.api_url+s,{headers:e,params:o})},x=(s,n=null,o={},e={},t={})=>{const r=c("access_token");return n!=null&&(t={...t,Authorization:"Bearer "+r}),a.post(u.api_url+s,o,{headers:t,params:e})},z=(s,n=null,o={},e={},t={})=>{const r=c("access_token");return n!=null&&(t={...t,Authorization:"Bearer "+r}),a.patch(u.api_url+s,o,{headers:t,params:e})};export{k as B,u as C,B as a,f as b,v as c,h as d,b as e,T as f,N as g,z as h,C as i,S as j,x as p,g as u};