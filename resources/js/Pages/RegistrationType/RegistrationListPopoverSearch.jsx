import { url_registration_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { patientRegistrationNewObject } from "@/States/Patient/Registration";
import { registrationTypeNewObject } from "@/States/RegistrationType";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function RegistrationTypeListPopoverSearch({ onSelect, item, ...props }) {
    const {theme} = useTheme();
    const {borderTheme} = applicationTheme(theme);
    const [registrationTypes, setResgistrationTypes] = useState({
        _resources: [],
        _paging: {}
    });

    const [registrationType, setResgistrationType] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadResgistrationTypes = (params = {}) => {
        const accessToken = getToken();
        get(url_registration_types, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setResgistrationTypes(result.data.data);
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
        loadResgistrationTypes({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setResgistrationType({
            ...item,
            concat_name:  item.id > 0 ? item.id + '~' + item.name : null
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(registrationTypeNewObject);
        setResgistrationType({
            ...registrationTypeNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        loadResgistrationTypes(paging);
        if (item && Object.entries(item).length > 0) {
            setResgistrationType({
                ...item,
                concat_name:  item.id > 0 ? item.id + '~' + item.name : null
            });
        }
    }, [item])

    const headers = ['No', 'Tipe', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={registrationType.concat_name} placeholder={'Cari jenis daftar...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Jenis Daftar'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={registrationTypes._paging.page}
            size={registrationTypes._paging.limit}
            totalData={registrationTypes._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {registrationTypes._resources.map((e, i) => {
                   const number = ((registrationTypes._paging.page - 1) * registrationTypes._paging.limit) + i + 1;
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