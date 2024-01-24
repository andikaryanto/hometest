import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";

export const tableNewObject = {
    id: 0,
    name: '',
    is_reserved: false
}

export const tableListState = atom({
    key: 'tableListState',
    default: {
        _paging: paging
    },
});

export const tableState = atom({
    key: 'tableState',
    default: tableNewObject,
});

export const tableFilterState = atom({
    key: 'tableFilterState',
    default: tableNewObject,
});

