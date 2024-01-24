import { atom } from "recoil";
import { paging } from "../Common";
import { doctorNewObject } from "../Doctor";
import { visitTypeNewObject } from "../VisitType";
import { patientNewObject } from "../Patient";
import { clinicNewObject } from "../Clinic";

export const patientRegistrationNewObject = {
    id: 0,
    name: '',
    description: '',
    clinic: clinicNewObject,
    registration_type: {
        id: 0,
        name: ''
    },
    doctor:doctorNewObject,
    visit_type: visitTypeNewObject,
    patient: patientNewObject,
    registration_status: {
        id: 5,
        name: ''
    }
};

export const patientRegistrationListNewObject = {
    _paging: paging
}


export const patientRegistrationListState = atom({
    key: 'patientRegistrationListState',
    default: patientRegistrationListNewObject,
});

export const patientRegistrationState = atom({
    key: 'patientRegistrationState',
    default: patientRegistrationNewObject,
});

export const patientRegistrationFilterState = atom({
    key: 'patientRegistrationFilterState',
    default: patientRegistrationNewObject,
});

