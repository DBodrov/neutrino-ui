import { css } from '@emotion/core';
import {IOptionProps} from '../../types';
import {ITheme} from '../../../Themes';

export const createOptionCSS = (props: IOptionProps, theme: ITheme) =>
    css({
        display: 'flex',
        flexFlow: 'row wrap',
        padding: '8px 4px',
        lineHeight: 1.5,
        borderBottom: `1px ${theme.colors.pageElementsColors.border} solid`,
        backgroundColor: props.isActive
            ? theme.colors.grayColors.gray3
            : theme.colors.pageElementsColors.body,
        cursor: props.isDisabled ? 'not-allowed' : 'pointer',
        opacity: props.isDisabled ? 0.7 : 1,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.colors.grayColors.gray1,
        },
        '&:focus': {
            outline: 0,
        },
        '&:last-child': {
            border: 0,
        },
    });
