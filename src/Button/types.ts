import { SerializedStyles } from '@emotion/core';

interface IButtonProps {
    className?: string;
    flat?: boolean;
    outline?: boolean;
    styles?: React.CSSProperties;
    variant?: 'primary' | 'secondary' | 'default';
    icon?: string;
    children?: React.ReactNode;
}

export type ButtonProps = IButtonProps & JSX.IntrinsicElements['button'];

type ButtonVariant = Exclude<ButtonProps['variant'], undefined>;

export type VariantStyles = Record<ButtonVariant, SerializedStyles>;
