import {SerializedStyles} from '@emotion/react';

export enum SelectChangeTypes {
  idle = 'IDLE',
  clickOutside = 'CLICK_OUTSIDE',
  keyDownEsc = 'KEYDOWN_ESC',
  keyPressEnter = 'KEYPRESS_ENTER',
  selectItem = 'SELECT_ITEM',
  keyDownSpace = 'KEYDOWN_SPACE'
}

export type TSelectState = {
  type?: SelectChangeTypes;
  isOpen?: boolean;
}

export type TOptionItem = {
  id: string | number;
  value: string | number;
};

export type TSelectProps = {
  children: React.ReactNode;
  styles?: SerializedStyles;
  value?: string | number;
  options?: TOptionItem[];
  stateReducer?: (state: TSelectState, changes: TSelectState) => TSelectState;
  onSelect: (value: string | number) => void;
}

export type TSelectContext = {
  isOpen: boolean;
  displayValue?: string | number;
  selectedValue?: string | number;
  dispatch: React.Dispatch<TSelectState>;
  options?: TOptionItem[];
  onSelect?: (value: string | number) => void;
};
