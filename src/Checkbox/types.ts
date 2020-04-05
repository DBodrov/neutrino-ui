import { CSSProperties } from 'react';
import { ITheme } from '../Themes';

export type TCheckboxChangeEvent = React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>;

export interface ICheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    label?: string;
    variant?: 'primary' | 'secondary' | 'default';
    wrapperStyles?: CSSProperties;
    boxStyles?: CSSProperties;
    indeterminate?: boolean;
    disabled?: boolean;
    checked?: boolean;
    hasError?: boolean;
    className?: string;
    onFocusHandler?: (value: boolean) => void;
    onBlurHandler?: (value: boolean) => void;
    onChangeHandler: (value: boolean) => void;
    onClearHandler?: (name: string) => void;
}

export interface IBoxProps {
    colors: ITheme['colors'];
    width: string | number;
    height: string | number;
    style?: CSSProperties;
    checked?: boolean;
    indeterminate?: boolean;
    hasError?: boolean;
    disabled?: boolean;
    'data-testid'?: string;
}

export interface IWrapperProps {
    width: string | number;
    className?: string;
    style?: CSSProperties;
}
