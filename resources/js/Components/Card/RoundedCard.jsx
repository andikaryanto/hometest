import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";

export const RoundedCard = ({ children, className, ...props }) => {
    const { theme } = useTheme();
    const { layoutTheme, borderTheme } = applicationTheme(theme);

    return <div className={`bg-gray-800 mr-4 shadow-xl rounded-xl shadow-shadow p-4 mb-5 ${className} ${layoutTheme} ${borderTheme}`}>
        {children}
    </div>;
}