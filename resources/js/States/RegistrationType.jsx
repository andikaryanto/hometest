import { atom } from "recoil";
import { paging } from "./Common";

export const registrationTypeNewObject = {
    id: 0,
    name: '',
    description: ''
};


export const registrationTypeListState = atom({
    key: 'registrationTypeListState',
    default: {
        _paging: paging
    },
});

export const registrationTypeState = atom({
    key: 'registrationTypeState',
    default: registrationTypeNewObject,
});

