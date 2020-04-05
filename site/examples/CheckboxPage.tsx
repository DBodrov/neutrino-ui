import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Checkbox } from 'neutrino-ui';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

export const Wrapper = styled.div`
    font-family: sans-serif;
    text-align: center;
`;

export const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;

    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
    }
`;

export const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
`;

const Example = ({ code }: { code: string }) => {
    return (
        <Highlight {...defaultProps} language="jsx" code={code} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </Pre>
            )}
        </Highlight>
    );
};

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

export function CheckboxPage() {
    const [check, setCheck] = useState(true);
    return (
        <div>
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
        </div>
    );
}
