import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React, { useEffect, useState } from 'react';

export const Toggle = ({ onToggle, checked, ...props }) => {
    const {theme} = useTheme();
    const { bigFontColorTheme, layoutLightTheme } = applicationTheme(theme);
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onToggle(!isChecked);
    };

    useEffect(() => {
        setIsChecked(checked);
    }, [checked])

    return (
        <label className="flex items-center cursor-pointer justify-between">
            <div className="relative w-8">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <div className={`w-8 h-4 bg-gray-400 rounded-full shadow-inner ${isChecked ? 'bg-green-600' : 'bg-red-500'} `}></div>
                <div
                    className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-0 left-0 ${isChecked ? 'translate-x-full' : 'translate-x-0'
                        } transition-transform duration-300 ease-in-out`}
                ></div>
            </div>
            <div className={`w-8 ml-3 text-gray-700 ${bigFontColorTheme} text-sm`}>{isChecked ? 'Ya' : 'Tidak'}</div>
        </label>
    );
};

export default Toggle;
