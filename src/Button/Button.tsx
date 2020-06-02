import React from 'react';
import { useTheme } from '../Themes';
import { ButtonProps } from './types';
import { getButtonVariant } from './styles';

export function Button(props: ButtonProps) {
    const { type = 'button', value, onClick, outline, flat, children, ...restProps } = props;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => onClick?.(event);
    const theme = useTheme();

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children(theme);
        }
        return children;
    }

    return (
        <button type={type} onClick={handleClick} css={getButtonVariant(props, theme)} {...restProps}>
            {renderChildren()}
        </button>
    );
}
