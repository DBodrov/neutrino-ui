import React, {ReactText, ReactNode} from 'react';
import {css} from '@emotion/react';
import {useTheme, TypographyElements} from '../Themes';

type TypographyProps = {
  //children: ReactText | ReactNode;
  className?: string;
  as: TypographyElements;
};

type ElementProps<T = HTMLSpanElement> = React.HTMLProps<T>;

const Heading = (props: ElementProps) => {
  const {as: elem, ...other} = props;
  const theme = useTheme();
  const Element = elem;

  return <Element css={css(theme.typography[elem])} {...other} />;
};

const Text = (props: ElementProps) => {
  const {as: elem, ...other} = props;
  const theme = useTheme();
  const Element = elem;

  return <Element css={css(theme.typography[elem])} {...other} />;
};

const TextElement = (props: ElementProps) => {
  const {as: elem, ...other} = props;
  const theme = useTheme();
  const Element = elem;

  return <Element css={css(theme.typography[elem])} {...other} />;
};

export const H1 = (props: ElementProps<HTMLHeadingElement>) => (
  <TextElement as="h1" role="heading" {...props} />
);
export const H2 = (props: ElementProps) => <TextElement as="h2" role="heading" {...props} />;
export const H3 = (props: ElementProps) => <TextElement as="h3" role="heading" {...props} />;
export const H4 = (props: ElementProps) => <TextElement as="h4" role="heading" {...props} />;
export const H5 = (props: ElementProps) => <TextElement as="h5" role="heading" {...props} />;
export const H6 = (props: ElementProps) => <TextElement as="h6" role="heading" {...props} />;
export const P = (props: ElementProps) => <TextElement as="p" {...props} />;
export const Span = (props: ElementProps) => <TextElement as="span" {...props} />;
