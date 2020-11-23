import React from 'react';
import {useDateRange} from '../DateRangeProvider';
import {Calendar} from './Calendar';

export function StartCalendar() {
  const {calendarStartView} = useDateRange();
  console.log(calendarStartView)
  return (
    <Calendar calendarView={calendarStartView} calendarSection="start" />
  )
}
