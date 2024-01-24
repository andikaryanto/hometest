
export const applicationTheme = (themeContext) => {
    const layoutTheme = themeContext == 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-400';
    const disabled = themeContext == 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-600 text-gray-300';
    const layoutReverseTheme = themeContext == 'light' ? 'bg-gray-800 text-gray-400': 'bg-white text-gray-800' ;
    const layoutLightTheme = themeContext == 'light' ? 'bg-white text-gray-700' : 'bg-gray-700 text-gray-300';
    const hoverTheme = themeContext == 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700';
    const bgTheme = themeContext == 'light' ? 'bg-gray-200' : 'bg-gray-700';
    const mainBgTheme = themeContext == 'light' ? 'bg-gray-200 text-gray-700' : 'bg-gray-900 text-gray-400';
    const borderedBottomTheme = themeContext == 'light' ? 'border-b border-gray-200' : 'border-b border-gray-600';
    const borderedTopTheme = themeContext == 'light' ? 'border-t border-gray-200' : 'border-t border-gray-600';
    const borderRightTheme = themeContext == 'light' ? 'border-r border-gray-200' : 'border-r border-gray-600';
    const borderTheme = themeContext == 'light' ? 'border border-gray-200' : 'border border-gray-600';
    const inputTheme = themeContext == 'light' ? 'border border-gray-200 bg-gray-50 focus:border-none' : 'border border-gray-600 bg-gray-700';
    const bigFontColorTheme = themeContext == 'light' ? 'text-gray-800' : 'text-white';    
    const borderedYTheme = themeContext == 'light' ? 'border-y border-gray-200' : 'border-y border-gray-600';

    return {
        layoutTheme,
        disabled,
        layoutReverseTheme,
        layoutLightTheme,
        hoverTheme,
        bgTheme,
        mainBgTheme,
        borderedBottomTheme,
        borderRightTheme,
        borderTheme,
        inputTheme,
        bigFontColorTheme,
        borderedTopTheme,
        borderedYTheme
    }
}