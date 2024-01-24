import { applicationTheme } from "@/Common/Theme";
import { ClearButton } from "@/Components/Button/ClearButton";
import ClearPill from "@/Components/Pill/ClearPill";
import Pill from "@/Components/Pill/Pill";
import SlideSideBar from "@/Layouts/SlideSideBar";
import { useTheme } from "@/app";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import MeddicalCheckupHistoryList from "../MedicalCheckup/MedicalCheckupHIstoryList";

export default function PatientInformation({ patient, registration, showMMedicalCheckupHistory = true, ...props }) {
    const { theme } = useTheme();
    const { bigFontColorTheme, borderedBottomTheme, layoutTheme } = applicationTheme(theme);
    
    const [isFormOpen, setFormOpen] = useState(false);

    const onShowHistoryPatient = () => {
        
        setFormOpen(true);
    }

    return <div className={`${layoutTheme} flex`}>
        <SlideSideBar className={`w-full`} isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={true} title="Histori Rekam Medis">
            <MeddicalCheckupHistoryList patient={patient} />
        </SlideSideBar>
        {patient.person && <div className={`w-1/2`}>
            <div className="flex text-center">
                <div className={`text-4xl ${bigFontColorTheme} mr-2`}>{patient.person.name}</div>
                <ClearPill className={'bg-green-600 h-6 text-white text-xs text-center'}>{patient.medical_record_number}</ClearPill>
            </div>
            <div className="flex text-center mb-1">
                <div className="text-xl">{patient.person.gender.name} &#8226; {patient.person.age} Tahun </div>
            </div>
            <div className="flex text-center mb-1">
                <div className="text-sm uppercase">{patient.person.address}</div>
            </div>
            <div className="flex text-center mb-1">
                <div className="text-sm mr-2 uppercase">{patient.person.village.name}, </div>
                <div className="text-sm mr-2 uppercase">{patient.person.village.district.name}, </div>
                <div className="text-sm mr-2 uppercase">{patient.person.village.district.regency.name}, </div>
                <div className="text-sm mr-2 uppercase">{patient.person.village.district.regency.province.name}</div>
            </div>
            {registration && registration.id > 0 ? <div className="flex justify-between">
                <Pill className={`bg-green-600 text-white h-6`}>
                    Poli {registration.clinic.name}
                </Pill>
                {showMMedicalCheckupHistory && <ClearButton onClick={onShowHistoryPatient} className={`bg-green-600 text-white h-6 flex items-center hover:bg-green-400`}>
                    <FaEye className="mr-2"/> Lihat Rekam Medis
                </ClearButton>}
            </div> : null}
        </div>}

    </div>
}