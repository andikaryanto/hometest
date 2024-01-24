import React, { useState } from 'react';
import { RoundedButton } from '../Button/RoundedButton';

export const Modal = ({ isDialog, onOk, className, title, description, text, ...props }) => {

    const [isClosed, setIsClosed] = useState(true);

    const closeModal = () => {
        setIsClosed(true);
    };

    const openModal = () => {
        setIsClosed(false);
    };

    let okButton = null;
    if(isDialog) {
        okButton = <RoundedButton
            className="bg-white hover:bg-dark-primary text-black hover:text-white outline-dark-primary border-[1px]"
            onClick={onOk}
            >
            OK
        </RoundedButton>;
    }

    return (
        <>
            <RoundedButton
                className="bg-primary hover:bg-dark-primary text-white"
                onClick={openModal}
            >
                {text}
            </RoundedButton>
            <div
            className={className + ` fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 ${
                isClosed ? 'invisible' : 'visible'
            }`}
            >
                <div className="bg-white rounded-lg p-6 max-w-xl w-full">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <p className="mb-4">{description}</p>
                    <div className='flex justify-end'>
                        {okButton}
                        <RoundedButton
                            className="bg-primary hover:bg-dark-primary text-white"
                            onClick={closeModal}
                            >
                            Close
                        </RoundedButton>
                    </div>
                </div>
            </div>
        </>
  );
};