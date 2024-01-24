import { atom } from "recoil";
import { paging } from "./Common";

export const itemMarginNewObject = {
    id: 0,
    name: '',
    description: ''
};


export const itemMarginListState = atom({
    key: 'itemMarginListState',
    default: {
        _paging: paging
    },
});

export const itemMarginState = atom({
    key: 'itemMarginState',
    default: itemMarginNewObject,
});

