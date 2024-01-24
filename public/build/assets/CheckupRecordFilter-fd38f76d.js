import{R as p,j as i,a as t}from"./app-d2a3d537.js";import{I as c}from"./InputLabel-3da68630.js";import{P as d}from"./Panel-b158e787.js";import{P as u}from"./PrimaryButton-c4bee480.js";import{u as h}from"./app-fb271a11.js";import f from"./ClinicListSelectInput-e4f3cbe0.js";import g from"./DoctorListPopoverSearch-207bf51f.js";import v from"./VisitTypeListPopoverSearch-f7c0df1c.js";import{b}from"./CheckupRecord-2fa0f175.js";import k from"./RegistrationListPopoverSearch-8a07c592.js";import"./Api-80eca046.js";import"./Request-a7bce2e9.js";import"./TableDetail-31226791.js";import"./index.esm-2b0f1775.js";import"./BorderedRoundedButton-600ca3a5.js";import"./Button-6a81ea58.js";import"./TextInput-21fcf679.js";import"./NoData-9ab3477f.js";import"./PopoverInput-8f306410.js";import"./Clinic-f89fd43c.js";import"./Doctor-8ebd7b82.js";import"./VisitType-0f2b0c06.js";import"./Registration-c85af660.js";import"./Patient-e8af8ff9.js";import"./HealthWorker-225f8e62.js";import"./RegistrationType-9a523c17.js";function O({onFilterApply:s}){h();const[e,o]=p(b),n=r=>{o({...e,registration:{...e.registration,clinic:r}})},m=r=>{o({...e,registration:{...e.registration,registration_type:r}})},l=r=>{o({...e,registration:{...e.registration,doctor:r}})},a=r=>{o({...e,registration:{...e.registration,visit_type:r}})};return i(d,{isVisible:!0,className:"w-48 pt-4 px-2",children:[t("div",{children:"Filter"}),i("div",{className:"mt-4",children:[t(c,{htmlFor:"clinic",value:"Poli"}),t(f,{className:"mt-1 block w-full h-8 focus:border-none",onSelect:n,item:e.registration.clinic})]}),i("div",{className:"mt-4",children:[t(c,{htmlFor:"checkupRecord-type",value:"Jenis Pendaftaran"}),t(k,{className:"mt-1 block w-full h-8 focus:border-none",onSelect:m,item:e.registration.registration_type})]}),i("div",{className:"mt-4",children:[t(c,{htmlFor:"doctor",value:"Dokter"}),t(g,{className:"mt-1 block w-full h-8 focus:border-none",onSelect:l,item:e.registration.doctor,clinic:e.registration.clinic})]}),i("div",{className:"mt-4",children:[t(c,{htmlFor:"visit-type",value:"Jenis Kunjungan"}),t(v,{className:"mt-1 block w-full h-8 focus:border-none",onSelect:a,item:e.registration.visit_type})]}),t("div",{className:"flex items-center justify-end mt-4 mr-1",children:t(u,{className:"h-8 ml-4 bg-green-500 hover:bg-green-400",onClick:s,children:"Terapkan"})})]})}export{O as default};
