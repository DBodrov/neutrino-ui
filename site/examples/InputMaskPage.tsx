import React, {useState} from 'react';
import styled from '@emotion/styled';
import {Span, InputMask, H4, PhoneInput} from 'neutrino-ui';
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
const examplePhone = `
import { PhoneInput } from 'neutrino-ui';

const [phone, setPhone] = useState('');

<PhoneInput
  countryCode="7"
  mask="(999) 99-999"
  onChangeHandler={(value: string) => setPhone(value))}
  value={phone}
  css={{width: 300, height: 48, fontSize: 14, borderRadius: 8, border: '1px green solid', outline: 0}}
  maskPlaceholder="_"
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
  const [phone, setPhone] = useState('');

  const [day, setDay] = useState('');
  const handleChangePassport = (value: string) => setPassport(value);
  const handleChangeDay = (date: string) => setDay(date);
  const handleChangePhone = (phone: string) => {
    setPhone(phone);
  };

  return (
    <Wrapper>
      <H4>InputMask</H4>
      <Span>For modern browsers only</Span>
      <Label>Props</Label>
      <Example code={exampleProps} />
      <Label>DateInput - implement InputMask</Label>
      <InputMask
        mask="99.99.9999"
        name="date"
        onChangeHandler={handleChangeDay}
        value={day}
        maskPlaceholder="_"
        css={{width: 300, height: 48, fontSize: 14, borderRadius: 8, border: '1px blue solid', outline: 0}}
      />
      <Example code={exampleDate} />
      <Label>PhoneInput - implement InputMask</Label>
      <PhoneInput
        countryCode="7"
        name="phone"
        mask="(999) 99-999"
        onChangeHandler={handleChangePhone}
        value={phone}
        css={{width: 300, height: 48, fontSize: 14, borderRadius: 8, border: '1px green solid', outline: 0}}
        maskPlaceholder="_"
      />
      <Example code={examplePhone} />
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
