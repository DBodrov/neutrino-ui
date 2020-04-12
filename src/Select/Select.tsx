import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '../Input';
// import cn from 'classnames/bind';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
//import closeIco from 'ui-kit/assets/icons/forms/close.svg';
// import { SelectDropdown } from './SelectDropdown';
import { Dropdown, useDropdown } from '../Dropdown';
import { OptionsList } from './OptionsList';
import { useSelected } from './hooks';
import { ISelectProps } from './types';
// import css from './Select.module.scss';

export function Select(props: ISelectProps) {
    const {
        name,
        options,
        onChangeHandler,
        disabled,
        value,
        // hasClear,
        hasError,
        onBlurHandler,
        onFocusHandler,
        dropdownStyles,
        ...restProps
    } = props;
    const selectRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isShowClear, setShowClear] = useState(false);
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
    }, [value, valueSetter, options, resetValue, setIsOpen]);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    };

    // const handleMouseEnter = () => {
    //     if (hasClear && selectedValue && !disabled) {
    //         setShowClear(true);
    //     }
    // };

    // const handleMouseLeave = () => {
    //     if (isShowClear) {
    //         setShowClear(false);
    //     }
    // };

    const handleItemClick = (optionValue: string) => {
        valueSetter(optionValue);
        selectRef.current.focus();
        onChangeHandler(optionValue);
        setIsOpen(false);
    };

    // const handleClear: React.MouseEventHandler<HTMLDivElement> = event => {
    //     event.stopPropagation();
    //     if (!onClearHandler) {
    //         throw new Error('onClearHandler props - is not defined!');
    //     }
    //     setIsOpen(false);
    //     resetValue();
    //     onClearHandler(name);
    // };

    const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => {
        const select = selectRef.current;
        select.addEventListener('keypress', handleKeypress);
        onFocusHandler && onFocusHandler(selectedValue);
    };

    const handleBlur: React.FocusEventHandler<HTMLDivElement> = () => {
        const select = selectRef.current;
        select.removeEventListener('keypress', handleKeypress);
        onBlurHandler && onBlurHandler(selectedValue);
    };

    return (
        <div css={{ position: 'relative' }}>
            <Input
                name={name}
                onChangeHandler={handleItemClick}
                ref={selectRef}
                title={caption}
                {...restProps}
                onClick={disabled ? undefined : handleClick}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={caption}
                css={{ borderRadius: '4px', padding: '0.5rem'}}
                style={{ padding: 0 }} // for input wrapper
                readOnly
                hasError
            />
            <ArrowDownIcon
                css={{
                    position: 'absolute',
                    top: '25%',
                    left: '97%',
                    transform: `rotate(${isOpen ? '180deg' : '0'})`,
                    transition: 'all 0.2s ease-in-out'
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

// {isShowClear && (
//     <div
//         className={css.ClearButton}
//         role="button"
//         tabIndex={-1}
//         onClick={handleClear}
//         data-testid="clear-btn">
//         <img src={closeIco} alt="X" />
//     </div>
// )}
