import { SerializedStyles } from '@emotion/core'

// type TChangeTypes = 'IDLE' | 'SELECT_CLICK' | 'CLICK_OUTSIDE' | 'SCROLL' | 'CHANGE_DISPLAYVALUE';
export enum SelectChangeTypes {
  idle = 'IDLE',
  selectClick = 'SELECT_CLICK',
  clickOutside = 'CLICK_OUTSIDE',
  scroll = 'SCROLL',
  changeDisplayValue = 'CHANGE_DISPLAY_VALUE'
}

export interface ISelectState {
  type?: SelectChangeTypes;
  currentValue?: string | number | string[] | number[];
  displayValue?: string;
  isOpen?: boolean;
};

export interface ISelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  stateReducer?: (state: ISelectState, changes: ISelectState) => ISelectState;
  prefix?: string;
  prefixCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  isEdit?: boolean;
  displayValueCss?: SerializedStyles;
  caption?: string;
  children?: React.ReactNode;
}
