import { ITheme } from './types';
import { baseTheme } from './baseTheme';

export const mergeColors = (theme: ITheme): ITheme['colors'] => {
    const { colors: baseColors = {} } = baseTheme;
    const { colors: customColors = {} } = theme;
    const colors = { ...baseColors };
    for (let colorType in theme.colors) {
        if (baseColors.hasOwnProperty(colorType)) {
            colors[colorType] = {
                ...baseColors[colorType],
                ...customColors[colorType],
            };
        }
    }
    return colors;
};

export const mergeTypography = (theme: ITheme): ITheme['typography'] => {
    const typography = { ...baseTheme.typography };
    for (const typo in theme.typography) {
        if (baseTheme.typography.hasOwnProperty(typo)) {
            typography[typo] = {
                ...baseTheme.typography[typo],
                ...theme.typography[typo],
            };
        }
    }
    return typography;
};

export const mergeShadows = (theme:ITheme): ITheme['shadows'] => {
    const shadows = {...baseTheme.shadows};
    for (const shadow in theme.shadows) {
        if (baseTheme.shadows.hasOwnProperty(shadow)) {
            shadows[shadow] = {
                ...baseTheme.shadows[shadow],
                ...theme.shadows[shadow],
            }
        }
    }
    return shadows;
};

export const mergeGlobals = (theme: ITheme): ITheme['globals'] => {
    const globals = {...baseTheme.globals};
    for (const glob in theme.globals) {
        if(glob in baseTheme.globals) {
            globals[glob] = theme.globals[glob];
        }
    }
    return globals;
}
