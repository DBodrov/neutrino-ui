import {SerializedStyles} from '@emotion/react';

export enum SelectChangeTypes {
  idle = 'IDLE',
  clickOutside = 'CLICK_OUTSIDE',
  keyDownEsc = 'KEYDOWN_ESC',
  keyPressEnter = 'KEYPRESS_ENTER',
  selectItem = 'SELECT_ITEM',
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
