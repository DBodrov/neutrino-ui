import React from 'react';
import {useTheme} from '../../../../Themes';
import {Span} from '../../../../Typography';
import {LeftIcon} from '../../icons/LeftIcon';
import {useDatePicker} from '../../DatePickerProvider';
import {getMonthName, createDateString} from '../../utils/date';
import {createDecadeTitle} from '../../utils/calendar';
import {LinkButton, NavButton, Panel} from './styles';

export function Navigator() {
  const theme = useTheme();
  const {
    locale,
    month,
    year,
    day,
    handleChangeDay,
    format,
    delimiter,
    handleChangeCalendarView,
    calendarView,
    decade,
    handleChangeDecade,
  } = useDatePicker();

  const monthName = getMonthName(month, locale);

  const handlePrevMonth = React.useCallback(() => {
    let prevMonth: number;
    prevMonth = month - 1;
    if (prevMonth < 1) {
      prevMonth = 12;
    }
    const newDate = createDateString(format, delimiter, {day, month: prevMonth, year});
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);

  const handleNextMonth = React.useCallback(() => {
    let nextMonth: number;
    nextMonth = month + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
    }
    const newDate = createDateString(format, delimiter, {day, month: nextMonth, year});
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);

  const handlePrevYear = React.useCallback(() => {
    if (calendarView === 'years') {
      const [firstYear] = decade.split('-');
      const prevDecade = createDecadeTitle(Number(firstYear) - 10);
      handleChangeDecade(prevDecade);
    } else {
      let prevYear = year - 1;
      if (prevYear < 1000) {
        prevYear = 1000;
      }
      const newDate = createDateString(format, delimiter, {day, month, year: prevYear});
      handleChangeDay(newDate);
    }
  }, [calendarView, day, decade, delimiter, format, handleChangeDay, handleChangeDecade, month, year]);

  const handleNextYear = React.useCallback(() => {
    if (calendarView === 'years') {
      const [firstYear] = decade.split('-');
      const prevDecade = createDecadeTitle(Number(firstYear) + 10);
      handleChangeDecade(prevDecade);
    } else {
      let nextYear = year + 1;
      if (nextYear > 9999) {
        nextYear = 9999;
      }
      const newDate = createDateString(format, delimiter, {day, month, year: nextYear});
      handleChangeDay(newDate);
    }
  }, [calendarView, day, decade, delimiter, format, handleChangeDay, handleChangeDecade, month, year]);

  const setMonthsView = React.useCallback(() => {
    handleChangeCalendarView('months');
  }, [handleChangeCalendarView]);

  const setYearsView = React.useCallback(
    (e: React.PointerEvent | React.MouseEvent) => {
      handleChangeCalendarView('years');
      e.stopPropagation();
    },
    [handleChangeCalendarView],
  );

  const isMonthsView = calendarView === 'months';
  const isYearsView = calendarView === 'years';

  return (
    <Panel css={{borderBottom: `1px ${theme.colors.pageElementsColors.border} solid`}}>
      {isYearsView ? (
        <NavButton flat onClick={handlePrevYear}>
          <LeftIcon />
        </NavButton>
      ) : (
        <>
          <NavButton flat onClick={handlePrevYear}>
            <LeftIcon />
          </NavButton>
          <NavButton
            flat
            onClick={isMonthsView ? undefined : handlePrevMonth}
            css={{cursor: isMonthsView ? 'not-allowed' : 'pointer'}}
          >
            <LeftIcon css={{opacity: isMonthsView ? 0.3 : 1}} />
          </NavButton>
        </>
      )}
      <div
        css={{
          display: 'flex',
          flexFlow: 'row nowrap',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {isYearsView ? (
          <Span css={{fontSize: 14}}>{decade}</Span>
        ) : (
          <>
            <LinkButton css={{color: theme?.colors?.textColors?.link}} onClick={setMonthsView}>
              {monthName}
            </LinkButton>
            <LinkButton css={{color: theme?.colors?.textColors?.link}} onClick={setYearsView}>
              {year}
            </LinkButton>
          </>
        )}
      </div>
      {isYearsView ? (
        <NavButton flat onClick={handleNextYear}>
          <LeftIcon css={{transform: 'rotate(180deg)'}} />
        </NavButton>
      ) : (
        <>
          <NavButton
            flat
            css={{marginLeft: 'auto', cursor: isMonthsView ? 'not-allowed' : 'pointer'}}
            onClick={isMonthsView ? undefined : handleNextMonth}
          >
            <LeftIcon css={{transform: 'rotate(180deg)', opacity: isMonthsView ? 0.3 : 1}} />
          </NavButton>
          <NavButton flat onClick={handleNextYear}>
            <LeftIcon css={{transform: 'rotate(180deg)'}} />
          </NavButton>
        </>
      )}
    </Panel>
  );
}
