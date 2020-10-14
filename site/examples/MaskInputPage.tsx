import React, {useState} from 'react';
import styled from '@emotion/styled';
import {ThemeProvider} from 'emotion-theming';
import {MaskInput, createTheme, Span} from 'neutrino-ui';
import {Example, Wrapper} from './Example';

const Label = styled(Span)`
  display: block;
  margin-bottom: 5px;
`;

const myTheme = createTheme({
  colors: {
    mainColors: {
      primary: 'green',
    },
  },
});

const commonStyle = {width: '300px'};

const exampleSimple = `
import { MaskInput } from 'neutrino-ui';

<MaskInput
  mask="9999 999999"
  name="passport"
  onChangeHandler={handleChangePassport}
  maskPlaceholder="_"
  value={passport}
  pattern="9"
/>
`.trim();

const exampleDate = `
import { MaskInput } from 'neutrino-ui';

const [day, setDay] = useState('');

<MaskInput
  mask="99/99/9999"
  name="date"
  onChangeHandler={(v: string) => setDay(v)}
  maskPlaceholder="_"
  value={day}
  pattern="9"
/>
`.trim();

const exampleProps = `
interface IMaskInputProps extends IInputProps {
  value?: string;
  mask: string;
  prefix?: string;
  maskPlaceholder?: string;
  pattern?: '9';
}
`.trim();

export function MaskInputPage() {
  const [passport, setPassport] = useState('');

  const [day, setDay] = useState('');
  const [bDay, setBDay] = useState('14/07/1983');
  const handleChangePassport = (value: string) => setPassport(value);

  return (
    <Wrapper>
      <Label>Props</Label>
      <Example code={exampleProps} />
      <Label>Simple MaskInput</Label>
      <MaskInput
        mask="9999 999999"
        name="passport"
        onChangeHandler={handleChangePassport}
        maskPlaceholder="_"
        value={passport}
        pattern="9"
        style={commonStyle}
      />
      <Example code={exampleSimple} />
      <Label>Date MaskInput</Label>
      <MaskInput
        mask="99/99/9999"
        name="date"
        onChangeHandler={(v: string) => setDay(v)}
        maskPlaceholder="_"
        value={day}
        pattern="9"
        css={{width: 300}}
      />
      <ThemeProvider theme={myTheme}>
        <MaskInput
          mask="99/99/9999"
          name="date"
          onChangeHandler={(v: string) => setBDay(v)}
          maskPlaceholder="_"
          value={bDay}
          pattern="9"
          css={{width: 300, height: 48, borderRadius: 8, marginTop: 15}}
        />
      </ThemeProvider>
      <Example code={exampleDate} />
    </Wrapper>
  );
}
