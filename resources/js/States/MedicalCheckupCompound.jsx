import { atom } from "recoil";
import { paging } from "./Common";

export const medicalCheckupCompoundNewObject = {
    id: 0,
    ordering: 0,
    medical_checkup_items: []
};


export const medicalCheckupCompoundListState = atom({
    key: 'medicalCheckupCompoundMedicineListState',
    default: [],
});

export const medicalCheckupCompoundState = atom({
    key: 'medicalCheckupCompoundMedicinaState',
    default: medicalCheckupCompoundNewObject,
});

