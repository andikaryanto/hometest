import { atom } from "recoil";
import { paging } from "./Common";

export const genderNewObject = {
    id: null,
    name: '',
}

export const genderListState = atom({
    key: 'genderListState',
    default: {
        _paging: paging
    },
});

export const genderState = atom({
    key: 'genderState',
    default: genderNewObject,
});

