import React from 'react';
import {useTheme} from '../../../Themes';
import {useDatePicker} from '../DatePickerProvider';
import {Navigator} from './Navigator';
import {DaysOfWeek} from './DaysOfWeek';
import {DaysCalendar} from './DaysCalendar';
import {MonthsCalendar} from './MonthsCalendar';
import {YearsCalendar} from './YearsCalendar';
import {CalendarBlock} from './styles';

export function Calendar(props: any) {
  const theme = useTheme();
  const {calendarView} = useDatePicker();
  const renderCalendar = () => {
    if (calendarView === 'days') {
      return <DaysCalendar />
    }
    if (calendarView === 'months') {
      return <MonthsCalendar />
    }
    if (calendarView === 'years') {
      return <YearsCalendar />
    }
    return <DaysCalendar />
  }
  return (
    <CalendarBlock
      css={{
        border: `1px ${theme?.colors?.pageElementsColors?.border} solid`,
        backgroundColor: theme?.colors?.pageElementsColors?.formElements,
      }}
      {...props}
    >
      <Navigator />
      {calendarView === 'days' ? <DaysOfWeek /> : null}
      {renderCalendar()}
    </CalendarBlock>
  );
}
