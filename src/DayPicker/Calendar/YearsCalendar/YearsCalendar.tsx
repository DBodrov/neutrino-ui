import React from 'react';
import {css} from '@emotion/react';
import {useTheme} from '../../../Themes';
import {useDayPicker} from '../../DayPickerProvider';
import {yearsCalendarBuilder} from '../../utils/calendar';
import {Years, Year} from './styles';

export function YearsCalendar() {
  const {decade, year: storedYear, handleChangeYear, handleChangeCalendarView} = useDayPicker();
  const {colors} = useTheme();
  const activeYearStyles = css({
    cursor: 'pointer',
    backgroundColor: colors?.mainColors?.primaryDark,
    color: colors?.textColors?.textOnPrimary,
  });

  const yearsCalendar = React.useMemo(() => yearsCalendarBuilder(decade), [decade]);

  const setYear = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
      const year = Number(e.currentTarget.value);
      handleChangeYear(year);
      handleChangeCalendarView('months');
      e.stopPropagation();
    },
    [handleChangeCalendarView, handleChangeYear],
  );

  return (
    <Years>
      {yearsCalendar.map(year => (
        <Year
          value={year}
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
            year === storedYear ? activeYearStyles : null,
          ]}
          key={year}
          onClick={setYear}
        >
          {year}
        </Year>
      ))}
    </Years>
  );
}
