import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, createTheme, ITheme } from 'neutrino-ui';
import { CheckIcon } from './CheckIcon';

const theme: ITheme = {
    colors: {
        mainColors: {
            primary: '#34B334',
            primaryDark: '#144D14'
        }
    }
}

const myTheme = createTheme(theme);

export function ButtonPage() {
    return (
        <div>
            <ThemeProvider theme={myTheme}>
                <Button type="button" value="Default" variant="primary" onClick={console.log} />
            </ThemeProvider>

            <pre>
                <code>
                    {`
                    <Button
                        type="button"
                        value="Default"
                        variant="default"
                        onClick={handleClick}
                />
                `}
                </code>
            </pre>
            <Button>
                <CheckIcon /> Primary
            </Button>
            <code style={{ paddingTop: '1rem' }}>{`
            <Button>
                <CheckIcon /> Primary
            </Button>
            `}</code>
        </div>
    );
}
