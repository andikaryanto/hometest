import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import Panel from "@/Components/Panel";
import PrimaryButton from "@/Components/PrimaryButton";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import { useTheme } from "@/app";
import { useRecoilState } from "recoil";
import TextInput from "@/Components/Input/TextInput";
import { medicalCheckupTreatmentIncentiveFilterState } from "@/States/MedicalCheckup/Treatment/MedicalCheckupTreatmentIncentive";
import HealthWorkerListPopoverInput from "@/Pages/HealthWorker/HealthWorkerListPopoverInput";

export default function MedicalCheckupTreatmentIncentiveNurseFilter({
    onFilterApply
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [incentiveNurseFilter, setIncentiveNurseFilter] = useRecoilState(medicalCheckupTreatmentIncentiveFilterState);

    const onSelectNurse = (healthWorker) => {
        setIncentiveNurseFilter({
            ...incentiveNurseFilter,
            health_worker: healthWorker
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
                    value={incentiveNurseFilter.incentive_date}
                    className={`mt-1 block w-full focus:border-none h-8`}
                    onChange={(e) => setIncentiveDoctorFilter({
                        ...incentiveNurseFilter,
                        incentive_date: e.target.value
                    })}
                />
            </div>
        </div>
        <div className="mt-4">
            <InputLabel htmlFor="clinic" value="Perawat" />

            <HealthWorkerListPopoverInput 
                className={`mt-1 block w-full h-8 focus:border-none`} 
                onSelect={onSelectNurse} 
                healthWorkerType={1}
                item={incentiveNurseFilter.health_worker} />

        </div>

        <div className="flex items-center justify-end mt-4">

            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" onClick={onFilterApply}>
                Terapkan
            </PrimaryButton>
        </div>
    </Panel>
}