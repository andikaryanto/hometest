import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";

export default function Page({
    children,
    className,
    textName,
    ...propa
}) {
    const { theme } = useTheme();
    const { bigFontColorTheme } = applicationTheme(theme);

    return <div className={`${className}`}>
        <div className="flex justify-between p-4">
            <div className={`text-2xl font-bold ${bigFontColorTheme}`}>
                {textName}
            </div>
        </div>
        {children}
    </div>
}