// Example Popover.jsx component

import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import PopoverInput from './PopoverInput';
import Pill from '../Pill/Pill';

const PopoverMultiInput = ({ items = [], onRemove, keyValue, children, ...props }) => {

  const remove = (item) => {
    onRemove(item);
  }

  return <div>
    <PopoverInput {...props}>{children}</PopoverInput>
    <div className='flex flex-wrap mt-2 text-center'>
      {items.length > 0 ? items.slice().sort((a, b) => a[keyValue].localeCompare(b[keyValue])).map((e, i) => {
        return <Pill className={`bg-green-600 h-6 mr-2 mb-2 text-white flex`}>
          <div>{e[keyValue]}</div>
          {!props.readOnly ? <div className='flex text-center mt-1 ml-3'><FaTimes onClick={() => remove(e)} className='cursor-pointer' /></div> : null}
        </Pill>
      }) : null}
    </div>
    
  </div>
};

export default PopoverMultiInput;
