import React from 'react';
import styled from '@emotion/styled';
import {Span} from 'neutrino-ui';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

export const Label = styled(Span)`
    display: block;
    margin-bottom: 10px;
`;

export const Wrapper = styled.div`
    padding: 1rem;
`;

const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;
    overflow: auto;

    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
    }
`;

const LineNo = styled.span`
    display: inline-block;
    width: 2em;
    user-select: none;
    opacity: 0.3;
`;

export const Example = ({ code }: { code: string }) => {
    return (
        <Highlight {...defaultProps} language="jsx" code={code} theme={theme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={{ ...style, maxWidth: '968px' }}>
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
