import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";

export const Form = ({ children, className, ...props }) => {
    const { theme } = useTheme();
    const { layoutTheme, borderTheme } = applicationTheme(theme);

    return <div className={`${className} ${layoutTheme} border-none`}>
        {children}
    </div>;
}