import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { css, jsx } from '@emotion/core';
import { Wrapper, Example, Label } from './Example';
import { Select, createTheme, Span, SelectOptions, State } from 'neutrino-ui';

const theme = createTheme({
  colors: {
    pageElementsColors: {
      formElements: '#000D4D',
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
import { Select, Options } from 'neutrino-ui';

const options: Options = [{ 1: 'Option 1' }, { 2: 'Option 2' }, { 3: 'Option 3' }];
const [item, setItem] = useState('');

<Select
  name="select"
  onChangeHandler={(v: string) => setItem(v)}
  value={item}
  options={options}
  dropdownStyles={{ borderRadius: '10px' }}
  styles={{maxWidth: '300px'}}
/>
`.trim();

const exampleProps = `
export type TOption = Record<string | number, string>;
export type Options = TOption[];
export type ValueType = string | number | null;

export interface ISelectProps {
    name: string;
    hasError?: boolean;
    options?: Options;
    disabled?: boolean;
    onChangeHandler: (value: ValueType) => void;
    onClearHandler?: (name: string) => void;
    onFocusHandler?: (value: ValueType) => void;
    onBlurHandler?: (value: ValueType) => void;
    styles?: React.CSSProperties;
    value?: string | number;
    tabIndex?: number;
    dropdownStyles?: React.CSSProperties;
}
`.trim();

const exampleThemed = `
import { Select, Options, createTheme } from 'neutrino-ui';

const options: Options = [{ 1: 'Option 1' }, { 2: 'Option 2' }, { 3: 'Option 3' }];
const [item, setItem] = useState('');

const theme = createTheme({
  colors: {
    pageElementsColors: {
      formElements: '#000D4D',
      formElementsActive: '#293676',
      border: '#0FC0FC',
    },
    textColors: {
      text: '#fff',
    },
  },
});

<ThemeProvider theme={theme}>
  <Select
    name="theme-select"
    onChangeHandler={(v: string) => setItem(v)}
    value={item}
    options={options}
    dropdownStyles={{ boxShadow: 'none' }}
    styles={{width: 275}}
  />
</ThemeProvider>
`.trim();

const selectReducer = (state: State, changes: State) => {
  console.log('===reducer===', state, changes);
  switch (changes.type) {
    case 'SELECT_CLICK':
      return {
        ...state,
        ...changes,
        isOpen: !state.isOpen,
      };
    case 'CLICK_ITEM':
      return {
        ...state,
        ...changes,
        displayValue: changes.displayValue,
      };
    case 'CLICK_OUTSIDE':
    case 'SCROLL':
      return {
        ...state,
        ...changes,
        isOpen: false,
      };
    default:
      return {
        ...state,
        ...changes,
      };
  }
};

const filterOptions = [
  { id: 1, name: 'Площадка 1' },
  { id: 2, name: 'Площадка 2' },
  { id: -1, name: 'Все' },
];

export function SelectPage() {
  const [item, setItem] = useState('');
  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget.value);
    const currentId = Number(e.currentTarget.value);
    const currentValue = filterOptions.find((option) => option.id === currentId).name;
    setItem(currentValue);
  };
  return (
    <Wrapper>
      <Label>Props</Label>
      <Example code={exampleProps} />
      <Label>Base Select</Label>
      <ThemeProvider theme={theme}>
        <Select caption={item} width="300px" height="32px" stateReducer={selectReducer}>
          <Span><span css={{color: '#ccc'}}>Площадка: </span>{item}</Span>
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
      {/* <Select
                name="select"
                onChangeHandler={(v: string) => setItem(v)}
                value={item}
                options={options}
                styles={{ width: '300px' }}
                dropdownStyles={{ borderRadius: '10px' }}
            /> */}
      <Example code={exampleDefault} />
      {/* <Label>Theming</Label>
            <div
                css={{
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    width: '100%',
                    height: 200,
                    backgroundColor: theme.colors.pageElementsColors.formElements,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ThemeProvider theme={theme}>
                    <Select
                        name="theme-select"
                        onChangeHandler={(v: string) => setItem(v)}
                        value={item}
                        options={options}
                        dropdownStyles={{ boxShadow: 'none' }}
                        styles={{ width: 275 }}
                    />
                </ThemeProvider>
            </div>
            <Example code={exampleThemed} /> */}
    </Wrapper>
  );
}
