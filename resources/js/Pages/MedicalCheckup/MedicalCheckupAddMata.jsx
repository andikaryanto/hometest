import TextArea from "@/Components/Input/TextArea";
import InputLabel from "@/Components/InputLabel";
import { medicalCheckupMataState } from "@/States/MedicalCheckupFormMata";
import { useRecoilState } from "recoil";

export default function MedicalCheckupAddMata() {
    const [medicalCheckup, setMedicalCheckup] = useRecoilState(medicalCheckupMataState);

    return <>
        <div className={`flex mt-2 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Pemeriksaan Fisik" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.phisical}
                    className={`mt-1 block w-full focus:border-none`}
                    isFocused={true}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            phisical: e.target.value
                        }
                    })}
                />
            </div>
        </div>
        <div className={`flex mt-4 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Riwayat Kehamilan" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.pregnancy_history}
                    className={`mt-1 block w-full focus:border-none`}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            pregnancy_history: e.target.value
                        }
                    })}
                />
            </div>
        </div>
        <div className={`flex mt-4 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Riwayat Imunisasi" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.immunization_history}
                    className={`mt-1 block w-full focus:border-none`}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            immunization_history: e.target.value
                        }
                    })}
                />
            </div>
        </div>
        <div className={`flex mt-4 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Pemeriksaan DDST" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.ddst}
                    className={`mt-1 block w-full focus:border-none`}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            ddst: e.target.value
                        }
                    })}
                />
            </div>
        </div>
        <div className={`flex mt-4 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Riwayat Penyakit Lain" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.disease_history}
                    className={`mt-1 block w-full focus:border-none`}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            disease_history: e.target.value
                        }
                    })}
                />
            </div>
        </div>
        <div className={`flex mt-4 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="Riwayat Penyakit Keluarga" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.disease_family_history}
                    className={`mt-1 block w-full focus:border-none`}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            disease_family_history: e.target.value
                        }
                    })}
                />
            </div>
        </div>
        <div className={`flex mt-4 w-full`}>
            <div className="w-full mr-2">
                <InputLabel htmlFor="name" value="EKG" />
                <TextArea
                    id="name"
                    type="text"
                    name="name"
                    value={medicalCheckup.form.electrocardiography}
                    className={`mt-1 block w-full focus:border-none`}
                    onChange={(e) => setMedicalCheckup({
                        ...medicalCheckup,
                        form:{
                            ...medicalCheckup.form,
                            electrocardiography: e.target.value
                        }
                    })}
                />
            </div>
        </div>
    </>
}