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
  //const init = initValue ?? maskParams.emptyMask;
  const [displayValue, setDisplayValue] = React.useState(initValue);
  const [cursor, setCursor] = React.useState(0);
  const changeCount = React.useRef(0);

  const insertText = React.useCallback(
    (value: string, prevCursor: number) => {
      if (value?.length === 1) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = prevCursor + (countryCode.length + 3);
        setDisplayValue(result);
        changeCallback(result);
        setCursor(nextCursor);
      }
      if (value?.length > 1) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextPlaceholder = result.indexOf(maskPlaceholder);
        let pos = prevCursor + 1;
        const nextChar = result[pos];
        console.log('next char', nextChar);
        let nextCursor: number;
        if (isSpecSymbol(nextChar)) {
          if (nextPlaceholder === -1) {
            if (isSpecSymbol(result[pos + 1])) {
              nextCursor = pos + 2;
            } else {
              nextCursor = pos + 1;
            }
          } else if (nextPlaceholder >= 0) {
            nextCursor = nextPlaceholder;
          }
        } else if (nextPlaceholder === -1) {
          if (isSpecSymbol(nextChar)) {
            if (nextPlaceholder === -1) {
              if (isSpecSymbol(result[pos + 1])) {
                nextCursor = pos + 2;
              } else {
                nextCursor = pos + 1;
              }
            }
          } else {
            nextCursor = pos + 2;
          }
        } else {
          nextCursor = nextPlaceholder;
        }

        //console.log('idx', placeholderIndex);

        // const nextCursor = nextChar !== maskPlaceholder ? prevCursor + 2 : prevCursor + 1;
        // console.log('result', result, 'next char', nextChar, 'nextCursor', nextCursor);
        setDisplayValue(result);
        changeCallback(result);
        console.log('setted cursor', prevCursor, nextCursor);
        setCursor(nextCursor ?? prevCursor);
        // changeCount.current++;
      }
    },
    [changeCallback, countryCode.length, emptyMask, maskPlaceholder],
  );

  const deleteContentBackward = React.useCallback(
    (value: string, prevCursor: number) => {
      console.log('backspace', value);
      if (value) {
        const result = maskValue(emptyMask, value, maskPlaceholder);
        const nextCursor = prevCursor - 1;
        setDisplayValue(result === emptyMask ? '' : result);
        changeCallback(result);
        setCursor(nextCursor < 0 ? 0 : nextCursor);
        changeCount.current++;
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
        console.log('deleteWordBackward', value);
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

  // const deleteWordForward = React.useCallback(
  //   (value: string, prevCursor: number) => {
  //     const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
  //     const nextCursor = prevCursor;
  //     setDisplayValue(result === maskParams.emptyMask ? '' : result);
  //     changeCallback(result);
  //     setCursor(nextCursor < 0 ? 0 : nextCursor);
  //   },
  //   [changeCallback, maskParams.emptyMask, maskPlaceholder],
  // );

  // const deleteContentForward = React.useCallback(
  //   (value: string, prevCursor: number) => {
  //     const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
  //     const nextCursor = result[prevCursor] === maskParams.delimiter ? prevCursor + 1 : prevCursor;
  //     setDisplayValue(result === maskParams.emptyMask ? '' : result);
  //     changeCallback(result);
  //     setCursor(nextCursor);
  //   },
  //   [changeCallback, maskParams.delimiter, maskParams.emptyMask, maskPlaceholder],
  // );

  // const deleteByCut = React.useCallback(
  //   (value: string, prevCursor: number) => {
  //     const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
  //     const nextCursor = prevCursor;
  //     setDisplayValue(result === maskParams.emptyMask ? '' : result);
  //     changeCallback(result);
  //     setCursor(nextCursor);
  //   },
  //   [changeCallback, maskParams.emptyMask, maskPlaceholder],
  // );

  // const insertFromPaste = React.useCallback(
  //   (value: string, prevCursor: number) => {
  //     const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
  //     const nextCursor = prevCursor;
  //     setDisplayValue(result === maskParams.emptyMask ? '' : result);
  //     changeCallback(result);
  //     setCursor(nextCursor);
  //   },
  //   [changeCallback, maskParams.emptyMask, maskPlaceholder],
  // );

  // const insertFromDrop = React.useCallback(
  //   (value: string, prevCursor: number) => {
  //     const result = maskValue(maskParams.emptyMask, value, maskPlaceholder);
  //     const nextCursor = prevCursor;
  //     setDisplayValue(result === maskParams.emptyMask ? '' : result);
  //     changeCallback(result);
  //     setCursor(nextCursor);
  //   },
  //   [changeCallback, maskParams.emptyMask, maskPlaceholder],
  // );

  return {
    insertText,
    displayValue,
    cursor,
    deleteContentBackward,
    deleteWordBackward,
    // deleteContentForward,
    // deleteByCut,
    // insertFromPaste,
    // insertFromDrop,
    // deleteWordForward,
  };
}
