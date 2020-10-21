export function createMaskParams(mask: string, maskPlaceholder: string) {
  let delimiter = '';
  const emptyMask = [...mask]
    .map(ch => {
      if (ch === '9') return maskPlaceholder;
      delimiter = ch;
      return ch;
    })
    .join('');
  return {delimiter, emptyMask};
}

export function unmaskValue(maskPlaceholder: string, delimiter: string, value: string) {
  const result = [...value].filter(char => {
    return char !== maskPlaceholder && char !== delimiter && isFinite(Number(char));
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
