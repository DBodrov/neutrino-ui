import React, { useState, createRef } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Input, Span, Button, createTheme } from 'neutrino-ui';

const Label = styled(Span)`
    display: block;
    margin-bottom: 10px;
`;

const myTheme = createTheme({
    colors: {
        mainColors: {
            primary: 'green'
        }
    }
});

const outerInputStyle: React.CSSProperties = {
    borderRadius: '10px'
}

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
                    <ThemeProvider theme={myTheme}>
                        <Label>Change look with CSS and Style props</Label>
                        <Input
                            name="text"
                            onChangeHandler={(v, e) => setValue(v)}
                            value={value}
                            css={{ color: 'red' }}
                            style={outerInputStyle}
                            autoComplete="off"
                        />
                    </ThemeProvider>
                </div>
                <div css={{ marginTop: '1rem' }}>
                    <Label>hasError = true</Label>
                    <Input name="text" onChangeHandler={(v, e) => setValue(v)} value={value} hasError />
                </div>
                <div
                    css={{
                        marginTop: '1rem',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        justifyContent: 'space-around',
                        height: '150px',
                    }}>
                    <Label>Set focus</Label>
                    <Button onClick={setFocus}>Set focus</Button>
                    <Input name="text" ref={inputRef} onChangeHandler={(v, e) => setValue(v)} value={value} />
                </div>
            </div>
        </section>
    );
}
