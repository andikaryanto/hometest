import { url_treatments, url_registration_types } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { formatCurrency } from "@/Common/Helper";
import { get } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import PopoverInput from "@/Components/Input/PopoverInput";
import PopoverMultiInput from "@/Components/Input/PopoverMultiInput";
import { Table } from "@/Components/Table/Table";
import { TableDetail } from "@/Components/Table/TableDetail";
import { TableRow } from "@/Components/Table/TableRow";
import { pagingParameter } from "@/States/Common";
import { treatmentNewObject } from "@/States/Treatment";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function TreatmentListPopoverMultiSearch({ onSelect, items = [], ...props }) {
    const {theme} = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [treatments, setTreatments] = useState({
        _resources: [],
        _paging: {}
    });
    
    const [selectedTreatments, setSelectedTreatments] = useState([]);

    const [treatment, setTreatment] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadTreatments = (params = {}) => {
        get(url_treatments, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setTreatments(result.data.data);
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
        loadTreatments({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        if (selectedTreatments.find(x => x.id == item.id) == undefined) {
            setSelectedTreatments(existed => [...existed, item]);
            onSelect([...selectedTreatments, item]);
        }
        
        // setShowPopover(false);
    }

    const onClear = () => {
        onSelect(treatmentNewObject);
        setSelectedTreatment({
            ...treatmentNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    const onItemRemove = (item) => {
        const updatedItems = selectedTreatments.filter(x => x.id !== item.id);
        setSelectedTreatments(updatedItems);
        onSelect(updatedItems);
    }

    useEffect(() => {
        loadTreatments(paging);
        
    }, []);

    useEffect(() => {
        if(items.length > 0) {
            setSelectedTreatments(items);
        }
    }, [items])

    const headers = ['No', 'Nama', 'Tarif', 'Aksi'];
    return <PopoverMultiInput {...props} onRemove={onItemRemove} onClear={onClear} value={treatment.concat_name} items={selectedTreatments} keyValue='name_price' placeholder={'Cari penyakit...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Tenaga Medis'} columns={headers}
             className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={treatments._paging.page}
            size={treatments._paging.limit}
            totalData={treatments._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {treatments._resources.map((e, i) => {
                const number = ((treatments._paging.page - 1) * treatments._paging.limit) + i + 1;
                return <TableRow key={i}>
                    <TableDetail>{number}</TableDetail>
                    <TableDetail>
                        {e.name}
                    </TableDetail>
                    <TableDetail>
                        {formatCurrency(e.price)}
                    </TableDetail>
                    <TableDetail className={'items-center'}>
                        <BorderedRoundedButtonSmall onClick={() => select(e)} className={'bg-green-500 text-white hover:bg-green-400 hover:text-gray-200'}> Pilih</BorderedRoundedButtonSmall>
                    </TableDetail>
                </TableRow>
            })}
        </Table>
    </PopoverMultiInput>
}