import styled from '@emotion/styled';
import {ITheme, baseTheme} from '../Themes';
import {ISelectProps} from './types';



export const SelectWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: ${(props: ISelectProps) => props.width ?? '100%'};
  height: ${(props: ISelectProps) => props.height ?? 'auto'};
`;

export const StyledInput = styled.input`
  outline: 0;
  border: 0;
  background-color: transparent;
  height: 32px;
  color: ${({ theme }: { theme: ITheme }) =>
    theme?.colors?.textColors?.text ?? baseTheme.colors.textColors.text};
`;
