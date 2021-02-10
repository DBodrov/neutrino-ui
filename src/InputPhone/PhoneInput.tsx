import React from 'react';
import {isEmptyString} from '../utils/string.utils';
import {usePhoneInputMask} from './use-phoneinput-mask';
import {IInputProps} from '../Input'

interface IPhoneInputProps extends IInputProps {
  mask: string;
  countryCode: string;
  maskPlaceholder?: string;
}

function PhoneInputComponent(
  props: IPhoneInputProps,
  ref: React.ForwardRefExoticComponent<HTMLInputElement>,
) {
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
    deleteContentForward,
    deleteByCut,
    insertFromPaste,
    insertFromDrop,
    deleteWordBackward,
    deleteWordForward,
    setCursorOnFocus,
  } = usePhoneInputMask(mask, countryCode, maskPlaceholder, String(value), onChangeHandler);

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

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setCursorOnFocus(event.currentTarget.value);
    },
    [setCursorOnFocus],
  );

  React.useEffect(() => {
    const handleInput = (e: InputEvent) => {
      const el = e.target as HTMLInputElement;
      const inputValue = [...el.value].filter(ch => !isEmptyString(ch) && isFinite(Number(ch))).join('');
      let inputType: string;
      if (!e.inputType && e.data) {
        inputType = 'insertText';
      } else if (!e.inputType && e.data === null) {
        inputType = 'deleteContentBackward';
      } else {
        inputType = e.inputType;
      }
      if (inputType === 'insertText') {
        let noCountryCodeValue = '';
        if (inputValue.length > 1) {
          noCountryCodeValue = inputValue.slice(countryCode.length);
        } else if (inputValue.length === 1) {
          noCountryCodeValue = inputValue;
        }
        const _pos = selectionStart.current;
        insertText(noCountryCodeValue, _pos);
        return;
      }

      if (inputType === 'deleteContentBackward') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = selectionStart.current;
        deleteContentBackward(noCountryCodeValue, _pos);
        return;
      }
      if (inputType === 'deleteContentForward') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = selectionStart.current;
        deleteContentForward(noCountryCodeValue, _pos);
        return;
      }
      if (inputType === 'deleteByCut') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = selectionStart.current;
        deleteByCut(noCountryCodeValue, _pos);
        return;
      }
      if (inputType === 'insertFromPaste') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = selectionEnd.current;
        insertFromPaste(noCountryCodeValue, _pos);
        return;
      }
      if (inputType === 'insertFromDrop') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = selectionEnd.current;
        insertFromDrop(noCountryCodeValue, _pos);
        return;
      }
      if (inputType === 'deleteWordBackward') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = el.selectionEnd;
        deleteWordBackward(noCountryCodeValue, _pos);
        return;
      }
      if (inputType === 'deleteWordForward') {
        const noCountryCodeValue = inputValue.slice(countryCode.length);
        const _pos = el.selectionStart;
        deleteWordForward(noCountryCodeValue, _pos);
        return;
      }
    };

    const inputEl = inputRef.current;
    inputEl.addEventListener('input', handleInput);
    return () => inputEl.removeEventListener('input', handleInput);
  }, [
    countryCode.length,
    deleteByCut,
    deleteContentBackward,
    deleteContentForward,
    deleteWordBackward,
    deleteWordForward,
    insertFromDrop,
    insertFromPaste,
    insertText,
  ]);

  React.useLayoutEffect(() => {
    inputRef.current.setSelectionRange(cursor, cursor);
  });

  //TODO: undo/redo
  React.useEffect(() => {
    if (prevValue.current !== displayValue) {
      prevValue.current = displayValue;
    }
  }, [displayValue]);

  return (
    <input
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
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