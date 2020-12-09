import React, {createContext, useContext, useMemo} from 'react';
import {isEmptyString} from '../../utils';
import {createMask, parseFormat, parseDate} from './utils/format';
import {THIS_DAY, THIS_MONTH, THIS_YEAR, THIS_DECADE, createDateString} from './utils/date';
import {createDecadeTitle} from './utils/calendar';
import {TDateRangeProps, TDay, TDateRangeValue, TCalendarSection, TCalendarView} from './types';

export type TFormatConfig = {inputs: Map<string, {length: number}>; delimiter: string};

interface IDateRangeState {
  dayStart?: TDay;
  dayEnd?: TDay;
  calendarStartView: TCalendarView;
  calendarEndView: TCalendarView;
  decadeStart: string;
  decadeEnd: string;
}

interface IDateRangeContext extends IDateRangeState {
  name: string;
  className?: string;
  handleChangeDay: (date: string, section: TCalendarSection) => void;
  handleChangeCalendarView: (view: TCalendarView, section: TCalendarSection) => void;
  handleChangeMonth: (monthNumber: number, section: TCalendarSection) => void;
  handleChangeYear: (year: number, section: TCalendarSection) => void;
  handleChangeDecade: (decade: string, section: TCalendarSection) => void;
  locale: string | string[];
  value?: TDateRangeValue;
  minDate?: string;
  maxDate?: string;
  format: string;
}

const FORMAT = 'YYYY-MM-DD';

const DateRangeContext = createContext<IDateRangeContext | undefined>(undefined);

export function DateRangeProvider(props: TDateRangeProps) {
  const {locale = 'ru', value, name, className, onChangeHandler, minDate, maxDate, ...restProps} = props;
  const hasValue = value && !isEmptyString(value[0]) && !isEmptyString(value[1]);
  const internalRange = React.useRef<TDateRangeValue>([]);

  const initState: IDateRangeState = {
    dayStart: {
      day: THIS_DAY,
      month: THIS_MONTH,
      year: THIS_YEAR,
    },
    dayEnd: {
      day: THIS_DAY,
      month: THIS_MONTH,
      year: THIS_YEAR,
    },
    calendarStartView: 'days',
    calendarEndView: 'days',
    decadeStart: THIS_DECADE,
    decadeEnd: THIS_DECADE,
  };

  const [
    {dayStart, dayEnd, calendarStartView, calendarEndView, decadeStart, decadeEnd},
    dispatch,
  ] = React.useReducer(
    (state: IDateRangeState, change: Partial<IDateRangeState>): IDateRangeState => ({...state, ...change}),
    initState,
  );

  React.useEffect(() => {
    if (hasValue) {
      const startDay = parseDate(value[0], FORMAT);
      const endDay = parseDate(value[1], FORMAT);
      const startDecade = createDecadeTitle(startDay.year);
      const endDecade = createDecadeTitle(endDay.year);
      dispatch({dayStart: startDay, dayEnd: endDay, decadeStart: startDecade, decadeEnd: endDecade});
    }

  }, [hasValue, value]);

  const handleChangeDay = React.useCallback((date: string, section: TCalendarSection) => {
    // const rangeDate: TDateRangeValue = [];
    if (section === 'start') {
      internalRange.current[0] = date;
    } else {
      internalRange.current[1] = date;
    }
    // dispatch({[day]: {...[day], }})


    internalRange.current.length === 2 && onChangeHandler(internalRange.current);
  }, [onChangeHandler]);

  const handleChangeCalendarView = React.useCallback((view: TCalendarView, section: TCalendarSection) => {
    const calendarView = section === 'start' ? 'calendarStartView' : 'calendarEndView';
    dispatch({[calendarView]: view});
  }, []);

  const handleChangeMonth = React.useCallback(
    (monthNumber: number, section: TCalendarSection) => {
      if (section === 'start') {
        const day = {...dayStart, month: monthNumber};
        dispatch({dayStart: day});
      } else {
        const day = {...dayEnd, month: monthNumber};
        dispatch({dayEnd: day});
      }
    },
    [dayEnd, dayStart],
  );

  const handleChangeYear = React.useCallback(
    (year: number, section: TCalendarSection) => {
      const newDecade = createDecadeTitle(year);
      if (section === 'start') {
        dispatch({dayStart: {...dayStart, year}, decadeStart: newDecade});
      } else {
        dispatch({dayEnd: {...dayEnd, year}, decadeEnd: newDecade});
      }
    },
    [dayEnd, dayStart],
  );

  const handleChangeDecade = React.useCallback((decadeValue: string, section: TCalendarSection) => {
    const decade = section === 'start' ? 'decadeStart' : 'decadeEnd';
    dispatch({[decade]: decadeValue});
  }, []);

  const ctxValue = useMemo<IDateRangeContext>(
    () => ({
      calendarEndView,
      calendarStartView,
      decadeEnd,
      decadeStart,
      handleChangeCalendarView,
      handleChangeDay,
      handleChangeDecade,
      handleChangeMonth,
      handleChangeYear,
      name,
      className,
      dayEnd,
      dayStart,
      locale,
      value,
      minDate,
      maxDate,
      format: FORMAT,
    }),
    [
      calendarEndView,
      calendarStartView,
      decadeEnd,
      decadeStart,
      handleChangeCalendarView,
      handleChangeDay,
      handleChangeDecade,
      handleChangeMonth,
      handleChangeYear,
      name,
      className,
      dayEnd,
      dayStart,
      locale,
      value,
      minDate,
      maxDate,
    ],
  );

  return <DateRangeContext.Provider value={ctxValue} {...restProps} />;
}

export const useDateRange = () => {
  const ctx = useContext(DateRangeContext);
  return ctx;
};
