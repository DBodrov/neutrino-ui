import React, { forwardRef, useState } from 'react';
import { useTheme } from '../Themes';
import { Span } from '../Typography';
import { Wrapper, StyledInput, createInputStyles, createWrapperStyles } from './styles';
import { IInputProps } from './types';

export const Input = forwardRef((props: IInputProps, ref: React.RefObject<HTMLInputElement>) => {
    const { onChangeHandler, value, hasError, onFocusHandler, onBlurHandler, prefix, style, ...other } = props;
    const [isFocused, setFocusState] = useState(false);

    const theme = useTheme();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        event.preventDefault();
        const val = event.target.value;
        onChangeHandler(val, event);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        const val = event.target.value;
        setFocusState(true);
        onFocusHandler && onFocusHandler(val, event);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        const val = event.target.value;
        setFocusState(false);
        onBlurHandler && onBlurHandler(val, event);
    };

    return (
        <Wrapper css={createWrapperStyles(theme, props, isFocused)}>
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
