import{r as e,a as d}from"./app-230bb32c.js";import{u as p,a as T}from"./app-db60d94e.js";const b=e.forwardRef(function({type:n="text",className:o="",isFocused:u=!1,...t},s){const{theme:f}=p(),{inputTheme:m,borderTheme:c,disabled:i}=T(f),a=s||e.useRef();let r=m;return t.readOnly&&(r=i),e.useEffect(()=>{u&&a.current.focus()},[]),d("input",{...t,type:n,className:`rounded-md shadow-sm ${o} ${r} ${c} `,ref:a})});export{b as T};