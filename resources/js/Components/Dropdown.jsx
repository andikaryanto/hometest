// resources/js/Components/Dropdown.jsx

import React from 'react';

const Dropdown = ({ items, onItemClick }) => {
  return (
    <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg">
      <ul>
        {items.map((item) => (
          <li key={item.label} onClick={() => onItemClick(item)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
