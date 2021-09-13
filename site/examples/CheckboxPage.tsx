import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Checkbox, createTheme, Radio } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

const theme = createTheme({
    globals: {
        borderRadius: '32px',
    },
    colors: {
        mainColors: {
            primary: '#084a80',
        },
    },
});

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

const exampleWithTheme = `
import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Checkbox, createTheme } from 'neutrino-ui';

const theme = createTheme({
  globals: {
    borderRadius: '32px',
  },
  colors: {
    mainColors: {
      primary: '#084a80',
    },
  },
});
`.trim();

export function CheckboxPage() {
    const [check, setCheck] = useState(true);
    const [choice, setChoice] = useState(null);


    const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChoice(e.target.name);
    }

    return (
        <Wrapper>
            <Radio name="choice" value="choice-1" onChange={handleChoice} checked={choice === 'choiceField1'} disabled>
              Radio 1
            </Radio>
            <Radio name="choice" value="choice-2" onChange={handleChoice} checked={choice === 'choiceField2'}>
              Radio 2
            </Radio>
            <Example code={exampleProps.trim()} />
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check}>
                Simple Checkbox
            </Checkbox>
            <Example code={exampleSimple} />
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default">
                Default Checkbox
            </Checkbox>
            <Example code={exampleDefault} />
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="secondary">
                Secondary Checkbox
            </Checkbox>
            <Example code={exampleSecondary} />
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default" indeterminate>
                Indeterminate
            </Checkbox>
            <Example code={exampleIndeterminate} />
            <ThemeProvider theme={theme}>
                <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check}>
                    Themed Checkbox
                </Checkbox>
            </ThemeProvider>
            <Example code={exampleWithTheme}/>
        </Wrapper>
    );
}
