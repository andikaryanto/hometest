import { atom } from "recoil";
import { paging } from "./Common";
import { medicalCheckupNewObject } from "./MedicalCheckup";

export const medicalCheckupMataNewObject = {
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

export const medicalCheckupMataListNewObject = {
    _paging: paging
}

export const medicalCheckupMataListState = atom({
    key: 'medicalCheckupMataListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupMataState = atom({
    key: 'medicalCheckupMataState',
    default: medicalCheckupMataNewObject,
});

export const medicalCheckupMataFilterState = atom({
    key: 'medicalCheckupMataFilterState',
    default: medicalCheckupMataNewObject,
});
