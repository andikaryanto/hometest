import { getToken } from "@/Common/GetCookie";
import { destroy, patch, post } from "@/Common/Request/Request";
import { BorderedRoundedButtonSmall } from "@/Components/Button/BorderedRoundedButtonSmall";
import { RoundedCard } from "@/Components/Card/RoundedCard";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/Input/TextInput";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClinicListSelectInput from "../Clinic/ClinicListSelectInput";
import { useRecoilState } from "recoil";
import { userNewObject, userState } from "@/States/User";
import { Form } from "@/Components/Form";
import { url_user } from "@/Common/Api";
import ScopeListPopoverMultiSearch from "../Scope/ScopeListPopoverMultiSearch";

export default function User({ title, onSubmit, ...props }) {
    const [user, setUser] = useRecoilState(userState);
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (user.id == 0) {
            post(url_user, getToken(), user)
                .then(result => {
                    if (result.status == 201) {
                        setUser(result.data.data._resources);
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {
                    setProcessing(false);
                });
        } else {
            patch(url_user + '/' + user.id, getToken(), user)
                .then(result => {
                    if (result.status == 200) {
                        setUser(result.data.data._resources)
                        onSubmit();
                    }
                    setProcessing(false);
                }).catch(err => {

                    setProcessing(false);
                });
        }
    }

    const onEdit = (user) => {
        setUser(user)
    }

    const onDelete = () => {
        setProcessing(false);
        destroy(url_user + '/' + user.id, getToken())
            .then(result => {
                if (result.status == 200) {
                    setUser(userNewObject);
                    onSubmit();
                }
                setProcessing(false);
            });
    }

    const onSelect = (items) => {
        setUser({
            ...user,
            scopes: items
        })
    }

    useEffect(() => {
        // if(item && Object.entries(item).length > 0) {
        //     setUser({
        //         ...item,
        //         clinic: item._resources.clinic
        //     });
        // }
    }, [])



    return (
        <div className="w-full ">
            {user ? <Form className={'w-full text-gray-400 border-gray-200 border border-opacity-20 justify-center'}>
                <div className="mb-5 text-2xl">{user.id > 0 ? 'Edit' : 'Tambah'} {title}</div>
                {/* <form onSubmit={() => { }}> */}
                <div>
                    <InputLabel htmlFor="clinic" value="Scope" />

                    <ScopeListPopoverMultiSearch className='h-8 w-96' onSelect={onSelect} items={user.scopes} />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="code" value="Nama" />

                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={user.username}
                        className="mt-1 block w-full h-8"
                        isFocused={true}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Email" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={user.email}
                        className="mt-1 block w-full h-8"
                        isFocused={true}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    {/* <InputError message={errors.email} className="mt-2" /> */}
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Password" />

                    <TextInput
                        id="description"
                        type="password"
                        name="description"
                        value={user.password}
                        className="mt-1 block w-full h-8"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />

                </div>
                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="ml-4 bg-green-500 hover:bg-green-400" disabled={processing} onClick={submit}>
                        Simpan
                    </PrimaryButton>
                    <PrimaryButton className="ml-4 bg-red-500 hover:bg-red-400" disabled={processing || user.id == null} onClick={onDelete}>
                        Hapus
                    </PrimaryButton>
                </div>
                {/* </form> */}
            </Form> : null}
        </div>)
}