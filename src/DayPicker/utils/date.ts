import {IMonth, TDay} from '../types';
import {createDecadeTitle} from './calendar';
import {zeroPad} from './common';

export const THIS_YEAR = new Date().getFullYear();

export const THIS_DECADE = createDecadeTitle();

export const THIS_MONTH = new Date().getMonth() + 1;

export const THIS_DAY = new Date().getDate();

export const getMonthsList = (locale: string | string[]): IMonth[] => {
  const year = THIS_YEAR;
  const months: IMonth[] = [];
  for (let i = 0; i < 12; i++) {
    const monthNumber = i;
    const date = new Date(year, i, 1);
    const month = new Date(date).toLocaleString(locale, {month: 'long'});
    months.push({monthNumber: monthNumber + 1, monthName: month});
  }
  return months;
};

const thisMonthName = (locale: string | string[]) =>
  getMonthsList(locale).find(m => Number(m.monthNumber) === THIS_MONTH).monthName;

export function getMonthName(monthNumber: number, locale?: string | string[]) {
  const monthItem = getMonthsList(locale).find(m => Number(m.monthNumber) === Number(monthNumber));
  console.log(monthItem);
  return monthItem?.monthName ?? thisMonthName(locale);
}

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

export const createDateString = (format: string, delimiter: string, date: TDay) => {
  const outputDate = [];
  const {day, month, year} = date;
  format.split(delimiter).forEach(ch => {
    if (ch === 'DD') {
      outputDate.push(zeroPad(day, 2));
    } else if (ch === 'MM') {
      outputDate.push(zeroPad(month, 2));
    } else if (ch === 'YYYY') {
      outputDate.push(year);
    }
  });
  const dateString = outputDate.join(delimiter);
  return dateString;
};
