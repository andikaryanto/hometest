import { applicationTheme } from "@/Common/Theme";
import PrimaryButton from "../PrimaryButton";
import { RoundedButton } from "./RoundedButton";
import { useTheme } from "@/app";
import { Button } from "./Button";

export const ClearButton = ({children,className,  ...props}) => {    
    const {theme} = useTheme();
    const { hoverTheme } =  applicationTheme(theme);
    return <Button className={`p-2 rounded-lg text-sm ${className}`} {...props}>{children}</Button>;
}