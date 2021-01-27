import React from 'react';
import {Navigator} from './Navigator';
import {DaysOfWeek} from './DaysOfWeek';
import {DaysCalendar} from './DaysCalendar';
import {MonthsCalendar} from './MonthsCalendar';
import {YearsCalendar} from './YearsCalendar';
import {CalendarBlock} from './styles';
import {TCalendarProps} from '../../types';

export function Calendar(props: TCalendarProps) {
  const {calendarView, calendarSection} = props;
  const renderCalendar = () => {
    if (calendarView === 'days') {
      return <DaysCalendar section={calendarSection} />;
    }
    if (calendarView === 'months') {
      return <MonthsCalendar section={calendarSection} />;
    }
    if (calendarView === 'years') {
      return <YearsCalendar section={calendarSection} />;
    }
    return <DaysCalendar section={calendarSection} />;
  };
  return (
    <CalendarBlock
      {...props}
    >
      <Navigator section={calendarSection} />
      {calendarView === 'days' ? <DaysOfWeek /> : null}
      {renderCalendar()}
    </CalendarBlock>
  );
}
