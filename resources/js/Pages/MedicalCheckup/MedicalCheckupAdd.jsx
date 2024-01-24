import { url_checkup_record, url_medical_checkup, url_patient_registration } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import getParameterValue from "@/Common/Helper";
import { get, patch, post } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import ClearPill from "@/Components/Pill/ClearPill";
import Pill from "@/Components/Pill/Pill";
import TextInput from "@/Components/Input/TextInput";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { useTheme } from "@/app";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import PatientInformation from "../Patient/PatientInformation";
import { checkupRecordState } from "@/States/CheckupRecord";
import Toggle from "@/Components/Toggle";
import TextArea from "@/Components/Input/TextArea";
import RadioButton from "@/Components/Input/RadioButton";
import HealthWorkerListPopoverMultiSearch from "../HealthWorker/HealthWorkerListPopoverMultiSearch";
import PrimaryButton from "@/Components/PrimaryButton";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { medicalCheckupState } from "@/States/MedicalCheckup";
import CertificateListPopoverSearch from "../Certificate/CertificateListPopoverSearch";
import Tabs from "@/Components/Tabs";
import DiseaseListPopoverMultiSearch from "../Disease/DiseaseListPopoverMultiSearch";
import TreatmentListPopoverMultiSearch from "../Treatment/TreatmentListPopoverMultiSearch";
import { medicalCheckupGigiNewObject, medicalCheckupGigiState } from "@/States/MedicalCheckupFormGigi";
import MedicalCheckupAddGigi from "./MedicalCheckupAddGigi";
import { medicalCheckupUmumState } from "@/States/MedicalCheckupFormUmum";
import MedicalCheckupAddUmum from "./MedicalCheckupAddUmum";
import MedicalCheckupItemConsumableItemList from "./Item/MedicalCheckupItemConsumableList";
import MedicalCheckupItemMedicineItemList from "./Item/MedicalCheckupItemMedicineList";
import MedicalCheckupCompound from "./Item/MedicalCheckupCompound";
import DoctorListPopoverSearch from "../Doctor/DoctorListPopoverSearch";
import { medicalCheckupMataState } from "@/States/MedicalCheckupFormMata";
import MedicalCheckupAddMata from "./MedicalCheckupAddMata";

