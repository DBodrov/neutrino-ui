import {THIS_DAY, THIS_MONTH, THIS_YEAR, getMonthName} from '../utils/date';
import {getDayType, getNextMonth, getPreviousMonth} from '../utils/calendar';
import {TDayCalendar} from '../../types';

export const WEEK_DAYS = [
  {title: 'Пн', number: 1},
  {title: 'Вт', number: 2},
  {title: 'Ср', number: 3},
  {title: 'Чт', number: 4},
  {title: 'Пт', number: 5},
  {title: 'Сб', number: 6},
  {title: 'Вс', number: 0},
] as const;

// 6 недель в календаре
export const CALENDAR_WEEKS = 6;

const getDaysInMonth = (month: number, year: number) => {
  const months30 = [4, 6, 9, 11]; // апрель, июнь, сентябрь, ноябрь - по 30 дней
  const isLeapYear = year % 4 === 0; // делится на 4 без остатка - високосный год

  return month === 2 // февраль 28-29?
    ? isLeapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

export const getFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  return firstDay === 0 ? 7 : firstDay;
};

const getCurrentMonthDays = (month: number, year: number) => {
  const monthDays = getDaysInMonth(month, year);
  const emptyCalendar = new Array(monthDays).fill(undefined);

  return [...emptyCalendar].map((n, i) => i + 1);
};

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
  const firstDay = getFirstDay(month, year);

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
