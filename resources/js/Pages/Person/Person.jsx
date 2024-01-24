import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import { personNewObject, personState } from "@/States/Person";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import GenderInputList from "../Gender/GenderInputList";
import Calendar from "@/Components/Calendar";
import { url_person } from "@/Common/Api";
import { patch, post } from "@/Common/Request/Request";
import { getToken } from "@/Common/GetCookie";
import PatientInputSearch from "../Patient/PatientInputSearch";
import { patientRegistrationState } from "@/States/Patient/Registration";
import { toastState } from "@/States/Common";
import { ToastColor } from "@/Common/Toast";
import { Form } from "@/Components/Form";
import TextArea from "@/Components/Input/TextArea";
import VillageListPopoverSearch from "../Village/VillageListPopoverSearch";

export default function Person({ title, onSubmit, className, ...props }) {
    const [person, setPerson] = useRecoilState(personState);
    const [patientRegistration, setPatientRegistration] = useRecoilState(patientRegistrationState);
    const [notification, setNotification] = useRecoilState(toastState);
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // setProcessing(true);
        if (person.id == 0) {
            post(url_person, getToken(), person)
                .then(result => {
                    if (result.status == 201) {
                        setPerson(result.data.data._resources);
                        setPatientRegistration({
                            ...patientRegistration,
                            patient: result.data.data._resources.patient
                        });
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setNotification({
                        color: ToastColor.danger,
                        message: 'Gagal menyimpan data: ' + err.response.data.message
                    });
                    setProcessing(false);
                });
        } else {
            patch(person + '/' + person.id, getToken(), person)
                .then(result => {
                    if (result.status == 200) {
                        setClinic(result.data.data._resources)
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {

                    setProcessing(false);
                });
        }
    }

    const onDelete = () => {

    }

    const onSelectGender = (gender) => {
        setPerson({
            ...person,
            gender: gender
        })
    }

    const onSelectVillage = (village) => {
        setPerson({
            ...person,
            village: village,
            current_village: village

        })
    }

    return (
        <div className={`w-full ${className}`}>
            {/* <div className="flex justify-end">
                <BorderedRoundedButtonSmall className={`bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center`}
                    onClick={() => setPerson(personNewObject)} >
                    <div className="mr-2">Tambah</div><FaPlus />
                </BorderedRoundedButtonSmall>
            </div> */}
            {/* {person ? <RoundedCard className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}> */}
            {person ? <Form className={`w-full justify-center `}>
                <div className="mb-5 text-2xl">{person.id != 0 ? 'Edit' : 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                <div className="flex items-center">
                    <div className="w-full mr-2">
                        <InputLabel htmlFor="name" value="No rekam medik" />

                        <PatientInputSearch className={`h-8 focus:border-none`} />
                    </div >
                    <div className="w-full">
                        <InputLabel htmlFor="name" value="Nama" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={person.name}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            isFocused={true}
                            onChange={(e) => setPerson({ ...person, name: e.target.value })}
                        />

                        {/* <InputError message={errors.email} className="mt-2" /> */}
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <div className="w-full mr-2">
                        <InputLabel htmlFor="nik" value="NIK" />

                        <TextInput
                            id="nik"
                            type="text"
                            name="nik"
                            value={person.nik}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            onChange={(e) => setPerson({ ...person, nik: e.target.value })}
                        />
                    </div>

                    <div className="w-full">
                        <InputLabel htmlFor="date_of_birth" value="Tanggal Lahir" />
                        <Calendar value={person.date_of_birth} className={`mt-1 block w-full h-8 focus:border-none`} onSelectDate={(e) => setPerson({ ...person, date_of_birth: e.target.value })} />

                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <div className="w-full mr-2">
                        <InputLabel htmlFor="place_of_birth" value="Tempat Lahir" />

                        <TextInput
                            id="place_of_birth"
                            type="text"
                            name="place_of_birth"
                            value={person.place_of_birth}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            onChange={(e) => setPerson({ ...person, place_of_birth: e.target.value })}
                        />
                    </div>

                    <div className="w-full">
                        <InputLabel htmlFor="phone" value="Telepon" />

                        <TextInput
                            id="phone"
                            type="text"
                            name="phone"
                            value={person.phone}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            onChange={(e) => setPerson({ ...person, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <div className="w-full mr-2">
                        <InputLabel htmlFor="job" value="Pekerjaan" />

                        <TextInput
                            id="job"
                            type="text"
                            name="job"
                            value={person.job}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            onChange={(e) => setPerson({ ...person, job: e.target.value })}
                        />
                    </div>

                    <div className="w-full">
                        <InputLabel htmlFor="religion" value="Agama" />

                        <TextInput
                            id="religion"
                            type="text"
                            name="religion"
                            value={person.religion}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            onChange={(e) => setPerson({ ...person, religion: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <div className="w-full mr-2">
                        <InputLabel htmlFor="degree" value="Pendidikan" />

                        <TextInput
                            id="degree"
                            type="text"
                            name="degree"
                            value={person.degree}
                            className={`mt-1 block w-full h-8 focus:border-none`}
                            onChange={(e) => setPerson({ ...person, degree: e.target.value })}
                        />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="gender" value="Jenis Kelamin" />
                        <GenderInputList className={`mt-1 block w-full h-8 focus:border-none`}
                            onSelect={onSelectGender}
                            item={person.gender} />
                    </div>
                </div>
                <div className="flex items-center mt-4">
                    <div className="w-full">
                        <InputLabel htmlFor="name" value="Desa" />

                        <VillageListPopoverSearch position='top' className={`mt-1 block w-full h-8 focus:border-none`}
                            onSelect={onSelectVillage}
                            posi
                            item={person.village} />
                    </div >
                </div>
                <div className="flex items-center mt-4">
                    <div className="w-full">
                        <InputLabel htmlFor="gender" value="Alamat Lengkap" />
                        <TextArea 
                            id="address"
                            type="text"
                            name="address"
                            value={person.address}
                            className={`mt-1 block w-full focus:border-none`}
                            onChange={(e) => setPerson({ ...person, address: e.target.value })} />
                    </div>
                </div>
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                        Simpan
                    </PrimaryButton>
                    {/* <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || person.id == null} onClick={onDelete}>
                        Hapus
                    </PrimaryButton> */}
                </div>
                {/* </form> */}
            </Form> : null}
        </div>
    )
}