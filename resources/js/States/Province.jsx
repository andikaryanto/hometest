import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";

export const provinceNewObject = {
    id: 0,
    name: ''
};


export const provinceListState = atom({
    key: 'provinceListState',
    default: {
        _paging: paging
    },
});

export const provinceState = atom({
    key: 'provinceState',
    default: provinceNewObject,
});

