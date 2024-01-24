import { atom } from "recoil";
import { paging } from "./Common";

export const userNewObject = {
    id: 0,
    username: '',
    email: '',
    password: '',
    scopes: []
};


export const userListState = atom({
    key: 'userListState',
    default: {
        _paging: paging
    },
});

export const userState = atom({
    key: 'userState',
    default: userNewObject,
});

