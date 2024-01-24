
import { post } from "@/Common/Request/Request";
import { BorderedRoundedButton } from "@/Components/Button/BorderedRoundedButton";
import { RoundedButton } from "@/Components/Button/RoundedButton";
import { Form } from "@/Components/Form/Form";
import { LabeledInput } from "@/Components/Input/LabeledInput";
import { ButtonLink } from "@/Components/Link/ButtonLink";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function VillageAdd() {

    const [isLoading, setIsLoading ] = useState(false);
    const [form, setForm] = useState({
        name: '',
        district_name: '',
        city_name: '',
    });

    const setFormData = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }


    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/village',null, form)
        .then(result => {
            setIsLoading(false);
            if(result.status >= 200) {
                alert('Data tersimpan');
            }
        });
    };

    return <AdminLayout textName={'Add Village'}>
        <Form onSubmit={submit} className={'flex flex-col'}>
            <div>
                <LabeledInput label="Name" placeholder = "Name" type="text" name='name' onChange={(e) => setFormData('name', e.target.value)}/>
            </div>
            <div>
                <LabeledInput label="District" placeholder = "District" type="text" name='district_name' onChange={(e) => setFormData('district_name', e.target.value)}/>
            </div>
            <div>
                <LabeledInput label="City" placeholder = "City" type="text" name='city_name' onChange={(e) => setFormData('city_name', e.target.value)}/>
            </div>
            <div>
                <BorderedRoundedButton disabled={isLoading} className={'hover:bg-primary hover:text-white'}>Save</BorderedRoundedButton>
                <ButtonLink href="/villages" className={'bg-primary text-white hover:bg-dark-primary'}>Cancel</ButtonLink>
            </div>
        </Form>
    </AdminLayout>
}