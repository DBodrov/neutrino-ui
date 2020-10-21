import React, {useState} from 'react';
import styled from '@emotion/styled';
import {Span, InputMask, H4} from 'neutrino-ui';
import {DateInput} from './DateInput';
import {Example, Wrapper} from './Example';

const Label = styled(Span)`
  display: block;
  margin-bottom: 5px;
`;

const commonStyle = {width: '300px'};

const exampleSimple = `
import { InputMask } from 'neutrino-ui';

<InputMask
  mask="9999 999999"
  name="passport"
  onChangeHandler={handleChangePassport}
  maskPlaceholder="_"
  value={passport}
/>
`.trim();

const exampleDate = `
import { InputMask } from 'neutrino-ui';

const [day, setDay] = useState('');

<InputMask
  mask="99.99.9999"
  name={name}
  onChangeHandler={(value: string) => setDay(value)}
  value={day}
  ref={inputRef}
  maskPlaceholder="_"
  css={/*emotion css({...})*/}
/>
`.trim();

const exampleProps = `
interface IInputMaskProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  mask: string;
  maskPlaceholder?: string;
  onChangeHandler: (value: string) => void;
}
`.trim();

export function InputMaskPage() {
  const [passport, setPassport] = useState('');

  const [day, setDay] = useState('');
  const handleChangePassport = (value: string) => setPassport(value);
  const handleChangeDay = (date: string) => setDay(date);

  return (
    <Wrapper>
      <H4>InputMask</H4>
      <Span>For modern browsers only</Span>
      <Label>Props</Label>
      <Example code={exampleProps} />
      <Label>DateInput - implement InputMask</Label>
      <DateInput name="birthDay" onChange={handleChangeDay} value={day} />
      <Example code={exampleDate} />
      <Label>Simple MaskInput (Passport)</Label>
      <InputMask
        mask="9999 999999"
        name="passport"
        onChangeHandler={handleChangePassport}
        maskPlaceholder="_"
        value={passport}
        css={{height: 48, fontSize: 16}}
        style={commonStyle}
      />
      <Example code={exampleSimple} />
    </Wrapper>
  );
}
