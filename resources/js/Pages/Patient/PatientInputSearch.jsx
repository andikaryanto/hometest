import { url_person, url_persons } from "@/Common/Api";
import { getToken } from "@/Common/GetCookie";
import { get } from "@/Common/Request/Request";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/Input/TextInput";
import { patientRegistrationState } from "@/States/Patient/Registration";
import { personNewObject, personState } from "@/States/Person";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function PatientInputSearch({ ...props }) {
    const [person, setPerson] = useRecoilState(personState);
    const [patientRegistration, setPatientRegistration] = useRecoilState(patientRegistrationState);
    const [message, setMessage] = useState(null);

    const onKeyDown = (e) => {
        if (e.key == "Enter") {
            if(!e.target.value) {
                setPerson(personNewObject);              
                setMessage(null);  
                return;
            }

            get(url_persons, getToken(), {
                medical_record_number: e.target.value
            }).then(result => {
                if(result.status == 200){
                    const foundPerson = result.data.data._resources[0];
                    setPerson(foundPerson);    
                    
                    setPatientRegistration({
                        ...patientRegistration,
                        patient: foundPerson.patient
                    });                
                    setMessage(null);
                }
                if(result.status == 204) {        
                    setPerson(personNewObject);                                
                    setMessage('No rekam medik tidak ditemukan');
                }
            }).catch(e => {
                setMessage('Terjadi kesalahan saat mencari');
            })
        }
    }

    const onChange = (e) => {
        const newPerson = {
            ...person,
            patient: {
                medical_record_number: e.target.value
            }
        };
        setPerson(newPerson);
    }

    return <>
        <TextInput {...props}
            placeholder={'Cari No. rekam medik eg: RM000001, Enter'}
            className={`mt-1 block w-full ${props.className}`}
            value={person.patient.medical_record_number}
            onChange={onChange}
            onKeyDown={onKeyDown}
        >

        </TextInput>
        <InputError message={message} className="mt-2" />
    </>

}