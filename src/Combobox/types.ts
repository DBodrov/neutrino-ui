export enum StateChangeTypes {
  idle = 'IDLE',
  toggle = 'TOGGLE',
  clickOutside = 'CLICK_OUTSIDE',
  close = 'CLOSE',
  open = 'OPEN',
}

export interface IComboboxState {
  type?: StateChangeTypes;
  isOpen?: boolean;
};

export interface IComboboxProps {
  stateReducer?: (state: IComboboxState, changes: IComboboxState) => IComboboxState;
  children?: React.ReactNode;
}

export interface IComboboxContext {
  // dropdownRef: React.MutableRefObject<HTMLDivElement>,
  // selectRect: DOMRect;
  isOpen: boolean;
  handleClose: () => void;
  handleToggle: () => void;
  handleOpen: () => void;
}
