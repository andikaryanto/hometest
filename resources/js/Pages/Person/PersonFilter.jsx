import { applicationTheme } from "@/Common/Theme";
import InputLabel from "@/Components/InputLabel";
import Panel from "@/Components/Panel";
import PrimaryButton from "@/Components/PrimaryButton";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import { personFilterState } from "@/States/Person";
import { useTheme } from "@/app";
import { useRecoilState } from "recoil";
import TextInput from "@/Components/Input/TextInput";

export default function PersonFilter({
    onFilterApply
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);
    const [personFilter, setPersonFilter] = useRecoilState(personFilterState);

    const onSelectClinic = (clinic) => {
        setPersonFilter({
            ...personFilter,
            clinic: clinic
        })
    }

    return <Panel isVisible={true} className={'w-48 pt-4 px-2'}>
        <div>Filter</div>
        <div className="mt-4">
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="No RM" />

                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={personFilter.medical_record_number}
                    className={`mt-1 block w-full h-8 focus:border-none`}
                    isFocused={true}
                    onChange={(e) => setPersonFilter({ ...personFilter, medical_record_number: e.target.value })}
                />
            </div>
            <div className="flex items-center justify-end mt-4 mr-1">

                <PrimaryButton className="h-8 ml-4 bg-green-500 hover:bg-green-400" onClick={onFilterApply}>
                    Terapkan
                </PrimaryButton>
            </div>
        </div>
    </Panel>
}