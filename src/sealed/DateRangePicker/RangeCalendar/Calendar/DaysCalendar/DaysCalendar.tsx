import React from 'react';
import {getDayTooltip} from '../../../../../DayPicker/utils/calendar';
import {useDateRange} from '../../../DateRangeProvider';
import {Day} from './Day';
import {createDayCalendar} from './utils';
import {Days} from './styles';
import {TCalendarSection} from '../../../types';

export function DaysCalendar(props: {section: TCalendarSection}) {
  const {section} = props;
  const {dayEnd, dayStart, locale, minDate, maxDate, format} = useDateRange();
  const {month, year} = section === 'start' ? dayStart : dayEnd;
  const calendar = React.useMemo(() => createDayCalendar(month, year, {format, minDate, maxDate}), [
    format,
    maxDate,
    minDate,
    month,
    year,
  ]);

  return (
    <Days>
      {calendar.map(day => {
        return <Day date={day} key={day.key} title={getDayTooltip(day?.date, locale)} section={section} />;
      })}
    </Days>
  );
}
