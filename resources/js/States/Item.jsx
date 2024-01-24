import { atom } from "recoil";
import { paging } from "./Common";
import { itemTypeNewObject } from "./ItemType";
import { uomNewObject } from "./Uom";
import { itemMarginNewObject } from "./ItemMargin";

export const itemNewObject = {
    id: 0,
    item_type: itemTypeNewObject,
    code: '',
    name: '',
    price_per_unit: 0.00,
    margin: 0.00,
    uom: uomNewObject,
    item_margin: itemMarginNewObject,
    // get concat_name() {
    //     this.id > 0 ? this.id + '~' + this.name: ''
    // }
}

export const itemListState = atom({
    key: 'itemListState',
    default: {
        _paging: paging
    },
});

export const itemState = atom({
    key: 'itemState',
    default: itemNewObject,
});

export const itemFilterState = atom({
    key: 'itemFilterState',
    default: itemNewObject,
});

