import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';
import styled from '@emotion/styled';
import { css, jsx, SerializedStyles } from '@emotion/core';
import { useTheme, ITheme, baseTheme } from '../Themes';
import { Span } from '../Typography';
import { Dropdown } from '../Dropdown';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { useSelectEvents, useClientRect } from './use-select';
import { ISelectProps, State } from './types';
import { SelectWrapper, StyledInput } from './styles';

const initState = ({ caption }: ISelectProps): State => ({
  type: 'IDLE',
  currentValue: null,
  displayValue: caption ?? '',
  isOpen: false,
});

const selectReducer = (state: State, changes: State) => {
  console.log('==changes==', changes);
  switch (changes.type) {
    case 'IDLE':
    default:
      return {
        ...changes,
      };
    case 'SELECT_CLICK':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case 'CLICK_OUTSIDE':
      return {
        ...state,
        isOpen: state.isOpen,
      };
    case 'SCROLL':
      return {
        ...state,
        isOpen: false,
      };
    case 'CLICK_ITEM':
      return {
        ...state,
        ...changes,
        isOpen: false,
      };
  }
};

const SelectContext = createContext(null);

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
  // const [rect, ref] = useClientRect();
  const ddRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectRect = selectRef?.current?.getBoundingClientRect();
  // console.log(ref, rect)

  const [{ currentValue, displayValue, isOpen }, dispatch] = useReducer(stateReducer, initState(props));
  useSelectEvents(selectRef, ddRef, dispatch, { isOpen });

  const handleClick = () => {
    dispatch({ type: 'SELECT_CLICK' });
  };

  const handleItemClick = useCallback((item: string) => {
    dispatch({ type: 'CLICK_ITEM', displayValue: item });
  }, []);

  useEffect(() => {
    dispatch({ type: 'CLICK_ITEM', displayValue: caption });
  }, [caption]);

  const renderEditableInput = () => {
    if (prefix) {
      return (
        <>
          <Span css={[prefixCss]}>{prefix}</Span>
          <StyledInput type="text" css={[inputCss]} />
        </>
      );
    }
    return <StyledInput type="text" css={[inputCss]} />;
  };

  const renderReadonlyInput = () => {
    if (prefix) {
      return (
        <>
          <Span css={[prefixCss]}>{prefix}</Span>
          <Span
            css={[
              css`
                width: 100%;
              `,
              displayValueCss,
            ]}
          >
            {displayValue}
          </Span>
        </>
      );
    }
    return (
      <Span
        css={[
          css`
            width: 100%;
          `,
          displayValueCss,
        ]}
      >
        {displayValue}
      </Span>
    );
  };

  const renderInput = () => {
    if (isEdit) {
      return renderEditableInput();
    }
    return renderReadonlyInput();
  };

  const ctxValue = useMemo(() => ({ddRef, isOpen, selectRect}), [isOpen, selectRect]);

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
    throw new Error('Component must be inside Select ')
  }
  return context;
}
