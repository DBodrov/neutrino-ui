import {useCallback, useRef} from 'react';
import {isEmptyString} from '../utils';
import {isSpecSymbol, patterns} from './mask.utils';
import {IMaskConfig} from './types';

const createMaskCharData = (mask: string, placeholderChar = '', value = ''): IMaskConfig => {
  const config: IMaskConfig = {};

  let blockNumber = 1;
  mask.split('').forEach((char, i) => {
    if (isSpecSymbol(char)) {
      blockNumber++;
      config[i] = {type: 'symbol', value: char, position: i};
    } else if (patterns[char]) {
      config[i] = {
        type: 'digit',
        value: value[i] ?? placeholderChar,
        position: i,
        re: patterns[char],
        block: blockNumber,
      };
    }
  });

  return config;
};

const getAvailablePositions = (maskData: IMaskConfig) =>
  Object.values(maskData)
    .filter(cfg => cfg.type === 'digit')
    .map(digitConfig => digitConfig.position);

const getFirstAvailablePosition = (maskData: IMaskConfig, block: number, placeholderChar = ' ') => {
  const currentBlock = Object.values(maskData).filter(cfg => cfg.block === block);
  const firstposition = currentBlock.find(cfg => cfg.value === placeholderChar)?.position;
  return firstposition;
};

const initValue = (maskCharData: IMaskConfig) =>
  Object.values(maskCharData)
    .map(cfg => cfg.value)
    .join('');

export function useMask(mask: string, placeholderChar = '', value: string) {
  const maskCharData = createMaskCharData(mask, placeholderChar, value);
  const charState = useRef<IMaskConfig>(maskCharData);
  const availablePositions = getAvailablePositions(maskCharData);

  const nextCursorPosition = useCallback(
    (startPos: number) => {
      if (availablePositions.some(position => startPos <= position)) {
        const positions = availablePositions.filter(position => startPos <= position);
        const result = Math.min(...positions);
        return result;
      }
      return startPos;
    },
    [availablePositions],
  );

  const previousCursorPosition = useCallback(
    (startPos: number) => {
      if (availablePositions.includes(startPos)) {
        if (availablePositions.some(position => startPos >= position)) {
          const positions = availablePositions.filter(pos => startPos >= pos);
          const result = Math.max(...positions);
          return result;
        } else {
          return Math.min(...availablePositions);
        }
      }
      return startPos;
    },
    [availablePositions],
  );

  const insertString = useCallback(
    (startPosition: number, enteredString: string) => {
      if (isEmptyString(enteredString)) return {charState: charState.current, nextPosition: startPosition};

      const currentBlock = Object.values(charState.current).find(cfg => cfg.position === startPosition)
        ?.block;
      if (currentBlock === undefined) return {charState: charState.current, nextPosition: startPosition};
      const firstAvailablePosition = getFirstAvailablePosition(
        charState.current,
        currentBlock,
        placeholderChar,
      );

      const output: IMaskConfig = Object.values(charState.current).reduce((acc, cfg) => {
        let value: string;
        if (cfg.type === 'symbol') {
          value = cfg.value;
        }
        if (cfg.type === 'digit') {
          const char = cfg.re.test(enteredString) ? enteredString : cfg.value;
          const digit = cfg.position === firstAvailablePosition ? char : cfg.value;
          value = digit;
        }
        acc[cfg.position] = {...cfg, value};
        return acc;
      }, {});
      charState.current = output;
      return {
        charState: charState.current,
        nextPosition: firstAvailablePosition + 1,
      };
    },
    [placeholderChar],
  );

  const clearPrev = useCallback(
    (startPosition: number) => {
      const output: IMaskConfig = Object.values(charState.current).reduce((maskData, cfg) => {
        let value: string;
        if (cfg.position === startPosition) {
          if (cfg.type === 'digit') {
            value = placeholderChar;
          } else {
            value = cfg.value;
          }
          maskData[cfg.position] = {...cfg, value};
        } else {
          maskData[cfg.position] = {...cfg};
        }
        return maskData;
      }, {});
      charState.current = output;
      return charState.current;
    },
    [placeholderChar],
  );

  const clearNext = useCallback(
    (startPosition: number) => {
      const output: IMaskConfig = Object.values(charState.current).reduce((maskData, cfg) => {
        let value: string;
        if (cfg.position === startPosition) {
          if (cfg.type === 'digit') {
            value = placeholderChar;
          } else {
            value = cfg.value;
          }
          maskData[cfg.position] = {...cfg, value};
        } else {
          maskData[cfg.position] = {...cfg};
        }
        return maskData;
      }, {});
      charState.current = output;
      return charState.current;
    },
    [placeholderChar],
  );

  const clearRange = useCallback(
    (startPosition: number, charCount: number) => {
      let lastClearedChar = startPosition + charCount - 1;
      const output: IMaskConfig = Object.values(charState.current).reduce((maskData, cfg) => {
        let value: string;
        if (cfg.position >= startPosition && cfg.position <= lastClearedChar) {
          if (cfg.type === 'digit') {
            value = placeholderChar;
          } else {
            value = cfg.value;
          }
          maskData[cfg.position] = {...cfg, value};
        } else {
          maskData[cfg.position] = {...cfg};
        }
        return maskData;
      }, {});
      charState.current = output;
      return charState.current;
    },
    [placeholderChar],
  );

  const pasteString = useCallback(
    (startPosition: number, pastedString: string, charsSelected: number) => {
      if (charsSelected) {
        clearRange(startPosition, pastedString.length);
      }
      const currentBlock = Object.values(charState.current).find(cfg => cfg.position === startPosition)
        ?.block;
      if (currentBlock === undefined) return charState.current;
      const firstAvailablePosition = getFirstAvailablePosition(
        charState.current,
        currentBlock,
        placeholderChar,
      );
      for (let i = 0; i < pastedString.length; i++) {
        const cursor = nextCursorPosition(firstAvailablePosition + i);
        insertString(cursor, pastedString[i]);
      }
      return charState.current;
    },
    [clearRange, insertString, nextCursorPosition, placeholderChar],
  );

  const insertStringIntoSelection = useCallback(
    (startPos: number, enteredString: string, charsSelected: number) => {
      if (charsSelected) {
        clearRange(startPos, enteredString.length);
      }
      insertString(startPos, enteredString);
      return charState.current;
    },
    [clearRange, insertString],
  );

  return {
    insertString,
    nextCursorPosition,
    previousCursorPosition,
    clearPrev,
    clearNext,
    clearRange,
    pasteString,
    insertStringIntoSelection,
    defaultValue: initValue(maskCharData),
    maskCharData,
  };
}
