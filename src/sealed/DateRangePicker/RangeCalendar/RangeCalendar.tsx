import React from 'react';
import {StartCalendar} from './StartCalendar';
import {EndCalendar} from './EndCalendar';
import {RangeCalendarBox} from './styles';

export function RangeCalendar() {
  return (
    <RangeCalendarBox>
      <StartCalendar />
      <EndCalendar />
    </RangeCalendarBox>
  )
}
