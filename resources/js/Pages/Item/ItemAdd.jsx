import { getToken } from "@/Common/GetCookie";
import { destroy, get, patch, post } from "@/Common/Request/Request";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { itemNewObject, itemState } from "@/States/Item";
import { Form } from "@/Components/Form";
import { url_item } from "@/Common/Api";
import { usePage } from "@inertiajs/react";
import getParameterValue from "@/Common/Helper";
import UomListPopoverInput from "../Uom/UomListPopoverInput";
import Tabs from "@/Components/Tabs";
import { FaInfoCircle } from "react-icons/fa";
import Popover from "@/Components/Popover";
import ItemMarginListPopoverSearch from "../ItemMargin/ItemMarginListPopoverSearch";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";

export default function ItemAdd({ title, onSubmit, ...props }) {
    const [item, setItem] = useRecoilState(itemState);
    const [processing, setProcessing] = useState(false);
    const [isShowPopover, setShowPopover] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);
    const activeMenuItem = usePage();
    const itemTypeId = getParameterValue(activeMenuItem, 'item_type_id');
    const id = getParameterValue(activeMenuItem, 'id');
    if (itemTypeId == 1)
        title = 'Obat';

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (item.id == 0) {
            post(url_item, getToken(), {
                ...item,
                item_type: {
                    id: itemTypeId
                }
            })
                .then(result => {
                    if (result.status == 201) {
                        setItem(result.data.data._resources);
                        setToast({
                            color: ToastColor.success,
                            message: "Data berhasil disimpan"
                        })
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: "Data gagal disimpan " + err.message
                    })
                    setProcessing(false);
                });
        } else {
            patch(url_item + '/' + item.id, getToken(), item)
                .then(result => {
                    if (result.status == 200) {
                        setToast({
                            color: ToastColor.success,
                            message: "Data berhasil disimpan"
                        })
                        setItem(result.data.data._resources)
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setToast({
                        color: ToastColor.danger,
                        message: "Data gagal disimpan " + err.message
                    })

                    setProcessing(false);
                });
        }
    }

    const getItem = () => {
        get(url_item + '/' + id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setItem(result.data.data._resources);
                }
            })
            .catch(err => {

            })
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_item + '/' + item.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setToast({
                        color: ToastColor.success,
                        message: "Data berhasil dihapus"
                    })
                    setItem(itemNewObject);
                    onSubmit();
                }
                setProcessing(false);
            });
    }

    const onSelectUom = (uom) => {
        setItem({
            ...item,
            uom: uom
        })
    }
    const onSelectItemMargin = (itemMargin) => {
        setItem({
            ...item,
            item_margin: itemMargin
        })
    }

    const toggleUnitConvertionInformation = () => {
        setShowPopover(true);
    }
    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    useEffect(() => {
        if(id > 0)
            getItem();
    }, [id]);

    return (
        <div className="mb-10 w-ful">
            {item ? <Tabs headers={["Master Item"]}>
                <div className="w-full">
                    <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                        {/* <form onSubmit={() => { }}> */}
                        <div className="mt-4">
                            <InputLabel htmlFor="code" value="Kode" />

                            <TextInput
                                id="code"
                                type="text"
                                name="code"
                                value={item.code}
                                className="mt-1 block w-full h-8"
                                isFocused={true}
                                onChange={(e) => setItem({ ...item, code: e.target.value })}
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nama" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={item.name}
                                className="mt-1 block w-full h-8"
                                isFocused={true}
                                onChange={(e) => setItem({ ...item, name: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Harga Jual per Unit" />

                            <TextInput
                                id="name"
                                type="number"
                                name="name"
                                value={item.price_per_unit}
                                className="mt-1 block w-full h-8"
                                isFocused={true}
                                onChange={(e) => setItem({ ...item, price_per_unit: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Margin" />

                            <TextInput
                                id="name"
                                type="number"
                                name="name"
                                value={item.margin}
                                className="mt-1 block w-full h-8"
                                isFocused={true}
                                onChange={(e) => setItem({ ...item, margin: e.target.value })}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="clinic" value="Ukuran (Satuan Penjualan)" />

                            <UomListPopoverInput className='h-8 w-96' onSelect={onSelectUom} item={item.uom} />

                            {/* <InputError message={errors.email} className="mt-2" /> */}
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="clinic" value="Margin Penjualan" />

                            <ItemMarginListPopoverSearch className='h-8 w-96' onSelect={onSelectItemMargin} item={item.item_margin} />

                            {/* <InputError message={errors.email} className="mt-2" /> */}
                        </div>
                        <div className="flex items-center justify-end mt-4">

                            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                                Simpan
                            </PrimaryButton>
                            <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || item.id == null} onClick={onDelete}>
                                Hapus
                            </PrimaryButton>
                        </div>
                        {/* </form> */}
                    </Form>
                </div>
                <div>
                    <div className="flex justify-end">
                        <FaInfoCircle className="cursor-pointer" onClick={toggleUnitConvertionInformation} />
                        <Popover className={`w-80`} isOpen={isShowPopover} onPopoverState={popUpState}>
                            <div className="border-b-2 text-xl">Petunjuk Konversi Unit</div>
                            <div className="mt-4">
                                Konversi unit digunakan untuk mengonvesi satuan item ke satuan penjualan.
                                <div className="mt-2">Contoh:</div>
                                <div>
                                    Jika unit penjualan adalah "PCS" dan barang yang masuk adalah dalam bentuk "BOX"
                                    maka saat pembelian barang / pemasukan barang, kuantitas akan di konversi dari BOX ke PCS
                                    misal 1 Box beris 20 PCS, maka pebelian barang dengan unit BOX akan di masukan dalam bentuk PCS yaitu 20 PCS,
                                    
                                </div>                                
                                <div className="mt-2">Contoh 2:</div>
                                <div>
                                    Jika unit penjualan adalah "PCS" dan memiliki tingkatan konversi, KARTON &#8594; BOX &#8594; PCS.
                                    1 KARTON berisi 2 BOX, 2 BOX berisi 20 PCS, makan akan dihitung 1 x 2 x 20 akan menjadi 40 PCS.
                                </div>
                                <div className="mt-4">
                                    NOTE: urutkan konversi dari terbesar sampai ke unit penjualan.
                                </div>
                            </div>
                        </Popover>
                    </div>
                </div>
            </Tabs> : null}
        </div>
    )

}