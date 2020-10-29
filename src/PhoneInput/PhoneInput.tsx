import React from 'react';
import {isEmptyString} from '../utils/string.utils';
import {usePhoneInputMask} from './use-phoneinput-mask';

interface IPhoneInputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  mask: string;
  countryCode: string;
  maskPlaceholder?: string;
  onChangeHandler: (value: string) => void;
}

function PhoneInputComponent(props: IPhoneInputProps, ref: React.ForwardRefExoticComponent<HTMLInputElement>) {
  const {mask, value = '', countryCode, maskPlaceholder, onChangeHandler, ...restProps} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectionStart = React.useRef(0);
  const selectionEnd = React.useRef(0);

  React.useImperativeHandle(ref, () => inputRef.current, []);

  const {
    insertText,
    displayValue,
    cursor,
    deleteContentBackward,
    // deleteContentForward,
    // deleteByCut,
    // insertFromPaste,
    // insertFromDrop,
    deleteWordBackward,
    // deleteWordForward,
  } = usePhoneInputMask(mask, countryCode, maskPlaceholder, value, onChangeHandler);

  const prevValue = React.useRef('');

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }, []);

  const handleSelect = React.useCallback((event: React.SyntheticEvent<HTMLInputElement, Event>) => {
    selectionStart.current = event.currentTarget.selectionStart;
    selectionEnd.current = event.currentTarget.selectionEnd;
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey} = event;
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;
    selectionStart.current = start;
    selectionEnd.current = end;
  }, []);

  React.useEffect(() => {
    const handleInput = (e: InputEvent) => {
      const el = e.target as HTMLInputElement;

      const inputValue = [...el.value].filter(ch => !isEmptyString(ch) && isFinite(Number(ch))).join('');
      console.log('**** input value ****', inputValue, inputValue.length);
      // .slice(countryCode.length);

      if (e.inputType === 'insertText') {
        let noCountryCodeValue = '';
        if (inputValue.length > 1) {
          noCountryCodeValue = inputValue.slice(countryCode.length);
          console.log(countryCode.length, noCountryCodeValue);
        } else if (inputValue.length === 1) {
          noCountryCodeValue = inputValue;
        }
        const _pos = selectionStart.current;
        insertText(noCountryCodeValue, _pos);
        return;
      }

      if (e.inputType === 'deleteContentBackward') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = selectionStart.current;
        deleteContentBackward(noCountryCodeValue, _pos);
        return;
      }
      // if (e.inputType === 'deleteContentForward') {
      //   const _pos = selectionStart.current;
      //   deleteContentForward(inputValue, _pos);
      //   return;
      // }
      // if (e.inputType === 'deleteByCut') {
      //   const _pos = selectionStart.current;
      //   deleteByCut(inputValue, _pos);
      //   return;
      // }
      // if (e.inputType === 'insertFromPaste') {
      //   const _pos = selectionEnd.current;
      //   insertFromPaste(inputValue, _pos);
      //   return;
      // }
      // if (e.inputType === 'insertFromDrop') {
      //   const _pos = selectionEnd.current;
      //   insertFromDrop(inputValue, _pos);
      //   return;
      // }
      if (e.inputType === 'deleteWordBackward') {
        const _pos = el.selectionEnd;
        deleteWordBackward(noCountryCodeValue, _pos);
        return;
      }
      // if (e.inputType === 'deleteWordForward') {
      //   const _pos = el.selectionStart;
      //   deleteWordForward(inputValue, _pos);
      //   return;
      // }
    };

    const inputEl = inputRef.current;
    inputEl.addEventListener('input', handleInput);
    return () => inputEl.removeEventListener('input', handleInput);
  }, [countryCode.length, deleteContentBackward, insertText]);

  React.useLayoutEffect(() => {
    // console.log('layout cursor ', cursor);
    inputRef.current.setSelectionRange(cursor, cursor);
  }, [cursor, displayValue]);

  React.useEffect(() => {
    if (prevValue.current !== displayValue) {
      prevValue.current = displayValue;
    }
  }, [displayValue]);

  return (
    <input
      onKeyDown={handleKeyDown}
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
      {...restProps}
      ref={inputRef}
      type="tel"
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}

export const PhoneInput = React.forwardRef(PhoneInputComponent);
