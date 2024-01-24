import { atom } from "recoil";
import { paging } from "./Common";

export const movementTypeNewObject = {
    id: null,
    name: '',
}

export const movementTypeListState = atom({
    key: 'movementTypeListState',
    default: {
        _paging: paging
    },
});

export const movementTypeState = atom({
    key: 'movementTypeState',
    default: movementTypeNewObject,
});

