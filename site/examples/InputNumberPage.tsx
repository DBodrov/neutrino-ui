import React, { useState, createRef } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { InputNumber, Span, Button, createTheme } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

const Label = styled(Span)`
    display: block;
    margin-bottom: 10px;
`;

const myTheme = createTheme({
    colors: {
        mainColors: {
            primary: 'green',
        },
    },
});

const outerInputStyle: React.CSSProperties = {
    borderRadius: '10px',
    width: '300px',
};

const commonStyle = { width: '300px' };

const exampleText = `
import { Input } from 'neutrino-ui';
const [value, setValue] = useState('');

<Input
  name="text"
  onChangeHandler={(value, event) => setValue(value)}
  value={value}
  style={{width: '300px'}}/>
`.trim();

const exampleWithTheme = `
import { ThemeProvider } from 'emotion-theming';
import { Input, createTheme } from 'neutrino-ui';

const myTheme = createTheme({
  colors: {
    mainColors: {primary: 'green'}
  }
});

<ThemeProvider theme={myTheme}>
  <Input
    name="text"
    onChangeHandler={(value, event) => setValue(value)}
    value={value}
    css={{ color: 'red' }} /** apply to inner input control */
    style={outerInputStyle} /** apply to outer wrapper */
    autoComplete="off"
  />
</ThemeProvider>
`.trim();

const exampleHasError = `
<Input
  name="text"
  onChangeHandler={(v, e) => setValue(v)}
  value={value}
  hasError />
`.trim();

const exampleFocus = `
import React, { useState, createRef } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Input, Button } from 'neutrino-ui';

function Form() {
  const [value, setValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();
  const setFocus = () => inputRef?.current?.focus();

  return (
    <Button onClick={setFocus} variant="primary">Set focus</Button>
    <Input
      name="text"
      ref={inputRef}
      onChangeHandler={(v, e) => setValue(v)}
      value={value} />
  )
}
`.trim();

const exampleProps = `
interface IInputNumberProps extends IInputProps {
    styles?: React.CSSProperties;
    locales?: string | string[];
    formatOptions?: Intl.NumberFormatOptions;
    zeroWhenEmpty?: boolean;
    parser?: 'parseFloat' | 'parseInt';
    onFocusHandler?: (value: string | number, event?: React.FocusEvent<HTMLInputElement>) => void;
    onBlurHandler?: (value: string | number , event?: React.FocusEvent<HTMLInputElement>) => void;
    onChangeHandler: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onClearHandler?: (name: string) => void;
}
`.trim();

const examplePrefix = `
<Input
  prefix="Hi! : "
  name="text"
  onChangeHandler={(v, e) => setValue(v)}
  value={value} />
`.trim();

const disableSpinBtn = css({
    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 },
    '-moz-appearance': 'textfield',
});

export function InputNumberPage() {
    const [value, setValue] = useState(undefined);

    return (
        <Wrapper>
            <Label>Props</Label>
            <Example code={exampleProps} />
            <Label>Default</Label>
            <InputNumber
                name="number"
                onChangeHandler={(v) => setValue(v)}
                value={value}
                style={commonStyle}
                // formatOptions={{style: 'currency', currency: 'RUB', currencyDisplay: 'symbol'}}
            />
            <Example code={exampleText} />
            {/* <div css={{ marginTop: '1rem' }}>
                <ThemeProvider theme={myTheme}>
                    <Label>Change look with CSS and Style props</Label>
                    <Input
                        name="text"
                        onChangeHandler={(v, e) => setValue(v)}
                        value={value}
                        css={{ color: 'red' }}
                        style={outerInputStyle}
                        autoComplete="off"
                    />
                </ThemeProvider>
                <Example code={exampleWithTheme} />
            </div>
            <div css={{ marginTop: '1rem' }}>
                <Label>hasError = true (After form validation)</Label>
                <Input
                    name="text"
                    onChangeHandler={(v, e) => setValue(v)}
                    value={value}
                    hasError
                    style={commonStyle}
                />
                <Example code={exampleHasError} />
            </div>
            <div
                css={{
                    marginTop: '1rem',
                }}>
                <Label>Set focus</Label>
                <Button onClick={setFocus} variant="primary" css={{ marginBottom: '10px' }}>
                    Set focus
                </Button>

                <Input
                    name="text"
                    ref={inputRef}
                    onChangeHandler={(v, e) => setValue(v)}
                    value={value}
                    style={commonStyle}
                />
                <Example code={exampleFocus} />
                <Input prefix="Hi! : " name="text" onChangeHandler={(v, e) => setValue(v)} value={value} style={commonStyle} />
                <Example code={examplePrefix}/>
            </div> */}
        </Wrapper>
    );
}
