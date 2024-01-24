import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app"

export default function Panel({
    children,
    className,
    isVisible,
    ...props
}) {
    const { theme } = useTheme();
    const { layoutTheme, layoutLightTheme } = applicationTheme(theme);
    
    return isVisible ?
        <div className={`flex-shrink-0 rounded-lg ${className} ${layoutTheme}`}>{children}</div> :
        null;
}