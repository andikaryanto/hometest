import { url_item_movement } from "@/Common/Api";
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
import { itemMovementListState, itemMovementNewObject, itemMovementState } from "@/States/ItemMovement";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import MovementTypeListPopoverSearch from "../MovementType/MovementTypeListPopoberSearch";
import ItemMovementItemList from "../ItemMoveventItem/ItemMovementItemtList";

export default function ItemMovement({ title, item, onSubmit, ...props }) {
    const [itemMovement, setItemMovement] = useRecoilState(itemMovementState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToats] = useRecoilState(toastState);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (itemMovement.id == 0) {
            post(url_item_movement, getToken(), itemMovement)
                .then(result => {
                    if (result.status == 201) {
                        setItemMovement(result.data.data._resources);
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
            patch(url_item_movement + '/' + itemMovement.id, getToken(), itemMovement)
                .then(result => {
                    if (result.status == 200) {
                        setItemMovement(result.data.data._resources);
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
    const onEdit = (itemMovement) => {
        // openSidebar();
        setItemMovement(itemMovement)
    }

    const onSelectMovementType = (movementType) => {
        setItemMovement({
            ...itemMovement,
            movement_type: movementType
        })
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_item_movement + '/' + itemMovement.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setItemMovement({
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

            {itemMovement ? 
                <div className="flex justify-between">
                    <Form className={'w-1/4 text-gray-400 border-gray-200 border border-opacity-20 mr-10'}>
                        <div className="mb-5 text-2xl">{itemMovement.id != 0 ? 'Edit' : 'Tambah'} {title}</div>
                        {/* <form onSubmit={() => { }}> */}
                        <div>
                            <InputLabel htmlFor="name" value="Nama" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={itemMovement.movement_number}
                                readOnly={true}
                                className="mt-1 block w-full h-8"
                                isFocused={true}
                                placeholder={'[Otomatis Terisi]'}
                                onChange={(e) => setItemMovement({ ...itemMovement, movement_number: e.target.value })}
                            />

                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Deskripsi" />

                            <TextInput
                                id="description"
                                type="text"
                                name="description"
                                value={itemMovement.description}
                                className="mt-1 block w-full h-8"
                                onChange={(e) => setItemMovement({ ...itemMovement, description: e.target.value })}
                            />

                        </div>
                        <div className="w-full mr-2 mt-4">
                            <InputLabel htmlFor="clinic" value="Tipe" />

                            <MovementTypeListPopoverSearch item={itemMovement.movement_type} className='h-8 w-96 mr-2' onSelect={onSelectMovementType} />

                        </div>
                        <div className="flex items-center justify-end mt-6">

                            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                                Simpan
                            </PrimaryButton>
                            <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || itemMovement.id == null} onClick={onDelete}>
                                Hapus
                            </PrimaryButton>
                        </div>
                        {/* </form> */}
                    </Form>
                    <div className="w-full">
                        <ItemMovementItemList itemMovement={itemMovement} />
                    </div>
            </div> : null}
        </div>)
}