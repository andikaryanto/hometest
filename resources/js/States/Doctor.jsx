import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";

export const doctorNewObject = {
    id: 0,
    name: '',
    clinic: clinicNewObject
};


export const doctorListState = atom({
    key: 'doctorListState',
    default: {
        _paging: paging
    },
});

export const doctorState = atom({
    key: 'doctorState',
    default: doctorNewObject,
});

