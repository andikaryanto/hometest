import { atom } from "recoil";
import { paging } from "./Common";

export const uomNewObject = {
    id: 0,
    name: '',
    description: '',
    // get concat_name() {
    //     this.id > 0 ? this.id + '~' + this.name: ''
    // }
};


export const uomListState = atom({
    key: 'uomListState',
    default: {
        _paging: paging
    },
});

export const uomState = atom({
    key: 'uomState',
    default: uomNewObject,
});

