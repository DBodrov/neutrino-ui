import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ITheme } from '../Themes';
import { IInputProps } from './types';

export const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 2rem;
    height: auto;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
`;

export const StyledInput = styled.input`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 2;
    height: 100%;
    border: 0;
    outline: 0;
    line-height: 2rem;
`;

export const createInputStyles = ({ typography }: ITheme, props: IInputProps) => {
    const { disabled } = props;
    return css({
        ...typography.span,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'initial',
    });
};


export const createWrapperStyles = ({ colors }: ITheme, props: IInputProps, focusState: boolean) => {
    const { disabled, hasError, style } = props;
    const hasErrorBorder = `1px ${colors.feedbackColors.error} solid`;
    const focusedBorder = `1px ${colors.mainColors.primary} solid`;
    const defaultBorder = `1px ${colors.pageElementsColors.border} solid`;

    return css({
        //border: `1px ${hasError ? colors.feedbackColors.error : colors.pageElementsColors.border} solid`,
        border: hasError ? hasErrorBorder : focusState ? focusedBorder : defaultBorder,
        opacity: disabled ? 0.4 : 1,
        padding: '0 0.5rem',
        ':hover, :focus': {
            outline: 0,
            border: hasError ? hasErrorBorder : focusedBorder,
            //border: `1px ${hasError ? colors.feedbackColors.error : colors.mainColors.primary} solid`,
        },
        ...style,
    });
};
