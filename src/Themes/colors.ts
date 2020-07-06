const simpleColors = {
    white: '#fff',
    black: '#000',
    green: '#339900',
    yellow: '#F2C791',
    red: '#FF0800',
};

const grayColors = {
    gray0: '#f9f9fa',
    gray1: '#eceef0',
    gray2: '#dde1e5',
    gray3: '#ced4d9',
    gray4: '#bdc5cb',
    gray5: '#abb4bd',
    gray6: '#95a1ac',
    gray7: '#808a94',
    gray8: '#656d75',
    gray9: '#3b4044',
    gray10: '#2B3034',
};

const pageElementsColors = {
    body: simpleColors.white,
    border: grayColors.gray2,
    disabled: grayColors.gray4,
    overlay: 'rgba(171,180,189, 0.9)',
    formElements: simpleColors.white,
    formElementsActive: grayColors.gray2,
};

const mainColors = {
    primary: '#3399F5',
    primaryDark: '#1361A8',
    secondary: '#FF584F',
    secondaryDark: '#CA3E35',
    tertiary: '#B5C215',
    tertiaryDark: '#9EA81B'
};

const textColors = {
    text: grayColors.gray10,
    textInvert: simpleColors.white,
    textOnPrimary: simpleColors.white,
    textOnSecondary: simpleColors.white,
    link: mainColors.primary,
    linkVisited: mainColors.primaryDark,
}

const feedbackColors = {
    success: simpleColors.green,
    warning: simpleColors.yellow,
    error: simpleColors.red
}

export const colors = {
    simpleColors, grayColors, pageElementsColors, mainColors, textColors, feedbackColors
}

export interface IColors {
    simpleColors?: Partial<typeof colors['simpleColors']>;
    grayColors?: Partial<typeof colors['grayColors']>;
    pageElementsColors?: Partial<typeof colors['pageElementsColors']>;
    mainColors?: Partial<typeof colors['mainColors']>;
    textColors?: Partial<typeof colors['textColors']>;
    feedbackColors?: Partial<typeof colors['feedbackColors']>;
}

