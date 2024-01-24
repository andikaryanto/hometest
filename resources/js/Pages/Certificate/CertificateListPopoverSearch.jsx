import { url_certificates, url_registration_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { certificateNewObject } from "@/States/Certificate";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function CertificateListPopoverSearch({ onSelect, item, clinic, ...props }) {
    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [certificates, setCertificates] = useState({
        _resources: [],
        _paging: {}
    });

    const [certificate, setCertificate] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadCertificates = (params = {}) => {        
        get(url_certificates, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setCertificates(result.data.data);
                }
            })
            .catch(err => {
                // console.log(err);
            });
    }

    const onSearch = (e) => {
        setPaging({
            ...paging,
            keyword: e.target.value
        });
        loadCertificates({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setCertificate({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(certificateNewObject);
        setCertificate({
            ...certificateNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        loadCertificates(paging);
        if (item && Object.entries(item).length > 0) {
            setCertificate({
                ...item,
                concat_name:  item.id > 0 ? item.id + '~' + item.name : null
            });
        }
    }, [item])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={certificate.concat_name} placeholder={'Cari surat...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Surat'} columns={headers}
             className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={certificates._paging.page}
            size={certificates._paging.limit}
            totalData={certificates._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {certificates._resources.map((e, i) => {
                const number = ((certificates._paging.page - 1) * certificates._paging.limit) + i + 1;
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