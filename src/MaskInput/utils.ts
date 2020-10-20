export function createMaskParams(mask: string, maskPlaceholder: string) {
  let delimiter = '';
  const emptyMask = [...mask].map(ch => {
    if (ch === '9') return maskPlaceholder;
    delimiter = ch;
    return ch;
  }).join('');
  return {delimiter, emptyMask}
};

export function unmaskValue(maskPlaceholder: string, delimiter: string, value: string) {
  return [...value].filter(char => char !== maskPlaceholder || char !== delimiter).join('');
}
