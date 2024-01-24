import { atom } from "recoil";
import { paging } from "./Common";
import { medicalCheckupNewObject } from "./MedicalCheckup";

export const medicalCheckupUmumNewObject = {
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

export const medicalCheckupUmumListNewObject = {
    _paging: paging
}

export const medicalCheckupUmumListState = atom({
    key: 'medicalCheckupUmumListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupUmumState = atom({
    key: 'medicalCheckupUmumState',
    default: medicalCheckupUmumNewObject,
});

export const medicalCheckupUmumFilterState = atom({
    key: 'medicalCheckupUmumFilterState',
    default: medicalCheckupUmumNewObject,
});
