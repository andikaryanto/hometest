// Example Popover.jsx component

import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const PopoverInput = ({ placeholder, children, onChange, value, isOpen, onPopoverState, className, onClear, position = 'bottom', disposable = false, ...props }) => {
  const { theme } = useTheme();
  const { layoutTheme, inputTheme, disabled } = applicationTheme(theme);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const popoverRef = useRef();

  let bg = inputTheme;
  if (props.readOnly) {
    bg = disabled
  }

  const handleInputFocus = () => {
    setPopoverOpen(true);
    onPopoverState(true);
  };

  const handleInputBlur = () => {
    // Delay to check if the focus moved to the popover
    setTimeout(() => {
      if (!inputRef.current.contains(document.activeElement)) {
        setPopoverOpen(false);
      }
    }, 0);
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

  const inputChange = (e) => {
    setInputValue(e.target.value);
  }

  const onKeyDown = (e) => {
    if (e.key == 'Enter') {
      onChange(e);
    }
  }

  let style = {
    zIndex: 1000
  };

  let positionClass = '';

  if (position == 'top') {
    positionClass = 'bottom-10'
  }

  const onBlur = () => {
    if (disposable)
      setShowInput(false);
  }

  const onBoxClick = () => {
    if (disposable)
      setShowInput(true);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update local state when the parent prop changes
    setPopoverOpen(isOpen);
    setInputValue(value);
  }, [isOpen, value]);

  const popover = () => {
    return <div
      ref={popoverRef}
      className={`absolute w-max left-0 mt-1 rounded-lg ${layoutTheme} ${positionClass}`}
      style={style}
    >
      {children}
    </div>
  }

  return (
    <div className="relative rounded-lg">
      {isPopoverOpen && !props.readOnly && position == 'top' && popover()}
      <div className="flex items-center">
        {showInput ? <input
          autoComplete="off"
          ref={inputRef}
          type="text"
          readOnly={props.readOnly}
          onChange={inputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleInputFocus}
          // onBlur={onBlur}
          className={`mt-1 w-full p-2 rounded-md focus:outline-non mr-1 ${bg} ${className}`}
        /> : <div className='w-full' onClick={onBoxClick}>
          {inputValue}
        </div>}
        {value && !props.readOnly && (
          <a href='#'><FaTimes onClick={onClear} className='mt-1' /></a>
        )}
      </div>
      {isPopoverOpen && !props.readOnly && position == 'bottom' && popover()}
    </div>
  );
};

export default PopoverInput;
