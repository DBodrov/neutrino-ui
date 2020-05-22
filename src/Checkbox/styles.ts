import { css } from '@emotion/core';
import { ITheme } from '../Themes';
import { IBoxProps, IWrapperProps, ICheckboxProps } from './types';

export const wrapperCss = ({ width }: IWrapperProps) =>
    css({
        display: 'grid',
        gridTemplateColumns: `${width} minmax(0, auto)`,
        gridColumnGap: '0.5rem',
        lineHeight: width,
        padding: '4px 0',
        alignItems: 'center',
    });

export const boxCss = ({ colors, width, height, checked, indeterminate, hasError, disabled }: IBoxProps) =>
    css({
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: width,
        maxHeight: height,
        height: height,
        width: width,
        borderRadius: '8px',
        opacity: disabled ? 0.4 : 1,
        // border: `1px ${hasError ? colors.feedbackColors.error : colors.pageElementsColors.border} solid`,
        userSelect: 'none',
        backgroundColor:
            checked || indeterminate ? colors.mainColors.primary : colors.pageElementsColors.body,
        ':hover': {
            border: `1px ${hasError ? colors.feedbackColors.error : colors.mainColors.primary} solid`,
            outline: 0,
        },
    });

const createBaseStyles = ({colors, globals}: ITheme, props: ICheckboxProps) => {
    const { height = '22px', width = '22px', disabled, hasError } = props;
    return css({
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: width,
        maxHeight: height,
        height: height,
        width: width,
        borderRadius: globals?.borderRadius ?? '4px',
        border: `1px ${hasError ? colors.feedbackColors.error : colors.pageElementsColors.border} solid`,
        opacity: disabled ? 0.4 : 1,
        userSelect: 'none',
        ':hover, :focus': {
            outline: 0,
        },
    });
};

const createDefaultVariant = ({ colors }: ITheme, { hasError, checked, indeterminate }: ICheckboxProps) =>
    css({
        backgroundColor: colors.pageElementsColors.body,
        ':hover, :focus': {
            border: `1px ${hasError ? colors.feedbackColors.error : colors.simpleColors.black} solid`,
        },
    });

const createPrimaryVariant = ({ colors }: ITheme, { hasError, checked, indeterminate }: ICheckboxProps) =>
    css({
        backgroundColor:
            checked || indeterminate ? colors.mainColors.primary : colors.pageElementsColors.body,
        ':hover, :focus': {
            border: `1px ${hasError ? colors.feedbackColors.error : colors.mainColors.primary} solid`,
        },
    });

const createSecondaryVariant = ({ colors }: ITheme, { hasError, checked, indeterminate }: ICheckboxProps) =>
    css({
        backgroundColor:
            checked || indeterminate ? colors.mainColors.secondary : colors.pageElementsColors.body,
        ':hover, :focus': {
            border: `1px ${hasError ? colors.feedbackColors.error : colors.mainColors.secondary} solid`,
        },
    });

const createVariants = (theme: ITheme, props: ICheckboxProps) => ({
    default: createDefaultVariant(theme, props),
    primary: createPrimaryVariant(theme, props),
    secondary: createSecondaryVariant(theme, props),
});

export const getCheckboxVariant = (props: ICheckboxProps, theme: ITheme) => {
    const currentVariant = props.variant || 'primary';
    const variants = createVariants(theme, props);
    const baseStyles = createBaseStyles(theme, props);
    return [baseStyles, variants[currentVariant]];
};
