import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {createDayCalendar} from './utils';
import {useDayPicker} from '../../DayPickerProvider';
import {Span} from '../../../Typography';
import {TCalendarDate} from '../../types';

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2rem);
  gap: 1px;
  width: 100%;
  align-content: center;
  justify-items: center;
  padding-top: 10px;
`;

const dayStyles = css`
  font-size: 12px;
`;
type Props = {date: TCalendarDate};
function Day({date}: Props) {
  return <Span css={[dayStyles, css({color: date.type === 'weekend' && '#D40000'})]}>{date.day}</Span>;
}

export function DaysCalendar() {
  const {month, year} = useDayPicker();

  const calendar = createDayCalendar(month, year);

  return (
    <Days>
      {calendar.map(day => {
        return <Day date={day} />;
      })}
    </Days>
  );
}
