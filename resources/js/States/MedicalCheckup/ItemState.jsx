import { atom } from "recoil";
import { itemNewObject } from "../Item";
import { paging } from "../Common";

export const medicalCheckupItemNewObject = {
    id: 0,
    item: itemNewObject,
    quantity: 0,
    price_per_unit: 0,
    amount: 0
};


export const medicalCheckupItemListState = atom({
    key: 'medicalCheckupItemListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupItemState = atom({
    key: 'medicalCheckupItemState',
    default: medicalCheckupItemNewObject,
});

