import {IInputProps} from '../Input';

export interface IMaskInputProps extends IInputProps {
    mask: string;
    prefix?: string;
    maskPlaceholder?: string;
    pattern?: '9' | 'a' | '*';
}

export interface IMaskConfig {
    [x: string]: {
        type: 'symbol' | 'digit';
        value?: string;
        position?: number;
        re?: RegExp;
    };
}

export interface IMaskOptions {
    prefix?: string;
    suffix?: string;
    charsConfig: IMaskConfig;
    defaultValue?: string;
}

export type ChangeType = 'default' | 'backspace' | 'delete' | 'textPasted';

export type MaskedState = {
    mask: string;
    placeholderChar: string;
    value: string;
    maskedValue: string;
    displayValue: string;
    cursor: number;
    maskConfig: IMaskConfig;
};
