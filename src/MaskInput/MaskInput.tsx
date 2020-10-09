import React, {createRef, useLayoutEffect, useState, useRef} from 'react';
import {Input} from '../Input';
import {isEmptyString} from '../utils';
import {useMask} from './useMask';
import {getChangeType, patterns} from './mask.utils';
import {IMaskInputProps, ChangeType} from './types';

export function MaskInput(props: IMaskInputProps) {
  const {
    className,
    mask,
    prefix,
    name,
    maskPlaceholder,
    onChangeHandler,
    value,
    pattern = '9',
    ...other
  } = props;

  const inputRef = createRef<HTMLInputElement>();
  const regExp = patterns[pattern];
  const {
    insertString,
    nextCursorPosition,
    previousCursorPosition,
    clearPrev,
    clearNext,
    clearRange,
    emptyMask,
    pasteString,
    insertStringIntoSelection,
    maskCharData,
  } = useMask(mask, maskPlaceholder, value);

  const [maskedState, setState] = useState({
    displayValue: value,
    cursor: 0,
  });

  const changeType = useRef<ChangeType>('default');
  const selectionStart = useRef(0);
  const selectionEnd = useRef(0);

  const handleChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let maskedValue: string;
    let cursor: number;

    if (changeType.current === 'textPasted') {
      const charsSelected = selectionEnd.current - selectionStart.current;
      const charCount = value.length + charsSelected - maskedState.displayValue.length;
      const pastedString = value.substring(selectionStart.current, selectionStart.current + charCount);
      const charState = pasteString(selectionStart.current, pastedString, charsSelected);
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
    //console.log(maskedValue, emptyMask, maskCharData);
    let _val = maskedValue === emptyMask ? '' : maskedValue;

    setState(s => ({...s, displayValue: _val, cursor}));
    onChangeHandler(_val);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    changeType.current = 'textPasted';
    selectionStart.current = inputRef.current.selectionStart;
    selectionEnd.current = inputRef.current.selectionEnd;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {key, ctrlKey, metaKey, altKey} = event;
    if (ctrlKey || metaKey || altKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;
    changeType.current = getChangeType(key);
    selectionStart.current = start;
    selectionEnd.current = end;
  };

  React.useEffect(() => {
    const {cursor} = maskedState;
    inputRef.current.setSelectionRange(cursor, cursor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskedState]);

  return (
    <Input
      className={className}
      name={name}
      onChangeHandler={handleChange}
      onPaste={handlePaste}
      ref={inputRef}
      value={maskedState.displayValue}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      prefix={prefix}
      {...other}
    />
  );
}
