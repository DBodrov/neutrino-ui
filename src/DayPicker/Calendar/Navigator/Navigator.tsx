import React from 'react';
import styled from '@emotion/styled';
import {useTheme} from '../../../Themes';
import {Button} from '../../../Button';
import {LeftIcon} from '../../icons/LeftIcon';

const Panel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0px 16px;
`;

const NavButton = styled(Button)`
  background: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  &:hover {
    background: none;
  };
  &:active {
    box-shadow: none;
  }
`;


export function Navigator() {
  const theme = useTheme();
  return (
    <Panel css={{borderBottom: `1px ${theme.colors.pageElementsColors.border} solid`}}>
      <NavButton flat>
        <LeftIcon />
      </NavButton>
    </Panel>
  )
}
