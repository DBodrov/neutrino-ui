import { SerializedStyles } from '@emotion/core'

export type TChangeTypes = 'IDLE' | 'SELECT_CLICK' | 'CLICK_OUTSIDE' | 'SCROLL' | 'CLICK_ITEM';

export type State = {
  type?: TChangeTypes;
  currentValue?: string | number | string[] | number[];
  displayValue?: string;
  isOpen?: boolean;
};

export interface ISelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  stateReducer?: (state: State, changes: State) => State;
  prefix?: string;
  prefixCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  isEdit?: boolean;
  displayValueCss?: SerializedStyles;
  caption?: string;
  children?: React.ReactNode;
}
