import React, {useCallback} from 'react';
import { useTheme, ITheme } from '../Themes';
import { CheckIcon, MinusIcon } from './icons';
import { ICheckboxProps, TCheckboxChangeEvent } from './types';
import { wrapperCss, getCheckboxVariant } from './styles';

export function Checkbox(props: ICheckboxProps) {
    const {
        className,
        disabled,
        width = '22px',
        height = '22px',
        indeterminate = false,
        checked = false,
        onChangeHandler,
        children,
        wrapperStyles,
        boxStyles,
        onBlurHandler,
        onFocusHandler,
        hasError,
        variant,
        ...restProps
    } = props;
    const theme = useTheme();

    const handleChange = (event: TCheckboxChangeEvent) => {
        event.preventDefault();
        if (indeterminate) {
            onChangeHandler(false);
        } else {
            onChangeHandler(!checked);
        }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = event => {
        onFocusHandler && onFocusHandler(checked);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
        onBlurHandler && onBlurHandler(checked);
    };

    const renderIcon = (variant: ICheckboxProps['variant']) => {
        if (indeterminate) {
            return <MinusIcon stroke={variant === 'default' ? theme.colors.simpleColors.black : 'white'}/>;
        }
        if (!indeterminate && checked) {
            return <CheckIcon width="75%" height={height} stroke={variant === 'default' ? theme.colors.simpleColors.black : 'white'} />;
        }
    };

    return (
        <div css={wrapperCss({ width })} style={wrapperStyles} className={className}>
            <div
                css={getCheckboxVariant(props, theme)}
                style={boxStyles}
                onClick={disabled ? undefined : handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...restProps}>
                {renderIcon(variant)}
            </div>
            {children}
        </div>
    );
}
