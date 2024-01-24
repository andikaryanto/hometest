import { AdminLayout } from "@/Layouts/AdminLayout";
import { useEffect, useState } from "react";
import { getCookie, getToken } from "@/Common/GetCookie";
import { get, patch, post } from "@/Common/Request/Request";
import { ModalClean } from "@/Components/Modal/ModalClean";
import { Table } from "@/Components/Table/Table";
import { TableRow } from "@/Components/Table/TableRow";
import { TableDetail } from "@/Components/Table/TableDetail";
import Item from "./ItemAdd";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemFilterState, itemListState, itemNewObject, itemState } from "@/States/Item";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { url_items } from "@/Common/Api";
import { usePage } from "@inertiajs/react";
import getParameterValue, { formatCurrency } from "@/Common/Helper";
import Pill from "@/Components/Pill/Pill";
import Config from "@/Common/Config";
import CircleActionButton from "@/Components/Button/CircleActionButton";
import ItemAdd from "./ItemAdd";

export default function ItemList() {
    const [item, setItem] = useRecoilState(itemState)
    const [items, setItems] = useRecoilState(itemListState);
    const [isFormOpen, setFormOpen] = useState(false);
    const itemFilter = useRecoilValue(itemFilterState);
    const activeMenuItem = usePage();
    const itemTypeId = getParameterValue(activeMenuItem, 'item_type_id');
    let title = null;

    if (itemTypeId == 1)
        title = 'Obat';

    if (itemTypeId == 2)
        title = 'Bahan Habis Pakai';

    const [paging, setPaging] = useState({
        page: 1,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    })

    const loadItems = (params = {}) => {
        params = {
            ...params,
            item_type_id: itemTypeId
        }
        const accessToken = getToken();
        get(url_items, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setItems(result.data.data);
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
        loadItems({
            ...paging,
            keyword: e.target.value
        });
    }

    const onEdit = (item) => {
        setItem(item);
        setFormOpen(true);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadItems({
            ...paging,
            page: page
        });
    }

    const onManipluate = () => {
        loadItems(paging)
    }

    const onFilterApply = () => {
        loadItems(paging);
    }

    const onAddClick = () => {
        // window.location = Config.web_url + '/item/add?item_type_id=' + itemTypeId
        setItem(itemNewObject);
        setFormOpen(true);
    }

    const getActionButtonsItems = () => {
        return [
            {
                caption: 'Edit',
                href: Config.web_url + '/item/add'
            }
        ];
    }

    const onButtonActionClick = (actionButton, selectedItem) => {
        if (actionButton.href != undefined && actionButton.caption == 'Edit') {
            window.location = actionButton.href + `?id=${selectedItem.id}&item_type_id=${itemTypeId}`;
        }
    }

    useEffect(() => {
        loadItems(paging);
    }, [])

    const headers = ['No', 'Kode', 'Item', 'Aksi'];
    return <AdminLayout textName={title} breadCrumbItems={[
        {
            label: "Apotek"
        }, {
            label: itemTypeId == 1 ? "Obat" : null
        }
    ]}>
        <div className="flex">
            <SlideSideBar title={title} className={`w-1/3`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false}>
                <div className="w-full">
                    <ItemAdd title={title} onSubmit={onManipluate} />
                </div>
            </SlideSideBar>
            <Table text={'Daftar '.title} columns={headers} onSearch={onSearch} onPageChanged={onPageChanged}
                onAddClick={onAddClick}
                page={items._paging.page}
                size={items._paging.limit}
                totalData={items._paging.total_data}>
                {items._resources ? items._resources.map((e, i) => {
                    const number = ((items._paging.page - 1) * items._paging.limit) + i + 1;
                    return <TableRow addSpace={true} onDoubleClick={() => onEdit(e)}>
                        <TableDetail>{number}</TableDetail>
                        <TableDetail>
                            {e.code}
                        </TableDetail>
                        <TableDetail>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    {e.name}
                                </div>
                                <Pill className="text-xs bg-blue-600 text-white mr-2">{e.item_stock ? e.item_stock.quantity : 0} {e.uom.name}</Pill>
                            </div>
                            <div className="flex items-center">
                                <Pill className="text-xs bg-green-600 text-white mr-2">{formatCurrency(e.sell_price)}</Pill>
                            </div>
                        </TableDetail>
                        <TableDetail className={'items-center'}>
                            <CircleActionButton items={getActionButtonsItems()} selectedItem={e} onOptionClick={onButtonActionClick} className={`text-xs p-1 rounded-lg`} />
                        </TableDetail>
                    </TableRow>
                }) : null}
            </Table>
        </div>
    </AdminLayout>
}