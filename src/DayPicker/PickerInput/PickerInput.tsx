import React from 'react';
import {MaskInput} from '../../MaskInput';
import {useDayPicker} from '../DayPickerProvider';

interface IPickerInputProps extends React.HTMLProps<HTMLInputElement> {}

export function PickerInput(props: IPickerInputProps) {
  const [maskedValue, setValue] = React.useState('');
  const {delimiter, format, mask, name} = useDayPicker();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);

    // e.preventDefault();
    // const {value} = e.currentTarget;
    // const cursor = maskedValue.split('').findIndex(char => char === '_');
    // debugger;
    // inputRef.current.setSelectionRange(cursor, cursor);

    //console.log('change', value);
  };

  return (
    <MaskInput
      mask={mask}
      name={name}
      type="tel"
      onChangeHandler={handleChange}
      value={maskedValue}
      maskPlaceholder="_"
    />
  );
}

// const _PickerInput = React.forwardRef(PickerInput);
// export {_PickerInput as PickerInput};
