import React, {createContext, useContext, useMemo} from 'react';
import {createMask, parseFormat, parseDate} from './utils/format';
import {THIS_DAY, THIS_MONTH, THIS_YEAR, THIS_DECADE, createDateString} from './utils/date';
import {createDecadeTitle} from './utils/calendar';
import {TDay, IDatePickerProps, IDatePickerContext, TCalendarView} from './types';

export type TFormatConfig = {inputs: Map<string, {length: number}>; delimiter: string};

type TDatePickerState = TDay & {
  calendarView: TCalendarView;
  decade: string;
};

const DatePickerContext = createContext<IDatePickerContext | undefined>(undefined);

export function DatePickerProvider(props: IDatePickerProps) {
  const {
    format = 'DD.MM.YYYY',
    value,
    name,
    onChangeHandler,
    minDate,
    maxDate,
    inputStyles,
    ...restProps
  } = props;

  const [{day, month, year, decade, calendarView}, dispatch] = React.useReducer(
    (state: TDatePickerState, change: Partial<TDatePickerState>): TDatePickerState => ({...state, ...change}),
    {
      day: THIS_DAY,
      month: THIS_MONTH,
      year: THIS_YEAR,
      decade: THIS_DECADE,
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
      const currentDecade = createDecadeTitle(currentDay.year);
      dispatch({...currentDay, decade: currentDecade});
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
  const handleChangeMonth = React.useCallback(
    (monthNumber: number) => {
      if (value) {
        const updateDate = createDateString(format, delimiter, {day, month: monthNumber, year});
        onChangeHandler(updateDate);
      }
      dispatch({month: monthNumber, calendarView: 'days'});
    },
    [day, delimiter, format, onChangeHandler, value, year],
  );

  const handleChangeYear = React.useCallback(
    (year: number) => {
      if (value) {
        const updateDate = createDateString(format, delimiter, {day, month, year});
        onChangeHandler(updateDate);
      }
      const newDecade = createDecadeTitle(year);
      dispatch({year, decade: newDecade});
    },
    [day, delimiter, format, month, onChangeHandler, value],
  );

  const handleChangeDecade = React.useCallback((decade: string) => dispatch({decade}), []);

  const handleInputDate = React.useCallback(
    (dateString: string) => {
      onChangeHandler(dateString);
    },
    [onChangeHandler],
  );

  const ctxValue = useMemo<IDatePickerContext>(
    () => ({
      mask,
      format,
      delimiter,
      day,
      month,
      year,
      decade,
      handleChangeDay,
      handleChangeCalendarView,
      handleChangeMonth,
      handleChangeYear,
      handleChangeDecade,
      handleInputDate,
      calendarView,
      ...props,
    }),
    [
      mask,
      format,
      delimiter,
      day,
      month,
      year,
      decade,
      handleChangeDay,
      handleChangeCalendarView,
      handleChangeMonth,
      handleChangeYear,
      handleChangeDecade,
      handleInputDate,
      calendarView,
      props,
    ],
  );

  return <DatePickerContext.Provider value={ctxValue} {...restProps} />;
}

export const useDatePicker = () => {
  const ctx = useContext(DatePickerContext);
  return ctx;
};
