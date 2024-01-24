import { useTheme } from "@/app";
import { Link } from "@inertiajs/react";

export default function ButtonLink({ className = '', disabled, children, ...props }) {    return (
        <Link
            {...props}
            className={
                `inline-flex items-center px-2 py-2 text-white border border-transparent rounded-md uppercase text-xs tracking-widest focus:outline-none transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
        >
            {children}
        </Link>
    );
}
