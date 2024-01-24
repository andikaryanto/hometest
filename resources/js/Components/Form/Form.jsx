export const Form = ({className, children, onSubmit, ...props}) => {
    return <form {...props} onSubmit={onSubmit} className={className + ' container bg-white rounded-t-xl shadow-shadow shadow-xl w-full p-4 flex'}>
        <div >{children}</div>
    </form>;
}