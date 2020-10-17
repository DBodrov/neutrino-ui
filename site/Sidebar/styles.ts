import styled from '@emotion/styled';
import {baseTheme} from 'neutrino-ui/Themes';

export const Aside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  max-width: 250px;
  width: 250px;
  height: 100%;
  border-right: 1px ${baseTheme.colors.pageElementsColors.border} solid;
  background-color: #fff;
  z-index: 1;
  @media (max-width: 540px) {
    width: ${(props: any) => props.isOpen ? '250px' : '0px'};
    overflow: hidden;
  }
`;
