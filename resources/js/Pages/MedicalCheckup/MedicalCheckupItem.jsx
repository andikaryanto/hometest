import { medicalCheckupState } from "@/States/MedicalCheckup";
import { useRecoilState, useRecoilValue } from "recoil";
import PatientInformation from "../Patient/PatientInformation";
import { useTheme } from "@/app";
import { applicationTheme } from "@/Common/Theme";
import { formatCurrency } from "@/Common/Helper";
import { FaPrint } from "react-icons/fa";
import ButtonLink from "@/Components/Button/ButtonLink";
import Toggle from "@/Components/Toggle";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { patch } from "@/Common/Request/Request";
import { url_medical_checkup } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { ResponseMessages } from "@/Common/ResponseMessages";

export default function MedicalCheckupItem({ title, onManipulate, ...props }) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const updateMedicalCheckup = () => {
        setProcessing(true);
        patch(url_medical_checkup + '/' + medicalCheckup.id, getToken(), {
            is_prescription_given: medicalCheckup.is_prescription_given
        })
        .then(result => {
            if(result.status == 200) {
                setMedicalCheckup(result.data.data._resources);
                setToast({
                    color: ToastColor.success,
                    message: ResponseMessages.data_saved
                });

                if(onManipulate) {
                    onManipulate();
                }
            };
            
            setProcessing(false);
        })
        .catch(err => {
            setToast({
                color: ToastColor.danger,
                message: ResponseMessages.data_failed_to_save
            });
            setProcessing(false);
        })
    }

    console.log(medicalCheckup);

    return <div className="pt-4 pl-4 pr-4 mb-10 w-full">
        {medicalCheckup ? <><div className="w-full">
            <PatientInformation showMMedicalCheckupHistory={false}
                patient={medicalCheckup.checkup_record.registration.patient}
                registration={medicalCheckup.checkup_record.registration} />
        </div>
            <div className="w-full">

                <div className="w-1/2">
                    <div className="mt-4">
                        <div className="flex">
                            <div className="w-24">No Periksa </div>
                            <div>: #{medicalCheckup.checkup_number}</div>
                        </div>
                        <div className="flex">
                            <div className="w-24">Dokter </div>
                            <div>: {medicalCheckup.doctor.name}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat</div>
                        </div>
                        <div className="mt-2 w-full">
                            <div className="flex justify-between w-full text-green-400">
                                <div className="w-32">Nama</div>
                                <div className="w-32">Jumlah</div>
                                <div className="w-32">Signa</div>
                                <div className="w-32">Harga</div>
                                <div className="w-32"></div>
                            </div>
                            {medicalCheckup.medical_checkup_items && medicalCheckup.medical_checkup_items
                                .filter((e, i) => e.item.item_type.id == 1).map((e, i) => {
                                    return <div className="flex justify-between w-full items-center">
                                        <div className="w-32">{e.item.name}</div>
                                        <div className="w-32">{e.quantity}</div>
                                        <div className="w-32">{e.signa}</div>
                                        <div className="w-32">{formatCurrency(e.price_per_unit, false)}</div>
                                        <div className="w-32">
                                            <ButtonLink href={'medical-checkup/item/print?medical_checkup_id=' + medicalCheckup.id + '&medical_checkup_item_id=' + e.id}
                                                className={`bg-blue-600 hover:bg-blue-400 text-white`}
                                            >
                                                <FaPrint />
                                            </ButtonLink>
                                        </div>
                                    </div>
                                })}
                        </div>

                        {medicalCheckup.medical_checkup_compounds && <>
                            <div className="flex mt-8">
                                <div className={`text-lg ${bigFontColorTheme} font-semibold`}>Obat Racikan</div>
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between w-full text-green-400">
                                    <div className="w-32">Nama</div>
                                    <div className="w-32">Jumlah</div>
                                    <div className="w-32">Signa</div>
                                    <div className="w-32">Harga</div>
                                    <div className="w-32"></div>
                                </div>
                                {medicalCheckup.medical_checkup_compounds.map((compound, i) => {
                                    return <div>
                                        <div className={`${bigFontColorTheme}`}> {'Racikan ' + (i + 1)}</div>
                                        <div className="mb-4">{compound.medical_checkup_items.map((e, j) => {
                                            let signa = '';
                                            if (j == 0) {
                                                signa = e.signa;
                                            }
                                            return <div className="flex justify-between w-full items-center">
                                                <div className="w-32">{e.item.name}</div>
                                                <div className="w-32">{e.quantity}</div>
                                                <div className="w-32">{signa}</div>
                                                <div className="w-32">{formatCurrency(e.price_per_unit, false)}</div>
                                                <div className="w-32">{j == 0 ?
                                                    <ButtonLink href={'medical-checkup/item/print?medical_checkup_id=' + medicalCheckup.id + '&medical_checkup_compound_id=' + compound.id}
                                                        className={`bg-blue-600 hover:bg-blue-400 text-white`}>
                                                        <FaPrint />
                                                    </ButtonLink> :
                                                    null}</div>
                                            </div>
                                        })}</div>
                                    </div>
                                })}
                            </div>
                        </>}
                    </div>
                    <div className="flex mt-6">
                        <div className="mr-6">Obat Sudah Diberikan?</div>
                        <Toggle checked={medicalCheckup.is_prescription_given}
                            onToggle={isChecked => setMedicalCheckup({ ...medicalCheckup, is_prescription_given: isChecked })}
                        />
                    </div>
                    <div className="flex items-center mt-6">

                        <PrimaryButton className=" bg-green-500 hover:bg-green-400" disabled={processing} onClick={updateMedicalCheckup}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
            : null}
    </div>
}