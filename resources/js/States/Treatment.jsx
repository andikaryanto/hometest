import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";

export const treatmentNewObject = {
    id: null,
    // clinic: clinicNewObject,
    name: '',
    health_worker_price: 0.0,
    doctor_price: 0.0,
    pharmacist_price: 0.0,
    clinic_price: 0.0
}

export const treatmentListState = atom({
    key: 'treatmentListState',
    default: {
        _paging: paging
    },
});

export const treatmentState = atom({
    key: 'treatmentState',
    default: treatmentNewObject,
});

export const treatmentFilterState = atom({
    key: 'treatmentFilterState',
    default: treatmentNewObject,
});

