import React from 'react';
import styled from '@emotion/styled';
import {Navigator} from './Navigator';
import {DaysOfWeek} from './DaysOfWeek';
import {DaysCalendar} from './DaysCalendar';
import {useTheme} from '../../Themes';

const CalendarBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  min-height: 250px;
`;

export function Calendar(props: any) {
  const theme = useTheme();
  return (
    <CalendarBlock
      css={{
        border: `1px ${theme.colors.pageElementsColors.border} solid`,
        backgroundColor: theme.colors.pageElementsColors.body,
      }}
      {...props}
    >
      <Navigator />
      <DaysOfWeek />
      <DaysCalendar />
    </CalendarBlock>
  );
}
