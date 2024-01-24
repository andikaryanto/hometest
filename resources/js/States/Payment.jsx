import { atom } from "recoil";
import { paging } from "./Common";
import { medicalCheckupNewObject } from "./MedicalCheckup";
import { clinicNewObject } from "./Clinic";

export const paymentNewObject = {
    id: 0,
    compound_fee: 0,
    discount: 0,
    amount: 0,
    payment_amount: 0,
    // medical_checkup: medicalCheckupNewObject,
    sub_total: 0,
    grand_total: 0,    
    change: 0,
};

export const paymentListNewObject = {
    _paging: paging
}

export const paymentListState = atom({
    key: 'paymentListState',
    default: {
        _paging: paging
    },
});

export const paymentState = atom({
    key: 'paymentState',
    default: paymentNewObject,
});



export const paymentFilterState = atom({
    key: 'paymentFilterState',
    default: {
        medical_record_number: '',
        clinic: clinicNewObject,
        payment_date: ''
    },
});

