import { url_medical_checkup_compound, url_medical_checkup_item, url_medical_checkup_items } from "@/Common/Api";
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
import { medicalCheckupCompoundState, medicalCheckupCompoundNewObject, medicalCheckupCompoundListState } from "@/States/MedicalCheckupCompound";
import { useEffect, useState } from "react";
import { FaCheck, FaCheckCircle, FaCheckSquare, FaPlus, FaTrash } from "react-icons/fa";
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
import { medicalCheckupItemNewObject } from "@/States/MedicalCheckupItem";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import { DisposableTextInput } from "@/Components/Input/DisposeTextInput";
import { ClearButton } from "@/Components/Button/ClearButton";

export default function MedicalCheckupCompound({ title, item, onSubmit, medicalCheckup, ...props }) {

    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [medicalCheckupCompouds, setMedicalCheckupCompounds] = useRecoilState(medicalCheckupCompoundListState);
    const [toast, setToats] = useRecoilState(toastState);

    const onAddCompound = () => {
        post(url_medical_checkup_compound, getToken(), {
            medical_checkup: medicalCheckup,
            ordering: medicalCheckupCompouds.length + 1
        })
            .then(result => {
                if (result.status == 201) {
                    setMedicalCheckupCompounds(existed => [...existed, {
                        ...result.data.data._resources
                    }]);
                    setToats({
                        color: ToastColor.success,
                        message: ResponseMessages.data_saved
                    })

                }
            })
            .catch(err => {
                setToats({
                    color: ToastColor.danger,
                    message: ResponseMessages.data_failed_to_save
                })
            });

    }

    const onAddCompoundItem = (index, item) => {
        const medicalCheckupItems = item.medical_checkup_items ? item.medical_checkup_items : []
        const newItem = {
            ...item,
            medical_checkup_items: [
                ...medicalCheckupItems,
                medicalCheckupItemNewObject
            ]
        };

        onMedicalCheckupItemChange(index, newItem);
    };

    const onDeleteCompund = (index, item) => {
        if (item.id > 0) {
            destroy(url_medical_checkup_compound + '/' + item.id, getToken())
            .then(result => {
                if(result.status == 200) {
                    setMedicalCheckupCompounds((prevArray) => {
                        // Create a new array without the item at the specified index
                        const newArray = prevArray.filter((item, i) => i !== index);
                        return newArray;
                    });

                    setToats({
                        color: ToastColor.success,
                        message: ResponseMessages.data_removed
                    })
                }
            })
            .catch(e => {
                setToats({
                    color: ToastColor.danger,
                    message: ResponseMessages.data_failed_to_save
                })
            });
        } else {
            setMedicalCheckupCompounds((prevArray) => {
                // Create a new array without the item at the specified index
                const newArray = prevArray.filter((item, i) => i !== index);
                return newArray;
            });
        }
    }

    const onMedicalCheckupItemChange = (index, item) => {
        setMedicalCheckupCompounds((prevArray) => {
            // Create a new array with the updated item
            const newArray = [...prevArray];
            newArray[index] = item;
            return newArray;
        });
    }

    const onItemChange = (compoundIndex, medicalCheckupItemIndex, compound, medicalCheckupItem, item) => {
        medicalCheckupItem = {
            ...medicalCheckupItem,
            item
        }

        const medicalCheckupItems = [
            ...compound.medical_checkup_items
        ];
        medicalCheckupItems[medicalCheckupItemIndex] = medicalCheckupItem;

        const newCompound = {
            ...compound,
            medical_checkup_items: medicalCheckupItems
        };

        onMedicalCheckupItemChange(compoundIndex, newCompound);
    }

    const onAddMedicalCheckupItem = (compoundIndex, medicalCheckupItemIndex, compound, medicalCheckupItem) => {
        if(medicalCheckupItem.id == 0) {
            post(url_medical_checkup_item, getToken(), {
                ...medicalCheckupItem,
                medical_checkup_compound: compound
            }).then(result => {
                if(result.status == 201){
                    const createdMedicalCheckupItem = result.data.data._resources;
                    onItemChange(compoundIndex, medicalCheckupItemIndex, compound, createdMedicalCheckupItem, createdMedicalCheckupItem.item);
                    setToats({
                        color: ToastColor.success,
                        message: ResponseMessages.data_saved
                    })
                }
            })
            .catch(err => {
                setToats({
                    color: ToastColor.danger,
                    message: ResponseMessages.data_failed_to_save
                })
            })
        } else {
            patch(url_medical_checkup_item + '/' + medicalCheckupItem.id, getToken(), {
                ...medicalCheckupItem,
                medical_checkup_compound: compound
            }).then(result => {
                if(result.status == 200){
                    const createdMedicalCheckupItem = result.data.data._resources;
                    onItemChange(compoundIndex, medicalCheckupItemIndex, compound, createdMedicalCheckupItem, createdMedicalCheckupItem.item);
                    setToats({
                        color: ToastColor.success,
                        message: ResponseMessages.data_saved
                    })
                }
            })
            .catch(err => {
                setToats({
                    color: ToastColor.danger,
                    message: ResponseMessages.data_failed_to_save
                })
            })
        }
    }

    const onSelectItem = (compoundIndex, medicalCheckupItemIndex, compound, medicalCheckupItem, selectedItem) => {
        medicalCheckupItem = {
            ...medicalCheckupItem,
            price_per_unit: selectedItem.price_per_unit,
            item: selectedItem
        }
        onItemChange(compoundIndex, medicalCheckupItemIndex, compound, medicalCheckupItem, selectedItem);
    }

    useEffect(() => {
        if (medicalCheckup.medical_checkup_compounds) {
            setMedicalCheckupCompounds(medicalCheckup.medical_checkup_compounds)
        }
    }, [medicalCheckup])

    return (
        <div className="w-full">
            <div className={`mb-5 text-lg font-semibold ${bigFontColorTheme} flex justify-between`}>
                <div>Obat Racik</div>
                <PrimaryButton className={`h-8 mr-2 bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center`}
                    onClick={onAddCompound} >
                    <div className="mr-2">Tambah Racikan</div><FaPlus />
                </PrimaryButton>
            </div>
            {medicalCheckupCompouds && medicalCheckupCompouds.map((compound, i) => {
                return <div>
                    <div className={`flex items-center ${i > 0 ? 'mt-6' : ''}`}>
                        <div className="mr-6">Racikan {i + 1}</div>
                        <ClearButton className="mr-4" onClick={() => onAddCompoundItem(i, compound)}>
                            <FaPlus />
                        </ClearButton>
                        <ClearButton className="mr-4" onClick={() => onDeleteCompund(i, compound)}>
                            <FaTrash className="text-red-600" />
                        </ClearButton>
                    </div>
                    {compound.medical_checkup_items && compound.medical_checkup_items.map((medicalCheckupItem, j) => {
                        return <div className="pl-10 flex justify-start items-baseline mb-3">
                            <div>
                                <span className={`text-xs`}>Obat</span>
                                <ItemListPopoverSearch disposable={true}
                                    inStockOnly={true}
                                    itemTypeId={1}
                                    currentItem={medicalCheckupItem.item}
                                    onSelect={selectedItem => {
                                        onSelectItem(i, j, compound, medicalCheckupItem, selectedItem)
                                    }}
                                    className='h-8 w-96 mr-2'
                                />
                                <span className={`text-xs ${medicalCheckupItem.id == 0 ? 'text-red-600' : ''}`}>{medicalCheckupItem.id == 0 ? 'belum disimpan' : ''}</span>
                            </div>
                            <div className="ml-10">
                                <span className={`text-xs`}>Jumlah</span>
                                <TextInput
                                    id="name"
                                    type="number"
                                    name="name"
                                    value={medicalCheckupItem.quantity}
                                    className=" mt-1 block h-8 w-24"
                                    onChange={(e) => onSelectItem(i, j, compound, { ...medicalCheckupItem, quantity: e.target.value }, medicalCheckupItem.item)}
                                />                            
                            </div>

                            <div className="ml-10">
                                <span className={`text-xs`}>Signa</span>
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={medicalCheckupItem.signa}
                                    className="mt-1 block h-8"
                                    onChange={(e) => onSelectItem(i, j, compound, { ...medicalCheckupItem, signa: e.target.value }, medicalCheckupItem.item)}
                                />
                            </div>
                            
                            <div className="ml-10">
                                <span className={`text-xs`}>Catatan</span>
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={medicalCheckupItem.note}
                                    className="mt-1 block h-8"
                                    onChange={(e) => onSelectItem(i, j, compound, { ...medicalCheckupItem, note: e.target.value }, medicalCheckupItem.item)}
                                />
                            </div>
                            <div className="ml-10 flex items-end mt-auto">
                                <ClearButton className="flex mr-4 " onClick={() => onAddMedicalCheckupItem(i, j, compound, medicalCheckupItem)}>
                                    <FaCheck className="text-green-600" />
                                </ClearButton>
                                <ClearButton className="mr-4" onClick={() => onAddCompoundItem(i, compound)}>
                                    <FaTrash className="text-red-600" />
                                </ClearButton>
                            </div>
                        </div>
                    })}

                </div>
            })}
        </div>)
}