import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";

export const TableRow = ({className, children, addSpace = false, highLight = false, ...props}) => {

    const {theme} = useTheme();
    const { hoverTheme, borderedBottomTheme } = applicationTheme(theme);

    let classHover = '';
    if(highLight) {
        classHover = hoverTheme;
    }

    return <tr className={className + ` cursor-pointer ${classHover} h-12`} {...props}>
        {children}
        {addSpace ? <div className="h-20"></div>: null}
    </tr>
}