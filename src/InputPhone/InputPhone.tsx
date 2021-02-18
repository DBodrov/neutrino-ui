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

type TCursorPosition = {
  cursorStart?: number;
  cursorEnd?: number;
};

function InputPhoneComponent(props: IInputPhoneProps, ref: React.ForwardRefExoticComponent<HTMLInputElement>) {
  const {
    name,
    countryCode = '+7',
    mask = '(999) 999-99-99',
    countryCodeCSS,
    onChange,
    value,
    ...restProps
  } = props;

  const [{cursorStart, cursorEnd}, setCursor] = React.useReducer(
    (s: TCursorPosition, a: TCursorPosition): TCursorPosition => ({...s, ...a}),
    {
      cursorStart: undefined,
      cursorEnd: undefined,
    },
  );
  const [updateKey, forceUpdate] = React.useState(0);
  const prevValue = React.useRef<string>('');
  const prevMaskedValue = React.useRef<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current, []);

  const inputType = React.useRef<string>('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = removeMask('_', event.currentTarget.value);
      let cursor = cursorStart;
      const displayValue = createDisplayValue(rawValue, mask);

      switch (inputType.current) {
        default:
        case 'insertText': {
          if ([0, 9, 12].includes(cursorStart)) {
            cursor = cursorStart + 2;
            // selectionEnd.current = cursor + 2;
          } else if (cursorStart === 4) {
            cursor = cursorStart + 3;
            // selectionEnd.current = cursor + 3;
          } else {
            cursor = cursorStart + 1;
          }
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
        case 'deleteContentBackward': {
          // if ([1, 5, 6, 10, 13].includes(cursor)) {

          // } else {
          //   selectionStart.current = cursor - 1;
          //   selectionEnd.current = cursor - 1;
          // }
          cursor = cursorStart - 1;
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
        case 'deleteContentForward': {
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          forceUpdate(s => s + 1);
          break;
        }
        case 'deleteSection': {
          cursor = cursorStart
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
        case 'insertFromPaste': {
          cursor = displayValue.length;
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
      }
      onChange(displayValue);
      prevValue.current = rawValue;
      prevMaskedValue.current = displayValue;
    },
    [cursorStart, mask, onChange],
  );

  const handleClick = React.useCallback((e: React.PointerEvent<any> | React.MouseEvent<any>) => {
    inputRef.current.focus();
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
    setCursor({cursorStart: start, cursorEnd: end});
  }, []);

  const handlePaste = React.useCallback(() => {
    inputType.current = 'insertFromPaste';
  }, [])

  React.useLayoutEffect(() => {
    inputRef.current.setSelectionRange(cursorStart, cursorEnd);
  }, [cursorStart, cursorEnd, updateKey]);

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
        ref={inputRef}
        value={value}
        {...restProps}
      />
    </InputPhoneBlock>
  );
}

export const InputPhone = React.forwardRef(InputPhoneComponent);
