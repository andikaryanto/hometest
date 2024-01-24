import { url_health_workers } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { healthWorkerNewObject } from "@/States/HealthWorker";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function HealthWorkerListPopoverInput({ onSelect, item, healthWorkerType, ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);

    const [healthWorkers, setHealthWorkers] = useState({
        _resources: [],
        _paging: {}
    });

    const [healthWorker, setHealthWorker] = useState({
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

    const loadHealthWorkers = (params = {}) => {
        if(healthWorkerType) {
            params = {
                ...params,
                health_worker_type_id: healthWorkerType
            }
        }
        
        const accessToken = getToken();
        get(url_health_workers, accessToken, params)
            .then(result => {
                if (result.status == 200) {
                    setHealthWorkers(result.data.data);
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
        loadHealthWorkers({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        onSelect(item);
        setHealthWorker({
            ...item,
            concat_name:  item.id > 0 ? item.id + '~' + item.name : null
        });
        setShowPopover(false);
    }

    const onClear = () => {
        onSelect(healthWorkerNewObject);
        setHealthWorker({
            ...healthWorkerNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    useEffect(() => {
        if (item && Object.entries(item).length > 0) {   
            setHealthWorker({
                ...item,
                concat_name:  item.id > 0 ? item.id + '~' + item.name : null
            });
        }
        loadHealthWorkers(paging);
    }, [item])

    const headers = ['No', 'Nama', 'Keterangan', 'Aksi'];
    return <PopoverInput {...props} onClear={onClear} value={healthWorker.concat_name} placeholder={'Cari ukuran...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Daftar Item'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={healthWorkers._paging.page}
            size={healthWorkers._paging.limit}
            totalData={healthWorkers._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {healthWorkers._resources.map((e, i) => {
                const number = ((healthWorkers._paging.page - 1) * healthWorkers._paging.limit) + i + 1;
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