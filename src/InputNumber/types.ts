import {IInputProps} from '../Input'

export interface IInputNumberProps extends IInputProps {
    styles?: React.CSSProperties;
    locales?: string | string[];
    formatOptions?: Intl.NumberFormatOptions;
    zeroWhenEmpty?: boolean;
    parser?: 'parseFloat' | 'parseInt';
    onFocusHandler?: (value: string | number, event?: React.FocusEvent<HTMLInputElement>) => void;
    onBlurHandler?: (value: string | number , event?: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;
}
