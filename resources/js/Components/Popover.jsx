import { applicationTheme } from "@/Common/Theme";
import { useTheme } from "@/app";
import { useEffect, useRef, useState } from "react";

export default function Popover({ isOpen, onPopoverState, children, className, ...props }) {
    const { theme } = useTheme();
    const { layoutTheme, borderTheme, bigFontColorTheme } = applicationTheme(theme);

    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const popoverRef = useRef();

    const handleClickOutside = (event) => {
        if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target)
        ) {
            setPopoverOpen(false);
            onPopoverState(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        // Update local state when the parent prop changes
        setPopoverOpen(isOpen);
    }, [isOpen]);

    return <div className={`absolute rounded-lg mt-2`}>
        {isPopoverOpen && (
            <div
                ref={popoverRef}
                className={`absolute ${className} top-full mt-1 rounded-lg bg-green-600 text-white`}
                style={{ zIndex: 1000 }}
            >
                {children}
            </div>
        )}
    </div>
}