export enum SelectChangeTypes {
  idle = 'IDLE',
  selectClick = 'SELECT_CLICK',
  clickOutside = 'CLICK_OUTSIDE',
  scroll = 'SCROLL',
  changeDisplayValue = 'CHANGE_DISPLAY_VALUE'
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
}

export interface ISelectContext {
  dropdownRef: React.MutableRefObject<HTMLDivElement>,
  selectRect: DOMRect;
  isOpen: boolean;
}
