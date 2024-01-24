import { atom } from "recoil";

export const paging = {
    page: 1,
    limit: 10,
    total_data: 0
};

export const pagingParameter = () => {
    return {
        page: 1,
        size: 10,
        keyword: '',
        order_by: 'id',
        order_direction: 'DESC'
    }
}

export const themeState =  atom({
    key: 'themeState',
    default: 'light',
});

export const newObjecToastState = { 
    color: null,
    message: null
}

export const toastState = atom({
    key: 'toastState',
    default: newObjecToastState
});