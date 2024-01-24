import { atom } from "recoil";
import { paging } from "./Common";

export const clinicNewObject = {
    id: 0,
    name: '',
    description: ''
};


export const clinicListState = atom({
    key: 'clinicListState',
    default: {
        _paging: paging
    },
});

export const clinicState = atom({
    key: 'clinicState',
    default: clinicNewObject,
});

