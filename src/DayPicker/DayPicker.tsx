import React from 'react';
import {DayPickerProvider} from './DayPickerProvider';
// import {PickerInput} from './PickerInput';

export function DayPicker(props: any) {
  return <DayPickerProvider {...props} />;
}
