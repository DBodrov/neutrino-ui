import {SerializedStyles} from '@emotion/react';
import {TOptionItem} from '../../types';


type TChildrenProps = {
  options: TOptionItem[];
};

export type TOptionsListProps = {
  children?: (props: TChildrenProps) => React.ReactNode;
  styles?: SerializedStyles;
};
