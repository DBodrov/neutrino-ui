import styled from '@emotion/styled';
import {ITheme, baseTheme} from '../Themes';
import {ISelectProps} from './types';

export const SelectWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  flex: 0 1 150px;
  align-items: center;
  position: relative;
  width: ${(props: ISelectProps) => props.width ?? '100%'};
  height: ${(props: ISelectProps) => props.height ?? 'auto'};
  min-width: 30px;
  min-height: 30px;
  padding: 0 16px;
  background-color: ${({ theme }: { theme: ITheme }) =>
    theme?.colors?.pageElementsColors?.formElements ?? baseTheme.colors.pageElementsColors.formElements};
  border: 1px
    ${({ theme }: { theme: ITheme }) =>
      theme?.colors?.pageElementsColors?.border ?? baseTheme.colors.pageElementsColors.border}
    solid;
  border-radius: ${({ theme }: { theme: ITheme }) =>
    theme?.globals?.borderRadius ?? baseTheme.globals.borderRadius};
  color: ${({ theme }: { theme: ITheme }) =>
    theme?.colors?.textColors?.text ?? baseTheme.colors.textColors.text};
  &:hover,
  &:focus {
    outline: 0;
    border: 1px
      ${({ theme }: { theme: ITheme }) =>
        theme?.colors?.mainColors?.primary ?? baseTheme.colors.mainColors.primary}
      solid;
    cursor: pointer;
  }
`;

export const StyledInput = styled.input`
  outline: 0;
  border: 0;
  background-color: transparent;
  height: 32px;
  color: ${({ theme }: { theme: ITheme }) =>
    theme?.colors?.textColors?.text ?? baseTheme.colors.textColors.text};
`;
