import React, { useReducer, useRef, createContext, useContext, useMemo } from 'react';
import { useTheme } from '../Themes';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { useSelectEvents } from './use-select';
import { ISelectProps, ISelectState, SelectChangeTypes, ISelectContext } from './types';
import { SelectWrapper } from './styles';

const initState = {
  type: SelectChangeTypes.idle,
  isOpen: false,
};

const selectReducer = (state: ISelectState, changes: ISelectState) => {
  switch (changes.type) {
    case SelectChangeTypes.idle:
    default:
      return {
        ...changes,
      };
    case SelectChangeTypes.selectClick:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case SelectChangeTypes.clickOutside:
    case SelectChangeTypes.scroll:
      return {
        ...state,
        isOpen: false,
      };
    case SelectChangeTypes.changeDisplayValue:
      return {
        ...state,
        ...changes,
        isOpen: false,
      };
  }
};

const SelectContext = createContext<ISelectContext | undefined>(undefined);

export function Select(props: ISelectProps) {
  const {
    stateReducer = selectReducer,
    value,
    caption,
    prefix,
    prefixCss,
    isEdit,
    inputCss,
    displayValueCss,
    children,
    ...restProps
  } = props;

  const theme = useTheme();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectRect = selectRef?.current?.getBoundingClientRect();

  const [{ isOpen }, dispatch] = useReducer(stateReducer, initState);
  useSelectEvents(selectRef, dropdownRef, dispatch, { isOpen });

  const handleClick = () => {
    dispatch({ type: SelectChangeTypes.selectClick });
  };

  const ctxValue = useMemo<ISelectContext>(() => ({ dropdownRef: dropdownRef, isOpen, selectRect }), [
    isOpen,
    selectRect,
  ]);

  return (
    <SelectWrapper
      onClick={handleClick}
      ref={selectRef}
      css={{
        borderColor: `${isOpen ? theme.colors.mainColors.primary : theme.colors.pageElementsColors.border}`,
      }}
      {...restProps}
    >
      <SelectContext.Provider value={ctxValue}>{children}</SelectContext.Provider>
      <ArrowDownIcon
        fill={theme.colors.textColors.text}
        css={{
          marginLeft: 'auto',
          transform: `rotate(${isOpen ? '180deg' : '0'})`,
          transition: 'all 0.3s ease-in-out',
        }}
      />
    </SelectWrapper>
  );
}

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Component must be inside Select ');
  }
  return context;
};
