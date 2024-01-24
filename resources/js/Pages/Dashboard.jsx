import { RoundedCard } from '@/Components/Card/RoundedCard';
import { AdminLayout } from '@/Layouts/AdminLayout';
import avatar2 from '../../assets/img/avatars/avatar-2.jpeg';
import SmallCircleAvatar from '@/Components/Avatar/SmallCircleAvatar';
import SmallRoundedAvatar from '@/Components/Avatar/SmallRoundedAvatar';
import { RoundedButton } from '@/Components/Button/RoundedButton';
import { Button } from '@/Components/Button/Button';
import { Column } from '@/Components/Grid/Column';
import { useTheme } from '@/app';
import { applicationTheme } from '@/Common/Theme';
import PrimaryButton from '@/Components/PrimaryButton';
import { useRecoilState } from 'recoil';
import { medicalCheckupListState } from '@/States/MedicalCheckup';
import { useEffect } from 'react';
import { get } from '@/Common/Request/Request';
import { url_medical_checkup, url_medical_checkups } from '@/Common/Api';
import { getToken } from '@/Common/GetCookie';
import Pill from '@/Components/Pill/Pill';
import { formatCurrency } from '@/Common/Helper';

export default function Dashboard({ 
    patientCount, 
    totalPayment,
    itemCount
 }) {
    const { theme } = useTheme();
    const { borderedBottomTheme, mainBgTheme, layoutTheme, bigFontColorTheme, borderTheme } = applicationTheme(theme);

    const [medicalCheckups, setMedicalCheckups] = useRecoilState(medicalCheckupListState);

    const loadMedicalCheckup = () => {
        get(url_medical_checkups, getToken(), {
            size: 5
        })
            .then(result => {
                if (result.status == 200) {
                    setMedicalCheckups(result.data.data);
                }
            })
            .catch(err => {

            })
    }

    useEffect(() => {
        loadMedicalCheckup();
    }, [])

    return <AdminLayout textName={'Dashboard'}>
        <div className='p-2'>
            <div className='flex w-full'>
                <div className={`${layoutTheme} w-2/3 pr-4 rounded-lg `}>
                    <div className={`rounded-lg p-4 flex justify-between items-center mb-4 ${mainBgTheme}`}>
                        <div>
                            <div className={`text-xl`}>
                                Total Transaksi
                            </div>
                            <div className={`${bigFontColorTheme} text-3xl`}>
                                {formatCurrency(totalPayment)}
                            </div>
                        </div>
                        <div>
                            <PrimaryButton className='bg-green-600 hover:bg-green-500'>Lihat Detail</PrimaryButton>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className={`rounded-lg p-4 flex justify-between items-center mb-10  ${mainBgTheme} w-1/2 mr-2`}>
                            <div>
                                <div className={`text-xl`}>
                                    Total Pasien
                                </div>
                                <div className={`${bigFontColorTheme} text-3xl`}>
                                    {patientCount}
                                </div>
                            </div>
                        </div>
                        <div className={`rounded-lg p-4 flex justify-between items-center mb-10 ${mainBgTheme} w-1/2`}>
                            <div>
                                <div className={`text-xl`}>
                                    Total Item
                                </div>
                                <div className={`${bigFontColorTheme} text-3xl`}>
                                    {itemCount}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={`${layoutTheme} rounded-lg justify-between items-center`}>
                        <div className={`${bigFontColorTheme} text-x mb-6`}>
                            Pemeriksaan Pasien Terakhir
                        </div>
                        {medicalCheckups._resources && medicalCheckups._resources.map((e, i) => {
                            return <div className={`${borderedBottomTheme} mb-4 pb-2 flex items-center justify-between`}>
                                <div>
                                    <div>
                                        {e.checkup_number}
                                    </div>
                                    <div className='flex'>
                                        <Pill className='text-sm mr-2 bg-green-600 text-white h-5'>
                                            {e.checkup_record.registration.patient.person?.name}
                                        </Pill>
                                        <div className='text-sm'>
                                            {e.created_at}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {formatCurrency(e.payment?.amount, false)}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div> */}
                </div>
                <div className={`${mainBgTheme} w-1/3 p-4 rounded-lg justify-between items-center`}>
                    <div className={`${bigFontColorTheme} text-x mb-6`}>
                        Pemeriksaan Pasien Terakhir
                    </div>
                    {medicalCheckups._resources && medicalCheckups._resources.map((e, i) => {
                        return <div className={`${borderedBottomTheme} mb-4 pb-2 flex items-center justify-between`}>
                            <div>
                                <div>
                                    {e.checkup_number}
                                </div>
                                <div className='flex text-sm'>
                                    <Pill className='mr-2 bg-green-600 text-white h-5'>
                                        {e.checkup_record.registration.patient.person?.name}
                                    </Pill>
                                    <div>
                                        {e.created_at}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {formatCurrency(e.payment?.amount, false)}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </AdminLayout>;
}
