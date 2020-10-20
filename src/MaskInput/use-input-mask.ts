import React from 'react';
import {createMaskParams, unmaskValue} from './utils';


export function useInputMask(mask: string, maskPlaceholder: string, initValue?: string) {

  const maskParams = React.useMemo(() => createMaskParams(mask, maskPlaceholder), [mask, maskPlaceholder]);
  const init = initValue ?? maskParams.emptyMask;
  const [displayValue, setDisplayValue] = React.useState(init);

  const insertText = React.useCallback((value: string) => {
    const unmaskedValue = [...unmaskValue(maskPlaceholder, maskParams.delimiter, value)];
    const ret = [...maskParams.emptyMask].map(char => {
      console.log('char = ', char)
      if(char === maskPlaceholder && unmaskedValue.length > 0) {
        return unmaskedValue.shift();
      } else if (char === maskPlaceholder && unmaskedValue.length === 0) {
        return char;
      }
      return char;
    }).join('');
    console.log('insertText ret = ', ret);
    return ret;


  }, [maskParams.delimiter, maskParams.emptyMask, maskPlaceholder])

  return {insertText}

}
