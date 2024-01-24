import { Button } from "./Button";

export const RoundedButton = ({children, className, ...props}) => {
    return <Button {...props} className={className + " rounded-full px-4 py-2 mr-2 mb-2"}>{children}</Button>;
}