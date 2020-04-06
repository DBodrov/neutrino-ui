import { css } from '@emotion/core';
import { ITheme } from '../Themes';
import { VariantStyles, ButtonProps } from './types';

export const baseStyles = css({
    fontSize: '1rem',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    minWidth: '100px',
    width: '200px',
    minHeight: '36px',
    height: '3rem',
    outline: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '10px',
    letterSpacing: '0.14px',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    willChange: ['box-shadow', 'transform'],
    userSelect: 'none',
});

export const getBaseStyles = (props: ButtonProps) =>
    css({
        fontSize: '1rem',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minWidth: '100px',
        width: '150px',
        minHeight: '2rem',
        height: '3rem',
        outline: 'none',
        borderRadius: '4px',
        padding: '10px',
        letterSpacing: '0.14px',
        transition: 'all 0.2s ease-in-out',
        border: 'none',
        willChange: ['box-shadow', 'transform'],
        userSelect: 'none',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.4 : 1,
    });

const addActiveShadow = (color?: string, darkenColor?: string) =>
    `0px 2px 4px 0px ${color}, 0px 4px 5px 0px ${darkenColor}, 0px 1px 10px 0px ${color}`;

const defaultVariant = ({ colors, shadows }: ITheme) =>
    css({
        backgroundColor: colors?.pageElementsColors?.body,
        border: `1px ${colors?.pageElementsColors?.border} solid`,
        color: colors?.textColors?.text,
        boxShadow: shadows?.lightRaised.boxShadow,
        ':hover': {
            backgroundColor: colors?.grayColors?.gray2,
        },
        ':active': {
            boxShadow: addActiveShadow(colors?.grayColors?.gray1, colors?.grayColors?.gray2),
        },
        ':disabled': {
            ':hover, :focus': {
                backgroundColor: colors?.pageElementsColors?.body,
            },
        },
    });

const primaryVariant = ({ colors, shadows }: ITheme, {outline: isOutline, flat: isFlat}: ButtonProps) =>
    css({
        backgroundColor: isOutline ? colors.simpleColors.white : colors?.mainColors?.primary,
        border: `0px ${colors?.mainColors?.primary} solid`,
        borderWidth: isOutline ? 2 : 1,
        color: isOutline ? colors.textColors.text : colors?.textColors?.textOnPrimary,
        boxShadow: isFlat ? 'none' : shadows?.lightRaised.boxShadow,
        '&:hover': {
            backgroundColor: colors?.mainColors?.primaryDark,
            color: isOutline && colors?.textColors?.textOnPrimary,
            borderColor: colors?.mainColors?.primaryDark,
        },
        '&:active': {
            boxShadow: addActiveShadow(colors?.mainColors?.primary, colors?.mainColors?.primaryDark),
            color: isOutline && colors?.textColors?.textOnPrimary,
        },
        '&:disabled': {
            ':hover, :focus': {
                backgroundColor: isOutline ? colors.simpleColors.white : colors?.mainColors?.primary,
                color: isOutline && colors?.textColors?.text,
            },
        },
    });

const secondaryVariant = ({ colors, shadows }: ITheme, {outline: isOutline, flat: isFlat}: ButtonProps) =>
    css({
        backgroundColor: isOutline ? colors.simpleColors.white : colors?.mainColors?.secondary,
        border: `0px ${colors?.mainColors?.secondary} solid`,
        borderWidth: isOutline ? 2 : 1,
        color: isOutline ? colors.textColors.text : colors?.textColors?.textOnSecondary,
        boxShadow: shadows?.lightRaised.boxShadow,
        '&:hover': {
            backgroundColor: colors?.mainColors?.secondaryDark,
            color: isOutline && colors?.textColors?.textOnSecondary,
            borderColor: colors?.mainColors?.secondaryDark,
        },
        '&:active': {
            boxShadow: addActiveShadow(colors?.mainColors?.secondary, colors?.mainColors?.secondaryDark),
            color: isOutline && colors?.textColors?.textOnSecondary,
        },
        '&:disabled': {
            ':hover, :focus': {
                backgroundColor: colors?.mainColors?.secondary,
            },
        },
    });

const createButtonVariants = (theme: ITheme, props: ButtonProps): VariantStyles => {
    return {
        default: defaultVariant(theme),
        primary: primaryVariant(theme, props),
        secondary: secondaryVariant(theme, props),
    };
};

export const getButtonVariant = (props: ButtonProps, theme: ITheme) => {
    const currentVariant = props.variant || 'default';
    const variants = createButtonVariants(theme, props);
    const baseStyles = getBaseStyles(props);
    return [baseStyles, variants[currentVariant]];
};
