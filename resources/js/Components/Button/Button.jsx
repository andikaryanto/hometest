import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";

export const Button = ({ children, className, ...props }) => {
    const { theme } = useTheme();
    const { hoverTheme, bigFontColorTheme } = applicationTheme(theme);

    return <button {...props} className={`${hoverTheme} ${className} ${bigFontColorTheme}`} >{children}</button>;
}