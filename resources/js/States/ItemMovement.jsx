import { atom } from "recoil";
import { paging } from "./Common";
import { movementTypeNewObject } from "./MovementType";

export const itemMovementNewObject = {
    id: 0,
    movement_number: '',
    description: '',
    movement_type: movementTypeNewObject 
};


export const itemMovementListNewObject = {
    _paging: paging
}

export const itemMovementListState = atom({
    key: 'itemMovementListState',
    default: {
        _paging: paging
    },
});

export const itemMovementState = atom({
    key: 'itemMovementState',
    default: itemMovementNewObject,
});

