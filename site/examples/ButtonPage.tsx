import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, createTheme, ITheme, Checkbox } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

const theme: ITheme = {
    colors: {
        mainColors: {
            primary: '#34B334',
            primaryDark: '#144D14',
        },
    },
    globals: {
        borderRadius: '32px',
    },
};

const myTheme = createTheme(theme);

const exampleDefault = `
import { Button } from 'neutrino-ui';

<Button type="button" onClick={console.log}>
  Default button
</Button>
`.trim();

const examplePrimary = `
import { Button } from 'neutrino-ui';

<Button type="button" onClick={console.log} variant="primary">
  Primary button
</Button>
`.trim();

const exampleSecondary = `
import { Button } from 'neutrino-ui';

<Button type="button" onClick={console.log} variant="secondary">
  Secondary button
</Button>
`.trim();

const exampleWithIcon = `
import { Button } from 'neutrino-ui';
import CheckIcon from './CheckIcon';

<Button type="button" onClick={console.log} variant="primary">
  <CheckIcon /> Primary button
</Button>
`.trim();

const exampleWithTheme = `
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, createTheme, ITheme } from 'neutrino-ui';

const theme: ITheme = {
colors: {
  mainColors: {
    primary: '#34B334',
    primaryDark: '#144D14',
    },
  },
  globals: {
   borderRadius: '32px'
  }
};

const myTheme = createTheme(theme);

<ThemeProvider theme={myTheme}>
  <Button
    type="button"
    onClick={console.log}
    variant="primary"
    css={{width: '250px'}}>
      Themed Primary button
  </Button>
</ThemeProvider>
`.trim();

const exampleCss = `
<Button
  type="button"
  onClick={console.log}
  variant="secondary"
  css={{ borderRadius: '100%', minWidth: '48px', width: '48px', height: '48px' }}>
    <CheckIcon />
</Button>
`.trim();

const exampleProps = `
interface IButtonProps {
    className?: string;
    flat?: boolean;
    outline?: boolean;
    styles?: React.CSSProperties;
    variant?: 'primary' | 'secondary' | 'default';
    icon?: string;
    children?: React.ReactNode;
}

export type ButtonProps = IButtonProps & JSX.IntrinsicElements['button'];
`.trim();

export function ButtonPage() {
    const [isFlat, setFlat] = React.useState(false);
    return (
        <Wrapper>
            <Example code={exampleProps} />
            <Checkbox onChangeHandler={() => setFlat((f) => !f)} checked={isFlat}>
                Make flat
            </Checkbox>
            <Button type="button" onClick={console.log} flat={isFlat}>
                Default button
            </Button>
            <Example code={exampleDefault} />
            <Button type="button" onClick={console.log} variant="primary" flat={isFlat}>
                Primary button
            </Button>
            <Example code={examplePrimary} />
            <Button type="button" onClick={console.log} variant="secondary" flat={isFlat}>
                Secondary button
            </Button>
            <Example code={exampleSecondary} />
            <Button type="button" onClick={console.log} variant="primary" flat={isFlat}>
                <CheckIcon /> Primary button
            </Button>
            <Example code={exampleWithIcon} />
            <ThemeProvider theme={myTheme}>
                <Button
                    type="button"
                    onClick={console.log}
                    variant="primary"
                    css={{ width: '250px' }}
                    flat={isFlat}>
                    Themed Primary button
                </Button>
            </ThemeProvider>
            <Example code={exampleWithTheme} />
            <Button
                type="button"
                onClick={console.log}
                variant="secondary"
                css={{ borderRadius: '100%', minWidth: '48px', width: '48px', height: '48px' }}
                flat={isFlat}>
                <CheckIcon />
            </Button>
            <Example code={exampleCss} />
        </Wrapper>
    );
}

const CheckIcon = (props: React.SVGProps<any>) => {
    const {
        width = '16',
        height = '11',
        viewBox = '0 0 16 11',
        fill = 'none',
        stroke = 'white',
        strokeWidth = 2,
        strokeLinecap = 'round',
        strokeLinejoin = 'round',
    } = props;

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
