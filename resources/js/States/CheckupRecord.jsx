import { atom } from "recoil";
import { paging } from "./Common";
import { patientRegistrationListNewObject, patientRegistrationNewObject } from "./Patient/Registration";
import { healthWorkerTypeNewObject } from "./HealthWorkerType";
import { healthWorkerNewObject } from "./HealthWorker";

export const checkupRecordNewObject = {
    id: 0,
    registration: patientRegistrationNewObject,
    blood_pressure: 0,
    pulse: 0,
    respiration: 0,
    temperature: 0,
    oxygen_saturation: 0,
    weight: 0.0,
    height: 0.0,
    form: {
        allergy: {
            allergy: {
                type: 'boolean',
                value: false,
                description: ''
            }
        },
        sore: {
            sore: {
                type: 'integer',
                value: 1,
                description: ''

            }
        },
        fall_risk: {
            gait: {
                type: 'boolean',
                value: false,
                description: ''
            }, 
            movement_limitation: {
                type: 'boolean',
                value: false,
                description: ''
            }
        },
        nutrition: {
            body_mass_index: {
                type: 'float',
                value: 0.0,
                description: ''
            },
            body_mass_index_type: {
                type: 'integer',
                value: 1,
                description: ''
            }
        }
    },
    diagnose: '',
    note: '',
    anamnesis: '',
    complaint: '',
    action: '',
    health_workers: [
       
    ]
}

export const checkupRecordListNewObject = {
    _paging: paging
}

export const checkupRecordListState = atom({
    key: 'checkupRecordListState',
    default: {
        _paging: paging
    },
});

export const checkupRecordState = atom({
    key: 'checkupRecordState',
    default: checkupRecordNewObject,
});

export const checkupRecordFilterState = atom({
    key: 'checkupRecordFilterState',
    default: checkupRecordNewObject,
});

