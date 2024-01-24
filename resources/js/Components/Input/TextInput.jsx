import { formatCurrency, nanToZeroAmount, nanToZeroAmountString } from '@/Common/Helper';
import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const { theme } = useTheme();
    const { inputTheme, borderTheme, disabled } = applicationTheme(theme);
    const input = ref ? ref : useRef();

    let bg = inputTheme;
    if (props.readOnly) {
        bg = disabled
    }

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const onChange = (e) => {
        if (type == 'currency') {
            // const numericValue = formatCurrency(nanToZeroAmountString(e.target.value), false);
            // console.log(numericValue.toString());
            // Format the number with thousand separators
            // const formattedValue = new Intl.NumberFormat().format(Number(numericValue));
            const numericValue = e.target.value.replace(/[^0-9]/g, '');

            // Format the number with thousand separators
            const formattedValue = new Intl.NumberFormat('id-ID').format(Number(numericValue));
            e.target.currencyValue = formattedValue;
        }

        props.onChange(e);
    }

    return (
        <input
            {...props}
            // onChange={onChange}
            type={type}
            className={
                `rounded-md shadow-sm ${className} ${bg} ${borderTheme} `
            }
            ref={input}
        />
    );
});
