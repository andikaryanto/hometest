// src/RadioButton.js
import React, { useEffect, useState } from 'react';

export const RadioButton = ({ className, items = [], selected, onSelect, ...props }) => {
    const [selectedOption, setSelectedOption] = useState(0);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        onSelect(e.target.value);
    };

    useEffect(() => {
        setSelectedOption(selected);
    }, [selected])

    return (<>
        <div className={`${className}`}>
            {items.map((e, i) => {
                return <div className="flex items-center mr-6">
                    <input
                        type="radio"
                        id={e}
                        value={e}
                        checked={selectedOption == e}
                        onChange={handleOptionChange}
                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="option1" className="ml-2">
                        {e}
                    </label>
                </div>
            })}
        </div>

        <div className="mt-4">
            Dipilih: <strong>{selectedOption}</strong>
        </div>
    </>
    );
};

export default RadioButton;
