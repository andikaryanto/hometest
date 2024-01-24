import { url_villages, url_registration_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { villageNewObject } from "@/States/Village";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function VillageListPopoverSearch({ onSelect, item, clinic, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [villages, setVillages] = useState({
        _resources: [],
        _paging: {}
    });

    const [village, setVillage] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState({ ...pagingParameter(), size: 5 });

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadVillages = (params = {}) => {
        get(url_villages, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setVillages(result.data.data);
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
        loadVillages({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setVillage({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page
        });

        loadVillages({
            ...paging,
            page
        })

    }

    const onClear = () => {
        onSelect(villageNewObject);
        setVillage({
            ...villageNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        if (item && Object.entries(item).length > 0) {
            setVillage({
                ...item,
                concat_name: item.id > 0 ? item.id + '~' + item.name : ''
            });
        }
        loadVillages(paging);
    }, [item, clinic])

    const headers = ['No', 'Desa', 'Kecamatan', 'kabupaten', 'Provinsi', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={village.concat_name} placeholder={'Cari desa, kecamatan, kabupaten, provinsi...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Desa'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            onPageChanged={onPageChanged}
            page={villages._paging.page}
            size={villages._paging.limit}
            totalData={villages._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {villages._resources.map((e, i) => {
                const number = ((villages._paging.page - 1) * villages._paging.limit) + i + 1;
                return <TableRow key={i}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        {e.name}
                    </TableDetail>
                    <TableDetail>
                        {e.district.name}
                    </TableDetail>
                    <TableDetail>
                        {e.district.regency.name}
                    </TableDetail>
                    <TableDetail>
                        {e.district.regency.province.name}
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        <BorderedRoundedButtonSmall onClick={() => select(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Pilih</BorderedRoundedButtonSmall>
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </PopoverInput>
}