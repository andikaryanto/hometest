import { atom } from "recoil";
import { paging } from "./Common";
import { healthWorkerTypeNewObject } from "./HealthWorkerType";

export const healthWorkerNewObject = {
    id: 0,
    name: '',
    health_worker_type: healthWorkerTypeNewObject
};


export const healthWorkerListState = atom({
    key: 'healthWorkerListState',
    default: {
        _paging: paging
    },
});

export const healthWorkerState = atom({
    key: 'healthWorkerState',
    default: healthWorkerNewObject,
});

