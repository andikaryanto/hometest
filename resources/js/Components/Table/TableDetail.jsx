export const TableDetail = ({children, className, position = 'left', ...props}) => {
    let classPosition = 'text-left';
    if(position == 'right') {
        classPosition = 'text-right';
    }

    return <td className={`font-normal pl-8 ${classPosition} ${className}`}>{children}</td>
}