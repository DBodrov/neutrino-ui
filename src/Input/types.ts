export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    // hasClear?: boolean;
    // styles?: React.CSSProperties;
    // inputClassName: string;
    name: string;
    value?: string | number;
    prefix?: string;
    onFocusHandler?: (value: string, event?: React.FocusEvent<HTMLInputElement>) => void;
    onBlurHandler?: (value: string , event?: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    // onClearHandler?: (name: string) => void;
}
