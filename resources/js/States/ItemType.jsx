import { atom } from "recoil";
import { paging } from "./Common";

export const itemTypeNewObject = {
    id: 0,
    code: '',
    name: ''
}

export const itemTypeListState = atom({
    key: 'itemTypeListState',
    default: {
        _paging: paging
    },
});

export const itemTypeState = atom({
    key: 'itemTypeState',
    default: itemTypeNewObject,
});

export const itemTypeFilterState = atom({
    key: 'itemTypeFilterState',
    default: itemTypeNewObject,
});

