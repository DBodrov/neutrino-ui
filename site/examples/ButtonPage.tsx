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

<Button type="button" onClick={console.log} variant="primary" flat={true} outline={true}>
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

const exampleCustomButton = `
function CustomCheckedButton() {
  const [isHovered, setHover] = React.useState(false);

  return <Button
      onClick={console.log}
      variant="primary"
      outline
      flat
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
        <CheckIcon
          stroke={isHovered ? 'white' : myTheme.colors.mainColors.primary} />
        <span css={{marginLeft: '5px'}}>Custom Button</span>
      </Button>
}


function App() {
  return <CustomCheckedButton {...someProps} />
}
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
    const [isOutline, setOutline] = React.useState(false);

    return (
        <Wrapper css={{ maxWidth: '968px' }}>
            <Example code={exampleProps} />
            <div css={{ display: 'flex', flexFlow: 'row' }}>
                <Checkbox
                    onChangeHandler={() => setFlat((f) => !f)}
                    checked={isFlat}
                    wrapperStyles={{ marginRight: '10px' }}>
                    Make flat
                </Checkbox>
                <Checkbox onChangeHandler={() => setOutline((o) => !o)} checked={isOutline}>
                    Make outline (only for primary and secondary variants)
                </Checkbox>
            </div>
            <Button type="button" onClick={console.log} flat={isFlat}>
                Default button
            </Button>
            <Example code={exampleDefault} />
            <Button type="button" onClick={console.log} variant="primary" flat={isFlat} outline={isOutline}>
                Primary button
            </Button>
            <Example code={examplePrimary} />
            <Button type="button" onClick={console.log} variant="secondary" flat={isFlat} outline={isOutline}>
                Secondary button
            </Button>
            <Example code={exampleSecondary} />
            <Button type="button" onClick={console.log} variant="primary" flat={isFlat}>
                <CheckIcon /> <span css={{ marginLeft: '4px' }}>Primary button</span>
            </Button>
            <Example code={exampleWithIcon} />
            <div css={{ backgroundColor: '#95a1ac', padding: '15px 0' }}>
                <ThemeProvider theme={myTheme}>
                    <Button
                        type="button"
                        onClick={console.log}
                        variant="primary"
                        css={{ width: '250px' }}
                        outline={isOutline}
                        flat={isFlat}>
                        Themed Primary button
                    </Button>
                </ThemeProvider>
            </div>
            <Example code={exampleWithTheme} />
            <Button
                type="button"
                onClick={console.log}
                variant="secondary"
                css={{ borderRadius: '100%', minWidth: '48px', width: '48px', height: '48px' }}
                outline={isOutline}
                flat={isFlat}>
                <CheckIcon stroke={isOutline ? myTheme.colors.mainColors.secondary : 'white'} />
            </Button>
            <Example code={exampleCss} />
            <CustomCheckedButton />
            <Example code={exampleCustomButton} />
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
        ...restProps
    } = props;

    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}>
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

function CustomCheckedButton() {
    const [isHovered, setHover] = React.useState(false);

    return (
        <Button
            onClick={console.log}
            variant="primary"
            outline
            flat
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <CheckIcon stroke={isHovered ? 'white' : myTheme.colors.mainColors.primary} />{' '}
            <span css={{ marginLeft: '5px' }}>Custom Button</span>
        </Button>
    );
}
