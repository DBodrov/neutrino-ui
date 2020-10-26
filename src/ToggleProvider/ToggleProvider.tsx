import React from 'react';
import {IToggleState, ToggleChangeTypes, IToggleContext, IToggleProps} from './types';

const initState = {
  type: ToggleChangeTypes.idle,
  isOpen: false,
};

export const toggleReducer = (state: IToggleState, changes: IToggleState): IToggleState => {
  // console.info(changes)
  switch (changes.type) {
    case ToggleChangeTypes.idle:
    default:
      return {
        ...changes,
      };
    case ToggleChangeTypes.toggle:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case ToggleChangeTypes.clickOutside:
      return {
        ...state,
        isOpen: false,
      };
    case ToggleChangeTypes.close:
      return {
        ...state,
        isOpen: false,
      };
    case ToggleChangeTypes.open:
      return {
        ...state,
        isOpen: true,
      };
  }
};

const ToggleContext = React.createContext<IToggleContext | undefined>(undefined);

export function ToggleProvider(props: IToggleProps) {
  const {stateReducer = toggleReducer, children} = props;

  const [{isOpen}, dispatch] = React.useReducer(stateReducer, initState);

  const handleToggle = () => dispatch({type: ToggleChangeTypes.toggle});

  const handleOpen = () => dispatch({type: ToggleChangeTypes.open});

  const handleClose = () => dispatch({type: ToggleChangeTypes.close});

  const ctxValue = React.useMemo<IToggleContext>(() => ({isOpen, handleClose, handleOpen, handleToggle}), [
    isOpen,
  ]);

  return <ToggleContext.Provider value={ctxValue}>{children}</ToggleContext.Provider>;
}

export const useToggle = () => {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};
