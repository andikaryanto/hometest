import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
// import ItemMovementItem from "./ItemMovementItem";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { itemMovementItemListState, itemMovementItemNewObject, itemMovementItemState } from "@/States/ItemMovementItem";
import Loading from "@/Components/Loading";
import { url_item_movement_items, url_item_movements } from "@/Common/Api";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { pagingParameter } from "@/States/Common";
import ItemMovementItem from "./ItemMovementItem";
import { itemMovementListNewObject, itemMovementState } from "@/States/ItemMovement";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import { formatCurrency } from "@/Common/Helper";
import Pill from "@/Components/Pill/Pill";

export default function ItemMovementItemList({ itemMovement, ...props }) {

    const [itemMovementItems, setItemMovementItems] = useRecoilState(itemMovementItemListState)
    const [itemMovementItem, setItemMovementItem] = useRecoilState(itemMovementItemState)
    const [isFormOpen, setFormOpen] = useState(false);
    // const itemMovement = useRecoilValue(itemMovementState);

    const [paging, setPaging] = useState(pagingParameter());

    const loadItemMovementItems = (params = {}) => {
        params = {
            ...params,
            item_movement_id: itemMovement.id
        }
        const accessToken = getToken();
        get(url_item_movement_items, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setItemMovementItems(result.data.data);
                }

                else if (result.status == 204) {
                    setItemMovementItems(itemMovementListNewObject);
                }
            })
            .catch(err => {

            });
    }

    const onSearch = (e) => {
        setPaging({
            ...paging,
            keyword: e.target.value
        });
        loadItemMovementItems({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (itemMovementItem) => {
        setItemMovementItem(itemMovementItem);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadItemMovementItems({
            ...paging,
            page: page
        });
    }

    const onAddClick = () => {
        setItemMovementItem(itemMovementItemNewObject);
        setFormOpen(true);
    }

    const onManipluate = () => {
        loadItemMovementItems(paging)
    }

    useEffect(() => {
        loadItemMovementItems(paging);
    }, [itemMovement])

    const headers = ['No', 'Barang', 'Total Harga', 'Aksi'];
    return <div>
        {/* <SlideSideBar className={`w-1/4`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title="Data Keluar Masuk Barang"> */}
        <div className="flex">
            <ItemMovementItem title='Barang Masuk' onSubmit={onManipluate} />
        </div>
        {/* </SlideSideBar> */}
        <Table text={'Daftar Poli'} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
            onAddClick={onAddClick}
            page={itemMovementItems._paging.page}
            size={itemMovementItems._paging.limit}
            showAddButton={false}
            showRefresh={false}
            totalData={itemMovementItems._paging.total_data}>
            {itemMovementItems._resources && itemMovementItems._resources.map((e, i) => {
                const number = ((itemMovementItems._paging.page - 1) * itemMovementItems._paging.limit) + i + 1;
                return <TableRow onDoubleClick={() => onEdit(e)}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        <div>
                            {e.item.name}
                        </div>
                    </TableDetail>
                    <TableDetail position={"left"}>
                        <div className="text-xs pr-2">
                            {e.quantity} x {formatCurrency(e.price_per_unit)}
                        </div>
                        <div className="flex justify-end">
                            <Pill className={`bg-green-600 text-white h-6`}>
                                {formatCurrency(e.amount)}
                            </Pill>
                        </div>
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        {/* <CircleActionButton items={getActionButtonsItems()} selectedItem={e} onOptionClick={onButtonActionClick} className={`text-xs p-1 rounded-lg`}/> */}
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </div>
}