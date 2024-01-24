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
import { url_user, url_user_login } from '@/Common/Api';
import { post } from '@/Common/Request/Request';
import { toastState } from '@/States/Common';
import { ToastColor } from '@/Common/Toast';
import Config from '@/Common/Config';

export default function CustomerLogin() {
    const [user, setUser] = useRecoilState(userState);
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useRecoilState(toastState);

    const login = () => {
        post(url_user_login, null, {
            ...user
        })
        .then(result => {
            if(result.status == 200){
                console.log(result.data.data)
                setCookie('access_token', result.data.data._resources.token, 60)
                setToast({
                    message: "Succedfully Logged In",
                    color: ToastColor.success
                });
                window.location = Config.web_url;
            }
        })
    }

    const setCookie = (name, value, minutes) => {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
      };


    return (

            <div>

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

                    <ClearButton onClick={login} className="ml-4 bg-green-600 text-white hover:bg-green-500" disabled={processing}>
                        Sign In
                    </ClearButton>
                </div>
            </div>
    );
}
