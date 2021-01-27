import React, {createContext, useContext, useMemo} from 'react';
import {SerializedStyles} from '@emotion/react';
import {useToggle} from '../../ToggleProvider';
import {isEmptyString} from '../../utils';
import {parseDate} from './utils/format';
// import {THIS_DAY, THIS_MONTH, THIS_YEAR, THIS_DECADE, createDateString} from './utils/date';
import {createDecadeTitle} from './utils/calendar';
import {TDateRangeProps, TDay, TDateRangeValue, TCalendarSection, TCalendarView} from './types';

// export type TFormatConfig = {inputs: Map<string, {length: number}>; delimiter: string};

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
  handleChangeMonth: (monthNumber: number, section: TCalendarSection, needChangeView?: boolean) => void;
  handleChangeYear: (year: number, section: TCalendarSection, needChangeView?: boolean) => void;
  handleChangeDecade: (decade: string, section: TCalendarSection) => void;
  dispatch: React.Dispatch<Partial<IDateRangeState>>;
  locale: string | string[];
  value?: TDateRangeValue;
  minDate?: string;
  maxDate?: string;
  format: string;
  calendarCss?: SerializedStyles;
}

const FORMAT = 'YYYY-MM-DD';

const DateRangeContext = createContext<IDateRangeContext | undefined>(undefined);

export function DateRangeProvider(props: TDateRangeProps) {
  const {locale = 'ru', value, name, className, onChangeHandler, minDate, maxDate, ...restProps} = props;
  const hasValue = value && !isEmptyString(value[0]) && !isEmptyString(value[1]);
  const internalRange = React.useRef<TDateRangeValue>([]);
  const {handleClose} = useToggle();

  const initState: IDateRangeState = {
    dayStart: {
      day: undefined,
      month: undefined,
      year: undefined,
    },
    dayEnd: {
      day: undefined,
      month: undefined,
      year: undefined,
    },
    calendarStartView: 'days',
    calendarEndView: 'days',
    decadeStart: undefined,
    decadeEnd: undefined,
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

  const handleChangeDay = React.useCallback(
    (date: string, section: TCalendarSection) => {
      const {day, month, year} = parseDate(date, FORMAT);
      if (section === 'start') {
        internalRange.current[0] = date;
        dispatch({dayStart: {day, month, year}});
      } else {
        dispatch({dayEnd: {day, month, year}});
        internalRange.current[1] = date;
        internalRange.current[0] && handleClose();
      }
      const safeRange = internalRange.current.filter(Boolean);
      safeRange.length === 2 && onChangeHandler(internalRange.current);
    },
    [handleClose, onChangeHandler],
  );

  const handleChangeCalendarView = React.useCallback((view: TCalendarView, section: TCalendarSection) => {
    const calendarView = section === 'start' ? 'calendarStartView' : 'calendarEndView';
    dispatch({[calendarView]: view});
  }, []);

  const handleChangeMonth = React.useCallback(
    (monthNumber: number, section: TCalendarSection) => {
      if (section === 'start') {
        const day = {...dayStart, month: monthNumber};
        dispatch({dayStart: day, calendarStartView: 'days'});
      } else {
        const day = {...dayEnd, month: monthNumber};
        dispatch({dayEnd: day, calendarEndView: 'days'});
      }
    },
    [dayEnd, dayStart],
  );

  const handleChangeYear = React.useCallback(
    (year: number, section: TCalendarSection, needChangeView = false) => {
      const newDecade = createDecadeTitle(year);
      if (section === 'start') {
        dispatch({
          dayStart: {...dayStart, year},
          decadeStart: newDecade,
          calendarStartView: needChangeView ? 'months' : calendarStartView,
        });
      } else {
        dispatch({
          dayEnd: {...dayEnd, year},
          decadeEnd: newDecade,
          calendarEndView: needChangeView ? 'months' : calendarEndView,
        });
      }
    },
    [calendarEndView, calendarStartView, dayEnd, dayStart],
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
      dispatch,
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
