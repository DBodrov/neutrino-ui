import { IColors } from './colors';
import { IShadows } from './shadows';
import { Typography } from './typography';

export interface ITheme {
    typography?: Partial<Typography>;
    colors?: IColors;
    shadows?: IShadows;
    globals?: React.CSSProperties;
}
