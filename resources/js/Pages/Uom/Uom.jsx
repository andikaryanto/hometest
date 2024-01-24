import { url_uom } from "@/Common/Api";
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
import { uomListState, uomNewObject, uomState } from "@/States/Uom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";

export default function Uom({ title, item, onSubmit, ...props }) {
    const [uom, setUom] = useRecoilState(uomState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if(uom.id == 0){
            post(url_uom, getToken(), uom)
            .then(result => {
                if(result.status == 201) {
                    setToast({
                        color: ToastColor.success,
                        message: "Data berhasil disimpan"
                    });
                    setUom(uomNewObject);
                    onSubmit();
                }            
                setProcessing(false);
            }).catch(err => {              
                setProcessing(false); 
                setToast({
                    color: ToastColor.danger,
                    message: "Data gagal disimpan"
                }) 
            });
        } else {
            patch(url_uom + '/' + uom.id, getToken(), uom)
            .then(result => {
                if(result.status == 200) {
                    setUom(result.data.data._resources);
                    setToast({
                        color: ToastColor.success,
                        message: "Data berhasil disimpan"
                    });
                    onSubmit();
                }            
                setProcessing(false);
            }).catch(err => {
              
                setProcessing(false);
                setToast({
                    color: ToastColor.danger,
                    message: "Data gagal disimpan"
                })  
            });
        }
    }
    const onEdit = (uom) => {
        // openSidebar();
        setUom(uom)
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_uom + '/' + uom.id, getToken())
        .then(result => {
            if(result.status == 200) {
                setToast({
                    color: ToastColor.success,
                    message: "Data berhasil dihapus"
                });
                setUom(uomNewObject);
                onSubmit();
            }            
            setProcessing(false);
        });
    }


    return (
        <div className="w-full">
           
            {uom ? <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                <div className="mb-5 text-2xl">{uom.id != 0 ? 'Edit': 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={uom.name}
                            className="mt-1 block w-full h-8"
                            isFocused={true}
                            onChange={(e) => setUom({ ...uom, name: e.target.value })}
                        />

                        {/* <InputError message={errors.email} className="mt-2" /> */}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Deskripsi" />

                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={uom.description}
                            className="mt-1 block w-full h-8"
                            onChange={(e) => setUom({ ...uom, description: e.target.value })}
                        />

                        {/* <InputError message={errors.password} className="mt-2" /> */}
                    </div>
                    <div className="flex items-center justify-end mt-6">

                        <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                            Simpan
                        </PrimaryButton>
                        <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || uom.id == null} onClick={onDelete}>
                            Hapus
                        </PrimaryButton>
                    </div>
                {/* </form> */}
            </Form> : null}
        </div>)
}