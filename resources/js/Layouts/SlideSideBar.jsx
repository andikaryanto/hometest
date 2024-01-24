import { applicationTheme } from "@/Common/Theme";
import { Button } from "@/Components/Button/Button";
import { useTheme } from "@/app";
import { FaAlignLeft, FaArrowLeft, FaArrowRight, FaClosedCaptioning, FaDoorClosed, FaRegWindowClose, FaTimes, FaWindowClose, FaXing } from "react-icons/fa";
import ThemeButton from "./ThemeButton";

export default function SlideSideBar({ isOpen, onClose, children, position = 'right', isScrollabe = false, title = '', className, ...props }) {
  const { theme, toggleTheme } = useTheme();
  const { layoutTheme, bgTheme, bigFontColorTheme, borderedBottomTheme } = applicationTheme(theme);

  let classPosition = 'right-0';
  let translate = isOpen ? 'translate-x-0' : 'translate-x-full';
  if (position === 'left') {
    classPosition = 'left-0';
    translate = isOpen ? 'translate-x-0' : '-translate-x-full';
  }

  let overFlowY = '';
  if (isScrollabe) {
    overFlowY = 'overflow-y-auto';
  }

  return (
    <div>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-30 ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      ></div>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 ${className} ${classPosition} ${layoutTheme} transform ${translate} transition-transform ease-in-out duration-300 z-40 ${overFlowY}`}>
        {/* min-w-40 sets a minimum width of 40 pixels, you can adjust this value */}
        <div className={`flex justify-between mb-3 ${borderedBottomTheme} p-4`}>
          <div className={`${bigFontColorTheme} text-2xl `}>{title}</div>
          <div className="flex">
            {/* <ThemeButton onClick={toggleTheme} /> */}
            <Button onClick={onClose} className={`${bgTheme} p-2 rounded-md`}> <FaTimes /></Button>
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
        {/* <div className={`${bigFontColorTheme} text-2xl ${className} p-4`}>{title}</div> */}
      </div>
    </div>
  );
};
