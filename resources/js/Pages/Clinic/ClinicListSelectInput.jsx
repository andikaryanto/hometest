import { url_clinics } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { clinicNewObject } from "@/States/Clinic";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function ClinicListSelectInput({ onSelect, item, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);

    const [clinics, setClinics] = useState({
        _resources: [],
        _paging: {}
    });

    const [clinic, setClinic] = useState({
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

    const loadClinics = (params = {}) => {
        const accessToken = getToken();
        get(url_clinics, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setClinics(result.data.data);
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
        loadClinics({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setClinic({
            ...item,
            concat_name:  item.id > 0 ? item.id + '~' + item.name : null
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(clinicNewObject);
        setClinic({
            ...clinicNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    const onPageChanged = (page) => {
        setPaging({
            ...paging,
            page: page
        });
        loadClinics({
            ...paging,
            page: page
        });
    }

    useEffect(() => {
        loadClinics(paging);
        if (item && Object.entries(item).length > 0) {
            setClinic({
                ...item,
                concat_name:  item.id > 0 ? item.id + '~' + item.name : null
            });
        }
    }, [item])

    const headers = ['No', 'Poli', 'Keterangan', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={clinic.concat_name} placeholder={'Cari poli...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Daftar Poli'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            onPageChanged={onPageChanged}
            showAddButton={false}
            page={clinics._paging.page}
            size={clinics._paging.limit}
            totalData={clinics._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {clinics._resources.map((e, i) => {
                const number = ((clinics._paging.page - 1) * clinics._paging.limit) + i + 1;
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