import { atom } from "recoil";
import { paging } from "./Common";
import { medicalCheckupNewObject } from "./MedicalCheckup";

export const medicalCheckupGigiNewObject = {
    ...medicalCheckupNewObject,
    form: {
        phisical: '',
        pregnancy_history: '',
        immunization_history: '',
        ddst: '',
        disease_history: '',
        disease_family_history: ''
    }
    
}

export const medicalCheckupGigiListNewObject = {
    _paging: paging
}

export const medicalCheckupGigiListState = atom({
    key: 'medicalCheckupGigiListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupGigiState = atom({
    key: 'medicalCheckupGigiState',
    default: medicalCheckupGigiNewObject,
});

export const medicalCheckupGigiFilterState = atom({
    key: 'medicalCheckupGigiFilterState',
    default: medicalCheckupGigiNewObject,
});
