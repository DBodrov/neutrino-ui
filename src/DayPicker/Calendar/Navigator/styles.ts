import styled from '@emotion/styled';
import {Button} from '../../../Button';

export const LinkButton = styled.button`
  background: none;
  border: 0;
  outline: 0;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0 2px;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px
`;

export const Panel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0px 4px;
`;

export const NavButton = styled(Button)`
  background: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
  min-width: 20px;
  min-height: 32px;
  width: 20px;
  height: 32px;
  &:hover {
    background: none;
  }
  &:active {
    box-shadow: none;
  }
`;
