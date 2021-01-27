import {SerializedStyles} from '@emotion/react';

export type TCalendarSection = 'start' | 'end';

export type TDay = {
  day: number;
  month: number;
  year: number;
};

export type TCalendarDate = {
  key: string;
  type: TDayType;
  date: Date;
  isCurrentMonth: boolean;
  isDisabled?: boolean;
} & TDay;

export type TDayType = 'workday' | 'weekend';

export type TDayCalendar = TCalendarDate[];

export type TCalendarView = 'days' | 'months' | 'years';

export type TDayCalendarOptions = {
  minDate?: string;
  maxDate?: string;
  format?: string;
}

export interface IMonth {
  monthNumber: number;
  monthName: string;
}

export type TDateRangeValue = [string?, string?];

export type TDateRangeProps = {
  value?: TDateRangeValue;
  name: string;
  className?: string;
  onChangeHandler: (dateRange?: TDateRangeValue) => void;
  locale?: string;
  placeholder?: string;
  children?: React.ReactNode;
  minDate?: string;
  maxDate?: string;
  inputCss?: SerializedStyles;
  calendarCss?: SerializedStyles;
};

export interface IDateRangeInputProps extends React.HTMLProps<HTMLDivElement> {
  inputCss?: SerializedStyles;
  value?: TDateRangeValue;
}

export type TCalendarProps = {
  calendarView?: TCalendarView;
  calendarSection: TCalendarSection;
}

export type TNavigatorProps = {
  section: TCalendarSection;
}
