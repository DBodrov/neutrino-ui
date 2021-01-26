import React from 'react';
import {css} from '@emotion/react';
import {useTheme} from '../../../../../Themes';
import {useDateRange} from '../../../DateRangeProvider';
import {yearsCalendarBuilder} from '../../../utils/calendar';
import {TCalendarSection} from '../../../types';
import {Years, Year} from './styles';

type Props = {
  section: TCalendarSection;
};

export function YearsCalendar({section}: Props) {
  const {handleChangeYear, decadeEnd, decadeStart, dayStart, dayEnd} = useDateRange();
  const {colors} = useTheme();
  const activeYearStyles = css({
    cursor: 'pointer',
    backgroundColor: colors?.mainColors?.primaryDark,
    color: colors?.textColors?.textOnPrimary,
  });

  const currentYear = section === 'start' ? dayStart.year : dayEnd.year;

  const yearsCalendar = React.useMemo(
    () => yearsCalendarBuilder(section === 'start' ? decadeStart : decadeEnd),
    [decadeEnd, decadeStart, section],
  );

  const setYear = React.useCallback(
    (e: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>) => {
      const year = Number(e.currentTarget.value);
      handleChangeYear(year, section);
      e.stopPropagation();
    },
    [handleChangeYear, section],
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
            },
            year === currentYear ? activeYearStyles : null,
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
