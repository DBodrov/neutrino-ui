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

export const typography: Typography = {
    h1: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '4.25rem',
        color: colors.textColors.text,
        fontStyle: 'normal',
        lineHeight: 1.2,
        margin: 0,
        padding: 0,
    },
    h2: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '3.75rem',
        color: colors.textColors.text,
        fontStyle: 'normal',
        lineHeight: 1.2,
        letterSpacing: '0em',
        margin: 0,
        padding: 0,
    },
    h3: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '3rem',
        color: colors.textColors.text,
        fontStyle: 'normal',
        lineHeight: 1.167,
        letterSpacing: '0em',
        margin: 0,
        padding: 0,
    },
    h4: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '2.125rem',
        color: colors.textColors.text,
        fontStyle: 'normal',
        lineHeight: 1.235,
        letterSpacing: '0.00735em',
        margin: 0,
        padding: 0,
    },
    h5: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '1.5rem',
        color: colors.textColors.text,
        fontStyle: 'normal',
        lineHeight: 1.334,
        letterSpacing: '0em',
        margin: 0,
        padding: 0,
    },
    h6: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: '1.25rem',
        color: colors.textColors.text,
        fontStyle: 'normal',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
        margin: 0,
        padding: 0,
    },
    p: {
        fontSize: '1rem',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: colors.textColors.text,
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        margin: 0,
        padding: 0,
    },
    span: {
        fontSize: '1rem',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: colors.textColors.text,
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: '0.00938em',
        margin: 0,
        padding: 0,
    }
}
