import React, { forwardRef, useCallback } from 'react';
import { useTheme } from 'emotion-theming';
import { baseTheme, ITheme } from '../Themes';
import { Span } from '../Typography';
import { Wrapper, StyledInput, createInputStyles, createWrapperStyles } from './styles';
import { IInputProps } from './types';

export const Input = forwardRef((props: IInputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { onChangeHandler, value, hasError, onFocusHandler, onBlurHandler, prefix, css, style, ...other } = props;

    const getTheme = useCallback(() => {
        const providedTheme = useTheme<ITheme>();
        return Object.keys(providedTheme).length > 0 ? providedTheme : baseTheme;
    }, []);
    const theme = getTheme();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.preventDefault();
        const val = event.target.value;
        onChangeHandler(val, event);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        const val = event.target.value;
        onFocusHandler && onFocusHandler(val, event);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        const val = event.target.value;
        onBlurHandler && onBlurHandler(val, event);
    };

    return (
        <Wrapper css={createWrapperStyles(theme, props)}>
            {prefix && <Span>{prefix}</Span>}
            <StyledInput
                ref={ref}
                type="text"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                css={createInputStyles(theme, props)}
                {...other}
            />
        </Wrapper>
    );
});
