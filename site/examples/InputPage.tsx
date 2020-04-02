import React, { useState, createRef } from 'react';
import styled from '@emotion/styled'
import { Input, Span, Button } from 'neutrino-ui';

const Label = styled(Span)`
    display: block;
    margin-bottom: 10px;
`;

export function InputPage() {
    const [value, setValue] = useState('');
    const inputRef = createRef<HTMLInputElement>();
    const setFocus = () => inputRef?.current?.focus();


    return (
        <section css={{ padding: '1rem', display: 'flex', flexFlow: 'column nowrap', height: '100%' }}>
            <div css={{ margin: '0 auto', width: '300px' }}>
                <Label>Type: text</Label>
                <Input name="text" onChangeHandler={(v, e) => setValue(v)} value={value} />
                <div css={{ marginTop: '1rem' }}>
                    <Label>Add CSS props</Label>
                    <Input
                        name="text"
                        onChangeHandler={(v, e) => setValue(v)}
                        value={value}
                        css={{ color: 'red', borderRadius: '10px', ':hover': {borderColor: 'green'} }}
                    />
                </div>
                <div css={{ marginTop: '1rem' }}>
                    <Label>hasError = true</Label>
                    <Input
                        name="text"
                        onChangeHandler={(v, e) => setValue(v)}
                        value={value}
                        hasError
                    />
                </div>
                <div css={{ marginTop: '1rem', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-around', height: '150px'}}>
                    <Label>Set focus</Label>
                    <Button onClick={setFocus}>Set focus</Button>
                    <Input
                        name="text"
                        ref={inputRef}
                        onChangeHandler={(v, e) => setValue(v)}
                        value={value}
                    />
                </div>
            </div>
        </section>
    );
}
