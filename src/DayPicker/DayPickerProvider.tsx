import React, {createContext, useContext, useMemo} from 'react';
import {createMask, parseFormat, parseDate} from './utils/format';
import {THIS_DAY, THIS_MONTH, THIS_YEAR, createDateString} from './utils/date';
import {TDay, TDatePickerProps, TCalendarView} from './types';

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
  handleChangeCalendarView: (view: TCalendarView) => void;
  handleChangeMonth: (monthNumber: number) => void;
  handleChangeYear: (year: number) => void;
  locale: string | string[];
  value?: string;
  calendarView: TCalendarView;
}

type TDatePickerState = TDay & {
  calendarView: TCalendarView;
};

const DayPickerContext = createContext<IDayPickerContext | undefined>(undefined);

export function DayPickerProvider(props: TDatePickerProps) {
  const {format = 'DD.MM.YYYY', locale = 'ru', value, name, className, onChangeHandler, ...restProps} = props;
  const [{day, month, year, calendarView}, dispatch] = React.useReducer(
    (state: TDatePickerState, change: Partial<TDatePickerState>): TDatePickerState => ({...state, ...change}),
    {
      day: THIS_DAY,
      month: THIS_MONTH,
      year: THIS_YEAR,
      calendarView: 'days',
    },
  );
  const mask = createMask(format);

  const emptyMask = [...mask]
    .map(ch => {
      if (ch === '9') return '_';
      return ch;
    })
    .join('');

  const {delimiter} = parseFormat(format);

  React.useEffect(() => {
    if (value && format) {
      const currentDay = parseDate(value, format);
      dispatch(currentDay);
    }
  }, [calendarView, day, format, month, value, year]);

  const handleChangeDay = React.useCallback(
    (date: string) => {
      onChangeHandler(date === emptyMask ? '' : date);
    },
    [emptyMask, onChangeHandler],
  );

  const handleChangeCalendarView = React.useCallback(
    (view: TCalendarView) => dispatch({calendarView: view}),
    [],
  );
  const handleChangeMonth = React.useCallback((monthNumber: number) => {
    console.log('value', value)
    if (value) {
      const updateDate = createDateString(format, delimiter, {day, month: monthNumber, year});
      onChangeHandler(updateDate)
    }
    dispatch({month: monthNumber, calendarView: 'days'});

  }, [day, delimiter, format, onChangeHandler, value, year]);
  const handleChangeYear = React.useCallback((year: number) => dispatch({year}), []);

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
      handleChangeCalendarView,
      handleChangeMonth,
      handleChangeYear,
      calendarView,
      locale,
      value,
    }),
    [
      mask,
      name,
      format,
      className,
      delimiter,
      day,
      month,
      year,
      handleChangeDay,
      handleChangeCalendarView,
      handleChangeMonth,
      handleChangeYear,
      calendarView,
      locale,
      value,
    ],
  );

  return <DayPickerContext.Provider value={ctxValue} {...restProps} />;
}

export const useDayPicker = () => {
  const ctx = useContext(DayPickerContext);
  return ctx;
};
