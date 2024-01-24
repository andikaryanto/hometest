import { url_clinic } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { destroy, patch, post } from "@/Common/Request/Request";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { Form } from "@/Components/Form";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { clinicListState, clinicNewObject, clinicState } from "@/States/Clinic";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";

export default function Clinic({ title, item, onSubmit, ...props }) {
    const [clinic, setClinic] = useRecoilState(clinicState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToats] = useRecoilState(toastState);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if(clinic.id == 0){
            post(url_clinic, getToken(), clinic)
            .then(result => {
                if(result.status == 201) {
                    setClinic(clinicNewObject);
                    setToats({
                        color: ToastColor.success,
                        message: "Data berhasil disimpan"
                    });
                    onSubmit();
                }            
                setProcessing(false);
            }).catch(err => {              
                setProcessing(false);  
                setToats({
                    color: ToastColor.danger,
                    message: "Data gagal disimpan"
                })  
            });
        } else {
            patch(url_clinic + '/' + clinic.id, getToken(), clinic)
            .then(result => {
                if(result.status == 200) {
                    setClinic(result.data.data._resources);
                    setToats({
                        color: ToastColor.success,
                        message: "Data berhasil disimpan"
                    });
                    onSubmit();
                }            
                setProcessing(false);
            }).catch(err => {
                setToats({
                    color: ToastColor.danger,
                    message: "Data gagal disimpan"
                });
                setProcessing(false);  
            });
        }
    }
    const onEdit = (clinic) => {
        // openSidebar();
        setClinic(clinic)
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_clinic + '/' + clinic.id, getToken())
        .then(result => {
            if(result.status == 200) {
                setClinic({
                    id: null,
                    name: '',
                    description: ''
                });
                onSubmit();
            }            
            setProcessing(false);
        });
    }


    return (
        <div className="w-full">
           
            {clinic ? <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                <div className="mb-5 text-2xl">{clinic.id != 0 ? 'Edit': 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={clinic.name}
                            className="mt-1 block w-full h-8"
                            isFocused={true}
                            onChange={(e) => setClinic({ ...clinic, name: e.target.value })}
                        />

                        {/* <InputError message={errors.email} className="mt-2" /> */}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Deskripsi" />

                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={clinic.description}
                            className="mt-1 block w-full h-8"
                            onChange={(e) => setClinic({ ...clinic, description: e.target.value })}
                        />

                        {/* <InputError message={errors.password} className="mt-2" /> */}
                    </div>
                    <div className="flex items-center justify-end mt-6">

                        <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                            Simpan
                        </PrimaryButton>
                        <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || clinic.id == null} onClick={onDelete}>
                            Hapus
                        </PrimaryButton>
                    </div>
                {/* </form> */}
            </Form> : null}
        </div>)
}