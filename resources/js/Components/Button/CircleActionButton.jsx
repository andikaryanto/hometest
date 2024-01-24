import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

export default function CircleActionButton({ items, onOptionClick, selectedItem, ...props }) {
  const { theme } = useTheme();
  const { hoverTheme, bgTheme, layoutTheme, borderTheme } = applicationTheme(theme);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const popoverRef = useRef();

  const handleInputFocus = () => {
    setPopoverOpen(true);
    // onPopoverState(true);
  };

  const handleInputBlur = () => {
    // Delay to check if the focus moved to the popover
    setTimeout(() => {
      if (!inputRef.current.contains(document.activeElement)) {
        setPopoverOpen(false);
      }
    }, 0);
  };

  const handleOptionClick = (option, selectedItem) => {
    setPopoverOpen(false);
    onOptionClick(option, selectedItem);
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      popoverRef.current &&
      !inputRef.current.contains(event.target) &&
      !popoverRef.current.contains(event.target)
    ) {
      setPopoverOpen(false);
      onPopoverState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update local state when the parent prop changes
    // setPopoverOpen(isOpen);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={inputRef}
        className="rounded-full p-2 focus:outline-none"
        // onClick={onClickOption}
        // onBlur={handleBlur}
        onFocus={handleInputFocus}
      >
        <FaEllipsisV />
      </button>

      {isPopoverOpen && (
        <div className={`z-10 absolute top-0 right-0 mt-2 rounded-lg shadow-md ${borderTheme} ${layoutTheme}`}
        ref={popoverRef}>
          {items.map((e, i) => {
            let rounded;
            if(items.length == 1) {
              rounded = 'rounded-lg';
            } else {
              rounded = i == 0 ? 'rounded-t-lg' : '';
              rounded = i == items.length - 1 ? 'rounded-b-lg' : rounded;
            }
            return <button
              className={`whitespace-nowrap text-sm block w-full ${rounded} text-left px-4 py-2 ${layoutTheme} ${hoverTheme}`}
              onClick={() => handleOptionClick(e, selectedItem)}
            >
              {e.caption}
            </button>
          })}
        </div>
      )}
    </div>
  );
};