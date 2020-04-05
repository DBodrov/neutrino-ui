import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, createTheme, ITheme } from 'neutrino-ui';

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

const CheckIcon = (props: React.SVGProps<any>) => {
    const { width = "16", height = "11", viewBox = "0 0 16 11", fill="none", stroke = "white", strokeWidth = 2, strokeLinecap = "round", strokeLinejoin = "round" } = props;

    return (
        <svg width={width} height={height} viewBox={viewBox} fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15 1L5.45455 9.99008L1 5.49504"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                strokeLinejoin={strokeLinejoin}
            />
        </svg>
    );
};
