import { url_genders } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { genderNewObject } from "@/States/Gender";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function GenderInputList({ onSelect, item, ...props }) {

    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [genders, setGenders] = useState({
        _resources: [],
        _paging: {}
    });

    const [gender, setGender] = useState({
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

    const loadGenders = (params = {}) => {
        const accessToken = getToken();
        get(url_genders, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setGenders(result.data.data);
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
        loadGenders({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setGender({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(genderNewObject);
        setGender({
            ...genderNewObject,
            concat_name: ''
        });
    }

    useEffect(() => {
        loadGenders(paging);
        if (item && Object.entries(item).length > 0) {
            setGender({
                ...item,
                concat_name: item.id > 0 ? item.id + '~' + item.name: ''
            });
        }
    }, [item])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear}  value={gender.concat_name} placeholder={'Cari jenis kelamin...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Jenis Kelamin'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={genders._paging.page}
            size={genders._paging.limit}
            totalData={genders._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {genders._resources.map((e, i) => {
                const number = ((genders._paging.page - 1) * genders._paging.limit) + i + 1;
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