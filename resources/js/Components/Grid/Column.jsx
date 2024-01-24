export const Column = ({children, className, ...props}) => {
    return  <div {...props} className={ className +' container flex flex-col md:flex-row mb-5'}>
        {children}
    </div>
}