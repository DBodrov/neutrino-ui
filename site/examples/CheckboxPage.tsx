import React, { useState } from 'react';
import { Checkbox } from 'neutrino-ui';
import {Example, Wrapper} from './Example';


const exampleSimple = `
import { Checkbox } from 'neutrino-ui';
const [check, setCheck] = useState(true);
<Checkbox onChangeHandler={(v) => setCheck(v)} checked={check}>
  Simple Checkbox
</Checkbox>
`.trim();

const exampleDefault = `
import { Checkbox } from 'neutrino-ui';
const [check, setCheck] = useState(true);
<Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default">
  Default Checkbox
</Checkbox>
`.trim();

const exampleSecondary = `
import { Checkbox } from 'neutrino-ui';
const [check, setCheck] = useState(true);
<Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="secondary">
  Secondary Checkbox
</Checkbox>
`.trim();

const exampleProps = `
interface ICheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    label?: string;
    variant?: 'primary' | 'secondary' | 'default';
    wrapperStyles?: CSSProperties;
    boxStyles?: CSSProperties;
    indeterminate?: boolean;
    disabled?: boolean;
    checked?: boolean;
    hasError?: boolean;
    className?: string;
    onFocusHandler?: (value: boolean) => void;
    onBlurHandler?: (value: boolean) => void;
    onChangeHandler: (value: boolean) => void;
    onClearHandler?: (name: string) => void;
}
`;

const exampleIndeterminate = `
<Checkbox
  onChangeHandler={(v) => setCheck(v)}
  checked={check}
  variant="default"
  indeterminate>Indeterminate</Checkbox>
`.trim();

export function CheckboxPage() {
    const [check, setCheck] = useState(true);
    return (
        <Wrapper>
            <Example code={exampleProps.trim()}/>
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check}>
                Simple Checkbox
            </Checkbox>
            <Example code={exampleSimple} />
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default">
                Default Checkbox
            </Checkbox>
            <Example code={exampleDefault}/>
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="secondary">
                Secondary Checkbox
            </Checkbox>
            <Example code={exampleSecondary}/>
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default" indeterminate>Indeterminate</Checkbox>
            <Example code={exampleIndeterminate}/>
        </Wrapper>
    );
}
