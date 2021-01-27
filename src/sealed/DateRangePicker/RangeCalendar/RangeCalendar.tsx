import React from 'react';
import {SerializedStyles} from '@emotion/react';
import {StartCalendar} from './StartCalendar';
import {EndCalendar} from './EndCalendar';
import {RangeCalendarBox} from './styles';

type Props = {
  calendarCss?: SerializedStyles;
}

export function RangeCalendar(props: Props) {
  const {calendarCss} = props;
  return (
    <RangeCalendarBox css={calendarCss}>
      <StartCalendar />
      <EndCalendar />
    </RangeCalendarBox>
  )
}
