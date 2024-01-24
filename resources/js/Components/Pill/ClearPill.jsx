export default function ClearPill({className, ...props}) {
    return <div className={`px-2 py-1 rounded-full ${className}`}>
        {props.children}
    </div>;
}