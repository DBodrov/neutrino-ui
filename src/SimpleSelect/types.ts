import {SerializedStyles} from '@emotion/core';

type OptionItem = {
  id: string | number;
  value: string | number;
};

export interface ISimpleSelectProps extends Omit<React.HTMLProps<HTMLDivElement>, 'value'> {
  hasError?: boolean;
  children?: (props: any) => React.ReactNode;
  value?: string | number;
  activeStyles?: SerializedStyles;
  selectInputStyles?: SerializedStyles;
  options?: OptionItem[];
}
