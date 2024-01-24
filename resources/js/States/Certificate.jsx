import { atom } from "recoil";
import { paging } from "./Common";

export const certificateNewObject = {
    id: 0,
    name: ''
};


export const certificateListState = atom({
    key: 'certificateListState',
    default: {
        _paging: paging
    },
});

export const certificateState = atom({
    key: 'certificateState',
    default: certificateNewObject,
});

