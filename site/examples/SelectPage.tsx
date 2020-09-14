import React, {useState} from 'react';
import styled from '@emotion/styled';
// import {ThemeProvider} from 'emotion-theming';
import {Wrapper, Example, Label} from './Example';
import {
  createTheme,
  ISelectState,
  SelectChangeTypes,
  Combobox,
  ArrowIcon,
  useCombobox,
  Dropdown,
} from 'neutrino-ui';

const theme = createTheme({
  colors: {
    pageElementsColors: {
      formElements: '#325b72',
      formElementsActive: '#293676',

      border: '#0FC0FC',
    },
    textColors: {
      text: '#fff',
    },
  },
  typography: {
    span: {
      color: '#fff',
      fontSize: '14px',
    },
  },
});

const exampleDefault = `
import { Select, createTheme, Span, SelectOptions, ISelectState, SelectChangeTypes } from 'neutrino-ui';

const selectReducer = (state: ISelectState, changes: ISelectState) => {
  console.log('===reducer===', state, changes);
  switch (changes.type) {
    case SelectChangeTypes.selectClick:
      return {
        ...state,
        ...changes,
        isOpen: !state.isOpen,
      };
    case SelectChangeTypes.clickOutside:
    case SelectChangeTypes.scroll:
      return {
        ...state,
        ...changes,
        isOpen: true,
      };
    default:
      return {
        ...state,
        ...changes,
      };
  }
};

const filterOptions = [
  { id: -1, name: 'Все' },
  { id: 1, name: 'Площадка 1' },
  { id: 2, name: 'Площадка 2' },
];


function MyApp() {
  const [selectState, setState] = useState(-1);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const currentId = Number(e.currentTarget.value);
    setState(currentId);
  };

  const getDisplayValue = React.useCallback(() => filterOptions.find((item) => item.id === selectState), [
    selectState,
  ]);

  return (
    <ThemeProvider theme={theme}>
        <Select
          width="300px"
          height="36px"
          stateReducer={selectReducer} // Inversion of control
          css={{ backgroundColor: '#008000', padding: '0 8px', cursor: 'pointer' }}
        >
          <Span>
            <span css={{ color: '#ccc' }}>Площадка: </span>
            {getDisplayValue().name}
          </Span>

          <SelectOptions>
            <ul
              css={{
                backgroundColor: theme.colors.pageElementsColors.formElements,
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {filterOptions.map((option) => {
                return (
                  <li
                    key={option.id}
                    value={option.id}
                    css={{
                      padding: '8px 16px',
                      borderBottom: '1px #ccc solid',
                      margin: 0,
                      color: theme.colors.textColors.text,
                      fontSize: 14,
                      backgroundColor:
                        option.id === selectState
                          ? theme.colors.pageElementsColors.formElementsActive
                          : 'transparent',
                    }}
                    onClick={handleItemClick}
                  >
                    {option.name}
                  </li>
                );
              })}
            </ul>
          </SelectOptions>
        </Select>
      </ThemeProvider>
  )
}
`.trim();

const exampleProps = `
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
`.trim();

const selectReducer = (state: ISelectState, changes: ISelectState) => {
  console.info('===reducer===', state, changes);
  switch (changes.type) {
    case SelectChangeTypes.toggle:
      return {
        ...state,
        ...changes,
        isOpen: !state.isOpen,
      };
    case SelectChangeTypes.clickOutside:
    case SelectChangeTypes.scroll:
      return {
        ...state,
        ...changes,
        isOpen: true,
      };
    default:
      return {
        ...state,
        ...changes,
      };
  }
};

const filterOptions = [
  {id: -1, name: 'Все'},
  {id: 1, name: 'Площадка 1'},
  {id: 2, name: 'Площадка 2'},
];

const TextBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 4px;
  &:hover {
    cursor: pointer;
  }
`;

function SelectBox({children}: any) {
  const {handleToggle, isOpen} = useCombobox();
  return (
    <TextBox onClick={handleToggle} css={{border: `1px ${isOpen ? '#000' : '#c7c7c7'} solid`}}>
      {children}
      <ArrowIcon />
    </TextBox>
  );
}


function Select() {
  const [selectState, setState] = useState(-1);
  const {handleClose, isOpen} = useCombobox();
  const comboRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const getDisplayValue = React.useCallback(() => filterOptions.find(item => item.id === selectState), [
    selectState,
  ]);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const currentId = Number(e.currentTarget.value);
    setState(currentId);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement  && isOpen) {
        const rootNode = comboRef?.current;
        const optionsList = optionsRef?.current;
        if (rootNode?.contains(e.target) || optionsList?.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    isOpen && document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: 300}} ref={comboRef}>
      <SelectBox>
        <span css={{color: '#ccc'}}>Площадка: </span>
        {getDisplayValue().name}
      </SelectBox>
      <Dropdown isOpen={isOpen} ref={optionsRef} parentNode={isOpen ? comboRef : undefined}>
      <ul
        css={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          border: '1px #c7c7c7 solid',
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        {filterOptions.map(option => {
          return (
            <li
              key={option.id}
              value={option.id}
              css={{
                padding: '8px 16px',
                borderBottom: '1px #ccc solid',
                margin: 0,
                color: '#000',
                fontSize: 14,
                cursor: 'pointer',
                backgroundColor: option.id === selectState ? theme.colors.grayColors.gray6 : 'transparent',
              }}
              onClick={handleItemClick}
            >
              {option.name}
            </li>
          );
        })}
      </ul>
    </Dropdown>
    </div>
  );
}

export function SelectPage() {
  return (
    <Wrapper>
      <Example code={exampleProps} />
      <Label>Base Select</Label>
      <Combobox>
        <Select />
      </Combobox>
      <Example code={exampleDefault} />
    </Wrapper>
  );
}
