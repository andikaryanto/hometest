import { atom } from "recoil";
import { paging } from "./Common";

export const healthWorkerTypeNewObject = {
    id: 0,
    name: ''
};


export const healthWorkerTypeListState = atom({
    key: 'healthWorkerTypeListState',
    default: {
        _paging: paging
    },
});

export const healthWorkerTypeState = atom({
    key: 'healthWorkerTypeState',
    default: healthWorkerTypeNewObject,
});

