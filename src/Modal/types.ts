import { SerializedStyles } from '@emotion/core';

export enum ModalChangeTypes {
  idle = 'IDLE',
  clickOutside = 'CLICK_OUTSIDE',
  keyDownEsc = 'KEYDOWN_ESC',
  showModal = 'SHOW_MODAL',
}

export interface IModalState {
  type?: ModalChangeTypes;
  showModal?: boolean;
}

export interface IModalProps {
  stateReducer?: (state: IModalState, changes: IModalState) => IModalState;
  children?: React.ReactNode;
  isOpen: boolean;
  placement?: 'top' | 'center' | 'bottom';
  className?: string;
  overlayCss?: SerializedStyles;
  onOverlayClick?: () => void;
}
