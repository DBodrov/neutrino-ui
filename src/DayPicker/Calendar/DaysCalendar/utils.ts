import {THIS_MONTH, THIS_YEAR, CALENDAR_WEEKS} from '../../utils/date';
import {getDayType, getNextMonth, getPreviousMonth, getDaysInMonth, getCurrentMonthDays, getFirstDayOfMonth} from '../../utils/calendar';
import {TDayCalendar} from '../../types';

const createDay = (day: number, month: number, year: number, isCurrentMonth: boolean) => {
  const dayType = getDayType({month, year, day});
  // const disabledDate = getDisabledState(day, month, year, minDate, maxDate);

  const calendarDay = {
    key: `${year}_${month}_${day}`,
    type: dayType,
    day,
    month,
    year,
    date: new Date(year, month - 1, day),
    isCurrentMonth,
    // disabledDate,
  };

  return calendarDay;
};

export function createDayCalendar(month = THIS_MONTH, year = THIS_YEAR): TDayCalendar {
  const currentMonthDays = getCurrentMonthDays(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const currentMonthDates = currentMonthDays.map(day => createDay(day, month, year, true));
  const countDaysCurrentMonth = currentMonthDates.length;
  const countDaysPrevMonth = firstDay - 1;
  const countDaysNextMonth = CALENDAR_WEEKS * 7 - (countDaysPrevMonth + countDaysCurrentMonth);

  const {month: prevMonth, year: prevMonthYear} = getPreviousMonth(month, year);
  const {month: nextMonth, year: nextMonthYear} = getNextMonth(month, year);
  const prevMonthDays = getDaysInMonth(prevMonth, prevMonthYear); // дней в предыдущем месяце

  const prevMonthDates = Array(countDaysPrevMonth)
    .fill(undefined)
    .map((n, index) => {
      const day = index + 1 + (prevMonthDays - countDaysPrevMonth);
      return createDay(day, prevMonth, prevMonthYear, false);
    });

  const nextMonthDates = Array(countDaysNextMonth)
    .fill(undefined)
    .map((n, index) => {
      const day = index + 1;
      return createDay(day, nextMonth, nextMonthYear, false);
    });

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
}
