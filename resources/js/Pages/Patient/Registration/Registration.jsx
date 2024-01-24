import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { url_patient_registration } from "@/Common/Api";
import { patch, post } from "@/Common/Request/Request";
import { getToken } from "@/Common/GetCookie";
import { patientRegistrationNewObject, patientRegistrationState } from "@/States/Patient/Registration";
import ClinicListSelectInput from "@/Pages/Clinic/ClinicListSelectInput";
import RegistrationTypeListPopoverSearch from "@/Pages/RegistrationType/RegistrationListPopoverSearch";
import DoctorListPopoverSearch from "@/Pages/Doctor/DoctorListPopoverSearch";
import VisitTypeListPopoverSearch from "@/Pages/VisitType/VisitTypeListPopoverSearch";
import { Form } from "@/Components/Form";

export default function PatientRegistration({ title, onSubmit, ...props }) {
    const [patientRegistration, setPatientRegistration] = useRecoilState(patientRegistrationState);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const submit = (e) => {
        e.preventDefault();
        // setProcessing(true);
        if (patientRegistration.id == 0) {
            post(url_patient_registration, getToken(), patientRegistration)
                .then(result => {
                    if (result.status == 201) {
                        setPatientRegistration(patientRegistrationNewObject);
                        onSubmit();
                        setMessage('Data Tersimpan');
                    }
                    setProcessing(false);
                }).catch(err => {
                    setProcessing(false);
                });
        } else {
            patch(url_patient_registration + '/' + patientRegistration.id, getToken(), patientRegistration)
                .then(result => {
                    if (result.status == 200) {
                        setPatientRegistration(result.data.data._resources)
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

    const onSelectClinic = (clinic) => {
        setPatientRegistration({
            ...patientRegistration,
            clinic: clinic
        })
    }

    const onSelectRegistrationTyype = (registrationType) => {
        setPatientRegistration({
            ...patientRegistration,
            registration_type: registrationType
        })
    }

    const onSelectDoctor = (doctor) => {
        setPatientRegistration({
            ...patientRegistration,
            doctor: doctor
        });
    }

    const onSelectVisitType = (visitType) => {
        setPatientRegistration({
            ...patientRegistration,
            visit_type: visitType
        })
    }

    return (
        <div className="w-2/4 mr-4 ">
            {/* <div className="flex justify-end">
                <BorderedRoundedButtonSmall className={`bg-green-500 text-white hover:bg-green-400 hover:text-gray-200 flex items-center`}
                    onClick={() => setPatientRegistration(patientRegistrationNewObject)} >
                    <div className="mr-2">Tambah</div><FaPlus />
                </BorderedRoundedButtonSmall>
            </div> */}
            {patientRegistration ? <Form className={`w-full 20 justify-center`}>
                <div className="mb-5 text-2xl">{patientRegistration.id > 0 ? 'Edit' : 'Tambah'} {title}</div>
               
                <div className="mt-4">
                    <InputLabel htmlFor="clinic" value="Poli" />

                    <ClinicListSelectInput className={`mt-1 block w-full h-8 focus:border-none`}  onSelect={onSelectClinic} item={patientRegistration.clinic} />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="registration-type" value="Jenis Pendaftaran"/>

                    <RegistrationTypeListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`}  onSelect={onSelectRegistrationTyype} item={patientRegistration.registration_type} />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="doctor" value="Dokter"/>

                    <DoctorListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`}  onSelect={onSelectDoctor} item={patientRegistration.doctor} clinic={patientRegistration.clinic} />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="visit-type" value="Jenis Kunjungan"/>

                    <VisitTypeListPopoverSearch className={`mt-1 block w-full h-8 focus:border-none`}  onSelect={onSelectVisitType} item={patientRegistration.visit_type} />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>
                
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                        Simpan
                    </PrimaryButton>
                    <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || patientRegistration.id == null} onClick={onDelete}>
                        Hapus
                    </PrimaryButton>
                </div>
                {/* </form> */}
            </Form> : null}
        </div>
    )
}