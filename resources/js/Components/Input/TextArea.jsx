import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({className = '', isFocused = false, rows = 2, ...props }, ref) {
    const {theme} = useTheme();
    const { inputTheme, borderTheme, disabled } = applicationTheme(theme);
    const input = ref ? ref : useRef();

    let bg = inputTheme;
    if(props.readOnly) {
        bg = disabled
    }

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            rows={rows}
            className={
                `rounded-md shadow-sm ${className} ${bg} ${borderTheme} `
            }
            ref={input}
        />
    );
});
