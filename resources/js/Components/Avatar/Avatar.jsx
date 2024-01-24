// resources/js/Components/Avatar.jsx

import React from 'react';

const Avatar = ({ imageUrl, altText }) => {
  return (
    <div className="flex items-center">
      <img src={imageUrl} alt={altText} className="h-8 w-8 rounded-full object-cover" />
    </div>
  );
};

export default Avatar;
