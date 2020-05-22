import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { H1, H2, H3, H4, H5, H6, P, Span, createTheme } from 'neutrino-ui';
import { Example, Wrapper, Label } from './Example';

const theme = createTheme({
    typography: {
        h2: {
            fontFamily: 'Consolas'
        }
    }
});

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

const exampleFonts = `
import {H1, H2, createTheme} from 'neutrino-ui';

const theme = createTheme({
  typography: {
    h2: {
      fontFamily: 'Consolas'
    }
  }
});

<ThemeProvider theme={theme}>
  <H1 css={{fontFamily: 'Times New Roman'}}>H1. Heading - 1</H1>
  <H2>H2. Heading - 2</H2>
</ThemeProvider>
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
            <Example code={example} />
            <ThemeProvider theme={theme}>
                <H1 css={{fontFamily: 'Times New Roman'}}>H1. Heading - 1</H1>
                <H2>H2. Heading - 2</H2>
            </ThemeProvider>
            <Label>Themed typography</Label>
            <Example code={exampleFonts}/>
        </Wrapper>
    );
}
