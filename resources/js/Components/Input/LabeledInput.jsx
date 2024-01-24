import { FaSearch } from "react-icons/fa"

export const LabeledInput = ({label, placeholder, type, name, onChange,  ...props}) => {
    return <>    
        <p className="pl-1 pr-2 text-[14px] mb-2 ">
            {label}
        </p>
        <div className="flex border-[1px] border-off-white flex-col h-full rounded-fulltext-navy-700 dark:text-white xl:w-6/12 mr-2 mb-6 rounded-lg">
            <input
                {...props}
                onChange={onChange}
                name={name}
                type={type}
                placeholder={placeholder}
                className="border-none focus:ring-0 rounded-lg outline-none w-full border-1 focus:outline-none text-[14px]"
            />
        </div>
    </>
}