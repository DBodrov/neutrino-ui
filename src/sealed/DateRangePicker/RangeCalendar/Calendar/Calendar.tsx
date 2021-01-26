import React from 'react';
import {useTheme} from '../../../../Themes';
import {Navigator} from './Navigator';
import {DaysOfWeek} from './DaysOfWeek';
import {DaysCalendar} from './DaysCalendar';
import {MonthsCalendar} from './MonthsCalendar';
import {YearsCalendar} from './YearsCalendar';
import {CalendarBlock} from './styles';
import {TCalendarProps} from '../../types';

export function Calendar(props: TCalendarProps) {
  const {calendarView, calendarSection} = props;
  const theme = useTheme();
  // const {calendarView} = useDayPicker();
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
      css={{
        border: `1px ${theme?.colors?.pageElementsColors?.border} solid`,
        backgroundColor: theme?.colors?.pageElementsColors?.body,
      }}
      {...props}
    >
      <Navigator section={calendarSection} />
      {calendarView === 'days' ? <DaysOfWeek /> : null}
      {renderCalendar()}
    </CalendarBlock>
  );
}
