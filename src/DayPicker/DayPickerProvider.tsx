import React, {createContext, useContext, useMemo} from 'react';
import {createMask, parseFormat, parseDate} from './utils/format';
import {THIS_DAY, THIS_MONTH, THIS_YEAR} from './utils/date';
import {TDay} from './types';

export type TFormatConfig = {inputs: Map<string, {length: number}>; delimiter: string};

interface IDayPickerContext {
  mask: string;
  name: string;
  format: string;
  delimiter: string;
  className?: string;
  day: number;
  month: number;
  year: number;
  handleChangeDay: (date: string) => void;
  locale: string | string[];
}

const DayPickerContext = createContext<IDayPickerContext | undefined>(undefined);

export function DayPickerProvider(props: any) {
  const {config = {}, value, name, className, onChangeHandler, ...restProps} = props;
  const [{day, month, year}, dispatch] = React.useReducer(
    (state: TDay, change: TDay): TDay => ({...state, ...change}),
    {
      day: THIS_DAY,
      month: THIS_MONTH,
      year: THIS_YEAR,
    },
  );
  const {format = 'DD.MM.YYYY', locale = 'ru'} = config;
  const mask = createMask(format);

  const {delimiter} = parseFormat(format);

  React.useEffect(() => {
    if (value && format) {
      const currentDay = parseDate(value, format);
      dispatch(currentDay);
    }
  }, [format, value]);

  const handleChangeDay = React.useCallback(
    (date: string) => {
      onChangeHandler(date);
    },
    [onChangeHandler],
  );

  const ctxValue = useMemo<IDayPickerContext>(
    () => ({
      mask,
      name,
      format,
      className,
      delimiter,
      day,
      month,
      year,
      handleChangeDay,
      locale,
    }),
    [mask, name, format, className, delimiter, day, month, year, handleChangeDay, locale],
  );

  return <DayPickerContext.Provider value={ctxValue} {...restProps} />;
}

export const useDayPicker = () => {
  const ctx = useContext(DayPickerContext);
  return ctx;
};