import React, { useState } from 'react';
import { Wrapper, Example, Label } from './Example';
import { Select, Options } from 'neutrino-ui';

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

export function SelectPage() {
    const [item, setItem] = useState('');
    return (
        <Wrapper>
            <Label>Props</Label>
            <Example code={exampleProps}/>
            <Label>Base Select</Label>
            <Select
                name="select"
                onChangeHandler={(v: string) => setItem(v)}
                value={item}
                options={options}
                styles={{maxWidth: '300px'}}
                dropdownStyles={{ borderRadius: '10px' }}
            />
            <Example code={exampleDefault}/>
        </Wrapper>
    );
}
