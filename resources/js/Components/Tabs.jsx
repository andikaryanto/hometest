// Tabs.js
import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React, { Children, useState } from 'react';

const Tabs = ({ children, headers = [], ...props }) => {
  const { theme } = useTheme()
  const { borderedBottomTheme } = applicationTheme(theme);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const activeTabClass = `bg-green-600 text-white  rounded-t-lg`;

  return (
    <div className={``}>
      <div className={`flex ${borderedBottomTheme}`}>
        {headers.map((e, i) => {
          return <div
            className={`tab px-3 py-2 cursor-pointer ${activeTab === i ? activeTabClass : ''}`}
            onClick={() => handleTabClick(i)}
          >
            {e}
          </div>
        })}
      </div>

      <div className="mt-4">
        {Children.map(children, (e, i) => {
          { return activeTab === i && e }
        })}
      </div>
    </div>
  );
};

export default Tabs;
