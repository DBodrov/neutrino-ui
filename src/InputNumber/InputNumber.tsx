import React, { useState } from 'react';
import { css } from '@emotion/core'
// import classNames from 'classnames/bind';
import { isEmptyString } from '../utils/string.utils';
import { toDecimalString } from '../utils/numeric.utils';
import { Input } from '../Input';
import { IInputNumberProps } from './types';
// import closeIco from 'ui-kit/assets/icons/forms/close.svg';
// import css from './InputNumber.module.scss';

// const cx = classNames.bind(css);

const toString = (value: string | number) => {
    if (typeof value === 'number') {
        return String(value);
    }
    return value;
};

const disableSpinBtn = css({
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 },
    '-moz-appearance': 'textfield',
});

export function InputNumber(props: IInputNumberProps) {
    const {
        type,
        hasError = false,
        disabled = false,
        locales = 'ru-RU',
        formatOptions = {},
        styles = {},
        value = '',
        parser = 'parseFloat',
        zeroWhenEmpty = false,
        onClearHandler,
        onFocusHandler,
        onChangeHandler,
        onBlurHandler,
        name,
        ...inputProps
    } = props;

    const [isEditing, setIsEditing] = useState(false);
    const hasFormatOptions = Object.keys(formatOptions).length > 0;

    const applyNumberOptions = (value: string) => {
        if (isEmptyString(value)) return '';
        const result = Number(value);
        const fractionDigits = formatOptions.maximumFractionDigits || 3;
        return result.toFixed(fractionDigits);
    };

    const formatAsLocaleString = (rawValue: string | number) => {
        const valueStringified = toString(rawValue);
        return toDecimalString(valueStringified, locales, formatOptions, parser);
    };

    const formatAsNumber = (value: string | number) => {
        const valueStringified = toString(value);
        const numericVal = hasFormatOptions ? applyNumberOptions(valueStringified) : valueStringified;

        if (zeroWhenEmpty) {
            return isEmptyString(numericVal) ? 0 : Number[parser](numericVal);
        }
        return isEmptyString(numericVal) ? '' : Number[parser](numericVal);
    };

    const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatAsNumber(value);
        onChangeHandler && onChangeHandler(formattedValue, event);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setIsEditing(true);
        const val = Number(event.target.value);
        onFocusHandler && onFocusHandler(val, event);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        setIsEditing(false);
        const val = Number(event.target.value);
        onBlurHandler && onBlurHandler(val, event);
    };

    return (
        <>
            {isEditing ? (
                <Input
                    css={disableSpinBtn}
                    value={value}
                    name={name}
                    type="number"
                    onBlur={handleBlur}
                    onChangeHandler={handleChange}
                    disabled={disabled}
                    autoComplete="off"
                    {...inputProps}
                />
            ) : (
                <Input
                    css={disableSpinBtn}
                    value={formatAsLocaleString(value)}
                    name={name}
                    type="tel"
                    onFocus={handleFocus}
                    onChangeHandler={undefined}
                    disabled={disabled}
                    autoComplete="off"
                    {...inputProps}
                />
            )}
        </>
    );
}
