import { forwardRef, useEffect, useRef, useState } from 'react';
import TextInput from './TextInput';

export const DisposableTextInput = ({value, showInput = true, ...props}) => {
    const [isShowInput, setIsShowInput] = useState(false);

    const onClick = () => {
        setIsShowInput(true);
    }

    const onBlur = () => {
        setIsShowInput(false);
    }

    useEffect(() => {
        setIsShowInput(showInput);
    }, [showInput])
    
    if(!isShowInput) {
        return <div className='border-2 w-48 h-8' onClick={onClick}>{value}</div>
    }
    
    return <TextInput value={value} {...props} autoFocus={isShowInput} onBlur={onBlur}/>
};
