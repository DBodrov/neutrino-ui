import React from 'react';
import {SerializedStyles} from '@emotion/react';
import {removeMask, createDisplayValue} from './utils';
import {InputPhoneBlock, CountryCode, StyledInput} from './styles';

interface IInputPhoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  countryCode: string;
  countryCodeCSS?: SerializedStyles;
  mask?: string;
}

export function InputPhone(props: IInputPhoneProps) {
  const {
    name,
    countryCode = '+7',
    mask = '(999) 999-99-99',
    countryCodeCSS,
    onChange,
    value,
    ...restProps
  } = props;
  const [, forceUpdate] = React.useState({});
  const prevValue = React.useRef<string>('');
  const prevMaskedValue = React.useRef<string>('');
  const inputEl = React.useRef<HTMLInputElement>(null);
  const selectionStart = React.useRef(0);
  const selectionEnd = React.useRef(0);
  const inputType = React.useRef<string>('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = removeMask('_', event.currentTarget.value);
      const cursor = selectionStart.current;
      const displayValue = createDisplayValue(rawValue, mask);

      switch (inputType.current) {
        default:
        case 'insertText': {
          if ([0, 9, 12].includes(cursor)) {
            selectionStart.current = cursor + 2;
            selectionEnd.current = cursor + 2;
          } else if (cursor === 4) {
            selectionStart.current = cursor + 3;
            selectionEnd.current = cursor + 3;
          } else {
            selectionStart.current = cursor + 1;
            selectionEnd.current = cursor + 1;
          }
          break;
        }
        case 'deleteContentBackward': {
          if ([1, 5, 6, 10, 13].includes(cursor)) {
            selectionStart.current = cursor - 1;
            selectionEnd.current = cursor - 1;
            forceUpdate({});
          } else {
            selectionStart.current = cursor - 1;
            selectionEnd.current = cursor - 1;
          }
          break;
        }
        case 'deleteContentForward': {
          selectionStart.current = cursor;
          selectionEnd.current = cursor;
          forceUpdate({});
          break;
        }
        case 'deleteSection': {
          selectionStart.current = cursor;
          selectionEnd.current = cursor;
          forceUpdate({});
          break;
        }
        case 'insertFromPaste': {
          selectionStart.current = displayValue.length;
          selectionEnd.current = displayValue.length;
        }
      }
      onChange(displayValue);
      prevValue.current = rawValue;
      prevMaskedValue.current = displayValue;
    },
    [mask, onChange],
  );

  const handleClick = React.useCallback((e: React.PointerEvent<any> | React.MouseEvent<any>) => {
    inputEl.current.focus();
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey, key} = event;
    const isNumericKey = isFinite(Number(key));
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;

    if (start === end) {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteContentBackward';
      } else if (key === 'Delete') {
        inputType.current = 'deleteContentForward';
      }
    } else {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteSection';
      } else if (key === 'Delete') {
        inputType.current = 'deleteSection';
      }
    }

    selectionStart.current = start;
    selectionEnd.current = end;
  }, []);

  const handlePaste = React.useCallback(() => {
    inputType.current = 'insertFromPaste';
  }, [])

  React.useLayoutEffect(() => {
    inputEl.current.setSelectionRange(selectionStart.current, selectionEnd.current);
  });

  return (
    <InputPhoneBlock onClick={handleClick}>
      <CountryCode css={countryCodeCSS}>{countryCode}</CountryCode>
      <StyledInput
        type="tel"
        name={name}
        onChange={handleChange}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        ref={inputEl}
        value={value}
        {...restProps}
      />
    </InputPhoneBlock>
  );
}