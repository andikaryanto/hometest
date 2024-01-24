import { url_items } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { formatCurrency } from "@/Common/Helper";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import Pill from "@/Components/Pill/Pill";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { itemNewObject } from "@/States/Item";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function ItemListPopoverSearch({ onSelect, currentItem, itemTypeId, disposable = false, inStockOnly = false, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [items, setItems] = useState({
        _resources: [],
        _paging: {}
    });

    const [item, setItem] = useState(itemNewObject);

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState({
        page: 1,
        size: 5,
        keyword: '',
        order_by: 'id',
        order_direction: 'ASC'
    });

    const loadItems = (params = {}) => {
        if (itemTypeId) {
            params = {
                ...params,
                item_type_id: itemTypeId
            }
        }

        if(inStockOnly) {
            params = {
                ...params,
                in_stock: true
            }
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

    const select = (item) => {
        onSelect(item);
        setItem({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(itemNewObject);
        setItem({
            ...itemNewObject,
            concat_name: ''
        });
    }

    useEffect(() => {
        loadItems(paging);
        if (currentItem && Object.entries(currentItem).length > 0) {
            setItem({
                ...currentItem,
                concat_name: currentItem.id > 0 ? currentItem.id + '~' + currentItem.name : ''
            });
        }
    }, [currentItem])

    const headers = ['No', 'Nama', 'Stok', 'Aksi'];
    return <PopoverInput {...props}
        disposable={disposable} 
        onClear={onClear}
        value={item.concat_name}
        placeholder={'Cari barang...'}
        onChange={onSearch}
        onPopoverState={popUpState}
        isOpen={showPopover}
    >
        <Table text={'Barang'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={items._paging.page}
            size={items._paging.limit}
            totalData={items._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {items._resources.map((e, i) => {
                const number = ((items._paging.page - 1) * items._paging.limit) + i + 1;
                return <TableRow key={i}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        <div className="flex items-center">
                            <div className="mr-2">
                                {e.name}
                            </div>
                            <Pill className="text-xs bg-blue-600 text-white mr-2">{e.uom.name}</Pill>
                        </div>
                        <div className="flex items-center">
                            <Pill className="text-xs bg-green-600 text-white mr-2">{formatCurrency(e.sell_price)}</Pill>
                        </div>
                    </TableDetail>
                    <TableDetail>{e.item_stock ? e.item_stock.quantity: 0}</TableDetail>
                    <TableDetail className={'items-center'}>
                        <BorderedRoundedButtonSmall onClick={() => select(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Pilih</BorderedRoundedButtonSmall>
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </PopoverInput>
}