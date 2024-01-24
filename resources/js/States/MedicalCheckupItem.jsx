import { atom } from "recoil";
import { paging } from "./Common";
import { itemNewObject } from "./Item";

export const medicalCheckupItemNewObject = {
    id: 0,
    quantity: 0,
    price_per_unit: 0,
    item: itemNewObject,
    amount: 0,
    signa: '',
    note: ''
};

export const medicalCheckupItemConsumableListState = atom({
    key: 'medicalCheckupItemConsumableListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupItemMedicineListState = atom({
    key: 'medicalCheckupItemMedicineListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupItemConsumableState = atom({
    key: 'medicalCheckupItemConsumableState',
    default: medicalCheckupItemNewObject,
});

export const medicalCheckupItemMedicineState = atom({
    key: 'medicalCheckupItemMedicinaState',
    default: medicalCheckupItemNewObject,
});

