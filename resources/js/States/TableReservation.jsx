import { atom } from "recoil";
import { paging } from "./Common";
import { clinicNewObject } from "./Clinic";
import { tableNewObject } from "./Table";

export const tableReservationNewObject = {
    id: 0,
    reserve_at: null,
    table: tableNewObject,
    is_complete: false,
    reserve_for: ''
}

export const tableReservationListNewObject = {
    _paging: paging
}

export const tableReservationListState = atom({
    key: 'tableReservationListState',
    default: tableReservationListNewObject,
});

export const tableReservationState = atom({
    key: 'tableReservationState',
    default: tableReservationNewObject,
});

export const tableReservationFilterState = atom({
    key: 'tableReservationFilterState',
    default: tableReservationNewObject,
});

