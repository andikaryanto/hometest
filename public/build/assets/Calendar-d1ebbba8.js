import{r as s,a as n}from"./app-d2a3d537.js";import{u,a as h}from"./app-fb271a11.js";const i=({onSelectDate:o,value:e,...m})=>{const{theme:r}=u(),{inputTheme:c,borderTheme:d}=h(r),[l,a]=s.useState(""),p=t=>{a(t.target.value),o(t)};return s.useEffect(()=>{e&&a(e)},[e]),n("div",{className:"mx-auto max-w-md",children:n("input",{type:"date",value:l,onChange:p,className:`mt-1 p-2 block w-full rounded-md ${m.className} ${c} ${d} `})})},C=i;export{C};
