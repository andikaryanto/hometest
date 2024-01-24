import { url_scopes } from "@/Common/Api";
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
import { scopeNewObject } from "@/States/Scope";
import { useTheme } from "@/app";
import { useEffect, useState } from "react";

export default function ScopeListPopoverMultiSearch({ onSelect, items = [], ...props }) {
    const { theme } = useTheme();
    const { borderTheme } = applicationTheme(theme);
    const [scopes, setScopes] = useState({
        _resources: [],
        _paging: {}
    });

    const [selectedScopes, setSelectedScopes] = useState([]);

    const [scope, setScope] = useState({
        id: 0,
        name: '',
        concat_name: ''
    });

    const [showPopover, setShowPopover] = useState(false);

    const [paging, setPaging] = useState(pagingParameter());

    const popUpState = (isOpen) => {
        setShowPopover(isOpen);
    }

    const loadScopes = (params = {}) => {
        get(url_scopes, getToken(), params)
            .then(result => {
                if (result.status == 200) {
                    setScopes(result.data.data);
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
        loadScopes({
            ...paging,
            keyword: e.target.value
        });
    }

    const select = (item) => {
        if (selectedScopes.find(x => x.id == item.id) == undefined) {
            setSelectedScopes(existed => [...existed, item]);
            onSelect([...selectedScopes, item]);
        }

        // setShowPopover(false);
    }

    const onClear = () => {
        onSelect(scopeNewObject);
        setSelectedScope({
            ...scopeNewObject,
            concat_name: ''
        });
        setShowPopover(false);
    }

    const onItemRemove = (item) => {
        const updatedItems = selectedScopes.filter(x => x.id !== item.id);
        setSelectedScopes(updatedItems);
        onSelect(updatedItems);
    }

    useEffect(() => {
        loadScopes(paging);

    }, []);

    useEffect(() => {
        setSelectedScopes(items);
    }, [items])

    const headers = ['No', 'Nama', 'Aksi'];
    return <PopoverMultiInput {...props} onRemove={onItemRemove} onClear={onClear} value={scope.concat_name} items={selectedScopes} keyValue='name' placeholder={'Cari Scope...'} onChange={onSearch} onPopoverState={popUpState} isOpen={showPopover}>
        <Table text={'Scope'} columns={headers}
            className={`rounded-lg hadow-lg p-4 ${borderTheme} shadow`}
            showAddButton={false}
            page={scopes._paging.page}
            size={scopes._paging.limit}
            totalData={scopes._paging.total_data}
            showRefresh={false}
            showSearch={false}
            showResultPage={false}>
            {scopes._resources.map((e, i) => {
                const number = ((scopes._paging.page - 1) * scopes._paging.limit) + i + 1;
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