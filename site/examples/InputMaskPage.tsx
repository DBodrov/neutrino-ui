import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import {Span, H4, InputPhone} from 'neutrino-ui';
import {Example, Wrapper} from './Example';

const Label = styled(Span)`
  display: block;
  margin-bottom: 5px;
`;

const commonStyle = {width: '300px'};

const phoneStyle = css({
  height: 48,
  borderRadius: 4,
  width: 250,
  fontSize: 16,
  outline: 0,
  border: '1px #ababab solid',
  '&:hover, &:focus': {
    border: '1px #0ed308 solid',
  },
});

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
import { InputPhone } from 'neutrino-ui';

const phoneStyle = css({
  height: 48,
  borderRadius: 4,
  width: 250,
  fontSize: 16,
  outline: 0,
  border: '1px #ababab solid',
  '&:hover, &:focus': {
    border: '1px #0ed308 solid',
  },
});

const [phone, setPhone] = useState('');

const handleChangePhone = (phone: string) => {
  setPhone(phone);
};

<InputPhone
  name="phoneNumber"
  countryCode="+7"
  css={phoneStyle}
  onChange={handleChangePhone}
  value={phone}
  placeholder="(___) ___-__-__"
/>
`.trim();

const exampleProps = `
interface IInputPhoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  countryCode: string; //default: '+7'
  countryCodeCSS?: SerializedStyles;
  mask?: string; // default: '(999) 999-99-99';
  ref: React.Ref<HTMLInputElement>;
}
`.trim();

export function InputMaskPage() {
  const [passport, setPassport] = useState('');
  const [phone, setPhone] = useState('');
  const phoneRef = React.useRef(null);

  const [day, setDay] = useState('');
  const handleChangePassport = (value: string) => setPassport(value);
  const handleChangeDay = (date: string) => setDay(date);
  const handleChangePhone = (phone: string) => {
    setPhone(phone);
  };

  const setFocus = () => {
    phoneRef.current.focus();
  }

  return (
    <Wrapper>
      <H4>InputPhone</H4>
      {/* <Span>For modern browsers only.</Span>
      <br />
      <Span>
        used InputEvent under the hood.{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event">MDN</a>
      </Span> */}
      <Label css={{marginTop: 20}}>Props</Label>
      <Example code={exampleProps} />
      {/* <Label>DateInput - implement InputMask</Label>
      <InputMask
        mask="99.99.9999"
        name="date"
        onChangeHandler={handleChangeDay}
        value={day}
        maskPlaceholder="_"
        css={{width: 300, height: 48, fontSize: 14, borderRadius: 8, border: '1px blue solid', outline: 0}}
        aria-label="Date"
      />
      <Example code={exampleDate} /> */}
      <button onClick={setFocus}>focus</button>
      <Label>InputPhone</Label>
      <InputPhone
        name="phoneNumber"
        ref={phoneRef}
        countryCode="+7"
        css={phoneStyle}
        onChange={handleChangePhone}
        value={phone}
        placeholder="(___) ___-__-__"
      />
      {/* <PhoneInput
        countryCode="7"
        name="phone"
        mask="(999) 99-999"
        onChangeHandler={handleChangePhone}
        value={phone}
        css={{width: 300, height: 48, fontSize: 14, borderRadius: 8, border: '1px green solid', outline: 0}}
        maskPlaceholder="_"
        aria-label="Phone"
      /> */}
      <Example code={examplePhone} />
      {/* <Label>Simple MaskInput (Passport)</Label>
      <InputMask
        mask="9999 999999"
        name="passport"
        onChangeHandler={handleChangePassport}
        maskPlaceholder="_"
        value={passport}
        css={{height: 48, fontSize: 16}}
        style={commonStyle}
      />
      <Example code={exampleSimple} /> */}
    </Wrapper>
  );
}
