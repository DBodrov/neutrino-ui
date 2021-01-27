import React from 'react';
import {useDateRange} from '../DateRangeProvider';
import {Calendar} from './Calendar';

export function EndCalendar() {
  const {calendarEndView} = useDateRange();

  return (
    <Calendar calendarView={calendarEndView} calendarSection="end" />
  )
}
