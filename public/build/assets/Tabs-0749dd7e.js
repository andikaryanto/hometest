import{r,j as p,a}from"./app-d2a3d537.js";import{u as h,a as T}from"./app-fb271a11.js";const b=({children:c,headers:o=[],...u})=>{const{theme:n}=h(),{borderedBottomTheme:i}=T(n),[t,l]=r.useState(0),m=e=>{l(e)},d="bg-green-600 text-white  rounded-t-lg";return p("div",{className:"",children:[a("div",{className:`flex ${i}`,children:o.map((e,s)=>a("div",{className:`tab px-3 py-2 cursor-pointer ${t===s?d:""}`,onClick:()=>m(s),children:e}))}),a("div",{className:"mt-4",children:r.Children.map(c,(e,s)=>t===s&&e)})]})},C=b;export{C as T};
