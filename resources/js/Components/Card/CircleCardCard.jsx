export const CircleCard = ({children, className, ...props}) => {
    return <div className={`mr-4 shadow-xl rounded-full shadow-shadow p-4 mb-5 bg-gray-800 ${className}`}>
        {children}
    </div>;
}