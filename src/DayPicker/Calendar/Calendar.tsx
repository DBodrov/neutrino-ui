import React from 'react';
import {Navigator} from './Navigator';
import {DaysOfWeek} from './DaysOfWeek';
import {DaysCalendar} from './DaysCalendar';
import {useTheme} from '../../Themes';
import {CalendarBlock} from './styles';

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
