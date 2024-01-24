import { getToken } from "@/Common/GetCookie";
import { destroy, patch, post } from "@/Common/Request/Request";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClinicListSelectInput from "../Clinic/ClinicListSelectInput";
import { useRecoilState } from "recoil";
import { treatmentNewObject, treatmentState } from "@/States/Treatment";
import { Form } from "@/Components/Form";
import { url_treatment } from "@/Common/Api";
import { toastState } from "@/States/Common";
import Toast from "@/Components/Toast";
import { ToastColor } from "@/Common/Toast";

export default function Treatment({ title, onSubmit, ...props }) {
    const [treatment, setTreatment] = useRecoilState(treatmentState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (treatment.id == null) {
            post('/treatment', getToken(), treatment)
                .then(result => {
                    if (result.status == 201) {
                        setTreatment({
                            ...treatmentNewObject,
                            clinic: result.data.data._resources.clinic
                        });
                        setToast({
                            color: ToastColor.success,
                            message: 'Data tersimpan'
                        })
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: 'Data gagal disimpan'
                    })
                    setProcessing(false);
                });
        } else {
            patch('/treatment/' + treatment.id, getToken(), treatment)
                .then(result => {
                    if (result.status == 200) {
                        setToast({
                            color: ToastColor.success,
                            message: 'Data tersimpan'
                        });
                        setTreatment(result.data.data._resources)
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: 'Data gagal disimpan'
                    });
                    setProcessing(false);
                });
        }
    }

    const onEdit = (treatment) => {
        setTreatment(treatment)
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_treatment + '/' + treatment.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setToast({
                        color: ToastColor.success,
                        message: 'Data terhapus'
                    })
                    setTreatment(treatmentNewObject);
                    onSubmit();
                }
                setProcessing(false);
            }).catch(err => {
                setToast({
                    color: ToastColor.success,
                    message: 'Data gagal dihapus'
                })
                setProcessing(false);
            });
    }

    const onSelect = (item) => {
        setTreatment({
            ...treatment,
            clinic: item
        })
    }

    useEffect(() => {
        // if(item && Object.entries(item).length > 0) {
        //     setTreatment({
        //         ...item,
        //         clinic: item._resources.clinic
        //     });
        // }
    }, [])



    return (
        <div className="w-full ">
            {treatment ? <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                <div className="mb-5 text-2xl">{treatment.id != null ? 'Edit' : 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                {/* <div>
                    <InputLabel htmlFor="clinic" value="Poli" />

                    <ClinicListSelectInput className='h-8 w-96' onSelect={onSelect} item={treatment.clinic} />

                </div> */}
                <div className="mt-4">
                    <InputLabel htmlFor="code" value="Nama" />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={treatment.name}
                        className="mt-1 block w-full h-8"
                        isFocused={true}
                        onChange={(e) => setTreatment({ ...treatment, name: e.target.value })}
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="JM Perawat" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={treatment.health_worker_price}
                        className="mt-1 block w-full h-8"
                        isFocused={true}
                        onChange={(e) => setTreatment({ ...treatment, health_worker_price: e.target.value })}
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="JM Dokter" />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={treatment.doctor_price}
                        className="mt-1 block w-full h-8"
                        onChange={(e) => setTreatment({ ...treatment, doctor_price: e.target.value })}
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="JM Apoteker" />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={treatment.pharmacist_price}
                        className="mt-1 block w-full h-8"
                        onChange={(e) => setTreatment({ ...treatment, pharmacist_price: e.target.value })}
                    />

                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Klinic" />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={treatment.clinic_price}
                        className="mt-1 block w-full h-8"
                        onChange={(e) => setTreatment({ ...treatment, clinic_price: e.target.value })}
                    />

                </div>
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                        Simpan
                    </PrimaryButton>
                    <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || treatment.id == null} onClick={onDelete}>
                        Hapus
                    </PrimaryButton>
                </div>
                {/* </form> */}
            </Form> : null}
        </div>)
}