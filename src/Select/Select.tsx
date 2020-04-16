import React, { useEffect, useRef, useCallback } from 'react';
import { Input } from '../Input';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { Dropdown, useDropdown } from '../Dropdown';
import { OptionsList } from './OptionsList';
import { useSelected } from './hooks';
import { ISelectProps } from './types';

export function Select(props: ISelectProps) {
    const {
        name,
        options,
        onChangeHandler,
        disabled,
        value,
        hasError,
        onBlurHandler,
        onFocusHandler,
        dropdownStyles,
        styles,
        ...restProps
    } = props;
    const selectRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { selectedValue, valueSetter, resetValue, caption } = useSelected(options);
    const { isOpen, parentRect, setIsOpen } = useDropdown(selectRef, dropdownRef);

    const handleKeypress = useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === 32) {
                setIsOpen(!isOpen);
            }
        },
        [isOpen, setIsOpen]
    );

    useEffect(() => {
        if (value && options && Object.keys(options).length > 0) {
            valueSetter(value);
        } else if (!value) {
            resetValue();
        }
        if (isOpen) {
            selectRef?.current?.focus();
        }
    }, [value, valueSetter, options, resetValue, isOpen]);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleItemClick = (optionValue: string) => {
        valueSetter(optionValue);
        selectRef.current.focus();
        onChangeHandler(optionValue);
        setIsOpen(false);
    };

    const handleFocus = () => {
        const select = selectRef.current;
        select.addEventListener('keypress', handleKeypress);
        onFocusHandler && onFocusHandler(selectedValue);
    };

    const handleBlur = () => {
        const select = selectRef.current;
        select.removeEventListener('keypress', handleKeypress);
        onBlurHandler && onBlurHandler(selectedValue);
    };

    return (
        <div
            css={{
                position: 'relative',
                width: styles.maxWidth ?? '100%',
                height: styles.maxHeight ?? 'auto',
            }}>
            <Input
                name={name}
                onChangeHandler={handleItemClick}
                ref={selectRef}
                title={caption}
                {...restProps}
                onClick={disabled ? undefined : handleClick}
                onFocusHandler={handleFocus}
                onBlurHandler={handleBlur}
                value={caption}
                css={{ borderRadius: '4px', padding: '0.5rem', width: '100%' }}
                style={{ padding: 0, ...styles }} // for input wrapper
                readOnly
                hasError={hasError}
            />
            <ArrowDownIcon
                css={{
                    position: 'absolute',
                    top: '30%',
                    right: '10px',
                    transform: `rotate(${isOpen ? '180deg' : '0'})`,
                    transition: 'all 0.2s ease-in-out',
                }}
            />

            <Dropdown isOpen={isOpen} parentBound={parentRect} ref={dropdownRef} styles={dropdownStyles}>
                <OptionsList
                    options={options}
                    selectedValue={selectedValue}
                    onChangeHandler={handleItemClick}
                />
            </Dropdown>
        </div>
    );
}
