import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app"

export const TableHeader = ({children, ...props}) => {
    const {theme} = useTheme();
    const {bgTheme, bigFontColorTheme } = applicationTheme(theme);

    return <th className={`text-green-500 uppercase font-medium pl-8 py-[1px] text-left `}>{children}</th>
}