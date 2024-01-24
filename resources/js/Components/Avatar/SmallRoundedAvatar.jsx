import React from 'react';

const SmallRoundedAvatar = ({ imageUrl, altText, ...props }) => {
    const className = props.className + " w-10 h-10 rounded-lg overflow-hidden";
    return (
        <div className= {className}>
            <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
        </div>
    );
};

export default SmallRoundedAvatar;
