import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";

export const diseaseNewObject = {
    id: 0,
    clinic: clinicNewObject,
    code: '',
    name: '',
    description: ''
}

export const diseaseListState = atom({
    key: 'diseaseListState',
    default: {
        _paging: paging
    },
});

export const diseaseState = atom({
    key: 'diseaseState',
    default: diseaseNewObject,
});

export const diseaseFilterState = atom({
    key: 'diseaseFilterState',
    default: diseaseNewObject,
});

