import React from 'react';
import { SerializedStyles } from '@emotion/react';

export interface IButtonProps {
    className?: string;
    flat?: boolean;
    outline?: boolean;
    styles?: React.CSSProperties;
    variant?: 'primary' | 'secondary' | 'default';
    icon?: string;
    children?: React.ReactNode | ((args: any) => React.ReactNode) | any;
}

export type ButtonProps = IButtonProps & JSX.IntrinsicElements['button'];

type ButtonVariant = Exclude<ButtonProps['variant'], undefined>;

export type VariantStyles = Record<ButtonVariant, SerializedStyles>;
