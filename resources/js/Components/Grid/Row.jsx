export const Row = ({children, className, ...props}) => {
    return  <div {...props} className={ className +' container flex flex-row md:flex-col mb-5'}>
        {children}
    </div>
}