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

const exampleDefault = `
import { InputNumber } from 'neutrino-ui';
const [value, setValue] = useState(undefined);

<InputNumber
  name="number"
  onChangeHandler={(v) => setValue(v)}
  value={value}
/>
`.trim();

const exampleWithFormatOptions = `
import { InputNumber } from 'neutrino-ui';
const [value, setValue] = useState(0.23);

<InputNumber
  name="number"
  onChangeHandler={(v: number) => setFractNumber(v)}
  value={fractNumber}
  formatOptions={{ maximumFractionDigits: 2 }}
/>
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
}
`.trim();

export function InputNumberPage() {
    const [value, setValue] = useState(undefined);
    const [fractNumber, setFractNumber] = useState<number>(0.23);

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
            />
            <Example code={exampleDefault} />
            <Label>
                with maximumFractionDigits (
                <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat">
                    MDN NumberFormat
                </a>
                )
            </Label>

            <InputNumber
                name="number"
                onChangeHandler={(v: number) => setFractNumber(v)}
                value={fractNumber}
                formatOptions={{ maximumFractionDigits: 2 }}
                style={commonStyle}
            />
            <Example code={exampleWithFormatOptions} />

            <Span>the rest of the behavior is similar Input component</Span>
        </Wrapper>
    );
}
