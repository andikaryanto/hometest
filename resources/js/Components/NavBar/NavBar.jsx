
import { FaSearch, FaBell, FaInfoCircle } from 'react-icons/fa';

import imgavatr from '../../../assets/img/avatars/avatar.jpg';
import SmallCircleAvatar from '../Avatar/SmallCircleAvatar';
export const NavBar = ({textName, ...props}) => {
    return (
        <div className="flex items-center justify-between px-6 py-4">
            {/* Your navigation bar content */}

            <div >
                <div className='text-[14px]'>Pages / {textName}</div>
                <div className="font-bold capitalize text-[33px]">{textName}</div>
            </div>
            <div className="flex justify-between bg-white items-center h-auto shadow-xl shadow-shadow p-2 rounded-full">
                <div className="flex h-full items-center rounded-full bg-light-green text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px] mr-2">
                    <p className="pl-3 pr-2 text-xl">
                        <FaSearch className='text-gray'/>
                    </p>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-none focus:ring-0 outline-none rounded-full bg-light-green w-full focus:outline-none"
                    />
                </div>
                <FaBell className='mr-2 text-gray text-sm'/>
                <FaInfoCircle className='mr-2 text-gray text-sm'/>
                <SmallCircleAvatar altText={'user'} imageUrl={imgavatr} />
            </div>
        </div>
    );
}