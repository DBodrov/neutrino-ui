import React from 'react';
import {css} from '@emotion/react';
import {useTheme} from '../../../../../Themes';
import {getMonthsList} from '../../../utils/date';
import {useDateRange} from '../../../DateRangeProvider';
import {TCalendarSection} from '../../../types';
import {Months, Month} from './styles';

type Props = {
  section: TCalendarSection;
}
export function MonthsCalendar({section}: Props) {
  const {locale, handleChangeMonth, dayEnd, dayStart} = useDateRange();
  const {colors} = useTheme();
  const activeMonthStyles = css({
    cursor: 'pointer',
    backgroundColor: colors?.mainColors?.primaryDark,
    color: colors?.textColors?.textOnPrimary,
  });

  const {month} = section === 'start' ? dayStart : dayEnd;

  const selectMonth = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    //e.preventDefault();
    const monthNumber = Number(e.currentTarget.value);
    handleChangeMonth(monthNumber, section);
    e.stopPropagation();
  }, [handleChangeMonth, section])

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
                // '&:focus': {
                //   outline: `1px ${colors.mainColors.secondary} solid`
                // }
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
