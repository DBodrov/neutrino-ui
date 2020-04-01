import React, { useContext, createContext } from 'react';
import { mergeColors, mergeShadows, mergeTypography } from './utils';
import { IThemeProviderProps, ITheme } from './types';

const ThemeContext = createContext<ITheme | undefined>(undefined);

export const useElementsTheme = () => useContext(ThemeContext);

export function ThemeProvider(props: IThemeProviderProps) {
    const { children, theme } = props;

    const mergedColors = mergeColors(theme);
    const mergedTypography = mergeTypography(theme);
    const mergedShadows = mergeShadows(theme);

    const mergedTheme: ITheme = { colors: mergedColors, typography: mergedTypography, shadows: mergedShadows };
    return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
}

export function createTheme(customTheme: ITheme): ITheme {
    const mergedColors = mergeColors(customTheme);
    const mergedTypography = mergeTypography(customTheme);
    const mergedShadows = mergeShadows(customTheme);

    return { colors: mergedColors, typography: mergedTypography, shadows: mergedShadows };
}
