import { url_health_workers, url_registration_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import PopoverMultiInput from "@/Components/Input/PopoverMultiInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { healthWorkerNewObject } from "@/States/HealthWorker";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function HealthWorkerListPopoverMultiSearch({ onSelect, items = [], healthWorkerType, ...props }) {
    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [healthWorkers, setHealthWorkers] = useState({
        _resources: [],
        _paging: {}
    });
    
    const [selectedHealthWorkers, setSelectedHealthWorkers] = useState([]);

    const [healthWorker, setHealthWorker] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadHealthWorkers = (params = {}) => {
        if(healthWorkerType) {
            params = {
                ...params,
                health_worker_type_id: healthWorkerType
            }
        }

        get(url_health_workers, getToken(), params)
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
        if (selectedHealthWorkers.find(x => x.id == item.id) == undefined) {
            setSelectedHealthWorkers(existed => [...existed, item]);
            onSelect([...selectedHealthWorkers, item]);
        }
        
        // setShowPopover(false);
    }

    const onClear = () => {
        onSelect(healthWorkerNewObject);
        setSelectedHealthWorker({
            ...healthWorkerNewObject,
            concat_name: ''
        });
        // setShowPopover(false);
    }

    const onItemRemove = (item) => {
        const updatedItems = selectedHealthWorkers.filter(x => x.id !== item.id);
        setSelectedHealthWorkers(updatedItems);
        onSelect(updatedItems);
    }

    useEffect(() => {
        loadHealthWorkers(paging);
        
    }, []);

    useEffect(() => {
        if(items.length > 0) {
            setSelectedHealthWorkers(items);
        }
    }, [items])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverMultiInput {...props} onRemove={onItemRemove} onClear={onClear} value={healthWorker.concat_name} items={selectedHealthWorkers} keyValue='name' placeholder={'Cari tenaga medis...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Tenaga Medis'} columns={headers}
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
                        {e.name}
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        <BorderedRoundedButtonSmall onClick={() => select(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Pilih</BorderedRoundedButtonSmall>
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </PopoverMultiInput>
}