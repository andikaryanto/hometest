import { atom } from "recoil";
import { paging } from "./Common";

export const patientNewObject = {
    id: 0,
    medical_record_number: '',
};


export const patientListState = atom({
    key: 'patientListState',
    default: {
        _paging: paging
    },
});

export const patientState = atom({
    key: 'patientState',
    default: patientNewObject,
});

