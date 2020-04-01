import React, { useCallback } from 'react';
import { useTheme } from 'emotion-theming';
import { baseTheme, ITheme } from '../Themes';
import { ButtonProps } from './types';
import { getButtonVariant } from './styles';

export function Button(props: ButtonProps) {
    const { type = 'button', value, onClick, outline, flat, children, ...restProps } = props;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => onClick?.(event);
    const getTheme = useCallback(() => {
        const providedTheme = useTheme<ITheme>();
        return Object.keys(providedTheme).length > 0 ? providedTheme : baseTheme;
    }, [])
    const theme = getTheme();

    return (
        <button type={type} onClick={handleClick} css={getButtonVariant(props, theme)} {...restProps}>
            <span>{value || children}</span>
        </button>
    );
}
