import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { MaskInput, H5, Span } from 'neutrino-ui';

const Label = styled(Span)`
    display: block;
    margin-bottom: 5px;
`;

export function MaskInputPage() {
    const [passport, setPassport] = useState('0123 456789');
    const [phone, setPhone] = useState('(123) 456 78 90');
    const handleChangePassport = (value: string) => setPassport(value);
    const handleChangePhone = (value: string) => setPhone(value);

    return (
        <section css={{ padding: '1rem', display: 'flex', flexFlow: 'column nowrap', height: '100%' }}>
            <div css={{ margin: '0 auto', width: '300px', marginBottom: '10px' }}>
                <Label>Simple MaskInput</Label>
                <MaskInput
                    mask="9999 999999"
                    name="passport"
                    onChangeHandler={handleChangePassport}
                    maskPlaceholder="_"
                    value={passport}
                    pattern="9"
                />
            </div>
            <div css={{ margin: '0 auto', width: '300px', marginBottom: '10px' }}>
                <Label>With Prefix MaskInput</Label>
                <MaskInput
                    mask="9999 999999"
                    name="passport"
                    onChangeHandler={handleChangePassport}
                    maskPlaceholder="_"
                    value={passport}
                    prefix="+7"
                    pattern="9"
                />
            </div>
            <div css={{ margin: '0 auto', width: '300px', marginBottom: '10px' }}>
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
            </div>
        </section>
    );
}
