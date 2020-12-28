import {IInputProps} from '../Input';

export interface IInputMaskProps extends IInputProps {
  mask: string;
  maskPlaceholder?: string;
}
export interface IMaskInputProps extends IInputProps {
  value?: string;
  mask: string;
  maskPlaceholder?: string;
  pattern?: '9' | 'a' | '*';
}

export interface IMaskConfig {
  [x: string]: {
    type: 'symbol' | 'digit';
    value?: string;
    position?: number;
    re?: RegExp;
    block?: number;
  };
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
