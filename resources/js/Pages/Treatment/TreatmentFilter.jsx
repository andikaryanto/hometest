import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import Panel from "@/Components/Panel";
import PrimaryButton from "@/Components/PrimaryButton";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import { diseaseFilterState } from "@/States/Disease";
import { useTheme } from "@/app";
import { useRecoilState } from "recoil";

export default function DiseaseFilter({
    onFilterApply
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [diseaseFilter, setDiseaseFilter] = useRecoilState(diseaseFilterState);

    const onSelectClinic = (clinic) => {
        setDiseaseFilter({
            ...diseaseFilter,
            clinic: clinic
        })
    }

    return <Panel isVisible={true} className={'w-48 pt-4 px-2'}>
        <div>Filter</div>
        <div className="mt-4">
            <InputLabel htmlFor="clinic" value="Poli" />

            <ClinicListSelectInput className={`mt-1 block w-full h-8 focus:border-none`} onSelect={onSelectClinic} item={diseaseFilter.clinic} />

        </div>
       
        <div className="flex items-center justify-end mt-4">

            <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" onClick={onFilterApply}>
                Terapkan
            </PrimaryButton>
        </div>
    </Panel>
}