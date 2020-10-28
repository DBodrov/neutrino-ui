export enum ToggleChangeTypes {
  idle = 'IDLE',
  toggle = 'TOGGLE',
  clickOutside = 'CLICK_OUTSIDE',
  close = 'CLOSE',
  open = 'OPEN',
}

export interface IToggleState {
  type?: ToggleChangeTypes;
  isOpen?: boolean;
};

export interface IToggleProps {
  stateReducer?: (state: IToggleState, changes: IToggleState) => IToggleState;
  children?: React.ReactNode;
}

export interface IToggleContext {
  isOpen: boolean;
  handleClose: () => void;
  handleToggle: () => void;
  handleOpen: () => void;
}
