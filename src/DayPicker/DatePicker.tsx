import React from 'react';
import {Combobox} from '../Combobox';
import {DayPickerProvider} from './DayPickerProvider';

export function DatePicker(props: any) {
  const {children, ...restProps} = props;
  return (
    <Combobox>
      <DayPickerProvider {...restProps}>{children}</DayPickerProvider>
    </Combobox>
  );
}
