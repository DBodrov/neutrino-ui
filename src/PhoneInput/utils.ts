export function createEmptyMask(mask: string, maskPlaceholder: string, countryCode: string) {
  const emptyMask = [...mask]
    .map(ch => {
      if (ch === '9') return maskPlaceholder;
      return ch;
    })
    .join('');
  const fullMask = `+${countryCode}${emptyMask}`;
  return fullMask;
}

export const SPEC_SYMBOLS = ['(', ')', '-', ' ', '+'];
export const isSpecSymbol = (char: string) => SPEC_SYMBOLS.includes(char);

export function unmaskValue(maskPlaceholder: string, countryCode: string, value: string) {
  const result = [...value].filter(char => {
    return char !== maskPlaceholder && !SPEC_SYMBOLS.includes(char) && isFinite(Number(char));
  });
  return result;
}

export function maskValue(emptyMask: string, value: string, maskPlaceholder: string) {
  console.log('maskValue', value);
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
