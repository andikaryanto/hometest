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
                                Total Transaction Amount
                            </div>
                            <div className={`${bigFontColorTheme} text-3xl`}>
                                {formatCurrency(0)}
                            </div>
                        </div>
                        <div>
                            <PrimaryButton className='bg-green-600 hover:bg-green-500'>More Detail</PrimaryButton>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </AdminLayout>;
}
