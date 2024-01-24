import { url_clinic_clinic_doctors, url_doctors, url_registration_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { doctorNewObject } from "@/States/Doctor";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function DoctorListPopoverSearch({ onSelect, item, clinic, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [doctors, setDoctors] = useState({
        _resources: [],
        _paging: {}
    });

    const [doctor, setDoctor] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadDoctors = (params = {}) => {
        let url = url_doctors;
        if (clinic && clinic.id > 0) {
            url = url_clinic_clinic_doctors.replace('{clinic}', clinic.id);
        }

        get(url, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setDoctors(result.data.data);
                }
                if (result.status == 400) {
                    
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const onSearch = (e) => {
        setPaging({
            ...paging,
            keyword: e.target.value
        });
        loadDoctors({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setDoctor({
            ...item,
            concat_name: item.id + '~' + item.name
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(doctorNewObject);
        setDoctor({
            ...doctorNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        if (!clinic) {
            setDoctor({
                ...item,
                concat_name: item.id > 0 ? item.id + '~' + item.name : null
            });
        }
        else if (item && Object.entries(item).length > 0) {
            if (item.clinic.id != clinic.id) {
                setDoctor({
                    ...doctorNewObject,
                    concat_name: item.id > 0 ? doctorNewObject.id + '~' + doctorNewObject.name : null
                })
            } else {
                setDoctor({
                    ...item,
                    concat_name: item.id > 0 ? item.id + '~' + item.name : null
                });
            }
        }
        loadDoctors(paging);
    }, [item, clinic])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={doctor.concat_name} placeholder={'Cari dokter...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Dokter'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={doctors._paging.page}
            size={doctors._paging.limit}
            totalData={doctors._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {doctors._resources.map((e, i) => {
                const number = ((doctors._paging.page - 1) * doctors._paging.limit) + i + 1;
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