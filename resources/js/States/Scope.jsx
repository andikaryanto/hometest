import { atom } from "recoil";
import { paging } from "./Common";

export const scopeNewObject = {
    id: 0,
    name: '',
};


export const scopeListState = atom({
    key: 'scopeListState',
    default: {
        _paging: paging
    },
});

export const scopeState = atom({
    key: 'scopeState',
    default: scopeNewObject,
});

