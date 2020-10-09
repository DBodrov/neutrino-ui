import {IMaskOptions, ChangeType} from './types';

const specSymbols = ['(', ')', ' ', '-', '.', '/'];
export const patterns = {
  '9': /[0-9]/,
  a: /[a-zA-Z]/,
  '*': /[a-zA-Z0-9]/,
};

export const isSpecSymbol = (char: string) => specSymbols.includes(char);

export const isPrefix = (maskConst: string, char: string, charPosition: number) => {
  const position = maskConst.length - 1;
  return maskConst.includes(char) && charPosition < position;
};

export const isMaskSymbol = (char: string) => patterns[9].test(char);

export const isAllowedChar = (maskOptions: IMaskOptions, char: string, insertedPosition: number) => {
  if (Boolean(char) && !isPrefix(maskOptions.prefix, char, insertedPosition)) {
    const charCfgIsExist = Boolean(maskOptions.charsConfig[insertedPosition]);
    const isAllowed =
      charCfgIsExist && isMaskSymbol(char) && maskOptions.charsConfig[insertedPosition].type === 'digit';
    return isAllowed;
  }
};

export const getChangeType = (key: string): ChangeType => {
  if (key === 'Backspace') return 'backspace';
  if (key === 'Delete') return 'delete';
  return 'default';
};
