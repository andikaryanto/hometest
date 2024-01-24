import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRecoilState } from 'recoil';
import { userState } from '@/States/User';
import { ClearButton } from '@/Components/Button/ClearButton';
import { url_user } from '@/Common/Api';
import { post } from '@/Common/Request/Request';
import { toastState } from '@/States/Common';
import { ToastColor } from '@/Common/Toast';

export default function CustomerRegister() {
    const [user, setUser] = useRecoilState(userState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const register = () => {
        post(url_user, null, {
            ...user,
            scopes: [
                {
                    id: 2
                }
            ]
        })
        .then(result => {
            setToast({
                message: "Succedfully registered",
                color: ToastColor.success
            })
        })
    }


    return (

            <div>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={user.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        required
                    />

                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={user.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        required
                    />

                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={user.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        required
                    />

                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link> */}

                    <ClearButton onClick={register} className="ml-4 bg-green-600 text-white hover:bg-green-500" disabled={processing}>
                        Sign Up
                    </ClearButton>
                </div>
            </div>
    );
}
