import {TDay, TDayType} from '../types';
import {THIS_MONTH, THIS_YEAR, THIS_DECADE} from './date';
import {parseDate} from './format';

export const getDaysInMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
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

export const isSameDay = (date: TDay, baseDate: TDay): boolean => {
  const {day: currentDay, month: currentMonth, year: currentYear} = date;
  const {day: baseDay, month: baseMonth, year: baseYear} = baseDate;
  return currentDay === baseDay && currentMonth === baseMonth && currentYear === baseYear;
};

export const isSameMonth = (date: TDay, baseDate: TDay): boolean => {
  const {month: currentMonth, year: currentYear} = date;
  const {month: baseMonth, year: baseYear} = baseDate;
  return currentMonth === baseMonth && currentYear === baseYear;
};

export const getFirstDayOfMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  return firstDay === 0 ? 7 : firstDay;
};

// предыдущий месяц (и год)
export const getPreviousMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return {month: prevMonth, year: prevMonthYear};
};

export const getNextMonth = (month = THIS_MONTH, year = THIS_YEAR) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return {month: nextMonth, year: nextMonthYear};
};

export const getCurrentMonthDays = (month: number, year: number) => {
  const monthDays = getDaysInMonth(month, year);
  const emptyCalendar = new Array(monthDays).fill(undefined);

  return [...emptyCalendar].map((n, i) => i + 1);
};

export const getDayType = (displayDate: TDay): TDayType => {
  const {day, month, year} = displayDate;
  const dayNumber = new Date(year, month - 1, day).getDay();
  if (dayNumber === 6 || dayNumber === 0) {
    return 'weekend';
  }
  return 'workday';
};

export const getDayTooltip = (date: Date, locale: string | string[]) => {
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString(locale, options);
};

export const getFirstYearInDecade = (year = THIS_YEAR) => {
  const firstYear = year - (year % 10);
  return firstYear;
};

export const createDecadeTitle = (year = THIS_YEAR) => {
  const firstYear = getFirstYearInDecade(year);
  const lastYear = firstYear + 9;
  return `${firstYear}-${lastYear}`;
};

export const getDisabledState = (
  day: number,
  month: number,
  year: number,
  format: string,
  minDate?: string,
  maxDate?: string,
) => {
  const currentDate = new Date(year, month - 1, day);
  let minResult = false;
  let maxResult = false;
  if (minDate) {
    const {day: minDay, month: minMonth, year: minYear} = parseDate(minDate, format);
    const minNativeDate = new Date(minYear, minMonth - 1, minDay);
    // console.log('***********', currentDate, minNativeDate, currentDate < minNativeDate)
    minResult = currentDate < minNativeDate;
  }
  if (maxDate) {
    const {day: maxDay, month: maxMonth, year: maxYear} = parseDate(maxDate, format);
    const maxNativeDate = new Date(maxYear, maxMonth - 1, maxDay);
    maxResult = currentDate > maxNativeDate;
  }
  //console.log(currentDate, minDate, minResult )
  return minResult || maxResult;
};

export const yearsCalendarBuilder = (decade = THIS_DECADE) => {
  const [firstYear, lastYear] = decade.split('-');
  const emptyYears = new Array(10).fill(undefined);
  const currentDecade = emptyYears.map((n, i) => Number(firstYear) + i);
  const yearsCalendar = [Number(firstYear) - 1, ...currentDecade, Number(lastYear) + 1];

  return yearsCalendar;
};
