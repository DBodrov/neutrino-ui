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
  padding: 0px 4px;
`;

const NavButton = styled(Button)`
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
      <NavButton flat>
        <LeftIcon />
      </NavButton>
      <div css={{display: 'flex', flexFlow: 'row nowrap', height: '100%', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <span>month / year</span>
      </div>
      <NavButton flat css={{marginLeft: 'auto'}}>
        <LeftIcon css={{transform: 'rotate(180deg)'}}/>
      </NavButton>
      <NavButton flat >
        <LeftIcon css={{transform: 'rotate(180deg)'}}/>
      </NavButton>
    </Panel>
  )
}
