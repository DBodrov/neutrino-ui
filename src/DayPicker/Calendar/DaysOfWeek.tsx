import React from 'react';
import styled from '@emotion/styled';
import {WEEK_DAYS} from './utils/date';
import {Span} from '../../Typography';

export const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 16px;
  align-content: center;
  justify-items: center;
  padding: 4px 16px;
`;

const isWeekend = (dayNumber: number) => dayNumber === 0 || dayNumber === 6;
export function DaysOfWeek() {
  return (
    <Week>
      {WEEK_DAYS.map(day => (
        <Span key={day.number} css={{fontSize: 10, color: isWeekend(day.number) && '#D40000'}}>
          {day.title}
        </Span>
      ))}
    </Week>
  );
}
