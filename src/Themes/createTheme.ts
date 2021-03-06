import { useTheme, Theme } from '@emotion/react';
import { mergeColors, mergeShadows, mergeTypography, mergeGlobals } from './utils';
import { baseTheme } from './baseTheme';
//import { ITheme } from './types';

export function createTheme(customTheme: Theme): Theme {
    const mergedColors = mergeColors(customTheme);
    const mergedTypography = mergeTypography(customTheme);
    const mergedShadows = mergeShadows(customTheme);
    const mergedGlobals = mergeGlobals(customTheme);

    return { colors: mergedColors, typography: mergedTypography, shadows: mergedShadows, globals: mergedGlobals };
}

const useNeutrinoTheme = () => {
    const providedTheme = useTheme();
    return Object.keys(providedTheme).length > 0 ? providedTheme : baseTheme;
};

export { useNeutrinoTheme as useTheme };
