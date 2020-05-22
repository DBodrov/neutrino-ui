import React from 'react';
import { useTheme } from '../Themes';
import { ButtonProps } from './types';
import { getButtonVariant } from './styles';

export function Button(props: ButtonProps) {
    const { type = 'button', value, onClick, outline, flat, children, ...restProps } = props;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => onClick?.(event);
    const theme = useTheme();

    return (
        <button type={type} onClick={handleClick} css={getButtonVariant(props, theme)} {...restProps}>
            <span>{value || children}</span>
        </button>
    );
}
