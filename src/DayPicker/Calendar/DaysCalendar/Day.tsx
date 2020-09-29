import React from 'react';
import {css} from '@emotion/core';
import {Span} from '../../../Typography';
import {useTheme} from '../../../Themes';
import {useSelect} from '../../../Select';
import {useDayPicker} from '../../DayPickerProvider';
import {zeroPad} from '../../utils/common';
import {TCalendarDate} from '../../types';

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

type TDayProps = {date: TCalendarDate, title?: string};

export function Day({date, title = ''}: TDayProps) {
  const {
    handleChangeDay,
    delimiter,
    format,
    day: currentDay,
    month: currentMonth,
    year: currentYear,
  } = useDayPicker();
  const theme = useTheme();
  const {day, month, year, isCurrentMonth} = date;
  const {handleCloseSelect} = useSelect();

  const isCurrentDay = React.useCallback(() => {
    return day === currentDay && month === currentMonth && year === currentYear;
  }, [currentDay, currentMonth, currentYear, day, month, year]);

  const dayStyles = css`
    opacity: ${isCurrentMonth ? 1 : 0.5};
    background-color: ${isCurrentDay() ? theme.colors.mainColors.primaryDark : 'transparent'};
    color: ${isCurrentDay() ? theme.colors.textColors.textOnPrimary : theme.colors.textColors.text};
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
    handleCloseSelect();
  }, [day, delimiter, format, handleChangeDay, handleCloseSelect, month, year]);
  return (
    <Span
      onClickCapture={handleSelectDay}
      title={title}
      css={[baseStyles, css({color: date.type === 'weekend' && '#D40000'}), dayStyles]}
    >
      {date.day}
    </Span>
  );
}
