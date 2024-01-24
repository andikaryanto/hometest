import { applicationTheme } from '@/Common/Theme';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useTheme } from '@/app';
import { Link } from '@inertiajs/react';
import loginBackground from '../../assets/img/clinic.png';

export default function Guest({ children }) {
    const { theme } = useTheme();
    const { layoutTheme, layoutLightTheme, bigFontColorTheme } = applicationTheme(theme);
    return (
        <div className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 ${layoutLightTheme}`}
            style={{
                backgroundImage: `url(${loginBackground})`
            }}>
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500 rounded-lg" />
                </Link>
            </div>

            <div className={`w-full sm:max-w-md mt-6 px-6 py-4 ${layoutLightTheme} shadow-lg overflow-hidden sm:rounded-lg`}>
                {children}
            </div>
        </div>
    );
}
