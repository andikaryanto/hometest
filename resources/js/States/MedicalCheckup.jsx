import { atom } from "recoil";
import { paging } from "./Common";
import { checkupRecordNewObject } from "./CheckupRecord";
import { certificateNewObject } from "./Certificate";
import { doctorNewObject } from "./Doctor";
import { paymentNewObject } from "./Payment";
import { clinicNewObject } from "./Clinic";

export const medicalCheckupNewObject = {
    id: 0,
    checkup_record: checkupRecordNewObject,
    doctor: doctorNewObject,
    checkup_number: '',
    electrocardiography: '',
    spirometry: '',
    governance: '',
    reference: '',
    is_prescription_given: false,
    certificate: certificateNewObject,
    form: {},
    diseases: [

    ],
    treatments: [

    ],
    medical_checkup_compounds: [

    ],
    medical_checkup_items: [

    ],
    medical_checkup_treatments: [

    ]
    // payment: paymentNewObject
}

export const medicalCheckupListNewObject = {
    _paging: paging
}

export const medicalCheckupListState = atom({
    key: 'medicalCheckupListState',
    default: {
        _paging: paging
    },
});

export const medicalCheckupState = atom({
    key: 'medicalCheckupState',
    default: medicalCheckupNewObject,
});

export const medicalCheckupFilterState = atom({
    key: 'medicalCheckupFilterState',
    default: {
        medical_record_number: '',
        clinic: clinicNewObject,
    },
});

