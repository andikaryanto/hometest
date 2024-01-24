import { url_item_movement, url_item_movement_item, url_item_movement_items } from "@/Common/Api";
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
import { itemMovementItemListState, itemMovementItemNewObject, itemMovementItemState } from "@/States/ItemMovementItem";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import MovementTypeListPopoverSearch from "../MovementType/MovementTypeListPopoberSearch";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";
import ItemListPopoverSearch from "../Item/ItemListPopoverSearch";
import UomListPopoverInput from "../Uom/UomListPopoverInput";
import { itemMovementState } from "@/States/ItemMovement";
// import ItemMovementItemItemList from "../ItemMoveventItem/ItemMovementItemItemtList";

export default function ItemMovementItem({ title, item, onSubmit, ...props }) {
    const { theme } = useTheme();
    const { borderedBottomTheme } = applicationTheme(theme);
    const [itemMovementItem, setItemMovementItem] = useRecoilState(itemMovementItemState);
    const itemMovement = useRecoilValue(itemMovementState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToats] = useRecoilState(toastState);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (itemMovementItem.id == 0) {
            post(url_item_movement_item, getToken(), {
                ...itemMovementItem,
                item_movement: itemMovement
            })
                .then(result => {
                    if (result.status == 201) {
                        setItemMovementItem(itemMovementItemNewObject);
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
            patch(url_item_movement_item + '/' + itemMovementItem.id, getToken(), itemMovementItem)
                .then(result => {
                    if (result.status == 200) {
                        setItemMovementItem(result.data.data._resources);
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
    const onEdit = (itemMovementItem) => {
        // openSidebar();
        setItemMovementItem(itemMovementItem)
    }

    const onSelectUom = (uom) => {
        setItemMovementItem({
            ...itemMovementItem,
            uom
        })
    }

    const onSelectItem = (item) => {
        setItemMovementItem({
            ...itemMovementItem,
            item,
            uom: item.uom
        })
    }

    const onNew = () => {
        setItemMovementItem(itemMovementItemNewObject);
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_item_movement_item + '/' + itemMovementItem.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setItemMovementItem(itemMovementItemNewObject);
                    onSubmit();
                }
                setProcessing(false);
            });
    }


    return (
        <div className="w-full">

            {itemMovementItem ?
                <div className={`flex justify-between pb-4 ${borderedBottomTheme}`}>
                    <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20'}>
                        <div className="px-4 mb-5 mt-12 text-2xl"></div>
                        <div className="flex pl-4 mb-4 justify-between">
                            <div className="w-full mr-4">
                                <InputLabel htmlFor="clinic" value="Barang" />

                                <ItemListPopoverSearch currentItem={itemMovementItem.item} className='h-8 w-96 mr-2' onSelect={onSelectItem} />

                            </div>
                            <div className="w-full mr-4">
                                <InputLabel htmlFor="clinic" value="Unit" />

                                <UomListPopoverInput readOnly={true} item={itemMovementItem.uom} className='h-8 w-96 mr-2' onSelect={onSelectUom} />

                            </div>
                        </div>
                        <div className="flex pl-4 justify-between">
                            <div className="w-full mr-4">
                                <InputLabel htmlFor="name" value="Kuantitas" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={itemMovementItem.quantity}
                                    className="mt-1 block w-full h-8"
                                    placeholder={'[Otomatis Terisi]'}
                                    onChange={(e) => setItemMovementItem({ ...itemMovementItem, quantity: e.target.value })}
                                />

                            </div>
                            <div className=" w-full mr-4">
                                <InputLabel htmlFor="name" value="Harga per unit" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={itemMovementItem.price_per_unit}
                                    className="mt-1 block w-full h-8"
                                    placeholder={'[Otomatis Terisi]'}
                                    onChange={(e) => setItemMovementItem({ ...itemMovementItem, price_per_unit: e.target.value })}
                                />
                            </div>

                            <div className="w-full mr-4">
                                <InputLabel htmlFor="description" value="Distributor" />

                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={itemMovementItem.distributor}
                                    className="mt-1 block w-full h-8"
                                    onChange={(e) => setItemMovementItem({ ...itemMovementItem, distributor: e.target.value })}
                                />

                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pr-4">
                            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing || itemMovement.id == 0} onClick={onNew}>
                                Baru
                            </PrimaryButton>
                            <div className="flex justify-end">
                                <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing || itemMovement.id == 0 || itemMovementItem.id > 0} onClick={submit}>
                                    {'Simpan'}
                                </PrimaryButton>
                                <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || itemMovementItem.id == 0} onClick={onDelete}>
                                    Hapus
                                </PrimaryButton>
                            </div>
                        </div>
                        {/* </form> */}
                    </Form>
                </div> : null}
        </div>)
}