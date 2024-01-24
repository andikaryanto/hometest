export default function Pill({className, ...props}) {
    return <div className={`px-2 rounded-lg h-4 ${className}`}>
        {props.children}
    </div>;
}