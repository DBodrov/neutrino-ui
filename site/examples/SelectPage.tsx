import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
// import {ThemeProvider} from 'emotion-theming';
import {Wrapper, Example, Label} from './Example';
import {createTheme, SimpleSelect, Combobox, ArrowIcon, useCombobox, Dropdown} from 'neutrino-ui';

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
type OptionItem = {
  id: string | number;
  value: string | number;
};

export interface ISimpleSelectProps extends Omit<React.HTMLProps<HTMLDivElement>, 'value' | 'onSelect'> {
  hasError?: boolean;
  value?: string | number;
  selectInputStyles?: SerializedStyles;
  optionsListStyles?: SerializedStyles;
  optionStyles?: SerializedStyles;
  options?: OptionItem[];
  onSelect: (event?: React.PointerEvent<HTMLLIElement>) => void;
}
`.trim();

const filterOptions = [
  {id: -1, value: 'Все'},
  {id: 1, value: 'Площадка 1'},
  {id: 2, value: 'Площадка 2'},
  {id: 3, value: 'Площадка 3'},
  {id: 4, value: 'Площадка 4'},
  {id: 5, value: 'Площадка 5'},
  {id: 6, value: 'Площадка 6'},
  {id: 7, value: 'Площадка 7'},
  {id: 8, value: 'Площадка 8'},
  {id: 9, value: 'Площадка 9'},
  {id: 10, value: 'Площадка 10'},
  {id: 11, value: 'Площадка 11'},
  {id: 12, value: 'Площадка 12'},
];

export function SelectPage() {
  const [selected, setSelected] = React.useState(undefined);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const val = e.currentTarget.value;
    setSelected(Number(val));
  };

  return (
    <Wrapper>
      <Label>Simple Select</Label>
      <Example code={exampleProps} />
      <SimpleSelect
        options={filterOptions}
        css={{width: 300}}
        value={selected}
        onSelect={handleItemClick}
        selectInputStyles={css({borderRadius: 8})}
        optionsListStyles={css({borderRadius: 8, height: 300, overflow: 'auto'})}
        optionStyles={css({color: 'green'})}
      />
      <Example code={exampleDefault} />
    </Wrapper>
  );
}
