import { Button } from "./Button";
import { RoundedButton } from "./RoundedButton";

export const BorderedRoundedButton  = ({children, className, ...props}) => {
    return <RoundedButton {...props} className={className + ''}>{children}</RoundedButton>;
}