export default function MedicalCheckupAdd() {
    const { theme } = useTheme();
    const { bigFontColorTheme, borderedBottomTheme, borderTheme } = applicationTheme(theme);
    const page = usePage();
    const checkupRecordId = getParameterValue(page, 'checkup_record_id');
    const clinic = getParameterValue(page, 'clinic');

    let state = null;
    if (clinic != null && clinic.toLowerCase() == 'gigi') {
        state = medicalCheckupGigiState;
    } else if (clinic != null && clinic.toLowerCase() == 'umum') {
        state = medicalCheckupUmumState;
    } else if (clinic != null && clinic.toLowerCase() == 'mata') {
        state = medicalCheckupMataState;
    }

    const [checkupRecord, setCheckupRecord] = useRecoilState(checkupRecordState);
    const [medicalCheckup, setMedicalCheckup] = useRecoilState(state);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const loadCheckupRecord = () => {
        get(url_checkup_record + '/' + checkupRecordId, getToken(), {
            embed: ['medical_checkup']
        })
            .then(result => {
                if (result.status == 200) {
                    setCheckupRecord(result.data.data._resources);
                    if (result.data.data._resources.medical_checkup) {
                        let treatments = [];
                        if(result.data.data._resources.medical_checkup.medical_checkup_treatments){
                            treatments = result.data.data._resources.medical_checkup.medical_checkup_treatments.map((e, i) => {
                                return e.treatment;
                            });
                        }

                        setMedicalCheckup({
                            ...result.data.data._resources.medical_checkup,
                            checkup_record: result.data.data._resources,
                            doctor: result.data.data._resources.medical_checkup.doctor ? 
                                result.data.data._resources.medical_checkup.doctor :
                                result.data.data._resources.registration.doctor,
                            treatments: treatments // TODO: this should be medical_checkup_treatments, so we map view model with the correct way
                        })
                    } else {
                        setMedicalCheckup({
                            ...medicalCheckup,
                            checkup_record: result.data.data._resources
                        });
                    }
                }
            })
    }

    const onSubmit = () => {
        setProcessing(true);
        if (medicalCheckup.id == 0) {
            post(url_medical_checkup, getToken(), medicalCheckup)
                .then(result => {
                    if (result.status == 201) {
                        setProcessing(false);
                        setMedicalCheckup(result.data.data._resources);
                        setToast({
                            color: ToastColor.success,
                            message: 'Data Berhasil disimpan'
                        });
                    }
                })
                .catch(err => {
                    setProcessing(false);
                    setToast({
                        color: ToastColor.danger,
                        message: 'Data gagal disimpan: ' + err.response.data.message
                    });
                });
        } else {
            patch(url_medical_checkup + '/' + medicalCheckup.id, getToken(), medicalCheckup)
                .then(result => {
                    if (result.status == 200) {
                        setProcessing(false);
                        setMedicalCheckup(result.data.data._resources);
                        setToast({
                            color: ToastColor.success,
                            message: 'Data Berhasil di ubah'
                        });
                    }
                })
                .catch(err => {
                    setProcessing(false);
                    setToast({
                        color: ToastColor.danger,
                        message: 'Data gagal disimpan: ' + err.response.data.message
                    });
                });
        }
    }

    const onSelectHealthWorker = (healthWorkers) => {
        setCheckupRecord({
            ...checkupRecord,
            health_workers: healthWorkers
        });
    }

    const onSelectCertificate = (certificate) => {
        setMedicalCheckup({
            ...medicalCheckup,
            certificate: certificate
        });
    }

    const onSelectDisease = (diseases) => {
        setMedicalCheckup({
            ...medicalCheckup,
            diseases: diseases
        })
    }

    const onSelectTreatment = (treatments) => {
        setMedicalCheckup({
            ...medicalCheckup,
            treatments: treatments
        })
    }

    const onSelectDoctor = (doctor) => {
        setMedicalCheckup({
            ...medicalCheckup,
            doctor: doctor
        })
    }

    useEffect(() => {
        loadCheckupRecord();
    }, []);

    return <AdminLayout textName={`${medicalCheckup.id > 0 ? 'Edit' : 'Tambah'} Pemeriksaan Pasien`} breadCrumbItems={[
        {
            label: "Pemeriksaan Pasien"
        }, {
            label: "Pasien Daftar"
        }
    ]}>
        {clinic != null && checkupRecord.id > 0 ?
            <div className="pt-4 pl-4 pr-4 mb-10 w-full">
                <div className="w-full">
                    <PatientInformation patient={checkupRecord.registration.patient} registration={checkupRecord.registration} />
                </div>
                <div className="w-full mt-4">
                    <Tabs headers={['Pemeriksaan Awal', 'Diagnosa Dokter', 'Bahan Habis Pakai', 'Obat', 'Obat Racik']}>
                        <div className="w-1/2 mr-4">
                            <div>
                                <div className="flex">
                                    <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Kondisi Pasien</div>
                                </div>
                                <div className={`flex mt-1 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Tekanan Darah (mmHg)" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.blood_pressure}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            isFocused={true}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, blood_pressure: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Nadi (K/Min)" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.pulse}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, pulse: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Respirasi (K/Min)" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.respiration}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, respiration: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={`flex mt-4 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Suhu (Derajat)" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.temperature}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, temperature: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Berat Badan (Kg)" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.weight}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, weight: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Tinggi Badan (cm)" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.height}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, height: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className={`flex mt-4 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Spo2" />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.oxygen_saturation}
                                            className={`mt-1 block w-full h-8 focus:border-none`}
                                            onChange={(e) => setCheckupRecord({ ...checkupRecord, oxygen_saturation: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className={`text-lg mt-6 ${bigFontColorTheme} font-semibold`}>Pemeriksaan Awal</div>
                                <div className={`flex mt-2 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Diagnosa Perawat" />
                                        <TextArea
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.diagnose}
                                            className={`mt-1 block w-full focus:border-none`}
                                            onChange={(e) => setCheckupRecord({
                                                ...checkupRecord,
                                                diagnose: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className={`flex mt-4 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Anamnesis" />
                                        <TextArea
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.anamnesis}
                                            className={`mt-1 block w-full focus:border-none`}
                                            onChange={(e) => setCheckupRecord({
                                                ...checkupRecord,
                                                anamnesis: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className={`flex mt-4 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Catatan / Lainnya" />
                                        <TextArea
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.note}
                                            className={`mt-1 block w-full focus:border-none`}
                                            onChange={(e) => setCheckupRecord({
                                                ...checkupRecord,
                                                note: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className={`flex mt-4 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Keluhan Utama" />
                                        <TextArea
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.complaint}
                                            className={`mt-1 block w-full focus:border-none`}
                                            onChange={(e) => setCheckupRecord({
                                                ...checkupRecord,
                                                complaint: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className={`flex mt-4 w-full`}>
                                    <div className="w-full mr-2">
                                        <InputLabel htmlFor="name" value="Tindakan Perawat" />
                                        <TextArea
                                            id="name"
                                            type="text"
                                            name="name"
                                            readOnly={true}
                                            value={checkupRecord.action}
                                            className={`mt-1 block w-full focus:border-none`}
                                            onChange={(e) => setCheckupRecord({
                                                ...checkupRecord,
                                                action: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full mr-2 mt-4">
                                    <InputLabel htmlFor="clinic" value="Perawat" />

                                    <HealthWorkerListPopoverMultiSearch readOnly={true} healthWorkerType={1} items={checkupRecord.health_workers} className='h-8 w-96 mr-2' onSelect={onSelectHealthWorker} />

                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Diagnosa Dokter</div>

                            <div className="flex">
                                <div className="w-1/2 mr-4">
                                    <div>
                                        <div className={`flex w-full mt-2`}>
                                            <div className="w-full mr-2">
                                                <InputLabel htmlFor="name" value="No Pemeriksaan" />
                                                <TextInput
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={medicalCheckup.checkup_number}
                                                    className={`mt-1 h-8 block w-full focus:border-none`}
                                                    readOnly={true}
                                                    placeholder={'[Terisi Otomatis]'}
                                                />
                                            </div>
                                        </div>
                                        <div className={`flex mt-4 w-full`}>
                                            <div className="w-full mr-2">
                                                <InputLabel htmlFor="name" value="Dokter Pemeriksa" />

                                                <DoctorListPopoverSearch clinic={checkupRecord.registration.clinic} className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectDoctor} item={medicalCheckup.doctor} />
                                            </div>
                                        </div>
                                        {clinic.toLowerCase() == 'gigi' ? <MedicalCheckupAddGigi /> : null}
                                        {clinic.toLowerCase() == 'umum' ? <MedicalCheckupAddUmum /> : null}
                                        {clinic.toLowerCase() == 'mata' ? <MedicalCheckupAddMata /> : null}
                                        <div className={`flex mt-4 w-full`}>
                                            <div className="w-full mr-2">
                                                <InputLabel htmlFor="name" value="Spirometri" />
                                                <TextArea
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={medicalCheckup.spirometry}
                                                    className={`mt-1 block w-full focus:border-none`}
                                                    onChange={(e) => setMedicalCheckup({
                                                        ...medicalCheckup,
                                                        spirometry: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className={`flex mt-4 w-full`}>
                                            <div className="w-full mr-2">
                                                <InputLabel htmlFor="name" value="Tata Letak" />
                                                <TextArea
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={medicalCheckup.governance}
                                                    className={`mt-1 block w-full focus:border-none`}
                                                    onChange={(e) => setMedicalCheckup({
                                                        ...medicalCheckup,
                                                        governance: e.target.value
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className={`flex mt-4 w-full`}>
                                            <div className="w-full mr-2">
                                                <InputLabel htmlFor="name" value="Rujukan" />

                                                <TextInput
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={medicalCheckup.reference}
                                                    className={`mt-1 block w-full h-8 focus:border-none`}
                                                    onChange={(e) => setMedicalCheckup({ ...medicalCheckup, reference: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className={`flex mt-4 w-full`}>
                                            <div className="w-full mr-2">
                                                <InputLabel htmlFor="name" value="Surat" />

                                                <CertificateListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectCertificate} item={medicalCheckup.certificate} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <div className={`flex mt-2 w-full`}>
                                        <div className="w-full mr-2">
                                            <InputLabel htmlFor="clinic" value="Penyakit" />

                                            <DiseaseListPopoverMultiSearch items={medicalCheckup.diseases} className='h-8 w-96 mr-2' onSelect={onSelectDisease} />

                                        </div>
                                    </div>
                                    <div className={`flex mt-2 w-full`}>
                                        <div className="w-full mr-2">
                                            <InputLabel htmlFor="clinic" value="Tindakan" />

                                            <TreatmentListPopoverMultiSearch items={medicalCheckup.treatments} className='h-8 w-96 mr-2' onSelect={onSelectTreatment} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-4 w-full pr-2">
                                <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={onSubmit}>
                                    Simpan
                                </PrimaryButton>
                                <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400">
                                    Batal
                                </PrimaryButton>
                            </div>
                        </div>
                        <MedicalCheckupItemConsumableItemList medicalCheckup={medicalCheckup} />
                        <MedicalCheckupItemMedicineItemList medicalCheckup={medicalCheckup} />
                        <MedicalCheckupCompound medicalCheckup={medicalCheckup}/>
                    </Tabs>
                    {/* <div className="w-1/2">
                        <Tabs />
                    </div> */}
                </div>
            </div> :
            null
        }
    </AdminLayout>
}