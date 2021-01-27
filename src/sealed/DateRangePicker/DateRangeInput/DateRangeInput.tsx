import React from 'react';
import {Span} from '../../../Typography';
import {useDateRange} from '../DateRangeProvider';
import {CalendarIcon} from './CalendarIcon';
import {createDateString} from '../utils/date';
import {DateRangeInputBox, DateRangeInputSection} from './styles';
import {IDateRangeInputProps} from '../types';


function DateRangeInputComponent(props: IDateRangeInputProps, ref: React.ForwardRefExoticComponent<HTMLDivElement>) {
  const {inputCss, onClick} = props;
  const {dayEnd, dayStart, format} = useDateRange();
  const inputRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current, []);
  const startDate = createDateString(format, '-', dayStart);
  const endDate = createDateString(format, '-', dayEnd);
  return (
    <DateRangeInputBox ref={inputRef} css={[inputCss]} onClick={onClick}>
      <DateRangeInputSection>
        <CalendarIcon />
        <Span css={{fontSize: 14, paddingLeft: 10}}>{startDate}</Span>
      </DateRangeInputSection>
      <DateRangeInputSection>
        <CalendarIcon />
        <Span css={{fontSize: 14, paddingLeft: 10}}>{endDate}</Span>
      </DateRangeInputSection>
    </DateRangeInputBox>
  );
}

export const DateRangeInput = React.forwardRef(DateRangeInputComponent);
