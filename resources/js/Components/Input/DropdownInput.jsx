import { useState } from "react";

export const DropdownInput = ({items, idField, textField, onSelect, ...props}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
        onSelect(event.target.value);
    };

    const itemsSelect = items.map((e, i) => {
                return <option value={e[idField]}>{e[textField]}</option>
    });

    return (
        <div>
        <select
            value={selectedOption}
            onChange={handleOptionSelect}
            className="w-40 p-2 border border-gray-300 rounded"
        >
            <option value="">Select an option</option>
            {itemsSelect}
        </select>
        </div>
    );
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [placeholder, setPlaceholder] = useState('Select an option')
  
//     const toggleDropdown = () => {
//       setIsOpen(!isOpen);
//     };
  
//     const handleOptionSelect = (option) => {
//         console.log(option);
//       setSelectedOption(option[textField]);
//       setIsOpen(false);
//       onSelect(option);
//       setPlaceholder(option[textField]);
//     };

//     const itemsSelect = items.map((e, i) => {
//         return <li className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => {console.log('aaaaa'); handleOptionSelect(e)}}>
//                 {e[textField]}
//             </li>
//    }); 
  
//     return (
//       <div className="relative">
//         <input
//           type="text"
//           value={selectedOption}
//           onChange={() => {}}
//           onFocus={toggleDropdown}
//           onBlur={toggleDropdown}
//           placeholder={placeholder}
//           className="w-40 p-2 border border-gray-300 rounded"
//         />
//         {isOpen && (
//           <ul className="absolute top-10 left-0 right-0 z-10 bg-white border border-gray-300 rounded shadow" onClick={() => console.log('aaaa')}>
//             {itemsSelect}
//           </ul>
//         )}
//       </div>
//     );
  };