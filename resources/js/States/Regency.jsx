import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";
import { provinceNewObject } from "./Province";

export const regencyNewObject = {
    id: 0,
    name: '',
    province: provinceNewObject
};


export const regencyListState = atom({
    key: 'regencyListState',
    default: {
        _paging: paging
    },
});

export const regencyState = atom({
    key: 'regencyState',
    default: regencyNewObject,
});

