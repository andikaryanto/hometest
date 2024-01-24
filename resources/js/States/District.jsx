import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";
import { regencyNewObject } from "./Regency";

export const districtNewObject = {
    id: 0,
    name: '',
    regency: regencyNewObject
};


export const districtListState = atom({
    key: 'districtListState',
    default: {
        _paging: paging
    },
});

export const districtState = atom({
    key: 'districtState',
    default: districtNewObject,
});

