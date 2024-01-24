import { atom } from "recoil";
import { paging } from "./Common";
import { districtNewObject } from "./District";

export const villageNewObject = {
    id: 0,
    name: '',
    district: districtNewObject
};


export const villageListState = atom({
    key: 'villageListState',
    default: {
        _paging: paging
    },
});

export const villageState = atom({
    key: 'villageState',
    default: villageNewObject,
});

