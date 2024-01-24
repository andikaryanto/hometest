import { faAngleDown, faAngleUp, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";

export const SidebarMenuDropdown = ({text, items, icon, activeMenuItem, ...props}) => {
    
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return(<>
        <div
            className="flex items-center justify-between py-2 px-4 text-white cursor-pointer hover:bg-gray-700"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
            <div>
                <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                <span>{text}</span>
            </div>
            <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} />
        </div>
        {isDropdownOpen && (
            <div className="pl-4">
                {items.map((item) => (
                    <a
                        key={item.title}
                        href={item.link}
                        className={`flex items-center py-2 px-4 text-white hover:bg-gray-700 ${
                            activeMenuItem === item.link ? 'bg-gray-700' : ''
                        }`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                        <span>{item.title}</span>
                    </a>
                ))}
            </div>
        )}
        </>
    )
}