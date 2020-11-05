import React from 'react';
import {createEmptyMask, maskValue, isSpecSymbol} from './utils';

export function usePhoneInputMask(
  mask: string,
  countryCode: string,
  maskPlaceholder: string,
  initValue: string = '',
  changeCallback: (value: string) => void,
) {
  const emptyMask = createEmptyMask(mask, maskPlaceholder, countryCode);
  const [displayValue, setDisplayValue] = React.useState(initValue);
  const [cursor, setCursor] = React.useState(0);

  const insertText = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value?.length === 1) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = countryCode.length + 3;
        setDisplayValue(result);
        changeCallback(result);
        setCursor(nextCursor);
      }
      if (value?.length > 1) {
        let nextCursor: number;
        if (prevCursor <= countryCode.length) {
          setCursor(countryCode.length + 2);
          return;
        }
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextPlaceholder = result.indexOf(maskPlaceholder);
        nextCursor = nextPlaceholder;
        if (nextPlaceholder === -1) {
          const nextChar = result[prevCursor + 1];
          if (nextChar === ')') {
            nextCursor = prevCursor + 3;
          } else if (nextChar === ' ') {
            nextCursor = prevCursor + 2;
          } else if (nextChar === '-') {
            nextCursor = prevCursor + 2;
          } else {
            nextCursor = prevCursor + 1;
          }
        }
        setDisplayValue(result);
        changeCallback(result);
        setCursor(nextCursor ?? prevCursor);
      }
    },
    [changeCallback, countryCode.length, emptyMask, maskPlaceholder],
  );

  const deleteContentBackward = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = prevCursor - 1;
        setDisplayValue(result === emptyMask ? '' : result);
        changeCallback(result);
        setCursor(nextCursor < 0 ? 0 : nextCursor);
      } else {
        setDisplayValue('');
        changeCallback('');
        setCursor(0);
      }
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const deleteWordBackward = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = prevCursor;
        setDisplayValue(result === emptyMask ? '' : result);
        changeCallback(result);
        setCursor(nextCursor < 0 ? 0 : nextCursor);
      } else {
        setDisplayValue('');
        changeCallback('');
        setCursor(0);
      }
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const deleteWordForward = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        setDisplayValue(result === emptyMask ? '' : result);
        changeCallback(result);
        setCursor(prevCursor);
      } else {
        setDisplayValue('');
        changeCallback('');
        setCursor(0);
      }
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const deleteContentForward = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = isSpecSymbol(result[prevCursor]) ? prevCursor + 1 : prevCursor;
        setDisplayValue(result === emptyMask ? '' : result);
        changeCallback(result);
        setCursor(nextCursor);
      } else {
        setDisplayValue('');
        changeCallback('');
        setCursor(0);
      }
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const deleteByCut = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = prevCursor;
        setDisplayValue(result === emptyMask ? '' : result);
        changeCallback(result);
        setCursor(nextCursor);
      } else {
        setDisplayValue('');
        changeCallback('');
        setCursor(0);
      }
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const insertFromPaste = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor);
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const insertFromDrop = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor);
    },
    [changeCallback, emptyMask, maskPlaceholder],
  );

  const setCursorOnFocus = React.useCallback(
    (value: string) => {
      if (!value) return;
      const nextPlaceholder = value.indexOf(maskPlaceholder);
      if (nextPlaceholder === -1) {
        return;
      }
      setCursor(nextPlaceholder);
    },
    [maskPlaceholder],
  );

  return {
    insertText,
    displayValue,
    cursor,
    deleteContentBackward,
    deleteWordBackward,
    deleteContentForward,
    deleteByCut,
    insertFromPaste,
    insertFromDrop,
    deleteWordForward,
    setCursorOnFocus,
  };
}
