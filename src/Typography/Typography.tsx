import React, { ReactText, ReactNode } from 'react';
import { css } from '@emotion/core';
import { useTheme, TypographyElements } from '../Themes';

type TypographyProps = {
    children: ReactText | ReactNode;
    className?: string;
    as: TypographyElements;
};

type ElementProps = Omit<TypographyProps, 'as'>;

const Heading = (props: TypographyProps) => {
    const { as: elem, ...other } = props;
    const theme = useTheme();
    const Element = elem;

    return <Element css={css(theme.typography[elem])} {...other} role="heading"/>;
};

const Text = (props: TypographyProps) => {
    const { as: elem, ...other } = props;
    const theme = useTheme();
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
