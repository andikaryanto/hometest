import { url_visit_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { visitTypeNewObject } from "@/States/VisitType";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function VisitTypeListPopoverSearch({ onSelect, item, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);

    const [visitTypes, setVisitTypes] = useState({
        _resources: [],
        _paging: {}
    });

    const [visitType, setVisitType] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadVisitTypes = (params = {}) => {

        get(url_visit_types, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setVisitTypes(result.data.data);
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
        loadVisitTypes({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setVisitType({
            ...item,
            concat_name:  item.id > 0 ? item.id + '~' + item.name : null
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(visitTypeNewObject);
        setVisitType({
            ...visitTypeNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        if (item && Object.entries(item).length > 0) {
            setVisitType({
                ...item,
                concat_name:  item.id > 0 ? item.id + '~' + item.name : null
            });
        }
        loadVisitTypes(paging);
    }, [item])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={visitType.concat_name} placeholder={'Cari dokter...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Dokter'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={visitTypes._paging.page}
            size={visitTypes._paging.limit}
            totalData={visitTypes._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {visitTypes._resources.map((e, i) => {
                const number = ((visitTypes._paging.page - 1) * visitTypes._paging.limit) + i + 1;
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