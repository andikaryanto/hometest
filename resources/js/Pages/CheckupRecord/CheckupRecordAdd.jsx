import { url_checkup_record, url_patient_registration } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import getParameterValue from "@/Common/Helper";
import { get, patch, post } from "@/Common/Request/Request";
import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import ClearPill from "@/Components/Pill/ClearPill";
import Pill from "@/Components/Pill/Pill";
import TextInput from "@/Components/Input/TextInput";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { patientRegistrationState } from "@/States/Patient/Registration";
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

export default function CheckupRecordAdd() {
    const { theme } = useTheme();
    const { bigFontColorTheme, borderedBottomTheme, borderTheme } = applicationTheme(theme);
    const page = usePage();
    const registrationId = getParameterValue(page, 'registration_id');

    const [registration, setRegistration] = useRecoilState(patientRegistrationState);
    const [checkupRecord, setCheckupRecord] = useRecoilState(checkupRecordState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const loadRegisration = () => {
        get(url_patient_registration + '/' + registrationId, getToken(), {
            embed: ['checkup_record']
        })
            .then(result => {
                if (result.status == 200) {
                    setRegistration(result.data.data._resources);
                    if (result.data.data._resources.checkup_record) {
                        setCheckupRecord({
                            ...result.data.data._resources.checkup_record,
                            registration: result.data.data._resources
                        })
                    } else {
                        setCheckupRecord({
                            ...checkupRecord,
                            registration: result.data.data._resources
                        });
                    }
                }
            })
    }

    const onSubmit = () => {
        setProcessing(true);
        if (checkupRecord.id == 0) {
            post(url_checkup_record, getToken(), checkupRecord, {
                embed: ['checkup_record']
            })
                .then(result => {
                    if (result.status == 201) {
                        setProcessing(false);
                        setCheckupRecord(result.data.data._resources);
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
            patch(url_checkup_record + '/' + checkupRecord.id, getToken(), checkupRecord, {
                embed: ['checkup_record']
            })
                .then(result => {
                    if (result.status == 200) {
                        setProcessing(false);
                        setCheckupRecord(result.data.data._resources);
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
        })
    }

    useEffect(() => {
        loadRegisration();
    }, [])

    return <AdminLayout textName={`${checkupRecord.id > 0 ? 'Edit' : 'Tambah'} Pemeriksaan Awal`} breadCrumbItems={[
        {
            label: "Pemeriksaan Pasien"
        }, {
            label: "Pasien Daftar"
        }
    ]}>
        {registration.id > 0 ?
            <div className="pt-4 pl-4 mb-10 w-full">
                <PatientInformation patient={registration.patient} registration={registration} />
                <div className="w-1/2">
                    <div>
                        <div className="flex mt-6">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Kondisi Pasien</div>
                        </div>
                        <div className={`flex mt-1 w-full`}>
                            <div className="w-full mr-2">
                                <InputLabel htmlFor="name" value="Tekanan Darah (mmHg)" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={checkupRecord.blood_pressure}
                                    className={`mt-1 block w-full h-8 focus:border-none`}
                                    onChange={(e) => setCheckupRecord({ ...checkupRecord, blood_pressure: e.target.value })}
                                />
                            </div>
                            <div className="w-full mr-2">
                                <InputLabel htmlFor="name" value="Nadi (K/Min)" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
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
                                    value={checkupRecord.oxygen_saturation}
                                    className={`mt-1 block w-full h-8 focus:border-none`}
                                    onChange={(e) => setCheckupRecord({ ...checkupRecord, oxygen_saturation: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mr-2">
                        <div className={`text-lg mt-6 ${bigFontColorTheme} font-semibold`}>Alergi</div>
                        <div className="flex w-full justify-between">
                            <div className={`text-sm mr-4`}>Apakah pasien terindikasi alergi?</div>
                            <Toggle checked={checkupRecord.form.allergy.allergy.value} onToggle={checked => {
                                setCheckupRecord({
                                    ...checkupRecord,
                                    form: {
                                        ...checkupRecord.form,
                                        allergy: {
                                            allergy: {
                                                ...checkupRecord.form.allergy.allergy,
                                                value: checked
                                            }
                                        }
                                    }
                                })
                            }} />
                        </div>
                        <div className={`flex mt-4 w-full`}>
                            <div className="w-full">
                                <InputLabel htmlFor="name" value="Jika ya, Jelaskan" />
                                <TextArea
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={checkupRecord.form.allergy.allergy.description}
                                    className={`mt-1 block w-full focus:border-none`}
                                    onChange={(e) => setCheckupRecord({
                                        ...checkupRecord,
                                        form: {
                                            ...checkupRecord.form,
                                            allergy: {
                                                allergy: {
                                                    ...checkupRecord.form.allergy.allergy,
                                                    description: e.target.value
                                                }
                                            }
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mr-2">
                        <div className={`text-lg mt-6 ${bigFontColorTheme} font-semibold`}>Nyeri</div>
                        <div className="w-full">
                            <div className={`text-sm`}>Skala Numerik</div>
                            <div className="mt-2 justify-between">
                                <RadioButton className={`flex`} items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                    selected={checkupRecord.form.sore.sore.value}
                                    onSelect={(value) => {
                                        setCheckupRecord({
                                            ...checkupRecord,
                                            form: {
                                                ...checkupRecord.form,
                                                sore: {
                                                    sore: {
                                                        ...checkupRecord.form.sore.sore,
                                                        value: value
                                                    }
                                                }
                                            }
                                        })
                                    }} />
                            </div>
                        </div>
                    </div>
                    <div className="mr-2">
                        <div className={`text-lg mt-6 ${bigFontColorTheme} font-semibold`}>Gizi</div>
                        <div className="w-full">
                            <div className="w-full mr-2">
                                <InputLabel htmlFor="name" value="Indeks Massa Tubuh (kg/m2)" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={checkupRecord.form.nutrition.body_mass_index.value}
                                    className={`mt-1 block w-full h-8 focus:border-none`}
                                    onChange={(e) => setCheckupRecord({
                                        ...checkupRecord,
                                        form: {
                                            ...checkupRecord.form,
                                            nutrition: {
                                                ...checkupRecord.form.body_mass_index,
                                                body_mass_index: {
                                                    ...checkupRecord.form.sore.sore,
                                                    value: e.target.value
                                                }
                                            }
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mr-2">
                        <div className={`text-lg mt-6 ${bigFontColorTheme} font-semibold`}>Skrining Resiko Jatuh</div>
                        <div className="flex w-full justify-between">
                            <div>
                                <div className={`text-sm mr-4`}>Cara berjalan pasien (salah satu/lebih)</div>
                                <div className={`text-sm mr-4`}>a. Tidak seimbang/sempoyongan/limbung</div>
                                <div className={`text-sm mr-4`}>b. Jalan dengan alat bantu (kruk, tripod, kursi roda, orang lain)</div>
                            </div>
                            <Toggle checked={checkupRecord.form.fall_risk.gait.value} onToggle={checked => {
                                setCheckupRecord({
                                    ...checkupRecord,
                                    form: {
                                        ...checkupRecord.form,
                                        fall_risk: {
                                            ...checkupRecord.form.fall_risk,
                                            gait: {
                                                ...checkupRecord.form.fall_risk.gait,
                                                value: checked
                                            }
                                        }
                                    }
                                })
                            }} />
                        </div>
                        <div className="flex mt-4 w-full justify-between">
                            <div>
                                <div className={`text-sm mr-4`}>Ada Keterbatasan gerak?</div>
                            </div>
                            <Toggle checked={checkupRecord.form.fall_risk.movement_limitation.value} onToggle={checked => {
                                setCheckupRecord({
                                    ...checkupRecord,
                                    form: {
                                        ...checkupRecord.form,
                                        fall_risk: {
                                            ...checkupRecord.form.fall_risk,
                                            movement_limitation: {
                                                ...checkupRecord.form.fall_risk.movement_limitation,
                                                value: checked
                                            }
                                        }
                                    }
                                })
                            }} />
                        </div>
                    </div>
                    <div>
                        <div className={`text-lg mt-6 ${bigFontColorTheme} font-semibold`}>Diagnosa</div>
                        <div className={`flex mt-2 w-full`}>
                            <div className="w-full mr-2">
                                <InputLabel htmlFor="name" value="Diagnosa Perawat" />
                                <TextArea
                                    id="name"
                                    type="text"
                                    name="name"
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

                            <HealthWorkerListPopoverMultiSearch healthWorkerType={1} items={checkupRecord.health_workers} className='h-8 w-96 mr-2' onSelect={onSelectHealthWorker} />

                            {/* <InputError message={errors.email} className="mt-2" /> */}
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
                </div>
            </div> :
            null
        }
    </AdminLayout>
}