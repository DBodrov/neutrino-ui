import React from 'react';
import {TSelectProps, SelectChangeTypes, TSelectState, TSelectContext} from './types';

const selectStateReducer = (state: TSelectState, changes: TSelectState): TSelectState => {
  switch (changes.type) {
    case SelectChangeTypes.idle:
    default:
      return changes;
    case SelectChangeTypes.clickOutside:
    case SelectChangeTypes.keyDownEsc:
    case SelectChangeTypes.keyPressEnter:
    case SelectChangeTypes.selectItem:
      return {
        ...changes,
        isOpen: false,
      };
    case SelectChangeTypes.keyDownSpace:
      return {
        ...changes,
        isOpen: !state.isOpen,
      };
  }
};

const SelectContext = React.createContext<TSelectContext>(null);
SelectContext.displayName = 'SelectContext';

export function Select(props: TSelectProps) {
  const {value, options, stateReducer = selectStateReducer, children, styles, onSelect} = props;
  const [state, dispatch] = React.useReducer(stateReducer, {isOpen: false, type: SelectChangeTypes.idle});
  const selectRef = React.useRef<HTMLDivElement>(null);
  const {isOpen} = state;

  const getDisplayValue = React.useCallback(() => {
    if (!value) {
      return '';
    }
    return options?.find(item => {
      return item.id === value;
    }).value;
  }, [options, value]);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        if (selectRef.current.contains(e.target)) {
          return;
        }
        dispatch({type: SelectChangeTypes.clickOutside});
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const ctx = React.useMemo<TSelectContext>(
    () => ({displayValue: getDisplayValue(), dispatch, onSelect, selectedValue: value, options, isOpen}),
    [getDisplayValue, isOpen, onSelect, options, value],
  );

  return (
    <SelectContext.Provider value={ctx}>
      <div css={[{position: 'relative'}, styles]} ref={selectRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('useSelect must be used within a Select');
  }
  return context;
}
