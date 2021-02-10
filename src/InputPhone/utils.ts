export function createEmptyMask(mask: string, maskPlaceholder: string) {
  const emptyMask = [...mask]
    .map(ch => {
      if (ch === '9') return maskPlaceholder;
      return ch;
    })
    .join('');
  return emptyMask;
}

export const SPEC_SYMBOLS = ['(', ')', '-', ' ', '+', '_'];
export const isSpecSymbol = (char: string) => SPEC_SYMBOLS.includes(char);

export function unmaskValue(maskPlaceholder: string, countryCode: string, value: string) {
  const result = [...value].filter(char => {
    return char !== maskPlaceholder && !SPEC_SYMBOLS.includes(char) && isFinite(Number(char));
  });
  return result;
}

export function maskValue(emptyMask: string, value: string, maskPlaceholder: string) {
  const splittedValue = [...value];
  const ret = [...emptyMask]
    .map(char => {
      if (char === maskPlaceholder && splittedValue.length > 0) {
        return splittedValue.shift();
      }
      return char;
    })
    .join('');
  return ret;
}


/** InputPhone utils */
export function getInputType(nextValue: string, prevValue: string) {
  if (nextValue.length - prevValue.length === 1) {
    return 'insertText'
  }
}

export function removeMask(maskPlaceholder: string, value: string) {
  const result = [...value].filter(char => {
    return char !== maskPlaceholder && !SPEC_SYMBOLS.includes(char) && isFinite(Number(char));
  }).join('');
  return result;
}

export function createMaskedValue(value: string, mask: string) {
  const val = [...value];
  const result = [...mask].map(ch => {
    if (ch === '9' && val.length > 0) {
      return val.shift()
    } else if (val.length === 0) {
      return false;
    }
    return ch;
  }).filter(Boolean).join('');

  return result;
}

export function createDisplayValue(rawValue: string, mask: string) {
  const result = createMaskedValue(rawValue, mask);
  return result;
}
