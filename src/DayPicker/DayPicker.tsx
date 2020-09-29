import React from 'react';
import { css } from '@emotion/core';
import {Select, SelectOptions, selectReducer, ISelectState, SelectChangeTypes} from '../Select';
import {DayPickerProvider} from './DayPickerProvider';
import {Calendar} from './Calendar';
// import {PickerInput} from './PickerInput';

const dayPickerReducer = (state: ISelectState, changes: ISelectState): ISelectState => {
  const selectState = selectReducer(state, changes);
  console.info('== select ==', changes, state, selectState);
  switch (changes.type) {
    case SelectChangeTypes.close:
      return {
        ...selectState,
        isOpen: false,
      };
    default:
      return selectState;
  }
};
export function DayPicker({children, ...restProps}: any) {
  return (
    <DayPickerProvider {...restProps}>
      <Select
        stateReducer={dayPickerReducer}
        width="250px"
        height="48px"
        css={{
          border: '1px #dde1e5 solid',
          padding: '0 8px',
          cursor: 'pointer',
          '&:hover': {borderColor: 'blue'},
        }}
        activeStyles={css({borderColor: 'green !important'})}
      >
        {children}
        <SelectOptions>
          <Calendar />
        </SelectOptions>
      </Select>
    </DayPickerProvider>
  );
}
