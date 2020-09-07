import React from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {useDayPicker} from '../../DayPickerProvider';
import {Span} from '../../../Typography';
import {useTheme} from '../../../Themes';
import {zeroPad} from '../utils/common';
import {TCalendarDate} from '../../types';
import {createDayCalendar} from './utils';

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

const baseStyles = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  border-radius: 50%;
`;

type Props = {date: TCalendarDate};

function Day({date}: Props) {
  const {handleChangeDay, delimiter, format} = useDayPicker();
  const theme = useTheme();
  const {day, month, year} = date;
  const hoverStyles = css`
    &:hover {
      background-color: ${theme.colors.mainColors.primary};
      color: ${theme.colors.textColors.textOnPrimary};
    }
  `;
  const handleSelectDay = React.useCallback(() => {
    const outputDate = [];
    format.split(delimiter).forEach(ch => {
      if (ch === 'DD') {
        outputDate.push(zeroPad(day, 2));
      } else if (ch === 'MM') {
        outputDate.push(zeroPad(month, 2));
      } else if (ch === 'YYYY') {
        outputDate.push(year);
      }
    });
    const newDate = outputDate.join(delimiter);
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);
  return (
    <Span
      onClick={handleSelectDay}
      css={[baseStyles, css({color: date.type === 'weekend' && '#D40000'}), hoverStyles]}
    >
      {date.day}
    </Span>
  );
}

export function DaysCalendar() {
  const {month, year} = useDayPicker();

  const calendar = createDayCalendar(month, year);

  return (
    <Days>
      {calendar.map(day => {
        return <Day date={day} key={day.key} />;
      })}
    </Days>
  );
}
