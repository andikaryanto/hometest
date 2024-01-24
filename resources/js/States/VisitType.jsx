import { atom } from "recoil";
import { paging } from "./Common";

export const visitTypeNewObject = {
    id: 0,
    name: '',
    description: ''
};


export const visitTypeListState = atom({
    key: 'visitTypeListState',
    default: {
        _paging: paging
    },
});

export const visitTypeState = atom({
    key: 'visitTypeState',
    default: visitTypeNewObject,
});

