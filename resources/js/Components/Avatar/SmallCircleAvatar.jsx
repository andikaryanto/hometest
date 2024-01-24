import React from 'react';

const SmallCircleAvatar = ({ imageUrl, altText, ...props }) => {
    const className = props.className + " w-10 h-10 rounded-full overflow-hidden";
    return (
        <div className={className}>
            <img src={imageUrl} alt={altText} className="w-full h-full object-cover" />
        </div>
    );
};

export default SmallCircleAvatar;
