import { url_diseases, url_registration_types } from "@/Common/Api";
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
import { diseaseNewObject } from "@/States/Disease";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function DiseaseListPopoverMultiSearch({ onSelect, items = [], ...props }) {
    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [diseases, setDiseases] = useState({
        _resources: [],
        _paging: {}
    });
    
    const [selectedDiseases, setSelectedDiseases] = useState([]);

    const [disease, setDisease] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadDiseases = (params = {}) => {
        get(url_diseases, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setDiseases(result.data.data);
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
        loadDiseases({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        if (selectedDiseases.find(x => x.id == item.id) == undefined) {
            setSelectedDiseases(existed => [...existed, item]);
            onSelect([...selectedDiseases, item]);
        }
        
        // setShowPopover(false);
    }

    const onClear = () => {
        onSelect(diseaseNewObject);
        setSelectedDisease({
            ...diseaseNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    const onItemRemove = (item) => {
        const updatedItems = selectedDiseases.filter(x => x.id !== item.id);
        setSelectedDiseases(updatedItems);
        onSelect(updatedItems);
    }

    useEffect(() => {
        loadDiseases(paging);
        
    }, []);

    useEffect(() => {
        if(items.length > 0) {
            setSelectedDiseases(items);
        }
    }, [items])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverMultiInput {...props} onRemove={onItemRemove} onClear={onClear} value={disease.concat_name} items={selectedDiseases} keyValue='code_name' placeholder={'Cari penyakit...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Tenaga Medis'} columns={headers}
             className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={diseases._paging.page}
            size={diseases._paging.limit}
            totalData={diseases._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {diseases._resources.map((e, i) => {
                const number = ((diseases._paging.page - 1) * diseases._paging.limit) + i + 1;
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