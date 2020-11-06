import React from 'react';
import {css} from '@emotion/core';
import {useTheme} from '../../../Themes';
import {getMonthsList} from '../../utils/date';
import {useDayPicker} from '../../DayPickerProvider';
import {Months, Month} from './styles';

export function MonthsCalendar() {
  const {locale, handleChangeMonth, month} = useDayPicker();
  const {colors} = useTheme();
  const activeMonthStyles = css({
    cursor: 'pointer',
    backgroundColor: colors?.mainColors?.primaryDark,
    color: colors?.textColors?.textOnPrimary,
  });

  const selectMonth = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    //e.preventDefault();
    const monthNumber = Number(e.currentTarget.value);
    handleChangeMonth(monthNumber);
    e.stopPropagation();
  }, [handleChangeMonth])

  return (
    <Months>
      {getMonthsList(locale).map(({monthName, monthNumber}) => {
        return (
          <Month
            css={[
              {
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: colors?.mainColors?.primary,
                  color: colors?.textColors?.textOnPrimary,
                },
                '&:focus': {
                  outline: `1px ${colors.mainColors.secondary} solid`
                }
              },
              monthNumber === month ? activeMonthStyles : null
            ]}
            key={monthNumber}
            onClick={selectMonth}
            value={monthNumber}
          >
            {monthName}
          </Month>
        );
      })}
    </Months>
  );
}
