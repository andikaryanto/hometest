import { useTheme } from "@/app";

export default function PrimaryButton({ className = '', disabled, children, ...props }) {    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 text-white border border-transparent rounded-md uppercase text-xs tracking-widest focus:outline-none transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
