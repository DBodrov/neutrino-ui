import { useCallback, useRef } from 'react';
import { isEmptyString } from '../utils';
import { isSpecSymbol, patterns } from './mask.utils';
import { IMaskConfig } from './types';

const createMaskCharData = (mask: string, placeholderChar = '', value = ''): IMaskConfig => {

    const config: IMaskConfig = {};

    mask.split('').forEach((char, i) => {
        if (isSpecSymbol(char)) {
            config[i] = { type: 'symbol', value: char, position: i };
        } else if (patterns[char]) {
            config[i] = {
                type: 'digit',
                value: value[i] ?? placeholderChar,
                position: i,
                re: patterns[char],
            };
        }
    });

    return config;
};

const getAvailablePositions = (maskData: IMaskConfig) =>
    Object.values(maskData)
        .filter(cfg => cfg.type === 'digit')
        .map(digitConfig => digitConfig.position);

const initValue = (maskCharData: IMaskConfig) =>
    Object.values(maskCharData)
        .map(cfg => cfg.value)
        .join('');

export function useMask(mask: string, placeholderChar = '', value: string) {
    const maskCharData = createMaskCharData(mask, placeholderChar, value);
    const charState = useRef<IMaskConfig>(maskCharData);
    const availablePositions = getAvailablePositions(maskCharData);

    const nextCursorPosition = (startPos: number) => {
        if (availablePositions.some(position => startPos <= position)) {
            const positions = availablePositions.filter(position => startPos <= position);
            const result = Math.min(...positions);
            return result;
        }
        return startPos;
    };

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
        [availablePositions]
    );

    const insertString = (startPosition: number, enteredString: string) => {
        if (isEmptyString(enteredString)) return charState.current;
        const output: IMaskConfig = Object.values(charState.current).reduce((acc, cfg) => {
            let value: string;
            if (cfg.type === 'symbol') {
                value = cfg.value;
            }
            if (cfg.type === 'digit') {
                const char = cfg.re.test(enteredString) ? enteredString : cfg.value;
                const digit = cfg.position === startPosition ? char : cfg.value;
                value = digit;
            }
            acc[cfg.position] = { ...cfg, value };
            return acc;
        }, {});
        charState.current = output;
        return charState.current;
    };

    const clearPrev = (startPosition: number) => {
        const output: IMaskConfig = Object.values(charState.current).reduce((maskData, cfg) => {
            let value: string;
            if (cfg.position === startPosition) {
                if (cfg.type === 'digit') {
                    value = placeholderChar;
                } else {
                    value = cfg.value;
                }
                maskData[cfg.position] = { ...cfg, value };
            } else {
                maskData[cfg.position] = { ...cfg };
            }
            return maskData;
        }, {});
        charState.current = output;
        return charState.current;
    };

    const clearNext = (startPosition: number) => {
        const output: IMaskConfig = Object.values(charState.current).reduce((maskData, cfg) => {
            let value: string;
            if (cfg.position === startPosition) {
                if (cfg.type === 'digit') {
                    value = placeholderChar;
                } else {
                    value = cfg.value;
                }
                maskData[cfg.position] = { ...cfg, value };
            } else {
                maskData[cfg.position] = { ...cfg };
            }
            return maskData;
        }, {});
        charState.current = output;
        return charState.current;
    };

    const clearRange = (startPosition: number, charCount: number) => {
        let lastClearedChar = startPosition + charCount - 1;
        const output: IMaskConfig = Object.values(charState.current).reduce((maskData, cfg) => {
            let value: string;
            if (cfg.position >= startPosition && cfg.position <= lastClearedChar) {
                if (cfg.type === 'digit') {
                    value = placeholderChar;
                } else {
                    value = cfg.value;
                }
                maskData[cfg.position] = { ...cfg, value };
            } else {
                maskData[cfg.position] = { ...cfg };
            }
            return maskData;
        }, {});
        charState.current = output;
        return charState.current;
    };

    const pasteString = (startPosition: number, pastedString: string, charsSelected: number) => {
        if (charsSelected) {
            clearRange(startPosition, pastedString.length);
        }
        for (let i = 0; i < pastedString.length; i++) {
            const cursor = nextCursorPosition(startPosition + i);
            insertString(cursor, pastedString[i]);
        }
        return charState.current;
    };

    const insertStringIntoSelection = (startPos: number, enteredString: string, charsSelected: number) => {
        if (charsSelected) {
            clearRange(startPos, enteredString.length);
        }
        insertString(startPos, enteredString);
        return charState.current;
    };

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
    };
}
