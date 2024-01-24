import { atom } from "recoil";
import { paging } from "./Common";
import { genderNewObject } from "./Gender";
import { patientNewObject } from "./Patient";
import { villageNewObject } from "./Village";

export const personNewObject = {
    id: 0,
    name: '',
    nik: '',
    date_of_birth: '',
    place_of_birth: '',
    phone: '',
    job: '',
    religion: '',
    degree: '',
    address: '',
    gender: genderNewObject,
    village: villageNewObject,
    current_village: villageNewObject,
    patient: patientNewObject
};

export const personListState = atom({
    key: 'personListState',
    default: {
        _paging: paging
    },
});

export const personState = atom({
    key: 'personState',
    default: personNewObject,
});

export const personFilterState = atom({
    key: 'personFilterState',
    default: {
        medical_record_number: ''
    },
});

