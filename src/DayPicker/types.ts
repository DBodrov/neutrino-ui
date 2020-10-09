import {SerializedStyles} from '@emotion/core';

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
} & TDay;

export type TDayType = 'workday' | 'weekend';

export type TDayCalendar = TCalendarDate[];

export interface IMonth {
  monthNumber: number;
  monthName: string;
}

type TDatePickerConfig = {
  format: string;
  locale: string;
};

export type TDatePickerProps = {
  value?: string;
  name: string;
  className?: string;
  onChangeHandler: (date: string) => void;
  config?: TDatePickerConfig;
  placeholder?: string;
  children?: React.ReactNode;
  pickerInputStyles?: SerializedStyles;
  isEditable?: boolean;
};

/**@depricated */
export type DatePickerValue = string;
/**@depricated */
export interface IYear {
  [id: number]: number;
}

/**@depricated */
export interface IDatePickerProps {
  name: string;
  view: TCalendarView;
  hasError?: boolean;
  disabled?: boolean;
  hasClear?: boolean;
  showCurrent?: boolean;
  locales?: string | string[];
  placeholder?: string;
  onChangeHandler: (value: string) => void;
  onClearHandler?: (name: string) => void;
  onFocusHandler?: (value: string) => void;
  onBlurHandler?: (value: string) => void;
  styles?: React.CSSProperties;
  value: DatePickerValue;
  tabIndex?: number;
  yearsList?: IYear[];
  monthsList?: IMonth[];
  maxDate?: string;
  minDate?: string;
  calendarDefaultDate?: string;
}
/**@depricated */
export interface IPickerValue {
  day: string;
  month: string;
  year: string;
}
/**@depricated */
export interface IPickerDropdownProps {
  isOpen: boolean;
  offset?: ClientRect;
  // onClick: (value: string) => void;
  children?: never;
}
/**@depricated */
export type TCalendarView = 'days' | 'months' | 'years';
/**@depricated */
export type ChangeDirection = 'prev' | 'next';
/**@depricated */
export type PanelType = 'month' | 'year' | 'decade';
/**@depricated */
export interface IDayCalendarOptions {
  minDate?: string;
  maxDate?: string;
}
/**@depricated */
export interface IDatePickerContext extends Partial<IDatePickerProps> {
  value?: string;
  internalValue?: string;
  decade: string;
  year: number;
  month: string;
  day: string;
  calendarView: TCalendarView;
  panelDirection: ChangeDirection;
  isFocused: boolean;

  handleChangePanel: (direction: ChangeDirection, panelType: PanelType) => void;
  handleChangeValue: (date: string) => void;
  handleBlurInput: (date: string) => void;
  handleCloseCalendar: () => void;
  setCalendarView: (view: TCalendarView) => void;
  handleSetFocus: (focusState: boolean) => void;
  setInternalValue: (date: string) => void;
}

/**@depricated */
export interface IDateObject {
  key: string;
  type: TDayType;
  monthStep: ChangeDirection;
  calendarDay: number;
  calendarMonth: number;
  calendarYear: number;
  calendarDate: Date;
  disabledDate: boolean;
}
/**@depricated */
export interface IDateParams {
  day: number;
  month: number;
  year: number;
}
