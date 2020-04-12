import React, { useState } from 'react';
import { Wrapper } from './Example';
import { Select, Options } from 'neutrino-ui';

const options: Options = [{ 1: 'Option 1' }, { 2: 'Option 2' }, { 3: 'Option 3' }];

export function SelectPage() {
    const [item, setItem] = useState('');
    return (
        <Wrapper>
            <Select
                name="select"
                onChangeHandler={(v: string) => setItem(v)}
                value={item}
                options={options}
                hasError
                dropdownStyles={{ borderRadius: '10px' }}
            />
        </Wrapper>
    );
}
