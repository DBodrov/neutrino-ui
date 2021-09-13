import {SerializedStyles} from '@emotion/react';

export interface ISelectInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  styles?: SerializedStyles;
}
