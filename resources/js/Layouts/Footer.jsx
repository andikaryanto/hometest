import Avatar from '@/Components/Avatar/Avatar';
import { useTheme } from '@/app';
import React from 'react';
import { applicationTheme } from '@/Common/Theme';
import ThemeButton from './ThemeButton';

const Footer = ({
}) => {

  const { theme, toggleTheme } = useTheme();
  const { bigFontColorTheme } = applicationTheme(theme);
  // Assume you have authentication information available
  const user = {
    name: 'John Doe',
    avatarUrl: 'https://img.freepik.com/premium-photo/caucasian-handsome-man-beige-wall-laughing_1368-97190.jpg'
    // other user information
  };
  const { layoutTheme, borderedTopTheme } = applicationTheme(theme);

  return (
    <footer className={`relative b-0 shadow ${layoutTheme}`}>
      <div className={`flex justify-end text-end p-3`}>
        Designed and developed by Multi Media
      </div>
    </footer>
  );
};

export default Footer;