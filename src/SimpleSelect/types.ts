import {SerializedStyles} from '@emotion/core';

type OptionItem = {
  id: string | number;
  value: string | number;
};

export interface ISimpleSelectProps extends Omit<React.HTMLProps<HTMLDivElement>, 'value' | 'onSelect'> {
  hasError?: boolean;
  value?: string | number;
  selectInputStyles?: SerializedStyles;
  optionsListStyles?: SerializedStyles;
  optionStyles?: SerializedStyles;
  options?: OptionItem[];
  onSelect: (event?: React.PointerEvent<HTMLLIElement>) => void;
}
