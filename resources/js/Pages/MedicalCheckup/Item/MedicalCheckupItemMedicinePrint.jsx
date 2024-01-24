import { url_medical_checkup, url_medical_checkup_item } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import getParameterValue, { formatCurrency } from "@/Common/Helper";
import { get } from "@/Common/Request/Request";
import { medicalCheckupState } from "@/States/MedicalCheckup";
import { medicalCheckupItemState } from "@/States/MedicalCheckup/ItemState";
import { usePage } from "@inertiajs/react"
import { Result } from "postcss";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

export default function PaymentPrint({ }) {
    const page = usePage();
    const medicalCheckupItemId = getParameterValue(page, 'medical_checkup_item_id');
    const medicalCheckupCompoundId = getParameterValue(page, 'medical_checkup_compound_id');
    const medicalCheckupId = getParameterValue(page, 'medical_checkup_id');

    const [medicalCheckupItem, setMedicalCheckupItem] = useRecoilState(medicalCheckupItemState);
    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupState);
    const [medicalCheckupCompound, setMedicalCheckupCompound] = useState([]);

    const loadMedicalCheckup = () => {
        get(url_medical_checkup + '/' + medicalCheckupId, getToken())
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckup(result.data.data._resources);
                    if (medicalCheckupItemId) {
                        for (const medical_checkup_item of result.data.data._resources.medical_checkup_items) {
                            if (medical_checkup_item.id == medicalCheckupItemId) {
                                setMedicalCheckupItem(medical_checkup_item);
                            }
                        }
                    }

                    if (medicalCheckupCompoundId) {
                        for (const medical_checkup_compound of result.data.data._resources.medical_checkup_compounds) {
                            if (medical_checkup_compound.id == medicalCheckupCompoundId) {
                                setMedicalCheckupCompound(medical_checkup_compound);
                            }
                        }
                    }
                }
            })
    }

    let signa = '';

    useEffect(() => {
        loadMedicalCheckup();
    }, []);

    useEffect(() => {
        if (medicalCheckupItem.id > 0) {
            window.print();
        }
    }, [medicalCheckupItem]);

    return <div className="xl:w-2/12 w-1/3 px-2 text-black text-xs">

        <div className="mb-6">
            <div className="flex items-center">
                <div>No.</div>
                <div>_____________</div>
                <div>Tgl</div>
                <div>:{(new Date()).toLocaleDateString('id-ID', { dateStyle: "medium" })}</div>
                <div className="ml-4">Sex</div>
                <div>:{medicalCheckup.checkup_record.registration.patient.person?.gender?.name.substring(0, 1)}</div>
            </div>
            <div className="flex items-center">
                <div>Nama</div>
                <div>:{medicalCheckup.checkup_record.registration.patient.person?.name}</div>
            </div>
            <div className="flex items-center">
                <div>RM</div>
                <div>:{medicalCheckup.checkup_record.registration.patient.medical_record_number}</div>
            </div>
            <div className="flex items-center">
                <div>Tgl Lahir</div>
                <div>:{medicalCheckup.checkup_record.registration.patient.person?.date_of_birth}
                    ({medicalCheckup.checkup_record.registration.patient.person?.age} Tahun)
                </div>
            </div>
            {medicalCheckupItemId && <><div className="flex items-center font-bold">
                <div>Obat</div>
                <div>:{medicalCheckupItem.item.name}
                </div>
                <div className="ml-4">{medicalCheckupItem.quantity}</div>
                <div className="ml-1">{medicalCheckupItem.item.uom.name}
                </div>
            </div>
                <div className="flex items-center">
                    <div>{medicalCheckupItem.signa}
                    </div>
                </div>
            </>}
            {medicalCheckupCompoundId && <><div className="items-center font-bold">
                <div>Obat:</div>
                {medicalCheckupCompound.medical_checkup_items && medicalCheckupCompound.medical_checkup_items.map((e, i) => {
                    if (i == 0) {
                        signa = e.signa;
                    }
                    return <div className="flex">
                        <div>{e.item.name}</div>
                        <div className="ml-4">{e.quantity}</div>
                        <div className="ml-1">{e.item.uom.name}
                        </div>
                    </div>
                })}
            </div>
                <div className="flex items-center">
                    <div>{signa}
                    </div>
                </div>
            </>}
            {/* <div className="flex items-center">
                <div className="w-1/2">Tgl</div>
                <div>:{new Date()}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">Dokter</div>
                <div>:{medicalCheckupItem.doctor.name}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">Nama Pasien</div>
                <div>:{medicalCheckupItem.checkup_record.registration.patient.person.name}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">Jenis Pendaftaran</div>
                <div>:{medicalCheckupItem.checkup_record.registration.registration_type.name}</div>
            </div> */}
        </div>

    </div>
}