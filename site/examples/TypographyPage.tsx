import React from 'react';
import {H1, H2, H3, H4, H5, H6, P, Span} from 'neutrino-ui';
import {Example, Wrapper} from './Example';

const example = `
import {H1, H2, H3, H4, H5, H6, P, Span} from 'neutrino-ui';

<H1>H1. Heading - 1</H1>
<H2>H2. Heading - 2</H2>
<H3>H3. Heading - 3</H3>
<H4>H4. Heading - 4</H4>
<H5>H5. Heading - 5</H5>
<H6>H6. Heading - 6</H6>
<P>P. Paragraph</P>
<Span>Span. Just span</Span>
`.trim();

export function TypographyPage() {
    return (
        <Wrapper>
            <H1>H1. Heading - 1</H1>
            <H2>H2. Heading - 2</H2>
            <H3>H3. Heading - 3</H3>
            <H4>H4. Heading - 4</H4>
            <H5>H5. Heading - 5</H5>
            <H6>H6. Heading - 6</H6>
            <P>P. Paragraph</P>
            <Span>Span. Just span</Span>
            <Example code={example}/>
        </Wrapper>
    )
}
