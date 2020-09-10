import React from 'react';
import styled from '@emotion/styled';
import {useDayPicker} from '../../DayPickerProvider';
import {getDayTooltip} from '../../utils/calendar';
import {Day} from './Day';
import {createDayCalendar} from './utils';

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2rem);
  gap: 1px;
  width: 100%;
  align-content: center;
  justify-items: center;
  padding: 10px 16px 0px;

`;

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
