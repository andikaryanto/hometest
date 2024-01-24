// resources/js/Layouts/Sidebar.jsx

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faCogs, faUser, faCaretDown, faAngleDown, faAngleUp, faCircle, faCircleH, faDotCircle, faStethoscope, faUserDoctor, faKitMedical, faPills, faNotesMedical, faCog, faExchange, faTShirt, faMoneyBill, faMoneyCheck, faMoneyBillWave, faMoneyBill1Wave, faMoneyBillWaveAlt, faUsers, faBookMedical, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { usePage } from '@inertiajs/react';
import { useTheme } from '@/app';
import { applicationTheme } from '@/Common/Theme';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { getScopes } from '@/Common/GetCookie';

const Sidebar = () => {
    const { theme } = useTheme();
    const { borderRightTheme, layoutTheme, hoverTheme, bgTheme, bigFontColorTheme } = applicationTheme(theme);
    const [dropdownOpen, setDropdownOpen] = useState({
        parentName: '',
        isDropDownOpen: false
    });
   
    const tableReservationItems = [
        { title: 'Table Reservations', link: '/table-reservations', icon: faUser },
        // Add more dropdown menu items as needed
    ];

    const accounts = [
        { title: 'Account', link: '/app-users', icon: faUsers },
    ];

    const activeMenuItem = usePage();

    useEffect(() => {
        for (const menu of [
            [tableReservationItems, 'table-reservation'],
        ]) {
            for (const item of menu[0]) {
                if (activeMenuItem.url === item.link && menu[1] != '') {
                    setDropdownOpen({
                        isDropDownOpen: !dropdownOpen.isDropDownOpen,
                        parentName: menu[1]
                    })
                }
            }
        }

    }, [])

    const hasScope = (scopes = []) => {
        for (const storedScope of getScopes()) {
            if (scopes.includes(storedScope)) {
                return true;
            }
        }

        return false;
    }

    const parentMenu = (name, title, icon) => {
        return <div
            className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
            onClick={() => setDropdownOpen({
                isDropDownOpen: !dropdownOpen.isDropDownOpen,
                parentName: { name }
            }
            )}
        >
            <div>
                <FontAwesomeIcon icon={icon} className="mr-2" />
                <span>{title}</span>
            </div>
            <FontAwesomeIcon icon={dropdownOpen.isDropDownOpen && dropdownOpen.parentName == name ? faAngleUp : faAngleDown} />
        </div>
    }

    const menuState = (name) => {
        let isOpen = false;
        if (name == dropdownOpen.parentName && !dropdownOpen.isDropDownOpen) {
            isOpen = true
        }

        if (name != dropdownOpen.parentName) {
            isOpen = true
        }

        setDropdownOpen({
            isDropDownOpen: isOpen,
            parentName: name
        });
    }

    const angleIcon = (menuName) => {
        return dropdownOpen.isDropDownOpen && dropdownOpen.parentName == menuName ? faAngleUp : faAngleDown
    }

    return (
        <div className={`flex-shrink-0 w-64 text-sm ${layoutTheme} ${borderRightTheme}`}>
            {/* Logo and Application Name */}
            <div className="flex items-center justify-center py-4">
                <ApplicationLogo alt="Logo" className="h-8 w-auto mr-2 rounded-md" />
                <span className="text-lg font-semibold">Table Booking</span>
            </div>

            {/* Regular Menu */}
            <nav className="mt-10 px-2">

                {/* Clickable Dropdown Menu */}
                {/* {parentMenu('table-reservation', 'Pendaftaran Pasien', faNewspaper)} */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('table-reservation')}
                >
                    <div>
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        <span>Reservations</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('table-reservation')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'table-reservation' && (
                    <div className="pl-4">
                        {tableReservationItems.map((item) => (
                            <a
                                key={item.title}
                                href={item.link}
                                className={`flex items-center py-2 px-4 rounded-lg ${hoverTheme} ${activeMenuItem.url === item.link ? `${bgTheme} rounded-lg` : ''
                                    }`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                <span>{item.title}</span>
                            </a>
                        ))}
                    </div>
                )}
               
                {/* menu account */}
                {hasScope(['superadmin']) && accounts.map((item) => (
                    <a
                        key={item.title}
                        href={item.link}
                        className={`flex items-center py-2 px-4 rounded-lg ${hoverTheme} ${activeMenuItem.url === item.link ? `${bgTheme} rounded-lg` : ''
                            }`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        <span>{item.title}</span>
                    </a>
                ))}

            </nav>
        </div>
    );
};

export default Sidebar;
