import React from 'react';
import styled from '@emotion/styled';
import {useTheme} from '../../../Themes';
import {Button} from '../../../Button';
import {LeftIcon} from '../../icons/LeftIcon';
import {useDayPicker} from '../../DayPickerProvider';
import {getMonthName, createDateString} from '../../utils/date';

const Panel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0px 4px;
`;

const NavButton = styled(Button)`
  background: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
  min-width: 20px;
  min-height: 32px;
  width: 20px;
  height: 32px;
  &:hover {
    background: none;
  }
  &:active {
    box-shadow: none;
  }
`;

export function Navigator() {
  const theme = useTheme();
  const {locale, month, year, day, handleChangeDay, format, delimiter} = useDayPicker();

  const monthName = getMonthName(month, locale);

  const handlePrevMonth = React.useCallback(() => {
    let prevMonth: number;
    prevMonth = month - 1;
    if (prevMonth < 1) {
      prevMonth = 12;
    }
    const newDate = createDateString(format, delimiter, {day, month: prevMonth, year});
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);

  const handleNextMonth = React.useCallback(() => {
    let nextMonth: number;
    nextMonth = month + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
    }
    const newDate = createDateString(format, delimiter, {day, month: nextMonth, year});
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);

  const handlePrevYear = React.useCallback(() => {
    let prevYear = year - 1;
    if (prevYear < 1000) {
      prevYear = 1000;
    }
    const newDate = createDateString(format, delimiter, {day, month, year: prevYear});
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);

  const handleNextYear = React.useCallback(() => {
    let nextYear = year + 1;
    if (nextYear > 9999) {
      nextYear = 9999;
    }
    const newDate = createDateString(format, delimiter, {day, month, year: nextYear});
    handleChangeDay(newDate);
  }, [day, delimiter, format, handleChangeDay, month, year]);

  return (
    <Panel css={{borderBottom: `1px ${theme.colors.pageElementsColors.border} solid`}}>
      <NavButton flat onClick={handlePrevYear}>
        <LeftIcon />
      </NavButton>
      <NavButton flat onClick={handlePrevMonth}>
        <LeftIcon />
      </NavButton>
      <div
        css={{
          display: 'flex',
          flexFlow: 'row nowrap',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <span>
          {monthName} {year}
        </span>
      </div>
      <NavButton flat css={{marginLeft: 'auto'}} onClick={handleNextMonth}>
        <LeftIcon css={{transform: 'rotate(180deg)'}} />
      </NavButton>
      <NavButton flat onClick={handleNextYear}>
        <LeftIcon css={{transform: 'rotate(180deg)'}} />
      </NavButton>
    </Panel>
  );
}
