import {SerializedStyles} from '@emotion/react';

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

export type TDatePickerProps = {
  value?: string;
  name: string;
  className?: string;
  onChangeHandler: (date: string) => void;
  format?: string;
  locale?: string;
  placeholder?: string;
  children?: React.ReactNode;
  pickerInputStyles?: SerializedStyles;
  isEditable?: boolean;
  minDate?: string;
  maxDate?: string;
};

/**@deprecated */
export type DatePickerValue = string;
/**@deprecated */
export interface IYear {
  [id: number]: number;
}

/**@deprecated */
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
/**@deprecated */
export interface IPickerValue {
  day: string;
  month: string;
  year: string;
}
/**@deprecated */
export interface IPickerDropdownProps {
  isOpen: boolean;
  offset?: ClientRect;
  // onClick: (value: string) => void;
  children?: never;
}

/**@deprecated */
export type ChangeDirection = 'prev' | 'next';
/**@deprecated */
export type PanelType = 'month' | 'year' | 'decade';

/**@deprecated */
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

/**@deprecated */
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
/**@deprecated */
export interface IDateParams {
  day: number;
  month: number;
  year: number;
}
