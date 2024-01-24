import { url_medical_checkup_item, url_medical_checkup_items } from "@/Common/Api";
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
import { medicalCheckupItemConsumableState, medicalCheckupItemNewObject } from "@/States/MedicalCheckupItem";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { ResponseMessages } from "@/Common/ResponseMessages";
import ItemListPopoverSearch from "@/Pages/Item/ItemListPopoverSearch";
import { medicalCheckupState } from "@/States/MedicalCheckup";
import { medicalCheckupGigiState } from "@/States/MedicalCheckupFormGigi";
import { medicalCheckupUmumState } from "@/States/MedicalCheckupFormUmum";
import getParameterValue from "@/Common/Helper";
import { usePage } from "@inertiajs/react";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";
import { medicalCheckupMataState } from "@/States/MedicalCheckupFormMata";

export default function MedicalCheckupItemConsumable({ title, item, onSubmit, ...props }) {
    const {theme} = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const page = usePage();
    const checkupRecordId = getParameterValue(page, 'checkup_record_id');
    const clinic = getParameterValue(page, 'clinic');

    let state = null;
    if (clinic != null && clinic.toLowerCase() == 'gigi') {
        state = medicalCheckupGigiState;
    } else if (clinic != null && clinic.toLowerCase() == 'umum') {
        state = medicalCheckupUmumState;
    } else if (clinic != null && clinic.toLowerCase() == 'mata') {
        state = medicalCheckupMataState;
    }

    const [medicalCheckupItem, setMedicalCheckupItem] = useRecoilState(medicalCheckupItemConsumableState);
    const medicalCheckup = useRecoilValue(state);
    const [processing, setProcessing] = useState(false);
    const [toast, setToats] = useRecoilState(toastState);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (medicalCheckupItem.id == 0) {
            post(url_medical_checkup_item, getToken(), {
                ...medicalCheckupItem,
                medical_checkup: medicalCheckup
            })
                .then(result => {
                    if (result.status == 201) {
                        setMedicalCheckupItem({
                            ...medicalCheckupItemNewObject,
                            medical_checkup: medicalCheckup
                        });
                        setToats({
                            color: ToastColor.success,
                            message: ResponseMessages.data_saved
                        });
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setProcessing(false);
                    setToats({
                        color: ToastColor.danger,
                        message: ResponseMessages.data_failed_to_save
                    })
                });
        } else {
            patch(url_medical_checkup_item + '/' + medicalCheckupItem.id, getToken(), medicalCheckupItem)
                .then(result => {
                    if (result.status == 200) {
                        setMedicalCheckupItem({
                            ...result.data.data._resources,
                            medical_checkup: medicalCheckup
                        });
                        setToats({
                            color: ToastColor.success,
                            message: ResponseMessages.data_saved
                        });
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setToats({
                        color: ToastColor.danger,
                        message: ResponseMessages.data_failed_to_save
                    });
                    setProcessing(false);
                });
        }
    }
    const onEdit = (medicalCheckupItem) => {
        // openSidebar();
        setMedicalCheckupItem(medicalCheckupItem)
    }

    const onSelectItem = (item) => {
        setMedicalCheckupItem({
            ...medicalCheckupItem,
            item,
            price_per_unit: item.sell_price
        })
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_medicalCheckupItem + '/' + medicalCheckupItem.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckupItem({
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

            {medicalCheckupItem ? <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                <div className={`mb-5 text-lg font-semibold ${bigFontColorTheme}`}>{medicalCheckupItem.id != 0 ? 'Edit' : 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                <div className="w-full mr-4">
                    <InputLabel htmlFor="clinic" value="Barang" />

                    <ItemListPopoverSearch itemTypeId={2} inStockOnly={true} currentItem={medicalCheckupItem.item} className='h-8 w-96 mr-2' onSelect={onSelectItem} />

                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Kuantitas" />

                    <TextInput
                        id="description"
                        type="number"
                        name="description"
                        value={medicalCheckupItem.quantity}
                        className="mt-1 block w-full h-8"
                        onChange={(e) => setMedicalCheckupItem({ ...medicalCheckupItem, quantity: e.target.value })}
                    />

                    {/* <InputError message={errors.password} className="mt-2" /> */}
                </div>
                <div className="flex items-center justify-end mt-6">

                    <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                        Simpan
                    </PrimaryButton>
                    <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || medicalCheckupItem.id == 0} onClick={onDelete}>
                        Hapus
                    </PrimaryButton>
                </div>
                {/* </form> */}
            </Form> : null}
        </div>)
}