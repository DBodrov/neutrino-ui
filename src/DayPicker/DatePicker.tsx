import React from 'react';
import {ToggleProvider} from '../ToggleProvider';
import {DayPickerProvider} from './DayPickerProvider';
import {TDatePickerProps} from './types'

export function DatePicker(props: TDatePickerProps & {children: React.ReactNode}) {
  const {children, ...restProps} = props;
  return (
    <ToggleProvider>
      <DayPickerProvider {...restProps}>{children}</DayPickerProvider>
    </ToggleProvider>
  );
}
