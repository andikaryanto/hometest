import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import Panel from "@/Components/Panel";
import PrimaryButton from "@/Components/PrimaryButton";
import SlideSideBar from "@/Layouts/SlideSideBar";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import DoctorListPopoverSearch from "@/Pages/Doctor/DoctorListPopoverSearch";
import RegistrationTypeListPopoverSearch from "@/Pages/RegistrationType/RegistrationListPopoverSearch";
import VisitTypeListPopoverSearch from "@/Pages/VisitType/VisitTypeListPopoverSearch";
import { patientRegistrationFilterState } from "@/States/Patient/Registration";
import { useTheme } from "@/app";
import { useRecoilState } from "recoil";

export default function RegistrationFilter({
    onFilterApply
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [registrationFilter, setRegistrationFilter] = useRecoilState(patientRegistrationFilterState);

    const onSelectClinic = (clinic) => {
        setRegistrationFilter({
            ...registrationFilter,
            clinic: clinic
        })
    }

    const onSelectRegistrationTyype = (registrationType) => {
        setRegistrationFilter({
            ...registrationFilter,
            registration_type: registrationType
        })
    }

    const onSelectDoctor = (doctor) => {
        setRegistrationFilter({
            ...registrationFilter,
            doctor: doctor
        });
    }

    const onSelectVisitType = (visitType) => {
        setRegistrationFilter({
            ...registrationFilter,
            visit_type: visitType
        })
    }

    return <Panel isVisible={true} className={'w-48 pt-4 px-2'}>
        <div>Filter</div>
        <div className="mt-4">
            <InputLabel htmlFor="clinic" value="Poli" />

            <ClinicListSelectInput className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectClinic} item={registrationFilter.clinic} />

        </div>
        <div className="mt-4">
            <InputLabel htmlFor="registration-type" value="Jenis Pendaftaran" />

            <RegistrationTypeListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectRegistrationTyype} item={registrationFilter.registration_type} />

        </div>
        <div className="mt-4">
            <InputLabel htmlFor="doctor" value="Dokter" />

            <DoctorListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectDoctor} item={registrationFilter.doctor} clinic={registrationFilter.clinic} />

        </div>

        <div className="mt-4">
            <InputLabel htmlFor="visit-type" value="Jenis Kunjungan" />

            <VisitTypeListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectVisitType} item={registrationFilter.visit_type} />

        </div>
        <div className="flex items-center justify-end mt-4 mr-1">

            <PrimaryButton className="h-8 ml-4 bg-green-500 hover:bg-green-400" onClick={onFilterApply}>
                Terapkan
            </PrimaryButton>
        </div>
    </Panel>
}