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
    // Dummy menu data with corresponding FontAwesome icons
    const menuItems = [
        { title: 'Dashboard', link: '/dashboard', icon: faHome },
    ];

    const registrationItems = [
        { title: 'Antrian Front Office', link: '/number-assignments', icon: faDotCircle },
        { title: 'Pendaftaran Pasien', link: '/patient/registrations', icon: faUser },
        // Add more dropdown menu items as needed
    ];

    const masterClinics = [
        // { title: 'Poli', link: '/clinics', icon: faDotCircle },
        { title: 'Penyakit', link: '/diseases', icon: faDotCircle },
        { title: 'Tindakan', link: '/treatments', icon: faDotCircle },
        // Add more dropdown menu items as needed
    ];

    const menuCheckup = [
        { title: 'Pemeriksaan Awal', link: '/patient/registrations?registration_status_id=1', icon: faStethoscope },
    ];

    // State to manage dropdown visibility


    const patientCheckupItems = [
        { title: 'Pasien Daftar', link: '/checkup-records', icon: faUserDoctor }
        // Add more dropdown menu items as needed
    ];

    const masterPharmacy = [
        { title: 'Obat', link: '/items?item_type_id=1', icon: faPills },
        { title: 'Bahan Habis Pakai', link: '/items?item_type_id=2', icon: faTShirt },
        { title: 'Resep', link: '/medical-checkups?page=prescription', icon: faPills },
        // Add more dropdown menu items as needed
    ];

    const masterItems = [
        { title: 'Ukuran Unit', link: '/uoms', icon: faCog },
        { title: 'Keluar Masuk Item', link: '/item-movements', icon: faExchange },
        // Add more dropdown menu items as needed
    ];

    const billings = [
        { title: 'Kasir', link: '/medical-checkups', icon: faMoneyBillWave },
        { title: 'Rekap', link: '/payments', icon: faMoneyBillWave },
        // Add more dropdown menu items as needed
    ];

    const incentive = [
        { title: 'Insentif Dokter', link: '/medical-checkup/treatment/incentives?worker=doctor', icon: faMoneyCheck },
        { title: 'Insentif Perawat', link: '/medical-checkup/treatment/incentives?worker=nurse', icon: faMoneyCheck }
        // Add more dropdown menu items as needed
    ];

    const executiveSummaries = [
        { title: 'Rekam Medis', link: '/persons', icon: faBookMedical }
        // Add more dropdown menu items as needed
    ];

    const accounts = [
        { title: 'Akun', link: '/app-users', icon: faUsers },
    ];

    const settings = [
        { title: 'Pengaturan', link: '/settings', icon: faCog },
    ];

    const activeMenuItem = usePage();

    useEffect(() => {
        for (const menu of [
            [menuItems, ''],
            [registrationItems, 'registrasi'],
            [masterClinics, 'master'],
            [menuCheckup, ''],
            [patientCheckupItems, 'patinet-checkup'],
            [masterPharmacy, 'pharmacy'],
            [masterItems, 'item'],
            [billings, 'billing'],
            [executiveSummaries, 'executive_summary']
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
                <span className="text-lg font-semibold">SIM Klinik</span>
            </div>

            {/* Regular Menu */}
            <nav className="mt-10 px-2">
                {menuItems.map((item) => (
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

                {/* Clickable Dropdown Menu */}
                {/* {parentMenu('registrasi', 'Pendaftaran Pasien', faNewspaper)} */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('registrasi')}
                >
                    <div>
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        <span>Pendaftaran Pasien</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('registrasi')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'registrasi' && (
                    <div className="pl-4">
                        {registrationItems.map((item) => (
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

                {/* menu Pemeriksaan Awal */}
                {menuCheckup.map((item) => (
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

                {/* menu Pemeriksaan Pasien */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('patinet-checkup')}
                >
                    <div>
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        <span>Pemeriksaan Pasien</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('patinet-checkup')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'patinet-checkup' && (
                    <div className="pl-4">
                        {patientCheckupItems.map((item) => (
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


                {/* menu Master */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('master')}
                >
                    <div>
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        <span>Master Data</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('master')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'master' && (
                    <div className="pl-4">
                        {masterClinics.map((item) => (
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

                {/* menu Apotek */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('pharmacy')}
                >
                    <div>
                        <FontAwesomeIcon icon={faNotesMedical} className="mr-2" />
                        <span>Apotek</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('pharmacy')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'pharmacy' && (
                    <div className="pl-4">
                        {masterPharmacy.map((item) => (
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

                {/* menu Item */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('item')}
                >
                    <div>
                        <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                        <span>Barang</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('item')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'item' && (
                    <div className="pl-4">
                        {masterItems.map((item) => (
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

                {/* menu Billing */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('billing')}
                >
                    <div>
                        <FontAwesomeIcon icon={faMoneyBillWaveAlt} className="mr-2" />
                        <span>Billing</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('billing')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'billing' && (
                    <div className="pl-4">
                        {billings.map((item) => (
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

                {/* menu Pemeriksaan Pasien */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('medical-checkup_treatment_incentive')}
                >
                    <div>
                        <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                        <span>Insentif</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('medical-checkup_treatment_incentive')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'medical-checkup_treatment_incentive' && (
                    <div className="pl-4">
                        {incentive.map((item) => (
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

                {/* menu executtive summary */}
                <div
                    className={`flex items-center justify-between py-2 px-4 rounded-lg cursor-pointer ${hoverTheme}`}
                    onClick={() => menuState('executive_summary')}
                >
                    <div>
                        <FontAwesomeIcon icon={faPenFancy} className="mr-2" />
                        <span>Executive Summary</span>
                    </div>
                    <FontAwesomeIcon icon={angleIcon('executive_summary')} />
                </div>
                {dropdownOpen.isDropDownOpen && dropdownOpen.parentName == 'executive_summary' && (
                    <div className="pl-4">
                        {executiveSummaries.map((item) => (
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

                {/* menu setting */}
                {settings.map((item) => (
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
