import { url_item_margins, url_movement_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { movementTypeNewObject } from "@/States/MovementType";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function MovementTypeListPopoverSearch({ onSelect, item, ...props }) {

    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [movementTypes, setMovementTypes] = useState({
        _resources: [],
        _paging: {}
    });

    const [movementType, setMovementType] = useState({
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

    const loadMovementTypes = (params = {}) => {
        const accessToken = getToken();
        get(url_movement_types, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setMovementTypes(result.data.data);
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
        loadMovementTypes({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setMovementType({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(movementTypeNewObject);
        setMovementType({
            ...movementTypeNewObject,
            concat_name: ''
        });
    }

    useEffect(() => {
        loadMovementTypes(paging);
        if (item && Object.entries(item).length > 0) {
            setMovementType({
                ...item,
                concat_name: item.id > 0 ? item.id + '~' + item.name: ''
            });
        }
    }, [item])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear}  value={movementType.concat_name} placeholder={'Cari type...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Jenis Kelamin'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={movementTypes._paging.page}
            size={movementTypes._paging.limit}
            totalData={movementTypes._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {movementTypes._resources.map((e, i) => {
                const number = ((movementTypes._paging.page - 1) * movementTypes._paging.limit) + i + 1;
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