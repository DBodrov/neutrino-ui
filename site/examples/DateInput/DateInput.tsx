import React from 'react';
import {css} from '@emotion/core';
import {InputMask, Span} from 'neutrino-ui';
import {zeroPad} from '../../../src/utils';

const validate = (dateString: string) => {
  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(year, month, day);
  const monthIsValid = month <= 12 && month > 0;
  const yearFormatIsValid = String(year).length === 4;
  const dayIsValid = date.getDate() === day;

  const isComplete = zeroPad(day, 2).length === 2 && zeroPad(month, 2).length === 2 && yearFormatIsValid;
  return {isValid: dayIsValid && monthIsValid && yearFormatIsValid, isComplete};
};

export function DateInput(props: any) {
  const {name, onChange, value} = props;
  const [displayDate, setDisplayDate] = React.useState(value);
  const [hasError, setError] = React.useState(false);
  const baseCss = css({
    height: '2rem',
    width: '250px',
    padding: '4px',
    borderRadius: '8px',
    border: `1px ${hasError ? '#ff435a' : '#c5c5c5'} solid`,
    fontSize: '16px',
    '&:hover': {
      borderColor: `${hasError ? '#ff435a' : '#52ae30'}`,
    },
    '&:focus': {
      outline: 0,
      border: `1px ${hasError ? '#ff435a' : '#18740B'} solid`,
    },
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleDateChange = React.useCallback(
    (date: string) => {
      setDisplayDate(date);
      const {isComplete, isValid} = validate(date);
      if (isComplete) {
        setError(!isValid);
        onChange(isValid ? date : '');
      } else {
        setError(false);
      }
    },
    [onChange],
  );

  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap'}}>
      <InputMask
        mask="99.99.9999"
        name={name}
        onChangeHandler={handleDateChange}
        value={displayDate}
        ref={inputRef}
        maskPlaceholder="_"
        css={[baseCss]}
      />
      {hasError ? <Span css={{color: '#ff435a', fontSize: 12, marginTop: 8}}>С датой что-то не так</Span> : null}
    </div>
  );
}
