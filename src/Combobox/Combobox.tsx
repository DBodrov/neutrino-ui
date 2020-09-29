import React from 'react';
import {IComboboxState, StateChangeTypes, IComboboxContext, IComboboxProps} from './types';

const initState = {
  type: StateChangeTypes.idle,
  isOpen: false,
};

export const comboboxReducer = (state: IComboboxState, changes: IComboboxState): IComboboxState => {
  // console.info(changes)
  switch (changes.type) {
    case StateChangeTypes.idle:
    default:
      return {
        ...changes,
      };
    case StateChangeTypes.toggle:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case StateChangeTypes.clickOutside:
      return {
        ...state,
        isOpen: false,
      };
    case StateChangeTypes.close:
      return {
        ...state,
        isOpen: false,
      };
    case StateChangeTypes.open:
      return {
        ...state,
        isOpen: true,
      };
  }
};

const ComboboxContext = React.createContext<IComboboxContext | undefined>(undefined);

export function Combobox(props: IComboboxProps) {
  const {stateReducer = comboboxReducer, children} = props;

  // const dropdownRef = useRef<HTMLDivElement>(null);
  // const selectRef = useRef<HTMLDivElement>(null);
  // const selectRect = selectRef?.current?.getBoundingClientRect();

  const [{isOpen}, dispatch] = React.useReducer(stateReducer, initState);
  //useSelectEvents(selectRef, dropdownRef, dispatch, {isOpen});

  const handleToggle = () => dispatch({type: StateChangeTypes.toggle});

  const handleOpen = () => dispatch({type: StateChangeTypes.open});

  const handleClose = () => dispatch({type: StateChangeTypes.close});

  const ctxValue = React.useMemo<IComboboxContext>(() => ({isOpen, handleClose, handleOpen, handleToggle}), [
    isOpen,
  ]);

  return <ComboboxContext.Provider value={ctxValue}>{children}</ComboboxContext.Provider>;
}

export const useCombobox = () => {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('Component must be inside Combobox ');
  }
  return context;
};
