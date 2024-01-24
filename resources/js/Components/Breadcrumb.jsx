import { applicationTheme } from '@/Common/Theme';
import { useTheme } from '@/app';
import React from 'react';

const Breadcrumb = ({ items = [] }) => {
  const {theme} = useTheme();
  const { layoutTheme, bigFontColorTheme }  = applicationTheme(theme);
  return (
    <div className={`${layoutTheme} p-3 mb-4`}>
      <div className="list-none p-0 flex">
          {items.map((item, index) => (
            <div key={index} className={`flex items-center ${bigFontColorTheme}`}>
              {item.link ? (
                <div>
                  <a href={item.link}>{item.label}</a> 
                  {index < items.length - 1 ? <span className='mx-4'>/</span> : null}
                </div>
              ) : (
                <div>
                  <span>{item.label}</span>
                  {index < items.length - 1 ? <span className='mx-4'>/</span> : null}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
