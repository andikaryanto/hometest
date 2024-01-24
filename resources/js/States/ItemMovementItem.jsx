import { atom } from "recoil";
import { paging } from "./Common";
import { movementTypeNewObject } from "./MovementType";
import { itemNewObject } from "./Item";
import { uomNewObject } from "./Uom";
import { itemMovementNewObject } from "./ItemMovement";

export const itemMovementItemNewObject = {
    id: 0,
    quantity: 0,
    price_per_unit: 0,
    item: itemNewObject,
    uom: uomNewObject,
    item_movement: itemMovementNewObject,
    distributor: ''
};

export const itemMovementItemListState = atom({
    key: 'itemMovementItemListState',
    default: {
        _paging: paging
    },
});

export const itemMovementItemState = atom({
    key: 'itemMovementItemState',
    default: itemMovementItemNewObject,
});

