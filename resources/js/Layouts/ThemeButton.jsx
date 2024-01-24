import { Button } from "@/Components/Button/Button";
import { useTheme } from "@/app";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeButton({onClick, ...props}) {
    const {theme} = useTheme();

    let currentTheme = localStorage.getItem('theme');

    if(!currentTheme) {
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }

    const onThemeToggle = () => {
        onClick();
        if(!currentTheme) {
            localStorage.setItem('theme', theme)
        } else {
            localStorage.setItem('theme', theme == 'light' ? 'dark' : 'light')
        }
    }

    let icon = null;
    if(currentTheme == 'light') {
        icon = <FaMoon />
    }

    if(currentTheme == 'dark') {
        icon = <FaSun />
    }

    return <Button className={`mr-4 p-2 rounded-md `} onClick={onThemeToggle}>{icon}</Button>
}