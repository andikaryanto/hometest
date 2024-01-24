export const ButtonLink = ({children, className, ...props}) => {
    return <a {...props} className={ className + " rounded-full px-4 py-2 mr-2"}>{children}</a>;
}