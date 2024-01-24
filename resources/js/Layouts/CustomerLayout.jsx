import { applicationTheme } from '@/Common/Theme';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useTheme } from '@/app';
import { Link } from '@inertiajs/react';
import homeBackground from '../../assets/img/customerhome2.jpg';
import { FaGlobe } from 'react-icons/fa';
import { ClearButton } from '@/Components/Button/ClearButton';
import { Button } from '@/Components/Button/Button';
import TextInput from '@/Components/Input/TextInput';
import TableChooser from '@/Pages/Table/TableChooser';
import SlideSideBar from './SlideSideBar';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tableState } from '@/States/Table';
import CustomerRegister from '@/Pages/Auth/CustomerRegister';
import Toast from '@/Components/Toast';
import CustomerLogin from '@/Pages/Auth/CustomerLogin';
import { getToken } from '@/Common/GetCookie';
import { tableReservationState } from '@/States/TableReservation';
import { post } from '@/Common/Request/Request';
import { url_table_reservation } from '@/Common/Api';
import { toastState } from '@/States/Common';
import { ToastColor } from '@/Common/Toast';

export default function CustomerLayout({ children }) {
    let title = '';
    const { theme } = useTheme();
    const { layoutTheme, layoutLightTheme, bigFontColorTheme } = applicationTheme(theme);
    const [isFormOpen, setFormOpen] = useState(false);    
    const [processing, setProcessing] = useState(false);    
    const [slideContent, setSlideContent] = useState(1);  
    const [tableReservation, setTableReservation] = useRecoilState(tableReservationState);  
    const [toast, setToast] = useRecoilState(toastState);  

    const onTableChoosen = (table) => {
        setTableReservation({
            ...tableReservation,
            table
        })
    }

    const onReserve = () => {
        setProcessing(true);
        post(url_table_reservation, getToken(), tableReservation)
        .then(result => {
            if(result.status == 201) {
                setTableReservation(result.data.data._resources);
                setToast({
                    color: ToastColor.success,
                    message: 'Reservation saved'
                })
            }
            setProcessing(false);
        })
        .catch(err => {
            setToast({
                color: ToastColor.danger,
                message: 'Reservation failed to Save'
            });
            setProcessing(false);
        });
    }

    let slideContentComponent = null;

    if(slideContent == 1) {
        title = 'Choose your table';
        slideContentComponent = <TableChooser onTableChoosen={table => onTableChoosen(table)} />
    } else if (slideContent == 2) {
        title = 'Register';
        slideContentComponent = <CustomerRegister />
    } else if (slideContent == 3) {
        title = 'Login';
        slideContentComponent = <CustomerLogin />
    }


    const onInputTableFocus = () => {
        setSlideContent(1);
        setFormOpen(true);
    }

    const onRegister = () => {
        setSlideContent(2);
        setFormOpen(true);
    }

    const onLogin = () => {
        setSlideContent(3);
        setFormOpen(true);
    }

    return (
        <div className={`min-h-screen pt-6 bg-gray-100 p-20`}
            style={{
                backgroundImage: `url(${homeBackground})`,
                backgroundSize: 'cover'
            }}>
            <div className='flex justify-between items-center text-white text-lg'>
                <div className='flex w-1/2 '>
                    <div className='flex justify-between w-1/3'>
                        <div>Home</div>
                        <div>Places</div>
                        <div>Help</div>
                    </div>
                </div>
                <div className='flex justify-end w-1/2'>
                    <div className='flex'>
                        <div className='flex items-center mr-4'>
                            <FaGlobe className='mr-3' />
                            <div> Language</div>
                        </div>
                        {!getToken('access_token') && <><Button onClick={onRegister} className={`text-white text-lg px-4 py-2 rounded-lg  mr-4 hover:text-black`}>Sign Up</Button>
                        <Button onClick={onLogin} className={`text-white text-lg px-4 py-2 rounded-lg bg-green-600  mr-4 hover:text-black`}>Sign In</Button></>}
                    </div>
                </div>
            </div>
            <div className='text-right items-center text-white text-9xl my-10'
                style={{
                    // fontFamily: 'Arial'
                }}
            >
                <div>Enjoy</div>
                <div>your favorite</div>
                <div>food</div>
            </div>
            <div className='bg-gray-200 h-18 rounded-2xl p-4 flex justify-between'>
                <div className='flex'>
                    <TextInput
                        type={`datetime-local`}
                        className={'w-64 mr-4'}
                        value={tableReservation.reserve_at}
                        onChange={e => setTableReservation({
                            ...tableReservation,
                            reserve_at: e.target.value
                        })}

                    />
                    <TextInput
                        type={`text`}
                        className={'w-64 mr-4'}
                        placeHolder={'Choose your table'}
                        value={'TABLE ' + tableReservation.table.name}
                        onFocus={onInputTableFocus} 
                    />
                </div>
                
                <Button disable={processing} onClick={onReserve} className={`text-white text-lg px-4 py-2 rounded-lg bg-green-600 hover:text-black`}>Reserve</Button>
            </div>
            <SlideSideBar className={`w-1/2`}isOpen={isFormOpen} onClose={() => setFormOpen(false)} position="left" isScrollabe={false} title={title}>
                {slideContentComponent}
            </SlideSideBar>
            
            <Toast />
        </div>
    );
}
