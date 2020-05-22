import { CSSProperties } from 'react';
import { colors } from './colors';

export type TypographyStyles = Pick<
    CSSProperties,
    | 'fontFamily'
    | 'fontSize'
    | 'fontStyle'
    | 'fontWeight'
    | 'color'
    | 'lineHeight'
    | 'letterSpacing'
    | 'textTransform'
    | 'margin'
    | 'padding'
>;

export type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type InlineElements = 'span' | 'p';
export type TypographyElements = HeadingElements | InlineElements;

export type Typography = Record<TypographyElements, Partial<TypographyStyles>>;

const commonTypography = {
    color: colors.textColors.text,
    fontStyle: 'normal',
    margin: 0,
    padding: 0,
};

export const typography: Typography = {
    h1: {
        fontSize: '4.25rem',
        lineHeight: 1.2,
        ...commonTypography
    },
    h2: {
        fontSize: '3.75rem',
        lineHeight: 1.2,
        letterSpacing: '0em',
        ...commonTypography
    },
    h3: {
        fontSize: '3rem',
        lineHeight: 1.167,
        letterSpacing: '0em',
        ...commonTypography
    },
    h4: {
        fontSize: '2.125rem',
        lineHeight: 1.235,
        letterSpacing: '0.00735em',
        ...commonTypography
    },
    h5: {
        fontSize: '1.5rem',
        lineHeight: 1.334,
        letterSpacing: '0em',
        ...commonTypography
    },
    h6: {
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
        ...commonTypography
    },
    p: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        ...commonTypography
    },
    span: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '0.00938em',
        ...commonTypography
    },
};
