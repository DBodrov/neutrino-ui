import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ITheme } from '../Themes';
import { Span } from '../Typography';
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

export const createWrapperStyles = ({ colors }: ITheme, props: IInputProps) => {
    const { disabled, hasError, style } = props;
    return css({
        border: `1px ${hasError ? colors.feedbackColors.error : colors.pageElementsColors.border} solid`,
        opacity: disabled ? 0.4 : 1,
        padding: '0 0.5rem',
        ':hover, :focus': {
            outline: 0,
            border: `1px ${hasError ? colors.feedbackColors.error : colors.mainColors.primary} solid`,
        },
        ...style,
    });
};
