import{q as f,R as p,r as n,j as i,a as e,F as r}from"./app-d2a3d537.js";import{B as u}from"./Api-80eca046.js";import{g as N,a as x}from"./Request-a7bce2e9.js";import{g as _,f as t}from"./Helper-e1a63998.js";import{b as y}from"./MedicalCheckup-84b76896.js";import"./postcss-7c6e560c.js";import"./CheckupRecord-2fa0f175.js";import"./Registration-c85af660.js";import"./Doctor-8ebd7b82.js";import"./Clinic-f89fd43c.js";import"./VisitType-0f2b0c06.js";import"./Patient-e8af8ff9.js";import"./HealthWorker-225f8e62.js";import"./Certificate-b20e9c29.js";function M({company:l}){const m=f(),h=_(m,"medical_checkup_id"),[a,v]=p(y),o=()=>{N(u+"/"+h,x()).then(c=>{c.status==200&&v(c.data.data._resources)})};return n.useEffect(()=>{o()},[]),n.useEffect(()=>{a.id>0&&a.payment.id>0&&window.print()},[a]),a.id>0&&a.payment&&i("div",{className:"xl:w-2/12 w-1/2 px-2 text-black",children:[i("div",{className:"border-b-2 border-black mb-6",children:[e("div",{className:"font-bold flex items-center justify-center",children:e("div",{children:l.name})}),e("div",{className:"flex items-center justify-center text-sm",children:e("div",{children:l.address})}),e("div",{className:"flex items-center justify-center  text-sm",children:i("div",{children:["Telp. ",l.phone]})})]}),i("div",{className:"mb-6 text-xs",children:[i("div",{className:"flex items-center",children:[e("div",{className:"w-1/2",children:"Tanggal Periksa"}),i("div",{children:[":",a.created_at]})]}),i("div",{className:"flex items-center",children:[e("div",{className:"w-1/2",children:"No RM"}),i("div",{children:[":",a.checkup_record.registration.patient.medical_record_number]})]}),i("div",{className:"flex items-center",children:[e("div",{className:"w-1/2",children:"No Nota"}),i("div",{children:[":",a.payment.payment_number]})]}),i("div",{className:"flex items-center",children:[e("div",{className:"w-1/2",children:"Dokter"}),i("div",{children:[":",a.doctor.name]})]}),i("div",{className:"flex items-center",children:[e("div",{className:"w-1/2",children:"Nama Pasien"}),i("div",{children:[":",a.checkup_record.registration.patient.person.name]})]}),i("div",{className:"flex items-center",children:[e("div",{className:"w-1/2",children:"Jenis Pendaftaran"}),i("div",{children:[":",a.checkup_record.registration.registration_type.name]})]})]}),i("div",{className:"mb-6 text-xs",children:[e("div",{className:"flex items-center",children:e("div",{className:"w-1/2 font-bold",children:"TARIF"})}),e("div",{className:"items-center pl-4",children:a.medical_checkup_treatments.length>0&&a.medical_checkup_treatments.map((c,d)=>i("div",{className:"flex justify-between",children:[e("div",{children:c.treatment.name}),e("div",{children:t(c.amount,!1)})]}))}),e("div",{className:"flex items-center mt-4",children:e("div",{className:"w-1/2 font-bold",children:"Obat"})}),e("div",{className:"items-center pl-4",children:a.medical_checkup_items&&a.medical_checkup_items.filter(c=>c.item.item_type.id==1).map((c,d)=>i("div",{className:"flex justify-between",children:[i("div",{children:[c.item.name," (",c.quantity,")"]}),e("div",{children:t(c.amount,!1)})]}))}),a.medical_checkup_compounds&&i(r,{children:[e("div",{className:"flex items-center mt-4",children:e("div",{className:"w-1/2 font-bold",children:"Obat Racik"})}),e("div",{className:"items-center pl-4",children:a.medical_checkup_compounds.length>0&&a.medical_checkup_compounds.map((c,d)=>i(r,{children:[i("div",{children:["Racikann ",d+1]}),c.medical_checkup_items.map((s,b)=>i("div",{className:"flex justify-between pl-4",children:[i("div",{className:"w-52",children:[s.item.name," (",s.quantity,")"]}),e("div",{children:t(s.amount,!1)})]}))]}))})]}),e("div",{className:"flex items-center mt-4",children:e("div",{className:"w-1/2 font-bold",children:"Jasa Racik"})}),e("div",{className:"items-center pl-4",children:i("div",{className:"flex justify-between",children:[e("div",{children:"Biaya"}),e("div",{children:t(a.payment.compound_fee,!1)})]})}),e("div",{className:"flex items-center mt-4",children:e("div",{className:"w-1/2 font-bold",children:"Bahan Habis Pakai"})}),e("div",{className:"items-center pl-4",children:a.medical_checkup_items.length>0&&a.medical_checkup_items.filter(c=>c.item.item_type.id==2).map((c,d)=>i("div",{className:"flex justify-between",children:[i("div",{children:[c.item.name," (",c.quantity,")"]}),e("div",{children:t(c.price_per_unit,!1)})]}))}),e("div",{className:"flex items-center mt-4 justify-end",children:i("div",{children:[i("div",{className:"flex justify-between",children:[e("div",{className:"w-36",children:"Diskon"}),e("div",{children:t(a.payment.discount,!1)})]}),i("div",{className:"flex justify-between",children:[e("div",{className:"w-36",children:"Total"}),e("div",{children:t(a.payment.amount,!1)})]}),i("div",{className:"flex justify-between",children:[e("div",{className:"w-36",children:"Bayar"}),e("div",{children:t(a.payment.payment_amount,!1)})]}),i("div",{className:"flex justify-between",children:[e("div",{className:"w-36",children:"Kembalian"}),e("div",{children:t(a.payment.change,!1)})]})]})})]}),i("div",{className:"text-xs",children:[e("div",{className:"flex items-center justify-center",children:e("div",{children:"Terima Kasih Atas Kujungan Anda"})}),e("div",{className:"flex items-center justify-center uppercase",children:e("div",{children:"Semoga Lekas Sembuh"})})]})]})}export{M as default};
