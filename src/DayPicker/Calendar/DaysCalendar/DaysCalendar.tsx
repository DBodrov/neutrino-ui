import React from 'react';
import {useDayPicker} from '../../DayPickerProvider';
import {getDayTooltip} from '../../utils/calendar';
import {Day} from './Day';
import {createDayCalendar} from './utils';
import {Days} from './styles';

export function DaysCalendar() {
  const {month, year, locale} = useDayPicker();
  const calendar = createDayCalendar(month, year);

  return (
    <Days>
      {calendar.map(day => {
        return <Day date={day} key={day.key} title={getDayTooltip(day?.date, locale)} />;
      })}
    </Days>
  );
}
