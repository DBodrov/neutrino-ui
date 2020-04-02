import React, { ReactText, useCallback } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useElementsTheme, baseTheme, TypographyElements, ITheme } from '../Themes';

type TypographyProps = {
    children: ReactText;
    className?: string;
    as: TypographyElements;
};

type ElementProps = Omit<TypographyProps, 'as'>;

const Heading = (props: TypographyProps) => {
    const { as: elem, ...other } = props;
    const theme = useElementsTheme() ?? baseTheme;
    const Element = elem;

    return <Element css={css(theme.typography[elem])} {...other} role="heading"/>;
};

const Text = (props: TypographyProps) => {
    const { as: elem, ...other } = props;
    const getTheme = useCallback(() => {
        const providedTheme = useTheme<ITheme>();
        return Object.keys(providedTheme).length > 0 ? providedTheme : baseTheme;
    }, [])
    const theme = getTheme();
    const Element = elem;

    return <Element css={css(theme.typography[elem])} {...other} />;
}

export const H1 = (props: ElementProps) => <Heading as="h1" {...props} />;
export const H2 = (props: ElementProps) => <Heading as="h2" {...props} />;
export const H3 = (props: ElementProps) => <Heading as="h3" {...props} />;
export const H4 = (props: ElementProps) => <Heading as="h4" {...props} />;
export const H5 = (props: ElementProps) => <Heading as="h5" {...props} />;
export const H6 = (props: ElementProps) => <Heading as="h6" {...props} />;
export const P = (props: ElementProps) => <Text as="p" {...props} />
export const Span = (props: ElementProps) => <Text as="span" {...props} />
