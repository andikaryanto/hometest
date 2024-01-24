import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RecoilRoot, useRecoilState } from 'recoil';
import { createContext, useContext, useState } from 'react';
import { themeState } from './States/Common';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme ? storedTheme : 'light';

    const [theme, setTheme] = useState(initialTheme);

    const toggleTheme = () => {
        
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        
        const storedTheme = localStorage.setItem('theme', theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<RecoilRoot>
            <ThemeProvider>
                <App {...props} />
            </ThemeProvider>
        </RecoilRoot>);
    },
    progress: {
        color: '#4B5563',
    },
});
