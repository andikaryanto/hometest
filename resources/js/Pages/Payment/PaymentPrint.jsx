import { url_medical_checkup } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import getParameterValue, { formatCurrency } from "@/Common/Helper";
import { get } from "@/Common/Request/Request";
import { medicalCheckupState } from "@/States/MedicalCheckup";
import { usePage } from "@inertiajs/react"
import { Result } from "postcss";
import { useEffect } from "react"
import { useRecoilState } from "recoil";

export default function PaymentPrint({ company }) {
    const page = usePage();
    const medicalCheckupId = getParameterValue(page, 'medical_checkup_id');

    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupState);

    const loadMedicalCheckup = () => {
        get(url_medical_checkup + '/' + medicalCheckupId, getToken())
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckup(result.data.data._resources);
                }
            })
    }

    useEffect(() => {
        loadMedicalCheckup();
    }, []);

    useEffect(() => {
        if (medicalCheckup.id > 0 && medicalCheckup.payment.id > 0) {
            window.print();
        }
    }, [medicalCheckup]);

    return medicalCheckup.id > 0 && medicalCheckup.payment && <div className="xl:w-2/12 w-1/2 px-2 text-black">
        <div className="border-b-2 border-black mb-6">
            <div className="font-bold flex items-center justify-center">
                <div>{company.name}</div>
            </div>
            <div className="flex items-center justify-center text-sm">
                <div>{company.address}</div>
            </div>
            <div className="flex items-center justify-center  text-sm">
                <div>Telp. {company.phone}</div>
            </div>
        </div>
        <div className="mb-6 text-xs">
            <div className="flex items-center">
                <div className="w-1/2">Tanggal Periksa</div>
                <div>:{medicalCheckup.created_at}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">No RM</div>
                <div>:{medicalCheckup.checkup_record.registration.patient.medical_record_number}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">No Nota</div>
                <div>:{medicalCheckup.payment.payment_number}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">Dokter</div>
                <div>:{medicalCheckup.doctor.name}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">Nama Pasien</div>
                <div>:{medicalCheckup.checkup_record.registration.patient.person.name}</div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2">Jenis Pendaftaran</div>
                <div>:{medicalCheckup.checkup_record.registration.registration_type.name}</div>
            </div>
        </div>
        <div className="mb-6 text-xs">
            <div className="flex items-center">
                <div className="w-1/2 font-bold">TARIF</div>
            </div>
            <div className="items-center pl-4">
                {medicalCheckup.medical_checkup_treatments.length > 0 &&
                    medicalCheckup.medical_checkup_treatments.map((e, i) => {
                        return <div className="flex justify-between">
                            <div>{e.treatment.name}</div>
                            <div>{formatCurrency(e.amount, false)}</div>
                        </div>
                    })}
            </div>
            <div className="flex items-center mt-4">
                <div className="w-1/2 font-bold">Obat</div>
            </div>
            <div className="items-center pl-4">
                {medicalCheckup.medical_checkup_items &&
                    medicalCheckup.medical_checkup_items.filter(x => x.item.item_type.id == 1).map((e, i) => {
                        return <div className="flex justify-between">
                            <div>{e.item.name} ({e.quantity})</div>
                            <div>{formatCurrency(e.amount, false)}</div>
                        </div>
                    })}
            </div>
            {medicalCheckup.medical_checkup_compounds && <>
                <div className="flex items-center mt-4">
                    <div className="w-1/2 font-bold">Obat Racik</div>
                </div>
                <div className="items-center pl-4">
                    {medicalCheckup.medical_checkup_compounds.length > 0 &&
                        medicalCheckup.medical_checkup_compounds.map((e, i) => {
                            return <>
                                <div>Racikann {i + 1}</div>

                                {e.medical_checkup_items.map((medicalCheckupItem, i) => {
                                    return <div className="flex justify-between pl-4">
                                        <div className="w-52">{medicalCheckupItem.item.name} ({medicalCheckupItem.quantity})</div>
                                        <div>{formatCurrency(medicalCheckupItem.amount, false)}</div>
                                    </div>
                                })}
                            </>
                        })}
                </div>
            </>}
            <div className="flex items-center mt-4">
                <div className="w-1/2 font-bold">Jasa Racik</div>
            </div>
            <div className="items-center pl-4">
                <div className="flex justify-between">
                    <div>Biaya</div>
                    <div>{formatCurrency(medicalCheckup.payment.compound_fee, false)}</div>
                </div>
            </div>
            <div className="flex items-center mt-4">
                <div className="w-1/2 font-bold">Bahan Habis Pakai</div>
            </div>
            <div className="items-center pl-4">
                {medicalCheckup.medical_checkup_items.length > 0 &&
                    medicalCheckup.medical_checkup_items.filter(x => x.item.item_type.id == 2).map((e, i) => {
                        return <div className="flex justify-between">
                            <div>{e.item.name} ({e.quantity})</div>
                            <div>{formatCurrency(e.price_per_unit, false)}</div>
                        </div>
                    })}
            </div>
            <div className="flex items-center mt-4 justify-end">
                <div>
                    <div className="flex justify-between">
                        <div className="w-36">Diskon</div>
                        <div>{formatCurrency(medicalCheckup.payment.discount, false)}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-36">Total</div>
                        <div>{formatCurrency(medicalCheckup.payment.amount, false)}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-36">Bayar</div>
                        <div>{formatCurrency(medicalCheckup.payment.payment_amount, false)}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-36">Kembalian</div>
                        <div>{formatCurrency(medicalCheckup.payment.change, false)}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-xs">
            <div className="flex items-center justify-center">
                <div>Terima Kasih Atas Kujungan Anda</div>
            </div>
            <div className="flex items-center justify-center uppercase">
                <div>Semoga Lekas Sembuh</div>
            </div>
        </div>
    </div>
}