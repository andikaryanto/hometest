import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import Panel from "@/Components/Panel";
import PrimaryButton from "@/Components/PrimaryButton";
import SlideSideBar from "@/Layouts/SlideSideBar";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import DoctorListPopoverSearch from "@/Pages/Doctor/DoctorListPopoverSearch";
import VisitTypeListPopoverSearch from "@/Pages/VisitType/VisitTypeListPopoverSearch";
import { checkupRecordFilterState } from "@/States/CheckupRecord";
import { useTheme } from "@/app";
import { useRecoilState } from "recoil";
import RegistrationTypeListPopoverSearch from "../RegistrationType/RegistrationListPopoverSearch";

export default function CheckupRecordFilter({
    onFilterApply
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [checkupRecordFilter, setCheckupRecordFilter] = useRecoilState(checkupRecordFilterState);

    const onSelectClinic = (clinic) => {
        setCheckupRecordFilter({
            ...checkupRecordFilter,
            registration: {
                ...checkupRecordFilter.registration,
                clinic: clinic
            }
        })
    }

    const onSelectCheckupRecordTyype = (registrationType) => {
        setCheckupRecordFilter({
            ...checkupRecordFilter,
            registration: {
                ...checkupRecordFilter.registration,
                registration_type: registrationType
            }
        })
    }

    const onSelectDoctor = (doctor) => {
        setCheckupRecordFilter({
            ...checkupRecordFilter,
            registration: {
                ...checkupRecordFilter.registration,
                doctor: doctor
            }
        });
    }

    const onSelectVisitType = (visitType) => {
        setCheckupRecordFilter({
            ...checkupRecordFilter,
            registration: {
                ...checkupRecordFilter.registration,
                visit_type: visitType
            }
        })
    }

    return <Panel isVisible={true} className={'w-48 pt-4 px-2'}>
        <div>Filter</div>
        <div className="mt-4">
            <InputLabel htmlFor="clinic" value="Poli" />

            <ClinicListSelectInput className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectClinic} item={checkupRecordFilter.registration.clinic} />

        </div>
        <div className="mt-4">
            <InputLabel htmlFor="checkupRecord-type" value="Jenis Pendaftaran" />

            <RegistrationTypeListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectCheckupRecordTyype} item={checkupRecordFilter.registration.registration_type} />

        </div>
        <div className="mt-4">
            <InputLabel htmlFor="doctor" value="Dokter" />

            <DoctorListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectDoctor} item={checkupRecordFilter.registration.doctor} clinic={checkupRecordFilter.registration.clinic} />

        </div>

        <div className="mt-4">
            <InputLabel htmlFor="visit-type" value="Jenis Kunjungan" />

            <VisitTypeListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectVisitType} item={checkupRecordFilter.registration.visit_type} />

        </div>
        <div className="flex items-center justify-end mt-4 mr-1">

            <PrimaryButton className="h-8 ml-4 bg-green-500 hover:bg-green-400" onClick={onFilterApply}>
                Terapkan
            </PrimaryButton>
        </div>
    </Panel>
}