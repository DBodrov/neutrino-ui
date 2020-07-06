import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Wrapper, Example, Label } from './Example';
import { Select, Options, createTheme } from 'neutrino-ui';

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

const options: Options = [{ 1: 'Option 1' }, { 2: 'Option 2' }, { 3: 'Option 3' }];

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

export function SelectPage() {
    const [item, setItem] = useState('');
    return (
        <Wrapper>
            <Label>Props</Label>
            <Example code={exampleProps} />
            <Label>Base Select</Label>
            <Select
                name="select"
                onChangeHandler={(v: string) => setItem(v)}
                value={item}
                options={options}
                styles={{ width: '300px' }}
                dropdownStyles={{ borderRadius: '10px' }}
            />
            <Example code={exampleDefault} />
            <Label>Theming</Label>
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
            <Example code={exampleThemed} />
        </Wrapper>
    );
}
