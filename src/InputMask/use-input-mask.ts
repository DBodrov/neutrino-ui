import React from 'react';
import {createMaskParams, maskValue} from './utils';

export function useInputMask(
  mask: string,
  maskPlaceholder: string,
  initValue: string = '',
  changeCallback: (value: string) => void,
) {
  const maskParams = React.useMemo(() => createMaskParams(mask, maskPlaceholder), [mask, maskPlaceholder]);
  //const init = initValue ?? maskParams.emptyMask;
  const [displayValue, setDisplayValue] = React.useState(initValue);
  const [cursor, setCursor] = React.useState(0);
  const changeCount = React.useRef(0);

  const insertText = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value) {
        const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
        const nextPlaceholder = result.indexOf(maskPlaceholder);
        let nextCursor = nextPlaceholder;

        if (nextPlaceholder === -1) {
          const nextChar = result[prevCursor + 1];
          nextCursor =
            nextChar === maskParams.delimiter || result[prevCursor] === maskParams.delimiter
              ? prevCursor + 2
              : prevCursor + 1;
        }

        setDisplayValue(result);
        changeCallback(result);
        setCursor(nextCursor);
      }
    },
    [changeCallback, maskParams.delimiter, maskParams.emptyMask, maskPlaceholder],
  );

  const deleteContentBackward = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor - 1;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor < 0 ? 0 : nextCursor);
      changeCount.current++;
    },
    [changeCallback, maskParams.emptyMask, maskPlaceholder],
  );

  const deleteWordBackward = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor < 0 ? 0 : nextCursor);
    },
    [changeCallback, maskParams.emptyMask, maskPlaceholder],
  );

  const deleteWordForward = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor < 0 ? 0 : nextCursor);
    },
    [changeCallback, maskParams.emptyMask, maskPlaceholder],
  );

  const deleteContentForward = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = result[prevCursor] === maskParams.delimiter ? prevCursor + 1 : prevCursor;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor);
    },
    [changeCallback, maskParams.delimiter, maskParams.emptyMask, maskPlaceholder],
  );

  const deleteByCut = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor);
    },
    [changeCallback, maskParams.emptyMask, maskPlaceholder],
  );

  const insertFromPaste = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor);
    },
    [changeCallback, maskParams.emptyMask, maskPlaceholder],
  );

  const insertFromDrop = React.useCallback(
    (value: string, prevCursor: number) => {
      const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
      const nextCursor = prevCursor;
      setDisplayValue(result === maskParams.emptyMask ? '' : result);
      changeCallback(result);
      setCursor(nextCursor);
    },
    [changeCallback, maskParams.emptyMask, maskPlaceholder],
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
