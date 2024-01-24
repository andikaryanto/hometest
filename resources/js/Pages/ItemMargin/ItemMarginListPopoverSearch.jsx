import { url_item_margins } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { itemMarginNewObject } from "@/States/ItemMargin";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function ItemMarginListPopoverSearch({ onSelect, item, ...props }) {

    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [itemMargins, setItemMargins] = useState({
        _resources: [],
        _paging: {}
    });

    const [itemMargin, setItemMargin] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

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

    const loadItemMargins = (params = {}) => {
        const accessToken = getToken();
        get(url_item_margins, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setItemMargins(result.data.data);
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
        loadItemMargins({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setItemMargin({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(itemMarginNewObject);
        setItemMargin({
            ...itemMarginNewObject,
            concat_name: ''
        });
    }

    useEffect(() => {
        loadItemMargins(paging);
        if (item && Object.entries(item).length > 0) {
            setItemMargin({
                ...item,
                concat_name: item.id > 0 ? item.id + '~' + item.name: ''
            });
        }
    }, [item])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear}  value={itemMargin.concat_name} placeholder={'Cari margin...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Margin'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={itemMargins._paging.page}
            size={itemMargins._paging.limit}
            totalData={itemMargins._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {itemMargins._resources.map((e, i) => {
                const number = ((itemMargins._paging.page - 1) * itemMargins._paging.limit) + i + 1;
                return <TableRow key={i}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        {e.name}
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        <BorderedRoundedButtonSmall onClick={() => select(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Pilih</BorderedRoundedButtonSmall>
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </PopoverInput>
}