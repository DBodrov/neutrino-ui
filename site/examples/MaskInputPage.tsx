import React, { useState, useCallback } from 'react';
import { MaskInput } from 'neutrino-ui';

export function MaskInputPage() {
    const [passport, setPassport] = useState('0123 456789');
    const handleChangePassport = (value: string) => setPassport(value);

    return (
        <section css={{ padding: '1rem', display: 'flex', flexFlow: 'column nowrap', height: '100%' }}>
            <div css={{ margin: '0 auto', width: '300px' }}>
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
        </section>
    );
}
