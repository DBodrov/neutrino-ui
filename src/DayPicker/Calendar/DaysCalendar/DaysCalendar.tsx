import React from 'react';
import {useDayPicker} from '../../DayPickerProvider';
import {getDayTooltip} from '../../utils/calendar';
import {Day} from './Day';
import {createDayCalendar} from './utils';
import {Days} from './styles';

export function DaysCalendar() {
  const {month, year, locale, minDate, maxDate, format} = useDayPicker();
  const calendar = createDayCalendar(month, year, {format, minDate, maxDate});

  return (
    <Days>
      {calendar.map(day => {
        return <Day date={day} key={day.key} title={getDayTooltip(day?.date, locale)} />;
      })}
    </Days>
  );
}
