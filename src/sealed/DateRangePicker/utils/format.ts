import {THIS_DAY, THIS_MONTH, THIS_YEAR} from './date'
import {TDay} from '../types';

const validateDayFormat = (format: string) => {
  const hasDay = format.includes('DD');
  const hasMonth = format.includes('MM');
  const hasYear = format.includes('YYYY');
  return hasDay && hasMonth && hasYear;
};

const inputTypes = {
  DD: 'day',
  MM: 'month',
  YYYY: 'year',
};

const createFormatConfig = ({format, delimiter}: {format: string; delimiter: string}) => {
  const inputsMap = new Map<string, {length: number}>();
  format.split(delimiter).forEach(s => {
    inputsMap.set(inputTypes[s], {length: s.length});
  });
  return inputsMap;
};

export const parseFormat = (format: string): {inputs: Map<string, {length: number}>; delimiter: string} => {
  const dayFormatIsValid = validateDayFormat(format);
  const formatConfig = {inputs: null, delimiter: null};
  if (dayFormatIsValid) {
    const delimiters = format.split('').filter(char => char !== 'D' && char !== 'M' && char !== 'Y');
    if (delimiters.length === 2) {
      formatConfig.inputs = createFormatConfig({format, delimiter: delimiters[0]});
      formatConfig.delimiter = delimiters[0];
      return formatConfig;
    }
  }
  throw new Error('format is invalid');
};

export function createMask(format: string): string {
  const output = [];
  format.split('').forEach(char => {
    if (char !== 'D' && char !== 'M' && char !== 'Y') {
      output.push(char);
    } else {
      output.push('9');
    }
  });

  const mask = output.join('');
  return mask;
}

/**@format 2020-11-18 === YYYY-MM-DD */
export function parseDate(value: string, format: string): TDay {
  const {delimiter} = parseFormat(format);
  const parsedFormat = format.split('-').map(char => {
    if (char === 'DD') return 'day';
    if (char === 'MM') return 'month';
    return 'year';
  });
  const day: TDay = {day: THIS_DAY, month: THIS_MONTH, year: THIS_YEAR};
  value.split(delimiter).forEach((dateChar, idx) => {
    // console.log(dateChar)
    const charType = parsedFormat[idx];
    const defaultValue = day[charType];
    const _val = Number(dateChar);

    day[charType] = isFinite(_val) ? _val : defaultValue;
  });
  return day;
}
