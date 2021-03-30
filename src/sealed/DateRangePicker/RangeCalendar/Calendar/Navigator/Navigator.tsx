import React from 'react';
import {useTheme} from '../../../../../Themes';
import {Span} from '../../../../../Typography';
import {LeftIcon} from '../../../icons/LeftIcon';
import {useDateRange} from '../../../DateRangeProvider';
import {
  getMonthName,
  THIS_DECADE,
  THIS_MONTH,
  THIS_YEAR,
} from '../../../utils/date';
import {createDecadeTitle} from '../../../utils/calendar';
import {LinkButton, NavButton, Panel} from './styles';
import {TNavigatorProps} from '../../../types';

export function Navigator(props: TNavigatorProps) {
  const theme = useTheme();
  const {section} = props;
  const {
    locale,
    dayEnd,
    dayStart,
    decadeEnd = THIS_DECADE,
    decadeStart = THIS_DECADE,
    calendarEndView,
    calendarStartView,
    handleChangeMonth,
    handleChangeYear,
    handleChangeCalendarView,
    handleChangeDecade,
  } = useDateRange();

  const {month = THIS_MONTH, year = THIS_YEAR} = section === 'start' ? dayStart : dayEnd;
  const decade = section === 'start' ? decadeStart : decadeEnd;
  const calendarView = section === 'start' ? calendarStartView : calendarEndView;

  const monthName = getMonthName(month, locale);

  const handlePrevMonth = React.useCallback(() => {
    let prevMonth: number;
    prevMonth = month - 1;
    if (prevMonth < 1) {
      prevMonth = 12;
    }
    handleChangeMonth(prevMonth, section);
  }, [handleChangeMonth, month, section]);

  const handleNextMonth = React.useCallback(() => {
    let nextMonth: number;
    nextMonth = month + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
    }
    handleChangeMonth(nextMonth, section);
  }, [handleChangeMonth, month, section]);

  const handlePrevYear = React.useCallback(() => {
    if (calendarView === 'years') {
      const [firstYear] = decade.split('-');
      const prevDecade = createDecadeTitle(Number(firstYear) - 10);
      handleChangeDecade(prevDecade, section);
    } else {
      let prevYear = year - 1;
      if (prevYear < 1000) {
        prevYear = 1000;
      }
      handleChangeYear(prevYear, section);
    }
  }, [calendarView, decade, handleChangeDecade, handleChangeYear, section, year]);

  const handleNextYear = React.useCallback(() => {
    if (calendarView === 'years') {
      const [firstYear] = decade.split('-');
      const prevDecade = createDecadeTitle(Number(firstYear) + 10);
      handleChangeDecade(prevDecade, section);
    } else {
      let nextYear = year + 1;
      if (nextYear > 9999) {
        nextYear = 9999;
      }
      handleChangeYear(nextYear, section)
    }
  }, [calendarView, decade, handleChangeDecade, handleChangeYear, section, year]);

  const setMonthsView = React.useCallback(() => {
    handleChangeCalendarView('months', section);
  }, [handleChangeCalendarView, section]);

  const setYearsView = React.useCallback(
    (e: React.PointerEvent | React.MouseEvent) => {
      handleChangeCalendarView('years', section);
      e.stopPropagation();
    },
    [handleChangeCalendarView, section],
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
