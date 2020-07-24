import { css } from '@emotion/core';
import {IOptionProps} from '../../types';
import {ITheme} from '../../../Themes';

export const createOptionCSS = (props: IOptionProps, theme: ITheme) =>
    css({
        display: 'flex',
        flexFlow: 'row wrap',
        padding: '8px 4px',
        lineHeight: 1.5,
        border: `1px ${theme.colors.pageElementsColors.border} solid`,
        backgroundColor: props.isActive
            ? theme.colors.pageElementsColors.formElementsActive
            : theme.colors.pageElementsColors.formElements,
        color: theme.colors.textColors.text,
        cursor: props.isDisabled ? 'not-allowed' : 'pointer',
        opacity: props.isDisabled ? 0.7 : 1,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.colors.pageElementsColors.formElementsActive,
        },
        '&:focus': {
            outline: 0,
        },
        '&:last-of-type': {
            borderBottomLeftRadius: theme?.globals?.borderRadius ?? 4,
            borderBottomRightRadius: theme?.globals?.borderRadius ?? 4,
        },
        '&:first-of-type': {
            borderTopLeftRadius: theme?.globals?.border ?? 4,
            borderTopRightRadius: theme?.globals?.border ?? 4,
        }
    });
