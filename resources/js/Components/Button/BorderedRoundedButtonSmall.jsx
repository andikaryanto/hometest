import { BorderedRoundedButton } from "./BorderedRoundedButton";
import { Button } from "./Button";
import { RoundedButton } from "./RoundedButton";

export const BorderedRoundedButtonSmall  = ({children, className, ...props}) => {
    return <BorderedRoundedButton {...props} className={className + ' h-8 items-center text-xs'}>{children}</BorderedRoundedButton>;
}