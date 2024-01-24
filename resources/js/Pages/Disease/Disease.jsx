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
import { diseaseNewObject, diseaseState } from "@/States/Disease";
import { Form } from "@/Components/Form";
import { url_disease } from "@/Common/Api";

export default function Disease({ title, onSubmit, ...props }) {
    const [disease, setDisease] = useRecoilState(diseaseState);
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (disease.id == 0) {
            post(url_disease, getToken(), disease)
                .then(result => {
                    if (result.status == 201) {
                        setDisease(result.data.data._resources);
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setProcessing(false);
                });
        } else {
            patch(url_disease + '/' + disease.id, getToken(), disease)
                .then(result => {
                    if (result.status == 200) {
                        setDisease(result.data.data._resources)
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {

                    setProcessing(false);
                });
        }
    }

    const onEdit = (disease) => {
        setDisease(disease)
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_disease + '/' + disease.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setDisease(diseaseNewObject);
                    onSubmit();
                }
                setProcessing(false);
            });
    }

    const onSelect = (item) => {
        setDisease({
            ...disease,
            clinic: item
        })
    }

    useEffect(() => {
        // if(item && Object.entries(item).length > 0) {
        //     setDisease({
        //         ...item,
        //         clinic: item._resources.clinic
        //     });
        // }
    }, [])



    return (
        <div className="w-full ">
            {disease ? <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                <div className="mb-5 text-2xl">{disease.id > 0 ? 'Edit' : 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                <div>
                    <InputLabel htmlFor="clinic" value="Poli" />

                    <ClinicListSelectInput className='h-8 w-96' onSelect={onSelect} item={disease.clinic} />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="code" value="Kode" />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={disease.code}
                        className="mt-1 block w-full h-8"
                        isFocused={true}
                        onChange={(e) => setDisease({ ...disease, code: e.target.value })}
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Nama" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={disease.name}
                        className="mt-1 block w-full h-8"
                        isFocused={true}
                        onChange={(e) => setDisease({ ...disease, name: e.target.value })}
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Keterangan" />

                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={disease.description}
                        className="mt-1 block w-full h-8"
                        onChange={(e) => setDisease({ ...disease, description: e.target.value })}
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                        Simpan
                    </PrimaryButton>
                    <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || disease.id == null} onClick={onDelete}>
                        Hapus
                    </PrimaryButton>
                </div>
                {/* </form> */}
            </Form> : null}
        </div>)
}