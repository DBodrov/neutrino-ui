import React, {createRef, useLayoutEffect, useState, useRef} from 'react';
import {Input} from '../Input';
import {isEmptyString} from '../utils';
import {useMask} from './useMask';
import {patterns, getInputType} from './mask.utils';
import {IMaskInputProps, ChangeType} from './types';

/**@depricated*/
export function MaskInput(props: IMaskInputProps) {
  const {className, mask, name, maskPlaceholder, onChangeHandler, value, pattern = '9', ...other} = props;

  const inputRef = createRef<HTMLInputElement>();
  const pressedKey = React.useRef<any>();
  const regExp = patterns[pattern];
  const {
    insertString,
    nextCursorPosition,
    previousCursorPosition,
    clearPrev,
    clearNext,
    clearRange,
    defaultValue,
    pasteString,
    insertStringIntoSelection,
  } = useMask(mask, maskPlaceholder, value);

  const [maskedState, setState] = useState({
    displayValue: isEmptyString(value) ? defaultValue : value,
    cursor: 0,
  });
  const changeType = useRef<ChangeType>('default');
  const selectionStart = useRef(0);
  const selectionEnd = useRef(0);

  const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let maskedValue: string;
    let cursor: number;

    console.log('change', value);
    console.log('change type', changeType.current);

    if (changeType.current === 'textPasted') {
      const charsSelected = selectionEnd.current - selectionStart.current;
      const charCount = value.length + charsSelected - maskedState.displayValue.length;
      const pastedString = value.substring(selectionStart.current, selectionStart.current + charCount);
      const charState = pasteString(selectionStart.current, pastedString, charsSelected);
      console.log(charState);

      cursor = selectionStart.current + charCount;
      maskedValue = Object.values(charState)
        .map(charCfg => charCfg.value)
        .join('');
      changeType.current = 'default';
    } else {
      if (value.length > maskedState.displayValue.length) {
        /**
         * user add char
         */
        const charCount = value.length - maskedState.displayValue.length;
        const startPos = selectionEnd.current;
        const enteredString = value.substr(startPos, charCount);
        const validChar = regExp.test(enteredString);

        const {charState, nextPosition} = insertString(startPos, validChar ? enteredString : '');
        cursor = validChar ? nextCursorPosition(nextPosition) : startPos;
        maskedValue = Object.values(charState)
          .map(charCfg => charCfg.value)
          .join('');
      } else if (value.length <= maskedState.displayValue.length) {
        /** user remove char or multiple chars */
        if (changeType.current === 'backspace' || changeType.current === 'delete') {
          const charCount = selectionEnd.current - selectionStart.current;
          console.log(selectionEnd.current, selectionStart.current);
          if (charCount) {
            /** remove multiple chars */
            cursor = selectionStart.current;
            const charState = clearRange(selectionStart.current, charCount);
            maskedValue = Object.values(charState)
              .map(charCfg => charCfg.value)
              .join('');
          } else {
            if (changeType.current === 'backspace') {
              /** backspace 1 char */
              cursor = previousCursorPosition(selectionEnd.current - 1);
              const charState = clearPrev(cursor);
              maskedValue = Object.values(charState)
                .map(charCfg => charCfg.value)
                .join('');
            } else if (changeType.current === 'delete') {
              /** delete 1 char */
              cursor = selectionStart.current;
              const charState = clearNext(cursor);
              maskedValue = Object.values(charState)
                .map(charCfg => charCfg.value)
                .join('');
            }
          }
        } else {
          /** user select range or 1 char and add char */
          const selectCount = maskedState.displayValue.length + 1 - value.length;
          const startPos = selectionStart.current;
          const endPos = startPos + 1;
          const enteredString = value.substring(startPos, endPos);
          const charState = insertStringIntoSelection(startPos, enteredString, selectCount);
          cursor = endPos;
          maskedValue = Object.values(charState)
            .map(charCfg => charCfg.value)
            .join('');
        }
      }
    }
    setState(s => ({...s, displayValue: maskedValue, cursor}));
    onChangeHandler(maskedValue);
  };

  // const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
  //   console.log('text Pasted')
  //   changeType.current = 'textPasted';
  //   selectionStart.current = inputRef.current.selectionStart;
  //   selectionEnd.current = inputRef.current.selectionEnd;
  // };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey} = event;
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;
    selectionStart.current = start;
    selectionEnd.current = end;
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLInputElement, Event>) => {
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;
    selectionStart.current = start;
    selectionEnd.current = end;
  };

  useLayoutEffect(() => {
    const {cursor} = maskedState;
    inputRef.current.setSelectionRange(cursor, cursor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskedState]);

  React.useEffect(() => {
    const handleInput = (e: InputEvent) => {
      //console.log(e.inputType);
      changeType.current = getInputType(e.inputType);
      pressedKey.current = e.inputType;
      // console.log(pressedKey.current);
      const el = e.target as HTMLInputElement;
      const inputValue = el.value;
      console.log('input', inputValue);
      // if (e.inputType === 'insertText') {

      // }
    };

    const inputEl = inputRef.current;
    inputEl.addEventListener('input', handleInput);
    return () => inputEl.removeEventListener('input', handleInput);
  }, [inputRef]);

  return (
    <>
      <Input
        className={className}
        name={name}
        onChangeHandler={handleChange}
        onSelect={handleSelect}
        //onInput={}
        //onPaste={handlePaste}
        ref={inputRef}
        //value={maskedState.displayValue}
        value={value}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        {...other}
      />
      <span>{pressedKey.current}</span>
    </>
  );
}
