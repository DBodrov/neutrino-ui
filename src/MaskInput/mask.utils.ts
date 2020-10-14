import {ChangeType} from './types';

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

export const getChangeType = (key: string): ChangeType => {
  if (key === 'Backspace') return 'backspace';
  if (key === 'Delete') return 'delete';
  return 'default';
};
