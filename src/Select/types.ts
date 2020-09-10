import { SerializedStyles } from '@emotion/core'

export enum SelectChangeTypes {
  idle = 'IDLE',
  toggle = 'TOGGLE',
  clickOutside = 'CLICK_OUTSIDE',
  scroll = 'SCROLL',
  changeDisplayValue = 'CHANGE_DISPLAY_VALUE',
  close = 'CLOSE',
  open = 'OPEN',
}

export interface ISelectState {
  type?: SelectChangeTypes;
  isOpen?: boolean;
};

export interface ISelectProps extends React.HTMLProps<HTMLDivElement> {
  stateReducer?: (state: ISelectState, changes: ISelectState) => ISelectState;
  isEdit?: boolean;
  hasError?: boolean;
  children?: React.ReactNode;
  activeStyles?: SerializedStyles;
}

export interface ISelectContext {
  dropdownRef: React.MutableRefObject<HTMLDivElement>,
  selectRect: DOMRect;
  isOpen: boolean;
  handleCloseSelect: () => void;
  handleToggleSelect: () => void;
  handleOpenSelect: () => void;
}
