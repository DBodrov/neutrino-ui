import {ReactNode} from 'react';
import { IColors } from './colors';
import { IShadows } from './shadows';
import { Typography } from './typography';

export interface ITheme {
    typography?: Partial<Typography>;
    colors?: IColors;
    shadows?: IShadows;
}

export interface IThemeProviderProps {
    children: ReactNode;
    theme: Partial<ITheme>;
}
