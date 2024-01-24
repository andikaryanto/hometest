import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import Panel from "@/Components/Panel";
import PrimaryButton from "@/Components/PrimaryButton";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import { useTheme } from "@/app";
import { useRecoilState } from "recoil";
import TextInput from "@/Components/Input/TextInput";
import DoctorListPopoverSearch from "@/Pages/Doctor/DoctorListPopoverSearch";
import { medicalCheckupTreatmentIncentiveFilterState } from "@/States/MedicalCheckup/Treatment/MedicalCheckupTreatmentIncentive";

export default function MedicalCheckupTreatmentIncentiveDoctorFilter({
    onFilterApply
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [incentiveDoctorFilter, setIncentiveDoctorFilter] = useRecoilState(medicalCheckupTreatmentIncentiveFilterState);

    const onSelectDoctor = (doctor) => {
        setIncentiveDoctorFilter({
            ...incentiveDoctorFilter,
            doctor: doctor  
        })
    }

    return <Panel isVisible={true} className={'w-48 pt-4 px-2'}>
        <div>Filter</div>
        <div className={`mt-4`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Tanggal" />
                <TextInput
                    id="name"
                    type="date"
                    name="name"
                    value={incentiveDoctorFilter.incentive_date}
                    className={`mt-1 block w-full focus:border-none h-8`}
                    onChange={(e) => setIncentiveDoctorFilter({
                        ...incentiveDoctorFilter,
                        incentive_date: e.target.value
                    })}
                />
            </div>
        </div>
        <div className="mt-4">
            <InputLabel htmlFor="clinic" value="Dokter" />

            <DoctorListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectDoctor} item={incentiveDoctorFilter.doctor} />

        </div>

        <div className="flex items-center justify-end mt-4">

            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" onClick={onFilterApply}>
                Terapkan
            </PrimaryButton>
        </div>
    </Panel>
}