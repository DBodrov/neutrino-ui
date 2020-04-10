import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { MaskInput, H5, Span } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

const Label = styled(Span)`
    display: block;
    margin-bottom: 5px;
`;

const commonStyle = { width: '300px' };

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

const examplePrefix = `
import { MaskInput } from 'neutrino-ui';

<MaskInput
  mask="(999) 999 99 99"
  name="phone"
  onChangeHandler={handleChangePassport}
  maskPlaceholder="_"
  value={phone}
  prefix="+7"
  pattern="9"
/>
`.trim();

const exampleProps = `
interface IMaskInputProps extends IInputProps {
  mask: string;
  prefix?: string;
  maskPlaceholder?: string;
  pattern?: '9' | 'a' | '*';
}
`.trim();

export function MaskInputPage() {
    const [passport, setPassport] = useState('0123 456789');
    const [phone, setPhone] = useState('(123) 456 78 90');
    const handleChangePassport = (value: string) => setPassport(value);
    const handleChangePhone = (value: string) => setPhone(value);

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
            <Label>Phone number MaskInput</Label>
            <MaskInput
                mask="(999) 999 99 99"
                name="phone"
                onChangeHandler={handleChangePassport}
                maskPlaceholder="_"
                value={phone}
                prefix="+7"
                pattern="9"
            />
            <Example code={examplePrefix} />
        </Wrapper>
    );
}
