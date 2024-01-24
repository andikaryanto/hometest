import { atom } from "recoil";
import { doctorNewObject } from "@/States/Doctor";
import { healthWorkerNewObject } from "@/States/HealthWorker";
import { paging } from "@/States/Common";

export const medicalCheckupTreatmentIncentiveNewObject = {
    id: 0,
    doctor: doctorNewObject,
    health_worker: healthWorkerNewObject,
    incentive_date: null
};

export const medicalCheckupTreatmentIncentiveListNewObject = {
    _paging: paging
};

export const medicalCheckupTreatmentIncentiveListState = atom({
    key: 'medicalCheckupTreatmentIncentiveListState',
    default: medicalCheckupTreatmentIncentiveListNewObject,
});

export const medicalCheckupTreatmentIncentiveState = atom({
    key: 'medicalCheckupTreatmentIncentiveState',
    default: medicalCheckupTreatmentIncentiveNewObject,
});

export const medicalCheckupTreatmentIncentiveFilterState = atom({
    key: 'medicalCheckupTreatmentIncentiveFilterState',
    default: medicalCheckupTreatmentIncentiveNewObject,
});

