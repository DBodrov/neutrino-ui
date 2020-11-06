import React from 'react';
import {css} from '@emotion/core';
import {useTheme} from '../../../Themes';
import {useToggle} from '../../../ToggleProvider';
import {useDayPicker} from '../../DayPickerProvider';
import {zeroPad} from '../../utils/common';
import {TCalendarDate} from '../../types';
import {DayButton} from './styles';

const baseStyles = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 50%;
`;

type TDayProps = {date: TCalendarDate; title?: string};

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
  const {day, month, year, isCurrentMonth, isDisabled} = date;
  const {handleClose} = useToggle();

  const isCurrentDay = React.useCallback(() => {
    return day === currentDay && month === currentMonth && year === currentYear;
  }, [currentDay, currentMonth, currentYear, day, month, year]);

  const dayStyles = css`
    opacity: ${isCurrentMonth && !isDisabled ? 1 : 0.5};
    background-color: ${isCurrentDay() ? theme.colors.mainColors.primaryDark : 'transparent'};
    color: ${isCurrentDay()
      ? theme.colors.textColors.textOnPrimary
      : date.type === 'weekend'
      ? '#D40000'
      : theme.colors.textColors.text};
    cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    &:hover {
      background-color: ${isDisabled ? 'transparent' : theme.colors.mainColors.primary};
      color: ${isDisabled ? 'initial' : theme.colors.textColors.textOnPrimary};
    }
    &:focus {
      outline: 1px ${theme.colors.mainColors.secondary} solid;
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
    handleClose();
  }, [day, delimiter, format, handleChangeDay, handleClose, month, year]);
  return (
    <DayButton
      onClickCapture={isDisabled ? undefined : handleSelectDay}
      title={title}
      css={[baseStyles, dayStyles]}
      tabIndex={0}
    >
      {date.day}
    </DayButton>
  );
}
