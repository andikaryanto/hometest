import { url_uoms } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { uomNewObject } from "@/States/Uom";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function UomListPopoverInput({ onSelect, item, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);

    const [uoms, setUoms] = useState({
        _resources: [],
        _paging: {}
    });

    const [uom, setUom] = useState({
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
        order_direction: 'DESC'
    });

    const loadUoms = (params = {}) => {
        const accessToken = getToken();
        get(url_uoms, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setUoms(result.data.data);
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
        loadUoms({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setUom({
            ...item,
            concat_name:  item.id > 0 ? item.id + '~' + item.name : null
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(uomNewObject);
        setUom({
            ...uomNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        if (item && Object.entries(item).length > 0) {   
            setUom({
                ...item,
                concat_name:  item.id > 0 ? item.id + '~' + item.name : null
            });
        }
        loadUoms(paging);
    }, [item])

    const headers = ['No', 'Nama', 'Keterangan', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={uom.concat_name} placeholder={'Cari ukuran...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Daftar Item'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={uoms._paging.page}
            size={uoms._paging.limit}
            totalData={uoms._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {uoms._resources.map((e, i) => {
                const number = ((uoms._paging.page - 1) * uoms._paging.limit) + i + 1;
                return <TableRow key={i}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        {e.name}
                    </TableDetail>
                    <TableDetail>
                        {e.description}
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        <BorderedRoundedButtonSmall onClick={() => select(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Pilih</BorderedRoundedButtonSmall>
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </PopoverInput>
}