import { medicalCheckupState } from "@/States/MedicalCheckup";
import { useRecoilValue } from "recoil";
import PatientInformation from "../Patient/PatientInformation";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";

export default function MedicalCheckupInformation({ title, ...props }) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const medicalCheckup = useRecoilValue(medicalCheckupState);
    return <div className="pt-4 pl-4 pr-4 mb-10 w-full">
        {medicalCheckup ? <><div className="w-full">
            <PatientInformation patient={medicalCheckup.checkup_record.registration.patient} registration={medicalCheckup.checkup_record.registration} />
        </div>
            <div className="w-full flex">
                <div className="w-1/2">
                    <div className="mt-4">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Pemeriksaan Awal</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">No Periksa:</div>
                            <div>{medicalCheckup.checkup_record.checkup_number}</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Diagnosa Perawat:</div>
                            <div>{medicalCheckup.checkup_record.diagnose}</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Perawat:</div>
                            <div>{medicalCheckup.checkup_record.health_workers.map((e, i) => e.name).join('; ')}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Diagnosa Dokter</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">No Periksa:</div>
                            <div>{medicalCheckup.checkup_number}</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Dokter Pemeriksa:</div>
                            <div>{medicalCheckup.doctor.name}</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Penyakit:</div>
                            <div>{medicalCheckup.diseases.map((e, i) => e.name).join('; ')}</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Tindakan:</div>
                            <div>{medicalCheckup.medical_checkup_treatments && medicalCheckup.medical_checkup_treatments.map((e, i) => e.treatment.name).join('; ')}</div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="mt-4">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Obat Satuan:</div>
                            <div>{medicalCheckup.medical_checkup_items && medicalCheckup.medical_checkup_items
                                .filter((e, i) => e.item.item_type.id == 1).map((e, i) => e.item.name).join('; ')}</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Obat Racikan:</div>
                            <div>
                                {medicalCheckup.medical_checkup_compounds && medicalCheckup.medical_checkup_compounds.map((e, i) => {
                                    return <div>
                                        <div>{'Racikan ' + (i + 1)}</div>
                                        <div className="mb-4">{e.medical_checkup_items.map((e, i) => e.item.name).join('; ')}</div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Bahan Habis Pakai</div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-2/12">Barang:</div>
                            <div>{medicalCheckup.medical_checkup_items && medicalCheckup.medical_checkup_items
                                .filter((e, i) => e.item.item_type.id == 2).map((e, i) => e.item.name).join('; ')}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
            : null}
    </div>
}