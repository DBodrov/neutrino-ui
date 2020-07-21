import React, { useState, useRef, useEffect } from 'react';
import { MaskInput } from '../../MaskInput';
import { CalendarIcon } from './CalendarIcon';
import { useDatePicker } from '../DatePicker.provider';
import { usePickerInput } from './hook';
// import css from './PickerInput.module.scss';

export interface IPickerInputProps {
    disabled?: boolean;
    hasError?: boolean;
    onClick: () => void;
}

export function PickerInput(props: IPickerInputProps) {
    const { disabled, hasError, onClick } = props;

    const {
        value,
        handleBlurInput,
        placeholder = '',
        isFocused,
        handleSetFocus,
        tabIndex = 0,
        name,
        handleChangeValue
    } = useDatePicker();

    const pickerInputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarBtn = useRef<HTMLButtonElement>(null);

    const [isHovered, setHovered] = useState(false);

    //const { displayValue, handleChangeDate } = usePickerInput(inputRef);

    // const cssClasses: string = cx(
    //     css.PickerInput,
    //     { [css.isDisabled]: disabled },
    //     { [css.hasError]: hasError },
    //     { [css.isFocused]: isFocused },
    //     { [css.isHovered]: isHovered }
    // );

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
        setHovered(true);
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
        setHovered(false);
    };

    const handleFocus = (value: string) => {
        handleSetFocus(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget, event.relatedTarget);
        const relatedTarget = event.relatedTarget as Node;
        if (
            relatedTarget !== null &&
            (relatedTarget.contains(calendarBtn.current) || relatedTarget.contains(inputRef.current))
        ) {
            return;
        }

        handleBlurInput(displayValue);
    };

    const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeValue(value);
    };

    const handleShowCalendar = () => {
        onClick();
    };

    return (
        <div
            css={{
                position: 'relative',
            }}>
            <MaskInput
                name={`picker-input-${name}`}
                mask="99.99.9999"
                onChangeHandler={handleChange}
                onBlurHandler={handleBlurInput}
                onFocusHandler={handleFocus}
                value={value}
            />
            <button type="button" ref={calendarBtn} onClick={handleShowCalendar} aria-label="calendar-button">
                <CalendarIcon />
            </button>
        </div>
    );
}

{
    /* <input
    type="tel"
    tabIndex={tabIndex}
    aria-label="picker-input"
    ref={inputRef}
    className={css.InputControl}
    autoComplete="off"
    onChange={handleChange}
    value={value}
    placeholder={placeholder}
    disabled={disabled}
/> */
}
