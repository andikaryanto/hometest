import Avatar from '@/Components/Avatar/Avatar';
import { useTheme } from '@/app';
import React, { useState } from 'react';
import { applicationTheme } from '@/Common/Theme';
import ThemeButton from './ThemeButton';
import Popover from '@/Components/Popover';
import { FaSignOutAlt } from 'react-icons/fa';
import { ClearButton } from '@/Components/Button/ClearButton';
import { useForm } from '@inertiajs/react';
import { getScopes, getUserName } from '@/Common/GetCookie';

const Header = ({
  title
}) => {

  const { theme, toggleTheme } = useTheme();
  const { bigFontColorTheme, layoutTheme, borderedBottomTheme } = applicationTheme(theme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm();

  const user = {
    name: getUserName(),
    avatarUrl: 'https://img.freepik.com/premium-photo/caucasian-handsome-man-beige-wall-laughing_1368-97190.jpg'
    // other user information
  };

  const showPopopver = () => {
    setIsPopoverOpen(!isPopoverOpen);
  }

  const logout = () => {
    post(route('logout'));
  }

  return (
    <header className={`shadow ${borderedBottomTheme} ${layoutTheme}`}>
      <div className="flex items-center justify-between p-3">
        <div className="flex justify-between">
          <div className={`text-xl font-bold ${bigFontColorTheme}`}>
            {title}
          </div>
        </div>
        <div className='flex'>
          <ThemeButton onClick={toggleTheme} />
          <div>
            <div className="flex items-center cursor-pointer"
              onClick={showPopopver}>
              {/* User logged-in UI */}
              <div className="mr-4">
                
              </div>

              <div className="flex items-center">
                <Avatar imageUrl={user.avatarUrl} altText="User Avatar" />
              </div>
            </div>
            <Popover className={'-right-10 w-48 pt-2'}
              isOpen={isPopoverOpen}
              onPopoverState={showPopopver}>
              <div className={`pl-4 border-b-white`}
                style={{
                  borderWidth: '0 0 1px 0'
                }}>
                <div >
                  {user.name}
                </div>
                <div className='mb-2 text-xs'>{getScopes().join(', ')}</div>
              </div>
              <div>
                {/* <FaSignOutAlt /> */}
                <ClearButton className={`text-left w-full pl-4 hover:bg-green-500 text-white`} onClick={logout}>Keluar</ClearButton>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;