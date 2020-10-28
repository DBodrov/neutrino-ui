export enum StateChangeTypes {
  idle = 'IDLE',
  toggle = 'TOGGLE',
  clickOutside = 'CLICK_OUTSIDE',
  close = 'CLOSE',
  open = 'OPEN',
}
/**@deprecated */
export interface IComboboxState {
  type?: StateChangeTypes;
  isOpen?: boolean;
};

/**@deprecated */
export interface IComboboxProps {
  stateReducer?: (state: IComboboxState, changes: IComboboxState) => IComboboxState;
  children?: React.ReactNode;
}

/**@deprecated */
export interface IComboboxContext {
  // dropdownRef: React.MutableRefObject<HTMLDivElement>,
  // selectRect: DOMRect;
  isOpen: boolean;
  handleClose: () => void;
  handleToggle: () => void;
  handleOpen: () => void;
}
