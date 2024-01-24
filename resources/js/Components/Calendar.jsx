import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React, { useEffect, useState } from 'react';

const Calendar = ({onSelectDate, value, ...props}) => {
  const {theme} = useTheme()
  const { inputTheme, borderTheme } = applicationTheme(theme);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onSelectDate(e);
  };

  useEffect(() => {
    if(value) {
      setSelectedDate(value);
    }
  }, [value])

  return (
    <div className="mx-auto max-w-md">
      
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className={`mt-1 p-2 block w-full rounded-md ${props.className} ${inputTheme} ${borderTheme} `}
      />
    </div>
  );
};

export default Calendar;
