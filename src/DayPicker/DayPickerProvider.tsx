import React, {createContext, useContext, useMemo} from 'react';
import {SerializedStyles} from '@emotion/core';
import {createMask, parseFormat, parseDate} from './utils';
import {TDay} from './types';

export type TFormatConfig = {inputs: Map<string, {length: number}>; delimiter: string};

interface IDayPickerContext {
  mask: string;
  inputCss?: SerializedStyles;
  name: string;
  format: string;
  delimiter: string;
  handleChangeInput: (value?: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  day: number;
  month: number;
  year: number;
}

const DayPickerContext = createContext<IDayPickerContext | undefined>(undefined);

export function DayPickerProvider(props: any) {
  const {config = {}, value, inputCss, name, className, ...restProps} = props;
  const [{day, month, year}, dispatch] = React.useReducer(
    (state: TDay, change: TDay): TDay => ({...state, ...change}),
    {
      day: undefined,
      month: undefined,
      year: undefined,
    },
  );
  const {format = 'DD.MM.YYYY'} = config;
  const mask = createMask(format);

  const {delimiter} = parseFormat(format);

  React.useEffect(() => {
    if (value && format) {
      const currentDay = parseDate(value, format);
      dispatch(currentDay);
    }
  }, [format, value]);

  const handleChangeInput = React.useCallback(
    (value?: string, event?: React.ChangeEvent<HTMLInputElement>) => {
      //console.log(value);
      //const a = digits.split('');
    },
    [],
  );

  const ctxValue = useMemo<IDayPickerContext>(
    () => ({mask, inputCss, name, format, handleChangeInput, className, delimiter, day, month, year}),
    [mask, inputCss, name, format, handleChangeInput, className, delimiter, day, month, year],
  );

  return <DayPickerContext.Provider value={ctxValue} {...restProps} />;
}

export const useDayPicker = () => {
  const ctx = useContext(DayPickerContext);
  return ctx;
};
